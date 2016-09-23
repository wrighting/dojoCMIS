define(
        [
         "dojo/_base/array", // array.forEach
         "dojo/_base/declare", "dojo/_base/lang", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/dom", "dojo/dom-construct",
         "wrighting/cmis/store/CmisStore","wrighting/cmis/ModelMultiSelect", 
         "dgrid/OnDemandGrid", "dgrid/Editor", "dijit/form/MultiSelect", "dijit/form/Select",
         "dijit/form/DateTextBox", 'dstore/legacy/StoreAdapter'
         ],
         function(array, declare, lang, _Widget, _Templated, dom, domConstruct, 
                 CmisStore, ModelMultiSelect,
                 dgrid, Editor, MultiSelect, Select, DateTextBox, StoreAdapter) {

            return declare(
                    [
                     _Widget, _Templated
                     ],
                     {
                        templateString : '<div><div id="message" class="message hidden"></div><div data-dojo-attach-point="wrighting_grid"></div></div>',
                        query :  '/root',
                        columns: [],
                        configured: false,
                        timeout: 2000,
                        types: {},
                        loggingEnabled: true,
                        excludeFields: [ ],
                        // targetRoot : Alfresco.constants.PROXY_URI + /alfresco-api/-default-/public/cmis/versions/1.1/browser
                        // "/cmis/versions/1.1/browser";
                        targetRoot : "http://localhost:8080/share/proxy/alfresco-api/-default-/public/cmis/versions/1.1/browser",
                        //pageContext : Alfresco.constants.URL_PAGECONTEXT,
                        pageContext : "http://localhost:8080/share/page/",
                        buildRendering : function wrighting_grid_buildRendering() {
                            this.inherited(arguments);
                        },
                        createColumnDefinition: function wrighting_grid_createColumnObject(col) {
                            // summary:
                            //          Creates the actual Object for dgrid column definition
                            //          Also adds readonly fields to excludeFields so they are not
                            //          sent for update
                            //
                            // col: Object
                            //          Column definition - similar to CMIS defn
                            //
                            //          label: The column label
                            //          field: The name of the field
                            //          editorArgs: as per dgrid
                            //          editable: boolean
                            //          propertyType: boolean, datetime, string
                            //          formatter: a function definition to format the column 
                            //          formatFunction: use one of the pre-defined format functions:
                            //                       "link"
                            //
                            // returns: Object
                            //          dgrid column definition
                            var defn = { label: col['label'] };
                            defn['field'] = col['field'];
                            if ('editorArgs' in col) {
                            	defn['editorArgs'] = col['editorArgs'];
                            } else {
                            	defn['editorArgs'] = {};
                            }   
                            if ("formatter" in col) {
                                defn['formatter'] = col['formatter'];
                                return (defn);
                            }
                            if ("formatFunction" in col) {
                                if (col['formatFunction'] == "link") {
                                    defn['formatter'] = this.formatLinkFunction;
                                    return defn;
                                }
                            }
                            if ("editable" in col && col["editable"] == true) {
                                defn['autoSave'] = true;
                            } else {
                                defn['editorArgs']['readonly'] = 'readonly';
                                defn['editorArgs']['disabled'] = 'disabled';
                                this.excludeFields.push(col["field"]);
                            }
                            if ("editorArgs" in col && col['editorArgs'].options.length > 0) {
                                if (col['cardinality'] == 'multi') {
                                    defn['editor'] = ModelMultiSelect;
                                    return(defn);
                                } else {
                                    defn['editor'] = Select;
                                    return(defn);
                                }
                            }
                            if (col['propertyType'] == 'boolean') {
                                defn['editor'] = "checkbox";
                                return(defn);
                            }
                            if (col['propertyType'] == 'datetime') {
                                defn['get'] = function(rowData) {
                                    var d1 = rowData[col["field"]];
                                    if (d1 == null) {
                                        return null;
                                    }
                                    var date1 = new Date(d1);
                                    return (date1);
                                };
                                defn['set'] = function(rowData) {
                                    var d1 = rowData[col["field"]];
                                    if (d1) {
                                        var date = new Date(d1);
                                        var time = date.getTime();
                                        return time;
                                    } else {
                                        return null;
                                    }
                                };
                                defn['editor'] = DateTextBox;
                                return(defn);
                            }
                            if (col['propertyType'] == 'string') {
                                defn['editor'] = "text";
                                return(defn);
                            }

                            return defn;
                        },
                        parseDefinition: function wrighting_grid_parseDef(typeDef, col) {
                            // summary:
                            //          Takes a cmis property definition and converts it into a 
                            //          slightly simplified format suitable 
                            //          for converting to input for a dgrid
                            //          
                            // typeDef: Object
                            //          The definition from the cmis configuration
                            // col: Object
                            //          The definition from the input configuration
                            //              
                            // returns: Object
                            //           Description of dgrid column definition
                            var parentType = col['parentType'];
                            var propName = col['field'];
                            var defn = {};
                            if (typeDef['type'] && typeDef['type']['queryName'] == parentType) {
                                var propDef = typeDef['type']['propertyDefinitions'][propName];
                                if (propDef == null) {
                                    propName = propName.substr(propName.indexOf('.')+1);
                                    propDef = typeDef['type']['propertyDefinitions'][propName];
                                }
                                if (propDef) {
                                    found = true;
                                    defn = { label: propDef['displayName'] };
                                    defn['field'] = col['field'];
                                    defn['editorArgs'] = { options: [] };
                                    if (propDef['updatability'] == 'readwrite') {
                                        defn['editable'] = true;
                                    } else {
                                        defn['editable'] = false;
                                    }
                                    if ("editable" in col) {
                                        defn["editable"] = col["editable"];
                                    }

                                    if ("choice" in propDef) {
                                        array.forEach(propDef['choice'], function(option) {
                                            defn['editorArgs']['options'].push({
                                                label: option['displayName'],
                                                value: option['value']
                                            });
                                        });
                                        defn['cardinality'] = propDef['cardinality'];
                                    }
                                    defn['propertyType'] = propDef['propertyType'];
                                    if ("formatter" in col) {
                                        defn['formatter'] = col['formatter'];
                                    }
                                    if ("formatFunction" in col) {
                                        defn['formatFunction'] = col['formatFunction'];
                                    }

                                }
                                return defn;
                            }
                            
                        },
                        _log : function wrighting_grid_log(level, message) {
                            if (this.loggingEnabled) {
                                console.log(level + ":" + message);
                            }
                        },
                        createGrid: function function_wrighting_grid_createGrid() {
                            var cols = [];
                            array.forEach(this.columns, lang.hitch(this, function(col) {
                                cols.push(this.createColumnDefinition(col));
                                if (col["editable"]) {
                                    this.cmisStore.allowedProperties.push(col["field"]);
                                }
                            }));
                            //Fields to excluded when doing an update
                            array.forEach(this.excludeFields, lang.hitch(this, function(exclude) {
                                this.cmisStore.excludeProperties.push(exclude);
			    }));
			    var adaptedStore = new StoreAdapter({objectStore: this.cmisStore});
                            this.grid = new (declare([dgrid,Editor]))(
                                    {
                                        collection : adaptedStore.filter(this.query),
                                        pageContext: this.pageContext,
                                        columns : cols
				    }, this.wrighting_grid);
                            var messageNode = dom.byId('message');
                            this.grid.on('dgrid-error', function(event) {
                                // Display an error message above the grid when an error occurs.
                                messageNode.className = 'errorMessage';
                                messageNode.innerHTML = event.error.message;
                            });
				 
                            this.grid.on('dgrid-refresh-complete', function(event) {
                                // Hide any previous error message when a refresh
                                // completes successfully.
                                messageNode.className = 'errorMessage hidden';
                                messageNode.innerHTML = '';
                            });
                            
                            this.grid.startup();
                        },
                        _getStore: function wrighting_getStore() {
                            this.cmisStore = new CmisStore({
                                base : this.targetRoot,
                                succinct : true,
                                timeout : this.timeout

                            });
                        	
                        },
                        postCreate : function wrighting_grid_postCreate() {
                            try {
                            	this._getStore();
                            	
                                if (this.configured) {
                                    this.createGrid();
                                } else {
                                    this.defineColumns();
                                }
                            } catch (err) {
                                this._log("error", err);
                            }
                        },
                        defineColumns : function wrighting_grid_defineColumns() {
                            
                            var info = this.cmisStore.getTypeInfo();
                            info.then(lang.hitch(this, function(data) {
                                var cols = [];
                                this.types = data;
                                
                                this._log("log", "Configured columns:" + JSON.stringify(this.columns));

                                array.forEach(this.columns, function(col) {

                                    var found = false;
                                    var defn = col;
                                    array.some(this.types, function(child) {
                                        
                                        var def = this.parseDefinition(child, col);
                                        if (def) {
                                            defn = def;
                                            found = true;
                                            return (found);
                                        }
                                        array.some(child['children'], function(typeDef) {
                                            var def = this.parseDefinition(typeDef, col);
                                            if (def) {
                                                defn = def;
                                                found = true;
                                                return (found);
                                            }
                                        }, this); //end foreach typedef
                                         
                                        return (found);
                                    } //end forEach columns

                                    , this);  // End types loop
                                    cols.push(defn);

                                }, this);  // end columns loop

                                this._log("log", "Processed columns:" + JSON.stringify(cols));
                                this.columns = cols;

                                this.createGrid();
                            }), lang.hitch(this, function(err) {
                                this._log("error", err);
                                }));
                            if (info.isRejected() || info.isCanceled()) {
                                this._log("error", "Cancelled or rejected");
                            }

                        },
                        formatFunction :  function wrighting_grid_formatFunction(data) {

                            if (data != null) {
                                if (typeof data === "undefined" || typeof data.value === "undefined") {
                                    return data;
                                } else {
                                    return data.value;
                                }
                            } else {
                                return "";
                            }
                        },

                        formatLinkFunction : function wrighting_grid_formatLinkFunction(text, data) {
                            if (text != null) {
                                if (typeof text === "undefined" || typeof text.value === "undefined") {
                                    if (data['alfcmis:nodeRef']) {
                                        return '<a href="' + this.grid.pageContext + 'document-details?nodeRef='
                                        + data['alfcmis:nodeRef'] + '">' + text + '</a>';
                                    } else {
                                        return text;
                                    }

                                } else {
                                    return text.value;
                                }
                            } else {
                                return "";
                            }
                        }
                     });
        });
