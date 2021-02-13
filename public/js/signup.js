
import '@babel/polyfill';
import axios from "axios";
import request from "request-promise";


let id ='';
$(document).on('click','#submitdetails',function(){
    id = $(this).data("organid");
});

$(document).on('click','#mainIdBtn', async function() {
    const bloodType = $("#bloodType").val();
    const proteinOne = $("#proteinOne").val();
    const proteinTwo = $("#proteinTwo").val();
    const doctor = $("#doctor").val();
    var organTestInfo ={
        organId: id,
        bloodType:bloodType,
        proteinOne: proteinOne,
        proteinTwo: proteinTwo,
        doctor: doctor
    };

    try {
        const result = await axios({
            method: 'POST',
            url: 'http://localhost:8000/hospital/submitmedicaldetails',
            data: {organTestInfo},
            json: true,
            headers: {
                "Content-Type":"application/json"
            }
        });

    } catch (error) {
        alert(error);
    }

});

$(document).on("click","#testinfo",function(){
    const index = $(this).data("index");
    if($(`#test-info${index}`).css("display") === "none")
        $(`#test-info${index}`).slideDown();
    else
        $(`#test-info${index}`).slideUp();
    
});

$(document).on("click","#recieverdetails",function(){
    const index = $(this).data("index");
    if($(`#reciever-details${index}`).css("display") === "none")
        $(`#reciever-details${index}`).slideDown();
    else
        $(`#reciever-details${index}`).slideUp();
});

$(document).on("click","#allrecieverdetails",function(){
    const index = $(this).data("index");
    if($(`#reciever-details${index}`).css("display") === "none")
        $(`#reciever-details${index}`).slideDown();
    else
        $(`#reciever-details${index}`).slideUp();
});

function validate()
{
    var fname=$("#fname").val();
    var lname=$("#lname").val();
    var email=$("#email").val();
    var password=$("#password").val();
    var cpassword=$("#cpassword").val();
    var gender=$('input[id="gender"]:checked').val();
    var dob=$('#dob').val();
    var address=$('#address').val();
    var contactNo=$('#contact').val();

    if(fname=="")
    {
        $("#ffname").text("Please enter first name");
        return false;
    }
    if(lname=="")
    {
        $("#llname").text("Please enter last name");
    }
    if(!gender)
    {
        $("#ggender").text("Please enter gender");
    }
    if(dob=="")
    {
        $('#ddob').text("Please enter dob");
    }
    if(contactNo=="")
    {
        $("#ccontact").text("Please enter contact number");
    }if(address=="")
    {
        $("#aadress").text("Please enter address");
    }
    if(email=="")
    {
        $("#eemail").text("Please enter email");
    }
     if(password=="")
    {
        $("#ppassword").text("Please enter password");
    }
     if(cpassword=="")
    {
        $("#ccpassword").text("Please enter password");
    }     


$("#fname").keypress(function () {
    alert();
$("#ffname").text("");
});

$("#lname").keypress(function () {
$("#llname").text("");
});

$("#email").keypress(function () {
$("#eemail").text("");
});

$("#password").keypress(function () {
if(password=="")
$("#ppassword").text("");
});

$("#cpassword").keypress(function () {
$("#ccpassword").text("");
});

$(document).on('keyup',"#password" , function () {
setTimeout(function () {
    var tpassword=$("#password").val();
    if(tpassword.length<7)
    {
        $("#ppassword").text("Password Weak");
        $("#ppassword").css("color","red");
    }
    else
    {
        $("#ppassword").text("Password Okay!");
        $("#ppassword").css("color","green");
    }
},2000);
var password=$("#password").val();
     var cpassword=$("#cpassword").val();
     if(password!=cpassword)
     {
        $("#ccpassword").text("Password donot match.");
         $("#ccpassword").css("color","red");
     }
     else
     {
        $("#ccpassword").text("Password matched.");
        $("#ccpassword").css("color","green");
     }

var password=$("#password").val();
var cpassword=$("#cpassword").val();
     if(password!=cpassword && cpassword.length!=0)
     {
        $("#ccpassword").text("Password donot match.");
         $("#ccpassword").css("color","red");
     }
     else if(cpassword.length!=0)
     {
        $("#ccpassword").text("Password matched.");
        $("#ccpassword").css("color","green");
     }
});

$("#cpassword").keyup(function () {
     var password=$("#password").val();
     var cpassword=$("#cpassword").val();
     if(password!=cpassword && cpassword.length!=0)
     {
        $("#ccpassword").text("Password donot match.");
         $("#ccpassword").css("color","red");
     }
     else if(cpassword.length!=0)
     {
        $("#ccpassword").text("Password matched.");
        $("#ccpassword").css("color","green");
     }
});

}