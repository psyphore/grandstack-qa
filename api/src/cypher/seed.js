export const AddNode = (labelName) => {
  return `MERGE (n:$label)
        ON CREATE SET 
            n +=$node,
            n.id=apoc.create.uuid()
    RETURN n`.replace('$label', labelName)
}

export const AddRelationship = (node1, node2, relationshipName) => {
  return `WITH apoc.date.currentTimestamp() AS timestamp
    MERGE (n1:$node1)-[r:$relationshipName{date: timestamp}]->(n1:$node2) RETURN *`
    .replace('$node1', node1)
    .replace('$node2', node2)
    .replace('$relationshipName', relationshipName)
}
