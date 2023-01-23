import mongoose, {mongo} from "mongoose";

const connectDB = (url) => {
  mongoose.set('strictQuery', true);
  const user = encodeURIComponent(process.env.MONGODB_USER);
  const password = encodeURIComponent(process.env.MONGODB_PASSWORD);

  mongoose.connect(url.replace("<user>", user).replace("<password>", password))
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err));
}

export default connectDB;
