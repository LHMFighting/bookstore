$(function() {
    if (window.localStorage) {
        var shopList = JSON.parse(localStorage.getItem('shopList'));
        var container = document.getElementsByClassName('row')[0];
        var tempHTML = "";
        shopList.map(function(item, index) {
            tempHTML += "<div class='col-md-2'>" +
                            "<div class='thumbnail'>" +
                                "<img src='" + item.poster + "'/>" +
                                "<div class='caption'>" +
                                    "<div class='row'>" +
                                        "<h4 class='col-md-12'>" + item.title + "</h4>" +
                                    "</div>" +
                                    "<div class='row'>" +
                                        "<div class='col-md-8' style='line-height: 35px;'>" + item.price + "</div>" +
                                        "<a class='btn btn-sm btn-primary del' href='#' role='button'>删除</a>" +
                                    "</div>" +
                                "</div>" +
                            "</div>" +
                        "</div>";
            return true;
        })
        container.innerHTML = tempHTML;
    }
    $(".del").click(function(e){
        var target = e.target
        console.log(target);
    })
})