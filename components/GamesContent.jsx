import React from "react"

export default class GamesContent extends React.Component {
	constructor(props){
	    super(props);
	    this.state = {
	      outerNodes: [],
	    };
  	}

	resolveTeamName(teamid) {
		let teamName = null
		this.props.teams.forEach((team) => {
			if (team.id == teamid) {
				teamName = team.title
			}
		})
		return teamName
	}

	renderLoading() {
		while (this.state.outerNodes.length > 0) {
			this.state.outerNodes.pop()
		}
		console.log ("outerNodes len =" + this.state.outerNodes.length)
		console.log ("outerNodes =" + this.state.outerNodes)
		return <div>no events!</div>
	}

	render() {
	let {content} = this.props
	let contentNodes = []
	content.games.forEach((item, index) => {
		let node = undefined
		if (item.team1score === null || item.team2score === null) {
			return
		}
		else if (item.team1 == this.props.team) {
	  		node = (
		        <tr key={item.id}>
		        	<td>{this.resolveTeamName(item.team2)} (H)</td>
		        	<td>{item.team1score} - {item.team2score}</td>
		        	<td>{content.key}</td>
		        </tr>
		
	  		)
	  	}
	  	else if (item.team2 == this.props.team) {
	  		node = (
		        <tr key={item.id}>
		        	<td>{this.resolveTeamName(item.team1)} (A)</td>
		        	<td>{item.team1score} - {item.team2score}</td>
		        	<td>{content.key}</td>
		        </tr>
		
	  		)
	  	}
	  	contentNodes.push(node)
	})
	if (this.state.outerNodes.length < 2){
		this.state.outerNodes.push(contentNodes)
	}
	else if (this.props.selectedEvents.length == 0) {
		this.state.outerNodes.pop()
		if (this.state.outerNodes.length == 1)	{
			this.state.outerNodes.pop()
		}
	}
	else {
		this.state.outerNodes.pop()
		this.state.outerNodes.push(contentNodes)
	}

	let teamName = this.resolveTeamName(this.props.team)
	if (this.props.selectedEvents.length == 0) {
		return this.renderLoading()
	}
	console.log ("outerNodes len =" + this.state.outerNodes.length)
	console.log ("outerNodes =" + this.state.outerNodes)
    return (
    <div>
      <p>{teamName}</p>
      <p>outerNodes = {this.state.outerNodes}</p>
      <p>outerNodes type = {typeof(this.state.outerNodes)}</p>
      <table className="table">
      <tbody>
      	<tr><th>match</th><th>score</th><th>event</th></tr>
      	{this.state.outerNodes}
      </tbody>
      </table>
    </div>
    )
  }
}