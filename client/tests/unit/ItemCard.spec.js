import { shallowMount, createLocalVue } from '@vue/test-utils'
import ItemCard from '@/components/ItemCard.vue'

import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('ItemCard.vue', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      state: { curtUser_uid: 'qwerty' }
    })
  })

  let propsData = {
    item: {
      _id: '1',
      uid: '2',
      category: 0,
      title: '3',
      price: '4',
      currency: '5',
      imgUrl: '6'
    },
    seller: {
      _id: '7',
      email: '8',
      phone: '9',
      userName: '10',
      password: '11'
    }
  }

  it('has a div', () => {
    const wrapper = shallowMount(ItemCard, {
      store, localVue, propsData
    })
    expect(wrapper.contains('div')).toBe(true)
  })

  it('has a span', () => {
    const wrapper = shallowMount(ItemCard, {
      store, localVue, propsData
    })
    expect(wrapper.contains('span')).toBe(true)
  })

  it('has a p', () => {
    const wrapper = shallowMount(ItemCard, {
      store, localVue, propsData
    })
    expect(wrapper.contains('p')).toBe(true)
  })

  it("item._id", () => {
    const wrapper = shallowMount(ItemCard, {
      store, localVue, propsData
    })
    expect(wrapper.props().item._id).toBe('1')
  })

  it("item.uid", () => {
    const wrapper = shallowMount(ItemCard, {
      store, localVue, propsData
    })
    expect(wrapper.props().item.uid).toBe('2')
  })

  it("item.category", () => {
    const wrapper = shallowMount(ItemCard, {
      store, localVue, propsData
    })
    expect(wrapper.props().item.category).toBe(0)
  })

  it("item.price", () => {
    const wrapper = shallowMount(ItemCard, {
      store, localVue, propsData
    })
    expect(wrapper.props().item.price).toBe('4')
  })

  it("item.currency", () => {
    const wrapper = shallowMount(ItemCard, {
      store, localVue, propsData
    })
    expect(wrapper.props().item.currency).toBe('5')
  })

  it("item.imgUrl", () => {
    const wrapper = shallowMount(ItemCard, {
      store, localVue, propsData
    })
    expect(wrapper.props().item.imgUrl).toBe('6')
  })
})