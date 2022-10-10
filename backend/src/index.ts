import DB from "./configs/db-connection";
import Server from "./server";

const port: string | number = process.env.PORT || 3001;

// Fire the server
Server.listen(port, () => {
    console.log('> Server is ready: http://localhost:' + port);
    DB.connect(); // Connect to database
});
