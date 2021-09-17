<template>
	<div v-if="canBack" class="back-to-top" @click="toTop">
		<img src="../assets/svg/back-top.svg" style="width: 40px; height: 40px;">
	</div>
</template>

<script>
export default {
	name: "back-to-top",
	data () {
		return {
			canBack: false,
		}
	},
	created () {
		// 添加组件 scroll 事件，滚动到一定高度后才显示 BackTop 组件
		window.addEventListener("scroll", (event) => {
			if (document.documentElement.scrollTop > 240) {
				this.canBack = true;
			} else {
				this.canBack = false;
			}
		});
	},
	methods: {
		toTop () {
			// 设置定时器，平滑返回顶部
			const timer = setInterval(() => {
				let top = document.documentElement.scrollTop;
				if (top >= 20) {
					document.documentElement.scrollTop -= 20;
				} else {
					document.documentElement.scrollTop = 0;
					clearInterval(timer);
				}
			}, 10);
		}
	}
}
</script>

<style scoped>

@media screen and (max-width: 750px) {
  .back-to-top {
    display: none;
  }
}

.back-to-top {
	border: 1px solid #73777a;
	border-top-left-radius: 2rem;
	border-bottom-left-radius: 2rem;
	background-color: #f5f5f5;
	overflow: hidden;
  position: fixed;
  bottom: 3.5rem;
	right: -4.5rem;
  transition: all 0.15s ease-in;
  cursor: pointer;
	z-index: 99;
	display: flex;
	justify-content: start;
	align-items: center;
}

.back-to-top::after {
	content: "返回顶部";
	font-size: 0.6rem;
	width: 4rem;
	display: block;
}

.back-to-top:hover {
	width: 10rem;
  transition: all 0.35s ease;
	right: -0.5rem;
}
</style>