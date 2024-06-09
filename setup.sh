# This script installs dependencies and starts the frontend and backend servers in separate terminal windows.

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

FRONTEND_DIR="$SCRIPT_DIR/frontend"
BACKEND_DIR="$SCRIPT_DIR/backend"

echo "Installing dependencies and starting servers..."

osascript <<EOF
tell application "Terminal"
    do script "echo 'Installing frontend dependencies'; cd \"$FRONTEND_DIR\"; npm install; echo 'Starting frontend server'; npm run dev"
end tell
EOF

osascript <<EOF
tell application "Terminal"
    do script "echo 'Installing backend dependencies'; cd \"$BACKEND_DIR\"; npm install; echo 'Starting backend server'; npm run start:dev"
end tell
EOF

osascript -e 'tell application "Terminal" to close (every window whose name contains "setup.sh")'
