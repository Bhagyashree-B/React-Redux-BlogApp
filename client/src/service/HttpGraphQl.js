export default function glQuery(query, user) {
    return new Promise(function(resolve, reject) {
      let request=new XMLHttpRequest();
      request.open("POST", "/graphql?query="+query, true);
      request.setRequestHeader("Content-Type", "application/graphql");
      if(user && user.token)
        request.setRequestHeader("x-access-token", user.token);
      request.send(query);
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          resolve(request.responseText)
        }
      }
    }).then(res => JSON.parse(res).data)  
}
