var wsID,
    wsConnected = false,
    players = {},
    connectionRetryTimeout = 1000;

function initWebSocket() {
    // For local testing, you can use a WebSocket server running on localhost
    var localWebSocketURL = "ws://localhost:8001";

    ws = new WebSocket(localWebSocketURL);
    console.log('Attempting connection ' + localWebSocketURL);

    ws.onopen = function (e) {
        console.log('Connected to ' + localWebSocketURL);
        wsConnected = true;
        // Assuming you still want to send the location data even without an external server
        sendLocation();
    };

    ws.onmessage = function (e) {
        // Handle incoming messages (if needed)
        var msg = JSON.parse(e.data);
        if (msg.type === 'connect') {
            wsID = msg.id;
        }
        // Handle other message types as needed
    };

    ws.onclose = function (e) {
        wsConnected = false;
        console.log("disconnected from " + localWebSocketURL);
        if (connectionRetryTimeout) {
            setTimeout(initWebSocket, connectionRetryTimeout);
        }
    };
}

function sendObject(obj) {
    // You can handle the object locally without sending it to a server
    console.log("Local handling of object:", obj);
}

function sendLocation() {
    // You can handle the location data locally without sending it to a server
    var update = { id: wsID, type: 'location' };

    if (typeof IP_ADDRESS !== 'undefined') {
        update.ip = IP_ADDRESS;
    }
    if (typeof loc !== 'undefined') {
        update.lat = loc.lat;
        update.lon = loc.long;
        update.city = loc.city;
        update.country = loc.country;
    }

    sendObject(update);
}

// Call the WebSocket initialization function
initWebSocket();
