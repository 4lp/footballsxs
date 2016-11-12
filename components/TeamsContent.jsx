import React from "react"

export default class TeamsContent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTeam: 0,
    };
  }

  setTeam(index) {
    this.setState({ selectedTeam: index })
  }

  render() {
    let {content} = this.props
    let contentNodes = []
    content.forEach((item) => {
      let node = (
        <div key={item.key}>
        	<div onClick={() => this.setTeam(item.id)}>{item.title}</div>
        </div>
      )
      contentNodes.push(node)
    })

    return (
      <div>{contentNodes}</div>
    )
  }
}