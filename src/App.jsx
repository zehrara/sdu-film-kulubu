import { useReducer, useEffect } from 'react';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import Filters from './components/Filters';
import TVList from './components/TVList';
import WatchlistPanel from './components/WatchlistPanel';
import Pagination from './components/Pagination';
import ShowDetail from './components/ShowDetail';
import Footer from './components/Footer';
import './App.css';

// Action Types
const FETCH_INIT = 'FETCH_INIT';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';
const SET_QUERY = 'SET_QUERY';
const SET_FILTERS = 'SET_FILTERS';
const SET_WATCHLIST = 'SET_WATCHLIST';
const SET_PAGE_SIZE = 'SET_PAGE_SIZE';
const ADD_WATCHLIST = 'ADD_WATCHLIST';
const REMOVE_WATCHLIST = 'REMOVE_WATCHLIST';
const CLEAR_WATCHLIST = 'CLEAR_WATCHLIST';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_SELECTED_SHOW = 'SET_SELECTED_SHOW';

// Initial State
const initialState = {
  shows: [],
  isLoading: false,
  isError: false,
  query: 'friends',
  filters: { genre: '', language: '', minRating: 0 },
  watchlist: [],
  pageSize: 6,
  currentPage: 0,
  selectedShowId: null
};

// Reducer
function tvReducer(state, action) {
  switch (action.type) {
    case FETCH_INIT:
      return { ...state, isLoading: true, isError: false };
    case FETCH_SUCCESS:
      return { ...state, isLoading: false, shows: action.payload, currentPage: 0 };
    case FETCH_FAILURE:
      return { ...state, isLoading: false, isError: true };
    case SET_QUERY:
      return { ...state, query: action.payload };
    case SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case SET_WATCHLIST:
      return { ...state, watchlist: action.payload };
    case SET_PAGE_SIZE:
      return { ...state, pageSize: action.payload, currentPage: 0 };
    case ADD_WATCHLIST:
      return { ...state, watchlist: [...state.watchlist, action.payload] };
    case REMOVE_WATCHLIST:
      return { ...state, watchlist: state.watchlist.filter(item => item.id !== action.payload) };
    case CLEAR_WATCHLIST:
      return { ...state, watchlist: [] };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case SET_SELECTED_SHOW:
      return { ...state, selectedShowId: action.payload };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(tvReducer, initialState);

  const fetchShows = async (query) => {
    dispatch({ type: FETCH_INIT });
    try {
      const result = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
      dispatch({ type: FETCH_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({ type: FETCH_FAILURE });
    }
  };

  useEffect(() => {
    fetchShows(state.query);
  }, []);

  const handleSearch = (query) => {
    dispatch({ type: SET_QUERY, payload: query });
    fetchShows(query);
  };

  const handleFilterChange = (filterName, value) => {
    dispatch({ type: SET_FILTERS, payload: { [filterName]: value } });
  };

  const handleAddWatchlist = (show) => {
    if (!state.watchlist.some(item => item.id === show.id)) {
      dispatch({ type: ADD_WATCHLIST, payload: show });
    }
  };

  const handleRemoveWatchlist = (showId) => {
    dispatch({ type: REMOVE_WATCHLIST, payload: showId });
  };

  const handleClearWatchlist = () => {
    dispatch({ type: CLEAR_WATCHLIST });
  };

  const handleShowDetail = (showId) => {
    dispatch({ type: SET_SELECTED_SHOW, payload: showId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    dispatch({ type: SET_SELECTED_SHOW, payload: null });
  };

  const handlePageChange = (newPage) => {
    dispatch({ type: SET_CURRENT_PAGE, payload: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter shows
  const filteredShows = state.shows.filter(item => {
    const show = item.show;
    const matchesGenre = !state.filters.genre || 
      show.genres?.some(g => g.toLowerCase().includes(state.filters.genre.toLowerCase()));
    const matchesLanguage = !state.filters.language || 
      show.language?.toLowerCase().includes(state.filters.language.toLowerCase());
    const matchesRating = !state.filters.minRating || 
      (show.rating?.average && show.rating.average >= state.filters.minRating);
    
    return matchesGenre && matchesLanguage && matchesRating;
  });

  // Pagination
  const totalPages = Math.ceil(filteredShows.length / state.pageSize);
  const startIndex = state.currentPage * state.pageSize;
  const paginatedShows = filteredShows.slice(startIndex, startIndex + state.pageSize);

  if (state.selectedShowId) {
    return (
      <div className="app">
        <header className="header">
          <h1>🎬 SDÜ Kampüs Film Kulübü 🎬</h1>
          <p className="subtitle">Dizi Arama ve Gösterim Planlama Sistemi</p>
        </header>
        <div className="container">
          <ShowDetail showId={state.selectedShowId} onBack={handleBackToList} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🎬 SDÜ Kampüs Film Kulübü 🎬</h1>
        <p className="subtitle">Dizi Arama ve Gösterim Planlama Sistemi</p>
      </header>

      <div className="container">
        <SearchBox query={state.query} onSearch={handleSearch} />
        <Filters filters={state.filters} onFilterChange={handleFilterChange} />

        <div className="main-content">
          <div className="shows-section">
            {state.isLoading ? (
              <div className="loading">
                <div className="loading-spinner"></div>
                <p>Yükleniyor...</p>
              </div>
            ) : state.isError ? (
              <div className="error">
                <p className="error-icon">⚠️</p>
                <p className="error-title">Bir hata oluştu</p>
                <button className="btn" onClick={() => fetchShows(state.query)}>
                  🔄 Tekrar Dene
                </button>
              </div>
            ) : (
              <>
                <TVList
                  shows={paginatedShows}
                  onAddWatchlist={handleAddWatchlist}
                  onShowDetail={handleShowDetail}
                  watchlist={state.watchlist}
                />
                {filteredShows.length > 0 && (
                  <Pagination
                    currentPage={state.currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>

          <WatchlistPanel
            watchlist={state.watchlist}
            onRemove={handleRemoveWatchlist}
            onClear={handleClearWatchlist}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;