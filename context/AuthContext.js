import React, { useState, useEffect, createContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/firebase'; // Adjust the path as per your project structure
import { doc, getDoc } from 'firebase/firestore';

// Create the context
const AuthContext = createContext();

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);   // User's authentication status
  const [isLoading, setIsLoading] = useState(true);               // Loading state for auth check
  const [userDetailsCompleted, setUserDetailsCompleted] = useState(false); // If user has completed details

  // Monitor authentication state with Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);  // Set loading state true at the start
      if (user) {
        try {
          // Fetch user data from Firestore
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          // Check if the user document exists and set user details state accordingly
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserDetailsCompleted(userData.userDetailsCompleted || false); // Check user completion
          } else {
            console.log('No user document found in Firestore.');
            setUserDetailsCompleted(false);
          }
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error fetching user document:', error);
          // Handle Firestore permissions or other errors
          if (error.code === 'permission-denied') {
            console.error('Insufficient permissions to access the user data.');
          }
        }
      } else {
        // No user is authenticated, reset states
        setIsAuthenticated(false);
        setUserDetailsCompleted(false);
      }
      setIsLoading(false);  // Set loading state to false once auth state is resolved
    });

    return () => unsubscribe();  // Unsubscribe on component unmount
  }, []);

  // Function to mark user details as completed
  const completeUserDetails = () => {
    setUserDetailsCompleted(true);
  };

  return (
    // Provide the authentication context to the children components
    <AuthContext.Provider value={{
      isAuthenticated,
      isLoading,
      userDetailsCompleted,
      completeUserDetails
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
