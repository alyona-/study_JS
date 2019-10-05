<?php

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, 'http://crm1-lanatm:9090/WebApplication8/HelloServlet');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$out = curl_exec($curl);
curl_close($curl);
header("Content-type: text/plain");
header('Content-disposition: attachment;filename='.$out);
echo $out;

?>