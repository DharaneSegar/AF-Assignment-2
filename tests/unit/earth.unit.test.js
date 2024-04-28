/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Earth from '../../src/components/earth';

jest.mock("../../src/components/Header", () => {
    return () => <div>Mocked Header</div>;
  });

  test("renders APOD component", () => {
    render(<Earth />);
    const titleElement = screen.getByText("Earth");
    expect(titleElement).toBeTruthy();
  });

  

