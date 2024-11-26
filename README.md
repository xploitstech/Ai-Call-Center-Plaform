# AI Call Center Platform

AI Call Center is a cutting-edge platform that leverages artificial intelligence to revolutionize customer support operations. Our platform enables businesses to provide 24/7 customer support through AI agents that can understand, respond, and learn from interactions.

## Features

- 🤖 **AI-Powered Agents**: Create and customize AI agents for your business needs
- 🌍 **Multi-Language Support**: Support for multiple languages including English and Hindi
- 🔒 **Secure Authentication**: Built-in authentication using Supabase
- 📊 **Analytics Dashboard**: Track and analyze your agent's performance
- ⚡ **Real-time Responses**: Instant customer support through AI agents
- 🎯 **Custom Configuration**: Tailor your agents with custom prompts and greetings

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase, PostgreSQL, Drizzle ORM
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **Icons**: Lucide Icons

## Getting Started

For detailed setup instructions and contribution guidelines, please refer to our [Contribution Guide](./instructions/CONTRIBUTING.md).

### Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-call-center.git
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_database_url
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@aicallcenter.com or join our Slack channel.
