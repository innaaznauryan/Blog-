import {ref} from "vue"
import {v4 as uuidv4} from "uuid"
import {loggedIn} from "@/composable/useUsers"
import firestore from "@/services/firestore"
import router from "@/router"

const posts = ref([])
const singlePost = ref(null)
const postError = ref(null)
const commentError = ref(null)
const showModal = ref(false)
const showPostConfirm = ref(false)
const showCommentConfirm = ref(false)
const showSignoutConfirm = ref(false)

async function getPosts() {
    if (localStorage.posts) {
        posts.value = JSON.parse(localStorage.posts)
    } else {
        try {
            const response = await firestore.GET_POSTS()
            const data = []
            response.docs.forEach(doc => {
                data.push({...doc.data(), id: doc.id})
            })
            posts.value = data
            localStorage.setItem("posts", JSON.stringify(posts.value))
            localStorage.setItem("blogTimeStap", Date.now())
        } catch (err) {
            console.log(err)
            postError.value = "Something went wrong"
        } 
    }
}

async function getSinglePost(id) {
    if (localStorage[`post${id}`]) {
        singlePost.value = JSON.parse(localStorage[`post${id}`])
    } else {
        try {
            const response = await firestore.GET_SINGLE_POST(id)
            if (!response.exists()) {
                throw response
            }
            singlePost.value = {id: response.id, ...response.data()}
            localStorage.setItem(`post${id}`, JSON.stringify(singlePost.value))
            localStorage.setItem("blogTimeStap", Date.now())
        } catch (err) {
            if (!err.exists()) {
                router.push({name: "404"})
            } else {
                console.log(err)
                postError.value = "Something went wrong"
            }
        }
    }
}

async function createPost(title, content) {
    try {
        const newPost = {
            userId: loggedIn.value.uid,
            title: format(title.value),
            user: loggedIn.value.displayName,
            date: new Date().toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                day: "numeric",
                month: "short",
                year: "numeric"
            }),
            content: format(content.value),
            comments: [],
            likes: []
        }
        const response = await firestore.CREATE_POST(newPost)
        posts.value.push({id: response.id, ...newPost})
        localStorage.setItem("posts", JSON.stringify(posts.value))
        localStorage.setItem("blogTimeStap", Date.now())
    } catch (err) {
        console.log(err)
        postError.value = "Something went wrong"
    }
}

async function editPost(post, title, content) {
    try {
        const updatedPost = {
            ...post, 
            title: format(title.value),
            content: format(content.value)
        }
        await firestore.UPDATE_POST(updatedPost)
        singlePost.value = updatedPost
        localStorage.setItem(`post${post.id}`, JSON.stringify(updatedPost))
        localStorage.removeItem("posts")
        localStorage.setItem("blogTimeStap", Date.now())
    } catch (err) {
        console.log(err)
        postError.value = "Something went wrong"
    }
}

async function deletePost(id) {
    try {
        await firestore.DELETE_POST(id)
        localStorage.removeItem(`post${id}`)
        localStorage.removeItem("posts")
        localStorage.setItem("blogTimeStap", Date.now())
    } catch (err) {
        console.log(err)
        postError.value = "Something went wrong"
    }
}

async function addComment(post, comment, loggedIn) {
    try {
        const comments = [
            {
                id: uuidv4(),
                userId: loggedIn.value.uid,
                user: loggedIn.value.displayName,
                email: loggedIn.value.email,
                date: new Date().toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                }),
                content: comment.value.trim()
            },
            ...post.value.comments
        ]
        const updatedPost = {...post.value, comments}
        await firestore.UPDATE_POST(updatedPost)
        singlePost.value = updatedPost
        localStorage.setItem(`post${post.value.id}`, JSON.stringify(updatedPost))
        localStorage.removeItem("posts")
        localStorage.setItem("blogTimeStap", Date.now())
    } catch (err) {
        console.log(err)
        postError.value = "Something went wrong"
    }
}

async function deleteComment(commentId, post) {
    try {
        const comments = post.value.comments.filter(comment => comment.id !== commentId)
        const updatedPost = {...post.value, comments}
        await firestore.UPDATE_POST(updatedPost)
        singlePost.value = updatedPost
        localStorage.setItem(`post${post.value.id}`, JSON.stringify(updatedPost))
        localStorage.removeItem("posts")
        localStorage.setItem("blogTimeStap", Date.now())
    } catch (err) {
        console.log(err)
        postError.value = "Something went wrong"
    }
}

async function addLike(post, uid) {
    try {
        const likes = new Set([...post.value.likes, uid])
        const updatedPost = {...post.value, likes: [...likes]}
        await firestore.UPDATE_POST(updatedPost)
        singlePost.value = updatedPost
        localStorage.setItem(`post${post.value.id}`, JSON.stringify(updatedPost))
        localStorage.removeItem("posts")
        localStorage.setItem("blogTimeStap", Date.now())
    } catch (err) {
        console.log(err)
        postError.value = "Something went wrong"
    }
}

async function deleteLike(post, uid) {
    try {
        const likes = post.value.likes.filter(id => id !== uid)
        const updatedPost = {...post.value, likes}
        await firestore.UPDATE_POST(updatedPost)
        singlePost.value = updatedPost
        localStorage.setItem(`post${post.value.id}`, JSON.stringify(updatedPost))
        localStorage.removeItem("posts")
        localStorage.setItem("blogTimeStap", Date.now())
    } catch (err) {
        console.log(err)
        postError.value = "Something went wrong"
    }
}

function isFav(post, uid) {
    return post.value?.likes.includes(uid)
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
    showPostConfirm,
    showCommentConfirm,
    showSignoutConfirm,
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