import * as countriesActions from "../actions/countriesActions"

const initialState = {
	isLoadingCountries: false,
	countries: undefined,
}

export default function countries(state=initialState, action={}) {
  switch (action.type) {
  case countriesActions.COUNTRIES:
    return {...state, isLoadingTeams: true}
  case countriesActions.COUNTRIES_SUCCESS:
    return {...state, isLoadingCountries: false, content: action.res}
  case countriesActions.COUNTRIES_ERROR400:
  case countriesActions.COUNTRIES_ERROR500:
  case countriesActions.COUNTRIES_FAILURE:
    return {...state, isLoadingCountries: false}
  default:
    return state
  }
}