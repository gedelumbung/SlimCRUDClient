<?php
require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

function getConnection() {
    $dbhost="127.0.0.1";
    $dbuser="root";
    $dbpass="gedelumbung";
    $dbname="crud_slim";
    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbh;
}

function validateApiKey($key) {
    $sql = "select * FROM tbl_api_reg where api_key='".$key."'";
    $db = getConnection();
    $sth = $db->prepare($sql);
    $sth->execute();
    return $sth->rowCount();
}

$authKey = function ($route) {
    $app = \Slim\Slim::getInstance();
    $routeParams = $route->getParams();
    if (validateApiKey($routeParams["key"])==0) {
      $app->halt(401);
    }
};

$app->get('/customer/:key/', $authKey, function () use ($app)  {
    $sql = "select * FROM tbl_customer";
        
    $response = $app->response();
    $response['Content-Type'] = 'application/json';
    $response['X-Powered-By'] = 'Gede Lumbung';
    
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $data = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        
        $response->status(200);
        $response->body(json_encode(array('customer' => $data)));
        
    } catch(PDOException $e) {
        $response->status(500);
        $response->body(json_encode(array('reasons' => $e->getMessage())));
    }
});

$app->get('/customer/:key/:id/', $authKey, function ($key,$id) use ($app) {
    try {
        $sql = "select * FROM tbl_customer where id_customer    ='".$id."'";
        $db = getConnection();
        $stmt = $db->query($sql);
        $data = $stmt->fetch(PDO::FETCH_OBJ);

        $db = null;
        $app->response()->header('Content-Type', 'application/json');
        echo json_encode($data);

    } catch (Exception $e) {
        $app->response()->status(400);
        $app->response()->header('X-Status-Reason', $e->getMessage());
    }
});

$app->post('/customer/:key/', $authKey, function () use ($app)  {
        
    $response = $app->response();
    $response['Content-Type'] = 'application/json';
    $response['X-Powered-By'] = 'Gede Lumbung';
    
  try {
    $request = $app->request();
    $input = json_decode($request->getBody());
    $sql = "INSERT INTO tbl_customer (nama_customer, alamat, telepon, tempat_lahir, tgl_lahir) VALUES (:nama_customer, :alamat, :telepon, :tempat_lahir, :tgl_lahir)";

    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("nama_customer", $input->nama_customer);
    $stmt->bindParam("alamat", $input->alamat);
    $stmt->bindParam("telepon", $input->telepon);
    $stmt->bindParam("tempat_lahir", $input->tempat_lahir);
    $stmt->bindParam("tgl_lahir", $input->tgl_lahir);

    $stmt->execute();
    $input->id_customer = $db->lastInsertId();
    $db = null;
        
    $response->status(200);
    $response->body(json_encode($input));

  } catch (Exception $e) {
    $response->status(400);
    $response->body(json_encode(array('reasons' => 'All fields are required.')));
  }
});

$app->put('/customer/:key/:id/', $authKey, function ($key,$id) use ($app)  {
        
    $response = $app->response();
    $response['Content-Type'] = 'application/json';
    $response['X-Powered-By'] = 'Gede Lumbung';
  try {
    $request = $app->request();
    $input = json_decode($request->getBody());
    $sql = "UPDATE tbl_customer set nama_customer=:nama_customer, alamat=:alamat, telepon=:telepon, tempat_lahir=:tempat_lahir, tgl_lahir=:tgl_lahir where id_customer='".$id."'";

    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("nama_customer", $input->nama_customer);
    $stmt->bindParam("alamat", $input->alamat);
    $stmt->bindParam("telepon", $input->telepon);
    $stmt->bindParam("tempat_lahir", $input->tempat_lahir);
    $stmt->bindParam("tgl_lahir", $input->tgl_lahir);

    $stmt->execute();
    $db = null;
        
    $response->status(200);
    $response->body(json_encode($input));

  } catch (Exception $e) {
    $response->status(400);
    $response->body(json_encode(array('reasons' => 'All fields are required.')));
  }
});

$app->delete('/customer/:key/:id/', $authKey, function ($key,$id) use ($app) {
        
    $response = $app->response();
    $response['Content-Type'] = 'application/json';
    $response['X-Powered-By'] = 'Gede Lumbung';
  try {
    $sql = "DELETE FROM tbl_customer WHERE id_customer='".$id."'";
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("id", $id);
    $stmt->execute();
    $db = null;
        
    $response->status(410);
    $response->body(json_encode(array('reasons' => 'Gone')));

  } catch (Exception $e) {
    $response->status(500);
    $response->body(json_encode(array('reasons' => 'Something error.')));
  }
});

$app->run();