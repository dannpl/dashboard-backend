import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes';

const port = process.env.PORT || 3000;
const app = express();

mongoose.connect('mongodb+srv://dan:11223344@cluster0-qqmef.mongodb.net/usersgraph?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port);
