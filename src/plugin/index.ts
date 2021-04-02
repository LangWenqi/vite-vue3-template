import { App } from 'vue';
import router from '@/router';
// import store from '@/store';
import setUpInjects from '@/inject';
import { setUpAntd } from '@/plugin/antd';

export class VuePluginClass {

  constructor (app: App) {
    this.app = app;
  }

  static instance: VuePluginClass | null

  app: App

  static getInstance (app: App) {
    if (!VuePluginClass.instance) {
      VuePluginClass.instance = new VuePluginClass(app)
    }
    return VuePluginClass.instance;
  }

  usePlugins () {
    this.useInjects();
    this.useOthers();
    this.useAntd();
    return this;
  }

  useAntd () {
    setUpAntd(this.app);
    return this;
  }

  useOthers () {
    this.app
      // .use(store)
      .use(router);
    return this;
  }

  useInjects () {
    setUpInjects(this.app);
    return this;
  }
}
