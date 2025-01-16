export function createOrder(order) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:3000/orders',{
      method:'POST',
      body:JSON.stringify(order),
      headers:{'content-type':'application/json'},
    }) 
    const data = await response.json()
    //Todo:on server it will only return some info of user(not password)
    resolve({data})
  }
  );
}


export function fetchAllOrders(pagination) {
  //TODO:Multiple Select Categories from Backend
  let queryString = "";
  

for(let key in pagination){
  queryString+=`${key}=${pagination[key]}&`
}

  return new Promise(async (resolve) => {
    console.log(queryString)
    const response = await fetch(
      "http://localhost:3000/orders?" + queryString
    );
    const order = await response.json();
    const totalOrders = await response.headers.get("X-Total-Count");
    resolve({ data: { order: order,totalOrders:totalOrders}});
  });
}


export function updateOrder(order) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:3000/orders/'+order.id,{
      method:'PATCH',
      body:JSON.stringify(order),
      headers:{'content-type':'application/json'},
    }) 
    const data = await response.json()
    //Todo:on server it will only return some info of user(not password)
    resolve({data})
  }
  );
}

export function orderPaymentId(id) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:3000/payment',{
      method:'POST',
      body:JSON.stringify({id}),
      headers:{'content-type':'application/json'},
    }) 
    const data = await response.json()
    //payment_ID
    //Payment_Link
    try{
      if(data.payment_link_url){
        window.location.href=data.payment_link_url;
      }
    }catch(error){
      resolve({error})
    }

    resolve({data})
  }
  );
}

