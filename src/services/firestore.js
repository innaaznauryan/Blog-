import { initializeApp } from 'firebase/app'
import { getFirestore, 
    collection, 
    getDocs, 
    doc, 
    getDoc,
    addDoc,
    updateDoc
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
const activeUserCollection = collection(db, "active")

export { auth, onAuthStateChanged, updateProfile }

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
    UPDATE_USER(userId, fullName) {
        return updateDoc(activeUserCollection, {userId, fullName})
    },
    GET_USER() {
        return getDocs(activeUserCollection)
    },
    LOGIN({email, password}) {
        return signInWithEmailAndPassword(auth, email, password)
    },
    LOGOUT() {
        return signOut(auth)
    },
    // CREATE_POST({userId, title, user, date, summary, content, comments, likes}) {
        // return addDoc(postsCollection, {userId, title, user, date, summary, content, comments, likes})
        // return apiClient.post("/posts", {id, userId, title, user, date, summary, content, comments, likes})
    // },
    // UPDATE_POST({id, userId, title, user, date, summary, content, comments, likes}) {
    //     return apiClient.put("/posts/" + id, {id, userId, title, user, date, summary, content, comments, likes})
    // },
    // DELETE_POST(id) {
    //     return apiClient.delete("/posts/" + id)
    // }
}