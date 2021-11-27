import page from './node_modules/page/page.mjs'

const main = document.querySelector('main')

// 2 params adress and function
function catalogPage() {
    main.innerHTML = `<h2>Catalog Page</h2><p>List of items</p><a href="/catalog/1234">Product</a>`
}
function aboutPage() {
    main.innerHTML = '<h2>about us</h2><p>contact: +1-555-7777</p>'
}

function catalogKitchenPage() {
    main.innerHTML = '<h2>Kitchen Equipment</h2><p>List of kitchen items</p>'
}
function homePage(ctx, next) {
    console.log(ctx)
    console.log(next)
    main.innerHTML = `<h2>Home Page</h2><p>Welcome to the site!</p>`
}
function checkoutPage() {
    main.innerHTML = '<h2>Cart Details</h2><p>Products in Cart</p>'
}
function detailsPage(ctx) {
    console.log(ctx)
    console.log(ctx.params.id)
    main.innerHTML = '<h2>Product</h2><p>Product Details</p><button>BUY NOW</button>'
    document.querySelector('button').addEventListener('click', () => {
        page.redirect('/checkout')
    })
}
function detailsKitchenPage(ctx) {
    console.log(ctx)
    main.innerHTML = '<h2>Kitchen Tool</h2><p>Kitchen tool details</p>'
}

page('/home', homePage)
page('/checkout',checkoutPage)
page('/catalog', catalogPage)

page('/catalog/kitchen', catalogKitchenPage)


page('/catalog/:category/:id', detailsKitchenPage)
page.redirect('/', '/home')

page('/about', aboutPage)
// the pattern searches for catalog and someting after and save it in a var id
page('/catalog/:id', detailsPage)
// start will automatically check if the url is active and display the required view
page.start()
// url glob **anyhost/data/movies/*anyadress /catalog/:id()
// route handler will recieve 2 params context(obect info/state),next callback for chaining handlers
// ctx contains path,hash,page object(router),params
// programatic redirect page('/home','/catalog) or page.redirect('/login')
// routes can be chained page('/catalog/:id',loadData,detailsView) for separating concerns fetch and render data
// or add values to context and share across handlers