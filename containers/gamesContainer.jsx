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
    if (!games.isLoadingGames) {
    	this.props.selectedEvents.forEach((event) => {
      		dispatch(gamesActions.fetchGames(event.replace("/","_")))
    	})
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

  renderNoGames() {
  	let {selectedEvents} = this.props
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-xs-12">
            <p>No games found for one of your events :( please consider contributing match data at <a href="https://github.com/openfootball" target="_blank">https://github.com/openfootball</a></p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    let {games, selectedEvents} = this.props
    let selectedEvents1 = null
    let selectedEvents2 = null
    if (games.isLoadingGames || games.content === undefined) {
      return this.renderLoading()
    }
    else if (games.content.games.length === 0 || games.content === undefined) {
    	return this.renderNoGames()
    }
    if (selectedEvents[1]) {
    	selectedEvents1 = this.props.resolveEventName(selectedEvents[0])
    	selectedEvents2 = this.props.resolveEventName(selectedEvents[1])
    }
    return (
    	<div>
    		{selectedEvents[1] ? <p>Comparing <b>{selectedEvents1[1]} {selectedEvents1[2]}</b> against <b>{selectedEvents2[1]} {selectedEvents2[2]}</b></p> : null}
    		          {games.content !== undefined &&
          <GamesContent 
          	content={games.content} 
          	team={this.props.team} 
          	teams={this.props.teams} 
          	selectedEvents={selectedEvents}
          	resolveEventName={this.props.resolveEventName}
          	resolveTeamName={this.props.resolveTeamName}
          />
          }
        </div>
    )
  }
}
