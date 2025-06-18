# Create a new tracing project in LangSmith
## Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)
- OpenAI API key
- LangSmith API key (optional, for tracing)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd langsmith-js-test
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root with the following variables:

```env
OPENAI_API_KEY=your-openai-api-key-here
PROJECT_NAME=your-project-name
LANGCHAIN_API_KEY=your-langsmith-api-key-here
```

**Required:**
- `OPENAI_API_KEY` - Your OpenAI API key (get one at [platform.openai.com](https://platform.openai.com))

**Optional:**
- `PROJECT_NAME` - Name for your LangSmith project (defaults to "My Project")
- `LANGCHAIN_API_KEY` - Your LangSmith API key for tracing (get one at [smith.langchain.com](https://smith.langchain.com))

### 4. Run the project

```bash
npm start
```

## Available Scripts

- `npm start` - Run the project once
- `npm run dev` - Run with file watching (auto-restart on changes)
- `npm run build` - Compile TypeScript to JavaScript

## What the project does

This project demonstrates two ways to integrate LangSmith with OpenAI:

1. **Traceable Functions** - Wrapping OpenAI calls with LangSmith tracing
2. **RunTree** - Manual run tracking with LangSmith

The code makes API calls to OpenAI's GPT-4o-mini model and traces the interactions using LangSmith.

## Project Structure

```
langsmith-js-test/
├── index.ts          # Main TypeScript file
├── package.json      # Project dependencies and scripts
├── tsconfig.json     # TypeScript configuration
├── .env              # Environment variables (not committed)
└── .gitignore        # Git ignore rules
```

## Troubleshooting

### "OPENAI_API_KEY environment variable is missing"
- Make sure you have a `.env` file in the project root
- Ensure the API key is correct and not wrapped in quotes

### "401 Unauthorized" errors
- These are expected if you don't have a LangSmith API key
- The project will still work, but tracing won't be available

### TypeScript compilation errors
- Make sure you have Node.js 18+ installed
- Run `npm install` to ensure all dependencies are installed

## Dependencies

- `openai` - OpenAI API client
- `langsmith` - LangSmith SDK for tracing
- `dotenv` - Environment variable loading
- `typescript` - TypeScript compiler
- `ts-node` - Run TypeScript directly
