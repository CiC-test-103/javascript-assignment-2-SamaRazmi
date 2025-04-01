// Define the BankAccount class to represent each bank account
class BankAccount {
  // Constructor initializes the owner, balance (default is 0), and transaction history
  constructor(owner, balance = 0) {
    this.owner = owner;
    this.balance = balance;
    this.transactionHistory = [];
  }

  // Deposit method to add money to the account
  deposit(amount) {
    if (amount <= 0) {
      console.log("Amount must be greater than zero.");
      return;
    }
    this.balance += amount; // Increase balance by the deposit amount
    this.transactionHistory.push(`Deposited: $${amount}`); // Add transaction to history
  }

  // Withdraw method to take money out of the account
  withdraw(amount) {
    if (amount > this.balance) {
      console.log("Insufficient balance.");
      return;
    }
    this.balance -= amount; // Decrease balance by the withdrawal amount
    this.transactionHistory.push(`Withdrew: $${amount}`); // Add transaction to history
  }

  // Transfer method to move money between accounts
  transfer(amount, recipientAccount) {
    if (amount <= 0) {
      console.log("Transfer amount must be greater than zero.");
      return;
    }
    if (amount > this.balance) {
      console.log("Insufficient balance for transfer.");
      return;
    }
    this.withdraw(amount); // Withdraw money from this account
    recipientAccount.deposit(amount); // Deposit money into the recipient account
    // Add the transfer transaction to both accounts' histories
    this.transactionHistory.push(
      `Transferred: $${amount} to ${recipientAccount.owner}`
    );
    recipientAccount.transactionHistory.push(
      `Received: $${amount} from ${this.owner}`
    );
  }

  // Method to check the account balance
  checkBalance() {
    console.log(`Balance for ${this.owner}: $${this.balance}`);
  }

  // Method to view the account's transaction history
  viewTransactionHistory() {
    console.log(`Transaction History for ${this.owner}:`);
    this.transactionHistory.forEach((transaction) => console.log(transaction));
  }
}

// Function to test the bank operations
function testBankOperations() {
  const account1 = new BankAccount("Alice", 1000); // Create account 1 with $1000 balance
  const account2 = new BankAccount("Bob", 500); // Create account 2 with $500 balance

  console.log("\n--- Initial Balances ---");
  account1.checkBalance(); // Display initial balance of account 1
  account2.checkBalance(); // Display initial balance of account 2

  console.log("\n--- Transactions ---");
  account1.deposit(200); // Alice deposits $200
  account1.withdraw(150); // Alice withdraws $150
  account1.transfer(300, account2); // Alice transfers $300 to Bob

  console.log("\n--- Final Balances ---");
  account1.checkBalance(); // Display final balance of account 1
  account2.checkBalance(); // Display final balance of account 2

  console.log("\n--- Transaction Histories ---");
  account1.viewTransactionHistory(); // Display transaction history of account 1
  account2.viewTransactionHistory(); // Display transaction history of account 2
}

// Call the test function to run the bank operations
testBankOperations();
