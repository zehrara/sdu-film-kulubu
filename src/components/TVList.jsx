import TVCard from './TVCard';

function TVList({ shows, onAddWatchlist, onShowDetail, watchlist }) {
  if (shows.length === 0) {
    return (
      <div className="empty">
        <p className="empty-icon">🎬</p>
        <p className="empty-title">Sonuç bulunamadı</p>
        <p className="empty-subtitle">Farklı bir arama yapın</p>
      </div>
    );
  }

  return (
    <div className="shows-grid">
      {shows.map((item) => (
        <TVCard
          key={item.show.id}
          show={item.show}
          onAddWatchlist={onAddWatchlist}
          onShowDetail={onShowDetail}
          isInWatchlist={watchlist.some(w => w.id === item.show.id)}
        />
      ))}
    </div>
  );
}

export default TVList;