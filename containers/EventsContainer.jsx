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
    let {events} = this.props
    if (events.isLoadingEvents || events.content === undefined) {
      return this.renderLoading()
    }
    return (
    	<div>
          {events.content !== undefined &&
          <EventsContent content={events.content} />
          }
        </div>
    )
  }
}
