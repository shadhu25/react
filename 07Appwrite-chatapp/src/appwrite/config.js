import { Account, Client, Databases } from "appwrite";
import { endpoint, projectId } from "./env";

export const client = new Client();
client.setEndpoint(endpoint).setProject(projectId);
export const databases = new Databases(client);
export const account = new Account(client);
