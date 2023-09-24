import React from 'react';
import './Styles/AlbumCard.css'; // Import your CSS file

function AlbumCard({ album }) {
  // Define a background image style
  const cardStyle = {
    backgroundImage: `url(${album.coverImage})`,
    backgroundSize: 'cover', // Cover the entire card with the background image
    backgroundPosition: 'center', // Center the background image
  };

  return (
    <div className="album-card" style={cardStyle}>
      <div className="album-details">
        <h3 className="album-name">{album.name}</h3>
        <p className="album-price">${album.price}</p>
        <button className="view-details-button">View Details</button>
      </div>
    </div>
  );
}

export default AlbumCard;
