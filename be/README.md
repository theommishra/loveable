# Backend API

Express.js backend server that uses Google Gemini AI to analyze projects and provide intelligent responses with context-aware prompts.

## Features

- **Project Type Detection**: Analyzes project prompts and determines whether they should use Node.js or React
- **Chat API**: Provides AI-powered chat functionality with custom system prompts
- **Template Prompts**: Returns appropriate base prompts and UI prompts based on detected project type

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API key

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

## Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Build and run the compiled JavaScript
- `npm start` - Run the server using ts-node (requires ts-node to be installed)

## API Endpoints

### POST `/template`

Analyzes a project prompt and returns appropriate template prompts based on whether the project should be Node.js or React.

**Request Body:**
```json
{
  "prompt": "Create a todo list application"
}
```

**Response (React):**
```json
{
  "prompts": [
    "BASE_PROMPT...",
    "Here is an artifact that contains all files..."
  ],
  "uiPrompts": ["reactBasePrompt..."]
}
```

**Response (Node):**
```json
{
  "prompts": [
    "Here is an artifact that contains all files..."
  ],
  "uiPrompts": ["nodeBasePrompt..."]
}
```

**Response (Error):**
```json
{
  "message": "You cant access this"
}
```
Status: `403 Forbidden`

### POST `/chat`

Provides AI chat functionality with system prompts.

**Request Body:**
```json
{
  "messages": "User's message here"
}
```

**Response:**
```json
{
  "response": "AI generated response"
}
```

## Project Structure

```
be/
├── src/
│   ├── index.ts          # Main Express server and API routes
│   ├── prompt.ts         # System prompts and base prompts
│   ├── constants.ts      # Application constants
│   ├── stripindents.ts   # Utility for removing indentation
│   └── defaults/
│       ├── node.ts       # Node.js template prompt
│       └── react.ts      # React template prompt
├── dist/                 # Compiled JavaScript output
├── package.json
├── tsconfig.json         # TypeScript configuration
└── README.md
```

## Configuration

The server runs on port `3001` by default. To change this, modify the `app.listen()` call in `src/index.ts`.

The AI model used is `gemini-2.5-flash`. You can change this in the API calls within `src/index.ts`.

## Development

1. Make changes to TypeScript files in `src/`
2. Compile: `npm run build`
3. Run: `npm run dev`

Or use `npm start` if you have ts-node installed for direct TypeScript execution.

## Technology Stack

- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **Google Gemini AI** - AI/ML capabilities
- **dotenv** - Environment variable management

## License

[Add your license here]

