export default async function handler(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    let body = req.body || {};
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) {}
    }

    const imageBase64 = body?.imageBase64;
    if (!imageBase64) return res.status(400).json({ error: 'No image provided' });

    const base64Data = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
    const imageBuffer = Buffer.from(base64Data, 'base64');

    const apiKey = process.env.HF_TOKEN || process.env.HF_API_KEY;

    // All candidate models — we try each and use the first one that responds
    const MODELS = [
      'dima806/deepfake_vs_real_image_detection',
      'prithivMLmods/Deep-Fake-Detector-v2-Model',
      'Heem2/deepfake-image-detection',
      'prithivMLmods/Deepfake-Detection-Exp-02-21',
      'jabertuhin/deepfake-image-detection',
    ];

    async function queryModel(model) {
      try {
        let response;
        for (let i = 0; i < 2; i++) {
          response = await fetch(
            `https://router.huggingface.co/hf-inference/models/${model}`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/octet-stream',
              },
              body: imageBuffer,
            }
          );
          console.log(`[${model}] status: ${response.status}`);
          if (response.status !== 503) break;
          await new Promise(r => setTimeout(r, 4000));
        }

        const text = await response.text();
        console.log(`[${model}] RAW:`, text.slice(0, 200));

        let result;
        try { result = JSON.parse(text); } catch { return null; }
        if (!Array.isArray(result)) return null;

        // Flexible label matching
        const fakeObj = result.find(p =>
          /fake|deepfake|generated|ai|synthetic|manipulated/i.test(p.label)
        );
        const realObj = result.find(p =>
          /real|authentic|genuine|original|natural/i.test(p.label)
        );

        if (fakeObj) { console.log(`[${model}] fake score: ${fakeObj.score}`); return fakeObj.score; }
        if (realObj) { console.log(`[${model}] real score: ${realObj.score} → fake: ${1 - realObj.score}`); return 1 - realObj.score; }

        // If labels are LABEL_0 / LABEL_1 — log them so we can figure out order
        console.log(`[${model}] Unknown labels:`, result.map(r => r.label));
        return null;
      } catch (err) {
        console.log(`[${model}] error: ${err.message}`);
        return null;
      }
    }

    // Run all models in parallel
    const scores = await Promise.all(MODELS.map(queryModel));
    const validScores = scores.filter(s => s !== null);

    console.log('All scores:', scores);
    console.log('Valid scores:', validScores);

    let fakeScore;
    if (validScores.length > 0) {
      fakeScore = validScores.reduce((a, b) => a + b, 0) / validScores.length;
    } else {
      fakeScore = 0.5;
    }

    console.log('Final averaged fakeScore:', fakeScore);

    const isFake = fakeScore > 0.5;

    return res.status(200).json({
      class: isFake ? 'Fake' : 'Real',
      confidence: Number((isFake ? fakeScore : 1 - fakeScore).toFixed(2)),
    });

  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ error: error.message });
  }
}