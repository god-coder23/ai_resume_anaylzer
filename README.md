# AI Resume Analyser

AI Resume Analyser is a modern React application that helps users compare a resume against a target job description and receive AI-generated feedback. It is designed to make resume reviews faster, clearer, and more actionable before applying for a role.

## Overview

The app guides users through a simple workflow:

1. Upload a resume file.
2. Paste a job description.
3. Extract resume content in the browser.
4. Send both inputs to an AI endpoint for analysis.
5. Display a readable match summary with suggestions.

## Features

- Clean, responsive interface built with React and Vite
- Drag-and-drop resume upload experience
- Supports `.pdf`, `.doc`, and `.docx` file selection
- Client-side PDF text extraction using `pdf-parse`
- Job description input for targeted review
- AI-generated feedback focused on alignment, gaps, and improvements
- Loading and error states for a smoother user experience

## Tech Stack

- React 19
- Vite
- Tailwind CSS 4
- Lucide React
- `pdf-parse`
- Cloudfare

## Project Structure

```text
ai_resume_analyser/
├── public/
├── src/
│   ├── components/
│   │   ├── AI_Response.jsx
│   │   ├── Heading.jsx
│   │   └── Upload.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Then open the local Vite URL shown in the terminal, usually `http://localhost:5173`.

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How It Works

- The resume is selected through the upload area.
- If the file is a PDF, the app extracts text in the browser using `pdf-parse`.
- The user pastes a target job description into the textarea.
- The frontend sends a trimmed portion of both texts to a deployed AI endpoint.
- The returned response is shown as a formatted review summary.

## API Integration

The frontend currently sends analysis requests to this endpoint:

```text
https://odd-surf-c38e.yatnesh65.workers.dev/
```

The request body includes:

- `parsedDoc`
- `jobDes`

If you plan to deploy or extend the project, you may want to move this endpoint into an environment-based configuration instead of hardcoding it in the frontend.

## Notes

- PDF parsing is handled directly in the client.
- The current implementation accepts `.doc` and `.docx` files in the UI, but non-PDF files rely on plain text reading behavior in the browser.
- The AI response uses truncated input lengths to keep requests manageable.

## Future Improvements

- Add environment variables for API configuration
- Support true `.doc` and `.docx` parsing
- Add copy/download options for the generated feedback
- Introduce scoring, keyword highlights, and section-based analysis
- Add automated tests for upload and response flows

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## License

This project is currently for personal or educational use unless a separate license is added.
