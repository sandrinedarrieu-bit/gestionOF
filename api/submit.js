export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { nom, prenom, email, telephone, formationId } = req.body || {};

  if (!nom || !prenom || !email || !formationId) {
    return res.status(400).json({ error: 'Champs obligatoires manquants' });
  }

  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
  const BASE_ID = 'appzy12LVEyTZUNWa';
  const TABLE_ID = 'tblcCAedGe4KKYz6P'; // Stagiaires

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            Nom: nom,
            Prénom: prenom,
            Email: email,
            Telephone: telephone || '',
            'Formation souhaitée': [formationId],
            Statut: 'Prospect'
          }
        })
      }
    );

    if (!response.ok) {
      const errBody = await response.text();
      console.error('Erreur Airtable:', errBody);
      throw new Error(`Airtable a répondu ${response.status}`);
    }

    const record = await response.json();
    res.status(200).json({ id: record.id });
  } catch (err) {
    res.status(500).json({ error: "Impossible d'enregistrer la demande" });
  }
}
