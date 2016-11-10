import React from "react"
import { render } from "react-dom"
import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers,
} from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import * as reducers from "./reducers"
import GamesContainer from "./containers/gamesContainer"
import TeamsContainer from "./containers/TeamsContainer"
import EventsContainer from "./containers/EventsContainer"

let finalCreateStore = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)
let reducer = combineReducers(reducers)
let store = finalCreateStore(reducer)


class App extends React.Component {
	render () {
		return (
			<div>
				<p>App loaded</p>
				<p>Events</p>
				<Provider store={store}>
					<EventsContainer />
				</Provider>
				<p>Games</p>
				<Provider store={store}>
					<GamesContainer />
				</Provider>
				<p>Teams</p>
				<Provider store={store}>
					<TeamsContainer />
				</Provider>
			</div>
			)
	}
}

render(<App/>, document.getElementById('App'))