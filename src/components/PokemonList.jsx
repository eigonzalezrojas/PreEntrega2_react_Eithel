import React, { useContext } from 'react'
import { PokemonContext } from '../context/PokemonContext'
import {CardPokemon} from "./CardPokemon"

export const PokemonList = () => {

  //Desestructuramos los estados
  const {allPokemons} = useContext(PokemonContext)


  return (
    <>
      <div className='card-list-pokemon container'>
        {allPokemons.map(pokemon => <CardPokemon pokemon={pokemon} key={pokemon.id}/>)}
      </div>
    </>
  )
}
