# Loveable

A full-stack application featuring an AI-powered backend that analyzes projects and provides intelligent responses, paired with a React frontend.

## Project Structure

```
loveable/
├── be/                    # Backend Express API
│   ├── src/
│   │   ├── index.ts       # Main Express server and API routes
│   │   ├── prompt.ts      # System prompts and base prompts
│   │   ├── constants.ts   # Application constants
│   │   ├── stripindents.ts # Utility functions
│   │   └── defaults/      # Template prompts for Node.js and React
│   ├── dist/              # Compiled JavaScript output
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    └── frontend/          # React frontend application
        ├── src/
        │   ├── App.tsx    # Main React component
        │   ├── main.tsx   # Entry point
        │   └── index.css  # Global styles
        ├── public/
        ├── package.json
        ├── vite.config.ts # Vite configuration
        └── tsconfig.json
```

## Features

### Backend (`be/`)
- **Project Type Detection**: Analyzes project prompts using Google Gemini AI to determine if they should be Node.js or React projects
- **Chat API**: Provides AI-powered chat functionality with custom system prompts
- **Template Prompts**: Returns appropriate base prompts and UI prompts based on detected project type

### Frontend (`frontend/frontend/`)
- **React Application**: Modern React app built with Vite
- **TypeScript**: Full TypeScript support
- **ESLint**: Code quality and linting

## Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Google Gemini API Key** (for backend)

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd loveable
```

### 2. Install root dependencies

```bash
npm install
```

### 3. Setup Backend

```bash
cd be
npm install
```

Create a `.env` file in the `be/` directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Setup Frontend

```bash
cd ../frontend/frontend
npm install
```

## Development

### Running the Backend

From the `be/` directory:

```bash
# Build and run
npm run dev

# Or build only
npm run build

# Or run with ts-node (requires ts-node)
npm start
```

The backend server will run on **port 3001** by default.

### Running the Frontend

From the `frontend/frontend/` directory:

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

The frontend development server typically runs on **port 5173** (Vite default).

## API Documentation

### Backend Endpoints

#### POST `/template`

Analyzes a project prompt and returns appropriate template prompts.

**Request:**
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

#### POST `/chat`

Provides AI chat functionality with system prompts.

**Request:**
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

## Technology Stack

### Backend
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **Google Gemini AI** (`@google/genai`) - AI/ML capabilities
- **dotenv** - Environment variable management

### Frontend
- **React** (v19.2.0) - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** (v7.2.4) - Build tool and dev server
- **ESLint** - Code linting

## Configuration

### Backend Configuration

- **Port**: Default is `3001`. Change in `be/src/index.ts`
- **AI Model**: Uses `gemini-2.5-flash`. Change in API calls within `be/src/index.ts`
- **TypeScript**: Configured in `be/tsconfig.json`
  - Module: CommonJS
  - Target: ESNext
  - Strict mode enabled

### Frontend Configuration

- **Port**: Default is `5173` (Vite). Configured in `frontend/frontend/vite.config.ts`
- **TypeScript**: Multiple config files for different environments
  - `tsconfig.json` - Root config
  - `tsconfig.app.json` - App-specific config
  - `tsconfig.node.json` - Node-specific config

## Environment Variables

### Backend (`.env` in `be/` directory)

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

## Build & Deployment

### Backend

```bash
cd be
npm run build
# Output: be/dist/
```

### Frontend

```bash
cd frontend/frontend
npm run build
# Output: frontend/frontend/dist/
```

## Scripts Reference

### Backend (`be/package.json`)
- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Build and run the compiled JavaScript
- `npm start` - Run with ts-node (requires ts-node)

### Frontend (`frontend/frontend/package.json`)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[Add your license here]

## Support

For issues and questions, please open an issue on the repository.

