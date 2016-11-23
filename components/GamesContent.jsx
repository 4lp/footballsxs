import React from "react"
import TableContent from "./TableContent"

export default class GamesContent extends React.Component {
	constructor(props){
	    super(props);
	    this.state = {
	      tagged: [],
	    };
  	}

	renderLoading() {
		return <div></div>
	}

	renderTableHeading() {
		let headingArr = []
		let headingNode = []
		let i = 0
		this.props.selectedEvents.forEach((event) => {
			let resolvedName = this.props.resolveEventName(event)
			headingNode.push(<th key={i}>{resolvedName[1]} {resolvedName[2]}</th>)
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
		let deDupedGames = this.dedupeGames(oldGames)
		this.setState({tagged: oldGames})
	}

	dedupeGames(games) {
		let deDupedGames = []
		games.forEach((game) => {
			games.forEach((game2) => {
				if (game[0].id !== game2[0].id) {
					deDupedGames.push(game)
				}
			})
		})
		return deDupedGames
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
	let teamName = this.props.resolveTeamName(this.props.team)

	if (this.props.selectedEvents.length == 0) {
		return this.renderLoading()
	}

    return (
    <div>
      	<TableContent 
      		tableContent={tableContent} 
      		heading={heading} 
      		key={this.props.selectedEvents.length} 
      		selectedEvents={this.props.selectedEvents}
      		team={this.props.team}
      		resolveTeamName={this.props.resolveTeamName}
      	/>
    </div>
    )
  }
}