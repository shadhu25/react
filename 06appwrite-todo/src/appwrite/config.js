import { Client, Databases } from "appwrite";
import { projectId } from "./env";

export const client = new Client();
client.setProject(projectId);

export const databases = new Databases(client);
