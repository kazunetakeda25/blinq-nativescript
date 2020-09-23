<template>
  <FlexboxLayout marginTop="40" height="70" width="100%" flexDirection="row" alignItems="flex-start">
    <Label flexGrow="1" :text="title" class="page-title"/>
  </FlexboxLayout>
</template>

<script>
export default {
  props: {
    title: String,
  },
}
</script>

<style scoped></style>

