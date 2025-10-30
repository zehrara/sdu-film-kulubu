function WatchlistPanel({ watchlist, onRemove, onClear }) {
  return (
    <div className="watchlist-panel">
      <div className="watchlist-header">
        <h3 className="watchlist-title">🎞️ Gösterime Girecekler</h3>
        {watchlist.length > 0 && (
          <button className="btn btn-clear" onClick={onClear}>
            Temizle
          </button>
        )}
      </div>
      {watchlist.length === 0 ? (
        <p className="watchlist-empty">Henüz dizi eklenmedi</p>
      ) : (
        <div className="watchlist-items">
          {watchlist.map((show) => (
            <div key={show.id} className="watchlist-item">
              <img
                src={show.image?.medium || 'https://via.placeholder.com/50'}
                alt={show.name}
                className="watchlist-poster"
              />
              <div className="watchlist-info">
                <p className="watchlist-name">{show.name}</p>
                <p className="watchlist-rating">⭐ {show.rating?.average || 'N/A'}</p>
              </div>
              <button className="btn btn-remove" onClick={() => onRemove(show.id)}>
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchlistPanel;