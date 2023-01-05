import React, { useEffect, useState } from 'react'
import MovieCard from './components/MovieCard'
import './App.css'
import SearchIcon from './assets/search.svg'

//OMDb API key: b96dd3e8
const API_URL = 'https://www.omdbapi.com?apikey=b96dd3e8'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [movies, setMovies] = useState([])

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()

    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies('')
  }, [])    

  return (
    <div className='app'>
      <h1>MovieLand</h1>
      
      <div className='search'>
        <input 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img 
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {
        movies?.length > 0
        ? (
          <div className='container'>
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) :
        (
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        )
      }


    </div>
  )
}

export default App