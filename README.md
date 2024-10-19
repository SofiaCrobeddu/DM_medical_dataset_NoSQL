# DM_medical_dataset_NoSQL: Open Drug Knowledge Graph

This project was carried out by Group 25 for the third assignment of the course of Data Management for Data Science from the Master's degree in Data science at Sapienza University of Rome. It was made during the second semester of the academic year 2023-2024 (from February to June 2024).

The group was composed by:
| NAME and SURNAME | MATRICOLA | EMAIL |
| --- | --- | --- |
| Sofia Noemi Crobeddu | 2130389 | crobeddu.2130389@studenti.uniroma1.it | 
| Stefano Rinaldi | 1945551 | rinaldi.1945551@studenti.uniroma1.it |

## PURPOSE

The aim of this project is to use a NoSQL tool like **MongoDB**, to manage and query to dataset. This assignment was made after the first two performed using a SQL language on the same data (you can find the repository at this link: https://github.com/SofiaCrobeddu/DM_medical_dataset_SQL). 

## MongoDB

It is a document-based tool for non-relational databases. Compared to softwares like pgadmin4 for SQL languages (relational databases), we can underline the following differences:
- `MongoDB`:
 - document-oriented database;
 - it stores data in json like documents (no rows and columns);
 - good for unstructured data;
 - Java-like-language.

- `pgadmin4`:
 - for relational database;
 - it stores data in tables (rows and columns);
 - it uses schema(s) → good for structured data;
 - SQL language.


## REPOSITORIES

The repositories are two:
- **data**: it contains the csv files with the original datasets. The files inside are the following ones:
  - `condition.csv`: contains the health conditions. Each condition has an id, a name and an url link. It is also connected to an other csv files through the column source_id.
  - `drug.csv`: contains the healthcare drug's information. Each drug has an id, a name, a specific url link and a link to the drugbank.
  - `interaction.csv`: contains the interactions between drugs. Each interaction has an id and it is connected to an others csv files through the columns source_drug_id and target_drug_id.
  - `manufacturer.csv`: contains the manufacturer information. Each manufacturer has an id and a name.
  - `price.csv`: contains the medical product's price. Each price has an id, the value indicated by the column "price", a specific type and an url link. It is also connected to the others csv files through the columns product_id and store_id.
  - `product.csv`: contains the medical product's information. Each product has an id, a name, a type, an url link, the number of reviews. It is also connected to the others csv files through the columns source_id, drug_id and manufacturer_id.
  - `source.csv`: contains the source of information. Each source has an id a name (such as Wikidata, Drugbank, etc...) and the correspondent url. This dataset was not actually used and it is just put here for completeness.
  - `store.csv`: contains the store information. Each store has an id and a name.
  - `treatement.csv`: contains the treatements' information. Each treatment has an id, and it is connected to the others csv files through the columns source_id, drug_id and condition_id.
