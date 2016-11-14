import * as eventTeamsActions from "../actions/eventTeamsActions"

const initialState = {
	isLoadingEventTeams: false,
  eventTeams: [],
}

export default function eventTeams(state=initialState, action={}) {
  switch (action.type) {
  case eventTeamsActions.EVENTTEAMS:
    return {...state, isLoadingEventTeams: true}
  case eventTeamsActions.EVENTTEAMS_SUCCESS:
    return {...state, isLoadingEventTeams: false, content: state.eventTeams.push(action.res)}
  case eventTeamsActions.EVENTTEAMS_ERROR400:
  case eventTeamsActions.EVENTTEAMS_ERROR500:
  case eventTeamsActions.EVENTTEAMS_FAILURE:
    return {...state, isLoadingEventTeams: false}
  default:
    return state
  }
}