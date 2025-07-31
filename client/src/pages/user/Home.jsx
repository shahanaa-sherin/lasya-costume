import React from 'react';
import HeroSection from './HeroSection';
import CostumeShowcase from './CostumeShowcase';
import AboutUs from './AboutUs';
import Gallery from './Gallery';
import ContactUs from './ContactUs';

const Home = () => {
  return (
    <>
      <HeroSection />
      <div id="costumes"><CostumeShowcase /></div>
      <div id="about"><AboutUs /></div>
      <div id="gallery"><Gallery /></div>
      <div id="contact"><ContactUs /></div>
    </>
  );
};

export default Home;
