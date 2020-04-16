export const state = () => ({
    user: undefined
});

export const getters = {
    isLoggedIn: state => {
        return !!state.user;
    }
};

export const mutations = {
    set_user: (state, user) => {
        state.user = user;
    }
}

