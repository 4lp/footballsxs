import React from "react"
import * as teamsActions from '../actions/teamsActions'
import TeamsContent from '../components/TeamsContent'
import { connect } from "react-redux"

@connect(state => ({
  teams: state.teams
}))

export default class TeamsContainer extends React.Component {
  componentDidMount() {
    let {dispatch, teams} = this.props
    if (!teams.isLoadingTeams && teams.content === undefined) {
      dispatch(teamsActions.fetchTeams())
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
    let {teams} = this.props
    if (teams.isLoadingTeams || teams.content === undefined) {
      return this.renderLoading()
    }
    return (
    	<div>
          {teams.content !== undefined &&
          <TeamsContent content={teams.content} />
          }
        </div>
    )
  }
}
