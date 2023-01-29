<template>
  <div class="mb-4">
    <r-button>Default</r-button>
    <r-button type="primary">Primary</r-button>
    <r-button type="success">Success</r-button>
    <r-button type="info">Info</r-button>
    <r-button type="warning">Warning</r-button>
    <r-button type="danger">Danger</r-button>
  </div>
  <div class="mb-4">
    <r-button plain>Plain</r-button>
    <r-button type="primary" plain>Primary</r-button>
    <r-button type="success" plain>Success</r-button>
    <r-button type="info" plain>Info</r-button>
    <r-button type="warning" plain>Warning</r-button>
    <r-button type="danger" plain>Danger</r-button>
  </div>

  <div class="mb-4">
    <r-button round>Round</r-button>
    <r-button type="primary" round>Primary</r-button>
    <r-button type="success" round>Success</r-button>
    <r-button type="info" round>Info</r-button>
    <r-button type="warning" round>Warning</r-button>
    <r-button type="danger" round>Danger</r-button>
  </div>

  <div>
    <r-button icon="search" circle />
    <r-button type="primary" icon="edit" circle />
    <r-button type="success" icon="check" circle />
    <r-button type="info" icon="message" circle />
    <r-button type="warning" icon="star" circle />
    <r-button type="danger" icon="delete" circle />
  </div>
</template>
<style>
.mb-4 {
  margin-bottom: 20px;
}
</style>