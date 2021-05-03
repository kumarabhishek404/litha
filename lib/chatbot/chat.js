import { useSelector } from 'react-redux';
import {addSuggestion} from './suggestionButtons'
import showdown from 'showdown';
const converter = new showdown.Converter();
console.log('chat.js run');
// import useBot from '../../hooks/useBot';

/**
* returns formatted bot response 
* @param {String} text bot message response's text
*
*/
function getBotResponse(text) {
  const botAvatar = window.botAvatar
  botResponse = `<img class="botAvatar" src=${botAvatar}/><span class="botMsg">${text}</span><div class="clearfix"></div>`;
  return botResponse;
}


// const rasaURL = useBot()
// Toggle the chatbot screen
export const openBot = () => {
  $(".profile_div").toggle();
  $(".widget").toggle();
  console.log('bot opened');
  window.botOpened = true;
}

// clear function to clear the chat contents of the widget.
export const clearChat = () => {
  $(".chats").fadeOut("normal", () => {
    $(".chats").html("");
    $(".chats").fadeIn();
  });
}

/**
 * scroll to the bottom of the chats after new message has been added to chat
 */
function scrollToBottomOfResults() {
  const terminalResultsDiv = document.getElementById("chats");
  terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
}

// close function to close the widget.
export const closeBot = () => {
  $(".profile_div").toggle();
  $(".widget").toggle();
  console.log('bot closed');
  window.botOpened = false;
  scrollToBottomOfResults();
}



/**
 * adds the bot typing indicator from the chat screen
 */
function showBotTyping() {
  const botAvatar = window.botAvatar
  const botTyping = `<img class="botAvatar" id="botAvatar" src=${botAvatar}/><div class="botTyping"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>`;
  $(botTyping).appendTo(".chats");
  $(".botTyping").show();
  scrollToBottomOfResults();
}

//send function to send the message
export const sendMessage = () => { send() }

/**
 * Set user response on the chat screen
 * @param {String} message user message
 */
export const setUserResponse = (message) => {

  const userAvatar = window.userAvatar
  console.log(userAvatar, "User img");
  const user_response = `<img class="userAvatar" src=${userAvatar}><p class="userMsg">${message} </p><div class="clearfix"></div>`;
  $(user_response).appendTo(".chats").show("slow");

  $(".usrInput")[0].innerText;
  scrollToBottomOfResults();
  showBotTyping();
  // $(".suggestions").remove();
}

// restart function restart the chat
export const restartChat = () => { restartConversation() }

export const runOnLoad = () => {
  window.addEventListener('load', () => {
    // initialization
    $(document).ready(() => {
      // Bot pop-up intro
      $("div").removeClass("tap-target-origin");

      // drop down menu for close, restart conversation & clear the chats.
      $(".dropdown-trigger").dropdown();

      // initiate the modal for displaying the charts,
      // if you dont have charts, then you comment the below line
      $(".modal").modal();

      // enable this if u have configured the bot to start the conversation.
      // showBotTyping();
      // $("#userInput").prop('disabled', true);

      // if you want the bot to start the conversation
      // customActionTrigger();
    });
    // // // Toggle the chatbot screen
    // $("#profile_div").click(() => {
    //   $(".profile_div").toggle();
    //   $(".widget").toggle();
    // });

    // // // clear function to clear the chat contents of the widget.
    // $("#clear").click(() => {
    //   $(".chats").fadeOut("normal", () => {
    //     $(".chats").html("");
    //     $(".chats").fadeIn();
    //   });
    // });

    // // // close function to close the widget.
    // $("#close").click(() => {
    //   $(".profile_div").toggle();
    //   $(".widget").toggle();
    //   scrollToBottomOfResults();
    // });
  });
}

export const botClicked = (e) => {
  console.log('sended response');
  const text = $(".usrInput")[0].innerText;
  if (text === "" || $.trim(text) === "") {
    e.preventDefault();
    return false;
  }
  // destroy the existing chart
  if (typeof chatChart !== "undefined") {
    chatChart.destroy();
  }

  $(".chart-container").remove();
  if (typeof modalChart !== "undefined") {
    modalChart.destroy();
  }

  $(".suggestions").remove();
  $("#paginated_cards").remove();
  $(".quickReplies").remove();
  $(".usrInput").blur();
  $(".dropDownMsg").remove();
  setUserResponse(text);
  send(text);
  e.preventDefault();
  return false;
};


/**
 * if user hits enter or send button
 * */
export const hitEnter = (e) => {
  const keyCode = e.keyCode || e.which;

  const text = $(".usrInput")[0].innerText;
  if (keyCode === 13) {
    console.log(text, 'hitenter')
    if (text === "" || $.trim(text) === "") {
      e.preventDefault();
      return false;
    }
    // destroy the existing chart, if yu are not using charts, then comment the below lines
    $(".collapsible").remove();
    $(".dropDownMsg").remove();
    if (typeof chatChart !== "undefined") {
      chatChart.destroy();
    }

    $(".chart-container").remove();
    if (typeof modalChart !== "undefined") {
      modalChart.destroy();
    }

    $("#paginated_cards").remove();
    $(".suggestions").remove();
    $(".quickReplies").remove();
    $(".usrInput").blur();
    setUserResponse(text);
    send(text);
    console.log('need to make emplty inputbox');
    $(".usrInput")[0].innerText = ' '
    e.preventDefault();
    return false;
  }
  return true;
};


export const restartConversation = () => {

  $("#userInput").prop("disabled", true);
  console.log($("#userInput").prop, 'prop');
  // destroy the existing chart
  $(".collapsible").remove();

  if (typeof chatChart !== "undefined") {
    chatChart.destroy();
  }

  $(".chart-container").remove();
  if (typeof modalChart !== "undefined") {
    modalChart.destroy();
  }
  $(".chats").html("");
  $(".usrInput")[0].innerText;
  send("/restart");
}


/**
 * sends the user message to the rasa server,
 * @param {String} message user message
 */
export const send = (message) => {
  // const message = $(".userInput");
  console.log(message, "send message");
  const botURL = window.botURL;
  const sender_id = window.senderId;
  console.log(sender_id);

  $.ajax({
    url: botURL,
    type: "POST",
    crossDomain: true,
    headers: {
      "contentType": "application/json",
      "Accept-Control-Allow-Origin": '*'
    },
    data: JSON.stringify({ message, sender: sender_id }),
    success(botResponse, status) {
      console.log("Response from Rasa: ", botResponse, "\nStatus: ", status);

      // if user wants to restart the chat and clear the existing chat contents
      if (message.toLowerCase() === "/restart") {
        $("#userInput").prop("disabled", false);

        // if you want the bot to start the conversation after restart
        // customActionTrigger();
        return;
      }
      setBotResponse(botResponse);
    },
    error(xhr, textStatus) {
      if (message.toLowerCase() === "/restart") {
        $("#userInput").prop("disabled", false);
        // if you want the bot to start the conversation after the restart action.
        actionTrigger();
        // return;
      }

      // if there is no response from rasa server, set error bot response
      setBotResponse("");
      console.log("Error from bot end: ", textStatus);
    },
  });


  // $("#sendButton").on("click", (e) => {
  //   const text = $(".userInput");
  //   console.log(text, 'text from send button');
    // if (text === "" || $.trim(text) === "") {
    //   e.preventDefault();
    //   return false;
    // }
    // // destroy the existing chart
    // if (typeof chatChart !== "undefined") {
    //   chatChart.destroy();
    // }

    // $(".chart-container").remove();
    // if (typeof modalChart !== "undefined") {
    //   modalChart.destroy();
    // }

    // $(".suggestions").remove();
    // $("#paginated_cards").remove();
    // $(".quickReplies").remove();
    // // $(".usrInput").blur();
    // $(".dropDownMsg").remove();
    // setUserResponse(text);
    // send(text);
    // console.log('need to make empty inputbox by sendbuton');
    // $(".usrInput")[0].innerText = ' '
    // e.preventDefault();
    // return false;
  // });

}

export const sendMessageFromButton = (e) =>{
  const text = $(".usrInput")[0].outerText;
  console.log(text, "text");

  if (text != ' ') {
    console.log(text, 'hitenter')
    if (text === "" || $.trim(text) === "") {
      e.preventDefault();
      return false;
    }
    // destroy the existing chart, if yu are not using charts, then comment the below lines
    $(".collapsible").remove();
    $(".dropDownMsg").remove();
    if (typeof chatChart !== "undefined") {
      chatChart.destroy();
    }

    $(".chart-container").remove();
    if (typeof modalChart !== "undefined") {
      modalChart.destroy();
    }

    $("#paginated_cards").remove();
    $(".suggestions").remove();
    $(".quickReplies").remove();
    $(".usrInput").blur();
    setUserResponse(text);
    send(text);
    console.log('need to make emplty inputbox from send ');
    $(".usrInput")[0].innerText = ' '
    e.preventDefault();
    return false;
  }
  return true;
}


/**
 * renders bot response on to the chat screen
 * @param {Array} response json array containing different types of bot response
 *
 * for more info: `https://rasa.com/docs/rasa/connectors/your-own-website#request-and-response-format`
 */
function setBotResponse(response) {
  const botAvatar = window.botAvatar
  // renders bot response after 500 milliseconds
  setTimeout(() => {
    hideBotTyping();
    if (response.length < 1) {
      // if there is no response from Rasa, send  fallback message to the user
      const fallbackMsg = "I am facing some issues, please try again later!!!";

      const BotResponse = `<img class="botAvatar" src=${botAvatar}/><p class="botMsg">${fallbackMsg}</p><div class="clearfix"></div>`;

      $(BotResponse).appendTo(".chats").hide().fadeIn(1000);
      scrollToBottomOfResults();
    } else {
      // if we get response from Rasa
      for (let i = 0; i < response.length; i += 1) {
        // check if the response contains "text"
        if (Object.hasOwnProperty.call(response[i], "text")) {
          if (response[i].text != null) {
            // convert the text to mardown format using showdown.js(https://github.com/showdownjs/showdown);
            let botResponse;
            let html = converter.makeHtml(response[i].text);
            html = html.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<strong>", "<b>").replaceAll("</strong>", "</b>");
            html = html.replace(/(?:\r\n|\r|\n)/g, '<br>')
            console.log(html);
            // check for blockquotes
            if (html.includes("<blockquote>")) {
              html = html.replaceAll("<br>", "");
              botResponse = getBotResponse(html);
            }
            // check for image
            if (html.includes("<img")) {
              html = html.replaceAll("<img", '<img class="imgcard_mrkdwn" ');
              botResponse = getBotResponse(html);
            }
            // check for preformatted text
            if (html.includes("<pre") || html.includes("<code>")) {

              botResponse = getBotResponse(html);
            }
            // check for list text
            if (html.includes("<ul") || html.includes("<ol") || html.includes("<li") || html.includes('<h3')) {
              html = html.replaceAll("<br>", "");
              // botResponse = `<img class="botAvatar" src=${botAvatar}/><span class="botMsg">${html}</span><div class="clearfix"></div>`;
              botResponse = getBotResponse(html);
            }
            else {
              // if no markdown formatting found, render the text as it is.
              if (!botResponse) {
                const botAvatar = window.botAvatar
                botResponse = `<img class="botAvatar" src=${botAvatar}/><p class="botMsg">${response[i].text}</p><div class="clearfix"></div>`;
              }
            }
            // append the bot response on to the chat screen
            $(botResponse).appendTo(".chats").hide().fadeIn(1000);
          }
        }

        // check if the response contains "images"
        if (Object.hasOwnProperty.call(response[i], "image")) {
          if (response[i].image !== null) {
            const BotResponse = `<div class="singleCard"><img class="imgcard" src="${response[i].image}"></div><div class="clearfix">`;

            $(BotResponse).appendTo(".chats").hide().fadeIn(1000);
          }
        }

        // check if the response contains "buttons"
        if (Object.hasOwnProperty.call(response[i], "buttons")) {
          if (response[i].buttons.length > 0) {
            addSuggestion(response[i].buttons);
          }
        }

        // check if the response contains "attachment"
        if (Object.hasOwnProperty.call(response[i], "attachment")) {
          if (response[i].attachment != null) {
            if (response[i].attachment.type === "video") {
              // check if the attachment type is "video"
              const video_url = response[i].attachment.payload.src;

              const BotResponse = `<div class="video-container"> <iframe src="${video_url}" frameborder="0" allowfullscreen></iframe> </div>`;
              $(BotResponse).appendTo(".chats").hide().fadeIn(1000);
            }
          }
        }
        // check if the response contains "custom" message
        if (Object.hasOwnProperty.call(response[i], "custom")) {
          const { payload } = response[i].custom;
          if (payload === "quickReplies") {
            // check if the custom payload type is "quickReplies"
            const quickRepliesData = response[i].custom.data;
            showQuickReplies(quickRepliesData);
            return;
          }

          // check if the custom payload type is "pdf_attachment"
          if (payload === "pdf_attachment") {
            renderPdfAttachment(response[i]);
            return;
          }

          // check if the custom payload type is "dropDown"
          if (payload === "dropDown") {
            const dropDownData = response[i].custom.data;
            renderDropDwon(dropDownData);
            return;
          }

          // check if the custom payload type is "location"
          if (payload === "location") {
            $("#userInput").prop("disabled", true);
            getLocation();
            scrollToBottomOfResults();
            return;
          }

          // check if the custom payload type is "cardsCarousel"
          if (payload === "cardsCarousel") {
            const restaurantsData = response[i].custom.data;
            showCardsCarousel(restaurantsData);
            return;
          }

          // check if the custom payload type is "chart"
          if (payload === "chart") {
            /**
             * sample format of the charts data:
             *  var chartData =  { "title": "Leaves", "labels": ["Sick Leave", "Casual Leave", "Earned Leave", "Flexi Leave"], "backgroundColor": ["#36a2eb", "#ffcd56", "#ff6384", "#009688", "#c45850"], "chartsData": [5, 10, 22, 3], "chartType": "pie", "displayLegend": "true" }
             */

            const chartData = response[i].custom.data;
            const {
              title,
              labels,
              backgroundColor,
              chartsData,
              chartType,
              displayLegend,
            } = chartData;

            // pass the above variable to createChart function
            createChart(
              title,
              labels,
              backgroundColor,
              chartsData,
              chartType,
              displayLegend,
            );

            // on click of expand button, render the chart in the charts modal
            $(document).on("click", "#expand", () => {
              createChartinModal(
                title,
                labels,
                backgroundColor,
                chartsData,
                chartType,
                displayLegend,
              );
            });
            return;
          }

          // check of the custom payload type is "collapsible"
          if (payload === "collapsible") {
            const { data } = response[i].custom;
            // pass the data variable to createCollapsible function
            createCollapsible(data);
          }
        }
      }
      scrollToBottomOfResults();
    }
    $(".usrInput").focus();
  }, 5);

}


/**
 * sends an event to the bot,
 *  so that bot can start the conversation by greeting the user
 *
 * `Note: this method will only work in Rasa 1.x`
 */
// eslint-disable-next-line no-unused-vars
function actionTrigger() {

  const botURLwithSender = window.botURLwithSender
  // console.log(sender_id, portname_2, "bot");

  $.ajax({
    url: botURLwithSender,
    type: "POST",
    crossDomain: true,
    headers: {
      "contentType": "application/json",
      "Accept-Control-Allow-Origin": '*'
    },
    data: JSON.stringify({
      name: action_name,
      policy: "MappingPolicy",
      confidence: "0.98",
    }),
    success(botResponse, status) {
      console.log("Response from Rasa: ", botResponse, "\nStatus: ", status);

      if (Object.hasOwnProperty.call(botResponse, "messages")) {
        setBotResponse(botResponse.messages);
      }
      $("#userInput").prop("disabled", false);
    },
    error(xhr, textStatus) {
      // if there is no response from rasa server
      setBotResponse("");
      console.log("Error from bot end: ", textStatus);
      $("#userInput").prop("disabled", false);
    },
  });
}

/**
 * sends an event to the custom action server,
 *  so that bot can start the conversation by greeting the user
 *
 * Make sure you run action server using the command
 * `rasa run actions --cors "*"`
 *
 * `Note: this method will only work in Rasa 2.x`
 */
// eslint-disable-next-line no-unused-vars
function customActionTrigger() {

  const botServerURL = window.botServerURL

  $.ajax({
    url: botServerURL,
    type: "POST",
    crossDomain: true,
    headers: {
      "contentType": "application/json",
      "Accept-Control-Allow-Origin": '*'
    },
    data: JSON.stringify({
      next_action: action_name,
      tracker: {
        sender_id,
      },
    }),
    success(botResponse, status) {
      console.log("Response from Rasa: ", botResponse, "\nStatus: ", status);

      if (Object.hasOwnProperty.call(botResponse, "responses")) {
        setBotResponse(botResponse.responses);
      }
      $("#userInput").prop("disabled", false);
    },
    error(xhr, textStatus) {
      // if there is no response from rasa server
      setBotResponse("");
      console.log("Error from bot end: ", textStatus);
      $("#userInput").prop("disabled", false);
    },
  });
}

