# No Redundant Fetch Calls

## What to avoid

Making the same API call multiple times on the same page, or fetching inside a loop.

---

## Rules

### Fetch once at the container level

Never call `createApiClient().get(...)` inside a `.map()` or loop. Fetch the list at the parent level and pass data down.

```ts
// Wrong — fetches per item
function UserRow({ id }: { id: string }) {
  const [user, setUser] = useState(null)
  useEffect(() => { api.get(`/users/${id}`).then(setUser) }, [id])
  return <tr>{user?.name}</tr>
}

// Correct — parent fetches all
async function UserTable() {
  const users = await api.get<User[]>('/users')
  return users.map((u) => <UserRow key={u.id} user={u} />)
}
```

### Use SWR or React Query for client-side caching

When fetching in client components, use SWR or React Query to avoid duplicate network requests and enable deduplication.

```ts
import useSWR from 'swr'

function UserProfile({ id }: { id: string }) {
  const { data } = useSWR(`/users/${id}`, (url) => api.get(url))
  return <div>{data?.name}</div>
}
```

### Prefer server components for initial data

Use Next.js Server Components to fetch data at render time — avoids client-side waterfalls.

---

## During code review

Flag any of these patterns:

- `fetch` or `api.get()` inside a `.map()` or loop
- The same endpoint called multiple times on the same page
- Client-side fetches that could be server component fetches
