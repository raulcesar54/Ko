function AppViewModel() {
  this.cart = ko.observableArray([])
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
      price: 'R$ 14,22',
      image: './assets/products/suco_uva.png',
    },
    {
      id: 2,
      name: 'Achocolatado',
      description: 'Toddy 400 g',
      price: 'R$ 4,50',
      image: './assets/products/achocolatado.png',
    },
    {
      id: 3,
      name: 'Leite de Coco',
      description: 'Menina 200 ml',
      price: 'R$ 3,50',
      image: './assets/products/leite_coco.png',
    },
  ])
  this.handleShowShopping = () => this.showShopping('isShow')
  this.handleHideShopping = () => this.showShopping('isHidden')
  this.handleAddProductInCart = (data) => {
    const filter = this.cart().filter((item) => item.id !== data.id)
    const itemInCart = this.cart().find((item) => item.id === data.id)
    if (itemInCart) {
      return this.cart([...filter, { ...data, qty: itemInCart.qty + 1 }])
    }
    return this.cart([...this.cart(), { ...data, qty: 1 }])
  }
}

const viewProvider = new AppViewModel()
ko.applyBindings(viewProvider)

