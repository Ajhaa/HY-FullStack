import React from 'react'
import axios from 'axios'

const Button = ({ name, type }) => (
  <button type={type}>{name}</button>
)

const Input = ({ name, onChange, value }) => (
  <div>
    {name}:
    <input value={value} onChange={onChange} />
  </div>
)

const Persons = ({ persons, filter }) => (
  <div>
    {persons.filter(p => p.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1).map(f => <p key={f.id}>{f.name + ' ' + f.number}</p>)}
  </div>
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
      this.setState({ newName: '', newNumber: '' })
    }
  }
  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <input onChange={(e) => this.handleChange(e, 'filterText')} />
        <button type="button" onClick={this.filterNumber}>hae</button>
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
        <Persons persons={this.state.persons} filter={this.state.filter} />
      </div>
    )
  }
}

export default App
