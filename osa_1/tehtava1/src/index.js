import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
    <div>
        <p>{props.otsikko}</p>
    </div>
    )
}

const Osa = (props) => {
    return (
    <div>
        <p>{props.osa} {props.t}</p>
    </div>
    )
}

const Sisalto = (props) => {
    return (
    <div>
        <Osa osa={props.osat[0].nimi} t={props.osat[0].tehtavia}/>
        <Osa osa={props.osat[1].nimi} t={props.osat[1].tehtavia}/>
        <Osa osa={props.osat[2].nimi} t={props.osat[2].tehtavia}/>
    </div>
    )
}

const Yhteensa = (props) => {
    return (
    <div>
        <p>yhteensä {props.t1 + props.t2 + props.t3} tehtävää</p>
    </div>
    )
}

const App = () => {

    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10
            },

            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7

            },

            {
                nimi: 'Komponenttien tila',
                tehtavia: 14
            }
        ]
    }

    return (
        <div>
        <Otsikko kurssi={kurssi.nimi} />
        <Sisalto osat={kurssi.osat} />
        <Yhteensa t1={kurssi.osat[0].tehtavia} t2={kurssi.osat[0].tehtavia} t3={kurssi.osat[0].tehtavia} />
        </div>
    )
    }

    ReactDOM.render(
    <App />,
    document.getElementById('root')
    )
