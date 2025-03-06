// Create a random promise that resolves after 1-3 seconds
function createRandomPromise(id) {
    const time = (Math.random() * 2 + 1).toFixed(3);
    return new Promise(resolve => setTimeout(() => resolve({ id, time }), time * 1000));
}

// Handle promises and update the table
async function handlePromises() {
    const output = document.getElementById('output');
    const loading = document.getElementById('loading');
    const resetBtn = document.getElementById('reset-btn');

    output.innerHTML = '';
    loading.style.display = 'block';
    resetBtn.style.display = 'none';

    const promises = [
        createRandomPromise(1),
        createRandomPromise(2),
        createRandomPromise(3)
    ];

    const results = await Promise.all(promises);
    loading.style.display = 'none';
    resetBtn.style.display = 'inline-block';

    let maxTime = 0;

    results.forEach(result => {
        output.innerHTML += `<tr><td>Promise ${result.id}</td><td>${result.time} seconds</td></tr>`;
        maxTime = Math.max(maxTime, parseFloat(result.time));
    });

    output.innerHTML += `<tr class="total-row"><td>Total</td><td>${maxTime.toFixed(3)} seconds</td></tr>`;
}

// Reset the table
function resetTable() {
    document.getElementById('output').innerHTML = '';
    document.getElementById('reset-btn').style.display = 'none';
}

// Attach event listeners
document.getElementById('start-btn').addEventListener('click', handlePromises);
document.getElementById('reset-btn').addEventListener('click', resetTable);

// Let me know if you want more improvements or extra features! 🚀
