<template>
  <StackLayout :width="bigSize" :height="bigSize">
    <AbsoluteLayout :width="bigSize" :height="bigSize">
      <StackLayout :top="margin" :left="margin" :width="bubbleSize" :height="bubbleSize" :borderRadius="bubbleSize / 2" backgroundColor="black"></StackLayout>
      <GridLayout top="0" left="0" rows="*" columns="*" :width="bigSize" :height="bigSize">
        <Label row="0" width="100%" color="white" :text="`-${discount}%`"
          verticalAlignment="center" class="font-roboto-light"
          textAlignment="center" fontSize="12"
        />
      </GridLayout>
    </AbsoluteLayout>
  </StackLayout>
</template>

<script>
export default {
  props: {
    discount: String | Number,
  },
  data() {
    return {
      bigSize: 40,
      bubbleSize: 34,
      margin: 3,
    };
  },
  computed: {
  },
  watch: {},
  beforeMount() {},
  mounted() {
  },
  methods: {
  }
};
</script>

<style scoped></style>
