import { createApp, App } from 'vue';
import AppComponent from './App.vue';
import { VuePluginClass } from '@/plugin';
import { RouterGuardClass } from '@/router/guard';
import './styles/flex.scss';
import './styles/common.scss';
import './styles/antd.scss';

const app: App = createApp(AppComponent);

VuePluginClass.getInstance(app).usePlugins();
RouterGuardClass.getInstance().beforeEach();

app.mount('#app');
