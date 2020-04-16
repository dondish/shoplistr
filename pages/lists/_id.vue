<template>
<div>
    <h1>List {{ name }}, Amount: {{ totalAmount }}</h1>
    <v-list>
        <v-list-item v-for="({item: it, amount: am}, index) in list" v-bind:key="it">
            <v-list-item-content>
                <v-list-item-title v-text="it"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
                <v-list-item-subtitle v-text="am + ' left'"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-icon @click="modifyInList(index, am+1)">
                <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-icon @click="modifyInList(index, am-1)">
                <v-icon>mdi-minus</v-icon>
            </v-list-item-icon>
            <v-list-item-icon @click="removeFromList(index)">
                <v-icon>mdi-close</v-icon>
            </v-list-item-icon>
        </v-list-item>
    </v-list>
    <v-form>
        <v-container>
            <v-row>
                <v-col>
                    <v-text-field
                        label="Item"
                        v-model="item"
                    >
                    </v-text-field>
                </v-col>
                <v-col>
                    <v-text-field
                        label="Amount"
                        v-model="amount"
                        :type="number"
                    >
                    </v-text-field>
                </v-col>
                <v-col>
                    <v-btn color="primary" text @click="addToList">Add to List</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
    <v-btn color="primary" text @click="emptyList">Empty the List</v-btn>
</div>
</template>

<script>
import {mapMutations} from 'vuex';
import Vue from 'vue';

export default Vue.extend({
    fetch() {
        // Fetch from database using the id
    },
    data: () => ({
        item: '',
        amount: 0
    }),
    computed: {
        list () {
            return this.$store.state.list.shoppinglist;
        },
        name () {
            return this.$store.state.list.name;
        },
        totalAmount () {
            return this.$store.getters.totalAmount;
        }
    },
    methods: {
        addToList() {
            this.$store.commit('addToList', {item: this.item, amount: Number(this.amount)});
        },
        removeFromList(index) {
            this.$store.commit('removeFromList', index);
        },
        emptyList() {
            this.$store.commit('emptyList')
        },
        modifyInList(index, value) {
            this.$store.commit('modifyInList', {index, amount: Math.max(value,0)});
        }
    }
})
</script>

<style>

</style>
