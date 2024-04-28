import API_KEY from "../../config/apiConfig";
import Header from "../header";
import React from 'react';
import { useState, useEffect } from "react";

// Available cameras
const cameras = [
  { value: "FHAZ", label: "Front Hazard Avoidance Camera" },
  { value: "RHAZ", label: "Rear Hazard Avoidance Camera" },
  { value: "MAST", label: "Mast Camera" },
  { value: "CHEMCAM", label: "Chemistry and Camera Complex" },
  { value: "MAHLI", label: "Mars Hand Lens Imager" },
  { value: "MARDI", label: "Mars Descent Imager" },
  { value: "NAVCAM", label: "Navigation Camera" },
  { value: "PANCAM", label: "Panoramic Camera" },
  {value: "MINITES", label: "Miniature Thermal Emission Spectrometer (Mini-TES)" },
];

export default function Mars() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedCamera, setSelectedCamera] = useState(""); // State to hold the selected camera
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoading(true);
      try {
        const allPhotos = [];
        let currentPage = 1;
        let totalPages = 1;

        // Fetch photos from all pages until all pages are fetched
        while (currentPage <= totalPages) {
          const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${currentPage}&per_page=52&api_key=${API_KEY}${
            selectedCamera ? `&camera=${selectedCamera}` : ""
          }`;
          const response = await fetch(apiUrl);

          if (!response.ok) {
            throw new Error("Failed to fetch photos");
          }

          const data = await response.json();
          allPhotos.push(...data.photos);

          totalPages = data.total_pages;
          currentPage++;
        }

        setPhotos(allPhotos);
      } catch (error) {
        console.error("Error fetching photos:", error);
        setPhotos([]); // Clear photos array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, [selectedCamera]); // Fetch photos when selectedCamera changes

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleSearch = () => {
    // Reset page to 1 when searching
    setPage(1);
  };

  return (
    <>
      <Header />
      <div className="relative overflow-hidden bg-white">
        <div className="container mx-auto p-4 mt-5">
          <h1 className="text-3xl font-bold mb-4 flex justify-center">
            Mars Rover Photos
          </h1>
          <p className="text-lg text-gray-600 mb-4 flex justify-center">
            Image data gathered by NASA's Curiosity, Opportunity, and Spirit
            rovers on Mars.
          </p>
          <div className="flex justify-center mb-4 mt-10 mb-10">
            <select
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
              className="border border-gray-800 px-3 py-2 rounded-l-md focus:outline-none"
            >
              <option value="">Select Camera</option>
              {cameras.map((camera) => (
                <option key={camera.value} value={camera.value}>
                  {camera.label}
                </option>
              ))}
            </select>
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-gray-800 text-white rounded-r-md"
            >
              Search
            </button>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
            </div>
          ) : photos.length === 0 ? (
            <p className="text-center text-red-600">No images found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="bg-gray-800 p-4 rounded-lg">
                  <img
                    src={photo.img_src}
                    alt={`Mars Rover - Sol ${photo.sol}`}
                    className="w-full h-auto rounded-lg mb-2"
                  />
                  <p className="text-sm text-white font-bold mb-1">
                    Earth Date: {photo.earth_date}
                  </p>
                  <p className="text-sm text-white font-bold">
                    Camera: {photo.camera.full_name}
                  </p>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-center mt-4">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="px-4 py-2 mr-2 bg-gray-200 rounded-md"
            >
              Previous Page
            </button>
            <button
              onClick={handleNextPage}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Next Page
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
