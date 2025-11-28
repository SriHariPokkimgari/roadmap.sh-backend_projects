const path = require("path");

async function userDetails(userName) {
  try {
    if (!userName && userName === "") {
      console.log("Credenties was missing!");
      return;
    }
    const res = await fetch(`https://github.com/users/${userName}/events`);
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

const args = process.argv.splice(2);

userDetails(args[0]);
