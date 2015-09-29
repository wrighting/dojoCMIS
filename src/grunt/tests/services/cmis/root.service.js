define([
        'when', 'when/delay'
], function(when, delay) {
    function JSONP(callback, data) {
        return callback + '(' + JSON.stringify(data) + ');';
    }

    return function(request) {
        var promise = when.promise(function(resolve, reject) {
            var succinct_data = {
                "file" : {
                    "succinctProperties" : {
                        "cmis:contentStreamLength" : 0,
                        "cmis:objectTypeId" : "cmis:document",
                        "cmis:versionSeriesCheckedOutBy" : null,
                        "cmis:versionSeriesCheckedOutId" : null,
                        "cmis:isPrivateWorkingCopy" : null,
                        "cmis:versionSeriesId" : "241f9d77-62ba-431a-b9c5-34622d0a3f2b",
                        "cmis:versionLabel" : "1.0",
                        "cmis:isLatestVersion" : true,
                        "cmis:isVersionSeriesCheckedOut" : false,
                        "cmis:lastModifiedBy" : "admin",
                        "cmis:createdBy" : "admin",
                        "alfcmis:nodeRef" : "workspace:\/\/SpacesStore\/241f9d77-62ba-431a-b9c5-34622d0a3f2b",
                        "cmis:isLatestMajorVersion" : true,
                        "cmis:contentStreamId" : "store:\/\/2014\/6\/16\/9\/5\/3627bdb7-12c6-4d09-8b4d-703519d0b2a2.bin",
                        "cmis:name" : "My Document",
                        "cmis:contentStreamMimeType" : "application\/octet-stream",
                        "cmis:creationDate" : 1402905951345,
                        "cmis:changeToken" : null,
                        "cmis:secondaryObjectTypeIds" : [
                            "P:sys:localized"
                        ],
                        "cmis:checkinComment" : "Initial Version",
                        "cmis:objectId" : "241f9d77-62ba-431a-b9c5-34622d0a3f2b;1.0",
                        "cmis:isImmutable" : false,
                        "cmis:isMajorVersion" : true,
                        "cmis:baseTypeId" : "cmis:document",
                        "cmis:description" : null,
                        "cmis:lastModificationDate" : 1402905951345,
                        "cmis:contentStreamFileName" : "My Document"
                    }
                },
                "folder" : {
                    "succinctProperties" : {
                        "cmis:allowedChildObjectTypeIds" : null,
                        "cmis:objectTypeId" : "cmis:folder",
                        "cmis:path" : "\/src\/grunt\/tests\/unit\/cmisdata\/newFolder1",
                        "cmis:name" : "newFolder1",
                        "cmis:creationDate" : 1402906027801,
                        "cmis:secondaryObjectTypeIds" : [
                            "P:sys:localized"
                        ],
                        "cmis:changeToken" : null,
                        "cmis:lastModifiedBy" : "admin",
                        "cmis:createdBy" : "admin",
                        "cmis:objectId" : "77707657-8ae5-43cc-9ec7-6bba23b3155d",
                        "alfcmis:nodeRef" : "workspace:\/\/SpacesStore\/77707657-8ae5-43cc-9ec7-6bba23b3155d",
                        "cmis:baseTypeId" : "cmis:folder",
                        "cmis:description" : null,
                        "cmis:parentId" : "781927da-3be5-4132-b216-3420bcddcc58",
                        "cmis:lastModificationDate" : 1402906027801
                    }
                }
            };

            var full_data = {
                "file" : {
                    "properties" : {
                        "cmis:contentStreamLength" : {
                            "id" : "cmis:contentStreamLength",
                            "localName" : "contentStreamLength",
                            "displayName" : "Content Stream Length",
                            "queryName" : "cmis:contentStreamLength",
                            "type" : "integer",
                            "cardinality" : "single",
                            "value" : 0
                        },
                        "cmis:objectTypeId" : {
                            "id" : "cmis:objectTypeId",
                            "localName" : "objectTypeId",
                            "displayName" : "Object Type Id",
                            "queryName" : "cmis:objectTypeId",
                            "type" : "id",
                            "cardinality" : "single",
                            "value" : "cmis:document"
                        },
                        "cmis:versionSeriesCheckedOutBy" : {
                            "id" : "cmis:versionSeriesCheckedOutBy",
                            "localName" : "versionSeriesCheckedOutBy",
                            "displayName" : "Version Series Checked Out By",
                            "queryName" : "cmis:versionSeriesCheckedOutBy",
                            "type" : "string",
                            "cardinality" : "single",
                            "value" : null
                        },
                        "cmis:versionSeriesCheckedOutId" : {
                            "id" : "cmis:versionSeriesCheckedOutId",
                            "localName" : "versionSeriesCheckedOutId",
                            "displayName" : "Version Series Checked Out Id",
                            "queryName" : "cmis:versionSeriesCheckedOutId",
                            "type" : "id",
                            "cardinality" : "single",
                            "value" : null
                        },
                        "cmis:isPrivateWorkingCopy" : {
                            "id" : "cmis:isPrivateWorkingCopy",
                            "localName" : "isPrivateWorkingCopy",
                            "displayName" : "Is private working copy",
                            "queryName" : "cmis:isPrivateWorkingCopy",
                            "type" : "boolean",
                            "cardinality" : "single",
                            "value" : null
                        },
                        "cmis:versionSeriesId" : {
                            "id" : "cmis:versionSeriesId",
                            "localName" : "versionSeriesId",
                            "displayName" : "Version series id",
                            "queryName" : "cmis:versionSeriesId",
                            "type" : "id",
                            "cardinality" : "single",
                            "value" : "7ab6b2fc-046d-448d-9823-e698c777333a"
                        },
                        "cmis:versionLabel" : {
                            "id" : "cmis:versionLabel",
                            "localName" : "versionLabel",
                            "displayName" : "Version Label",
                            "queryName" : "cmis:versionLabel",
                            "type" : "string",
                            "cardinality" : "single",
                            "value" : "1.0"
                        },
                        "cmis:isLatestVersion" : {
                            "id" : "cmis:isLatestVersion",
                            "localName" : "isLatestVersion",
                            "displayName" : "Is Latest Version",
                            "queryName" : "cmis:isLatestVersion",
                            "type" : "boolean",
                            "cardinality" : "single",
                            "value" : true
                        },
                        "cmis:isVersionSeriesCheckedOut" : {
                            "id" : "cmis:isVersionSeriesCheckedOut",
                            "localName" : "isVersionSeriesCheckedOut",
                            "displayName" : "Is Version Series Checked Out",
                            "queryName" : "cmis:isVersionSeriesCheckedOut",
                            "type" : "boolean",
                            "cardinality" : "single",
                            "value" : false
                        },
                        "cmis:lastModifiedBy" : {
                            "id" : "cmis:lastModifiedBy",
                            "localName" : "lastModifiedBy",
                            "displayName" : "Last Modified By",
                            "queryName" : "cmis:lastModifiedBy",
                            "type" : "string",
                            "cardinality" : "single",
                            "value" : "admin"
                        },
                        "cmis:createdBy" : {
                            "id" : "cmis:createdBy",
                            "localName" : "createdBy",
                            "displayName" : "Created by",
                            "queryName" : "cmis:createdBy",
                            "type" : "string",
                            "cardinality" : "single",
                            "value" : "admin"
                        },
                        "alfcmis:nodeRef" : {
                            "id" : "alfcmis:nodeRef",
                            "localName" : "nodeRef",
                            "displayName" : "Alfresco Node Ref",
                            "queryName" : "alfcmis:nodeRef",
                            "type" : "id",
                            "cardinality" : "single",
                            "value" : "workspace:\/\/SpacesStore\/7ab6b2fc-046d-448d-9823-e698c777333a"
                        },
                        "cmis:isLatestMajorVersion" : {
                            "id" : "cmis:isLatestMajorVersion",
                            "localName" : "isLatestMajorVersion",
                            "displayName" : "Is Latest Major Version",
                            "queryName" : "cmis:isLatestMajorVersion",
                            "type" : "boolean",
                            "cardinality" : "single",
                            "value" : true
                        },
                        "cmis:contentStreamId" : {
                            "id" : "cmis:contentStreamId",
                            "localName" : "contentStreamId",
                            "displayName" : "Content Stream Id",
                            "queryName" : "cmis:contentStreamId",
                            "type" : "id",
                            "cardinality" : "single",
                            "value" : "store:\/\/2014\/6\/17\/10\/17\/c8197167-8c92-4761-917b-07fe7740eeb4.bin"
                        },
                        "cmis:name" : {
                            "id" : "cmis:name",
                            "localName" : "name",
                            "displayName" : "Name",
                            "queryName" : "cmis:name",
                            "type" : "string",
                            "cardinality" : "single",
                            "value" : "My Document"
                        },
                        "cmis:contentStreamMimeType" : {
                            "id" : "cmis:contentStreamMimeType",
                            "localName" : "contentStreamMimeType",
                            "displayName" : "Content Stream MIME Type",
                            "queryName" : "cmis:contentStreamMimeType",
                            "type" : "string",
                            "cardinality" : "single",
                            "value" : "application\/octet-stream"
                        },
                        "cmis:creationDate" : {
                            "id" : "cmis:creationDate",
                            "localName" : "creationDate",
                            "displayName" : "Creation Date",
                            "queryName" : "cmis:creationDate",
                            "type" : "datetime",
                            "cardinality" : "single",
                            "value" : 1402996628464
                        },
                        "cmis:changeToken" : {
                            "id" : "cmis:changeToken",
                            "localName" : "changeToken",
                            "displayName" : "Change token",
                            "queryName" : "cmis:changeToken",
                            "type" : "string",
                            "cardinality" : "single",
                            "value" : null
                        },
                        "cmis:secondaryObjectTypeIds" : {
                            "id" : "cmis:secondaryObjectTypeIds",
                            "localName" : "secondaryObjectTypeIds",
                            "displayName" : "Secondary Object Type Ids",
                            "queryName" : "cmis:secondaryObjectTypeIds",
                            "type" : "id",
                            "cardinality" : "multi",
                            "value" : [
                                "P:sys:localized"
                            ]
                        },
                        "cmis:checkinComment" : {
                            "id" : "cmis:checkinComment",
                            "localName" : "checkinComment",
                            "displayName" : "Checkin Comment",
                            "queryName" : "cmis:checkinComment",
                            "type" : "string",
                            "cardinality" : "single",
                            "value" : "Initial Version"
                        },
                        "cmis:objectId" : {
                            "id" : "cmis:objectId",
                            "localName" : "objectId",
                            "displayName" : "Object Id",
                            "queryName" : "cmis:objectId",
                            "type" : "id",
                            "cardinality" : "single",
                            "value" : "7ab6b2fc-046d-448d-9823-e698c777333a;1.0"
                        },
                        "cmis:isImmutable" : {
                            "id" : "cmis:isImmutable",
                            "localName" : "isImmutable",
                            "displayName" : "Is Immutable",
                            "queryName" : "cmis:isImmutable",
                            "type" : "boolean",
                            "cardinality" : "single",
                            "value" : false
                        },
                        "cmis:isMajorVersion" : {
                            "id" : "cmis:isMajorVersion",
                            "localName" : "isMajorVersion",
                            "displayName" : "Is Major Version",
                            "queryName" : "cmis:isMajorVersion",
                            "type" : "boolean",
                            "cardinality" : "single",
                            "value" : true
                        },
                        "cmis:baseTypeId" : {
                            "id" : "cmis:baseTypeId",
                            "localName" : "baseTypeId",
                            "displayName" : "Base Type Id",
                            "queryName" : "cmis:baseTypeId",
                            "type" : "id",
                            "cardinality" : "single",
                            "value" : "cmis:document"
                        },
                        "cmis:description" : {
                            "id" : "cmis:description",
                            "localName" : "description",
                            "displayName" : "Description",
                            "queryName" : "cmis:description",
                            "type" : "string",
                            "cardinality" : "single",
                            "value" : null
                        },
                        "cmis:lastModificationDate" : {
                            "id" : "cmis:lastModificationDate",
                            "localName" : "lastModificationDate",
                            "displayName" : "Last Modified Date",
                            "queryName" : "cmis:lastModificationDate",
                            "type" : "datetime",
                            "cardinality" : "single",
                            "value" : 1402996628464
                        },
                        "cmis:contentStreamFileName" : {
                            "id" : "cmis:contentStreamFileName",
                            "localName" : "contentStreamFileName",
                            "displayName" : "Content Stream Filename",
                            "queryName" : "cmis:contentStreamFileName",
                            "type" : "string",
                            "cardinality" : "single",
                            "value" : "My Document"
                        }
                    }
                },
                "folder" : {
                    "properties" : {
                        "cmis:allowedChildObjectTypeIds" : {
                            "id" : "cmis:allowedChildObjectTypeIds",
                            "localName" : "allowedChildObjectTypeIds",
                            "displayName" : "Allowed Child Object Types Ids",
                            "queryName" : "cmis:allowedChildObjectTypeIds",
                            "type" : "id",
                            "cardinality" : "multi",
                            "value" : null
                        },
                        "cmis:objectTypeId" : {
                            "id" : "cmis:objectTypeId",
                            "localName" : "objectTypeId",
                            "displayName" : "Object Type Id",
                            "queryName" : "cmis:objectTypeId",
                            "type" : "id",
                            "cardinality" : "single",
                            "value" : "cmis:folder"
                        },
                        "cmis:path" : {
                            "id" : "cmis:path",
                            "localName" : "path",
                            "displayName" : "Path",
                            "queryName" : "cmis:path",
                            "type" : "string",
                            "cardinality" : "single",
                            "value" : "\/src\/grunt\/tests\/unit\/cmisdata\/Test"
                        },
                        "cmis:name" : {
                            "id" : "cmis:name",
                            "localName" : "name",
                            "displayName" : "Name",
                            "queryName" : "cmis:name",
                            "type" : "string",
                            "cardinality" : "single",
                            "value" : "Test"
                        },
                        "cmis:creationDate" : {
                            "id" : "cmis:creationDate",
                            "localName" : "creationDate",
                            "displayName" : "Creation Date",
                            "queryName" : "cmis:creationDate",
                            "type" : "datetime",
                            "cardinality" : "single",
                            "value" : 1401186380845
                        },
                        "cmis:secondaryObjectTypeIds" : {
                            "id" : "cmis:secondaryObjectTypeIds",
                            "localName" : "secondaryObjectTypeIds",
                            "displayName" : "Secondary Object Type Ids",
                            "queryName" : "cmis:secondaryObjectTypeIds",
                            "type" : "id",
                            "cardinality" : "multi",
                            "value" : [
                                    "P:cm:titled", "P:sys:localized"
                            ]
                        },
                        "cmis:changeToken" : {
                            "id" : "cmis:changeToken",
                            "localName" : "changeToken",
                            "displayName" : "Change token",
                            "queryName" : "cmis:changeToken",
                            "type" : "string",
                            "cardinality" : "single",
                            "value" : null
                        },
                        "cmis:lastModifiedBy" : {
                            "id" : "cmis:lastModifiedBy",
                            "localName" : "lastModifiedBy",
                            "displayName" : "Last Modified By",
                            "queryName" : "cmis:lastModifiedBy",
                            "type" : "string",
                            "cardinality" : "single",
                            "value" : "test@wrighting.org"
                        },
                        "cmis:createdBy" : {
                            "id" : "cmis:createdBy",
                            "localName" : "createdBy",
                            "displayName" : "Created by",
                            "queryName" : "cmis:createdBy",
                            "type" : "string",
                            "cardinality" : "single",
                            "value" : "admin"
                        },
                        "cmis:objectId" : {
                            "id" : "cmis:objectId",
                            "localName" : "objectId",
                            "displayName" : "Object Id",
                            "queryName" : "cmis:objectId",
                            "type" : "id",
                            "cardinality" : "single",
                            "value" : "781927da-3be5-4132-b216-3420bcddcc58"
                        },
                        "alfcmis:nodeRef" : {
                            "id" : "alfcmis:nodeRef",
                            "localName" : "nodeRef",
                            "displayName" : "Alfresco Node Ref",
                            "queryName" : "alfcmis:nodeRef",
                            "type" : "id",
                            "cardinality" : "single",
                            "value" : "workspace:\/\/SpacesStore\/781927da-3be5-4132-b216-3420bcddcc58"
                        },
                        "cmis:baseTypeId" : {
                            "id" : "cmis:baseTypeId",
                            "localName" : "baseTypeId",
                            "displayName" : "Base Type Id",
                            "queryName" : "cmis:baseTypeId",
                            "type" : "id",
                            "cardinality" : "single",
                            "value" : "cmis:folder"
                        },
                        "cmis:description" : {
                            "id" : "cmis:description",
                            "localName" : "description",
                            "displayName" : "Description",
                            "queryName" : "cmis:description",
                            "type" : "string",
                            "cardinality" : "single",
                            "value" : null
                        },
                        "cmis:parentId" : {
                            "id" : "cmis:parentId",
                            "localName" : "parentId",
                            "displayName" : "Parent Id",
                            "queryName" : "cmis:parentId",
                            "type" : "id",
                            "cardinality" : "single",
                            "value" : "9ec7fa34-2c37-4c67-9fb6-19e55fde8ee2"
                        },
                        "cmis:lastModificationDate" : {
                            "id" : "cmis:lastModificationDate",
                            "localName" : "lastModificationDate",
                            "displayName" : "Last Modified Date",
                            "queryName" : "cmis:lastModificationDate",
                            "type" : "datetime",
                            "cardinality" : "single",
                            "value" : 1402906027819
                        },
                        "cm:description" : {
                            "id" : "cm:description",
                            "localName" : "description",
                            "displayName" : "Description",
                            "queryName" : "cm:description",
                            "type" : "string",
                            "value" : [
                                ""
                            ]
                        },
                        "cm:title" : {
                            "id" : "cm:title",
                            "localName" : "title",
                            "displayName" : "Title",
                            "queryName" : "cm:title",
                            "type" : "string",
                            "value" : [
                                ""
                            ]
                        }
                    }
                },
            };
            if (request.query.callback) {

                if (request.query.succinct) {
                    data = JSONP(request.query.callback, succinct_data[request.query.objectid]);
                } else {
                    data = JSONP(request.query.callback, full_data[request.query.objectid]);
                }

            }

            resolve({
                status : 200,
                headers : {
                    'Content-Type' : 'application/x-javascript'
                },
                body : [
                    data
                ]
            });
        });

        var milliseconds = request.query.delay;
        if (milliseconds) {
            milliseconds = parseInt(milliseconds, 10);
            promise = delay(milliseconds, promise);
        }

        return promise;
    };
});
