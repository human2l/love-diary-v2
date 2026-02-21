module.exports = async (req, res) => {
  const originalUrl = req.originalUrl || req.url;
  const pathMatch = originalUrl.match(/\/api\/airtableProxy(.*)/);
  const pathToAppend = pathMatch ? pathMatch[1] : req.url;

  let targetPath = pathToAppend.replace(/^\/v0\/[^\/?]+/, `/v0/${process.env.AIRTABLE_BASE_NAME}`);
  const targetUrl = `https://api.airtable.com${targetPath}`;

  const fetchOptions = {
    method: req.method,
    headers: {
      "Authorization": `Bearer ${process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
      "Content-Type": req.headers["content-type"] || "application/json"
    }
  };

  if (req.method !== 'GET' && req.method !== 'HEAD' && req.body && Object.keys(req.body).length > 0) {
    if (typeof req.body === 'object') {
      fetchOptions.body = JSON.stringify(req.body);
    } else {
      fetchOptions.body = req.body;
    }
  }

  try {
    const response = await fetch(targetUrl, fetchOptions);
    const data = await response.text();
    const contentType = response.headers.get("content-type");
    if (contentType) {
       res.setHeader("Content-Type", contentType);
    }
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
