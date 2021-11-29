import { deleteItem, editItem, getById } from "../api/data.js";
import { html, until } from "../lib.js";
import { getUserData } from "../util.js";
const detailsTemplate = (dataPromise) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
${until(dataPromise, html`<p>Loading &hellip;</p>`)}`
const detailCard = (data,isOwner,onDelete,id) => html`
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${data.img} />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${data.make}</span></p>
        <p>Model: <span>${data.model}</span></p>
        <p>Year: <span>${data.year}</span></p>
        <p>Description: <span>${data.description}</span></p>
        <p>Price: <span>${data.price}</span></p>
        <p>Material: <span>${data.material}</span></p>
        <div style = "display: ${isOwner ? 'block': 'none'}">
            <a href='/edit/${id}' class="btn btn-info">Edit</a>
            <a @click=${onDelete} href='/' class="btn btn-red">Delete</a>
        </div>
    </div>
</div>`
export function detailsPage(ctx) {
    ctx.render(detailsTemplate(loadProduct(detailCard)))
    async function loadProduct(detailCard) {
        const data = await getById(ctx.params.id)
        const userData = getUserData()
        const isOwner =(userData) ? userData.id==data._ownerId: false
        return detailCard(data,isOwner,onDelete,ctx.params.id)
    }
    async function onDelete(){
        const choice = confirm('Are you sure you want to delete this item?')
        if(choice){
            await deleteItem(ctx.params.id)
            ctx.page.redirect('/')
        }
    }
}