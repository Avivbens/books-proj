import booksPreview from "../cmps/bookPreview.js"
import { booksService } from "../services/books-service.js"
import { eventBus } from "../services/eventBus.js"

export default {
    props: ['books'],
    components: {
        booksPreview,
    },
    template: `
        <section v-if="books" class="book-list-container">

            <books-preview
            v-for="currBook in books" 
            @click.native="selectBook(currBook.id)"
            :book="currBook"
            :key="currBook.id"    />

        </section>
    `,
    methods: {
        selectBook(id) {
            booksService.get(id)
                .then(res => {
                    // Handle exist books on the server
                    if (res) this.$router.push('/books/' + id)

                    // Handle books from google search
                    else {
                        booksService.post(booksService.getFromGoogleSearch(id))
                        this.$router.push('/books')
                        eventBus.$emit('reviewAdded', {
                            txt: 'Successfully Added!',
                            link: '/books/' + id,
                            type: 'success'
                        })
                    }
                })
        }
    },
}
