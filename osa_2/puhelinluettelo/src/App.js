import React from 'react'
import personService from './services/persons'
import './App.css'
import Form from './components/Form'
import Persons from './components/Persons'
import SearchField from './components/SearchField'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      message: null
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response.data })
      })
  }

  confirmDelete = (id) => {
    return () => {
      const name = this.state.persons.find(p => p.id === id).name
      if (window.confirm(`poistetaanko ${name}?`)) {
        this.deleteName(id)
      }
    }
  }
  deleteName = (id) => {
    const name = this.state.persons.find(p => p.id === id).name
    personService
      .remove(id)
      .then(response => {
        this.setState({
          persons: this.state.persons.filter(p => p.id !== id),
          message: `poistettiin ${name}`
        })
        setTimeout(() => {
          this.setState({ message: null })
        }, 5000)
      })
  }
  handleChange = (event, t) => {
    this.setState({ [t]: event.target.value })
  }

  filterNumber = (event) => {
    event.preventDefault()
    this.setState({ filter: this.state.filterText })
  }

  addNumber = (event) => {
    event.preventDefault()
    const nameObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    const nameExists = () => (
      this.state.persons.some(p =>
        p.name.toLowerCase() === this.state.newName.toLowerCase())
    )

    if (!nameExists()) {

      personService
        .create(nameObject)
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(response.data),
            message: `lisättiin ${this.state.newName}`,
            newName: '',
            newNumber: ''
          })
          setTimeout(() => {
            this.setState({ message: null })
          }, 5000)
        })
    } else {
      return this.changeNumber()
    }
  }

  changeNumber = () => {
    if (window.confirm('Muutetaanko henkilön ' + this.state.newName + ' numero')) {
      const person = this.state.persons.find(p => p.name === this.state.newName)
      const changedPerson = { ...person, number: this.state.newNumber }
      personService
        .update(person.id, changedPerson)
        .then(response => {
          this.setState({
            persons: this.state.persons
              .map(p => p.id !== person.id ? person : changedPerson),
            message: `muutettiin henkilön ${this.state.newName} numeroa`,
            newName: '',
            newNumber: ''
          })
          setTimeout(() => {
            this.setState({ message: null })
          }, 5000)
        })
    }
  }
  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.message} />
        <SearchField
          onChange={(e) => this.handleChange(e, 'filter')}
        />
        <h3>Lisää uusi</h3>
        <Form
          addNumber={this.addNumber}
          inputs={[
            {
              "name": "nimi",
              "value": this.state.newName,
              "onChange": (e) => this.handleChange(e, 'newName')
            },
            {
              "name": "numero",
              "value": this.state.newNumber,
              "onChange": (e) => this.handleChange(e, 'newNumber')
            }
          ]}
          bName={'lisää'}
        />
        <h2>Numerot</h2>
        <Persons deleteName={this.confirmDelete} persons={this.state.persons} filter={this.state.filter} />
      </div>
    )
  }
}

export default App
