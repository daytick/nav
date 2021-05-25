// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var lastLi = $('.siteList').find('li.last');
var sites = JSON.parse(localStorage.getItem('sites'));
var siteStorage = sites || [{
  logo: 'F',
  url: 'https://www.figma.com'
}, {
  logo: 'X',
  url: 'https://xiedaimala.com'
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''); // 删除 / 开头的所有字符
};

var render = function render() {
  $('.siteList').find('li:not(.last)').remove();
  siteStorage.forEach(function (item, index) {
    var site = $("<li>\n                      <div class=\"site\">\n                        <div class=\"logo\">".concat(item.logo, "</div>\n                        <div class=\"link\">").concat(simplifyUrl(item.url), "</div>\n                        <div class=\"remove\">\n                          <svg class=\"icon\" aria-hidden=\"true\">\n                            <use xlink:href=\"#icon-add\"></use>\n                          </svg>\n                        </div>\n                      </div>\n                    </li>")).insertBefore(lastLi); // 模拟 a 标签

    site.on('click', function () {
      window.location.href = item.url;
    });
    site.on('click', '.remove', function (e) {
      e.stopPropagation(); // 阻止冒泡

      siteStorage.splice(index, 1);
      render();
    });
  });
}; // 渲染


render();
$('.addButton').on('click', function () {
  // 获取用户输入的网址
  var url = prompt('请输入你要添加的网址');

  if (!url.startsWith('http')) {
    url = 'https://' + url;
  } // 存储网站


  siteStorage.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  }); // 重新渲染

  render();
}); // 窗口卸载时将网站保存到 localStorage

window.onbeforeunload = function () {
  localStorage.setItem('sites', JSON.stringify(siteStorage));
}; // 允许使用键盘打开网站


$(document).on('keypress', function (e) {
  var key = e.key;
  siteStorage.forEach(function (item) {
    if (item.logo.toLowerCase() === key) {
      window.location.href = item.url;
    }
  });
});
$('.searchForm>input').on('keypress', function (e) {
  e.stopPropagation();
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.48e43180.js.map