import { request } from "../utils"

export const COUNTRIES = "COUNTRIES"
export const COUNTRIES_SUCCESS = "COUNTRIES_SUCCESS"
export const COUNTRIES_ERROR400 = "COUNTRIES_ERROR400"
export const COUNTRIES_ERROR500 = "COUNTRIES_ERROR500"
export const COUNTRIES_FAILURE = "COUNTRIES_FAILURE"

export function fetchCountries() {
  return function (dispatch) {
    let url = "http://footballsxs.com:9292/countries/"
    dispatch({type: COUNTRIES})
    return request(
      url, {},
      (json) => { dispatch({type: COUNTRIES_SUCCESS, res: json}) },
      (json) => { dispatch({type: COUNTRIES_ERROR400, res: json}) },
      (res) => { dispatch({type: COUNTRIES_ERROR500, res: res}) },
      (ex) => { dispatch({type: COUNTRIES_FAILURE, error: ex}) },
    )
  }
}

