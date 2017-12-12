// The client ID is obtained from the Google Developers window.console
// at https://cloud.google.com/window.console.
// If you run this code from a server other than http://localhost,
// you need to register your own client ID.
var OAUTH2_CLIENT_ID = '621217557041-0i874313s9bi94jjh3dej8reva5ahdto.apps.googleusercontent.com';
var OAUTH2_SCOPES = [
'https://www.googleapis.com/auth/youtube'

];


// Upon loading, the Google APIs JS client automatically invokes this callback.
googleApiClientReady = function() {

	window.console.log("HERE WE GO");
  gapi.auth.init(function() {
    window.setTimeout(checkAuth, 1);
  });
}

// Attempt the immediate OAuth 2.0 client flow as soon as the page loads.
// If the currently logged-in Google Account has previously authorized
// the client specified as the OAUTH2_CLIENT_ID, then the authorization
// succeeds with no user intervention. Otherwise, it fails and the
// user interface that prompts for authorization needs to display.
function checkAuth() {
  window.console.log("Check auth");
  gapi.auth.authorize({
    client_id: OAUTH2_CLIENT_ID,
    scope: OAUTH2_SCOPES,
    immediate: false
  }, handleAuthResult);
  window.console.log("After auth");
}

// Handle the result of a gapi.auth.authorize() call.
function handleAuthResult(authResult) {
	window.console.log("Handle auth result");
  if (authResult && !authResult.error) {
	  
	  window.console.log("Here in the if statement!");
    // Authorization was successful. Hide authorization prompts and show
    // content that should be visible after authorization succeeds.
    $('.pre-auth').hide();
    $('.post-auth').show();
    loadAPIClientInterfaces();
  } else {
	  
	  window.console.log("Here in the else statement!");
    // Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
    // client flow. The current function is called when that flow completes.
    $('#login-link').click(function() {
      gapi.auth.authorize({
        client_id: OAUTH2_CLIENT_ID,
        scope: OAUTH2_SCOPES,
        immediate: false
        }, handleAuthResult);
    });
  }
}

// Load the client interfaces for the YouTube Analytics and Data APIs, which
// are required to use the Google APIs JS client. More info is available at
// https://developers.google.com/api-client-library/javascript/dev/dev_jscript#loading-the-client-library-and-the-api
function loadAPIClientInterfaces() {
	window.console.log("Load API client interfaces");
  gapi.client.load('youtube', 'v3', function() {
    handleAPILoaded();
  });
}