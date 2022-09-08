import React, { useState, useEffect } from 'react'
import { apiKey } from './context'
let url = 'https://api.themoviedb.org/3/'

const useFetch = (urlParams, page) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState({ show: false, msg: '' })
  const [data, setData] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchMovies = async (url, page) => {
    setIsLoading(true)

    try {
      if (urlParams > 0) {
        url += `movie/${urlParams}?api_key=${apiKey}&language=en-US`
        const response = await fetch(url)
        const data = await response.json()
        if (data.id) {
          setData(data.results || data)
          setError({ show: false, msg: '' })
        } else if (!data.results && !data.errors) {
          setError({ show: true, msg: 'type something above' })
        } else if (data.errors) {
          setError({ show: true, msg: 'something went wrong' })
        }
      } else {
        url += `search/movie?api_key=${apiKey}&language=en-US&query=${urlParams}&page=${page}&include_adult=false`
        const response = await fetch(url)
        const data = await response.json()
        setCurrentPage(data.page)
        setTotalPages(data.total_pages)
        if (data.total_results > 0) {
          setData(data.results || data)
          setError({ show: false, msg: '' })
        } else if (data.total_results === 0) {
          setError({ show: true, msg: 'no results' })
          setData([])
        } else {
          setError({ show: true, msg: 'type something above' })
        }
      }

      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMovies(url, page)
  }, [urlParams, page])

  return { isLoading, error, data, currentPage, totalPages }
}

export default useFetch
