import React from "react"

export default class GamesContent extends React.Component {
  render() {
    let {content} = this.props
    let contentNodes = []
    content.forEach((item, index) => {
      let node = (
        <div key={item.id}>
        	<p>{item.id}{item.team1}{item.team2}{item.team1score}{item.team2score}</p>
        </div>
      )
      contentNodes.push(node)
    })
    return (
      <div>{contentNodes}</div>
    )
  }
}