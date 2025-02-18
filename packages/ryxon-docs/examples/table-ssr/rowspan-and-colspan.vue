<template>
  <r-table-ssr
    :rows="tableData"
    border
    :span-method="arraySpanMethod"
  ></r-table-ssr>
</template>

<script setup lang="ts">
interface User {
  id: string
  name: string
  amount1: string
  amount2: string
  amount3: number
}

const tableData: User[] = [
  {
    id: '12987122',
    name: 'Tom',
    amount1: '234',
    amount2: '3.2',
    amount3: 10
  },
  {
    id: '12987123',
    name: 'Tom',
    amount1: '165',
    amount2: '4.43',
    amount3: 12
  },
  {
    id: '12987124',
    name: 'Tom',
    amount1: '324',
    amount2: '1.9',
    amount3: 9
  },
  {
    id: '12987125',
    name: 'Tom',
    amount1: '621',
    amount2: '2.2',
    amount3: 17
  },
  {
    id: '12987126',
    name: 'Tom',
    amount1: '539',
    amount2: '4.1',
    amount3: 15
  }
]

const arraySpanMethod = ({ rowIndex, columnIndex }) => {
  if (rowIndex % 2 === 0) {
    if (columnIndex === 0) {
      return [1, 2]
    }
    if (columnIndex === 1) {
      return [0, 0]
    }
  }
}
</script>
