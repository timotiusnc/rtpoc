# Client Code

Note: We are still in progress to reach this organization of code. See further down below to works need to be done.

## Structure

At the top level, there are 6 folders: i18n, config, resources, layout, shared-directives, shared-services.

```
/app/src
  app.module.js

  /layouts
    layout.module.js

  /resources
    resources.module.js

  /shared-directives
    shared-directives.module.js

  /shared-services
    shared-services.module.js

  /i18n
    i18n.module.js
    en.js
    id.js

  /config
```

### i18n

contains i18n definition. Pretty straightforward.

### config

contains application configuration, e.g. routes, global exception handler, CSRF settings.

```
/config
  routes.config.js
  i18n.config.js
  http.config.js
  theme.config.js
```

### resources

`resources` contain folders that map to Ombaq API endpoints. Inside each of that folder contains code that "CRUD" the resource and views for that resource. example:

```
/resources
  /sources              // resource for social accounts
    sources.service.js  // service that do CRUD
    /source-logo        // contains directive for displaying logo
      source-logo.de.html
      source-logo.de.js
      _source-logo.de.sass
    /source-thumb       // contains directive for displaying a source with thumb
    .
    .                   // etc
```

We can think each of these folders as a group that contains various way of representing that specific resource.

### layouts

`layouts` contain folders that map to Ombaq's routing structure. Inside each of those folder, there are codes that integrate resources into a single page / sub-layout.

example:

```
/layouts
  main.layout.html  // define the main app layout position e.g. Navbar, Header, Main content
  /projects         // contain files that make up "projects" screen
    projects.layout.html
    projects.layout.js
    _projects.layout.sass
  /project
    /config         // contain files that make up "project-config"
    /tasks          // contain files that make up "tasks" page
      /task-detail  // contain files that make up "task detail" page 
  /navbar           // contain files that define navbar layout
  .
  .                 // etc

```

### shared-directives

`shared-directives` contain UI components (either element or attribute) that don't represent any resource. This should be general enough to be reused by other apps.

```
/shared-directives
  /input-date
    input-date.de.html
    input-date.de.js
    _input-date.de.sass
  /input-filter
    input-filter.de.html
    input-filter.de.js
    _input-filter.de.sass
  .
  . // etc
```

### shared-services

`shared-services` contain services / factories that don't represent any resource. The service / factory should be general enough to be reused by other apps.

```
/shared-services
  /toast
    tm-toast-t.service.js
  /loadable
    loadable.factory.js
```

## Guidelines

### Components

1. module: `<name>.module.js`
2. service: `<name>.service.js`
  1. The actual name of the service should be `<name>Service` e.g. `PublishingService`
  2. Use service to create a singleton service
3. factory: `<name>.factory.js`
  1. The actual name of the factory should be `<name>` e.g. `Loadable`
  2. Use factory to create an instantiable class
4. directive: `<name>.d{e|a}.{js|sass|html}`
  1. The actual directive name (not filename) is prefixed with `dsTm`, e.g. `dsTmTeamCard`
  2. restrictions:
    1. use restriction `E` if the directive is meant to be an element.
    2. use restriction `A` if the directive is meant to enhance an existing element.
  3. use link to do any UI related actions, e.g. binding event, element/attribute manipulations
  4. use controller to connect directive to any services
  5. The controller name (if any) is defined without `dsTm` and suffixed by `Ctrl`
  6. Controller definition:
    1. For static controller, define controller in the same file as directive's definition
    
        ```
        // dummy.dea.js
        angular.module('dsTmApp')
          .directive('dsTmDummy', function(){
            return {
              controller: 'DummyCtrl'
            };
          })
          .controller('DummyCtrl', function(){});
        ```
    2. For dynamic controller, define controller in a separate file
    
        ```
        // dummy.dea.js
        angular.module('dsTmApp')
          .directive('dsTmDummy', function(){
            return {
              controller: '@',
              name: 'controller',
            };
          });
          
        // <name>-dummy.ctrl.js
        angular.module('dsTmApp')
          .controller('<Name>DummyCtrl', function(){});
        ```
  7. scope:
    1. use `@` for configuration outside the scope, e.g. `default-title="UNTITLED"`, `max-length="30"`, `min-length="{{ variable }}"`
    2. use `&` for action callback after the directive do something, e.g. `on-change="refresh()"`
    3. use `=` for two-way object binding, e.g. `task="task"`
5. layout: `<name>.layout.{js|sass|html}`
  1. The actual name for the layout controller should be `<name>Layout`, e.g. `ConfigLayout`
6. ad-hoc controller: `<name>.ctrl`
  1. The actual name for the controller should be `<name>Ctrl`, e.g. `InputFilterCtrl`
7. configuration: `<name>.config.js`

### Code style

#### General
1. horizontal tab space indentation: `2`

#### Javascript files

1. Revealing module pattern (public vars/functions up top)

    ```
    function DummyService() {
      return {
        save: save, // exposed function/variable
        ..
      };
      
      //// <separator for implementations>
      
      function save() {
        // implementations
      }
      
    }
    ```
2. Use named functions `function save() { }` over anonymous function `var save = function(){ };`, especially in angular's component (e.g. directive) definitions, main function, or other big function. Having named functions will make the stack trace easier to read.

#### SASS files

1. wrap all rules defined for components with its selector:
  1. `dsTmDummy` with restriction `E`:
  
      ```
      ds-tm-dummy
        /*any css rule */
      ```
  2. `dsTmDummy` with restriction `A`:
  
      ```
      [ds-tm-dummy]
        /*any css rule */
      ```
  3. `dsTmDummy` with restriction `EA`:
  
      ```
      ds-tm-dummy, [ds-tm-dummy]
        /*any css rule */
      ```
2. use mixin for configurable css

    ```
    @mixin ds-tm-dummy-max-width($selector, $max-width)
      #{$selector}
        container
          max-width: $max-width
    ```

### Unit Testing

1. place the file beside the component being tested.
2. name it with the same filename as the component + `.spec`, e.g. `dynamic-tab.de.js` -> `dynamic-tab.de.spec.js`
3. the most outer `describe()`should be the same as component name, e.g. `dynamic-tab.de`
4. `it()` description should be readable when appended to `describe()` string.

    ```
    describe('component', function(){
      it('should ...', function(){
      });
    });
    // this will produce sentence 'component should ... ' on test log
    ```


# What To Do

- [ ] Refactor + Unit testing old files + Apply revealing module pattern
- [ ] add module into each top level folder
- [ ] get rid of `deprecated` folders
