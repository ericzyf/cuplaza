import { shallowMount, createLocalVue } from '@vue/test-utils'
import PrimaryAppBar from '@/components/PrimaryAppBar.vue'

import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('PrimaryAppBar.vue', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      state: { curtUser_uid: 'qwerty' }
    })
  })

  it('has a div', () => {
    const wrapper = shallowMount(PrimaryAppBar, {
      store, localVue
    })
    expect(wrapper.contains('div')).toBe(true)
  })

  it('has a span', () => {
    const wrapper = shallowMount(PrimaryAppBar, {
      store, localVue
    })
    expect(wrapper.contains('span')).toBe(true)
  })
})