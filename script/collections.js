// Treatment collection schema validation
db.createCollection("treatment", {
    validator: { $jsonSchema: {
        // setting the required keys
        required: [ "_id", "condition_id", "drug_id"],
        // setting the allowed data types for each key
        properties: {
            _id: { bsonType: "objectId" },
            condition_id: { bsonType: "int" },
            drug_id: { bsonType: "string" }
        }
    }}
});

// Unique index creation in treatment collection
db.treatment.createIndex( { condition_id: 1, drug_id: 1 }, { unique: true });


// Product collection schema validation
db.createCollection("product", {
    validator: { $jsonSchema: {
        required: [ "_id", "drug_id", "manufacturer_id" ],
        properties: {
            _id: { bsonType: "objectId" },
            source_id: { bsonType: "int" },
            drug_id: { bsonType: "string" },
            name: { bsonType: "string" },
            url: { bsonType: "string" },
            type: { bsonType: "string" },
            n_reviews: { bsonType: "int" },
            manufacturer_id: { bsonType: "int" }
        }
    }}
});

// Unique index creation in product collection
db.product.createIndex( { drug_id: 1 }, { unique: true });


// Drug collection schema validation
db.createCollection("drug", {
    validator: { $jsonSchema: {
        required: [ "_id", "name" ],
        properties: {
            _id: { bsonType: "string" },
            name: { bsonType: "string" },
            wiki_url: { bsonType: "string" },
            drugbank_url: { bsonType: "string" }
        }
    }}
});

// Unique index creation in drug collection
db.drug.createIndex( { _id: 1 }, { unique: true });


// Price collection schema validation
db.createCollection("price", {
    validator: { $jsonSchema: {
        required: [ "_id", "product_id", "store_id" ],
        properties: {
            _id: { bsonType: "objectId" },
            product_id: { bsonType: "int" },
            store_id: { bsonType: "int" },
            type: { bsonType: "string" },
            price: { bsonType: "double" },
            url: { bsonType: "string" }
        }
    }}
});

// Unique index creation in price collection
db.price.createIndex( { product_id: 1, store_id: 1 }, { unique: true });


// Condition collection schema validation
db.createCollection("condition", {
    validator: { $jsonSchema: {
        required: [ "_id", "name" ],
        properties: {
            _id: { bsonType: "objectId" },
            name: { bsonType: "string" },
            source_id: { bsonType: "int" },
            url: { bsonType: "string" }
        }
    }}
});

// Unique index creation in condition collection
db.condition.createIndex( { name: 1 }, { unique: true });


// Store collection schema validation
db.createCollection("store", {
    validator: { $jsonSchema: {
        required: [ "_id", "name" ],
        properties: {
            _id: { bsonType: "objectId" },
            name: { bsonType: "string" }
        }
    }}
});

// Unique index creation in store collection
db.store.createIndex( { name: 1 }, { unique: true });


// Manufacturer collection schema validation
db.createCollection("manufacturer", {
    validator: { $jsonSchema: {
        required: [ "_id", "name" ],
        properties: {
            _id: { bsonType: "objectId" },
            name: { bsonType: "string" }
        }
    }}
});

// Unique index creation in manufacturer collection
db.manufacturer.createIndex( { name: 1 }, { unique: true });