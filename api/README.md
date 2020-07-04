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
WITH 'https://raw.githubusercontent.com/neo4j-contrib/neo4j-apoc-procedures/4.0/src/test/resources/person.json' AS url
CALL apoc.load.json(url) YIELD value as person
MERGE (p:Person{ name:person.name})
ON CREATE SET p.age = person.age, p.children = size(person.children)
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
