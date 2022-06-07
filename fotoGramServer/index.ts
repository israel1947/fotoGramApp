import Server from "./class/server";
import userRoute from "./routes/users";

const serve = new Server();

//routes of the aplication
serve.app.use('/user', userRoute)

//express init
serve.start(()=>{
    try {
        console.log(`server running in the port ${serve.port}`);
    } catch (error) {
        console.log(error);
    }
});