<template>
  <StackLayout verticalAlignment="center"
    :width="tickerWidth" :height="tickerHeight" borderTopLeftRadius="20"
    paddingLeft="10" paddingRight="10" paddingBottom="10"
    :top="tickerTop" :left="tickerLeft" :backgroundColor="tickerBg">
    <Label class="ticker" textWrap="true" color="#fff" paddingTop="5"
      :text="getTickerText(currTickerIndex)" />
  </StackLayout>
</template>

<script>
export default {
  components: {
  },
  props: {
    tickers: Array,
    wrapperWidth: Number,
    wrapperHeight: Number,
  },
  data() {
    return {
      interval: 4,
      currTickerIndex: 0,
      autoTicking: null,
      tickerWidth: this.wrapperWidth * 0.7,
      tickerHeight: 60,
      tickerBg: '#000',
    };
  },
  computed: {
    tickerTop() {
      return this.wrapperHeight - this.tickerHeight;
    },
    tickerLeft() {
      return this.wrapperWidth - this.tickerWidth;
    },
    haveTickers() {
      return this.tickers && this.tickers.length > 0;
    },
  },
  watch: {
    async tickers() {
      await this.$nextTick();
      this.refreshTickersAnimation();
    },
  },
  beforeMount() {
  },
  mounted() {
  },
  methods: {
    getTickerText(index) {
      if (this.tickers && this.tickers[index]) {
        return this.$responsiveUI.toUpperCase(this.tickers[index].Message);
      }
      return '';
    },
    tickingNext(nextIndex) {
      if (this.haveTickers) {
        this.currTickerIndex = nextIndex;
        const newIndex = (this.currTickerIndex + 1) < this.tickers.length ? (this.currTickerIndex + 1) : 0;
        this.autoTicking = setTimeout(() => this.tickingNext(newIndex), this.interval * 1000);
      }
    },
    clearTickingTimer() {
      if (this.autoTicking) {
        clearTimeout(this.autoTicking);
      }
    },
    refreshTickersAnimation() {
      this.clearTickingTimer();
      this.tickingNext(0);
    },
  }
};
</script>

<style scoped>
.ticker {
  text-align: center;
  font-size: 10;
  font-family: 'Roboto', 'Roboto-Regular';
  font-weight: 400;
}
</style>
