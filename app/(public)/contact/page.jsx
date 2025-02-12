"use client";
import { useState, useEffect } from "react";
import FooterSection from "../../(sections)/FooterSection";

import { Separator } from "@/components/ui/separator";
import {
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaInstagram,
  FaMapPin,
} from "react-icons/fa";
import { useTheme } from "next-themes";
import Loader from "@/components/Loader";

const page = () => {
  const isDarkMode = true;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmit, setisSubmit] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(userCollection, formData);
    setisSubmit("We recieved your message and will get back to you soon!");
    setFormData({
      name: "",
      email: "",
      message: "",
    });
    // console.log('Form Data:', formData);
  };

  if (loading) {
    return (
      <div className="min-h-[100vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <main>
      <section className="text-gray-600 body-font relative min-h-screen">
        <div className="absolute inset-0 bg-gray-300">
          <iframe
            width="100%"
            height="100%"
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199695.37959373918!2d3.2505130951470216!3d6.524379256650929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2a1c71b7c9%3A0x5a29c9375e8077f!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sin!4v1702567242179"
            style={{
              filter: isDarkMode
                ? "invert(90%) grayscale(100%)"
                : "grayscale(100%)",
            }}
          ></iframe>
        </div>
        <div className="container px-5 py-24 mx-auto flex">
          <div className=" lg:w-1/3 md:w-1/2 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-9 shadow-md backdrop-filter backdrop-blur-lg bg-primary/10 bg-opacity-30 rounded-lg p-6 mt-10 shadow-inner border-2 dark:text-white">
            <h2 className="text-2xl text-primary font-bold mb-4">Contact Us</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block  text-white-700 text-sm font-bold mb-2"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded shadow appearance-none text-white-700 leading-tight focus:outline-none focus:shadow-outline"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-white-700 text-sm font-bold mb-2"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded shadow appearance-none text-white-700 leading-tight focus:outline-none focus:shadow-outline"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-white-700 text-sm font-bold mb-2"
                >
                  Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border rounded shadow appearance-none text-white-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                ></textarea>
              </div>
              <p className="text-primary">{isSubmit}</p>
              <div>
                <button
                  type="submit"
                  className="w-full bg-primary text-black py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </form>
            <br />
            <Separator />
            <br />
            <div className="flex items-center justify-evenly">
              <h2>
                <a
                  className="text-xl"
                  target="_blank"
                  href="https://www.instagram.com/ecelluvce/"
                >
                  <FaInstagram color="orange" />
                </a>
              </h2>
              <h2>
                <a
                  className="text-xl"
                  target="_blank"
                  href="https://www.linkedin.com/company/entrepreneurship-cell-uvce/mycompany/"
                >
                  <FaLinkedin color="orange" />
                </a>
              </h2>
              <h2>
                <a
                  className="text-xl"
                  target="_blank"
                  href="mailto:entrepreneurshipcelluvce@gmail.com"
                >
                  <FaEnvelope color="orange" />
                </a>
              </h2>
              <h2>
                <a
                  className="text-xl"
                  target="_blank"
                  href="tel:+91 98862 25685"
                >
                  <FaPhone color="orange" />
                </a>
              </h2>
              <h2>
                <a
                  className="text-xl"
                  target="_blank"
                  href="https://maps.app.goo.gl/wRGxbWbLiGFSjSH9A"
                >
                  <FaMapPin color="orange" />
                </a>
              </h2>
            </div>
          </div>
        </div>
      </section>
      <Separator />
    </main>
  );
};

export default page;
