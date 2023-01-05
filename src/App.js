import React, { useEffect, useState } from 'react'
import MovieCard from './components/MovieCard'
import './App.css'
import SearchIcon from './assets/search.svg'

//OMDb API key: b96dd3e8
const API_URL = 'https://www.omdbapi.com?apikey=b96dd3e8'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('') // To allow searching...useState starts empty because in that case, the search starts empty
  const [movies, setMovies] = useState([]) // allow to access our movies and setMovies function, an empty array 

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()

    setMovies(data.Search) // The "Search" inside json
  }

  useEffect(() => {
    searchMovies('')
  }, [])    

  return (
    <div className='app'>
      <h1>MovieLand</h1>
      
      <div className='search'>
        <input 
          value={searchTerm} // to be dinamic, now I can set the valeu for the input as my "searchTerm "
          onChange={(e) => setSearchTerm(e.target.value)} // event to allow, on changing, "setSearchTerm" will be my new value
          placeholder="Search for movies"
        />
        <img 
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)} // onclick my new movie to search will be searchTerm which was what I type to search, in fact
        />
      </div>

      {
        movies?.length > 0
        ? (
          <div className='container'>
            {movies.map((movie) => ( //looping for "movies" array, which is fetch for an APi, takin each individual "movie" then
              <MovieCard movie={movie} /> //dinamicly passing as a "prop(movie={movie})" to component "MovieCard"
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