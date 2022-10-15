const initialState = {
    pokemons: [],
    types: [],
    searchPokemon: [],
    addPokemon: null,
    searchPokemonById: [],
    searchPokemonByName: [],
    filteredPokemons: [],
    orderBy: "Select",
    filterBy: "All",
  };
  
  export default function rootReducer(state = initialState, action) {
    switch (action.type) {
      case "GET_POKEMONS":
        return {
          ...state,
          pokemons: action.payload,
        };
  
      case "SEARCH_POKEMONS":
        return {
          ...state,
          searchPokemonByName: action.payload,
        };
  
      case "GET_POKEMONS_BY_ID":
        return {
          ...state,
          searchPokemonById: action.payload,
        };
  
      case "GET_TYPES":
        return {
          ...state,
          type: action.payload,
        };
  
      case "CREATE_POKEMON":
        return {
          ...state,
          createPokemon: action.payload,
        };    
  
      case "RESET":
        return {
          ...state,
          pokemons: [],
          filteredPokemons: [],
          orderBy: "Select",
          filterBy: "All",
        }
  
      case "FILTER_BY_TYPE":
        return {
          ...state,
          filteredPokemons: action.payload.pokemonType,
          filterBy: action.payload.type,
        };
  
      case "ORDER_ASC_NAME":
      case "ORDER_ASC_ATTACK":
      case "ORDER_DESC_NAME":
      case "ORDER_DESC_ATTACK":
        return {
          ...state,
          filteredPokemons: action.payload.pokemonsOrder,
          orderBy: action.payload.name,
        };
  
      case "ORDER_BY_CREATOR":
      return {
        ...state,
        filteredPokemons: action.payload.pokemons,
        filterBy: action.payload.origin,
      };
  
      default:
        return state;
    }
  };