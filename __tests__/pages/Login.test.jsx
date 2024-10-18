import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "@/page/Login";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import "@testing-library/jest-dom";
import { beforeEach, describe, expect, it,jest } from "@jest/globals";


// Mock external libraries
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));
jest.mock("react-hot-toast", () => ({
  error: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Login form correctly", () => {
    render(<Login/>);

    // Check for the presence of essential elements
    expect(screen.getByText(/sign in to your account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email or phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it("submits form with correct credentials", async () => {
    useSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });
    signIn.mockResolvedValueOnce({ error: null });

    render(<Login />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/email or phone/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/sign in/i));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("credentials", {
        emailOrPhone: "test@example.com",
        password: "password123",
        redirect: false,
      });
    });
  });

  it("displays an error message for invalid credentials", async () => {
    useSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });
    signIn.mockResolvedValueOnce({ error: "Invalid credentials" });

    render(<Login />);

    // Fill in the form with incorrect credentials
    fireEvent.change(screen.getByLabelText(/email or phone/i), {
      target: { value: "invalid@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpassword" },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/sign in/i));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
    });
  });


});
