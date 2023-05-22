import React from 'react'

interface SearchBarProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBar = ({handleInputChange}: SearchBarProps) => {
  return (
    <input className='search-bar' placeholder='Search product' onChange={handleInputChange} />
  )
}

export default SearchBar