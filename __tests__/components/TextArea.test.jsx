// Textarea.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // for the extended matchers
import { Textarea } from '@/components/ui/Textarea'; // Adjust the path to your Textarea component
import { describe, expect, it } from "@jest/globals";

describe('Textarea Component', () => {
  // Test the Textarea component
  it('renders correctly', () => {
    render(<Textarea placeholder="Enter your text here" />);
    const textareaElement = screen.getByPlaceholderText('Enter your text here');
    expect(textareaElement).toBeInTheDocument();

    
    expect(textareaElement).toHaveClass('min-h-[60px] w-full rounded-md border border-input');
  });

  
  it('applies custom className', () => {
    render(<textarea className="custom-class" />);
    const textareaElement = screen.getByRole('textbox');

   
    expect(textareaElement).toHaveClass('custom-class');
  });

  
  it('renders disabled Textarea', () => {
    render(<Textarea disabled />);
    const textareaElement = screen.getByRole('textbox');

    
    expect(textareaElement).toBeDisabled();
  });

  // Test Textarea input 
  it('handles typing', () => {
    render(<Textarea />);
    const textareaElement = screen.getByRole('textbox');

    //  users can type in the textarea
    expect(textareaElement).toBeInTheDocument();
    expect(textareaElement).not.toBeDisabled();
  });
});

