


let p = fetch("http://localhost:8000/api/v1/users")
p.then ((response)=>{

    console.log(response.status)
    console.log(response.ok)
    console.log(response.headers)
    return response.json()
  
}).then((users)=> { 
    console.log(users)


    
})
