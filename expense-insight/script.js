// Store all expenses
let expenses = [];

// Get DOM elements
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const totalDisplay = document.getElementById("total");

// Add expense
addBtn.addEventListener("click", function () {
    const title = titleInput.value;
    const amount = Number(amountInput.value);
    const category = categoryInput.value;

    // Basic validation
    if (title === "" || amount <= 0 || category === "") {
        alert("Please fill all fields correctly");
        return;
    }

    // Create expense object
    const expense = {
        id: Date.now(),
        title: title,
        amount: amount,
        category: category
    };

    expenses.push(expense);

    // Reset inputs
    titleInput.value = "";
    amountInput.value = "";
    categoryInput.value = "";

    renderExpenses();
    calculateTotal();
});

// Show expenses on UI
function renderExpenses() {
    expenseList.innerHTML = "";

    expenses.forEach(function (exp) {
        const li = document.createElement("li");
        li.innerHTML = `
            ${exp.title} (${exp.category}) - ₹${exp.amount}
            <button class="delete-btn" onclick="deleteExpense(${exp.id})">X</button>
        `;
        expenseList.appendChild(li);
    });
}

// Calculate total expense
function calculateTotal() {
    let total = 0;

    expenses.forEach(function (exp) {
        total += exp.amount;
    });

    totalDisplay.textContent = total;
}

// Delete expense
function deleteExpense(id) {
    expenses = expenses.filter(function (exp) {
        return exp.id !== id;
    });

    renderExpenses();
    calculateTotal();
}
