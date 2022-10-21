import React from "react";
import whospokemon from "./whospokemon.png"

export default function NotFound ({image}) {
    console.log(image);
    return (
        <div className="nofound">
            {image === "noimage" ?
            <img className = "img" src={whospokemon} alt="Link caido"/>
            : <img className="notfound" src="http://www.i2softbd.com/template/TPL-01009/images/404-Page-Not-Found.png" alt="Link caido"/>}
        </div>
    );
};