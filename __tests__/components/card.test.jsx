import { render, screen } from "@testing-library/react";
import Card from "../../src/components/Card"; // adjust the path accordingly
import "@testing-library/jest-dom"; // for additional matchers
import { describe, expect, it } from "@jest/globals";


// Mock data for the book
const mockBook = {
  _id: "1",
  BookName: "Test Book",
  AuthorName: "Test Author",
  CoverImage: "/test-image.jpg",
  Price: 10.99,
  Rating: 4.5,
};

describe("Card Component", () => {
  // Test if the Card component renders correctly
  it("renders book details correctly", () => {
    render(<Card book={mockBook} />);

    // Check if the book name, author name, and price are rendered
    expect(screen.getByText(mockBook.BookName)).toBeInTheDocument();
    expect(screen.getByText(mockBook.AuthorName)).toBeInTheDocument();
    expect(screen.getByText(mockBook.Price)).toBeInTheDocument();
  });
  // Check if the book cover image is rendered
  it("renders book cover image", () => {
    render(<Card book={mockBook} />);
    const bookImage = screen.getByAltText(mockBook.BookName);
    expect(bookImage).toBeInTheDocument();
  });

  // Check if the book rating is rendered
//  it("renders book rating", () => {
//     render(<Card book={mockBook} />);
//     const ratingStar = screen.getByTestId("rating-star");
//     expect(ratingStar).toBeInTheDocument();
//   });
it("renders book rating when available", () => {
  render(<Card book={mockBook} />);
  const ratingStar = screen.queryByTestId("rating-star");
  if (mockBook.Rating) {
    expect(ratingStar).toBeInTheDocument();
  } else {
    expect(ratingStar).not.toBeInTheDocument();
  }
});


  // Test if the Link directs to the correct details page
  it("navigates to the correct book details page", () => {
    render(<Card book={mockBook} />);

    const bookLink = screen.getByRole("link");
    expect(bookLink).toHaveAttribute("href", `/view-details/${mockBook._id}`);
  });
});
