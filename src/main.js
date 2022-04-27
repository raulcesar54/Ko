import headerTemplate from './components/header/template.js'
import productsTemplate from './components/products/template.js'
import modalTemplate from './components/modal/template.js'

function GlobalInformation() {
  let showShopping = ko.observable('isHidden')
  let cart = ko.observableArray([])
  return {
    showShopping,
    cart,
  }
}
const viewProvider = new GlobalInformation()
function Products() {
  this.products = ko.observableArray([
    {
      id: 1,
      name: 'Suco integral',
      description: 'Aurora 1,5L',
      price: 14.22,
      image: './assets/products/suco_uva.png',
    },
    {
      id: 2,
      name: 'Achocolatado',
      description: 'Toddy 400 g',
      price: 4.5,
      image: './assets/products/achocolatado.png',
    },
    {
      id: 3,
      name: 'Leite de Coco',
      description: 'Menina 200 ml',
      price: 3.5,
      image: './assets/products/leite_coco.png',
    },
    {
      id: 4,
      name: 'Amaciante',
      description: 'Monbjoux 2 l',
      price: 22.4,
      image: './assets/products/amaciante.png',
    },
    {
      id: 5,
      name: 'Agua sanitaria',
      description: 'Qboa 200ml',
      price: 11.5,
      image: './assets/products/q-boa-mini.png',
    },
    {
      id: 6,
      name: 'Agua sanitaria big',
      description: 'Qboa 1l',
      price: 32.1,
      image: './assets/products/qboa.png',
    },
  ])
}
function Cart() {
  this.cart = viewProvider.cart()
  this.handleAddProductInCart = (data) => {
    const filter = viewProvider.cart().filter((item) => item.id !== data.id)
    const itemInCart = viewProvider.cart().find((item) => item.id === data.id)
    if (itemInCart) {
      return viewProvider.cart([
        ...filter,
        { ...data, qty: itemInCart.qty + 1 },
      ])
    }
    return viewProvider.cart([
      ...viewProvider.cart(),
      { ...data, qty: 1, selected: true },
    ])
  }
  this.removeItemFromCart = (value, event) => {
    event.stopPropagation()
    const confirm = window.confirm('Tem certeza que deseja remover este item?')
    if (confirm) {
      return viewProvider.cart(
        viewProvider.cart().filter((item) => item.id !== value.id)
      )
    }
    return
  }
  this.cartQty = ko.computed(() => {
    const value = viewProvider.cart().reduce(
      (acc, curren) => {
        return { qty: acc.qty + curren.qty }
      },
      { qty: 0 }
    )
    return `${value.qty} items`
  })
  this.cartTotalValue = ko.computed(() => {
    const { price } = viewProvider.cart().reduce(
      (acc, curren) => {
        return { price: acc.price + curren.price * curren.qty }
      },
      { price: 0 }
    )
    return `R$ ${price.toFixed(2)}`
  })
}
ko.components.register('header-component', {
  template: headerTemplate,
  viewModel: function (params) {
    this.user = {
      firstName: ko.observable('Angela Pires'),
      avatar: ko.observable('./assets/avatar.png'),
    }
    this.handleShowShopping = () => {
      if (params.cart().length > 0) {
        viewProvider.showShopping('isShow')
      }
    }
    this.isAvalibleCartItems = ko.computed(() => {
      return params.cart().length > 0 && 'avalible'
    })
  },
})
ko.components.register('products', {
  template: productsTemplate,
  viewModel: function (params) {
    const { products } = new Products()
    const { handleAddProductInCart, removeItemFromCart } = new Cart()
    this.handleAddProductInCart = handleAddProductInCart
    this.removeItemFromCart = removeItemFromCart
    this.products = products()
  },
})
ko.components.register('modal', {
  template: modalTemplate,
  viewModel: function () {
    this.cart = ko.computed(() => {
      return viewProvider.cart()
    })
    this.handleHideShopping = () => {
      viewProvider.showShopping('isHidden')
    }
    this.showShopping = ko.computed(() => viewProvider.showShopping())
    this.cartTotalValue = ko.computed(() => {
      const { price } = viewProvider.cart().reduce(
        (acc, curren) => {
          return { price: acc.price + curren.price * curren.qty }
        },
        { price: 0 }
      )
      return `R$ ${price.toFixed(2)}`
    })
    this.cartQty = ko.computed(() => {
      const value = viewProvider.cart().reduce(
        (acc, curren) => {
          return { qty: acc.qty + curren.qty }
        },
        { qty: 0 }
      )
      return `${value.qty} items`
    })
  },
})

ko.applyBindings(viewProvider)

