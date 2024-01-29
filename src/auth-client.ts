// feathersClient.ts
import { feathers } from "@feathersjs/feathers";
import rest from "@feathersjs/rest-client";
import auth from "@feathersjs/authentication-client";
import axios from "axios";

const PROTOCOL = import.meta.env.VITE_BACKEND_PROTOCOL;
const HOST = import.meta.env.VITE_BACKEND_HOST;
const PORT = import.meta.env.VITE_BACKEND_PORT;

const API_URL = `${PROTOCOL}://${HOST}:${PORT}`; // Replace with your server URL

// Configure an AJAX library (in this case Axios) with that client
const restClient = rest(API_URL);
export const authClient = feathers();
authClient.configure(restClient.axios(axios));
authClient.configure(
  auth({
    storageKey: "auth", // LocalStorage key for storing credentials
  })
);
