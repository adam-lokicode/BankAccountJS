class BankAccount {
    constructor(owner, initialBalance) {
        this.owner = owner;
        this.balance = initialBalance;
    }

    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposited $${amount} successfully!`);
        } else {
            console.log("Invalid deposit amount!");
        }
    }

    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrawn $${amount} successfully!`);
        } else {
            console.log("Invalid or insufficient funds!");
        }
    }

    checkBalance() {
        console.log(`Account Owner: ${this.owner}`);
        console.log(`Current Balance: $${this.balance}`);
    }
}

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let accounts = [];

function showMenu() {
    console.log(`\nBank Account Management System`);
    console.log("1. Create Account");
    console.log("2. Deposit Money");
    console.log("3. Withdraw Money");
    console.log("4. Check Balance");
    console.log("5. Exit");
    rl.question("Choose an option: ", handleUserInput);
}

function handleUserInput(choice) {
    switch (choice.trim()) {
        case "1":
            rl.question("Enter owner name: ", (name) => {
                rl.question("Enter initial deposit amount: ", (initialDeposit) => {
                    accounts.push(new BankAccount(name, parseFloat(initialDeposit)));
                    console.log("Account created successfully!");
                    showMenu();
                });
            });
            break;
        case "2":
            rl.question("Enter account index (0-based): ", (index) => {
                rl.question("Enter deposit amount: ", (amount) => {
                    let accIndex = parseInt(index);
                    if (accIndex >= 0 && accIndex < accounts.length) {
                        accounts[accIndex].deposit(parseFloat(amount));
                    } else {
                        console.log("Invalid account index!");
                    }
                    showMenu();
                });
            });
            break;
        case "3":
            rl.question("Enter account index (0-based): ", (index) => {
                rl.question("Enter withdrawal amount: ", (amount) => {
                    let accIndex = parseInt(index);
                    if (accIndex >= 0 && accIndex < accounts.length) {
                        accounts[accIndex].withdraw(parseFloat(amount));
                    } else {
                        console.log("Invalid account index!");
                    }
                    showMenu();
                });
            });
            break;
        case "4":
            rl.question("Enter account index (0-based): ", (index) => {
                let accIndex = parseInt(index);
                if (accIndex >= 0 && accIndex < accounts.length) {
                    accounts[accIndex].checkBalance();
                } else {
                    console.log("Invalid account index!");
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

showMenu();
