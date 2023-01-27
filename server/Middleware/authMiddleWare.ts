import jwt from 'koa-jwt';
import jwks from 'jwks-rsa';

export const verifyJwt = jwt({
      secret: jwks.koaJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://dev-nuxp1yqmbgbv4efn.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'gpt-tapi.com',
    issuer: 'https://dev-nuxp1yqmbgbv4efn.us.auth0.com/',
    algorithms: ['RS256']
});