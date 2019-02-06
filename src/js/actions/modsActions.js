import semver from 'semver'
import { dialog, getCurrentWindow } from '../utils/electron'

import { SET_MODS_RAW, SET_MODS_LIST, SET_SELECTED_MOD } from './types'
import { MODS_REQUIRED, MODS_DEFAULT, CATEGORY_DEFAULT, ERR_NOT_SATISFIED } from '../constants'

export const setModsRaw = raw => dispatch => {
  dispatch({
    type: SET_MODS_RAW,
    payload: raw,
  })
}

export const setModsList = list => dispatch => {
  dispatch({
    type: SET_MODS_LIST,
    payload: list,
  })
}

export const setSelectedMod = idx => dispatch => {
  dispatch({
    type: SET_SELECTED_MOD,
    payload: idx,
  })
}

export const setMods = (index = 0, raw) => (dispatch, getState) => {
  if (raw) {
    dispatch({
      type: SET_MODS_RAW,
      payload: raw,
    })
  }

  const rawMods = raw || getState().mods.raw
  const { gameVersions } = getState()
  const gameVersion = gameVersions[index] || {}

  const mods = rawMods
    .filter(mod => mod !== null)
    .filter(mod => mod.gameVersion.manifest === gameVersion.manifest)
    .map(mod => {
      mod.meta.category = mod.meta.category || CATEGORY_DEFAULT
      return mod
    })
    .map(mod => {
      mod.install = {
        selected: false,
        requiredBy: MODS_REQUIRED.includes(mod.name) ? ['global'] : [],
        conflictsWith: [],
      }

      return mod
    })

  dispatch({
    type: SET_MODS_LIST,
    payload: mods,
  })

  const defaultMods = mods
    .filter(x => MODS_DEFAULT.includes(x.name))
    .map(x => mods.findIndex(mod => mod.name === x.name && mod.version === x.version))

  for (const idx of defaultMods) {
    toggleMod(idx)(dispatch, getState)
  }
}

export const toggleMod = index => (dispatch, getState) => {
  const mods = JSON.parse(JSON.stringify(getState().mods.list))
  const mod = mods[index]

  const locked = mod.install.requiredBy.length > 0 || mod.install.conflictsWith.length > 0
  if (locked) return undefined

  mod.install.selected = !mod.install.selected

  dispatch({
    type: SET_MODS_LIST,
    payload: mod.install.selected ?
      checkMod(mod, mods) :
      uncheckMod(mod, mods),
  })

  return undefined
}

const modKey = (mod = { name: 'Unknown', version: '?.?.?' }) =>
  `${mod.name}@${mod.version}`

const checkMod = (mod, mods) => {
  try {
    const depKeys = findLinks(mod, mods, 'dependencies', true)
    for (const key of depKeys) {
      const [name, version] = key.split('@')
      const depMod = mods.find(x => x.name === name && x.version === version)

      depMod.install.requiredBy = [...depMod.install.requiredBy, modKey(mod)]
    }
  } catch (err) {
    if (err.message !== ERR_NOT_SATISFIED) return dialog.showErrorBox('Unhandled Exception', err.message)

    return dialog.showMessageBox(getCurrentWindow(), {
      title: `Unmet Dependency // ${mod.name}@${mod.version}`,
      type: 'error',
      message: `This mod has an unmet dependency: ${err.link}\n` +
        `Please ask the mod author to update the links to a compatible version.`,
    })
  }

  const conflicts = findLinks(mod, mods, 'conflicts', true)
  for (const conflictKey of conflicts) {
    const [name, version] = conflictKey.split('@')
    const conflict = mods.find(x => x.name === name && x.version === version)

    conflict.install.conflictsWith = [...conflict.install.conflictsWith, modKey(mod)]

    const selected = conflict.install.selected || conflict.install.requiredBy.length > 0 || false
    if (!selected) continue

    return dialog.showMessageBox(getCurrentWindow(), {
      title: `Conflicting Mod // ${mod.name}@${mod.version}`,
      type: 'error',
      message:
        `This mod conflicts with ${conflict.details.title} v${conflict.version}\n\n` +
        `Uncheck it and try again!`,
    })
  }

  return mods
}

const uncheckMod = (mod, mods) => {
  const key = modKey(mod)
  const otherMods = mods.filter(x => x.install.requiredBy.includes(key) || x.install.conflictsWith.includes(key))

  for (const otherModIdx in otherMods) {
    otherMods[otherModIdx].install.requiredBy =
      otherMods[otherModIdx].install.requiredBy.filter(x => x !== key)

    otherMods[otherModIdx].install.conflictsWith =
      otherMods[otherModIdx].install.conflictsWith.filter(x => x !== key)
  }

  return mods
}

/**
 * @param {any} mod Mod to search
 * @param {any[]} mods Array of Mods
 * @param {('dependencies'|'conflicts')} type Type
 * @param {boolean} [keys] Checked
 * @returns {string[]}
 */
const findLinks = (mod, mods, type, keys = false) => {
  const modsClone = JSON.parse(JSON.stringify(mods))

  const links = type === 'dependencies' ? mod.links.dependencies : mod.links.conflicts
  const recursiveSearch = findLinksR(links, modsClone, type)
    .filter(x => x !== modKey(mod))

  if (keys) return recursiveSearch
  return recursiveSearch.map(key => {
    const [name, version] = key.split('@')
    return modsClone.find(x => x.name === name && x.version === version)
  })
}

/**
 * @param {string[]} linksToSearch Array of links
 * @param {any[]} mods Array of Mods
 * @param {('dependencies'|'conflicts')} type Type
 * @param {string[]} li Checked
 * @param {string[]} ch Checked
 * @returns {string[]}
 */
const findLinksR = (linksToSearch, mods, type, li, ch) => {
  const links = !li ? [] : [...li]
  const checked = !ch ? [] : [...ch]

  for (const link of linksToSearch) {
    const [name, range] = link.split('@')
    const search = mods.find(x => x.name === name && semver.satisfies(x.version, range))

    // Not satisfied
    if (!search && type === 'dependencies') {
      const error = new Error(ERR_NOT_SATISFIED)
      error.link = link

      throw error
    } else if (!search && type === 'conflicts') {
      continue
    }

    // Push link
    const key = modKey(search)
    if (!links.includes(key)) {
      links.push(key)
      checked.push(link)
    }

    // Conflicts only need to check 1 level deep
    if (type === 'conflicts') continue

    const nestedLinks = search.links.dependencies.filter(x => !checked.includes(x))

    // Process nested links
    if (nestedLinks.length > 0) {
      const nested = findLinksR(nestedLinks, mods, type, links, checked)

      for (const n of nested) {
        if (!links.includes(n)) links.push(n)
      }
    }
  }

  return links
}
