const html = () => `
<div
class="backdrop"
data-bind="click: handleHideShopping, class: showShopping">
<div class="backdrop_card">
  <h1
    class="title"
    style="margin-top: 0px; margin-bottom: 24px; font-size: 20px"
  >
    Carrinho
  </h1>
  <div data-bind="foreach: cart">
    <div
      class="backdrop_card_item"
      data-bind="click: $parent.removeItemFromCart"
    >
      <div
        class="imageContainer"
        data-bind="style: { backgroundImage: 'url(\' + $data.image + \')' }"
      ></div>
      <div class="product_information">
        <h2 class="product_title" data-bind="text: $data.name"></h2>
        <small data-bind="text: $data.description"></small>
        <div class="product_resume_details">
          <span data-bind="text: 'R$ ' + $data.price"></span>
          <span data-bind="text: $data.qty + ' items adicionados'"></span>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="backdrop_card_resume">
  <div>
    <small>total valor</small>
    <h2 data-bind="text: cartTotalValue"></h2>
  </div>
  <div>
    <small>total item</small>
    <h2 data-bind="text: cartQty"></h2>
  </div>
</div>
</div>
`
export default html()

