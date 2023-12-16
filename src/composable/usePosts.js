import { ref } from "vue"
import { v4 as uuidv4 } from "uuid"
import { loggedIn } from "@/composable/useUsers"
import firestore from "@/services/firestore"
import router from "@/router"

const posts = ref([])
const singlePost = ref(null)
const postError = ref(null)
const commentError = ref(null)
const showModal = ref(false)

async function getPosts() {
    try {
        const response = await firestore.GET_POSTS()
        const data = []
        response.docs.forEach(doc => {
            data.push({...doc.data(), id: doc.id})
        })
        posts.value = data
    } catch(err) {
        postError.value = err
    }
}
async function getSinglePost(id) {
    try {
        const response = await firestore.GET_SINGLE_POST(id)
        if(!response.exists()) {
            throw response
        }
        singlePost.value = response.data()
    } catch(err) {
        if(!err.exists()) {
            router.push({name: "404"})
        } else {
            postError.value = err
        }
    }
}
async function createPost(title, summary, content) {
    try {
        const newPost = {
            userId: loggedIn.value.id,
            title: format(title.value),
            user: loggedIn.value.fullName,
            date: new Date().toLocaleString("en-US", {hour: "numeric", minute: "numeric", day: "numeric", month: "short", year: "numeric"}),
            summary: format(summary.value),
            content: format(content.value),
            comments: [],
            likes: []
        }
        const response = await firestore.CREATE_POST(newPost)
        posts.value.push(response.data)
    } catch(err) {
        postError.value = err
    }
}
async function editPost(post, title, summary, content) {
    try {
        post.title = format(title.value)
        post.summary = format(summary.value)
        post.content = format(content.value)
        await firestore.UPDATE_POST(post)
    } catch(err) {
        postError.value = err
    }
}
async function deletePost(id) {
    try {
        await firestore.DELETE_POST(id)
    } catch(err) {
        postError.value = err
    }
}
async function addComment(post, comment, loggedIn) {
    try {
        post.value.comments.unshift({
            id: uuidv4(),
            userId: loggedIn.value.id,
            user: loggedIn.value.fullName,
            email: loggedIn.value.email,
            date: new Date().toLocaleString("en-US", {hour: "numeric", minute: "numeric", day: "numeric", month: "short", year: "numeric"}),
            content: comment.value.trim()
        })
        await firestore.UPDATE_POST(post.value)
    } catch(err) {
        postError.value = err
    }
}
async function deleteComment(commentId, post) {
    try {
        const comments = post.value.comments.filter(comment => comment.id !== commentId)
        post.value = {...post.value, comments}
        await firestore.UPDATE_POST(post.value)
    } catch(err) {
        postError.value = err
    }
}
async function addLike(post, loggedIn) {
    try {
        post.value.likes.push(loggedIn.value.id)
        await firestore.UPDATE_POST(post.value)
    } catch(err) {
        postError.value = err
    }
}
async function deleteLike(post, loggedIn) {
    try {
        post.value = {...post.value, likes: post.value.likes.filter(id => id !== loggedIn.value.id)}
        await firestore.UPDATE_POST(post.value)
    } catch(err) {
        postError.value = err
    }
}
function isFav(post, loggedIn) {
    return post.value?.likes.includes(loggedIn.value.id)
}
function format(string) {
    return string.trim()[0].toUpperCase() + string.trim().slice(1)
}

export {
    posts,
    singlePost,
    postError,
    commentError,
    showModal,
    getPosts,
    getSinglePost,
    createPost,
    editPost,
    deletePost,
    addComment,
    deleteComment,
    addLike,
    deleteLike,
    isFav
}