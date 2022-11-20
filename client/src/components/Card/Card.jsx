import React from "react";
import { Link } from "react-router-dom"
import NotFound from "../NotFound/NotFound.jsx"
import "./Card.css"

function Card({data}){
    let tipos=[]
    
    if(data.ptypes.length > 3 ){
        tipos.push(data.ptypes[0])
        tipos.push(data.ptypes[1])
        tipos.push(data.ptypes[2])
        tipos.push({id:0, name:'More...'})
    }
    else{
        tipos =[...data.ptypes]
    }



    return (
        <div className="Pcard">
            <Link to={`/pokemon/${data.id}`}>
                {data.img_front === null || !data.img_front ?(
                    <NotFound image={'noimage'}/>
                ):(
                    <img src={data.img_front} alt={data.name} className="imgPokemon" />
                )}
            </Link>
            <div className="textCard">
                <div className="nameTypes">
                    <div className="name">{data.name}</div>
                    <div className="types">Types: 
                        <div className="ctype"> {tipos.map((t)=>(<div className={`icon ${t.hasOwnProperty('type')?t.type.name:t.name}`}> {t.hasOwnProperty('type')?t.type.name:t.name}</div>))}
                        </div>
                    </div>
                </div>
                <div className='divAttack'>
					<div className='cattack'>Attack: {data.attack}</div>
				</div>
            </div>
        </div>
    )
}

export default Card