import { ref } from "vue"
import { v4 as uuidv4 } from "uuid"
import storeService from "@/services/storeService"
import router from "@/router"

const loginError = ref(null)
const signupError = ref(null)
const loggedIn = ref(null)
const users = ref(null)

async function signUp(fullName, username, email, password) {
    try {
        if(users.value.find(user => user.username === username.value)){
            signupError.value = "The username already registered"
        } else if(users.value.find(user => user.email === email.value)) {
            signupError.value = "The email already registered"
        } else {
            await storeService.SIGNUP(uuidv4(), fullName.value, username.value, email.value, password.value)
            await logout()
            router.push({name: "home"})
        }
    } catch(err) {
        signupError.value = err
    }
}
async function login(username, password) {
    try {
        const foundUser = users.value.find(user => user.username === username.value && user.password === password.value)
        if(foundUser) {
            loggedIn.value = foundUser
            await storeService.LOGIN(loggedIn.value)
            router.push({name: "home"})
        } else {
            loggedIn.value = null
            loginError.value = "Wrong username and/or password"
        }
    } catch(err) {
        loginError.value = err
    }
}
async function getUsers() {
    try {
        const response = await storeService.GET_USERS()
        users.value = response.data
    } catch(err) {
        console.log(err)
    }
}
async function getLoggedIn() {
    try {
        const response = await storeService.GET_LOGGED_IN()
        loggedIn.value = response.data.id ? response.data : null
    } catch (err) {
        console.log(err)
    }
}
async function logout() {
    try {
        await storeService.LOGOUT()
        loggedIn.value = null
    } catch(err) {
        console.log(err)
    }
}

export {
    loggedIn,
    users,
    signUp,
    login,
    getUsers,
    getLoggedIn,
    logout,
    loginError,
    signupError
}