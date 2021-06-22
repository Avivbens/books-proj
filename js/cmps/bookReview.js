export default {
    props: ['review'],
    template: `
        <main class="review-box">
            <button
            class="delete-review-btn clickable"
            @click="removeCurrentPreview">
                ✖
            </button>

            <p> Name  : {{review.fullName}} </p>
            <p> Rate  : {{review.rate}} </p>
            <p> Review:
                <br>     
                {{review.review}} 
            </p>
            <p> Time  : {{review.date}}  </p>
        </main>
    `,
    methods: {
        removeCurrentPreview() {
            this.$emit('deleteReview', this.review)
        }
    },
}
