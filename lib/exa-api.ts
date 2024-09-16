import ExaClient from 'exa-js';

const exaClient = new ExaClient(process.env.NEXT_PUBLIC_EXA_API_KEY);

export async function searchExa(query: string) {
  try {
    const response = await exaClient.search(query);
    return response.results;
  } catch (error) {
    console.error('Error searching Exa:', error);
    return [];
  }
}
