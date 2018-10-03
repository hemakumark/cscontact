
function initApp(){
    console.log("init");
    
    firebase.auth().onAuthStateChanged(function (user) {

        //Not a valid user. Re-directing to homepage
        if(user){
            toggleRegistrationForm(user);
            validateRegistration();
        } else {
            toggleWelcome();
            
        }
    })
}

function toggleWelcome(){
    var $progress = $(".progress"),
    $welcomeMsg = $(".msg-welcome");
    
    $progress.addClass('d-none');
    $welcomeMsg.removeClass('d-none');

}


function toggleRegistrationForm(usr){
    var $regWrapper = $(".registration-wrapper"),
    usrName = $("#usrName"),
    usrEmail = $("#usrEmail"),
    usrPicture = $("#userImg"),
    $progress = $(".progress"),
    $userInfo = $("#userInfo"),
    $signBtn = $("#quickstart-sign-in");

    $userInfo.toggleClass("d-none");
    $signBtn.text("Sign out");

    usrName.val(usr.displayName);
    usrEmail.val(usr.email);
    usrPicture.attr("src", usr.photoURL);

    $signBtn.text("Sign out");
    $userInfo.removeClass("d-none");
    
    $progress.addClass('d-none');
    $regWrapper.toggleClass("d-none");

}

function toggleSignIn() {
    if (!firebase.auth().currentUser) {
      // [START createprovider]
      var provider = new firebase.auth.GoogleAuthProvider();
      // [END createprovider]
      // [START addscopes]
      //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      // [END addscopes]
      // [START signin]
      firebase.auth().signInWithRedirect(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // [START_EXCLUDE]
        //document.getElementById('quickstart-oauthtoken').textContent = token;
        // [END_EXCLUDE]
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // [START_EXCLUDE]
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('You have already signed up with a different auth provider for that email.');
          // If you are using multiple auth providers on your app you should handle linking
          // the user's accounts here.
        } else {
          console.error(error);
        }
        // [END_EXCLUDE]
      });
      // [END signin]
    } else {
      // [START signout]
      firebase.auth().signOut();
      location.reload();
      // [END signout]
    }
    // [START_EXCLUDE]
    //document.getElementById('quickstart-sign-in').disabled = true;
    // [END_EXCLUDE]
  }
  // [END buttoncallback]

  function validateRegistration(){
      $("#usrRegForm").validate();
  }

//Initializing App
$(function(){
    console.log("initialization");
    initApp();  
    $('#quickstart-sign-in').on('click', function(){
        toggleSignIn();
    })
})