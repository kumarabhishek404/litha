/**
 * scroll to the bottom of the chats after new message has been added to chat
 */
 function scrollToBottomOfResults() {
    const terminalResultsDiv = document.getElementById("chats");
    terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
  }


/**
 * Set user response on the chat screen
 * @param {String} message user message
 */
const setUserResponse = (message) => {

    const userAvatar = window.userAvatar
    console.log(userAvatar, "User img");
    const user_response = `<img class="userAvatar" src=${userAvatar}><p class="userMsg">${message} </p><div class="clearfix"></div>`;
    $(user_response).appendTo(".chats").show("slow");
  
    $(".usrInput")[0].innerText;
    scrollToBottomOfResults();
    showBotTyping();
    // $(".suggestions").remove();
  }
  

/**
 *  adds vertically stacked buttons as a bot response
 * @param {Array} suggestions buttons json array
 */
function addSuggestion(suggestions) {
    setTimeout(() => {
        const suggLength = suggestions.length;
        $(
            ' <div class="singleCard"> <div class="suggestions"><div class="menu"></div></div></diV>',
        )
            .appendTo(".chats")
            .hide()
            .fadeIn(1000);
        // Loop through suggestions
        for (let i = 0; i < suggLength; i += 1) {
            $(
                `<div class="menuChips" data-payload='${suggestions[i].payload}'>${suggestions[i].title}</div>`,
            ).appendTo(".menu");
        }
        scrollToBottomOfResults();
    }, 1000);
}


// on click of suggestion's button, get the title value and send it to rasa
$(document).on("click", ".menu .menuChips", function () {
    const text = this.innerText;
    const payload = this.getAttribute("data-payload");
    console.log("payload: ", this.getAttribute("data-payload"));
    setUserResponse(text);
    send(payload);

    // delete the suggestions once user click on it.
    $(".suggestions").remove();
});

// export {addSuggestion};