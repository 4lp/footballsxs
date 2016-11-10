
import * as gamesActions from "../actions/gamesActions"

const initialState = {
	isLoadingGames: false,
	games: undefined,
}

export default function games(state=initialState, action={}) {
  switch (action.type) {
  case gamesActions.GAMES:
    return {...state, isLoadingGames: true}
  case gamesActions.GAMES_SUCCESS:
    return {...state, isLoadingGames: false, content: action.res}
  case gamesActions.GAMES_ERROR400:
  case gamesActions.GAMES_ERROR500:
  case gamesActions.GAMES_FAILURE:
    return {...state, isLoadingGames: false}
  default:
    return state
  }
}