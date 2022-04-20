function AppViewModel() {
  this.cart = []
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

  this.handleAddProductInCart = (data) => {
    const verifyItemInCart = this.cart.filter((cartItem) => {
      return cartItem.id !== data.id  
    })
    console.log(data)
    if (verifyItemInCart) {
      return (this.cart = [
        ...verifyItemInCart,
        { ...data, qty: data.qty ? data.qty + 1 : 1 },
      ])
    }

    return (this.cart = [...this.cart, { ...data, qty: 1 }])
  }
}

const viewProvider = new AppViewModel()
ko.applyBindings(viewProvider)

