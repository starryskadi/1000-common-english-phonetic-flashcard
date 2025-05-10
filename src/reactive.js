const cache = new WeakMap();
const effectsMap = new WeakMap();

let activeEffect = null;

function track(target, prop) {
  let depMaps = effectsMap.get(target);

  if (!depMaps) {
    depMaps = new Map();
    effectsMap.set(target, depMaps);
  }

  let dep = depMaps.get(prop);
  if (!dep) {
    dep = new Set();
    depMaps.set(prop, dep);
  }

  if (activeEffect) {
    dep.add(activeEffect);
  }
}

function trigger(target, prop) {
  const depMaps = effectsMap.get(target);

  if (!depMaps) return;

  const deps = depMaps.get(prop);

  if (!deps) return;

  for (const eff of deps) {
    eff();
  }
}

function effect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

function reactive(target) {
  function setHandler(target, prop, value) {
    if (target[prop] !== value) {
      target[prop] = value;

      trigger(target, prop);

      return true;
    }

    return true;
  }

  return new Proxy(target, {
    set: setHandler,
    get(target, prop, receiver) {
      var value = Reflect.get(target, prop, receiver);

      track(target, prop);

      if (typeof value !== "object" || value === null) {
        return value;
      }

      if (cache.has(value)) {
        return cache.get(value);
      }

      const nestedValue = reactive(value);

      cache.set(value, nestedValue);

      return nestedValue;
    },
  });
}

export { reactive, effect };
