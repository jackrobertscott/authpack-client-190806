const options = {
  url: 'https://api.v1.authpack.io/graphql',
  method: 'POST',
  headers: {
    Authorization: bundle.authData.api_key,
  },
  params: {
    // code...
  },
  body: {
    query: `query {
      users: ListUsers(options: { sort: "created" }) {
        id
        created
        updated
        summary
        email
        username
        name
        name_given
        name_family
        verified
        sessions_count
        teams_count
        billable
      }
    }`,
  },
};
return z.request(options).then(response => {
  response.throwForStatus();
  const results = z.JSON.parse(response.content);
  if (results.errors && results.errors.length) {
    throw new Error(results.errors[0].message);
  }
  return results.data.users;
});
