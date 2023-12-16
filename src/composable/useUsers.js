import { ref } from "vue"
import router from "@/router"
import firestore from "@/services/firestore"

const loginError = ref(null)
const signupError = ref(null)
const loggedIn = ref(null)

async function signUp(email, password, fullName) {
    try {
        await firestore.SIGNUP(email.value, password.value)
        router.push({name: "home"})
    } catch(err) {
        if(err.message.includes("already-in-use")) {
            signupError.value = "This user is already registered"
        } else {
            signupError.value = err
        }
    }
}
async function login(email, password) {
    try {
        await firestore.LOGIN(email, password)
        router.push({name: "home"})
    } catch(err) {
        if(err.message.includes("missing")) {
            loginError.value = "Wrong email and/or password"
        } else {
            loginError.value = err
        }
    }
}

async function logout() {
    try {
        await firestore.LOGOUT()
        loggedIn.value = null
        router.push({name: "home"})
    } catch(err) {
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