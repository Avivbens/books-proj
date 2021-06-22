import userMsg from './cmps/userMsg.js'
import headerCmp from './cmps/header.js'
import { router } from "./router.js"

const options = {
    router,
    el: '#app',
    template: `
    <main class="all-app">
        <header-cmp></header-cmp>
        <user-msg></user-msg>
        <router-view />
    </main>
    `,
    components: {
        userMsg,
        headerCmp,
    },
}

new Vue(options)
