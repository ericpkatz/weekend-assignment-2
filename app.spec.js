const expect = require('chai').expect;
const products = [
  {
    id: 1,
    name: 'foo',
    price: 7
  },
  {
    id: 2,
    name: 'bar',
    price: 2
  },
  {
    id: 5,
    name: 'bazz',
    price: 1
  },
];

const users = [
  {
     id: 1,
     name: 'moe'
  },
  {
     id: 2,
     name: 'larry'
  },
  {
     id: 3,
     name: 'curly'
  }
];

// productId matches up with product in products
// userId matches up with user in users
const orders = [
  {
    id: 1,
    productId: 1,
    quantity: 3,
    userId: 1
  },
  {
    id: 2,
    productId: 1,
    quantity: 7,
    userId: 1
  },
  {
    id: 3,
    productId: 5,
    quantity: 70,
    userId: 3
  },
  {
    id: 4,
    productId: 5,
    quantity: 1,
    userId: 3
  }
];

const productsPurchased = (orders, products)=> {
   const productMap = products.reduce((acc, product)=> {
     acc[product.id] = product;
     return acc;
   }, {});
  const orderMap = orders.reduce((acc, order)=> {
    acc[order.productId] = productMap[order.productId];
    return acc;
  }, {});
  return Object.values(orderMap);
};

const topSellingProductByQuantity = (orders, products)=> {
  const orderSummary = orders.reduce((acc, order)=> {
    let found = acc.find(item => item.productId === order.productId);
    if(!found){
      found = { productId: order.productId, quantity: 0};
      acc.push(found);
    }
    found.quantity += order.quantity;
    return acc;
  }, []); 
  const sorted = orderSummary.sort((a, b) => b.quantity - a.quantity);
  const product = products.find( product => product.id === sorted[0].productId);
  return product;
};

const usersWithOrders =  (users, orders)=> {
  const userMap = users.reduce((acc, user)=> {
    acc[user.id] = user;
    return acc;
  }, {});
  const orderMap = orders.reduce((acc, order)=> {
    acc[order.userId] = userMap[order.userId];
    return acc;
  }, {});
  return Object.values(orderMap);
}

//console.log(productsPurchased(orders, products)); // logs foo and bazz products

//console.log(topSellingProductByQuantity(orders, products));//logs bazz product

//console.log(usersWithOrders(users, orders));//logs info on moe and curly

describe('productsPurchased', ()=> {
  it('returns foo and bazz', ()=> {
    const results = productsPurchased(orders, products);
    const names = results.map( product => product.name );
    expect(results.length).to.equal(2);
    expect(names).to.include('foo');
    expect(names).to.include('bazz');
  });
});

describe('top selling product', ()=> {
  it('is bazz', ()=> {
    const bazz = topSellingProductByQuantity(orders, products);
    expect(bazz.name).to.equal('bazz');
  });
});

describe('users with orders', ()=> {
  it('returns moe and curly', ()=> {
    const results = usersWithOrders(users, orders);
    const names = results.map( user => user.name );
    expect(results.length).to.equal(2);
    expect(names).to.contain('moe');
    expect(names).to.contain('curly');
  });
});
