import { request } from "../utils"

export const TEAMS = "TEAMS"
export const TEAMS_SUCCESS = "TEAMS_SUCCESS"
export const TEAMS_ERROR400 = "TEAMS_ERROR400"
export const TEAMS_ERROR500 = "TEAMS_ERROR500"
export const TEAMS_FAILURE = "TEAMS_FAILURE"

export function fetchTeams() {
  return function (dispatch) {
    let url = "http://localhost:9292/teams/"
    dispatch({type: TEAMS})
    return request(
      url, {},
      (json) => { dispatch({type: TEAMS_SUCCESS, res: json}) },
      (json) => { dispatch({type: TEAMS_ERROR400, res: json}) },
      (res) => { dispatch({type: TEAMS_ERROR500, res: res}) },
      (ex) => { dispatch({type: TEAMS_FAILURE, error: ex}) },
    )
  }
}