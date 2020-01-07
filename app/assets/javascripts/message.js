$(function(){
  function buildHTML(message){
    var image = (
      (message.image_url)
      ? (message.image_url)
      : ("")
    );
    var html =(
      (`<div class="message" data-id= "${message.id}" >
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
          <img class="lower-message__image" src="${image}">
          </div>
        </div>`
      )
    );
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      url: location.href,
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
  })
  // var reloadMessages = function(){
  //   if(window.location.href.match(/\/groups\/\d+\/messages/)){
  //     var href = 'api/messages'
  //     var last_message_id = $('.message:last').data('id');
      
  //     $.ajax({
  //       url: href,
  //       type: 'GET',
  //       dataType: 'json',
  //       data: {id: last_message_id}
  //     })
  //     .done(function(messages){
  //       var insertHTML = '';
  //       if(message >= 0){
  //         messages.forEach(function(message){
  //           insertHTML = buildHTML(message);
  //           $('.messages').append(insertHTML);
  //           $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
  //         });
  //       }
  //     })
  //     .fail(function(){
  //       alert("自動更新に失敗しました");
  //     });
  //   };
  // };
  // setInterval(reloadMessages, 3000);
});