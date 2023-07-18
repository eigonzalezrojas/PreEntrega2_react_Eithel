import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { PokemonPage } from './pages/PokemonPage'

export const AppRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigation />}>
            <Route path='pokemon/:id' element={<PokemonPage/>}/>

        </Route>
    </Routes>
  )
}
