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
import "babel-polyfill"
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
	constructor(props){
    super(props);
      	this.state = {
        	showingAbout: false,
      	}
  	}

  	renderMain() {
  		return <div>
  			<Provider store={store}>
				<TeamsContainer />
			</Provider>
  		</div>
  	}

  	renderAbout() {
  		return <div>
  		this is where the about would go
  		</div>
  	}

  	setAbout() {
  		this.setState({ showingAbout: !this.state.showingAbout })
  	}

	render () {
		return (
			<div className="container">
				<div className="col-sm-12">
					<div className="row">
						<h1>football sxs</h1>
						<h4>football season by season, side by side</h4>
						<h4 onClick={() => this.setAbout()}>questions? click here</h4>
					</div>
					{this.state.showingAbout === true ? this.renderAbout() : this.renderMain()}
				</div>
			</div>
			)
	}
}

render(<App/>, document.getElementById('App'))