<template>
  <div>
    <my_Header></my_Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>
<script>
    import Header from "../components/header.vue"
    import Banner from "../components/Banner.vue"
    import Footer from "../components/footer.vue"
    export default {
        name: "",
        data() {
            return {}
        },
        created() {

        },
        computed: {},
        watch: {},
        methods: {},
        activated() {
        },
        mounted() {
        },
        components: {
          my_Header:Header,
          my_Banner:Banner,
          Footer
        },
    }
</script>
<style scoped>
</style>
