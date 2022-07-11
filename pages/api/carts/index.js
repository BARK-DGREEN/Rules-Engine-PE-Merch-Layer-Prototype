import { getCarts } from '../../../lib/client';

export default async function handler(req, res) {
  const { query } = req;
  const { locale } = query;
  
  const data = await getCarts();
  return res.json(data);
}
