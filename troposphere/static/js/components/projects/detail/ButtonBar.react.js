/** @jsx React.DOM */

define(
  [
    'react',
    'backbone'
  ],
  function (React, Backbone) {

    return React.createClass({

      propTypes: {
        isVisible: React.PropTypes.bool.isRequired,
        onMoveSelectedResources: React.PropTypes.func.isRequired,
        onDeleteSelectedResources: React.PropTypes.func.isRequired
      },

      render: function () {
        var className = "btn btn-default";
        if(!this.props.isVisible) className += " invisible";
        return (
          <div className="button-bar">
            <button className={className} onClick={this.props.onMoveSelectedResources}>
              <i className="glyphicon glyphicon-folder-open"/>
            </button>
            <button className={className} onClick={this.props.onDeleteSelectedResources}>
              <i className="glyphicon glyphicon-trash"/>
            </button>
          </div>
        );
      }

    });

  });
