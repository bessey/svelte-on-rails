<script>
  import { gql } from 'apollo-boost';

  export let localEntity
</script>
<script context="module">
  export const fragment = gql`
    fragment LocalEntitySummary on LocalEntity {
      id
      name
      description
      lastReviewSnippet
      photos(onlyHighQuality: true) {
        id
        url
      }
    }
  `
</script>
<style>
  img {
    max-width: 100%;
  }
</style>

<h2>{localEntity.name}</h2>
{#if localEntity.photos[0]}
  <img src={localEntity.photos[0].url} alt={`Photo of ${localEntity.name}`}/>
{/if}
{#if localEntity.description}
  {@html localEntity.description}
{/if}
{#if localEntity.lastReviewSnippet}
  <quote>{localEntity.lastReviewSnippet}</quote>
{/if}
