import React from 'react';
import AlbumCard from './AlbumCard'; // Import the AlbumCard component
import './Styles/AlbumCard.css'; 

function AlbumCarousel({ albums }) {
  return (
    <div className="album-carousel">
      {albums.map((album, index) => (
        <AlbumCard key={index} album={album} />
      ))}
    </div>
  );
}

export default AlbumCarousel;
