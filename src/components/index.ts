import SvgIcon from "./SvgIcon.vue";
import Home from "@/components/home.vue";

const allGloablComponents = { SvgIcon, Home };

export default {
  install(app) {
    console.log(123);
    Object.keys(allGloablComponents).forEach((key) => {
      app.component(key, allGloablComponents[key]);
    });
  },
};
