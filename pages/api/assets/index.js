import { getAssets } from '../../../lib/client';

export default async function handler(req, res) {
  const { query } = req;
  const { locale } = query;

  const data = await getAssets(locale);
  return res.json(data);
}
