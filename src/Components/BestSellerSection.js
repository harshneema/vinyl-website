import React from 'react';
import './Styles/BestSellerSection.css'; 

function BestSellerSection() {
  return (
    <section className="best-seller-section">
      <h2>Best Sellers</h2>
      {/* Display best seller album covers here */}
      <button className="view-all-button">View All</button>
    </section>
  );
}

export default BestSellerSection;
