// Button.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // for extended matchers
import { Button } from "@/components/ui/Button"; // Adjust the path to your Button component
import { describe, expect, it } from "@jest/globals";
describe("Button Component", () => {
  // Test for default button rendering
  it("renders a default button", () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveTextContent("Click Me");
    expect(buttonElement).toHaveClass("bg-primary");
    expect(buttonElement).toHaveClass("h-9");
  });

  // Test for destructive variant
  it("renders a destructive button", () => {
    render(<Button variant="destructive">Delete</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveTextContent("Delete");
    expect(buttonElement).toHaveClass("bg-destructive");
  });

  // Test for small size variant
  it("renders a small button", () => {
    render(<Button size="sm">Small Button</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass("h-8");
  });

  // Test the asChild prop functionality
  it("renders as a different element when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/home">Home Link</a>
      </Button>
    );
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveTextContent("Home Link");
    expect(linkElement).toHaveAttribute("href", "/home");
  });

  // Test for the outline variant
  it("renders an outline button", () => {
    render(<Button variant="outline">Outline Button</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass("border");
    expect(buttonElement).toHaveClass("bg-background");
  });

  // Test for ghost variant
  it("renders a ghost button", () => {
    render(<Button variant="ghost">Ghost Button</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass("hover:bg-accent");
  });
});
