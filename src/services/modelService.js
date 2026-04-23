/**
 * BotSniff AI Model Service Layer
 * 
 * This file handles sending the image to our secure backend which
 * interfaces with the Hugging Face Inference API.
 */

// Helper to compress image before sending to save bandwidth and avoid timeouts
const compressImage = async (imageElement, maxDimension = 224) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    let width = imageElement.width;
    let height = imageElement.height;

    if (width > height && width > maxDimension) {
      height *= maxDimension / width;
      width = maxDimension;
    } else if (height > maxDimension) {
      width *= maxDimension / height;
      height = maxDimension;
    }

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(imageElement, 0, 0, width, height);

    // Get as base64 JPEG, 80% quality
    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
    resolve(dataUrl);
  });
};

/**
 * Transform the raw API response { class, confidence } into the
 * shape that ResultCard expects: { botProbability, confidence, insights }
 */
const transformResult = (raw) => {
  const cls = (raw.class || '').toLowerCase(); // "fake", "real", or "unknown"
  const conf = raw.confidence ?? 0.5;

  // botProbability = probability of being a deepfake/bot
  let botProbability;
  if (cls === 'fake') {
    botProbability = conf;
  } else if (cls === 'real') {
    botProbability = 1 - conf;
  } else {
    botProbability = 0.5;
  }

  const insights = buildInsights(cls, conf, botProbability);

  return {
    class: raw.class,
    confidence: conf,
    botProbability: Number(botProbability.toFixed(2)),
    insights,
    ...(raw.error ? { error: raw.error } : {}),
    ...(raw.note  ? { note:  raw.note  } : {}),
  };
};

const buildInsights = (cls, conf, botProb) => {
  const confPct = Math.round(conf * 100);
  const botPct  = Math.round(botProb * 100);

  if (cls === 'fake') {
    return [
      `Model classified this image as AI-generated with ${confPct}% confidence.`,
      `Deepfake probability score: ${botPct}%.`,
      'Facial feature inconsistencies or GAN artifacts may be present.',
      'Exercise caution before trusting or sharing this profile image.',
    ];
  }

  if (cls === 'real') {
    return [
      `Model classified this image as authentic with ${confPct}% confidence.`,
      `Deepfake probability score: ${botPct}%.`,
      'No significant GAN-related artifacts were detected.',
      'Image appears consistent with a genuine photograph.',
    ];
  }

  return [
    'The model was unable to reach a confident conclusion.',
    'This can occur with unusual lighting, heavy filters, or low resolution.',
    'Try uploading a clearer, front-facing portrait for a better result.',
  ];
};

export const predictImage = async (imageElement) => {
  try {
    const compressedBase64 = await compressImage(imageElement);

    const response = await fetch('/api/detect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64: compressedBase64 }),
    });

    let raw;
    try {
      raw = await response.json();
    } catch {
      throw new Error('Invalid response from server');
    }

    if (!response.ok) {
      return transformResult({
        class: 'Unknown',
        confidence: 0.5,
        error: raw?.error || 'Model temporarily unavailable',
      });
    }

    return transformResult(raw);

  } catch (error) {
    console.error('Deepfake API Error:', error);
    throw error;
  }
};