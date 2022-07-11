import { getExperienceById } from '../../../lib/client';

export default async function handler(req, res) {
  const { experienceId } = req.query
  const data = await getExperienceById(experienceId);

  return res.json(data);
}