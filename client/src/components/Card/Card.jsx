import React from "react";
import { Link } from "react-router-dom"
import NotFound from "../NotFound/NotFound.jsx"

function Card({data}){
    return (
        <div className="card" >
            <Link to={`/pokemon/${data.id}`}>
                {data.img_front === null || !data.img_front ?(
                    <NotFound image={'noimage'}/>
                ):(
                    <img src={data.img_front} alt={data.name} className="img" />
                )}
            </Link>
            <div className="textCard">
                <div className="nameTypes">
                    <div className="name">{data.name}</div>
                    <div className="types">Types: {data.ptypes.map((t)=>(<div> {t.type.name}</div>))}
                    </div>
                </div>
                <div className='divAttack'>
					<div className='attack'>Attack: {data.attack}</div>
				</div>
            </div>
        </div>
    )
}

export default Card