import { createSlice } from '@reduxjs/toolkit'

export const pokemonSlice = createSlice({
  name: 'trainer',
  initialState: {
    pokemons: [],
  },
  reducers: {
    addPokemon: (state, action) => {
      console.log('add', state.pokemons)
      state.pokemons.push(action.payload)
    },
    removePokemon: (state, action) => {
      console.log('remove', state.pokemons)
      state.pokemons = state.pokemons.filter(id => id === action.payload)
    },
  }
})

export const { addPokemon, removePokemon } = pokemonSlice.actions

export default pokemonSlice.reducer