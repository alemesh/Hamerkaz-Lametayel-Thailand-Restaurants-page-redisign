<?php
if (isset($_POST["name"]) && isset($_POST["tel"]) && isset($_POST["email"]) ) {

    // Формируем массив для JSON ответа
    $result = array(
        'name' => $_POST["name"],
        'tel' => $_POST["tel"],
        'email' => $_POST["email"]
    );



//sending email
    $senderName = 'הצטרפות למועדון הלקוחות';
    $senderEmail = $_SERVER['SERVER_NAME'];
    $targetEmail = [];
    $targetEmail = ['ravit@gofmans.co.il'];


    $messageSubject = 'Message from web-site - '. $_SERVER['SERVER_NAME'];
    $redirectToReferer = true;
    $redirectURL = $_SERVER['SERVER_NAME'];
//****************************************

// mail content

//var_dump($_POST); die;
    $ufname = $_POST['name'];

    $uphone = $_POST['tel'];
    $umail = $_POST['email'];




    // prepare message text
    $messageText =	'Name: '.$ufname."\n".
        'Phone: '.$uphone."\n".
        'Email: '.$umail."\n";


// send email
    $senderName = "=?UTF-8?B?" . base64_encode($senderName) . "?=";
    $messageSubject = "=?UTF-8?B?" . base64_encode($messageSubject) . "?=";
    $messageHeaders = "From: " . $senderName . " <" . $senderEmail . ">\r\n"
        . "MIME-Version: 1.0" . "\r\n"
        . "Content-type: text/plain; charset=UTF-8" . "\r\n";

//if (preg_match('/^[_.0-9a-z-]+@([0-9a-z][0-9a-z-]+.)+[a-z]{2,4}$/',$targetEmail,$matches))
    foreach ($targetEmail as $val){
        mail($val, $messageSubject, $messageText, $messageHeaders);
    }



    $today = date("F j, Y, g:i a");

    $file = 'sample.csv';
    $tofile = "$ufname;$uphone;$umail;$today\n";
    $bom = "\xEF\xBB\xBF";
    @file_put_contents($file, $bom . $tofile . file_get_contents($file));

// finish sending email




    // Переводим массив в JSON
    echo json_encode($result);
}