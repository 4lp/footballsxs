import { request } from "../utils"

export const EVENTTEAMS = "EVENTTEAMS"
export const EVENTTEAMS_SUCCESS = "EVENTTEAMS_SUCCESS"
export const EVENTTEAMS_ERROR400 = "EVENTTEAMS_ERROR400"
export const EVENTTEAMS_ERROR500 = "EVENTTEAMS_ERROR500"
export const EVENTTEAMS_FAILURE = "EVENTTEAMS_FAILURE"
export const EVENTS = "EVENTS"
export const EVENTS_SUCCESS = "EVENTS_SUCCESS"
export const EVENTS_ERROR400 = "EVENTS_ERROR400"
export const EVENTS_ERROR500 = "EVENTS_ERROR500"
export const EVENTS_FAILURE = "EVENTS_FAILURE"


export function eventTeams(event) {
  return function (dispatch) {
    let url = "http://localhost:9292/event/" + event + "/teams"
    dispatch({type: EVENTTEAMS})
    return request(
      url, {},
      (json) => { dispatch({type: EVENTTEAMS_SUCCESS, res: json}) },
      (json) => { dispatch({type: EVENTTEAMS_ERROR400, res: json}) },
      (res) => { dispatch({type: EVENTTEAMS_ERROR500, res: res}) },
      (ex) => { dispatch({type: EVENTTEAMS_FAILURE, error: ex}) },
    )
  }
}

export function fetchEvents() {
  return function (dispatch) {
    let url = "http://localhost:9292/events"
    dispatch({type: EVENTS})
    return request(
      url, {},
      (json) => { dispatch({type: EVENTS_SUCCESS, res: json}) },
      (json) => { dispatch({type: EVENTS_ERROR400, res: json}) },
      (res) => { dispatch({type: EVENTS_ERROR500, res: res}) },
      (ex) => { dispatch({type: EVENTS_FAILURE, error: ex}) },
    )
  }
}

export function fetchEventTeams() {
  return (dispatch, getState) => {
    return dispatch(fetchEvents()).then(() => {
      const fetchedEvents = getState().events.content
      fetchedEvents.forEach((event) => {
        console.log("fetching" + event)
        return dispatch(eventTeams(event.key.replace( "/", "_" )))
      })
    })
  }
}