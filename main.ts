#! /usr/bin/env node
// Object Oriented Programming - mybank project
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.yellow.bold("-".repeat(62)));
console.log(chalk.bgMagenta("Welcome to Code With Sakeena - Object Oriented Programming MyBank"));
console.log(chalk.yellow.bold("-".repeat(62)));

// Bank Account interface
interface BankAccount {
    accountNumber: number;
    balance: number;
    withdraw(amount:number):void
    deposit(amount:number):void
    checkBalance():void
}

// Bank Account Class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number){
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

// Debit money
withdraw(amount: number):void{
    if(this.balance >= amount){
        this.balance -= amount;
        console.log(chalk.green.bold(`Withdrawl $${amount} successfully.`));
        console.log(chalk.magenta(`Remaining Balance: $${this.balance}`));
    } else {
        console.log(chalk.red.bold("Insufficient Balance"));
    }
}
// Credit money
deposit(amount: number): void {
    if(amount > 100){
        amount -= 1;  // $1 is charged if user withdraw more than $100
    } 
    this.balance += amount;
    console.log(chalk.green.bold(`Deposit $${amount} successfully.`));
    console.log(chalk.magenta(`Remaining Balance: $${this.balance}`));
}
// Check balance
checkBalance(): void {
    console.log(chalk.black.bold(`Current Balance: $${this.balance}`));
}
}

// Customer Class
class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string, lastName:string, gender: string, age: number, mobileNumber: number, account: BankAccount)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
} 

// Create Bank Accounts
const userAccounts: BankAccount[] = [
    new BankAccount(1234, 1000),
    new BankAccount(1345, 2000),
    new BankAccount(1446, 2500),
]

// Create CustomerS
const Customers: Customer[] = [
    new Customer ("Hamzah","Syed","Male", 30 , 3332457330, userAccounts[0]),
    new Customer ("sakeena","fatima","Female", 25 , 3102457350, userAccounts[1]),
    new Customer ("qirat","manahil","Female", 32 , 3312458130, userAccounts[2]),
]

// Function to interact with bank account
async function service(){
    do{
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: chalk.yellow("Enter Your Account Number:")
        })

        const customer = Customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(chalk.bgCyan(`Welcome, ${customer.firstName} ${customer.lastName}!`));
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: chalk.yellow("Select an option:"),
                choices: ["Deposit","Withdraw","Check Balance","Exit"]
            }]);

            switch (ans.select){ 
                case "Deposit" :
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.yellow("Enter the amount to deposit:")
                    })
                    customer.account.deposit(depositAmount.amount);
                    break;
                    case "Withdraw" :
                        const withdrawAmount = await inquirer.prompt({
                            name: "amount",
                            type: "number",
                            message: chalk.yellow("Enter the amount to withdraw:")
                        })
                        customer.account.withdraw(withdrawAmount.amount);
                        break;   
                    case "Check Balance" :
                        customer.account.checkBalance();
                        break;
                    case "Exit" :
                        console.log(chalk.blue("Exiting bank program..."));
                        console.log(chalk.cyan("Thankyou for using our bank services!"));
                        return;
            }
        }else {
            console.log(chalk.red("Invalid Account Number. Please Try Again"));
        }
    } while(true)
}

service();