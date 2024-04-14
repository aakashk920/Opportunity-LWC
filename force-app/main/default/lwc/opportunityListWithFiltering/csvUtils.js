// csvUtils.js

// Function to convert data to CSV format
export function exportCSV(data) {
    let csv = '';
    // Assuming data is an array of objects with keys representing column names
    // Add header row
    const headerRow = Object.keys(data[0]).join(',') + '\n';
    csv += headerRow;
    // Add data rows
    data.forEach(item => {
        const values = Object.values(item).join(',') + '\n';
        csv += values;
    });
    return csv;
}
