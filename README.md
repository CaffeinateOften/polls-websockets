# polls-websockets
Playing w/ websockets and vuex mutations

# Things that could be done next:

- Strongly type everything
- Have client retrieve not only the current server state on connection, but also the possible mutations that could be committed against state
- Show possible store actions as documentation on some endpoint (telling client 'these are the actions you can dispatch' --> these will be the mutation commits/payloads that would be returned)
- Handle case with many clients
- Try to find scenario where a client may fall out-of sync with server state where the next commit being applied would also result in out-of sync state
- Consider looking at other state management libraries and reflect on Declarative state transformations VS imperative (mutations)
- Review applications of event-sourcing and see if I can do anything cool with the history of committed mutations
- build out more of the poll platform just to demonstrate sync'ing of state
- explore scenario where any client can retrieve dispatched actions and respond with emitted mutations to any other connected client
