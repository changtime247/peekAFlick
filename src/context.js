import React, { useState, useContext, useEffect } from 'react'
import useFetch from './useFetch'
export const apiKey = process.env.REACT_APP_MOVIE_API_KEY

const AppContext = React.createContext()

const getThemeFromStorage = () => {
  let theme = 'light-theme'
  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme')
  }
  return theme
}

const AppProvider = ({ children }) => {
  const [query, setQuery] = useState('new york')
  const [page, setPage] = useState(1)
  const {
    isLoading,
    error,
    data: movies,
    currentPage,
    totalPages,
  } = useFetch(query, page)

  const [theme, setTheme] = useState(getThemeFromStorage())
  const toggleTheme = () => {
    if (theme === 'light-theme') setTheme('dark-theme')
    else setTheme('light-theme')
  }
  useEffect(() => {
    document.documentElement.className = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <AppContext.Provider
      value={{
        isLoading,
        error,
        movies,
        query,
        page,
        setQuery,
        setPage,
        toggleTheme,
        currentPage,
        totalPages,
        theme,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
