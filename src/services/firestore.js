import { initializeApp } from 'firebase/app'
import { getFirestore, 
    collection, 
    getDocs, 
    doc, 
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc
} from "firebase/firestore"
import {
    getAuth, 
    createUserWithEmailAndPassword, 
    signOut, 
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    updateProfile
} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBA4Ct9cVn7IWJe7UJdIw-VtvK4e9l8-tM",
    authDomain: "blog-45ec7.firebaseapp.com",
    projectId: "blog-45ec7",
    storageBucket: "blog-45ec7.appspot.com",
    messagingSenderId: "552457788951",
    appId: "1:552457788951:web:8bd9c0a59fa0484423c652"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth()
const postsCollection = collection(db, "posts")

export { auth, onAuthStateChanged }

export default {
    GET_POSTS() {
        return getDocs(postsCollection)
    },
    GET_SINGLE_POST(id){
        const postRef = doc(db, "posts", id)
        return getDoc(postRef)
    },
    SIGNUP(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    },
    UPDATE_PROFILE(user, options) {
        return updateProfile(user, options)
    },
    LOGIN(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    },
    LOGOUT() {
        return signOut(auth)
    },
    CREATE_POST(post) {
        return addDoc(postsCollection, post)
    },
    UPDATE_POST(post) {
        const postRef = doc(db, "posts", post.id)
        return updateDoc(postRef, post)
    },
    DELETE_POST(id) {
        const postRef = doc(db, "posts", id)
        return deleteDoc(postRef)
    }
}