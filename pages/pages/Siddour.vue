<template>
    <page-mix :pageId="pageId"></page-mix>
</template>

<script>

export default {
    head () {
        const title = 'Siddour | Constantine Minhagim'
        return {
        title,
        meta: [
            {
            name: 'description',
            content: 'Siddour page of Constantine Minhagim.'
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
            content: 'Siddour page of Constantine Minhagim.'
            },
            {
            name: 'og:image',
            content: '/cm-og-default.jpg'
            }]

        }
    },
    name: "Siddour",
    data() {
        return {
            pageId: "siddur"
        }
    }
};
</script>
