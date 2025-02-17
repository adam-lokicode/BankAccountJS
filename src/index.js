import readline from "readline";
import pkg, { LogEvent } from "../../antithesis-sdk-typescript/dist/index.js";
import { log } from "console";

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
        logsuccesss = false;
        pkg.Always("Checking if task exists", this != undefined, {title: this.title});
        pkg.LogEvent('Task completed:', {title: this.title});
        console.log(`Task "${this.title}" marked as completed!`);
        logsuccesss = true;
        pkg.Always("Logging success", logsuccesss, {title: this.title});
        
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
    //Don't really understand the differences 
    //of Reachable vs Assert, seems to be more for the
    //UI, This test property will be viewable in the "Antithesis SDK: Reachablity assertions" 
    // group of the triage report.
    //----------------
    //Use Reachable() only for paths that should 
    //always be hit in normal execution
    pkg.Reachable("Reachable code");
    switch (choice.trim()) {
        case "1":
            rl.question("Enter task title: ", (title) => {
                const priority = pkg.RandomChoice ? pkg.RandomChoice([1, 2, 3, 4, 5]) : Math.floor(Math.random() * 5) + 1;
                tasks.push(new Task(title, priority));
                console.log(`Task added: "${title}" with priority ${priority}`);
                pkg.LogEvent('Tasks added:', {title: title, priority: priority});
                showMenu();
            });
            break;
        case "2":
            rl.question("Enter task index to mark as completed: ", (index) => {
                let taskIndex = parseInt(index);
                if (taskIndex >= 0 && taskIndex < tasks.length) {
                    tasks[taskIndex].markCompleted();
                } else {
                    pkg.Reachable("User entered an invalid task index");
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
            //AlwaysOrUnreachable should be used when execution 
            // should always reach a certain point,
            // or else the program is broken.
            pkg.AlwaysOrUnreachable("Program is reachable");
            console.log("Exiting program. Thank you!");
            rl.close();
            break;
        default:
            // Place Unreachable() in truly unexpected execution paths
            pkg.Unreachable("Unreachable code");
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
    //Assert that condition is true at least one time that this 
    // function was called. 
    // The test property spawned by Sometimes will be 
    // marked as failing if this function is never called, 
    // or if condition is false every time that it is called.
    rl.question("Choose an option: ", handleUserInput);
}

showMenu(); // ✅ Start the program