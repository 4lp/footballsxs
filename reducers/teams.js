import * as teamsActions from "../actions/teamsActions"

const initialState = {
	isLoadingTeams: false,
	teams: undefined,
}

export default function teams(state=initialState, action={}) {
  switch (action.type) {
  case teamsActions.TEAMS:
    return {...state, isLoadingTeams: true}
  case teamsActions.TEAMS_SUCCESS:
    return {...state, isLoadingTeams: false, content: action.res}
  case teamsActions.TEAMS_ERROR400:
  case teamsActions.TEAMS_ERROR500:
  case teamsActions.TEAMS_FAILURE:
    return {...state, isLoadingTeams: false}
  default:
    return state
  }
}