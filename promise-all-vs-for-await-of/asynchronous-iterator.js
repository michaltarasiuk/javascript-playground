import {Octokit} from 'octokit';
import {env} from '../config.js';

const octokit = new Octokit({
  auth: env.ACCESS_TOKEN,
});

function parseCommits(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (!data) {
    return [];
  }

  const dataCopy = {...data};

  delete dataCopy.incomplete_results;
  delete dataCopy.repository_selection;
  delete dataCopy.total_count;

  const namespaceKey = Object.keys(dataCopy).at(0);

  return dataCopy[namespaceKey];
}

async function* getCommits(url) {
  const nextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i;
  let pagesRemaining = true;

  while (pagesRemaining) {
    const response = await octokit.request(`GET ${url}`, {
      per_page: 100,
    });

    const commits = parseCommits(response.data);
    for (const commit of commits) {
      yield commit;
    }

    const linkHeader = response.headers.link;

    pagesRemaining = Boolean(linkHeader) && linkHeader.includes(`rel=\"next\"`);

    if (pagesRemaining) {
      url = linkHeader.match(nextPattern).at(0);
    }
  }
}

for await (const commit of getCommits(
  '/repos/michaltarasiuk/MichalTarasiuk/commits',
)) {
  console.log(commit);
}
