const express = require('express');
 
const cors = require('cors');
 
const app = express();
require('dotenv').config()
 
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri =`mongodb+srv://${process.env.user_db}:${process.env.user_pass}@cluster0.ejfmzqt.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const allDoctor = client.db('DoctorDb').collection('doctor')
    const allServices = client.db('DoctorDb').collection('services')


     app.get('/doctor', async(req,res)=>{
          const result = await allDoctor.find().toArray()
          res.send(result)
     })

     app.get('/details/:id', async(req,res)=>{
          const id = req.params.id;
          const filter = {_id : new ObjectId(id)}
          const result = await allDoctor.findOne(filter)
          res.send(result)
     })




     app.get('/services', async(req,res)=>{
          const result = await allServices.find().toArray()
          res.send(result)
     })







    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
//     await client.close();
  }
}
run().catch(console.dir);
















app.get('/', (req,res)=>{
     res.send("Doctor server is running 2023")
})
app.listen(port,()=>{
     console.log(`Doctor server port ${port}`);
})

// WFDosANCva50x0kB
// Doctor
