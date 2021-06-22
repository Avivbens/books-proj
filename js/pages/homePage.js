export default {
    template: `
        <main class="home-page-container">
            <h1 class="home-page-title">
                Welcome to the book store
            </h1>

            <img src="http://coding-academy.org/books-photos/20.jpg" alt="">

            <h3 class="clickable" @click="onGotoBookLibrary">Visit our library</h3>
        </main>
    `,
    methods: {
        onGotoBookLibrary() {
            this.$router.push('/books')
        }
    },
}
