const EXA_API_URL = 'https://api.exa.ai/search';
const EXA_API_KEY = process.env.NEXT_PUBLIC_EXA_API_KEY;

interface SearchParams {
  category: string;
  publishDate: string;
  domainFilter: string;
  phraseFilter: string;
  numResults: number;
}

export async function searchExa(query: string, params: SearchParams) {
  const { category, publishDate, domainFilter, phraseFilter, numResults } = params;

  if (!EXA_API_KEY) {
    throw new Error('EXA_API_KEY is not set');
  }

  const searchParams = {
    query,
    num_results: numResults,
    use_autoprompt: true,
    type: 'neural', // We'll use 'neural' as the default type
    ...(publishDate !== 'any' && { recency: publishDate }),
    ...(domainFilter && { include_domains: [domainFilter] }),
    ...(phraseFilter && { required_keywords: [phraseFilter] }),
  };

  // Add category-specific parameters
  if (category !== 'all') {
    searchParams.query = `${category}: ${query}`;
  }

  console.log('Search params:', JSON.stringify(searchParams, null, 2));

  try {
    const response = await fetch(EXA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': EXA_API_KEY,
      },
      body: JSON.stringify(searchParams),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching Exa:', error);
    throw error;
  }
}
