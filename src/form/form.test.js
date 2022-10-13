import React from "react";
import { screen, render } from "@testing-library/react";

import Form from "./form";

describe("when the form is mounted", () => {
  beforeEach(() => render(<Form />));

  test("should render the form", () => {
    expect(screen.getByRole("heading", { name: /form/i })).toBeInTheDocument();
  });
  test("should render the form all elements", async () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/size/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/type/i)).toBeInTheDocument();

    expect(screen.getByText(/electronic/i)).toBeInTheDocument();
    expect(screen.getByText(/furniture/i)).toBeInTheDocument();
    expect(screen.getByText(/clothing/i)).toBeInTheDocument();
  });
});
