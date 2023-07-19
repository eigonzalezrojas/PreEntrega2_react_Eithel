import React, { useContext } from 'react'
import { PokemonContext } from '../context/PokemonContext'
import {CardPokemon} from "./CardPokemon"
import { Loader } from './Loader'

export const PokemonList = () => {

  //Desestructuramos los estados
  const {allPokemons, loading, filteredPokemons} = useContext(PokemonContext)


  return (
    <>
    {
      loading ? (
        <Loader/>
      ): (
        <div className='card-list-pokemon container'>

          {
            filteredPokemons.lenght ? (
              <>
                {filteredPokemons.map(pokemon => (
                  <CardPokemon pokemon={pokemon} key={pokemon.id}/>
              ))}
              </>
            ) : (
                <>
                  {allPokemons.map(pokemon => (
                    <CardPokemon pokemon={pokemon} key={pokemon.id}/>
                  ))}
                </>
            )
          }
        </div>
      )
    }
    </>
  )
}
