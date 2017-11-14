(function() {

  var TwitterStream = require('node-tweet-stream');
  var Twitter = require('twitter');

  var $config = require('./config');

  var _tweetStream = new TwitterStream({
    'consumer_key': $config['consumer_key'],
    'consumer_secret': $config['consumer_secret'],
    'token': $config['access_token_key'],
    'token_secret': $config['access_token_secret']
  });

  var _twitter = new Twitter({
    'consumer_key': $config['consumer_key'],
    'consumer_secret': $config['consumer_secret'],
    'access_token_key':$config['access_token_key'],
    'access_token_secret': $config['access_token_secret']
  });


  _tweetStream.on('tweet', function($$tweet) {

    if($$tweet['user']['screen_name'] == 'soytoTweetBot1') { return; }
    if($$tweet['retweeted_status'] != null) { return; }

    _twitter.post('statuses/update', {
      'status': '@' + $$tweet['user']['screen_name'] + ' catch you!',
      'in_reply_to_status_id': $$tweet['id_str']
    }, function($$error, $$newTweet, $$response) {

      console.log('Retweeted');
      if($$error) {
        console.error($$error);
        return;
      }

    });
  });

  _tweetStream.on('error', $$error => {
    console.error($$error);
  });

  _tweetStream.track('raro');


})();