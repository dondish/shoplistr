<template>
  <v-card
    class="mx-auto"
    max-width="374"
    :loading="loading"
  >
    <v-list>
      <v-subheader>{{ totalAmount }} ITEMS</v-subheader>
      <v-divider />
      <template v-for="(item, index) in list">
        <v-list-item :key="index">
          <v-list-item-content>
            <v-list-item-title v-text="item.name" />
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-subtitle v-text="item.amount" />
          </v-list-item-content>
          <v-dialog v-model="editDialog" persistent>
            <template v-slot:activator="{ on }">
              <v-list-item-icon>
                <v-btn color="primary" :disabled="loading" icon v-on="on" @click="Object.assign(edit, item)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-list-item-icon>
            </template>
            <v-card :loading="loading">
              <v-card-title>
                <span class="headline">Edit Item</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="edit.name" label="Item" />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field v-model="edit.amount" label="Amount" />
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-autocomplete v-model="edit.unit" :items="items" label="Unit" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn :disabled="loading" color="blue darken-1" text @click="editDialog = false">
                  Close
                </v-btn>
                <v-btn :disabled="loading" color="blue darken-1" text @click="updateItem(index, edit)">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-list-item-icon>
            <v-btn :disabled="loading" color="primary" icon @click="removeFromList(index)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
        <v-divider :key="index" />
      </template>
      <v-list-item>
        <v-list-item-content>
          <v-form>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="name"
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
                    value => !isNaN(value) && Number.isInteger(Number(value)) || 'Must be a valid integer',
                    value => value > 0 || 'Amount must be positive'
                  ]"
                  label="Amount"
                />
              </v-col>
              <v-col class="d-flex" cols="2">
                <v-btn :disabled="loading" class="align-self-center" color="primary" icon @click="addToList">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-card-actions>
      <v-btn :disabled="loading" color="warning" text @click="emptyList">
        <v-icon>mdi-delete</v-icon>
        CLEAR
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    name: '',
    amount: '',
    editDialog: false,
    items: [
      { text: 'None', value: 0 },
      { text: 'Pieces', value: 1 },
      { text: 'g', value: 2 }
    ],
    edit: {
      name: '',
      amount: '',
      unit: ''
    },
    loading: false
  }),
  computed: {
    list () {
      return this.$store.state.list.shoppinglist
    },
    totalAmount () {
      return this.$store.getters.totalAmount
    }
  },
  methods: {
    addToList () {
      if (this.name !== '' && !isNaN(this.amount) && Number.isInteger(Number(this.amount)) && this.amount > 0) {
        this.loading = true
        this.$store.dispatch('addToList', { name: this.name, amount: Number(this.amount) }).then(() => {
          this.loading = false
        })
      }
    },
    removeFromList (index) {
      this.loading = true
      this.$store.dispatch('removeFromList', index).then(() => {
        this.loading = false
      })
    },
    emptyList () {
      this.loading = true
      this.$store.dispatch('emptyList').then(() => {
        this.loading = false
      })
    },
    updateItem (index, item) {
      this.loading = true
      this.$store.dispatch('updateItem', { index, item }).then(() => {
        this.loading = false
        this.editDialog = false
      })
    }
  }
}
</script>

<style>

</style>
