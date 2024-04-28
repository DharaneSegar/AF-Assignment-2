import API_KEY from "../../config/apiConfig";
import Header from "../header";
import React from "react";
import { useState } from "react";

export default function Earth() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&date=${date}&dim=0.15&api_key=${API_KEY}`;
      console.log("Image URL:", url); // Add this line to check the constructed URL
      setImageUrl(url);
      setError("");
      setImageError(false); // Reset image error state
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch image. Please check your input.");
      setLoading(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <Header />
      <div className="relative overflow-hidden bg-white">
        <div className="container mx-auto p-4 mt-5">
          <h1 className="text-3xl font-bold mb-4 text-center">Earth</h1>
          <p className="text-lg text-gray-600 mb-4 text-center">
            This retrieves the Landsat 8 image for the supplied location and
            date.
          </p>
          <div className="container mx-auto p-4 mt-5 flex justify-center flex-col md:flex-row">
            <div className="max-w-md w-full md:w-1/2 mr-4 border border-gray-800 rounded-md p-4">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center"
              >
                <label htmlFor="latitude" className="mb-2 mt-10">
                  Latitude:
                </label>
                <input
                  id="latitude"
                  type="number"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  required
                  step="0.0001"
                  className="border border-gray-800 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 mb-4"
                />
                <label htmlFor="longitude" className="mb-2">
                  Longitude:
                </label>
                <input
                  id="longitude"
                  type="number"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  required
                  step="0.0001"
                  className="border border-gray-800 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 mb-4"
                />
                <label htmlFor="date" className="mb-2">
                  Date:
                </label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  max={new Date().toISOString().split("T")[0]}
                  className="border border-gray-800 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 mb-4"
                />
                <button
                  type="submit"
                  className="bg-gray-800 mt-5 hover:bg-gray-700 hover:text-white text-white px-4 py-2 rounded-md"
                >
                  View
                </button>
              </form>
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
            {loading ? (
              <div className="max-w-md w-full md:w-1/2 mt-4 md:mt-0 flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              imageUrl && (
                <div className="max-w-md w-full md:w-1/2 mt-4 md:mt-0">
                  {imageError ? (
                    <p className="text-red-500 mt-4">Error: Image not found</p>
                  ) : (
                    <img
                      src={imageUrl}
                      alt="Earth Imagery"
                      className="max-w-full h-auto"
                      style={{ maxWidth: "100%" }}
                      onError={handleImageError}
                    />
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
