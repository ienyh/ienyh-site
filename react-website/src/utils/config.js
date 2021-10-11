export const BLOG_SCROLL_CONFIG = {
  reset: true,   // 滚动鼠标时，动画开关(默认是 false 没有打开鼠标滚动的动画开关)
  origin: 'left', // 动画开始的方向
  duration: 500,   // 动画持续时间 ms
  delay: 0, // 延迟
  // rotate: { x: 0, y: 0, z: 0 },  // 过度到 0 的初始角度
  // opacity: 0.2, // 初始透明度  (0.2 到 1 的效果)
  // scale: 1.2, // 缩放
  easing: 'ease-in-out', // 动画效果 缓动'ease', 'ease-in-out'，'linear'...
  distance: '40px',
};