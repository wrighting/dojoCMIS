define(
		[
		 "dojo/_base/array", // array.forEach
		 "dojo/_base/declare", "dojo/_base/lang", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/dom", "dojo/dom-construct",
		 "wrighting/cmis/store/CmisStore","wrighting/cmis/ModelMultiSelect", 
		 "dgrid/OnDemandGrid", "dgrid/editor", "dijit/form/MultiSelect", "dijit/form/Select",
		 "dijit/form/DateTextBox"
		 ],
		 function(array, declare, lang, _Widget, _Templated, dom, domConstruct, 
				 CmisStore, ModelMultiSelect,
				 dgrid, editor, MultiSelect, Select, DateTextBox) {

			return declare(
					[
					 _Widget, _Templated
					 ],
					 {
						templateString : '<div data-dojo-attach-point="wrighting_grid"></div>',
						query :  '/root',
						columns: [],
						timeout: 1000,
						types: {},
						excludeFields: [ ],
						// targetRoot =
							// "https://localhost:8443/alfresco/api/-default-/public/cmis/versions/1.1/browser",
							// This isn't right but I don't know what is -
						// targetRoot = Alfresco.constants.PROXY_URI +
						// "/cmis/versions/1.1/browser";
						targetRoot : "/alfresco/api/-default-/public/cmis/versions/1.1/browser",
						buildRendering : function wrighting_grid_buildRendering() {
							this.inherited(arguments);
						},
						parseDefinition: function wrighting_grid_parseDef(typeDef, parentType, propName, col) {
							if (typeDef['type'] && typeDef['type']['queryName'] == parentType) {
								var propDef = typeDef['type']['propertyDefinitions'][propName];
								if (propDef) {
									found = true;
									defn = { label: propDef['displayName'] };
									defn['field'] = col['field'];
									if (col['formatter']) {
										defn['formatter'] = col['formatter'];
									}
									defn['editorArgs'] = { options: [] };
									if (propDef['updatability'] == 'readwrite') {
										defn['autoSave'] = true;
									} else {
										defn['editorArgs']['readonly'] = 'readonly';
										defn['editorArgs']['disabled'] = 'disabled';
                                                                                this.excludeFields.push(propName);
									}

									if (propDef['choice']) {
										array.forEach(propDef['choice'], function(option) {
											defn['editorArgs']['options'].push({
												label: option['displayName'],
												value: option['value']
											});
										});

										if (propDef['cardinality'] == 'multi') {
											return(editor(defn,ModelMultiSelect));
										} else {
											return(editor(defn,Select));
										}

									}
									if (propDef['propertyType'] == 'boolean') {
										defn['editor'] = "checkbox";
										return(editor(defn));
									}
									if (propDef['propertyType'] == 'datetime') {
										defn['get'] = function(rowData) {
											var d1 = rowData[propName];
											if (d1 == null) {
												return null;
											}
											var date1 = new Date(d1);
											return (date1);
										};
										defn['set'] = function(rowData) {
											var d1 = rowData[propName];
											if (d1) {
												var date = new Date(d1);
												var time = date.getTime();
												return time;
											} else {
												return null;
											}
										};
										return(editor(defn, DateTextBox));
									}
									if (propDef['propertyType'] == 'string') {
										return(editor(defn));
                                                                        }
								}
							}
						},
						postCreate : function wrighting_grid_postCreate() {
							try {

								this.cmisStore = new CmisStore({
									base : this.targetRoot,
									succinct : true,
									timeout : this.timeout

								});
								var info = this.cmisStore.getTypeInfo();
								info.then(lang.hitch(this, function(data) {
									this.types = data;


									var cols = [];

									array.forEach(this.columns, function(col) {
										var parentType = col['parentType'];
										var propName = col['field'];
										var found = false;
										array.forEach(this.types, function(child) {
											if (child['type'] && child['type']['queryName'] == "cmis:secondary") {
												array.forEach(child['children'], function(typeDef) {
													var defn = this.parseDefinition(typeDef, parentType, propName, col);
													if (defn) {
														cols.push(defn);
														found = true;
													}
												}, this); //end foreach typedef
											} //end cmis:secondary
										} //end forEach columns

										, this);  // End types loop
										if (!found) {
											cols.push(col);
										}
									}, this);  // end columns loop

									//Fields to excluded when doing an update
									array.forEach(this.excludeFields, lang.hitch(this, function(exclude) {
										this.cmisStore.excludeProperties.push(exclude);
									}));


									this.grid = new dgrid(
											{
												store : this.cmisStore,
												query: this.query,
												columns : cols
											}, this.wrighting_grid);
									this.grid.startup();
								}), function(err) {
									console.log(err);
								});
							} catch (err) {
								console.log(err);
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
										// https://localhost:8444/share/page/site/pf3k/folder-details?nodeRef=workspace://SpacesStore/37f82a52-55cf-4588-bf9f-8d11db8fce43
										return '<a href="' + Alfresco.constants.URL_PAGECONTEXT + 'edit-metadata?nodeRef='
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
