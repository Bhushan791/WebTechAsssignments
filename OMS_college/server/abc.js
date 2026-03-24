import { MongoClient } from "mongodb";

const uri = "mongodb+srv://bhushanoms:7jTAzqpwjO2Tqy2A@cluster0.ybgxqoo.mongodb.net/?appName=Cluster0";

async function checkConnection() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connection successful");
  } catch (error) {
    console.log("❌ Connection failed");
    console.error(error.message);
  } finally {
    await client.close();
  }
}

checkConnection();