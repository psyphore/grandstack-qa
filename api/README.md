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
UNWIND value.products AS products
WITH products.item AS item
RETURN item.color, item.item_no, item.brand
```

```cypher
CALL apoc.load.json("./import/releases.json") YIELD value AS releases
UNWIND releases AS release
WITH apoc.map.merge(properties(release),{id:apoc.create.uuid(), created:timestamp()}) AS release
MERGE (r:Release) ON CREATE SET r += release
RETURN r
```

```cypher
CALL apoc.load.json("./import/people-project.json") YIELD value AS rels
UNWIND rels AS rel
WITH apoc.map.merge(properties(rel),{id:apoc.create.uuid(), created:timestamp()}) AS item
RETURN item
//MERGE (r:Release) ON CREATE SET r += release
//RETURN r
```

```cypher
CALL apoc.load.json("./import/projects.json") YIELD value AS projects
UNWIND projects AS project
WITH apoc.map.merge(properties(project),{id: apoc.create.uuid(), created:timestamp()}) AS item
MERGE (p:Project) ON CREATE SET p += item
RETURN p
```

```cypher
CALL apoc.load.json("./import/people-project.json") YIELD value AS rels
UNWIND rels AS rel
WITH apoc.map.merge(properties(rel),{id:apoc.create.uuid(), created:timestamp()}) AS item
UNWIND item.relationship AS relation
CALL apoc.cypher.run('MATCH (n:' + relation.from.label + ') return n', null) YIELD value
WITH value.n as _from, relation
CALL apoc.cypher.run('MATCH (m:' + relation.to.label + ') return m', null) YIELD value
WITH value.m as _to, _from, relation
WHERE _to.name = relation.to.node AND _from.name = relation.from.node
WITH _from, _to, relation
CALL apoc.create.relationship(_from, relation.name,{created:timestamp()}, _to) YIELD rel
REMOVE rel.noOp
RETURN _from, _to, relation
```

```cypher
CALL apoc.load.json("./import/stories.json") YIELD value AS stories
UNWIND stories AS story
WITH apoc.map.merge(properties(story),{id: apoc.create.uuid(), created:timestamp()}) AS item
MERGE (s:Story{id:item.id}) ON CREATE SET s += item
RETURN COUNT(s), s
```

```cypher
CALL apoc.load.json("./import/story-subtask.json") YIELD value AS rels
UNWIND rels AS rel
WITH apoc.map.merge(properties(rel),{id:apoc.create.uuid(), created:timestamp()}) AS item
UNWIND item.relationship AS relation
CALL apoc.cypher.run('MATCH (n:' + relation.from.label + ') return n', null) YIELD value
WITH value.n as _from, relation
CALL apoc.cypher.run('MATCH (m:' + relation.to.label + ') return m', null) YIELD value
WITH value.m as _to, _from, relation
WHERE _to.summary = relation.to.node AND _from.summary = relation.from.node
WITH _from, _to, relation
CALL apoc.create.relationship(_from, relation.name,{created:timestamp()}, _to) YIELD rel
REMOVE rel.noOp
RETURN _from, _to, relation
```

```cypher
CALL apoc.load.json("./import/people-stories.json") YIELD value AS rels
UNWIND rels AS rel
WITH apoc.map.merge(properties(rel),{id:apoc.create.uuid(), created:timestamp()}) AS item
UNWIND item.relationship AS relation
CALL apoc.cypher.run('MATCH (n:' + relation.from.label + ') return n', null) YIELD value
WITH value.n as _from, relation
CALL apoc.cypher.run('MATCH (m:' + relation.to.label + ') return m', null) YIELD value
WITH value.m as _to, _from, relation
WHERE _to.summary = relation.to.node AND _from.name = relation.from.node
WITH _from, _to, relation
CALL apoc.create.relationship(_from, relation.name,{created:timestamp()}, _to) YIELD rel
REMOVE rel.noOp
RETURN _from, _to, rel
```

```cypher
MATCH (p:Project{name: 'D8 MVP'}), (r:Release{name: 'D8 MVP'}), (pr:Product{name: 'D8'})
CALL apoc.create.relationship(p,'RELEASED', {created: timestamp()}, r) YIELD rel AS pR
CALL apoc.create.relationship(pr,'INCLUDES', {created: timestamp()}, r) YIELD rel AS prR
REMOVE prR.noOp
REMOVE pR.noOp
//WITH pR, p, r, pr, prR
RETURN p, r, pr, prR, pR
```

```cypher
MATCH (s:Story), (r:Release{name: 'D8 MVP'})
CALL apoc.create.relationship(s,'PART_OF', {created: timestamp()}, r) YIELD rel AS sR
REMOVE sR.noOp
RETURN s, r, sR
```

```cypher
MATCH (u:User{name:'Cyril'}), (r:Release{name: 'D8 MVP'})
CALL apoc.create.relationship(u,'LEAD_BY', {created: timestamp()}, r) YIELD rel AS uR
REMOVE uR.noOp
RETURN u, r, uR
```

```cypher
MATCH (u:User{name:'Mbali'}), (r:Project{name: 'D8 MVP'})
CALL apoc.create.relationship(u,'LEAD_BY', {created: timestamp()}, r) YIELD rel AS uR
REMOVE uR.noOp
RETURN u, r, uR
```

```cypher
WITH apoc.map.merge({name: 'SignoffDocument.pdf', mimeType: 'application/pdf', data: 'data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog...'},{id:apoc.create.uuid(), created:timestamp()}) AS document
MERGE (a:Article{id:document.id}) ON CREATE SET a+=document
WITH a
MATCH (r:Release{name: 'D8 MVP'})
CALL apoc.create.relationship(a, 'SIGN_OFF', {created: timestamp()}, r) YIELD rel
RETURN r,a,rel
```

```cypher
WITH apoc.map.merge({name: 'TestCaseDocument.pdf', mimeType: 'application/pdf', data: 'data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog...'},{id:apoc.create.uuid(), created:timestamp()}) AS document
MERGE (a:Article{id:document.id}) ON CREATE SET a+=document
MATCH (s:Story{summary: 'D8 UI'}), (u:User{name: 'Pearl'})
WITH a,s,u
CALL apoc.create.relationship(a, 'SIGN_OFF', {created: timestamp()}, s) YIELD rel as _as
CALL apoc.create.relationship(u, 'AUTHOR', {created: timestamp()}, a) YIELD rel as ua
REMOVE _as.noOp
REMOVE ua.noOp
RETURN u,a,s
```

```cypher
MATCH (s:Article{name: 'SignoffDocument.pdf'}), (u:User{name: 'Mbali'})
WITH s,u
CALL apoc.create.relationship(u, 'AUTHOR', {created: timestamp()}, s) YIELD rel AS su
REMOVE su.noOp
RETURN u,s,su
```
