import { shallowMount, createLocalVue } from '@vue/test-utils'
import Footer from '@/components/Footer.vue'

import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('Footer.vue', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      state: { curtUser_uid: 'qwerty' }
    })
  })

  it('has a span', () => {
    const wrapper = shallowMount(Footer, {
      store, localVue
    })
    expect(wrapper.contains('span')).toBe(true)
  })
})