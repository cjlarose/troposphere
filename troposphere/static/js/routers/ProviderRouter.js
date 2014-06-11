/*global define */

define(
  [
    'marionette',
    'components/Root.react',
    'react',
    'components/providers/Providers.react',
    'context',
    'backbone'
  ],
  function (Marionette, Root, React, Providers, context, Backbone) {
    'use strict';

    var Router = Marionette.AppRouter.extend({
      appRoutes: {
        'providers': 'showProviders'
      }
    });

    var Controller = Marionette.Controller.extend({

      render: function(content, route){
        var app = Root({
          session: context.session,
          profile: context.profile,
          content: content,
          route: route || Backbone.history.getFragment()
        });
        React.renderComponent(app, document.getElementById('application'));
      },

      showProviders: function (param) {
        this.render(Providers(), ["providers"]);
      }

    });

    return {
      start: function () {
        var controller = new Controller();
        var router = new Router({
          controller: controller
        });
      }
    }

  });