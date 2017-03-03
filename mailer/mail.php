<?php
require 'PHPMailerAutoload.php';

$mail = new PHPMailer;

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'sub5.mail.dreamhost.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'noreply@app.collectquotesave.com';                 // SMTP username
$mail->Password = 'DPj4qAin';                           // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587;                                    // TCP port to connect to

$mail->setFrom('noreply@app.collectquotesave.com', 'Collect, Quote, and Save!');
$mail->addAddress('stefen.phelps@growwithsms.com', 'Stefen Phelps');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
$mail->addReplyTo($_POST['user-email'], $_POST['user-name']);
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');

// Quote Form Fields
$userName = $_POST['user-name'];
$userEmail = $_POST['user-email'];
$productType = $_POST['productType'];
$environment = $_POST['environment'];
$shape = $_POST['shape'];
$material = $_POST['material'];
$style = $_POST['style'];
$width = $_POST['width'];
$height = $_POST['height'];
$usage = $_POST['usage'];
$quantity = $_POST['quantity'];
$photoFront = $_POST['photoFront'];
$photoBack = $_POST['photoBack'];
$endUserName = $_POST['endUserName'];
$endUserEmail = $_POST['endUserEmail'];
$endUserCompany = $_POST['endUserCompany'];
$notes = $_POST['notes'];

// $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = '$productType Quote Request for $userName';
$mail->Body    = '
	<p><strong>Product Type:</strong> '.$productType.'</p>
	<p><strong>Environment:</strong> '.$environment.'</p>
	<p><strong>Shape:</strong> '.$shape.'</p>
	<p><strong>Material:</strong> '.$material.'</p>
	<p><strong>Style:</strong> '.$style.'</p>
	<p><strong>Size:</strong> '.$width.' x '.$height.'</p>
	<p><strong>Annual Usage:</strong> '.$usage.'</p>
	<p><strong>Per Order Quantity:</strong> '.$quantity.'</p>
	<p><strong>End-user Name:</strong> '.$endUserName.'</p>
	<p><strong>End-user Email:</strong> '.$endUserEmail.'</p>
	<p><strong>End-user Company:</strong> '.$endUserCompany.'</p>
	<p><strong>Notes:</strong> '.$notes.'</p>
';
$mail->AltBody = '
	Product Type:'.$productType.'
	Environment: '.$environment.'
	Shape: '.$shape.'
	Material: '.$material.'
	Style: '.$style.'
	Size: '.$width.' x '.$height.'
	Annual Usage: '.$usage.'
	Per Order Quantity: '.$quantity.'
	End-user Name: '.$endUserName.'
	End-user Email: '.$endUserEmail.'
	End-user Company: '.$endUserCompany.'
	Notes: '.$notes.'
';

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}