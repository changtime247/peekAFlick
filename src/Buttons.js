import React from 'react'
import { useGlobalContext } from './context'

const Buttons = () => {
  const { isLoading, page, setPage, totalPages } = useGlobalContext()

  const handleClick = (str) => {
    if (str === 'dec') {
      if (page > 2) {
        setPage(+(page - 1))
      } else {
        setPage(1)
      }
    } else if (str === 'inc') {
      if (page + 1 <= totalPages) {
        setPage(+(page + 1))
      } else {
        setPage(totalPages)
      }
    }
  }

  return (
    <div className='btn-container'>
      <button
        disabled={isLoading}
        className='btn'
        onClick={() => handleClick('dec')}
      >
        prev
      </button>
      <p>
        Page {page} of {totalPages}
      </p>
      <button
        disabled={isLoading}
        className='btn'
        onClick={() => handleClick('inc')}
      >
        next
      </button>
    </div>
  )
}

export default Buttons
