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
      <CostumeShowcase />
      <AboutUs />
      <Gallery />
      <ContactUs />
    </>
  );
};

export default Home;
