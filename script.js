const transactionEl = document.querySelector(".transactions");
const numberIncomeEl = document.querySelector(".number--income");
const numberExpenseEl = document.querySelector(".number--expenses");
const balanceNumberEl = document.querySelector(".balance-number");
const formEl = document.querySelector(".form");
const inputDescriptionEl = document.querySelector(".input--description");
const inputAmountEl = document.querySelector(".input--amount");

const submitHandler = (event) => {
  event.preventDefault();

  const description = inputDescriptionEl.value;
  const amount = +inputAmountEl.value;

  const transactionItemEl = `
        <li class="transaction ${
          amount > 0 ? "transaction--income" : "transaction--expense"
        }">
            <span class="transaction__text">${description}</span>
            <span class="transaction__amount">${
              amount > 0 ? "+" : ""
            }${amount}</span>
            <button class="transaction__btn">x</button>
        </li>
    `;

  transactionEl.insertAdjacentHTML("beforeend", transactionItemEl);

  inputAmountEl.value = "";
  inputDescriptionEl.value = "";

  inputAmountEl.blur();
  inputDescriptionEl.blur();

  if (amount > 0) {
    const currentIncome = +numberIncomeEl.textContent;
    const updatedIncome = currentIncome + amount;
    numberIncomeEl.textContent = updatedIncome;
  } else {
    const currentExpense = +numberExpenseEl.textContent;
    const updatedIncome = currentExpense + amount * -1;
    numberExpenseEl.textContent = updatedIncome;
  }

  //update balance
  const income = +numberIncomeEl.textContent;
  const expenses = +numberExpenseEl.textContent;
  balanceNumberEl.textContent = income - expenses;

  if (+balanceNumberEl.textContent == 0) {
    balanceNumberEl.style.color = "black";
  }
  
  if (income - expenses < 0) {
    balanceNumberEl.style.color = "red";
  }

  if (+balanceNumberEl.textContent > 0) {
    balanceNumberEl.style.color = "green";
  }

  
};

formEl.addEventListener("submit", submitHandler);

const clickHandler = (event) => {
  // remove transaction list
  const clickedEl = event.target.parentNode;
  clickedEl.remove();

  //update the income and expenses
  const amountEl = clickedEl.querySelector(".transaction__amount");
  const amount = +amountEl.textContent;

  if (amount > 0) {
    const currentIncome = +numberIncomeEl.textContent;
    const updatedIncome = currentIncome - amount;
    numberIncomeEl.textContent = updatedIncome;
  } else {
    const currentExpense = +numberExpenseEl.textContent;
    const updatedIncome = currentExpense - amount * -1;
    numberExpenseEl.textContent = updatedIncome;
  }

  //update balance
  const income = +numberIncomeEl.textContent;
  const expenses = +numberExpenseEl.textContent;
  balanceNumberEl.textContent = income - expenses;

  if (+balanceNumberEl.textContent == 0) {
    balanceNumberEl.style.color = "black";
  }
  
  if (income - expenses < 0) {
    balanceNumberEl.style.color = "red";
  }

  if (+balanceNumberEl.textContent > 0) {
    balanceNumberEl.style.color = "green";
  }

  
};

transactionEl.addEventListener("click", clickHandler);
