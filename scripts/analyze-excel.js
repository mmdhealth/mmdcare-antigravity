const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'public/assets/health_data.xlsx');
console.log(`Reading file from ${filePath}`);

const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convert to JSON to see structure
const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Header: 1 gets array of arrays

console.log("Sheet Name:", sheetName);
console.log("Total Rows:", data.length);
console.log("Header Row:", data[0]);
console.log("First 3 Data Rows:", data.slice(1, 4));
