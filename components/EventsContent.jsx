import React from "react"
import GamesContainer from "../containers/gamesContainer"

export default class EventsContent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedEvent: "",
    };
  }

  setEvent(index) {
    this.setState({ selectedEvent: index })
  }

  filterEventsByTeam(teamid) {
    let eventArr = []
    for (let i = 0, len = this.props.eventTeams.eventTeams.length; i < len; i++) {
      for (let j = 0, leng = this.props.eventTeams.eventTeams[i].teams.length; j < leng; j++) {
        if(this.props.eventTeams.eventTeams[i].teams[j].id === teamid) {
          eventArr.push(this.props.eventTeams.eventTeams[i].key)
        }
      }
    }
  return eventArr
  }

  render() {
    let contentNodes = []
    let eventNodes =  this.filterEventsByTeam(this.props.selectedTeam)
    //Translates league keys to human readable format ONLY FOR ENGLISH LEAGUES SO FAR - wrap in switch statement for res[0] === "en", "at", "es"...
    eventNodes.forEach((item) => {
      let res = item.split(".")
      if (res.length === 2) {
        res[2] = res [1]
        res[1] = "Premier League"
      }
      else if (res[1] === "2") {
        res[1] = "Championship"
      }
      else if (res[1] === "3") {
        res[1] = "League 1"
      }
      else if (res[1] === "4") {
        res[1] = "League 2"
      }

      let node = (
        <li onClick={() => this.setEvent(item)}>{res[1]} {res[2]}</li>
      )
      contentNodes.push(node)
    })
    return (
      <div>
        <p>selected team = {this.props.selectedTeam}</p>
        <div>
          events = 
          <ul>
            {contentNodes}
          </ul>
        </div>
        { this.state.selectedEvent ? <GamesContainer team={this.props.selectedTeam} event={this.state.selectedEvent} teams={this.props.teams} /> : null}
      </div>
    )
  }
}