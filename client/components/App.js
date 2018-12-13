import React, { Component } from 'react'

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      longitude: '',
      latitude: '',
      ninjas: [],
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLatitudeChange = this.handleLatitudeChange.bind(this);
    this.handleLongitudeChange = this.handleLongitudeChange.bind(this);
    this.showAllNinjas = this.showAllNinjas.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch(`/api/ninjas?lng=${this.state.longitude}&lat=${this.state.latitude}`)
      .then(data => data.json())
      .then(data => (console.log(data), this.setState({ ninjas: data })));
  }

  handleLatitudeChange(e) {
    this.setState({ latitude: e.target.value });
  }

  handleLongitudeChange(e) {
    this.setState({ longitude: e.target.value });
  }

  showAllNinjas () {
    fetch('/api/ninjas')
      .then(data => data.json())
      .then(json => (console.log(json), this.setState({ ninjas: json, longitude: '', latitude: '' })));
  }
  
  render() {
    const { ninjas } = this.state;
    return (
      <div id="ninj-container">
        <form id="search" onSubmit={this.handleSubmit}>
          <label>Enter your Latitude</label>
          <input type="text" placeholder="Latitude" value={this.state.latitude} onChange={this.handleLatitudeChange} required />
          <label>Enter your Longitude</label>
          <input type="text" placeholder="Longitude" value={this.state.longitude} onChange={this.handleLongitudeChange} required />
          <input type="submit" value="Find Ninjas"/>
          </form>
          <button id="showAll" onClick={this.showAllNinjas}>Show all Ninjas</button>
        <ul>
          {
            ninjas.map(ninja => 
              <li key={ninja._id}>
                <span className={ninja.available ? "true" : "false"}></span>
                <span className="name">Name: {ninja.name}</span>
                <span className="rank">{ninja.rank}</span>
                {ninja.dis && <span className="dist">{Math.floor(ninja.dis / 1000)}km</span>}
              </li>
            )
          }
        </ul>
      </div>
    )
  }
}
