import { createComment, getComments, getTopicById } from "../api/data.js"
import { spinner } from "../common/spinner.js"
import { html, until } from "../lib.js"
import { createSubmitHandler, getUserData } from "../util.js"

const detailsTemplate = (topicPromise) => html`
<section>
    <div class="drop">
        ${until(topicPromise, spinner())}
</section>`

const topicTemplate = (topic, isOwner, comments,onCommentSubmit) => html`
<header>
    <h1>${topic.title}</h1>
    <div class='controls'>
        ${isOwner ? 
            html`<a class="action" href='/edit/${topic._id}'>Edit</a>
            <a class="action" href=javascript:void(0)'>Delete</a>`
        : html`<span>By ${topic.author.username}</span>`}
    </div>
</header>
<div class="topic-content">
    <p>
        ${topic.content}
    </p>
</div>
<div>

${commentForm(onCommentSubmit)}
    ${comments.map(commentTemplate)}
</div>
`
const commentTemplate =  (comment) => html`
<article class="preview drop">
    <header>By ${comment.author.username}</header>
    <div class="topic-content">

    <p> ${comment.content} </p>
    </div>
</article>`

const commentForm = (onCommentSubmit) => html`
<article class='preview'>
      <header>Post new Comment</header>
      <div class="topic-content">
      <form @submit=${onCommentSubmit}>  
          <label>
              Content <textarea class="content" name="content"></textarea>
      </label>
            <input type="submit" value="Post" class="action">
    </form>

    </div>
</article>
`
let _topicData = null
export async function detailsView(ctx) {
    _topicData = await getTopicById(ctx.params.id)
    async function onCommentSubmit(data,event){
        if(data.content==""){
            return alert('Cannot post empty comment')
        }
        event.target.querySelector('input, textarea').forEach(element => {
            element.disabled=true;
        });
        data.topicId = ctx.params.id
        await createComment(data)
        update()
    }
    function update(){
    ctx.render(detailsTemplate(loadTopic(ctx.params.id,onCommentSubmit)),)
    }
    update()
}

async function loadTopic(id,onCommentSubmit) {

    const [topic,comments] = await Promise.all(
        [
        _topicData,
        getComments(id)
        ])

    const userData = getUserData()
    const isOwner = userData && userData.id == topic._ownerId
    return topicTemplate(topic,isOwner,comments,createSubmitHandler(onCommentSubmit,'content'))
}

