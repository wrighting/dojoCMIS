define(["dojo/_base/declare",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "alfresco/core/Core",
        "wrighting/cmis/store/CmisStoreAlf",
        "wrighting/cmis/CmisGrid"], function(declare, _Widget, _Templated, Core, CmisStoreAlf, CmisGrid) {
   return declare([_Widget, _Templated, Core, CmisGrid], {
	   _getStore: function wrighting_getStore() {
           this.cmisStore = new CmisStoreAlf({
               base : this.targetRoot,
               succinct : true,
               timeout : this.timeout

           });
       	
       },
		_log : function wrighting_log(level, message) {
			this.alfLog(level, message);
		}
      })
});
