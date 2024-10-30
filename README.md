# ReadShop - An Online Bookshop

ReadShop is a full-stack e-commerce application for discovering, buying, and managing books. Designed with both users and administrators in mind, it provides a streamlined, AI-powered experience for online book shopping.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Live Demo](#live-demo)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

ReadShop allows users to browse, filter, and purchase books from an extensive catalog, with features that make book discovery easy and enjoyable. Administrators can manage inventory, discounts, and user feedback, while authors have dedicated profile pages for promoting their work. The AI-powered chatbot provides customer support, making it easy for users to get book recommendations or assistance with purchases.

### Key Goal

Make book shopping easy, enjoyable, and accessible for all users while supporting book-selling businesses with a simple, modern platform.

## Features

- **Powerful Search & Filtering**: Search by title, author, genre, and more, with refined filters.
- **Cart Management**: Add books, update quantities, and view dynamic pricing.
- **Checkout with Stripe**: Complete purchases with a secure, cashless checkout system.
- **Author Spotlight**: Dedicated profile pages for authors, showing biographies and book listings.
- **Wishlist & Readlist**: Track books for future reading and keep a record of completed reads.
- **Genre-Based Categorization**: Discover books by genre from the homepage.
- **Recently Viewed**: Revisit books from previous sessions, stored in local storage.
- **Review & Rating**: Users can read and submit book reviews and ratings.
- **AI-Powered Chatbot**: Customer support chatbot for assistance and book recommendations.
- **Discount Coupons**: Apply codes for savings, with coupon management from the admin dashboard.

---

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, ShadCN UI
- **Backend**: Next.js API Routes, Node.js, MongoDB
- **Authentication**: NextAuth.js
- **AI Integration**: Gemini API
- **Deployment**: Vercel (frontend and backend)
- **Payment Processing**: Stripe
- **Testing**: Jest

---

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/readshop.git
   cd readshop

   ```

2. Install Dependencies

```
   npm install
```

3. Configure Environment Variables

   - Create a .env.local file in the root directory.
   - Follow the structure in .env.example to set up your environment variables.

4. Start MongoDB
   - Ensure MongoDB is running locally or use a cloud-based solution like MongoDB Atlas.

## Running the Application

1. Run the Development Server

```
   npm run dev
```

- Visit [http://localhost:3000](http://localhost:3000) in your browser to view the application.

2. Run Tests

```
   npm test
```

## Live Demo

Check out the live version of ReadShop: [Live Link](https://readshop.vercel.app)

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch with a descriptive name.
3. Make changes and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
