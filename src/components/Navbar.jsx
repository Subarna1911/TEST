import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
        <nav className="bg-slate-950 text-white p-6 flex justify-between">
            <div className="text-3xl font-bold">
                <Link to='/'>CatFlex</Link>
            </div>
        <ul>
            <li className="flex jsutify-center gap-4 text-lg font-bold">
                <Link to ="/">Home</Link>
                <Link to ="/watchlist">Watchlist</Link>
            </li>
           
        </ul>
        </nav>

      
    </div>
  )
}
