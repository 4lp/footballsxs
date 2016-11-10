import React from "react"

export default class GamesContent extends React.Component {
  render() {
    let {content} = this.props
    let contentNodes = []
    content.games.forEach((item, index) => {
      let node = (
        <div key={item.id}>
        	<ul>
        	<li>game={item.id}</li>
        	<li>team1={item.team1}</li>
        	<li>team2={item.team2}</li>
        	<li>team1score={item.team1score}</li>
        	<li>team2score={item.team2score}</li>
        	</ul>
        </div>
      )
      contentNodes.push(node)
    })
    return (
      <div>{contentNodes}</div>
    )
  }
}