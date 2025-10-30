import { useState } from 'react';

function SearchBox({ query, onSearch }) {
  const [input, setInput] = useState(query);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} className="search-box">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Dizi ara..."
        className="search-input"
      />
      <button type="submit" className="btn">
        🔍 Ara
      </button>
    </form>
  );
}

export default SearchBox;