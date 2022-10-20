import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";

import Form from "./form";

const server = setupServer(
  rest.get("/products", (req, res, ctx) => res(ctx.status(201)))
);

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
afterAll(() => server.close());
beforeEach(() => render(<Form />));
afterEach(() => server.resetHandlers());

describe("when the form is mounted", () => {
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

  test("should render the form buttons", async () => {
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });
});

describe("when the user submit", () => {
  test("should display validation messages", async () => {
    expect(screen.queryByText(/The name isrequired/i)).not.toBeInTheDocument();
    const button = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.queryByText(/The name isrequired/i)).toBeInTheDocument();
      expect(screen.queryByText(/The size isrequired/i)).toBeInTheDocument();
      expect(screen.queryByText(/The type isrequired/i)).toBeInTheDocument();
    });
  });
});

describe("Whenn the user blurs an empty field", () => {
  test("should diaplay a validation error messages name", () => {
    expect(screen.queryByText(/The name isrequired/i)).not.toBeInTheDocument();
    const inputName = screen.getByLabelText(/name/i);
    fireEvent.blur(inputName, {
      target: { name: "name", value: "" },
    });
    expect(screen.queryByText(/The name isrequired/i)).toBeInTheDocument();
  });
  test("should diaplay a validation error messages size", () => {
    expect(screen.queryByText(/The size isrequired/i)).not.toBeInTheDocument();
    const inputName = screen.getByLabelText(/size/i);
    fireEvent.blur(inputName, {
      target: { name: "size", value: "" },
    });
    expect(screen.queryByText(/The size isrequired/i)).toBeInTheDocument();
  });
});

describe("when the user submits the form", () => {
  test("should the submit button disabled unitel the request is done", async () => {
    const submitBtn = screen.getByRole("button", { name: /submit/i });
    expect(submitBtn).not.toBeDisabled();
    fireEvent.click(submitBtn);
    expect(submitBtn).toBeDisabled();
    await waitFor(() => expect(submitBtn).not.toBeDisabled());
  });
});
