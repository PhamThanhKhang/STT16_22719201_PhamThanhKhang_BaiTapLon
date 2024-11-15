const btn = document.querySelectorAll(".themVaoGioHang")

btn.forEach(function(button, index) {
    button.addEventListener("click", function(event) {
        event.preventDefault()
        var btnItem = event.target
        var product = btnItem.parentNode.parentNode.parentNode;
        var productImg = product.querySelector("img").src
        var productName = product.querySelector(".card-body>a").innerText
        var productPrice = product.querySelector(".price-sale-item").innerText

        addCart(productImg, productName, productPrice)
    })
})

function addCart(productImg, productName, productPrice) {
    var addtr = document.createElement("tr") 
    // var cartItem = document.querySelectorAll("tbody tr")

    // for (var i = 0; i < cartItem.length; i++) {
    //     var productT = cartItem[i].querySelector(".title");
    //     if (productT.innerHTML == productName) {
    //         alert("Sản phẩm đã có trong giỏ hàng!");
    //         return;
    //     }
    // }

    var trContent = `
        <tr>
            <td><img src="${productImg}" alt=""></td>
            <td><span class="title">${productName}</span></td>
            <td><span class= "price">${productPrice}</span></td>
            <td><input type="number" value="1" min="0"></td>
            <td><span class= "cart-delete"><i class="fa-solid fa-trash-can"></i></span></td>
        </tr>`;
    
    addtr.innerHTML = trContent
    var cartTable = document.querySelector("tbody")
    cartTable.append(addtr) 

    cartTotal() 
    deleteCart()
}

function cartTotal() {
    var cartItem = document.querySelectorAll("tbody tr")
    console.log(cartItem);
    var totalC = 0;

    for(var i = 0; i < cartItem.length; i++) {
        var inputValue = cartItem[i].querySelector("input").value
        var productPriceStr = cartItem[i].querySelector(".price").innerHTML;

        // Loại bỏ dấu "," và ký tự "₫" từ chuỗi giá trị
        var productPrice = parseFloat(productPriceStr.replace(/,/g, '').replace('₫', ''));
        totalA = inputValue*productPrice*1000
        totalC = totalC + totalA;
        totalD = totalC.toLocaleString('de-DE')
    }
    var cartTotalA = document.querySelector("#block-ThanhToan span")
   
    cartTotalA.innerHTML = totalD + " ₫";
}

function deleteCart() {
    var cartItem = document.querySelectorAll("tbody tr")
    for (var i = 0; i < cartItem.length; i++) {
        var productT = document.querySelectorAll(".cart-delete")
        productT[i].addEventListener("click", function(e) {
            var cartDelete = e.target
            var cartItemR = cartDelete.parentElement.parentElement.parentElement 
            cartItemR.remove()  
            cartTotal()    
        })
        
    }
    
}