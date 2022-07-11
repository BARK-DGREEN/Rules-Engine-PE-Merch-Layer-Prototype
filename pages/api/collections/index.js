import { getCollections } from '../../../lib/client';

export default async function handler(req, res) {
  const { query } = req;
  const { locale } = query;

  const data = await getCollections(locale);
  return res.json(data);
}
