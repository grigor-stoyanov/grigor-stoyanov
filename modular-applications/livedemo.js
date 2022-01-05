/*
common scenarious and best practices for types of web apps/functionalities
component approach - focused on separation of concerns and composability
combiness style and logic(encapsulate state and control) in single unit allowing for composing new objects
e.g. making logic in a library and importing it into your project
expose necessary interfaces, decoupled environment (via DI), composable with other components
MVC -> model-view-controller pattern - model and data separated from html generation and view displayer(controller)
declarative Dom Logic - describe what dom should look like for a given state,when state changes dom-follows
routing - coupling app content with url e.g. search query params,pagination,sub-navigation
Action feedback - inserta acknowledgment for user input (clear view,loading appearance,disable input...)
sanitise user input(trimming,partial data in the request, prevent html insertion)
anticipate errors from network and user input
Pagination - see catalog of furniture
Search - see examPrep
Notification
*/