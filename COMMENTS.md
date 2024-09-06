# Comments

## General

- Not a fan of using SCSS "in this day and age". Practically everything can now be done with native CSS (nesting, CSS variables, color mixing) so I feel the days of SCSS are over.
- Additionally, I'm a firm believer in the advantages Tailwind brings to a team of more than 2 FE developers, because it makes the utility class naming consistent and in general it's much easier and quicker to style HTML elements directly with classes instead of jumping between HTML and CSS files.
- I allowed myself to change the folder structure from technical to semantical (services, models, components) vs (user-api, user-ui,) because usually when working on code we work on a business domain (semantic) and less on the technical specifics.
- I use rxjs Observables throughout as I feel that at this point Angular Signals are not very comfortable to use. As soon as the tiniest form of asynchronicity is needed we have to jump into the rxjs realm anyway so I prefer to just use it from the start.

What I tend to do with Signals is try and start capturing their benefit of the (promised) improved performance due to the change in ChangeDetection, which is supposed to be more performant when using Signals in templates, which is why you're not going to see the AsyncPipe in this project.

So what you coul say is I stick from the start with RXJS until the final output to the template, which is when Signals with their future performance boost promises come in.

## Code

- app.config: isDevMode vs manually commenting out

- app.component:

  - manual fetch (resolver?),
  - dedicated user-page component
  - dedicated user-group-toggle component
  - dedicated user-search-input component

- user:

  - `UserModel`: I changed all classes to interfaces as classes tend to be unintuitive, especially for newcomers to Typescript. I much prefer working with types and interfaces and leave class method logic to (state) services or in less usual cases just exported functions that get called from these services.
  - `UserHttpService`: I tend to encapsulate Http calls in their own services (suffixed with HttpService) and the only thing they do is just the HTTP call and nothing else. This comes in handy during unit testing later on.
  - `UserService`: this is the service that glues together all different parts of the User domain. Some call it facade, some call it business logic service. It's the central place for the UserDomain and usually the only thing to be consumed by other domains. Often times alogn with the HTTP service I tend to also have a separate UserFormService that is responsible for all form related logic (validation, submission, etc.).
    If the User domain is very large I will usually also create a UserState service that is responsible for managing local UI state of users.
    Since this project is quite simple I put the state logic directly into the facade service.
  - `ObservableWebWorker`: in previous projects I had to work quite extensively with WebWorkers as I was building a visualization dashboard, where the user could create their own dashboards and include charts inside it. To be able to do that we also had to do a lot of client-side processing which is when WebWorkers came in very handy.
    The ObservableWebWorker is a utility that I used quite often, and of course yet another example and showcase of my love for rxjs & Observables.
  - `mapToVoid`: the idea of adding this operator on the fetchUsers method is the fact that consumers are not really supposed to use the return value of the method. It is an Observable only for consumers to be easily informed of when the call has finished, but the actual data is supposed to be retrieved from the dedicated Observables, like allUsers or groupedUsers. mapToVoid is a way of making sure that the return type is obfuscated and consumers are forced to get the actual user data from somewhere else, which can easily be done by switchMapping into the state observables after having called fetchUsers...

## What's missing

- Styling of the user-detail component
- Unit tests for the user-list and user-ui component (although I am of the opinion that unit tests are for core logic, and business services, while components are much easier/better tested using Playwright or Storybook (well maybe with the exception of checking inputs and outputs), happy to elaborate on a call)
