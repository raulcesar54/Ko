const html = () => {
  return `
    <div class="user_information">
        <img width="39px" height="39px" data-bind="attr:{src: user.avatar}" />
        <div class="header_text">
            <small>bem vinda, </small>
            <h1><strong data-bind="text: user.firstName"></strong></h1>
        </div>
    </div>
    <div class="user_icon_interaction">
    <img
        width="16px"
        height="16px"
        src="./assets/search_icon.png"
        alt="busca"
    />
    <img
        class="unvalible"
        width="16px"
        data-bind="click: handleShowShopping, class: isAvalibleCartItems"
        height="16px"
        src="./assets/shop_icon.png"
        alt="carrinho"
    />
    </div>
    `
}

export default html()

