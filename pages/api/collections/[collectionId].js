import { getCollectionById } from '../../../lib/client';

export default async function handler(req, res) {
  const { collectionId } = req.query
  const data = await getCollectionById(collectionId);

  return res.json(data);
}
