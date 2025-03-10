# Use official Python image
FROM python:3.10

# Set working directory
WORKDIR /app

# Copy all files
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirement.txt

# Expose the port
EXPOSE 8000

# Run deploy script
CMD ["bash", "deploy.sh"]
