export default {
    template: `
        <main class="center">
            <h2>About Page</h2>
            <p>Printing to the console</p>
        </main>
    `,
    data() {
        return {
            timer: null
        }
    },
    created() {
        this.timer = Date.now()

        this.interval = setInterval(() => {
            const diff = Date.now() - this.timer

            console.log('diff :>> ', diff);
        }, 1000);
    },
    destroyed() {
        clearInterval(this.interval)
    },
}
