/* eslint-disable no-undef */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SignIn from "../../src/components/signIn";

describe("SignIn component unit tests", () => {
  it("renders the SignIn component correctly", () => {
    const { getAllByText, getByLabelText } = render(<SignIn />);
    expect(getAllByText("Sign in").length).toBeTruthy(); // Check if there's at least one element with 'Sign in' text
    expect(getByLabelText("Email Address")).toBeTruthy(); // Check if the 'Email Address' input exists
    expect(getByLabelText("Password")).toBeTruthy(); // Check if the 'Password' input exists
  });

  it("updates email and password state when inputs change", () => {
    const { getByLabelText } = render(<SignIn />);
    const emailInput = getByLabelText("Email Address");
    const passwordInput = getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });
});
