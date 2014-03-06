## Share ##
### Social sharing made a little simpler. ###

1. Include share.js
2. Add these data attributes to your share links: `data-share-facebook`, `data-share-twitter`, `data-share-pinterest`
3. Initialize the library: `Share.init()`
4. Add some more data attributes to specifiy what gets shared (see below)

### Data Attributes ###

#### Facebook (simple) ####
`data-share-link` The URL to share  

#### Facebook (advanced) ####
`data-share-link` The URL to share  
`data-share-name` Name to use in share dialog  
`data-share-caption` Caption to use in share dialog   
`data-share-description` Description to use in share dialog   
`data-share-picture` Absolute URL to image to share

#### Twitter ####
`data-share-link` The URL to share  
`data-share-description` Text to share 

#### Pinterest ####
`data-share-link` The URL to share  
`data-share-description` Text to share  
`data-share-picture` Absolute URL to image to share  

#### Reddit ####
`data-share-link` The URL to share  

#### LinkedIn ####
`data-share-title` Title to share 
`data-share-link` The URL to share  
`data-share-description` Text to share 


### Advanced Facebook Usage ###

By default, the library will use the Facebook sharer URL (https://www.facebook.com/sharer/sharer.php?u=http://www.github.com). If you'd like more options, however, it can use the Facebook API's share dialog. To use this, initialize the library with the following options:

```
Share.init({
  facebookAppID: YOUR_APP_ID, 
  facebookShareViaAPI: true
})
```