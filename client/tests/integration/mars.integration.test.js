/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Mars from "../../src/components/mars";

jest.mock("../../src/components/Header", () => {
  return () => <div>Mocked Header</div>;
});

describe("Mars component - Unit Tests", () => {
  const mockData = {
    photos: [
      {
        id: 1,
        img_src: "https://example.com/image1.jpg",
        sol: 1000,
        earth_date: "2024-04-25",
        camera: { full_name: "Test Camera" },
      },
    ],
  };

  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
        ok: true,
      })
    );
  });

  it("fetches and displays photos with selected camera", async () => {
    render(<Mars />);

    // Wait for the component to finish rendering
    await waitFor(() => {
      expect(screen.getByText("Mars Rover Photos")).toBeTruthy();
    });

    await waitFor(() => {
      expect(screen.getByAltText("Mars Rover - Sol 1000")).toBeTruthy();
    });
  });
});
