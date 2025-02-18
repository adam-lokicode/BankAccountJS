# Task Management System (JavaScript + Antithesis SDK)

## 📌 Overview

This is a simple **Task Management System** built in **JavaScript** that integrates the **Antithesis SDK** for structured logging, assertions, and debugging insights. The SDK helps track execution flow, validate assumptions, and log structured events instead of using `console.log()`.

## 🚀 Getting Started

### **1. Prerequisites**

Ensure you have:

- **Node.js** installed (`>= 16.x` recommended)
- **Antithesis SDK (TypeScript version)** installed

### **2. Installation**

```sh
# Clone the repo
git clone https://github.com/your-repo/task-manager
cd task-manager

# Install dependencies
npm install
```

### **3. Running the Program**

```sh
node task-manager.js
```

---

## 📂 Project Structure

```
/task-manager
├── antithesis-sdk-typescript/   # SDK dependency
├── task-manager.js              # Main application
└── README.md                    # Documentation
```

---

## 🔥 **JavaScript Concepts to Remember**

For the **Solutions Engineer Interview**, be comfortable with:

### **1. Callbacks vs. Promises vs. Async/Await**

- **Callbacks** (used in `readline.question()`) are **non-blocking** but can lead to callback hell.
- **Promises** improve readability, while **async/await** makes it even more structured.

Example:

```js
// Using Callbacks
rl.question("Enter task name: ", (input) => {
  console.log(input);
});

// Using Promises
const askQuestion = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

// Using Async/Await
async function getInput() {
  const taskName = await askQuestion("Enter task name: ");
  console.log(taskName);
}
```

### **2. Object-Oriented JavaScript**

- The `Task` class uses **constructor functions**, **methods**, and **properties**.

Example:

```js
class Task {
  constructor(title, priority) {
    this.title = title;
    this.priority = priority;
    this.completed = false;
  }

  markCompleted() {
    this.completed = true;
  }
}
```

### **3. Handling User Input (readline Module)**

- **Synchronous input blocking is not possible in Node.js**.
- Use `readline.createInterface()` for **asynchronous user input**.

### **4. Error Handling in JavaScript**

- Use **try-catch** blocks for async functions.

```js
try {
  JSON.parse("invalid JSON");
} catch (error) {
  console.error("Caught an error:", error.message);
}
```

---

## 🛠️ **Using Antithesis SDK in JavaScript**

### **1. Logging Structured Events (`LogEvent`)**

Use **structured logging** instead of `console.log()` to track events.

```js
pkg.LogEvent("Task added", { title: "New Task", priority: 3 });
```

### **2. Validating Conditions (`AssertRaw`, `Always`)**

Use assertions to validate expected behavior.

```js
pkg.Always("Ensure task is valid", task !== undefined, { title: task.title });
```

### **3. Handling Reachability (`Reachable`, `Unreachable`)**

Ensure execution paths are **always** or **never** hit.

```js
pkg.Reachable("User entered an invalid task index");
pkg.Unreachable("Unexpected code path reached");
```

### **4. Conditional Checks (`Sometimes`, `AlwaysOrUnreachable`)**

Ensure some logic is tested at least once.

```js
pkg.Sometimes("Check if tasks exist before deletion", tasks.length > 0);
```

---

## 🐞 Debugging Tips

1. **Use Antithesis structured logs instead of console.log()**.
2. **Validate assumptions** using `Always` and `AssertRaw`.
3. **Ensure execution flow is predictable** using `Reachable` and `Unreachable`.
4. **Check async functions** for potential race conditions.
5. **Be ready to debug undefined/null values** (common in JavaScript).

---

- **Expect to read, debug, and modify JavaScript code**.
- **Be prepared to integrate SDK functionality into real-world scenarios**.
- **Discuss JavaScript quirks like type coercion, closures, and async handling**.
- **Explain why structured logging (`LogEvent`) is better than `console.log()`**.
- **Think about handling edge cases** like unexpected user input.
