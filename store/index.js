export const state = (initialList, initalName) => ({
    list: {
        shoppinglist: initialList || [],
        name: initalName || 'default',
    }
})

export const getters = {
    totalAmount: state => {
        return state.list.shoppinglist.reduce((prev, val) => prev + val.amount, 0);
    }
}

export const mutations = {
    addToList: (state, {item, amount}) => {
        const r = state.list.shoppinglist.find(x => x.item == item);
        if (r) {
            r.amount += amount;
        } else {
            state.list.shoppinglist = [...state.list.shoppinglist, {item, amount}];
        }
    },
    emptyList: (state) => {
        state.list.shoppinglist = [];
    },
    modifyInList: (state, {index, amount}) => {
        state.list.shoppinglist[index].amount = amount;
        if (amount == 0) {
            state.list.shoppinglist = state.list.shoppinglist.slice(0, index).concat(state.list.shoppinglist.slice(index+1));
        }
    },
    removeFromList: (state, index) => {
        state.list.shoppinglist = state.list.shoppinglist.slice(0, index).concat(state.list.shoppinglist.slice(index+1));
    }
}
