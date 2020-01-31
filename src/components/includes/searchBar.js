import React from 'react'
import { useHistory } from 'react-router-dom'

function SearchBar() {
  let history = useHistory()

  function handleClick() {
    history.push(`/search?search=${document.querySelector('.input-search').value}`)
  }

  return (
    <div className="search-form">
      <form
        action="/search"
        method="get"
        onSubmit={e => {
          e.preventDefault()
        }}
      >
        <input className="form-control input-search" placeholder="Search and hit enter..." />
        <button onClick={handleClick}>
          <i className="fa fa-search"></i>
        </button>
      </form>
    </div>
  )
}
export default SearchBar
