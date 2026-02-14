# Using Scripting Languages to Connect

The API surface of an Ed-Fi ODS / API is platform neutral, meaning that client
systems can be written in a variety of languages.

This documentation primarily covers examples using Java and C# libraries.
However, scripting languages such as Ruby or PHP can also be used. The following code
snippet provides a simple example in PHP showing authentication followed by a
GET to populate a simple list of Student entities.

**PHP Script Example**

```php
<html>
   <head>
      <title>PHP Test</title>
   </head>
<body>

<?php
    // TODO: Replace URL, Client ID, and Client Secret with your values
    $edfiBaseUrl = "https://api.ed-fi.org/v5.4/api"; // NOTE: No trailing slash!
    $edfiClientId = "RvcohKz9zHI4";
    $edfiClientSecret = "E1iEFusaNf81xzCxwHfbolkC";

    function edfiApiGet($token, $edfiResourceUrl, $data){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $edfiResourceUrl . "?" . $data);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            "Authorization: Bearer " . $token,
            "Content-Type: application/json"
        ));
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($ch);
        $jsonResult = json_decode($result, true);
        curl_close($ch);
        return $jsonResult;
    }

    function getEdFiAccessToken($edfiBaseUrl, $edfiClientId, $edfiClientSecret){
        $edfiApiTokenUrl = $edfiBaseUrl . "/oauth/token";
        $paramsToPost = "Client_id=$edfiClientId&Client_secret=$edfiClientSecret&Grant_type=client_credentials";
        
        $curl = curl_init();
        
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_URL, "$edfiApiTokenUrl");
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $paramsToPost);
        
        // Receive server response
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        
        $result = curl_exec($curl);
        
        $jsonResult = json_decode($result);
        
        // Check if the token was obtained successfully
        if(isset($jsonResult->access_token)){
            return (object) array(
                "success" => true,
                "token" => $jsonResult->access_token
            );
        } else {
            return (object) array(
                "success" => false,
                "error" => "Failed to get access token"
            );
        }
        
        curl_close($curl);
    }

    // Get the access token
    $getTokenResult = getEdFiAccessToken($edfiBaseUrl, $edfiClientId, $edfiClientSecret);
    
    // If token was obtained successfully, get students
    if($getTokenResult->success){
        $jsonStudents = edfiApiGet($getTokenResult->token, "$edfiBaseUrl/data/v3/ed-fi/students", "limit=10");

        echo "List of Students: \n\n";
    }
?>

<table>
   <thead>
     <tr>
        <th>FirstName</th>
        <th>Middle</th>
        <th>Last</th>
     </tr>
   </thead>
   <tbody>
    <?php
        if($getTokenResult->success){
            foreach ($jsonStudents as $student => $s) {
                // Output a row
                echo "<tr>";
                echo "<td>" . $s["firstName"] . "</td>";
                echo "<td>" . $s["middleName"] . "</td>";
                echo "<td>" . $s["lastSurname"] . "</td>";
                echo "</tr>";
            }
        } else {
            echo "<tr><td colspan='3'>Error: " . $getTokenResult->error . "</td></tr>";
        }
    ?>
   </tbody>
</table>

</body>
</html>
```
