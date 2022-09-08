import React from 'react'
import { useGlobalContext } from './context'
import { Link } from 'react-router-dom'
const no_image_url =
  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'

const IMG_URL = 'https://image.tmdb.org/t/p/w500'

const Movies = () => {
  const { movies, isLoading } = useGlobalContext()

  if (isLoading) {
    return <div className='loading'></div>
  }

  return (
    <section className='movies'>
      {movies.map((movie) => {
        const {
          id,
          poster_path,
          release_date,
          title,
          vote_average,
          vote_count,
        } = movie

        return (
          <Link to={`/movies/${id}`} key={id} className='movie'>
            <article>
              <img
                src={poster_path ? IMG_URL + poster_path : no_image_url}
                alt={title}
              />
              <div className='movie-info'>
                <h4 className='title'>{title}</h4>
                <p>
                  avg: {vote_average} | # of votes: {vote_count}
                </p>
                <p>{release_date}</p>
              </div>
            </article>
          </Link>
        )
      })}
    </section>
  )
}

export default Movies
