# Issue Tracker

A full-stack issue tracking application built with Next.js 16, featuring authentication, real-time updates, and comprehensive issue management capabilities.

## Features

- 🔐 **Authentication**: Secure authentication powered by NextAuth.js
- 📝 **Issue Management**: Create, edit, delete, and track issues with different statuses
- 👥 **User Assignment**: Assign issues to team members
- 📊 **Dashboard**: Visual analytics with charts and issue summaries
- 🔍 **Filtering**: Filter issues by status (Open, In Progress, Closed)
- 📄 **Pagination**: Efficient browsing of large issue lists
- ✨ **Rich Text Editor**: Markdown support for detailed issue descriptions
- 🎨 **Modern UI**: Beautiful interface built with Radix UI Themes
- 🔔 **Toast Notifications**: Real-time feedback for user actions
- 📈 **Error Monitoring**: Integrated Sentry for error tracking

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **UI Components**: [Radix UI Themes](https://www.radix-ui.com/themes)
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **Data Fetching**: TanStack React Query (React Query)
- **Charts**: Recharts
- **Markdown Editor**: SimpleMDE/EasyMDE
- **Error Tracking**: Sentry
- **Database Acceleration**: Prisma Accelerate

## Database Schema

The application uses three main models:

- **Issue**: Tracks issues with title, description, status, and assigned user
- **User**: Manages user accounts and authentication
- **Account/Session**: Handles NextAuth.js authentication sessions

Issue statuses: `OPEN`, `IN_PROGRESS`, `CLOSED`

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- MongoDB database
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Thanushangit/Issue-Tracker.git
cd issue-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory and add:
```env
DATABASE_URL="your-mongodb-connection-string"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
# Add your OAuth provider credentials (Google, GitHub, etc.)
```

4. Generate Prisma Client:
```bash
npx prisma generate
```

5. Push the database schema:
```bash
npx prisma db push
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                      # Next.js App Router
│   ├── api/                 # API routes
│   ├── auth/                # Authentication configuration
│   ├── components/          # Shared components
│   ├── issues/              # Issue pages and components
│   └── ZodValidationSchemas/ # Validation schemas
├── lib/                     # Utility libraries
├── prisma/                  # Database schema
└── public/                  # Static assets
```

## Key Features Explained

### Issue Management
- Create new issues with title and markdown description
- Edit existing issues
- Delete issues with confirmation
- Assign issues to team members
- Filter issues by status
- Paginated issue list

### Dashboard
- Visual charts showing issue distribution
- Latest issues summary
- Quick statistics overview

### Authentication
- Secure user authentication
- OAuth integration support
- Protected routes and API endpoints

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deploy on Vercel

The easiest way to deploy this application is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to a Git repository
2. Import your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

For more details, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
