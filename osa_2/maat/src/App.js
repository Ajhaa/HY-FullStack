import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const Countries = ({ countries, filter, onClick }) => {
  const filtered = countries.filter(c => c.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
  if (filtered.length > 10) {
    return <div>Too many matches</div>
  } else if (filtered.length ==1 ){
    return(
      <div>
        <p>{filtered[0].name}</p>
        <p>capital: {filtered[0].capital}</p>
        <p>population: {filtered[0].population}</p>
        <img src={filtered[0].flag } height="250" />
      </div>
    )
  } else {
    return filtered.map(f => <div onClick={onClick(f.name)}>{f.name}</div>)
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  handleFilter = (event) => {
    this.setState({ filter: event.target.value })
  }

  handleClick = (id) => {
    return () => {this.setState({filter: id})}
  }

  render() {
    return (
      <div>
        <h1>Maahaku</h1>
        <input onChange={this.handleFilter} />
        <Countries onClick={this.handleClick} filter={this.state.filter} countries={this.state.countries} />
      </div>
    )
  }
}

export default App
