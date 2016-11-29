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

  resolveEventName(event) {
    let eventName = null
    this.props.content.forEach((item) => {
      if (event === item.key) {
        eventName = item.title
      }
    })
    return eventName
  }

  resolveTeamName(teamid) {
    let teamName = null
    this.props.teams.forEach((team) => {
      if (team.id == teamid) {
        teamName = team.title
      }
    })
    return teamName
  }

  renderNoEvents() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-xs-12">
            <p>No events found for your selected team :( please consider contributing match data at <a href="https://github.com/openfootball" target="_blank">https://github.com/openfootball</a></p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    let contentNodes = []
    let eventNodes =  this.filterEventsByTeam(this.props.selectedTeam)
    eventNodes.forEach((item) => {
      let res = this.resolveEventName(item)
      let node = (
        <li>
            <button className={this.state.selectedEvents && this.state.selectedEvents[0] === item ? "btn btn-success" :
                               this.state.selectedEvents && this.state.selectedEvents[1] === item ? "btn btn-info" : 
                               "btn btn-default"} 
                    onClick={() => this.setEvent(item)} 
                    key={item}>
                    {res}

            </button>
        </li>
      )
      contentNodes.push(node)
    })
    return (
      <div>
        { this.props.selectedTeam ? <p>return to <a className="clickable" onClick={() => {this.props.setTeam(0); this.props.showTeams(); this.props.hideCountries()}}>{this.props.selectedCountry}</a></p> : null}
        <p><b>{this.resolveTeamName(this.props.selectedTeam)}</b></p>
        <div>{contentNodes.length === 0 && this.props.selectedTeam ? this.renderNoEvents() : null}</div>
        <div>
          <ul>
            {contentNodes.map((node) => {
              return node
            })}
          </ul>
        </div>
        { this.state.selectedEvents ? 
          <GamesContainer 
            key={this.state.selectedEvents} 
            team={this.props.selectedTeam} 
            selectedEvents={this.state.selectedEvents} 
            teams={this.props.teams}
            resolveEventName={this.resolveEventName.bind(this)} 
            resolveTeamName={this.resolveTeamName.bind(this)} /> 
        : null}
      </div>
    )
  }
}