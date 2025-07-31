import { motion } from "framer-motion";
import aboutImage from "/images/Aboutimg/about-img3.jpg"; // replace with your actual image

const AboutUs = () => {
  return (
    <section className="bg-white py-16 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:w-1/2"
        >
          <img
            src={aboutImage}
            alt="About Lasya"
            className="rounded-2xl shadow-lg w-full h-auto object-cover"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-center md:text-left"
        >
          <h2 className="text-4xl font-extrabold mb-6 text-pink-600 tracking-tight">
            About <span className="text-yellow-500">Lasya</span>
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Lasya Costume was born out of a love for Indian classical dance and tradition.
            We provide authentic and exquisite costumes for various classical art forms like 
            <strong> Bharatanatyam, Mohiniyattam, Kuchipudi</strong>, and more. 
            Our mission is to keep the cultural spirit alive while blending it with modern elegance.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
