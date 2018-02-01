import React from 'react'
import axios from 'axios'

const Button = ({ onClick, name, type }) => (
  <button onClick={onClick} type={type}>{name}</button>
)

const Input = ({ name, onChange, value }) => (
  <div>
    {name}:
    <input value={value} onChange={onChange} />
  </div>
)

const Persons = ({ persons, filter, deleteName }) => (
  <table>
    <tbody>
      {persons.filter(p => p.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
        .map(f =>
          <tr key={f.id}>

            <td>{f.name + ' ' + f.number}</td>
            <td><Button onClick={deleteName(f.id)} name={"poista"} type={"button"} /></td>

          </tr>
        )}
    </tbody>
  </table>
)


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      filterText: ''
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/persons')
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
    let url = `http://localhost:3001/persons/${id}`
    axios
      .delete(url)
      .then(response => {
        this.setState({ persons: this.state.persons.filter(p => p.id !== id) })
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
      axios
        .post('http://localhost:3001/persons', nameObject)
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(response.data),
            newName: '',
            newNumber: ''
          })
        })
    } else {
      return this.changeNumber()
    }
  }

  changeNumber = () => {
    if (window.confirm('Muutetaanko henkilön ' + this.state.newName + ' numero')) {
      const person = this.state.persons.find(p => p.name === this.state.newName)
      const changedPerson = { ...person, number: this.state.newNumber }
      axios
        .put(`http://localhost:3001/persons/${person.id}`, changedPerson)
        .then(response => {
          this.setState({
            persons: this.state.persons
              .map(p => p.id !== person.id ? person : changedPerson)
          })
        })
    }
  }
  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <input onChange={(e) => this.handleChange(e, 'filterText')} />
        <Button type={'button'} onClick={this.filterNumber} name={'hae'} />
        <h3>Lisää uusi</h3>
        <form onSubmit={this.addNumber}>
          <Input
            name={'nimi'}
            value={this.state.newName}
            onChange={(e) => this.handleChange(e, 'newName')}
          />
          <Input
            name={'numero'}
            value={this.state.newNumber}
            onChange={(e) => this.handleChange(e, 'newNumber')}
          />
          <Button name={'lisää'} type={'submit'} />
        </form>
        <h2>Numerot</h2>

        <Persons deleteName={this.confirmDelete} persons={this.state.persons} filter={this.state.filter} />
      </div>
    )
  }
}

export default App
