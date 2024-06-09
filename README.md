
# Bank Accounts Management

Manage and monitor all your bank accounts in one place. Easily create new accounts, view existing ones, and track recent transactions.

This guide will help you set up the development environment for the Bank Accounts Management application. The setup script will install all necessary dependencies and start the development servers for both frontend and backend components.

## Setup Instructions

1.  **Clone the Repository**

Open your terminal (Git Bash or WSL on Windows, Terminal on Mac) and clone the repository:

```bash
git clone https://github.com/your-username/bank-accounts-management.git

cd bank-accounts-management
```

2. **Make the Script Executable (if necessary)**

On Unix-based systems (Mac and WSL):

```bash
chmod +x setup.sh`
```

3. **Run the Setup Script**

Execute the setup script to install dependencies and start the development servers:

```bash
./setup.sh
```
or
```bash
bash setup.sh
```

-   **Frontend**: Located in the `frontend` directory, the frontend server runs on `http://localhost:3000`.
-   **Backend**: Located in the `backend` directory, the backend server runs on `http://localhost:8000`.

## Testing Coverage Instructions

To check the tests and tests coverage:

```bash
cd bank-accounts-management

cd frontend

npm run coverage
```

