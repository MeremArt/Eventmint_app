"use client";
/* eslint-disable */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";

const url = "https://chat-wizard.vercel.app/api/v1/users/login/";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [enteredEmail, setEnteredEmail] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Please fill all fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Successfully signed up", {
          position: "top-right",
          autoClose: 3000,
          style: { background: "#7371D1", color: "white" },
        });
        localStorage.setItem("email", formData.email);
        router.push(`/dashboard/Chat?email=${formData.email}`);
        setFormData({ name: "", email: "" });
      } else {
        toast.error(response.statusText);
        console.log(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Server error");
        console.log("Validation error:", error.response.data);
      } else {
        toast.error("An error occurred. Please try again later.");
        console.error("An error occurred:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="flex items-center  justify-center  min-h-screen">
        {/* card container */}
        <div className="flex flex-col border border-white m-6 space-y-10 bg-black  md:bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0">
          {/* left side */}
          <img
            width={440}
            height={440}
            src="https://res.cloudinary.com/dtfvdjvyr/image/upload/v1721146291/d_1_cpj5uq.png"
            alt="image"
            className="w-[440px] hidden md:block rounded-xl"
          />
          {/* right side */}
          <div className="p-6 md:p-12  bg-black rounded-r-2xl">
            {/* Top content */}
            <h2 className="mb-4 py-2 text-xl text-white font-bold">
              Join the Event Mint Waitlist 🎉
            </h2>

            <form onSubmit={handleLogin}>
              <label className="flex text-white py-3">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full mb-4 p-3 border border-gray-300 rounded-md placeholder:font-light focus:outline-none"
                placeholder="Your Name"
                required
              />
              <label className="flex text-white py-3">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full mb-12 p-3 border border-gray-300 rounded-md placeholder:font-light focus:outline-none"
                placeholder="name@your-email.com"
                autoComplete="current-password"
                required
              />
              <button
                type="submit"
                className="w-full p-3 text-black bg-white rounded-full text-transform: capitalize hover:opacity-70 duration-200"
                disabled={isLoading}
                aria-live="polite"
              >
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  " Join Waitlist"
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
