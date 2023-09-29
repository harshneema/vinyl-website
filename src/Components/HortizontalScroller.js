import React, { useState } from 'react';
import Slider from 'react-slick';
import { motion, AnimatePresence } from 'framer-motion';
import { Fade, Slide } from 'react-reveal';  // Importing React Reveal animations
import './Styles/HorizontalScroller.css';
import TracklistSection from './TracklistSection';
import { albumData0, albumData1,albumData2 } from './albumData';

const svgg = 'images/vinyl.svg';

const slideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
};

const detailFrameVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
};

function HorizontalScroller({ albums }) {
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        customPaging: i => (
            <div className="dot"></div>
        )
    };

    const handleViewDetails = (index) => {
        console.log(index);
        setSelectedAlbum(index);
    };

    const selectedAlbumData = selectedAlbum === 0 ? albumData0
        : selectedAlbum === 1 ? albumData1
        : selectedAlbum === 2 ? albumData2
        : null;

    return (
        <div>
            <Fade>  {/* Adding fade animation to the Slider */}
                <Slider {...settings}>
                    {albums.map((album, index) => (
                        <AnimatePresence key={index}>
                            <motion.div 
                                className="slide"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={slideVariants}
                            >
                                <img src={album.coverImage} className="bgHomeRecord" alt={`Slide ${index}`} />
                                <div className="overlayHome">
                                    <div className="recordInfoMain">
                                        <div className="recordInfo">
                                            <h6>Special Edition</h6>
                                            <h3>{album.name}</h3>
                                            <h5>{album.title}</h5>
                                            <div className="recordExtraInfo">
                                                <hr/>
                                                <div className="price">
                                                    <p>Vinyl</p>
                                                    <p>${album.price}</p>
                                                </div>
                                            </div>
                                            <button className="view-button" onClick={() => handleViewDetails(index)}>More details</button>
                                        </div>
                                        <div className="recordSvg">
                                            <img src={svgg} alt="Vinyl Record" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    ))}
                </Slider>
            </Fade>

            {/* Album Detail Frame */}
            <AnimatePresence>
                {selectedAlbum !== null && (
                    <motion.div 
                        className="detailFrame"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={detailFrameVariants}
                    >
                        <button onClick={() => setSelectedAlbum(null)}>Close</button>
                        <div className="detailFrameMain">
                            <Slide left>  {/* Adding slide animation to the album details */}
                                <h3>{selectedAlbumData.title}</h3>
                                <h4>{selectedAlbumData.artist}</h4>
                                <p>{selectedAlbumData.description}</p>
                            </Slide>
                        </div>
                        <div className="detailFramestats">
                            {/* More slide animations for the stats */}
                            <Slide right cascade>
                                <div className="detailStat">
                                    <h5>Producer</h5>
                                    <p>{selectedAlbumData.producer}</p>
                                </div>
                                <div className="detailStat">
                                    <h5>Grammage</h5>
                                    <p>{selectedAlbumData.grammage}</p>
                                </div>
                                <div className="detailStat">
                                    <h5>Color</h5>
                                    <p>{selectedAlbumData.color}</p>
                                </div>
                                <div className="detailStat">
                                    <h5>Label</h5>
                                    <p>{selectedAlbumData.label}</p>
                                </div>
                                <div className="detailStat">
                                    <h5>Release Date</h5>
                                    <p>{selectedAlbumData.release}</p>
                                </div>
                                <div className="detailStat">
                                    <h5>Genre</h5>
                                    <p>{selectedAlbumData.genre}</p>
                                </div>
                            </Slide>
                        </div>
                        <TracklistSection tracklist={selectedAlbumData.tracklist} selected = {selectedAlbum} albumCover={selectedAlbumData.images[0]}/>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HorizontalScroller;
