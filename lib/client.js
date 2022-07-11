const authUrl = process.env.CTP_AUTH_URL;
const apiUrl = process.env.CTP_API_URL;
const clientId = process.env.CTP_CLIENT_ID;
const clientSecret = process.env.CTP_CLIENT_SECRET;
const projectKey = process.env.CTP_PROJECT_KEY;

async function getToken() {
  const tokenUrl = `${authUrl}/oauth/token?grant_type=client_credentials`;
  const unEncodedToken = `${clientId}:${clientSecret}`;
  const encodedToken = Buffer(unEncodedToken).toString('base64');
  const res = await fetch(tokenUrl, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${encodedToken}`
    }
  });
  const data = await res.json();
  return data.access_token;
}

async function getAnonymousToken(localRefreshToken = null) {
  if (localRefreshToken) {
    const refreshTokenUrl = `${authUrl}/oauth/token?grant_type=refresh_token&refresh_token=${localRefreshToken}`
    const unEncodedToken = `${clientId}:${clientSecret}`;
    const encodedToken = Buffer(unEncodedToken).toString('base64');
    const res = await fetch(refreshTokenUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${encodedToken}`
      }
    });

    const data = await res.json();

    return { accessToken: data.access_token, refreshToken: data.refresh_token };
  }

  const tokenUrl = `${authUrl}/oauth/${projectKey}/anonymous/token?grant_type=client_credentials`;
  const unEncodedToken = `${clientId}:${clientSecret}`;
  const encodedToken = Buffer(unEncodedToken).toString('base64');
  const res = await fetch(tokenUrl, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${encodedToken}`
    }
  });
  const data = await res.json();
  const { access_token, refresh_token } = data;

  return { accessToken: access_token, refreshToken: refresh_token };
}

export async function getGraphQlData(query, variables = null) {
  const accessToken = await getToken();
  const url = `${apiUrl}/${projectKey}/graphql`;
  const res = await fetch(url, {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: query,
      variables: variables
    }),
  });

  return res;
}

// https://docs.commercetools.com/api/projects/custom-objects#query-customobjects
// GET /collections # Get a list of collections
// fetch(`/api/collections`)
export async function getCollections(queryString = null) {
  const accessToken = await getToken();
  const collectionsUrl = `${apiUrl}/${projectKey}/custom-objects/collections?${queryString}`;
  const res = await fetch(collectionsUrl, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })

  const data = await res.json();

  return data;
}

// https://docs.commercetools.com/api/projects/custom-objects#get-customobject-by-container-and-key
// GET /collection/:id # Get the definition of single collection
// fetch(`/api/collections/1`)
export async function getCollectionById(id) {
  const accessToken = await getToken();
  const collectionUrl = `${apiUrl}/${projectKey}/custom-objects/collection/${id}`;
  const res = await fetch(collectionUrl, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })

  const data = await res.json();

  return data;
}

// Note - Need to finalize this call
// https://docs.commercetools.com/api/projects/custom-objects#get-customobject-by-container-and-key
// GET /collection/:id/results # Get the matches for a collection 
// fetch(`/api/collections/1`)
export async function getCollectionMatches(id) {
  const accessToken = await getToken();
  const collectionUrl = `${apiUrl}/${projectKey}/custom-objects/collections/${id}/results`;
  const res = await fetch(collectionUrl, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })

  const data = await res.json();

  return data;
}

// https://docs.commercetools.com/api/projects/custom-objects#create-or-update-customobject
// POST /collections  # Create a new collection
// fetch('/api/collections/create', {
//   method: 'post',
//   body: JSON.stringify({
//     test: 'test'
//   })
// })
export async function createCollection(collection) {
  const accessToken = await getToken();
  const collectionUrl = `${apiUrl}/${projectKey}/custom-objects`;
  const requestBody = {
    // Keys & values for collection here
    container: 'collection',
    key: 'collection-1'
  }


  const res = await fetch(collectionUrl, {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(requestBody)
  });

  const data = await res.json();
}


// https://docs.commercetools.com/api/projects/custom-objects#create-or-update-customobject
// GET /experiences # Get a list of experiences 
// fetch(`/api/experiences`)
// OR GET /experiences/:type # Get a list of experiences of the given type
// fetch(`/api/experiences?type=typeToQueryOn`)
export async function getExperiences(queryString = null) {
  const accessToken = await getToken();
  const experiencesUrl = `${apiUrl}/${projectKey}/custom-objects/experiences?${queryString}`;
  const res = await fetch(experiencesUrl, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  const data = await res.json();

  return data;
}

// https://docs.commercetools.com/api/projects/custom-objects#create-or-update-customobject
// GET /experience/:id # Get the definition of single experience
// fetch(`/api/experiences/1`)
export async function getExperienceById(id) {
  const accessToken = await getToken();
  const experiencesUrl = `${apiUrl}/${projectKey}/custom-objects/experiences/${id}`;
  const res = await fetch(experiencesUrl, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })

  const data = await res.json();

  return data;
}

// GET /assets/:id # Get the definition of single assets
// fetch(`/api/assets/1`)
// https://docs.commercetools.com/api/projects/custom-objects#create-or-update-customobject
export async function getAsset(id) {
  const accessToken = await getToken();
  const collectionUrl = `${apiUrl}/${projectKey}/custom-objects/assets/${id}`;
  const res = await fetch(collectionUrl, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })

  const data = await res.json();

  return data;
}

// GET /assets/:type # Get a list of assets of the given type (images, content,...)
// fetch(`/api/assets?type=typeToQueryOn`)
// https://docs.commercetools.com/api/projects/custom-objects#create-or-update-customobject

// GET /assets/:source # Get a list of assets from the given source (contentful, product catalog,...)
// fetch(`/api/assets?source=sourceToQueryOn`)
// https://docs.commercetools.com/api/projects/custom-objects#create-or-update-customobject
export async function getAssets(queryString = null) {
  const accessToken = await getToken();
  const collectionUrl = `${apiUrl}/${projectKey}/custom-objects/assets?${queryString}`;
  const res = await fetch(collectionUrl, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })

  const data = await res.json();

  return data;
}
