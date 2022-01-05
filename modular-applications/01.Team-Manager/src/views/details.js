import { approve, getMemberships, getTeamById, join, leave } from '../api/data.js'
import { getUserData } from '../helpers.js'
import { html } from '../lib.js'

const detailsTemplate = (team, memberships, userData, isMember, onJoin, onLeave, onRemove, onApprove) => html`
<section id="team-home">
    <article class="layout">
        <img src="${team.logoUrl}">
        <div class="tm-preview">
            <h2>${team.name}</h2>
            <p>${team.description}</p>
            <span class="details">${memberships.filter(e => e.status == 'member').length} Members</span>
            <div>
                ${(userData != null && userData.id == team._ownerId) ? html`<a href="/edit-team/${team._id}"
                    class="action">Edit team</a>` : null}
                ${(userData != null && userData.id != team._ownerId && !isMember) ? html`<a @click=${onJoin}
                    href="javascript:void(0)" class="action">Join team</a>` : null}
                ${(userData != null && isMember == 'member') ? html`<a @click=${onLeave}
                    href="javascript:void(0)" class="action invert">Leave
                    team</a>` : null}
                ${(userData != null && userData.id != team._ownerId && isMember == 'pending') ? html`Membership pending.
                <a @click=${onLeave} href="javascript:void(0)">Cancel
                    request</a>` : null}
            </div>
        </div>
        <div class="pad-large">
            <h3>Members</h3>
            <ul class="tm-members">
                ${memberships.filter(e => e.status == 'member').map(member => html`<li>${member.user.username}
                    ${(userData != null && userData.id == team._ownerId) ? html`<a @click=${onRemove.bind(member._id)}
                        href="javascript:void(0)" class="tm-control action">Remove from
                        team</a>` : null}
                </li>`)}
            </ul>
        </div>
        <div class="pad-large">
            ${(userData != null && userData.id == team._ownerId) ? html`<h3>Membership Requests</h3>
            <ul class="tm-members">
                ${memberships.filter(e => e.status == 'pending').map(member => html`
                <li>${member.user.username}
                    <a @click=${onApprove.bind(member._id)} href="javascript:void(0)"
                        class="tm-control action">Approve</a>
                    <a @click=${onRemove.bind(member._id)} href="javascript:void(0)"
                        class="tm-control action">Decline</a>
                </li>`)}
            </ul>`: null
            }
        </div>
    </article>
</section>`

export async function detailsView(ctx) {
    const [team, memberships] = await Promise.all([
        getTeamById(ctx.params.id),
        getMemberships(ctx.params.id)
    ])
    const userData = getUserData()
    let myMembershipId = ''
    let isMember = ''
    if (userData != null) {
        for (const ele of memberships) {
            if (ele._ownerId == userData.id) {
                isMember = ele.status
                myMembershipId = ele._id
                break
            }
        }
    }
    async function onJoin(ev) {
        ev.preventDefault()
        join(ctx.params.id)
        ctx.page.redirect(`/team-details/${ctx.params.id}`)
    }
    async function onLeave(ev) {
        ev.preventDefault()
        leave(myMembershipId)

        ctx.page.redirect(`/team-details/${ctx.params.id}`)
    }
    async function onRemove(ev) {
        ev.preventDefault()
        leave(this)

        ctx.page.redirect(`/team-details/${ctx.params.id}`)
    }
    async function onApprove(ev) {
        ev.preventDefault()
        approve(this)

        ctx.page.redirect(`/team-details/${ctx.params.id}`)
    }
    ctx.render(detailsTemplate(team, memberships, userData, isMember, onJoin, onLeave, onRemove, onApprove))
}