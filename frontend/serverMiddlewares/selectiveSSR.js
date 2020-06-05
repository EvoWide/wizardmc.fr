export default function (req, res, next) {
  const paths = ['/users/profile', '/credits', '/users/security']
  // A very simple check
  console.log(req.originalUrl)
  if (paths.includes(req.originalUrl)) {
    console.log(req.originalUrl, 'include')
    // Will trigger the "traditional SPA mode"
    res.spa = true
  }
  // Don't forget to call next in all cases!
  // Otherwise, your app will be stuck forever :|
  next()
}
