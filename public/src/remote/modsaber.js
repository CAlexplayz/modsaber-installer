const log = require('electron-log')
const fetch = require('node-fetch')
const branchy = require('branchy')
const chunk = require('chunk')
const { extractZip, safeDownload } = require('./remote.js')
const { calculateHash } = require('../utils/helpers.js')
const { API_URL, USER_AGENT, BLOCKED_EXTENSIONS } = require('../constants.js')

/**
 * @typedef {Object} Files
 * @property {string} url
 * @property {string} hash
 * @property {any} files
 */

/**
 * @typedef {Object} Mod
 * @property {string} name
 * @property {string} version
 * @property {Object} files
 * @property {Files} files.steam
 * @property {Files} files.oculus
 * @property {Object} approval
 * @property {('pending'|'approved'|'denied')} approval.status
 * @property {string} approval.modified
 * @property {Object} gameVersion
 * @property {string} gameVersion.value
 * @property {string} gameVersion.manifest
 */

/**
 * @param {('latest'|'all'|'newest-by-gameversion')} options Mod Fetch Options
 * @returns {Promise.<Mod[]>}
 */
const fetchMods = async options => {
  const type = options || 'latest'

  const pageResp = await fetch(`${API_URL}/mods/approved/${type}`, { headers: { 'User-Agent': USER_AGENT } })
  const { lastPage } = await pageResp.json()
  const pages = Array.from(new Array(lastPage + 1)).map((_, i) => i)
  const pageJobs = chunk(pages, 5)

  /**
   * @param {number[]} pageIDs Page IDs
   * @param {Object} t Tunnelled Info
   * @param {string} t.type Type
   * @param {string} t.API_URL API URL
   * @param {string} t.USER_AGENT User Agent
   * @returns {Promise.<Mod[]>}
   */
  const fetchPageBulk = async (pageIDs, t) => {
    const localFetch = require('node-fetch')
    const jobs = pageIDs.map(async page => {
      const modResp = await localFetch(`${t.API_URL}/mods/approved/${t.type}/${page}`, { headers: { 'User-Agent': t.USER_AGENT } })
      const { mods } = await modResp.json()
      return mods
    })

    const allMods = await Promise.all(jobs)
    return [].concat(...allMods)
  }

  /**
   * @type {function (number[]): Promise.<Mod[]>}
   */
  const fetchPageThreaded = branchy(fetchPageBulk)

  const multi = await Promise.all(pageJobs.map(page => fetchPageThreaded(page, { type, API_URL, USER_AGENT })))
  return [].concat(...multi)
}

/**
 * @returns {Promise.<{ id: string, value: string, manifest: string, selected: boolean }[]>}
 */
const fetchGameVersions = async () => {
  const resp = await fetch(`${API_URL}/site/gameversions`, { headers: { 'User-Agent': USER_AGENT } })
  const body = await resp.json()

  return body
}

class DownloadError extends Error {
  /**
   * @param {string} message Error Message
   * @param {Mod} mod Mod
   */
  constructor (message, mod) {
    super(message)
    this.mod = mod
  }
}

/**
 * @param {Mod} mod Mod Data
 * @param {('steam'|'oculus')} platform Install Platform
 * @param {string} installDir Install Directory
 * @returns {Promise.<{ path: string, data: Buffer }[]>}
 */
const downloadMod = async (mod, platform, installDir) => {
  const files = platform === 'steam' || mod.files.oculus === undefined ?
    mod.files.steam :
    mod.files.oculus

  // Download
  const resp = await safeDownload(files.url, true)
  if (resp.error) {
    log.error(resp.error)
    throw new DownloadError('Network Failure', mod)
  }

  // Calculate Hash
  const hash = await calculateHash(resp.body)
  if (hash !== files.hash) throw new DownloadError('Download Hash Mismatch', mod)

  // Extract
  try {
    const extracted = await extractZip(resp.body, installDir, { filter: BLOCKED_EXTENSIONS, filterType: 'blacklist' })
    return extracted
  } catch (err) {
    log.error(err)
    throw new DownloadError('Extraction Failure', mod)
  }
}

/**
 * @param {string} hash Hash Search String
 * @param {string} [path] Optional Path
 * @returns {Promise.<Mod[]>}
 */
const fetchByHash = async (hash, path) => {
  const params = { headers: { 'User-Agent': USER_AGENT } }

  // Set path if given
  if (path) {
    const body = new URLSearchParams()
    body.set('path', path)

    params.body = body
    params.method = 'POST'
  }

  const resp = await fetch(`${API_URL}/mods/by-hash/${hash}`, params)
  return resp.json()
}

module.exports = { fetchMods, fetchGameVersions, downloadMod, fetchByHash }
