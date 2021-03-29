import http from "../http-common";

class User {
  getPublicContent() {
    return http.get('/public');
  }
}

export default new User();