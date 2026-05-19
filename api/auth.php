<?php
require_once 'config/cors.php';
require_once 'config/db.php';

session_start();
$db = getDB();
$body = json_decode(file_get_contents('php://input'), true);
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'register':
        $name  = trim($body['name'] ?? '');
        $email = trim($body['email'] ?? '');
        $pass  = $body['password'] ?? '';

        if (!$name || !$email || !$pass) {
            http_response_code(400);
            echo json_encode(['error' => 'All fields are required']);
            break;
        }

        $stmt = $db->prepare('SELECT id FROM users WHERE email = ?');
        $stmt->bind_param('s', $email);
        $stmt->execute();
        if ($stmt->get_result()->num_rows > 0) {
            http_response_code(409);
            echo json_encode(['error' => 'Email already registered']);
            break;
        }

        $hash = password_hash($pass, PASSWORD_BCRYPT);
        $stmt = $db->prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
        $stmt->bind_param('sss', $name, $email, $hash);
        $stmt->execute();
        echo json_encode(['message' => 'Registered successfully', 'id' => $db->insert_id]);
        break;

    case 'login':
        $email = trim($body['email'] ?? '');
        $pass  = $body['password'] ?? '';

        $stmt = $db->prepare('SELECT id, name, password FROM users WHERE email = ?');
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $user = $stmt->get_result()->fetch_assoc();

        if (!$user || !password_verify($pass, $user['password'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid credentials']);
            break;
        }

        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        echo json_encode(['message' => 'Login successful', 'id' => $user['id'], 'name' => $user['name']]);
        break;

    case 'logout':
        session_destroy();
        echo json_encode(['message' => 'Logged out']);
        break;

    case 'me':
        if (isset($_SESSION['user_id'])) {
            echo json_encode(['id' => $_SESSION['user_id'], 'name' => $_SESSION['user_name']]);
        } else {
            http_response_code(401);
            echo json_encode(['error' => 'Not logged in']);
        }
        break;

    default:
        http_response_code(400);
        echo json_encode(['error' => 'Invalid action']);
}

$db->close();
