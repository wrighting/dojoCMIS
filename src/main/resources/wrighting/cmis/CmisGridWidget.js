define(["dojo/_base/declare",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dojo/text!./MyWidget.html",
        "alfresco/core/Core",
        "wrighting/cmis/CmisGrid"], function(declare, _Widget, _Templated, template, Core, CmisGrid) {
   return declare([_Widget, _Templated, Core, CmisGrid], {
//Not actually doing anything apart from adding Core
      })
});
