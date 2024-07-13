let data = [];
let expected = {
    collegeFee: 0,
    livingExpenses: 0,
    bankLoan: 0,
    family: 0
};

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
    if (pageId === 'overview') {
        renderOverview();
    } else if (pageId === 'summary') {
        renderSummary();
    } else if (pageId === 'motivational') {
        renderMotivational();
    }
}

function addEntry(event) {
    event.preventDefault();
    const entry = {
        collegeFee: parseFloat(document.getElementById('collegeFee').value),
        livingExpenses: parseFloat(document.getElementById('livingExpenses').value),
        bankLoan: parseFloat(document.getElementById('bankLoan').value),
        family: parseFloat(document.getElementById('family').value)
    };
    entry.total = (entry.collegeFee + entry.livingExpenses) - (entry.bankLoan + entry.family);
    data.push(entry);
    document.getElementById('entryForm').reset();
    showPage('overview');
}

function renderOverview() {
    const tbody = document.querySelector('#overviewTable tbody');
    tbody.innerHTML = '';
    data.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.collegeFee}</td>
            <td>${entry.livingExpenses}</td>
            <td>${entry.bankLoan}</td>
            <td>${entry.family}</td>
            <td>${entry.total}</td>
            <td>
                <button onclick="editEntry(${index})">Edit</button>
                <button onclick="deleteEntry(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function renderSummary() {
    const totals = data.reduce((acc, entry) => {
        acc.collegeFee += entry.collegeFee;
        acc.livingExpenses += entry.livingExpenses;
        acc.bankLoan += entry.bankLoan;
        acc.family += entry.family;
        return acc;
    }, { collegeFee: 0, livingExpenses: 0, bankLoan: 0, family: 0 });

    const tbody = document.querySelector('#summaryTable tbody');
    tbody.innerHTML = `
        <tr>
            <td>College Fee</td>
            <td>${totals.collegeFee}</td>
            <td>${expected.collegeFee}</td>
            <td>${expected.collegeFee - totals.collegeFee}</td>
        </tr>
        <tr>
            <td>Living Expenses</td>
            <td>${totals.livingExpenses}</td>
            <td>${expected.livingExpenses}</td>
            <td>${expected.livingExpenses - totals.livingExpenses}</td>
        </tr>
        <tr>
            <td>Bank Loan</td>
            <td>${totals.bankLoan}</td>
            <td>${expected.bankLoan}</td>
            <td>${expected.bankLoan - totals.bankLoan}</td>
        </tr>
        <tr>
            <td>Family</td>
            <td>${totals.family}</td>
            <td>${expected.family}</td>
            <td>${expected.family - totals.family}</td>
        </tr>
    `;
}

function setExpected(event) {
    event.preventDefault();
    expected.collegeFee = parseFloat(document.getElementById('expectedCollegeFee').value);
    expected.livingExpenses = parseFloat(document.getElementById('expectedLivingExpenses').value);
    expected.bankLoan = parseFloat(document.getElementById('expectedBankLoan').value);
    expected.family = parseFloat(document.getElementById('expectedFamily').value);
    document.getElementById('expectedForm').reset();
    showPage('summary');
}

function renderMotivational() {
    const totals = data.reduce((acc, entry) => {
        acc.collegeFee += entry.collegeFee;
        acc.livingExpenses += entry.livingExpenses;
        acc.bankLoan += entry.bankLoan;
        acc.family += entry.family;
        return acc;
    }, { collegeFee: 0, livingExpenses: 0, bankLoan: 0, family: 0 });

    const finalCalculation = (totals.collegeFee + totals.livingExpenses) - (totals.bankLoan + totals.family);
    document.getElementById('finalCalculation').innerText = `Final Calculation: (${totals.collegeFee} + ${totals.livingExpenses}) - (${totals.bankLoan} + ${totals.family}) = ${finalCalculation}`;
}

document.addEventListener('DOMContentLoaded', () => {
    showPage('overview');
});
