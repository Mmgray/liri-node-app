// import { SSL_OP_SINGLE_DH_USE } from "constants";

require("dotenv").config();

//Import Twitter NPM
var Twitter = require("twitter");

//Import spotify NPM
var Spotify = require("node-spotify-api");

//Grab the request package
var request = require("request");

//API keys
var keys = require("./keys.js");

//Initialize spotify API
var spotify = new Spotify(keys.spotify);


//Load the fs package to read and write
var fs = require("fs");

//Commands
var command = process.argv[2];
//Input
// var input = process.argv[3];

switch(command) {
    case "my-tweets":
        tweets();
        break;

    case "spotify-this-song":
        song();
        break;

    case "movie-this":
        movie();
        break;
    
    case "do-what-it-says":
        random();
        break;    
};
//Show last 20 tweets and when they were created in bash
function tweets() {
    var client = new Twitter(keys.twitter);

    var params = {
        screen_name: "ShopAholic1208",
        count: 20
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});
};

//Show artist(s), song's name, preview link of song from Spotify, album
function song() {
    var nodeArgs = process.argv;
    var songName = "";

    for (var i = 3; i < nodeArgs.length; i++) {
        songName = nodeArgs[i];
        if (i > 2 && i < nodeArgs.length) {
            songName = songName + "+" + nodeArgs[i];
        }else if (songName === undefined){
            songName = "The Sign";   
        } 
        else{
             songName += nodeArgs[i];
    }
    }
    
    spotify
        .search({
            type: "track",
            query: songName,
            
        },
        function(err, data) {
            if(err) {
              return console.log("Error occurred: " + err);
            }
        
            console.log("artist(s): " + data.artists);
            console.log("song name: " + data.song.name);
            console.log("Preview song: " + data.preview_url);
            console.log("album: " + data.album.name)
        }
        )   
    }

        
    



//Title of the movie, Year the movie came out, IMDB rating, Rotten Tomatoes rating, Country produced, Language of the movie, Plot of the movie, actors
function movie() {
    var nodeArgs = process.argv;

    var movieName = "";

    for (var i = 3; i < nodeArgs.length; i++) {
        
        if (i > 2 && i < nodeArgs.length) {
        movieName = movieName + "+" + nodeArgs[i];
    }else {
        movieName += nodeArgs[i];    
        }
    }
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    console.log("Title of the movie: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings.value);
    console.log("Country Produced: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
  }
});
}

function random(){
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }
      

        var dataArr = data.split(",");

        console.log(dataArr);
      
      });
    }
