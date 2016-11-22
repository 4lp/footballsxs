import React from "react"
import GamesContainer from "../containers/gamesContainer"

export default class EventsContent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedEvents: undefined,
    };
  }

  setEvent(index) {
    if (this.state.selectedEvents == undefined) {
      let selectedEvents = []
      selectedEvents.push(index)
      this.setState({ selectedEvents: selectedEvents })
    } 
    else if (this.state.selectedEvents.includes(index)) {
      let num = this.state.selectedEvents.indexOf(index)
      let selectedEvents = []
      selectedEvents = this.state.selectedEvents
      selectedEvents.splice(num, 1)
      this.setState({ selectedEvents: selectedEvents })
    }
    else if (this.state.selectedEvents.length < 2) {
      let selectedEvents = []
      selectedEvents = this.state.selectedEvents
      selectedEvents.push(index)
      this.setState({ selectedEvents: selectedEvents })
    }
    else {
      let selectedEvents =  []
      selectedEvents = this.state.selectedEvents
      selectedEvents.pop()
      selectedEvents.push(index)
      this.setState({ selectedEvents: selectedEvents })
    }
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

  resolveEventName(events) {
    events.forEach((item) => {
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

      return res
    })
  }


  render() {
    let contentNodes = []
    let eventNodes =  this.filterEventsByTeam(this.props.selectedTeam)
    //Translates league keys to human readable format ONLY FOR ENGLISH LEAGUES SO FAR - wrap in switch statement for res[0] === "en", "at", "es"...
    //This needs to be split off, turned into function, passed down as props
    // let res = this.resolveEventName(eventNodes)
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
        <li onClick={() => this.setEvent(item)} key={item}>{res[1]} {res[2]}</li>
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
        { this.state.selectedEvents ? <GamesContainer key={this.state.selectedEvents} team={this.props.selectedTeam} selectedEvents={this.state.selectedEvents} teams={this.props.teams} /> : null}
      </div>
    )
  }
}