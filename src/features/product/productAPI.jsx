

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    console.log("API called");
    const response = await fetch("http://localhost:3000/products/" + id);
    const data = await response.json();
    resolve({ data });
  });
}

// http://localhost:5173/product-detail/1

export function fetchProductsByFilters(filter, sort, pagination,search,admin) {
  //TODO:Multiple Select Categories from Backend
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      queryString += `${key}=${categoryValues}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  if(admin){
    queryString+=`admin=true`;
  }
  return new Promise(async (resolve) => {


    
    const response = await fetch(
      "http://localhost:3000/products?" + queryString
    );
    const data = await response.json();
  //Json-Server  
    const filterProducts = data.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: +totalItems, filterProducts:filterProducts } });
  });
}


export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/brands");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/categories");
    const data = await response.json();
    resolve({ data });
  });
}


export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    //Todo:on server it will only return some info of user(not password)
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:3000/products/" + update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    //Todo:on server it will only return some info of user(not password)
    resolve({ data });
  });
}
