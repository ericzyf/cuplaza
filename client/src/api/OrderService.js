const axios = require('axios')

const url = 'http://localhost:8081/api/orders/'

class OrderService {
  static getOrder() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url)
        resolve(res.data)
      } catch(err) {
        reject(err)
      }
    })
  }

  static postOrder(order) {
    return axios.post(url, order)
  }
}

export default OrderService