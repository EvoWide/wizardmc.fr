export default ({ store, redirect }) => {
  if (store.state.auth.currentUser !== null) {
    return redirect('/')
  }
}
