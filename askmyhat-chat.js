(function () {
  "use strict";

  var style = document.createElement("style");
  document.querySelector("head").appendChild(style);
  style.innerHTML = ".askmyhat-chat{position:fixed;bottom:0;right:0;display:flex;flex-direction:column;width:350px;margin:0 auto;padding:10px;padding-top:0;background-color:#add8e6;border-top:1px solid #000;border-left:1px solid #000;font-size:16px;line-height:24px;font-weight:400;font-family:\"Arial\",sans-serif;}.askmyhat-chat__view{height:200px;width:100%;margin-bottom:20px;background-color:#fff}.askmyhat-chat__btn_close{align-self:flex-end;width:40px;height:40px;font-size:40px;line-height:40px}.askmyhat-chat__btn{box-sizing:border-box;border:none;background-color:transparent;cursor:pointer}.askmyhat-chat__btn:focus{outline:none}.askmyhat-chat__panel{position:relative}.askmyhat-chat__btn-list{display:none;position:absolute;bottom:10px;left:0;padding:5px;background-color:#fff;list-style:none}.askmyhat-chat__btn-item{margin:5px 0;border-bottom:1px solid lightgray}";

  var chat = document.createElement("div");
  chat.className = "askmyhat-chat";
  document.body.appendChild(chat);

  var chatCloseBtn = document.createElement("button");
  chatCloseBtn.className = "askmyhat-chat__btn askmyhat-chat__btn_close";
  chatCloseBtn.innerHTML = "&times;";
  chat.appendChild(chatCloseBtn);

  var chatView = document.createElement("div");
  chatView.className = "askmyhat-chat__view";
  chat.appendChild(chatView);

  var chatPanel = document.createElement("div");
  chatPanel.className = "askmyhat-chat__panel";
  chat.appendChild(chatPanel);

  var chatMenuBtn = document.createElement("button");
  chatMenuBtn.className = "askmyhat-chat__btn askmyhat-chat__btn_menu";
  chatMenuBtn.innerHTML = "Прикрепить";
  chatPanel.appendChild(chatMenuBtn);
  chatMenuBtn.onclick = function () {
    chatBtnList.toggleVisibility();
  }

  var chatBtnList = document.createElement("ul");
  chatBtnList.className = "askmyhat-chat__btn-list";
  chatPanel.appendChild(chatBtnList);
  chatBtnList.toggleVisibility = function () {
    if (getComputedStyle(this).display == "none") {
      this.style.display = "block";
    } else if (getComputedStyle(this).display == "block") {
      this.style.display = "none";
    }
  }

  var chatItemImage = document.createElement("li");
  chatItemImage.className = "askmyhat-chat__btn-item askmyhat-chat__btn-item_image";
  chatBtnList.appendChild(chatItemImage);

  var chatItemLocation = document.createElement("li");
  chatItemLocation.className = "askmyhat-chat__btn-item askmyhat-chat__btn-item_location";
  chatBtnList.appendChild(chatItemLocation);

  var chatItemBtn = document.createElement("li");
  chatItemBtn.className = "askmyhat-chat__btn-item askmyhat-chat__btn-item_btn";
  chatBtnList.appendChild(chatItemBtn);

  var chatBtnImage = document.createElement("button");
  chatBtnImage.className = "askmyhat-chat__btn askmyhat-chat__btn_image";
  chatBtnImage.innerHTML = "Изображение";
  chatItemImage.appendChild(chatBtnImage);

  var chatBtnLocation = document.createElement("button");
  chatBtnLocation.className = "askmyhat-chat__btn askmyhat-chat__btn_location";
  chatBtnLocation.innerHTML = "Местоположение";
  chatItemLocation.appendChild(chatBtnLocation);

  var chatBtnBtn = document.createElement("button");
  chatBtnBtn.className = "askmyhat-chat__btn askmyhat-chat__btn_btn";
  chatBtnBtn.innerHTML = "Кнопка";
  chatItemBtn.appendChild(chatBtnBtn);

  var chatInput = document.createElement("input");
  chatInput.className = "askmyhat-chat__input";
  chatInput.setAttribute("placeholder", "Enter your message");
  chatPanel.appendChild(chatInput);

  var chatSubmitBtn = document.createElement("button");
  chatSubmitBtn.className = "askmyhat-chat__btn askmyhat-chat__btn_submit";
  chatSubmitBtn.innerHTML = "Отправить";
  chatPanel.appendChild(chatSubmitBtn);
})();
