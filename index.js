import * as dotenv from 'dotenv'
dotenv.config()
import express  from "express";
import { connection } from "./database/connection.js";
import userRoutes from "./src/modules/user/user.routes.js";
import messageRoutes from './src/modules/message/message.routes.js';
import { appError } from './src/utils/appError.js';
import { globalError } from './src/utils/globalErrorHandle.js';
import multer from 'multer';

const app = express()
const port = 3000
app.use(express.json())




connection()
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/message",messageRoutes)

function fileFilter (req, file, cb) {

    if (file.mimetype.startsWith('image')) {
    cb(null, true)
        
    } else {
    cb(new appError("image only",401), false)
        
    }

  }
const storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename:  (req, file, cb) => {
    
    cb(null,Date.now() + '-'+ file.originalname )
  }
})

const upload = multer({ storage ,fileFilter})
   

app.post("/photes",upload.single("img"),(req,res)=>{
    res.json({message:"success"})
})



app.use("*",(req,res,next)=>{
    next(new appError(`invalid URL ${req.originalUrl}` , 404))
})

app.use(globalError)


















app.listen(port , ()=>console.log(`app listening on port ${port}!`))
