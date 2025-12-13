#!/bin/sh
# run.sh

# Set environment variables that uvicorn will use
# Bind to all interfaces (required for Docker networking)
HOST="0.0.0.0"
# Set the port
PORT="8000"

# Execute the uvicorn command
# We use 'exec' to replace the shell process with the uvicorn process,
# which is good practice for Docker entry points.
echo "Starting Uvicorn server on $HOST:$PORT"
exec uvicorn main:app --host "$HOST" --port "$PORT"