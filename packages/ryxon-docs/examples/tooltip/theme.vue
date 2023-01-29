<template>
  <r-tooltip content="Top center" placement="top">
    <r-button>Dark</r-button>
  </r-tooltip>
  <r-tooltip content="Bottom center" placement="bottom" effect="light">
    <r-button>Light</r-button>
  </r-tooltip>

  <r-tooltip content="Bottom center" effect="customized">
    <r-button>Customized theme</r-button>
  </r-tooltip>
</template>

<style>
.r-tooltip .is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.r-tooltip .is-customized .r-tooltip__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}
</style>
