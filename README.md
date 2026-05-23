# SportIQ 🏟

Interactive sports rules learning app built with React + TypeScript.

## Stack
- React 18 + TypeScript
- Vite
- CSS Variables (no UI library)

## Run locally
```bash
npm install
npm run dev
```

## Deploy (Vercel)
```bash
npm run build
# push to GitHub → connect to Vercel → auto-deploy
```

## Features
- Football & Baseball scenario-based quizzes
- Instant answer feedback with explanations
- Score tracking and end-of-game review
- Responsive (mobile + desktop)

## Add more questions
Edit `src/data/questions.ts` — add a new object to the array with sport, scenario, question, options, correct index, and explanation.
