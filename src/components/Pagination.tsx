import React from 'react';

interface PaginationProps {
    productsPerPage: number,
    totalProducts: number,
    paginate: (param:number) => void
}

const Pagination = ({ productsPerPage, totalProducts, paginate }: PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className='pagination'>
      {pageNumbers.map((number) => (
        <li key={number} className='pagination__page-item'>
          <button onClick={() => paginate(number)} className='pagination__page-link'>
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
