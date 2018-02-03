import React from 'react'

const Button = ({ onClick, name, type }) => (
  <button onClick={onClick} type={type}>{name}</button>
)

export default Button
