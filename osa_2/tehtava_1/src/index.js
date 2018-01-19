import React from 'react'
import ReactDOM from 'react-dom'

const Kurssi = ({kurssi}) => {
    return (
    <div>
        <h1>{kurssi.nimi}</h1>
        <Osat kurssi={kurssi} />
        <Yhteensa kurssi={kurssi} />
    </div>
    )

}

const Osat = ({kurssi}) => (
    <div>
        {kurssi.osat.map(osa =><p key={osa.id}>{osa.nimi + ' ' + osa.tehtavia}</p>)}
    </div>
)

const Yhteensa = ({kurssi}) => {
    const tehtavat = kurssi.osat.map(osa => osa.tehtavia)
    const yhteensa = tehtavat.reduce((a ,c) => a + c)
    return (
        <div>yhteensä {yhteensa} tehtävää</div>
    )
}



const App = () => {
    const kurssit = [
        {
        nimi: 'Half Stack -sovelluskehitys',
        id: 1,
            osat: [
                {
                nimi: 'Reactin perusteet',
                tehtavia: 10,
                id: 1
                },
                {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7,
                id: 2
                },
                {
                nimi: 'Komponenttien tila',
                tehtavia: 14,
                id: 3
                }
            ]
        },
        {
            nimi: 'Node.js',
            id: 2,
            osat: [
              {
                nimi: 'Routing',
                tehtavia: 3,
                id: 1
              },
              {
                nimi: 'Middlewaret',
                tehtavia: 7,
                id: 2
              }
            ]
        }

    ]

    return (
        <div>
            <h1>Opetusohjelma</h1>
            <Kurssi kurssi={kurssit[0]} />
            <Kurssi kurssi={kurssit[1]} />
        </div>
    )
  }

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
