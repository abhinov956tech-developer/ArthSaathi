import pandas as pd
import joblib
from feature_engineering import (
    calculate_interaction_features,
    calculate_risk_adjusted_returns,
    encode_categorical_features,
)
from data_preprocessing import clean_data, preprocess_data

# 1. Regenerate engineered data with all features
raw_data = pd.read_csv("satej/mutual_fund_data.csv")
engineered_data = clean_data(raw_data)
engineered_data = preprocess_data(engineered_data)
engineered_data = calculate_interaction_features(engineered_data)
engineered_data = calculate_risk_adjusted_returns(engineered_data)
engineered_data = encode_categorical_features(engineered_data)

# 2. Load model and required features
model = joblib.load("satej/models/linear_regression.pkl")
expected_features = joblib.load("satej/models/feature_columns.pkl")

# 3. Verify/repair features
missing = set(expected_features) - set(engineered_data.columns)
if missing:
    print(f"Adding missing features: {missing}")
    engineered_data = engineered_data.assign(
        **{feature: 0 for feature in missing}  # Initialize missing features
    )
    # Calculate interaction features
    engineered_data["expense_ratio_x_fund_size"] = (
        engineered_data["expense_ratio"] * engineered_data["fund_size_cr"]
    )
    engineered_data["fund_age_x_returns_1yr"] = (
        engineered_data["fund_age_yr"] * engineered_data["returns_1yr"]
    )

# 4. Prepare prediction data
X_existing = engineered_data[expected_features].fillna(0)  # Handle NaNs

# 5. Make predictions
engineered_data["predicted_1yr_return"] = model.predict(X_existing)

# 6. Save results
engineered_data.to_csv("satej/predictions_with_all_features.csv", index=False)