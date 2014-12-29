(function() {
  var Share;

  Share = (function() {
    Share.prototype.settings = {
      facebookAppID: null,
      facebookShareViaAPI: false,
      onClick: null
    };

    Share.prototype.platforms = [
      {
        name: "facebook",
        sdk_url: "//connect.facebook.net/en_US/all.js",
        share_url: "https://www.facebook.com/sharer/sharer.php?",
        params: [["u", "url"]]
      }, {
        name: "twitter",
        sdk_url: "https://platform.twitter.com/widgets.js",
        share_url: "https://twitter.com/intent/tweet?",
        params: [["text", "text"], ["url", "url"]]
      }, {
        name: "google-plus",
        share_url: "https://plus.google.com/share?",
        params: [["url", "url"]]
      }, {
        name: "pinterest",
        share_url: "http://pinterest.com/pin/create/button?",
        params: [["description", "text"], ["url", "url"], ["media", "image"]]
      }, {
        name: "linkedin",
        share_url: "http://www.linkedin.com/shareArticle?mini=true",
        params: [["summary", "text"], ["url", "url"], ["title", "title"]]
      }, {
        name: "reddit",
        share_url: "http://www.reddit.com/submit?",
        params: [["url", "url"]]
      }
    ];

    function Share(settings) {
      $.extend(this.settings, settings);
      this.registerPlatforms();
    }

    Share.prototype.registerPlatforms = function() {
      return $.each(this.platforms, (function(_this) {
        return function(index, platform) {
          if (platform.name === "facebook" && _this.settings.facebookShareViaAPI) {
            _this.initFacebook();
            return;
          }
          return _this.registerPlatform(platform);
        };
      })(this));
    };

    Share.prototype.registerPlatform = function(platform) {
      return $(document).on('click', "[data-share-" + platform.name + "]", (function(_this) {
        return function(e) {
          var $this, url;
          e.preventDefault();
          $this = $(e.currentTarget);
          url = "" + platform.share_url;
          $.each(platform.params, function(index, param) {
            var paramContent, paramKey;
            paramContent = $this.attr("data-share-" + param[1]);
            paramKey = param[0];
            return url += "&" + paramKey + "=" + paramContent;
          });
          if (_this.settings.onShare) {
            _this.settings.onShare(platform.name);
          }
          return _this.openWindowAndCenter({
            url: url,
            width: 800,
            height: 400
          });
        };
      })(this));
    };

    Share.prototype.openWindowAndCenter = function(options) {
      var height, left, top, url, width, windowName;
      url = options.url;
      width = options.width;
      height = options.height;
      left = (screen.width / 2) - (width / 2);
      top = (screen.height / 2) - (height / 2);
      windowName = "share-" + (Math.floor(Date.now() / 1000));
      return window.open(url, windowName, "width=" + width + ",height=" + height + ",top=" + top + ",left=" + left);
    };

    Share.prototype.initFacebook = function() {
      if ($('#fb-root').length === 0) {
        $('body').append("<div id='fb-root'></div>");
      }
      if (typeof FB !== 'undefined' && FB !== null) {
        return this.initFacebookAPIInteractions();
      } else {
        return $.getScript(this.platforms[0].sdk_url, (function(_this) {
          return function() {
            return window.fbAsyncInit = function() {
              FB.init({
                appId: _this.settings.facebookAppID,
                status: true,
                xfbml: true
              });
              return _this.initFacebookAPIInteractions();
            };
          };
        })(this));
      }
    };

    Share.prototype.initFacebookAPIInteractions = function() {
      return $(document).on('click', '[data-share-facebook]', (function(_this) {
        return function(e) {
          var $this, caption, description, link, name, obj, picture;
          e.preventDefault();
          $this = $(e.currentTarget);
          picture = $this.data('share-image');
          description = $this.data('share-text');
          link = $this.data('share-url');
          name = $this.data('share-title');
          caption = $this.data('share-caption');
          obj = {
            method: 'feed',
            link: link,
            picture: picture,
            name: name,
            caption: caption,
            description: description
          };
          return FB.ui(obj, function(response) {
            if (response && response.post_id) {
              if (_this.settings.onShare) {
                return _this.settings.onShare("facebook");
              }
            }
          });
        };
      })(this));
    };

    return Share;

  })();

  (function(name, definition) {
    if (typeof module !== "undefined") {
      module.exports = definition();
    } else if (typeof define === "function" && typeof define.amd === "object") {
      define(definition);
    } else {
      this[name] = definition();
    }
  })("Share", function() {
    return Share;
  });

}).call(this);
