const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')
const localStorageTransaction = JSON.parse(localStorage.getItem('transaction'))
let transactions = localStorage.getItem('transaction') !== null ? localStorageTransaction : []

// add transaction
// you would invoke a function
function addTransaction(e) {
    e.preventDefault()
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount');
    } else {
        const transaction = {
            id: generateId(),
            text: text.value,
            amount: +amount.value
        }
        transactions.push(transaction)
        addTransactionList(transaction)
        updateLocalStorage()
        updateValues()
    }
}
// generate Id good for 
function generateId() {
    // Math.floor give the greatest interger which is less than or equal to its numberic agruments
    return Math.floor(Math.random() * 100000000)
}

// add transaction to the list

function addTransactionList(transaction) {
    //get sign
    const sign = transaction.amount < 0 ? '-' : '+'
    const item = document.createElement('li')

    // add a class based on the value of amount
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')
    item.innerHTML =
        // abs get rid of the negative or positive sign
        `${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeItem(${transaction.id})">X</button>
    `
    list.appendChild(item)
}
// update total card
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount)
        //calculate total
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)
        // calculate income
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0).toFixed(2)
        // calculate expense
    const expense = (amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1).toFixed(2)
    balance.innerText = `$${total}`
    money_plus.innerText = `$${income}`
    money_minus.innerText = `$${expense}`
}
//remove item by id
function removeItem(id) {
    transactions = transactions.filter(transaction => transaction.id !== id)
    updateLocalStorage()
    init()
}
//input the value
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

function init() {
    list.innerHTML = ''
    transactions.forEach(addTransactionList)
    updateValues()

}
init()
    //add transaction
form.addEventListener('submit', addTransaction)