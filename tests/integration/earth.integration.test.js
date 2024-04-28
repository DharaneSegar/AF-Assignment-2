/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";
import Earth from "../../src/components/earth";

jest.mock("../../src/components/Header", () => {
  return () => <div>Mocked Header</div>;
});

jest.mock("../../src/config/apiConfig", () => ({
  API_KEY: "mock-api-key",
}));

describe("Earth component", () => {
  it("renders Earth component correctly", () => {
    const { getByText, getByLabelText } = render(<Earth />);

    // Check if required elements are rendered
    expect(getByText("Earth")).toBeTruthy();
    expect(getByLabelText("Latitude:")).toBeTruthy();
    expect(getByLabelText("Longitude:")).toBeTruthy();
    expect(getByLabelText("Date:")).toBeTruthy();
    expect(getByText("View")).toBeTruthy();
  });
});
