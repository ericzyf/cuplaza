const axios = require('axios')

const url = 'http://localhost:8081/api/search/'

class SearchService {
  static searchItem(b64) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}${b64}`)
        resolve(res.data)
      } catch(err) {
        reject(err)
      }
    })
  }
}

export default SearchService