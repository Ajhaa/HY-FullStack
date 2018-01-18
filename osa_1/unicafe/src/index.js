import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({handleClick, text}) => (
    <button onClick={handleClick} className="button">
        {text}
    </button>
)

const Statistic = ({name, value}) => {

    return <div>{name}: {value}</div>
}

const Statistics = (props) => {
    return (
        <div>
            <Statistic name={props.name1} value={props.value1} />
            <Statistic name={props.name2} value={props.value2} />
        </div>
    )
}


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

    keskiarvo = () => {
        let arvosanaSumma = this.state.hyva + this.state.huono*(-1)
        let arvosanaMaara = this.state.hyva + this.state.huono + this.state.neutraali
        if (arvosanaSumma === 0) {
            return 0
        }
        return arvosanaSumma/arvosanaMaara
    }

    positiivisia = () => {
        let arvosanaMaara = this.state.hyva + this.state.huono + this.state.neutraali
        if (arvosanaMaara === 0) {
            return 0 + '%'
        }
        return (this.state.hyva/arvosanaMaara) * 100 + '%'
    }

    render() {
        return (
            <div className="root">
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
                <Statistics
                    name1="Keskiarvo" value1={this.keskiarvo()}
                    name2="Positiivisia" value2={this.positiivisia()}
                />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

