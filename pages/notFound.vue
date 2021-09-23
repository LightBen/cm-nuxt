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
          name: 'og:type',
          content: 'website'
        },
        {
          name: 'og:title',
          content: title
        },
        {
          name: 'og:description',
          content: 'notFound.'
        },
        {
          name: 'og:image',
          content: '/cm-logo-full.png'
        }]
        
    }
    },
    name: 'notFound'
};
</script>
