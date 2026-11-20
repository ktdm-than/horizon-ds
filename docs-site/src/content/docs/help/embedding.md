---
title: Embedding
description: How this site embeds Storybook and Figma, and why a frame may be blank.
---

Component pages embed two things live.

## Storybook stories

Each story is an `<iframe>` on the production Storybook deployment recorded on the board for that component, loaded as `iframe.html?id=<story-id>&viewMode=story&globals=theme:<light|dark>`. The `theme` global is the Storybook toolbar's own, so the dark frame sets `data-theme="dark"` exactly as your app would.

:::note[If a frame stays blank]
The Storybook deployments answer without sign-in (checked 2026-11-20). A blank frame usually means the network blocked the Storybook host, or that deployment was removed. The "Open in Storybook" link under each frame opens the same story in a tab of its own.
:::

## The Figma node

The Design tab embeds the component's Figma node through Figma's embed URL. The Figma file is shared with the team only, so outside viewers see a sign-in prompt. The Design tab also carries a screenshot read from Figma, which always renders.


---

<small>Guide, written from the repo at [`d1860fe`](https://github.com/ktdm-than/horizon-ds/commit/d1860feaaa47e0af02a0d0b0f0ac52cba9a7aca2) and re-read against it on 2026-11-20.</small>
