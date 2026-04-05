# 🌌 Futuristic Anti-Gravity Portfolio - Official Guide

Welcome to the **Futuristic Anti-Gravity Portfolio**! This is a high-performance, deeply interactive developer portfolio built with a unique "Anti-Gravity" aesthetic. This document provides a complete overview of the project's architecture, technologies, and setup.

---

## 🚀 1. Project Overview
*   **Developer:** Yuvaraj
*   **Live Link:** [https://yuvaraj-dev-portfolio.vercel.app/](https://yuvaraj-dev-portfolio.vercel.app/)
*   **GitHub Repository:** [https://github.com/yuvarajaug-ctrl/Portfolio](https://github.com/yuvarajaug-ctrl/Portfolio)

### Core Mission
To provide a premium, interactive digital presence that not only showcases projects but also tracks visitor engagement through advanced analytics.

---

## 🛠 2. Tech Stack & Libraries

### Frontend Core
*   **HTML5/CSS3**: Modern semantic structure and advanced CSS variables for theme management.
*   **Vanilla JavaScript (ES6+)**: Custom logic for all UI interactions, completely framework-free for maximum performance.

### 3D Graphics & Animations
*   **[Three.js](https://threejs.org/)**: Powers the particle-based background and the interactive 3D hero scene.
*   **Custom Physics Engine**: A lightweight vanilla-JS algorithm that handles the "Anti-Gravity" toggle, allowing elements to float or ground dynamically.

### Backend & Authentication
*   **[Firebase v10](https://firebase.google.com/)**: 
    *   **Authentication**: Google Sign-In for visitor tracking and admin access.
    *   **Firestore Database**: Real-time storage of visitor logs (name, email, photo, timestamp).
*   **[Web3Forms](https://web3forms.com/)**: Handles the contact form submissions directly to email without a custom backend server.

### Aesthetics
*   **Google Fonts**: "Space Grotesk" for headers and "Outfit" for body text.
*   **FontAwesome 6**: High-quality vector icons for social links and navigation.
*   **Glassmorphism**: Advanced CSS blur and transparency effects for a "frosted glass" look.

---

## 🔥 3. Key Functionalities

### 🛸 Anti-Gravity Mode
Toggleable via the magnet/rocket icon (bottom-left). 
- **Static Mode (Magnet)**: Elements are grounded and professional.
- **Gravity-Off Mode (Rocket)**: Elements become "weightless," floating subtly as the user scrolls, creating a futuristic experience.

### 💡 Smart Sign-In Prompt
A custom "social-prompt" invitation that encourages recruiters and visitors to sign in.
- **Privacy-First**: It does **not** show automatically. It only appears when a user clicks a key link (like "Resume" or a Project).
- **Non-Blocking**: Visitors can still access all links without signing in.
- **Session-Aware**: Only appears once per visit to avoid being intrusive.

### 📊 Admin Dashboard (`admin.html`)
A restricted administrative panel to monitor your portfolio's performance.
- **Restricted Access**: Only your specific email (`yuvarajaug@gmail.com`) can unlock the data. 
- **Visitor Logs**: Shows a table of everyone who has signed in, their profile picture, and their last login time.

---

## 🌍 4. Deployment (Vercel & Firebase)

### Vercel Deployment
The project is optimized for **Vercel**. 
1. The `index.html` is the primary entry point.
2. Vercel automatically handles SSL and provides a high-speed CDN for your static assets.

### Firebase Integration
The configuration is stored in `js/firebase-auth.js`.
*   **Auth Domain**: `portfolio-tracker-0.firebaseapp.com`
*   **Firestore Collection**: `visitors`
*   **Google Auth**: Requires Google Sign-In to be enabled in the Firebase Console.

---

## 📁 5. Project Directory Structure

```text
├── assets/                 # Resume PDF, project images, and media
├── certificates/           # Scanned copies of your certifications (Quantum Computing, etc.)
├── css/                    # Custom stylesheets (animations, glassmorphism, responsive)
├── js/
│   ├── app.js             # Core UI logic, Project Data, and interaction triggers
│   ├── firebase-auth.js   # Authentication logic & Firestore tracking
│   └── three-scene.js     # 3D Particle system and camera controls
├── index.html              # Main portfolio page (SEO Optimized)
├── admin.html              # Restricted visitor analytics dashboard
└── README.md               # Quick-start summary
```

---

## ⚙️ 6. Maintenance & Updates

### To Add a New Project
1. Open `js/app.js`.
2. Add a new object to the `projectData` constant.
3. Update `index.html` with a new `.project-card` using the matching `data-project` ID.

### To Update Your Resume
Simply replace the file in `assets/Yuvaraj_P_Resume.pdf`. The website links to this file automatically.

---

## 🛡 7. License & Credits
Designed and Developed by **Yuvaraj**. 
*Special thanks to the Three.js and Firebase communities.*

---
*Last Updated: April 2026*
