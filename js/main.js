import userMsg from './cmps/userMsg.js';
import { router } from "./router.js";

const options = {
    router,
    el: '#app',
    template: `
    <main class="all-app">
        <user-msg></user-msg>
        <!-- TODO add as component -->
        <header class="main-header">
            <h2>Book Library</h2>
            
            <nav>
                <router-link to="/">Home Page</router-link>
                <router-link to="/about">About</router-link>
                <router-link to="/books">Books Library</router-link>
            </nav>
        </header>
        <router-view />
    </main>
    `,
    components: {
        userMsg,
    },
}

new Vue(options)
