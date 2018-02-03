import React from 'react'
import Button from './Button'


const Input = ({ name, onChange, value }) => (
  <div>
    {name}:
    <input value={value} onChange={onChange} />
  </div>
)

const Inputs = ({ contents }) => (
  <div>
    {contents.map((c,i) => <Input key={i} name={c.name} onChange={c.onChange} value={c.value}/>)}
  </div>
)

const Form = (props) => (
  <form onSubmit={props.addNumber}>
    <Inputs contents={props.inputs} />
    <Button name={props.bName} type={'submit'} />
  </form>
)



export default Form
