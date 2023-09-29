import React from 'react';

const GenreArtistOptions = ({ onFilterChange }) => {
  // Hardcoded genre options
  const genres = [
    'Electronic',
    'Jazz',
    'Rock',
    'Hip Hop',
    'Pop',
    'Classical',
    'Blues'
  ];

  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value;
    onFilterChange({ genre: selectedGenre });
  };

  return (
    <div>
      <select name="genre" id="genre" onChange={handleGenreChange}>
        <option value="">GENRE</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreArtistOptions;
