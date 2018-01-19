import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        {
          id: 1,
          name: 'Arto Hellas'
        }
      ],
      newName: 'lul'
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  addNumber = (event) => {
    event.preventDefault()
    const nameObject = {
      name: this.state.newName,
      id: this.state.persons.length + 1
    }
    const contains = this.state.persons.some(p =>
      p.name.toLowerCase() === this.state.newName.toLowerCase()
    )

    const persons = this.state.persons.concat(nameObject)
    if (!contains) {
      this.setState({
        persons: persons,
        newName: ''
      })
    } else {
      this.setState({ newName: '' })
    }
  }
  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addNumber}>
          <div>
            nimi:
            <input
              value={this.state.newName}
              onChange={this.handleNameChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        {this.state.persons.map(person => <p key={person.id}>{person.name}</p>)}
      </div>
    )
  }
}

export default App
