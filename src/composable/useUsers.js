import {ref} from "vue"
import router from "@/router"
import firestore, {auth} from "@/services/firestore"

const loginError = ref(null)
const signupError = ref(null)
const loggedIn = ref(auth.currentUser)

async function signUp(email, password, fullName) {
    try {
        const cred = await firestore.SIGNUP(email.value, password.value, fullName.value)
        await firestore.UPDATE_PROFILE(cred.user, {displayName: fullName.value})
        router.push({name: "home"})
    } catch (err) {
        if (err.message.includes("already-in-use")) {
            signupError.value = "This user is already registered"
        } else {
            signupError.value = "Something went wrong"
            console.log(err)
        }
    }
}

async function login(email, password) {
    try {
        await firestore.LOGIN(email.value, password.value)
        router.push({name: "home"})
    } catch (err) {
        if (err.message.includes("invalid")) {
            loginError.value = "Wrong email and/or password"
            console.log(err)
        } else {
            loginError.value = "Something went wrong"
            console.log(err)
        }
    }
}

async function logout() {
    try {
        await firestore.LOGOUT()
        router.push({name: "home"})
    } catch (err) {
        console.log(err)
    }
}

export {
    signUp,
    login,
    logout,
    loggedIn,
    loginError,
    signupError
}