var express = require('express');
var app = express();

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();


app.set('port', process.env.PORT || 8080);

app.use(express.static(__dirname));

//----------------------------------------------------------------------------------------------------------------------------
// Instantiate Node.js file services and use them to do the following:
var nodeJsFileServices = require("fs");

// "Include" the code in these copymembers by way of doing a synchronous read of the file contents and
// "evaluating" them, thus including their bodies within the body of this script.

// NOTE: "require()" is not used because this is an existing JavaScript application which employs global
// functions combined on an HTML page:

eval(nodeJsFileServices.readFileSync("StandardStreams.js", "utf8"));
eval(nodeJsFileServices.readFileSync("UnicodeASCII.js", "utf8"));
eval(nodeJsFileServices.readFileSync("WikipediaDiscography.js", "utf8"));
eval(nodeJsFileServices.readFileSync("WorkingWebBrowserServices.js", "utf8"));

eval(nodeJsFileServices.readFileSync("hardcoded_main.js", "utf8"));
eval(nodeJsFileServices.readFileSync("hardcoded_studio_albums.js", "utf8"));
eval(nodeJsFileServices.readFileSync("hardcoded_live_albums.js", "utf8"));

eval(nodeJsFileServices.readFileSync("MusicalArtist.js", "utf8"));
eval(nodeJsFileServices.readFileSync("YoutubeAlbum.js", "utf8"));

// NOTE: This is for error handling only.  When there is no GUI, as in our usage here,
// all errors are routed to the console:
var standard_streams_services = new standard_streams;

// Set this style (dynamically) of one of the "standard streams" uniquely for this
// application.   We do this because it is a general-purpose, resusable (copymember)
// field which doesn't, and shouldn't, have a single style.

var youtube_album_services;

//oooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
// TO DEBUG, COMMENT OUT:
var node_js_response;

app.get(
    '/',
    function (request, response) {

        // Prevent timeouts:
        request.setTimeout(600000) // 10 minutes
        response.setTimeout(600000); // 10 minutes

        // Save the response as it will be used later in write_output(), below:
        node_js_response = response;
//oooooooooooooooooooooooooooooooooooooooooooooooooooooooooo

        //oooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
        // Get the URL arguments:
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // TO DEBUG, COMMENT OUT:
        var url_search = require("url").parse(request.url).search;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // TO DEBUG, UNCOMMENT ONE:
        //var url_search = "?artist=ABBA";
        //var url_search = "?offline=file_input_demo.txt";
        //oooooooooooooooooooooooooooooooooooooooooooooooooooooooooo

        // Since this app has no GUI, it relies on the URL for arguments:
        if (url_search == null) {

            node_js_response.write("<br>no URL arguments provided");

            //ooooooooooooooooooooooooooo
            // TO DEBUG, COMMENT OUT:
            // End the process:
            node_js_response.end();
            //ooooooooooooooooooooooooooo

        } else {

            // Initialize YouTube Album services:
            youtube_album_services = new youtube_album(
                true,               // online
                "",                 // offline_discographies
                write_output,       // write_output
                //oooooooooooooooooooooooooooooooooooooooo
                // TO DEBUG, COMMENT OUT:
                node_js_response    // node_js_response
                //oooooooooooooooooooooooooooooooooooooooo
                // TO DEBUG, UNCOMMENT:
                //""
                //oooooooooooooooooooooooooooooooooooooooo
            );

            // NOTE: The complicated module-invocation process across four applications, WD,
            // YA, WD Node and YA Node is described in document:
            // C:\a_dev\NodeJS\youtubealbum\documents\WD & YA high-level calls.txt

            // Initialize YouTube Album startup services:
            var youtube_album_startup_services = new youtube_album_startup();

            // NOTE: This object will retain information about the URL arguments as passed
            // for subsequent reference.  It will also kick off the entire job-stream:
            youtube_album_startup_services.youtube_album_argument(url_search);

            youtube_album_startup_services.get_albums_core(
                "HTML",
                youtube_album_startup_services.artist_array,

                youtube_album_startup_services.studio_selected,
                youtube_album_startup_services.concert_selected,
                youtube_album_startup_services.greatest_hits_selected
            );

        }
        //ooooooooooooooooooooooooooooooo
        // TO DEBUG, COMMENT OUT:
    }
);
//ooooooooooooooooooooooooooooooooooooooo

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

//server.timeout = 600000; // 10 minutes in milliseconds

// This function is called by youtube_album_services.level_2_get_albums_artist_attempt():
function write_output(artists_albums_string) {

    // Create and write the HTML page:
    var html_page =

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // Head:
        "<!DOCTYPE html><html><head><title>YouTube Album Finder</title>" +
        "<script>" +
        nodeJsFileServices.readFileSync("WorkingWebBrowserServices.js", "utf8") +
        "</script>" +
        "<style>" +
        nodeJsFileServices.readFileSync("Site.css", "utf8") +
        "</style>" +
        "</head>" +

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // Body:
        "<body>" +
        '<div class="BannerDiv"><br><table><tbody><tr>' +
        '<td class="BannerTD"><img src="youtube.png" alt="YouTube Logo"></td>' +
        '<td class="BannerTD BannerText">Album Finder</td></tr></tbody></table></div><br>' +
        '<button class="button" onClick="open_popup_window(\'http://www.workingweb.info/YoutubeAlbumNodeJsAbout\', true, \'no\', \'no\', 505, 640);">About</button><br><br>' +
        '<div class="newspaper">' + artists_albums_string + '</div>' +
        "</body></html>";
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    //ooooooooooooooooooooooooooooooooo
    // TO DEBUG, COMMENT OUT:

    node_js_response.write(html_page);

    // End the process:
    node_js_response.end();
    //ooooooooooooooooooooooooooooooooo

}