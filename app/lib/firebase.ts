
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged as firebaseOnAuthStateChanged,signOut as firebaseSignOut } from 'firebase/auth';
import { updateProfile as firebaseUpdateProfile } from 'firebase/auth';
import { getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';

import firebase from 'firebase/app';
import 'firebase/auth';
import { doc, getFirestore, setDoc, getDoc, deleteDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBb5skkoprOe7jLwwSx3Jtu-LsUhGZmZaI",
  authDomain: "next14-ddd7e.firebaseapp.com",
  projectId: "next14-ddd7e",
  storageBucket: "next14-ddd7e.appspot.com",
  messagingSenderId: "71985723757",
  appId: "1:71985723757:web:b4489a0b7e5ee2d079c264"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);
const app = initializeApp(firebaseConfig);
const onAuthStateChanged = (callback: (user: any) => void) => {
  return firebaseOnAuthStateChanged(auth, callback);
};
const signOut = () => {
  return firebaseSignOut(auth);
};
const updateProfile = async (user: any, profileData: any) => {
  try {
    // Update profile in Firebase Authentication
    await firebaseUpdateProfile(user, profileData);

    // Update profile picture in Firebase Storage
    const storageRefPath = storageRef(storage, `ProfilePictures/${user.uid}`);
    await uploadBytes(storageRefPath, profileData.profilePicture);

    // Update profile data in Firestore
    // Replace 'YourFirestoreCollection' with the actual collection name
    const firestore = getFirestore(firebaseApp);
    const userDocRef = doc(firestore, 'YourFirestoreCollection', user.uid);
    await setDoc(userDocRef, profileData, { merge: true });

    console.log('Profile updated successfully!');
  } catch (error) {
    console.error('Error updating profile:', error.message);
    throw error;
  }
};


const db = getFirestore();

const getUserData = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log('User data not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    throw error;
  }
};

// Add a function to save user data to the database if needed
const saveUserData = async (userId: string, userData: any) => {
  try {
    await setDoc(doc(db, 'users', userId), userData);
  } catch (error) {
    console.error('Error saving user data:', error.message);
    throw error;
  }
};
import { ref, getDownloadURL } from 'firebase/storage';



const uploadProfilePicture = async (userId: string, file: File) => {
  const storageRef = ref(storage, `ProfilePictures/${userId}/${file.name}`);
  await uploadBytes(storageRef, file);

  // Get the download URL for the uploaded file
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

const firestore = getFirestore();

const updateUserData = async (userId: string, userData: any) => {
  const userRef = doc(firestore, 'users', userId);

  // Update the user document in Firestore with the new data
  await setDoc(userRef, userData, { merge: true });
};
// lib/firebase.ts
import {  collection, getDocs } from 'firebase/firestore';



const getAllUsersData = async () => {
  const usersCollection = collection(firestore, 'users');
  const usersSnapshot = await getDocs(usersCollection);

  const usersData = [];
  usersSnapshot.forEach((doc) => {
    usersData.push({ id: doc.id, ...doc.data() });
  });

  return usersData;
};
const deleteUserData = async (userId: string) => {
  const userRef = doc(firestore, 'users', userId);

  // Delete the user document from Firestore
  await deleteDoc(userRef);
};
export { getAllUsersData };
export { updateUserData };
export { uploadProfilePicture };
export { saveUserData };
export { auth,deleteUserData , createUserWithEmailAndPassword,getUserData , signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile };
export default firebase;