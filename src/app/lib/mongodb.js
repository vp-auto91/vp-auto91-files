// src/app/lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = `mongodb+srv://${process.env.NEXT_MONGO_USER}:${process.env.NEXT_MONGO_PASS}@vba-laboiteautomatique.5j1p4.mongodb.net/?retryWrites=true&w=majority&appName=VBA-laboiteautomatique`;

let client;
let clientPromise;

if (!client) {
  client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 10000,
  });
  clientPromise = client.connect();
}

export default clientPromise;
