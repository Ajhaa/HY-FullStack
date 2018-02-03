import React from 'react'
import Button from './Button'
const Persons = ({ persons, filter, deleteName }) => (
  <table>
    <tbody>
      {persons.filter(p => p.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
        .map(f =>
          <tr key={f.id}>

            <td>{f.name + ' ' + f.number}</td>
            <td><Button onClick={deleteName(f.id)} name={"poista"} type={"button"} /></td>

          </tr>
        )}
    </tbody>
  </table>
)

export default Persons
