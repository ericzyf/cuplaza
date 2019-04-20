const axios = require('axios')

const url = 'http://localhost:8081/api/orders/'

class OrderService {
  /**
   * make http GET request
   * get all records in 'orders' collection
   */
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

  /**
   * make http POST request
   * @param order order info in json
   */
  static postOrder(order) {
    return axios.post(url, order)
  }
}

export default OrderService