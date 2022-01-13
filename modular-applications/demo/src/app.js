import { page } from "./lib.js"
import { decorateContext, updateNav } from "./util.js"
import { createView } from "./views/create.js"
import { detailsView } from "./views/details.js"
import { homeView } from "./views/home.js"
import { loginView } from "./views/login.js"
import { registerView } from "./views/register.js"
import { topicsView } from "./views/topics.js"


page(decorateContext)
page('/', homeView)
page.redirect('/index.html', '/')
page('/topics', topicsView)
page('/login', loginView)
page('/register', registerView)
page('/create', createView)
page('/details/:id', detailsView)
updateNav()
page.start()

