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

  compareKeys(a, b) {
    return a.key.localeCompare(b.key)
  }

  render() {
    let {content} = this.props
    let contentNodes = []
    content.forEach((item) => {
      let node = (
        <div key={item.title}>
        	<div onClick={() => this.setTeam(item.id)}>{item.title}</div>
        </div>
      )
      contentNodes.push(node)
    })

    let sortedNodes = contentNodes.sort(this.compareKeys)

    return (
      <div>
        {sortedNodes.map((node) =>{
          return node
        })}
        <EventsContainer teams={this.props.content} 
                            selectedTeam={this.state.selectedTeam}
        />
      </div>
    )
  }
}