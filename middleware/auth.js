export default function ({ redirect }) {
  if (!this.$auth.strategy.token()) {
    return redirect('/login')
  }
}