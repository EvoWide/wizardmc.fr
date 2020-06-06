export default function (req, res, next) {
  const paths = ['/users/profile', '/credits', '/users/security']

  paths.map((p) => {
    if (req.originalUrl.includes(p)) {
      // Will trigger the "traditional SPA mode"
      res.spa = true
    }
  })

  next()
}
