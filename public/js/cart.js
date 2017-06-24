$(function() {
    $('.carts').click(function(e) {
        var target = e.target
        var cartPoster = target.querySelectorAll('.cartPoster')[0].value;
        var cartTitle = target.querySelectorAll('.cartTitle')[0].value;
        var cartPrice = target.querySelectorAll('.cartPrice')[0].value;
        if (!localStorage.getItem('shopList')) {
            localStorage.setItem('shopList', JSON.stringify([]));
        }
        var cartList = {
            poster: cartPoster,
            title: cartTitle,
            price: cartPrice
        };
        
        console.log(cartPoster);
        console.log(cartTitle);
        console.log(cartPrice);


        if (window.localStorage) {
            var shopList = JSON.parse(localStorage.getItem('shopList'));
            shopList.push(cartList);
            // shopList.filter(function(item, index) {
            //     if (item.id === 1) {
            //         return false;
            //     }
            //     return true;
            // })
            localStorage.setItem('shopList', JSON.stringify(shopList))
        }
    })
})