import Navbar from "../Components/Navbar";
import Typewriter from "../Components/typewriter";
import Selected_item_map from "../Components/Selected_item_map";
import Footer from "../Components/Footer";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import img from "/src/assets/Tour guide-rafiki.png";
import think from "/src/assets/Thinking face-rafiki.png";
import thinkingImg from "/src/assets/Thinking face-rafiki.png";

const Selected_item = () => {
  const location = useLocation();
  const restaurantData = location.state;

  const [open_hours, setopen_hours] = useState("");
  const [images, setimages] = useState([img, think]);
  const [reviews, setreviews] = useState([]);

  useEffect(() => {
    if (restaurantData && restaurantData.restaurant_id) {
      fetch(
        `http://localhost:3000/reviews/restaurant/${restaurantData.restaurant_id}`
      )
        .then((res) => res.json())
        .then((data) => setreviews(data))
        .catch((err) => console.error("Error fetching reviews:", err));
    }
  }, [restaurantData]);
  console.log(restaurantData.restaurant_id);
  console.log("Reviews:", reviews);

  const getEmoji = (score) => {
    if (score < 1) {
      return "😡";
    } else if (score < 2) {
      return "😕";
    } else if (score < 2) {
      return "😕";
    } else if (score < 3) {
      return "😐";
    } else if (score < 4) {
      return "🙂";
    } else if (score < 5) {
      return "😁";
    } else {
      return "🙂"; //in case score is out of range
    }
  };

  return (
    <div>
      <div className="relative h-[60vh] flex flex-col gap-20">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 800 400"
        >
          <path
            d="M 0 350 C 200 400 500 400 800 300 L 800 0 L 0 0 Z"
            fill="#8a3ab9"
          />
        </svg>

        <div className="relative z-10 p-2 text-center">
          <Navbar />
        </div>

        <div className="p-4 text-center relative mx-auto">
          <Typewriter line="A spot loved, lived, and now shared — come see why it stands out." />
        </div>
      </div>

      <div className="main flex flex-col items-center justify-center gap-15 mt-5">
        {/* Basic Information */}
        <div className="w-[90vw] appear-apply h-auto bg-gradient-to-br from-white via-[#f9f5ff] to-[#e5dcf8] rounded-3xl shadow-2xl nunito mx-auto mt-10 mb-10 overflow-hidden relative p-6">
          <div className="h-1 w-full bg-[#8a3ab9] rounded-full mt-5 mb-4"></div>
          <span className="text-[#29264A] bg-white mx-2 text-2xl md:text-3xl font-bold absolute top-6 left-18 text-center mb-2">
            Basic Information
          </span>

          <div className="w-full bg-transparent text-lg text-gray-800 px-6 py-4">
            <div className="grid grid-cols-3 gap-y-7 border-y border-gray-300 p-6">
              <span className="text-right font-semibold text-[#8a3ab9]">
                Name
              </span>
              <span className="text-center text-gray-500">:</span>
              <span className="text-left font-medium">
                {restaurantData?.name || "N/A"}
              </span>

              <span className="text-right font-semibold text-[#8a3ab9]">
                Location
              </span>
              <span className="text-center text-gray-500">:</span>
              <span className="text-left font-medium">
                {restaurantData?.locality || "N/A"}
              </span>

              <span className="text-right font-semibold text-[#8a3ab9]">
                Latitude
              </span>
              <span className="text-center text-gray-500">:</span>
              <span className="text-left font-medium">
                {restaurantData?.latitude || "N/A"}
              </span>

              <span className="text-right font-semibold text-[#8a3ab9]">
                Longitude
              </span>
              <span className="text-center text-gray-500">:</span>
              <span className="text-left font-medium">
                {restaurantData?.longitude || "N/A"}
              </span>

              <span className="text-right font-semibold text-[#8a3ab9]">
                Price Range
              </span>
              <span className="text-center text-gray-500">:</span>
              <span className="text-left font-medium">
                {restaurantData?.price_range || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="w-[90vw] appear-apply h-[60vh] bg-gradient-to-br from-white via-[#f9f5ff] to-[#e5dcf8] px-6 rounded-3xl shadow-2xl nunito mx-auto mt-7 mb-2 overflow-hidden relative pt-6">
          <div className="h-1 w-full bg-[#8a3ab9] rounded-full mt-5 mb-4 "></div>
          <span className="text-[#29264A] bg-white mx-2 text-2xl md:text-3xl font-bold absolute top-6 left-18 text-center mb-2">
            Map
          </span>
          <div className="w-full h-full text-lg text-gray-800 pt-3">
            <Selected_item_map
              latitude={restaurantData?.latitude}
              longitude={restaurantData?.longitude}
            />
          </div>
        </div>

        <div className="w-[90vw]  appear-apply h-[30vh] bg-gradient-to-br from-white via-[#f9f5ff] to-[#e5dcf8]  rounded-3xl shadow-2xl nunito mx-auto mt-10 mb-10  overflow-hidden relative p-6">

          {/* Heading */}

          <div className="h-1 w-full bg-[#8a3ab9] rounded-full mt-5 mb-4"></div>
          <span className="text-[#29264A] bg-white mx-2 text-xl md:text-3xl font-bold absolute top-6 left-18 text-center mb-2">
            Emoji Ratings Explained
          </span>

          <div className="w-full bg-transparent text-lg text-gray-800 px-6 py-4">

            <div className="grid grid-cols-5 gap-y-7 text-2xl border-y items-center justify-items-center h-[16vh]  border-gray-300 p-3">
             <div className="flex gap-5">
              <span>😡</span>
              <span>:</span>
              <span>Worst</span>
             </div>

             <div className="flex gap-5"> 
              <span>😕</span>
              <span>:</span>
              <span>Okay</span>
             </div>

             <div className="flex gap-5">
              <span>😐</span>
              <span>:</span>
              <span>Average</span>
             </div>

             <div className="flex gap-5">
              <span>🙂</span>
              <span>:</span>
              <span>Very Good</span>
             </div>

             <div className="flex gap-5">
              <span>😁</span>
              <span>:</span>
              <span>Excellent</span>
             </div>

            </div>

          </div>

        </div>
        {/* Experience Overview */}
        <div className="w-[90vw] appear-apply h-auto bg-gradient-to-br from-white via-[#f9f5ff] to-[#e5dcf8] rounded-3xl shadow-2xl nunito mx-auto mt-10 mb-10 overflow-hidden relative p-6">
          <div className="h-1 w-full bg-[#8a3ab9] rounded-full mt-5 mb-4"></div>
          <span className="text-[#29264A] bg-white mx-2 text-2xl md:text-3xl font-bold absolute top-6 left-18 text-center mb-2">
            Experience Overview
          </span>
          <div className="w-full bg-transparent text-lg text-gray-800 px-6 py-4">
            <div className="grid grid-cols-3 gap-y-7 border-y border-gray-300 p-3">
              <span className="text-right font-semibold text-[#8a3ab9]">
                Popular Dishes
              </span>
              <span className="text-center text-gray-500">:</span>
              <span className="text-left font-medium">
                {restaurantData?.best_dishes?.join(", ") || "N/A"}
              </span>

              <span className="text-right font-semibold text-[#8a3ab9]">
                Food Quality
              </span>
              <span className="text-center text-gray-500">:</span>
              <span className="text-left font-medium">
                {getEmoji(restaurantData?.avg_food_quality)}
              </span>

              <span className="text-right font-semibold text-[#8a3ab9]">
                Cleanliness
              </span>
              <span className="text-center text-gray-500">:</span>
              <span className="text-left font-medium">
                {getEmoji(restaurantData?.avg_cleanliness_score)}
              </span>

              <span className="text-right font-semibold text-[#8a3ab9]">
                Service
              </span>
              <span className="text-center text-gray-500">:</span>
              <span className="text-left font-medium">
                {getEmoji(restaurantData?.avg_service_score)}
              </span>

              <span className="text-right font-semibold text-[#8a3ab9]">
                Open Hours
              </span>
              <span className="text-center text-gray-500">:</span>
              <span className="text-left font-medium">
                {open_hours || "Not Available"}
              </span>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="w-[90vw] appear-apply h-[60vh] bg-gradient-to-br from-white via-[#f9f5ff] to-[#e5dcf8] rounded-3xl shadow-2xl nunito mx-auto mt-10 mb-10 overflow-hidden relative p-6">
          <div className="h-1 w-full bg-[#8a3ab9] rounded-full mt-5 mb-4"></div>
          <span className="text-[#29264A] bg-white mx-2 text-2xl md:text-3xl font-bold absolute top-6 left-18 text-center mb-2">
            Gallery
          </span>
          <div className="w-full bg-transparent text-lg text-gray-800 px-6 py-4">
            {images?.length ? (
              <div className="grid grid-cols-5 gap-y-7 h-[45vh] border-y items-center justify-items-center border-gray-300 p-3">
                {images.slice(0, 5).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`preview-${index}`}
                    className="rounded-xl cursor-pointer w-65 h-65 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                ))}
              </div>
            ) : (
              <div className="flex justify-center h-[45vh] items-center border-y text-xl border-gray-300 p-3">
                No images available
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        <div className="w-[90vw] appear-apply h-[60vh] bg-gradient-to-br from-white via-[#f9f5ff] to-[#e5dcf8] rounded-3xl shadow-2xl nunito mx-auto mt-10 mb-10 overflow-hidden relative p-6">
          <div className="h-1 w-full bg-[#8a3ab9] rounded-full mt-5 mb-4"></div>
          <span className="text-[#29264A] bg-white mx-2 text-2xl md:text-3xl font-bold absolute top-6 left-18 text-center mb-2">
            Reviews
          </span>
          {reviews.length === 0 ? (
            <div className="w-full h-[50vh] flex flex-col justify-center items-center text-[#8a3ab9]">
              <img
                src={thinkingImg}
                alt="No reviews yet"
                className="h-[40%] opacity-80 mb-4"
              />
              <p className="text-lg font-semibold">
                No Reviews Yet — Be the First Explorer to Share!
              </p>
            </div>
          ) : (
            <div className="w-full max-h-[55vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
              {reviews.map((review) => (
                <div
                  key={review.review_id}
                  className="border-l-4 border-[#8a3ab9] bg-white p-5 rounded-2xl shadow-md text-[#29264A] hover:scale-[1.02] transition-transform duration-300"
                >
                  <p className="text-base md:text-lg">{review.review_text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Selected_item;
