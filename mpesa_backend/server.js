const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Safaricom Daraja Sandbox credentials
const consumerKey = "dU8cwe1Wvd13QhItzQ3mpa7y3FANkkS1kfApyMuRqV9OLy41"; // Replace with your actual consumer key
const consumerSecret = "V7oviDvqz8l0ds1Lr2HIYko5cCeR2MpTGNCtCztzz6GIDJ4U8pVuagLznhOjGqGT"; // Replace with your actual consumer secret
const shortCode = "174379"; // Test Paybill
const passKey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"; // Daraja test passkey

// ✅ Function to get the access token
async function getAccessToken() {
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
    try {
        const res = await axios.get(
            "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
            {
                headers: { Authorization: `Basic ${auth}` },
            }
        );
        return res.data.access_token;
    } catch (err) {
        console.error("❌ Error fetching token:", err.response?.data || err.message);
        throw err;
    }
}

// ✅ STK Push endpoint
app.post("/stkpush", async (req, res) => {
    const { phone, amount } = req.body;

    if (!phone || !amount) {
        return res.status(400).json({ error: "Phone number and amount are required" });
    }

    try {
        const token = await getAccessToken();

        const timestamp = new Date()
            .toISOString()
            .replace(/[-T:.Z]/g, "")
            .slice(0, 14);

        const password = Buffer.from(shortCode + passKey + timestamp).toString("base64");

        const stkRequest = {
            BusinessShortCode: shortCode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: amount,
            PartyA: phone, // Customer phone
            PartyB: shortCode,
            PhoneNumber: phone,
            CallBackURL: "https://mydomain.com/callback", // We'll update later
            AccountReference: "Test123",
            TransactionDesc: "Payment for goods",
        };

        const response = await axios.post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            stkRequest,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("✅ STK Push Response:", response.data);
        res.json(response.data);
    } catch (error) {
        console.error("❌ STK Push Error:", error.response?.data || error.message);
        res.status(500).json({ error: "STK Push failed" });
    }
});

// ✅ Run the server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
