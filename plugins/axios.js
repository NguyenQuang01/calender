export default ({ store, $axios }) => {
  $axios.defaults.baseURL = store.state.env.URL

  console.log('11111 ~ file: axios.js:4 ~ store.state.env.URL:', store.state.env.URL)

}