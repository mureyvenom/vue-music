import type { App } from 'vue';
import _ from 'lodash';

export default {
  install(app: App) {
    const components = import.meta.glob('../components/*.vue', {
      eager: true,
    });

    Object.entries(components).forEach(([path, module]) => {
      const componentName = _.upperFirst(
        _.camelCase(
          path
            .split('/')
            .pop()
            ?.replace(/\.\w+$/, '')
        )
      );

      app.component(componentName, (module as any).default);
    });
  },
};
