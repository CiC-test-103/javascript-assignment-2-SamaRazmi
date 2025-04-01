const readline = require("readline");

// Create an interface to read input from the user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Define the BankAccount class to represent a bank account
class BankAccount {
  constructor(owner, balance = 0) {
    this.owner = owner; // The owner of the account
    this.balance = balance; // The initial balance, defaulting to 0
    this.transactionHistory = []; // Array to keep track of transactions
  }

  // Deposit money into the account
  deposit(amount) {
    if (amount <= 0) {
      console.log("Amount must be greater than zero.");
      return;
    }
    this.balance += amount; // Add the deposit amount to the balance
    this.transactionHistory.push(`Deposited: $${amount}`); // Log the deposit transaction
    console.log(`Deposited: $${amount}`);
  }

  // Withdraw money from the account
  withdraw(amount) {
    if (amount <= 0) {
      console.log("Amount must be greater than zero.");
      return;
    }
    if (amount > this.balance) {
      console.log("Insufficient balance.");
      return;
    }
    this.balance -= amount; // Subtract the withdrawal amount from the balance
    this.transactionHistory.push(`Withdrew: $${amount}`); // Log the withdrawal transaction
    console.log(`Withdrew: $${amount}`);
  }

  // Transfer money from this account to another account
  transfer(amount, recipientAccount) {
    if (amount <= 0) {
      console.log("Amount must be greater than zero.");
      return;
    }
    if (amount > this.balance) {
      console.log("Insufficient balance for transfer.");
      return;
    }
    this.withdraw(amount); // Withdraw the amount from this account
    recipientAccount.deposit(amount); // Deposit the amount into the recipient's account
    // Log the transfer transaction in both accounts' histories
    this.transactionHistory.push(
      `Transferred: $${amount} to ${recipientAccount.owner}`
    );
    recipientAccount.transactionHistory.push(
      `Received: $${amount} from ${this.owner}`
    );
    console.log(`Transferred: $${amount} to ${recipientAccount.owner}`);
  }

  // Check the current balance of the account
  checkBalance() {
    console.log(`Balance for ${this.owner}: $${this.balance}`);
  }

  // View the transaction history of the account
  viewTransactionHistory() {
    console.log(`Transaction History for ${this.owner}:`);
    this.transactionHistory.forEach((transaction) => console.log(transaction));
  }
}

// Create two accounts for testing purposes
const account1 = new BankAccount("Alice", 1000); // Alice's account with $1000 balance
const account2 = new BankAccount("Bob", 500); // Bob's account with $500 balance

// Function to handle user input and perform operations based on the user's choice
function handleUserInput() {
  rl.question(
    "What would you like to do? (deposit, withdraw, transfer, check balance, view history, quit): ",
    function (action) {
      if (action === "deposit") {
        rl.question("Enter amount to deposit: $", function (amount) {
          account1.deposit(parseFloat(amount)); // Deposit to Alice's account
          handleUserInput(); // Prompt for next action
        });
      } else if (action === "withdraw") {
        rl.question("Enter amount to withdraw: $", function (amount) {
          account1.withdraw(parseFloat(amount)); // Withdraw from Alice's account
          handleUserInput(); // Prompt for next action
        });
      } else if (action === "transfer") {
        rl.question("Enter amount to transfer: $", function (amount) {
          account1.transfer(parseFloat(amount), account2); // Transfer from Alice to Bob
          handleUserInput(); // Prompt for next action
        });
      } else if (action === "check balance") {
        account1.checkBalance(); // Display balance of Alice's account
        handleUserInput(); // Prompt for next action
      } else if (action === "view history") {
        account1.viewTransactionHistory(); // View transaction history of Alice's account
        handleUserInput(); // Prompt for next action
      } else if (action === "quit") {
        console.log("Goodbye!"); // Exit message
        rl.close(); // Close the interface
      } else {
        console.log("Invalid action. Please try again.");
        handleUserInput(); // Prompt again for valid action
      }
    }
  );
}

// Start receiving user input and interacting with the bank system
handleUserInput();
