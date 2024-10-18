import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, jest, test } from '@jest/globals'; // Import jest here
import axios from 'axios';
// import toast from 'react-hot-toast';
import '@testing-library/jest-dom';
import SignUp from '@/page/SignUp';


// Mock axios and toast
jest.mock('axios'); // Ensure axios is mocked
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

// Mock next/navigation
// Update the existing mock or add this if it doesn't exist
jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: jest.fn(() => '/'),
  }),
}));


// Ensure axios.post is a mock function
beforeEach(() => {
  axios.post = jest.fn(); // Ensure axios.post is properly mocked

  // Mock useSearchParams with a functional implementation
  // useSearchParams.mockReturnValue({
  //   get: jest.fn(() => null),
  // });
  
});

// Your test cases
describe('SignUp Component', () => {
  

  test('renders SignUp component correctly', () => {
    render(<SignUp />);
    expect(screen.getByText(/Sign up to your account/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
  });

  // test('displays error if passwords do not match', () => {
  //   render(<SignUp />);
  //   fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
  //   fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password456' } });
  //   fireEvent.submit(screen.getByRole('button', { name: /Get started/i }));
  //   expect(toast.error).toHaveBeenCalledWith("Password doesn't match!");
  // });
  
});
