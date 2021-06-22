import { booksService } from "../services/books-service.js";
import bookFilter from './bookFilter.js'
import bookList from './bookList.js'
import bookDetails from './bookDetails.js'

export default {
    template: `
        <main v-if="books" class="book-app">
            <book-filter
            @filterBy="updateFilterBy" />
            
            <book-list 
            :books="booksToShow" />
        </main>
        `,
    data() {
        return {
            books: null,
            filterBy: null,
        }
    },
    methods: {
        updateFilterBy(filter) {
            this.filterBy = filter
        },
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books

            if (this.filterBy.priceMax === '') this.filterBy.priceMax = Infinity
            if (this.filterBy.priceMin === '') this.filterBy.priceMin = -Infinity

            const booksForDisplay = this.books.filter(book => {
                return (
                    book.title.toLowerCase().includes(this.filterBy.name.toLowerCase()) &&
                    book.listPrice.amount > +this.filterBy.priceMin &&
                    book.listPrice.amount < +this.filterBy.priceMax
                )
            })

            return booksForDisplay
        },
    },
    created() {
        booksService.query()
            .then(res => this.books = res)
    },
    components: {
        bookFilter,
        bookList,
        bookDetails
    },
}
