<?php 

$conn=new mysqli("localhost","root","","vuephpcrud");
if($conn->connect_error)
{
	die("can not connect to database");
}


$res=array('error'=>false);
$action='read';


if(isset($_GET['action']))
{
	$action=$_GET['action'];

}


if($action=='read')
{


	$result=$conn->query("SELECT * FROM users ");



	$users=array();
	while($row = $result->fetch_assoc())
	{
		array_push($users,$row);


	}




    $res['users']=$users;
    
}






if($action=='create')
{
      $username=$_POST['username'];
      $email=$_POST['email'];
      $mobile=$_POST['mobile'];

	$insert=$conn->query("INSERT INTO users (username, email, mobile) VALUES ('$username', '$email', '$mobile') ");


  if($insert)
  {

  	$res['message']="Data inserted successfully";
  }
  else
  {
  	$res['error']=true;
  	$res['message']="Could not inserted user";
  }
 
  
}



if($action=='update')

{    


      $id=$_POST['id'];
      $username=$_POST['username'];
      $email=$_POST['email'];
      $mobile=$_POST['mobile'];

	$update=$conn->query("UPDATE  users SET username='$username', email='$email', mobile='$mobile' WHERE id=$id");

  



  if($update)
  {

  	$res['message']="User deleted successfully";
  }
  else
  {
  	$res['error']=true;
  	$res['message']="Could not Updated user";
  }

  
}

if($action=='delete')
{   
 $id=$_POST['id'];

  $delete=$conn->query("DELETE FROM  users  WHERE id=$id");


  if($delete)
  {

    $res['message']="User deleted successfully";
  }
  else
  {
    $res['error']=true;
    $res['message']="Could not deleted user";
  }
  
}





header("Content-type:application/json");


echo json_encode($res);
die();

$conn->close();


?>