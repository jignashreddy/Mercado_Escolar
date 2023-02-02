export default function authHeader() {
    let token =  localStorage.getItem("SmaccessToken");

    if (token) {
        return {
            "Content-type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "http://127.0.0.1:8000/*",
            'x-access-token': token,
            'Authorization' : 'Bearer '+token
        };
    } else {
      return {
        "Content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "http://127.0.0.1:8000/*",
      };
    }
  }
