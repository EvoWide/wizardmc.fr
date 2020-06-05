export default ({ store, redirect }) => {
  if (process.client && store.state.auth.currentUser === null) {
    return redirect('/login')
  }
}
