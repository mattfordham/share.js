(function() {
  this.Share = {
    FACEBOOK_SDK_URL: '//connect.facebook.net/en_US/all.js',
    FACEBOOK_SHARE_URL: 'https://www.facebook.com/sharer/sharer.php',
    TWITTER_SHARE_URL: 'https://twitter.com/intent/tweet',
    PINTEREST_SHARE_URL: 'http://pinterest.com/pin/create/button',
    LINKEDIN_SHARE_URL: 'http://www.linkedin.com/shareArticle?mini=true',
    REDDIT_SHARE_URL: 'http://www.reddit.com/submit',
    facebookAppID: null,
    facebookShareViaAPI: false,
    init: function(settings) {
      if (settings) {
        if (settings.facebookAppID) {
          this.facebookAppID = settings.facebookAppID;
        }
        if (settings.facebookShareViaAPI) {
          this.facebookShareViaAPI = settings.facebookShareViaAPI;
        }
      }
      if (!($('#fb-root').length > 0)) {
        $('body').append("<div id='fb-root'></div>");
      }
      this.initFacebook();
      this.initPinterest();
      this.initTwitter();
      this.initLinkedIn();
      return this.initReddit();
    },
    initFacebook: function() {
      if (this.facebookShareViaAPI) {
        if (typeof FB !== 'undefined' && FB !== null) {
          return this.initFacebookAPIInteractions();
        } else {
          return $.getScript(this.FACEBOOK_SDK_URL, (function(_this) {
            return function() {
              return window.fbAsyncInit = function() {
                FB.init({
                  appId: _this.facebookAppID,
                  status: true,
                  xfbml: true
                });
                return _this.initFacebookAPIInteractions();
              };
            };
          })(this));
        }
      } else {
        return $(document).on('click', '[data-share-facebook]', (function(_this) {
          return function(e) {
            var $this, left, link, top, url;
            e.preventDefault();
            $this = $(e.currentTarget);
            left = (screen.width / 2) - 400.;
            top = (screen.height / 2) - 200.;
            link = $this.data('share-link');
            url = "" + _this.FACEBOOK_SHARE_URL + "?u=" + link;
            return window.open(url, 'Facebook Share', 'width=800,height=400,top=#{top},left=#{left}');
          };
        })(this));
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
      return $(document).on('click', '[data-share-twitter]', (function(_this) {
        return function(e) {
          var $this, left, link, text, top, url;
          e.preventDefault();
          $this = $(e.currentTarget);
          left = (screen.width / 2) - 400.;
          top = (screen.height / 2) - 200.;
          text = $this.data('share-description');
          link = $this.data('share-link');
          url = "" + _this.TWITTER_SHARE_URL + "?text=" + text + "&url=" + link;
          return window.open(url, 'Twitter Share', "width=800,height=400,top=" + top + ",left=" + left);
        };
      })(this));
    },
    initLinkedIn: function() {
      return $(document).on('click', '[data-share-linkedin]', (function(_this) {
        return function(e) {
          var $this, left, link, text, title, top, url;
          e.preventDefault();
          $this = $(e.currentTarget);
          left = (screen.width / 2) - 300.;
          top = (screen.height / 2) - 237.;
          title = encodeURIComponent($this.data('share-title'));
          text = encodeURIComponent($this.data('share-description'));
          link = encodeURIComponent($this.data('share-link'));
          url = "" + _this.LINKEDIN_SHARE_URL + "?summary=" + text + "&url=" + link + "&title=" + title;
          return window.open(url, 'LinkedIn Share', "width=600,height=475,top=" + top + ",left=" + left);
        };
      })(this));
    },
    initReddit: function() {
      return $(document).on('click', '[data-share-reddit]', (function(_this) {
        return function(e) {
          var $this, left, link, top, url;
          e.preventDefault();
          $this = $(e.currentTarget);
          left = (screen.width / 2) - 600.;
          top = (screen.height / 2) - 200.;
          link = encodeURIComponent($this.data('share-link'));
          url = "" + _this.REDDIT_SHARE_URL + "?url=" + link;
          return window.open(url, 'Reddit Share');
        };
      })(this));
    },
    initPinterest: function() {
      return $(document).on('click', '[data-share-pinterest]', (function(_this) {
        return function(e) {
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
        };
      })(this));
    }
  };

}).call(this);
