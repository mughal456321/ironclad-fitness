# 🏋️‍♂️ IRONCLAD Elite Fitness

**"Pressure Creates Diamonds."**

IRONCLAD Elite Fitness is a premium, high-intensity e-commerce platform and fitness ecosystem designed for athletes who demand uncompromising mechanical integrity and clinical-grade performance tools. This project features a tactical, industrial aesthetic combined with a robust full-stack architecture.

---

## 🚀 Vision & Importance

In an industry saturated with lifestyle brands, IRONCLAD stands as a technical alternative. We provide the raw assets—hardware, apparel, and metabolic fuel—required for elite performance. This platform serves as a central "Command Control" for athletes to acquire gear, track their progression, and unlock scientific training blueprints.

### Why IRONCLAD?
- **Industrial Reliability:** Every product is subjected to biochemical and mechanical load stress testing.
- **Data-Driven Training:** Curriculums are validated by clinical telemetry, not just fitness trends.
- **Elite Community:** Join "The Brotherhood"—a network of athletes dedicated to pushing cellular failure thresholds.

---

## ✨ Key Features

- **🛒 Precision E-Commerce:** A custom-built catalog for high-tensile hardware (billet steel barbells), reinforced apparel (high-GSM garments), and bio-chemist certified supplements.
- **📂 Digital Curriculums:** Instant access to downloadable training blueprints (Blueprints) validated by clinical telemetry.
- **💎 Iron Points Loyalty System:** A gamified loyalty program where athletes earn "Iron Points" for every purchase, redeemable for exclusive digital content.
- **📊 Athlete Control Panel:** A centralized dossier for order tracking, membership status (Recruit to Obsidian Elite), and curriculum management.
- **🛡️ Tactical UI/UX:** An immersive, high-contrast visual design using a "Vantablack" and "Neon Orange" palette, featuring industrial scanlines and real-time telemetry simulations.
- **🔐 Secure Authentication Terminal:** A robust multi-modal authentication system supporting standard Email/Password registration and Google OAuth 2.0 Sign-In.
- **⚡ Live Telemetry:** Dynamic indicators showing active community members and global performance metrics (Tonnage moved, Blueprints unlocked).

---

## 🛠 Tech Stack

### Frontend
- **Framework:** React 19 (TypeScript)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4 (Custom Industrial Theme)
- **Animations:** Motion (Framer Motion)
- **Icons:** Lucide React

### Backend
- **Server:** Node.js / Express
- **Database:** SQLite (Via `sqlite3` and `sqlite` wrapper)
- **Tooling:** tsx (TypeScript execution)
- **Security:** bcryptjs (Password hashing) & google-auth-library (OAuth 2.0)

---

## 📦 Project Structure

```text
ironclad-elite-fitness/
├── backend/            # Express server & SQLite database logic
│   ├── db.ts           # Database initialization & seeding
│   ├── ironclad.db     # SQLite Database file
│   └── index.ts        # API Endpoints (Auth, Products, Programs, Users, Orders)
├── frontend/           # React application
│   ├── src/
│   │   ├── components/ # Tactical UI Modules (Auth, Hero, ProShop, Curriculum, Dashboard)
│   │   ├── context/    # Global State Management (AppContext)
│   │   ├── types.ts    # TypeScript Type Definitions
│   │   └── data.ts     # Static Product & Athlete Data
└── package.json        # Monorepo configuration & concurrently scripts
```

---

## ⚙️ Local Installation & Deployment

**Prerequisites:** Node.js (v18+)

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/mughal456321/ironclad-fitness.git
    cd ironclad-fitness
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    - Create a `.env` file in the root and `frontend/.env`.
    - Set your `GEMINI_API_KEY` for AI-integrated features.
    - Set `GOOGLE_CLIENT_ID` (backend) and `VITE_GOOGLE_CLIENT_ID` (frontend) for Google Sign-In.
    ```env
    GEMINI_API_KEY="YOUR_API_KEY"
    GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
    ```

4.  **Launch Tactical Systems:**
    ```bash
    npm start
    ```
    - **Frontend Interface:** [http://localhost:3000](http://localhost:3000)
    - **Backend Command:** [http://localhost:5000](http://localhost:5000)

---

## 📡 API Reference

### Authentication
- `POST /api/auth/register`: Initialize a new operator profile.
- `POST /api/auth/login`: Authenticate and access the command panel.
- `POST /api/auth/google`: Secure Google Sign-In synchronization.
- `POST /api/auth/session`: Restore previous tactical sessions.

### Data & Logistics
- `GET /api/products`: Retrieve the full tactical equipment catalog.
- `GET /api/programs`: Fetch available training curriculums.
- `GET /api/user`: Access current athlete dossier and unlocked assets.
- `POST /api/orders`: Process new equipment acquisitions and logistics.
- `POST /api/user/claim-program`: Redeem Iron Points for digital blueprints.

---

## ⚖️ License & Compliance
© 2026 IRONCLAD ELITE SYSTEM INC. ALL TACTICAL RIGHTS SECURED.
STRIKE-FORCE SHIELD VERIFIED v4.51
