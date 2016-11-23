import React from "react"
import EventsContainer from "../containers/EventsContainer"

export default class TeamsContent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTeam: 0,
      isShowingTeams: false,
    };
  }

  setTeam(index) {
    this.setState({ selectedTeam: index })
  }

  showTeams() {
    this.setState({ isShowingTeams: !this.state.isShowingTeams })
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
        	<div onClick={() => {this.setTeam(item.id); this.showTeams()}}>{item.title}</div>
        </div>
      )
      contentNodes.push(node)
    })

    let sortedNodes = contentNodes.sort(this.compareKeys)

    return (
      <div>
        <button className="btn btn-default" onClick={() => this.showTeams()}>select a team</button>
        {this.state.isShowingTeams === true ? sortedNodes.map((node) => node) : null}
        <EventsContainer teams={this.props.content} 
                            selectedTeam={this.state.selectedTeam}
        />
      </div>
    )
  }
}