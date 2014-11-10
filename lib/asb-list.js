document.registerElement('asb-list', {
    prototype: Object.create( HTMLElement.prototype, {
        createdCallback: {
            value: function () {
                console.log('created');
            }
        },
        attachedCallback: {
            value: function () {
                this.readAttributes.bind(this)()
                    .then(this.getData)
                    .then(this.buildHTML)
                    .then(console.log.bind(console))
                    .catch(this.handleError);
                //console.log('attached');
            }
        },
        attributeChangedCallback : {
            value: function () {
                console.log('changed');
            }
        },
        readAttributes: {
            value: function () {
                return new Promise(function(resolve, reject) {
                    if (this.attributes) {
                          var attributes = {};
                          [].forEach.call(this.attributes, function (attribute) {
                              attributes[attribute.name] = attribute.value;
                          });
                          resolve(attributes);
                      } else {
                          reject(Error('element has no attributes'));
                      };
                }.bind(this));
            }
        },
        getData: {
            value: function (attributes) {
                return new Promise(function(resolve, reject) {
                    Tabletop.init({
                        key: attributes['data-key'],
                        callback: function(data, tabletop) {
                            console.log('data:', data);
                            resolve(data);
                        },
                        simpleSheet: true
                    });

                });
            }
        },
        handleError: {
            value: function (error) {
                console.error(error);
            }
        }
    })
})
