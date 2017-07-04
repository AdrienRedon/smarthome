<template>
  <section class="container">
    <div>
      <main-title :title="title" :subtitle="subtitle"/>
    </div>
  </section>
</template>

<script>
  import Logo from '~components/Logo.vue'
  import MainTitle from '~components/MainTitle.vue'

  export default {
    data () {
      return {
        title: 'Vue-Smarthome',
        subtitle: 'Home automation made easy'
      }
    },
    components: {
      Logo,
      MainTitle
    },
  }
</script>
