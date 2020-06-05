export default function (req, res, next) {
  const paths = ['/users/profile', '/credits', '/users/security']

  if (paths.includes(req.originalUrl)) {
    // Will trigger the "traditional SPA mode"
    res.spa = true
  }

  next()
}
