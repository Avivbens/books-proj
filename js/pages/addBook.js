import bookList from '../pages/bookList.js'
import { booksService } from "../services/books-service.js"
import { googleSearchService } from "../services/google-search-service.js"

export default {
    template: `
        <section class="add-book-container">
            <h2 class="main-title">Add Book</h2>
            <label>
                Book Name:
                <input type="text" v-model="search" placeholder="Book Name"
                ref="input">
            </label>

            <book-list 
            :books="booksForDisplay"
            v-if="booksForDisplay"    />

        </section>
    `,
    data() {
        return {
            search: '',
            booksForDisplay: null
        }
    },
    methods: {
        searchBook() {
            if (!this.search) return

            let r = JSON.parse(localStorage.getItem('r'))
            if (!r) {
                console.log('server')
                googleSearchService.searchBooks(this.search)
                    .then((res) => {
                        r = res
                        localStorage.setItem('r', JSON.stringify(r))
                    })
            }

            this.booksForDisplay = booksService.convertGoogleSearchToBooks(r.data.items)
            console.log('🚀 ~ this.booksForDisplay', this.booksForDisplay)

        },
        debounce(func, wait, ...args) {
            let timeout

            return function executedFunction() {
                const later = () => {
                    clearTimeout(timeout)
                    func(...args)
                }

                clearTimeout(timeout)
                timeout = setTimeout(later, wait)
            }
        },
    },
    mounted() {
        this.$refs.input.addEventListener('input', this.debounce(this.searchBook, 1000))
    },
    components: {
        bookList,
    },
}
