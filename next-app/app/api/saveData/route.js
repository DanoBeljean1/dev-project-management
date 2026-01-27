import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";


export async function POST(request) {
    const data = await request.json()
    const client = new MongoClient(process.env.MONGODB_URI);

        try {
            await client.connect();

            // Choose a name for your database
            const database = client.db("sample_mflix");

            // Choose a name for your collection
            const collection = database.collection("projects");
            const name = `projects.${data.name}.lifepath`
            await collection.updateOne({user: "dano"}, {$set: {[name]: data.data}})
            return NextResponse.json({message: data.data}, {status: 200})
        } catch (error) {
            return NextResponse.json({message: "Error while updating"}, {status: 500})
        } finally {
            await client.close();
        }
}


