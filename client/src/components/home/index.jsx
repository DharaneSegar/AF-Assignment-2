import API_KEY from "../../config/apiConfig";
import Header from "../header";
import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState, useEffect } from "react";

export default function Home() {
  const [apodImages, setApodImages] = useState([]);

  useEffect(() => {
    const fetchApodImages = async () => {
      const apiKey = API_KEY; // Replace "your_api_key_here" with your NASA API key
      const endDate = new Date().toISOString().split("T")[0]; // Today's date
      const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]; // 7 days ago
      const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;

      try {
        const response = await fetch(apiUrl);
        console.log(response)
        const data = await response.json();
        setApodImages(data); // Store all images without reversing
      } catch (error) {
        console.error("Error fetching APOD images:", error);
      }
    };

    fetchApodImages();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 10000, // Change image every 10 seconds
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Autoplay enabled
    autoplaySpeed: 10000, // Autoplay speed 10 seconds
  };

  return (
    <>
      <Header />
      <div className="overflow-hidden">
        {" "}
        {/* Add this div with overflow-hidden class */}
        <Slider {...settings} className="h-full">
          {apodImages.map((image, index) => (
            <div key={index} className="h-full relative">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover" // Set the image to cover the entire area
                style={{ maxHeight: "calc(100vh - 4rem)" }} // Adjust the height of the image to fit within the viewport, subtracting the height of the header and footer
              />
              <div className="absolute bottom-10 left-0 p-4 bg-opacity-75 w-full">
                <p className="text-6xl font-bold text-white">About NASA</p>
                <p className="text-3xl text-white mt-10">
                  NASA explores the unknown in air and space, innovates for the
                  benefit of humanity, and inspires the world through discovery.
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
