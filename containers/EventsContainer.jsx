import React from "react"
import * as eventsActions from '../actions/eventsActions'
import EventsContent from '../components/EventsContent'
import { connect } from "react-redux"

@connect(state => ({
  events: state.events
}))

export default class EventsContainer extends React.Component {
  componentDidMount() {
    let {dispatch, events} = this.props
    if (!events.isLoadingEvents && events.content === undefined) {
      dispatch(eventsActions.fetchEvents())
    }
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
