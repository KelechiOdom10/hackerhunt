[![License](https://img.shields.io/github/license/falberthen/ecommerceddd.svg)](LICENSE)

# HackerHunt

## What is HackerHunt?

- It is a Hackernews inspired social news and sharing webapp/platform.

## Introduction

The goal of this project was to create a platform that provided the social aspect of news sharing similar to Hackernews but with a Produchunt feel to it. I wanted to learn all about design principles on both frontend and backend while building a fullstack GraphQL Next.js application to make this work.

### Key Features

- Authentication
  - Login
  - Sign Up
- View feed with posts with generated preview fields associated with links
- Create posts with tags assigned
- Like and Unlike posts
- Comment on posts
- Logout functionality
- View list of software engineering jobs available in the UK

## Technologies 🔧

- Next.js(React)
- TypeScript
- GrahQL
- TypeGraphQL
- Apollo
- Prisma
- Chakra UI
- SWR
- React Icons
- React Hook Form

## Installation 💾

```bash
git clone https://github.com/KelechiOdom10/hackerhunt.git
```

Fill your `.env` variables:

```
DATABASE_URL="postgresql://<POSTGRES_USER>:<POSTGRES_PASSWORD>@<POSTGRES_HOST>:<POSTGRES_PORT>/<POSTGRES_DB>?schema=public&sslmode=prefer"
SECRET=
```

Install deps:

```bash
npm install
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run Next dev server:

```bash
npm run dev
```

## TODO

- [x] Add profile page for users to view all their likes, comments, posts and general information
- [x] Add search functionality
- [x] Add tags features (Find posts with tags selected)
- [x] Add Meta tags to pages for SEO purposes
- [x] Deploy app to prod
- [x] Add animations (Learn Framer Motion)
- [x] Switch from Postgres to mySQL
- [x] Switch to React Query to fix Server Side problems
- [ ] Add proper error handling
- [ ] Add ability to comment on a comment

## Contributing

This is an open source project, and contributions of any kind are welcome and appreciated. Open issues, bugs, and feature requests are all listed on the [issues](https://github.com/KelechiOdom10/hackerhunt/issues) tab and labeled accordingly. Feel free to open bug tickets and make feature requests.
