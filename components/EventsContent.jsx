import React from "react"

export default class EventsContent extends React.Component {
  filterEventsByTeam(teamid) {
    let eventArr = []
    for (let i = 0, len = this.props.eventTeams.eventTeams.length; i < len; i++) {
      for (let j = 0, leng = this.props.eventTeams.eventTeams[i].teams.length; j < leng; j++) {
        if(this.props.eventTeams.eventTeams[i].teams[j].id === teamid) {
          eventArr.push(this.props.eventTeams.eventTeams[i].key)
        return eventArr
        console.log(eventArr)
        }
      }
    }
  }

  render() {
    let contentNodes = []
    this.props.content.forEach((item, index) => {
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
      <div>
        <p>selected team = {this.props.selectedTeam}</p>
        <p>events = {this.filterEventsByTeam(this.props.selectedTeam)}</p>
      </div>
    )
  }
}