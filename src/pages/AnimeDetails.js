import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AnimeDetails.css';

const AnimeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [episodesWatched, setEpisodesWatched] = useState(0);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const allLists = ['watchingList', 'onHoldList', 'droppedList', 'completedList', 'planToWatchList'];
    let foundAnime = null;

    for (const list of allLists) {
      const stored = JSON.parse(localStorage.getItem(list)) || [];
      const match = stored.find(item => String(item.mal_id) === id);
      if (match) {
        foundAnime = match;
        setEpisodesWatched(match.episodesWatched || 0);
        setStatus(list.replace('List', ''));
        break;
      }
    }

    if (foundAnime) {
      setAnime(foundAnime);
    } else {
      console.error('Anime not found in any localStorage list.');
    }
  }, [id]);

  useEffect(() => {
    if (anime) {
      updateWatchlist(episodesWatched);
      if (anime.episodes && episodesWatched === anime.episodes) {
        moveToCompleted();
      }
    }
  }, [episodesWatched]);

  const updateWatchlist = (watchedCount) => {
    const updatedAnime = { ...anime, episodesWatched: watchedCount };
    const allLists = ['planToWatchList', 'watchingList', 'onHoldList', 'droppedList', 'completedList'];

    // Remove from all
    allLists.forEach(list => {
      const listData = JSON.parse(localStorage.getItem(list)) || [];
      const filtered = listData.filter(item => item.mal_id !== anime.mal_id);
      localStorage.setItem(list, JSON.stringify(filtered));
    });

    // Add to appropriate list
    if (watchedCount === 0) {
      const planList = JSON.parse(localStorage.getItem('planToWatchList')) || [];
      planList.push(updatedAnime);
      localStorage.setItem('planToWatchList', JSON.stringify(planList));
      setStatus('');
    } else {
      const watchingList = JSON.parse(localStorage.getItem('watchingList')) || [];
      watchingList.push(updatedAnime);
      localStorage.setItem('watchingList', JSON.stringify(watchingList));
      setStatus('watching');
    }
  };

  const handleIncrement = () => {
    if (episodesWatched < anime.episodes) {
      setEpisodesWatched(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (episodesWatched > 0) {
      setEpisodesWatched(prev => prev - 1);
    }
  };

  const moveToList = (targetList) => {
    const animeWithWatched = { ...anime, episodesWatched };
    const conflictingLists = ['watchingList', 'onHoldList', 'droppedList'];

    conflictingLists.forEach(list => {
      const listData = JSON.parse(localStorage.getItem(list)) || [];
      const filtered = listData.filter(item => item.mal_id !== anime.mal_id);
      localStorage.setItem(list, JSON.stringify(filtered));
    });

    const target = JSON.parse(localStorage.getItem(targetList)) || [];
    target.push(animeWithWatched);
    localStorage.setItem(targetList, JSON.stringify(target));

    setStatus(targetList.replace('List', ''));

    if (targetList === 'onHoldList') navigate('/watchlist/on-hold');
    if (targetList === 'droppedList') navigate('/watchlist/dropped');
  };

  const moveToCompleted = () => {
    const updated = { ...anime, episodesWatched };
    const watching = JSON.parse(localStorage.getItem('watchingList')) || [];
    const completed = JSON.parse(localStorage.getItem('completedList')) || [];

    const filtered = watching.filter(item => item.mal_id !== anime.mal_id);
    localStorage.setItem('watchingList', JSON.stringify(filtered));

    completed.push(updated);
    localStorage.setItem('completedList', JSON.stringify(completed));
    setStatus('completed');
    navigate('/watchlist/completed');
  };

  if (!anime) return <div style={{ padding: '1rem' }}>❌ Anime not found in your watchlists.</div>;

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '1rem' }}>
      <h2>{anime.title}</h2>
      <img
        src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url}
        alt={anime.title}
        style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }}
      />
      <p><strong>Rating:</strong> ⭐ {anime.score}</p>
      <p><strong>Episodes:</strong> {anime.episodes}</p>
      <p><strong>Synopsis:</strong> {showMore ? anime.synopsis : `${anime.synopsis.slice(0, 150)}...`}</p>
      <button onClick={() => setShowMore(!showMore)} style={{ marginBottom: '1rem' }}>
        {showMore ? 'Show Less' : 'Show More'}
      </button>

      {/* Episode Controls */}
      <div style={{ marginTop: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label><strong>Episodes Watched:</strong></label>
          <button onClick={handleDecrement} style={btnStyle}>−</button>
          <span>{episodesWatched}</span>
          <button onClick={handleIncrement} style={btnStyle}>+</button>
        </div>
        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
          Progress is auto-saved.
        </p>
      </div>

      {/* On Hold / Drop buttons */}
      {status === 'watching' && (
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
          <button onClick={() => moveToList('onHoldList')} style={buttonRed}>⏸ Mark as On Hold</button>
          <button onClick={() => moveToList('droppedList')} style={buttonRed}>⛔ Mark as Dropped</button>
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <button onClick={() => navigate(-1)} style={{ padding: '5px 10px' }}>⬅ Close</button>
      </div>
    </div>
  );
};

// Styles
const btnStyle = {
  padding: '5px 10px',
  fontSize: '18px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#333',
  color: '#fff',
  cursor: 'pointer'
};

const buttonRed = {
  backgroundColor: '#cc0000',
  color: '#fff',
  padding: '10px 12px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

export default AnimeDetails;
