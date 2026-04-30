# Vercel Deployment TODO

## Phase 1: Backend Production Setup
- [ ] Add `start` script to `Backend/package.json`
- [ ] Update CORS in `Backend/server.js` to allow production frontend URL
- [ ] Make port dynamic using `process.env.PORT`
- [ ] Create `Backend/.env.example`

## Phase 2: Frontend Production Setup
- [ ] Update `Frontent/src/utils/api.js` to use environment variable for API_BASE_URL
- [ ] Update `Frontent/src/Login.jsx` to use API_BASE_URL instead of hardcoded localhost
- [ ] Create `Frontent/.env.production` with deployed backend URL
- [ ] Create `Frontent/vercel.json` for SPA routing

## Phase 3: Deployment
- [ ] Push code to GitHub
- [ ] Deploy Backend to Render/Railway
- [ ] Deploy Frontend to Vercel
- [ ] Update environment variables on both platforms
- [ ] Test the deployed application

