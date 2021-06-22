import bookReview from '../cmps/bookReview.js'
import { booksService } from "../services/books-service.js"

export default {
    template: `
        <section v-if="book" class="book-details">
            <button
            class="close-details-btn clickable"
            @click="closeDetails" >
                ✖
            </button>

            <button
            class="add-review-btn clickable"
            @click="onGotoAddReview"    >
                Add Review
            </button>

            <h2>
                {{book.title}}
            </h2>

            <h4>
                By: 
                <span v-for="author in book.authors">{{author}}</span>
                <span>, At: {{book.publishedDate}}</span>
                <span>{{bookAge}}</span>
            </h4>

            <p class="selected-book-subtitle">
                {{book.subtitle}}
            </p>

            <span>{{readingDensity}}</span>
            <span> <span class="bold">Language: </span> {{book.language}}</span>

            <span class="price-area" :class="priceColor">
                    <span class="bold">Price: </span> 
                    <span>{{book.listPrice.amount}} {{setCurrencyCode}}</span>
                    <span class="on-sale-sign" v-if="book.listPrice.isOnSale">ON SALE!</span>
            </span>
            <br>

            <span 
            class="book-description"
            @click="showMoreDesc=!showMoreDesc">
                <span class="bold">Description: </span>
                <span>
                    {{bookDescription}}
                </span>
            </span>

            <div class="reviews-img-area">
                
                <book-review 
                v-for="review in book.reviews"
                :review="review" 
                @deleteReview="deleteReview" />

                <img :src="book.thumbnail" alt="">
            </div>

        </section>

    `,
    data() {
        return {
            showMoreDesc: false,
            book: null
        }
    },
    methods: {
        closeDetails() {
            this.$router.push('/books')
        },
        onGotoAddReview() {
            this.$router.push('/books/' + this.book.id + '/review')
        },
        deleteReview(reviewToDelete) {
            booksService.removeReview(this.book, reviewToDelete)
        }
    },
    computed: {
        setCurrencyCode() {
            return getCurrencySymbol(this.book.listPrice.currencyCode)
        },
        readingDensity() {
            if (this.book.pageCount > 500) return 'Long Reading'
            else if (this.book.pageCount > 200) return 'Decent Reading'
            return 'Light Reading'
        },
        bookAge() {
            const diff = new Date().getFullYear() - this.book.publishedDate
            if (diff <= 1) return 'New!'
            else if (diff >= 10) return 'Veteran Book'
        },
        priceColor() {
            return {
                red: this.book.listPrice.amount > 150,
                green: this.book.listPrice.amount < 20
            }
        },
        bookDescription() {
            let description = this.book.description
            description = description.split(' ')

            if (this.showMoreDesc || description.length <= 10) return this.book.description

            description = description.splice(0, 10)

            const descriptionToShow = description.join(' ')
            return descriptionToShow + '...'
        }
    },
    created() {
        const bookId = this.$route.params.id
        booksService.get(bookId)
            .then(book => {
                this.book = book
            })
    },
    components: {
        bookReview,
    },
}
