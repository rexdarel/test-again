<template>
  <v-card flat>
    <v-toolbar
      color="teal"
      dark
      extended
      flat
    >
      <v-toolbar-side-icon></v-toolbar-side-icon>
    </v-toolbar>

    <v-layout row pb-2>
      <v-flex xs8 offset-xs2>
        <v-card class="card--flex-toolbar">
          <v-toolbar card prominent>
            <v-toolbar-title class="body-2 grey--text">Scanner</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar>

          <v-divider></v-divider>

          <v-card-text>
            <qrcode-stream @init="onInit" @decode="onDecode" :paused="paused"></qrcode-stream>
            <div v-if="decodedContent !== null" class="decoded-content">{{ decodedContent }}</div>
            <h1>
              {{ errorMessage }}
            </h1>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      paused: false,
      decodedContent: null,
      errorMessage: ''
    }
  },
  methods: {
    onDecode (content) {
      this.decodedContent = content
      $router.push({ name: 'scanned', params: { code: content }})
    },
    onInit (promise) {
      promise.then(() => {
      })
      .catch(error => {
        if (error.name === 'NotAllowedError') {
          this.errorMessage = 'Hey! I need access to your camera'
        } else if (error.name === 'NotFoundError') {
          this.errorMessage = 'No camera detected.'
        } else if (error.name === 'NotSupportedError') {
          this.errorMessage = 'Seems like this page is served in non-secure context (HTTPS, localhost or file://)'
        } else if (error.name === 'NotReadableError') {
          this.errorMessage = 'Couldn\'t access your camera. Is it already in use?'
        } else if (error.name === 'OverconstrainedError') {
          this.errorMessage = 'Constraints don\'t match any installed camera. Did you asked for the front camera although there is none?'
        } else {
          this.errorMessage = 'UNKNOWN ERROR: ' + error.message
        }
      })
    }
  }
}
</script>

<style>
  .card--flex-toolbar {
    margin-top: -64px;
  }
</style>
