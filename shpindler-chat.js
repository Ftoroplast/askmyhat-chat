function shpindlerChat(options) {
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
  chatMenuBtn.onmouseover = function () {
    chatBtnList.toggleVisibility();
  }

  var chatBtnList = document.createElement("ul");
  chatBtnList.className = "shpindler-chat__btn-list";
  chatPanel.appendChild(chatBtnList);
  chatBtnList.toggleVisibility = toggleVisibility;
  var chatBtnListTimer = {};
  chatBtnList.onmouseleave = function () {
    chatBtnListTimer = setTimeout(function () {
      chatBtnList.toggleVisibility();
    }, 500);
  };
  chatBtnList.onmouseenter = function () {
    clearTimeout(chatBtnListTimer);
  };

  var chatItemImage = document.createElement("li");
  chatItemImage.className = "shpindler-chat__btn-item shpindler-chat__btn-item_image";
  chatBtnList.appendChild(chatItemImage);

  var chatItemLocation = document.createElement("li");
  chatItemLocation.className = "shpindler-chat__btn-item shpindler-chat__btn-item_location";
  chatBtnList.appendChild(chatItemLocation);

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
  chatInputText.setAttribute("placeholder", "Write a message...");
  chatPanel.appendChild(chatInputText);

  var chatSubmitBtn = document.createElement("button");
  chatSubmitBtn.className = "shpindler-chat__btn shpindler-chat__btn_submit";
  chatSubmitBtn.innerHTML = "Отправить";
  chatPanel.appendChild(chatSubmitBtn);

  var imageAddWindow = document.createElement("div");
  imageAddWindow.className = "shpindler-chat__image-add-window";
  chat.appendChild(imageAddWindow);
  imageAddWindow.toggleVisibility = toggleVisibility;

  var imageAddWindowImageWrapper = document.createElement("div");
  imageAddWindowImageWrapper.className = "shpindler-chat__image-add-window-image-wrapper";
  imageAddWindow.appendChild(imageAddWindowImageWrapper);

  var imageAddWindowImage = document.createElement("img");
  imageAddWindowImageWrapper.appendChild(imageAddWindowImage);

  var imageAddWindowInput = document.createElement("input");
  imageAddWindowInput.className = "shpindler-chat__input shpindler-chat__input_image-add-window";
  imageAddWindowInput.setAttribute("placeholder", "Write a message...");
  imageAddWindow.appendChild(imageAddWindowInput);

  var imageAddWindowSubmit = document.createElement("button");
  imageAddWindowSubmit.className = "shpindler-chat__btn shpindler-chat__btn_image-add-window";
  imageAddWindowSubmit.innerHTML = "Отправить";
  imageAddWindow.appendChild(imageAddWindowSubmit);

  var chatOverlay = document.createElement("div");
  chatOverlay.className = "shpindler-chat__overlay shpindler-chat__overlay_image-add-window";
  chat.appendChild(chatOverlay);
  chatOverlay.toggleVisibility = toggleVisibility;
  chatOverlay.onclick = function () {
    imageAddWindow.toggleVisibility();
    this.toggleVisibility();
  };

  /* Основная логика */

  var mapNumber = 0;

  function Message(sender) {
    this["id"] = localStorage.getItem("id");
    this["from"] = sender;
    this["datetime"] = new Date();
    this["text"] = "";
    this["image"] = "";
    this["location"] = {};
    this["buttons"] = [];

    this.addText = function (text) {
      this["text"] = text;
    }

    this.addImage = function (image) {
      this["image"] = image;
    }

    this.addLocation = function (location) {
      this["location"] = location;
    }

    this.addButton = function (button) {
      this["buttons"].push(button);
    }
  }

  function Button(type, text, callback, url) {
    this["type"] = type;
    this["text"] = text;
    this["callback"] = callback;
    this["url"] = url;
  }

  chatView.addMessage = function (message) {
    var chatMessage = document.createElement("li");
    if (message["from"] == "client") {
      chatMessage.className = "shpindler-chat__message shpindler-chat__message_client";
    } else if (message["from"] == "server") {
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
      chatMessageImageLink.onclick = function () {
        var overlay = document.createElement("div");
        overlay.className = "shpindler-chat__overlay shpindler-chat__overlay_popup";
        document.body.appendChild(overlay);
        overlay.onclick = function () {
          document.body.removeChild(popup);
          document.body.removeChild(this);
        }

        var popup = document.createElement("div");
        popup.className = "shpindler-chat__popup shpindler-chat__popup_image";
        document.body.appendChild(popup);

        var popupImage = document.createElement("img");
        popupImage.setAttribute("src", imageReader.result);
        popup.appendChild(popupImage);

        return false;
      }

      chatMessageImageLink.setAttribute("target", "blank_");
      chatMessage.appendChild(chatMessageImageLink);

      var chatMessageImage = document.createElement("img");
      chatMessageImageLink.appendChild(chatMessageImage);

      var imageReader = new FileReader();
      imageReader.onloadend = function () {
        chatMessageImageLink.setAttribute("href", imageReader.result);
        chatMessageImage.setAttribute("src", imageReader.result);
        message["image"] = imageReader.result;
      };
      imageReader.readAsDataURL(message["image"]);
    };

    if ("buttons" in message) {
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
                var message = new Message("client");
                message.addText(button["callback"]);
                chat.sendMessage(message);

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

    if ("location" in message) {
      if (message["location"]["longitude"] && message["location"]["latitude"]) {
        var map = document.createElement("a");
        map.className = "shpindler-chat__map";
        map.id = "map" + (++mapNumber);
        var mapZoom = 15;
        var hrefURL = "https://www.google.ru/maps/@" + message["location"]["latitude"] + "," + message["location"]["longitude"] + "," + mapZoom + "z";
        map.setAttribute("href", hrefURL);
        map.setAttribute("target", "blank_");
        chatMessage.appendChild(map);

        var mapImage = document.createElement("img");
        mapImage.className = "shpindler-chat__map-image";
        var mapSize = "300x300";
        var googleAPIKey = "AIzaSyBTtMin1_WIbmQDPRP2GWMl79Xo4H3wAaU";
        var parameters = "center=" + message["location"]["latitude"] + "," + message["location"]["longitude"] + "&zoom=" + mapZoom + "&size=" + mapSize + "&key=" + googleAPIKey;
        var srcURL = "https://maps.googleapis.com/maps/api/staticmap?" + parameters;
        mapImage.setAttribute("src", srcURL);
        map.appendChild(mapImage);
      }
    };

    chatMessage.scrollIntoView();
  };

  chatView.addErrorMessage = function (errorText) {
    var chatErrorMessage = document.createElement("li");
    chatErrorMessage.className = "shpindler-chat__message shpindler-chat__message_error";
    chatErrorMessage.innerHTML = errorText;
    this.appendChild(chatErrorMessage);

    chatErrorMessage.scrollIntoView();
  }

  chat.initialize = function () {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", options["url"], true);
    var id = -1;
    if (localStorage.getItem("id")) {
      id = parseInt(localStorage.getItem("id"));
    };
    var message = {
      "isInitialization": true,
      "id": id
    };
    xhr.send(JSON.stringify(message));
    xhr.onload = function () {
      var response = JSON.parse(this.responseText);
      if (id === -1) {
        if ("id" in response) {
          localStorage.setItem("id", String(response["id"]));
        }
      } else {
        if ("history" in response) {
          response["history"].forEach(function (historyItem, historyItemOrder, historyList) {
            if ("image" in historyItem) {
              if (historyItem["image"]) {
                try {
                  historyItem["image"] = b64toBlob(historyItem["image"]);
                } catch(err) {
                  historyItem["image"] = historyItem["image"];
                }
              }
            }
            chatView.addMessage(historyItem);
          });
        }
      }
    }
    xhr.onerror = function () {
      chatView.addErrorMessage("Error while initializing.");
    }
  };

  chat.sendMessage = function (message) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", options["url"], true);
    chatView.addMessage(message);
    if (message["image"]) {
      var imageReader = new FileReader();
      message["image"] = imageReader.readAsDataURL(message["image"]);
    };
    xhr.send(JSON.stringify(message));
    xhr.onload = function () {
      var response = JSON.parse(this.responseText);
      response["from"] = "server";
      if ("image" in response) {
        if (response["image"]) {
          response["image"] = b64toBlob(response["image"]);
        }
      }
      chatView.addMessage(response);
    }
    xhr.onerror = function () {
      chatView.addErrorMessage("Message wasn't sent.");
    }
  };

  chatInputText.onchange = function () {
  };

  imageAddWindowInput.onchange = function () {
  };

  chatBtnLocation.onclick = function () {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(success, error);

      function success(position) {
        var location = {};
        location["latitude"] = position.coords.latitude;
        location["longitude"] = position.coords.longitude;
        var message = new Message("client");
        message.addLocation(location);
        chat.sendMessage(message);
      };

      function error() {
        chatView.addErrorMessage("Can't detect your location.");
      };
    };
  };

  chatInputImage.onchange = function () {
    chatOverlay.toggleVisibility();
    imageAddWindow.toggleVisibility();
    var imageReader = new FileReader();
    imageReader.onloadend = function () {
      imageAddWindowImage.setAttribute("src", this.result);
    }
    imageReader.readAsDataURL(this.files[0]);
  }

  chatSubmitBtn.onclick = function () {
    var message = new Message("client");
    chatInputText.onchange();
    message.addImage(chatInputImage.files[0] || "");
    message.addText(chatInputText.value);
    if (message["text"] || message["image"]) {
      chat.sendMessage(message);
    };
    clearFields();
  };

  chatInputText.onfocus = function () {
    window.addEventListener("keypress", submitOnEnter);
  };

  chatInputText.onblur = function () {
    window.removeEventListener("keypress", submitOnEnter);
  };

  imageAddWindowInput.onfocus = function () {
    window.addEventListener("keypress", submitOnEnterImageAddWindow);
  };

  imageAddWindowInput.onblur = function () {
    window.removeEventListener("keypress", submitOnEnterImageAddWindow);
  };

  imageAddWindowSubmit.onclick = function () {
    var message = new Message("client");
    imageAddWindowInput.onchange();
    message.addImage(chatInputImage.files[0] || "");
    message.addText(imageAddWindowInput.value);
    if (message["text"] || message["image"]) {
      chat.sendMessage(message);
    }
    imageAddWindow.toggleVisibility();
    chatOverlay.toggleVisibility();
    clearFields();
  }

  chat.initialize();

  function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
  };

  function toggleVisibility() {
    if (getComputedStyle(this).display == "none") {
      this.style.display = "flex";
    } else if (getComputedStyle(this).display == "flex") {
      this.style.display = "none";
    }
  };

  function submitOnEnter(e) {
    if (e.keyCode === 13) {
      chatSubmitBtn.onclick();
    };
  };

  function submitOnEnterImageAddWindow(e) {
    if (e.keyCode === 13) {
      imageAddWindowSubmit.onclick();
    };
  };

  function clearFields() {
    chatInputText.value = "";
    chatInputText.onchange();
    imageAddWindowInput.value = "";
    imageAddWindowInput.onchange();
    chatInputImage.value = "";
  };
};
