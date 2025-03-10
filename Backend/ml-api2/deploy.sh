#!/bin/bash

# Run data preprocessing
python data_preprocessing.py

# Run feature engineering
python feature_engineering.py

# Run automation pipeline
python automation_pipeline.py

# Run model training
python model_training.py

python automation_pipeline.py

python feature_model.py

# Start FastAPI server
uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
