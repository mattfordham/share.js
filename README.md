## Share ##
### Social sharing made a little simpler. ###

1. Include share.js
2. Add these data attributes to your share links: `data-share-facebook`, `data-share-twitter`, `data-share-pinterest`, `data-share-linkedin`, `data-share-reddit`
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


#### License

Copyright (c) 2013 - 2014, mattfordham / wintr.us

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
