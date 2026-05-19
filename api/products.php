<?php
require_once 'config/cors.php';
require_once 'config/db.php';

$db = getDB();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $category = isset($_GET['category']) ? $_GET['category'] : null;
        $sql = 'SELECT * FROM products';
        if ($category) {
            $stmt = $db->prepare('SELECT * FROM products WHERE category = ?');
            $stmt->bind_param('s', $category);
            $stmt->execute();
            $result = $stmt->get_result();
        } else {
            $result = $db->query($sql);
        }
        $products = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($products);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

$db->close();
