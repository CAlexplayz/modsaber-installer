import {
  Action,
  AnyAction,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Dispatch,
} from 'redux'
import thunk from 'redux-thunk'

import { containerReducer, IContainerState } from './container'
import { gameVersionReducer, IGameVersionState } from './gameVersions'
import { IInstallState, installReducer } from './install'
import { IJobsState, jobsReducer } from './jobs'
import { IModsState, modsReducer } from './mods'
import { IStatusState, statusReducer } from './status'
import { ITabsState, tabsReducer } from './tabs'
import { IThemeState, themeReducer } from './theme'

export interface IState {
  readonly theme: IThemeState
  readonly status: IStatusState
  readonly mods: IModsState
  readonly gameVersions: IGameVersionState
  readonly install: IInstallState
  readonly jobs: IJobsState
  readonly tabs: ITabsState
  readonly container: IContainerState
}

export interface IConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>
}

export const rootReducer: any = combineReducers<IState>({
  container: containerReducer,
  gameVersions: gameVersionReducer,
  install: installReducer,
  jobs: jobsReducer,
  mods: modsReducer,
  status: statusReducer,
  tabs: tabsReducer,
  theme: themeReducer,
})

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)))
