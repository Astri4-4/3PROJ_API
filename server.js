import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import chalk from "chalk";
import {Server} from "socket.io";


import UsersRoutes from "./app/routes/users.routes.js";
import PrivateMessageRoutes from "./app/routes/private_message.routes.js";
import FileRoutes from './app/routes/files.routes.js';
import WorkspaceRoutes from "./app/routes/workspaces.routes.js";

import Socket from "./app/sockets/socket.controller.js";
import { swaggerUi, specs } from "./swagger.js";
import YAML from "yamljs"

console.clear();

dotenv.config();

const app = express();
const swaggerDoc = YAML.load('./swagger.yaml')
app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use("/users", UsersRoutes);
// PRIVATE MESSAGES
app.use("/private", PrivateMessageRoutes);
// ATTACHMENT / PROFILE PICTURE
app.use("/public", FileRoutes);

app.use("/workspace", WorkspaceRoutes);

// WEBSOCKET
const io = new Server({
    cors: {
        origin: "*"
    }
})

const socket_port = process.env.SOCKET_PORT;

io.on("connection", (socket) => {
    console.log("CONNECTED");

    const socketHandler = new Socket(io, socket);

})

io.listen(socket_port, () => {
    console.log(chalk.green("Socket's listening on " + socket_port))
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(chalk.green("Server's listening on " + port))
})
