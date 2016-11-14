import React from "react"
import EventsContainer from "../containers/EventsContainer"

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
      <div><EventsContainer selectedTeam={this.state.selectedTeam}/>{contentNodes}</div>
    )
  }
}