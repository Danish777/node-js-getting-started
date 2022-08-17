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

app.post("/pusher/auth", (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const authReponse = pusher.authorizeChannel(socketId, channel);
    res.send(authReponse);
    //res.send(authResponse);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}!`));