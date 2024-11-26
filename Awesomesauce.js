$(document).ready(function() {
    var currentPage = 1;

    function performSearch() {
        let query = $("#searchBox").val().trim();
        if (query === "") {
            var defaultQueries = ["cool", "rad", "awesome", "fun", "fantastic", "amazing", "excellent", "groovy", "fabulous", "enjoyable", "epic", "something", "den", "happy", "stuff", "cute"];
            query = defaultQueries[Math.floor(Math.random() * defaultQueries.length)].trim();
        }

        $.getJSON("https://corsproxy.io/?http://wiby.me/json/?q=site:neocities.org+" + query + "&p=" + currentPage, function(data) {
            var template = Handlebars.compile($("#result-template").html());
            $("#results").html(template(data));
        });
    }

    function onNextButtonClick() {
        currentPage++;
        performSearch();
    }

    function onPrevButtonClick() {
        if (currentPage > 1) {
            currentPage--;
            performSearch();
        }
    }

    function onSearchButtonClick() {
        currentPage = 1;
        performSearch();
    }

    $("#searchBox").keyup(function(event) {
        if (event.keyCode === 13) {
            onSearchButtonClick();
        }
    });

    $("#searchButton").on('click touchstart', onSearchButtonClick);

    $("#Next").on('click touchstart', onNextButtonClick);

    $("#Prev").on('click touchstart', onPrevButtonClick);

    performSearch();
});