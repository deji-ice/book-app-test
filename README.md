````markdown
# Book Store

A simple full-stack Book Store built with **Next.js 15**, **React Query**, **Zustand**, **Tailwind CSS**, and **pnpm**.  
Users can browse paginated books, view details, comment with ratings, follow other users, and manage their profiles.

---

**Important:**

This app uses mock data stored in local JSON files for users and books. It is intended to be run in a local development environment only.

> **Note:** Writing to disk (e.g., registering users, adding comments) will not work when deployed to platforms like Vercel, Netlify, or other serverless environments, because they use a read-only file system. For a production-ready app, you should use a database or cloud data service.

---

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **State Management:** React Query, Zustand (`useUserStore`, `useBookStore`)
- **Styling:** Tailwind CSS
- **API Routes:** Next.js Route Handlers (`/app/api`)
- **Providers:** React Query Provider, Zustand store wrapped in `src/providers`
- **Data Source:** Local JSON file (`/src/data/books.json`)
- **Package Manager:** pnpm

---

## Project Structure

src/
├── app/
│ ├── api/ # Route Handlers (auth, books, comments)
│ ├── auth/ # Authentication pages (login, register)
│ ├── books/ # Book-related pages
│ │ ├── [id]/ # Dynamic book detail page
│ │ │ ├── page.tsx # Book detail page
│ ├── users/ # User-related pages
│ │ ├── [id]/ # Dynamic user profile page
│ │ │ ├── page.tsx # User profile page
│ ├── layout.tsx # Main layout with providers
│ ├── globals.css # Global styles
│ ├── page.tsx # Main pages
├── components/ # Reusable UI components
├── hooks/ # Custom React Query hooks
├── store/ # Zustand stores
├── providers/ # React Query & Zustand Providers
├── types/ # Shared TypeScript types
├── data/ # Local books JSON

---

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/deji-ice/book-store-test.git
cd book-store
```
````

2. **Install dependencies**

```bash
pnpm install
```

3. **Run the development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Features

- Register, login, logout (mock auth with Zustand)
- View user profiles, follow/unfollow
- Browse books with pagination
- View detailed book pages
- Add comments and ratings to books
- Responsive UI with Tailwind CSS
- State synced with React Query and Zustand

---

## API Endpoints

- `GET /api/books` — Get paginated books (`?page=1&limit=10`)
- `GET /api/books/:id` — Get a single book by ID
- `POST /api/books/:id/comments` — Add a comment to a book

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login user

- `GET /api/users` — Get all users
- `GET /api/users/:id` — Get a single user by ID
- `GET /api/users/:id/followers` — Get followers of a user
- `POST /api/users/:id/follow` — Follow a user
- `Delete /api/users/:id/follow` — Unfollow a user

---

## Scripts

```bash
pnpm dev     # Run development server
pnpm build   # Build production output
pnpm start   # Run production server
```

---
