const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(process.cwd(), 'public/assets/health_data.xlsx');

const COLUMNS = {
    STEPS: "Steps (numeric value)",
    WEIGHT: "Weight (Kg)",
    HEART_RATE: "Pulse (slag/min)",
    LDL: "LDLCholesterol (mmol/L)",
    GLUCOSE: "Blood Sugar Short Term (mmol/L)",
    EGFR: "Pt-eGFR(Krea)relativ (mL/min/1,7)",
    OXYGEN: "vB-sO2 ABL/PNA (%)"
};

function run() {
    const fileBuffer = fs.readFileSync(FILE_PATH);
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    console.log("Total Rows:", data.length);

    Object.entries(COLUMNS).forEach(([key, colName]) => {
        const count = data.filter(r => r[colName] !== undefined && r[colName] !== "").length;
        console.log(`${key}: ${count} valid entries`);

        // Log last entry date
        const validRows = data.filter(r => r[colName] !== undefined && r[colName] !== "");
        if (validRows.length > 0) {
            console.log(`  Last Date: ${validRows[validRows.length - 1]['Date']}`);
        }
    });
}

run();
