import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({handleClick, text}) => (
    <button onClick={handleClick} className="button">
        {text}
    </button>
)

const Statistic = ({name, value}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{value}</td>
        </tr>

    )
}

const Statistics = (props) => {
    if (props.arvosanaMaara === 0) {
        return 'ei yhtään palautetta annettu'
    }

    return (
        <table>
            <tbody>
                <Statistic name={props.name3} value={props.value3} />
                <Statistic name={props.name4} value={props.value4} />
                <Statistic name={props.name5} value={props.value5} />
                <Statistic name={props.name1} value={props.value1} />
                <Statistic name={props.name2} value={props.value2} />
            </tbody>
        </table>

    )
}


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
        }

    }
    lisaa = (target) => {

        return () => {this.setState({[target]: this.state[target] + 1})}
    }

    keskiarvo = () => {
        let arvosanaSumma = this.state.hyva + this.state.huono*(-1)
        let arvosanaMaara = this.state.hyva + this.state.huono + this.state.neutraali
        if (arvosanaSumma === 0) {
            return 0
        }
        return (arvosanaSumma/arvosanaMaara).toFixed(2)
    }

    positiivisia = () => {
        let arvosanaMaara = this.state.hyva + this.state.huono + this.state.neutraali
        if (arvosanaMaara === 0) {
            return '0%'
        }
        return ((this.state.hyva/arvosanaMaara) * 100).toFixed(2) + '%'
    }

    render() {
        return (
            <div className="root">
                <h1>Anna palautetta</h1>
                <div>
                    <Button
                        handleClick={this.lisaa("hyva")}
                        text="hyvä"
                    />
                    <Button
                        handleClick={this.lisaa("neutraali")}
                        text="neutraali"
                    />
                    <Button
                        handleClick={this.lisaa("huono")}
                        text="huono"
                    />
                </div>

                <h1>statistiikka</h1>
                <Statistics arvosanaMaara={this.state.hyva + this.state.huono + this.state.neutraali}
                    name1="Keskiarvo" value1={this.keskiarvo()}
                    name2="Positiivisia" value2={this.positiivisia()}
                    name3="Hyvä" value3={this.state.hyva}
                    name4="Neutraali" value4={this.state.neutraali}
                    name5="Huono" value5={this.state.huono}
                />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

