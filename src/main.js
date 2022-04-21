function AppViewModel() {
  this.cart = ko.observableArray([])
  this.cartQty = ko.computed(() => {
    const value = this.cart().reduce(
      (acc, curren) => {
        return { qty: acc.qty + curren.qty }
      },
      { qty: 0 }
    )
    return `${value.qty} items`
  })
  this.cartTotalValue = ko.computed(() => {
    const { price } = this.cart().reduce(
      (acc, curren) => {
        return { price: acc.price + curren.price * curren.qty }
      },
      { price: 0 }
    )
    return `R$ ${price.toFixed(2)}`
  })
  this.showShopping = ko.observable('isHidden')
  this.user = {
    firstName: ko.observable('Angela Pires'),
    avatar: ko.observable('./assets/avatar.png'),
  }
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
  this.handleShowShopping = () => {
    if (this.cart().length > 0) {
      this.showShopping('isShow')
    }
  }
  this.handleHideShopping = () => this.showShopping('isHidden')
  this.handleAddProductInCart = (data) => {
    const filter = this.cart().filter((item) => item.id !== data.id)
    const itemInCart = this.cart().find((item) => item.id === data.id)
    if (itemInCart) {
      return this.cart([...filter, { ...data, qty: itemInCart.qty + 1 }])
    }
    return this.cart([...this.cart(), { ...data, qty: 1, selected: true }])
  }
  this.removeItemFromCart = (value, event) => {
    event.stopPropagation()
    const confirm = window.confirm('Tem certeza que deseja remover este item?')
    if (confirm) {
      return this.cart(this.cart().filter((item) => item.id !== value.id))
    }
    return
  }
}

const viewProvider = new AppViewModel()
ko.applyBindings(viewProvider)

