define(
        [
                "dojo/_base/array", // array.forEach
                "dojo/_base/declare", "dojo/_base/lang", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/dom", "dojo/dom-construct",
                "dijit/form/MultiSelect"
        ],
        function(array, 
                declare, lang, _Widget, _Templated, dom, domConstruct, MultiSelect) {
            
            return declare([MultiSelect, _Widget], {
                size : 2,
                postCreate : function() {
                    array.forEach(this.options, function(child) {
                        var label = child.label;
                        if (child.messageId) {
                            label = this.message(child.messageId);
                        }
                        if (!label) {
                            label = child.value;
                        }
                        domConstruct.create('option', {
                            innerHTML : label,
                            value : child.value
                        }, this.domNode);

                    }, this);
                    this.inherited(arguments);
                }
            });
        });
