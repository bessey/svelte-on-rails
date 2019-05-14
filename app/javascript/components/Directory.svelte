<script>
  import { gql } from 'apollo-boost';
  import { getClient, query } from 'svelte-apollo';
  import LocalEntitySummary, {fragment} from "./LocalEntitySummary.svelte"

  const QUERY = gql`
    query SvelteDirectory($location: String!) {
      localSearch(search: { location: $location, resourceTypeId: "assisted-living" }) {
        localResources {
          edges {
            node {
              localEntity {
                ...LocalEntitySummary
              }
            }
          }
        }
      }
    }
    ${fragment}
  `

  const client = getClient();

  let location = "94110"
  $: localSearch = query(client, { query: QUERY, variables: { location } });
</script>

<input type="text" bind:value={location}>

{#await $localSearch}
  <p>
    Loading...
  </p>
{:then result}
  {#each result.data.localSearch.localResources.edges as edge}
    <LocalEntitySummary localEntity={edge.node.localEntity}/>
  {/each}
{:catch error}
  Error: {error}
{/await}
