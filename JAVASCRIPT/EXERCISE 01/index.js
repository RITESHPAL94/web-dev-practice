/* Create a faulty calculator using Javascript

This faulty calculator does following:
1.It takes two numbers as input from the user
2. It performs wrong operations as follows:

+ ---> -
* ---> +
- ---> /
/ ---> **

It performs wrong operation 10% of the times

*/

let num1 = Number(prompt("Enter your number:"));
let num2 = Number(prompt("Enter your number:"));
let op = prompt("+ , - , / , *");

let faulty = Math.random() < 0.1;

if (faulty) {

    // Wrong operation

    if (op == '+') {
        console.log(num1 - num2);
    }
    else if (op == '*') {
        console.log(num1 + num2);
    }
    else if (op == '-') {
        console.log(num1 / num2);
    }
    else if (op == '/') {
        console.log(num1 ** num2);
    }

}
else {

    // Correct operation

    if (op == '+') {
        console.log(num1 + num2);
    }
    else if (op == '-') {
        console.log(num1 - num2);
    }
    else if (op == '*') {
        console.log(num1 * num2);
    }
    else if (op == '/') {
        console.log(num1 / num2);
    }

}
