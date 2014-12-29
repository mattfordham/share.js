# Share.js

Social sharing made a little simpler

## Usage

1. Require Share.js as CommonJS, AMD, or global module. Also, make sure jQuery is around.
2. Add the appropriate data attributes to your share links to get things going (`data-share-facebook`, `data-share-twitter`, `data-share-google-plus`, `data-share-pinterest`, `data-share-linkedin`, `data-share-reddit`)
3. Add some more data attributes to specifiy what gets shared (see below)
4. Initialize the library: `new Share()`

## Data Attributes 

#### Facebook (simple) 
- `data-share-url` The URL to share  

#### Twitter 
- `data-share-url` The URL to share  
- `data-share-text` Text to share 

#### Google+ 
- `data-share-url` The URL to share  

#### Pinterest
- `data-share-url` The URL to share  
- `data-share-text` Text to share  
- `data-share-image` Absolute URL to image to share  

#### Reddit 
- `data-share-url` The URL to share  

#### LinkedIn 
- `data-share-title` Title to share 
- `data-share-url` The URL to share
- `data-share-text` Text to share 

#### Facebook (advanced)
- `data-share-url` The URL to share  
- `data-share-title` Title to use in share dialog  
- `data-share-caption` Caption to use in share dialog   
- `data-share-text` Description to use in share dialog   
- `data-share-image` Absolute URL to image to share

## Advanced Usage

### onShare Callback 

An `onShare` callback can be registered within settings if you'd like to fire other actions when a share link is clicked, such as analytics tracking. 

**Important note: ** only shares via the Facebook API will trigger the `onShare` callback upon actual successful shares. In all other cases, the callback will fire when a share link is clicked.

```
var share = new Share({
  onShare: function(platform){
    console.log(platform);
  }
})
```

### Share via Facebook API

By default, the library will use the Facebook sharer URL (https://www.facebook.com/sharer/sharer.php?u=http://www.github.com). If you'd like more options, however, it can use the Facebook API's share dialog. To use this, initialize the library with the following options:

```
var share = new Share({
  facebookAppID: YOUR_APP_ID, 
  facebookShareViaAPI: true
})
```

## To-do
- Track actual sharing via Twitter and Google+ using platform js libraries
