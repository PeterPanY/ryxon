<template>
  <r-tooltip content="Top center" placement="top">
    <r-button>Dark</r-button>
  </r-tooltip>
  <r-tooltip content="Bottom center" placement="bottom" theme="light">
    <r-button>Light</r-button>
  </r-tooltip>

  <r-tooltip content="Bottom center" theme="customized">
    <r-button>Customized theme</r-button>
  </r-tooltip>
</template>

<style>
.r-tooltip--customized .r-tooltip__content {
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.r-tooltip--customized .r-tooltip__arrow {
  color: #b2e68d;
}
</style>
