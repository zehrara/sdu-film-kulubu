function TVCard({ show, onAddWatchlist, onShowDetail, isInWatchlist }) {
  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html || '';
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="show-card">
      <img
        src={show.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image'}
        alt={show.name}
        className="show-poster"
      />
      <div className="show-info">
        <h3 className="show-title">{show.name}</h3>
        <div className="show-meta">
          <p><strong>Tür:</strong> {show.genres?.join(', ') || 'Belirtilmemiş'}</p>
          <p><strong>Dil:</strong> {show.language || 'Belirtilmemiş'}</p>
          <p><strong>Puan:</strong> ⭐ {show.rating?.average || 'N/A'}</p>
        </div>
        <p className="show-summary">{stripHtml(show.summary) || 'Özet bulunmuyor.'}</p>
        <div className="card-buttons">
          <button className="btn" onClick={() => onShowDetail(show.id)}>
            📺 Detay
          </button>
          <button
            className="btn"
            onClick={() => onAddWatchlist(show)}
            disabled={isInWatchlist}
          >
            {isInWatchlist ? '✓ Eklendi' : '➕ Ekle'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TVCard;