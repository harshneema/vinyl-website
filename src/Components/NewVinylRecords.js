import React from 'react';
import './Styles/NewVinylRecords.css'
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'

const albums = [
    {
      id: 1,
      image: 'images/album1.jpeg', 
      artist: 'The Weeknd', 
      albumName: 'Dawn FM',
      price: 100,
    },
    {
      id: 2,
      image: 'images/album2.jpeg', 
      artist: 'Tyler, The Creator', 
      albumName: 'Call Me If You Get Lost',
      price: 80,
    },
    {
      id: 3,
      image: 'images/album3.jpeg', 
      artist: 'Billie Eilish', 
      albumName: 'Happier than Ever',
      price: 60,
    },
    {
      id: 4,
      image: 'images/album4.jpeg', 
      artist: 'Adele', 
      albumName: '30',
      price: 70,
    },
  ];
  

  function NewVinylRecords() {
    const navigate = useNavigate();
    const albumVariants = {
      initial: { scale: 1 },
      hover: { scale: 1.05 }
  };

    const switchpath = (() => {
      navigate('/store'); 
    });
    return (
      <div className="new-vinyl-records">
        <div className="title-button">
          <h2>NEW</h2>
          <button onClick={() => switchpath()}>SHOW ALL</button>
        </div>
        <hr />
        <div className="album-container-parent">
          <div className="album-container-horizontal">
            {/* First two albums in a horizontal container */}
            {albums.slice(0, 2).map((album) => (
              <motion.div 
              key={album.id} 
              className="album"
              variants={albumVariants}
              initial="initial"
              whileHover="hover"
          >
              <img src={album.image} alt={album.albumName} onClick={() => switchpath()}/>
              <p className="artist" style={{ textTransform: 'uppercase' }}>{album.artist}</p>
              <p className="album-name">{album.albumName}</p>
              <div className="vinyl-price">
                  <p>Vinyl</p>
                  <p>${album.price}</p>
              </div>
              <hr />
          </motion.div>
            ))}
          </div>
          <div className="album-container-vertical">
            {/* Other two albums in a vertical container */}
            {albums.slice(2).map((album) => (
              <motion.div 
              key={album.id} 
              className="album"
              variants={albumVariants}
              initial="initial"
              whileHover="hover"
          >
                <div className="album-vertical-parent">
                  <img src={album.image} alt={album.albumName} />
                  <div className="album-vertical-info">
                    <p className="artist" style={{ textTransform: 'uppercase' }}>{album.artist}</p> {/* Make the artist name uppercase */}
                    <p className="album-name">{album.albumName}</p>
                  </div>
                </div>
                <div className="vinyl-price">
                  <p>Vinyl</p>
                  <p>${album.price}</p>
                </div>
                <hr />
                </motion.div>
            ))}
          </div>
        </div>

        <div className="title-button">
          <h2>BEST SELLLERS (coming soon)</h2>
          <button onClick={() => switchpath()}>SHOW ALL</button>
        </div>
        <hr />
      </div>
    );
  }
  
  export default NewVinylRecords;