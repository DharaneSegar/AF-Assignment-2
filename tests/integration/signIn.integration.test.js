/* eslint-disable no-undef */
import axios from "axios"; // Mock axios
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import SignIn from "../../src/components/signIn";

jest.mock("axios"); // Mock axios for testing

test("renders sign in form and successfully logs in", async () => {
  // Mock the API response for background image
  axios.get.mockResolvedValueOnce({
    data: {
      hdurl: "test-image-url",
    },
  });

  // Mock the API response for login request
  axios.post.mockResolvedValueOnce({
    data: {
      token: "test-token",
    },
  });

  render(<SignIn />);

  // Check if sign in form elements are rendered
  expect(screen.getByLabelText("Email Address")).toBeTruthy();
  expect(screen.getByLabelText("Password")).toBeTruthy();

  // Fill in email and password
  fireEvent.change(screen.getByLabelText("Email Address"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "password123" },
  });

  // Simulate form submission
  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));
  });

  // Wait for the axios request to be called
  await screen.findByText("Logged in successfully");

  // Check if success message is displayed
  expect(screen.getByText("Logged in successfully")).toBeTruthy();
});
