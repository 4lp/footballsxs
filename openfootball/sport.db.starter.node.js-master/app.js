
var express = require('express');
var app = express();
var cors = require('cors')
var sportdb = require( './sportdb' );

app.use(cors())

app.get( '/events', function( req, res, next ) {
  sportdb.Event.findAll( function( err, events ) {
    if( err )
      return next( err );
    
    console.log( events );
    res.json( events );
  });
});

app.get( '/teams', function( req, res, next ) {
  sportdb.Team.findAll( function( err, teams ) {
    if( err )
      return next( err );
    
    console.log( teams );
    res.json( teams );
  });
});

app.get( '/event/:key/teams', function( req, res, next ) {
  // step 1: fetch records

  var eventKey = req.params.key.replace( "_", "/" );   // replace _ with / e.g. 2014_15 => 2014/15

  sportdb.Event.findByKey( eventKey, function( err, event ) {
    if( err )
      return next( err );
    if( event === undefined )
      return next( new Error( "Event Not Found w/ Key >" + eventKey + "<" ) );

    console.log( event );
    sportdb.Team.findByEvent( event, function( err, teams ) {
      if( err )
        return next( err );

      console.log( teams );
      // step 2: map to json structs for serialization/marshalling
      var data = {
        key:   event.key,
        title: event.title,
        teams: teams
      };

      res.json( data );
    });
  });
});

app.get( '/event/:key/games', function( req, res, next ) {
  // step 1: fetch records

  var eventKey = req.params.key.replace( "_", "/" );   // replace _ with / e.g. 2014_15 => 2014/15

  sportdb.Event.findByKey( eventKey, function( err, event ) {
    if( err )
      return next( err );
    if( event === undefined )
      return next( new Error( "Event Not Found w/ Key >" + eventKey + "<" ) );

    console.log( event );
    sportdb.Game.findByEvent( event, function( err, games ) {
      if( err )
        return next( err );

      console.log( games );
      // step 2: map to json structs for serialization/marshalling

      gamesArr = []

      for (var i = 0, len = games.length; i < len; i++) {
        var match = {id: games[i].id, 
                    team1: games[i].team1_id, 
                    team2 :games[i].team2_id,
                    team1score: games[i].score1,
                    team2score: games[i].score2}
        gamesArr.push(match)
        }

      var data = {
        key:   event.key,
        title: event.title,
        games: gamesArr
      };

      res.json( data );
    });
  });
});

module.exports = app;

