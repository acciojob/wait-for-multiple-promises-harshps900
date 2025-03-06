// Create a random promise that resolves after 1-3 seconds
function createRandomPromise(id) {
    const time = (Math.random() * 2 + 1).toFixed(3);
    return new Promise(resolve => setTimeout(() => resolve({ id, time }), time * 1000));
}

// Populate the table with the results of the promises
async function populateTable() {
    const output = document.getElementById('output');

    // Add loading row
    const loadingRow = document.createElement('tr');
    loadingRow.id = 'loading';
    loadingRow.innerHTML = '<td colspan="2">Loading...</td>';
    output.appendChild(loadingRow);

    // Create and run promises
    const promises = [
        createRandomPromise(1),
        createRandomPromise(2),
        createRandomPromise(3)
    ];

    // Wait for all promises to resolve
    const results = await Promise.all(promises);

    // Remove loading row
    output.removeChild(loadingRow);

    // Populate the table with results
    results.forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>Promise ${result.id}</td><td>${result.time}</td>`;
        output.appendChild(row);
    });

    // Calculate and display total time
    const totalTime = Math.max(...results.map(result => parseFloat(result.time)));
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `<td>Total</td><td>${totalTime.toFixed(3)}</td>`;
    output.appendChild(totalRow);
}

// Run the function when the page loads
window.onload = populateTable;