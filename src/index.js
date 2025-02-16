import readline from "readline";
import pkg from "../../antithesis-sdk-typescript/dist/index.js";

console.log("SDK Import Debug:", pkg);

const { AssertRaw, GetRandom } = pkg; // Extract SDK functions

class Task {
    
    constructor(title, priority) {
        //date info
        this.today = new Date();
        this.nextThreeDays = new Date(this.today); // Create a copy of today
        this.nextThreeDays.setDate(this.today.getDate() + 3);
        this.title = title;
        this.priority = priority;
        this.completed = false;
        //date 3 days from now
        var year = this.nextThreeDays.toLocaleString("default", { year: "numeric" });
        var month = this.nextThreeDays.toLocaleString("default", { month: "2-digit" });
        var day = this.nextThreeDays.toLocaleString("default", { day: "2-digit" });
        var formattedDate = year + "/" + month + "/" + day;
        this.dueDate = formattedDate;
    }

    setDueDate() {
        rl.question("Please put in new date: \n", (date) => {
            this.dueDate = date;
            console.log(`Due date set to: ${this.dueDate}`);
            showMenu();
        });
    }

    

    markCompleted() {
        this.completed = true;
        console.log(`Task "${this.title}" marked as completed!`);
    }

    getDetails() {
        if (new Date(this.dueDate) < new Date()) {
            console.log(`Due date is past today's date`);
        }
        return `${this.completed ? "[✔]" : "[ ]"} ${this.title} (Priority: ${this.priority}) (Due: ${this.dueDate})`;
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let tasks = [];

// ✅ Handle user input
function handleUserInput(choice) {
    switch (choice.trim()) {
        case "1":
            rl.question("Enter task title: ", (title) => {
                const priority = GetRandom ? GetRandom(1, 5) : Math.floor(Math.random() * 5) + 1;
                tasks.push(new Task(title, priority));
                console.log(`Task added: "${title}" with priority ${priority}`);
                showMenu();
            });
            break;
        case "2":
            rl.question("Enter task index to mark as completed: ", (index) => {
                let taskIndex = parseInt(index);
                if (taskIndex >= 0 && taskIndex < tasks.length) {
                    tasks[taskIndex].markCompleted();
                } else {
                    console.log("Invalid task index!");
                }
                showMenu();
            });
            break;
        case "3":
            console.log("\nTask List:");
            tasks.forEach((task, i) => console.log(`${i}: ${task.getDetails()}`));
            showMenu();
            break;
        case "4":
            rl.question("Enter task index to delete: ", (index) => {
                let taskIndex = parseInt(index);
                if (taskIndex >= 0 && taskIndex < tasks.length) {
                    console.log(`Deleted task: "${tasks[taskIndex].title}"`);
                    tasks.splice(taskIndex, 1);
                } else {
                    console.log("Invalid task index!");
                }
                showMenu();
            });
            break;
        case "5":
            console.log("Exiting program. Thank you!");
            rl.close();
            break;
        default:
            console.log("Invalid choice! Please enter a valid option.");
            showMenu();
            break;
    }
}

// ✅ Display menu
function showMenu() {
    const priority = pkg.RandomChoice ? pkg.RandomChoice([1, 2, 3, 4, 5]) : Math.floor(Math.random() * 5) + 1;
console.log("Priority (RandomChoice):", priority);
    console.log(`\nTask Management System`);
    console.log("1. Add Task");
    console.log("2. Mark Task as Completed");
    console.log("3. List Tasks");
    console.log("4. Delete Task");
    console.log("5. Exit");

    // Use the correct assertion function
    const expectedTasks = tasks.length;
    const actualTasks = tasks.filter(t => !t.completed).length + tasks.filter(t => t.completed).length;

    if (AssertRaw) {
        AssertRaw(expectedTasks === actualTasks, "Task count should remain consistent");
    } else {
        console.warn("AssertRaw not found in SDK");
    }

    rl.question("Choose an option: ", handleUserInput);
}

showMenu(); // ✅ Start the program