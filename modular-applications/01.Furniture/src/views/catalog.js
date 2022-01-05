import { getAll, getMyItems } from "../api/data.js"
import { html, until } from "../lib.js"
import { getUserData } from "../util.js"

const catalogTemplate = (dataPromise, userpage, page) => html`
<div class="row space-top">
    <div class="col-md-12">
        ${userpage
        ? html`
        <h1> My Furniture</h1>
        <p>This is a list of your publications.</p>`
        : html`
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>`
    }
    </div>
</div>
<!-- assinging ? to a link gives querystring to current adress-->

<div class="row space-top">
    ${until(dataPromise, html`<p>Loading &hellip;</p>`)}
</div>`
const pagerTemplate = (page, pages, startingPage) => html`
    <div class="pagination">
        <a class="btn btn-info" href='?page=${(page > 1) ? page - 1 : page}'>&lt; Prev</a>
        ${(pages > 0) ? html`<a class="btn btn-info" href='?page=${(pages > 5) ? startingPage : 1}'>${(pages >
                5) ? startingPage : 1}</a>` :
        null}
        ${(pages > 1) ? html`<a class="btn btn-info" href='?page=${(pages > 5) ? startingPage + 1 : 2}'>${(pages >
                5) ? startingPage + 1 : 2}</a>` :
        null}
        ${(pages > 2) ? html`<a class="btn btn-info" href='?page=${(pages > 5) ? startingPage + 2 : 3}'>${(pages >
                5) ? startingPage + 2 : 3}</a>` :
        null}
        ${(pages > 3) ? html`<a class="btn btn-info"
            href='?page=${(pages > 5) ? startingPage+3 : 4}'>${(pages >
                5) ? startingPage+3 : 4}</a>` :
        null}
        ${(pages > 4) ? html`<a class="btn btn-info"
            href='?page=   ${(pages > 5) ? startingPage + 4 : 5}'>${(pages
                > 5) ? startingPage + 4 : 5}</a>`
        : null}
        <a class="btn btn-info" href='?page=${(page < pages) ? page + 1 : page}'>Next &gt;</a>
    </div>`
const itemTemplate = (item) => html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${item.img} />
                <p>${item.description}</p>
                <footer>
                    <p>Price: <span>${item.price} $</span></p>
                </footer>
                <div>
                    <a href="/details/${item._id}" class="btn btn-info">Details</a>
                </div>
            </div>
        </div>
    </div>`
export function catalogPage(ctx) {
    const userpage = ctx.pathname == '/my-furniture'
    const page = Number(ctx.querystring.split('=')[1] || 1)
    ctx.render(catalogTemplate(loadItems(userpage, page), userpage, page))


    // injecting page param for pagination
    async function loadItems(userpage, page) {

        let items = []
        if (userpage) {
            const userId = getUserData().id
            items = await getMyItems(userId)
        } else {
            items = await getAll(page)
        }
        const startingPage = (items.pages < 6) ? 1 : items.pages - 5 + page
        return [
            pagerTemplate(page, items.pages, startingPage),
            ...items.data.map(itemTemplate)
        ]
    }
}

