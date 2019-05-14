<style>
  /* I'll affect things outside Svelte */
  :global(body) {
    font-family: "Helvetica Neue";
    background-color: ivory;
    color: darkslategray;
    padding: 0;
    margin: 0;
  }
  :global(body, input) {
    font-size: calc(14px + 0.5vw);
  }
  :global(html) {
    padding: 0;
    margin: 0;

  }
  /* I'll cascade downward */
  :global(.app) {
    max-width: 60em;
    margin: auto;
  }
</style>


<script>
  import ApolloClient from 'apollo-boost';
  import { setClient } from 'svelte-apollo';
  import Directory from './Directory.svelte';

  // 1. Create an Apollo client and pass it to all child components
  //    (uses svelte's built-in context)
  const client = new ApolloClient({ uri: 'https://dir.caring.com/api/queries' });
  setClient(client);
</script>

<div class="app">
  <h1>Caring.com</h1>

  <Directory/>
</div>
