# Deno Web App
Deno App that exposes endpoints to handle the CRUD

## Folders Structure

### Data
In here we have the a CSV with planets

### Models
In here we have the business logic for Launches and for planets

### Public
In here we have the Web APp in Vanilla JavaScript

###
1. `mods.ts` is our main file.
2. `api.ts` handles the routes for our backend
3. `deps.ts` handles the develop dependencies used
4. `test_deps.ts` handles the testing dependencies used

## Commands
Running the app:
`deno run --allow-net --allow-read mod.ts`

The Web App runs on:
`http://localhost:8000/index.html`

## Testing
`deno test --allow-read`
