import React from "react"
import * as gamesActions from '../actions/gamesActions'
import GamesContent from '../components/GamesContent'
import { connect } from "react-redux"

@connect(state => ({
  games: state.games
}))

export default class GamesContainer extends React.Component {
  componentDidMount() {
    let {dispatch, games} = this.props
    if (!games.isLoadingGames && games.content === undefined) {
    	this.props.events.forEach((event) => {
      		dispatch(gamesActions.fetchGames(event.replace("/","_")))
    	})
    }
  }

  componentDidUpdate(prevProps) {
    let {dispatch} = this.props
    this.props.events.forEach((event) => {
	    if (!prevProps.events.includes(event)) {
	    	dispatch(gamesActions.fetchGames(event.replace("/","_")))
		}
	})
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
    let {games} = this.props
    if (games.isLoadingGames || games.content === undefined) {
      return this.renderLoading()
    }
    return (
    	<div>
          {games.content !== undefined &&
          <GamesContent content={games.content} team={this.props.team} teams={this.props.teams} />
          }
        </div>
    )
  }
}
