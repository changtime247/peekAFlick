import React from 'react'
import { useGlobalContext } from './context'

const SearchForm = () => {
  const { query, setQuery, setPage, error, theme, toggleTheme } =
    useGlobalContext()

  return (
    <>
      <form className='search-form' onSubmit={(e) => e.preventDefault()}>
        <button className='btn toggleTheme' onClick={toggleTheme}>
          {theme === 'light-theme' ? 'light off' : 'light on'}
        </button>
        <h3>Search and preview movies</h3>
        <input
          type='text'
          className='form-input'
          value={query}
          onChange={(e) => {
            setPage(1)
            setQuery(e.target.value)
          }}
        />
        {error.show && <div className='error'>{error.msg}</div>}
      </form>
    </>
  )
}

export default SearchForm
