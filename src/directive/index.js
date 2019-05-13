import store from '@/store';
import { isMobile } from '@/utils';

const install = function (Vue) {
  Vue.directive('mobile', {
    inserted(el, binding, vnode) {
      const { value, arg } = binding;
    },
  });
};

export default install;
