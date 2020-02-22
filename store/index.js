import * as types from '~/store/type.js'
import Vue from 'vue'
import Vuex from 'vuex'
import {getcookie, setcookie} from '~/static/api/function'

Vue.use(Vuex);
export const state = () => ({
    uidKudou: '',
    tokenKudou: '',
    userInfoKudou: {},
    indexDataKudou: {},
})
export const getters = {
    uidKudou: state => {
        if (state.uidKudou == '' || state.uidKudou == null || state.uidKudou == undefined) {
            if (getcookie("uidKudou") || localStorage.getItem('uidKudou')) {
                return getcookie("uidKudou") || localStorage.getItem('uidKudou');
            } else {
                return '';
            }
        } else {
            return state.uidKudou
        }
    },
    tokenKudou: state => {
        if (state.tokenKudou == '' || state.tokenKudou == null || state.tokenKudou == undefined) {
            if (getcookie("tokenKudou") || localStorage.getItem('tokenKudou')) {
                return getcookie("tokenKudou") || localStorage.getItem('tokenKudou');
            } else {
                return '';
            }
        } else {
            return state.tokenKudou
        }
    },
    userInfoKudou: state => {
        return state.userInfoKudou ? state.userInfoKudou : ''
    },
    indexDataKudou: state => {
        return state.indexDataKudou ? state.indexDataKudou : ''
    },
}

export const actions = {
    uidKudou({
                 commit
             }, res) {
        localStorage.setItem("uidKudou", res)
        setcookie("uidKudou", res, "7")
        commit(types.SESSION_UIDKUDOU, res)
    },
    tokenKudou({
                   commit
               }, res) {
        localStorage.setItem('tokenKudou', res)
        setcookie("tokenKudou", res, "90")
        commit(types.STORE_TOKENKUDOU, res)
    },
    userInfoKudou({
                      commit
                  }, res) {
        commit(types.STORE_USERINFOKUDOU, res)
    },
    indexDataKudou({
                       commit
                   }, res) {
        commit(types.STORE_INDEXDATAKUDOU, res)
    },
    logout({
               commit
           }, res) {
        commit(types.STORE_LOG_OUT, res)
    }
}

export const mutations = {
    uidKudou(state, res) {
        state.uidKudou = res;
    },
    // 首次登陆保存uid
    [types.SESSION_UIDKUDOU](state, res) {
        state.uidKudou = res;
    },
    [types.STORE_TOKENKUDOU](state, res) {
        state.tokenKudou = res;
    },
    [types.STORE_LOG_OUT](state, res) {
        localStorage.removeItem("uidKudou");
        localStorage.removeItem("tokenKudou")
        setcookie("uidKudou", '', -1);
        setcookie("tokenKudou", '', -1);
        state.tokenKudou = null;
        state.uidKudou = null;
    },
    [types.STORE_INDEXDATAKUDOU](state, res) {
        state.indexDataKudou = res;
    },
    [types.STORE_USERINFOKUDOU](state, res) {
        state.userInfoKudou = res;
    }
}
