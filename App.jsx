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
				<Provider store={store}>
					<GamesContainer />
				</Provider>
			</div>
			)
	}
}

render(<App/>, document.getElementById('App'))