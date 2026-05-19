<?php
require_once 'config/cors.php';
require_once 'config/db.php';

session_start();
$db = getDB();
$body = json_decode(file_get_contents('php://input'), true);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        if (!isset($_SESSION['user_id'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Login required']);
            break;
        }

        $user_id = $_SESSION['user_id'];
        $items   = $body['items'] ?? [];
        $total   = $body['total'] ?? 0;

        if (empty($items)) {
            http_response_code(400);
            echo json_encode(['error' => 'Cart is empty']);
            break;
        }

        $stmt = $db->prepare('INSERT INTO orders (user_id, total) VALUES (?, ?)');
        $stmt->bind_param('id', $user_id, $total);
        $stmt->execute();
        $order_id = $db->insert_id;

        $stmt = $db->prepare('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)');
        foreach ($items as $item) {
            $stmt->bind_param('iiid', $order_id, $item['id'], $item['quantity'], $item['price']);
            $stmt->execute();
        }

        echo json_encode(['message' => 'Order placed', 'order_id' => $order_id]);
        break;

    case 'GET':
        if (!isset($_SESSION['user_id'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Login required']);
            break;
        }

        $user_id = $_SESSION['user_id'];
        $stmt = $db->prepare(
            'SELECT o.id, o.total, o.status, o.created_at,
                    oi.quantity, oi.price,
                    p.name, p.image
             FROM orders o
             JOIN order_items oi ON oi.order_id = o.id
             JOIN products p ON p.id = oi.product_id
             WHERE o.user_id = ?
             ORDER BY o.created_at DESC'
        );
        $stmt->bind_param('i', $user_id);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

        $orders = [];
        foreach ($rows as $row) {
            $oid = $row['id'];
            if (!isset($orders[$oid])) {
                $orders[$oid] = [
                    'id' => $oid,
                    'total' => $row['total'],
                    'status' => $row['status'],
                    'created_at' => $row['created_at'],
                    'items' => []
                ];
            }
            $orders[$oid]['items'][] = [
                'name' => $row['name'],
                'image' => $row['image'],
                'quantity' => $row['quantity'],
                'price' => $row['price']
            ];
        }

        echo json_encode(array_values($orders));
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

$db->close();
