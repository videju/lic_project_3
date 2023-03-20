
const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})







const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})





if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})


  
  //login_section code

  const loginForm = document.querySelector("form.login");
  const signupForm = document.querySelector("form.signup");
  const loginBtn = document.querySelector("label.login");
  const signupBtn = document.querySelector("label.signup");
  const signupLink = document.querySelector(".signup-link a");
  
  
  loginBtn.onclick = (()=>{
	loginForm.style.marginLeft = "0%"
  })
 
  
 
  //
//   Your web app's Firebase configuration
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCzUeMfhReZ9dEoPL6VpsKd8lwclEjl4fY",
  authDomain: "lic-project1.firebaseapp.com",
  projectId: "lic-project1",
  storageBucket: "lic-project1.appspot.com",
  messagingSenderId: "484390798910",
  appId: "1:484390798910:web:f0dca562c5be1234e9736f"
  };

// // // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
  const auth = firebase.auth()
  const database = firebase.database()
  //set up your register function
  function register(){
	 email = document.getElementById('email').value
	 password = document.getElementById("password").value
	 full_name = document.getElementById("full_name").value
	 policy_prize = document.getElementById("policy_prize").value
	 policy_name= document.getElementById("policy_name").value
	
    
   
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
  // Don't continue running the code
  }
  if(validate_field(full_name) == false || validate_field(policy_prize) == false ||validate_field(policy_name) == false){
  alert('One or More Extra Field is Outta Line?? ')
   
} 
//move with Auth
auth.createUserWithEmailAndPassword(email,password)
.then(function(){
//decalre user variable
var user = auth.currentUser
//add this user t ofirebase database

//create user data
var database_ref = database.ref()


//add this user to fireabse
var user_data = {
	email: email,
	full_name: full_name,
	password :  password,
	policy_prize: policy_prize,
    policy_name:policy_name,
	last_login: Date.now()

}

database_ref.child('user/' + user.uid).set(user_data)





alert('User Created')
})
.catch(function(error){
 var error_code = error.code
 var error_message = error.message

 alert(error_message)
})
  }
  function validate_email(email) {
	expression = /^[^@]+@\w+(\.\w+)+\w$/
	if ( expression.test(email)==true){
		//email is good
		return true
	}else{
        //email is not good
		return false
	}
  }
  function validate_password(password){
	if(password < 6){
		return false
	}else{
		return true
	}
  }
  function validate_field(field) {
	if (field == null) {
	  return false
	}
  
	if (field.length <= 0) {
	  return false
	} else {
	  return true
	}
  }
//   var  LICRef = firebase.database().ref("players/");

//   playersRef.on("child_added", function(data, prevChildKey) {
// 	 var newPlayer = data.val();
// 	 console.log("name: " + newPlayer.name);
// 	 console.log("age: " + newPlayer.age);
// 	 console.log("number: " + newPlayer.number);
// 	 console.log("Previous Player: " + prevChildKey);
//   });
var provider = new firebase.auth.GoogleAuthProvider();

function googleSignin() {
   firebase.auth()
   
   .signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
		
      console.log(token)
      console.log(user)
   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
		
      console.log(error.code)
      console.log(error.message)
   });
}

function googleSignout() {
   firebase.auth().signOut()
	
   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')  
   });
}