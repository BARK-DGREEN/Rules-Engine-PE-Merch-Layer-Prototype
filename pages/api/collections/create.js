import { createCollection } from '../../../lib/client';

export default async function handler(req, res) {
  const data = await createCollection(JSON.parse(req.body));

  return res.json(data);
}
