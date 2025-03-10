#!/bin/bash

# Install dependencies
pip install -r requirement.txt

# Train the model
python finance_model.py

# Start FastAPI server
uvicorn main:app --host 0.0.0.0 --port $PORT
