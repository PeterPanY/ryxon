<template>
  <div class="tooltip-base-box">
    <div class="row center">
      <r-tooltip
        class="box-item"
        theme="dark"
        content="Top Left prompts info"
        placement="top-start"
      >
        <r-button>top-start</r-button>
      </r-tooltip>
      <r-tooltip
        class="box-item"
        theme="dark"
        content="Top Center prompts info"
        placement="top"
      >
        <r-button>top</r-button>
      </r-tooltip>
      <r-tooltip
        class="box-item"
        theme="dark"
        content="Top Right prompts info"
        placement="top-end"
      >
        <r-button>top-end</r-button>
      </r-tooltip>
    </div>
    <div class="row">
      <r-tooltip
        class="box-item"
        theme="dark"
        content="Left Top prompts info"
        placement="left-start"
      >
        <r-button>left-start</r-button>
      </r-tooltip>
      <r-tooltip
        class="box-item"
        theme="dark"
        content="Right Top prompts info"
        placement="right-start"
      >
        <r-button>right-start</r-button>
      </r-tooltip>
    </div>
    <div class="row">
      <r-tooltip
        class="box-item"
        theme="dark"
        content="Left Center prompts info"
        placement="left"
      >
        <r-button class="">left</r-button>
      </r-tooltip>
      <r-tooltip
        class="box-item"
        theme="dark"
        content="Right Center prompts info"
        placement="right"
      >
        <r-button>right</r-button>
      </r-tooltip>
    </div>
    <div class="row">
      <r-tooltip
        class="box-item"
        theme="dark"
        content="Left Bottom prompts info"
        placement="left-end"
      >
        <r-button>left-end</r-button>
      </r-tooltip>
      <r-tooltip
        class="box-item"
        theme="dark"
        content="Right Bottom prompts info"
        placement="right-end"
      >
        <r-button>right-end</r-button>
      </r-tooltip>
    </div>
    <div class="row center">
      <r-tooltip
        class="box-item"
        theme="dark"
        content="Bottom Left prompts info"
        placement="bottom-start"
      >
        <r-button>bottom-start</r-button>
      </r-tooltip>
      <r-tooltip
        class="box-item"
        theme="dark"
        content="Bottom Center prompts info"
        placement="bottom"
      >
        <r-button>bottom</r-button>
      </r-tooltip>
      <r-tooltip
        class="box-item"
        theme="dark"
        content="Bottom Right prompts info"
        placement="bottom-end"
      >
        <r-button>bottom-end</r-button>
      </r-tooltip>
    </div>
  </div>
</template>

<style scoped>
.tooltip-base-box {
  width: 100%;
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
  width: 110px;
  margin-top: 10px;
}
</style>
