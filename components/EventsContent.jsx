import React from "react"

export default class EventsContent extends React.Component {
  render() {
    let {content} = this.props
    let contentNodes = []
    content.forEach((item, index) => {
      let node = (
        <div key={item.key}>
        	<ul>
        	<li>key={item.key}</li>
        	<li>title={item.title}</li>
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