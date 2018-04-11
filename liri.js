import { SSL_OP_SINGLE_DH_USE } from "constants";

require("dotenv").config();

var keys = require("./keys.js")
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//Load the fs package to read and write
var fs = require("fs");
//Grab the request package
var request = require("require");
//Commands
var command = process.argv[2];
//Input
var input = process.argv[3];

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
}

function tweets() {
    var Twitter = require('twitter');
    var params = {screen_name: 'ShopAholic1208', count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

}

function song() {
    spotify
        .request("http://api.spotify.com")
        .then(function(data) {
            console.log(data);
        })
        .catch(function(err) {
            console.error("Error occured: " + err);
        })
}
//Show last 20 tweets and when they were created in bash
//Show artist(s), song's name, preview link of song from Spotify, album
//Title of the movie, Year the movie came out, IMDB rating, Rotten Tomatoes rating, Country produced, Language of the movie, Plot of the movie, actors
