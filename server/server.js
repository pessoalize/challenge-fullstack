const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

let corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// teste inicial
app.get("/", (req, res) => {
  res.json({message: "testando aplicação"});
});

const db = require("./models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conectado ao banco!");
    // initial();
  })
  .catch(err => {
    console.log("Error ao conectar ao banco!", err);
    process.exit();
  });

require("./routes/produtoRoute")(app);
require('./routes/authRoute')(app);
require('./routes/userRoute')(app);

const PORT = process.env.PORT || 8080;
let server = app.listen(PORT, () => {
  console.log(`Servidor execuntando na porta ${PORT}.`);
})

const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:8081",
    methods: ["GET", "POST"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
    credentials: true
  }
});

let interval;


io.on("connection", (socket) => {
  console.log("Novo client conectado");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 5000);
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  socket.emit("FromAPI", response);
};