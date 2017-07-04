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
        title: 'Routines',
        subtitle: 'Make your home smarter'
      }
    },
    components: {
      Logo,
      MainTitle
    }
  }
</script>
