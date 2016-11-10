import { request } from "../utils"

export const EVENTS = "EVENTS"
export const EVENTS_SUCCESS = "EVENTS_SUCCESS"
export const EVENTS_ERROR400 = "EVENTS_ERROR400"
export const EVENTS_ERROR500 = "EVENTS_ERROR500"
export const EVENTS_FAILURE = "EVENTS_FAILURE"

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