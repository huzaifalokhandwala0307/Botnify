const res = await fetch(
  "https://api-inference.huggingface.co/models/prithivMLmods/deepfake-detector-model-v1",
  {
    method: "POST",
    headers: {
      Authorization: "Bearer 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",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: "test" })
  }
);
console.log("Status:", res.status);
console.log("Body:", await res.text());