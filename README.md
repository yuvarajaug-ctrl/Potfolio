# 🌌 Futuristic Anti-Gravity Portfolio

A professional, high-performance, and deeply interactive developer portfolio featuring a unique "Anti-Gravity" dark-mode aesthetic. This project combines modern web design with interactive 3D elements and advanced visitor analytics.

---

## 🚀 Live Demo
[https://yuvaraj-dev-portfolio.vercel.app/](https://yuvaraj-dev-portfolio.vercel.app/)

---

## ✨ Features

- **🧠 Interactive 3D Hero:** A custom Three.js particle background and rotating avatar that reacts to user presence.
- **🛸 Anti-Gravity UI:** Toggleable gravitational physics that affects web elements for a playful yet professional experience.
- **💼 Project Showcases:** Dynamic project cards with glassmorphism effects and detailed interactive modals.
- **👤 Visitor Analytics:** Integrated Firebase Authentication and Firestore to track site visits and user engagement.
- **📊 Admin Dashboard:** A restricted administrative panel (`admin.html`) for monitoring visitor activity in real-time.
- **📄 Professional Resume Access:** Consolidated "Resume" dropdown for instant viewing or downloading (PDF).
- **💡 Smart Sign-In Prompt:** Custom "Google One-Tap" inspired login prompt to encourage recruiter engagement.
- **📱 Fully Responsive:** Optimized for all devices—from smartphones to large desktop displays.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, Modern CSS3, Vanilla JavaScript (ES6+)
- **3D Graphics:** [Three.js](https://threejs.org/)
- **Backend/Auth:** [Firebase](https://firebase.google.com/) (Authentication & Firestore)
- **Icons:** [FontAwesome 6](https://fontawesome.com/)
- **Typography:** Google Fonts (Space Grotesk & Outfit)

---

## 📦 Project Structure

```text
├── assets/             # Resume PDF and other media
├── css/                # Stylesheets (modern/futuristic design)
├── js/                 # Application logic
│   ├── app.js          # Core UI & interactivity
│   ├── firebase-auth.js # Authentication & Tracking logic
│   └── three-scene.js  # 3D Scene configuration
├── index.html          # Main portfolio entry
└── admin.html          # Restricted admin dashboard
```

---

## ⚙️ Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/Portfolio.git
```

### 2. Configure Firebase
Update the `firebaseConfig` object in `js/firebase-auth.js` with your specific credentials from the [Firebase Console](https://console.firebase.google.com/):

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  // ... rest of your config
};
```

### 3. Run Locally
Serve the application using any static server (like Live Server or Python):

```bash
# Using Python
python -m http.server 8080
```

---

## 📝 License
This project is for personal portfolio use. Feel free to use it as inspiration!

---

## 🤝 Contact
**Yuvaraj** - [yuvarajaug@gmail.com](mailto:yuvarajaug@gmail.com)

"Focused on solving real-world problems using efficient and scalable solutions."
