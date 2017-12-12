
// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
  window.console.log("hey boy");
}

// Search for a specified string.

var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	  
var player;

function search(obj) {
	
	
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
			part: "snippet",
            type: "video",
            q: q,
            maxResults: 1,
            order: "relevance",
  });
  
  window.console.log("hey girl");
  console.log(q);

  request.execute(function(response) {
	var results = response.result;
    //var str = JSON.stringify(results);
    //$('#search-container').html('<pre>' + str + '</pre>');
	
	
	
	player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: results.items[0].id.videoId,
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
	console.log("old Search " + results.items[0].id.videoId);
	nextButton(results);
	
	
  });
  
  
  
}	

	function newSearch(){
			
			var q = $('#query').val();
		
			var request = gapi.client.youtube.search.list({
			part: "snippet",
			type: "video",
			q: q,
			maxResults: 1,
			order: "relevance",
			});
			
			
			request.execute(function(response) {
				
				var results = response.result;
				
				player.videoId = results.items[0].id.videoId;
				
				
				console.log("newSearch " + player.videoId);
				console.log("newSearch " + results.items[0].id.videoId);
			
			});
		
	}

	function nextButton(data) {
		
		console.log("nextButton");
        $('#next').off('click').on('click', function(e) {
         
		var q = $('#query').val();
		
		var request = gapi.client.youtube.search.list({
		part: "snippet",
        type: "video",
        q: q,
        maxResults: 1,
        order: "relevance",
		pageToken: data.nextPageToken,
		});
		
		
		request.execute(function(response) {
			
		var results = response.result;
		
		player.videoId = results.items[0].id.videoId;
		
		
		
		
		player.loadVideoById(player.videoId);
		
		console.log(player.videoId);
		console.log(results.items[0].id.videoId);
			
		
		nextButton(results);
		prevButton(results);
		
		});
		
		  
		  
        });
      };
	  
	  function prevButton(data) {
		
		console.log("prevButton");
        $('#prev').off('click').on('click', function(e) {
         
		var q = $('#query').val();
		
		var request = gapi.client.youtube.search.list({
		part: "snippet",
        type: "video",
        q: q,
        maxResults: 1,
        order: "relevance",
		pageToken: data.prevPageToken,
		});
		
		
		request.execute(function(response) {
			
		var results = response.result;
		
		player.videoId = results.items[0].id.videoId;
		
		player.loadVideoById(player.videoId);
		
		console.log(player.videoId);
		console.log(results.items[0].id.videoId);
			
		
		prevButton(results);
		nextButton(results);
		
		});
		
		  
		  
        });
      };


      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
		
          done = true;
        }
		
      }
      function stopVideo() {
        player.stopVideo();
      }
	  
	 



      
 

   
