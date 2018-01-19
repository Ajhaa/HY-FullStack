import React from 'react'
import ReactDOM from 'react-dom'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            maxIndex: 0,
            maxValue: 0,
            votes: [0,0,0,0,0,0]
        }
    }

    randomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max))
    }

    changeState = (value) => {
        return () => {this.setState({selected: value})}
    }

    indexOfMax = (arr) => {

        let max = arr[this.state.maxIndex]
        let maxIndex = this.state.maxIndex
        //console.log(max)
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > max) {
                maxIndex = i
                max = arr[i]
            }
        }

        this.changeMax(maxIndex)
        return maxIndex
    }

    changeMax = (value) => {
        return () => {
            this.setState({maxIndex: value})
        }
    }

    vote = () => {
        return () => {
            let x = this.state.selected
            let cp = this.state.votes
            cp[x] = cp[x] + 1
            this.setState({votes: cp})
        }
    }




    render() {
        return (

            <div>
                <div>
                    {this.props.anecdotes[this.state.selected]}
                </div>
                <div>
                    has {this.state.votes[this.state.selected]} votes
                </div>
                <div>
                    <button onClick={this.changeState(this.randomInt(5))}>
                        next anecdote
                    </button>
                    <button onClick={this.vote()}>
                        vote
                    </button>
                </div>
                <h1>anecdote with most votes</h1>
                <div>
                    <p>{this.props.anecdotes[this.indexOfMax(this.state.votes)]}</p>
                    <p>has {this.state.votes[this.indexOfMax(this.state.votes)]} votes</p>
                </div>


            </div>
        )
    }
}



const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
