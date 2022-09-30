// DONE: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'oo907cyv0f'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // DONE: Create an Auth0 application and copy values from it into this map. For example:
  // domain: 'dev-nd9990-p4.us.auth0.com',
  domain: 'dev-rejp9rz1.us.auth0.com',            // Auth0 domain
  clientId: 'Wn0qGftS9vUHMpZ7i9UEpXxJUrmiJ1wY',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
