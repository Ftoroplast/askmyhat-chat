(function () {
  "use strict";

  /* Создание чата скриптом */

  // var style = document.createElement("style");
  // document.querySelector("head").appendChild(style);
  // style.innerHTML = ".shpindler-chat{position:fixed;bottom:0;right:0;display:flex;flex-direction:column;width:350px;margin:0 auto;padding:10px;padding-top:0;background-color:#add8e6;border-top:1px solid #000;border-left:1px solid #000;font-size:16px;line-height:24px;font-weight:400;font-family:\"Arial\",sans-serif;}.shpindler-chat__view{height:200px;width:100%;margin-bottom:20px;background-color:#fff}.shpindler-chat__btn_close{align-self:flex-end;width:40px;height:40px;font-size:40px;line-height:40px}.shpindler-chat__btn{box-sizing:border-box;border:none;background-color:transparent;cursor:pointer}.shpindler-chat__btn:focus{outline:none}.shpindler-chat__panel{position:relative}.shpindler-chat__btn-list{display:none;position:absolute;bottom:10px;left:0;padding:5px;background-color:#fff;list-style:none}.shpindler-chat__btn-item{margin:5px 0;border-bottom:1px solid lightgray}";

  var chat = document.createElement("div");
  chat.className = "shpindler-chat";
  document.body.appendChild(chat);
  chat.close = function () {
    this.style.display = "none";
  }
  chat.turn = function () {
    if (!this.classList.contains("shpindler-chat_turned")) {
      this.classList.add("shpindler-chat_turned");
    } else {
      this.classList.remove("shpindler-chat_turned");
    }
  }

  var chatHeader = document.createElement("div");
  chatHeader.className = "shpindler-chat__header";
  chat.appendChild(chatHeader);

  var chatCloseBtn = document.createElement("button");
  chatCloseBtn.className = "shpindler-chat__btn shpindler-chat__btn_close";
  chatCloseBtn.innerHTML = "&times;";
  chatHeader.appendChild(chatCloseBtn);
  chatCloseBtn.onclick = function () {
    chat.close();
  };

  var chatTurnBtn = document.createElement("button");
  chatTurnBtn.className = "shpindler-chat__btn shpindler-chat__btn_turn";
  chatHeader.appendChild(chatTurnBtn);
  chatTurnBtn.onclick = function () {
    chat.turn();
  };

  var chatView = document.createElement("ul");
  chatView.className = "shpindler-chat__view";
  chat.appendChild(chatView);

  var chatPanel = document.createElement("div");
  chatPanel.className = "shpindler-chat__panel";
  chat.appendChild(chatPanel);

  var chatMenuBtn = document.createElement("button");
  chatMenuBtn.className = "shpindler-chat__btn shpindler-chat__btn_menu";
  chatMenuBtn.innerHTML = "Прикрепить";
  chatPanel.appendChild(chatMenuBtn);
  chatMenuBtn.onclick = function () {
    chatBtnList.toggleVisibility();
  }

  var chatBtnList = document.createElement("ul");
  chatBtnList.className = "shpindler-chat__btn-list";
  chatPanel.appendChild(chatBtnList);
  chatBtnList.toggleVisibility = function () {
    if (getComputedStyle(this).display == "none") {
      this.style.display = "block";
    } else if (getComputedStyle(this).display == "block") {
      this.style.display = "none";
    }
  }

  var chatItemImage = document.createElement("li");
  chatItemImage.className = "shpindler-chat__btn-item shpindler-chat__btn-item_image";
  chatBtnList.appendChild(chatItemImage);

  var chatItemLocation = document.createElement("li");
  chatItemLocation.className = "shpindler-chat__btn-item shpindler-chat__btn-item_location";
  chatBtnList.appendChild(chatItemLocation);

  var chatItemBtn = document.createElement("li");
  chatItemBtn.className = "shpindler-chat__btn-item shpindler-chat__btn-item_btn";
  chatBtnList.appendChild(chatItemBtn);

  var chatBtnImage = document.createElement("label");
  chatBtnImage.className = "shpindler-chat__btn shpindler-chat__btn_image";
  chatBtnImage.innerHTML = "Изображение";
  chatBtnImage.setAttribute("for", "image");
  chatItemImage.appendChild(chatBtnImage);

  var chatInputImage = document.createElement("input");
  chatInputImage.className = "shpindler-chat__input shpindler-chat__input_image";
  chatInputImage.setAttribute("id", "image");
  chatInputImage.setAttribute("type", "file");
  chatBtnImage.appendChild(chatInputImage);

  var chatBtnLocation = document.createElement("button");
  chatBtnLocation.className = "shpindler-chat__btn shpindler-chat__btn_location";
  chatBtnLocation.innerHTML = "Местоположение";
  chatItemLocation.appendChild(chatBtnLocation);

  var chatInputText = document.createElement("input");
  chatInputText.className = "shpindler-chat__input";
  chatInputText.setAttribute("placeholder", "Enter your message");
  chatPanel.appendChild(chatInputText);

  var chatSubmitBtn = document.createElement("button");
  chatSubmitBtn.className = "shpindler-chat__btn shpindler-chat__btn_submit";
  chatSubmitBtn.innerHTML = "Отправить";
  chatPanel.appendChild(chatSubmitBtn);

  /* Основная логика */

  var options = {
    url: ""
  };

  // message.addImage = function (image) {
  //   this["image"] = image;
  // }
  // chatBtnImage.onclick = message.addImage;
  //
  // message.addLocation = function () {
  //
  // }
  // chatBtnLocation.onclick = message.addLocation;

  // message.addButton = function () {
  //   var button = document.createElement("button");
  //   button.innerHTML =
  //   button.onclick = function () {
  //     var message = {
  //       "from": "Client",
  //       "datetime": new Date().toLocaleString("ru", {
  //         "day": "numeric",
  //         "month": "numeric",
  //         "year": "numeric",
  //         "hour": "numeric",
  //         "minute": "numeric",
  //         "second": "numeric"
  //       }),
  //       "text":
  //     }
  //     message.sendMessage
  //   }
  //   this["buttons"].push(button);
  // }
  // chatBtnBtn.onclick = function () {
  //   chatBtnCreationWindow.style.display = "block";
  // };

  chatView.addMessage = function (message) {
    var chatMessage = document.createElement("li");
    if (message["from"] == "Client") {
      chatMessage.className = "shpindler-chat__message shpindler-chat__message_client";
    } else if (message["from"] == "Server") {
      chatMessage.className = "shpindler-chat__message shpindler-chat__message_server";
    }
    this.appendChild(chatMessage);

    var chatMessageText = document.createElement("p");
    chatMessageText.className = "shpindler-chat__text";
    chatMessageText.innerHTML = message["text"];
    chatMessage.appendChild(chatMessageText);

    if (message["image"]) {
      var chatMessageImageLink = document.createElement("a");
      chatMessageImageLink.className = "shpindler-chat__image";
      chatMessageImageLink.setAttribute("href", message["image"]);
      chatMessageImageLink.setAttribute("target", "blank_");
      chatMessage.appendChild(chatMessageImageLink);

      var chatMessageImage = document.createElement("img");
      chatMessageImage.setAttribute("src", message["image"]);
      chatMessageImageLink.appendChild(chatMessageImage);
    };

    if (message["buttons"].length > 0) {
      var chatMessageBtnList = document.createElement("ul");
      chatMessageBtnList.className = "shpindler-chat__message-btn-list";
      chatMessage.appendChild(chatMessageBtnList);

      message["buttons"].forEach(function (button, i, arr) {
        var chatMessageBtnItem = document.createElement("li");
        chatMessageBtnItem.className = "shpindler-chat__message-btn-item";
        chatMessageBtnList.appendChild(chatMessageBtnItem);

        var chatMessageBtn = document.createElement("a");
        chatMessageBtn.className = "shpindler-chat__message-btn";
        chatMessageBtn.innerHTML = button["text"];
        chatMessageBtnItem.appendChild(chatMessageBtn);

        switch (button["type"]) {
          case "callback":
            chatMessageBtn.onclick = function () {
              var message = {
                "from": "client",
                "datetime": new Date(milliseconds),
                "text": button["callback"],
                "image": "",
                "location": [],
                "buttons": []
              }
              chat.sendMessage(message, options);

              return false;
            }
            break;
          case "url":
            chatMessageBtn.setAttribute("href", button["url"]);
            chatMessageBtn.setAttribute("target", "blank_");
            break;
        }
      });
    };
  };

  chatView.addErrorMessage = function (errorText) {
    var chatErrorMessage = document.createElement("li");
    chatErrorMessage.className = "shpindler-chat__message shpindler-chat__message_error";
    chatErrorMessage.innerHTML = errorText;
    this.appendChild(chatErrorMessage);
  }

  chat.initialize = function () {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", options["url"], true);
    var id = -1;
    if (localStorage.getItem("id")) {
      id = parseInt(localStorage.getItem("id"));
    }
    var message = {
      "isInitialization": true,
      "id": id
    };
    xhr.send(JSON.stringify(message));
    xhr.onload = function () {
      response = JSON.parse(responseText);
      if (id === -1) {
        localStorage.setItem("id", String(response["id"]));
      } else {
        response["history"].forEach(function (historyItem, historyItemOrder, historyList) {
          chat.addMessage(historyItem);
        });
      }
    }
    xhr.onerror = function () {
      xhr.send(JSON.stringify(message));
    }
  }

  chat.sendMessage = function (message, options) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", options["url"], true);
    xhr.send(JSON.stringify(message));
    xhr.onload = function () {
      chatView.addMessage(message);
      chatView.addMessage(JSON.parse(responseText));
    }
    xhr.onerror = function () {
      chatView.addErrorMessage("Error. Message wasn't sent.");
    }
  };

  (function Test() {
    chatView.addErrorMessage("test1");

    chatView.addMessage({
      "from": "Client",
      "datetime": new Date().toLocaleString("ru", {
        "day": "numeric",
        "month": "numeric",
        "year": "numeric",
        "hour": "numeric",
        "minute": "numeric",
        "second": "numeric"
      }),
      "text": "Привет, мир!",
      "image": "http://placehold.it/500x200",
      "location": [],
      "buttons": []
    });

    chatView.addErrorMessage("test2");

    chatView.addMessage({
      "from": "Server",
      "datetime": String(new Date()),
      "text": "Привет, мир!",
      "image": "http://placehold.it/500x200",
      "location": [],
      "buttons": [
        {
          "type": "url",
          "url": "http://vk.com/",
          "text": "VK"
        }
      ]
    });

    chatView.addErrorMessage("test3");
  })();
})();
