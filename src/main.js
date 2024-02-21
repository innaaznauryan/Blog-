import {createApp} from "vue"
import App from "./App.vue"
import router from "./router"
import * as ConfirmDialog from "vuejs-confirm-dialog"
import "./index.css"

createApp(App)
    .use(router)
    .use(ConfirmDialog)
    .mount("#app")
