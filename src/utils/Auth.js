import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
// Firebase se zaroori functions import karein
import { 
  onAuthStateChanged, 
  signOut,
  createUserWithEmailAndPassword, // Signup ke liye
  signInWithEmailAndPassword    // Login ke liye
} from 'firebase/auth';

// 1. Ek context banayein - Yeh ek global store ki tarah hai
const AuthContext = React.createContext();

// 2. Ek custom hook banayein - Isse hum kahin bhi user ki info aasani se le payenge
export function useAuth() {
  return useContext(AuthContext);
}

// 3. AuthProvider component banayein - Yeh poore app ko user ki info supply karega
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state add karein

  // Signup function jo naya user banayega
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Login function jo user ko sign in karega
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Logout function jo Firebase ka signOut call karega
  function logout() {
    return signOut(auth);
  }

  // Yeh useEffect hook sabse zaroori hai
  useEffect(() => {
    // onAuthStateChanged ek listener hai jo auth state change hone par chalta hai
    const unsubscribe = onAuthStateChanged(auth, user => {
      // Jab Firebase check kar lega, to user object milega (agar logged in hai) ya null milega
      setCurrentUser(user);
      // Jaise hi check poora ho, loading ko false kar dein
      setLoading(false);
    });

    // Jab component unmount ho, to listener ko hata dein (memory leak se bachne ke liye)
    return unsubscribe;
  }, []); // [] ka matlab hai ki yeh sirf ek baar chalega jab app load hoga

  // value mein woh saari cheezein daalein jo humein poore app mein chahiye
  const value = {
    currentUser,
    login,
    signup,
    logout // Sabhi functions ko yahan se export karein
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Jab tak Firebase check kar raha hai, tab tak kuch na dikhayein (ya loading screen dikhayein) */}
      {!loading && children}
    </AuthContext.Provider>
  );
}

