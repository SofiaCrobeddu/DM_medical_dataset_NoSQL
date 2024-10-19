// NOTE: We use the same dataset of HW 1-2 without changes. As for HW 1-2 where we created 7 tables (product, drug, price, condition, treatment, store, manufacturer), 
// also for HW 3 we created 7 collections: product, drug, price, condition, treatment, store, manufacturer. 
// In this way we could maintain a coherence in having the same information extracted from the queries that for HW 1-2 were in mySQL language and HW 3 
// in Java-like-language.


// 1. Which are the products with an average number of reviews higher than 1000 and which is their type (RX for Prescription or OTC for Over-the-Counter)?
// INDEXES:
db.product.createIndex({ drug_id: 1 });
db.drug.createIndex({ id: 1 });

db.product.aggregate([
  {
    $lookup: {
      from: "drug",
      localField: "drug_id",
      foreignField: "id",
      as: "drug_details"
    }
  },
  {
    $match: {
      "drug_details.id": { $exists: true }
    }
  },
  {
    $group: {
      _id: { name: "$name", type: "$type" },
      avg_reviews: { $avg: "$n_reviews" }
    }
  },
  {
    $match: {
      avg_reviews: { $gt: 1000 }
    }
  },
  {
    $sort: {
      avg_reviews: -1
    }
  },
  {
    $project: {
      _id: 0,
      prod_name: "$_id.name",
      prod_type: "$_id.type",
      avg_reviews: 1
    }
  }
])


// 2. Which is the most frequent drug sold and used?
db.product.aggregate([
  {
    $group: {
      _id: "$drug_id",
      frequency: { $sum: 1 }
    }
  },
  {
    $sort: { frequency: -1 }
  },
  {
    $limit: 1
  },
  {
    $lookup: {
      from: "drug",
      localField: "_id",
      foreignField: "id",
      as: "drug_details"
    }
  },
  {
    $unwind: "$drug_details"
  },
  {
    $project: {
      _id: 0,
      drug_id: "$_id",
      drug_name: "$drug_details.name"
    }
  }
])
  

// 3. Which are the prices or the price's range of the most used drug?
db.product.aggregate([
  {
    $match: { drug_id: "DB00741" }
  },
  {
    $lookup: {
      from: "price",
      localField: "id",
      foreignField: "product_id",
      as: "prices"
    }
  },
  {
    $unwind: "$prices"
  },
  {
    $group: {
      _id: null, 
      min_price: { $min: "$prices.price" },
      max_price: { $max: "$prices.price" },
      frequency: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0, 
      min_price: 1,
      max_price: 1,
      frequency: 1
    }
  }
])


// 4. Which are the conditions treated by the most used drug?
db.treatment.aggregate([
  {
    $match: {
      "drug_id": "DB00741"
    }
  },
  {
    $group: {
      _id: "$condition_id",
      frequency: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "condition",
      localField: "_id",
      foreignField: "id",
      as: "condition_details"
    }
  },
  {
    $unwind: "$condition_details"
  },
  {
    $project: {
      _id: 0,
      condition_name: "$condition_details.name",
      frequency: 1
    }
  },
  {
    $sort: {
      frequency: -1,
      condition_name: 1
    }
  }
])


// 5. Which are the drugs' names to treat COVID-19?
// INDEXES:
db.treatment.createIndex({ condition_id: 1 });
db.treatment.createIndex({ drug_id: 1 });
db.condition.createIndex({ id: 1 });
db.condition.createIndex({ name: 1 });

db.treatment.aggregate([
  {
    $lookup: {
      from: "condition",
      localField: "condition_id",
      foreignField: "id",
      as: "condition_details"
    }
  },
  {
    $unwind: "$condition_details"
  },
  {
    $match: {
      "condition_details.name": "COVID-19"
    }
  },
  {
    $lookup: {
      from: "drug",
      localField: "drug_id",
      foreignField: "id",
      as: "drug_details"
    }
  },
  {
    $unwind: "$drug_details"
  },
  {
    $group: {
      _id: "$drug_details.name"
    }
  },
  {
    $project: {
      _id: 0,
      name: "$_id"
    }
  }
])


// 6. Which are the medical products to treat anxiety?
// INDEX:
db.treatment.createIndex({ drug_id: 1 });

db.treatment.aggregate([
  {
    $lookup: {
      from: "condition",
      localField: "condition_id",
      foreignField: "id",
      as: "condition_details"
    }
  },
  {
    $unwind: "$condition_details"
  },
  {
    $match: {
      "condition_details.name": { $regex: "anxiety", $options: "i" }
    }
  },
  {
    $lookup: {
      from: "drug",
      localField: "drug_id",
      foreignField: "id",
      as: "drug_details"
    }
  },
  {
    $unwind: "$drug_details"
  },
  {
    $lookup: {
      from: "product",
      localField: "drug_id",
      foreignField: "drug_id",
      as: "product_details"
    }
  },
  {
    $unwind: "$product_details"
  },
  {
    $group: {
      _id: "$product_details.drug_id",
      product_name: { $first: "$product_details.name" }
    }
  },
  {
    $project: {
      _id: 0,
      drug_id: "$_id",
      product_name: 1
    }
  },
  {
    $sort: {
      product_name: 1 }}])
  

// ALTERNATIVE query:
// - step 1 → find anxiety id:
db.condition.find({name:"anxiety"})


// - step 2 → searching for the drug_id associated:
db.treatment.aggregate([
  {
    $match: {
      condition_id: 684
    }
  },
  {
    $group: {
      _id: null,
      unique_drug_ids: { $addToSet: "$drug_id" }
    }
  },
  {
    $unwind: "$unique_drug_ids"
  },
  {
    $lookup: {
      from: "drug",
      localField: "unique_drug_ids",
      foreignField: "id",
      as: "drug_details"
    }
  },
  {
    $unwind: "$drug_details"
  },
  {
    $project: {
      _id: 0,
      drug_name: "$drug_details.name",
      drug_id: "$unique_drug_ids"
    }
  },
  {
    $sort: {
      drug_name: 1 }}])

// NOTE: For the alternative query we extracted the drug_name instead of the product_name.


// 7.  Which is the drug prescribed for the highest number of conditions?
db.treatment.aggregate([
  {
    $group: {
      _id: "$drug_id",
      num_conditions: { $sum: 1 }
    }
  },
  {
    $sort: { num_conditions: -1 }
  },
  {
    $limit: 1
  },
  {
    $project: {
      drug_id: "$_id",
      num_conditions: 1,
      _id: 0 }} ])

// find the drug associated to it:
db.drug.find({id:"DB00741"})
  

// 8. Which is the average price of each product in descending order?
db.price.aggregate([
  {
    $group: {
      _id: "$product_id",
      avg_price: { $avg: "$price" }
    }
  },
  {
    $project: {
      _id: 0,
      product_id: "$_id",
      avg_price: 1
    }
  },
  {
    $sort: {
      avg_price: -1
    }
  }
])


// 9. Which is the store that sells the greatest number of drugs?
db.price.aggregate([
  {
    $group: {
      _id: "$store_id",
      count: { $sum: 1 }    }
  },
  {
    $sort: { count: -1 }   },
  {
    $limit: 1 
  }
])

// finding the result:
db.store.find({id:3})
 

// 10. Which is the most treated condition?
db.treatment.aggregate([ {
    $group: {
      _id: "$condition_id",
      count: { $sum: 1 }
    }
  },
  {
    $sort: { count: -1 }
  },
  {
    $limit: 1
  },
  {
    $lookup: {
      from: "condition",
      localField: "_id",
      foreignField: "id",
      as: "condition"
    }
  },
  {
    $unwind: "$condition"
  },
  {
    $project: {
      _id: 0,
      name: "$condition.name" } } ]);


// 11. Which is the manufacturer which manufactures the majority of drugs?
db.product.aggregate([
  {
    $group: {
      _id: "$manufacturer_id",
      count: { $sum: 1 }    }
  },
  {
    $sort: { count: -1 }   },
  {
    $limit: 2 
  }
])

// finding the name:
db.manufacturer.find({id:1890})