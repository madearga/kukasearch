const EXA_API_KEY = process.env.NEXT_PUBLIC_EXA_API_KEY;
const EXA_API_URL = 'https://api.exa.ai/search';

interface SearchParams {
  category?: string;
  publishDate?: string;
  domainFilter?: string;
  phraseFilter?: string;
  numResults?: number;
}

export async function searchExa(query: string, params: SearchParams = {}) {
  try {
    const response = await fetch(EXA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': EXA_API_KEY,
      },
      body: JSON.stringify({
        query,
        num_results: params.numResults || 10,
        use_autoprompt: true,
        category: params.category !== 'all' ? params.category : undefined,
        publish_time: params.publishDate !== 'any' ? params.publishDate : undefined,
        domains: params.domainFilter ? [params.domainFilter] : undefined,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Exa API Error:', response.status, errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching Exa:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}
