import { getAllTeams, getTeamMembers, getUserTeams } from '../api/data.js'
import { getUserData } from '../helpers.js'
import { html, until } from '../lib.js'


const myTeamsTemplate = (memberships) => html`

<section id="my-teams">

    <article class="pad-med">
        <h1>My Teams</h1>
    </article>

    <article class="layout narrow">
    <div class="pad-med">
        ${(memberships.length == 0) ? html`
            <p>You are not a member of any team yet.</p>
            <p><a href="/browse-teams">Browse all teams</a> to join one, or use the button bellow to cerate your own
                team.</p>
       `: null}
       </div>
        <div class=""><a href="/create-team" class="action cta">Create Team</a></div>
    </article>

    ${memberships.map(membership => teamTemplate(membership,countTeamMembers))}

</section>
`

const teamTemplate = (membership,countTeamMembers) => html`
<article class="layout">
    <img src="${membership.team.logoUrl}" class="team-logo left-col">
    <div class="tm-preview">
        <h2>${membership.team.name}</h2>
        <p>${membership.team.description}</p>
        <span class="details">${until(countTeamMembers(membership.team._id),'')}</span>
        <div><a href="/team-details/${membership.team._id}" class="action">See details</a></div>
    </div>
</article>
`
async function countTeamMembers(id) {
    const members = await getTeamMembers(id)
    return `${members.length} Members`
}
export async function myTeamView(ctx) {
    update()
    async function update() {
        const teams = await getUserTeams(getUserData().id)
        ctx.render(myTeamsTemplate(teams))
    }


}