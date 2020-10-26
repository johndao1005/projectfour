const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

// const dummyData = [
//   { id: 1, text: 'Gas', amount: -25 },
//   { id: 2, text: 'Salary', amount: 18.99 },
//   { id: 3, text: 'JavaScript Book', amount: -74 },
//   { id: 4, text: 'Car', amount: 2625 }
// ]

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

// Add Transaction
function addTransaction(e) {
    e.preventDefault()

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount')
    } else {
        const transaction = {
                id: generateId(),
                text: text.value,
                amount: +amount.value,
            }
            // console.log(transaction)

        transactions.push(transaction)

        addTransactionList(transaction)

        updateValues()

        updateLocalStorage()

        text.value = ''
        amount.value = ''

    }
}

// Generate random id
function generateId() {
    return Math.floor(Math.random() * 100000000)
}

// Add transaction to the list
function addTransactionList(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? '-' : '+' // checking the value of the amount property in the array.btn

    const item = document.createElement('li')

    // Add class based on the value of amount
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

    item.innerHTML =
        `
  ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
  <button class="delete-btn" onclick="removeItem(${transaction.id})">x</button>
  ` // Math.abs is to get rid of the the minus sign in the amount property  

    list.appendChild(item)
}

// Update the total card
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount) // looping through the array and creating a new array using map() for only the amounts

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0).toFixed(2)

    const expense = (amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1).toFixed(2)

    balance.innerText = `$${total}`
    money_plus.innerText = `$${income}`
    money_minus.innerText = `$${expense}`
}

// remove item by id
function removeItem(id) {
    transactions = transactions.filter(transaction => transaction.id !== id)

    updateLocalStorage()

    init()
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

// Init app
function init() {
    list.innerHTML = ''

    transactions.forEach(addTransactionList) // looping through the array and adding it to html list
    updateValues() // calling the amounts array; 
}

init()

// Add a transaction 
form.addEventListener('submit', addTransaction)