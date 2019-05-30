# polls-websockets
Playing w/ websockets and vuex mutations

# Things that could be done next:

### Next App Features (Non Code Architecture Related)
- Let end-users add, delete, and edit options for a poll (when on admin view)

### Vuex Client-Server connection
- isomorphic js: if gw server and webapp server served from same machine can just export as module and import from client code
- if deployed separtely, publish to npm and include as dependency
(nothing needs to be passed over wire)

### Vuex Action vs Mutation Separation Of Concerns (And method naming for specific Vue components)
- Move all error-handling logic to Actions (outside of Mutations)
- Research: How specific Actions/Mutations should be?
  - e.g., "dispatchPollUpdate" with payload of { operation: 'addOption', value: 'exampleOption1' }"
  - VS. "addOption" with payload of { pollId: "abcdefh123", adminId: "sefsefsef234", option: 'exampleOption2" }"
    ( The second example makes more sense here, but how does this impact the methods that I add to a specific Component?... "dispatchAction..." vs "addOption"... etc )

### Vuex Store State Schema / Architecture
- Define consistent pattern for handling various types of entity updates
  - create / update / delete base entity (parent or child object)
  - create / update / delete field (basic property of a parent or child object)
  - create/ update / delete element that is within a list owned by a parent or child)
- Determine how to model state
  - Level 0: Shove everything into store state in ad-hoc manner as features grow, ignore performance and maintenance
  - Level 1: Model everything as 'entities', following Normalized relational pattern (Vuex-ORM will help here)
  - Requires more research
    - Level 2: Model normalized "entities" like above, but have separate "UI" section for just the subset of data that is coupled to the presentation layer of things (View models are subset of data entities, or unique merging of two entities, and are coupled to the actual visual component that the end user sees, however do not represent how particular bits of data will naturally be stored in relation to everything else)
    - Level 3: Include a 'beingModified' section of state, so intermediate modifications of data can be handled? (Probs just generally wouldn't add this unless there was a specific need for it in the app)

