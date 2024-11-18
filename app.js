// Get references to elements
const form = document.getElementById('transaction-form');
const transactionsDiv = document.getElementById('transactions');
const totalIncomeSpan = document.getElementById('total-income');
const totalExpensesSpan = document.getElementById('total-expenses');
const balanceSpan = document.getElementById('balance');

let transactions = []; // Array to store all transactions

form.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent default form submission

  // Get form values
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;

  // Add transaction to list
  const transaction = { description, amount, type };
  transactions.push(transaction);

  // Update the UI
  updateTransactions(); // 
  updateSummary();

  // Reset form
  form.reset(); // 
});

function updateTransactions() {
    transactionsDiv.innerHTML = '';
    transactions.forEach((transaction, index) => {
      const transactionDiv = document.createElement('div');
      transactionDiv.innerHTML = `
        ${transaction.description} - €${transaction.amount.toFixed(2)} (${transaction.type})
        <button onclick="deleteTransaction(${index})">Delete</button>
      `;
      transactionsDiv.appendChild(transactionDiv);
    });
  }

function updateSummary() {
    const income = transactions 
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions 
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    // Update the <span> elements dynamically
    totalIncomeSpan.textContent = income.toFixed(2); 
    totalExpensesSpan.textContent = expenses.toFixed(2); 
    balanceSpan.textContent = (income - expenses).toFixed(2); 
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateTransactions();
    updateSummary();
}
