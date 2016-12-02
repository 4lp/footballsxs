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
				let t1res = item[0].team1score - item[0].team2score
				node = (
			        <tr key={item[1] + i}>
			        	<td>{this.props.resolveTeamName(item[0].team2)} (H)</td>
			        	<td className={t1res >= 1 ? "success" : t1res === 0 ? "warning" : t1res <= 1 ? "danger" : null}>{item[0].team1score} - {item[0].team2score}</td>
			        </tr>
						)
			}
		  	//check if team 2 is selected team
		  	else if (item[0].team2 === this.props.team) {
		  		let t1res = item[0].team2score - item[0].team1score
					node = (
				        <tr key={item[1] + i}>
				        	<td>{this.props.resolveTeamName(item[0].team1)} (A)</td>
				        	<td className={t1res >= 1 ? "success" : t1res === 0 ? "warning" : t1res <= 1 ? "danger" : null}>{item[0].team2score} - {item[0].team1score}</td>
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

	addPoints(points, result) {
		if (result === 0) {
			points = points + 1
		}
		else if (result >= 1) {
			points = points + 3
		}
		return points
	}

	makeRows(contentList) {
		let contentNodes = []
		let points = []
		let points0 = 0
		let points1 = 0
		//init list of rendered game ids to keep track of dupes
		let dupeList = []

		contentList.forEach((item) => {
			//init unique id for dupe check
			let uniqueId = item[1] + item [2]
			//serves as a tag to let the rest of the loop know not to override node if match
			let j = 0
			//init blank node
			let node = undefined
			//check if unplayed but scheduled games
			if (item[0].team1score === null || item[0].team2score === null || dupeList.includes(uniqueId)) {
				return
			}
			else {
				contentList.forEach((game) => {
					//check game unique ID against processed item unique IDs to see if it's one we've processed
					let gameUniqueId = game[1] + game [2]
					if (game[0].team1score === null || game[0].team2score === null || dupeList.includes(gameUniqueId)) {
						return
					}
					else if (item[1] === game[1] && item[0].id !== game[0].id && item[0].team1 === this.props.team && item[2] === this.props.selectedEvents[0]) {
						let t1res = item[0].team1score - item[0].team2score
						let t2res = game[0].team1score - game[0].team2score
						node = [
							<tr key={item[1]}>
					        	<td>{this.props.resolveTeamName(item[0].team2)} (H)</td>
					        	<td className={t1res >= 1 ? "success" : t1res === 0 ? "warning" : t1res <= 1 ? "danger" : null}>{item[0].team1score} - {item[0].team2score}</td>
					        	<td className={t2res >= 1 ? "success" : t2res === 0 ? "warning" : t2res <= 1 ? "danger" : null}>{game[0].team1score} - {game[0].team2score}</td>
					        </tr>
						]
						j++
						dupeList.push(gameUniqueId)
						points0 = this.addPoints(points0, t1res)
						points1 = this.addPoints(points1, t2res)
					}
					else if (item[1] === game[1] && item[0].id !== game[0].id && item[0].team2 === this.props.team && item[2] === this.props.selectedEvents[0]) {
						let t1res = item[0].team2score - item[0].team1score
						let t2res = game[0].team2score - game[0].team1score
						node = [
							<tr key={item[1]}>
					        	<td>{this.props.resolveTeamName(item[0].team1)} (A)</td>
					        	<td className={t1res >= 1 ? "success" : t1res === 0 ? "warning" : t1res <= 1 ? "danger" : null}>{item[0].team2score} - {item[0].team1score}</td>
					        	<td className={t2res >= 1 ? "success" : t2res === 0 ? "warning" : t2res <= 1 ? "danger" : null}>{game[0].team2score} - {game[0].team1score}</td>
					        </tr>
						]
						j++
						dupeList.push(gameUniqueId)
						points0 = this.addPoints(points0, t1res)
						points1 = this.addPoints(points1, t2res)
					}
				})
				//check if team 1 is selected team give this game its own row
				if (j ===0 && item[0].team1 === this.props.team) {
					let t1res = item[0].team1score - item[0].team2score
					if (item[2] === this.props.selectedEvents[0]) {		
						node = [
					        <tr key={item[1]}>
					        	<td>{this.props.resolveTeamName(item[0].team2)} (H)</td>
					        	<td className={t1res >= 1 ? "success" : t1res === 0 ? "warning" : t1res <= 1 ? "danger" : null}>{item[0].team1score} - {item[0].team2score}</td>
					        	<td></td>
					        </tr>
					    ]
					}
					else if (item[2] === this.props.selectedEvents[1]) {					
						node = [
					        <tr key={item[1]}>
					        	<td>{this.props.resolveTeamName(item[0].team2)} (H)</td>
					        	<td></td>
					        	<td className={t1res >= 1 ? "success" : t1res === 0 ? "warning" : t1res <= 1 ? "danger" : null}>{item[0].team1score} - {item[0].team2score}</td>
					        </tr>
					    ]			
					}
		  		}
				//check if team 2 is selected team give this game its own row
			  	else if (j ===0 && item[0].team2 === this.props.team) {
			  		let t1res = item[0].team2score - item[0].team1score
					if (item[2] === this.props.selectedEvents[0]) {
						node = [
					        <tr key={item[1]}>
					        	<td>{this.props.resolveTeamName(item[0].team1)} (A)</td>
					        	<td className={t1res >= 1 ? "success" : t1res === 0 ? "warning" : t1res <= 1 ? "danger" : null}>{item[0].team2score} - {item[0].team1score}</td>
					        	<td></td>
					        </tr>
		  				]
					}
					else if (item[2] === this.props.selectedEvents[1]) {			
						node = [
					        <tr key={item[1]}>
					        	<td>{this.props.resolveTeamName(item[0].team1)} (A)</td>
					        	<td></td>
					        	<td className={t1res >= 1 ? "success" : t1res === 0 ? "warning" : t1res <= 1 ? "danger" : null}>{item[0].team2score} - {item[0].team1score}</td>
					        </tr>
					    ]			
					}
				}
			}			
			
			//check to see if dupe node, push if not
			this.state.outerNodes.forEach((outerNode) => {
				if (!outerNode.includes(node)) {
					contentNodes.push(node)
				}
			})
			dupeList.push(uniqueId)
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

	points.push(points0, points1)
	return points

	}

	renderLoading() {
		return (
		  <div className="container">
		    <div className="row">
		      <div className="col-md-10 col-xs-12">
		        Loading...
		      </div>
		    </div>
		  </div>
		)
	}

	render(){
		let points = 0
		{this.props.selectedEvents.length === 1 ? this.makeSingleTable(this.props.tableContent) : null}
		{this.props.selectedEvents.length === 2 ? points = this.makeRows(this.props.tableContent) : null}
		if (this.state.outerNodes.length !== this.props.selectedEvents.length) {
      		return this.renderLoading()
   		}
		return(
		<div>
			<b>{this.props.selectedEvents.length === 2 ? <p>Points difference (only for same fixtures) = {points[0] - points[1]}</p> : null}</b>
			<table className="table table-condensed">
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