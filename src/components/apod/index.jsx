import API_KEY from "../../config/apiConfig";
import Header from "../header";
import React from 'react';
import { useState, useEffect } from "react";

export default function APOD() {
  const [selectedDate, setSelectedDate] = useState(""); // State to hold the selected date
  const [apodData, setApodData] = useState(null);
  const [contentHeight, setContentHeight] = useState(0); // State to hold the height of the content

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get today's date
    setSelectedDate(currentDate); // Set selectedDate to today's date by default
  }, []);

  useEffect(() => {
    if (!selectedDate) return; // Return if no date is selected

    const fetchAPODData = async () => {
      try {
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${selectedDate}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch APOD data");
        }
        const data = await response.json();
        setApodData(data);
      } catch (error) {
        console.error("Error fetching APOD data:", error);
      }
    };

    fetchAPODData();
  }, [selectedDate]); // Refetch data when selectedDate changes

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
  };

  useEffect(() => {
    if (!apodData) return;

    // Calculate the height of the content container
    const contentContainer = document.getElementById("content-container");
    if (contentContainer) {
      const height = contentContainer.offsetHeight;
      setContentHeight(height);
    }
  }, [apodData]);

  return (
    <>
      <Header />
      <div className="relative overflow-hidden bg-white">
        <div className="container mx-auto p-4 mt-5">
          <h1 className="text-3xl font-bold mb-4 text-center">
            APOD - Astronomy Picture of the Day
          </h1>
          <p className="text-lg text-gray-600 mb-4 text-center">
            Each day a different image or photograph of our fascinating universe
            is featured, along with a brief explanation written by a
            professional astronomer.
          </p>
          <div className="flex justify-center mb-4 mt-10">
            <input
              type="date"
              value={selectedDate}
              max={new Date().toISOString().split("T")[0]} // Set max attribute to today's date
              onChange={handleDateChange}
              className="border border-gray-800 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          <div className="flex justify-center items-start mt-10 flex-col md:flex-row">
            <div className="max-w-md overflow-hidden">
              {apodData && (
                <img
                  src={apodData.url}
                  alt={apodData.title}
                  className="w-full max-w-full h-auto"
                  style={{ height: contentHeight }} // Set the height of the image to match the content container
                />
              )}
            </div>
            <div
              id="content-container"
              className="max-w-md w-full bg-gray-800 p-4"
            >
              {apodData && (
                <>
                  <h2 className="text-xl font-bold text-white mb-2">
                    {apodData.title}
                  </h2>
                  <p className="text-sm text-gray-300 mb-2">{apodData.date}</p>
                  <p className="text-white">{apodData.explanation}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
