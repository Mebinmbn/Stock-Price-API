Stock Price API

Description:
This project is a Node.js-based API that fetches stock price data from a Google Spreadsheet and provides an endpoint to query stock prices by symbol and date.

Features:
Fetches stock data from a Google Spreadsheet.
Stores the data in a local JSON file (stockData.json).
Updates stock data every 30 minutes.
Provides an API endpoint to retrieve stock prices by symbol and date.

Tech Stack:
Node.js,
Express.js,
Google Sheets API,
dotenv,
fs (File System)

Installation:
Clone the repository:
git clone https://github.com/Mebinmbn/Stock-Price-API.git

Navigate to the project directory:
cd stock-price-api

Install dependencies:
npm install

Create a .env file and add the following variables:
PORT=8080,
SHEET_ID=your_google_sheet_id,
KEY_FILE=path_to_your_google_credentials.json

Run the server:
npm start

Usage:

Fetch Stock Price
Make a GET request to:
http://localhost:8080/api/stock-price?symbol=TATASTEEL&date=2024-04-01

Query Parameters:
symbol (required) - Stock symbol (e.g., AAPL, MSFT, TSLA)
date (required) - Date in YYYY-MM-DD format

Example Response:

{
"date": "2024-04-01",
"symbol": "TATASTEEL",
"closing_price": 165.32
}

How It Works:
The script uses the Google Sheets API to fetch stock data from a given sheet(The google sheet is already created).
Data is stored in stockData.json for quick access.
The API updates the stock data every 30 minutes.
Users can query stock prices by providing a stock symbol and a date.

License:
This project is licensed under the MIT License.

Author:
Mebin Joseph
