import React from "react";
import Card from "../Card/Card.jsx";
import Loading from "../Loading/Loading.jsx"
import "./Pokemons.css"

function Pokemons({pokemons}){
    
    return(
        <div className="showing">
            {pokemons.length>0? pokemons.map((data)=>(<Card data={data} key={data.id}/>)):<Loading/>}
        </div>
    )
}

export default Pokemons