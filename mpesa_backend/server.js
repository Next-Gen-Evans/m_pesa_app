const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Safaricom Daraja Sandbox credentials
const consumerKey = "XlLYwOgapzpjXMGLqCHiGUSplbjPhtAScgF2nHEAbjyInzvu";
const consumerSecret = "zcpkrrVvpWop8YICiG6jkJVGdDSZewxM6mthRagTpYn28SpHc9EeZJpk3aKUFSqR";
const shortCode = "174379";
const passKey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";

// ✅ Route to get Access Token
app.get("/token", async (req, res) => {
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

    try {
        const response = await axios.get(
            "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                },
            }
        );

        console.log("✅ Token generated successfully:", response.data);
        res.json({
            success: true,
            data: response.data,
        });
    } catch (error) {
        console.error("❌ Error getting token:", error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: error.response?.data || error.message,
        });
    }
});

// ✅ Run the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
