from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import pandas as pd
import joblib
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
genai.configure(api_key="AIzaSyCcXsT36P3Uyxu-CCmG3VIXwFflPRUAU2A")
# Enable CORS for cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained model and feature list
model_path = "satej/models/linear_regression.pkl"
feature_columns_path = "satej/models/feature_columns.pkl"
lr_model = joblib.load(model_path)
feature_columns = joblib.load(feature_columns_path)

class InputData(BaseModel):
    expense_ratio: float
    sharpe: float
    sortino: float
    fund_size_cr: float
    fund_age_yr: float
    sd: float
    beta: float
    alpha: float
    risk_level_2: bool
    risk_level_3: bool
    risk_level_4: bool
    risk_level_5: bool
    risk_level_6: bool

def preprocess_input(input_data):
    """
    Preprocess the input JSON data to match the model's requirements.
    """
    # Convert JSON to DataFrame
    df = pd.DataFrame([input_data.dict()])

    # Add missing columns with default values
    for col in feature_columns:
        if col not in df.columns:
            df[col] = 0  # Default value for missing features

    # Ensure correct data types
    numeric_cols = df.select_dtypes(include=np.number).columns
    df[numeric_cols] = df[numeric_cols].apply(pd.to_numeric, errors='coerce')

    # Select and order features
    X = df[feature_columns]

    # Handle missing values
    X = X.fillna(X.mean())  # Simple imputation

    return X

@app.route('/chatbot', methods=['POST'])
def chatbot():
    user_input = request.get_json().get('message', '')
    
    if not user_input:
        return jsonify({'response': "Please provide a message."})
    
    try:
        model = genai.GenerativeModel("gemini-1.5-flash", system_instruction="You are a financial assistant. Provide helpful financial advice, budgeting tips, and investment guidance based on user queries.")
        response = model.generate_content(user_input)
        bot_reply = response.text
    except Exception as e:
        bot_reply = "Sorry, there was an error processing your request."
    
    return jsonify({'response': bot_reply})

@app.post('/predict')
def predict(input_data: InputData):
    try:
        # Preprocess input
        processed_data = preprocess_input(input_data)

        # Predict 1-year returns
        predicted_1yr_return = lr_model.predict(processed_data)[0]

        # For 3-year and 5-year returns, use historical data (if available)
        # If not available, use a simple heuristic (e.g., scaling 1-year returns)
        predicted_3yr_return = predicted_1yr_return * 3  # Example scaling
        predicted_5yr_return = predicted_1yr_return * 5  # Example scaling

        # Return predictions
        return {
            "status": "success",
            "predictions": {
                "1_year_return": float(predicted_1yr_return),
                "3_year_return": float(predicted_3yr_return),
                "5_year_return": float(predicted_5yr_return),
            }
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
