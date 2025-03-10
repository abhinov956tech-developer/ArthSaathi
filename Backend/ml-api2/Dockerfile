# Use Python 3.11 as the base image
FROM python:3.11

# Set the working directory
WORKDIR /app

# Copy the application files
COPY . .

# Upgrade pip
RUN pip install --upgrade pip

# Install typing-extensions first to prevent conflicts
RUN pip install --no-cache-dir typing-extensions==4.5.0

# Install TensorFlow separately to avoid dependency conflicts
RUN pip install --no-cache-dir tensorflow==2.13.0

# Install remaining dependencies
RUN pip install --no-cache-dir \
    fastapi==0.103.1 \
    uvicorn==0.23.2 \
    pandas==2.0.3 \
    scikit-learn==1.3.0 \
    numpy==1.24.3 \
    joblib==1.3.2 \
    pydantic==2.4.2 \
    python-multipart==0.0.6 \
    Flask==2.3.2 \
    flask-cors==3.0.10 \
    matplotlib==3.7.1 \
    shap==0.44.0 \
    seaborn==0.12.2  # Added Seaborn here

# Run the deployment steps directly in the Dockerfile
RUN python data_preprocessing.py && \
    python feature_engineering.py && \
    python automation_pipeline.py && \
    python model_training.py && \
    python automation_pipeline.py && \
    python feature_model.py

# Start FastAPI server
# Use Python 3.11 as the base image
FROM python:3.11

# Set the working directory
WORKDIR /app

# Copy the application files
COPY . .

# Upgrade pip
RUN pip install --upgrade pip

# Install typing-extensions first to prevent conflicts
RUN pip install --no-cache-dir typing-extensions==4.5.0

# Install TensorFlow separately to avoid dependency conflicts
RUN pip install --no-cache-dir tensorflow==2.13.0

# Install remaining dependencies
RUN pip install --no-cache-dir \
    fastapi==0.103.1 \
    uvicorn==0.23.2 \
    pandas==2.0.3 \
    scikit-learn==1.3.0 \
    numpy==1.24.3 \
    joblib==1.3.2 \
    pydantic==2.4.2 \
    python-multipart==0.0.6 \
    Flask==2.3.2 \
    flask-cors==3.0.10 \
    matplotlib==3.7.1 \
    shap==0.44.0 \
    seaborn==0.12.2  # Added Seaborn here

# Run the deployment steps directly in the Dockerfile
RUN python data_preprocessing.py && \
    python feature_engineering.py && \
    python automation_pipeline.py && \
    python model_training.py && \
    python automation_pipeline.py && \
    python feature_model.py

# Expose the port the app runs on
EXPOSE 8000

# Set the command to run the Flask app using gunicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]