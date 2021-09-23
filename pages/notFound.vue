<template>
<div>
    <client-only>
        <div id="not-found">
            <div class="container">
                <h1>404 Not found</h1>
                <div class="content"><router-link to="/">Constantine Minhagim</router-link></div>
            </div>
        </div>
    </client-only>
</div>
</template>

<script>
export default {
    head () {
    const title = 'notFound' + ' | Constantine Minhagim'
    return {
      title,
      meta: [
        {
          name: 'description',
          content: 'notFound.'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:title',
          content: title
        },
        {
          property: 'og:description',
          content: 'notFound.'
        },
        {
          property: 'og:image',
          content: '/cm-logo-full.png'
        }]
        
    }
    },
    name: 'notFound'
};
</script>
