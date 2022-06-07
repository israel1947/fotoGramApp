import Server from "./class/server";

const serve = new Server();


//express init
serve.start(()=>{
    try {
        console.log(`server running in the port ${serve.port}`);
    } catch (error) {
        console.log(error);
    }
});