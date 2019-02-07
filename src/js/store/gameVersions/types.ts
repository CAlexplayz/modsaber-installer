import { IGameVersion } from '../../models/modsaber'

export enum GameVersionActionTypes {
  SET_GAME_VERSIONS = '@@gameVersions/SET_GAME_VERSIONS',
}

export type IGameVersionState = IGameVersion[]
