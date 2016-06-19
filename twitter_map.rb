require "sinatra"
require "twitter"
require "tilt/erubis"

$client = Twitter::REST::Client.new do |config|
  config.consumer_key        = ENV["TWITTER_CONSUMER_KEY"]
  config.consumer_secret     = ENV["TWITTER_CONSUMER_SECRET"] 
  config.access_token        = ENV["TWITTER_ACCESS_TOKEN"]
  config.access_token_secret = ENV["TWITTER_ACCESS_TOKEN_SECRET"] 
end

get "/nearby.json" do
  content_type :json

  lat = params["lat"] || 37.7821120598956 
  long = params["long"] || -122.400612831116

  tweets = $client.search("", result_type: "recent", geocode: "#{lat},#{long},2mi")
  tweets.to_a.map(&:to_h).to_json
end

get "/" do
  erb :index 
end