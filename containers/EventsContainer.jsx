import React from "react"
import * as eventsActions from '../actions/eventsActions'
import * as eventTeamsActions from '../actions/eventTeamsActions'
import EventsContent from '../components/EventsContent'
import { connect } from "react-redux"

@connect(state => ({
  events: state.events,
  eventTeams: state.eventTeams
}))

export default class EventsContainer extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        eventTeams: undefined,
      };
  }

  componentDidMount() {
    let {dispatch, events, eventTeams} = this.props
      if (!events.isLoadingEvents && events.content === undefined) {
          dispatch(eventsActions.fetchEvents())
          .then(() => {
            dispatch(eventTeamsActions.fetchEventTeams())
       })}
  }

  renderLoading() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-xs-12">
            Loading...
          </div>
        </div>
      </div>
    )
  }

  render() {
    let {events, eventTeams, selectedTeam} = this.props
    if (eventTeams.isLoadingEventTeams || eventTeams.content === undefined) {
      return this.renderLoading()
    }
    return (
    	<div>
          {events.content !== undefined && eventTeams.content !== undefined &&
          <EventsContent 
            key={selectedTeam} 
            content={events.content} 
            eventTeams={eventTeams} 
            selectedTeam={selectedTeam} 
            teams={this.props.teams}
            showTeams={this.props.showTeams}
            setTeam={this.props.setTeam}
            hideCountries={this.props.hideCountries}
            selectedCountry={this.props.selectedCountry} />
          }
        </div>
    )
  }
}
