function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      <button
        className="btn"
        onClick={() => onPageChange(0)}
        disabled={currentPage === 0}
      >
        ⏮️ İlk
      </button>
      <button
        className="btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        ◀️ Geri
      </button>
      <span className="page-info">
        {currentPage + 1} / {totalPages}
      </span>
      <button
        className="btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
      >
        İleri ▶️
      </button>
      <button
        className="btn"
        onClick={() => onPageChange(totalPages - 1)}
        disabled={currentPage >= totalPages - 1}
      >
        Son ⏭️
      </button>
    </div>
  );
}

export default Pagination;