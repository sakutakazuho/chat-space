$(function(){
  function buildHTML(message){
    image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : "";
    var html =
      `<div class="message" data-message-id= "${message.id}" >
          <div class="upper-message ">
          <div class="upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="upper-message__date">
              ${message.created_at}
            </div>
          </div>
          <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
            ${image}
          </div>
        </div>`

    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      url: window.location.pathname,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data)
      $('.messages').append(html)
      $('#new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
  
    })
    .fail(function(){
      alert('送信に失敗しました。');
    })
    .always(function(){
      $(".form__submit").removeAttr("disabled");
    });
  });


  var reloadMessages =(function() {
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      var last_message_id = $(".message").last().data('message-id');
      var url = 'api/messages';
      $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id},
      })
      .done(function(messages) {
        if(messages.length > 0){
          var insertHTML = '';
          messages.forEach(function(message){
            insertHTML += buildHTML(message);
          });
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        }
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    };
  });
  setInterval(reloadMessages, 5000);
});