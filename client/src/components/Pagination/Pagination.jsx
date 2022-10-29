import React from "react";
import "./Pagination.css";

export const Pagination = ({ pokemonsPerPage, totalPokemons, paginate, page }) => {
  const pageNumbers = [];
  const numOfPages = Math.ceil(totalPokemons / pokemonsPerPage)

  for (let i = 1; i <= numOfPages ; i++) {
    pageNumbers.push(i);
  }
  console.log(page);

  return (
    <div className="pagination">
      {page===1?<></>:<button onClick={(e) => paginate(e, "-")}>
              |◄
            </button>}
        {pageNumbers.map((num) => (
          <div key={num} className="item">
            
            {page === num? <button  onClick={(e) => paginate(e, num)} disabled>
              {num}
            </button>:<button onClick={(e) => paginate(e, num)}>
              {num}
            </button>}
            
          </div>
        ))}
        {page===numOfPages?<></>:<button onClick={(e) => paginate(e, "+")}>
        ►|
            </button>}
    </div>
  );
};