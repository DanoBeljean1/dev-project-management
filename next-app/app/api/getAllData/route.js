import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();

    const database = client.db("sample_mflix");
    const collection = database.collection("comments");

    const allData = await collection.find({}).toArray();

    return NextResponse.json(allData, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
