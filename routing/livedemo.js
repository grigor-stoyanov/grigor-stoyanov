/*
browser routing is an adaptation of server routing
server checks for resourses in a routing table and returns given resource
in browser it is applied for navigation and history
types of navigation:
multi page apps reloading entire page on any change
single page apps 1 html changes content with ajax without reload
router tells the browser when content is changed to change the url
url https protocol - hostname www.example.com - pathname /one - search/querystring ?key=value - hash/fragment/id tells browser what to load #trending
queryparameters - serialise state of app search=js+advanced&opCourse=true some symbols are control and used with url encoding %22 %20 %3D
commonly used for pagination
hash - initial use was for navigation within page (anchor) without reloading the browser
history api is available when using hash based routing
history.back(),forward(),go() history.pushState({},'','#catalog') - goes on top of the stack and adds new element
pushState and replaceState don't trigger hashchange event!
we can also use them to record an adress that doesent exist without reloading
popstate event - fired when active history changes
page.js small routing library inspired by express supports automatic link binding, url glob matching, parameters,plugins
*/
console.log(Date())
