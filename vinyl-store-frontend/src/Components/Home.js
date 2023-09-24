import React from 'react';
import Navbar from './Navbar'; 
import BestSellerSection from './BestSellerSection';
import './Styles/Home.css';
import AlbumCarousel from './AlbumCarousel';

const albums = [
    { name: 'Album 1', coverImage: 'images/cover1.jpeg', price: 19.99 },
    { name: 'Album 2', coverImage: 'images/cover2.jpeg', price: 24.99 },
    { name: 'Album 3', coverImage: 'images/cover3.jpeg', price: 14.99 },
    // Add more album objects as needed
  ];

function Home() {
  return (
    <div className="home">
      <Navbar /> {/* Include the Navbar component */}
      <AlbumCarousel albums={albums} />
      <div className="scrollable-bg">
        {/* New Releases Section */}
        <section className="new-releases-section">
          <h2>New Releases</h2>
          {/* Display new releases album covers here */}
          <h2>New Releases</h2>
          <h2>New Releases</h2>
          <h2>New Releases</h2>
          <h2>New Releases</h2>
          <h2>New Releases</h2>
          <h2>New Releases</h2>
          <h2>New Releases</h2>
        </section>
      </div>
      {/* Best Seller Section */}
      <BestSellerSection />
    </div>
  );
}

export default Home;


