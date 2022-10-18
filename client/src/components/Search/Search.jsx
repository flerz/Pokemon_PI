import React, {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchPokemons } from "../../actions/index.js";
import NotFound from "../NotFound/NotFound.jsx";

function Search(){
    const dispatch= useDispatch()
    let { name }= useParams()

    const searchPokemon = useSelector((state) => state.searchPokemonByName)
    useEffect(()=> {
        dispatch(searchPokemons(name))
    },[])

    return (
        <div className="search">
        <div className="info">
                <div className="image">
                    {searchPokemon.img_front === null || !searchPokemon.img_front ?
                    <NotFound image={"noimage"}/>
                : <img src={searchPokemon.img_front} alt={searchPokemon.name}/>}
                <div>
                    <h1>{searchPokemon.name}</h1>
                    <h4>Health Points: {searchPokemon.hp}</h4>
                    <h4>Attack: {searchPokemon.attack}</h4>
                    <h4>Defense: {searchPokemon.defense}</h4>
                    <h4>Speed: {searchPokemon.speed}</h4>
                    <h4>Height: {searchPokemon.height}</h4>
                    <h4>Weight: {searchPokemon.weight}</h4>
                    <h4>Types: </h4>
                    {searchPokemon.ptypes?searchPokemon.ptypes.map((t)=> (
                        <h6>{t.hasOwnProperty('type')?t.type.name:t.name}</h6>
                    )):null                       
                    }
                </div>
                </div>
            </div>
            <Link to="/home">
                <button className="button" type="submit"> Go Back </button>
            </Link>
    </div>
    )
}

export default Search