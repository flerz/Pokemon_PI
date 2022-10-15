import React from "react";
import { Link } from "react-router-dom"
import NotFound from "../NotFound/NotFound.jsx"

function Card({data}){
    console.log(data)
    return (
        <div className="card" >
                {data.img_front === null || !data.img_front ?(
                    <NotFound image={'noimage'}/>
                ):(
                    <img src={data.img_front} alt={data.name} className="img" />
                )}
            <div className="textCard">
                <div className="nameTypes">
                    <div className="name">{data.name}</div>
                    <div className="types">{data.types}</div>
                </div>
                <div className='divAttack'>
					<div className='attack'>{data.rating}</div>
				</div>
            </div>
        </div>
    )
}

export default Card