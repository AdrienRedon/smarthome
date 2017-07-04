<template>
  <section class="container">
    <div>
      <main-title :title="title" :subtitle="subtitle"/>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'
  import Logo from '~components/Logo.vue'
  import MainTitle from '~components/MainTitle.vue'

  export default {
    data () {
      return {
        title: 'Lights',
        subtitle: 'Play with your lights'
      }
    },
    components: {
      Logo,
      MainTitle
    },
    mounted () {
      this.connectBridge()
    },
    methods: {
      connectBridge () {
        let storedApiIp = window.localStorage.getItem('apiIp')
        let storedApiUser = window.localStorage.getItem('apiUser')
        console.log(storedApiIp, storedApiUser)
        if(!storedApiIp || !storedApiUser) {
          axios.get('https://www.meethue.com/api/nupnp')
            .then(res => {
              window.localStorage.setItem('apiIp', res.data[0].internalipaddress)
              console.log(res.data[0].internalipaddress)
              return res.data[0].internalipaddress
            })
            .then(ip =>
              axios.post(`http://${ip}/api`, { devicetype:"vue-smarthome" } )
                .then(res => { 
                  if (res.data[0].success == undefined) {
                    alert('Try to press the link button on the bridge')
                    this.connectBridge()
                  } else {
                    window.localStorage.setItem('apiUser', res.data[0].success.username)
                  }
                })
                .catch(err => console.error('Your bridge was not found 😢'))
            )
        }
      }
    }
  }
</script>
