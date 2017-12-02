var currentQuote = "";
var currentAuthor = "";

$(document).ready(function() {
  newQuote();
  
  $("#newQuote").on("click", newQuote);
  
  $("#tweet").on("click", function() {
    var textToTweet = encodeURIComponent(currentQuote +" - " + currentAuthor);
    window.open("http://twitter.com/home?status="+textToTweet,"_blank");
  });
});

function newQuote(){
   $.ajax({
      cache: false,
      url:
        "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",
      success: function(json) {
        currentQuote = decodeEntities(json[0].content);
        currentAuthor = decodeEntities(json[0].title);
        $("#quote").html("<p>"+json[0].content+"</p>");
        $("#author").html("<footer class=\"blockquote-footer\">" + json[0].title + "</footer>");
      }
    });
}

// Decodes html to readable text
var decodeEntities = (function() {
  var element = document.createElement('div');

  function decodeHTMLEntities (str) {
    if(str && typeof str === 'string') {
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = '';
    }
    return str;
  }
  return decodeHTMLEntities;
})();