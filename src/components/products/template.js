const products = () => {
  return `
        <section data-bind="foreach: products">
        <div
          class="product_card"
          data-bind="click: $parent.handleAddProductInCart"
        >
        <div
        class="imageContainer"
        data-bind="style: { backgroundImage: 'url(\' + $data.image + \')' }"
      ></div>
          <div class="product_information">
            <h2 class="product_title" data-bind="text: $data.name"></h2>
            <small data-bind="text: $data.description"></small>
            <span data-bind="text: 'R$ ' + $data.price"></span>
          </div>
        </div>
      </section>
        `
}
export default products()

