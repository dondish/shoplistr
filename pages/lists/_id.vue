<template>
  <div>
    <v-row justify="center">
      <h1 class="primary--text display-3 font-weight-medium my-3">
        {{ name }}
      </h1>
    </v-row>
    <v-card
      class="mx-auto"
      max-width="374"
    >
      <v-list>
        <v-subheader>{{ totalAmount }} ITEMS</v-subheader>
        <v-divider />
        <template v-for="({item: it, amount: am}, index) in list">
          <v-list-item :key="it">
            <v-list-item-content>
              <v-list-item-title v-text="it" />
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-subtitle v-text="am + ' left'" />
            </v-list-item-content>
            <v-list-item-icon @click="modifyInList(index, am+1)">
              <v-btn color="primary" icon>
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-icon @click="modifyInList(index, am-1)">
              <v-btn color="primary" icon>
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-icon @click="removeFromList(index)">
              <v-btn color="primary" icon>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
          <v-divider :key="it" />
        </template>
        <v-list-item>
          <v-list-item-content>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="item"
                  :rules="[
                    value => value !== '' || 'You need to give it a name.'
                  ]"
                  label="Item"
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="amount"
                  :rules="[
                    value => Number(value) !== NaN || 'Must be a number',
                    value => value > 0 || 'Amount must be positive'
                  ]"
                  label="Amount"
                  type="number"
                />
              </v-col>
              <v-col class="d-flex" cols="2">
                <v-btn class="align-self-center" color="primary" icon @click="addToList">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-btn color="warning" text @click="emptyList">
          <v-icon>mdi-delete</v-icon>
          CLEAR
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  fetch () {
    // Fetch from database using the id
  },
  data: () => ({
    item: '',
    amount: ''
  }),
  computed: {
    list () {
      return this.$store.state.list.shoppinglist
    },
    name () {
      return this.$store.state.list.name
    },
    totalAmount () {
      return this.$store.getters.totalAmount
    }
  },
  methods: {
    addToList () {
      if (this.item !== '' && this.amount !== '' && this.amount > 0) { this.$store.commit('addToList', { item: this.item, amount: Number(this.amount) }) }
    },
    removeFromList (index) {
      this.$store.commit('removeFromList', index)
    },
    emptyList () {
      this.$store.commit('emptyList')
    },
    modifyInList (index, value) {
      this.$store.commit('modifyInList', { index, amount: Math.max(value, 0) })
    }
  }
})
</script>

<style>

</style>
