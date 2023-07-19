import { useEffect, useState } from "react"
import { PokemonContext } from "./PokemonContext"
import { useForm } from "../Hook/useForm"

export const PokemonProvider = ({children}) => {
    
    const [allPokemons, setAllPokemons] = useState([])
    const [globalPokemons, setGlobalPokemons] = useState([])
    const [offset, setoffset] = useState(0)

    //Utilizamos CustomHook - useForm
    const {valueSearch, onInputChange, onResetFomr} = useForm({
        valueSearch : ''
    })

    //Estados para la aplicación
    const [loading, setLoading] = useState(true)
    const [active, setActive] = useState(false)

    //Muestra los primeros 50 pokemons
    const getAllPokemons = async(limit = 50) => {
        const baseURL = 'https://pokeapi.co/api/v2/'
        const res = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`)
        const data = await res.json()
        
        const promises = data.results.map(async(pokemon)=> {
            const res = await fetch(pokemon.url)
            const data = await res.json()
            return data
        })

        const results = await Promise.all(promises)

        //Creamos un solo arreglo a partir de otros arreglos
        setAllPokemons([
            ...allPokemons,
            ...results
        ])
        setLoading(false)
    }

    //Muestra todos los pokemons
    const getGlobalPokemons = async()=>{
        const baseURL = 'https://pokeapi.co/api/v2/'
        const res = await fetch(`${baseURL}pokemon?limit=100000&offset=0`)
        const data = await res.json()
        
        const promises = data.results.map(async(pokemon)=> {
            const res = await fetch(pokemon.url)
            const data = await res.json()
            return data
        })

        const results = await Promise.all(promises)
        setGlobalPokemons(results)
        setLoading(false)
    }
  
    //Obtenemos pokemon por ID
    const getPokemonByID = async(id) => {
        const baseURL = 'https://pokeapi.co/api/v2/'

        const res = await fetch(`${baseURL}pokemon/${id}`)
        const data = await res.json()
        return data
    }


    useEffect(() => {
      getAllPokemons()
    }, [offset])
    
    useEffect(() => {
      getGlobalPokemons()
    }, [])
    
    //botón cargar mas
    const onClickLoadMore = () => {
        setoffset(offset + 50)
    }

    //filtro categoria tipo pokemon
    const [typeSelected, settypeSelected] = useState({
        grass: false,
		normal: false,
		fighting: false,
		flying: false,
		poison: false,
		ground: false,
		rock: false,
		bug: false,
		ghost: false,
		steel: false,
		fire: false,
		water: false,
		electric: false,
		psychic: false,
		ice: false,
		dragon: false,
		dark: false,
		fairy: false,
		unknow: false,
		shadow: false
    })
    const [filteredPokemons, setfilteredPokemons] = useState([])

    const handleCheckBox = e => {
        settypeSelected({
            ...typeSelected,
            [e.target.name] : e.target.checked
        })

        if (e.target.checked) {
            const filteredResults = globalPokemons.filter(pokemon=> 
                pokemon.types
                    .map(type => type.type.name)
                    .includes(e.target.name)
            )
            setfilteredPokemons([...filteredPokemons, ...filteredResults])
        }else{
            const filteredResults = filteredPokemons.filter(pokemon=> 
                !pokemon.types
                .map(type => type.type.name)
                .includes(e.target.name)
            )
            setfilteredPokemons([...filteredResults])
        }
    }

    return (
    <PokemonContext.Provider value={{
        valueSearch,
        onInputChange,
        onResetFomr,
        allPokemons,
        globalPokemons,
        getPokemonByID,
        onClickLoadMore,
        loading,
        setLoading,
        active,
        setActive,
        handleCheckBox,
        filteredPokemons
    }}>
        {children}
    </PokemonContext.Provider>
  )
}
