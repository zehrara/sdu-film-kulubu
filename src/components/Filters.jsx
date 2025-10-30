function Filters({ filters, onFilterChange }) {
  return (
    <div className="filters-section">
      <h3 className="filters-title">🎭 Filtreler</h3>
      <div className="filters-grid">
        <div className="filter-group">
          <label>Tür</label>
          <input
            type="text"
            value={filters.genre}
            onChange={(e) => onFilterChange('genre', e.target.value)}
            placeholder="Drama, Comedy..."
            className="filter-input"
          />
        </div>
        <div className="filter-group">
          <label>Dil</label>
          <input
            type="text"
            value={filters.language}
            onChange={(e) => onFilterChange('language', e.target.value)}
            placeholder="English, Turkish..."
            className="filter-input"
          />
        </div>
        <div className="filter-group">
          <label>Min Puan</label>
          <input
            type="number"
            value={filters.minRating}
            onChange={(e) => onFilterChange('minRating', parseFloat(e.target.value) || 0)}
            min="0"
            max="10"
            step="0.1"
            className="filter-input"
          />
        </div>
      </div>
    </div>
  );
}

export default Filters;