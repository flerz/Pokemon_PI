import React from "react";
import "./Pagination.css";

export const Pagination = ({ pokemonsPerPage, totalPokemons, paginate }) => {
  const pageNumbers = [];
  const numOfPages = Math.ceil(totalPokemons / pokemonsPerPage)

  for (let i = 1; i <= numOfPages ; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
        {pageNumbers.map((num) => (
          <div key={num} className="item">
            <button onClick={(e) => paginate(e, num)}>
              {num}
            </button>
          </div>
        ))}
    </nav>
  );
};