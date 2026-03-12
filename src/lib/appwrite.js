import { Client, Databases } from "appwrite";

const client = new Client();

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

if (!endpoint || !projectId) {
  throw new Error("Appwrite environment variables are not set");
}

client.setEndpoint(endpoint).setProject(projectId);