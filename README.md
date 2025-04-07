# My Awesome Full-Stack Application

This README provides instructions on how to set up and run both the backend and frontend components of this application.

## Folder Structure

```
.
├── backend/
└── frontend/
```

## Backend Setup (Python)

This section details the steps to set up and run the backend server.

1.  **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2.  **Verify Python version:**
    Ensure you have Python 3.12.3 installed.

    ```bash
    python3 --version
    ```

    _(Expected output: Python 3.12.3)_

3.  **Create a virtual environment:**
    This isolates the project dependencies.

    ```bash
    python3 -m venv venv
    ```

4.  **Activate the virtual environment:**
    This makes the environment's packages available.

    ```bash
    source venv/bin/activate
    ```

5.  **Install dependencies:**
    Install all the required Python packages from the `requirements.txt` file.

    ```bash
    pip install -r requirements.txt
    ```

6.  **Run the backend server:**
    Start the FastAPI application using Uvicorn.
    ```bash
    uvicorn main:app --reload
    ```
    Your backend application will start and be accessible at `http://localhost:8000`.

### Backend Technologies Used:

- **FastAPI:** A modern, fast (high-performance), web framework for building APIs with Python 3.7+ based on standard Python type hints. _(Used for building robust and efficient APIs with automatic data validation and serialization.)_
- **Uvicorn:** An ASGI (Asynchronous Server Gateway Interface) web server implementation. _(Used to run the FastAPI application asynchronously, improving performance.)_
- **Pydantic:** Data validation and settings management using Python type hints. _(Used for defining data structures, ensuring data quality, and handling serialization/deserialization.)_
- **SQLAlchemy:** A popular Python SQL toolkit and Object Relational Mapper (ORM). _(Used for interacting with the database in a Pythonic way, simplifying database operations.)_

## Frontend Setup (TypeScript)

This section describes how to set up and run the frontend application.

1.  **Open a new terminal.**

2.  **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

3.  **Verify pnpm version:**
    Ensure you have pnpm version 9.14.2 installed.

    ```bash
    pnpm --version
    ```

    _(Expected output: 9.14.2)_

4.  **Install dependencies:**
    Install all the required JavaScript packages.

    ```bash
    pnpm install
    ```

5.  **Run the development server:**
    Start the Vite development server.

    ```bash
    pnpm run dev
    ```

6.  **Access the frontend:**
    Open your web browser and navigate to `http://localhost:5173/` to view the application.

### Frontend Technologies Used:

- **TypeScript:** A superset of JavaScript that adds static typing to the language. _(Used to improve code maintainability and catch errors early in development through static typing.)_
- **Vite:** A next-generation frontend tooling that provides extremely fast development experience. _(Used for its speed and efficient development server and build process.)_
- **React:** A JavaScript library for building user interfaces or UI components. _(Used for creating a dynamic and interactive user interface with a component-based architecture.)_
- **Mantine:** A React components library with a focus on usability and developer experience. _(Used for providing a set of pre-built, accessible, and stylish UI components to accelerate development.)_
- **Axios:** A promise-based HTTP client for the browser and Node.js. _(Used for making asynchronous HTTP requests to communicate with the backend API.)_
- **jsPDF:** A JavaScript library to generate PDF documents client-side. _(Used for enabling the application to create and download PDF files directly in the browser.)_
- **Redux:** A predictable state container for JavaScript apps. _(Used for managing the application's state in a centralized and predictable way, making it easier to handle complex data flows.)_
