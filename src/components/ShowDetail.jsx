import { useState, useEffect } from 'react';
import axios from 'axios';

function ShowDetail({ showId, onBack }) {
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchShowDetail = async () => {
      setLoading(true);
      setError(false);
      try {
        const [showRes, episodesRes] = await Promise.all([
          axios.get(`https://api.tvmaze.com/shows/${showId}`),
          axios.get(`https://api.tvmaze.com/shows/${showId}/episodes`)
        ]);
        setShow(showRes.data);
        setEpisodes(episodesRes.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchShowDetail();
  }, [showId]);

  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html || '';
    return tmp.textContent || tmp.innerText || '';
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (error || !show) {
    return (
      <div className="error">
        <p className="error-icon">⚠️</p>
        <p className="error-title">Detaylar yüklenemedi</p>
        <button className="btn" onClick={onBack}>
          ← Geri Dön
        </button>
      </div>
    );
  }

  return (
    <div className="detail-view">
      <button className="btn" onClick={onBack}>
        ← Geri Dön
      </button>
      
      <div className="detail-header">
        <img
          src={show.image?.original || 'https://via.placeholder.com/300x450'}
          alt={show.name}
          className="detail-poster"
        />
        <div className="detail-info">
          <h2>{show.name}</h2>
          <div className="detail-meta">
            <p><strong>Tür:</strong> {show.genres?.join(', ') || 'Belirtilmemiş'}</p>
            <p><strong>Dil:</strong> {show.language}</p>
            <p><strong>Puan:</strong> ⭐ {show.rating?.average || 'N/A'}</p>
            <p><strong>Durum:</strong> {show.status}</p>
            <p><strong>Ağ:</strong> {show.network?.name || show.webChannel?.name || 'Belirtilmemiş'}</p>
          </div>
          <p className="detail-summary">{stripHtml(show.summary) || 'Özet bulunmuyor.'}</p>
        </div>
      </div>

      <div className="episodes-section">
        <h2>📺 Bölümler ({episodes.length})</h2>
        <div className="episodes-grid">
          {episodes.map((episode) => (
            <div key={episode.id} className="episode-card">
              <p className="episode-title">
                S{episode.season}E{episode.number}: {episode.name}
              </p>
              <p className="episode-date">{episode.airdate || 'Tarih belirtilmemiş'}</p>
              <p className="episode-summary">
                {stripHtml(episode.summary) || 'Özet yok'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowDetail;