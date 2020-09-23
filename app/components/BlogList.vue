<template>
  <StackLayout>
    <StackLayout
      v-for="(blog,index) in blogHighlights"
      :key="index"
      width="100%"
      padding="10"
      :height="itemHeight"
      class="bg-default"
    >
      <Shadow>
        <StackLayout width="100%" backgroundColor="white">
          <Image
            horizontalAlignment="center"
            width="100%"
            :height="imgHeight"
            :src="blog.CoverImageCover"
            stretch="aspectFill"
          />
          <GridLayout rows="*" columns="*" :height="labelHeight" backgroundColor="white">
            <Label row="0" width="100%" class="blog-title"
              verticalAlignment="center"
              :color="$colors.FONT_DEFAULT"
              :text="$responsiveUI.toUpperCase(blog.Title)"
            />
          </GridLayout>
        </StackLayout>
      </Shadow>
    </StackLayout>
  </StackLayout>
</template>

<script>
import Shadow from '~/components/Shadow/Index';
export default {
  components: {
    Shadow,
  },
  props: {
    blogHighlights: Array,
  },
  data() {
    return {
      itemHeight: (this.$responsiveUI.scale(375) - 20) * 0.7,
      imgHeight: ((this.$responsiveUI.scale(375) - 20) * 0.7) - 50,
      labelHeight: 50,
    };
  },
  computed: {
  },
  watch: {
  },
  beforeMount() {
  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style scoped>
.blog-title {
  font-family: 'Roboto', 'Roboto-Light';
  font-weight: 300;
  font-size: 16;
  width: 100%;
  text-align: center;
}
</style>
