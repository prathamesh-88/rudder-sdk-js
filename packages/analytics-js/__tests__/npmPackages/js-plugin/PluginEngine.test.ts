import {
  LifeCyclePlugin,
  PluginEngine,
} from '@rudderstack/analytics-js/npmPackages/js-plugin/PluginEngine';

const mockPlugin1: LifeCyclePlugin = {
  name: 'p1',
  foo: 'bar1',
  ext: {
    form: {
      processMeta(meta: string[]) {
        meta.push('m1');
      },
    },
  },
};

const mockPlugin2: LifeCyclePlugin = {
  name: 'p2',
  foo: 'bar2',
};

const mockPlugin3: LifeCyclePlugin = {
  name: 'p3',
  foo: 'bar3',
  ext: {
    form: {
      processMeta(meta: string[]) {
        meta.push('m3');
      },
    },
  },
};

describe('PluginEngine', () => {
  let pluginEngineTestInstance: PluginEngine;

  beforeEach(() => {
    pluginEngineTestInstance = new PluginEngine();
    pluginEngineTestInstance.register(mockPlugin1);
    pluginEngineTestInstance.register(mockPlugin2);
    pluginEngineTestInstance.register(mockPlugin3);
  });

  afterEach(() => {});

  it('should retrieve all registered plugins', () => {
    expect(pluginEngineTestInstance.getPlugins().length).toEqual(3);
  });

  it('should retrieve registered plugins by lifeCycle name part', () => {
    expect(pluginEngineTestInstance.getPlugins('ext').length).toEqual(2);
  });

  it('should register plugins', () => {
    pluginEngineTestInstance.register({ name: 'p4' });
    expect(pluginEngineTestInstance.getPlugins().length).toEqual(4);
  });

  it('should invoke on functions', () => {
    const meta = ['m0'];
    pluginEngineTestInstance.invoke('ext.form.processMeta', meta);
    expect(meta).toStrictEqual(['m0', 'm1', 'm3']);
  });

  it('should invoke to only collect values', () => {
    const bars = pluginEngineTestInstance.invoke('foo');
    expect(bars).toStrictEqual(['bar1', 'bar2', 'bar3']);

    const bars2 = pluginEngineTestInstance.invoke('!foo');
    expect(bars2).toStrictEqual(['bar1', 'bar2', 'bar3']);
  });

  it('should unregister plugin', () => {
    pluginEngineTestInstance.unregister('p2');
    expect(pluginEngineTestInstance.getPlugins().map(p => p.name)).toStrictEqual(['p1', 'p3']);
    expect(pluginEngineTestInstance.getPlugin('p2')).toBeUndefined();
  });

  it('should not load if deps do not exist', () => {
    pluginEngineTestInstance.register({ name: 'p4', deps: ['p5'] });
    expect(pluginEngineTestInstance.getPlugins().map(p => p.name)).toStrictEqual([
      'p1',
      'p2',
      'p3',
    ]);

    pluginEngineTestInstance.register({ name: 'p5' });
    expect(pluginEngineTestInstance.getPlugins().map(p => p.name)).toStrictEqual([
      'p1',
      'p2',
      'p3',
      'p5',
      'p4',
    ]);
  });

  it('should unregister a plugin and then re-register', () => {
    pluginEngineTestInstance.unregister('p3');
    expect(pluginEngineTestInstance.getPlugins().map(p => p.name)).toStrictEqual(['p1', 'p2']);
    expect(pluginEngineTestInstance.getPlugin('p3')).toBeUndefined();
    pluginEngineTestInstance.register(mockPlugin3);
    expect(pluginEngineTestInstance.getPlugins().map(p => p.name)).toStrictEqual([
      'p1',
      'p2',
      'p3',
    ]);
    expect(pluginEngineTestInstance.getPlugin('p3')).toStrictEqual(mockPlugin3);
  });

  it('should not be able to register same name plugin', () => {
    try {
      pluginEngineTestInstance.register({ name: 'p1' });
    } catch (e) {
      expect(e.message).toContain('error');
    }
  });

  it('should not be able to unregister a plugin that not exist', () => {
    try {
      pluginEngineTestInstance.unregister('p0');
    } catch (e) {
      expect(e.message).toContain('error');
    }
  });

  it('should sort by order', () => {
    const arr: LifeCyclePlugin[] = [
      { name: '0', order: 0 },
      { name: '10', order: 10 },
      { name: '5', order: 5 },
    ];
    pluginEngineTestInstance.sort(arr);
    expect(arr.map(o => o.name)).toStrictEqual(['0', '5', '10']);
  });

  it('should sort plugins by deps when registered', () => {
    const d1 = { name: 'd1', deps: ['d2'] };
    const d2 = { name: 'd2', deps: [] };
    const d3 = { name: 'd3', deps: ['d4', 'd5'] };
    const d4 = { name: 'd4', deps: ['d5'] };
    const d5 = { name: 'd5', deps: [] };

    pluginEngineTestInstance.register(d1);
    pluginEngineTestInstance.register(d2);
    pluginEngineTestInstance.register(d3);
    pluginEngineTestInstance.register(d4);
    pluginEngineTestInstance.register(d5);

    expect(
      pluginEngineTestInstance
        .getPlugins()
        .filter(p => p.name.startsWith('d'))
        .map(p => p.name),
    ).toStrictEqual(['d2', 'd1', 'd5', 'd4', 'd3']);

    let rawPlugins = null;
    pluginEngineTestInstance.processRawPlugins(plugins => (rawPlugins = plugins.map(p => p.name)));
    expect(rawPlugins).toStrictEqual(['p1', 'p2', 'p3', 'd2', 'd1', 'd5', 'd4', 'd3']);
  });

  it('should throw errors from plugin when invoked', () => {
    pluginEngineTestInstance.register({
      name: 'failed',
      fail() {
        throw new Error('error: ext error');
      },
    });

    // Not failed because method not invoked (when starts with ! is noCall)
    pluginEngineTestInstance.invoke('!fail!');

    // Failed because method is invoked
    try {
      pluginEngineTestInstance.invoke('fail!');
    } catch (e) {
      expect(e.message).toContain('error');
    }

    // Failed because throws is true
    try {
      pluginEngineTestInstance.config.throws = true;
      pluginEngineTestInstance.invoke('fail');
    } catch (e) {
      expect(e.message).toContain('error');
    }

    // Not failed because throw is false
    pluginEngineTestInstance.config.throws = false;
    pluginEngineTestInstance.invoke('fail');
  });

  it('should register 1000 plugins in less than 100ms', () => {
    const time1 = Date.now();
    for (let i = 0; i < 1000; i++) {
      pluginEngineTestInstance.register({ name: `name${i}`, deps: ['n1', 'n2', 'n3', 'n4'] });
    }
    const time2 = Date.now();
    const elapsedTime = time2 - time1;
    expect(elapsedTime < 100).toBeTruthy();
  });
});

// // Test failure
//
//
// // Performance benchmak: register 1000 plugins should take less than 100ms
// const time1 = Date.now();
// for (let i = 0; i < 1000; i++) {
//   plugin.register({ name: 'name' + i, deps: ['n1', 'n2', 'n3', 'n4'] });
// }
// const time2 = Date.now();
// expect(time2 - time2).to.below(100);

console.log('Test success.');