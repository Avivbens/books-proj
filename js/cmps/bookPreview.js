export default {
    props: ['book'],
    template: `
        <article v-if="book.title" class="book-box">

            <h3 class=book-title>
                {{book.title}}
            </h3>
            <p class="book-subtitle">
                {{book.subtitle}}
            </p>
            <span class="book-price" :class="priceColor">
                {{book.listPrice.amount}} {{setCurrencyCode}}
            </span>
            <img :src="book.thumbnail" alt="">

        </article>
    `,
    computed: {
        setCurrencyCode() {
            return getCurrencySymbol(this.book.listPrice.currencyCode)
        },
        priceColor() {
            return {
                red: this.book.listPrice.amount > 150,
                green: this.book.listPrice.amount < 20
            }
        },

    },
}
