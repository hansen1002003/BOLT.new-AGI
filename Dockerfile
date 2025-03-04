# Use Python as base image
FROM python:3.9

# Set the working directory
WORKDIR /app

# Copy everything from local folder to container
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port Flask will run on
EXPOSE 5001

# Command to run the application
CMD ["python", "app.py"]