if(process.env.NODE_ENV == "test")
  var xmlhttp = require('xmlhttprequest').XMLHttpRequest;

export default function glQuery(query, user) {  
   return new Promise(function(resolve, reject) {
      let request= xmlhttp ? new xmlhttp() : new XMLHttpRequest();
      request.open("POST", "http://localhost:8080/graphql?query="+query, true);
      request.setRequestHeader("Content-Type", "application/graphql");
      if(user && user.token)
        request.setRequestHeader("x-access-token", user.token);
      request.send(query);
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          resolve(request.responseText)
        }
      }
    }).then(res => {
      let rs = JSON.parse(res)
      return rs.hasOwnProperty('data') ? rs.data : rs
    })
}

