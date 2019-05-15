<script>
  import { gql } from 'apollo-boost';
  import { getClient, query } from 'svelte-apollo';
  import {debounce} from "lodash"
  import LocalEntitySummary, {fragment} from "./LocalEntitySummary.svelte"
	import { fade } from 'svelte/transition';

  const QUERY = gql`
    query SvelteDirectory($location: String!) {
      localSearch(search: { location: $location, resourceTypeId: "assisted-living" }) {
        localResources(first: 10) {
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
  // To prevent us overloading the backend, debounce the input
  const updateLocation = debounce((e) => location = e.target.value, 300)
</script>

<input type="text" value={location} on:input={updateLocation}>

{#await localEntities}
  <p>
    Loading...
  </p>
{:then localEntities}
  {#each localEntities as localEntity}
    <div transition:fade="{{duration: 300}}">
      <LocalEntitySummary localEntity={localEntity}/>
    </div>
  {/each}
{:catch error}
  Error: {error}
{/await}
