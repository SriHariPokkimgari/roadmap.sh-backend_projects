const path = require("path");
const fs = require("fs");

const DataFilePath = path.join(__dirname, "data.json");

function readData() {
  const DataBuffer = fs.readFileSync(DataFilePath);
  const tasks = JSON.parse(DataBuffer);
  //console.log(tasks);
  return tasks;
}

function uniqueId(tasks) {
  const ids = tasks.map((task) => task.id);
  ids.sort((a, b) => a - b);
  let newId = 1;
  let i = 0;
  while (i < ids.length) {
    if (newId !== ids[i]) {
      return newId;
    }
    newId++;
    i++;
  }
  return newId;
}

function getTime() {
  const time = new Date();
  return `${time.getDay()}/${time.getMonth()}/${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
}

function writeFile(newTask) {
  fs.writeFileSync(DataFilePath, JSON.stringify(newTask, null, 2), "utf8");
}

function addTask(description) {
  if (!description || description === "") {
    console.log(`Missing the description or empty string can't accept`);
    return;
  }
  const tasks = readData();
  const newTask = {
    id: uniqueId(tasks),
    description: description,
    status: "todo", //Initially status todo
    createdAt: getTime(),
    updatedAt: null,
  };
  tasks.push(newTask);
  writeFile(tasks);
  console.log(`Task added successfully (ID: ${newTask.id})`);
}

function updateTask(id, newDescription) {
  const tasks = readData();
  if (!newDescription || newDescription === "") {
    console.log(`Missing the  description or empty string can't accept`);
    return;
  }
  const taskExist = tasks.find((task) => task.id === parseInt(id));
  if (!taskExist) {
    console.log(`Task not found with the id of ${id}`);
    return;
  }
  taskExist.description = newDescription;
  taskExist.updatedAt = getTime();
  writeFile(tasks);
  console.log(`Task updtaed successfully with id of ${id}`);
}

function deleteTask(id) {
  const tasks = readData();
  const taskExist = tasks.find((task) => task.id === parseInt(id));

  if (!taskExist) {
    console.log(`Task not found with the id of ${id}`);
    return;
  }
  const filteredTasks = tasks.filter((task) => task.id !== parseInt(id));
  writeFile(filteredTasks);
  console.log(`Task deleted successfully with the id of ${id}`);
}

function setStatus(status, id) {
  const tasks = readData();
  if (status !== "in-progress" && status !== "done") {
    console.log('Only accepts "in-progress" or "done"');
    return;
  }
  const taskExist = tasks.find((task) => task.id === parseInt(id));
  if (!taskExist) {
    console.log(`Task not found with the id of ${id}`);
    return;
  }
  taskExist.status = status;
  writeFile(tasks);
  console.log(`Status updated successfully with the id of ${id}`);
}

function getTask(status) {
  const tasks = readData();
  if (!status) {
    console.log(tasks);
    return;
  }
  const filteredTasks = tasks.filter((task) => task.status === status);
  console.log(filteredTasks);
}

const args = process.argv.slice(2);

switch (args[0]) {
  case "add":
    addTask(args[1]);
    break;
  case "update":
    updateTask(args[1], args[2]);
    break;
  case "delete":
    deleteTask(args[1]);
    break;
  case "mark":
    setStatus(args[1], args[2]);
    break;
  case "list":
    getTask(args[1]);
    break;
}
