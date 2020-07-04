# GRANDstack Starter - GraphQL API

## Quick Start

Install dependencies:

```
npm install
```

Start the GraphQL service:

```
npm start
```

This will start the GraphQL service (by default on localhost:4000) where you can issue GraphQL requests or access GraphQL Playground in the browser:

![GraphQL Playground](img/graphql-playground.png)

## Configure

Set your Neo4j connection string and credentials in `.env`. For example:

_.env_

```
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=letmein
```

## Seeding The Database

Optionally you can seed the GraphQL service by executing mutations that will write sample data to the database:

```
npm run seedDb
```

## importing data

```cypher
CALL apoc.load.json("./import/people.json") YIELD value AS people
UNWIND people AS person
WITH apoc.create.uuid() AS uuid , person
MERGE (u:User)
  ON CREATE SET
    u += person,
  	u.created = timestamp(),
    u.id = uuid
RETURN u
```

```cypher
CALL apoc.load.json("./import/products.json") YIELD value AS products
UNWIND products AS product
WITH apoc.create.uuid() AS uuid , product
MERGE (p:Product)
  ON CREATE SET
    p += product,
    p.id = uuid,
  	p.created = timestamp()

RETURN p
```

```cypher
CALL apoc.periodic.iterate('
CALL apoc.load.json("file:///path/to/file.json") YIELD value AS item
','
MERGE (n:Node)
ON CREATE SET n += item
',{batchSize:10000})
```

```
 wsl -d Alpine -u root
```

```cypher
CALL apoc.load.json("product.json") YIELD value
UNWIND value.products as products
WITH products.item as item
RETURN item.color, item.item_no, item.brand
```
