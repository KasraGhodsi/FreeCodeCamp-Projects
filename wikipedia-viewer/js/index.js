var centered = true;

$(document).ready(function() {
  $("#searchText").focus();
  $("#searchForm").submit(loadResults);
  $("#randButton").click(function() {
    window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
  });
});

function loadResults() {
  event.preventDefault();
  var searchText = $("#searchText").val();
  $("#searchText").val("");
  
  $("#content").empty();
  if (centered === true) {
    uncenter();
  }
  var jsonURL =
    "https://en.wikipedia.org/w/api.php?format=json&formatversion=2&action=query&list=search&srsearch=" +
    searchText +
    "&callback=?";

  $.getJSON(jsonURL, function(json) {
    if (json.query.search.length === 0) {
      $("#content").append(
        "<p style='text-align:center'> <b>No search results found.</b></p>"
      );
    } else {
      for (var i = 0; i < json.query.search.length; i++) {
        var onClick =
          "onclick=window.open('https://en.wikipedia.org/?curid=" +
          json.query.search[i].pageid +
          "')";
        $("#content").append(
          "<div class='searchResults'" + onClick + " id='link" + i + "'></div>"
        );
        $("#link" + i).append("<h5>" + json.query.search[i].title + "</h5>");
        $("#link" + i).append(
          "<p>" + json.query.search[i].snippet + ". . . </p></div>"
        );
      }
    }
  });
}

function uncenter() {
  $("#heading").css({ "margin-top": "10px", "margin-bottom": "0" });
  $("#searchButton").appendTo("#inputRow");
  $("#randButton").appendTo("#inputRow");
  $("#inputRow").css("margin-top", "20px");
  $("#searchButton").css({ "margin-left": "5px", "margin-right": "5px" });
  $("body").css({ position: "static", top: "auto", transform: "none" });

  centered = false;
}