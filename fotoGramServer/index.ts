import Server from "./class/server";
import userRoute from "./routes/users";
import mongoose, { ConnectOptions } from "mongoose";
import bodyParser from "body-parser";

const serve = new Server();

//body parser
serve.app.use(bodyParser.urlencoded({extended:true}));
serve.app.use(bodyParser.json());

//routes of the aplication
serve.app.use('/user', userRoute);

//conect db
mongoose.connect('mongodb://localhost:27017/fotosgram',{
    useNewUrlParser:true,
  } as ConnectOptions,(err)=>{
      if(err){
        throw err;
      }
    console.log('DB IS ONLINE');
});

//express init
serve.start(()=>{
    try {
        console.log(`server running in the port ${serve.port}`);
    } catch (error) {
        console.log(error);
    }
});