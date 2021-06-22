export default {
    props: [],
    template: `
        <aside class="filter-area">
            <h2>Filter by:</h2>
            <input type="text"
            placeholder="Book Name"
            @input="changeFilter"
            v-model="filterBy.name">



            <input type="number"
            placeholder="Min Price"
            @input="changeFilter"
            v-model.number="filterBy.priceMin">

            <input type="number"
            placeholder="Max Price"
            @input="changeFilter"
            v-model.number="filterBy.priceMax">
        </aside>
    `,
    data() {
        return {
            filterBy: {
                name: '',
                priceMin: -Infinity,
                priceMax: Infinity,
            },
        }
    },
    methods: {
        changeFilter() {
            this.$emit('filterBy', this.filterBy)
        },

    },
    computed: {

    },
}
