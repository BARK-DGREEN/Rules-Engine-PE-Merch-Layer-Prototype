import { getAsset } from '../../../lib/client';

export default async function handler(req, res) {
  const { assetId } = req.query
  const data = await getAsset(assetId);

  return res.json(data);
}