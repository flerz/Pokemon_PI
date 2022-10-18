export function getPokemons() {
    return function (dispatch) {
      return fetch(`http://localhost:3001/pokemons`)
        .then(response => response.json())
        .then(json => {
          dispatch({ type: "GET_POKEMONS", payload: json });
        });
    };
  }
  
  export function searchPokemons(name) {
    return (dispatch) =>
      fetch(`http://localhost:3001/pokemons?name=${name}`)
        .then((resp) => resp.json())
        .then((json) => {
          dispatch({
            type: "SEARCH_POKEMONS",
            payload: json,
          });
        });
  }
  
  export function getPokemonById(id) {
    return (dispatch) =>
      fetch(`http://localhost:3001/pokemons/${id}`)
        .then((resp) => resp.json())
        .then((json) => {
          dispatch({
            type: "GET_POKEMONS_BY_ID",
            payload: json,
          });
        });
  }
  
  export function getTypes() {
    return (dispatch) =>
      fetch(`http://localhost:3001/types`)
        .then((resp) => resp.json())
        .then((json) => {
          dispatch({
            type: "GET_TYPES",
            payload: json,
          });
        });
  }
  
  export function createPokemon(obj) {
    
    return (dispatch) =>
      fetch("http://localhost:3001/pokemons", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((resp) => resp.json())
        .then((json) => {
          dispatch({
            type: "CREATE_POKEMON",
            payload: json,
          });
        });
  }
  
  export const resetAll = () => {
    return (dispatch) => {
      dispatch({
        type: "RESET",
      });
    };
  };

  export const resetFilterOrder = (order)=>(dispatch, getState) => {
    const filtered = getState().filteredPokemons;
    let pokemonsOrder = []
    pokemonsOrder= filtered.sort((a,b)=>{
      if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
    })
    console.log(pokemonsOrder);
    dispatch({
      type: "RESET_FILTER_ORDER",
      payload: {
        pokemonsOrder,
        name: order,
      },
    });
  };

  export const resetFilterOrigin = () => {
    return (dispatch) => {
      dispatch({
        type: "RESET_FILTER_ORIGIN",
      });
    };
  };
  
  
  
  export const filterByType = (type) => (dispatch, getState) => {
    let filteredPokemons = [];
  
    if (type === "All") {
        filteredPokemons = getState().pokemons;
    } else {
      filteredPokemons = getState().pokemons.filter((pokemon) =>
        (pokemon.ptypes.map((p)=> {return p.hasOwnProperty('type')?p.type.name:p.name})).includes(type)
      )
    };
    dispatch({
      type: "FILTER_BY_TYPE",
      payload: {
        type,
        pokemonType: filteredPokemons,
      },
    });
  };
  
  
  export const orderAsc = (type) => (dispatch, getState) => {
    const filtered = getState().filteredPokemons;
    let pokemonsOrder = []
  
      if (type === "asc_name") {
        pokemonsOrder = filtered.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
      } else if (type === "asc_attack") {
        pokemonsOrder = filtered.sort(
          (a, b) => a.attack - b.attack
        );
      }
      dispatch({
        type: "ORDER_ASC_ATTACK",
        payload: {
          pokemonsOrder,
          name: type,
        },
      });
  }
  
  
  export const orderDesc = (type) => (dispatch, getState) => {
    const filtered = getState().filteredPokemons;
    let pokemonsOrder = []
      
      if (type === "desc_name") {
        pokemonsOrder = filtered.sort((a, b) => {
          if (a.name < b.name) return 1;
          if (a.name > b.name) return -1;
          return 0;
        });
      } else if (type === "desc_attack") {
        pokemonsOrder = filtered.sort(
          (a, b) => b.attack - a.attack
        );
      }
      dispatch({
        type: "ORDER_DESC_ATTACK",
        payload: {
          pokemonsOrder,
          name: type,
        },
      });
  }
  
  
  export const orderByCreator = (origin) => (dispatch, getState) => {
    const pokemons = getState().pokemons.filter(function (G) {
        return G.origin === origin
      });
    dispatch({
      type: "ORDER_BY_ORIGIN",
      payload: {
        pokemons,
        origin,
      },
    });
  };