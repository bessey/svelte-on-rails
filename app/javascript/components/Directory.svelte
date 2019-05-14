<script>
  import { gql } from 'apollo-boost';
  import { getClient, query } from 'svelte-apollo';
  import LocalEntitySummary, {fragment} from "./LocalEntitySummary.svelte"

  const QUERY = gql`
    query {
      localSearch(search: { location: "94110", resourceTypeId: "assisted-living" }) {
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

  const localSearch = query(client, { query: QUERY });
</script>

<!-- 4. Use $books (note the "$"), to subscribe to query values -->
{#await $localSearch}
  Loading...
{:then result}
  {#each result.data.localSearch.localResources.edges as edge}
    <LocalEntitySummary localEntity={edge.node.localEntity}/>
  {/each}
{:catch error}
  Error: {error}
{/await}
