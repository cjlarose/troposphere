define(function (require) {
  "use strict";

  var InstanceConstants = require('constants/InstanceConstants'),
      InstanceState = require('models/InstanceState'),
      ModalHelpers = require('components/modals/ModalHelpers'),
      InstanceStopModal = require('components/modals/instance/InstanceStopModal.react'),
      Utils = require('../Utils'),
      InstanceActionRequest = require('models/InstanceActionRequest');

  return {

    stop: function(instance){
      var modal = InstanceStopModal();

      ModalHelpers.renderModal(modal, function () {
        var instanceState = new InstanceState({status_raw: "active - powering-off"}),
            originalState = instance.get('state'),
            actionRequest = new InstanceActionRequest({instance: instance});

        instance.set({state: instanceState});
        Utils.dispatch(InstanceConstants.UPDATE_INSTANCE, {instance: instance});

        actionRequest.save(null, {
          attrs: {action: "stop"}
        }).done(function(){
          instance.set({
            state: new InstanceState({status_raw: "active - powering-off"})
          });
        }).fail(function(response){
          instance.set({state: originalState});
          Utils.displayError({title: "Your instance could not be stopped", response: response});
        }).always(function(){
          Utils.dispatch(InstanceConstants.UPDATE_INSTANCE, {instance: instance});
          Utils.dispatch(InstanceConstants.POLL_INSTANCE, {instance: instance});
        });
      })
    }

  };

});