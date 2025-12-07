## !!steps Code

!duration 180

```jsx ! app/cart/actions.ts
"use server"

import { cart, type AddToCartState } from "@/services/cart"
import { metrics } from "@/services/metrics"

export async function addToCart(
  state: AddToCartState,
  data: FormData
): Promise<AddToCartState> {
  const id = data.get("id")
  const productId = data.get("productId")

  const { status, message } = await cart.add(id, productId)

  // !mark[3:55] 55 50
  await metrics.send("cart", { id, productId, status })

  return { status, message }
}
```

## !!steps Terminal

!duration 420

```tsx ! app/cart/actions.ts

{ type: 'start' }
{ type: 'start-step' }
{ type: 'text-start', id: '0' }
{ type: 'text-delta', id: '0', delta: 'With' }
{
  type: 'text-delta',
  id: '0',
  delta: 'fur of midnight, eyes of emerald sheen'
}
{
  type: 'text-delta',
  id: '0',
  delta: ' is his name.\nHe reigns supreme, a silent'
}
// !mark[3:55] 55 50
{ type: 'text-end', id: '0' }
{ type: 'finish-step' }
{ type: 'finish' }
```
