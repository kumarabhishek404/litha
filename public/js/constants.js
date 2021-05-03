const action_name = "action_hello_world";
const rasa_server_url = window.botURL;
const sender_id = window.senderId;
// console.log(sender_id)

// const sender_id = bunty_senderId_sessionId;
// const sender_id = PHQ9_senderId_sessionId;
// const sender_id = PHQ2_senderId_sessionId;

//Server url 
// const bunty_server_url = 'http://82.44.252.82:5020/webhooks/rest/webhook'
// const dreamExpert_server_url = 'http://82.44.252.82:5020/webhooks/rest/webhook'


// server url with sender_id
const conversation_url = `http://82.44.252.82:5020/conversations/${sender_id}/execute`; 