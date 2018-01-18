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
        <Osa osa={props.osa1} t={props.t1}/>
        <Osa osa={props.osa2} t={props.t2}/>
        <Osa osa={props.osa3} t={props.t3}/>
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
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = 'Reactin perusteet'
  const tehtavia1 = 10
  const osa2 = 'Tiedonvälitys propseilla'
  const tehtavia2 = 7
  const osa3 = 'Komponenttien tila'
  const tehtavia3 = 14

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto osa1={osa1} t1={tehtavia1} osa2={osa2} t2={tehtavia2} osa3={osa3} t3={tehtavia3} />
      <Yhteensa t1={tehtavia1} t2={tehtavia2} t3={tehtavia3} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
