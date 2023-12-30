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
  apiKey: "AIzaSyDF6YAHq5KBmDLTITQxL_o0ZJRInO3G3us",
  authDomain: "blogging-platform-de857.firebaseapp.com",
  projectId: "blogging-platform-de857",
  storageBucket: "blogging-platform-de857.appspot.com",
  messagingSenderId: "180759922893",
  appId: "1:180759922893:web:2cb019abc4430868168184"
}

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