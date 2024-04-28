/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import APOD from "../../src/components/apod";

// Mock fetch function to simulate API response
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockApodData),
    ok: true,
  })
);

const mockApodData = {
  title: "Test APOD Title",
  date: "2024-04-25",
  explanation: "Test APOD explanation",
  url: "https://example.com/test-image.jpg",
};

// Mocking the Header component to avoid useLocation error
jest.mock("../../src/components/header", () => {
  return () => <div>Mocked Header</div>;
});

describe("APOD component", () => {
  it("renders APOD component with default data", async () => {
    render(<APOD />);

    // Check if APOD title is rendered
    await waitFor(() => {
      expect(
        screen.getByText("APOD - Astronomy Picture of the Day")
      ).toBeTruthy();
    });

    // Check if APOD default content is rendered (using a regular expression to match part of the text)
    await waitFor(() => {
      expect(
        screen.getByText(/Each day a different image or photograph/i)
      ).toBeTruthy();
    });

    // Check if APOD image is rendered
    await waitFor(() => {
      expect(screen.getByAltText("Test APOD Title")).toBeTruthy();
    });

    // Check if APOD explanation is rendered
    await waitFor(() => {
      expect(screen.getByText("Test APOD explanation")).toBeTruthy();
    });
  });
});
