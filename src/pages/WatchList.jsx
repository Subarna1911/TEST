import React, { useContext } from 'react'
import { useMovieContext } from '../contexts/MovieContext'
import MovieFetcher from '../components/MovieFetcher'


export default function WatchList() {

  const {favorites} = useMovieContext();

  if(favorites) {

    return <div>
      <h2 className = "text-3xl font-bold text-slate-950 text-center m-8">Here is the list of your favorite movies ❤</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
              {favorites.map((movie) => (
                <MovieFetcher
                  key={movie.id}
                  movie={movie}
                />
              ))}
            </div>
            </div>
  }
  return (
    <>
     <div>
      <h2>No favorite Movies Yet</h2>
      <p>start adding movies to your favoritess</p>
     </div>

    </>
    
  )
} 
