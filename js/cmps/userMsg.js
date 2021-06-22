import { booksService } from "../services/books-service.js"
import { eventBus } from "../services/eventBus.js"

export default {
    template: `
        <div class="user-msg"
        v-if="msg">
            <button
            class="clickable"
            @click="close">
                ✖
            </button>
        
            <span :class="msgType">
                {{msg.txt}}
                Go to the book 
                <router-link :to="msg.link">
                    <span @click="close">
                        here
                    </span>
                </router-link> 
            </span>
        </div>
    `,
    data() {
        return {
            msg: null
        }
    },
    methods: {
        showMsg(msg) {
            this.msg = msg

            setTimeout(() => {
                this.msg = null
            }, 3000)
        },
        close() {
            this.msg = null
        },
    },
    computed: {
        msgType() {
            return {
                'msg-red': this.msg.type === 'error',
                'msg-green': this.msg.type === 'success'
            }
        },
        book() {
            let book = null
            booksService.get(this.msg.bookId)
                .then(res => {
                    book = res
                })

            return book
        }
    },
    created() {
        eventBus.$on('reviewAdded', this.showMsg)
    },
    destroyed() {
        eventBus.$off('reviewAdded', this.showMsg)
    }
}
