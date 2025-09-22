import React, { useEffect } from "react";
import { motion, useAnimate, useInView } from "framer-motion";
import { Clapperboard, Theater, Users, BrainCircuit, Heart, PlaySquare, Star } from "lucide-react";

// Helper component for the number count-up animation
const AnimatedNumber = ({ value }) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(0, value, {
        duration: 4,
        ease: "easeOut",
        onUpdate: (latest) => {
          scope.current.textContent = Math.round(latest).toLocaleString();
        },
      });
    }
  }, [isInView, value, animate, scope]);

  return <span ref={scope}>0</span>;
};

// Data for the stats section
const stats = [
  { value: 200000, label: "MOVIES", icon: <Clapperboard className="w-12 h-12 text-red-500" /> },
  { value: 10000, label: "ACTORS", icon: <Users className="w-12 h-12 text-red-500" /> },
  { value: 50, label: "GENRES", icon: <Theater className="w-12 h-12 text-red-500" /> },
];

// Data for the features section (consolidated from your text)
const features = [
  {
    icon: <BrainCircuit size={32} className="text-red-500" />,
    title: "AI-Powered Search",
    description: "Just type how you feel or what you're looking for, and our smart system will find the perfect movie match instantly.",
  },
  {
    icon: <Heart size={32} className="text-red-500" />,
    title: "Mood & Occasion Matching",
    description: "Our recommendations consider your mood and the occasion, making it perfect for movie dates or a solo night in.",
  },
  {
    icon: <PlaySquare size={32} className="text-red-500" />,
    title: "Instant Trailers",
    description: "No more guessing. Watch movie trailers directly on our site to see a preview before you decide.",
  },
  {
    icon: <Star size={32} className="text-red-500" />,
    title: "Curated & Quality-Driven",
    description: "Every movie is hand-picked by film connoisseurs, ensuring high-quality, relevant recommendations every time.",
  },
];

const StatsSection = () => {
  return (
    <div className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold">The Smartest Way To Pick A Movie</h2>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            Our unique engine combines advanced AI with a human touch to deliver recommendations you'll actually love.
          </p>
        </motion.div>

        {/* Animated Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 bg-zinc-900 rounded-lg"
            >
              {stat.icon}
              <h3 className="text-5xl font-bold text-red-500 mt-4">
                <AnimatedNumber value={stat.value} />+
              </h3>
              <p className="text-lg text-gray-400 mt-2 tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-zinc-900 p-6 rounded-lg text-center flex flex-col items-center"
            >
              {feature.icon}
              <h4 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h4>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;