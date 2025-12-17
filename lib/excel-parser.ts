import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";

export interface HealthMetric {
    date: string;
    value: number;
}

export interface LatestMetrics {
    steps?: HealthMetric;
    weight?: HealthMetric;
    heartRate?: HealthMetric;
    ldl?: HealthMetric;
    glucose?: HealthMetric;
    egfr?: HealthMetric;
    oxygen?: HealthMetric;
}

export interface HistoricalData {
    steps: HealthMetric[];
    weight: HealthMetric[];
    heartRate: HealthMetric[];
    ldl: HealthMetric[];
    glucose: HealthMetric[];
    egfr: HealthMetric[];
    oxygen: HealthMetric[];
}

const FILE_PATH = path.join(process.cwd(), "public/assets/health_data.xlsx");

// Column Mapping based on analysis
const COLUMNS = {
    DATE: "Date",
    TIME: "Time",
    STEPS: "Steps (numeric value)",
    WEIGHT: "Weight (Kg)",
    HEART_RATE: "Pulse (slag/min)",
    LDL: "LDLCholesterol (mmol/L)",
    GLUCOSE: "Blood Sugar Short Term (mmol/L)",
    EGFR: "Pt-eGFR(Krea)relativ (mL/min/1,7)",
    OXYGEN: "vB-sO2 ABL/PNA (%)"
};

function parseValue(val: any): number | undefined {
    if (val === undefined || val === null || val === "" || isNaN(Number(val))) return undefined;
    return Number(val);
}

// Helper to convert Excel date seral to JS Date if needed, 
// but analysis showed string dates "YYYY-MM-DD". We will trust the string format or handle basic parsing.
function parseDate(row: any): string | undefined {
    // The analysis showed 'Date' col as '2017-01-09'.
    // Time col as '14:14:28'.
    // We can combine them.
    const dateStr = row[COLUMNS.DATE]; // check raw key
    if (!dateStr) return undefined;
    return String(dateStr);
}

export async function getHealthData() {
    if (!fs.existsSync(FILE_PATH)) {
        console.error("Excel file not found at", FILE_PATH);
        return { latest: {}, history: {} };
    }

    const fileBuffer = fs.readFileSync(FILE_PATH);
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Get JSON with header keys
    const data = XLSX.utils.sheet_to_json(sheet);

    const history: HistoricalData = {
        steps: [],
        weight: [],
        heartRate: [],
        ldl: [],
        glucose: [],
        egfr: [],
        oxygen: [],
    };

    // Iterate and fill history
    data.forEach((row: any) => {
        const date = parseDate(row);
        if (!date) return;

        const addMetric = (key: string, targetArr: HealthMetric[]) => {
            const val = parseValue(row[key]);
            if (val !== undefined) {
                targetArr.push({ date, value: val });
            }
        };

        addMetric(COLUMNS.STEPS, history.steps);
        addMetric(COLUMNS.WEIGHT, history.weight);
        addMetric(COLUMNS.HEART_RATE, history.heartRate);
        addMetric(COLUMNS.LDL, history.ldl);
        addMetric(COLUMNS.GLUCOSE, history.glucose);
        addMetric(COLUMNS.EGFR, history.egfr);
        addMetric(COLUMNS.OXYGEN, history.oxygen);
    });

    // Sort by date ascending
    const sortByDate = (a: HealthMetric, b: HealthMetric) => new Date(a.date).getTime() - new Date(b.date).getTime();

    Object.values(history).forEach(arr => arr.sort(sortByDate));

    // Extract latest
    const getLatest = (arr: HealthMetric[]) => arr.length > 0 ? arr[arr.length - 1] : undefined;

    const latest: LatestMetrics = {
        steps: getLatest(history.steps),
        weight: getLatest(history.weight),
        heartRate: getLatest(history.heartRate),
        ldl: getLatest(history.ldl),
        glucose: getLatest(history.glucose),
        egfr: getLatest(history.egfr),
        oxygen: getLatest(history.oxygen),
    };

    return { latest, history };
}
