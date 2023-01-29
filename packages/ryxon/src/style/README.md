# Built-in Style

### Intro

Ryxon contains some common styles that can be used directly by the className.

### Text ellipsis

When the text content length exceeds the maximum container width, the excess text is automatically omitted.

```html
<div class="r-ellipsis">
  This is a paragraph that displays up to one line of text, and the rest of the
  text will be omitted.
</div>

<div class="r-multi-ellipsis--l2">
  This is a paragraph that displays up to two lines of text, and the rest of the
  text will be omitted.
</div>

<div class="r-multi-ellipsis--l3">
  This is a paragraph that displays up to three lines of text, and the rest of
  the text will be omitted.
</div>
```

### Hairline

Add 1px border under the Retina screen for the element, based on a pseudo element.

```html
<!-- border top -->
<div class="r-hairline--top"></div>

<!-- border bottom -->
<div class="r-hairline--bottom"></div>

<!-- border left -->
<div class="r-hairline--left"></div>

<!-- border right -->
<div class="r-hairline--right"></div>

<!-- border top & bottom -->
<div class="r-hairline--top-bottom"></div>

<!-- full border -->
<div class="r-hairline--surround"></div>
```

### Safe Area

Enable safe area.

```html
<!-- top -->
<div class="r-safe-area-top"></div>

<!-- bottom -->
<div class="r-safe-area-bottom"></div>
```

### Animation

```html
<!-- fade in  -->
<transition name="r-fade">
  <div v-show="visible">Fade</div>
</transition>

<!-- slide up -->
<transition name="r-slide-up">
  <div v-show="visible">Slide Up</div>
</transition>

<!-- slide down -->
<transition name="r-slide-down">
  <div v-show="visible">Slide Down</div>
</transition>

<!-- slide left -->
<transition name="r-slide-left">
  <div v-show="visible">Slide Left</div>
</transition>

<!-- slide right -->
<transition name="r-slide-right">
  <div v-show="visible">Slide Right</div>
</transition>
```

### Haptics Feedback

Add haptics feedback for an element. When touched, the opacity of the element is reduced.

Usually used in clickable elements such as button.

```html
<div class="r-haptics-feedback"></div>
```

### Clearfix

Clear floated content within a container.

```html
<div class="r-clearfix"></div>
```
