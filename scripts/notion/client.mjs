const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export function createClient(token, { fetchImpl = fetch, wait = sleep } = {}) {
  if (!token) throw new Error('NOTION_TOKEN is required');
  return async function request(method, endpoint, body) {
    for (let attempt = 0; attempt < 4; attempt++) {
      await wait(350);
      let response;
      try {
        response = await fetchImpl(`https://api.notion.com/v1/${endpoint}`, {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            'Notion-Version': '2026-03-11',
            'Content-Type': 'application/json',
          },
          ...(body ? { body: JSON.stringify(body) } : {}),
          signal: AbortSignal.timeout(30000),
        });
      } catch {
        if (method === 'POST' || attempt === 3)
          throw new Error(
            `Notion ${method} ${endpoint}: network error; inspect before retrying setup`,
          );
        await wait(1000 * 2 ** attempt);
        continue;
      }
      if (response.ok) return response.json();
      if (
        !(
          response.status === 429 ||
          (method !== 'POST' && response.status >= 500)
        ) ||
        attempt === 3
      )
        throw new Error(
          `Notion ${method} ${endpoint}: HTTP ${response.status}`,
        );
      const seconds = Number(response.headers.get('retry-after'));
      if (seconds > 60)
        throw new Error('Notion Retry-After exceeds 60 seconds; retry later');
      await wait(
        Number.isFinite(seconds) && seconds > 0
          ? seconds * 1000
          : 1000 * 2 ** attempt,
      );
    }
  };
}
