import { computed, inject, provide, ref, type ComputedRef, type InjectionKey, type Ref } from 'vue'

import huawei from '@/assets/phones/huawei.svg'
import iphone from '@/assets/phones/iphone.svg'
import oppo from '@/assets/phones/oppo.svg'
import vivo from '@/assets/phones/vivo.svg'
import xiaomi from '@/assets/phones/xiaomi.svg'

export interface Phone {
  id: number
  name: string
  icon: string
  price: number
  num: number
}

export interface Cart {
  phoneList: Ref<Phone[]>
  totalKinds: ComputedRef<number>
  totalQuantity: ComputedRef<number>
  totalPrice: ComputedRef<number>
  increase: (item: Phone) => void
  decrease: (item: Phone) => void
  removeItem: (id: number) => void
}

const cartKey: InjectionKey<Cart> = Symbol('cart')

/** 在 App.vue 中调用：创建购物车数据并注入，后代组件用 useCart() 直接取用 */
export function provideCart(): Cart {
  const phoneList = ref<Phone[]>([
    { id: 1, name: 'iPhone 15 Pro', icon: iphone, price: 7999, num: 1 },
    { id: 2, name: '华为 Mate 60 Pro', icon: huawei, price: 6499, num: 1 },
    { id: 3, name: '小米 14', icon: xiaomi, price: 3999, num: 2 },
    { id: 4, name: 'OPPO Find X7', icon: oppo, price: 3999, num: 1 },
    { id: 5, name: 'vivo X100', icon: vivo, price: 3999, num: 1 },
  ])

  const totalKinds = computed(() => phoneList.value.length)
  const totalQuantity = computed(() => phoneList.value.reduce((sum, item) => sum + item.num, 0))
  const totalPrice = computed(() =>
    phoneList.value.reduce((sum, item) => sum + item.price * item.num, 0),
  )

  function increase(item: Phone) {
    item.num++
  }

  function decrease(item: Phone) {
    if (item.num > 1) item.num--
  }

  function removeItem(id: number) {
    phoneList.value = phoneList.value.filter((item) => item.id !== id)
  }

  const cart: Cart = {
    phoneList,
    totalKinds,
    totalQuantity,
    totalPrice,
    increase,
    decrease,
    removeItem,
  }

  provide(cartKey, cart)
  return cart
}

/** 在后代组件中调用：取出 App 注入的购物车数据 */
export function useCart(): Cart {
  const cart = inject(cartKey)
  if (!cart) {
    throw new Error('未找到购物车数据，请先在祖先组件中调用 provideCart()')
  }
  return cart
}
