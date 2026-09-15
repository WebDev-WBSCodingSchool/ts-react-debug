# Teaching notes

Not for students. This file only lives on the `solution` branch. Students working on `main` will not see it, but the branch is public, so anyone can check it out.

## What the exercise covers

| File | Fixes | What it teaches |
| --- | --- | --- |
| `utils/format.ts` | 3 | Parameter and return annotations on plain functions |
| `components/Badge.tsx` | 2 | A props interface, plus a literal union prop |
| `components/Card.tsx` | 1 | `children: ReactNode` and an optional prop |
| `components/CategoryFilter.tsx` | 2 | A wrong annotation that must be widened, callback prop |
| `components/EventCard.tsx` | 2 | Object prop, optional prop with a default |
| `components/EventList.tsx` | 1 | Array prop |
| `components/FavoriteButton.tsx` | 1 | Simple prop, plus a cascading error from the context |
| `components/SearchBar.tsx` | 3 | `ChangeEvent`, `useRef` with a DOM node |
| `components/EventForm.tsx` | 6 | `ChangeEvent` on input and textarea, `FormEvent` |
| `contexts/FavoritesContext.tsx` | 6 | Context value type, generic on `createContext`, provider props |
| `data/events.ts` | 2 | Async return types, and one annotation that is a lie |
| `layouts/RootLayout.tsx` | 1 | Destructured callback argument (`NavLink` className) |
| `pages/HomePage.tsx` | 6 | `useState` generics, union state, callback prop |
| `pages/EventDetailPage.tsx` | 2 | `useState<T \| null>` |
| `pages/FavoritesPage.tsx` | 2 | `useState<T[]>` |

Around 40 fixes, 63 reported errors on a fresh clone.

## Error code coverage

Not all implicit-any. The mix is deliberate so they have to read messages rather than pattern match:

- `TS7006` and `TS7031`, implicit any on parameters and binding elements. The bulk
- `TS7053`, implicit any index signature (`Badge`, indexing a `Record<Category, string>` with an untyped value)
- `TS2322`, wrong annotation (`CategoryFilter` options array, and the context default value)
- `TS2345`, wrong argument (setState calls against a `never[]` or `null` state)
- `TS2339`, property does not exist on `never` (the `useRef` and `useState` cascades)
- `TS2554`, expected 0 arguments (the context default value, seen from `FavoriteButton`)
- `TS2740`, missing properties (the deliberately wrong `Promise<EventItem>` in the data layer)

## Deliberate cascades

Three single lines each cause a pile of errors, which is the point.

1. `useState(null)` in `EventDetailPage` produces nine `TS2339` errors. Fixing one line clears all nine. Good moment to run the build live in front of them
2. The untyped context default value produces errors in a different file (`FavoriteButton`). This is the one students find genuinely confusing, so the README calls it out
3. `useState([])` infers `never[]`, which is worth explaining explicitly. Most of them will have never seen `never`

## Things they will get wrong

- Reaching for `any` on the event handlers. ESLint is set to error on `@typescript-eslint/no-explicit-any` and on ts-comment directives, so `npm run lint` catches it
- Typing `e: Event` on a handler. `Event` is a DOM global, so it compiles far enough to be confusing. This is also why the domain type is called `EventItem` and not `Event`
- Reaching for `as` when they hit the context or the `never[]` errors. Worth calling out at the start
- Annotating `onChange` props as `Function`. Push them toward `(next: Filter) => void`

## Suggested session shape

- 20 min: you demo the build, walk the error output, do `utils/format.ts` and `Badge.tsx` live
- 90 min: blocks 1 to 3 on their own or in pairs
- Break
- 20 min: you demo `useState` generics and the `never` cascade live, since block 4 depends on it
- 60 min: block 4
- 20 min: diff against the `solution` branch, talk about which annotations were obvious and which were arguments

## Branches

- `main`, the exercise
- `solution`, every annotation applied, `npm run build` and `npm run lint` both clean

To show a single file's answer in class: `git show solution:src/contexts/FavoritesContext.tsx`

To diff a student's work against the answer: `git diff solution -- src/pages/HomePage.tsx`
