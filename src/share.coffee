#########################################################
# Share.js
# Author: matt@wintr.us
#########################################################

class Share

  #--------------------------------------------------------
  # Default settings
  #--------------------------------------------------------

  settings: 
    facebookAppID: null
    facebookShareViaAPI: false
    onClick: null


  #--------------------------------------------------------
  # Shareable platforms
  #--------------------------------------------------------

  platforms: [
    {
      name: "facebook"
      sdk_url: "//connect.facebook.net/en_US/all.js"
      share_url: "https://www.facebook.com/sharer/sharer.php?"
      params: [
        ["u", "url"]
      ]
    }
    {
      name: "twitter"
      sdk_url: "https://platform.twitter.com/widgets.js"
      share_url: "https://twitter.com/intent/tweet?"
      params: [
        ["text", "text"]
        ["url", "url"]
      ]
    }
    {
      name: "google-plus"
      share_url: "https://plus.google.com/share?"
      params: [
        ["url", "url"]
      ]
    }
    {
      name: "pinterest"
      share_url: "http://pinterest.com/pin/create/button?"
      params: [
        ["description", "text"]
        ["url", "url"]
        ["media", "image"]
      ]
    }
    {
      name: "linkedin"
      share_url: "http://www.linkedin.com/shareArticle?mini=true"
      params: [
        ["summary", "text"]
        ["url", "url"]
        ["title", "title"]
      ]
    }
    {
      name: "reddit"
      share_url: "http://www.reddit.com/submit?"
      params: [
        ["url", "url"]
      ]
    }
  ]


  #--------------------------------------------------------
  # Constructor
  #--------------------------------------------------------

  constructor: (settings) ->
    $.extend @settings, settings
    @registerPlatforms()


  #--------------------------------------------------------
  # Handle basic sharing for all non-api platforms
  #--------------------------------------------------------

  registerPlatforms: ->
    $.each @platforms, (index, platform) =>
      if platform.name is "facebook" and @settings.facebookShareViaAPI
        @initFacebook()
        return

      @registerPlatform(platform)

  registerPlatform: (platform) ->
    $(document).on 'click', "[data-share-#{platform.name}]", (e) =>
      e.preventDefault()
      $this = $(e.currentTarget)
      
      url = "#{platform.share_url}"

      $.each platform.params, (index, param) ->
        paramContent = $this.attr("data-share-#{param[1]}")
        paramKey = param[0]
        url += "&#{paramKey}=#{paramContent}"

      @settings.onShare(platform.name) if @settings.onShare

      @openWindowAndCenter
        url: url
        width: 800
        height: 400

  openWindowAndCenter: (options) ->
    url = options.url
    width = options.width
    height = options.height

    left = (screen.width/2) - (width/2)
    top = (screen.height/2) - (height/2)

    windowName = "share-#{Math.floor(Date.now()/1000)}"

    window.open(url, windowName, "width=#{width},height=#{height},top=#{top},left=#{left}")


  #--------------------------------------------------------
  # Facebook API sharing
  #--------------------------------------------------------

  initFacebook: ->
    if $('#fb-root').length is 0
      $('body').append("<div id='fb-root'></div>")
    
    if typeof(FB) != 'undefined' and FB != null
      @initFacebookAPIInteractions()
    else
      $.getScript @platforms[0].sdk_url, =>
        window.fbAsyncInit = =>
          FB.init
            appId: @settings.facebookAppID
            status: true
            xfbml: true

          @initFacebookAPIInteractions()
    
  initFacebookAPIInteractions: ->
    $(document).on 'click', '[data-share-facebook]', (e) =>
      e.preventDefault()
      $this = $(e.currentTarget)

      picture = $this.data('share-image')
      description = $this.data('share-text')
      link = $this.data('share-url')
      name = $this.data('share-title')
      caption = $this.data('share-caption')

      obj =
        method: 'feed'
        link: link
        picture: picture
        name: name
        caption: caption
        description: description

      FB.ui obj, (response) =>
        if response and response.post_id
          @settings.onShare("facebook") if @settings.onShare


#--------------------------------------------------------
# Wrap library in appropriate module type, or make global
#--------------------------------------------------------

((name, definition) ->
  unless typeof module is "undefined"
    module.exports = definition()
  else if typeof define is "function" and typeof define.amd is "object"
    define definition
  else
    this[name] = definition()
  return
) "Share", ->
  return Share    
