import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { apiKey } from './context'
import useFetch from './useFetch'

const BASE_URL = 'https://api.themoviedb.org/3/movie/'
const IMG_URL = 'https://image.tmdb.org/t/p/w500'

const SingleMovie = () => {
  const { id } = useParams()
  const { isLoading, error, data: movie } = useFetch(id)

  const playVideo = async () => {
    try {
      let urlTogether = BASE_URL + id + '/videos?api_key=' + apiKey
      const res = await fetch(urlTogether)
      const videoData = await res.json()
      if (videoData) {
        document.getElementById('overlay').style.display = 'block'
        document.getElementById('overlay').style.width = '100%'
        if (videoData.results.length > 0) {
          let vid = videoData.results[0]
          let { name, key, site } = vid
          if (site === 'YouTube') {
            var content = `
              <h1 className="no-results">${movie.original_title}</h1>
              <br/>
              <iframe width="688" height="387" src="https://www.youtube.com/embed/${key}"
                      title="${name}" className="embed hide" frameborder="0" allow="accelerometer;
                      autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              <br/>`
          }
          document.getElementById('overlayContent').innerHTML = content
        } else {
          document.getElementById(
            'overlayContent'
          ).innerHTML = `<h1 className="no-results">No Results Found</h1>`
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const closePlayVideo = () => {
    document.getElementById('overlay').style.width = '0%'
    var iframe = document.querySelector('iframe')
    if (iframe) {
      var iframeSrc = iframe.src
      iframe.src = iframeSrc
    }
  }

  if (isLoading) {
    return <div className='loading'></div>
  }

  if (error.show) {
    return (
      <div className='page-error'>
        <h1>{error.msg}</h1>
        <Link to='/' className='btn linkComponent'>
          back to movies
        </Link>
      </div>
    )
  }

  const { title, release_date, poster_path, overview, vote_average, genres } =
    movie

  return (
    <section className='single-movie'>
      <img src={`${IMG_URL}${poster_path}`} alt={title} />

      <div className='single-movie-info'>
        <h2 className='noCapitalize'>{title}</h2>
        <button className='btn preview' onClick={playVideo}>
          <i className='fa fa-play'></i> play preview
        </button>
        <p>{overview}</p>
        <span>Genre: </span>
        {genres &&
          genres.map((genre, idx, arr) => {
            return idx < arr.length - 1 ? (
              <span key={idx}>{genre.name}, </span>
            ) : (
              <span key={idx}>{genre.name}</span>
            )
          })}
        <h5>{release_date}</h5>
        <h5>{vote_average.toFixed(1)} out of 10</h5>
        <Link to='/' className='btn linkComponent'>
          <i className='fa fa-search'></i> back to search
        </Link>
      </div>
      <div id='overlay'>
        <button className='close-btn' onClick={closePlayVideo}>
          <i className='fa fa-times'></i>
        </button>
        <div id='overlayContent'></div>
      </div>
    </section>
  )
}

export default SingleMovie
