<template>
<div>
    <h1>List {{ this.$route.params.id }}, Amount: {{ totalAmount }}</h1>
    <ul>
        <li v-for="({item: it, amount: am}, index) in list" v-bind:key="it">
            <span>{{it}}: {{am}}</span><button @click="removeFromList(index)">X</button><button @click="modifyInList(index, am+1)">+</button><button @click="modifyInList(index, am-1)">-</button>
        </li>
    </ul>
    <input type="text" alt="Item" v-model="item"/> <input type="number" alt="Amount" v-model="amount"/> <button @click="addToList">Add to List</button><br>
    <button @click="emptyList">Empty the List</button>
</div>
</template>

<script>
import {mapMutations} from 'vuex';

export default {
    fetch() {
        // Fetch from database using the id
    },
    data: {
        item: '',
        amount: 0
    },
    computed: {
        list () {
            return this.$store.state.list;
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
}
</script>

<style>

</style>
