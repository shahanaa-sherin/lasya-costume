import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const images = [
  "/images/hero-img8.jpg",
  "/images/hero-img1.jpg",
  "/images/hero-img2.jpg",
  "/images/hero-img5.jpg",
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        slidesPerView={1}
        loop={true}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className=" h-[80vh]"
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <div className="h-[80vh]">
              <img
                src={src}
                alt={`Slide ${idx + 1}`}
                className=" h-full object-cover object-center"
                loading="eager"
                style={{
                  imageRendering: "auto",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay Text */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-center p-4 z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
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
