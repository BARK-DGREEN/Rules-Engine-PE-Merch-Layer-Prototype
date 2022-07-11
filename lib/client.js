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

// Used to test connection...
export async function getCarts() {
  const accessToken = await getToken();
  console.log("accessToken");
  const cartUrl = `https://api.us-central1.gcp.commercetools.com/${projectKey}/carts/`;
  const res = await fetch(cartUrl, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })

  const data = await res.json();
  return data['results'];
}



// POST /collections  # Create a new collection
// Parameters
// 	name: 
// context: (atb, navigation, assignment)
// must_match: (any, all)
// rules: [
// { 
// type: (product,collection,customer),
//       feature: (type dependent, e.g. price, inventory, allergen),
//       matcher: (equals, less than, great than, contains, etc),
//       match_value: (value to match)
// }
// ]
export async function createCollection({ collection, localRefreshToken }) {
  const {accessToken, refreshToken} = await getAnonymousToken(localRefreshToken);

  const collectionUrl = `${apiUrl}/${projectKey}/collections`;

  const requestBody = {
    // Keys & values for collection here
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

// GET /collections # Get a list of collections
// Parameters
// 	context: (atb, navigation, assignment)
export async function getCollections() {
  const accessToken = await getToken();
  const collectionsUrl = `${apiUrl}/${projectKey}/collections`;
  const res = await fetch(collectionsUrl, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })

  const data = await res.json();

  return data;
}

// GET /collection/:id # Get the definition of single collection
// Parameters
// 	context: (/*TBD*/)
export async function getCollection(id) {
  const accessToken = await getToken();
  const collectionUrl = `${apiUrl}/${projectKey}/collections/${id}`;
  const res = await fetch(collectionUrl, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })

  const data = await res.json();

  return data;
}

// GET /collection/:id/results # Get the matches for a collection 
// Parameters
// 	context: (/*TBD*/)
export async function getCollectionMatches(id) {
  const accessToken = await getToken();
  const collectionUrl = `${apiUrl}/${projectKey}/collections/${id}/results`;
  const res = await fetch(collectionUrl, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })

  const data = await res.json();

  return data;
}


// GET /experiences # Get a list of experiences 
// Parameters
// 	context: (/*TBD*/)
export async function getExperiences() {
  const accessToken = await getToken();
  const experiencesUrl = `${apiUrl}/${projectKey}/experiences`;
  const res = await fetch(experiencesUrl, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })

  const data = await res.json();

  return data;
}

// GET /experience/:id # Get the definition of single experience
// Parameters
// 	context: (/*TBD*/)
export async function getExperiencesById(id) {
  const accessToken = await getToken();
  const experiencesUrl = `${apiUrl}/${projectKey}/experiences/${id}`;
  const res = await fetch(experiencesUrl, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })

  const data = await res.json();

  return data;
}

// GET /experiences/:type # Get a list of experiences of the given type
// Parameters
// 	context: (/*TBD*/)
export async function getExperiencesByType(type) {
  const accessToken = await getToken();
  const experiencesUrl = `${apiUrl}/${projectKey}/experiences/${type}`;
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
// Parameters
// 	context: (/*TBD*/)
export async function getAsset(id) {
  const accessToken = await getToken();
  const collectionUrl = `${apiUrl}/${projectKey}/assets/${id}`;
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
// Parameters
// 	context: (/*TBD*/)
export async function getAssetsByType(type) {
  const accessToken = await getToken();
  const collectionUrl = `${apiUrl}/${projectKey}/assets/${type}`;
  const res = await fetch(collectionUrl, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })

  const data = await res.json();

  return data;
}

// GET /assets/:source # Get a list of assets from the given source (contentful, product catalog,...)
// Parameters
// 	context: (/*TBD*/)
export async function getAssetsBySource(type) {
  const accessToken = await getToken();
  const collectionUrl = `${apiUrl}/${projectKey}/assets/${type}`;
  const res = await fetch(collectionUrl, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })

  const data = await res.json();

  return data;
}
