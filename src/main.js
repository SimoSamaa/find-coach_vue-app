import { createApp, defineAsyncComponent } from 'vue';
import router from './routes';
import store from './modules/index';
import App from './App.vue';

import './scss/main-style.scss';
import './scss/helpers/_font.css';

import BaseCard from './components/UI/BaseCard';
import BaseButton from './components/UI/BaseButton';
import BaseExpe from './components/UI/BaseExpe';
import BaseCheckbox from './components/UI/BaseCheckbox';
import BaseInputfield from './components/UI/BaseInputfield';
import BaseTextarea from './components/UI/BaseTextarea';

const BaseDialog = defineAsyncComponent(() => import('./components/UI/BaseDialog'));
const BaseLoading = defineAsyncComponent(() => import('./components/UI/BaseLoading'));
const BaseSkeletonLoading = defineAsyncComponent(() => import('./components/UI/BaseSkeletonLoading'));
const BaseBtnhover = defineAsyncComponent(() => import('./components/UI/BaseBtnhover'));

const app = createApp(App);

app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.component("base-expe", BaseExpe);
app.component("base-dialog", BaseDialog);
app.component("BaseCheckbox", BaseCheckbox);
app.component("BaseInputfield", BaseInputfield);
app.component("BaseTextarea", BaseTextarea);
app.component("BaseLoading", BaseLoading);
app.component("BaseSkeletonLoading", BaseSkeletonLoading);
app.component("BaseBtnhover", BaseBtnhover);

app.use(router);

app.use(store);

app.mount('#app');
