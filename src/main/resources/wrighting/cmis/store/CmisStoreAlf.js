/**
 * @module wrighting/cmis/store/CmisStoreAlf
 * @extends module:wrighting/cmis/store/CmisStore
 * @mixes module:alfresco/core/CoreXhr
*/
define(["dojo/_base/declare",
        "dojo/_base/lang", "dojo/aspect",
        "dojo/request", "dojo/Deferred", 
        "alfresco/core/Core",
        "alfresco/core/CoreXhr",
        "wrighting/cmis/store/CmisStore"], function(declare, lang, aspect, request, Deferred, Core, CoreXhr, CmisStore) {
   return declare([Core, CoreXhr, CmisStore], {
	   

	   _doGet: function wrighting_xhr_doGet(url, options, functionOK, functionError) {
		   
		   aspect.before(request, "xhr", lang.hitch(this,function(method, args) {
			   args.timeout = this.timeout;
			   args.headers["My-Header"] = "1234";
			  return [method, args]; 
		   }));
		   var results = new Deferred();
		   results.then(lang.hitch(this, functionOK), functionError);
		   
		   this.serviceXhr({url : url,
               method: "GET",
               handleAs: "application/json",
               successCallback: function(res) {
            	   results.resolve(res);
               },
               failureCallback: function(err) {
            	   results.reject(err);
               },
               callbackScope: this});
		   
		   return results;

	   },
	  
	   _doPost: function wrighting_xhr_doGet(params, options) {

           var token = this.mid + this._getToken();

           if (options.form) {
               var tokenNodes = query('input[name=token]', options.form);
               if (tokenNodes.length > 0) {
                   domAttr.set(tokenNodes[0], 'value', token);
               } else {
                   domConstruct.create("input", {
                       name : "token",
                       value : token,
                       type : "hidden"
                   }, options.form);

               }
           } else {
               options.data.token = token;
           }

		   var results = new Deferred();
		   results.then(lang.hitch(this, function error(data) {
        	   if (data['name'] && data['name'] == 'SecurityError') {
        		   results.reject(data);
        		   return;
        	   }
        	   //Because the response is json there's always an error (for iframe to work a json response needs to be wrapped in a textarea)
        	   var queryParams = '?cmisselector=lastResult&token=' + token;
        	   var outcome = this._doGet(this.base + queryParams, {
        		   jsonp : "callback",
        		   timeout : this.timeout
        	   }, function(data) {

        		   if (data.code && data.code >= 200 && data.code <= 300) {
        			   //Likely 200 - OK or 201 - created
        			   if (data.code == 201) {
        				   //Created - dijit Tree at least expects the created object to be returned so...
        				   this.get(data.objectId, {
        					   usePath : false
        				   }).then(lang.hitch(this, function(newObject) {
        					   results.resolve(newObject);
        				   }), function(error) {
        					   results.reject(error);
        				   });
        			   } else {
        				   results.resolve(data);
        			   }
        		   } else if (data.code && data.code >= 400 && data.code <= 500) {
        			   //An error code
        			   results.reject(data);
        		   } else {
        			   //Don't know what's going on so just resolve
        			   //This is the case for remove because it's not a transaction so comes back as an unknown transaction
        			   //Should probably try and do something tidier for remove
        			   results.resolve(data);
        		   }

        	   });
           }), function(data) {
               console.log("Unexpected success!");
           });
		   
		   this.serviceXhr({url : this.target + (params || ''),
               data: options.data,
               handleAs: "application/json",
               headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
               successCallback: function(res) {
            	   results.resolve(res);
               },
               failureCallback: function(err) {
            	   results.reject(err);
               },
               callbackScope: this});
		   
		   return results;

	   },
	  
	   defaultProgressCallback: function wrighting_CoreXhr__defaultProgressCallback(response, requestConfig) {
	       this.alfLog("log", "[DEFAULT CALLBACK] The following progress response was received", response, requestConfig);
	   },
	   _log : function wrighting_log(level, message) {
			this.alfLog(level, message);
	   }
      })
});
