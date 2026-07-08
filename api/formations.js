export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
  const BASE_ID = 'appzy12LVEyTZUNWa';
  const TABLE_ID = 'tblkhGsVTSpD6zddJ'; // Formations

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?fields%5B%5D=Nom%20de%20la%20formation`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Airtable a répondu ${response.status}`);
    }

    const data = await response.json();
    const formations = (data.records || []).map((r) => ({
      id: r.id,
      nom: r.fields['Nom de la formation'] || 'Sans nom'
    }));

    res.status(200).json({ formations });
  } catch (err) {
    res.status(500).json({ error: 'Impossible de récupérer les formations' });
  }
}
