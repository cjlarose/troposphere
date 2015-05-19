define(function (require) {
  "use strict";

  var ModalHelpers = require('components/modals/ModalHelpers'),
      InstanceImageModal = require('components/modals/instance/InstanceImageModal.react'),
      actions = require('actions');

  return {

    requestImage: function(params){
      if(!params.instance) throw new Error("Missing instance");

      var instance = params.instance,
          modal = InstanceImageModal({
            instance: instance
          });

      ModalHelpers.renderModal(modal, function (params) {
        actions.InstanceActions.requestImage({
          instance: instance,
          name: params.name,
          description: params.description,
          providerId: params.providerId,
          software: params.software,
          filesToExclude: params.filesToExclude,
          systemFiles: params.systemFiles,
          visibility: params.visibility,
          tags: params.tags
        });
      })
    }

  };

});
