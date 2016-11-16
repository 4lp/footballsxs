import React from "react"

const outerNodes = []

export default class GamesContent extends React.Component {
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
	if (outerNodes.length < 2){
		outerNodes.push(contentNodes)
	}
	else if (this.props.selectedEvents.length == 0) {
		outerNodes.pop()
		if (outerNodes.length == 1)	{
			outerNodes.pop()
		}
	}
	else {
		outerNodes.pop()
		outerNodes.push(contentNodes)
	}

	let teamName = this.resolveTeamName(this.props.team)
	console.log("contentNodes =" + {outerNodes})
	if (this.props.selectedEvents.length == 0) {
		return this.renderLoading()
	}
    return (
    <div>
      <p>{teamName}</p>
      <p>outerNodes = {outerNodes}</p>
      <p>outerNodes type = {typeof(outerNodes)}</p>
      <table className="table">
      <tbody>
      	<tr><th>match</th><th>score</th><th>event</th></tr>
      	{outerNodes}
      </tbody>
      </table>
    </div>
    )
  }
}