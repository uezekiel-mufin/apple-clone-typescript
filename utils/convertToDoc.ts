export function convertDocToObj(doc: ProductsProps) {
  doc._id = doc._id.toString();
  doc._createdAt = doc._createdAt.toString();
  doc._updatedAt = doc._updatedAt.toString();
  return doc;
}
