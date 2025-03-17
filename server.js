import express from "express";
import { google } from "googleapis";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.KEY_FILE,
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const sheets = google.sheets({ version: "v4", auth });

const SHEET_ID = process.env.SHEET_ID;
const RANGE = "A:C";

//Function to fetch data
const fetchStockData = async () => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      throw new Error("No data found");
    }

    const stockData = rows.slice(1).map((row) => ({
      date: row[0],
      symbol: row[1],
      closing_price: row[2] ? parseFloat(row[2]) : null,
    }));

    fs.writeFileSync("./stockData.json", JSON.stringify(stockData, null, 2));
  } catch (error) {
    console.error("Error fetching stock data:", error);
  }
};

fetchStockData();

setInterval(fetchStockData, 30 * 60 * 1000);

//Route
app.get("/api/stock-price", async (req, res) => {
  const { symbol, date } = req.query;

  if (!symbol || !date) {
    return res.status(400).json({ error: "Symbol and date are required" });
  }

  if (!fs.existsSync("./stockData.json")) {
    return res.status(500).json({ error: "Stock data not available yet" });
  }
  try {
    const stockData = JSON.parse(fs.readFileSync("./stockData.json", "utf-8"));
    const stock = stockData.find(
      (item) => item.symbol === symbol && item.date === date
    );

    if (!stock) {
      return res.status(404).json({ error: "Stock price not found" });
    }

    res.json(stock);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
