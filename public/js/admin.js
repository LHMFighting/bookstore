$(function() {
    $('.del').click(function(e) {
        var target = $(e.target)
        var id = target.data('id')
        var tr = $('.item-id-' + id)
        console.log(tr)

        $.ajax({
            type: 'DELETE',
            url: '/admin/book/list?id=' + id
        })
        .done(function(results) {
                console.log(results)
            if(results.success === 1) {
                if (tr.length > 0) {
                    tr.remove()
                }
            }
        }) 
    })

    $('#douban').blur(function() {
        var douban = $(this)
        var id = douban.val()
        if(id){
            $.ajax({
                url:'https://api.douban.com/v2/book/' + id,
                cache: true,
                type: 'get',
                dataType: 'jsonp',
                crossDomain: true,
                jsonp: 'callback',
                success: function(data) {
                    console.log(data.summary);
                    $('#inputTitle').val(data.title);
                    $('#inputAuthor').val(data.author[0]);
                    $('#inputPubdate').val(data.pubdate);
                    $('#inputCategory').val(data.tags[0].name);
                    $('#inputPages').val(data.pages);
                    $('#inputPoster').val(data.images.large);
                    $('#inputPublisher').val(data.publisher);
                    $('#inputAuthorIntro').val(data.author_intro);
                    $('#inputSummary').val(data.summary);
                    $('#inputPrice').val(data.price);
                }
            })
        }
    })
})