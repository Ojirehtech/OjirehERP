import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationCount = ( {
  total_pages,
  total_users,
  current_page,
  per_page,
  handlePagination,
} ) => {
  const pageNumbers = [];
  for ( let i = 1; i <= Math.ceil( total_users/per_page ); i++ ) {
    pageNumbers.push( i );
  }
  return (
    <Pagination aria-label="Page navigation example">
      <PaginationItem>
        <PaginationLink first href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink previous href="#" />
      </PaginationItem>
      {pageNumbers.map( number => (
        <PaginationItem key={number} onClick={() => handlePagination(number)}>
          <PaginationLink >
            {number}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationLink next href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink last href="#" />
      </PaginationItem>
    </Pagination>
  );
}

export default PaginationCount;