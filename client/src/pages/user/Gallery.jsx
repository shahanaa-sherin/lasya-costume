import React from 'react';

const Gallery = () => {
  const images = [
    '/images/gallery1.jpg',
    '/images/gallery2.jpg',
    '/images/gallery3.jpg',
  ];

  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <img key={index} src={img} alt={`Gallery ${index}`} className="rounded-lg shadow-md hover:scale-105 transition-transform" />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
