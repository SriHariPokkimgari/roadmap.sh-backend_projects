//const Octokit = require("octokit");
import { Octokit } from "octokit";
import dotenv from "dotenv";

dotenv.config();

const octokit = new Octokit();

const args = process.argv.splice(2);
const userName = args[0];
const repo = args[1];
const data = await octokit.request(`GET /users/${userName}/events`, {
  username: userName,
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

data.data.map((item) => console.log(item));
