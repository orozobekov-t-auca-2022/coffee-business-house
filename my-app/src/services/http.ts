export async function safeFetch(input: string, init?: RequestInit): Promise<Response> {
  try {
    return await fetch(input, init);
  } catch (err) {
    console.error('[safeFetch] initial fetch failed for', input, err);
    if (typeof input === 'string' && input.startsWith('http://')) {
      const httpsUrl = input.replace(/^http:\/\//i, 'https://');
      try {
        return await fetch(httpsUrl, init);
      } catch (err2) {
        console.error('[safeFetch] https fallback failed for', httpsUrl, err2);
        throw err2;
      }
    }
    throw err;
  }
}
