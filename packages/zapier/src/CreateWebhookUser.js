const options = {
  url: 'https://api.v1.authpack.io/graphql',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: bundle.authData.api_key,
  },
  params: {
    // code...
  },
  body: {
    variables: {
      value: {
        event: 'users.create',
        url: bundle.targetUrl,
      },
    },
    query: `
      mutation CreateWebhook($value: CreateWebhookValue!) {
        webhook: CreateWebhook(value: $value) {
          id
        }
      }
    `,
  },
};
return z.request(options).then(response => {
  response.throwForStatus();
  const results = z.JSON.parse(response.content);
  if (results.errors && results.errors.length) {
    throw new Error(results.errors[0].message);
  }
  return results.data.webhook;
});
