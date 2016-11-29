import React from "react"
import EventsContainer from "../containers/EventsContainer"

export default class TeamsContent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTeam: 0,
      isShowingTeams: true,
      isShowingCountries: true,
      selectedCountry: 0,
      selectedLetter: null,
    };
  }

  setTeam(index) {
    this.setState({ selectedTeam: index })
  }

  setCountry(index) {
    this.setState({ selectedCountry: index })
  }

  setLetter(letter) {
    this.setState({ selectedLetter: letter })
  }

  showTeams() {
    this.setState({ isShowingTeams: true })
  }

  showCountries() {
    this.setState({ isShowingCountries: true })
  }

  hideTeams() {
    this.setState({ isShowingTeams: false })
  }

  hideCountries() {
    this.setState({ isShowingCountries: false })
  }

  compareKeys(a, b) {
    return a.key.localeCompare(b.key)
  }

  isInSelectedCountry(team) {
    let countryId = this.state.selectedCountry
    if (team.country_id === countryId) {
      return true
    }
  }

  beginsWithSelectedLetter(country) {
    let letter = this.state.selectedLetter
    let lowerCountry = country.name.toLowerCase()
    if (lowerCountry.startsWith(letter)) {
      return true
    }
  }

  resolveCountryName(country) {
    let countryName = null
    this.props.countries.forEach((item) => {
      if (country === item.id) {
        countryName = item.name
      }
    })
    return countryName
  }

  renderTeams(teams) {
    let teamNodes = []
    let filteredTeams = teams.filter(this.isInSelectedCountry.bind(this))
    filteredTeams.forEach((item) => {
    let node = (
      <div key={item.title}>
        <div className="clickable" onClick={() => {this.setTeam(item.id); this.hideTeams()}}>{item.title}</div>
      </div>
      )
      teamNodes.push(node)
    })

    let sortedTeamNodes = teamNodes.sort(this.compareKeys)
    return sortedTeamNodes
  }

  renderCountries(countries) {
    let countryNodes = []
    let filteredCountries = countries.filter(this.beginsWithSelectedLetter.bind(this))
    filteredCountries.forEach((item) => {
      let node = (
        <div key={item.name}>
          <div className="clickable" onClick={() => {this.setCountry(item.id); this.hideCountries(); this.showTeams()}}>{item.name}</div>
        </div>
      )
      countryNodes.push(node)
    })
    let sortedCountryNodes = countryNodes.sort(this.compareKeys)
    return sortedCountryNodes
  }

  renderLetters() {
    let letters = []
    let alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    alphabet.map((letter) => {
      let node = (
        <li key={letter}>
          <a className="clickable" onClick={() => {this.setLetter(letter); this.showCountries(); this.hideTeams()}}>{letter}</a>
        </li>
      )
      letters.push(node)
    })
    return letters
  }

  renderNoTeams() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-xs-12">
            <p>No teams found for your selected country :( please consider contributing match data at <a href="https://github.com/openfootball" target="_blank">https://github.com/openfootball</a></p>
          </div>
        </div>
      </div>
    )
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
    let sortedTeamNodes = []
    let sortedCountryNodes = [] 
    let letters = []
    if (this.state.selectedCountry === undefined || this.state.selectedTeam === undefined) {
      return this.renderLoading()
    }
    else {
      sortedTeamNodes = this.renderTeams(this.props.teams)
      sortedCountryNodes = this.renderCountries(this.props.countries) 
      letters = this.renderLetters()
    }

    return (
      <div>
        <nav><ul className="pagination">
        {letters.map((node) => node)}
        </ul></nav>
        <div>{this.state.isShowingTeams === true && sortedTeamNodes.length === 0 && this.state.selectedLetter ? this.renderNoTeams() : null}</div>
        <div>{this.state.isShowingCountries === true ? sortedCountryNodes.map((node) => node) : null}</div>
        <div>{this.state.isShowingTeams === true ? sortedTeamNodes.map((node) => node) : null}</div>
        <EventsContainer    
          teams={this.props.teams} 
          selectedTeam={this.state.selectedTeam}
          showTeams={this.showTeams.bind(this)}
          hideCountries={this.hideCountries.bind(this)}
          selectedCountry={this.resolveCountryName(this.state.selectedCountry)}
        />
      </div>
    )
  }
}