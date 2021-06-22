import { eventBus } from "../services/eventBus.js"
import { booksService } from "../services/books-service.js"

export default {
    template: `
        <section v-if="book" class="review-add-container">
            <h2>Add New Review</h2>
            <h3>{{book.title}}</h3>
            <form ref="form"
            @submit.prevent="onAddNewBookReview">

                <input type="text" placeholder="Book Name"
                v-model="newBookReview.fullName" />

                <span class="rate-area">
                    <span>Rate: </span>
                    <select v-model="newBookReview.rate">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </span>
                
                <input type="date" 
                v-model="newBookReview.date">

                <textarea
                rows="5" cols="33"
                placeholder="Enter your review here"
                v-model="newBookReview.review">
                </textarea>


                <button
                class="clickable">
                    Submit
                </button>
            </form>
        </section>
    `,
    data() {
        return {
            book: null,
            newBookReview: {
                fullName: 'Books Reader',
                rate: 1,
                date: null,
                review: ''
            }
        }
    },
    methods: {
        onAddNewBookReview() {
            if (!this.newBookReview.fullName || !this.newBookReview.date) return

            booksService.updateReview(this.book, this.newBookReview)
            eventBus.$emit('reviewAdded', {
                txt: 'Successfully Added!',
                link: '/books/' + this.book.id,
                type: 'success'
            })

            this.$router.push('/books')
        }
    },
    created() {
        const bookId = this.$route.params.id
        booksService.get(bookId)
            .then(book => this.book = book)
    },
    mounted() {
        setTimeout(() => {
            this.$refs.form[0].select()
        }, 0)
    },
}
