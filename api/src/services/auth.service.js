import { sign, verify, decode  } from 'jsonwebtoken'
import { use } from 'passport'
import * as auth0passport from 'passport-auth0'
import * as fetch from 'node-fetch'
import * as dayJS from 'dayjs'

export const authenticate = (object, params, ctx, resolveInfo) => {
  return new Promise((res, rej) => {
    const user = {
      id: 1,
      username: 'sipho',
      email: 'psyphore@test.com',
    }
    sign({ user }, key, { expiresIn: '3h' }, (err, token) => {
      err ? rej(err) : res({ token })
    })
  })
}

export const authorize = (req, res, next, action) => {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader != 'undefined') {
    const bearer = bearerHeader.split(' ')
    const token = bearer[1]
    verify(token, key, (err, ad) => {
      err ? res.sendStatus(403) : action()
    })
  } else {
    res.sendStatus(403)
  }
}

export const getPassport = () => {
  const strategy = new auth0passport(
    {
      domain: process.env.AUTH_DOMAIN,
      clientID: process.env.AUTH_API_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      callbackURL: process.env.AUTH_CALLBACK_URL,
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
      return done(null, profile)
    }
  )

  const passport = use(strategy)

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    done(null, user)
  })

  return passport
}

export const apiAuth = () => {
  const payload = {
    client_id: process.env.AUTH_API_CLIENT_ID,
    client_secret: process.env.AUTH_CLIENT_SECRET,
    audience: process.env.AUTH_API_AUDIANCE,
    grant_type: process.env.AUTH_API_GRANT_TYPE,
  }

  let options = {
    method: 'POST',
    url: `https://${process.env.AUTH_DOMAIN}/oauth/token`,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  }

//   request(options, function (error, response, body) {
//     if (error) throw new Error(error)
//     console.log(body)
//   })

  fetch(options.url, options.body)
  .then((response) => console.log(response))
  .catch(err => throw new Error(err))
}

export const verifyToken = (token) => {
  const parsedToken = parseToken(token)
  const passport = getPassport()
  const res = passport.authenticate('auth0', { prompt: 'none' })
}

export const parseToken = (token) => {
  let parsed = decode(token.replace('Bearer ', ''))
  return parsed
}

export const isMe = (claims, requestObject) => {
  return (
    dayJS().millisecond() < claims.exp &&
    requestObject &&
    claims.email_verified &&
    claims.email +
      ''
        .toLocaleLowerCase()
        .indexOf(requestObject.email + ''.toLocaleLowerCase() !== -1)
  )
}
