"""
feature_engineering.py

This module performs feature engineering to enhance the predictive accuracy of mutual fund forecasting models.
Author: Satej
"""

import pandas as pd
import numpy as np

def calculate_interaction_features(df):
    """
    Create interaction features by combining existing numerical columns.

    Args:
        df (pd.DataFrame): Preprocessed dataset.

    Returns:
        pd.DataFrame: Dataset with new interaction feature columns added.
    """
    # Example: Create interaction between expense_ratio and fund_size_cr
    if 'expense_ratio' in df.columns and 'fund_size_cr' in df.columns:
        df['expense_ratio_x_fund_size'] = df['expense_ratio'] * df['fund_size_cr']

    # Example: Create interaction between fund_age_yr and returns_1yr
    if 'fund_age_yr' in df.columns and 'returns_1yr' in df.columns:
        df['fund_age_x_returns_1yr'] = df['fund_age_yr'] * df['returns_1yr']

    return df


def calculate_risk_adjusted_returns(df):
    """
    Calculate risk-adjusted returns using Sharpe ratio and Sortino ratio.

    Args:
        df (pd.DataFrame): Preprocessed dataset.

    Returns:
        pd.DataFrame: Dataset with new risk-adjusted return columns added.
    """
    # Risk-free rate assumption
    risk_free_rate = 0.02

    # Calculate Sharpe ratio
    if 'returns_1yr' in df.columns and 'sd' in df.columns:
        df['sharpe_ratio'] = (df['returns_1yr'] - risk_free_rate) / df['sd']

    # Calculate Sortino ratio (using standard deviation of negative returns)
    if 'returns_1yr' in df.columns and 'sortino' in df.columns:
        df['sortino_ratio'] = (df['returns_1yr'] - risk_free_rate) / df['sortino']

    return df


def calculate_performance_metrics(df):
    """
    Calculate additional performance metrics such as alpha and beta.

    Args:
        df (pd.DataFrame): Preprocessed dataset.

    Returns:
        pd.DataFrame: Dataset with new performance metric columns added.
    """
    # Example: Calculate risk-adjusted alpha
    if 'alpha' in df.columns and 'sd' in df.columns:
        df['risk_adjusted_alpha'] = df['alpha'] / df['sd']

    # Example: Calculate beta-adjusted returns
    if 'returns_1yr' in df.columns and 'beta' in df.columns:
        df['beta_adjusted_returns'] = df['returns_1yr'] / df['beta']

    return df


def encode_categorical_features(df):
    """
    Encode categorical features using one-hot encoding.

    Args:
        df (pd.DataFrame): Preprocessed dataset.

    Returns:
        pd.DataFrame: Dataset with encoded categorical features.
    """
    # Skip one-hot encoding since the columns are already encoded
    print("Skipping one-hot encoding as the columns are already encoded.")
    return df


if __name__ == "__main__":
    # Example usage
    input_file = "satej/cleaned_mutual_fund_data.csv"
    output_file = "satej/engineered_mutual_fund_data.csv"

    print("Loading cleaned data...")
    data = pd.read_csv(input_file)

    # Print column names for debugging
    print("Columns in the dataset:", data.columns.tolist())

    print("Calculating interaction features...")
    data = calculate_interaction_features(data)

    print("Calculating risk-adjusted returns...")
    data = calculate_risk_adjusted_returns(data)

    print("Calculating performance metrics...")
    data = calculate_performance_metrics(data)

    print("Encoding categorical features...")
    data = encode_categorical_features(data)

    # Ensure required columns are preserved
    required_columns = ['scheme_name', 'fund_manager', 'amc_name']
    for col in required_columns:
        if col not in data.columns:
            raise ValueError(f"'{col}' column is missing in the DataFrame.")

    print("Saving engineered data...")
    data.to_csv(output_file, index=False)
    print(f"Engineered data saved to: {output_file}")