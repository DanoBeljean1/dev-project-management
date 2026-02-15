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
            const prjName = `projects.${data.name}`
            const rdName = `projects.${data.name}.roadmap`
            const cmName = `projects.${data.name}.comments`
            switch (data.action) {

                case "update":
                    
                    await collection.updateOne({user: "dano"}, {$set: {[name]: data.data}})
                    break;
                case "create":
                    await collection.updateOne({user: "dano"}, {$set: {[name]: data.data}})
                    break;
                case "addpath":
                    await collection.updateOne({user: "dano"}, {$set: {[name]: data.data}})
                    break;
                case "delete":
                    await collection.updateOne({user: "dano"}, {$unset: {[prjName]: data.data}})
                    break;
                case "roadmap":
                    await collection.updateOne({user: "dano"}, {$set: {[rdName]: data.data}})
                case "comment":
                    await collection.updateOne({user: "dano"}, {$set: {[cmName]: data.data}})
                default:
                    break;
            }
            
            return NextResponse.json({message: data.data}, {status: 200})
        } catch (error) {
            return NextResponse.json({message: "Error while updating"}, {status: 500})
        } finally {
            await client.close();
        }
}


