$(function(){
  function buildHTML(message){
    var image = (
      (message.image)
      ? (message.image)
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
});