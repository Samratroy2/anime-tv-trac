import React, { useState } from 'react';
import dummyAnimeData from '../data/dummyAnimeData';
import './Watchlist.css';

const Watchlist = () => {
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [filteredAnime, setFilteredAnime] = useState(dummyAnimeData);

  return (
    <div className="watchlist">
      <h2>All Anime</h2>

      {/* Filters at Top */}
      <Filters shows={dummyAnimeData} setFiltered={setFilteredAnime} />

      {/* Anime Grid */}
      <div className="anime-grid">
        {filteredAnime.length > 0 ? (
          filteredAnime.map(anime => (
            <div className="anime-card" key={anime.mal_id}>
              <img src={anime.images.jpg.image_url} alt={anime.title} />
              <h3>{anime.title}</h3>
              <p>⭐ Rating: {anime.score}</p>
              <button onClick={() => setSelectedAnime(anime)}>Show More</button>
            </div>
          ))
        ) : (
          <p>No anime found matching filters.</p>
        )}
      </div>

      {/* Modal */}
      {selectedAnime && (
        <div className="modal-overlay" onClick={() => setSelectedAnime(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>{selectedAnime.title}</h2>
            <img src={selectedAnime.images.jpg.image_url} alt={selectedAnime.title} />
            <p><strong>Rating:</strong> ⭐ {selectedAnime.score}</p>
            <p><strong>Episodes:</strong> {selectedAnime.episodes}</p>
            <p><strong>Synopsis:</strong> {selectedAnime.synopsis}</p>
            <button onClick={() => setSelectedAnime(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
