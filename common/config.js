export default {
  header: {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
  },
  api: {
    base: "http://rap.taobao.org/mockjs/16148",
    newsList: "/api/newsList",
    orderList: "/api/orderList",
    account: "/api/account",
    comment: "/api/commentList"
  }
}