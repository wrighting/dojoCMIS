define(["dojo/_base/declare",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dojo/text!./MyWidget.html",
        "alfresco/core/Core",
        "wrighting/cmis/CmisGrid"], function(declare, _Widget, _Templated, template, Core, CmisGrid) {
   return declare([_Widget, _Templated, Core, CmisGrid], {
		_log : function wrighting_log(level, message) {
			this.alfLog(level, message);
		}
      })
});
