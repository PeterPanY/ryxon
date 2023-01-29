<template>
  <div class="tooltip-base-box">
    <div class="row center">
      <r-tooltip
        class="box-item"
        effect="dark"
        content="Top Center prompts info"
        placement="top"
      >
        <r-button>top</r-button>
      </r-tooltip>
    </div>
    <div class="row">
      <r-tooltip
        class="box-item"
        effect="dark"
        content="Left Center prompts info"
        placement="left"
      >
        <r-button class="mt-3 mb-3">left</r-button>
      </r-tooltip>
      <r-tooltip
        class="box-item"
        effect="dark"
        content="Right Center prompts info"
        placement="right"
      >
        <r-button>right</r-button>
      </r-tooltip>
    </div>
    <div class="row center">
      <r-tooltip
        class="box-item"
        effect="dark"
        content="Bottom Center prompts info"
        placement="bottom"
      >
        <r-button>bottom</r-button>
      </r-tooltip>
    </div>
  </div>
</template>

<style>
.tooltip-base-box {
  width: 600px;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-base-box .center {
  justify-content: center;
}
.tooltip-base-box .box-item {
  margin-top: 10px;
}
</style>