define([
        'intern!object', 'intern/chai!assert', 'wrighting/cmis/store/CmisStore', 'intern/dojo/domReady!'
], function(registerSuite, assert, CmisStore) {

    var succinct_store = new CmisStore({
        base : '/__services/cmis'
    });

    var full_store = new CmisStore({
        base : '/__services/cmis',
        succinct : false
    });

    registerSuite({
        name : 'wrighting/cmis/store/CmisStore',

        '.get' : [
            function() {
                var dfd = this.async(1000);

                var ss = succinct_store.get("file").then(dfd.callback(function(item) {
                    assert.strictEqual(item['cmis:name'], 'My Document');
                    var id = succinct_store.getIdentity(item);
                    assert.strictEqual(id,"241f9d77-62ba-431a-b9c5-34622d0a3f2b;1.0");
                }), dfd.reject);
              
            }
        ],
        '.get-full' : [
                  function() {
                      var dfd = this.async();

                      var ss = full_store.get("file").then(dfd.callback(function(item) {
                          assert.strictEqual(item['cmis:name'].value, 'My Document');
                          var id = full_store.getIdentity(item);
                          assert.strictEqual(id,"7ab6b2fc-046d-448d-9823-e698c777333a;1.0");
                      }), dfd.reject);
                    
                  }
              ],
    });
});
