var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'cVRRthZCm6lPw5FT4AyQZ6K7c',
  consumer_secret: 'gNNYbdaOCU4GOey7QnFzywCr8HRfl1vTIbsl00xg5DfFoeWBDr',
  access_token_key: '1379595710-unOGEMjN5P3DMQMFNEhtuHDlZb8EmHgcoUG02iO',
  access_token_secret: 'pF35xkSPTVRJSoO1BdLfjuroTOmCScbvRl51GN1e7LfR4'
});
 

var params = {screen_name: 'jkup'};
var one_way_following = [];
var users_to_display = [];

client.get('followers/ids', params, function(error, followers_ids, response) {
    if (error) throw error;
    var followers = followers_ids.ids;
  client.get('friends/ids', params, function(error, following_ids, response){
    if (error) throw error;
    var following = following_ids.ids;

    following.forEach(function(user){
        if(followers.indexOf(user) === -1) {
            one_way_following.push(user);
        };
    });

    one_way_following = one_way_following.slice(0,99);
    var one_way_following_string = one_way_following.join();
    client.get('users/lookup', {user_id: one_way_following_string}, function(error, users_result){
        if(error) console.log(error);
        users_result.forEach(function(user) {
            var userObj = {
                name: user.name,
                screen_name: user.screen_name
            };
            users_to_display.push(userObj);
            console.log(users_to_display);
        });
    });
  });
});