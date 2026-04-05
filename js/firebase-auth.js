import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// TODO: Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtQHY3pHyuo-iyCXWIydxWrW8OyGSPCtU",
  authDomain: "portfolio-tracker-0.firebaseapp.com",
  projectId: "portfolio-tracker-0",
  storageBucket: "portfolio-tracker-0.firebasestorage.app",
  messagingSenderId: "143411456460",
  appId: "1:143411456460:web:270bd6f98ce173726ad569"
};

// Initialize Firebase
let app, auth, db;
try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
} catch (error) {
    console.error("Firebase not initialized. Please update firebaseConfig.");
}

const provider = new GoogleAuthProvider();

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('google-login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const userInfo = document.getElementById('user-info');
    const userAvatar = document.getElementById('user-avatar');
    const userNameDisplay = document.getElementById('user-name-display');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');

    const socialPrompt = document.getElementById('social-prompt');
    const promptLoginBtn = document.getElementById('prompt-login-btn');
    const promptClose = document.getElementById('prompt-close');

    function showToast(message) {
        toastMsg.innerText = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // --- Social Prompt Logic ---
    window.triggerSocialPromptOnce = function() {
        // Only show if not signed in and haven't seen it in this session
        if (!auth.currentUser && !sessionStorage.getItem('prompt_shown_session')) {
            const sp = document.getElementById('social-prompt');
            if (sp) {
                sp.style.display = 'flex';
                // Remove the 'hidden' class just in case CSS state is weird
                sp.classList.remove('hidden');
            }
            sessionStorage.setItem('prompt_shown_session', 'true');
            console.log("Social prompt triggered by interaction.");
        }
    };

    if (promptClose) {
        promptClose.addEventListener('click', () => {
            socialPrompt.style.display = 'none'; // Ensure it's hidden from view
            sessionStorage.setItem('prompt_shown_session', 'true'); // Don't show again
        });
    }

    async function handleGoogleLogin() {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            
            socialPrompt.classList.add('hidden');
            
            // Track user in Firestore Database
            await setDoc(doc(db, "visitors", user.uid), {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                lastLogin: serverTimestamp()
            }, { merge: true });

            showToast(`Welcome aboard, ${user.displayName.split(' ')[0]}!`);
        } catch (error) {
            console.error("Authentication Error:", error);
        }
    }

    if (loginBtn && auth) {
        loginBtn.addEventListener('click', handleGoogleLogin);
    }

    if (promptLoginBtn && auth) {
        promptLoginBtn.addEventListener('click', handleGoogleLogin);
    }

    if (logoutBtn && auth) {
        logoutBtn.addEventListener('click', () => {
            signOut(auth).then(() => {
                showToast("System transmission ended. Logged out.");
            });
        });
    }

    // Monitor Auth State
    if(auth) {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                if(loginBtn) loginBtn.style.display = 'none';
                if(socialPrompt) socialPrompt.classList.add('hidden');
                if(userInfo) {
                    userInfo.style.display = 'flex';
                    userAvatar.src = user.photoURL;
                    userNameDisplay.innerText = user.displayName.split(' ')[0]; // Show first name
                }
            } else {
                // User is signed out
                if(loginBtn) loginBtn.style.display = 'inline-block';
                if(userInfo) userInfo.style.display = 'none';
                // NO auto-popup call here
            }
        });
    }
});
