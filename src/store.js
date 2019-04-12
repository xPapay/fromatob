import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const defaultPassenger = () => ({ id: Math.floor((Math.random() * 100000)), age: 32, bahnCard: 'None' })

export default new Vuex.Store({
    state: {
        passengers: [
            defaultPassenger()
        ],
        vehicles: {
            train: true,
            bus: true,
            plane: true,
            carpool: true
        },
        bahnCardOptions: [
            'None',
            'BahnCard 25, 1st Class',
            'BahnCard 25, 2nd Class',
            'BahnCard 50, 1st Class',
            'BahnCard 50, 2nd Class'
        ]
    },
    mutations: {
        CHANGE_AGE: (state, { index, age }) => state.passengers.splice(index, 1, { ...state.passengers[index], age }),
        CHANGE_BAHNCARD: (state, { index, bahnCard }) => state.passengers.splice(index, 1, { ...state.passengers[index], bahnCard }),
        ADD_PASSENGER: (state, passenger) => state.passengers.push(passenger),

        CHANGE_VEHICLE_PREFERENCES: (state, { vehicle, status }) => state.vehicles[vehicle] = status
    },
    actions: {
        changeAge({ commit, getters }, { passenger, newAge }) {
            const index = getters.getPassengerIndex(passenger)
            if (index < 0) return
            commit('CHANGE_AGE', { index, age: newAge })
        },
        changeBahnCard({ commit, getters }, { passenger, newBahnCard }) {
            const index = getters.getPassengerIndex(passenger)
            if (index < 0) return
            commit('CHANGE_BAHNCARD', { index, bahnCard: newBahnCard })
        },
        addPassenger({ commit }) {
            commit('ADD_PASSENGER', defaultPassenger())
        },

        changeVehiclePreferences({ commit }, { vehicle, status }) {
            commit('CHANGE_VEHICLE_PREFERENCES', { vehicle, status })
        }
    },
    getters: {
        getPassengerIndex: state => passenger => state.passengers.indexOf(passenger)
    }
})