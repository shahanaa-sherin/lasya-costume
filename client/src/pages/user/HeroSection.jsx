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
    <section className="relative h-screen overflow-hidden">
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
        className="h-full"
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx} className="h-full">
            <div className="h-full">
              <img
                src={src}
                alt={`Slide ${idx + 1}`}
                className="w-full h-full object-cover object-center"
                loading="eager"
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
