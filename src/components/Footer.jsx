import React from "react";
import { FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import logo from "../assets/logo.png";

const Footer = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.footer
      className="bg-base-100 text-base-content py-10 border-t border-base-300"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.15 }}
    >
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        {/* Website Info */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-2">
            <img src={logo} alt="ContestHub Logo" className="w-10 h-10" />
            <h1 className="text-2xl font-bold">ContestHub</h1>
          </div>
          <p className="text-sm">
            Join contests, showcase your skills, <br /> and win exciting prizes.
          </p>
        </motion.div>

        {/* Contact Info */}
        <motion.div className="space-y-2 cursor-pointer" variants={itemVariants}>
          <h2 className="font-semibold hover:underline transition">Contact</h2>
          <h2 className="font-semibold hover:underline transition">Terms of Service</h2>
          <h2 className="font-semibold hover:underline transition">Privacy Policy</h2>
          <h2 className="font-semibold hover:underline transition">Support</h2>
        </motion.div>

        {/* Navigation */}
        <motion.div className="flex flex-col gap-2 font-semibold" variants={itemVariants}>
          <NavLink to="/" className="hover:text-primary transition">Home</NavLink>
          <NavLink to="/all-contests" className="hover:text-primary transition">All Contests</NavLink>
          <NavLink to="/leaderboard" className="hover:text-primary transition">Leaderboard</NavLink>
          <NavLink to="/about" className="hover:text-primary transition">About Us</NavLink>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={itemVariants}>
          <h2 className="font-semibold mb-2">Follow Us</h2>
          <div className="flex gap-4 mt-2">
            <motion.a whileHover={{ scale: 1.2 }} href="#" className="hover:text-primary transition">
              <FaFacebookF size={20} />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2 }} href="#" className="hover:text-primary transition">
              <FaXTwitter size={20} />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2 }} href="#" className="hover:text-primary transition">
              <FaInstagram size={20} />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2 }} href="#" className="hover:text-primary transition">
              <FaLinkedinIn size={20} />
            </motion.a>
          </div>
          <p className="hover:underline mt-2 cursor-pointer">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=fardinsojon@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              fardinsojon@gmail.com
            </a>
          </p>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div className="text-center mt-8 text-sm" variants={itemVariants}>
        &copy; {new Date().getFullYear()} ContestHub. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
