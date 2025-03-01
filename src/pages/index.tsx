"use client";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
const MotionButton = motion(Button);
export default function Home() {
  return (
    <div
      className="text-gray-300 min-h-[90vh] flex flex-col relative overflow-hidden"
      style={{
        backgroundImage: "url('bg2.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      <div className="flex-1 flex items-center justify-center px-4 relative z-10">
        <motion.div
          className="text-center text-white"
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          <motion.h1
            className="tracking-tighter text-5xl md:text-6xl bg-gradient-to-b from-gray-300 to-gray-500 bg-clip-text text-transparent font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          >
            Code Beyond Limits!
          </motion.h1>

          <motion.p
            className="tracking-tight text-lg md:text-xl mb-8 font-medium text-gray-400"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut", delay: 0.4 }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
          >
            Showcase your skills and compete with the best minds at RGUKT
            Nuzvid&apos;s Coding Contest.
          </motion.p>

          <motion.div
            className="space-x-4 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }}
          >
            <Link href="/problems">
              <MotionButton
                className="px-6 py-6 bg-gradient-to-b from-amber-500 to-amber-800 hover:from-amber-600 hover:to-amber-900 text-white font-semibold rounded-3xl transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </MotionButton>
            </Link>
            <Link href="/problems">
              <MotionButton
                className="px-6 py-6 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-3xl transition-all duration-300"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                Practice Problems
              </MotionButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
