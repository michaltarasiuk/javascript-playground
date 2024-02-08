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

  const copiedData = {...data};

  delete copiedData.incomplete_results;
  delete copiedData.repository_selection;
  delete copiedData.total_count;

  const namespaceKey = Object.keys(data)[0];

  return data[namespaceKey];
}

async function* getPaginatedData(url) {
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
      url = linkHeader.match(nextPattern)[0];
    }
  }
}

for await (const commit of getPaginatedData(
  '/repos/michaltarasiuk/MichalTarasiuk/commits',
)) {
  console.log(commit);
}
