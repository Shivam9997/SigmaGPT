w e# SigmaGPT Deployment Guide

Aapne bola tha ki aap khud deploy karenge, toh yeh complete guide hai.

---

## Step 1: GitHub Pe Upload Karna

```bash
# Project root folder mein jao (SIGMAGPT folder)
git init
git add .
git commit -m "Initial commit - ready for deployment"

# GitHub pe ek naya repository banao (e.g., SigmaGPT)
# Phir yeh commands run karo:
git remote add origin https://github.com/aapka-username/SigmaGPT.git
git branch -M main
git push -u origin main
```

---

## Step 2: Backend Deploy Karna (Render.com)

### A) Render.com pe jao: https://render.com
### B) "New" → "Web Service" select karo
### C) GitHub repo connect karo
### D) **Important:** Root directory select karo: `Backend`

**Settings:**
- **Name:** `sigmagpt-backend`
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** Free

**Important:** Root Directory select karna zaroori hai!
**Note:** `Backend/.render.yaml` file automatically configure hoga. Agar nahi hota, toh manually yeh settings use karo:
- **Root Directory:** `Backend` (ya `Back-end` jaisa folder name ho)

**Environment Variables add karo:**
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
FRONTEND_URL=https://aapka-frontend-url.vercel.app
```

### MongoDB Atlas Setup (Agar nahi hai toh):
1. https://www.mongodb.com/cloud/atlas pe jao
2. Free cluster banao
3. Database user create karo
4. Network Access → Add IP Address → `0.0.0.0/0` (Allow from anywhere)
5. Connect → Drivers → Node.js → Connection string copy karo

### Deploy hone ke baad:
Backend URL note kar lo (e.g., `https://sigmagpt-backend.onrender.com`)

---

## Step 3: Frontend Deploy Karna (Vercel)

### A) Vercel pe jao: https://vercel.com
### B) "Add New Project" → GitHub repo import karo

**Settings:**
- **Framework Preset:** Vite
- **Root Directory:** `Frontent` (ya jo bhi aapka frontend folder hai)

**Environment Variables add karo:**
```
VITE_API_BASE_URL=https://aapka-backend-url.onrender.com
```

### Important: `.env.production` Update Karna

`Frontent/.env.production` mein actual backend URL daalna:
```env
VITE_API_BASE_URL=https://sigmagpt-backend.onrender.com
```

Phir commit aur push karo:
```bash
git add .
git commit -m "Update production API URL"
git push
```

### Vercel mein redeploy hoga automatically.

---

## Step 4: Backend CORS Update Karna

Backend deploy hone ke baad, `Backend/server.js` mein `FRONTEND_URL` environment variable mein actual Vercel URL daalna.

Render dashboard → Environment → edit:
```
FRONTEND_URL=https://aapka-frontend.vercel.app
```

---

## Changes Summary (Jo maine kar diye hain)

### 1. Backend/package.json
- `"start": "node server.js"` script add kiya hai
- `"dev": "nodemon server.js"` for local development

### 2. Backend/server.js
- Port ab dynamic hai: `process.env.PORT || 8000`
- CORS ab dynamic hai: `process.env.FRONTEND_URL || "http://localhost:5173"`

### 3. Frontent/src/utils/api.js
- `API_BASE_URL` ab environment variable se aata hai
- Local mein fallback: `http://localhost:8000`

### 4. Frontent/src/Login.jsx
- Hardcoded `http://localhost:8000` hata diya
- Ab `import.meta.env.VITE_API_BASE_URL` use hota hai

### 5. Frontent/.env.production
- Production API URL ke liye ready hai
- Aapko sirf actual backend URL daalni hai

### 6. Frontent/vercel.json
- SPA routing ke liye configure kiya hai
- Refresh karne pe bhi sahi page milega

### 7. Backend/.env.example
- Saare required environment variables listed hain

---

## Local Testing

Deploy karne se pehle local mein test karo:

```bash
# Backend start karo
cd Backend
npm install
npm run dev

# New terminal mein Frontend start karo
cd Frontent
npm install
npm run dev
```

---

## Troubleshooting

### CORS Error
- Backend ke `FRONTEND_URL` mein exact Vercel URL hona chahiye (trailing slash nahi hona chahiye)

### API Not Working
- `Frontent/.env.production` mein backend URL sahi hona chahiye
- `https` use karo, `http` nahi

### MongoDB Connection Fail
- MongoDB Atlas mein IP whitelist check karo (`0.0.0.0/0`)
- Connection string mein password sahi hona chahiye

### Build Fail on Vercel
- Root directory `Frontent` set karna mat bhoolna
- `vite` dependency installed honi chahiye

---

Good luck with deployment! 🚀

