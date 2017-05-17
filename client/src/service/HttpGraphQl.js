export default function glQuery(query, user) {
  //console.log("In HTTPGraphQl => ", query);
    return new Promise(function(resolve, reject) {
      let request=new XMLHttpRequest();
      request.open("POST", "http://localhost:8080/graphql?query="+query, true);
      request.setRequestHeader("Content-Type", "application/graphql");
      //console.log("In HTTPGraphQl => " ,user);
      if(user && user.token)
        request.setRequestHeader("x-access-token", user.token);
      request.send(query);
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          //console.log("In HTTPGraphQl => if ");
          resolve(request.responseText)
        }else{
          //console.log("In HTTPGraphQl => reject ");
        }
      }
    }).then(res => {
      //console.log("json parsing +++++++++++++++++++++++++++++++++++++++++++++++++")
      //console.log("In HTTPGraphQl => ", res)
      let rs = JSON.parse(res)
      //console.log("json parsing 2 -------------------------")
      if(rs.success === false){
        window.localStorage.removeItem("user")
        return {}
      } else
        return rs.data
    })
}
