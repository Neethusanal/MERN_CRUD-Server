const express= require('express')
const router = express.Router();
const mongoose=require('mongoose')
const cors=require('cors')
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const userRoutes = require('./Routes/userRoute');

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("DB connection successful");
  }).catch(err => {
    console.log(err.message);
  });

app.use(express.json());
app.use(cors({
  origin: [process.env.BASE_URL],
  method: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true,
}));
app.use('/', userRoutes);
app.listen(4000, () => {
    console.log("Server/Backend started on port 4000");
  });
 