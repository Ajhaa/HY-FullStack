import React from 'react'
import Button from './Button'

const SearchField = ({ onChange, onClick}) => (
  <div>
    <input onChange={onChange} />
    <Button type={'button'} onClick={onClick} name={'hae'} />
  </div>
)

export default SearchField
