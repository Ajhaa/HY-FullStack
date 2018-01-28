import React from 'react';

const SubmitButton = ({ name }) => (
  <button type="submit">{name}</button>
)


const Form = (props) => (
  <form onSubmit={props.onSubmit}>
    <input onChange={props.onChange} />
    <SubmitButton name={props.buttonName} />
  </form>
)

const Persons = ({ persons, filter }) => {
  console.log(filter)
  if (true) {
    return (
      <div>
        {persons.filter(p => p.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1).map(f => <p key={f.id}>{f.name + ' ' + f.number}</p>)}
      </div>
    )
  }
}



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Martti Tienari', number: '040-123456', id: 2 },
        { name: 'Arto Järvinen', number: '040-123456', id: 3 },
        { name: 'Lea Kutvonen', number: '040-123456', id: 4 }

      ],
      filtered: [],
      newName: '',
      newNumber: '',
      filter: '',
      filterText: ''
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilter = (event) => {

    this.setState({ filterText: event.target.value })
  }

  filterNumber = (event) => {
    event.preventDefault()

    /*const persons = this.state.persons
    const filtered = persons.filter(p => p.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) != -1) */
    this.setState({ filter: this.state.filterText })
  }


  addNumber = (event) => {
    event.preventDefault()
    const nameObject = {
      name: this.state.newName,
      number: this.state.newNumber,
      id: this.state.persons.length + 1
    }
    const contains = this.state.persons.some(p =>
      p.name.toLowerCase() === this.state.newName.toLowerCase()
    )

    const persons = this.state.persons.concat(nameObject)
    if (!contains) {
      this.setState({
        persons: persons,
        newName: '',
        newNumber: '',
      })
    } else {
      this.setState({ newName: '', newNumber: '' })
    }
  }
  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Form
          onSubmit={this.filterNumber}
          onChange={this.handleFilter}
          buttonName={"hae"}
        />
        <h3>Lisää uusi</h3>
        <form onSubmit={this.addNumber}>
          <div>
            nimi:
            <input
              value={this.state.newName}
              onSubmit={this.filterNumber}
              onChange={this.handleNameChange}
            />
          </div>
          <div>
            numero:
            <input
              value={this.state.newNumber}
              onChange={this.handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <Persons persons={this.state.persons} filter={this.state.filter} />
      </div>
    )
  }
}

export default App
