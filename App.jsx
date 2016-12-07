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
import AboutMe from "./components/AboutMe"


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
  			<h4>pick a country to begin!</h4>
  			<Provider store={store}>
				<TeamsContainer />
			</Provider>
  		</div>
  	}

  	renderAbout() {
  		return <AboutMe setAbout={this.setAbout.bind(this)} />
  	}

  	setAbout() {
  		this.setState({ showingAbout: !this.state.showingAbout })
  	}

	render () {
    let about = <a><h4 className="clickable" onClick={() => this.setAbout()}>questions? concerns? click here</h4></a>
    let back = <h4><a className="clickable" onClick={() => this.setAbout()}>back home</a></h4>
		return (
			<div className="container">
				<div className="col-sm-12">
					<div className="row">
						<h1>football sxs</h1>
						<h4>football season by season, side by side</h4>
            {this.state.showingAbout === false ? about : back}
					</div>
          <br />
					{this.state.showingAbout === true ? this.renderAbout() : this.renderMain()}
				</div>
			</div>
			)
	}
}

render(<App/>, document.getElementById('App'))