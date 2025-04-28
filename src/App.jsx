import React from 'react'
import{Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Watchlist from './pages/WatchList'
import Navbar from './components/Navbar'


export default function App() {
  return (
   <>
   <Navbar/>
   <Routes>
    <Route path='/' element = {<Home />} />
    <Route path='/watchlist' element = {<Watchlist />} />
   </Routes>


   </>
  )
}
