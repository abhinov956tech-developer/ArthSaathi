#!/bin/bash

# Train the model
python finance_model.py

# Start FastAPI server
uvicorn main:app --host 0.0.0.0 --port $PORT
