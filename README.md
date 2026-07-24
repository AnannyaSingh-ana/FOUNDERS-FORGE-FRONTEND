# Founders' Forge — Frontend

Next.js frontend for Founders' Forge. Takes a business idea, target country, and target customer, and renders the AI-generated business plan returned by the backend.

## Tech Stack
- Next.js (App Router)
- React + TypeScript
- Tailwind CSS

## Setup

1. Clone the repository:

git clone https://github.com/[your-username]/founders-forge-frontend.git
cd founders-forge-frontend


2. Install dependencies:

npm install


3. Copy `.env.local.example` to `.env.local` and set the backend URL:

NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000

   (Use your deployed Render backend URL instead of localhost when testing against production.)

4. Run the development server:

npm run dev


5. Open `http://localhost:3000` in your browser.

## Usage

1. Enter a business idea, target country, and target customer.
2. Click "Generate business plan."
3. Wait 1–2 minutes while the 9 agents run.
4. View the completed plan — snapshot investment score, market research, competitors, historical failures, finance, SWOT, marketing, legal notes, and a founder recommendation.
