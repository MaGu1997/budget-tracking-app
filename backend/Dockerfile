# 1. Use an official Python runtime as a parent image
# We use a slim variant for a smaller image size
FROM python:3.12.3-slim

# 2. Set the working directory in the container
WORKDIR /backend

# 3. Copy the dependency file and install dependencies
# This step is often split to leverage Docker layer caching
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# 4. Copy the rest of the application code into the container
COPY . .

# IMPORTANT: Make the uvicorn_config script executable
RUN chmod +x uvicorn_config.sh

# You should change this if your backend runs on a different port.
EXPOSE 8000

# 6. Define the command to run the application
# Use the appropriate command for your framework (e.g., uvicorn, gunicorn, flask run)
# Example for a simple Flask/FastAPI app:
# Set the Entrypoint/Command to execute the script
# The script now contains the full uvicorn command
CMD ["./uvicorn_config.sh"]