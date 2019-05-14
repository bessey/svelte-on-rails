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
  $: localEntities = $localSearch.then(({data}) => {
    return data.localSearch.localResources.edges.map(({node}) => node.localEntity)
  })
</script>

<input type="text" bind:value={location}>

{#await localEntities}
  <p>
    Loading...
  </p>
{:then localEntities}
  {#each localEntities as localEntity}
    <LocalEntitySummary localEntity={localEntity}/>
  {/each}
{:catch error}
  Error: {error}
{/await}
