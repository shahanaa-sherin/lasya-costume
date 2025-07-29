import React from 'react';

const CostumeShowcase = () => {
  const costumes = [
    { id: 1, name: 'Bharatanatyam', image: '/images/bharatanatyam.jpg' },
    { id: 2, name: 'Mohiniyattam', image: '/images/mohiniyattam.jpg' },
    { id: 3, name: 'Kathakali', image: '/images/kathakali.jpg' },
  ];

  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Our Costumes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {costumes.map((item) => (
          <div key={item.id} className="text-center shadow-lg rounded-lg p-4 hover:scale-105 transition-transform duration-300">
            <img src={item.image} alt={item.name} className="w-full h-64 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">{item.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CostumeShowcase;
