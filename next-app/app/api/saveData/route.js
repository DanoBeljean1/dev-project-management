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
            const createRdmap = [{
          "parent": "Informations principales",
          "child": [
            {
              "name": "Description",
              "value": ""
            },
            {
              "name": "Objectif principal",
              "value": ""
            },
            {
              "name": "Publique cible",
              "value": ""
            },
            {
              "name": "Niveau de difficulté",
              "value": ""
            }
          ]
        },
        {
          "parent": "Problématique et idées",
          "child": [
            {
              "name": "Valeur ajoutée du projet",
              "value": ""
            },
            {
              "name": "Technologies apprises durant le projet",
              "value": ""
            },
            {
              "name": "Fonctionnalitées clés",
              "value": ""
            },
            {
              "name": "Fonctionnalitées secondaires",
              "value": ""
            }
          ]
        },
        {
          "parent": "Technologies",
          "child": [
            {
              "name": "Frontend",
              "value": ""
            },
            {
              "name": "Backend",
              "value": ""
            },
            {
              "name": "Base de données",
              "value": ""
            }
          ]
        },
        {
          "parent": "Déploiement et évolutions futures",
          "child": [
            {
              "name": "Hébergement",
              "value": ""
            },
            {
              "name": "Nom de domaine",
              "value": ""
            },
            {
              "name": "Évolutions futures",
              "value": ""
            }
                                    ]}]

            switch (data.action) {

                case "update":
                    
                    await collection.updateOne({user: "dano"}, {$set: {[name]: data.data}})
                    break;
                case "create":
                    await collection.updateOne({user: "dano"}, {$set: {[name]: data.data}})
                    await collection.updateOne({user: "dano"}, {$set: {[rdName]: createRdmap}})
                    break;
                case "addpath":
                    await collection.updateOne({user: "dano"}, {$set: {[name]: data.data}})
                    break;
                case "delete":
                    await collection.updateOne({user: "dano"}, {$unset: {[prjName]: data.data}})
                    break;
                case "roadmap":
                    await collection.updateOne({user: "dano"}, {$set: {[rdName]: data.data}})
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