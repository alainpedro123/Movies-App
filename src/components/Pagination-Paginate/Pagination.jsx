import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = props => {
    const { itemsCount, pageSize, onPageChange, currentPage } = props;

    const pagesCount = Math.ceil(itemsCount / pageSize); // converting the divisition result into an integer number 
    if (pagesCount === 1)
        return null;

    const pages = _.range(1, pagesCount + 1);  // generate arrays with page numbers: 1 -> start, 2 -> pagesCount + 1;
    // pagesCount + 1 to return the last page

    return (
        <nav>
            <ul className="pagination">
                {pages.map(page => (
                    <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
                        <div className="page-link"
                            onClick={() => onPageChange(page)}
                        >{page}
                        </div>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

// Ensuring the datatype
Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
}

export default Pagination;

