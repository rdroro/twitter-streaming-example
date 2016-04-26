# twitter-streaming-example

An example of using Twitter Streaming API to save tweets in MongoDB or just to play with

## Get started without Mongdb

If you just want to test the Twitter Streaming API, you can build the application with docker and run the container manually.

First, edit the config file locate in `config/twitter-config.js` to :

* Fill the authentication information
* Configure the parameters to pass to Twitter Streaming API - https://dev.twitter.com/streaming/reference/post/statuses/filter

### Authentication information

You can write your information directly in `config/twitter-config.js` or set it via ENV start.

    auth: {
        consumer_key: process.env.TWITTER_CONSUMER_KEY || 'OR_YOUR_KEY_HERE',
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET || 'OR_YOUR_KEY_HERE',
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY || 'OR_YOUR_KEY_HERE',
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || 'OR_YOUR_KEY_HERE'
    }

### Configure Twitter Streaming API parameters

Just read the Twitter official documentation https://dev.twitter.com/streaming/reference/post/statuses/filter and write your custom parameters in :

    filters: {
        track: 'android'
    }

### Run the application

Build the container from the Dockerfile, for example :

    $ docker build -t twitter-streaming .

You can now run it in the interactive mode :

    $ docker run -it --rm --name twitter-streaming-example twitter-streaming bash
    $ node index.js

If you want to change the code without build the container again, you can mount the working directory as the volume :

    $ docker run -it --rm --name twitter-streaming-example -v $(pwd):/opt/app twitter-streaming bash
    // Change some stuff in index.js or config/twitter-config.js
    $ node index.js


## Get Started with MongoDB

@TODO

* docker run -d --name mongo-tweets mongo
* docker run -it --rm --name twitter-streaming-example -v $(pwd):/opt/app --link mongo-tweets:mongo twitter-streaming bash
* run docker with --link mongo
