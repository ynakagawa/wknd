(function(window, document, $, Granite) {
  "use strict";
  console.log('connect.js loaded');

  let VALID_PATHS = ['/apps/frame-io-assets-console/content/cloudservice/console.html/apps/frame-io-assets-console/templates/framecloudconfig', '/conf/frame-io-assets-console/settings/cloudconfigs/frameioconnector/_jcr_content'];

  let ui = $(window).adaptTo("foundation-ui");
  let connectButtonSelector = '.connect-frameio-button';
  let devTokenSelector = '.frameio-token';
  let saveButtonSelector = '#shell-propertiespage-doneactivator';
  let createButtonSelector = '.foundation-wizard-control';
  let createButton, saveButton, saveDropMenu, observer;
  let observerConfig = { attributes: true, childList: false, subtree: false };

  function connectClickHandler(e) {
    var token = $(devTokenSelector).val();

    ui.wait();

    $.ajax({
        url: `https://api.frame.io/v2/accounts`,
        type: "GET",
        crossDomain: true,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.setRequestHeader("Authorization", "Bearer " + token);
          xhr.setRequestHeader("X-Mobile", "false");
      },
    }).done(function(data, textStatus, jqXHR) {
        ui.notify(Granite.I18n.get("Success"), 'The Frame.io DevToken is valid', 'success');
        
        if(createButton) {
          enableCreateButton();
        }

        if(saveButton) {
          enableSaveButton();
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        ui.notify(Granite.I18n.get("Error"), 'The Frame.io DevToken is invalid', "error");
        if(createButton) {
          disableCreateButton();
        }

        if(saveButton) {
          disabledSaveButton();
        }
    }).always(function() {
        ui.clearWait();
    });

  }

  function disableCreateButton() {
    createButton.setAttribute('disabled', 'disabled');
  }

  function enableCreateButton() {
    createButton.removeAttribute('disabled');
  }

  function disabledSaveButton() {
    saveButton.setAttribute('disabled', 'disabled');
    saveDropMenu.setAttribute('disabled', 'disabled');
  }

  function enableSaveButton() {
    saveButton.removeAttribute('disabled');
    saveDropMenu.removeAttribute('disabled');
  }

  //Init
  function init() {
    saveButton = $(saveButtonSelector).get(0);
    saveDropMenu = $(saveButtonSelector).next().get(0);
    createButton = document.querySelector(createButtonSelector + "[type='submit'");
    
    if(createButton) {
      disableCreateButton();
    }

    if(saveButton) {
      observer = new MutationObserver((mutationList, observer) => {

        if (mutationList[0].type === "attributes") {
          disabledSaveButton();
          observer.disconnect();
        }
      });
      observer.observe(saveButton, observerConfig);
    }

    $(document).on('click', connectButtonSelector, connectClickHandler);
  }


  //Listen for coral ready event on connect button to initialize
  Coral.commons.ready($(connectButtonSelector).get(0), function () {
    let meta = document.querySelector('.foundation-form-response-ui-success');
    let propertiesForm = document.getElementById('cq-sites-properties-form');
    
    if(meta){
      let dataset = JSON.parse(meta.dataset.foundationFormResponseUiSuccess);
      if(VALID_PATHS.includes(dataset.href)){
       init();
      }
    }

    if(propertiesForm) {
      let action = propertiesForm.getAttribute('action');
      if(VALID_PATHS.includes(action)){
        init();
       }
    }
  });
  
})(window, document, Granite.$, Granite);
