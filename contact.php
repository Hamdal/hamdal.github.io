<?php
    // mail('hameedayomide@gmail.com', 'testing', 'testing email function', 'From:hameedayomide@hotmail.com');
if($_POST){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $subject = $_POST['subject'];

    if ( preg_match( "/[\r\n]/", $name ) || preg_match( "/[\r\n]/", $email ) ) {
        // spam
        $result = array("status" => "0");         
    } else {
        $result = array("status" => "1"); 
        echo json_encode($result);               
        // mail("hameedayomide@gmail.com", "51 Deep comment from" .$email, $message);
        mail('hameedayomide@gmail.com', $subject, $name . ' says ' . $message, 'From:' . $email);
    }
}
?>