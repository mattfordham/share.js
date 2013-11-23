@Share =
  FACEBOOK_SDK_URL: '//connect.facebook.net/en_US/all.js'
  FACEBOOK_SHARE_URL: 'https://www.facebook.com/sharer/sharer.php'
  TWITTER_SHARE_URL: 'https://twitter.com/intent/tweet'
  PINTEREST_SHARE_URL: 'http://pinterest.com/pin/create/button'
  
  facebookAppID: null
  facebookShareViaAPI: false

  init: (settings) ->
    @facebookAppID = settings.facebookAppID
    @facebookShareViaAPI = settings.facebookShareViaAPI

    unless $('#fb-root').length > 0
      $('body').append("<div id='fb-root'></div>")

    @initFacebook()
    @initPinterest()
    @initTwitter()

  initFacebook: ->
    if @facebookShareViaAPI
      if typeof(FB) != 'undefined' and FB != null
        @initFacebookAPIInteractions()
      else
        $.getScript @FACEBOOK_SDK_URL, =>
          window.fbAsyncInit = =>
            FB.init
              appId: @facebookAppID
              status: true
              xfbml: true

            @initFacebookAPIInteractions()
    else
      $(document).on 'click', '[data-share-facebook]', (e) =>
        e.preventDefault()
        $this = $(e.currentTarget)

        left = (screen.width/2)-(400)
        top = (screen.height/2)-(200)

        link = $this.data('share-link')

        url = "#{@FACEBOOK_SHARE_URL}?u=#{link}"
        window.open(url, 'Facebook Share', 'width=800,height=400,top=#{top},left=#{left}')


  initFacebookAPIInteractions: ->
    $(document).on 'click', '[data-share-facebook]', (e) ->
      e.preventDefault()
      $this = $(e.currentTarget)

      picture = $this.data('share-picture')
      description = $this.data('share-description')
      link = $this.data('share-link')
      name = $this.data('share-name')
      caption = $this.data('share-caption')

      obj =
        method: 'feed'
        link: link
        picture: picture
        name: name
        caption: caption
        description: description

      FB.ui obj, (response) ->
        #console.log response

  initTwitter: ->
    $(document).on 'click', '[data-share-twitter]', (e) =>
      e.preventDefault()
      $this = $(e.currentTarget)

      left = (screen.width/2)-(400)
      top = (screen.height/2)-(200)

      text = $this.data('share-description')
      link = $this.data('share-link')

      url = "#{@TWITTER_SHARE_URL}?text=#{text}&url=#{link}"
      window.open(url, 'Twitter Share', 'width=800,height=400,top=#{top},left=#{left}')

  initPinterest: ->
    $(document).on 'click', '[data-share-pinterest]', (e) =>
      e.preventDefault()
      $this = $(e.currentTarget)

      left = (screen.width/2)-(400)
      top = (screen.height/2)-(200)

      description = $this.data('share-description')
      link = $this.data('share-link')
      picture = $this.data('share-picture')

      url = "#{@PINTEREST_SHARE_URL}?description=#{description}&url=#{link}&media=#{picture}"
      window.open(url, 'Pinterest Share', "width=800,height=450,top=#{top},left=#{left}")
