// const Demo = require('../../components/Demo/demo')

console.log('Connected');


sessionStorage.setItem("chat_session", "");
!(function () {
    let e = document.createElement("script"),
        t = document.head || document.getElementsByTagName("head")[0];
    (e.src =
        "https://cdn.jsdelivr.net/npm/rasa-webchat@1.0.0/lib/index.js"),
        (e.async = !0),
        (e.onload = () => {
            window.WebChat.default(
                {   
                    tracker: {name: 'hey'},
                    title: "Abhishek's Bot",
                    subtitle: "Litha chating place",
                    customData: {hello: "hello"},
                    socketUrl: "https://rasa-bot-cors.litha.org.uk",
                    params: { storage: "session" },
                    profileAvatar: "https://imgur.com/dmCuP31.png",
                    showMessageDate: true,
                    showFullScreenButton: true,
                    displayUnreadCount: true,
                    // customComponent={() => (<div>Hello</div>)}
                    // add other props here
                },
                null
            );
        }),
        t.insertBefore(e, t.firstChild);
})();
