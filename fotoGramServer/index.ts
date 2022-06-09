import Server from "./class/server";
import userRoute from "./routes/users";
import mongoose, { ConnectOptions } from "mongoose";
import bodyParser from "body-parser";
import fileUplad from "express-fileupload";
import postRouter from './routes/post';

const serve = new Server();

//body parser
serve.app.use(bodyParser.urlencoded({extended:true}));
serve.app.use(bodyParser.json());

//File Upload
serve.app.use(fileUplad());

serve.app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//routes of the aplication
serve.app.use('/user', userRoute);
serve.app.use('/post', postRouter);

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