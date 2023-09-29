import React from 'react';
import Navbar from './Navbar'; 
import './Styles/Home.css';
import HorizontalScroller from './HortizontalScroller';
import NewVinylRecords from './NewVinylRecords';
import BottomBar from './BottomBar';


const albums = [
    { name: 'QUEEN', coverImage: 'images/cover1.jpeg', title: 'A Night at the Opera', price: 19.99 },
    { name: 'PINK FLOYD', coverImage: 'images/cover2.jpeg', title: 'The Dark Side of the Moon', price: 24.99 },
    { name: 'THE BEATLES', coverImage: 'images/cover3.jpeg', title: 'Abbey Road', price: 14.99 },
  ];

function Home() {

  return (
    <div className="home">
      <Navbar   /> {/* Include the Navbar component */}
      <HorizontalScroller albums={albums} />
      <NewVinylRecords/>
      <BottomBar/>
      {/* <BestSellerSection /> */}
    </div>
  );
}

export default Home;


