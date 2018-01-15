$(document).ready(function(){
	stickyNav();
	// and run it again every time you scroll
	$(window).scroll(function() {
		stickyNav();
		activeNav();
	});

	$('#a_pianist, #a_lessen, #a_contact').click(function(){
		var $this = $(this);
		//$('#a_pianist, #a_lessen, #a_contact').not(this).removeClass('active');
		setTimeout(function(){
			$this.addClass('active');
			$this.parent().siblings().children().removeClass('active');
		}, 0);
	});


	/* Active nav code */
			var activeNav = function(){
				var scrollTop = $(window).scrollTop();

				var menuItems = {
					0: 'a_pianist',
					1: 'a_lessen',
					2: 'a_contact'
				}

				var i = 0;

				for (var objects in menuItems) {
					var handler = '#' + menuItems[i].replace("a_", "");
					var pos = $(handler).offset().top;
					if (scrollTop > pos-1) {
						$('#' + menuItems[i-1]).removeClass('active');
						$('#' + menuItems[i]).addClass('active');
						} else {
						$('#' + menuItems[i]).removeClass('active');
					}
					i++;
				}
			}

});
/* Sticky nav code */
		// grab the initial top offset of the navigation
		var stickyNavTop = $('#navbar').offset().top;
		// our function that decides weather the navigation bar should have "fixed" css position or not.
		var stickyNav = function(){
			var scrollTop = $(window).scrollTop(); // our current vertical position from the top
			// if we've scrolled more than the navigation, change its position to fixed to stick to top,
			// otherwise change it back to relative
			if (scrollTop > stickyNavTop) {
					$('#navbar').addClass('sticky');
					$('main').css('margin-top', '0');
			} else {
					$('#navbar').removeClass('sticky');
					$('main').css('margin-top', '-50px');
			}
	};

	/* Send form to email code */

		// Adds an event listener to our form. When the form is submitted, it will send data to our Lambda function, which in turn, will send us an email.
		document.getElementById('serverless-contact-form').addEventListener('submit', sendDataToLambda);

		// Now for the good stuff. This is the function that will send our data to AWS.
		function sendDataToLambda(e) {
			e.preventDefault();

			// Gets the values of each field in our form. This is the data we'll send to our Lambda function.
			var formName = document.querySelector('.form-name').value;
			var formEmail = document.querySelector('.form-email').value;
			var formMessage = document.querySelector('.form-message').value;

			// This is the endpoint we created in our API Gateway. This is where we make our POST request, which calls our Lambda function.
			var endpoint = 'https://a395ho0602.execute-api.eu-west-1.amazonaws.com/prod/ContactFormLambda';

			// Remember those form values we just grabbed? We're going to put them into an object here.
			var body = {
				name: formName,
				email: formEmail,
				message: formMessage
			}

			// Here, we instantiate our Request. This is a special object used by the Fetch API so it knows where to send data, what data to send, and how to send it.
      var lambdaRequest = new Request(endpoint, {
        method: 'POST',
        // Quick note: 'no-cors' mode is for development on localhost only!
        mode: 'no-cors',
        body: JSON.stringify(body)
      });

			// Call the Fetch API to make our request
			fetch(lambdaRequest)
			// This is where you can handle errors. This is just an example, so we won't cover that.
			.then(response => {console.log(response),
				$('#confirmation').fadeIn(500);
				setTimeout(function(){
					document.getElementById('serverless-contact-form').reset();
				}, 1000);

			})
			.catch(err => console.log(err));

			// Clear values from form and confirm sending


		}
