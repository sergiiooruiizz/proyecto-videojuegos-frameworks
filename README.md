# Proyecto Videojuegos y Plataformas

Aplicación Full-Stack desarrollada con Node.js, Express, Prisma (SQLite) y React + Vite.

## Estructura del repositorio
- `backend/`: API REST con Express y ORM Prisma.
- `frontend/`: Interfaz web con React y Vite.
- `.gitignore` y `.node-version`: Configuración global del repositorio.

## URLs en producción (Render)
- **Backend (API):** https://proyecto-videojuegos-frameworks.onrender.com
- **Frontend (Web):** https://web-videojuegos-sergio.onrender.com

## Ejecución en local
1. **Backend:**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm run dev
   ```

2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Variables de entorno (sin valores reales)
- **Backend (`backend/.env`):** `DATABASE_URL`, `API_KEY`, `FRONTEND_URL`, `NODE_ENV`, `NODE_VERSION`.
- **Frontend (`frontend/.env`):** `VITE_API_URL`, `NODE_VERSION`.