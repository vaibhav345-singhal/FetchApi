const getMenu = new Promise((resolve, reject) => {
    let data = fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json')

    data.then((response) => {
        resolve(response.json());
    })
        .catch((Error) => {
            reject(Error);
        })
})

function TakeOrder(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const parsedData = data;
            const totalItems = parsedData.length;

            const getRandomIndex = (max) => {
                return Math.floor(Math.random() * max);
            };

            const randomOrder = [];

            while (randomOrder.length < 3) {
                const randomIndex = getRandomIndex(totalItems);
                const randomValue = parsedData[randomIndex];
                randomOrder.push(randomValue);
            }

            resolve(randomOrder); // Resolve the promise with the random order
        }, 2500);
    });
}
function orderPrep() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const orderStatus = {
                order_status: 'true',
                paid: 'false'
            };
            resolve(orderStatus);
        }, 1500);
    });
}

function payOrder() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const orderStatus = {
                order_status: 'true',
                paid: 'true'
            };
            resolve(orderStatus);
        }, 1000)
    })
}
function thankyouFnc() {
    alert("thankyou for eating with us today!");
}
getMenu.then((data) => {

    let makeContent = "";

    for (let i = 0; i < data.length; i++) {
        makeContent += `<div class="card" style="width: 18rem;">
        <img src="${data[i].imgSrc}" class="card-img-top" alt=" ${data[i].name}"
        <div class="card-body">
          <h5 class="card-title">${data[i].name}</h5>
          <p class="card-text">${data[i].price}</p>
          <a href="#" class="btn btn-primary">Order</a>
        </div>
      </div>`;
    }

    document.getElementsByClassName('item')[0].innerHTML = makeContent;
    return data;
})
    .then((data) => {
        return TakeOrder(data);
    })
    .then((order) => {
        let orderHtml = "";
        for (let i = 0; i < order.length; i++) {
            orderHtml += `<div class="card" style="width: 18rem;">
                <img src="${order[i].imgSrc}" class="card-img-top" alt=" ${order[i].name}"
                <div class="card-body">
                  <h5 class="card-title">${order[i].name}</h5>
                  <p class="card-text">${order[i].price}</p>
                  <a href="#" class="btn btn-primary">Order</a>
                </div>
              </div>`;
        }
        document.getElementById('your-order').innerHTML = orderHtml;
        return order;
    })
    .then((order) => {
        return orderPrep();
    })
    .then((orderStatus) => {
        let status = `<ul>
        <li>Order Status : ${orderStatus.order_status}</li>
        <li>Paid: ${orderStatus.paid}</li>
      </ul>`;
        document.getElementById('order-status').innerHTML = status;
    })
    .then(() => {
        return payOrder();
    }).then((orderStatus) => {
        let status = `<ul>
        <li>Order Status : ${orderStatus.order_status}</li>
        <li>Paid: ${orderStatus.paid}</li>
      </ul>`;
        document.getElementById('order-status').innerHTML = status;
    })
    .then(() => {
        thankyouFnc();
    })
    .catch((Error) => {
        console.log(Error.name);
    })