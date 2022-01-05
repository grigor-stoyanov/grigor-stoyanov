import { getAllTeams, getTeamMembers } from '../api/data.js'
import { getUserData } from '../helpers.js'
import { html, until } from '../lib.js'


const browseTemplate = (teams,onMore) => html`
<!-- 
<section id="my-teams">

    <article class="pad-med">
        <h1>My Teams</h1>
    </article>

    <article class="layout narrow">
        <div class="pad-med">
            <p>You are not a member of any team yet.</p>
            <p><a href="#">Browse all teams</a> to join one, or use the button bellow to cerate your own
                team.</p>
        </div>
        <div class=""><a href="#" class="action cta">Create Team</a></div>
    </article>

    <article class="layout">
        <img src="./assets/rocket.png" class="team-logo left-col">
        <div class="tm-preview">
            <h2>Team Rocket</h2>
            <p>Gotta catch 'em all!</p>
            <span class="details">3 Members</span>
            <div><a href="#" class="action">See details</a></div>
        </div>
    </article>

</section>
-->


<section id="browse">

    <article class="pad-med">
        <h1>Team Browser</h1>
    </article>

    ${(getUserData()!=null) ? html`
    <article class="layout narrow">
        <div class="pad-small"><a href="/create-team" class="action cta">Create Team</a></div>
    </article>`: null
        }
    ${teams.map(team => teamTemplate(team,countTeamMembers))}
</section>
<a @click=${onMore} class='action cta'>Show More!</a>
`

const teamTemplate = (team,countTeamMembers) => html`
<article class="layout">
    <img src="${team.logoUrl}" class="team-logo left-col">
    <div class="tm-preview">
        <h2>${team.name}</h2>
        <p>${team.description}</p>
        <span class="details">${until(countTeamMembers(team._id),'')}</span>
        <div><a href="/team-details/${team._id}" class="action">See details</a></div>
    </div>
</article>
`
async function countTeamMembers(id){
    const members = await getTeamMembers(id)
    return `${members.length} Members`
}
export async function browseView(ctx) {
    let pageI = 3
    update()
    async function update() {
    const teams = await getAllTeams(pageI)
    ctx.render(browseTemplate(teams,onMore))
    }
    async function onMore(){
    pageI+=3
    update()
}


}