import React from "react"
import TableContent from "./TableContent"

export default class GamesContent extends React.Component {
	constructor(props){
	    super(props);
	    this.state = {
	      tagged: [],
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
		// while (this.state.outerNodes.length > 0) {
		// 	this.state.outerNodes.pop()
		// }
		return <div>no events!</div>
	}

	renderTableHeading() {
		let headingArr = []
		let headingNode = []
		let i = 0
		this.props.selectedEvents.forEach((event) => {
			headingNode.push(<th key={i}>{event}</th>)
			i++
		})
		headingArr.push(<tr><th>match</th>{headingNode}</tr>)
		return headingArr
	}

	//Tagging games to identify duplicate fixtures i.e. same team 1, same team 2, different events
	tagGames(content) {
		let taggedContent = []
		content.games.forEach((game) => {
				let node = []
				node.push(game)
		        node.push("team1:"+game.team1+"team2:"+game.team2)
		        node.push(content.key)
		        taggedContent.push(node)	
			})
		return taggedContent
	}

	storeGamesInState(games) {
		let oldGames = this.state.tagged
		oldGames.push(games)
		this.setState({tagged: oldGames})
	}

	componentWillMount() {
		let taggedGames = this.tagGames(this.props.content)
		this.storeGamesInState(taggedGames)
	}

	componentWillReceiveProps(nextProps, nextState) {
		let taggedGames = this.tagGames(nextProps.content)
		this.storeGamesInState(taggedGames)
	}

	renderTableContent() {
		let taggedNodes = []
		//flatten this.state.tagged
		this.state.tagged.forEach((item) => {
			item.forEach((game) => {
				taggedNodes.push(game)
			})
		})
		return taggedNodes
	}

	render() {
	let tableContent = this.renderTableContent()	
	let heading = this.renderTableHeading()
	let teamName = this.resolveTeamName(this.props.team)

	if (this.props.selectedEvents.length == 0) {
		return this.renderLoading()
	}

    return (
    <div>
     	<p>{teamName}</p>
      	<TableContent 
      		tableContent={tableContent} 
      		heading={heading} 
      		key={this.props.selectedEvents.length} 
      		selectedEvents={this.props.selectedEvents}
      		team={this.props.team}
      		resolveTeamName={this.resolveTeamName.bind(this)}
      	/>
    </div>
    )
  }
}