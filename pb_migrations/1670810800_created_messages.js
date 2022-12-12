migrate((db) => {
  const collection = new Collection({
    "id": "oguxetfgz7899q4",
    "created": "2022-12-12 02:06:40.421Z",
    "updated": "2022-12-12 02:06:40.421Z",
    "name": "messages",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hgow53re",
        "name": "email",
        "type": "email",
        "required": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "d5jzqxrk",
        "name": "message",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 500,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("oguxetfgz7899q4");

  return dao.deleteCollection(collection);
})
