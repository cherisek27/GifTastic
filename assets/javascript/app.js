var animals = ['dog', 'cat', 'monkey', 'giraffee', 'lion','elephant', 'kangaroo', 'panda', 'polar bear', 'bald eagle', 'owl', 'cheetah', 'rabbit', 'dolphin']; 
	 
	function displayanimalInfo(){
		var animal = $(this).attr('data-name');
	
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
		$.ajax({url: queryURL, method: 'GET'})
	     .done(function(response) { 
	     	console.log(response)
	         var results = response.data;
	         for(var i=0; i < results.length; i++){
	            if (results[i].rating == "r" || results[i].rating == "pg")
	           { 
	       		} else {
                 console.log(response)
                 var animalDiv = $('<div class="animal">');
                 var animalDiv = $('<div>').attr('class','animal');
                 var rating = results[i].rating;
                 var p = $('<p>').text( "Rating: " + rating);
                 var animalImage = $('<img/>');
                
                 animalImage.addClass("gif")
                 animalImage.attr('src', results[i].images.fixed_height_still.url);
                 animalImage.attr('data-still', results[i].images.fixed_height_still.url) 
                 animalImage.attr('data-animate', results[i].images.fixed_height.url) 
                 .attr('data-state', 'still');
                 animalDiv.append(p)
                 animalDiv.append(animalImage)
                 $("#animalsView").prepend(animalDiv);               
                }
             } 
             $(".gif").on("click", function(){
            
             var state = $(this).attr("data-state"); 
             console.log(this);

             if (state === "still") {
                    
             $(this).attr("src", $(this).data("data-animate"));
                    
             $(this).attr("data-state", "animate");

             } else {
                            
            $(this).attr("src", $(this).data("still"));
                    
            $(this).attr("data-state", "still");
             }    
        });     
    } 


	function renderButtons(){ 
		
		$('#buttonsView').empty();
		
		for (var i=0; i < animals.length; i++){
			
		    var a = $('<button>')  
		    a.addClass('animal');  
		    a.attr('data-name', animals[i]); 
		    a.text(animals[i]); 
		    $('#buttonsView').append(a); 
		}
	}
	
	$('#addanimal').on('click', function(){
		
		var animal = $('#animal-input').val().trim();
		
		animals.push(animal);
		
		
		renderButtons();
		
		return false;
	}) 
	
	$(document).on('click', '.animal', displayanimalInfo);
	
	renderButtons();