import React from "react"

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
		        </tr>
		
	  		)
	  	}
	  	else if (item.team2 == this.props.team) {
	  		node = (
		        <tr key={item.id}>
		        	<td>{this.resolveTeamName(item.team1)} (A)</td>
		        	<td>{item.team1score} - {item.team2score}</td>
		        </tr>
		
	  		)
	  	}
	  contentNodes.push(node)
	})

	let teamName = this.resolveTeamName(this.props.team)

    return (
    <div>
      <p>{teamName}</p>
      <table className="table">
      <tbody>
      	<tr><th>match</th><th>score</th></tr>
      	{contentNodes}
      </tbody>
      </table>
    </div>
    )
  }
}