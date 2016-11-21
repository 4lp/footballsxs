import React from "react"

export default class TableContent extends React.Component {
	constructor(props){
	    super(props);
	    this.state = {
	      outerNodes: [],
	    };
  	}

  	// shouldComponentUpdate() {
  	// 	return this.state.outerNodes.length !== this.props.selectedEvents.length
  	// }

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
				        	<td className={t1res >= 1 ? "success" : t1res === 0 ? "warning" : t1res <= 1 ? "danger" : null}>{item[0].team1score} - {item[0].team2score}</td>
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
			//serves as a tag to let the rest of the loop know not to override node if match
			let j = 0
			//init blank node
			let node = undefined
			//check if unplayed but scheduled games
			if (item[0].team1score === null || item[0].team2score === null) {
				return
			}
			else {
				contentList.forEach((game) => {
					if (game[0].team1score === null || game[0].team2score === null) {
						return
					}
					else if (item[1] === game[1] && item[0].id !== game[0].id && item[0].team1 === this.props.team && item[2] === this.props.selectedEvents[0]) {
						let t1res = item[0].team1score - item[0].team2score
						let t2res = game[0].team1score - game[0].team2score
						node = (
							<tr key={item[1]}>
					        	<td>{this.props.resolveTeamName(item[0].team2)} (H) {i}</td>
					        	<td className={t1res >= 1 ? "success" : t1res === 0 ? "warning" : t1res <= 1 ? "danger" : null}>{item[0].team1score} - {item[0].team2score}</td>
					        	<td className={t2res >= 1 ? "success" : t2res === 0 ? "warning" : t2res <= 1 ? "danger" : null}>{game[0].team1score} - {game[0].team2score}</td>
					        </tr>
						)
						j++
					}
					else if (item[1] === game[1] && item[0].id !== game[0].id && item[0].team1 === this.props.team && item[2] === this.props.selectedEvents[1]) {
						let t1res = item[0].team1score - item[0].team2score
						let t2res = game[0].team1score - game[0].team2score
						node = (
							<tr key={item[1]}>
					        	<td>{this.props.resolveTeamName(item[0].team2)} (H) {i}</td>
					      		<td className={t2res >= 1 ? "success" : t2res === 0 ? "warning" : t2res <= 1 ? "danger" : null}>{game[0].team1score} - {game[0].team2score}</td>
					        	<td className={t1res >= 1 ? "success" : t1res === 0 ? "warning" : t1res <= 1 ? "danger" : null}>{item[0].team1score} - {item[0].team2score}</td>
					        </tr>
						)
						j++
					}
					else if (item[1] === game[1] && item[0].id !== game[0].id && item[0].team2 === this.props.team && item[2] === this.props.selectedEvents[0]) {
						let t1res = item[0].team2score - item[0].team1score
						let t2res = game[0].team2score - game[0].team1score
						node = (
							<tr key={item[1]}>
					        	<td>{this.props.resolveTeamName(item[0].team1)} (A) {i}</td>
					        	<td className={t1res >= 1 ? "success" : t1res === 0 ? "warning" : t1res <= 1 ? "danger" : null}>{item[0].team1score} - {item[0].team2score}</td>
					        	<td className={t2res >= 1 ? "success" : t2res === 0 ? "warning" : t2res <= 1 ? "danger" : null}>{game[0].team1score} - {game[0].team2score}</td>
					        </tr>
						)
						j++
					}
					else if (item[1] === game[1] && item[0].id !== game[0].id && item[0].team2 === this.props.team && item[2] === this.props.selectedEvents[1]) {
						let t1res = item[0].team2score - item[0].team1score
						let t2res = game[0].team2score - game[0].team1score
						node = (
							<tr key={item[1]}>
					        	<td>{this.props.resolveTeamName(item[0].team1)} (A) {i}</td>
					        	<td className={t2res >= 1 ? "success" : t2res === 0 ? "warning" : t2res <= 1 ? "danger" : null}>{game[0].team1score} - {game[0].team2score}</td>
					        	<td className={t1res >= 1 ? "success" : t1res === 0 ? "warning" : t1res <= 1 ? "danger" : null}>{item[0].team1score} - {item[0].team2score}</td>
					        </tr>
						)
						j++
					}
				})
				//check if team 1 is selected team give this game its own row
				if (j ===0 && item[0].team1 === this.props.team) {
					let t1res = item[0].team1score - item[0].team2score
					if (item[2] === this.props.selectedEvents[0]) {		
						node = (
					        <tr key={item[1]}>
					        	<td>{this.props.resolveTeamName(item[0].team2)} (H)</td>
					        	<td className={t1res >= 1 ? "success" : t1res === 0 ? "warning" : t1res <= 1 ? "danger" : null}>{item[0].team1score} - {item[0].team2score}</td>
					        	<td></td>
					        </tr>
					    )
					}
					else if (item[2] === this.props.selectedEvents[1]) {					
						node = (
					        <tr key={item[1]}>
					        	<td>{this.props.resolveTeamName(item[0].team2)} (H)</td>
					        	<td></td>
					        	<td className={t1res >= 1 ? "success" : t1res === 0 ? "warning" : t1res <= 1 ? "danger" : null}>{item[0].team1score} - {item[0].team2score}</td>
					        </tr>		
					    )					
					}
		  		}
				//check if team 2 is selected team give this game its own row
			  	else if (j ===0 && item[0].team2 === this.props.team) {
			  		let t1res = item[0].team2score - item[0].team1score
					if (item[2] === this.props.selectedEvents[0]) {
						node = (
					        <tr key={item[1]}>
					        	<td>{this.props.resolveTeamName(item[0].team1)} (A)</td>
					        	<td className={t1res >= 1 ? "success" : t1res === 0 ? "warning" : t1res <= 1 ? "danger" : null}>{item[0].team1score} - {item[0].team2score}</td>
					        	<td></td>
					        </tr>
		  				)
					}
					else if (item[2] === this.props.selectedEvents[1]) {			
						node = (
					        <tr key={item[1]}>
					        	<td>{this.props.resolveTeamName(item[0].team1)} (A)</td>
					        	<td></td>
					        	<td className={t1res >= 1 ? "success" : t1res === 0 ? "warning" : t1res <= 1 ? "danger" : null}>{item[0].team1score} - {item[0].team2score}</td>
					        </tr>		
					    )					
					}
				}
			}			
			
			//check to see if dupe node, push if not
			this.state.outerNodes.forEach((outerNode) => {
				if (!outerNode.includes(node)){
					contentNodes.push(node)
				}
			})
			i++
			// console.log("j="+j)
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
		{this.props.selectedEvents.length === 1 ? this.makeSingleTable(this.props.tableContent) : null}
		{this.props.selectedEvents.length === 2 ? this.makeRows(this.props.tableContent) : null}
		if (this.state.outerNodes.length !== this.props.selectedEvents.length) {
      		return this.renderLoading()
   		}
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