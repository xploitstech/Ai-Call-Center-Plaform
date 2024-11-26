# Contributing to AI Call Center

Thank you for your interest in contributing to AI Call Center! This document provides guidelines and instructions for setting up the project for development.

## Development Setup

### Prerequisites

- Node.js 18.x or higher
- pnpm 8.x or higher
- PostgreSQL 14.x or higher
- Git

### Setting Up Your Development Environment

1. **Fork and Clone the Repository**
```bash
git clone https://github.com/yourusername/ai-call-center.git
cd ai-call-center
```

2. **Install Dependencies**
```bash
pnpm install
```

3. **Set Up Environment Variables**
Copy the `.env.example` file to `.env.local` and fill in your values:
```bash
cp .env.example .env.local
```

Required environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_database_url
```

4. **Set Up Supabase**
- Create a new project on [Supabase](https://supabase.com)
- Copy the project URL and anon key to your `.env.local`
- Enable Email/Password authentication in the Auth settings

5. **Set Up the Database**
```bash
# Generate the database schema
pnpm db:generate

# Push the schema to your database
pnpm db:push
```

6. **Start the Development Server**
```bash
pnpm dev
```

### Project Structure

```
ai-call-center/
├── app/                    # Next.js app directory
├── components/            # React components
├── lib/                   # Utility functions and configurations
├── db/                    # Database schema and migrations
├── public/               # Static assets
└── instructions/         # Documentation and guides
```

## Development Workflow

1. **Create a New Branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Make Your Changes**
- Follow the existing code style
- Add comments for complex logic
- Update tests if necessary

3. **Run Tests and Linting**
```bash
pnpm lint
pnpm test
```

4. **Commit Your Changes**
Follow the conventional commits specification:
```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve issue with..."
```

5. **Push and Create a Pull Request**
```bash
git push origin feature/your-feature-name
```

## Code Style Guidelines

- Use TypeScript for all new files
- Follow the existing project structure
- Use shadcn/ui components when possible
- Follow the Tailwind CSS class ordering convention
- Use proper TypeScript types and interfaces

## Testing

- Write tests for new features
- Ensure existing tests pass
- Test across different browsers
- Check mobile responsiveness

## Documentation

- Update README.md if needed
- Document new features
- Add JSDoc comments for functions
- Update API documentation

## Need Help?

- Check existing issues and pull requests
- Join our Discord community
- Contact the maintainers

## License

By contributing to AI Call Center, you agree that your contributions will be licensed under its MIT license. 