import React from "react"

export default class TableContent extends React.Component {
	constructor(props){
	    super(props);
	    this.state = {
	      outerNodes: [],
	    };
  	}

  	makeSingleTable(contentList) {
  		let contentNodes = []
		let i = 0
  		contentList.forEach((item) => {
			let node = undefined
			//check if unplayed but scheduled games
			if (item[0].team1score === null || item[0].team2score === null) {
				return
			}
			//check if team 1 is selected team
			else if (item[0].team1 === this.props.team) {
				node = (
			        <tr key={item[1] + i}>
			        	<td>{this.props.resolveTeamName(item[0].team2)} (H)</td>
			        	<td>{item[0].team1score} - {item[0].team2score} {item[2]}</td>
			        </tr>
						)
			}
		  	//check if team 2 is selected team
		  	else if (item[0].team2 === this.props.team) {
						node = (
					        <tr key={item[1] + i}>
					        	<td>{this.props.resolveTeamName(item[0].team1)} (A)</td>
					        	<td>{item[0].team1score} - {item[0].team2score} {item[2]}</td>
					        </tr>
		  					)
			}
			contentNodes.push(node)
			i++
		})

		//push n' pop from outernodes to load table content to be passed
		//rewrite this to use custom setstate function
		if (this.props.selectedEvents.length == 0) {
			this.state.outerNodes.pop()
		}
		else {
			this.state.outerNodes.pop()
			this.state.outerNodes.push(contentNodes)
		}
	}

	makeRows(contentList) {
		let contentNodes = []
		let i = 0

		contentList.forEach((item) => {

			//init blank node
			let node = undefined
			//check if unplayed but scheduled games
			if (item[0].team1score === null || item[0].team2score === null) {
				return
			}

			//check if team 1 is selected team
			else if (item[0].team1 === this.props.team) {
				//check list of games for same fixture different season
				contentList.forEach((game) => {
					//if fixture is the same put them in the same row
					if (item[1] === game[1]) {
						node = (
							<tr key={item[1] + i}>
					        	<td>{this.props.resolveTeamName(item[0].team2)} (H)</td>
					        	<td>{item[0].team1score} - {item[0].team2score} {item[2]}</td>
					        	<td>{game[0].team1score} - {game[0].team2score} {game[2]}</td>
					        </tr>
							)
					}
					//else give this game its own row
					else if (item[1] !== game[1]) {
						if (i === 0) {
							node = (
						        <tr key={item[1] + i}>
						        	<td>{this.props.resolveTeamName(item[0].team2)} (H)</td>
						        	<td>{item[0].team1score} - {item[0].team2score} {item[2]} single </td>
						        	<td>blank</td>
						        </tr>
						    )
						}
						else if (i === 1) {
							node = (
						        <tr key={item[1] + i}>
						        	<td>{this.props.resolveTeamName(item[0].team2)} (H)</td>
						        	<td>blank</td>
						        	<td>{item[0].team1score} - {item[0].team2score} {item[2]} single </td>
						        </tr>		
						    )					
						}
					}
				})
		  	}

			//check if team 2 is selected team
		  	else if (item[0].team2 === this.props.team) {
		  		//check list of games for same fixture different season
				contentList.forEach((game) => {
					//if fixture is the same put them in the same row
					if (item[1] === game[1]) {
						node = (
							<tr key={item[1] + i}>
					        	<td>{this.props.resolveTeamName(item[0].team1)} (A)</td>
					        	<td>{item[0].team1score} - {item[0].team2score} {item[2]}</td>
					        	<td>{game[0].team1score} - {game[0].team2score} {game[2]}</td>
					        </tr>
							)
					}
					//else give this game its own row
					else if (item[1] !== game[1]) {
						if (i === 0) {
							node = (
						        <tr key={item[1] + i}>
						        	<td>{this.props.resolveTeamName(item[0].team1)} (A)</td>
						        	<td>{item[0].team1score} - {item[0].team2score} {item[2]} single </td>
						        	<td>blank</td>
						        </tr>
			  					)
						}
						else if (i === 1) {
							node = (
						        <tr key={item[1] + i}>
						        	<td>{this.props.resolveTeamName(item[0].team2)} (H)</td>
						        	<td>blank</td>
						        	<td>{item[0].team1score} - {item[0].team2score} {item[2]} single </td>
						        </tr>		
						    )					
						}
					}
		  		})
			}

			//check to see if dupe node, push if not
			this.state.outerNodes.forEach((outerNode) => {
				if (!outerNode.includes(node)){
					contentNodes.push(node)
				}
			})
			i++
		})

		//push n' pop from outernodes to load table content to be passed
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

	}

	render(){
		{this.props.selectedEvents.length === 1 ? this.makeSingleTable(this.props.tableContent) : null}
		{this.props.selectedEvents.length === 2 ? this.makeRows(this.props.tableContent) : null}
		return(
		<div>
			<table className="table">
					<tbody>
						{this.props.heading}
			      		{this.state.outerNodes.map((node) => {
			      			return node.map((content) => {
			      						return content
			      					})
				      		})
				      	}
			      	</tbody>
				</table>
			</div>
		)
	}
}