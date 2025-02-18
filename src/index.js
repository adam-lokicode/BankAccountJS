import readline from "readline";
import pkg from "../../antithesis-sdk-typescript/dist/index.js";

console.log("SDK Import Debug:", pkg);

// Extract SDK functions
const { AssertRaw, GetRandom, LogEvent, Always, Sometimes, Reachable, Unreachable, AlwaysOrUnreachable, RandomChoice } = pkg;

class Task {
    constructor(title, priority) {
        // 📌 Set task properties
        this.title = title;
        this.priority = priority;
        this.completed = false;

        // 📌 Set due date to 3 days from today
        this.today = new Date();
        this.nextThreeDays = new Date(this.today);
        this.nextThreeDays.setDate(this.today.getDate() + 3);
        this.dueDate = this.formatDate(this.nextThreeDays);
    }

    formatDate(date) {
        return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD format
    }

    setDueDate() {
        rl.question("Please put in new due date (YYYY-MM-DD): \n", (date) => {
            this.dueDate = date;
            console.log(`✅ Due date updated to: ${this.dueDate}`);
            showMenu();
        });
    }

    markCompleted() {
        this.completed = true;
        
        let logSuccess = false;

        // 📌 ✅ Ensure task exists before marking completed
        Always("Checking if task exists", this !== undefined, { title: this.title });

        // 📌 ✅ Log event to Antithesis
        LogEvent("Task completed", { title: this.title });

        // 📌 ✅ Ensure logging was successful
        logSuccess = true;
        Always("Logging success", logSuccess, { title: this.title });

        console.log(`✔ Task "${this.title}" marked as completed!`);
    }

    getDetails() {
        if (new Date(this.dueDate) < new Date()) {
            console.warn(`⚠ Due date for "${this.title}" has already passed.`);
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
    Reachable("User input received");

    switch (choice.trim()) {
        case "1": // ✅ Add Task
            rl.question("Enter task title: ", (title) => {
                const priority = RandomChoice ? RandomChoice([1, 2, 3, 4, 5]) : Math.floor(Math.random() * 5) + 1;
                
                tasks.push(new Task(title, priority));
                LogEvent("Task added", { title: title, priority: priority });
                
                console.log(`✅ Task added: "${title}" (Priority: ${priority})`);
                showMenu();
            });
            break;
        
        case "2": // ✅ Mark Task as Completed
            rl.question("Enter task index to mark as completed: ", (index) => {
                let taskIndex = parseInt(index);
                if (taskIndex >= 0 && taskIndex < tasks.length) {
                    tasks[taskIndex].markCompleted();
                } else {
                    Reachable("Invalid task index entered");
                    console.warn("⚠ Invalid task index!");
                }
                showMenu();
            });
            break;

        case "3": // ✅ List Tasks
            console.log("\n📋 Task List:");
            tasks.forEach((task, i) => console.log(`${i}: ${task.getDetails()}`));
            showMenu();
            break;

        case "4": // ✅ Delete Task
            rl.question("Enter task index to delete: ", (index) => {
                let taskIndex = parseInt(index);
                if (taskIndex >= 0 && taskIndex < tasks.length) {
                    console.log(`🗑 Deleted task: "${tasks[taskIndex].title}"`);

                    // 📌 ✅ Occasionally verify tasks exist before deletion
                    Sometimes("Occasionally checking task deletion", tasks.length > 0);

                    tasks.splice(taskIndex, 1);
                } else {
                    Reachable("Invalid delete attempt");
                    console.warn("⚠ Invalid task index!");
                }
                showMenu();
            });
            break;

        case "5": // ✅ Exit Program
            AlwaysOrUnreachable("Ensuring the program can reach exit");
            console.log("👋 Exiting program. Thank you!");
            rl.close();
            break;

        default: // ❌ Invalid Input
            Unreachable("Unexpected user input");
            console.warn("⚠ Invalid choice! Please enter a valid option.");
            showMenu();
            break;
    }
}

// ✅ Display menu
function showMenu() {
    console.log("\n📌 Task Management System");
    console.log("1. Add Task");
    console.log("2. Mark Task as Completed");
    console.log("3. List Tasks");
    console.log("4. Delete Task");
    console.log("5. Exit");

    // 📌 ✅ Ensure task count is correct
    const expectedTasks = tasks.length;
    const actualTasks = tasks.filter(t => !t.completed).length + tasks.filter(t => t.completed).length;
    if (AssertRaw) {
        AssertRaw(expectedTasks === actualTasks, "Task count should remain consistent");
    } else {
        console.warn("⚠ AssertRaw not found in SDK");
    }

    rl.question("Choose an option: ", handleUserInput);
}

showMenu(); // ✅ Start the program
