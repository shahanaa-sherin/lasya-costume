// HeroSection.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const images = [
  "/images/heroimg/hero-img3.jpg",
  "/images/heroimg/hero-img10.jpg",
  "/images/heroimg/hero-img11.jpg",
  "/images/heroimg/hero-img12.jpg",
];

const HeroSection = () => {
  return (
    <section className="relative h-screen overflow-hidden pt-[88px]">
      <Swiper
        modules={[Autoplay, EffectFade]}
        slidesPerView={1}
        loop
        effect="fade"
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        className="h-full w-full"
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={src}
              alt={`Slide ${idx + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center text-white px-4 z-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-6xl font-extrabold mb-6 drop-shadow-lg pt-5">
            Welcome to Lasya Costumes
          </h1>
          <p className="text-lg md:text-xl drop-shadow-md">
            Embrace the elegance of tradition with our handpicked collection of
            classical dance and cultural attire.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
