const initialState = {
    pokemons: [],
    types: [],
    searchPokemon: [],
    addPokemon: null,
    searchPokemonById: [],
    searchPokemonByName: [],
    prevFilteredPokemons:[],
    filteredPokemons: [],
    orderBy: "Select",
    filterBy: "All",
    originFilter:"All",
    createPokemon:[],
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
          types: action.payload,
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
          originFilter: "All",
        }

      case "RESET_FILTER_ORDER":
      return {
        ...state,
        filteredPokemons: action.payload.pokemonsOrder,
        orderBy: "Select",
      }

      case "RESET_FILTER_ORIGIN":
      return {
        ...state,
        filteredPokemons: action.payload.prev,
        originFilter: "All",
      }
  
      case "FILTER_BY_TYPE":
        return {
          ...state,
          filteredPokemons: action.payload.pokemonType,
          filterBy: action.payload.type,
          prevFilteredPokemons: action.payload.pokemonType,
        };
  
      case "ORDER_ASC_NAME":
      case "ORDER_ASC_ATTACK":
      case "ORDER_DESC_NAME":
      case "ORDER_DESC_ATTACK":
        return {
          ...state,
          filteredPokemons: action.payload.pokemonsOrder,
          orderBy: action.payload.name,
          prevFilteredPokemons: action.payload.pokemonsOrder
        };
  
      case "ORDER_BY_ORIGIN":
      return {
        ...state,
        filteredPokemons: action.payload.pokemons,
        originFilter: action.payload.origin,
      };
  
      default:
        return state;
    }
  };