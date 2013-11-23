(function() {
  this.Share = {
    FACEBOOK_SDK_URL: '//connect.facebook.net/en_US/all.js',
    FACEBOOK_SHARE_URL: 'https://www.facebook.com/sharer/sharer.php',
    TWITTER_SHARE_URL: 'https://twitter.com/intent/tweet',
    PINTEREST_SHARE_URL: 'http://pinterest.com/pin/create/button',
    facebookAppID: null,
    facebookShareViaAPI: false,
    init: function(settings) {
      this.facebookAppID = settings.facebookAppID;
      this.facebookShareViaAPI = settings.facebookShareViaAPI;
      if (!($('#fb-root').length > 0)) {
        $('body').append("<div id='fb-root'></div>");
      }
      this.initFacebook();
      this.initPinterest();
      return this.initTwitter();
    },
    initFacebook: function() {
      var _this = this;
      if (this.facebookShareViaAPI) {
        if (typeof FB !== 'undefined' && FB !== null) {
          return this.initFacebookAPIInteractions();
        } else {
          return $.getScript(this.FACEBOOK_SDK_URL, function() {
            return window.fbAsyncInit = function() {
              FB.init({
                appId: _this.facebookAppID,
                status: true,
                xfbml: true
              });
              return _this.initFacebookAPIInteractions();
            };
          });
        }
      } else {
        return $(document).on('click', '[data-share-facebook]', function(e) {
          var $this, left, link, top, url;
          e.preventDefault();
          $this = $(e.currentTarget);
          left = (screen.width / 2) - 400.;
          top = (screen.height / 2) - 200.;
          link = $this.data('share-link');
          url = "" + _this.FACEBOOK_SHARE_URL + "?u=" + link;
          return window.open(url, 'Facebook Share', 'width=800,height=400,top=#{top},left=#{left}');
        });
      }
    },
    initFacebookAPIInteractions: function() {
      return $(document).on('click', '[data-share-facebook]', function(e) {
        var $this, caption, description, link, name, obj, picture;
        e.preventDefault();
        $this = $(e.currentTarget);
        picture = $this.data('share-picture');
        description = $this.data('share-description');
        link = $this.data('share-link');
        name = $this.data('share-name');
        caption = $this.data('share-caption');
        obj = {
          method: 'feed',
          link: link,
          picture: picture,
          name: name,
          caption: caption,
          description: description
        };
        return FB.ui(obj, function(response) {});
      });
    },
    initTwitter: function() {
      var _this = this;
      return $(document).on('click', '[data-share-twitter]', function(e) {
        var $this, left, link, text, top, url;
        e.preventDefault();
        $this = $(e.currentTarget);
        left = (screen.width / 2) - 400.;
        top = (screen.height / 2) - 200.;
        text = $this.data('share-description');
        link = $this.data('share-link');
        url = "" + _this.TWITTER_SHARE_URL + "?text=" + text + "&url=" + link;
        return window.open(url, 'Twitter Share', 'width=800,height=400,top=#{top},left=#{left}');
      });
    },
    initPinterest: function() {
      var _this = this;
      return $(document).on('click', '[data-share-pinterest]', function(e) {
        var $this, description, left, link, picture, top, url;
        e.preventDefault();
        $this = $(e.currentTarget);
        left = (screen.width / 2) - 400.;
        top = (screen.height / 2) - 200.;
        description = $this.data('share-description');
        link = $this.data('share-link');
        picture = $this.data('share-picture');
        url = "" + _this.PINTEREST_SHARE_URL + "?description=" + description + "&url=" + link + "&media=" + picture;
        return window.open(url, 'Pinterest Share', "width=800,height=450,top=" + top + ",left=" + left);
      });
    }
  };

}).call(this);
