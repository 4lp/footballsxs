import React from "react"
import * as teamsActions from '../actions/teamsActions'
import * as countriesActions from '../actions/countriesActions'
import TeamsContent from '../components/TeamsContent'
import { connect } from "react-redux"

@connect(state => ({
  teams: state.teams,
  countries: state.countries
}))

export default class TeamsContainer extends React.Component {
  componentDidMount() {
    let {dispatch, teams, countries} = this.props
    if (!teams.isLoadingTeams && teams.content === undefined) { 
        dispatch(teamsActions.fetchTeams())  
    }
    if (!countries.isLoadingCountries && countries.content === undefined) { 
        dispatch(countriesActions.fetchCountries())  
    }
  }

  renderLoading() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-xs-12">
            Loading...
          </div>
        </div>
      </div>
    )
  }

  render() {
    let {teams, countries} = this.props
    if (teams.isLoadingTeams || teams.content === undefined || countries.isLoadingCountries || countries.content === undefined) {
      return this.renderLoading()
    }
    return (
    	<div>
          {teams.content !== undefined &&
          <TeamsContent teams={teams.content} countries={countries.content} />
          }
        </div>
    )
  }
}
