# 💸 M-Pesa STK Push Flutter App — Powered by Daraja API

This project is a **modern mobile payment application** that integrates **Safaricom’s M-Pesa Daraja API** with a **Flutter frontend** and a **Node.js + Express backend**.

It allows users to initiate **STK Push payments** directly from the Flutter app, enabling real-time mobile transactions between customers and businesses in Kenya.

---

## 🧠 Project Overview

The app demonstrates **how to connect a mobile frontend to the official M-Pesa payment gateway** using the **Daraja API**, making it an ideal foundation for:
- Fintech startups 💰  
- E-commerce mobile apps 🛒  
- Billing and subscription systems 📱  
- School or event payment apps 🎓  

It supports token generation, API authorization, and secure payment initiation using **STK Push**.

---

## 🌟 Features

✅ **1. Secure Token Generation**
- Uses M-Pesa’s OAuth 2.0 to request an access token securely via Node.js.

✅ **2. STK Push Integration**
- Initiates payment directly to a user’s mobile number from the app.

✅ **3. Flutter Frontend**
- Simple, clean, and responsive design built using Flutter.
- Includes a one-tap “Pay with M-Pesa” button.

✅ **4. Node.js Backend (Express Server)**
- Handles all API communication with Safaricom Daraja.
- Keeps secret keys and access tokens hidden from the Flutter app.

✅ **5. CORS Support**
- Allows the Flutter frontend to communicate seamlessly with the backend during local development.

✅ **6. Easy Migration**
- Designed to switch from **sandbox (test)** to **production** by simply replacing credentials.

✅ **7. Modular Codebase**
- Backend and frontend separated for easy updates and scaling.

---

## 🧰 Tools & Technologies Used

| Tool / Framework | Purpose |
|------------------|----------|
| **Flutter** | Frontend mobile UI |
| **Dart** | Flutter programming language |
| **Node.js** | Backend runtime for API server |
| **Express.js** | Framework to build RESTful APIs |
| **Axios** | HTTP client to communicate with Daraja API |
| **Body-Parser** | Parse incoming API requests |
| **CORS** | Enables frontend-backend communication |
| **Safaricom Daraja API** | M-Pesa payment gateway |
| **Postman / cURL** | API testing tools |

---

## 🧩 Project Structure

