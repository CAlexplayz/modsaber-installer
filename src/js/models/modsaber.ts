export interface IGameVersion {
  id?: string
  value: string
  manifest: string
  selected?: boolean
}

export interface IFiles {
  hash: string
  url: string
  files: any
}

export interface IMod {
  name: string
  version: string
  details: {
    author: {
      name: string
      id: string
    }
    title: string
    description: string
    published: string | Date
  }
  approval: {
    status: 'pending' | 'approved' | 'denied'
    reason: string | null
    modified: string | Date
  }
  meta: {
    type: 'mod'
    weight: number
    category: string
  }
  gameVersion: IGameVersion
  oldVersions: string[]
  links: {
    dependencies: string[]
    conflicts: string[]
  }
  files: {
    steam: IFiles
    oculus?: IFiles
  }
}
