export const state = (initialList, initalName) => ({
  list: {
    shoppinglist: initialList || [],
    name: initalName || 'Shopping List'
  }
})

export const getters = {
  totalAmount: (state) => {
    return state.list.shoppinglist.reduce((prev, val) => prev + val.amount, 0)
  }
}

export const mutations = {
  ADD_ITEM: (state, item) => {
    state.list.shoppinglist = [...state.list.shoppinglist, item]
  },
  EMPTY_LIST: (state) => {
    state.list.shoppinglist = []
  },
  UPDATE_ITEM: (state, { index, item }) => {
    state.list.shoppinglist[index] = item
    if (item.amount === 0) {
      state.list.shoppinglist = state.list.shoppinglist.slice(0, index).concat(state.list.shoppinglist.slice(index + 1))
    }
  },
  REMOVE_ITEM: (state, index) => {
    state.list.shoppinglist = state.list.shoppinglist.slice(0, index).concat(state.list.shoppinglist.slice(index + 1))
  }
}

export const actions = {
  addToList (ctx, item) {
    const { name, amount } = item
    const r = ctx.state.list.shoppinglist.find(x => x.name === name)
    return new Promise((resolve) => {
      setTimeout(() => {
        if (r) {
          ctx.commit('UPDATE_ITEM', { index: ctx.state.list.shoppinglist.indexOf(x => x.name === name), item: { amount: r.amount + amount, ...r } })
        } else {
          ctx.commit('ADD_ITEM', item)
        }
        resolve()
      }, 200)
    })
  },
  emptyList (ctx) {
    return new Promise((resolve) => {
      setTimeout(() => {
        ctx.commit('EMPTY_LIST')
        resolve()
      }, 200)
    })
  },
  updateItem (ctx, { index, item }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        ctx.commit('UPDATE_ITEM', { index, item })
        resolve()
      }, 200)
    })
  },
  removeItem (ctx, index) {
    return new Promise((resolve) => {
      setTimeout(() => {
        ctx.commit('REMOVE_ITEM', { index })
        resolve()
      }, 200)
    })
  }
}
