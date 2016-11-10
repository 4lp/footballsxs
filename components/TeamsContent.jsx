import React from "react"

export default class TeamsContent extends React.Component {
  render() {
    let {content} = this.props
    let contentNodes = []
    content.teams.forEach((item, index) => {
      let node = (
        <div key={item.key}>
        	<ul>
          <li>id={item.id}</li>
        	<li>key={item.key}</li>
        	<li>title={item.title}</li>
        	<li>code={item.code}</li>
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