import { request } from "../utils"

export const GAMES = "GAMES"
export const GAMES_SUCCESS = "GAMES_SUCCESS"
export const GAMES_ERROR400 = "GAMES_ERROR400"
export const GAMES_ERROR500 = "GAMES_ERROR500"
export const GAMES_FAILURE = "GAMES_FAILURE"

export function fetchGames(event) {
  return function (dispatch) {
    let url = "http://footballsxs.com:9292/event/" + event + "/games/"
    dispatch({type: GAMES})
    console.log("fetching " + event)
    return request(
      url, {},
      (json) => { dispatch({type: GAMES_SUCCESS, res: json}) },
      (json) => { dispatch({type: GAMES_ERROR400, res: json}) },
      (res) => { dispatch({type: GAMES_ERROR500, res: res}) },
      (ex) => { dispatch({type: GAMES_FAILURE, error: ex}) },
    )
  }
}