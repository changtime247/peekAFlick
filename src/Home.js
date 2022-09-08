import React from 'react'
import Form from './SearchForm'
import Buttons from './Buttons'
import Movies from './Movies'
import { useGlobalContext } from './context'

const Home = () => {
  return (
    <main>
      <Form />
      <Buttons />
      <Movies />
    </main>
  )
}

export default Home