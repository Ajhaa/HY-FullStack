import React from 'react'

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

export default Kurssi
