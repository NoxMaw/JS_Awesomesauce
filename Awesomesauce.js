// Grab the 'loadingDiv' element from the document
var loadingImage = document.getElementById("loadingDiv");

// Wait for the document to be fully loaded
$(document).ready(function() {
    // Get the 'results' element
    let resultsDiv = document.getElementById("results");
    var currentPage = 1;
    let searchDomain = 'neocities';

    // Function to update the content based on search
    function updateContent() {
        // Clear current results and show loading image
        resultsDiv.innerHTML = "";
        loadingImage.style.display = "inline";

        // Trim and get the value of the 'searchBox'
        let searchTerm = $("#searchBox").val().trim();

        // If the search term is empty, pick a random one from the array
        if (searchTerm === "") {
            var randomTerms = [
                "chill", "vibe", "hobby", "throwback", "playlist",
                "anime", "cat", "dog", "comfy", "cozy", "weekend",
                "game", "art", "sing", "dream", "cool", "awesome",
                "fun", "fantastic", "amazing", "excellent", "enjoyable",
                "epic", "den", "happy", "stuff", "cute", "forum", "story",
                "happy", "nice", "manga", "flower", "bloom", "gif",
                "graphics", "wallpaper"
            ];
            searchTerm = randomTerms[Math.floor(Math.random() * randomTerms.length)].trim();
        }

        document.getElementById('searchDomainDropdown').addEventListener('change', function() {
            searchDomain = this.value;
            updateContent();
        });

        $.getJSON("https://corsproxy.io/?https://wiby.me/json/?q=site:" + searchDomain + '+' + searchTerm + "&p=" + currentPage, function(data) {
            if (searchDomain === 'neocities') {
                var template = Handlebars.compile($("#result-template").html());
            } else if ((searchDomain === 'nekoweb')) {
                var template = Handlebars.compile($("#nekoweb-template").html());
            }
            $("#results").html(template(data));
        });

    }

    // Function to reset the search and update content
    function resetSearchAndUpdate() {
        currentPage = 1;
        updateContent();
    }

    // Register a helper for Handlebars to trim '.neocities.org' from URLs
    Handlebars.registerHelper("trimNeocities", function(url) {
        let domainIndex = url.indexOf(".neocities.org");
        if (domainIndex !== -1) {
            url = url.slice(0, domainIndex);
        }
        if (url.startsWith("http://")) {
            url = url.slice(7);
        }
        if (url.startsWith("https://")) {
            url = url.slice(8);
        }
        return url;
    });

    // Event binding for the search box (enter key triggers search)
    $("#searchBox").keyup(function(event) {
        if (event.keyCode === 13) {
            resetSearchAndUpdate();
        }
    });

    // Event binding for the search button
    $("#searchButton").on("click touchstart", resetSearchAndUpdate);

    // Event bindings for next and previous buttons
    $("#Next").on("click touchstart", function() {
        currentPage++;
        updateContent();
    });
    $("#Prev").on("click touchstart", function() {
        if (currentPage > 1) {
            currentPage--;
            updateContent();
        }
    });

    // Register a helper to hide the loading image after content is rendered
    Handlebars.registerHelper("afterRender", function() {
        loadingImage.style.display = "none";
    });

    // Initial content update call
    updateContent();
});
