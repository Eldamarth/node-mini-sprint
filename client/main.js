$(document).ready(function() {

// get a quote from the server when the page loads and add it to the dom
  getQuote();

// when the user enters data and clicks submit, post the quote to the server
  $('#submit').click((e) => {
    e.preventDefault();
    
    let quote = $('input').val();
    addQuote(quote);
    
  });
  $('#image').click( (e)=> {
    e.preventDefault();

    getQuote();
  })

  function getQuote(){
    //YOUR CODE HERE, Add a GET request
    // AJAX GET request $.get

    fetch('http://localhost:3000/quote')
      .then(data => data.text())
      .then(result => $('#quote').html(result))

    //  $.get("http://localhost:3000/quote", data => {
    //    console.log("DATA: "+data);
    //  }

    //  );
  }

  function addQuote(quote, successCB = null, failureCB = null){
    console.log(quote)
    //YOUR CODE HERE, Add a POST request

    $.post(
      "http://localhost:3000/quote",
      
      quote,

      () => console.log(quote)
    
    )
    .then(data => data.text())
  }
});
