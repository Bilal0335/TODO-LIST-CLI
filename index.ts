
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from 'chalk-animation';
const log = console.log;

let todos: string[] | number = [];
let condition = true;

while (condition) {
  let addTask = await inquirer.prompt([
    {
      name: "select",
      type: "list",
      message: "Select an operation ",
      choices: ["Add", "Update", "View", "Delete", "Exit"],
    },
  ]);
  // const ans = addTask.select;

  if (addTask.select === "Add") {
    let addTodo = await inquirer.prompt([
      {
        name: "todo",
        type: "input",
        message: "Add items in the lists ",
        validate: function (input) {
          if (input.trim() == "") {
            return "Please enter a non-empty items";
          }
          return true;
        },
      },
    ]);
    if (addTodo.todo.trim() !== "") {
      todos.push(addTodo.todo);
      todos.forEach((todo) => log(todo));
    }
  }

  if (addTask.select === "Update") {
    let updateTodo = await inquirer.prompt([
      {
        name: "todo",
        type: "list",
        message: "Update items in the lists ",
        choices: todos.map((items) => items),
      },
    ]);
    let addTodo = await inquirer.prompt([
      {
        name: "todo",
        type: "input",
        message: "Add items in the lists ",
      },
    ]);
    let newTodo: string[] = todos.filter((val) => val !== updateTodo.todo);
    todos = [...newTodo, addTodo.todo];
    todos.forEach((todo) => log(todo));
  }
  if (addTask.select === "View") {
    log("************ TODO LIST *************");
    todos.forEach((todo) => log(todo));
  }
  if (addTask.select === "Delete") {
    let deleteTodo = await inquirer.prompt([
      {
        name: "todo",
        type: "list",
        message: "select items to lists ",
        choices: todos.map((items) => items),
      },
    ]);
    let newTodo: string[] = todos.filter((val) => val !== deleteTodo.todo);
    todos = [...newTodo];
    todos.forEach((todo) => log(todo));
  }
  if (addTask.select === "Exit") {
    log("Exiting programm..");
    condition = false;
  }
}

export {};
