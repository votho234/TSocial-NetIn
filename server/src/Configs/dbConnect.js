import mongoose from 'mongoose';

async function dbConnect() {
   try {
      await mongoose.connect('mongodb://localhost:27017/AppMedia', {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
      console.log('==> Database connection successfuly');
   } catch (error) {
      console.log('==> Database connection failed: ' + error);
   }
}

export default dbConnect;
