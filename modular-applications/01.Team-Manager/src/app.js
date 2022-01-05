import { updateNav } from './helpers.js'
import { render } from './lib.js'
import { page } from './lib.js'
import { browseView } from './views/browse.js'
import { createView } from './views/create.js'
import { detailsView } from './views/details.js'
import { editView } from './views/edit.js'
import { homeView } from './views/home.js'
import { loginView } from './views/login.js'
import { myTeamView } from './views/myteams.js'
import { registerView } from './views/register.js'

const main = document.querySelector('main')

updateNav()
function decorateContext(ctx, next) {
    ctx.render = (template) => render(template, main)
    ctx.updateNav = updateNav   
    next()
}
page(decorateContext)
page('/home', homeView)
page('/create-team', createView)
page('/edit-team/:id', editView)
page('/login', loginView)
page('/register', registerView)
page('/team-details/:id', detailsView)
page('/browse-teams', browseView)
page('/my-teams', myTeamView)
page.redirect('/', '/home')
page.redirect('/index.html', '/home')
page.start()