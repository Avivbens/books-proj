import booksPreview from "../cmps/bookPreview.js";

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
            this.$router.push('/books/' + id)
        }
    },
}
