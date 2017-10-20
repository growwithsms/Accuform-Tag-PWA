<?php

require 'PHPMailerAutoload.php';

$mail = new PHPMailer;
$mail->isSMTP();
$mail->Host = 'sub5.mail.dreamhost.com';
$mail->SMTPAuth = true;
$mail->Username = 'XXXX_Username_XXXX';
$mail->Password = 'XXXX_Password_XXXX';
$mail->SMTPSecure = 'tls';
$mail->Port = 587;

$mail->setFrom('noreply@app.collectquotesave.com', 'Collect, Quote, & Save!');
$mail->addAddress('example@example.com', 'Accuform');
$mail->addBCC('example@example.com', 'Developer Name');
$mail->addReplyTo($_POST['email'], $_POST['user']);
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');

// Quote Form Fields
$userName = $_POST['user'];
$userEmail = $_POST['email'];
$phone = $_POST['phone'];
$company = $_POST['company'];
$productType = $_POST['productType'];
$environment = $_POST['environment'];
$shape = $_POST['shape'];
$material = $_POST['material'];
$style = $_POST['style'];
$width = $_POST['width'];
$height = $_POST['height'];
$uom = $_POST['uom'];
$usage = $_POST['usage'];
$quantity = $_POST['quantity'];
$finishing = $_POST['finishing'];
$notes = $_POST['notes'];

// Time stuff
date_default_timezone_set("America/New_York");
$currentTime = date("h:i:sa");
$dueTime = date("h:i:sa", strtotime("+10 minutes"));

for ($ct = 0; $ct < count($_FILES['photos']['tmp_name']); $ct++) {
    $uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES['photos']['name'][$ct]));
    $filename = $_FILES['photos']['name'][$ct];
    if (move_uploaded_file($_FILES['photos']['tmp_name'][$ct], $uploadfile)) {
        $mail->addAttachment($uploadfile, $filename);
    } else {
        echo 'Failed to move file to ' . $uploadfile;
    }
}

$mail->isHTML(true); // Set email format to HTML
$mail->Subject = 'App-Based Quote : '.$productType.' for '.$userName.'';
$mail->Body    = '
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<style>
  @media only screen {
    html {
      min-height: 100%;
      background: #f3f3f3;
    }
  }
  
  @media only screen and (max-width: 596px) {
    .small-float-center {
      margin: 0 auto !important;
      float: none !important;
      text-align: center !important;
    }
    .small-text-center {
      text-align: center !important;
    }
    .small-text-left {
      text-align: left !important;
    }
    .small-text-right {
      text-align: right !important;
    }
  }
  
  @media only screen and (max-width: 596px) {
    .hide-for-large {
      display: block !important;
      width: auto !important;
      overflow: visible !important;
      max-height: none !important;
      font-size: inherit !important;
      line-height: inherit !important;
    }
  }
  
  @media only screen and (max-width: 596px) {
    table.body table.container .hide-for-large,
    table.body table.container .row.hide-for-large {
      display: table !important;
      width: 100% !important;
    }
  }
  
  @media only screen and (max-width: 596px) {
    table.body table.container .callout-inner.hide-for-large {
      display: table-cell !important;
      width: 100% !important;
    }
  }
  
  @media only screen and (max-width: 596px) {
    table.body table.container .show-for-large {
      display: none !important;
      width: 0;
      mso-hide: all;
      overflow: hidden;
    }
  }
  
  @media only screen and (max-width: 596px) {
    table.body img {
      width: auto;
      height: auto;
    }
    table.body center {
      min-width: 0 !important;
    }
    table.body .container {
      width: 95% !important;
    }
    table.body .columns,
    table.body .column {
      height: auto !important;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding-left: 16px !important;
      padding-right: 16px !important;
    }
    table.body .columns .column,
    table.body .columns .columns,
    table.body .column .column,
    table.body .column .columns {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
    table.body .collapse .columns,
    table.body .collapse .column {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
    td.small-1,
    th.small-1 {
      display: inline-block !important;
      width: 8.33333% !important;
    }
    td.small-2,
    th.small-2 {
      display: inline-block !important;
      width: 16.66667% !important;
    }
    td.small-3,
    th.small-3 {
      display: inline-block !important;
      width: 25% !important;
    }
    td.small-4,
    th.small-4 {
      display: inline-block !important;
      width: 33.33333% !important;
    }
    td.small-5,
    th.small-5 {
      display: inline-block !important;
      width: 41.66667% !important;
    }
    td.small-6,
    th.small-6 {
      display: inline-block !important;
      width: 50% !important;
    }
    td.small-7,
    th.small-7 {
      display: inline-block !important;
      width: 58.33333% !important;
    }
    td.small-8,
    th.small-8 {
      display: inline-block !important;
      width: 66.66667% !important;
    }
    td.small-9,
    th.small-9 {
      display: inline-block !important;
      width: 75% !important;
    }
    td.small-10,
    th.small-10 {
      display: inline-block !important;
      width: 83.33333% !important;
    }
    td.small-11,
    th.small-11 {
      display: inline-block !important;
      width: 91.66667% !important;
    }
    td.small-12,
    th.small-12 {
      display: inline-block !important;
      width: 100% !important;
    }
    .columns td.small-12,
    .column td.small-12,
    .columns th.small-12,
    .column th.small-12 {
      display: block !important;
      width: 100% !important;
    }
    table.body td.small-offset-1,
    table.body th.small-offset-1 {
      margin-left: 8.33333% !important;
      Margin-left: 8.33333% !important;
    }
    table.body td.small-offset-2,
    table.body th.small-offset-2 {
      margin-left: 16.66667% !important;
      Margin-left: 16.66667% !important;
    }
    table.body td.small-offset-3,
    table.body th.small-offset-3 {
      margin-left: 25% !important;
      Margin-left: 25% !important;
    }
    table.body td.small-offset-4,
    table.body th.small-offset-4 {
      margin-left: 33.33333% !important;
      Margin-left: 33.33333% !important;
    }
    table.body td.small-offset-5,
    table.body th.small-offset-5 {
      margin-left: 41.66667% !important;
      Margin-left: 41.66667% !important;
    }
    table.body td.small-offset-6,
    table.body th.small-offset-6 {
      margin-left: 50% !important;
      Margin-left: 50% !important;
    }
    table.body td.small-offset-7,
    table.body th.small-offset-7 {
      margin-left: 58.33333% !important;
      Margin-left: 58.33333% !important;
    }
    table.body td.small-offset-8,
    table.body th.small-offset-8 {
      margin-left: 66.66667% !important;
      Margin-left: 66.66667% !important;
    }
    table.body td.small-offset-9,
    table.body th.small-offset-9 {
      margin-left: 75% !important;
      Margin-left: 75% !important;
    }
    table.body td.small-offset-10,
    table.body th.small-offset-10 {
      margin-left: 83.33333% !important;
      Margin-left: 83.33333% !important;
    }
    table.body td.small-offset-11,
    table.body th.small-offset-11 {
      margin-left: 91.66667% !important;
      Margin-left: 91.66667% !important;
    }
    table.body table.columns td.expander,
    table.body table.columns th.expander {
      display: none !important;
    }
    table.body .right-text-pad,
    table.body .text-pad-right {
      padding-left: 10px !important;
    }
    table.body .left-text-pad,
    table.body .text-pad-left {
      padding-right: 10px !important;
    }
    table.menu {
      width: 100% !important;
    }
    table.menu td,
    table.menu th {
      width: auto !important;
      display: inline-block !important;
    }
    table.menu.vertical td,
    table.menu.vertical th,
    table.menu.small-vertical td,
    table.menu.small-vertical th {
      display: block !important;
    }
    table.menu[align="center"] {
      width: auto !important;
    }
    table.button.small-expand,
    table.button.small-expanded {
      width: 100% !important;
    }
    table.button.small-expand table,
    table.button.small-expanded table {
      width: 100%;
    }
    table.button.small-expand table a,
    table.button.small-expanded table a {
      text-align: center !important;
      width: 100% !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
    table.button.small-expand center,
    table.button.small-expanded center {
      min-width: 0;
    }
  }
</style>
<table class="body" style="Margin: 0; background: #f3f3f3; border-collapse: collapse; border-spacing: 0; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; height: 100%; line-height: 1.3; margin: 0; padding: 0; text-align: left; vertical-align: top; width: 100%;">
  <tr style="padding: 0; text-align: left; vertical-align: top;">
    <td class="center" align="center" valign="top" style="-moz-hyphens: auto; -webkit-hyphens: auto; Margin: 0; border-collapse: collapse !important; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 1.3; margin: 0; padding: 0; text-align: left; vertical-align: top; word-wrap: break-word;">
      <center data-parsed="" style="min-width: 580px; width: 100%;">

        <table align="center" class="container float-center" style="Margin: 0 auto; background: #fefefe; border-collapse: collapse; border-spacing: 0; float: none; margin: 0 auto; padding: 0; text-align: center; vertical-align: top; width: 580px;">
          <tbody>
            <tr style="padding: 0; text-align: left; vertical-align: top;">
              <td style="-moz-hyphens: auto; -webkit-hyphens: auto; Margin: 0; border-collapse: collapse !important; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 1.3; margin: 0; padding: 0; text-align: left; vertical-align: top; word-wrap: break-word;">
                <table class="spacer" style="border-collapse: collapse; border-spacing: 0; padding: 0; text-align: left; vertical-align: top; width: 100%;">
                  <tbody>
                    <tr style="padding: 0; text-align: left; vertical-align: top;">
                      <td height="32px" style="-moz-hyphens: auto; -webkit-hyphens: auto; Margin: 0; border-collapse: collapse !important; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 32px; font-weight: normal; hyphens: auto; line-height: 32px; margin: 0; mso-line-height-rule: exactly; padding: 0; text-align: left; vertical-align: top; word-wrap: break-word;">&#xA0;</td>
                    </tr>
                  </tbody>
                </table>

                <table class="row" style="border-collapse: collapse; border-spacing: 0; display: table; padding: 0; position: relative; text-align: left; vertical-align: top; width: 100%;">
                  <tbody>
                    <tr style="padding: 0; text-align: left; vertical-align: top;">
                      <th class="small-12 large-12 columns first last" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 16px; padding-right: 16px; text-align: left; width: 564px;">
                        <table style="border-collapse: collapse; border-spacing: 0; padding: 0; text-align: left; vertical-align: top; width: 100%;">
                          <tr style="padding: 0; text-align: left; vertical-align: top;">
                            <th style="Margin: 0; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left;">
                              <center data-parsed="" style="min-width: 532px; width: 100%;">
                                <img src="https://app.collectquotesave.com/mailer/images/cqs-email-header.png" width="600" style="-ms-interpolation-mode: bicubic; Margin: 0 auto; clear: both; display: block; float: none; margin: 0 auto; max-width: 100%; outline: none; text-align: center; text-decoration: none; width: 600px !important;"
                                  alt="Collect, Quote, &amp; Save!" align="center" class="float-center">
                              </center>
                            </th>
                            <th class="expander" style="Margin: 0; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; padding: 0 !important; text-align: left; visibility: hidden; width: 0;"></th>
                          </tr>
                        </table>
                      </th>
                    </tr>
                  </tbody>
                </table>
                <table class="row" style="border-collapse: collapse; border-spacing: 0; display: table; padding: 0; position: relative; text-align: left; vertical-align: top; width: 100%;">
                  <tbody>
                    <tr style="padding: 0; text-align: left; vertical-align: top;">
                      <th class="small-6 large-6 columns first" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 16px; padding-right: 8px; text-align: left; width: 274px;">
                        <table style="border-collapse: collapse; border-spacing: 0; padding: 0; text-align: left; vertical-align: top; width: 100%;">
                          <tr style="padding: 0; text-align: left; vertical-align: top;">
                            <th style="Margin: 0; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left;">
                              <p style="Margin: 0; Margin-bottom: 10px; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; margin-bottom: 10px; padding: 0; text-align: left;">Customer Name:<br>
                                <span style="font-size: 24px;">'.$userName.' - <a rel="nofollow" href="mailto:'.$userEmail.'" style="Margin: 0; color: #2199e8; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left; text-decoration: none;">'.$userEmail.'</a></span><br>
                                Phone: <span style="font-size: 14px;">'.$phone.'</span> Company: <span style="font-size: 14px;">'.$company.'</span>
                              </p>
                            </th>
                          </tr>
                        </table>
                      </th>
                      <th class="small-6 large-6 columns last" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 8px; padding-right: 16px; text-align: left; width: 274px;">
                        <table style="border-collapse: collapse; border-spacing: 0; padding: 0; text-align: left; vertical-align: top; width: 100%;">
                          <tr style="padding: 0; text-align: left; vertical-align: top;">
                            <th style="Margin: 0; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left;">
                              <p style="Margin: 0; Margin-bottom: 10px; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; margin-bottom: 10px; padding: 0; text-align: right;">Request for Quote:<br>
                                <span style="font-size: 24px;">'.$currentTime.'</span></p>

                            </th>
                          </tr>
                        </table>
                      </th>
                    </tr>
                  </tbody>
                </table>

                <table class="row" style="border-collapse: collapse; border-spacing: 0; display: table; padding: 0; position: relative; text-align: left; vertical-align: top; width: 100%;">
                  <tbody>
                    <tr style="padding: 0; text-align: left; vertical-align: top;">
                      <th class="small-12 large-12 columns first last" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 16px; padding-right: 16px; text-align: left; width: 564px;">
                        <table style="border-collapse: collapse; border-spacing: 0; padding: 0; text-align: left; vertical-align: top; width: 100%;">
                          <tr style="padding: 0; text-align: left; vertical-align: top;">
                            <th style="Margin: 0; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left;">
                              <table class="callout" style="Margin-bottom: 16px; border-collapse: collapse; border-spacing: 0; margin-bottom: 16px; padding: 0; text-align: left; vertical-align: top; width: 100%;">
                                <tr style="padding: 0; text-align: left; vertical-align: top;">
                                  <th class="callout-inner primary" style="Margin: 0; background: #def0fc; border: 1px solid #444444; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; padding: 10px; text-align: left; width: 100%;">
                                    Fulfill customer quote no later than: '.$dueTime.'
                                  </th>
                                  <th class="expander" style="Margin: 0; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; padding: 0 !important; text-align: left; visibility: hidden; width: 0;"></th>
                                </tr>
                              </table>
                              	<h1 style="Margin: 0; Margin-bottom: 10px; color: inherit; font-family: Helvetica, Arial, sans-serif; font-size: 34px; font-weight: normal; line-height: 1.3; margin: 0; margin-bottom: 10px; padding: 0; text-align: left; word-wrap: normal;">Product Type: '.$productType.'</h1>
								<p><strong>Environment:</strong> '.$environment.'</p>
								<p><strong>Shape:</strong> '.$shape.'</p>
								<p><strong>Material:</strong> '.$material.'</p>
								<p><strong>Finishing:</strong> '.$finishing.'</p>
								<p><strong>Style:</strong> '.$style.'</p>
								<p><strong>Size:</strong> '.$height.' x '.$width.' &nbsp;'.$uom.'.</p>
								<p><strong>Annual Usage:</strong> '.$usage.'</p>
								<p><strong>Per Order Quantity:</strong> '.$quantity.'</p>
								<p><strong>Notes:</strong> '.$notes.'</p>
							</th>
                            <th class="expander" style="Margin: 0; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; padding: 0 !important; text-align: left; visibility: hidden; width: 0;"></th>
                          </tr>
                        </table>
                      </th>
                    </tr>
                  </tbody>
                </table>
                <table class="spacer" style="border-collapse: collapse; border-spacing: 0; padding: 0; text-align: left; vertical-align: top; width: 100%;">
                  <tbody>
                    <tr style="padding: 0; text-align: left; vertical-align: top;">
                      <td height="20px" style="-moz-hyphens: auto; -webkit-hyphens: auto; Margin: 0; border-collapse: collapse !important; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 20px; font-weight: normal; hyphens: auto; line-height: 20px; margin: 0; mso-line-height-rule: exactly; padding: 0; text-align: left; vertical-align: top; word-wrap: break-word;">&#xA0;</td>
                    </tr>
                  </tbody>
                </table>
                <table class="row footer" style="border-collapse: collapse; border-spacing: 0; display: table; padding: 0; position: relative; text-align: left; vertical-align: top; width: 100%;">
                  <tbody>
                    <tr style="padding: 0; text-align: left; vertical-align: top;">
                      <th class="small-12 large-12 columns first last" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 16px; padding-right: 16px; text-align: left; width: 564px;">
                        <table style="border-collapse: collapse; border-spacing: 0; padding: 0; text-align: left; vertical-align: top; width: 100%;">
                          <tr style="padding: 0; text-align: left; vertical-align: top;">
                            <th style="Margin: 0; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left;">
                              <hr>
                              <table class="spacer" style="border-collapse: collapse; border-spacing: 0; padding: 0; text-align: left; vertical-align: top; width: 100%;">
                                <tbody>
                                  <tr style="padding: 0; text-align: left; vertical-align: top;">
                                    <td height="32px" style="-moz-hyphens: auto; -webkit-hyphens: auto; Margin: 0; border-collapse: collapse !important; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 32px; font-weight: normal; hyphens: auto; line-height: 32px; margin: 0; mso-line-height-rule: exactly; padding: 0; text-align: left; vertical-align: top; word-wrap: break-word;">&#xA0;</td>
                                  </tr>
                                </tbody>
                              </table>
                              <p class="text-center" style="Margin: 0; Margin-bottom: 10px; color: #999; font-family: Helvetica, Arial, sans-serif; font-size: 11px; font-weight: normal; line-height: 1.3; margin: 0; margin-bottom: 0px; padding: 0; text-align: center;">This email was auto-generated from Accuform&#39;s Collect, Quote, &amp; Save web application based on a customer&#8217;s facility safety identification needs.</p>
                              <p class="text-center" style="Margin: 0; Margin-bottom: 10px; color: #999; font-family: Helvetica, Arial, sans-serif; font-size: 11px; font-weight: normal; line-height: 1.3; margin: 0; margin-bottom: 0px; padding: 0; text-align: center;">&#xA9;2017 Accuform Manufacturing, Inc.<br> 16228 Flight Path Drive &#xA0; | &#xA0; Brooksville, FL 34604</p>
                            </th>
                            <th class="expander" style="Margin: 0; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; padding: 0 !important; text-align: left; visibility: hidden; width: 0;"></th>
                          </tr>
                        </table>
                      </th>
                    </tr>
                  </tbody>
                </table>

              </td>
            </tr>
          </tbody>
        </table>
      </center>
    </td>
  </tr>
</table>
</html>
';
$mail->AltBody = '
	Product Type:'.$productType.'
	Environment: '.$environment.'
	Shape: '.$shape.'
	Material: '.$material.'
	Finishing: '.$finishing.'
	Style: '.$style.'
	Size: '.$height.' x '.$width.' &nbsp;'.$uom.'.
	Annual Usage: '.$usage.'
	Per Order Quantity: '.$quantity.'
	Notes: '.$notes.'
';

if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo "Message sent!";
}
