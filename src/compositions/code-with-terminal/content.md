## !!steps Code

!duration 180

```jsx ! app/ai-sdk/chat.ts
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

const model = google('gemini-2.0-flash');

const stream = streamText({
  model,
  prompt: 'Give me a sonnet about a cat called Steven.',
});
// !mark[3:55] 55 50
for await (const chunk of stream.toUIMessageStream()) {
  console.log(chunk);
}

```

## !!steps Terminal

!duration 420

```tsx ! app/cart/actions.ts

{ type: 'start' }
// !mark[3:55] 55 50
{ type: 'start-step' }
{ type: 'text-start', id: '0' }
// !mark[3:55] 55 50
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
// !mark[3:55] 55 50
{ type: 'finish' }
```
