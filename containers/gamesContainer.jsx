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
      dispatch(gamesActions.fetchGames(this.props.event.replace("/","_")))
    }
  }

  componentDidUpdate(prevProps) {
    let {dispatch} = this.props
    if (this.props.event !== prevProps.event) {
    	dispatch(gamesActions.fetchGames(this.props.event.replace("/","_")))
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
    let {games} = this.props
    if (games.isLoadingGames || games.content === undefined) {
      return this.renderLoading()
    }
    return (
    	<div>
          {games.content !== undefined &&
          <GamesContent content={games.content} />
          }
        </div>
    )
  }
}
