
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles/Store.css';
import seedrandom from 'seedrandom';
import GenreArtistOptions from './GenreArtistOptions';
import { motion } from 'framer-motion';
import BottomBar from './BottomBar';
import Navbar from './Navbar';

function Store() {
  const [vinylRecords, setVinylRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [filter, setFilter] = useState({ genre: '', artist: '' });
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Start with page 1

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    },
  };
  
  // Using environment variable for security
  const API_KEY = 'gGnpkAkqtslhWTOGpXQBJuvLCklEPWKSonyHPQmS';

  // Function to generate a random price between $10 and $50
  const generateRandomPrice = (seed) => {
    const rng = seedrandom(seed);
    const randomPrice = Math.floor(rng() * (5000 - 1000 + 1)) + 1000;
    const priceWithDecimals = (randomPrice / 100).toFixed(2);
    return `${priceWithDecimals}`;
  };

  const addToCart = async (record) => {
    try {
      // Get the user's UID from localStorage (you should store it during login)
      const uid = localStorage.getItem('uid');
  
      // Send a POST request to add the item to the user's cart
      await axios.post('https://vinyl-website-backend-2ead81fa61bc.herokuapp.com/addOrder', {
        uid: uid,
        order: {
          Title: record.title,         // Include the "Title" field
          coverImage: record.cover_image,
          id: record.id,
          price: generateRandomPrice(record.id), // Generate a random price for the cart
        },
      });
      
      console.log('Item added to cart successfully');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };


  useEffect(() => {
    const fetchVinylRecords = async () => {
      try {
        const response = await axios.get('https://api.discogs.com/database/search', {
          params: {
            q: 'vinyl',
            type: 'release',
            token: API_KEY,
            page: page, // Include the current page number
          },
        });
        setVinylRecords(response.data.results);
        setFilteredRecords(response.data.results);
        console.log(response.data.results);
        response.data.results.forEach(async (result, index) => {
  
          try {
            // Send a POST request to store the data
            await axios.post('https://vinyl-website-backend-2ead81fa61bc.herokuapp.com/vinyls', {
              Title: result.title,
              coverImage: result.cover_image,
              id: result.id,
            });
            console.log('sent succesfully');
          } catch (error) {
            console.error('Error storing vinyl record since it already exists');
          }
          
        });
  
        
        
      } catch (error) {
        console.error('Error fetching vinyl records:', error);
        setError('Failed to fetch vinyl records. Please try again later.');
      }
      // ... rest of the function remains the same
    };
  
    fetchVinylRecords();
    console.log('fetching');
  }, [page]); // No need to include fetchVinylRecords in the dependency array anymore
  

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const getArtistName = (title) => {
    // Split the title at the "-" character and return the first part (artist name)
    return title.split('-')[0].trim();
  };

  const getAlbumTitle = (title) => {
    // Split the title at the "-" character and return the second part (album title)
    return title.split('-')[1].trim();
  };

  useEffect(() => {
    if (filter.genre !== '') {
        // Filter records by genre if genre filter is not empty
        const filtered = vinylRecords.filter((record) => {
            return record.genre.includes(filter.genre);
        });
        setFilteredRecords(filtered);
    } else {
        // If genre filter is empty, just reset the filteredRecords to the full list
        setFilteredRecords(vinylRecords);
    }
}, [filter.genre, vinylRecords]);

  return (
    <div className="store-container">
      <Navbar />
      <h2>Vinyl Store</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="filter-options">
        <h4>FILTERS:</h4>
        <GenreArtistOptions onFilterChange={handleFilterChange} />
      </div>

      <div className="vinyl-list">
        <motion.div className="vinyl-grid" variants={listVariants} initial="hidden" animate="visible">
        {filteredRecords.map((record) => (
          <motion.div className="vinyl-card" key={record.id} variants={cardVariants}>
            <div className="store-img">
              <img src={record.cover_image} alt={record.title} />
            </div>
            <div className="store-details">
              <h3>{getArtistName(record.title)}</h3>
              <p>{getAlbumTitle(record.title)}</p>
            </div>
            <div className="store-prices">
              <p>Price: ${generateRandomPrice(record.id)}</p>
              <button onClick={() => addToCart(record)}>Add to Cart</button>
            </div>
          </motion.div>
        ))}
        </motion.div>
      </div>
      <div className="load-more">
        <button className="load-more-button" onClick={() => setPage(page + 1)}>Load More</button>
      </div>
      <BottomBar/>
    </div>
  );
}

export default Store;
