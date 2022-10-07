"use strict";

//Coding Challenge 1
const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3:C++"],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  //
  registerNewAnswer() {
    const ans = Number(
      prompt(
        `${this.question} \n ${this.options.join("\n")}\n(Input option number)`
      )
    );
    if (
      (ans < this.answers.length || ans > this.answers.length) &&
      typeof ans != "number"
    ) {
      alert("Please enter a valid number!");
    } else {
      this.answers[ans]++;
      // this.displayResults;
    }
    //  console.log(this.answers);
    this.displayResults("string", this.answers);
  },
  //
  displayResults(type, input) {
    if (type === "string") {
      console.log(...input);
    } else {
      console.log(input);
    }
  },
};
//poll.registerNewAnswer();

const pollClick = document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

const display = poll.displayResults.bind(poll, "string");

display([5, 2, 3]);
display([1, 5, 3, 9, 6, 1]);
