# SigmaGPT

A full-stack chat application powered by AI.

## Project Structure

- **Backend/** - Express.js server with MongoDB
- **Frontend/** - React application with Vite

## Setup Instructions

### Backend Setup

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Add your credentials to the `.env` file:
   - `GEMINI_API_KEY` - Your Gemini API key
   - `MONGODB_URI` - Your MongoDB connection string

5. Start the development server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the Frontend directory:
   ```bash
   cd Frontent
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Make sure to never commit your `.env` file to version control. Use the `.env.example` file as a template.

## Security Note

If you've accidentally committed sensitive data to Git history:
1. Rotate all exposed credentials immediately
2. Use `git filter-branch` or BFG Repo-Cleaner to remove sensitive data from history
3. Force push the cleaned history

## Technologies Used

- **Frontend**: React, Vite
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **AI**: Google Gemini API
