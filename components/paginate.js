 const Paginate = ({ postsPerPage, totalPosts, paginate, currentPage, previousPage, nextPage }) => {
   
   const pageNumbers = [];
 
   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
   }
 
   return (
      <nav>
         <ul className="pagination">
            <li className="page-item">
               <a className="page-link" onClick={previousPage}>
                  <span aria-hidden="true">&laquo;</span>
               </a>
            </li>
            {pageNumbers.map((number) => (
               <li
                  key={number}
                  onClick={() => paginate(number)}
                  className="page-item"
               >
                  <a className={`page-link ${number == currentPage+1  ? "active": 'nonactive'}`}>{number}</a>
               </li>
            ))}
            <li className="page-item">
               <a className="page-link" onClick={nextPage}>
                  <span aria-hidden="true">&raquo;</span>
               </a>
            </li>
         </ul>
      </nav>
   );
};
 
export default Paginate;