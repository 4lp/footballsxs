import React from "react"
import EventsContainer from "../containers/EventsContainer"

export default class TeamsContent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTeam: 0,
      isShowingTeams: true,
      isShowingCountries: true,
      isShowingLetters: false,
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

  showLetters() {
    this.setState({ isShowingLetters: true })
  }

  hideTeams() {
    this.setState({ isShowingTeams: false })
  }

  hideCountries() {
    this.setState({ isShowingCountries: false })
  }

  hideLetters() {
    this.setState({ isShowingLetters: false })
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

  renderTeams(teams) {
    let teamNodes = []
    let filteredTeams = teams.filter(this.isInSelectedCountry.bind(this))
    filteredTeams.forEach((item) => {
    let node = (
      <div key={item.title}>
        <div onClick={() => {this.setTeam(item.id); this.hideTeams()}}>{item.title}</div>
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
          <div onClick={() => {this.setCountry(item.id); this.hideCountries(); this.showTeams()}}>{item.name}</div>
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
        <div key={letter}>
          <div onClick={() => {this.setLetter(letter); this.hideLetters(); this.showCountries()}}>{letter}</div>
        </div>
      )
      letters.push(node)
    })
    return letters
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
        <button className="btn btn-default" onClick={() => {this.showLetters(); this.hideCountries(); this.hideTeams()}}>select a team</button>
        {this.state.isShowingLetters === true ? letters.map((node) => node) : null}
        {this.state.isShowingCountries === true ? sortedCountryNodes.map((node) => node) : null}
        {this.state.isShowingTeams === true ? sortedTeamNodes.map((node) => node) : null}
        <EventsContainer    teams={this.props.teams} 
                            selectedTeam={this.state.selectedTeam}
        />
      </div>
    )
  }
}