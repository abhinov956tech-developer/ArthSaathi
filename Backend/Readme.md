# Project Structure Overview

This project consists of multiple services deployed on Render, including machine learning APIs and a Node.js backend.

## Project Components

### 1. **ML API 1 (ml-api)**
- **Description**: This is the first machine learning API that provides predictions or financial analytical insights for potential saving for an indian houshold.
- **Deployment**: Hosted on Render.
- **Tech Stack**: Python (FastAPI/Flask/Django REST Framework)
- **Endpoints**:
  - `/predict` → Accepts input data and returns predictions.
  - `/health` → Health check endpoint.

### 2. **ML API 2 (ml-api2)**
- **Description**: A second machine learning API, possibly for a different model or an updated version.
- **Deployment**: Hosted on Render.
- **Tech Stack**: Python (FastAPI/Flask)
- **Endpoints**:
  - `/predict` → Accepts input data and returns predictions.
  - `/user-segmentation` → Accept input data and returns if the user is a low/high saver.

### 3. **Node.js Backend (node_server)**
- **Description**: A JavaScript backend server that acts as an endpoint API to connect the frontend with the ML APIs.
- **Deployment**: Hosted on Render.
- **Tech Stack**: Node.js with Express.
- **Endpoints**:
  - `/User` → Handles all the user actions.
  - `/Accounts` → Handles all the user's Account actions.
  - `/Transaction` → Handles all the user's Transaction actions.

## Folder Structure
```
project-root/
│── ml-api/          # First ML API
│── ml-api2/         # Second ML API
│── node_server/     # Node.js backend
│── frontend/        # (Optional) Frontend application
│── README.md        # Documentation
```

## Deployment Details
- **Render Deployments**:
  - `ml-api`: `https://arthsaathi.onrender.com/predict/`
  - `ml-api2`: `https://arthsaathi-zr07.onrender.com`
  - `node_server`: `https://arthsaathi-1-zfwp.onrender.com`
- Ensure API endpoints in the frontend are correctly set to use these services.

## How to Run Locally
### Prerequisites
- Python (if ML APIs use Python)
- Node.js (for `node_server`)

### Steps
1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-repo/project.git
   cd project
   ```
2. **Run ML API 1**:
   ```sh
   cd ml-api
   ./deploy.sh
   python app.py  # Or equivalent command
   ```
3. **Run ML API 2**:
   ```sh
   cd ../ml-api2
   ./deploy.sh
   python app.py  # Or equivalent command
   ```
4. **Run Node.js Backend**:
   ```sh
   cd ../node_server
   npm install
   node server.js
   ```
5. **Test APIs**:
   - Open `https://arthsaathi.onrender.com/predict/` for potential saving.
   request body structure
   {
           "Income": 50000.0,
           "Age": 35,
           "Dependents": 2,
           "Disposable_Income": 40000.0,
           "Desired_Savings": 10000.0,
           "Groceries": 500.0,
           "Transport": 200.0,
           "Eating_Out": 300.0,
           "Entertainment": 150.0,
           "Utilities": 100.0,
           "Healthcare": 50.0,
           "Education": 200.0,
           "Miscellaneous": 100.0,
           "Occupation": "Retired",
           "City_Tier": "Tier_1"
}
   - Open `http://localhost:3000/api/ml1/predict` for mututal scheme return predictions.
   {
    "expense_ratio": 0.85,
    "sharpe": 1.2,
    "sortino": 0.9,
    "fund_size_cr": 1500,
    "fund_age_yr": 5,
    "sd": 0.12,
    "beta": 0.8,
    "alpha": 0.05,
    "risk_level_2": false,
    "risk_level_3": true,
    "risk_level_4": false,
    "risk_level_5": false,
    "risk_level_6": false
  }


