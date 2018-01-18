import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }
    lisaaHyva = () => {
        this.setState({hyva: this.state.hyva + 1})
    }

    lisaaNeutraali = () => {
        this.setState({neutraali: this.state.neutraali + 1})
    }

    lisaaHuono = () => {
        this.setState({huono: this.state.huono + 1})
    }

    render() {
        return (
            <div>
                <h1>Anna palautetta</h1>
                <div>
                    <Button
                        handleClick={this.lisaaHyva}
                        text="hyvä"
                    />
                    <Button
                        handleClick={this.lisaaNeutraali}
                        text="neutraali"
                    />
                    <Button
                        handleClick={this.lisaaHuono}
                        text="huono"
                    />
                </div>

                <h1>statistiikka</h1>
                <div>Hyvä: {this.state.hyva}</div>
                <div>Neutraali: {this.state.neutraali}</div>
                <div>Huono: {this.state.huono}</div>

            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
