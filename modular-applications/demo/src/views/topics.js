import { getAllTopics } from "../api/data.js"
import { spinner } from "../common/spinner.js"
import { html, until } from "../lib.js"

const topicsTemplate = (topicsPromise) => html`
<section>
    <h1>Topics</h1>
    <div>
        ${until(topicsPromise, spinner())}
</section>`

const topicPreview = (topic) => html`
<article class="preview drop">
    <header><a href='${`/details/${topic._id}`}'>${topic.title}</a></header>
    <div><span>By ${topic.author.username}</span> | <span>15 Comments</span></div>
</article>
`

export function topicsView(ctx) {
    ctx.render(topicsTemplate(loadTopics()))
}

async function loadTopics() {
    const topics = await getAllTopics()
    return topics.map(topicPreview)
}