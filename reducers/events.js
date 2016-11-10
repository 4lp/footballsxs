import * as eventsActions from "../actions/eventsActions"

const initialState = {
	isLoadingEvents: false,
	events: undefined,
}

export default function events(state=initialState, action={}) {
  switch (action.type) {
  case eventsActions.EVENTS:
    return {...state, isLoadingEvents: true}
  case eventsActions.EVENTS_SUCCESS:
    return {...state, isLoadingEvents: false, content: action.res}
  case eventsActions.EVENTS_ERROR400:
  case eventsActions.EVENTS_ERROR500:
  case eventsActions.EVENTS_FAILURE:
    return {...state, isLoadingEvents: false}
  default:
    return state
  }
}