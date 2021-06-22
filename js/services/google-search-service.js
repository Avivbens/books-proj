const API_URL = `https://www.googleapis.com/books/v1/volumes?printType=books&q=`

export const googleSearchService = {
    searchBooks
}

function searchBooks(search) {
    const searchStr = search.replaceAll(' ', '+')
    const URL = API_URL + searchStr

    return axios.get(URL)
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
}
