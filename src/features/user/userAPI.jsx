export function fetcheLoggedInUserOrders() {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:3000/orders/own') 
      const data = await response.json()
      resolve({data})
    }
    );
  }

  export function fetcheLoggedInUser() {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:3000/users/own') 
      const data = await response.json()
      resolve({data})
    }
    );
  }

  
  export function updateUser(update) {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:3000/users/'+update.id,{
        method:'PATCH',
        body:JSON.stringify(update),
        headers:{'content-type':'application/json'},
      }) 
      const data = await response.json()
      //Todo:on server it will only return some info of user(not password)
      resolve({data})
    }
    );
  }