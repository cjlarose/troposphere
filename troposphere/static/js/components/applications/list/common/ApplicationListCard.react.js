define(function (require) {

  var React = require('react'),
      Gravatar = require('components/common/Gravatar.react'),
      Backbone = require('backbone'),
      URL = require('url'),
      Bookmark = require('../../common/Bookmark.react'),
      context = require('context'),
      Tags = require('../../detail/tags/Tags.react'),
      stores = require('stores'),
      navigator = require('navigator'),
      Showdown = require('showdown'),
      moment = require('moment');

  return React.createClass({

    propTypes: {
      application: React.PropTypes.instanceOf(Backbone.Model).isRequired,
      tags: React.PropTypes.instanceOf(Backbone.Collection).isRequired
    },

    onAppClick: function (e) {
      e.preventDefault();
      var url = URL.application(this.props.application);
      navigator.navigateTo(url);
    },

    render: function () {
      var app = this.props.application,
          type = stores.ProfileStore.get().get('icon_set'),
          imageTags = stores.TagStore.getImageTags(app),
          applicationCreationDate = moment(app.get('start_date')).format("MMM D, YYYY"),
          converter = new Showdown.converter(),
          description = app.get('description'),
          descriptionHtml = converter.makeHtml(description);

      var iconSize = 67;
      var icon;
      if (app.get('icon')) {
        icon = (
          <img src={app.get('icon')} width={iconSize} height={iconSize}/>
        );
      } else {
        icon = (
          <Gravatar hash={app.get('uuid_hash')} size={iconSize} type={type}/>
        );
      }

      var appUri = URL.application(app);

      // Hide bookmarking on the public page
      var bookmark;
      if(context.profile){
        bookmark = (
          <Bookmark application={app}/>
        );
      }

      return (
        <div className='app-card'>
          <div>
            <span className='icon-container'>
              <a href={appUri} onClick={this.onAppClick}>
                {icon}
              </a>
            </span>
            <span className='app-name'>
              <h4>
                <a href={appUri}>{app.get('name')}</a>
              </h4>
              <div><time>{applicationCreationDate}</time> by <strong>{app.get('created_by').username}</strong></div>
              <Tags activeTags={imageTags}
                  tags={this.props.tags}
              />
            </span>
          </div>
          <div dangerouslySetInnerHTML={{__html: descriptionHtml}}/>
          {bookmark}
        </div>
      );
    }

  });

});
