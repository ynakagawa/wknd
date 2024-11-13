(function(window, document, $, URITemplate) {
  "use strict";

  //Constants Variables
  let FRAME_IO_EXPORT_DIALOG_ID = "frame-io-export-dialog";
  let FRAME_IO_IMPORT_DIALOG_ID = "frame-io-import-dialog";
  let FRAME_IO_EXPORT_ACTION = "export";
  let FRAME_IO_IMPORT_ACTION = "import";
  let DIALOG_CLOSE_BUTTON_LABEL = "Close";

  //Local Variables
  let exportDialog, importDialog, alertMsg, exportButton, importButton;

  //Event Handlers/Callbacks
  function exportActionClickHandler() {
    let selectionsMap = {};
    let selectedItems = $('.foundation-collection.cq-damadmin-admin-childpages').find(".foundation-selections-item");

    for(var i=0;i<selectedItems.length;i++){
      selectionsMap[i] = selectedItems[i].dataset.foundationCollectionItemId;
    }

    let encoded = encodeURIComponent(JSON.stringify(selectionsMap));
  
    //update export dialog data attributes
    exportDialog.set({
      content: {
        innerHTML: `<div id="${FRAME_IO_EXPORT_DIALOG_ID}" data-action="${FRAME_IO_EXPORT_ACTION}" data-selections="${encoded}"></div>`
      }
    }).show();

    window.frameio.renderExportDialog();
    
  }

  function importActionClickHandler(name, el, config, collection, selections) {
    let assetPath = $('.foundation-collection-meta');
    let encoded = assetPath[0].dataset.foundationCollectionMetaPath;

    //update dialog data attributes
    importDialog.set({
      content: {
        innerHTML: `<div id="${FRAME_IO_IMPORT_DIALOG_ID}" data-action="${FRAME_IO_IMPORT_ACTION}" data-selections="${encoded}"></div>`
      }
    }).show();

    window.frameio.renderImportDialog();
  }

  function foundationRegistryCollectionActionHandler(e) {
    let button = $(e.target).closest('a')[0];
    let action = JSON.parse(button.dataset['foundationCollectionAction']).data.action;

    //Handle Export Action
    if(action === FRAME_IO_EXPORT_ACTION) {
      exportActionClickHandler();
    }

    //Handle Import Action
    if(action === FRAME_IO_IMPORT_ACTION) {
      importActionClickHandler();
    }
  }

  function frameIODialogSuccessHandler(e) {

    if(e.detail.actionType == "Export") {
      exportDialog.hide();
    }

    if(e.detail.actionType == "Import") {
      importDialog.hide();
      var api = $(".foundation-collection.cq-damadmin-admin-childpages").adaptTo("foundation-collection");
      api.reload();
    }
                      
    alertMsg.set({
      variant: "success",
      header: {
        innerHTML: "SUCCESS:"
      },
      content: {
        innerHTML: e.detail.actionType + " successful!"
      },
    })

    alertMsg.show();

    setTimeout(() => {
      alertMsg.hide();
    }, 4000)
  }

  function frameIODialogErrorHandler(e) {
    alertMsg.set({
      variant: "error",
      header: {
        innerHTML: "ERROR:"
      },
      content: {
        innerHTML: e.detail.actionType + ' ' + e.detail.err
      },
    });

    alertMsg.show();

    setTimeout(() => {
      alertMsg.hide();
    }, 4000)
  }

  function foundationContentLoadedHandler(e) {   

    //Assign Local Variables for Coral Components
    alertMsg = (!alertMsg) ? new Coral.Alert() : alertMsg;
    exportDialog = (!exportDialog) ? new Coral.Dialog() : exportDialog;
    importDialog = (!importDialog) ? new Coral.Dialog() : importDialog;

    //Append Coral Components to Body
    exportDialog.set({
      id: 'Publish to Frame.io',
      header: {
        innerHTML: 'Publish to Frame.io'
      },
      footer: {
        innerHTML: `<button is="coral-button" variant="primary" coral-close>${DIALOG_CLOSE_BUTTON_LABEL}</button>`
      },
      fullscreen: true
    });

    importDialog.set({
      id: 'Import from Frame.io',
      header: {
        innerHTML: 'Import from Frame.io'
      },
      footer: {
        innerHTML: `<button is="coral-button" variant="primary" coral-close>${DIALOG_CLOSE_BUTTON_LABEL}</button>`
      },
      fullscreen: true
    });
    
    alertMsg.hide();
    document.body.append(alertMsg);
    document.body.appendChild(exportDialog);
    document.body.appendChild(importDialog);
  }

  function onReadyHandler(e) {
    exportButton = $('.frame-io-export');
    importButton = document.querySelector('.frame-io-import');
    
    if(exportButton) {
      exportButton.removeClass('foundation-collection-action');
      exportButton.on('click', foundationRegistryCollectionActionHandler);
    }

    if(importButton) {
      importButton.classList.remove('foundation-collection-action');
      importButton.addEventListener('click', foundationRegistryCollectionActionHandler);
    }
    
  }

  //Init
  (function init() {
    
    $(document).ready(onReadyHandler);

    $(document).on("foundation-contentloaded", foundationContentLoadedHandler);

    window.addEventListener('frame-io-dialog-success', frameIODialogSuccessHandler);

    window.addEventListener('frame-io-dialog-error', frameIODialogErrorHandler);

  })();

})(window, document, Granite.$, Granite.URITemplate);