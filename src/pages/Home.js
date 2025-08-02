import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const categories = [
  { title: 'Top Airing' },
  { title: 'Most Popular' },
  { title: 'Top Rated' },
  { title: 'Movies' },
  { title: 'Upcoming' }
];

const dummyData = [
  {
    mal_id: 1,
    title: "One Piece",
    images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/6/73245.jpg" } }
  },
  {
    mal_id: 2,
    title: "Attack on Titan",
    images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/10/47347.jpg" } }
  },
  {
    mal_id: 3,
    title: "Jujutsu Kaisen",
    images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg" } }
  }
];

const Home = () => {
  const [animeData, setAnimeData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const localData = {};
    categories.forEach(cat => {
      localData[cat.title] = dummyData;
    });
    setAnimeData(localData);
  }, []);

  return (
    <div className="home">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <h1>Welcome to AniTrack 🎉</h1>
        <p>Your ultimate anime & TV show companion. Track, rate, and explore with ease!</p>
      </div>

      {/* Hero Banner */}
      <div className="hero-banner">
        <h1 className="hero-title">Featured Anime</h1>
        <p className="hero-desc">Watch the latest and greatest anime here!</p>
      </div>

      {/* Anime Sections */}
      {categories.map((category, index) => (
        <div key={index} className="row-section">
          <h2>{category.title}</h2>
          <div className="scroll-row">
            {(animeData[category.title] || []).map((anime) => (
              <div
                key={anime.mal_id}
                className="anime-card"
                onClick={() => navigate(`/anime/${anime.mal_id}`)}
                style={{ cursor: 'pointer' }}
              >
                <img src={anime.images.jpg.image_url} alt={anime.title} />
                <p>{anime.title}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
