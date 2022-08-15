// server.js

// First, run 'npm install pusher express cookie-parser'
// Then run this file with 'node server.js'
const express = require("express");
const cors = require("cors");
const Pusher = require("pusher");
app_id = "1461173"
key = "22df09a324a6a8bca7c7"
secret = "d93559a47cbae9167253"
cluster = "ap2"
const pusher = new Pusher({
    appId: app_id, // Replace with 'app_id' from dashboard
    key: key, // Replace with 'key' from dashboard
    secret: secret, // Replace with 'secret' from dashboard
    cluster: cluster, // Replace with 'cluster' from dashboard
    useTLS: true,
});
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post("/pusher/pusher-auth", (req, res) => {
    console.log('req', req);
    const socketId = req.body.socket_id;
    // const user={
    //     id:"12345"
    // }
    const channel = req.body.channel_name;
    const authReponse = pusher.authorizeChannel(socketId, channel);
    //const authReponse = pusher.authenticateUser(socketId, user);
    res.send(authReponse);
    //res.send(authResponse);
});
app.post("/send-location", (req, res) => {
    const data = req.body;
    pusher.trigger("share-location", "read-location", {
        value: data,
    });
    res.send({
        status:"done"
    });
    //res.send(authResponse);
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}!`));