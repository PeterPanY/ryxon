# Composables

### Intro

Ryxon provide some built-in composition APIs, you can directly use these APIs for development.

### Install

Although `@ryxon/use` is already included in Ryxon's dependencies, it is still recommended to install this package explicitly:

```shell
# with npm
npm i @ryxon/use

# with yarn
yarn add @ryxon/use

# with pnpm
pnpm add @ryxon/use
```

### Demo

```js
import { useWindowSize } from '@ryxon/use';

const { width, height } = useWindowSize();

console.log(width.value); // -> window width
console.log(height.value); // -> window height
```

### API List

| Name | Description |
| --- | --- |
| [useClickAway](#/en-US/use-click-away) | Triggers a callback when user clicks outside of the target element |
| [useCountDown](#/en-US/use-count-down) | Used to manage the countdown |
| [useCustomFieldValue](#/en-US/use-custom-field-value) | Used to custom Field value |
| [useEventListener](#/en-US/use-event-listener) | Used to attach event |
| [usePageVisibility](#/en-US/use-page-visibility) | Get the visible state of the page |
| [useRect](#/en-US/use-rect) | Get the size of an element and its position relative to the viewport |
| [useRelation](#/en-US/use-relation) | Establish the association relationship between parent and child components |
| [useScrollParent](#/en-US/use-scroll-parent) | Get the closest parent element that is scrollable |
| [useToggle](#/en-US/use-toggle) | Used to switch between `true` and `false` |
| [useWindowSize](#/en-US/use-window-size) | Get the viewport width and height of the browser window |
