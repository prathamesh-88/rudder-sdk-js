/* eslint-disable */
window.s = s_gi(window.s_account);

/* Plugin Config */

function s_doPlugins(s) {
  /* Add calls to plugins here */
  if (s.Util.getQueryParam('marid') != '') {
    s.campaign = 'MARID' + s.Util.getQueryParam('marid');
  } else {
    s.campaign = s.Util.getQueryParam('cid');
  }
}

// Will execute before s.t() and s.tl()
s.doPlugins = s_doPlugins;

/**
 * @license
 * Adobe Visitor API for JavaScript version: 4.4.0
 * Copyright 2019 Adobe, Inc. All Rights Reserved
 * More info available at https://marketing.adobe.com/resources/help/en_US/mcvid/
 */
var e = (function () {
  'use strict';
  function e(t) {
    return (e =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              'function' == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? 'symbol'
              : typeof e;
          })(t);
  }
  function t(e, t, n) {
    return (
      t in e
        ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
        : (e[t] = n),
      e
    );
  }
  function n() {
    return {
      callbacks: {},
      add: function (e, t) {
        this.callbacks[e] = this.callbacks[e] || [];
        var n = this.callbacks[e].push(t) - 1,
          i = this;
        return function () {
          i.callbacks[e].splice(n, 1);
        };
      },
      execute: function (e, t) {
        if (this.callbacks[e]) {
          (t = void 0 === t ? [] : t), (t = t instanceof Array ? t : [t]);
          try {
            for (; this.callbacks[e].length; ) {
              var n = this.callbacks[e].shift();
              'function' == typeof n ? n.apply(null, t) : n instanceof Array && n[1].apply(n[0], t);
            }
            delete this.callbacks[e];
          } catch (e) {}
        }
      },
      executeAll: function (e, t) {
        (t || (e && !j.isObjectEmpty(e))) &&
          Object.keys(this.callbacks).forEach(function (t) {
            var n = void 0 !== e[t] ? e[t] : '';
            this.execute(t, n);
          }, this);
      },
      hasCallbacks: function () {
        return Boolean(Object.keys(this.callbacks).length);
      },
    };
  }
  function i(e, t, n) {
    var i = null == e ? void 0 : e[t];
    return void 0 === i ? n : i;
  }
  function r(e) {
    for (var t = /^\d+$/, n = 0, i = e.length; n < i; n++) if (!t.test(e[n])) return !1;
    return !0;
  }
  function a(e, t) {
    for (; e.length < t.length; ) e.push('0');
    for (; t.length < e.length; ) t.push('0');
  }
  function o(e, t) {
    for (var n = 0; n < e.length; n++) {
      var i = parseInt(e[n], 10),
        r = parseInt(t[n], 10);
      if (i > r) return 1;
      if (r > i) return -1;
    }
    return 0;
  }
  function s(e, t) {
    if (e === t) return 0;
    var n = e.toString().split('.'),
      i = t.toString().split('.');
    return r(n.concat(i)) ? (a(n, i), o(n, i)) : NaN;
  }
  function l(e) {
    return e === Object(e) && 0 === Object.keys(e).length;
  }
  function c(e) {
    return 'function' == typeof e || (e instanceof Array && e.length);
  }
  function u() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '',
      t =
        arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : function () {
              return !0;
            };
    (this.log = _e('log', e, t)), (this.warn = _e('warn', e, t)), (this.error = _e('error', e, t));
  }
  function d() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      t = e.isEnabled,
      n = e.cookieName,
      i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      r = i.cookies;
    return t && n && r
      ? {
          remove: function () {
            r.remove(n);
          },
          get: function () {
            var e = r.get(n),
              t = {};
            try {
              t = JSON.parse(e);
            } catch (e) {
              t = {};
            }
            return t;
          },
          set: function (e, t) {
            (t = t || {}),
              r.set(n, JSON.stringify(e), {
                domain: t.optInCookieDomain || '',
                cookieLifetime: t.optInStorageExpiry || 3419e4,
                expires: !0,
              });
          },
        }
      : { get: Le, set: Le, remove: Le };
  }
  function f(e) {
    (this.name = this.constructor.name),
      (this.message = e),
      'function' == typeof Error.captureStackTrace
        ? Error.captureStackTrace(this, this.constructor)
        : (this.stack = new Error(e).stack);
  }
  function p() {
    function e(e, t) {
      var n = Se(e);
      return n.length
        ? n.every(function (e) {
            return !!t[e];
          })
        : De(t);
    }
    function t() {
      M(b),
        O(ce.COMPLETE),
        _(h.status, h.permissions),
        m.set(h.permissions, { optInCookieDomain: l, optInStorageExpiry: c }),
        C.execute(xe);
    }
    function n(e) {
      return function (n, i) {
        if (!Ae(n))
          throw new Error(
            '[OptIn] Invalid category(-ies). Please use the `OptIn.Categories` enum.',
          );
        return O(ce.CHANGED), Object.assign(b, ye(Se(n), e)), i || t(), h;
      };
    }
    var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      r = i.doesOptInApply,
      a = i.previousPermissions,
      o = i.preOptInApprovals,
      s = i.isOptInStorageEnabled,
      l = i.optInCookieDomain,
      c = i.optInStorageExpiry,
      u = i.isIabContext,
      f = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      p = f.cookies,
      g = Pe(a);
    Re(g, 'Invalid `previousPermissions`!'), Re(o, 'Invalid `preOptInApprovals`!');
    var m = d({ isEnabled: !!s, cookieName: 'adobeujs-optin' }, { cookies: p }),
      h = this,
      _ = le(h),
      C = ge(),
      I = Me(g),
      v = Me(o),
      S = m.get(),
      D = {},
      A = (function (e, t) {
        return ke(e) || (t && ke(t)) ? ce.COMPLETE : ce.PENDING;
      })(I, S),
      y = (function (e, t, n) {
        var i = ye(pe, !r);
        return r ? Object.assign({}, i, e, t, n) : i;
      })(v, I, S),
      b = be(y),
      O = function (e) {
        return (A = e);
      },
      M = function (e) {
        return (y = e);
      };
    (h.deny = n(!1)),
      (h.approve = n(!0)),
      (h.denyAll = h.deny.bind(h, pe)),
      (h.approveAll = h.approve.bind(h, pe)),
      (h.isApproved = function (t) {
        return e(t, h.permissions);
      }),
      (h.isPreApproved = function (t) {
        return e(t, v);
      }),
      (h.fetchPermissions = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
          n = t ? h.on(ce.COMPLETE, e) : Le;
        return (
          !r || (r && h.isComplete) || !!o
            ? e(h.permissions)
            : t ||
              C.add(xe, function () {
                return e(h.permissions);
              }),
          n
        );
      }),
      (h.complete = function () {
        h.status === ce.CHANGED && t();
      }),
      (h.registerPlugin = function (e) {
        if (!e || !e.name || 'function' != typeof e.onRegister) throw new Error(je);
        D[e.name] || ((D[e.name] = e), e.onRegister.call(e, h));
      }),
      (h.execute = Ne(D)),
      Object.defineProperties(h, {
        permissions: {
          get: function () {
            return y;
          },
        },
        status: {
          get: function () {
            return A;
          },
        },
        Categories: {
          get: function () {
            return ue;
          },
        },
        doesOptInApply: {
          get: function () {
            return !!r;
          },
        },
        isPending: {
          get: function () {
            return h.status === ce.PENDING;
          },
        },
        isComplete: {
          get: function () {
            return h.status === ce.COMPLETE;
          },
        },
        __plugins: {
          get: function () {
            return Object.keys(D);
          },
        },
        isIabContext: {
          get: function () {
            return u;
          },
        },
      });
  }
  function g(e, t) {
    function n() {
      (r = null), e.call(e, new f('The call took longer than you wanted!'));
    }
    function i() {
      r && (clearTimeout(r), e.apply(e, arguments));
    }
    if (void 0 === t) return e;
    var r = setTimeout(n, t);
    return i;
  }
  function m() {
    if (window.__cmp) return window.__cmp;
    var e = window;
    if (e === window.top) return void Ie.error('__cmp not found');
    for (var t; !t; ) {
      e = e.parent;
      try {
        e.frames.__cmpLocator && (t = e);
      } catch (e) {}
      if (e === window.top) break;
    }
    if (!t) return void Ie.error('__cmp not found');
    var n = {};
    return (
      (window.__cmp = function (e, i, r) {
        var a = Math.random() + '',
          o = { __cmpCall: { command: e, parameter: i, callId: a } };
        (n[a] = r), t.postMessage(o, '*');
      }),
      window.addEventListener(
        'message',
        function (e) {
          var t = e.data;
          if ('string' == typeof t)
            try {
              t = JSON.parse(e.data);
            } catch (e) {}
          if (t.__cmpReturn) {
            var i = t.__cmpReturn;
            n[i.callId] && (n[i.callId](i.returnValue, i.success), delete n[i.callId]);
          }
        },
        !1,
      ),
      window.__cmp
    );
  }
  function h() {
    var e = this;
    (e.name = 'iabPlugin'), (e.version = '0.0.1');
    var t = ge(),
      n = { allConsentData: null },
      i = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return (n[e] = t);
      };
    (e.fetchConsentData = function (e) {
      var t = e.callback,
        n = e.timeout,
        i = g(t, n);
      r({ callback: i });
    }),
      (e.isApproved = function (e) {
        var t = e.callback,
          i = e.category,
          a = e.timeout;
        if (n.allConsentData)
          return t(null, s(i, n.allConsentData.vendorConsents, n.allConsentData.purposeConsents));
        var o = g(function (e) {
          var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            r = n.vendorConsents,
            a = n.purposeConsents;
          t(e, s(i, r, a));
        }, a);
        r({ category: i, callback: o });
      }),
      (e.onRegister = function (t) {
        var n = Object.keys(de),
          i = function (e) {
            var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              r = i.purposeConsents,
              a = i.gdprApplies,
              o = i.vendorConsents;
            !e &&
              a &&
              o &&
              r &&
              (n.forEach(function (e) {
                var n = s(e, o, r);
                t[n ? 'approve' : 'deny'](e, !0);
              }),
              t.complete());
          };
        e.fetchConsentData({ callback: i });
      });
    var r = function (e) {
        var r = e.callback;
        if (n.allConsentData) return r(null, n.allConsentData);
        t.add('FETCH_CONSENT_DATA', r);
        var s = {};
        o(function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            r = e.purposeConsents,
            o = e.gdprApplies,
            l = e.vendorConsents;
          (arguments.length > 1 ? arguments[1] : void 0) &&
            ((s = { purposeConsents: r, gdprApplies: o, vendorConsents: l }),
            i('allConsentData', s)),
            a(function () {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              (arguments.length > 1 ? arguments[1] : void 0) &&
                ((s.consentString = e.consentData), i('allConsentData', s)),
                t.execute('FETCH_CONSENT_DATA', [null, n.allConsentData]);
            });
        });
      },
      a = function (e) {
        var t = m();
        t && t('getConsentData', null, e);
      },
      o = function (e) {
        var t = Fe(de),
          n = m();
        n && n('getVendorConsents', t, e);
      },
      s = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          i = !!t[de[e]];
        return (
          i &&
          (function () {
            return fe[e].every(function (e) {
              return n[e];
            });
          })()
        );
      };
  }
  var _ =
    'undefined' != typeof globalThis
      ? globalThis
      : 'undefined' != typeof window
      ? window
      : 'undefined' != typeof global
      ? global
      : 'undefined' != typeof self
      ? self
      : {};
  Object.assign =
    Object.assign ||
    function (e) {
      for (var t, n, i = 1; i < arguments.length; ++i) {
        n = arguments[i];
        for (t in n) Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]);
      }
      return e;
    };
  var C,
    I,
    v = { HANDSHAKE: 'HANDSHAKE', GETSTATE: 'GETSTATE', PARENTSTATE: 'PARENTSTATE' },
    S = {
      MCMID: 'MCMID',
      MCAID: 'MCAID',
      MCAAMB: 'MCAAMB',
      MCAAMLH: 'MCAAMLH',
      MCOPTOUT: 'MCOPTOUT',
      CUSTOMERIDS: 'CUSTOMERIDS',
    },
    D = {
      MCMID: 'getMarketingCloudVisitorID',
      MCAID: 'getAnalyticsVisitorID',
      MCAAMB: 'getAudienceManagerBlob',
      MCAAMLH: 'getAudienceManagerLocationHint',
      MCOPTOUT: 'isOptedOut',
      ALLFIELDS: 'getVisitorValues',
    },
    A = { CUSTOMERIDS: 'getCustomerIDs' },
    y = {
      MCMID: 'getMarketingCloudVisitorID',
      MCAAMB: 'getAudienceManagerBlob',
      MCAAMLH: 'getAudienceManagerLocationHint',
      MCOPTOUT: 'isOptedOut',
      MCAID: 'getAnalyticsVisitorID',
      CUSTOMERIDS: 'getCustomerIDs',
      ALLFIELDS: 'getVisitorValues',
    },
    b = { MC: 'MCMID', A: 'MCAID', AAM: 'MCAAMB' },
    O = {
      MCMID: 'MCMID',
      MCOPTOUT: 'MCOPTOUT',
      MCAID: 'MCAID',
      MCAAMLH: 'MCAAMLH',
      MCAAMB: 'MCAAMB',
    },
    M = { UNKNOWN: 0, AUTHENTICATED: 1, LOGGED_OUT: 2 },
    k = { GLOBAL: 'global' },
    E = {
      MESSAGES: v,
      STATE_KEYS_MAP: S,
      ASYNC_API_MAP: D,
      SYNC_API_MAP: A,
      ALL_APIS: y,
      FIELDGROUP_TO_FIELD: b,
      FIELDS: O,
      AUTH_STATE: M,
      OPT_OUT: k,
    },
    T = E.STATE_KEYS_MAP,
    L = function (e) {
      function t() {}
      function n(t, n) {
        var i = this;
        return function () {
          var r = e(0, t),
            a = {};
          return (a[t] = r), i.setStateAndPublish(a), n(r), r;
        };
      }
      (this.getMarketingCloudVisitorID = function (e) {
        e = e || t;
        var i = this.findField(T.MCMID, e),
          r = n.call(this, T.MCMID, e);
        return void 0 !== i ? i : r();
      }),
        (this.getVisitorValues = function (e) {
          this.getMarketingCloudVisitorID(function (t) {
            e({ MCMID: t });
          });
        });
    },
    P = E.MESSAGES,
    R = E.ASYNC_API_MAP,
    w = E.SYNC_API_MAP,
    F = function () {
      function e() {}
      function t(e, t) {
        var n = this;
        return function () {
          return n.callbackRegistry.add(e, t), n.messageParent(P.GETSTATE), '';
        };
      }
      function n(n) {
        this[R[n]] = function (i) {
          i = i || e;
          var r = this.findField(n, i),
            a = t.call(this, n, i);
          return void 0 !== r ? r : a();
        };
      }
      function i(t) {
        this[w[t]] = function () {
          return this.findField(t, e) || {};
        };
      }
      Object.keys(R).forEach(n, this), Object.keys(w).forEach(i, this);
    },
    N = E.ASYNC_API_MAP,
    x = function () {
      Object.keys(N).forEach(function (e) {
        this[N[e]] = function (t) {
          this.callbackRegistry.add(e, t);
        };
      }, this);
    },
    j = (function (e, t) {
      return (t = { exports: {} }), e(t, t.exports), t.exports;
    })(function (t, n) {
      (n.isObjectEmpty = function (e) {
        return e === Object(e) && 0 === Object.keys(e).length;
      }),
        (n.isValueEmpty = function (e) {
          return '' === e || n.isObjectEmpty(e);
        }),
        (n.getIeVersion = function () {
          if (document.documentMode) return document.documentMode;
          for (var e = 7; e > 4; e--) {
            var t = document.createElement('div');
            if (
              ((t.innerHTML = '\x3c!--[if IE ' + e + ']><span></span><![endif]--\x3e'),
              t.getElementsByTagName('span').length)
            )
              return (t = null), e;
            t = null;
          }
          return null;
        }),
        (n.encodeAndBuildRequest = function (e, t) {
          return e.map(encodeURIComponent).join(t);
        }),
        (n.isObject = function (t) {
          return null !== t && 'object' === e(t) && !1 === Array.isArray(t);
        }),
        (n.defineGlobalNamespace = function () {
          return (window.adobe = n.isObject(window.adobe) ? window.adobe : {}), window.adobe;
        }),
        (n.pluck = function (e, t) {
          return t.reduce(function (t, n) {
            return e[n] && (t[n] = e[n]), t;
          }, Object.create(null));
        }),
        (n.parseOptOut = function (e, t, n) {
          t || ((t = n), e.d_optout && e.d_optout instanceof Array && (t = e.d_optout.join(',')));
          var i = parseInt(e.d_ottl, 10);
          return isNaN(i) && (i = 7200), { optOut: t, d_ottl: i };
        }),
        (n.normalizeBoolean = function (e) {
          var t = e;
          return 'true' === e ? (t = !0) : 'false' === e && (t = !1), t;
        });
    }),
    V =
      (j.isObjectEmpty,
      j.isValueEmpty,
      j.getIeVersion,
      j.encodeAndBuildRequest,
      j.isObject,
      j.defineGlobalNamespace,
      j.pluck,
      j.parseOptOut,
      j.normalizeBoolean,
      n),
    H = E.MESSAGES,
    U = { 0: 'prefix', 1: 'orgID', 2: 'state' },
    B = function (e, t) {
      (this.parse = function (e) {
        try {
          var t = {};
          return (
            e.data.split('|').forEach(function (e, n) {
              if (void 0 !== e) {
                t[U[n]] = 2 !== n ? e : JSON.parse(e);
              }
            }),
            t
          );
        } catch (e) {}
      }),
        (this.isInvalid = function (n) {
          var i = this.parse(n);
          if (!i || Object.keys(i).length < 2) return !0;
          var r = e !== i.orgID,
            a = !t || n.origin !== t,
            o = -1 === Object.keys(H).indexOf(i.prefix);
          return r || a || o;
        }),
        (this.send = function (n, i, r) {
          var a = i + '|' + e;
          r && r === Object(r) && (a += '|' + JSON.stringify(r));
          try {
            n.postMessage(a, t);
          } catch (e) {}
        });
    },
    G = E.MESSAGES,
    Y = function (e, t, n, i) {
      function r(e) {
        Object.assign(p, e);
      }
      function a(e) {
        Object.assign(p.state, e),
          Object.assign(p.state.ALLFIELDS, e),
          p.callbackRegistry.executeAll(p.state);
      }
      function o(e) {
        if (!h.isInvalid(e)) {
          m = !1;
          var t = h.parse(e);
          p.setStateAndPublish(t.state);
        }
      }
      function s(e) {
        !m && g && ((m = !0), h.send(i, e));
      }
      function l() {
        r(new L(n._generateID)),
          p.getMarketingCloudVisitorID(),
          p.callbackRegistry.executeAll(p.state, !0),
          _.removeEventListener('message', c);
      }
      function c(e) {
        if (!h.isInvalid(e)) {
          var t = h.parse(e);
          (m = !1),
            _.clearTimeout(p._handshakeTimeout),
            _.removeEventListener('message', c),
            r(new F(p)),
            _.addEventListener('message', o),
            p.setStateAndPublish(t.state),
            p.callbackRegistry.hasCallbacks() && s(G.GETSTATE);
        }
      }
      function u() {
        g && postMessage
          ? (_.addEventListener('message', c),
            s(G.HANDSHAKE),
            (p._handshakeTimeout = setTimeout(l, 250)))
          : l();
      }
      function d() {
        _.s_c_in || ((_.s_c_il = []), (_.s_c_in = 0)),
          (p._c = 'Visitor'),
          (p._il = _.s_c_il),
          (p._in = _.s_c_in),
          (p._il[p._in] = p),
          _.s_c_in++;
      }
      function f() {
        function e(e) {
          0 !== e.indexOf('_') && 'function' == typeof n[e] && (p[e] = function () {});
        }
        Object.keys(n).forEach(e),
          (p.getSupplementalDataID = n.getSupplementalDataID),
          (p.isAllowed = function () {
            return !0;
          });
      }
      var p = this,
        g = t.whitelistParentDomain;
      (p.state = { ALLFIELDS: {} }),
        (p.version = n.version),
        (p.marketingCloudOrgID = e),
        (p.cookieDomain = n.cookieDomain || ''),
        (p._instanceType = 'child');
      var m = !1,
        h = new B(e, g);
      (p.callbackRegistry = V()),
        (p.init = function () {
          d(), f(), r(new x(p)), u();
        }),
        (p.findField = function (e, t) {
          if (void 0 !== p.state[e]) return t(p.state[e]), p.state[e];
        }),
        (p.messageParent = s),
        (p.setStateAndPublish = a);
    },
    q = E.MESSAGES,
    X = E.ALL_APIS,
    W = E.ASYNC_API_MAP,
    J = E.FIELDGROUP_TO_FIELD,
    K = function (e, t) {
      function n() {
        var t = {};
        return (
          Object.keys(X).forEach(function (n) {
            var i = X[n],
              r = e[i]();
            j.isValueEmpty(r) || (t[n] = r);
          }),
          t
        );
      }
      function i() {
        var t = [];
        return (
          e._loading &&
            Object.keys(e._loading).forEach(function (n) {
              if (e._loading[n]) {
                var i = J[n];
                t.push(i);
              }
            }),
          t.length ? t : null
        );
      }
      function r(t) {
        return function n(r) {
          var a = i();
          if (a) {
            var o = W[a[0]];
            e[o](n, !0);
          } else t();
        };
      }
      function a(e, i) {
        var r = n();
        t.send(e, i, r);
      }
      function o(e) {
        l(e), a(e, q.HANDSHAKE);
      }
      function s(e) {
        r(function () {
          a(e, q.PARENTSTATE);
        })();
      }
      function l(n) {
        function i(i) {
          r.call(e, i), t.send(n, q.PARENTSTATE, { CUSTOMERIDS: e.getCustomerIDs() });
        }
        var r = e.setCustomerIDs;
        e.setCustomerIDs = i;
      }
      return function (e) {
        if (!t.isInvalid(e)) {
          (t.parse(e).prefix === q.HANDSHAKE ? o : s)(e.source);
        }
      };
    },
    z = function (e, t) {
      function n(e) {
        return function (n) {
          (i[e] = n), r++, r === a && t(i);
        };
      }
      var i = {},
        r = 0,
        a = Object.keys(e).length;
      Object.keys(e).forEach(function (t) {
        var i = e[t];
        if (i.fn) {
          var r = i.args || [];
          r.unshift(n(t)), i.fn.apply(i.context || null, r);
        }
      });
    },
    Q = {
      get: function (e) {
        e = encodeURIComponent(e);
        var t = (';' + document.cookie).split(' ').join(';'),
          n = t.indexOf(';' + e + '='),
          i = n < 0 ? n : t.indexOf(';', n + 1);
        return n < 0 ? '' : decodeURIComponent(t.substring(n + 2 + e.length, i < 0 ? t.length : i));
      },
      set: function (e, t, n) {
        var r = i(n, 'cookieLifetime'),
          a = i(n, 'expires'),
          o = i(n, 'domain'),
          s = i(n, 'secure'),
          l = s ? 'Secure' : '';
        if (a && 'SESSION' !== r && 'NONE' !== r) {
          var c = '' !== t ? parseInt(r || 0, 10) : -60;
          if (c) (a = new Date()), a.setTime(a.getTime() + 1e3 * c);
          else if (1 === a) {
            a = new Date();
            var u = a.getYear();
            a.setYear(u + 2 + (u < 1900 ? 1900 : 0));
          }
        } else a = 0;
        return e && 'NONE' !== r
          ? ((document.cookie =
              encodeURIComponent(e) +
              '=' +
              encodeURIComponent(t) +
              '; path=/;' +
              (a ? ' expires=' + a.toGMTString() + ';' : '') +
              (o ? ' domain=' + o + ';' : '') +
              l),
            this.get(e) === t)
          : 0;
      },
      remove: function (e, t) {
        var n = i(t, 'domain');
        (n = n ? ' domain=' + n + ';' : ''),
          (document.cookie =
            encodeURIComponent(e) + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;' + n);
      },
    },
    $ = function (e) {
      var t;
      !e && _.location && (e = _.location.hostname), (t = e);
      var n,
        i = t.split('.');
      for (n = i.length - 2; n >= 0; n--)
        if (((t = i.slice(n).join('.')), Q.set('test', 'cookie', { domain: t })))
          return Q.remove('test', { domain: t }), t;
      return '';
    },
    Z = {
      compare: s,
      isLessThan: function (e, t) {
        return s(e, t) < 0;
      },
      areVersionsDifferent: function (e, t) {
        return 0 !== s(e, t);
      },
      isGreaterThan: function (e, t) {
        return s(e, t) > 0;
      },
      isEqual: function (e, t) {
        return 0 === s(e, t);
      },
    },
    ee = !!_.postMessage,
    te = {
      postMessage: function (e, t, n) {
        var i = 1;
        t &&
          (ee
            ? n.postMessage(e, t.replace(/([^:]+:\/\/[^\/]+).*/, '$1'))
            : t && (n.location = t.replace(/#.*$/, '') + '#' + +new Date() + i++ + '&' + e));
      },
      receiveMessage: function (e, t) {
        var n;
        try {
          ee &&
            (e &&
              (n = function (n) {
                if (
                  ('string' == typeof t && n.origin !== t) ||
                  ('[object Function]' === Object.prototype.toString.call(t) && !1 === t(n.origin))
                )
                  return !1;
                e(n);
              }),
            _.addEventListener
              ? _[e ? 'addEventListener' : 'removeEventListener']('message', n)
              : _[e ? 'attachEvent' : 'detachEvent']('onmessage', n));
        } catch (e) {}
      },
    },
    ne = function (e) {
      var t,
        n,
        i = '0123456789',
        r = '',
        a = '',
        o = 8,
        s = 10,
        l = 10;
      if (1 == e) {
        for (i += 'ABCDEF', t = 0; 16 > t; t++)
          (n = Math.floor(Math.random() * o)),
            (r += i.substring(n, n + 1)),
            (n = Math.floor(Math.random() * o)),
            (a += i.substring(n, n + 1)),
            (o = 16);
        return r + '-' + a;
      }
      for (t = 0; 19 > t; t++)
        (n = Math.floor(Math.random() * s)),
          (r += i.substring(n, n + 1)),
          0 === t && 9 == n
            ? (s = 3)
            : (1 == t || 2 == t) && 10 != s && 2 > n
            ? (s = 10)
            : 2 < t && (s = 10),
          (n = Math.floor(Math.random() * l)),
          (a += i.substring(n, n + 1)),
          0 === t && 9 == n
            ? (l = 3)
            : (1 == t || 2 == t) && 10 != l && 2 > n
            ? (l = 10)
            : 2 < t && (l = 10);
      return r + a;
    },
    ie = function (e, t) {
      return {
        corsMetadata: (function () {
          var e = 'none',
            t = !0;
          return (
            'undefined' != typeof XMLHttpRequest &&
              XMLHttpRequest === Object(XMLHttpRequest) &&
              ('withCredentials' in new XMLHttpRequest()
                ? (e = 'XMLHttpRequest')
                : 'undefined' != typeof XDomainRequest &&
                  XDomainRequest === Object(XDomainRequest) &&
                  (t = !1),
              Object.prototype.toString.call(_.HTMLElement).indexOf('Constructor') > 0 && (t = !1)),
            { corsType: e, corsCookiesEnabled: t }
          );
        })(),
        getCORSInstance: function () {
          return 'none' === this.corsMetadata.corsType ? null : new _[this.corsMetadata.corsType]();
        },
        fireCORS: function (t, n, i) {
          function r(e) {
            var n;
            try {
              if ((n = JSON.parse(e)) !== Object(n))
                return void a.handleCORSError(t, null, 'Response is not JSON');
            } catch (e) {
              return void a.handleCORSError(t, e, 'Error parsing response as JSON');
            }
            try {
              for (var i = t.callback, r = _, o = 0; o < i.length; o++) r = r[i[o]];
              r(n);
            } catch (e) {
              a.handleCORSError(t, e, 'Error forming callback function');
            }
          }
          var a = this;
          n && (t.loadErrorHandler = n);
          try {
            var o = this.getCORSInstance();
            o.open('get', t.corsUrl + '&ts=' + new Date().getTime(), !0),
              'XMLHttpRequest' === this.corsMetadata.corsType &&
                ((o.withCredentials = !0),
                (o.timeout = e.loadTimeout),
                o.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'),
                (o.onreadystatechange = function () {
                  4 === this.readyState && 200 === this.status && r(this.responseText);
                })),
              (o.onerror = function (e) {
                a.handleCORSError(t, e, 'onerror');
              }),
              (o.ontimeout = function (e) {
                a.handleCORSError(t, e, 'ontimeout');
              }),
              o.send(),
              e._log.requests.push(t.corsUrl);
          } catch (e) {
            this.handleCORSError(t, e, 'try-catch');
          }
        },
        handleCORSError: function (t, n, i) {
          e.CORSErrors.push({ corsData: t, error: n, description: i }),
            t.loadErrorHandler &&
              ('ontimeout' === i ? t.loadErrorHandler(!0) : t.loadErrorHandler(!1));
        },
      };
    },
    re = {
      POST_MESSAGE_ENABLED: !!_.postMessage,
      DAYS_BETWEEN_SYNC_ID_CALLS: 1,
      MILLIS_PER_DAY: 864e5,
      ADOBE_MC: 'adobe_mc',
      ADOBE_MC_SDID: 'adobe_mc_sdid',
      VALID_VISITOR_ID_REGEX: /^[0-9a-fA-F\-]+$/,
      ADOBE_MC_TTL_IN_MIN: 5,
      VERSION_REGEX: /vVersion\|((\d+\.)?(\d+\.)?(\*|\d+))(?=$|\|)/,
      FIRST_PARTY_SERVER_COOKIE: 's_ecid',
    },
    ae = function (e, t) {
      var n = _.document;
      return {
        THROTTLE_START: 3e4,
        MAX_SYNCS_LENGTH: 649,
        throttleTimerSet: !1,
        id: null,
        onPagePixels: [],
        iframeHost: null,
        getIframeHost: function (e) {
          if ('string' == typeof e) {
            var t = e.split('/');
            return t[0] + '//' + t[2];
          }
        },
        subdomain: null,
        url: null,
        getUrl: function () {
          var t,
            i = 'http://fast.',
            r = '?d_nsid=' + e.idSyncContainerID + '#' + encodeURIComponent(n.location.origin);
          return (
            this.subdomain || (this.subdomain = 'nosubdomainreturned'),
            e.loadSSL && (i = e.idSyncSSLUseAkamai ? 'https://fast.' : 'https://'),
            (t = i + this.subdomain + '.demdex.net/dest5.html' + r),
            (this.iframeHost = this.getIframeHost(t)),
            (this.id =
              'destination_publishing_iframe_' + this.subdomain + '_' + e.idSyncContainerID),
            t
          );
        },
        checkDPIframeSrc: function () {
          var t = '?d_nsid=' + e.idSyncContainerID + '#' + encodeURIComponent(n.location.href);
          'string' == typeof e.dpIframeSrc &&
            e.dpIframeSrc.length &&
            ((this.id =
              'destination_publishing_iframe_' +
              (e._subdomain || this.subdomain || new Date().getTime()) +
              '_' +
              e.idSyncContainerID),
            (this.iframeHost = this.getIframeHost(e.dpIframeSrc)),
            (this.url = e.dpIframeSrc + t));
        },
        idCallNotProcesssed: null,
        doAttachIframe: !1,
        startedAttachingIframe: !1,
        iframeHasLoaded: null,
        iframeIdChanged: null,
        newIframeCreated: null,
        originalIframeHasLoadedAlready: null,
        iframeLoadedCallbacks: [],
        regionChanged: !1,
        timesRegionChanged: 0,
        sendingMessages: !1,
        messages: [],
        messagesPosted: [],
        messagesReceived: [],
        messageSendingInterval: re.POST_MESSAGE_ENABLED ? null : 100,
        onPageDestinationsFired: [],
        jsonForComparison: [],
        jsonDuplicates: [],
        jsonWaiting: [],
        jsonProcessed: [],
        canSetThirdPartyCookies: !0,
        receivedThirdPartyCookiesNotification: !1,
        readyToAttachIframePreliminary: function () {
          return !(
            e.idSyncDisableSyncs ||
            e.disableIdSyncs ||
            e.idSyncDisable3rdPartySyncing ||
            e.disableThirdPartyCookies ||
            e.disableThirdPartyCalls
          );
        },
        readyToAttachIframe: function () {
          return (
            this.readyToAttachIframePreliminary() &&
            (this.doAttachIframe || e._doAttachIframe) &&
            ((this.subdomain && 'nosubdomainreturned' !== this.subdomain) || e._subdomain) &&
            this.url &&
            !this.startedAttachingIframe
          );
        },
        attachIframe: function () {
          function e() {
            (r = n.createElement('iframe')),
              (r.sandbox = 'allow-scripts allow-same-origin'),
              (r.title = 'Adobe ID Syncing iFrame'),
              (r.id = i.id),
              (r.name = i.id + '_name'),
              (r.style.cssText = 'display: none; width: 0; height: 0;'),
              (r.src = i.url),
              (i.newIframeCreated = !0),
              t(),
              n.body.appendChild(r);
          }
          function t(e) {
            r.addEventListener('load', function () {
              (r.className = 'aamIframeLoaded'),
                (i.iframeHasLoaded = !0),
                i.fireIframeLoadedCallbacks(e),
                i.requestToProcess();
            });
          }
          this.startedAttachingIframe = !0;
          var i = this,
            r = n.getElementById(this.id);
          r
            ? 'IFRAME' !== r.nodeName
              ? ((this.id += '_2'), (this.iframeIdChanged = !0), e())
              : ((this.newIframeCreated = !1),
                'aamIframeLoaded' !== r.className
                  ? ((this.originalIframeHasLoadedAlready = !1),
                    t(
                      "The destination publishing iframe already exists from a different library, but hadn't loaded yet.",
                    ))
                  : ((this.originalIframeHasLoadedAlready = !0),
                    (this.iframeHasLoaded = !0),
                    (this.iframe = r),
                    this.fireIframeLoadedCallbacks(
                      'The destination publishing iframe already exists from a different library, and had loaded alresady.',
                    ),
                    this.requestToProcess()))
            : e(),
            (this.iframe = r);
        },
        fireIframeLoadedCallbacks: function (e) {
          this.iframeLoadedCallbacks.forEach(function (t) {
            'function' == typeof t &&
              t({
                message:
                  e || 'The destination publishing iframe was attached and loaded successfully.',
              });
          }),
            (this.iframeLoadedCallbacks = []);
        },
        requestToProcess: function (t) {
          function n() {
            r.jsonForComparison.push(t), r.jsonWaiting.push(t), r.processSyncOnPage(t);
          }
          var i,
            r = this;
          if (t === Object(t) && t.ibs)
            if (((i = JSON.stringify(t.ibs || [])), this.jsonForComparison.length)) {
              var a,
                o,
                s,
                l = !1;
              for (a = 0, o = this.jsonForComparison.length; a < o; a++)
                if (((s = this.jsonForComparison[a]), i === JSON.stringify(s.ibs || []))) {
                  l = !0;
                  break;
                }
              l ? this.jsonDuplicates.push(t) : n();
            } else n();
          if (
            (this.receivedThirdPartyCookiesNotification ||
              !re.POST_MESSAGE_ENABLED ||
              this.iframeHasLoaded) &&
            this.jsonWaiting.length
          ) {
            var c = this.jsonWaiting.shift();
            this.process(c), this.requestToProcess();
          }
          e.idSyncDisableSyncs ||
            e.disableIdSyncs ||
            !this.iframeHasLoaded ||
            !this.messages.length ||
            this.sendingMessages ||
            (this.throttleTimerSet ||
              ((this.throttleTimerSet = !0),
              setTimeout(function () {
                r.messageSendingInterval = re.POST_MESSAGE_ENABLED ? null : 150;
              }, this.THROTTLE_START)),
            (this.sendingMessages = !0),
            this.sendMessages());
        },
        getRegionAndCheckIfChanged: function (t, n) {
          var i = e._getField('MCAAMLH'),
            r = t.d_region || t.dcs_region;
          return (
            i
              ? r &&
                (e._setFieldExpire('MCAAMLH', n),
                e._setField('MCAAMLH', r),
                parseInt(i, 10) !== r &&
                  ((this.regionChanged = !0),
                  this.timesRegionChanged++,
                  e._setField('MCSYNCSOP', ''),
                  e._setField('MCSYNCS', ''),
                  (i = r)))
              : (i = r) && (e._setFieldExpire('MCAAMLH', n), e._setField('MCAAMLH', i)),
            i || (i = ''),
            i
          );
        },
        processSyncOnPage: function (e) {
          var t, n, i, r;
          if ((t = e.ibs) && t instanceof Array && (n = t.length))
            for (i = 0; i < n; i++)
              (r = t[i]), r.syncOnPage && this.checkFirstPartyCookie(r, '', 'syncOnPage');
        },
        process: function (e) {
          var t,
            n,
            i,
            r,
            a,
            o = encodeURIComponent,
            s = !1;
          if ((t = e.ibs) && t instanceof Array && (n = t.length))
            for (s = !0, i = 0; i < n; i++)
              (r = t[i]),
                (a = [
                  o('ibs'),
                  o(r.id || ''),
                  o(r.tag || ''),
                  j.encodeAndBuildRequest(r.url || [], ','),
                  o(r.ttl || ''),
                  '',
                  '',
                  r.fireURLSync ? 'true' : 'false',
                ]),
                r.syncOnPage ||
                  (this.canSetThirdPartyCookies
                    ? this.addMessage(a.join('|'))
                    : r.fireURLSync && this.checkFirstPartyCookie(r, a.join('|')));
          s && this.jsonProcessed.push(e);
        },
        checkFirstPartyCookie: function (t, n, i) {
          var r = 'syncOnPage' === i,
            a = r ? 'MCSYNCSOP' : 'MCSYNCS';
          e._readVisitor();
          var o,
            s,
            l = e._getField(a),
            c = !1,
            u = !1,
            d = Math.ceil(new Date().getTime() / re.MILLIS_PER_DAY);
          l
            ? ((o = l.split('*')),
              (s = this.pruneSyncData(o, t.id, d)),
              (c = s.dataPresent),
              (u = s.dataValid),
              (c && u) || this.fireSync(r, t, n, o, a, d))
            : ((o = []), this.fireSync(r, t, n, o, a, d));
        },
        pruneSyncData: function (e, t, n) {
          var i,
            r,
            a,
            o = !1,
            s = !1;
          for (r = 0; r < e.length; r++)
            (i = e[r]),
              (a = parseInt(i.split('-')[1], 10)),
              i.match('^' + t + '-')
                ? ((o = !0), n < a ? (s = !0) : (e.splice(r, 1), r--))
                : n >= a && (e.splice(r, 1), r--);
          return { dataPresent: o, dataValid: s };
        },
        manageSyncsSize: function (e) {
          if (e.join('*').length > this.MAX_SYNCS_LENGTH)
            for (
              e.sort(function (e, t) {
                return parseInt(e.split('-')[1], 10) - parseInt(t.split('-')[1], 10);
              });
              e.join('*').length > this.MAX_SYNCS_LENGTH;

            )
              e.shift();
        },
        fireSync: function (t, n, i, r, a, o) {
          var s = this;
          if (t) {
            if ('img' === n.tag) {
              var l,
                c,
                u,
                d,
                f = n.url,
                p = e.loadSSL ? 'https:' : 'http:';
              for (l = 0, c = f.length; l < c; l++) {
                (u = f[l]), (d = /^\/\//.test(u));
                var g = new Image();
                g.addEventListener(
                  'load',
                  (function (t, n, i, r) {
                    return function () {
                      (s.onPagePixels[t] = null), e._readVisitor();
                      var o,
                        l = e._getField(a),
                        c = [];
                      if (l) {
                        o = l.split('*');
                        var u, d, f;
                        for (u = 0, d = o.length; u < d; u++)
                          (f = o[u]), f.match('^' + n.id + '-') || c.push(f);
                      }
                      s.setSyncTrackingData(c, n, i, r);
                    };
                  })(this.onPagePixels.length, n, a, o),
                ),
                  (g.src = (d ? p : '') + u),
                  this.onPagePixels.push(g);
              }
            }
          } else this.addMessage(i), this.setSyncTrackingData(r, n, a, o);
        },
        addMessage: function (t) {
          var n = encodeURIComponent,
            i = n(e._enableErrorReporting ? '---destpub-debug---' : '---destpub---');
          this.messages.push((re.POST_MESSAGE_ENABLED ? '' : i) + t);
        },
        setSyncTrackingData: function (t, n, i, r) {
          t.push(n.id + '-' + (r + Math.ceil(n.ttl / 60 / 24))),
            this.manageSyncsSize(t),
            e._setField(i, t.join('*'));
        },
        sendMessages: function () {
          var e,
            t = this,
            n = '',
            i = encodeURIComponent;
          this.regionChanged && ((n = i('---destpub-clear-dextp---')), (this.regionChanged = !1)),
            this.messages.length
              ? re.POST_MESSAGE_ENABLED
                ? ((e = n + i('---destpub-combined---') + this.messages.join('%01')),
                  this.postMessage(e),
                  (this.messages = []),
                  (this.sendingMessages = !1))
                : ((e = this.messages.shift()),
                  this.postMessage(n + e),
                  setTimeout(function () {
                    t.sendMessages();
                  }, this.messageSendingInterval))
              : (this.sendingMessages = !1);
        },
        postMessage: function (e) {
          te.postMessage(e, this.url, this.iframe.contentWindow), this.messagesPosted.push(e);
        },
        receiveMessage: function (e) {
          var t,
            n = /^---destpub-to-parent---/;
          'string' == typeof e &&
            n.test(e) &&
            ((t = e.replace(n, '').split('|')),
            'canSetThirdPartyCookies' === t[0] &&
              ((this.canSetThirdPartyCookies = 'true' === t[1]),
              (this.receivedThirdPartyCookiesNotification = !0),
              this.requestToProcess()),
            this.messagesReceived.push(e));
        },
        processIDCallData: function (i) {
          (null == this.url || (i.subdomain && 'nosubdomainreturned' === this.subdomain)) &&
            ('string' == typeof e._subdomain && e._subdomain.length
              ? (this.subdomain = e._subdomain)
              : (this.subdomain = i.subdomain || ''),
            (this.url = this.getUrl())),
            i.ibs instanceof Array && i.ibs.length && (this.doAttachIframe = !0),
            this.readyToAttachIframe() &&
              (e.idSyncAttachIframeOnWindowLoad
                ? (t.windowLoaded || 'complete' === n.readyState || 'loaded' === n.readyState) &&
                  this.attachIframe()
                : this.attachIframeASAP()),
            'function' == typeof e.idSyncIDCallResult
              ? e.idSyncIDCallResult(i)
              : this.requestToProcess(i),
            'function' == typeof e.idSyncAfterIDCallResult && e.idSyncAfterIDCallResult(i);
        },
        canMakeSyncIDCall: function (t, n) {
          return e._forceSyncIDCall || !t || n - t > re.DAYS_BETWEEN_SYNC_ID_CALLS;
        },
        attachIframeASAP: function () {
          function e() {
            t.startedAttachingIframe || (n.body ? t.attachIframe() : setTimeout(e, 30));
          }
          var t = this;
          e();
        },
      };
    },
    oe = {
      audienceManagerServer: {},
      audienceManagerServerSecure: {},
      cookieDomain: {},
      cookieLifetime: {},
      cookieName: {},
      doesOptInApply: {},
      disableThirdPartyCalls: {},
      discardTrackingServerECID: {},
      idSyncAfterIDCallResult: {},
      idSyncAttachIframeOnWindowLoad: {},
      idSyncContainerID: {},
      idSyncDisable3rdPartySyncing: {},
      disableThirdPartyCookies: {},
      idSyncDisableSyncs: {},
      disableIdSyncs: {},
      idSyncIDCallResult: {},
      idSyncSSLUseAkamai: {},
      isCoopSafe: {},
      isIabContext: {},
      isOptInStorageEnabled: {},
      loadSSL: {},
      loadTimeout: {},
      marketingCloudServer: {},
      marketingCloudServerSecure: {},
      optInCookieDomain: {},
      optInStorageExpiry: {},
      overwriteCrossDomainMCIDAndAID: {},
      preOptInApprovals: {},
      previousPermissions: {},
      resetBeforeVersion: {},
      sdidParamExpiry: {},
      serverState: {},
      sessionCookieName: {},
      secureCookie: {},
      takeTimeoutMetrics: {},
      trackingServer: {},
      trackingServerSecure: {},
      whitelistIframeDomains: {},
      whitelistParentDomain: {},
    },
    se = {
      getConfigNames: function () {
        return Object.keys(oe);
      },
      getConfigs: function () {
        return oe;
      },
      normalizeConfig: function (e) {
        return 'function' != typeof e ? e : e();
      },
    },
    le = function (e) {
      var t = {};
      return (
        (e.on = function (e, n, i) {
          if (!n || 'function' != typeof n) throw new Error('[ON] Callback should be a function.');
          t.hasOwnProperty(e) || (t[e] = []);
          var r = t[e].push({ callback: n, context: i }) - 1;
          return function () {
            t[e].splice(r, 1), t[e].length || delete t[e];
          };
        }),
        (e.off = function (e, n) {
          t.hasOwnProperty(e) &&
            (t[e] = t[e].filter(function (e) {
              if (e.callback !== n) return e;
            }));
        }),
        (e.publish = function (e) {
          if (t.hasOwnProperty(e)) {
            var n = [].slice.call(arguments, 1);
            t[e].slice(0).forEach(function (e) {
              e.callback.apply(e.context, n);
            });
          }
        }),
        e.publish
      );
    },
    ce = { PENDING: 'pending', CHANGED: 'changed', COMPLETE: 'complete' },
    ue = {
      AAM: 'aam',
      ADCLOUD: 'adcloud',
      ANALYTICS: 'aa',
      CAMPAIGN: 'campaign',
      ECID: 'ecid',
      LIVEFYRE: 'livefyre',
      TARGET: 'target',
      VIDEO_ANALYTICS: 'videoaa',
    },
    de = ((C = {}), t(C, ue.AAM, 565), t(C, ue.ECID, 565), C),
    fe = ((I = {}), t(I, ue.AAM, [1, 2, 5]), t(I, ue.ECID, [1, 2, 5]), I),
    pe = (function (e) {
      return Object.keys(e).map(function (t) {
        return e[t];
      });
    })(ue),
    ge = function () {
      var e = {};
      return (
        (e.callbacks = Object.create(null)),
        (e.add = function (t, n) {
          if (!c(n))
            throw new Error(
              '[callbackRegistryFactory] Make sure callback is a function or an array of functions.',
            );
          e.callbacks[t] = e.callbacks[t] || [];
          var i = e.callbacks[t].push(n) - 1;
          return function () {
            e.callbacks[t].splice(i, 1);
          };
        }),
        (e.execute = function (t, n) {
          if (e.callbacks[t]) {
            (n = void 0 === n ? [] : n), (n = n instanceof Array ? n : [n]);
            try {
              for (; e.callbacks[t].length; ) {
                var i = e.callbacks[t].shift();
                'function' == typeof i
                  ? i.apply(null, n)
                  : i instanceof Array && i[1].apply(i[0], n);
              }
              delete e.callbacks[t];
            } catch (e) {}
          }
        }),
        (e.executeAll = function (t, n) {
          (n || (t && !l(t))) &&
            Object.keys(e.callbacks).forEach(function (n) {
              var i = void 0 !== t[n] ? t[n] : '';
              e.execute(n, i);
            }, e);
        }),
        (e.hasCallbacks = function () {
          return Boolean(Object.keys(e.callbacks).length);
        }),
        e
      );
    },
    me = function () {},
    he = function (e) {
      var t = window,
        n = t.console;
      return !!n && 'function' == typeof n[e];
    },
    _e = function (e, t, n) {
      return n()
        ? function () {
            if (he(e)) {
              for (var n = arguments.length, i = new Array(n), r = 0; r < n; r++)
                i[r] = arguments[r];
              console[e].apply(console, [t].concat(i));
            }
          }
        : me;
    },
    Ce = u,
    Ie = new Ce('[ADOBE OPT-IN]'),
    ve = function (t, n) {
      return e(t) === n;
    },
    Se = function (e, t) {
      return e instanceof Array ? e : ve(e, 'string') ? [e] : t || [];
    },
    De = function (e) {
      var t = Object.keys(e);
      return (
        !!t.length &&
        t.every(function (t) {
          return !0 === e[t];
        })
      );
    },
    Ae = function (e) {
      return (
        !(!e || Oe(e)) &&
        Se(e).every(function (e) {
          return pe.indexOf(e) > -1;
        })
      );
    },
    ye = function (e, t) {
      return e.reduce(function (e, n) {
        return (e[n] = t), e;
      }, {});
    },
    be = function (e) {
      return JSON.parse(JSON.stringify(e));
    },
    Oe = function (e) {
      return '[object Array]' === Object.prototype.toString.call(e) && !e.length;
    },
    Me = function (e) {
      if (Te(e)) return e;
      try {
        return JSON.parse(e);
      } catch (e) {
        return {};
      }
    },
    ke = function (e) {
      return void 0 === e || (Te(e) ? Ae(Object.keys(e)) : Ee(e));
    },
    Ee = function (e) {
      try {
        var t = JSON.parse(e);
        return !!e && ve(e, 'string') && Ae(Object.keys(t));
      } catch (e) {
        return !1;
      }
    },
    Te = function (e) {
      return null !== e && ve(e, 'object') && !1 === Array.isArray(e);
    },
    Le = function () {},
    Pe = function (e) {
      return ve(e, 'function') ? e() : e;
    },
    Re = function (e, t) {
      ke(e) || Ie.error(''.concat(t));
    },
    we = function (e) {
      return Object.keys(e).map(function (t) {
        return e[t];
      });
    },
    Fe = function (e) {
      return we(e).filter(function (e, t, n) {
        return n.indexOf(e) === t;
      });
    },
    Ne = function (e) {
      return function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          n = t.command,
          i = t.params,
          r = void 0 === i ? {} : i,
          a = t.callback,
          o = void 0 === a ? Le : a;
        if (!n || -1 === n.indexOf('.'))
          throw new Error('[OptIn.execute] Please provide a valid command.');
        try {
          var s = n.split('.'),
            l = e[s[0]],
            c = s[1];
          if (!l || 'function' != typeof l[c])
            throw new Error('Make sure the plugin and API name exist.');
          var u = Object.assign(r, { callback: o });
          l[c].call(l, u);
        } catch (e) {
          Ie.error('[execute] Something went wrong: ' + e.message);
        }
      };
    };
  (f.prototype = Object.create(Error.prototype)), (f.prototype.constructor = f);
  var xe = 'fetchPermissions',
    je = '[OptIn#registerPlugin] Plugin is invalid.';
  (p.Categories = ue), (p.TimeoutError = f);
  var Ve = Object.freeze({ OptIn: p, IabPlugin: h }),
    He = function (e, t) {
      e.publishDestinations = function (n) {
        var i = arguments[1],
          r = arguments[2];
        try {
          r = 'function' == typeof r ? r : n.callback;
        } catch (e) {
          r = function () {};
        }
        var a = t;
        if (!a.readyToAttachIframePreliminary())
          return void r({
            error: 'The destination publishing iframe is disabled in the Visitor library.',
          });
        if ('string' == typeof n) {
          if (!n.length) return void r({ error: 'subdomain is not a populated string.' });
          if (!(i instanceof Array && i.length))
            return void r({ error: 'messages is not a populated array.' });
          var o = !1;
          if (
            (i.forEach(function (e) {
              'string' == typeof e && e.length && (a.addMessage(e), (o = !0));
            }),
            !o)
          )
            return void r({ error: 'None of the messages are populated strings.' });
        } else {
          if (!j.isObject(n)) return void r({ error: 'Invalid parameters passed.' });
          var s = n;
          if ('string' != typeof (n = s.subdomain) || !n.length)
            return void r({ error: 'config.subdomain is not a populated string.' });
          var l = s.urlDestinations;
          if (!(l instanceof Array && l.length))
            return void r({ error: 'config.urlDestinations is not a populated array.' });
          var c = [];
          l.forEach(function (e) {
            j.isObject(e) && (e.hideReferrer ? e.message && a.addMessage(e.message) : c.push(e));
          });
          !(function e() {
            c.length &&
              setTimeout(function () {
                var t = new Image(),
                  n = c.shift();
                (t.src = n.url), a.onPageDestinationsFired.push(n), e();
              }, 100);
          })();
        }
        a.iframe
          ? (r({ message: 'The destination publishing iframe is already attached and loaded.' }),
            a.requestToProcess())
          : !e.subdomain && e._getField('MCMID')
          ? ((a.subdomain = n),
            (a.doAttachIframe = !0),
            (a.url = a.getUrl()),
            a.readyToAttachIframe()
              ? (a.iframeLoadedCallbacks.push(function (e) {
                  r({
                    message:
                      'Attempted to attach and load the destination publishing iframe through this API call. Result: ' +
                      (e.message || 'no result'),
                  });
                }),
                a.attachIframe())
              : r({
                  error:
                    'Encountered a problem in attempting to attach and load the destination publishing iframe through this API call.',
                }))
          : a.iframeLoadedCallbacks.push(function (e) {
              r({
                message:
                  'Attempted to attach and load the destination publishing iframe through normal Visitor API processing. Result: ' +
                  (e.message || 'no result'),
              });
            });
      };
    },
    Ue = function e(t) {
      function n(e, t) {
        return (e >>> t) | (e << (32 - t));
      }
      for (
        var i,
          r,
          a = Math.pow,
          o = a(2, 32),
          s = '',
          l = [],
          c = 8 * t.length,
          u = (e.h = e.h || []),
          d = (e.k = e.k || []),
          f = d.length,
          p = {},
          g = 2;
        f < 64;
        g++
      )
        if (!p[g]) {
          for (i = 0; i < 313; i += g) p[i] = g;
          (u[f] = (a(g, 0.5) * o) | 0), (d[f++] = (a(g, 1 / 3) * o) | 0);
        }
      for (t += 'Ã‚â‚¬'; (t.length % 64) - 56; ) t += '\0';
      for (i = 0; i < t.length; i++) {
        if ((r = t.charCodeAt(i)) >> 8) return;
        l[i >> 2] |= r << (((3 - i) % 4) * 8);
      }
      for (l[l.length] = (c / o) | 0, l[l.length] = c, r = 0; r < l.length; ) {
        var m = l.slice(r, (r += 16)),
          h = u;
        for (u = u.slice(0, 8), i = 0; i < 64; i++) {
          var _ = m[i - 15],
            C = m[i - 2],
            I = u[0],
            v = u[4],
            S =
              u[7] +
              (n(v, 6) ^ n(v, 11) ^ n(v, 25)) +
              ((v & u[5]) ^ (~v & u[6])) +
              d[i] +
              (m[i] =
                i < 16
                  ? m[i]
                  : (m[i - 16] +
                      (n(_, 7) ^ n(_, 18) ^ (_ >>> 3)) +
                      m[i - 7] +
                      (n(C, 17) ^ n(C, 19) ^ (C >>> 10))) |
                    0);
          (u = [
            (S + ((n(I, 2) ^ n(I, 13) ^ n(I, 22)) + ((I & u[1]) ^ (I & u[2]) ^ (u[1] & u[2])))) | 0,
          ].concat(u)),
            (u[4] = (u[4] + S) | 0);
        }
        for (i = 0; i < 8; i++) u[i] = (u[i] + h[i]) | 0;
      }
      for (i = 0; i < 8; i++)
        for (r = 3; r + 1; r--) {
          var D = (u[i] >> (8 * r)) & 255;
          s += (D < 16 ? 0 : '') + D.toString(16);
        }
      return s;
    },
    Be = function (e, t) {
      return (
        ('SHA-256' !== t && 'SHA256' !== t && 'sha256' !== t && 'sha-256' !== t) || (e = Ue(e)), e
      );
    },
    Ge = function (e) {
      return String(e).trim().toLowerCase();
    },
    Ye = Ve.OptIn;
  j.defineGlobalNamespace(), (window.adobe.OptInCategories = Ye.Categories);
  var qe = function (t, n, i) {
    function r(e) {
      var t = e;
      return function (e) {
        var n = e || v.location.href;
        try {
          var i = g._extractParamFromUri(n, t);
          if (i) return w.parsePipeDelimetedKeyValues(i);
        } catch (e) {}
      };
    }
    function a(e) {
      function t(e, t, n) {
        e && e.match(re.VALID_VISITOR_ID_REGEX) && (n === A && (I = !0), t(e));
      }
      t(e[A], g.setMarketingCloudVisitorID, A),
        g._setFieldExpire(k, -1),
        t(e[O], g.setAnalyticsVisitorID);
    }
    function o(e) {
      (e = e || {}),
        (g._supplementalDataIDCurrent = e.supplementalDataIDCurrent || ''),
        (g._supplementalDataIDCurrentConsumed = e.supplementalDataIDCurrentConsumed || {}),
        (g._supplementalDataIDLast = e.supplementalDataIDLast || ''),
        (g._supplementalDataIDLastConsumed = e.supplementalDataIDLastConsumed || {});
    }
    function s(e) {
      function t(e, t, n) {
        return (n = n ? (n += '|') : n), (n += e + '=' + encodeURIComponent(t));
      }
      function n(e, n) {
        var i = n[0],
          r = n[1];
        return null != r && r !== T && (e = t(i, r, e)), e;
      }
      var i = e.reduce(n, '');
      return (function (e) {
        var t = w.getTimestampInSeconds();
        return (e = e ? (e += '|') : e), (e += 'TS=' + t);
      })(i);
    }
    function l(e) {
      var t = e.minutesToLive,
        n = '';
      return (
        (g.idSyncDisableSyncs || g.disableIdSyncs) &&
          (n = n || 'Error: id syncs have been disabled'),
        ('string' == typeof e.dpid && e.dpid.length) || (n = n || 'Error: config.dpid is empty'),
        ('string' == typeof e.url && e.url.length) || (n = n || 'Error: config.url is empty'),
        void 0 === t
          ? (t = 20160)
          : ((t = parseInt(t, 10)),
            (isNaN(t) || t <= 0) &&
              (n = n || 'Error: config.minutesToLive needs to be a positive number')),
        { error: n, ttl: t }
      );
    }
    function c() {
      return !!g.configs.doesOptInApply && !(m.optIn.isComplete && u());
    }
    function u() {
      return g.configs.isIabContext
        ? m.optIn.isApproved(m.optIn.Categories.ECID) && C
        : m.optIn.isApproved(m.optIn.Categories.ECID);
    }
    function d(e, t) {
      if (((C = !0), e)) throw new Error('[IAB plugin] : ' + e);
      t.gdprApplies && (h = t.consentString), g.init(), p();
    }
    function f() {
      m.optIn.isApproved(m.optIn.Categories.ECID) &&
        (g.configs.isIabContext
          ? m.optIn.execute({ command: 'iabPlugin.fetchConsentData', callback: d })
          : (g.init(), p()));
    }
    function p() {
      m.optIn.off('complete', f);
    }
    if (!i || i.split('').reverse().join('') !== t)
      throw new Error('Please use `Visitor.getInstance` to instantiate Visitor.');
    var g = this,
      m = window.adobe,
      h = '',
      C = !1,
      I = !1;
    g.version = '4.4.0';
    var v = _,
      S = v.Visitor;
    (S.version = g.version),
      (S.AuthState = E.AUTH_STATE),
      (S.OptOut = E.OPT_OUT),
      v.s_c_in || ((v.s_c_il = []), (v.s_c_in = 0)),
      (g._c = 'Visitor'),
      (g._il = v.s_c_il),
      (g._in = v.s_c_in),
      (g._il[g._in] = g),
      v.s_c_in++,
      (g._instanceType = 'regular'),
      (g._log = { requests: [] }),
      (g.marketingCloudOrgID = t),
      (g.cookieName = 'AMCV_' + t),
      (g.sessionCookieName = 'AMCVS_' + t),
      (g.cookieDomain = $()),
      (g.loadSSL = v.location.protocol.toLowerCase().indexOf('https') >= 0),
      (g.loadTimeout = 3e4),
      (g.CORSErrors = []),
      (g.marketingCloudServer = g.audienceManagerServer = 'dpm.demdex.net'),
      (g.sdidParamExpiry = 30);
    var D = null,
      A = 'MCMID',
      y = 'MCIDTS',
      b = 'A',
      O = 'MCAID',
      M = 'AAM',
      k = 'MCAAMB',
      T = 'NONE',
      L = function (e) {
        return !Object.prototype[e];
      },
      P = ie(g);
    (g.FIELDS = E.FIELDS),
      (g.cookieRead = function (e) {
        return Q.get(e);
      }),
      (g.cookieWrite = function (e, t, n) {
        var i = g.cookieLifetime ? ('' + g.cookieLifetime).toUpperCase() : '',
          r = !1;
        return (
          g.configs && g.configs.secureCookie && 'https:' === location.protocol && (r = !0),
          Q.set(e, '' + t, { expires: n, domain: g.cookieDomain, cookieLifetime: i, secure: r })
        );
      }),
      (g.resetState = function (e) {
        e ? g._mergeServerState(e) : o();
      }),
      (g._isAllowedDone = !1),
      (g._isAllowedFlag = !1),
      (g.isAllowed = function () {
        return (
          g._isAllowedDone ||
            ((g._isAllowedDone = !0),
            (g.cookieRead(g.cookieName) || g.cookieWrite(g.cookieName, 'T', 1)) &&
              (g._isAllowedFlag = !0)),
          'T' === g.cookieRead(g.cookieName) && g._helpers.removeCookie(g.cookieName),
          g._isAllowedFlag
        );
      }),
      (g.setMarketingCloudVisitorID = function (e) {
        g._setMarketingCloudFields(e);
      }),
      (g._use1stPartyMarketingCloudServer = !1),
      (g.getMarketingCloudVisitorID = function (e, t) {
        g.marketingCloudServer &&
          g.marketingCloudServer.indexOf('.demdex.net') < 0 &&
          (g._use1stPartyMarketingCloudServer = !0);
        var n = g._getAudienceManagerURLData('_setMarketingCloudFields'),
          i = n.url;
        return g._getRemoteField(A, i, e, t, n);
      }),
      (g.getVisitorValues = function (e, t) {
        var n = {
            MCMID: { fn: g.getMarketingCloudVisitorID, args: [!0], context: g },
            MCOPTOUT: { fn: g.isOptedOut, args: [void 0, !0], context: g },
            MCAID: { fn: g.getAnalyticsVisitorID, args: [!0], context: g },
            MCAAMLH: { fn: g.getAudienceManagerLocationHint, args: [!0], context: g },
            MCAAMB: { fn: g.getAudienceManagerBlob, args: [!0], context: g },
          },
          i = t && t.length ? j.pluck(n, t) : n;
        z(i, e);
      }),
      (g._currentCustomerIDs = {}),
      (g._customerIDsHashChanged = !1),
      (g._newCustomerIDsHash = ''),
      (g.setCustomerIDs = function (t, n) {
        function i() {
          g._customerIDsHashChanged = !1;
        }
        if (!g.isOptedOut() && t) {
          if (!j.isObject(t) || j.isObjectEmpty(t)) return !1;
          g._readVisitor();
          var r, a, o;
          for (r in t)
            if (L(r) && ((a = t[r]), (n = a.hasOwnProperty('hashType') ? a.hashType : n), a))
              if ('object' === e(a)) {
                var s = {};
                if (a.id) {
                  if (n) {
                    if (!(o = Be(Ge(a.id), n))) return;
                    (a.id = o), (s.hashType = n);
                  }
                  s.id = a.id;
                }
                void 0 != a.authState && (s.authState = a.authState),
                  (g._currentCustomerIDs[r] = s);
              } else if (n) {
                if (!(o = Be(Ge(a), n))) return;
                g._currentCustomerIDs[r] = { id: o, hashType: n };
              } else g._currentCustomerIDs[r] = { id: a };
          var l = g.getCustomerIDs(),
            c = g._getField('MCCIDH'),
            u = '';
          c || (c = 0);
          for (r in l)
            L(r) &&
              ((a = l[r]),
              (u +=
                (u ? '|' : '') + r + '|' + (a.id ? a.id : '') + (a.authState ? a.authState : '')));
          (g._newCustomerIDsHash = String(g._hash(u))),
            g._newCustomerIDsHash !== c && ((g._customerIDsHashChanged = !0), g._mapCustomerIDs(i));
        }
      }),
      (g.getCustomerIDs = function () {
        g._readVisitor();
        var e,
          t,
          n = {};
        for (e in g._currentCustomerIDs)
          L(e) &&
            ((t = g._currentCustomerIDs[e]),
            n[e] || (n[e] = {}),
            t.id && (n[e].id = t.id),
            void 0 != t.authState
              ? (n[e].authState = t.authState)
              : (n[e].authState = S.AuthState.UNKNOWN),
            t.hashType && (n[e].hashType = t.hashType));
        return n;
      }),
      (g.setAnalyticsVisitorID = function (e) {
        g._setAnalyticsFields(e);
      }),
      (g.getAnalyticsVisitorID = function (e, t, n) {
        if (!w.isTrackingServerPopulated() && !n) return g._callCallback(e, ['']), '';
        var i = '';
        if (
          (n ||
            (i = g.getMarketingCloudVisitorID(function (t) {
              g.getAnalyticsVisitorID(e, !0);
            })),
          i || n)
        ) {
          var r = n ? g.marketingCloudServer : g.trackingServer,
            a = '';
          g.loadSSL &&
            (n
              ? g.marketingCloudServerSecure && (r = g.marketingCloudServerSecure)
              : g.trackingServerSecure && (r = g.trackingServerSecure));
          var o = {};
          if (r) {
            var s = 'http' + (g.loadSSL ? 's' : '') + '://' + r + '/id',
              l =
                'd_visid_ver=' +
                g.version +
                '&mcorgid=' +
                encodeURIComponent(g.marketingCloudOrgID) +
                (i ? '&mid=' + encodeURIComponent(i) : '') +
                (g.idSyncDisable3rdPartySyncing || g.disableThirdPartyCookies
                  ? '&d_coppa=true'
                  : ''),
              c = ['s_c_il', g._in, '_set' + (n ? 'MarketingCloud' : 'Analytics') + 'Fields'];
            (a =
              s +
              '?' +
              l +
              '&callback=s_c_il%5B' +
              g._in +
              '%5D._set' +
              (n ? 'MarketingCloud' : 'Analytics') +
              'Fields'),
              (o.corsUrl = s + '?' + l),
              (o.callback = c);
          }
          return (o.url = a), g._getRemoteField(n ? A : O, a, e, t, o);
        }
        return '';
      }),
      (g.getAudienceManagerLocationHint = function (e, t) {
        if (
          g.getMarketingCloudVisitorID(function (t) {
            g.getAudienceManagerLocationHint(e, !0);
          })
        ) {
          var n = g._getField(O);
          if (
            (!n &&
              w.isTrackingServerPopulated() &&
              (n = g.getAnalyticsVisitorID(function (t) {
                g.getAudienceManagerLocationHint(e, !0);
              })),
            n || !w.isTrackingServerPopulated())
          ) {
            var i = g._getAudienceManagerURLData(),
              r = i.url;
            return g._getRemoteField('MCAAMLH', r, e, t, i);
          }
        }
        return '';
      }),
      (g.getLocationHint = g.getAudienceManagerLocationHint),
      (g.getAudienceManagerBlob = function (e, t) {
        if (
          g.getMarketingCloudVisitorID(function (t) {
            g.getAudienceManagerBlob(e, !0);
          })
        ) {
          var n = g._getField(O);
          if (
            (!n &&
              w.isTrackingServerPopulated() &&
              (n = g.getAnalyticsVisitorID(function (t) {
                g.getAudienceManagerBlob(e, !0);
              })),
            n || !w.isTrackingServerPopulated())
          ) {
            var i = g._getAudienceManagerURLData(),
              r = i.url;
            return (
              g._customerIDsHashChanged && g._setFieldExpire(k, -1),
              g._getRemoteField(k, r, e, t, i)
            );
          }
        }
        return '';
      }),
      (g._supplementalDataIDCurrent = ''),
      (g._supplementalDataIDCurrentConsumed = {}),
      (g._supplementalDataIDLast = ''),
      (g._supplementalDataIDLastConsumed = {}),
      (g.getSupplementalDataID = function (e, t) {
        g._supplementalDataIDCurrent || t || (g._supplementalDataIDCurrent = g._generateID(1));
        var n = g._supplementalDataIDCurrent;
        return (
          g._supplementalDataIDLast && !g._supplementalDataIDLastConsumed[e]
            ? ((n = g._supplementalDataIDLast), (g._supplementalDataIDLastConsumed[e] = !0))
            : n &&
              (g._supplementalDataIDCurrentConsumed[e] &&
                ((g._supplementalDataIDLast = g._supplementalDataIDCurrent),
                (g._supplementalDataIDLastConsumed = g._supplementalDataIDCurrentConsumed),
                (g._supplementalDataIDCurrent = n = t ? '' : g._generateID(1)),
                (g._supplementalDataIDCurrentConsumed = {})),
              n && (g._supplementalDataIDCurrentConsumed[e] = !0)),
          n
        );
      });
    var R = !1;
    (g._liberatedOptOut = null),
      (g.getOptOut = function (e, t) {
        var n = g._getAudienceManagerURLData('_setMarketingCloudFields'),
          i = n.url;
        if (u()) return g._getRemoteField('MCOPTOUT', i, e, t, n);
        if ((g._registerCallback('liberatedOptOut', e), null !== g._liberatedOptOut))
          return (
            g._callAllCallbacks('liberatedOptOut', [g._liberatedOptOut]),
            (R = !1),
            g._liberatedOptOut
          );
        if (R) return null;
        R = !0;
        var r = 'liberatedGetOptOut';
        return (
          (n.corsUrl = n.corsUrl.replace(/dpm\.demdex\.net\/id\?/, 'dpm.demdex.net/optOutStatus?')),
          (n.callback = [r]),
          (_[r] = function (e) {
            if (e === Object(e)) {
              var t,
                n,
                i = j.parseOptOut(e, t, T);
              (t = i.optOut),
                (n = 1e3 * i.d_ottl),
                (g._liberatedOptOut = t),
                setTimeout(function () {
                  g._liberatedOptOut = null;
                }, n);
            }
            g._callAllCallbacks('liberatedOptOut', [t]), (R = !1);
          }),
          P.fireCORS(n),
          null
        );
      }),
      (g.isOptedOut = function (e, t, n) {
        t || (t = S.OptOut.GLOBAL);
        var i = g.getOptOut(function (n) {
          var i = n === S.OptOut.GLOBAL || n.indexOf(t) >= 0;
          g._callCallback(e, [i]);
        }, n);
        return i ? i === S.OptOut.GLOBAL || i.indexOf(t) >= 0 : null;
      }),
      (g._fields = null),
      (g._fieldsExpired = null),
      (g._hash = function (e) {
        var t,
          n,
          i = 0;
        if (e)
          for (t = 0; t < e.length; t++) (n = e.charCodeAt(t)), (i = (i << 5) - i + n), (i &= i);
        return i;
      }),
      (g._generateID = ne),
      (g._generateLocalMID = function () {
        var e = g._generateID(0);
        return (N.isClientSideMarketingCloudVisitorID = !0), e;
      }),
      (g._callbackList = null),
      (g._callCallback = function (e, t) {
        try {
          'function' == typeof e ? e.apply(v, t) : e[1].apply(e[0], t);
        } catch (e) {}
      }),
      (g._registerCallback = function (e, t) {
        t &&
          (null == g._callbackList && (g._callbackList = {}),
          void 0 == g._callbackList[e] && (g._callbackList[e] = []),
          g._callbackList[e].push(t));
      }),
      (g._callAllCallbacks = function (e, t) {
        if (null != g._callbackList) {
          var n = g._callbackList[e];
          if (n) for (; n.length > 0; ) g._callCallback(n.shift(), t);
        }
      }),
      (g._addQuerystringParam = function (e, t, n, i) {
        var r = encodeURIComponent(t) + '=' + encodeURIComponent(n),
          a = w.parseHash(e),
          o = w.hashlessUrl(e);
        if (-1 === o.indexOf('?')) return o + '?' + r + a;
        var s = o.split('?'),
          l = s[0] + '?',
          c = s[1];
        return l + w.addQueryParamAtLocation(c, r, i) + a;
      }),
      (g._extractParamFromUri = function (e, t) {
        var n = new RegExp('[\\?&#]' + t + '=([^&#]*)'),
          i = n.exec(e);
        if (i && i.length) return decodeURIComponent(i[1]);
      }),
      (g._parseAdobeMcFromUrl = r(re.ADOBE_MC)),
      (g._parseAdobeMcSdidFromUrl = r(re.ADOBE_MC_SDID)),
      (g._attemptToPopulateSdidFromUrl = function (e) {
        var n = g._parseAdobeMcSdidFromUrl(e),
          i = 1e9;
        n && n.TS && (i = w.getTimestampInSeconds() - n.TS),
          n &&
            n.SDID &&
            n.MCORGID === t &&
            i < g.sdidParamExpiry &&
            ((g._supplementalDataIDCurrent = n.SDID),
            (g._supplementalDataIDCurrentConsumed.SDID_URL_PARAM = !0));
      }),
      (g._attemptToPopulateIdsFromUrl = function () {
        var e = g._parseAdobeMcFromUrl();
        if (e && e.TS) {
          var n = w.getTimestampInSeconds(),
            i = n - e.TS;
          if (Math.floor(i / 60) > re.ADOBE_MC_TTL_IN_MIN || e.MCORGID !== t) return;
          a(e);
        }
      }),
      (g._mergeServerState = function (e) {
        if (e)
          try {
            if (
              ((e = (function (e) {
                return w.isObject(e) ? e : JSON.parse(e);
              })(e)),
              e[g.marketingCloudOrgID])
            ) {
              var t = e[g.marketingCloudOrgID];
              !(function (e) {
                w.isObject(e) && g.setCustomerIDs(e);
              })(t.customerIDs),
                o(t.sdid);
            }
          } catch (e) {
            throw new Error('`serverState` has an invalid format.');
          }
      }),
      (g._timeout = null),
      (g._loadData = function (e, t, n, i) {
        (t = g._addQuerystringParam(t, 'd_fieldgroup', e, 1)),
          (i.url = g._addQuerystringParam(i.url, 'd_fieldgroup', e, 1)),
          (i.corsUrl = g._addQuerystringParam(i.corsUrl, 'd_fieldgroup', e, 1)),
          (N.fieldGroupObj[e] = !0),
          i === Object(i) &&
            i.corsUrl &&
            'XMLHttpRequest' === P.corsMetadata.corsType &&
            P.fireCORS(i, n, e);
      }),
      (g._clearTimeout = function (e) {
        null != g._timeout && g._timeout[e] && (clearTimeout(g._timeout[e]), (g._timeout[e] = 0));
      }),
      (g._settingsDigest = 0),
      (g._getSettingsDigest = function () {
        if (!g._settingsDigest) {
          var e = g.version;
          g.audienceManagerServer && (e += '|' + g.audienceManagerServer),
            g.audienceManagerServerSecure && (e += '|' + g.audienceManagerServerSecure),
            (g._settingsDigest = g._hash(e));
        }
        return g._settingsDigest;
      }),
      (g._readVisitorDone = !1),
      (g._readVisitor = function () {
        if (!g._readVisitorDone) {
          g._readVisitorDone = !0;
          var e,
            t,
            n,
            i,
            r,
            a,
            o = g._getSettingsDigest(),
            s = !1,
            l = g.cookieRead(g.cookieName),
            c = new Date();
          if (
            (l ||
              I ||
              g.discardTrackingServerECID ||
              (l = g.cookieRead(re.FIRST_PARTY_SERVER_COOKIE)),
            null == g._fields && (g._fields = {}),
            l && 'T' !== l)
          )
            for (
              l = l.split('|'),
                l[0].match(/^[\-0-9]+$/) && (parseInt(l[0], 10) !== o && (s = !0), l.shift()),
                l.length % 2 == 1 && l.pop(),
                e = 0;
              e < l.length;
              e += 2
            )
              (t = l[e].split('-')),
                (n = t[0]),
                (i = l[e + 1]),
                t.length > 1
                  ? ((r = parseInt(t[1], 10)), (a = t[1].indexOf('s') > 0))
                  : ((r = 0), (a = !1)),
                s && ('MCCIDH' === n && (i = ''), r > 0 && (r = c.getTime() / 1e3 - 60)),
                n &&
                  i &&
                  (g._setField(n, i, 1),
                  r > 0 &&
                    ((g._fields['expire' + n] = r + (a ? 's' : '')),
                    (c.getTime() >= 1e3 * r || (a && !g.cookieRead(g.sessionCookieName))) &&
                      (g._fieldsExpired || (g._fieldsExpired = {}), (g._fieldsExpired[n] = !0))));
          !g._getField(O) &&
            w.isTrackingServerPopulated() &&
            (l = g.cookieRead('s_vi')) &&
            ((l = l.split('|')),
            l.length > 1 &&
              l[0].indexOf('v1') >= 0 &&
              ((i = l[1]),
              (e = i.indexOf('[')),
              e >= 0 && (i = i.substring(0, e)),
              i && i.match(re.VALID_VISITOR_ID_REGEX) && g._setField(O, i)));
        }
      }),
      (g._appendVersionTo = function (e) {
        var t = 'vVersion|' + g.version,
          n = e ? g._getCookieVersion(e) : null;
        return (
          n
            ? Z.areVersionsDifferent(n, g.version) && (e = e.replace(re.VERSION_REGEX, t))
            : (e += (e ? '|' : '') + t),
          e
        );
      }),
      (g._writeVisitor = function () {
        var e,
          t,
          n = g._getSettingsDigest();
        for (e in g._fields)
          L(e) &&
            g._fields[e] &&
            'expire' !== e.substring(0, 6) &&
            ((t = g._fields[e]),
            (n +=
              (n ? '|' : '') +
              e +
              (g._fields['expire' + e] ? '-' + g._fields['expire' + e] : '') +
              '|' +
              t));
        (n = g._appendVersionTo(n)), g.cookieWrite(g.cookieName, n, 1);
      }),
      (g._getField = function (e, t) {
        return null == g._fields || (!t && g._fieldsExpired && g._fieldsExpired[e])
          ? null
          : g._fields[e];
      }),
      (g._setField = function (e, t, n) {
        null == g._fields && (g._fields = {}), (g._fields[e] = t), n || g._writeVisitor();
      }),
      (g._getFieldList = function (e, t) {
        var n = g._getField(e, t);
        return n ? n.split('*') : null;
      }),
      (g._setFieldList = function (e, t, n) {
        g._setField(e, t ? t.join('*') : '', n);
      }),
      (g._getFieldMap = function (e, t) {
        var n = g._getFieldList(e, t);
        if (n) {
          var i,
            r = {};
          for (i = 0; i < n.length; i += 2) r[n[i]] = n[i + 1];
          return r;
        }
        return null;
      }),
      (g._setFieldMap = function (e, t, n) {
        var i,
          r = null;
        if (t) {
          r = [];
          for (i in t) L(i) && (r.push(i), r.push(t[i]));
        }
        g._setFieldList(e, r, n);
      }),
      (g._setFieldExpire = function (e, t, n) {
        var i = new Date();
        i.setTime(i.getTime() + 1e3 * t),
          null == g._fields && (g._fields = {}),
          (g._fields['expire' + e] = Math.floor(i.getTime() / 1e3) + (n ? 's' : '')),
          t < 0
            ? (g._fieldsExpired || (g._fieldsExpired = {}), (g._fieldsExpired[e] = !0))
            : g._fieldsExpired && (g._fieldsExpired[e] = !1),
          n && (g.cookieRead(g.sessionCookieName) || g.cookieWrite(g.sessionCookieName, '1'));
      }),
      (g._findVisitorID = function (t) {
        return (
          t &&
            ('object' === e(t) &&
              (t = t.d_mid
                ? t.d_mid
                : t.visitorID
                ? t.visitorID
                : t.id
                ? t.id
                : t.uuid
                ? t.uuid
                : '' + t),
            t && 'NOTARGET' === (t = t.toUpperCase()) && (t = T),
            (t && (t === T || t.match(re.VALID_VISITOR_ID_REGEX))) || (t = '')),
          t
        );
      }),
      (g._setFields = function (t, n) {
        if (
          (g._clearTimeout(t),
          null != g._loading && (g._loading[t] = !1),
          N.fieldGroupObj[t] && N.setState(t, !1),
          'MC' === t)
        ) {
          !0 !== N.isClientSideMarketingCloudVisitorID &&
            (N.isClientSideMarketingCloudVisitorID = !1);
          var i = g._getField(A);
          if (!i || g.overwriteCrossDomainMCIDAndAID) {
            if (!(i = 'object' === e(n) && n.mid ? n.mid : g._findVisitorID(n))) {
              if (g._use1stPartyMarketingCloudServer && !g.tried1stPartyMarketingCloudServer)
                return (
                  (g.tried1stPartyMarketingCloudServer = !0),
                  void g.getAnalyticsVisitorID(null, !1, !0)
                );
              i = g._generateLocalMID();
            }
            g._setField(A, i);
          }
          (i && i !== T) || (i = ''),
            'object' === e(n) &&
              ((n.d_region || n.dcs_region || n.d_blob || n.blob) && g._setFields(M, n),
              g._use1stPartyMarketingCloudServer && n.mid && g._setFields(b, { id: n.id })),
            g._callAllCallbacks(A, [i]);
        }
        if (t === M && 'object' === e(n)) {
          var r = 604800;
          void 0 != n.id_sync_ttl && n.id_sync_ttl && (r = parseInt(n.id_sync_ttl, 10));
          var a = F.getRegionAndCheckIfChanged(n, r);
          g._callAllCallbacks('MCAAMLH', [a]);
          var o = g._getField(k);
          (n.d_blob || n.blob) &&
            ((o = n.d_blob), o || (o = n.blob), g._setFieldExpire(k, r), g._setField(k, o)),
            o || (o = ''),
            g._callAllCallbacks(k, [o]),
            !n.error_msg && g._newCustomerIDsHash && g._setField('MCCIDH', g._newCustomerIDsHash);
        }
        if (t === b) {
          var s = g._getField(O);
          (s && !g.overwriteCrossDomainMCIDAndAID) ||
            ((s = g._findVisitorID(n)),
            s ? s !== T && g._setFieldExpire(k, -1) : (s = T),
            g._setField(O, s)),
            (s && s !== T) || (s = ''),
            g._callAllCallbacks(O, [s]);
        }
        if (g.idSyncDisableSyncs || g.disableIdSyncs) F.idCallNotProcesssed = !0;
        else {
          F.idCallNotProcesssed = !1;
          var l = {};
          (l.ibs = n.ibs), (l.subdomain = n.subdomain), F.processIDCallData(l);
        }
        if (n === Object(n)) {
          var c, d;
          u() && g.isAllowed() && (c = g._getField('MCOPTOUT'));
          var f = j.parseOptOut(n, c, T);
          (c = f.optOut),
            (d = f.d_ottl),
            g._setFieldExpire('MCOPTOUT', d, !0),
            g._setField('MCOPTOUT', c),
            g._callAllCallbacks('MCOPTOUT', [c]);
        }
      }),
      (g._loading = null),
      (g._getRemoteField = function (e, t, n, i, r) {
        var a,
          o = '',
          s = w.isFirstPartyAnalyticsVisitorIDCall(e),
          l = { MCAAMLH: !0, MCAAMB: !0 };
        if (u() && g.isAllowed()) {
          g._readVisitor(), (o = g._getField(e, !0 === l[e]));
          if (
            (function () {
              return (
                (!o || (g._fieldsExpired && g._fieldsExpired[e])) &&
                (!g.disableThirdPartyCalls || s)
              );
            })()
          ) {
            if (
              (e === A || 'MCOPTOUT' === e
                ? (a = 'MC')
                : 'MCAAMLH' === e || e === k
                ? (a = M)
                : e === O && (a = b),
              a)
            )
              return (
                !t ||
                  (null != g._loading && g._loading[a]) ||
                  (null == g._loading && (g._loading = {}),
                  (g._loading[a] = !0),
                  g._loadData(
                    a,
                    t,
                    function (t) {
                      if (!g._getField(e)) {
                        t && N.setState(a, !0);
                        var n = '';
                        e === A
                          ? (n = g._generateLocalMID())
                          : a === M && (n = { error_msg: 'timeout' }),
                          g._setFields(a, n);
                      }
                    },
                    r,
                  )),
                g._registerCallback(e, n),
                o || (t || g._setFields(a, { id: T }), '')
              );
          } else
            o ||
              (e === A
                ? (g._registerCallback(e, n),
                  (o = g._generateLocalMID()),
                  g.setMarketingCloudVisitorID(o))
                : e === O
                ? (g._registerCallback(e, n), (o = ''), g.setAnalyticsVisitorID(o))
                : ((o = ''), (i = !0)));
        }
        return (
          (e !== A && e !== O) || o !== T || ((o = ''), (i = !0)),
          n && i && g._callCallback(n, [o]),
          o
        );
      }),
      (g._setMarketingCloudFields = function (e) {
        g._readVisitor(), g._setFields('MC', e);
      }),
      (g._mapCustomerIDs = function (e) {
        g.getAudienceManagerBlob(e, !0);
      }),
      (g._setAnalyticsFields = function (e) {
        g._readVisitor(), g._setFields(b, e);
      }),
      (g._setAudienceManagerFields = function (e) {
        g._readVisitor(), g._setFields(M, e);
      }),
      (g._getAudienceManagerURLData = function (e) {
        var t = g.audienceManagerServer,
          n = '',
          i = g._getField(A),
          r = g._getField(k, !0),
          a = g._getField(O),
          o = a && a !== T ? '&d_cid_ic=AVID%01' + encodeURIComponent(a) : '';
        if (
          (g.loadSSL && g.audienceManagerServerSecure && (t = g.audienceManagerServerSecure), t)
        ) {
          var s,
            l,
            c = g.getCustomerIDs();
          if (c)
            for (s in c)
              L(s) &&
                ((l = c[s]),
                (o +=
                  '&d_cid_ic=' +
                  encodeURIComponent(s) +
                  '%01' +
                  encodeURIComponent(l.id ? l.id : '') +
                  (l.authState ? '%01' + l.authState : '')));
          e || (e = '_setAudienceManagerFields');
          var u = 'http' + (g.loadSSL ? 's' : '') + '://' + t + '/id',
            d =
              'd_visid_ver=' +
              g.version +
              (h && -1 !== u.indexOf('demdex.net')
                ? '&gdpr=1&gdpr_force=1&gdpr_consent=' + h
                : '') +
              '&d_rtbd=json&d_ver=2' +
              (!i && g._use1stPartyMarketingCloudServer ? '&d_verify=1' : '') +
              '&d_orgid=' +
              encodeURIComponent(g.marketingCloudOrgID) +
              '&d_nsid=' +
              (g.idSyncContainerID || 0) +
              (i ? '&d_mid=' + encodeURIComponent(i) : '') +
              (g.idSyncDisable3rdPartySyncing || g.disableThirdPartyCookies
                ? '&d_coppa=true'
                : '') +
              (!0 === D ? '&d_coop_safe=1' : !1 === D ? '&d_coop_unsafe=1' : '') +
              (r ? '&d_blob=' + encodeURIComponent(r) : '') +
              o,
            f = ['s_c_il', g._in, e];
          return (
            (n = u + '?' + d + '&d_cb=s_c_il%5B' + g._in + '%5D.' + e),
            { url: n, corsUrl: u + '?' + d, callback: f }
          );
        }
        return { url: n };
      }),
      (g.appendVisitorIDsTo = function (e) {
        try {
          var t = [
            [A, g._getField(A)],
            [O, g._getField(O)],
            ['MCORGID', g.marketingCloudOrgID],
          ];
          return g._addQuerystringParam(e, re.ADOBE_MC, s(t));
        } catch (t) {
          return e;
        }
      }),
      (g.appendSupplementalDataIDTo = function (e, t) {
        if (!(t = t || g.getSupplementalDataID(w.generateRandomString(), !0))) return e;
        try {
          var n = s([
            ['SDID', t],
            ['MCORGID', g.marketingCloudOrgID],
          ]);
          return g._addQuerystringParam(e, re.ADOBE_MC_SDID, n);
        } catch (t) {
          return e;
        }
      });
    var w = {
      parseHash: function (e) {
        var t = e.indexOf('#');
        return t > 0 ? e.substr(t) : '';
      },
      hashlessUrl: function (e) {
        var t = e.indexOf('#');
        return t > 0 ? e.substr(0, t) : e;
      },
      addQueryParamAtLocation: function (e, t, n) {
        var i = e.split('&');
        return (n = null != n ? n : i.length), i.splice(n, 0, t), i.join('&');
      },
      isFirstPartyAnalyticsVisitorIDCall: function (e, t, n) {
        if (e !== O) return !1;
        var i;
        return (
          t || (t = g.trackingServer),
          n || (n = g.trackingServerSecure),
          !('string' != typeof (i = g.loadSSL ? n : t) || !i.length) &&
            i.indexOf('2o7.net') < 0 &&
            i.indexOf('omtrdc.net') < 0
        );
      },
      isObject: function (e) {
        return Boolean(e && e === Object(e));
      },
      removeCookie: function (e) {
        Q.remove(e, { domain: g.cookieDomain });
      },
      isTrackingServerPopulated: function () {
        return !!g.trackingServer || !!g.trackingServerSecure;
      },
      getTimestampInSeconds: function () {
        return Math.round(new Date().getTime() / 1e3);
      },
      parsePipeDelimetedKeyValues: function (e) {
        return e.split('|').reduce(function (e, t) {
          var n = t.split('=');
          return (e[n[0]] = decodeURIComponent(n[1])), e;
        }, {});
      },
      generateRandomString: function (e) {
        e = e || 5;
        for (var t = '', n = 'abcdefghijklmnopqrstuvwxyz0123456789'; e--; )
          t += n[Math.floor(Math.random() * n.length)];
        return t;
      },
      normalizeBoolean: function (e) {
        return 'true' === e || ('false' !== e && e);
      },
      parseBoolean: function (e) {
        return 'true' === e || ('false' !== e && null);
      },
      replaceMethodsWithFunction: function (e, t) {
        for (var n in e) e.hasOwnProperty(n) && 'function' == typeof e[n] && (e[n] = t);
        return e;
      },
    };
    g._helpers = w;
    var F = ae(g, S);
    (g._destinationPublishing = F), (g.timeoutMetricsLog = []);
    var N = {
      isClientSideMarketingCloudVisitorID: null,
      MCIDCallTimedOut: null,
      AnalyticsIDCallTimedOut: null,
      AAMIDCallTimedOut: null,
      fieldGroupObj: {},
      setState: function (e, t) {
        switch (e) {
          case 'MC':
            !1 === t
              ? !0 !== this.MCIDCallTimedOut && (this.MCIDCallTimedOut = !1)
              : (this.MCIDCallTimedOut = t);
            break;
          case b:
            !1 === t
              ? !0 !== this.AnalyticsIDCallTimedOut && (this.AnalyticsIDCallTimedOut = !1)
              : (this.AnalyticsIDCallTimedOut = t);
            break;
          case M:
            !1 === t
              ? !0 !== this.AAMIDCallTimedOut && (this.AAMIDCallTimedOut = !1)
              : (this.AAMIDCallTimedOut = t);
        }
      },
    };
    (g.isClientSideMarketingCloudVisitorID = function () {
      return N.isClientSideMarketingCloudVisitorID;
    }),
      (g.MCIDCallTimedOut = function () {
        return N.MCIDCallTimedOut;
      }),
      (g.AnalyticsIDCallTimedOut = function () {
        return N.AnalyticsIDCallTimedOut;
      }),
      (g.AAMIDCallTimedOut = function () {
        return N.AAMIDCallTimedOut;
      }),
      (g.idSyncGetOnPageSyncInfo = function () {
        return g._readVisitor(), g._getField('MCSYNCSOP');
      }),
      (g.idSyncByURL = function (e) {
        if (!g.isOptedOut()) {
          var t = l(e || {});
          if (t.error) return t.error;
          var n,
            i,
            r = e.url,
            a = encodeURIComponent,
            o = F;
          return (
            (r = r.replace(/^https:/, '').replace(/^http:/, '')),
            (n = j.encodeAndBuildRequest(['', e.dpid, e.dpuuid || ''], ',')),
            (i = ['ibs', a(e.dpid), 'img', a(r), t.ttl, '', n]),
            o.addMessage(i.join('|')),
            o.requestToProcess(),
            'Successfully queued'
          );
        }
      }),
      (g.idSyncByDataSource = function (e) {
        if (!g.isOptedOut())
          return e === Object(e) && 'string' == typeof e.dpuuid && e.dpuuid.length
            ? ((e.url = '//dpm.demdex.net/ibs:dpid=' + e.dpid + '&dpuuid=' + e.dpuuid),
              g.idSyncByURL(e))
            : 'Error: config or config.dpuuid is empty';
      }),
      He(g, F),
      (g._getCookieVersion = function (e) {
        e = e || g.cookieRead(g.cookieName);
        var t = re.VERSION_REGEX.exec(e);
        return t && t.length > 1 ? t[1] : null;
      }),
      (g._resetAmcvCookie = function (e) {
        var t = g._getCookieVersion();
        (t && !Z.isLessThan(t, e)) || w.removeCookie(g.cookieName);
      }),
      (g.setAsCoopSafe = function () {
        D = !0;
      }),
      (g.setAsCoopUnsafe = function () {
        D = !1;
      }),
      (function () {
        if (((g.configs = Object.create(null)), w.isObject(n)))
          for (var e in n) L(e) && ((g[e] = n[e]), (g.configs[e] = n[e]));
      })(),
      (function () {
        [
          ['getMarketingCloudVisitorID'],
          ['setCustomerIDs', void 0],
          ['getAnalyticsVisitorID'],
          ['getAudienceManagerLocationHint'],
          ['getLocationHint'],
          ['getAudienceManagerBlob'],
        ].forEach(function (e) {
          var t = e[0],
            n = 2 === e.length ? e[1] : '',
            i = g[t];
          g[t] = function (e) {
            return u() && g.isAllowed()
              ? i.apply(g, arguments)
              : ('function' == typeof e && g._callCallback(e, [n]), n);
          };
        });
      })(),
      (g.init = function () {
        if (c()) return m.optIn.fetchPermissions(f, !0);
        !(function () {
          if (w.isObject(n)) {
            (g.idSyncContainerID = g.idSyncContainerID || 0),
              (D = 'boolean' == typeof g.isCoopSafe ? g.isCoopSafe : w.parseBoolean(g.isCoopSafe)),
              g.resetBeforeVersion && g._resetAmcvCookie(g.resetBeforeVersion),
              g._attemptToPopulateIdsFromUrl(),
              g._attemptToPopulateSdidFromUrl(),
              g._readVisitor();
            var e = g._getField(y),
              t = Math.ceil(new Date().getTime() / re.MILLIS_PER_DAY);
            g.idSyncDisableSyncs ||
              g.disableIdSyncs ||
              !F.canMakeSyncIDCall(e, t) ||
              (g._setFieldExpire(k, -1), g._setField(y, t)),
              g.getMarketingCloudVisitorID(),
              g.getAudienceManagerLocationHint(),
              g.getAudienceManagerBlob(),
              g._mergeServerState(g.serverState);
          } else g._attemptToPopulateIdsFromUrl(), g._attemptToPopulateSdidFromUrl();
        })(),
          (function () {
            if (!g.idSyncDisableSyncs && !g.disableIdSyncs) {
              F.checkDPIframeSrc();
              var e = function () {
                var e = F;
                e.readyToAttachIframe() && e.attachIframe();
              };
              v.addEventListener('load', function () {
                (S.windowLoaded = !0), e();
              });
              try {
                te.receiveMessage(function (e) {
                  F.receiveMessage(e.data);
                }, F.iframeHost);
              } catch (e) {}
            }
          })(),
          (function () {
            g.whitelistIframeDomains &&
              re.POST_MESSAGE_ENABLED &&
              ((g.whitelistIframeDomains =
                g.whitelistIframeDomains instanceof Array
                  ? g.whitelistIframeDomains
                  : [g.whitelistIframeDomains]),
              g.whitelistIframeDomains.forEach(function (e) {
                var n = new B(t, e),
                  i = K(g, n);
                te.receiveMessage(i, e);
              }));
          })();
      });
  };
  (qe.config = se), (_.Visitor = qe);
  var Xe = qe,
    We = function (e) {
      if (j.isObject(e))
        return Object.keys(e)
          .filter(function (t) {
            return '' !== e[t];
          })
          .reduce(function (t, n) {
            var i = 'doesOptInApply' !== n ? e[n] : se.normalizeConfig(e[n]),
              r = j.normalizeBoolean(i);
            return (t[n] = r), t;
          }, Object.create(null));
    },
    Je = Ve.OptIn,
    Ke = Ve.IabPlugin;
  return (
    (Xe.getInstance = function (e, t) {
      if (!e) throw new Error('Visitor requires Adobe Marketing Cloud Org ID.');
      e.indexOf('@') < 0 && (e += '@AdobeOrg');
      var n = (function () {
        var t = _.s_c_il;
        if (t)
          for (var n = 0; n < t.length; n++) {
            var i = t[n];
            if (i && 'Visitor' === i._c && i.marketingCloudOrgID === e) return i;
          }
      })();
      if (n) return n;
      var i = We(t);
      !(function (e) {
        _.adobe.optIn =
          _.adobe.optIn ||
          (function () {
            var t = j.pluck(e, [
                'doesOptInApply',
                'previousPermissions',
                'preOptInApprovals',
                'isOptInStorageEnabled',
                'optInStorageExpiry',
                'isIabContext',
              ]),
              n = e.optInCookieDomain || e.cookieDomain;
            (n = n || $()),
              (n = n === window.location.hostname ? '' : n),
              (t.optInCookieDomain = n);
            var i = new Je(t, { cookies: Q });
            if (t.isIabContext) {
              var r = new Ke(window.__cmp);
              i.registerPlugin(r);
            }
            return i;
          })();
      })(i || {});
      var r = e,
        a = r.split('').reverse().join(''),
        o = new Xe(e, null, a);
      j.isObject(i) && i.cookieDomain && (o.cookieDomain = i.cookieDomain),
        (function () {
          _.s_c_il.splice(--_.s_c_in, 1);
        })();
      var s = j.getIeVersion();
      if ('number' == typeof s && s < 10)
        return o._helpers.replaceMethodsWithFunction(o, function () {});
      var l =
        (function () {
          try {
            return _.self !== _.parent;
          } catch (e) {
            return !0;
          }
        })() &&
        !(function (e) {
          return (
            e.cookieWrite('TEST_AMCV_COOKIE', 'T', 1),
            'T' === e.cookieRead('TEST_AMCV_COOKIE') &&
              (e._helpers.removeCookie('TEST_AMCV_COOKIE'), !0)
          );
        })(o) &&
        _.parent
          ? new Y(e, i, o, _.parent)
          : new Xe(e, i, a);
      return (o = null), l.init(), l;
    }),
    (function () {
      function e() {
        Xe.windowLoaded = !0;
      }
      _.addEventListener
        ? _.addEventListener('load', e)
        : _.attachEvent && _.attachEvent('onload', e),
        (Xe.codeLoadEnd = new Date().getTime());
    })(),
    Xe
  );
})();

/*
 Start ActivityMap Module

 The following module enables ActivityMap tracking in Adobe Analytics. ActivityMap
 allows you to view data overlays on your links and content to understand how
 users engage with your web site. If you do not intend to use ActivityMap, you
 can remove the following block of code from your AppMeasurement.js file.
 Additional documentation on how to configure ActivityMap is available at:
 https://marketing.adobe.com/resources/help/en_US/analytics/activitymap/getting-started-admins.html
*/
function AppMeasurement_Module_ActivityMap(h) {
  function q() {
    var a = f.pageYOffset + (f.innerHeight || 0);
    a && a > +g && (g = a);
  }
  function r() {
    if (e.scrollReachSelector) {
      var a = h.d.querySelector && h.d.querySelector(e.scrollReachSelector);
      a
        ? ((g = a.scrollTop || 0),
          a.addEventListener('scroll', function () {
            var d;
            (d = (a && a.scrollTop + a.clientHeight) || 0) > g && (g = d);
          }))
        : 0 < w-- && setTimeout(r, 1e3);
    }
  }
  function l(a, d) {
    var c, b, n;
    if (a && d && (c = e.c[d] || (e.c[d] = d.split(','))))
      for (n = 0; n < c.length && (b = c[n++]); ) if (-1 < a.indexOf(b)) return null;
    p = 1;
    return a;
  }
  function s(a, d, c, b, e) {
    var f, k;
    if (a.dataset && (k = a.dataset[d])) f = k;
    else if (a.getAttribute)
      if ((k = a.getAttribute('data-' + c))) f = k;
      else if ((k = a.getAttribute(c))) f = k;
    if (!f && h.useForcedLinkTracking && e) {
      var g;
      a = a.onclick ? '' + a.onclick : '';
      varValue = '';
      if (b && a && ((d = a.indexOf(b)), 0 <= d)) {
        for (d += b.length; d < a.length; )
          if (((c = a.charAt(d++)), 0 <= '\'"'.indexOf(c))) {
            g = c;
            break;
          }
        for (k = !1; d < a.length && g; ) {
          c = a.charAt(d);
          if (!k && c === g) break;
          '\\' === c ? (k = !0) : ((varValue += c), (k = !1));
          d++;
        }
      }
      (g = varValue) && (h.w[b] = g);
    }
    return f || (e && h.w[b]);
  }
  function t(a, d, c) {
    var b;
    return (b = e[d](a, c)) && (p ? ((p = 0), b) : l(m(b), e[d + 'Exclusions']));
  }
  function u(a, d, c) {
    var b;
    if (
      a &&
      !(1 === (b = a.nodeType) && (b = a.nodeName) && (b = b.toUpperCase()) && x[b]) &&
      (1 === a.nodeType && (b = a.nodeValue) && (d[d.length] = b),
      c.a ||
        c.t ||
        c.s ||
        !a.getAttribute ||
        ((b = a.getAttribute('alt'))
          ? (c.a = b)
          : (b = a.getAttribute('title'))
          ? (c.t = b)
          : 'IMG' == ('' + a.nodeName).toUpperCase() &&
            (b = a.getAttribute('src') || a.src) &&
            (c.s = b)),
      (b = a.childNodes) && b.length)
    )
      for (a = 0; a < b.length; a++) u(b[a], d, c);
  }
  function m(a) {
    if (null == a || void 0 == a) return a;
    try {
      return a
        .replace(
          RegExp(
            '^[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+',
            'mg',
          ),
          '',
        )
        .replace(
          RegExp(
            '[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+$',
            'mg',
          ),
          '',
        )
        .replace(
          RegExp(
            '[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]{1,}',
            'mg',
          ),
          ' ',
        )
        .substring(0, 254);
    } catch (d) {}
  }
  var e = this;
  e.s = h;
  var f = window;
  f.s_c_in || ((f.s_c_il = []), (f.s_c_in = 0));
  e._il = f.s_c_il;
  e._in = f.s_c_in;
  e._il[e._in] = e;
  f.s_c_in++;
  e._c = 's_m';
  var g = 0,
    v,
    w = 60;
  e.c = {};
  var p = 0,
    x = { SCRIPT: 1, STYLE: 1, LINK: 1, CANVAS: 1 };
  e._g = function () {
    var a,
      d,
      c,
      b = h.contextData,
      e = h.linkObject;
    (a = h.pageName || h.pageURL) &&
      (d = t(e, 'link', h.linkName)) &&
      (c = t(e, 'region')) &&
      ((b['a.activitymap.page'] = a.substring(0, 255)),
      (b['a.activitymap.link'] = 128 < d.length ? d.substring(0, 128) : d),
      (b['a.activitymap.region'] = 127 < c.length ? c.substring(0, 127) : c),
      0 < g && (b['a.activitymap.xy'] = 10 * Math.floor(g / 10)),
      (b['a.activitymap.pageIDType'] = h.pageName ? 1 : 0));
  };
  e._d = function () {
    e.trackScrollReach &&
      !v &&
      (e.scrollReachSelector
        ? r()
        : (q(), f.addEventListener && f.addEventListener('scroll', q, !1)),
      (v = !0));
  };
  e.link = function (a, d) {
    var c;
    if (d) c = l(m(d), e.linkExclusions);
    else if ((c = a) && !(c = s(a, 'sObjectId', 's-object-id', 's_objectID', 1))) {
      var b, f;
      (f = l(m(a.innerText || a.textContent), e.linkExclusions)) ||
        (u(a, (b = []), (c = { a: void 0, t: void 0, s: void 0 })),
        (f = l(m(b.join('')))) ||
          (f = l(m(c.a ? c.a : c.t ? c.t : c.s ? c.s : void 0))) ||
          !(b = (b = a.tagName) && b.toUpperCase ? b.toUpperCase() : '') ||
          ('INPUT' == b || ('SUBMIT' == b && a.value)
            ? (f = l(m(a.value)))
            : 'IMAGE' == b && a.src && (f = l(m(a.src)))));
      c = f;
    }
    return c;
  };
  e.region = function (a) {
    for (var d, c = e.regionIDAttribute || 'id'; a && (a = a.parentNode); ) {
      if ((d = s(a, c, c, c))) return d;
      if ('BODY' == a.nodeName) return 'BODY';
    }
  };
}
/* End ActivityMap Module */
/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 2.20.0
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/
function AppMeasurement(r) {
  var a = this;
  a.version = '2.20.0';
  var h = window;
  h.s_c_in || ((h.s_c_il = []), (h.s_c_in = 0));
  a._il = h.s_c_il;
  a._in = h.s_c_in;
  a._il[a._in] = a;
  h.s_c_in++;
  a._c = 's_c';
  var q = h.AppMeasurement.hc;
  q || (q = null);
  var p = h,
    m,
    s;
  try {
    for (
      m = p.parent, s = p.location;
      m &&
      m.location &&
      s &&
      '' + m.location !== '' + s &&
      p.location &&
      '' + m.location !== '' + p.location &&
      m.location.host === s.host;

    )
      (p = m), (m = p.parent);
  } catch (u) {}
  a.C = function (a) {
    try {
      console.log(a);
    } catch (b) {}
  };
  a.Qa = function (a) {
    return '' + parseInt(a) == '' + a;
  };
  a.replace = function (a, b, d) {
    return !a || 0 > a.indexOf(b) ? a : a.split(b).join(d);
  };
  a.escape = function (c) {
    var b, d;
    if (!c) return c;
    c = encodeURIComponent(c);
    for (b = 0; 7 > b; b++)
      (d = "+~!*()'".substring(b, b + 1)),
        0 <= c.indexOf(d) &&
          (c = a.replace(c, d, '%' + d.charCodeAt(0).toString(16).toUpperCase()));
    return c;
  };
  a.unescape = function (c) {
    if (!c) return c;
    c = 0 <= c.indexOf('+') ? a.replace(c, '+', ' ') : c;
    try {
      return decodeURIComponent(c);
    } catch (b) {}
    return unescape(c);
  };
  a.Mb = function () {
    var c = h.location.hostname,
      b = a.fpCookieDomainPeriods,
      d;
    b || (b = a.cookieDomainPeriods);
    if (
      c &&
      !a.Ja &&
      !/^[0-9.]+$/.test(c) &&
      ((b = b ? parseInt(b) : 2), (b = 2 < b ? b : 2), (d = c.lastIndexOf('.')), 0 <= d)
    ) {
      for (; 0 <= d && 1 < b; ) (d = c.lastIndexOf('.', d - 1)), b--;
      a.Ja = 0 < d ? c.substring(d) : c;
    }
    return a.Ja;
  };
  a.c_r = a.cookieRead = function (c) {
    c = a.escape(c);
    var b = ' ' + a.d.cookie,
      d = b.indexOf(' ' + c + '='),
      f = 0 > d ? d : b.indexOf(';', d);
    c = 0 > d ? '' : a.unescape(b.substring(d + 2 + c.length, 0 > f ? b.length : f));
    return '[[B]]' != c ? c : '';
  };
  a.c_w = a.cookieWrite = function (c, b, d) {
    var f = a.Mb(),
      e = a.cookieLifetime,
      g;
    b = '' + b;
    e = e ? ('' + e).toUpperCase() : '';
    d &&
      'SESSION' != e &&
      'NONE' != e &&
      ((g = '' != b ? parseInt(e ? e : 0) : -60)
        ? ((d = new Date()), d.setTime(d.getTime() + 1e3 * g))
        : 1 === d &&
          ((d = new Date()), (g = d.getYear()), d.setYear(g + 2 + (1900 > g ? 1900 : 0))));
    return c && 'NONE' != e
      ? ((a.d.cookie =
          a.escape(c) +
          '=' +
          a.escape('' != b ? b : '[[B]]') +
          '; path=/;' +
          (d && 'SESSION' != e ? ' expires=' + d.toUTCString() + ';' : '') +
          (f ? ' domain=' + f + ';' : '') +
          (a.writeSecureCookies ? ' secure;' : '')),
        a.cookieRead(c) == b)
      : 0;
  };
  a.Jb = function () {
    var c = a.Util.getIeVersion();
    'number' === typeof c && 10 > c && ((a.unsupportedBrowser = !0), a.wb(a, function () {}));
  };
  a.xa = function () {
    var a = navigator.userAgent;
    return 'Microsoft Internet Explorer' === navigator.appName ||
      0 <= a.indexOf('MSIE ') ||
      (0 <= a.indexOf('Trident/') && 0 <= a.indexOf('Windows NT 6'))
      ? !0
      : !1;
  };
  a.wb = function (a, b) {
    for (var d in a)
      Object.prototype.hasOwnProperty.call(a, d) && 'function' === typeof a[d] && (a[d] = b);
  };
  a.K = [];
  a.ea = function (c, b, d) {
    if (a.Ka) return 0;
    a.maxDelay || (a.maxDelay = 250);
    var f = 0,
      e = new Date().getTime() + a.maxDelay,
      g = a.d.visibilityState,
      k = ['webkitvisibilitychange', 'visibilitychange'];
    g || (g = a.d.webkitVisibilityState);
    if (g && 'prerender' == g) {
      if (!a.fa)
        for (a.fa = 1, d = 0; d < k.length; d++)
          a.d.addEventListener(k[d], function () {
            var c = a.d.visibilityState;
            c || (c = a.d.webkitVisibilityState);
            'visible' == c && ((a.fa = 0), a.delayReady());
          });
      f = 1;
      e = 0;
    } else d || (a.u('_d') && (f = 1));
    f && (a.K.push({ m: c, a: b, t: e }), a.fa || setTimeout(a.delayReady, a.maxDelay));
    return f;
  };
  a.delayReady = function () {
    var c = new Date().getTime(),
      b = 0,
      d;
    for (a.u('_d') ? (b = 1) : a.za(); 0 < a.K.length; ) {
      d = a.K.shift();
      if (b && !d.t && d.t > c) {
        a.K.unshift(d);
        setTimeout(a.delayReady, parseInt(a.maxDelay / 2));
        break;
      }
      a.Ka = 1;
      a[d.m].apply(a, d.a);
      a.Ka = 0;
    }
  };
  a.setAccount = a.sa = function (c) {
    var b, d;
    if (!a.ea('setAccount', arguments))
      if (((a.account = c), a.allAccounts))
        for (
          b = a.allAccounts.concat(c.split(',')), a.allAccounts = [], b.sort(), d = 0;
          d < b.length;
          d++
        )
          (0 != d && b[d - 1] == b[d]) || a.allAccounts.push(b[d]);
      else a.allAccounts = c.split(',');
  };
  a.foreachVar = function (c, b) {
    var d,
      f,
      e,
      g,
      k = '';
    e = f = '';
    if (a.lightProfileID)
      (d = a.O), (k = a.lightTrackVars) && (k = ',' + k + ',' + a.ka.join(',') + ',');
    else {
      d = a.g;
      if (a.pe || a.linkType)
        (k = a.linkTrackVars),
          (f = a.linkTrackEvents),
          a.pe &&
            ((e = a.pe.substring(0, 1).toUpperCase() + a.pe.substring(1)),
            a[e] && ((k = a[e].cc), (f = a[e].bc)));
      k && (k = ',' + k + ',' + a.F.join(',') + ',');
      f && k && (k += ',events,');
    }
    b && (b = ',' + b + ',');
    for (f = 0; f < d.length; f++)
      (e = d[f]),
        (g = a[e]) &&
          (!k || 0 <= k.indexOf(',' + e + ',')) &&
          (!b || 0 <= b.indexOf(',' + e + ',')) &&
          c(e, g);
  };
  a.o = function (c, b, d, f, e) {
    var g = '',
      k,
      l,
      h,
      n,
      m = 0;
    'contextData' == c && (c = 'c');
    if (b) {
      for (k in b)
        if (
          !(Object.prototype[k] || (e && k.substring(0, e.length) != e)) &&
          b[k] &&
          (!d || 0 <= d.indexOf(',' + (f ? f + '.' : '') + k + ','))
        ) {
          h = !1;
          if (m)
            for (l = 0; l < m.length; l++)
              if (k.substring(0, m[l].length) == m[l]) {
                h = !0;
                break;
              }
          if (
            !h &&
            ('' == g && (g += '&' + c + '.'),
            (l = b[k]),
            e && (k = k.substring(e.length)),
            0 < k.length)
          )
            if (((h = k.indexOf('.')), 0 < h))
              (l = k.substring(0, h)),
                (h = (e ? e : '') + l + '.'),
                m || (m = []),
                m.push(h),
                (g += a.o(l, b, d, f, h));
            else if (('boolean' == typeof l && (l = l ? 'true' : 'false'), l)) {
              if ('retrieveLightData' == f && 0 > e.indexOf('.contextData.'))
                switch (((h = k.substring(0, 4)), (n = k.substring(4)), k)) {
                  case 'transactionID':
                    k = 'xact';
                    break;
                  case 'channel':
                    k = 'ch';
                    break;
                  case 'campaign':
                    k = 'v0';
                    break;
                  default:
                    a.Qa(n) &&
                      ('prop' == h
                        ? (k = 'c' + n)
                        : 'eVar' == h
                        ? (k = 'v' + n)
                        : 'list' == h
                        ? (k = 'l' + n)
                        : 'hier' == h && ((k = 'h' + n), (l = l.substring(0, 255))));
                }
              g += '&' + a.escape(k) + '=' + a.escape(l);
            }
        }
      '' != g && (g += '&.' + c);
    }
    return g;
  };
  a.usePostbacks = 0;
  a.Pb = function () {
    var c = '',
      b,
      d,
      f,
      e,
      g,
      k,
      l,
      h,
      n = '',
      m = '',
      p = (e = ''),
      r = a.T();
    if (a.lightProfileID)
      (b = a.O), (n = a.lightTrackVars) && (n = ',' + n + ',' + a.ka.join(',') + ',');
    else {
      b = a.g;
      if (a.pe || a.linkType)
        (n = a.linkTrackVars),
          (m = a.linkTrackEvents),
          a.pe &&
            ((e = a.pe.substring(0, 1).toUpperCase() + a.pe.substring(1)),
            a[e] && ((n = a[e].cc), (m = a[e].bc)));
      n && (n = ',' + n + ',' + a.F.join(',') + ',');
      m && ((m = ',' + m + ','), n && (n += ',events,'));
      a.events2 && (p += ('' != p ? ',' : '') + a.events2);
    }
    if (r && r.getCustomerIDs) {
      e = q;
      if ((g = r.getCustomerIDs()))
        for (d in g)
          Object.prototype[d] ||
            ((f = g[d]),
            'object' == typeof f &&
              (e || (e = {}),
              f.id && (e[d + '.id'] = f.id),
              f.authState && (e[d + '.as'] = f.authState)));
      e && (c += a.o('cid', e));
    }
    a.AudienceManagement &&
      a.AudienceManagement.isReady() &&
      (c += a.o('d', a.AudienceManagement.getEventCallConfigParams()));
    for (d = 0; d < b.length; d++) {
      e = b[d];
      g = a[e];
      f = e.substring(0, 4);
      k = e.substring(4);
      g ||
        ('events' == e && p
          ? ((g = p), (p = ''))
          : 'marketingCloudOrgID' == e && r && a.V('ECID') && (g = r.marketingCloudOrgID));
      if (g && (!n || 0 <= n.indexOf(',' + e + ','))) {
        switch (e) {
          case 'customerPerspective':
            e = 'cp';
            break;
          case 'marketingCloudOrgID':
            e = 'mcorgid';
            break;
          case 'supplementalDataID':
            e = 'sdid';
            break;
          case 'timestamp':
            e = 'ts';
            break;
          case 'dynamicVariablePrefix':
            e = 'D';
            break;
          case 'visitorID':
            e = 'vid';
            break;
          case 'marketingCloudVisitorID':
            e = 'mid';
            break;
          case 'analyticsVisitorID':
            e = 'aid';
            break;
          case 'audienceManagerLocationHint':
            e = 'aamlh';
            break;
          case 'audienceManagerBlob':
            e = 'aamb';
            break;
          case 'authState':
            e = 'as';
            break;
          case 'pageURL':
            e = 'g';
            255 < g.length && ((a.pageURLRest = g.substring(255)), (g = g.substring(0, 255)));
            break;
          case 'pageURLRest':
            e = '-g';
            break;
          case 'referrer':
            e = 'r';
            break;
          case 'vmk':
          case 'visitorMigrationKey':
            e = 'vmt';
            break;
          case 'visitorMigrationServer':
            e = 'vmf';
            a.ssl && a.visitorMigrationServerSecure && (g = '');
            break;
          case 'visitorMigrationServerSecure':
            e = 'vmf';
            !a.ssl && a.visitorMigrationServer && (g = '');
            break;
          case 'charSet':
            e = 'ce';
            break;
          case 'visitorNamespace':
            e = 'ns';
            break;
          case 'cookieDomainPeriods':
            e = 'cdp';
            break;
          case 'cookieLifetime':
            e = 'cl';
            break;
          case 'variableProvider':
            e = 'vvp';
            break;
          case 'currencyCode':
            e = 'cc';
            break;
          case 'channel':
            e = 'ch';
            break;
          case 'transactionID':
            e = 'xact';
            break;
          case 'campaign':
            e = 'v0';
            break;
          case 'latitude':
            e = 'lat';
            break;
          case 'longitude':
            e = 'lon';
            break;
          case 'resolution':
            e = 's';
            break;
          case 'colorDepth':
            e = 'c';
            break;
          case 'javascriptVersion':
            e = 'j';
            break;
          case 'javaEnabled':
            e = 'v';
            break;
          case 'cookiesEnabled':
            e = 'k';
            break;
          case 'browserWidth':
            e = 'bw';
            break;
          case 'browserHeight':
            e = 'bh';
            break;
          case 'connectionType':
            e = 'ct';
            break;
          case 'homepage':
            e = 'hp';
            break;
          case 'events':
            p && (g += ('' != g ? ',' : '') + p);
            if (m)
              for (k = g.split(','), g = '', f = 0; f < k.length; f++)
                (l = k[f]),
                  (h = l.indexOf('=')),
                  0 <= h && (l = l.substring(0, h)),
                  (h = l.indexOf(':')),
                  0 <= h && (l = l.substring(0, h)),
                  0 <= m.indexOf(',' + l + ',') && (g += (g ? ',' : '') + k[f]);
            break;
          case 'events2':
            g = '';
            break;
          case 'contextData':
            c += a.o('c', a[e], n, e);
            g = '';
            break;
          case 'lightProfileID':
            e = 'mtp';
            break;
          case 'lightStoreForSeconds':
            e = 'mtss';
            a.lightProfileID || (g = '');
            break;
          case 'lightIncrementBy':
            e = 'mti';
            a.lightProfileID || (g = '');
            break;
          case 'retrieveLightProfiles':
            e = 'mtsr';
            break;
          case 'deleteLightProfiles':
            e = 'mtsd';
            break;
          case 'retrieveLightData':
            a.retrieveLightProfiles && (c += a.o('mts', a[e], n, e));
            g = '';
            break;
          default:
            a.Qa(k) &&
              ('prop' == f
                ? (e = 'c' + k)
                : 'eVar' == f
                ? (e = 'v' + k)
                : 'list' == f
                ? (e = 'l' + k)
                : 'hier' == f && ((e = 'h' + k), (g = g.substring(0, 255))));
        }
        g && (c += '&' + e + '=' + ('pev' != e.substring(0, 3) ? a.escape(g) : g));
      }
      'pev3' == e && a.e && (c += a.e);
    }
    a.ja && ((c += '&lrt=' + a.ja), (a.ja = null));
    return c;
  };
  a.B = function (a) {
    var b = a.tagName;
    if (
      'undefined' != '' + a.kc ||
      ('undefined' != '' + a.Yb && 'HTML' != ('' + a.Yb).toUpperCase())
    )
      return '';
    b = b && b.toUpperCase ? b.toUpperCase() : '';
    'SHAPE' == b && (b = '');
    b &&
      (('INPUT' == b || 'BUTTON' == b) && a.type && a.type.toUpperCase
        ? (b = a.type.toUpperCase())
        : !b && a.href && (b = 'A'));
    return b;
  };
  a.Ma = function (a) {
    var b = h.location,
      d = a.href ? a.href : '',
      f,
      e,
      g;
    f = d.indexOf(':');
    e = d.indexOf('?');
    g = d.indexOf('/');
    d &&
      (0 > f || (0 <= e && f > e) || (0 <= g && f > g)) &&
      ((e = a.protocol && 1 < a.protocol.length ? a.protocol : b.protocol ? b.protocol : ''),
      (f = b.pathname.lastIndexOf('/')),
      (d =
        (e ? e + '//' : '') +
        (a.host ? a.host : b.host ? b.host : '') +
        ('/' != d.substring(0, 1) ? b.pathname.substring(0, 0 > f ? 0 : f) + '/' : '') +
        d));
    return d;
  };
  a.L = function (c) {
    var b = a.B(c),
      d,
      f,
      e = '',
      g = 0;
    return b &&
      ((d = c.protocol),
      (f = c.onclick),
      !c.href ||
      ('A' != b && 'AREA' != b) ||
      (f && d && !(0 > d.toLowerCase().indexOf('javascript')))
        ? f
          ? ((e = a.replace(
              a.replace(a.replace(a.replace('' + f, '\r', ''), '\n', ''), '\t', ''),
              ' ',
              '',
            )),
            (g = 2))
          : 'INPUT' == b || 'SUBMIT' == b
          ? (c.value
              ? (e = c.value)
              : c.innerText
              ? (e = c.innerText)
              : c.textContent && (e = c.textContent),
            (g = 3))
          : 'IMAGE' == b && c.src && (e = c.src)
        : (e = a.Ma(c)),
      e)
      ? { id: e.substring(0, 100), type: g }
      : 0;
  };
  a.ic = function (c) {
    for (var b = a.B(c), d = a.L(c); c && !d && 'BODY' != b; )
      if ((c = c.parentElement ? c.parentElement : c.parentNode)) (b = a.B(c)), (d = a.L(c));
    (d && 'BODY' != b) || (c = 0);
    c &&
      ((b = c.onclick ? '' + c.onclick : ''),
      0 <= b.indexOf('.tl(') || 0 <= b.indexOf('.trackLink(')) &&
      (c = 0);
    return c;
  };
  a.Xb = function () {
    var c,
      b,
      d = a.linkObject,
      f = a.linkType,
      e = a.linkURL,
      g,
      k;
    a.la = 1;
    d || ((a.la = 0), (d = a.clickObject));
    if (d) {
      c = a.B(d);
      for (b = a.L(d); d && !b && 'BODY' != c; )
        if ((d = d.parentElement ? d.parentElement : d.parentNode)) (c = a.B(d)), (b = a.L(d));
      (b && 'BODY' != c) || (d = 0);
      if (d && !a.linkObject) {
        var l = d.onclick ? '' + d.onclick : '';
        if (0 <= l.indexOf('.tl(') || 0 <= l.indexOf('.trackLink(')) d = 0;
      }
    } else a.la = 1;
    !e && d && (e = a.Ma(d));
    e && !a.linkLeaveQueryString && ((g = e.indexOf('?')), 0 <= g && (e = e.substring(0, g)));
    if (!f && e) {
      var m = 0,
        n = 0,
        p;
      if (a.trackDownloadLinks && a.linkDownloadFileTypes)
        for (
          l = e.toLowerCase(),
            g = l.indexOf('?'),
            k = l.indexOf('#'),
            0 <= g ? 0 <= k && k < g && (g = k) : (g = k),
            0 <= g && (l = l.substring(0, g)),
            g = a.linkDownloadFileTypes.toLowerCase().split(','),
            k = 0;
          k < g.length;
          k++
        )
          (p = g[k]) && l.substring(l.length - (p.length + 1)) == '.' + p && (f = 'd');
      if (
        a.trackExternalLinks &&
        !f &&
        ((l = e.toLowerCase()),
        a.Pa(l) &&
          (a.linkInternalFilters || (a.linkInternalFilters = h.location.hostname),
          (g = 0),
          a.linkExternalFilters
            ? ((g = a.linkExternalFilters.toLowerCase().split(',')), (m = 1))
            : a.linkInternalFilters && (g = a.linkInternalFilters.toLowerCase().split(',')),
          g))
      ) {
        for (k = 0; k < g.length; k++) (p = g[k]), 0 <= l.indexOf(p) && (n = 1);
        n ? m && (f = 'e') : m || (f = 'e');
      }
    }
    a.linkObject = d;
    a.linkURL = e;
    a.linkType = f;
    if (a.trackClickMap || a.trackInlineStats)
      (a.e = ''),
        d &&
          ((f = a.pageName),
          (e = 1),
          (d = d.sourceIndex),
          f || ((f = a.pageURL), (e = 0)),
          h.s_objectID && ((b.id = h.s_objectID), (d = b.type = 1)),
          f &&
            b &&
            b.id &&
            c &&
            (a.e =
              '&pid=' +
              a.escape(f.substring(0, 255)) +
              (e ? '&pidt=' + e : '') +
              '&oid=' +
              a.escape(b.id.substring(0, 100)) +
              (b.type ? '&oidt=' + b.type : '') +
              '&ot=' +
              c +
              (d ? '&oi=' + d : '')));
  };
  a.Qb = function () {
    var c = a.la,
      b = a.linkType,
      d = a.linkURL,
      f = a.linkName;
    b &&
      (d || f) &&
      ((b = b.toLowerCase()),
      'd' != b && 'e' != b && (b = 'o'),
      (a.pe = 'lnk_' + b),
      (a.pev1 = d ? a.escape(d) : ''),
      (a.pev2 = f ? a.escape(f) : ''),
      (c = 1));
    a.abort && (c = 0);
    if (a.trackClickMap || a.trackInlineStats || a.Tb()) {
      var b = {},
        d = 0,
        e = a.qb(),
        g = e ? e.split('&') : 0,
        k,
        l,
        h,
        e = 0;
      if (g)
        for (k = 0; k < g.length; k++)
          (l = g[k].split('=')),
            (f = a.unescape(l[0]).split(',')),
            (l = a.unescape(l[1])),
            (b[l] = f);
      f = a.account.split(',');
      k = {};
      for (h in a.contextData)
        h &&
          !Object.prototype[h] &&
          'a.activitymap.' == h.substring(0, 14) &&
          ((k[h] = a.contextData[h]), (a.contextData[h] = ''));
      a.e = a.o('c', k) + (a.e ? a.e : '');
      if (c || a.e) {
        c && !a.e && (e = 1);
        for (l in b)
          if (!Object.prototype[l])
            for (h = 0; h < f.length; h++)
              for (
                e &&
                  ((g = b[l].join(',')),
                  g == a.account &&
                    ((a.e += ('&' != l.charAt(0) ? '&' : '') + l), (b[l] = []), (d = 1))),
                  k = 0;
                k < b[l].length;
                k++
              )
                (g = b[l][k]),
                  g == f[h] &&
                    (e &&
                      (a.e += '&u=' + a.escape(g) + ('&' != l.charAt(0) ? '&' : '') + l + '&u=0'),
                    b[l].splice(k, 1),
                    (d = 1));
        c || (d = 1);
        if (d) {
          e = '';
          k = 2;
          !c && a.e && ((e = a.escape(f.join(',')) + '=' + a.escape(a.e)), (k = 1));
          for (l in b)
            !Object.prototype[l] &&
              0 < k &&
              0 < b[l].length &&
              ((e += (e ? '&' : '') + a.escape(b[l].join(',')) + '=' + a.escape(l)), k--);
          a.yb(e);
        }
      }
    }
    return c;
  };
  a.qb = function () {
    if (a.useLinkTrackSessionStorage) {
      if (a.Da()) return h.sessionStorage.getItem(a.P);
    } else return a.cookieRead(a.P);
  };
  a.Da = function () {
    return h.sessionStorage ? !0 : !1;
  };
  a.yb = function (c) {
    a.useLinkTrackSessionStorage
      ? a.Da() && h.sessionStorage.setItem(a.P, c)
      : a.cookieWrite(a.P, c);
  };
  a.Rb = function () {
    if (!a.ac) {
      var c = new Date(),
        b = p.location,
        d,
        f,
        e = (f = d = ''),
        g = '',
        k = '',
        l = '1.2',
        h = a.cookieWrite('s_cc', 'true', 0) ? 'Y' : 'N',
        m = '',
        q = '';
      if (c.setUTCDate && ((l = '1.3'), (0).toPrecision && ((l = '1.5'), (c = []), c.forEach))) {
        l = '1.6';
        f = 0;
        d = {};
        try {
          (f = new Iterator(d)),
            f.next &&
              ((l = '1.7'),
              c.reduce &&
                ((l = '1.8'),
                l.trim &&
                  ((l = '1.8.1'), Date.parse && ((l = '1.8.2'), Object.create && (l = '1.8.5')))));
        } catch (r) {}
      }
      d = screen.width + 'x' + screen.height;
      e = navigator.javaEnabled() ? 'Y' : 'N';
      f = screen.pixelDepth ? screen.pixelDepth : screen.colorDepth;
      g = a.w.innerWidth ? a.w.innerWidth : a.d.documentElement.offsetWidth;
      k = a.w.innerHeight ? a.w.innerHeight : a.d.documentElement.offsetHeight;
      try {
        a.b.addBehavior('#default#homePage'), (m = a.b.jc(b) ? 'Y' : 'N');
      } catch (s) {}
      try {
        a.b.addBehavior('#default#clientCaps'), (q = a.b.connectionType);
      } catch (t) {}
      a.resolution = d;
      a.colorDepth = f;
      a.javascriptVersion = l;
      a.javaEnabled = e;
      a.cookiesEnabled = h;
      a.browserWidth = g;
      a.browserHeight = k;
      a.connectionType = q;
      a.homepage = m;
      a.ac = 1;
    }
  };
  a.Q = {};
  a.loadModule = function (c, b) {
    var d = a.Q[c];
    if (!d) {
      d = h['AppMeasurement_Module_' + c] ? new h['AppMeasurement_Module_' + c](a) : {};
      a.Q[c] = a[c] = d;
      d.jb = function () {
        return d.tb;
      };
      d.zb = function (b) {
        if ((d.tb = b)) (a[c + '_onLoad'] = b), a.ea(c + '_onLoad', [a, d], 1) || b(a, d);
      };
      try {
        Object.defineProperty
          ? Object.defineProperty(d, 'onLoad', { get: d.jb, set: d.zb })
          : (d._olc = 1);
      } catch (f) {
        d._olc = 1;
      }
    }
    b && ((a[c + '_onLoad'] = b), a.ea(c + '_onLoad', [a, d], 1) || b(a, d));
  };
  a.u = function (c) {
    var b, d;
    for (b in a.Q)
      if (
        !Object.prototype[b] &&
        (d = a.Q[b]) &&
        (d._olc && d.onLoad && ((d._olc = 0), d.onLoad(a, d)), d[c] && d[c]())
      )
        return 1;
    return 0;
  };
  a.Tb = function () {
    return a.ActivityMap && a.ActivityMap._c ? !0 : !1;
  };
  a.Ub = function () {
    var c = Math.floor(1e13 * Math.random()),
      b = a.visitorSampling,
      d = a.visitorSamplingGroup,
      d = 's_vsn_' + (a.visitorNamespace ? a.visitorNamespace : a.account) + (d ? '_' + d : ''),
      f = a.cookieRead(d);
    if (b) {
      b *= 100;
      f && (f = parseInt(f));
      if (!f) {
        if (!a.cookieWrite(d, c)) return 0;
        f = c;
      }
      if (f % 1e4 > b) return 0;
    }
    return 1;
  };
  a.S = function (c, b) {
    var d, f, e, g, k, h, m;
    m = {};
    for (d = 0; 2 > d; d++)
      for (f = 0 < d ? a.Fa : a.g, e = 0; e < f.length; e++)
        if (((g = f[e]), (k = c[g]) || c['!' + g])) {
          if (k && !b && ('contextData' == g || 'retrieveLightData' == g) && a[g])
            for (h in a[g]) k[h] || (k[h] = a[g][h]);
          a[g] || (m['!' + g] = 1);
          m[g] = a[g];
          a[g] = k;
        }
    return m;
  };
  a.gc = function (c) {
    var b, d, f, e;
    for (b = 0; 2 > b; b++)
      for (d = 0 < b ? a.Fa : a.g, f = 0; f < d.length; f++)
        (e = d[f]),
          (c[e] = a[e]),
          c[e] ||
            ('prop' !== e.substring(0, 4) &&
              'eVar' !== e.substring(0, 4) &&
              'hier' !== e.substring(0, 4) &&
              'list' !== e.substring(0, 4) &&
              'channel' !== e &&
              'events' !== e &&
              'eventList' !== e &&
              'products' !== e &&
              'productList' !== e &&
              'purchaseID' !== e &&
              'transactionID' !== e &&
              'state' !== e &&
              'zip' !== e &&
              'campaign' !== e &&
              'events2' !== e &&
              'latitude' !== e &&
              'longitude' !== e &&
              'ms_a' !== e &&
              'contextData' !== e &&
              'supplementalDataID' !== e &&
              'tnt' !== e &&
              'timestamp' !== e &&
              'abort' !== e &&
              'useBeacon' !== e &&
              'linkObject' !== e &&
              'clickObject' !== e &&
              'linkType' !== e &&
              'linkName' !== e &&
              'linkURL' !== e &&
              'bodyClickTarget' !== e &&
              'bodyClickFunction' !== e) ||
            (c['!' + e] = 1);
  };
  a.Lb = function (a) {
    var b,
      d,
      f,
      e,
      g,
      k = 0,
      h,
      m = '',
      n = '';
    if (
      a &&
      255 < a.length &&
      ((b = '' + a),
      (d = b.indexOf('?')),
      0 < d &&
        ((h = b.substring(d + 1)),
        (b = b.substring(0, d)),
        (e = b.toLowerCase()),
        (f = 0),
        'http://' == e.substring(0, 7) ? (f += 7) : 'https://' == e.substring(0, 8) && (f += 8),
        (d = e.indexOf('/', f)),
        0 < d &&
          ((e = e.substring(f, d)),
          (g = b.substring(d)),
          (b = b.substring(0, d)),
          0 <= e.indexOf('google')
            ? (k = ',q,ie,start,search_key,word,kw,cd,')
            : 0 <= e.indexOf('yahoo.co')
            ? (k = ',p,ei,')
            : 0 <= e.indexOf('baidu.') && (k = ',wd,word,'),
          k && h)))
    ) {
      if ((a = h.split('&')) && 1 < a.length) {
        for (f = 0; f < a.length; f++)
          (e = a[f]),
            (d = e.indexOf('=')),
            0 < d && 0 <= k.indexOf(',' + e.substring(0, d) + ',')
              ? (m += (m ? '&' : '') + e)
              : (n += (n ? '&' : '') + e);
        m && n ? (h = m + '&' + n) : (n = '');
      }
      d = 253 - (h.length - n.length) - b.length;
      a = b + (0 < d ? g.substring(0, d) : '') + '?' + h;
    }
    return a;
  };
  a.cb = function (c) {
    var b = a.d.visibilityState,
      d = ['webkitvisibilitychange', 'visibilitychange'];
    b || (b = a.d.webkitVisibilityState);
    if (b && 'prerender' == b) {
      if (c)
        for (b = 0; b < d.length; b++)
          a.d.addEventListener(d[b], function () {
            var b = a.d.visibilityState;
            b || (b = a.d.webkitVisibilityState);
            'visible' == b && c();
          });
      return !1;
    }
    return !0;
  };
  a.ba = !1;
  a.H = !1;
  a.Bb = function () {
    a.H = !0;
    a.p();
  };
  a.I = !1;
  a.Cb = function (c) {
    a.marketingCloudVisitorID = c.MCMID;
    a.visitorOptedOut = c.MCOPTOUT;
    a.analyticsVisitorID = c.MCAID;
    a.audienceManagerLocationHint = c.MCAAMLH;
    a.audienceManagerBlob = c.MCAAMB;
    a.I = !1;
    a.p();
  };
  a.bb = function (c) {
    a.maxDelay || (a.maxDelay = 250);
    return a.u('_d')
      ? (c &&
          setTimeout(function () {
            c();
          }, a.maxDelay),
        !1)
      : !0;
  };
  a.Z = !1;
  a.G = !1;
  a.za = function () {
    a.G = !0;
    a.p();
  };
  a.isReadyToTrack = function () {
    var c = !0;
    if (!a.nb() || !a.lb()) return !1;
    a.pb() || (c = !1);
    a.sb() || (c = !1);
    return c;
  };
  a.nb = function () {
    a.ba || a.H || (a.cb(a.Bb) ? (a.H = !0) : (a.ba = !0));
    return a.ba && !a.H ? !1 : !0;
  };
  a.lb = function () {
    var c = a.va();
    if (c)
      if (a.ra || a.aa)
        if (a.ra) {
          if (!c.isApproved(c.Categories.ANALYTICS)) return !1;
        } else return !1;
      else return c.fetchPermissions(a.ub, !0), (a.aa = !0), !1;
    return !0;
  };
  a.V = function (c) {
    var b = a.va();
    return b && !b.isApproved(b.Categories[c]) ? !1 : !0;
  };
  a.va = function () {
    return h.adobe && h.adobe.optIn ? h.adobe.optIn : null;
  };
  a.Y = !0;
  a.pb = function () {
    var c = a.T();
    if (!c || !c.getVisitorValues) return !0;
    a.Y && ((a.Y = !1), a.I || ((a.I = !0), c.getVisitorValues(a.Cb)));
    return !a.I;
  };
  a.T = function () {
    var c = a.visitor;
    c && !c.isAllowed() && (c = null);
    return c;
  };
  a.sb = function () {
    a.Z || a.G || (a.bb(a.za) ? (a.G = !0) : (a.Z = !0));
    return a.Z && !a.G ? !1 : !0;
  };
  a.aa = !1;
  a.ub = function () {
    a.aa = !1;
    a.ra = !0;
  };
  a.j = q;
  a.q = 0;
  a.callbackWhenReadyToTrack = function (c, b, d) {
    var f;
    f = {};
    f.Gb = c;
    f.Fb = b;
    f.Db = d;
    a.j == q && (a.j = []);
    a.j.push(f);
    0 == a.q && (a.q = setInterval(a.p, 100));
  };
  a.p = function () {
    var c;
    if (a.isReadyToTrack() && (a.Ab(), a.j != q))
      for (; 0 < a.j.length; ) (c = a.j.shift()), c.Fb.apply(c.Gb, c.Db);
  };
  a.Ab = function () {
    a.q && (clearInterval(a.q), (a.q = 0));
  };
  a.ta = function (c) {
    var b,
      d = {};
    a.gc(d);
    if (c != q) for (b in c) d[b] = c[b];
    a.callbackWhenReadyToTrack(a, a.Ea, [d]);
    a.Ca();
  };
  a.Nb = function () {
    var c = a.cookieRead('s_fid'),
      b = '',
      d = '',
      f;
    f = 8;
    var e = 4;
    if (!c || 0 > c.indexOf('-')) {
      for (c = 0; 16 > c; c++)
        (f = Math.floor(Math.random() * f)),
          (b += '0123456789ABCDEF'.substring(f, f + 1)),
          (f = Math.floor(Math.random() * e)),
          (d += '0123456789ABCDEF'.substring(f, f + 1)),
          (f = e = 16);
      c = b + '-' + d;
    }
    a.cookieWrite('s_fid', c, 1) || (c = 0);
    return c;
  };
  a.Ea = function (c) {
    var b = new Date(),
      d = 's' + (Math.floor(b.getTime() / 108e5) % 10) + Math.floor(1e13 * Math.random()),
      f = b.getYear(),
      f =
        't=' +
        a.escape(
          b.getDate() +
            '/' +
            b.getMonth() +
            '/' +
            (1900 > f ? f + 1900 : f) +
            ' ' +
            b.getHours() +
            ':' +
            b.getMinutes() +
            ':' +
            b.getSeconds() +
            ' ' +
            b.getDay() +
            ' ' +
            b.getTimezoneOffset(),
        ),
      e = a.T(),
      g;
    c && (g = a.S(c, 1));
    a.Ub() &&
      !a.visitorOptedOut &&
      (a.wa() || (a.fid = a.Nb()),
      a.Xb(),
      a.usePlugins && a.doPlugins && a.doPlugins(a),
      a.account &&
        (a.abort ||
          (a.trackOffline && !a.timestamp && (a.timestamp = Math.floor(b.getTime() / 1e3)),
          (c = h.location),
          a.pageURL || (a.pageURL = c.href ? c.href : c),
          a.referrer ||
            a.Za ||
            ((c = a.Util.getQueryParam('adobe_mc_ref', null, null, !0)),
            (a.referrer = c || void 0 === c ? (void 0 === c ? '' : c) : p.document.referrer)),
          (a.Za = 1),
          (a.referrer = a.Lb(a.referrer)),
          a.u('_g')),
        a.Qb() &&
          !a.abort &&
          (e &&
            a.V('TARGET') &&
            !a.supplementalDataID &&
            e.getSupplementalDataID &&
            (a.supplementalDataID = e.getSupplementalDataID(
              'AppMeasurement:' + a._in,
              a.expectSupplementalData ? !1 : !0,
            )),
          a.V('AAM') || (a.contextData['cm.ssf'] = 1),
          a.Rb(),
          a.vb(),
          (f += a.Pb()),
          a.rb(d, f),
          a.u('_t'),
          (a.referrer = ''))));
    a.Ca();
    g && a.S(g, 1);
  };
  a.t = a.track = function (c, b) {
    b && a.S(b);
    a.Y = !0;
    a.isReadyToTrack() ? (null != a.j && 0 < a.j.length ? (a.ta(c), a.p()) : a.Ea(c)) : a.ta(c);
  };
  a.vb = function () {
    a.writeSecureCookies && !a.ssl && a.$a();
  };
  a.$a = function () {
    a.contextData.excCodes = a.contextData.excCodes ? a.contextData.excCodes : [];
    a.contextData.excCodes.push(1);
  };
  a.Ca = function () {
    a.abort =
      a.supplementalDataID =
      a.timestamp =
      a.pageURLRest =
      a.linkObject =
      a.clickObject =
      a.linkURL =
      a.linkName =
      a.linkType =
      h.s_objectID =
      a.pe =
      a.pev1 =
      a.pev2 =
      a.pev3 =
      a.e =
      a.lightProfileID =
      a.useBeacon =
      a.referrer =
        0;
    a.contextData && a.contextData.excCodes && (a.contextData.excCodes = 0);
  };
  a.Ba = [];
  a.registerPreTrackCallback = function (c) {
    for (var b = [], d = 1; d < arguments.length; d++) b.push(arguments[d]);
    'function' == typeof c
      ? a.Ba.push([c, b])
      : a.debugTracking && a.C('DEBUG: Non function type passed to registerPreTrackCallback');
  };
  a.gb = function (c) {
    a.ua(a.Ba, c);
  };
  a.Aa = [];
  a.registerPostTrackCallback = function (c) {
    for (var b = [], d = 1; d < arguments.length; d++) b.push(arguments[d]);
    'function' == typeof c
      ? a.Aa.push([c, b])
      : a.debugTracking && a.C('DEBUG: Non function type passed to registerPostTrackCallback');
  };
  a.fb = function (c) {
    a.ua(a.Aa, c);
  };
  a.ua = function (c, b) {
    if ('object' == typeof c)
      for (var d = 0; d < c.length; d++) {
        var f = c[d][0],
          e = c[d][1].slice();
        e.unshift(b);
        if ('function' == typeof f)
          try {
            f.apply(null, e);
          } catch (g) {
            a.debugTracking && a.C(g.message);
          }
      }
  };
  a.tl = a.trackLink = function (c, b, d, f, e) {
    a.linkObject = c;
    a.linkType = b;
    a.linkName = d;
    e && ((a.bodyClickTarget = c), (a.bodyClickFunction = e));
    return a.track(f);
  };
  a.trackLight = function (c, b, d, f) {
    a.lightProfileID = c;
    a.lightStoreForSeconds = b;
    a.lightIncrementBy = d;
    return a.track(f);
  };
  a.clearVars = function () {
    var c, b;
    for (c = 0; c < a.g.length; c++)
      if (
        ((b = a.g[c]),
        'prop' == b.substring(0, 4) ||
          'eVar' == b.substring(0, 4) ||
          'hier' == b.substring(0, 4) ||
          'list' == b.substring(0, 4) ||
          'channel' == b ||
          'events' == b ||
          'eventList' == b ||
          'products' == b ||
          'productList' == b ||
          'purchaseID' == b ||
          'transactionID' == b ||
          'state' == b ||
          'zip' == b ||
          'campaign' == b)
      )
        a[b] = void 0;
  };
  a.tagContainerMarker = '';
  a.rb = function (c, b) {
    var d =
      a.hb() +
      '/' +
      c +
      '?AQB=1&ndh=1&pf=1&' +
      (a.ya() ? 'callback=s_c_il[' + a._in + '].doPostbacks&et=1&' : '') +
      b +
      '&AQE=1';
    a.gb(d);
    a.eb(d);
    a.U();
  };
  a.hb = function () {
    var c = a.ib();
    return (
      'http' +
      (a.ssl ? 's' : '') +
      '://' +
      c +
      '/b/ss/' +
      a.account +
      '/' +
      (a.mobile ? '5.' : '') +
      (a.ya() ? '10' : '1') +
      '/JS-' +
      a.version +
      (a.$b ? 'T' : '') +
      (a.tagContainerMarker ? '-' + a.tagContainerMarker : '')
    );
  };
  a.ya = function () {
    return (a.AudienceManagement && a.AudienceManagement.isReady()) || 0 != a.usePostbacks;
  };
  a.ib = function () {
    var c = a.dc,
      b = a.trackingServer;
    b
      ? a.trackingServerSecure && a.ssl && (b = a.trackingServerSecure)
      : ((c = c ? ('' + c).toLowerCase() : 'd1'),
        'd1' == c ? (c = '112') : 'd2' == c && (c = '122'),
        (b = a.kb() + '.' + c + '.2o7.net'));
    return b;
  };
  a.kb = function () {
    var c = a.visitorNamespace;
    c || ((c = a.account.split(',')[0]), (c = c.replace(/[^0-9a-z]/gi, '')));
    return c;
  };
  a.Ya = /{(%?)(.*?)(%?)}/;
  a.fc = RegExp(a.Ya.source, 'g');
  a.Kb = function (c) {
    if ('object' == typeof c.dests)
      for (var b = 0; b < c.dests.length; ++b) {
        var d = c.dests[b];
        if ('string' == typeof d.c && 'aa.' == d.id.substr(0, 3))
          for (var f = d.c.match(a.fc), e = 0; e < f.length; ++e) {
            var g = f[e],
              k = g.match(a.Ya),
              h = '';
            '%' == k[1] && 'timezone_offset' == k[2]
              ? (h = new Date().getTimezoneOffset())
              : '%' == k[1] && 'timestampz' == k[2] && (h = a.Ob());
            d.c = d.c.replace(g, a.escape(h));
          }
      }
  };
  a.Ob = function () {
    var c = new Date(),
      b = new Date(6e4 * Math.abs(c.getTimezoneOffset()));
    return (
      a.k(4, c.getFullYear()) +
      '-' +
      a.k(2, c.getMonth() + 1) +
      '-' +
      a.k(2, c.getDate()) +
      'T' +
      a.k(2, c.getHours()) +
      ':' +
      a.k(2, c.getMinutes()) +
      ':' +
      a.k(2, c.getSeconds()) +
      (0 < c.getTimezoneOffset() ? '-' : '+') +
      a.k(2, b.getUTCHours()) +
      ':' +
      a.k(2, b.getUTCMinutes())
    );
  };
  a.k = function (a, b) {
    return (Array(a + 1).join(0) + b).slice(-a);
  };
  a.pa = {};
  a.doPostbacks = function (c) {
    if ('object' == typeof c)
      if (
        (a.Kb(c),
        'object' == typeof a.AudienceManagement &&
          'function' == typeof a.AudienceManagement.isReady &&
          a.AudienceManagement.isReady() &&
          'function' == typeof a.AudienceManagement.passData)
      )
        a.AudienceManagement.passData(c);
      else if ('object' == typeof c && 'object' == typeof c.dests)
        for (var b = 0; b < c.dests.length; ++b) {
          var d = c.dests[b];
          'object' == typeof d &&
            'string' == typeof d.c &&
            'string' == typeof d.id &&
            'aa.' == d.id.substr(0, 3) &&
            ((a.pa[d.id] = new Image()), (a.pa[d.id].alt = ''), (a.pa[d.id].src = d.c));
        }
  };
  a.eb = function (c) {
    a.i || a.Sb();
    a.i.push(c);
    a.ia = a.A();
    a.Xa();
  };
  a.Sb = function () {
    a.i = a.Vb();
    a.i || (a.i = []);
  };
  a.Vb = function () {
    var c, b;
    if (a.oa()) {
      try {
        (b = h.localStorage.getItem(a.ma())) && (c = h.JSON.parse(b));
      } catch (d) {}
      return c;
    }
  };
  a.oa = function () {
    var c = !0;
    (a.trackOffline && a.offlineFilename && h.localStorage && h.JSON) || (c = !1);
    return c;
  };
  a.Na = function () {
    var c = 0;
    a.i && (c = a.i.length);
    a.l && c++;
    return c;
  };
  a.U = function () {
    if (a.l && (a.v && a.v.complete && a.v.D && a.v.R(), a.l)) return;
    a.Oa = q;
    if (a.na) a.ia > a.N && a.Va(a.i), a.qa(500);
    else {
      var c = a.Eb();
      if (0 < c) a.qa(c);
      else if ((c = a.La())) (a.l = 1), a.Wb(c), a.Zb(c);
    }
  };
  a.qa = function (c) {
    a.Oa || (c || (c = 0), (a.Oa = setTimeout(a.U, c)));
  };
  a.Eb = function () {
    var c;
    if (!a.trackOffline || 0 >= a.offlineThrottleDelay) return 0;
    c = a.A() - a.Ta;
    return a.offlineThrottleDelay < c ? 0 : a.offlineThrottleDelay - c;
  };
  a.La = function () {
    if (0 < a.i.length) return a.i.shift();
  };
  a.Wb = function (c) {
    if (a.debugTracking) {
      var b = 'AppMeasurement Debug: ' + c;
      c = c.split('&');
      var d;
      for (d = 0; d < c.length; d++) b += '\n\t' + a.unescape(c[d]);
      a.C(b);
    }
  };
  a.wa = function () {
    return a.marketingCloudVisitorID || a.analyticsVisitorID;
  };
  a.X = !1;
  var t;
  try {
    t = JSON.parse('{"x":"y"}');
  } catch (v) {
    t = null;
  }
  t && 'y' == t.x
    ? ((a.X = !0),
      (a.W = function (a) {
        return JSON.parse(a);
      }))
    : h.$ && h.$.parseJSON
    ? ((a.W = function (a) {
        return h.$.parseJSON(a);
      }),
      (a.X = !0))
    : (a.W = function () {
        return null;
      });
  a.Zb = function (c) {
    var b, d, f;
    a.mb(c) &&
      ((d = 1),
      (b = {
        send: function (c) {
          a.useBeacon = !1;
          navigator.sendBeacon(c) ? b.R() : b.ga();
        },
      }));
    !b &&
      a.wa() &&
      2047 < c.length &&
      (a.ab() && ((d = 2), (b = new XMLHttpRequest())),
      b &&
        ((a.AudienceManagement && a.AudienceManagement.isReady()) || 0 != a.usePostbacks) &&
        (a.X ? (b.Ga = !0) : (b = 0)));
    !b && a.ec && (c = c.substring(0, 2047));
    !b &&
      a.d.createElement &&
      (0 != a.usePostbacks || (a.AudienceManagement && a.AudienceManagement.isReady())) &&
      (b = a.d.createElement('SCRIPT')) &&
      'async' in b &&
      ((f = (f = a.d.getElementsByTagName('HEAD')) && f[0] ? f[0] : a.d.body)
        ? ((b.type = 'text/javascript'), b.setAttribute('async', 'async'), (d = 3))
        : (b = 0));
    b ||
      ((b = new Image()),
      (b.alt = ''),
      b.abort ||
        'undefined' === typeof h.InstallTrigger ||
        (b.abort = function () {
          b.src = q;
        }));
    b.Ua = Date.now();
    b.Ia = function () {
      try {
        b.D && (clearTimeout(b.D), (b.D = 0));
      } catch (a) {}
    };
    b.onload = b.R = function () {
      b.Ua && (a.ja = Date.now() - b.Ua);
      a.fb(c);
      b.Ia();
      a.Ib();
      a.ca();
      a.l = 0;
      a.U();
      if (b.Ga) {
        b.Ga = !1;
        try {
          a.doPostbacks(a.W(b.responseText));
        } catch (d) {}
      }
    };
    b.onabort =
      b.onerror =
      b.ga =
        function () {
          b.Ia();
          (a.trackOffline || a.na) && a.l && a.i.unshift(a.Hb);
          a.l = 0;
          a.ia > a.N && a.Va(a.i);
          a.ca();
          a.qa(500);
        };
    b.onreadystatechange = function () {
      4 == b.readyState && (200 == b.status ? b.R() : b.ga());
    };
    a.Ta = a.A();
    if (1 === d) b.send(c);
    else if (2 === d)
      (f = c.indexOf('?')),
        (d = c.substring(0, f)),
        (f = c.substring(f + 1)),
        (f = f.replace(/&callback=[a-zA-Z0-9_.\[\]]+/, '')),
        b.open('POST', d, !0),
        (b.withCredentials = !0),
        b.send(f);
    else if (((b.src = c), 3 === d)) {
      if (a.Ra)
        try {
          f.removeChild(a.Ra);
        } catch (e) {}
      f.firstChild ? f.insertBefore(b, f.firstChild) : f.appendChild(b);
      a.Ra = a.v;
    }
    b.D = setTimeout(function () {
      b.D && (b.complete ? b.R() : (a.trackOffline && b.abort && b.abort(), b.ga()));
    }, 5e3);
    a.Hb = c;
    a.v = h['s_i_' + a.replace(a.account, ',', '_')] = b;
    if ((a.useForcedLinkTracking && a.J) || a.bodyClickFunction)
      a.forcedLinkTrackingTimeout || (a.forcedLinkTrackingTimeout = 250),
        (a.da = setTimeout(a.ca, a.forcedLinkTrackingTimeout));
  };
  a.mb = function (c) {
    var b = !1;
    navigator.sendBeacon && (a.ob(c) ? (b = !0) : a.useBeacon && (b = !0));
    a.xb(c) && (b = !1);
    return b;
  };
  a.ob = function (a) {
    return a && 0 < a.indexOf('pe=lnk_e') ? !0 : !1;
  };
  a.xb = function (a) {
    return 64e3 <= a.length;
  };
  a.ab = function () {
    return 'undefined' !== typeof XMLHttpRequest && 'withCredentials' in new XMLHttpRequest()
      ? !0
      : !1;
  };
  a.Ib = function () {
    if (a.oa() && !(a.Sa > a.N))
      try {
        h.localStorage.removeItem(a.ma()), (a.Sa = a.A());
      } catch (c) {}
  };
  a.Va = function (c) {
    if (a.oa()) {
      a.Xa();
      try {
        h.localStorage.setItem(a.ma(), h.JSON.stringify(c)), (a.N = a.A());
      } catch (b) {}
    }
  };
  a.Xa = function () {
    if (a.trackOffline) {
      if (!a.offlineLimit || 0 >= a.offlineLimit) a.offlineLimit = 10;
      for (; a.i.length > a.offlineLimit; ) a.La();
    }
  };
  a.forceOffline = function () {
    a.na = !0;
  };
  a.forceOnline = function () {
    a.na = !1;
  };
  a.ma = function () {
    return a.offlineFilename + '-' + a.visitorNamespace + a.account;
  };
  a.A = function () {
    return new Date().getTime();
  };
  a.Pa = function (a) {
    a = a.toLowerCase();
    return 0 != a.indexOf('#') &&
      0 != a.indexOf('about:') &&
      0 != a.indexOf('opera:') &&
      0 != a.indexOf('javascript:')
      ? !0
      : !1;
  };
  a.setTagContainer = function (c) {
    var b, d, f;
    a.$b = c;
    for (b = 0; b < a._il.length; b++)
      if ((d = a._il[b]) && 's_l' == d._c && d.tagContainerName == c) {
        a.S(d);
        if (d.lmq) for (b = 0; b < d.lmq.length; b++) (f = d.lmq[b]), a.loadModule(f.n);
        if (d.ml)
          for (f in d.ml)
            if (a[f])
              for (b in ((c = a[f]), (f = d.ml[f]), f))
                !Object.prototype[b] &&
                  ('function' != typeof f[b] || 0 > ('' + f[b]).indexOf('s_c_il')) &&
                  (c[b] = f[b]);
        if (d.mmq)
          for (b = 0; b < d.mmq.length; b++)
            (f = d.mmq[b]),
              a[f.m] &&
                ((c = a[f.m]),
                c[f.f] &&
                  'function' == typeof c[f.f] &&
                  (f.a ? c[f.f].apply(c, f.a) : c[f.f].apply(c)));
        if (d.tq) for (b = 0; b < d.tq.length; b++) a.track(d.tq[b]);
        d.s = a;
        break;
      }
  };
  a.Util = {
    urlEncode: a.escape,
    urlDecode: a.unescape,
    cookieRead: a.cookieRead,
    cookieWrite: a.cookieWrite,
    getQueryParam: function (c, b, d, f) {
      var e,
        g = '';
      b || (b = a.pageURL ? a.pageURL : h.location);
      d = d ? d : '&';
      if (!c || !b) return g;
      b = '' + b;
      e = b.indexOf('?');
      if (0 > e) return g;
      b = d + b.substring(e + 1) + d;
      if (!f || !(0 <= b.indexOf(d + c + d) || 0 <= b.indexOf(d + c + '=' + d))) {
        e = b.indexOf('#');
        0 <= e && (b = b.substr(0, e) + d);
        e = b.indexOf(d + c + '=');
        if (0 > e) return g;
        b = b.substring(e + d.length + c.length + 1);
        e = b.indexOf(d);
        0 <= e && (b = b.substring(0, e));
        0 < b.length && (g = a.unescape(b));
        return g;
      }
    },
    getIeVersion: function () {
      return document.documentMode ? document.documentMode : a.xa() ? 7 : null;
    },
  };
  a.F =
    'supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL customerPerspective referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData'.split(
      ' ',
    );
  a.g = a.F.concat(
    'purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt'.split(
      ' ',
    ),
  );
  a.ka =
    'timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy'.split(
      ' ',
    );
  a.O = a.ka.slice(0);
  a.Fa =
    'account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout writeSecureCookies useLinkTrackSessionStorage trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData useBeacon usePostbacks registerPreTrackCallback registerPostTrackCallback bodyClickTarget bodyClickFunction AudienceManagement'.split(
      ' ',
    );
  for (m = 0; 250 >= m; m++)
    76 > m && (a.g.push('prop' + m), a.O.push('prop' + m)),
      a.g.push('eVar' + m),
      a.O.push('eVar' + m),
      6 > m && a.g.push('hier' + m),
      4 > m && a.g.push('list' + m);
  m =
    'pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest marketingCloudOrgID ms_a'.split(
      ' ',
    );
  a.g = a.g.concat(m);
  a.F = a.F.concat(m);
  a.ssl = 0 <= h.location.protocol.toLowerCase().indexOf('https');
  a.charSet = 'UTF-8';
  a.contextData = {};
  a.writeSecureCookies = !1;
  a.offlineThrottleDelay = 0;
  a.offlineFilename = 'AppMeasurement.offline';
  a.P = 's_sq';
  a.Ta = 0;
  a.ia = 0;
  a.N = 0;
  a.Sa = 0;
  a.linkDownloadFileTypes = 'exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx';
  a.w = h;
  a.d = h.document;
  a.ca = function () {
    a.da && (h.clearTimeout(a.da), (a.da = q));
    a.bodyClickTarget && a.J && a.bodyClickTarget.dispatchEvent(a.J);
    a.bodyClickFunction &&
      ('function' == typeof a.bodyClickFunction
        ? a.bodyClickFunction()
        : a.bodyClickTarget && a.bodyClickTarget.href && (a.d.location = a.bodyClickTarget.href));
    a.bodyClickTarget = a.J = a.bodyClickFunction = 0;
  };
  a.Wa = function () {
    a.b = a.d.body;
    a.b
      ? ((a.r = function (c) {
          var b, d, f, e, g;
          if (!((a.d && a.d.getElementById('cppXYctnr')) || (c && c['s_fe_' + a._in]))) {
            if (a.Ha)
              if (a.useForcedLinkTracking) a.b.removeEventListener('click', a.r, !1);
              else {
                a.b.removeEventListener('click', a.r, !0);
                a.Ha = a.useForcedLinkTracking = 0;
                return;
              }
            else a.useForcedLinkTracking = 0;
            a.clickObject = c.srcElement ? c.srcElement : c.target;
            try {
              if (
                !a.clickObject ||
                (a.M && a.M == a.clickObject) ||
                !(a.clickObject.tagName || a.clickObject.parentElement || a.clickObject.parentNode)
              )
                a.clickObject = 0;
              else {
                var k = (a.M = a.clickObject);
                a.ha && (clearTimeout(a.ha), (a.ha = 0));
                a.ha = setTimeout(function () {
                  a.M == k && (a.M = 0);
                }, 1e4);
                f = a.Na();
                a.track();
                if (f < a.Na() && a.useForcedLinkTracking && c.target) {
                  for (
                    e = c.target;
                    e &&
                    e != a.b &&
                    'A' != e.tagName.toUpperCase() &&
                    'AREA' != e.tagName.toUpperCase();

                  )
                    e = e.parentNode;
                  if (
                    e &&
                    ((g = e.href),
                    a.Pa(g) || (g = 0),
                    (d = e.target),
                    c.target.dispatchEvent &&
                      g &&
                      (!d ||
                        '_self' == d ||
                        '_top' == d ||
                        '_parent' == d ||
                        (h.name && d == h.name)))
                  ) {
                    try {
                      b = a.d.createEvent('MouseEvents');
                    } catch (l) {
                      b = new h.MouseEvent();
                    }
                    if (b) {
                      try {
                        b.initMouseEvent(
                          'click',
                          c.bubbles,
                          c.cancelable,
                          c.view,
                          c.detail,
                          c.screenX,
                          c.screenY,
                          c.clientX,
                          c.clientY,
                          c.ctrlKey,
                          c.altKey,
                          c.shiftKey,
                          c.metaKey,
                          c.button,
                          c.relatedTarget,
                        );
                      } catch (m) {
                        b = 0;
                      }
                      b &&
                        ((b['s_fe_' + a._in] = b.s_fe = 1),
                        c.stopPropagation(),
                        c.stopImmediatePropagation && c.stopImmediatePropagation(),
                        c.preventDefault(),
                        (a.bodyClickTarget = c.target),
                        (a.J = b));
                    }
                  }
                }
              }
            } catch (n) {
              a.clickObject = 0;
            }
          }
        }),
        a.b && a.b.attachEvent
          ? a.b.attachEvent('onclick', a.r)
          : a.b &&
            a.b.addEventListener &&
            (navigator &&
              ((0 <= navigator.userAgent.indexOf('WebKit') && a.d.createEvent) ||
                (0 <= navigator.userAgent.indexOf('Firefox/2') && h.MouseEvent)) &&
              ((a.Ha = 1), (a.useForcedLinkTracking = 1), a.b.addEventListener('click', a.r, !0)),
            a.b.addEventListener('click', a.r, !1)))
      : setTimeout(a.Wa, 30);
  };
  a.ec = a.xa();
  a.Jb();
  a.lc ||
    (r ? a.setAccount(r) : a.C('Error, missing Report Suite ID in AppMeasurement initialization'),
    a.Wa(),
    a.loadModule('ActivityMap'));
}
function s_gi(r) {
  var a,
    h = window.s_c_il,
    q,
    p,
    m = r.split(','),
    s,
    u,
    t = 0;
  if (h)
    for (q = 0; !t && q < h.length; ) {
      a = h[q];
      if ('s_c' == a._c && (a.account || a.oun))
        if (a.account && a.account == r) t = 1;
        else
          for (
            p = a.account ? a.account : a.oun,
              p = a.allAccounts ? a.allAccounts : p.split(','),
              s = 0;
            s < m.length;
            s++
          )
            for (u = 0; u < p.length; u++) m[s] == p[u] && (t = 1);
      q++;
    }
  t ? a.setAccount && a.setAccount(r) : (a = new AppMeasurement(r));
  return a;
}
AppMeasurement.getInstance = s_gi;
window.s_objectID || (window.s_objectID = 0);
function s_pgicq() {
  var r = window,
    a = r.s_giq,
    h,
    q,
    p;
  if (a)
    for (h = 0; h < a.length; h++)
      (q = a[h]), (p = s_gi(q.oun)), p.setAccount(q.un), p.setTagContainer(q.tagContainerName);
  r.s_giq = 0;
}
s_pgicq();

/*************************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2019 Adobe
 * All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 **************************************************************************/
/*
 * MediaSDK - 2.2.1 - 2019-10-09
 * Copyright (c) 2019 Adobe. All Rights Reserved.
 *
 * Copyright for external libraries used in Media SDK
 * JavaScript MD5 1.0.1
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 *
 *
 * umdjs (commonjsStrict.js)
 * Copyright (c) the UMD contributors
 * Licensed under the MIT license:
 * https://github.com/umdjs/umd/blob/master/LICENSE.md
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    factory(exports);
  } else {
    factory((root.ADB = {}));
  }
})(typeof self !== 'undefined' ? self : this, function (exports) {
  var lib = {};
  (function () {
    // Heartbeat core
    !(function (a) {
      if (void 0 === b) var b = {};
      if (void 0 === c) var c = {};
      if (void 0 === d) var d = {};
      if ((d.radio || (d.radio = {}), d.plugin || (d.plugin = {}), void 0 === e)) var e = {};
      e.clock || (e.clock = {}),
        (function (a) {
          'use strict';
          function b(a, b) {
            var c = (65535 & a) + (65535 & b);
            return (((a >> 16) + (b >> 16) + (c >> 16)) << 16) | (65535 & c);
          }
          function c(a, b) {
            return (a << b) | (a >>> (32 - b));
          }
          function d(a, d, e, f, g, h) {
            return b(c(b(b(d, a), b(f, h)), g), e);
          }
          function e(a, b, c, e, f, g, h) {
            return d((b & c) | (~b & e), a, b, f, g, h);
          }
          function f(a, b, c, e, f, g, h) {
            return d((b & e) | (c & ~e), a, b, f, g, h);
          }
          function g(a, b, c, e, f, g, h) {
            return d(b ^ c ^ e, a, b, f, g, h);
          }
          function h(a, b, c, e, f, g, h) {
            return d(c ^ (b | ~e), a, b, f, g, h);
          }
          function i(a, c) {
            (a[c >> 5] |= 128 << c % 32), (a[14 + (((c + 64) >>> 9) << 4)] = c);
            var d,
              i,
              j,
              k,
              l,
              m = 1732584193,
              n = -271733879,
              o = -1732584194,
              p = 271733878;
            for (d = 0; d < a.length; d += 16)
              (i = m),
                (j = n),
                (k = o),
                (l = p),
                (m = e(m, n, o, p, a[d], 7, -680876936)),
                (p = e(p, m, n, o, a[d + 1], 12, -389564586)),
                (o = e(o, p, m, n, a[d + 2], 17, 606105819)),
                (n = e(n, o, p, m, a[d + 3], 22, -1044525330)),
                (m = e(m, n, o, p, a[d + 4], 7, -176418897)),
                (p = e(p, m, n, o, a[d + 5], 12, 1200080426)),
                (o = e(o, p, m, n, a[d + 6], 17, -1473231341)),
                (n = e(n, o, p, m, a[d + 7], 22, -45705983)),
                (m = e(m, n, o, p, a[d + 8], 7, 1770035416)),
                (p = e(p, m, n, o, a[d + 9], 12, -1958414417)),
                (o = e(o, p, m, n, a[d + 10], 17, -42063)),
                (n = e(n, o, p, m, a[d + 11], 22, -1990404162)),
                (m = e(m, n, o, p, a[d + 12], 7, 1804603682)),
                (p = e(p, m, n, o, a[d + 13], 12, -40341101)),
                (o = e(o, p, m, n, a[d + 14], 17, -1502002290)),
                (n = e(n, o, p, m, a[d + 15], 22, 1236535329)),
                (m = f(m, n, o, p, a[d + 1], 5, -165796510)),
                (p = f(p, m, n, o, a[d + 6], 9, -1069501632)),
                (o = f(o, p, m, n, a[d + 11], 14, 643717713)),
                (n = f(n, o, p, m, a[d], 20, -373897302)),
                (m = f(m, n, o, p, a[d + 5], 5, -701558691)),
                (p = f(p, m, n, o, a[d + 10], 9, 38016083)),
                (o = f(o, p, m, n, a[d + 15], 14, -660478335)),
                (n = f(n, o, p, m, a[d + 4], 20, -405537848)),
                (m = f(m, n, o, p, a[d + 9], 5, 568446438)),
                (p = f(p, m, n, o, a[d + 14], 9, -1019803690)),
                (o = f(o, p, m, n, a[d + 3], 14, -187363961)),
                (n = f(n, o, p, m, a[d + 8], 20, 1163531501)),
                (m = f(m, n, o, p, a[d + 13], 5, -1444681467)),
                (p = f(p, m, n, o, a[d + 2], 9, -51403784)),
                (o = f(o, p, m, n, a[d + 7], 14, 1735328473)),
                (n = f(n, o, p, m, a[d + 12], 20, -1926607734)),
                (m = g(m, n, o, p, a[d + 5], 4, -378558)),
                (p = g(p, m, n, o, a[d + 8], 11, -2022574463)),
                (o = g(o, p, m, n, a[d + 11], 16, 1839030562)),
                (n = g(n, o, p, m, a[d + 14], 23, -35309556)),
                (m = g(m, n, o, p, a[d + 1], 4, -1530992060)),
                (p = g(p, m, n, o, a[d + 4], 11, 1272893353)),
                (o = g(o, p, m, n, a[d + 7], 16, -155497632)),
                (n = g(n, o, p, m, a[d + 10], 23, -1094730640)),
                (m = g(m, n, o, p, a[d + 13], 4, 681279174)),
                (p = g(p, m, n, o, a[d], 11, -358537222)),
                (o = g(o, p, m, n, a[d + 3], 16, -722521979)),
                (n = g(n, o, p, m, a[d + 6], 23, 76029189)),
                (m = g(m, n, o, p, a[d + 9], 4, -640364487)),
                (p = g(p, m, n, o, a[d + 12], 11, -421815835)),
                (o = g(o, p, m, n, a[d + 15], 16, 530742520)),
                (n = g(n, o, p, m, a[d + 2], 23, -995338651)),
                (m = h(m, n, o, p, a[d], 6, -198630844)),
                (p = h(p, m, n, o, a[d + 7], 10, 1126891415)),
                (o = h(o, p, m, n, a[d + 14], 15, -1416354905)),
                (n = h(n, o, p, m, a[d + 5], 21, -57434055)),
                (m = h(m, n, o, p, a[d + 12], 6, 1700485571)),
                (p = h(p, m, n, o, a[d + 3], 10, -1894986606)),
                (o = h(o, p, m, n, a[d + 10], 15, -1051523)),
                (n = h(n, o, p, m, a[d + 1], 21, -2054922799)),
                (m = h(m, n, o, p, a[d + 8], 6, 1873313359)),
                (p = h(p, m, n, o, a[d + 15], 10, -30611744)),
                (o = h(o, p, m, n, a[d + 6], 15, -1560198380)),
                (n = h(n, o, p, m, a[d + 13], 21, 1309151649)),
                (m = h(m, n, o, p, a[d + 4], 6, -145523070)),
                (p = h(p, m, n, o, a[d + 11], 10, -1120210379)),
                (o = h(o, p, m, n, a[d + 2], 15, 718787259)),
                (n = h(n, o, p, m, a[d + 9], 21, -343485551)),
                (m = b(m, i)),
                (n = b(n, j)),
                (o = b(o, k)),
                (p = b(p, l));
            return [m, n, o, p];
          }
          function j(a) {
            var b,
              c = '';
            for (b = 0; b < 32 * a.length; b += 8)
              c += String.fromCharCode((a[b >> 5] >>> b % 32) & 255);
            return c;
          }
          function k(a) {
            var b,
              c = [];
            for (c[(a.length >> 2) - 1] = void 0, b = 0; b < c.length; b += 1) c[b] = 0;
            for (b = 0; b < 8 * a.length; b += 8)
              c[b >> 5] |= (255 & a.charCodeAt(b / 8)) << b % 32;
            return c;
          }
          function l(a) {
            return j(i(k(a), 8 * a.length));
          }
          function m(a, b) {
            var c,
              d,
              e = k(a),
              f = [],
              g = [];
            for (
              f[15] = g[15] = void 0, e.length > 16 && (e = i(e, 8 * a.length)), c = 0;
              c < 16;
              c += 1
            )
              (f[c] = 909522486 ^ e[c]), (g[c] = 1549556828 ^ e[c]);
            return (d = i(f.concat(k(b)), 512 + 8 * b.length)), j(i(g.concat(d), 640));
          }
          function n(a) {
            var b,
              c,
              d = '0123456789abcdef',
              e = '';
            for (c = 0; c < a.length; c += 1)
              (b = a.charCodeAt(c)), (e += d.charAt((b >>> 4) & 15) + d.charAt(15 & b));
            return e;
          }
          function o(a) {
            return unescape(encodeURIComponent(a));
          }
          function p(a) {
            return l(o(a));
          }
          function q(a) {
            return n(p(a));
          }
          function r(a, b) {
            return m(o(a), o(b));
          }
          function s(a, b) {
            return n(r(a, b));
          }
          function t(a, b, c) {
            return b ? (c ? r(b, a) : s(b, a)) : c ? p(a) : q(a);
          }
          a.md5 = t;
        })(b),
        (function (a) {
          'use strict';
          var b = {};
          (b.startsWith = function (a, b) {
            return 0 == a.indexOf(b);
          }),
            (a.StringUtils = b);
        })(b),
        (function (a) {
          'use strict';
          var b = {};
          (b.clone = function (a) {
            var b = {};
            for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
            return b;
          }),
            (b.merge = function (a, c) {
              var d = b.clone(a);
              for (var e in c) c.hasOwnProperty(e) && (d[e] = c[e]);
              return d;
            }),
            (b.append = function (a, b) {
              for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
            }),
            (a.ObjectUtils = b);
        })(b),
        (function (a) {
          'use strict';
          function b(a) {
            if (null == a) return !0;
            for (var b = 0; b < a.length; ++b) if (isNaN(a[b])) return !1;
            return !0;
          }
          function c(a, c) {
            if ('string' != typeof a || 'string' != typeof c) return NaN;
            var d = a.split('.'),
              e = c.split('.');
            if (!b(d) || !b(e)) return NaN;
            for (var f = Math.max(d.length, e.length), g = 0; g < f; ++g) {
              var h = void 0 != d[g] ? d[g] : '0',
                i = void 0 != e[g] ? e[g] : '0';
              if (((h = Number(h)), (i = Number(i)), h > i)) return 1;
              if (h < i) return -1;
            }
            return 0;
          }
          var d = {};
          (d.isGreaterThan = function (a, b) {
            return c(a, b) > 0;
          }),
            (d.isGreaterThanEqual = function (a, b) {
              return c(a, b) >= 0;
            }),
            (d.isLessThan = function (a, b) {
              return c(a, b) < 0;
            }),
            (d.isLessThanEqual = function (a, b) {
              return c(a, b) <= 0;
            }),
            (d.isSame = function (a, b) {
              return 0 === c(a, b);
            }),
            (d.isDifferent = function (a, b) {
              return 0 !== c(a, b);
            }),
            (a.VersionUtils = d);
        })(b),
        (function (a) {
          'use strict';
          function b(a, b, c) {
            (this.fn = a), (this.ctx = b), (this.params = c);
          }
          (b.prototype.run = function () {
            this.params ? this.fn.apply(this.ctx, this.params) : this.fn.apply(this.ctx);
          }),
            (a.radio.Command = b);
        })(d),
        (function (a) {
          'use strict';
          function b(a, b) {
            (this._queue = []),
              (this._lastTs = 0),
              (this._isSuspended = void 0 !== a && a),
              (this._delay = void 0 !== b ? b : 0);
          }
          (b.prototype.addCommand = function (a) {
            this._queue.push(a), this._drain();
          }),
            (b.prototype.cancelAllCommands = function () {
              this._queue = [];
            }),
            (b.prototype.isEmpty = function () {
              return 0 === this._queue.length;
            }),
            (b.prototype.suspend = function () {
              this._isSuspended = !0;
            }),
            (b.prototype.resume = function () {
              (this._isSuspended = !1), this._drain();
            }),
            (b.prototype.flush = function () {
              this._isSuspended = !1;
              for (var a = 0; a < this._queue.length; a++) {
                this._queue[a].run();
              }
              this._queue = [];
            }),
            (b.prototype._drain = function () {
              if (!this._isSuspended && !this._drainInProgress) {
                this._drainInProgress = !0;
                var a = this;
                !(function b() {
                  var c = a._queue.shift();
                  c
                    ? a._runCommand(c, function () {
                        a._isSuspended || b();
                      })
                    : (a._drainInProgress = !1);
                })();
              }
            }),
            (b.prototype._runCommand = function (a, b) {
              function c() {
                a.run(), null != b && b.call(d);
              }
              var d = this;
              if (0 == this._lastTs) c();
              else {
                var e = new Date().getTime(),
                  f = e - this._lastTs;
                (this._lastTs = e), f < this._delay ? setTimeout(c, this._delay - f) : c();
              }
            }),
            (a.radio.CommandQueue = b);
        })(d),
        (function (a) {
          'use strict';
          function b(a, b) {
            if (((this._name = a), !b))
              throw new Error('Reference to the logger object cannot be NULL');
            (this._logger = b),
              (this._listeners = {}),
              (this._requests = {}),
              (this._commands = {}),
              (this._isShutDown = !1);
          }
          function c(a, c) {
            if (a === c) return !0;
            for (
              var d = (a || '').split(b.SEPARATOR), e = (c || '').split(b.SEPARATOR), f = !0, g = 0;
              g < d.length;
              g++
            )
              f = f && (d[g] === b.WILDCARD || d[g] === e[g]);
            return f;
          }
          (b.WILDCARD = '*'),
            (b.SEPARATOR = ':'),
            (b.prototype.toString = function () {
              return '<channel: ' + this._name + '>';
            }),
            (b.prototype.shutdown = function () {
              this._isShutDown ||
                (this._logger.debug(d, '#shutdown > Shutting down'),
                this.off(),
                (this._requests = {}),
                (this._commands = {}),
                (this._isShutDown = !0));
            }),
            (b.prototype.on = function (a, b, c) {
              this._isShutDown ||
                (this._listeners[a] || (this._listeners[a] = []),
                this._listeners[a].push({ fn: b, ctx: c }));
            }),
            (b.prototype.off = function (a, b, c) {
              if (!this._isShutDown) {
                if (((b = 'function' == typeof b ? b : null), !a && null == b && !c))
                  return void (this._listeners = {});
                if (a) this._removeListener(a, b, c);
                else
                  for (a in this._listeners)
                    this._listeners.hasOwnProperty(a) && this._removeListener(a, b, c);
              }
            }),
            (b.prototype.trigger = function (a) {
              if (!this._isShutDown)
                for (var b in this._listeners)
                  if (this._listeners.hasOwnProperty(b) && c(b, a.name))
                    for (var d = this._listeners[b].slice(0), e = 0; e < d.length; e++) {
                      var f = d[e];
                      f.fn.call(f.ctx, a);
                    }
            }),
            (b.prototype.comply = function (a, b, c) {
              this._isShutDown || (this._commands[a] = { cmd: b, ctx: c });
            }),
            (b.prototype.command = function (a, b) {
              if (!this._isShutDown) {
                var c = this._commands[a];
                if (!c) return void this._logger.warn(d, '#command > No command handler for: ' + a);
                c.cmd.call(c.ctx, b);
              }
            }),
            (b.prototype.reply = function (a, b, c) {
              this._isShutDown || (this._requests[a] = { fn: b, ctx: c });
            }),
            (b.prototype.request = function (a) {
              if (!this._isShutDown) {
                var b = this._requests[a];
                return b
                  ? b.fn.call(b.ctx)
                  : (this._logger.warn(d, '#request > No request handler for: ' + a), null);
              }
            }),
            (b.prototype._removeListener = function (a, b, c) {
              b = 'function' == typeof b ? b : null;
              var d = this._listeners[a];
              if (d) {
                if (!d.length || (null == b && !c)) return void delete this._listeners[a];
                for (var e = 0; e < d.length; e++) {
                  var f = d[e];
                  (null !== b && b !== f.fn) ||
                    (c && c !== f.ctx) ||
                    this._listeners[a].splice(e, 1);
                }
              }
            });
          var d = 'radio::Channel';
          a.radio.Channel = b;
        })(d),
        (function (a) {
          'use strict';
          function b(a) {
            if (!a) throw new Error('Reference to the logger object cannot be NULL');
            (this._logger = a), (this._channels = {});
          }
          var c = a.radio.Channel;
          (b.prototype.channel = function (a) {
            return (
              this._channels[a] || (this._channels[a] = new c(a, this._logger)), this._channels[a]
            );
          }),
            (b.prototype.shutdown = function () {
              for (var a in this._channels)
                this._channels.hasOwnProperty(a) && this._channels[a].shutdown();
            }),
            (a.radio.Radio = b);
        })(d),
        (function (a) {
          'use strict';
          function b(a, b) {
            function c() {
              this.constructor = a;
            }
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
            return (
              (c.prototype = b.prototype), (a.prototype = new c()), (a.__super__ = b.prototype), a
            );
          }
          a.extend = b;
        })(d),
        (function (a) {
          'use strict';
          function b() {}
          (b.prototype.write = function (a) {
            throw new Error('Implementation error: Method must be overridden.');
          }),
            (a.ILogWriter = b);
        })(d),
        (function (a) {
          'use strict';
          function b() {}
          (b.prototype.write = function (a) {
            window.console && window.console.log && window.console.log(a);
          }),
            (a.LogWriter = b);
        })(d),
        (function (a) {
          'use strict';
          function b() {}
          (b.prototype.setLogWriter = function (a) {
            throw new Error('Implementation error: Method must be overridden.');
          }),
            (b.prototype.getLogWriter = function () {
              throw new Error('Implementation error: Method must be overridden.');
            }),
            (b.prototype.getEnabled = function () {
              throw new Error('Implementation error: Method must be overridden.');
            }),
            (b.prototype.enable = function () {
              throw new Error('Implementation error: Method must be overridden.');
            }),
            (b.prototype.disable = function () {
              throw new Error('Implementation error: Method must be overridden.');
            }),
            (b.prototype.debug = function (a, b) {
              throw new Error('Implementation error: Method must be overridden.');
            }),
            (b.prototype.info = function (a, b) {
              throw new Error('Implementation error: Method must be overridden.');
            }),
            (b.prototype.warn = function (a, b) {
              throw new Error('Implementation error: Method must be overridden.');
            }),
            (b.prototype.error = function (a, b) {
              throw new Error('Implementation error: Method must be overridden.');
            }),
            (a.ILogger = b);
        })(d),
        (function (a) {
          'use strict';
          function b() {
            this._logWriter = new d();
          }
          function c(a) {
            return a < 10 ? '00' + a : a < 100 ? '0' + a : '' + a;
          }
          var d = a.LogWriter;
          (b.prototype.setLogWriter = function (a) {
            if (!a) throw new Error('Reference to the ILogWriter object cannot be NULL');
            (this._logWriter = a), (this._enabled = !1);
          }),
            (b.prototype.getLogWriter = function () {
              return this._logWriter;
            }),
            (b.prototype.getEnabled = function () {
              return this._enabled;
            }),
            (b.prototype.enable = function () {
              this._enabled = !0;
            }),
            (b.prototype.disable = function () {
              this._enabled = !1;
            }),
            (b.prototype.debug = function (a, b) {
              this._log(a, f, b);
            }),
            (b.prototype.info = function (a, b) {
              this._log(a, e, b);
            }),
            (b.prototype.warn = function (a, b) {
              this._log(a, g, b);
            }),
            (b.prototype.error = function (a, b) {
              this._log(a, h, b);
            }),
            (b.prototype._log = function (a, b, d) {
              if (b == h || this._enabled) {
                var e = '',
                  f = new Date();
                (e += '[' + f.toTimeString() + '.' + c(f.getMilliseconds()) + '] [' + b + '] '),
                  (e += '[' + a + '] ' + d),
                  this._logWriter.write(e);
              }
            });
          var e = 'INFO',
            f = 'DEBUG',
            g = 'WARN',
            h = 'ERROR';
          a.Logger = b;
        })(d),
        (function (a) {
          'use strict';
          function b(a, b) {
            (this._pluginName = a), (this._eventName = b);
          }
          var c = a.radio.Channel;
          (b.prototype.getPluginName = function () {
            return this._pluginName;
          }),
            (b.prototype.getEventName = function () {
              return this._eventName;
            }),
            (b.prototype.getName = function () {
              return this._pluginName + c.SEPARATOR + this._eventName;
            }),
            (a.Trigger = b);
        })(d),
        (function (a) {
          'use strict';
          function b(a, b) {
            (this.name = a), (this.data = b);
          }
          (b.SUCCESS = 'success'),
            (b.ERROR = 'error'),
            (b.createFromTrigger = function (a) {
              return new b(a.getName());
            }),
            (a.Event = b);
        })(d),
        (function (a) {
          'use strict';
          function b() {
            this._events = {};
          }
          (b.prototype.addEventListener = function (a, b, c) {
            a &&
              b &&
              ((c = c || window),
              (this._events[a] = this._events[a] || []),
              this._events[a].push({ cb: b, ctx: c }));
          }),
            (b.prototype.removeEventListener = function (a, b, c) {
              if (a && b) {
                c = c || window;
                var d,
                  e,
                  f = !1;
                for (e in this._events)
                  if (a === e) {
                    f = !0;
                    break;
                  }
                if (f) {
                  for (d = this._events[e].length - 1; d >= 0; d--) {
                    var g = this._events[e][d];
                    b === g.cb && c === g.ctx && this._events[e].splice(d, 1);
                  }
                  this._events[e].length || delete this._events[e];
                }
              }
            }),
            (b.prototype.dispatchEvent = function (a) {
              if (a.name) {
                var b, c;
                for (b in this._events)
                  if (this._events.hasOwnProperty(b) && a.name === b) {
                    var d = this._events[b],
                      e = d.slice(0),
                      f = e.length;
                    for (c = 0; c < f; c++) e[c].cb.call(e[c].ctx, a);
                    break;
                  }
              }
            }),
            (b.prototype.removeAllListeners = function (a) {
              if (a) {
                var b, c;
                for (c in this._events)
                  if (this._events.hasOwnProperty(c)) {
                    for (b = this._events[c].length - 1; b >= 0; b--) {
                      var d = this._events[c][b];
                      d.ctx === a && this._events[c].splice(b, 1);
                    }
                    this._events[c].length || delete this._events[c];
                  }
              } else this._events = {};
            }),
            (a.EventDispatcher = b);
        })(d),
        (function (a) {
          'use strict';
          function b() {}
          function c(a, b) {
            (this.url = a || null), (this.method = b), (this._xmlhttp = null);
          }
          function d() {
            d.__super__.constructor.call(this), (this._connection = null);
          }
          var e = a.Event,
            f = a.EventDispatcher;
          (b.GET = 'GET'),
            (d.RESPONSE = 'response'),
            (d.INSTANCE = 'instance'),
            a.extend(d, f),
            (d.prototype.close = function () {
              this.removeAllListeners(null);
            }),
            (d.prototype.load = function (a) {
              a &&
                a.method &&
                a.url &&
                ((a._xmlhttp = this._createCORSRequest(a)),
                a._xmlhttp ? a._xmlhttp.send() : this._loadImage(a));
            }),
            (d.prototype._createCORSRequest = function (a) {
              var b = null;
              if (void 0 !== window.XMLHttpRequest) {
                var c = new window.XMLHttpRequest();
                'withCredentials' in c && ((b = c), b.open(a.method, a.url, !0));
              }
              if (
                (null == b &&
                  void 0 !== window.XDomainRequest &&
                  ((b = new window.XDomainRequest()), b.open(a.method, a.url)),
                b)
              ) {
                var f = {};
                f[d.INSTANCE] = this;
                var g = this;
                (b.onload = function () {
                  if (b.status && parseInt(b.status, 10) >= 400) return this.onerror();
                  (f[d.RESPONSE] = b.responseText), g.dispatchEvent(new e(e.SUCCESS, f));
                }),
                  (b.onerror = function () {
                    g.dispatchEvent(new e(e.ERROR, f));
                  });
              }
              return b;
            }),
            (d.prototype._loadImage = function (a) {
              this._connection || ((this._connection = new Image()), (this._connection.alt = '')),
                (this._connection.src = a.url);
              var b = {};
              (b[d.RESPONSE] = ''), (b[d.INSTANCE] = this), this.dispatchEvent(new e(e.SUCCESS, b));
            }),
            (a.URLRequestMethod = b),
            (a.URLRequest = c),
            (a.URLLoader = d);
        })(d),
        (function (a) {
          'use strict';
          var b = '2.2.1.229',
            c = '1bf77a',
            d = {};
          (d.getVersion = function () {
            return 'js-' + b + '-' + c;
          }),
            (d.getMajor = function () {
              return d.getNumberAtPosition(0);
            }),
            (d.getMinor = function () {
              return d.getNumberAtPosition(1);
            }),
            (d.getMicro = function () {
              return d.getNumberAtPosition(2);
            }),
            (d.getPatch = function () {
              return d.getNumberAtPosition(3);
            }),
            (d.getBuild = function () {
              return c;
            }),
            (d.getApiLevel = function () {
              return 4;
            }),
            (d.getNumberAtPosition = function (a) {
              return b.split('.')[a];
            }),
            (a.Version = d);
        })(c),
        (function (a) {
          'use strict';
          function b(a, b) {
            (this._message = a), (this._details = b);
          }
          (b.prototype.getMessage = function () {
            return this._message;
          }),
            (b.prototype.getDetails = function () {
              return this._details;
            }),
            (a.ErrorInfo = b);
        })(c),
        (function (a) {
          'use strict';
          function b() {
            this.debugLogging = !1;
          }
          a.HeartbeatConfig = b;
        })(c),
        (function (a) {
          'use strict';
          function b() {}
          (b.prototype.onError = function (a) {}), (a.HeartbeatDelegate = b);
        })(c),
        (function (a) {
          'use strict';
          function b() {}
          (b.prototype.configure = function (a) {
            throw new Error('Implementation error: Method must be overridden.');
          }),
            (b.prototype.bootstrap = function (a) {
              throw new Error('Implementation error: Method must be overridden.');
            }),
            (b.prototype.setup = function () {
              throw new Error('Implementation error: Method must be overridden.');
            }),
            (b.prototype.destroy = function () {
              throw new Error('Implementation error: Method must be overridden.');
            }),
            (b.prototype.enable = function () {
              throw new Error('Implementation error: Method must be overridden.');
            }),
            (b.prototype.disable = function () {
              throw new Error('Implementation error: Method must be overridden.');
            }),
            (b.prototype.getName = function () {
              throw new Error('Implementation error: Method must be overridden.');
            }),
            (b.prototype.isInitialized = function () {
              throw new Error('Implementation error: Method must be overridden.');
            }),
            (b.prototype.resolveData = function (a) {
              throw new Error('Implementation error: Method must be overridden.');
            }),
            (a.plugin.IPlugin = b);
        })(d),
        (function (a) {
          'use strict';
          function b(a, b, c, d) {
            (this.trigger = a),
              (this.action = c),
              (this.plugin = b),
              (this._paramMappings = {}),
              this.mergeParams(d);
          }
          var c = a.plugin.ParamMapping;
          (b.prototype.mergeParams = function (a) {
            if (a)
              for (var b = 0; b < a.length; b++) {
                var c = a[b];
                this._paramMappings[c.getKeyName()] = c;
              }
          }),
            (b.prototype.getParams = function () {
              var a = [];
              for (var b in this._paramMappings)
                this._paramMappings.hasOwnProperty(b) && a.push(this._paramMappings[b]);
              return a;
            }),
            (b.prototype.addParam = function (a) {
              this._paramMappings[a.getKeyName()] = a;
            }),
            (b.prototype.removeParam = function (a, b) {
              var d = new c(a, b);
              this._paramMappings.hasOwnProperty(d.getKeyName()) &&
                delete this._paramMappings[d.getKeyName()];
            }),
            (a.plugin.Behaviour = b);
        })(d),
        (function (a) {
          'use strict';
          function b(a, b, d) {
            (this._pluginName = a), (this._key = b), (this._paramName = d || a + c.SEPARATOR + b);
          }
          var c = a.radio.Channel;
          (b.prototype.getPluginName = function () {
            return this._pluginName;
          }),
            (b.prototype.getKey = function () {
              return this._key;
            }),
            (b.prototype.getKeyName = function () {
              return this._pluginName + c.SEPARATOR + this._key;
            }),
            (b.prototype.getParamName = function () {
              return this._paramName;
            }),
            (a.plugin.ParamMapping = b);
        })(d),
        (function (a) {
          'use strict';
          function b(a) {
            if (!a) throw new Error('Reference to the logger object cannot be NULL');
            (this._logger = a),
              (this._plugins = {}),
              (this._behaviours = {}),
              (this._radio = new d(this._logger)),
              (this._dataChannel = this._radio.channel(g)),
              (this._ctrlChannel = this._radio.channel(h));
          }
          var c = a.Event,
            d = a.radio.Radio,
            e = a.radio.Channel,
            f = a.plugin.Behaviour;
          (b.ERROR = 'error'),
            (b.prototype.addPlugin = function (a) {
              var b = a.getName();
              this._plugins[b] && this._logger.warn(i, '#addPlugin > Replacing plugin: ' + b),
                (this._plugins[b] = a),
                a.bootstrap(this);
            }),
            (b.prototype.setupPlugins = function () {
              for (var a in this._plugins)
                this._plugins.hasOwnProperty(a) && this._plugins[a].setup();
            }),
            (b.prototype.pluginExists = function (a) {
              return !!this._plugins[a];
            }),
            (b.prototype.isPluginInitialized = function (a) {
              return this._plugins[a] && this._plugins[a].isInitialized();
            }),
            (b.prototype.on = function (a, b, c, d) {
              this._dataChannel.on(a + e.SEPARATOR + b, c, d);
            }),
            (b.prototype.off = function (a, b, c, d) {
              var f = a && b ? a + e.SEPARATOR + b : null;
              this._dataChannel.off(f, c, d);
            }),
            (b.prototype.trigger = function (a) {
              var b = a.name,
                c = this._behaviours[b];
              if (c) {
                var d,
                  e,
                  f,
                  g,
                  h,
                  i = {},
                  j = {};
                for (d = 0; d < c.length; d++)
                  if (((f = c[d]), (g = f.getParams())))
                    for (e = 0; e < g.length; e++)
                      (h = g[e]),
                        (i[h.getPluginName()] = i[h.getPluginName()] || []),
                        h.key in i[h.getPluginName()] || i[h.getPluginName()].push(h.getKey());
                for (var k in i) i.hasOwnProperty(k) && (j[k] = this.request(k, i[k]));
                for (d = 0; d < c.length; d++) {
                  f = c[d];
                  var l = { _behaviour: f, _eventData: a.data || {} };
                  if ((g = f.getParams())) {
                    for (e = 0; e < g.length; e++)
                      (h = g[e]),
                        (l[h.getParamName()] = j[h.getPluginName()]
                          ? j[h.getPluginName()][h.getKey()]
                          : null);
                    this.command(f.plugin.getName(), f.action, l);
                  }
                }
              }
              this._dataChannel.trigger(a);
            }),
            (b.prototype.request = function (a, b) {
              var c = this._plugins[a];
              return c && b && 0 != b.length ? c.resolveData(b) : null;
            }),
            (b.prototype.raise = function (a) {
              this._errorInfo = a;
              var d = new c(b.ERROR, a);
              this._ctrlChannel.trigger(d);
            }),
            (b.prototype.getErrorInfo = function () {
              return this._errorInfo;
            }),
            (b.prototype.destroy = function () {
              this._radio.shutdown();
              for (var a in this._plugins)
                this._plugins.hasOwnProperty(a) && this._plugins[a].destroy();
            }),
            (b.prototype.comply = function (a, b, c) {
              this._dataChannel.comply(a.getName() + e.SEPARATOR + b, c, a);
            }),
            (b.prototype.command = function (a, b, c) {
              this._dataChannel.command(a + e.SEPARATOR + b, c);
            }),
            (b.prototype.registerBehaviour = function (a, b, c, d) {
              var e = a.getName(),
                g = new f(a, b, c, d);
              (this._behaviours[e] = this._behaviours[e] || []), this._behaviours[e].push(g);
            });
          var g = 'data_channel',
            h = 'ctrl_channel',
            i = 'plugin::PluginManager';
          a.plugin.PluginManager = b;
        })(d),
        (function (a, b) {
          'use strict';
          function c(a) {
            (this._name = a),
              (this._isInitialized = !1),
              (this._isDestroyed = !1),
              (this._isEnabled = !0),
              (this._dataResolver = {}),
              (this._logTag = 'plugin::' + this.getName()),
              (this._logger = new d());
          }
          var d = a.Logger,
            e = a.Trigger,
            f = a.Event,
            g = b.ErrorInfo;
          (c.INITIALIZED = 'initialized'),
            (c.prototype.configure = function (a) {}),
            (c.prototype.bootstrap = function (a) {
              (this._pluginManager = a),
                this._isDestroyed &&
                  this._pluginManager.raise(new g('Invalid state.', 'Plugin already destroyed.'));
            }),
            (c.prototype.setup = function () {
              this._trigger(c.INITIALIZED), (this._isInitialized = !0);
            }),
            (c.prototype.destroy = function () {
              this._isDestroyed || ((this._isDestroyed = !0), this._teardown());
            }),
            (c.prototype.enable = function () {
              (this._isEnabled = !0), this._enabled();
            }),
            (c.prototype.disable = function () {
              (this._isEnabled = !1), this._disabled();
            }),
            (c.prototype.getName = function () {
              return this._name;
            }),
            (c.prototype.getLogger = function () {
              return this._logger;
            }),
            (c.prototype.isInitialized = function () {
              return this._isInitialized;
            }),
            (c.prototype.resolveData = function (a) {
              if (!this._isEnabled || !this._isInitialized)
                return (
                  this._logger.warn(
                    this._logTag,
                    'Unable to retrieve plugin data. Plugin: ' +
                      this._name +
                      '. Enabled: ' +
                      this._isEnabled +
                      '. Initialized: ' +
                      this._isInitialized +
                      '.',
                  ),
                  null
                );
              if ('function' == typeof this._dataResolver) return this._dataResolver.call(this, a);
              var b = null;
              if (a)
                for (var c = 0; c < a.length; c++) {
                  var d = a[c];
                  this._dataResolver.hasOwnProperty(d) &&
                    ((b = b || {}),
                    'function' == typeof this._dataResolver[d]
                      ? (b[d] = this._dataResolver[d].call(this))
                      : (b[d] = this._dataResolver[d]));
                }
              return b;
            }),
            (c.prototype.toString = function () {
              return '<plugin: ' + this._name + '>';
            }),
            (c.prototype._enabled = function () {}),
            (c.prototype._disabled = function () {}),
            (c.prototype._teardown = function () {}),
            (c.prototype._canProcess = function () {
              return this._isEnabled
                ? !this._isDestroyed || (this._logger.error(this._logTag, 'Plugin destroyed.'), !1)
                : (this._logger.error(this._logTag, 'Plugin disabled.'), !1);
            }),
            (c.prototype._trigger = function (a, b) {
              var c = f.createFromTrigger(new e(this.getName(), a));
              (c.data = b), this._pluginManager.trigger(c);
            }),
            (a.plugin.BasePlugin = c);
        })(d, c),
        (function (a) {
          'use strict';
          function b(a, b, c) {
            (this.name = a),
              (this.interval = b),
              (this.isActive = !1),
              (this.repeatCount = void 0 !== c ? c : e),
              (this._nextTickTimestamp = 0),
              this.reset();
          }
          function c(a, b) {
            if (!a) throw new Error('Reference to the ClockService object cannot be NULL');
            if (((this._service = a), !b))
              throw new Error('Reference to the logger object cannot be NULL');
            (this._logger = b), (this._isDestroyed = !1), (this._timers = {});
            var c = this;
            this._clock = window.setInterval(function () {
              c._onTick();
            }, 1e3 * f);
          }
          (b.prototype.reset = function () {
            (this.tick = 0),
              (this._createdTimestamp = new Date().getTime()),
              this._updateNextTickTimestamp();
          }),
            (b.prototype.shouldTick = function () {
              return (
                new Date().getTime() > this._nextTickTimestamp - g / 2 &&
                (this.tick++, this._updateNextTickTimestamp(), !0)
              );
            }),
            (b.prototype._updateNextTickTimestamp = function () {
              var a = new Date().getTime();
              this._nextTickTimestamp = a + 1e3 * this.interval - 1;
            }),
            (c.prototype.createTimer = function (a, c, d) {
              this._timers[a] = new b(a, c, d);
            }),
            (c.prototype.destroyTimer = function (a) {
              delete this._timers[a];
            }),
            (c.prototype.resumeTimer = function (a, b) {
              (b = void 0 !== b && b),
                this._logger.debug(d, '#resumeTimer(name=' + a + ', reset=' + b + ')');
              var c = this._timers[a];
              c && ((c.isActive = !0), b && c.reset());
            }),
            (c.prototype.pauseTimer = function (a, b) {
              (b = void 0 !== b && b),
                this._logger.debug(d, '#pauseTimer(name=' + a + ', reset=' + b + ')');
              var c = this._timers[a];
              c && ((c.isActive = !1), b && c.reset());
            }),
            (c.prototype.isTimerPaused = function (a) {
              var b = this._timers[a];
              return !!b && !b.isActive;
            }),
            (c.prototype.destroy = function () {
              this._isDestroyed ||
                ((this._isDestroyed = !0), (this._timers = {}), window.clearInterval(this._clock));
            }),
            (c.prototype._onTick = function () {
              for (var a in this._timers)
                if (this._timers.hasOwnProperty(a)) {
                  var b = this._timers[a];
                  b.isActive &&
                    b.shouldTick() &&
                    (b.interval > 1 &&
                      this._logger.debug(
                        d,
                        '#_onTick() > ' + b.name + '(' + b.tick + ' | ' + b.repeatCount + ')',
                      ),
                    0 != b.repeatCount
                      ? (this._service.onTick(b.name, b.interval, b.tick),
                        b.repeatCount != e && b.repeatCount--)
                      : this.destroyTimer(b.name));
                }
            });
          var d = 'service.clock::TimerManager',
            e = -1,
            f = 0.25,
            g = 1e3 * f;
          (a.clock.TimerDescriptor = b), (a.clock.TimerManager = c);
        })(e),
        (function (a, b, c) {
          'use strict';
          function d(a) {
            if ((d.__super__.constructor.call(this, h), !a))
              throw new Error('Reference to the logger object cannot be NULL');
            (this._logger = a),
              (this._timerManager = new e(this, this._logger)),
              this._setupDataResolver();
          }
          var e = c.clock.TimerManager,
            f = b.StringUtils,
            g = a.plugin.BasePlugin;
          a.extend(d, g),
            (d.prototype.bootstrap = function (a) {
              d.__super__.bootstrap.call(this, a),
                this._pluginManager.comply(this, i, this._cmdCreate),
                this._pluginManager.comply(this, k, this._cmdResume),
                this._pluginManager.comply(this, j, this._cmdPause),
                this._pluginManager.comply(this, l, this._cmdDestroy);
            }),
            (d.prototype._teardown = function () {
              this._timerManager.destroy();
            }),
            (d.prototype._cmdCreate = function (a) {
              var b = a[o] || s;
              this._timerManager.createTimer(a[m], a[n], b);
            }),
            (d.prototype._cmdPause = function (a) {
              this._timerManager.pauseTimer(a[m], !!a[q]);
            }),
            (d.prototype._cmdResume = function (a) {
              this._timerManager.resumeTimer(a[m], !!a[q]);
            }),
            (d.prototype._cmdDestroy = function (a) {
              this._timerManager.destroyTimer(a[m]);
            }),
            (d.prototype.onTick = function (a, b, c) {
              a += '.tick';
              var d = {};
              (d[m] = a), (d[n] = b), (d[p] = c), this._trigger(a, d);
            }),
            (d.prototype._setupDataResolver = function () {
              var a = {},
                b = this._timerManager;
              (a[r] = function (a) {
                return b.isTimerPaused(a);
              }),
                (this._dataResolver = function (b) {
                  if (!b || 0 == b.length) return null;
                  for (var c = null, d = 0; d < b.length; d++) {
                    var e = b[d];
                    if (((c = c || {}), f.startsWith(e, r))) {
                      var g = e.split(r + '.');
                      g.length > 0 && (c[e] = a[r].call(this, g[1]));
                    }
                  }
                  return c;
                });
            });
          var h = 'service.clock',
            i = 'create',
            j = 'pause',
            k = 'resume',
            l = 'destroy',
            m = 'name',
            n = 'interval',
            o = 'repeat_count',
            p = 'tick',
            q = 'reset',
            r = 'is_paused',
            s = -1;
          c.clock.ClockService = d;
        })(d, b, e),
        (function (a, b, c) {
          'use strict';
          function d(a, b) {
            if (
              ((this._logger = new e()),
              (this._pluginManager = new f(this._logger)),
              this._pluginManager.addPlugin(new g(this._logger)),
              b)
            )
              for (var c = 0; c < b.length; c++) this._pluginManager.addPlugin(b[c]);
            this._pluginManager.setupPlugins(), (this._isDestroyed = !1);
          }
          var e = a.Logger,
            f = a.plugin.PluginManager,
            g = b.clock.ClockService;
          (d.prototype.configure = function (a) {
            if (!a) throw new Error('Configuration object cannot be NULL.');
            a.debugLogging ? this._logger.enable() : this._logger.disable(),
              this._isDestroyed && this._logger.error(h, 'Instance is destroyed.');
          }),
            (d.prototype.destroy = function () {
              this._isDestroyed || (this._pluginManager.destroy(), (this._isDestroyed = !0));
            });
          var h = 'Heartbeat';
          c.Heartbeat = d;
        })(d, e, c),
        a.ADB || (a.ADB = {}),
        a.ADB.core || (a.ADB.core = d),
        a.ADB.va || (a.ADB.va = c),
        a.ADB.va.utils || (a.ADB.va.utils = b),
        a.ADB.va.plugins || (a.ADB.va.plugins = {});
    })(this);

    // VideoPlayerPlugin
    !(function (a) {
      if (void 0 === b) var b = {};
      !(function (a) {
        'use strict';
        var b = {};
        (b.ASSET_TYPE_VOD = 'vod'),
          (b.ASSET_TYPE_LIVE = 'live'),
          (b.ASSET_TYPE_LINEAR = 'linear'),
          (a.AssetType = b);
      })(b),
        (function (a) {
          'use strict';
          function b() {
            (this.playerName = null),
              (this.name = null),
              (this.position = null),
              (this.startTime = null);
          }
          (b.prototype.toString = function () {
            return (
              'playerName=' +
              this.playerName +
              ', name=' +
              this.name +
              ', position=' +
              this.position +
              ', startTime=' +
              this.startTime
            );
          }),
            (a.AdBreakInfo = b);
        })(b),
        (function (a) {
          'use strict';
          function b() {
            (this.id = null),
              (this.name = null),
              (this.length = null),
              (this.position = null),
              (this.granularTracking = !0);
          }
          (b.prototype.toString = function () {
            return (
              'id=' +
              this.id +
              ', name=' +
              this.name +
              ', length=' +
              this.length +
              ', position=' +
              this.position +
              ', granularTracking=' +
              this.granularTracking
            );
          }),
            (a.AdInfo = b);
        })(b),
        (function (a) {
          'use strict';
          function b() {
            (this.name = null),
              (this.length = null),
              (this.position = null),
              (this.startTime = null);
          }
          (b.prototype.toString = function () {
            return (
              'name=' +
              this.name +
              ', length=' +
              this.length +
              ', position=' +
              this.position +
              ', startTime=' +
              this.startTime
            );
          }),
            (a.ChapterInfo = b);
        })(b),
        (function (a) {
          'use strict';
          function b() {
            (this.bitrate = null),
              (this.fps = null),
              (this.droppedFrames = null),
              (this.startupTime = null);
          }
          (b.prototype.toString = function () {
            return (
              'bitrate=' +
              this.bitrate +
              ', fps=' +
              this.fps +
              ', droppedFrames=' +
              this.droppedFrames +
              ', startupTime=' +
              this.startupTime
            );
          }),
            (a.QoSInfo = b);
        })(b),
        (function (a) {
          'use strict';
          function b() {
            (this.playerName = null),
              (this.id = null),
              (this.name = null),
              (this.length = null),
              (this.playhead = null),
              (this.mediaType = null),
              (this.streamType = null),
              (this.resumed = !1);
          }
          (b.prototype.toString = function () {
            return (
              'playerName=' +
              this.playerName +
              ', id=' +
              this.id +
              ', name=' +
              this.name +
              ', length=' +
              this.length +
              ', playhead=' +
              this.playhead +
              ', mediaType=' +
              this.mediaType +
              ', streamType=' +
              this.streamType +
              ', resumed=' +
              this.resumed
            );
          }),
            (a.VideoInfo = b);
        })(b),
        (function (a) {
          'use strict';
          function b() {
            this.debugLogging = !1;
          }
          a.VideoPlayerPluginConfig = b;
        })(b),
        (function (a) {
          'use strict';
          function b() {}
          (b.prototype.getVideoInfo = function () {
            throw new Error('Implementation error: Method must be overridden.');
          }),
            (b.prototype.getAdBreakInfo = function () {
              return null;
            }),
            (b.prototype.getAdInfo = function () {
              return null;
            }),
            (b.prototype.getChapterInfo = function () {
              return null;
            }),
            (b.prototype.getQoSInfo = function () {
              return null;
            }),
            (a.VideoPlayerPluginDelegate = b);
        })(b),
        (function (a, b) {
          'use strict';
          function c(a) {
            if ((c.__super__.constructor.call(this, h), !a))
              throw new Error('PlayerPlugin delegate cannot be NULL.');
            (this._delegate = a),
              (this._isTrackingSessionActive = !1),
              (this._isTrackingSessionStarted = !1),
              this._setupDataResolver();
          }
          var d = a.plugin.ParamMapping,
            e = a.Trigger,
            f = a.plugin.BasePlugin,
            g = b.VideoPlayerPluginConfig;
          a.extend(c, f),
            (c.prototype.configure = function (a) {
              if (!a) throw new Error('Reference to the configuration data cannot be NULL.');
              if (!(a instanceof g))
                throw new Error('Expected config data to be instance of VideoPlayerPluginConfig.');
              a.debugLogging ? this._logger.enable() : this._logger.disable(),
                this._logger.debug(this._logTag, '#configure(debugLogging=' + a.debugLogging + ')');
            }),
            (c.prototype.bootstrap = function (a) {
              c.__super__.bootstrap.call(this, a),
                this._registerCommands(),
                this._registerBehaviours();
            }),
            (c.prototype._cmdVideoIdleStart = function (a) {
              this._logger.info(this._logTag, '#_cmdVideoIdleStart()'), (this._videoIdle = !0);
            }),
            (c.prototype._cmdVideoIdleResume = function (a) {
              this._logger.info(this._logTag, '#_cmdVideoIdleResume()'),
                this._videoIdle &&
                  (this._trigger(p),
                  this._trigger(q),
                  a.isInAd && (this._trigger(x), (this._isTrackingAdBreak = !0)),
                  a.isInAd && (this._trigger(z), (this._isTrackingAd = !0)),
                  a.isInChapter && this._trigger(G),
                  this._trigger(u)),
                (this._videoIdle = !1);
            }),
            (c.prototype.trackSessionStart = function () {
              if ((this._logger.info(this._logTag, '#trackSessionStart()'), this._canProcess())) {
                if (!this._isTrackingSessionActive)
                  return void this._logger.warn(
                    this._logTag,
                    '#trackSessionStart() > No active tracking session.',
                  );
                if (this._isTrackingSessionStarted)
                  return void this._logger.info(
                    this._logTag,
                    '#trackSessionStart() > Tracking session already started.',
                  );
                this._trigger(p), (this._isTrackingSessionStarted = !0);
                var a = this._dataResolver(['video.resumed']);
                a.hasOwnProperty('video.resumed') && a['video.resumed'] && this._trigger(q);
              }
            }),
            (c.prototype.trackVideoLoad = function () {
              this._logger.info(this._logTag, '#trackVideoLoad()'),
                this._canProcess() &&
                  ((this._isTrackingAdBreak = !1),
                  (this._isTrackingAd = !1),
                  (this._contentStarted = !1),
                  (this._isPaused = !0),
                  (this._isBuffering = !1),
                  (this._isSeeking = !1),
                  (this._playheadTimer = null),
                  (this._previousPlayhead = -1),
                  (this._stalledPlayheadCount = 0),
                  (this._playheadStalled = !1),
                  (this._videoIdle = !1),
                  this._trigger(m),
                  (this._isTrackingSessionActive = !0),
                  (this._isTrackingSessionStarted = !1));
            }),
            (c.prototype.trackVideoUnload = function () {
              if ((this._logger.info(this._logTag, '#trackVideoUnload()'), this._canProcess())) {
                if (!this._isTrackingSessionActive)
                  return void this._logger.warn(
                    this._logTag,
                    '#trackVideoUnload() > No active tracking session.',
                  );
                this._stopPlayheadTimer(),
                  this._trigger(n),
                  (this._isTrackingSessionActive = !1),
                  (this._isTrackingSessionStarted = !1),
                  (this._contentStarted = !1);
              }
            }),
            (c.prototype.beginReporting = function () {
              this._logger.info(this._logTag, '#beginReporting()'),
                this._canProcess() &&
                  this._startSessionIfNeeded('beginReporting') &&
                  this._trigger(N);
            }),
            (c.prototype.trackPlay = function () {
              this._logger.info(this._logTag, '#trackPlay()'),
                this._canProcess() &&
                  this._startSessionIfNeeded('trackPlay') &&
                  this._allowPlayerStateChange() &&
                  ((this._isPaused = !1), this._trigger(u), this._startPlayheadTimer());
            }),
            (c.prototype.trackPause = function () {
              if (
                (this._logger.info(this._logTag, '#trackPause()'),
                this._canProcess() &&
                  this._startSessionIfNeeded('trackPause') &&
                  this._allowPlayerStateChange())
              ) {
                this._stopPlayheadTimer();
                var a = {};
                (a[P] = !1), (this._isPaused = !0), this._trigger(v, a);
              }
            }),
            (c.prototype.trackBufferStart = function () {
              this._logger.info(this._logTag, '#trackBufferStart()'),
                this._canProcess() &&
                  this._startSessionIfNeeded('trackBufferStart') &&
                  this._allowPlayerStateChange() &&
                  (this._stopPlayheadTimer(), (this._isBuffering = !0), this._trigger(C));
            }),
            (c.prototype.trackBufferComplete = function () {
              this._logger.info(this._logTag, '#trackBufferComplete()'),
                this._canProcess() &&
                  this._startSessionIfNeeded('trackBufferComplete') &&
                  this._allowPlayerStateChange() &&
                  ((this._isBuffering = !1), this._trigger(D), this._startPlayheadTimer());
            }),
            (c.prototype.trackSeekStart = function () {
              this._logger.info(this._logTag, '#trackSeekStart()'),
                this._canProcess() &&
                  this._startSessionIfNeeded('trackSeekStart') &&
                  this._allowPlayerStateChange() &&
                  (this._stopPlayheadTimer(), (this._isSeeking = !0), this._trigger(E));
            }),
            (c.prototype.trackSeekComplete = function () {
              this._logger.info(this._logTag, '#trackSeekComplete()'),
                this._canProcess() &&
                  this._startSessionIfNeeded('trackSeekComplete') &&
                  this._allowPlayerStateChange() &&
                  ((this._isSeeking = !1), this._trigger(F), this._startPlayheadTimer());
            }),
            (c.prototype.trackComplete = function (a, b) {
              if (
                (this._logger.info(this._logTag, '#trackComplete()'),
                this._canProcess() && this._startSessionIfNeeded('trackComplete'))
              ) {
                if ((this._stopPlayheadTimer(), this._videoIdle))
                  return (
                    this._logger.info(
                      this._logTag,
                      '#trackComplete() > Video session is already in Idle State.',
                    ),
                    void (a && a())
                  );
                var c = {};
                (c[O] = a),
                  (b = void 0 === b || !!b),
                  b ? this._trigger(r, c) : (this._trigger(s), this._trigger(o, c));
              }
            }),
            (c.prototype.trackTimedMetadata = function (a) {
              this._logger.info(this._logTag, '#trackComplete()'),
                this._canProcess() &&
                  this._startSessionIfNeeded('trackTimedMetadata') &&
                  this._trigger(t, a);
            }),
            (c.prototype.trackChapterStart = function () {
              this._logger.info(this._logTag, '#trackChapterStart()'),
                this._canProcess() &&
                  this._startSessionIfNeeded('#trackChapterStart') &&
                  this._trigger(G);
            }),
            (c.prototype.trackChapterComplete = function () {
              this._logger.info(this._logTag, '#trackChapterComplete()'),
                this._canProcess() &&
                  this._startSessionIfNeeded('trackChapterComplete') &&
                  this._trigger(H);
            }),
            (c.prototype.trackChapterSkip = function () {
              this._logger.info(this._logTag, '#trackChapterSkip()'),
                this._canProcess() &&
                  this._startSessionIfNeeded('trackChapterSkip') &&
                  this._trigger(I);
            }),
            (c.prototype.trackAdBreakStart = function () {
              this._logger.info(this._logTag, '#trackAdBreakStart()'),
                this._canProcess() &&
                  this._startSessionIfNeeded('trackAdBreakStart') &&
                  (this._trigger(x), (this._isTrackingAdBreak = !0));
            }),
            (c.prototype.trackAdBreakComplete = function () {
              this._logger.info(this._logTag, '#trackAdBreakComplete()'),
                this._canProcess() &&
                  this._startSessionIfNeeded('trackAdBreakComplete') &&
                  (this._trigger(y), (this._isTrackingAdBreak = !1));
            }),
            (c.prototype.trackAdStart = function () {
              this._logger.info(this._logTag, '#trackAdStart()'),
                this._canProcess() &&
                  this._startSessionIfNeeded('trackAdStart') &&
                  (this._trigger(z), (this._isTrackingAd = !0));
            }),
            (c.prototype.trackAdComplete = function () {
              this._logger.info(this._logTag, '#trackAdComplete()'),
                this._canProcess() &&
                  this._startSessionIfNeeded('trackAdComplete') &&
                  (this._trigger(A), (this._isTrackingAd = !1));
            }),
            (c.prototype.trackAdSkip = function () {
              this._logger.info(this._logTag, '#trackAdSkip()'),
                this._canProcess() &&
                  this._startSessionIfNeeded('trackAdSkip') &&
                  (this._trigger(B), (this._isTrackingAd = !1));
            }),
            (c.prototype.trackBitrateChange = function () {
              this._logger.info(this._logTag, '#trackBitrateChange()'),
                this._canProcess() &&
                  this._startSessionIfNeeded('trackBitrateChange') &&
                  this._trigger(J);
            }),
            (c.prototype.trackVideoPlayerError = function (a) {
              if (
                (this._logger.info(this._logTag, '#trackVideoPlayerError(errorId=' + a + ')'),
                this._startSessionIfNeeded('trackVideoPlayerError'))
              ) {
                var b = {};
                (b[Q] = l), (b[R] = a), this._trigger(K, b);
              }
            }),
            (c.prototype.trackApplicationError = function (a) {
              if (
                (this._logger.info(this._logTag, '#trackApplicationError(errorId=' + a + ')'),
                this._startSessionIfNeeded('trackApplicationError'))
              ) {
                var b = {};
                (b[Q] = k), (b[R] = a), this._trigger(K, b);
              }
            }),
            (c.prototype._registerCommands = function () {
              this._pluginManager.comply(this, 'handleVideoIdleStart', this._cmdVideoIdleStart),
                this._pluginManager.comply(this, 'handleVideoIdleResume', this._cmdVideoIdleResume);
            }),
            (c.prototype._registerBehaviours = function () {
              this._pluginManager.registerBehaviour(new e(j, L), this, 'handleVideoIdleStart'),
                this._pluginManager.registerBehaviour(new e(j, M), this, 'handleVideoIdleResume', [
                  new d(i, 'ad.isInAdBreak', 'isInAdBreak'),
                  new d(i, 'ad.isInAd', 'isInAd'),
                  new d(i, 'chapter.isInChapter', 'isInChapter'),
                ]);
            }),
            (c.prototype._setupDataResolver = function () {
              function a() {
                return g.video
                  ? g.video
                  : ((g.video = h._delegate.getVideoInfo()),
                    h._logger.info(h._logTag, 'Data from delegate > VideoInfo: ' + g.video),
                    g.video);
              }
              function b() {
                return g.ad
                  ? g.ad
                  : ((g.ad = h._delegate.getAdInfo()),
                    h._logger.info(h._logTag, 'Data from delegate > AdInfo: ' + g.ad),
                    g.ad);
              }
              function c() {
                return g.pod
                  ? g.pod
                  : ((g.pod = h._delegate.getAdBreakInfo()),
                    h._logger.info(h._logTag, 'Data from delegate > AdBreakInfo: ' + g.pod),
                    g.pod);
              }
              function d() {
                return g.chapter
                  ? g.chapter
                  : ((g.chapter = h._delegate.getChapterInfo()),
                    h._logger.info(h._logTag, 'Data from delegate > ChapterInfo: ' + g.chapter),
                    g.chapter);
              }
              function e() {
                return g.qos
                  ? g.qos
                  : ((g.qos = h._delegate.getQoSInfo()),
                    h._logger.info(h._logTag, 'Data from delegate > QoSInfo: ' + g.qos),
                    g.qos);
              }
              var f = {},
                g = {},
                h = this;
              (f['video.id'] = function () {
                var b = a(),
                  c = b ? b.id : null;
                return h._logger.debug(h._logTag, 'Resolving video.id: ' + c), c;
              }),
                (f['video.name'] = function () {
                  var b = a(),
                    c = b ? b.name : null;
                  return h._logger.debug(h._logTag, 'Resolving video.name: ' + c), c;
                }),
                (f['video.length'] = function () {
                  var b = a(),
                    c = b ? b.length : NaN;
                  return h._logger.debug(h._logTag, 'Resolving video.length: ' + c), c;
                }),
                (f['video.playerName'] = function () {
                  var b = a(),
                    c = b ? b.playerName : null;
                  return h._logger.debug(h._logTag, 'Resolving video.playerName: ' + c), c;
                }),
                (f['video.mediaType'] = function () {
                  var b = a(),
                    c = b ? b.mediaType : null;
                  return h._logger.debug(h._logTag, 'Resolving video.mediaType: ' + c), c;
                }),
                (f['video.streamType'] = function () {
                  var b = a(),
                    c = b ? b.streamType : null;
                  return h._logger.debug(h._logTag, 'Resolving video.streamType: ' + c), c;
                }),
                (f['video.playhead'] = function () {
                  var b = a(),
                    c = b ? b.playhead : NaN;
                  return h._logger.debug(h._logTag, 'Resolving video.playhead: ' + c), c;
                }),
                (f['video.resumed'] = function () {
                  var b = a(),
                    c = !!b && b.resumed;
                  return h._logger.debug(h._logTag, 'Resolving video.resumed: ' + c), c;
                }),
                (f['video.playheadStalled'] = function () {
                  return this._playheadStalled;
                }),
                (f['pod.name'] = function () {
                  var a = c(),
                    b = a ? a.name : null;
                  return h._logger.debug(h._logTag, 'Resolving pod.name: ' + b), b;
                }),
                (f['pod.playerName'] = function () {
                  var a = c(),
                    b = a ? a.playerName : null;
                  return h._logger.debug(h._logTag, 'Resolving pod.playerName: ' + b), b;
                }),
                (f['pod.position'] = function () {
                  var a = c(),
                    b = a ? a.position : NaN;
                  return h._logger.debug(h._logTag, 'Resolving pod.position: ' + b), b;
                }),
                (f['pod.startTime'] = function () {
                  var a = c(),
                    b = a ? a.startTime : NaN;
                  return h._logger.debug(h._logTag, 'Resolving pod.startTime: ' + b), b;
                }),
                (f['ad.isInAd'] = function () {
                  var a = b(),
                    c = null != a;
                  return h._logger.debug(h._logTag, 'Resolving ad.isInAd: ' + c), c;
                }),
                (f['ad.isInAdBreak'] = function () {
                  var a = c(),
                    b = null != a;
                  return h._logger.debug(h._logTag, 'Resolving ad.isInAdBreak: ' + b), b;
                }),
                (f['ad.id'] = function () {
                  var a = b(),
                    c = a ? a.id : null;
                  return h._logger.debug(h._logTag, 'Resolving ad.id: ' + c), c;
                }),
                (f['ad.name'] = function () {
                  var a = b(),
                    c = a ? a.name : null;
                  return h._logger.debug(h._logTag, 'Resolving ad.name: ' + c), c;
                }),
                (f['ad.length'] = function () {
                  var a = b(),
                    c = a ? a.length : NaN;
                  return h._logger.debug(h._logTag, 'Resolving ad.length: ' + c), c;
                }),
                (f['ad.position'] = function () {
                  var a = b(),
                    c = a ? a.position : NaN;
                  return h._logger.debug(h._logTag, 'Resolving ad.position: ' + c), c;
                }),
                (f['ad.granularTracking'] = function () {
                  var a = b(),
                    c = !!a && a.granularTracking;
                  return h._logger.debug(h._logTag, 'Resolving ad.granularTracking: ' + c), c;
                }),
                (f['ad.trackingInterval'] = function () {
                  var a = T;
                  return h._logger.debug(h._logTag, 'Resolving ad.trackingInterval: ' + a), a;
                }),
                (f['chapter.isInChapter'] = function () {
                  var a = d(),
                    b = null != a;
                  return h._logger.debug(h._logTag, 'Resolving chapter.isInChapter: ' + b), b;
                }),
                (f['chapter.name'] = function () {
                  var a = d(),
                    b = a ? a.name : null;
                  return h._logger.debug(h._logTag, 'Resolving chapter.name: ' + b), b;
                }),
                (f['chapter.length'] = function () {
                  var a = d(),
                    b = a ? a.length : NaN;
                  return h._logger.debug(h._logTag, 'Resolving chapter.length: ' + b), b;
                }),
                (f['chapter.position'] = function () {
                  var a = d(),
                    b = a ? a.position : NaN;
                  return h._logger.debug(h._logTag, 'Resolving chapter.position: ' + b), b;
                }),
                (f['chapter.startTime'] = function () {
                  var a = d(),
                    b = a ? a.startTime : NaN;
                  return h._logger.debug(h._logTag, 'Resolving chapter.startTime: ' + b), b;
                }),
                (f['qos.bitrate'] = function () {
                  var a = e(),
                    b = a ? a.bitrate : NaN;
                  return h._logger.debug(h._logTag, 'Resolving qos.bitrate: ' + b), b;
                }),
                (f['qos.fps'] = function () {
                  var a = e(),
                    b = a ? a.fps : NaN;
                  return h._logger.debug(h._logTag, 'Resolving qos.fps: ' + b), b;
                }),
                (f['qos.droppedFrames'] = function () {
                  var a = e(),
                    b = a ? a.droppedFrames : NaN;
                  return h._logger.debug(h._logTag, 'Resolving qos.droppedFrames: ' + b), b;
                }),
                (f['qos.startupTime'] = function () {
                  var a = e(),
                    b = a ? 1e3 * a.startupTime : NaN;
                  return h._logger.debug(h._logTag, 'Resolving qos.startupTime: ' + b), b;
                }),
                (this._dataResolver = function (a) {
                  if (!a || 0 == a.length) return null;
                  g = {};
                  for (var b = null, c = 0; c < a.length; c++) {
                    var d = a[c];
                    (b = b || {}), (b[d] = f.hasOwnProperty(d) ? f[d].call(this) : null);
                  }
                  return b;
                });
            }),
            (c.prototype._trackPlayheadStall = function () {
              this._canProcess() &&
                (this._playheadStalled ||
                  (this._logger.info(this._logTag, '#_trackPlayheadStall()'),
                  (this._stalledPlayheadCount = 0),
                  (this._playheadStalled = !0),
                  this._trigger(v)));
            }),
            (c.prototype._trackExitStall = function () {
              this._canProcess() &&
                ((this._stalledPlayheadCount = 0),
                !this._playheadStalled ||
                  this._isPaused ||
                  this._isSeeking ||
                  this._isBuffering ||
                  (this._logger.info(this._logTag, '#_trackExitStall()'),
                  (this._playheadStalled = !1),
                  this._trigger(u)));
            }),
            (c.prototype._startPlayheadTimer = function () {
              var a = this;
              this._playheadTimer ||
                this._isPaused ||
                this._isSeeking ||
                this._isBuffering ||
                (this._playheadTimer = setInterval(function () {
                  if (a._canProcess()) {
                    var b = a._dataResolver(['ad.isInAd', 'video.playhead']);
                    if (a._isTrackingAdBreak) a._playheadStalled && a._trackExitStall();
                    else {
                      var c = b['video.playhead'];
                      c != a._previousPlayhead
                        ? a._trackExitStall()
                        : a._previousPlayhead >= 0 &&
                          c == a._previousPlayhead &&
                          ++a._stalledPlayheadCount == U &&
                          a._trackPlayheadStall(),
                        c != a._previousPlayhead &&
                          c > 0 &&
                          !a._contentStarted &&
                          (a._isPaused ||
                            a._isBuffering ||
                            a._isSeeking ||
                            (a._logger.info(
                              a._logTag,
                              '#_playheadTimer playhead progress to: ' + c,
                            ),
                            a._trigger(w),
                            (a._contentStarted = !0))),
                        (a._previousPlayhead = c);
                    }
                  }
                }, S));
            }),
            (c.prototype._stopPlayheadTimer = function () {
              this._playheadTimer &&
                (clearInterval(this._playheadTimer), (this._playheadTimer = null)),
                this._trackExitStall();
            }),
            (c.prototype._startSessionIfNeeded = function (a) {
              return this._isTrackingSessionActive
                ? (this._isTrackingSessionStarted ||
                    (this._logger.info(this._logTag, '#' + a + '() > Tracking session auto-start.'),
                    this.trackSessionStart()),
                  !0)
                : (this._logger.warn(this._logTag, '#' + a + '() > No active tracking session.'),
                  !1);
            }),
            (c.prototype._allowPlayerStateChange = function () {
              return (
                !(this._isTrackingAdBreak && !this._isTrackingAd) ||
                (this._logger.info(
                  this._logTag,
                  '_allowPlayerStateChange Player plugin does not allow player state changes when in Adbreak and not in Ad.',
                ),
                !1)
              );
            });
          var h = 'player',
            i = h,
            j = 'adobe-heartbeat',
            k = 'sourceErrorExternal',
            l = 'sourceErrorSDK',
            m = 'video_load',
            n = 'video_unload',
            o = 'video_session_end',
            p = 'video_start',
            q = 'video_resume',
            r = 'video_complete',
            s = 'video_skip',
            t = 'timed_metadata',
            u = 'play',
            v = 'pause',
            w = 'content_start',
            x = 'adbreak_start',
            y = 'adbreak_complete',
            z = 'ad_start',
            A = 'ad_complete',
            B = 'ad_skip',
            C = 'buffer_start',
            D = 'buffer_complete',
            E = 'seek_start',
            F = 'seek_complete',
            G = 'chapter_start',
            H = 'chapter_complete',
            I = 'chapter_skip',
            J = 'bitrate_change',
            K = 'track_error',
            L = 'video_idle_start',
            M = 'video_idle_resume',
            N = 'video_begin_reporting',
            O = 'callback',
            P = 'filter_report',
            Q = 'source',
            R = 'error_id',
            S = 1001,
            T = 1,
            U = 2;
          b.VideoPlayerPlugin = c;
        })(a.ADB.core, b),
        a.ADB.va.plugins.videoplayer || (a.ADB.va.plugins.videoplayer = b);
    })(this);

    // AdobeHeartbeatPlugin
    !(function (a) {
      if (void 0 === b) var b = {};
      b.clock || (b.clock = {}),
        b.context || (b.context = {}),
        b.filter || (b.filter = {}),
        b.model || (b.model = {}),
        b.network || (b.network = {}),
        (function (a, b) {
          'use strict';
          function c(a, b, c, d, e) {
            if (!b) throw new Error('Reference to the channel object cannot be NULL');
            if (((this._channel = b), !a))
              throw new Error('Reference to the pluginManager object cannot be NULL');
            if (((this._pluginManager = a), !e))
              throw new Error('Reference to the logger object cannot be NULL');
            (this._logTag = 'ah::Timer.' + c),
              (this._logger = e),
              (this._isDestroyed = !1),
              this._createTimer(c, d),
              this._installHandlers();
          }
          var d = a.Event;
          (c.KEY_NAME = 'name'),
            (c.KEY_INTERVAL = 'interval'),
            (c.KEY_RESET = 'reset'),
            (c.prototype.resume = function (a) {
              this._logger.debug(this._logTag, 'Starting timer: ' + this._name);
              var b = {};
              (b[c.KEY_NAME] = e + '.' + this._name),
                (b[c.KEY_RESET] = a),
                this._pluginManager.command(f, i, b);
            }),
            (c.prototype.pause = function (a) {
              this._logger.debug(this._logTag, 'Stopping timer: ' + this._name);
              var b = {};
              (b[c.KEY_NAME] = e + '.' + this._name),
                (b[c.KEY_RESET] = a),
                this._pluginManager.command(f, h, b);
            }),
            (c.prototype.destroy = function () {
              if (!this._isDestroyed) {
                (this._isDestroyed = !0), this._uninstallHandlers();
                var a = {};
                (a[c.KEY_NAME] = e + '.' + this._name), this._pluginManager.command(f, j, a);
              }
            }),
            (c.prototype.setInterval = function (a) {
              var b = k + '.' + e + '.' + this._name,
                c = this._pluginManager.request(f, [b])[b];
              this.pause(!0), this._createTimer(this._name, a), c || this.resume(!0);
            }),
            (c.prototype._cmdResume = function (a) {
              var b = !1;
              null != a && a.hasOwnProperty(c.KEY_RESET) && (b = a[c.KEY_RESET]), this.resume(b);
            }),
            (c.prototype._cmdPause = function (a) {
              var b = !1;
              null != a && a.hasOwnProperty(c.KEY_RESET) && (b = a[c.KEY_RESET]), this.pause(b);
            }),
            (c.prototype._onTick = function (a, b) {
              this._channel.trigger(new d('clock:' + this._name + '.tick', b));
            }),
            (c.prototype._installHandlers = function () {
              this._channel.comply('clock:' + this._name + '.resume', this._cmdResume, this),
                this._channel.comply('clock:' + this._name + '.pause', this._cmdPause, this),
                this._pluginManager.on(f, e + '.' + this._name + '.tick', this._onTick, this);
            }),
            (c.prototype._uninstallHandlers = function () {
              this._channel.off(null, null, this), this._pluginManager.off(null, null, null, this);
            }),
            (c.prototype._createTimer = function (a, b) {
              (this._name = a), (this._interval = b);
              var d = {};
              (d[c.KEY_NAME] = e + '.' + this._name),
                (d[c.KEY_INTERVAL] = this._interval),
                this._pluginManager.command(f, g, d);
            });
          var e = 'heartbeat',
            f = 'service.clock',
            g = 'create',
            h = 'pause',
            i = 'resume',
            j = 'destroy',
            k = 'is_paused';
          b.clock.Timer = c;
        })(a.ADB.core, b),
        (function (a, b) {
          'use strict';
          function c(a, b, d) {
            c.__super__.constructor.call(this, a, b, f, h, d);
          }
          var d = a.Event,
            e = b.clock.Timer;
          a.extend(c, e),
            (c.prototype._onCheckStatusComplete = function (a) {
              var b = a.data[l];
              if (
                (this._logger.debug(this._logTag, '#_onCheckStatusComplete(interval=' + b + ')'), b)
              ) {
                if (b == this._interval)
                  return void this._logger.debug(
                    this._logTag,
                    '#_onCheckStatusComplete() > Interval value not changed.',
                  );
                b > g
                  ? (this._logger.warn(
                      this._logTag,
                      '#_onCheckStatusComplete() > Interval value too large: ' + b,
                    ),
                    this.setInterval(g))
                  : (this._logger.debug(
                      this._logTag,
                      '#_onCheckStatusComplete() > Interval changed to: ' + b,
                    ),
                    this.setInterval(b));
              } else
                this._logger.warn(
                  this._logTag,
                  '#_onCheckStatusComplete() > Invalid interval value.',
                ),
                  this.setInterval(h);
            }),
            (c.prototype._getSettings = function (a) {
              this._logger.debug(this._logTag, '#_getSettings()'), this._channel.trigger(new d(i));
            }),
            (c.prototype._installHandlers = function () {
              c.__super__._installHandlers.call(this),
                this._channel.on(j, this._getSettings, this),
                this._channel.on(k, this._onCheckStatusComplete, this),
                this._channel.reply(
                  l,
                  function () {
                    return this._interval;
                  },
                  this,
                );
            });
          var f = 'check_status',
            g = 600,
            h = 180,
            i = 'clock:check_status.tick',
            j = 'clock:check_status.get_settings',
            k = 'net:check_status_complete',
            l = 'check_status_interval';
          b.clock.CheckStatusTimer = c;
        })(a.ADB.core, b),
        (function (a, b) {
          'use strict';
          function c(a, b, d) {
            c.__super__.constructor.call(this, a, b, e, f, d), (this._doNotOverrideInterval = !1);
          }
          var d = b.clock.Timer;
          a.extend(c, d),
            (c.prototype._onCheckStatusComplete = function (a) {
              var b = a.data[g];
              if (
                (this._logger.debug(this._logTag, '#_onCheckStatusComplete(interval=' + b + ')'),
                this._doNotOverrideInterval)
              )
                this._logger.debug(
                  this._logTag,
                  '#_onCheckStatusComplete() > Interval value not changed. (doNotOverrideInterval = true)',
                );
              else if (b) {
                if (b == this._interval)
                  return void this._logger.debug(
                    this._logTag,
                    '#_onCheckStatusComplete() > Interval value not changed.',
                  );
                this._logger.debug(
                  this._logTag,
                  '#_onCheckStatusComplete() > Interval changed to: ' + b,
                ),
                  this.setInterval(b);
              } else
                this._logger.warn(
                  this._logTag,
                  '#_onCheckStatusComplete() > Invalid interval value.',
                ),
                  this.setInterval(f);
            }),
            (c.prototype._onUpdateReportingInterval = function (a) {
              var b = a.data[g];
              if (
                ((this._doNotOverrideInterval = !!a.data[h]),
                this._logger.debug(
                  this._logTag,
                  '#_onUpdateReportingInterval(interval=' +
                    b +
                    ', doNotOverrideInterval=' +
                    this._doNotOverrideInterval +
                    ')',
                ),
                b)
              ) {
                if (b == this._interval)
                  return void this._logger.debug(
                    this._logTag,
                    '#_onUpdateReportingInterval() > Interval value not changed.',
                  );
                this._logger.debug(
                  this._logTag,
                  '#_onUpdateReportingInterval() > Interval changed to: ' + b,
                ),
                  this.setInterval(b);
              } else
                this._logger.warn(
                  this._logTag,
                  '#_onUpdateReportingInterval() > Invalid interval value.',
                ),
                  this.setInterval(f);
            }),
            (c.prototype._installHandlers = function () {
              c.__super__._installHandlers.call(this),
                this._channel.on(j, this._onCheckStatusComplete, this),
                this._channel.on(i, this._onUpdateReportingInterval, this),
                this._channel.reply(
                  g,
                  function () {
                    return this._interval;
                  },
                  this,
                );
            });
          var e = 'reporting',
            f = 10,
            g = 'reporting_interval',
            h = 'do_not_override_interval',
            i = 'reporting:update_interval',
            j = 'net:check_status_complete';
          b.clock.ReportingTimer = c;
        })(a.ADB.core, b),
        (function (a, b) {
          'use strict';
          function c(a, b, d) {
            c.__super__.constructor.call(this, a, b, e, f, d);
          }
          var d = b.clock.Timer;
          a.extend(c, d);
          var e = 'idle',
            f = 1800;
          b.clock.IdleTimer = c;
        })(a.ADB.core, b),
        (function (a, b) {
          'use strict';
          function c(a, b, d) {
            c.__super__.constructor.call(this, a, b, e, f, d);
          }
          var d = b.clock.Timer;
          a.extend(c, d);
          var e = 'flush_filter',
            f = 0.25;
          b.clock.FlushFilterTimer = c;
        })(a.ADB.core, b),
        (function (a, b) {
          'use strict';
          function c(a, b, c) {
            if (!a) throw new Error('Reference to the pluginManager object cannot be NULL');
            if (!b) throw new Error('Reference to the channel object cannot be NULL');
            if (!c) throw new Error('Reference to the logger object cannot be NULL');
            (this._isDestroyed = !1),
              (this._reportingTimer = new f(a, b, c)),
              (this._checkStatusTimer = new d(a, b, c)),
              (this._flushFilterTimer = new e(a, b, c)),
              (this._idleTimer = new g(a, b, c));
          }
          var d = b.clock.CheckStatusTimer,
            e = b.clock.FlushFilterTimer,
            f = b.clock.ReportingTimer,
            g = b.clock.IdleTimer;
          (c.prototype.destroy = function () {
            this._isDestroyed ||
              ((this._isDestroyed = !0),
              this._reportingTimer.destroy(),
              this._checkStatusTimer.destroy(),
              this._flushFilterTimer.destroy(),
              this._idleTimer.destroy());
          }),
            (b.clock.Clock = c);
        })(a.ADB.core, b),
        (function (a, b) {
          'use strict';
          function c(a, b) {
            (this.value = a), (this.hint = b);
          }
          function d(a) {
            (this.realm = a), (this.data = {});
          }
          (c.HINT_SHORT = 'short'),
            (d.prototype.setField = function (a, b, d) {
              this.data[a] = new c(b, d);
            }),
            (d.prototype._createAccessor = function (a, b, c) {
              var d = this;
              return function () {
                return (
                  arguments.length && ((d[a] = arguments[0]), d.setField(b, arguments[0], c)), d[a]
                );
              };
            }),
            (b.model.Dao = d),
            (b.model.DaoField = c);
        })(a.ADB.core, b),
        (function (a, b) {
          'use strict';
          function c() {
            if (
              (c.__super__.constructor.call(this, 'asset'),
              (this.adId = this._createAccessor('_adId', 'ad_id', null)),
              (this.sid = this._createAccessor('_sid', 'ad_sid', null)),
              (this.resolver = this._createAccessor('_resolver', 'resolver', null)),
              (this.podId = this._createAccessor('_podId', 'pod_id', null)),
              (this.podPosition = this._createAccessor('_podPosition', 'pod_position', null)),
              (this.podOffset = this._createAccessor('_podOffset', 'pod_offset', null)),
              (this.podName = this._createAccessor('_podName', 'pod_name', null)),
              (this.adLength = this._createAccessor('_adLength', 'ad_length', null)),
              (this.adName = this._createAccessor('_adName', 'ad_name', null)),
              arguments.length && arguments[0] instanceof c)
            ) {
              var a = arguments[0];
              this.adId(a.adId()),
                this.sid(a.sid()),
                this.resolver(a.resolver()),
                this.podId(a.podId()),
                this.podPosition(a.podPosition()),
                this.podOffset(a.podOffset()),
                this.podName(a.podName()),
                this.adLength(a.adLength()),
                this.adName(a.adName());
            } else
              this.adId(''),
                this.sid(''),
                this.resolver(''),
                this.podId(''),
                this.podPosition(''),
                this.podOffset(0),
                this.podName(''),
                this.adLength(0),
                this.adName('');
          }
          var d = b.model.Dao;
          a.extend(c, d), (b.model.AdDao = c);
        })(a.ADB.core, b),
        (function (a, b) {
          'use strict';
          function c() {
            if (
              (c.__super__.constructor.call(this, 'sc'),
              (this.reportSuiteId = this._createAccessor('_reportSuiteId', 'rsid', null)),
              (this.trackingServer = this._createAccessor(
                '_trackingServer',
                'tracking_server',
                null,
              )),
              (this.ssl = this._createAccessor('_ssl', 'ssl', e.HINT_SHORT)),
              arguments.length && arguments[0] instanceof c)
            ) {
              var a = arguments[0];
              this.reportSuiteId(a.reportSuiteId()),
                this.trackingServer(a.trackingServer()),
                this.ssl(a.ssl());
            } else this.reportSuiteId(''), this.trackingServer(''), this.ssl(0);
          }
          var d = b.model.Dao,
            e = b.model.DaoField;
          a.extend(c, d), (b.model.AdobeAnalyticsDao = c);
        })(a.ADB.core, b),
        (function (a, b) {
          'use strict';
          function c() {
            if (
              (c.__super__.constructor.call(this, 'stream'),
              (this.id = this._createAccessor('_id', 'chapter_id', null)),
              (this.sid = this._createAccessor('_sid', 'chapter_sid', null)),
              (this.name = this._createAccessor('_name', 'chapter_name', null)),
              (this.position = this._createAccessor('_position', 'chapter_pos', null)),
              (this.length = this._createAccessor('_length', 'chapter_length', null)),
              (this.offset = this._createAccessor('_offset', 'chapter_offset', null)),
              arguments.length && arguments[0] instanceof c)
            ) {
              var a = arguments[0];
              this.id(a.id()),
                this.sid(a.sid()),
                this.name(a.name()),
                this.position(a.position()),
                this.length(a.length()),
                this.offset(a.offset());
            } else
              this.id(''),
                this.sid(''),
                this.name(''),
                this.position(0),
                this.length(0),
                this.offset(0);
          }
          var d = b.model.Dao;
          a.extend(c, d), (b.model.ChapterDao = c);
        })(a.ADB.core, b),
        (function (a, b) {
          'use strict';
          function c() {
            if (
              (c.__super__.constructor.call(this, 'asset'),
              (this.type = this._createAccessor('_type', 'type', null)),
              (this.videoId = this._createAccessor('_videoId', 'video_id', null)),
              (this.publisher = this._createAccessor('_publisher', 'publisher', null)),
              (this.adData = this._createAccessor('_adData', 'ad_data', null)),
              (this.chapterData = this._createAccessor('_chapterData', 'chapter_data', null)),
              (this.length = this._createAccessor('_length', 'length', null)),
              (this.name = this._createAccessor('_name', 'name', null)),
              arguments.length && arguments[0] instanceof c)
            ) {
              var a = arguments[0];
              this.type(a.type()),
                this.name(a.name()),
                this.videoId(a.videoId()),
                this.publisher(a.publisher()),
                this.length(a.length());
              var b = a.adData() ? new e(a.adData()) : null;
              this.adData(b);
              var d = a.chapterData() ? new f(a.chapterData()) : null;
              this.chapterData(d);
            } else
              this.type(''),
                this.name(''),
                this.videoId(''),
                this.publisher(''),
                this.length(0),
                this.adData(null),
                this.chapterData(null);
          }
          var d = b.model.Dao,
            e = b.model.AdDao,
            f = b.model.ChapterDao;
          a.extend(c, d),
            (c.TYPE_AD = 'ad'),
            (c.TYPE_MAIN_CONTENT = 'main'),
            (b.model.AssetDao = c);
        })(a.ADB.core, b),
        (function (a, b) {
          'use strict';
          function c() {
            if (
              (c.__super__.constructor.call(this, 'event'),
              (this.type = this._createAccessor('_type', 'type', null)),
              (this.duration = this._createAccessor('_duration', 'duration', null)),
              (this.playhead = this._createAccessor('_playhead', 'playhead', null)),
              (this.id = this._createAccessor('_id', 'id', null)),
              (this.source = this._createAccessor('_source', 'source', null)),
              (this.ts = this._createAccessor('_ts', 'ts', null)),
              (this.prevTs = this._createAccessor('_prevTs', 'prev_ts', null)),
              arguments.length && arguments[0] instanceof c)
            ) {
              var a = arguments[0];
              this.type(a.type()),
                this.duration(a.duration()),
                this.playhead(a.playhead()),
                this.id(a.id()),
                this.source(a.source()),
                this.ts(a.ts()),
                this.prevTs(a.prevTs());
            } else
              this.type(''),
                this.duration(0),
                this.playhead(0),
                this.id(''),
                this.source(''),
                this.ts(0),
                this.prevTs(-1);
          }
          var d = b.model.Dao;
          a.extend(c, d),
            (c.EVENT_TYPE_AA_START = 'aa_start'),
            (c.EVENT_TYPE_AA_AD_START = 'aa_ad_start'),
            (c.EVENT_TYPE_START = 'start'),
            (c.EVENT_TYPE_RESUME = 'resume'),
            (c.EVENT_TYPE_CHAPTER_START = 'chapter_start'),
            (c.EVENT_TYPE_CHAPTER_COMPLETE = 'chapter_complete'),
            (c.EVENT_TYPE_CHAPTER_SKIP = 'chapter_skip'),
            (c.EVENT_TYPE_PLAY = 'play'),
            (c.EVENT_TYPE_PAUSE = 'pause'),
            (c.EVENT_TYPE_STALL = 'stall'),
            (c.EVENT_TYPE_BUFFER = 'buffer'),
            (c.EVENT_TYPE_BITRATE_CHANGE = 'bitrate_change'),
            (c.EVENT_TYPE_ERROR = 'error'),
            (c.EVENT_TYPE_COMPLETE = 'complete'),
            (c.EVENT_TYPE_SKIP = 'skip'),
            (c.EVENT_TYPE_END = 'end'),
            (b.model.EventDao = c);
        })(a.ADB.core, b),
        (function (a, b) {
          'use strict';
          function c() {
            if (
              (c.__super__.constructor.call(this, 'stream'),
              (this.bitrate = this._createAccessor('_bitrate', 'bitrate', null)),
              (this.fps = this._createAccessor('_fps', 'fps', null)),
              (this.droppedFrames = this._createAccessor('_droppedFrames', 'dropped_frames', null)),
              (this.startupTime = this._createAccessor('_startup_time', 'startup_time', null)),
              arguments.length && arguments[0] instanceof c)
            ) {
              var a = arguments[0];
              this.bitrate(a.bitrate()),
                this.fps(a.fps()),
                this.droppedFrames(a.droppedFrames()),
                this.startupTime(a.startupTime()),
                (this.isStartupTimeOverridden = a.isStartupTimeOverridden);
            } else
              this.bitrate(0),
                this.fps(0),
                this.droppedFrames(0),
                this.startupTime(0),
                (this.isStartupTimeOverridden = !1);
          }
          var d = b.model.Dao;
          a.extend(c, d), (b.model.QoSDao = c);
        })(a.ADB.core, b),
        (function (a, b) {
          'use strict';
          function c() {
            if (
              (c.__super__.constructor.call(this, 'sp'),
              (this.ovp = this._createAccessor('_ovp', 'ovp', null)),
              (this.sdk = this._createAccessor('_sdk', 'sdk', null)),
              (this.channel = this._createAccessor('_channel', 'channel', null)),
              (this.playerName = this._createAccessor('_playerName', 'player_name', null)),
              (this.libVersion = this._createAccessor('_libVersion', 'hb_version', null)),
              (this.apiLevel = this._createAccessor('_apiLevel', 'hb_api_lvl', null)),
              arguments.length && arguments[0] instanceof c)
            ) {
              var a = arguments[0];
              this.ovp(a.ovp()),
                this.sdk(a.sdk()),
                this.channel(a.channel()),
                this.playerName(a.playerName()),
                this.libVersion(a.libVersion()),
                this.apiLevel(a.apiLevel());
            } else
              this.ovp(e),
                this.sdk(e),
                this.channel(e),
                this.playerName(''),
                this.libVersion(''),
                this.apiLevel(0);
          }
          var d = b.model.Dao;
          a.extend(c, d);
          var e = 'unknown';
          b.model.ServiceProviderDao = c;
        })(a.ADB.core, b),
        (function (a, b) {
          'use strict';
          function c() {
            if (
              (c.__super__.constructor.call(this, 'event'),
              (this.sessionId = this._createAccessor('_sessionId', 'sid', null)),
              arguments.length && arguments[0] instanceof c)
            ) {
              var a = arguments[0];
              this.sessionId(a.sessionId());
            } else this.sessionId(null);
          }
          var d = b.model.Dao;
          a.extend(c, d), (b.model.SessionDao = c);
        })(a.ADB.core, b),
        (function (a, b) {
          'use strict';
          function c() {
            if (
              (c.__super__.constructor.call(this, 'stream'),
              (this.type = this._createAccessor('_type', 'type', null)),
              arguments.length && arguments[0] instanceof c)
            ) {
              var a = arguments[0];
              this.type(a.type());
            } else this.type(null);
          }
          var d = b.model.Dao;
          a.extend(c, d), (b.model.StreamDao = c);
        })(a.ADB.core, b),
        (function (a, b) {
          'use strict';
          function c() {
            if (
              (c.__super__.constructor.call(this, 'user'),
              (this.analyticsVisitorId = this._createAccessor('_analyticsVisitorId', 'aid', null)),
              (this.marketingCloudVisitorId = this._createAccessor(
                '_marketingCloudVisitorId',
                'mid',
                null,
              )),
              (this.visitorId = this._createAccessor('_visitorId', 'id', null)),
              arguments.length && arguments[0] instanceof c)
            ) {
              var a = arguments[0];
              this.analyticsVisitorId(a.analyticsVisitorId()),
                this.marketingCloudVisitorId(a.marketingCloudVisitorId()),
                this.visitorId(a.visitorId());
            } else
              this.analyticsVisitorId(null),
                this.marketingCloudVisitorId(null),
                this.visitorId(null);
          }
          var d = b.model.Dao;
          a.extend(c, d), (b.model.UserDao = c);
        })(a.ADB.core, b),
        (function (a, b) {
          'use strict';
          function c() {
            if (
              (c.__super__.constructor.call(this, 'aam'),
              (this.audienceManagerBlob = this._createAccessor(
                '_audienceManagerBlob',
                'blob',
                null,
              )),
              (this.audienceManagerLocationHint = this._createAccessor(
                '_audienceManagerLocationHint',
                'loc_hint',
                null,
              )),
              arguments.length && arguments[0] instanceof c)
            ) {
              var a = arguments[0];
              this.audienceManagerBlob(a.audienceManagerBlob()),
                this.audienceManagerLocationHint(a.audienceManagerLocationHint());
            } else this.audienceManagerBlob(null), this.audienceManagerLocationHint(null);
          }
          var d = b.model.Dao;
          a.extend(c, d), (b.model.AudienceManagerDao = c);
        })(a.ADB.core, b),
        (function (a, b) {
          'use strict';
          function c(a, b, c, i, j) {
            (this.eventData = new e()),
              this.eventData.type(b),
              this.eventData.duration(0),
              this.eventData.ts(new Date().getTime()),
              this.eventData.playhead(c),
              (this.assetData = new f(a._assetData)),
              (this.streamData = new g(a._streamData)),
              (this.qosData = new h(a._qosData)),
              (this.cuserData = d.clone(a._cuserData)),
              (this.meta = i),
              (this.callback = j),
              (this.filterReport = !0);
          }
          var d = a.ObjectUtils,
            e = b.model.EventDao,
            f = b.model.AssetDao,
            g = b.model.StreamDao,
            h = b.model.QoSDao;
          b.model.TrackItem = c;
        })(a.ADB.va.utils, b),
        (function (a, b) {
          'use strict';
          function c(a, b, c, i, j, k) {
            (this.adobeAnalyticsData = a),
              (this.userData = b),
              (this.aamData = c),
              (this.serviceProviderData = i),
              (this.sessionData = j),
              (this.eventData = new e(k.eventData)),
              (this.assetData = new f(k.assetData)),
              (this.streamData = new g(k.streamData)),
              (this.qosData = new h(k.qosData)),
              (this.cuserData = d.clone(k.cuserData)),
              (this.meta = d.clone(k.meta)),
              (this.callback = k.callback),
              (this.filterReport = k.filterReport);
          }
          var d = a.ObjectUtils,
            e = b.model.EventDao,
            f = b.model.AssetDao,
            g = b.model.StreamDao,
            h = b.model.QoSDao;
          b.model.CUserDao;
          b.model.Report = c;
        })(a.ADB.va.utils, b),
        (function (a) {
          'use strict';
          function b() {}
          (b.prototype.serializeReport = function (a) {}),
            (b.prototype.serializeDao = function (a) {}),
            (b.prototype.serializeMap = function (a) {}),
            (b.prototype.serializeNumber = function (a, b, c, d) {}),
            (b.prototype.serializeString = function (a, b, c, d) {}),
            (a.model.ISerializer = b);
        })(b),
        (function (a, b) {
          'use strict';
          function c(a) {
            if (!a) throw new Error('Reference to the logger object cannot be NULL');
            this._logger = a;
          }
          var d = b.model.Dao,
            e = b.model.DaoField,
            f = b.model.ISerializer;
          a.extend(c, f),
            (c.prototype.serializeReport = function (a) {
              var b = [];
              return (
                b.push(this.serializeDao(a.adobeAnalyticsData)),
                b.push(this.serializeDao(a.userData)),
                b.push(this.serializeDao(a.aamData)),
                b.push(this.serializeMap(a.cuserData, 'cuser')),
                b.push(this.serializeDao(a.serviceProviderData)),
                b.push(this.serializeDao(a.sessionData)),
                b.push(this.serializeDao(a.eventData)),
                b.push(this.serializeDao(a.assetData)),
                b.push(this.serializeDao(a.streamData)),
                b.push(this.serializeDao(a.qosData)),
                b.push(this.serializeMap(a.meta, 'meta')),
                {
                  serializedOutput: b
                    .filter(function (a) {
                      return !!a;
                    })
                    .join('&'),
                  callback: a.callback,
                }
              );
            }),
            (c.prototype.serializeDao = function (a) {
              return this._processDao(a)
                .filter(function (a) {
                  return !!a;
                })
                .join('&');
            }),
            (c.prototype.serializeMap = function (a, b) {
              var c = [],
                d = b || 'meta';
              for (var e in a)
                a.hasOwnProperty(e) &&
                  a[e] &&
                  c.push('s:' + d + ':' + e + '=' + window.encodeURIComponent(a[e]));
              return c.join('&');
            }),
            (c.prototype.serializeNumber = function (a, b, c, d) {
              var f = h;
              return null == b || isNaN(b)
                ? null
                : (d === e.HINT_SHORT && (f = i), f + ':' + c + ':' + a + '=' + Math.floor(b));
            }),
            (c.prototype.serializeString = function (a, b, c, d) {
              return b ? j + ':' + c + ':' + a + '=' + window.encodeURIComponent(b) : null;
            }),
            (c.prototype._processDao = function (a) {
              var b = [];
              for (var c in a.data)
                if (a.data.hasOwnProperty(c)) {
                  var e = a.data[c],
                    f = e.value,
                    h = e.hint,
                    i = null,
                    j = a.realm;
                  if (null == f) continue;
                  'number' == typeof f
                    ? (i = this.serializeNumber(c, f, j, h))
                    : 'string' == typeof f
                    ? (i = this.serializeString(c, f, j, h))
                    : f instanceof d
                    ? (i = this.serializeDao(f))
                    : this._logger.warn(
                        g,
                        '#_processDao() > Unable to serialize DAO. Field: ' +
                          c +
                          '. Value: ' +
                          f +
                          '.',
                      ),
                    i && b.push(i);
                }
              return b;
            });
          var g = 'ah::QuerystringSerializer',
            h = 'l',
            i = 'h',
            j = 's';
          b.model.QuerystringSerializer = c;
        })(a.ADB.core, b),
        (function (a, b) {
          'use strict';
          function c(a, b) {
            if (!a) throw new Error('Reference to the data object cannot be NULL');
            if (((this._data = a), !b))
              throw new Error('Reference to the logger object cannot be NULL');
            this._logger = b;
          }
          c.prototype.parse = function () {
            var a, b, c, j, k, l;
            if (window.DOMParser) {
              l = new window.DOMParser().parseFromString(this._data, 'text/xml');
            } else
              (l = new window.ActiveXObject('Microsoft.XMLDOM')),
                (l.async = !1),
                l.loadXML(this._data);
            var m;
            (m = parseInt(
              l.getElementsByTagName('trackingInterval')[0].childNodes[0].nodeValue,
              10,
            )),
              m && (a = m),
              (m = parseInt(
                l.getElementsByTagName('setupCheckInterval')[0].childNodes[0].nodeValue,
                10,
              )),
              m && (b = m),
              (m = parseInt(
                l.getElementsByTagName('trackExternalErrors')[0].childNodes[0].nodeValue,
                10,
              )),
              m && (c = 1 == m),
              l.getElementsByTagName('trackingDisabled')[0] &&
                ((m = parseInt(
                  l.getElementsByTagName('trackingDisabled')[0].childNodes[0].nodeValue,
                  10,
                )),
                (j = 1 == m)),
              l.getElementsByTagName('nielsenEnabled')[0]
                ? ((m = parseInt(
                    l.getElementsByTagName('nielsenEnabled')[0].childNodes[0].nodeValue,
                    10,
                  )),
                  (k = 1 == m))
                : (k = !0);
            var n = {};
            return (
              (n[e] = a),
              (n[f] = b),
              (n[g] = c),
              (n[i] = j),
              (n[h] = k),
              this._logger.debug(d, '#parse() > Obtained configuration settings.'),
              n
            );
          };
          var d = 'ah::SettingsParser',
            e = 'reporting_interval',
            f = 'check_status_interval',
            g = 'track_external_errors',
            h = 'nielsen_enabled',
            i = 'tracking_disabled';
          b.network.SettingsParser = c;
        })(a.ADB.core, b),
        (function (a, b) {
          'use strict';
          function c(a, b) {
            if (
              ((this._trackingServer = null),
              (this._checkStatusServer = null),
              (this._publisher = null),
              (this._isConfigured = !1),
              (this._isDestroyed = !1),
              (this._beginReporting = !1),
              (this._sendingRequest = !1),
              (this._requestsQueue = []),
              (this._quietMode = !1),
              (this._prevReportSent = null),
              !a)
            )
              throw new Error('Reference to the channel object cannot be NULL');
            if (((this._channel = a), !b))
              throw new Error('Reference to the logger object cannot be NULL');
            (this._logger = b), (this._serializer = new i(b)), this._installEventListeners();
          }
          var d = a.Event,
            e = a.URLRequestMethod,
            f = a.URLRequest,
            g = a.URLLoader,
            h = b.network.SettingsParser,
            i = b.model.QuerystringSerializer;
          (c.prototype.destroy = function () {
            this._isDestroyed ||
              ((this._isDestroyed = !0),
              this._logger.debug(j, '#destroy()'),
              this._uninstallEventListeners());
          }),
            (c.prototype._onApiConfig = function (a) {
              var b = a.data;
              this._logger.debug(
                j,
                '#_onApiConfig(sb_server=' +
                  b[k] +
                  ', check_status_server=' +
                  b[l] +
                  ', publisher=' +
                  b[m] +
                  ', quiet_mode=' +
                  b[n] +
                  ', ssl=' +
                  b[o] +
                  ')',
              ),
                (this._trackingServer = this._updateRequestProtocol(b[k], b[o])),
                (this._checkStatusServer = this._updateRequestProtocol(b[l], b[o])),
                (this._publisher = b[m]),
                (this._quietMode = b[n]),
                (this._isConfigured = !0);
            }),
            (c.prototype._onBeginReporting = function (a) {
              this._logger.debug(j, '#_onBeginReporting()'),
                (this._beginReporting = !0),
                this._sendNextRequest(),
                this._onClockCheckStatusTick();
            }),
            (c.prototype._onFilterReportAvailable = function (a) {
              var b = a.data;
              if (!this._isConfigured)
                return void this._logger.warn(
                  j,
                  '#_onFilterReportAvailable() > Unable to send request: not configured.',
                );
              var c = b[p];
              if (
                this._prevReportSent &&
                this._prevReportSent.eventData &&
                c.eventData &&
                this._prevReportSent.eventData.playhead == c.eventData.playhead &&
                this._prevReportSent.eventData.ts == c.eventData.ts &&
                this._prevReportSent.eventData.prevTs == c.eventData.prevTs &&
                this._prevReportSent.eventData.type == c.eventData.type
              )
                return void this._logger.debug(
                  j,
                  '#_onFilterReportAvailable() > Duplicate heartbeat report not sent for URL:\n' +
                    e,
                );
              this._prevReportSent = c;
              var d = this._serializer.serializeReport(c),
                e = this._trackingServer + '/?' + d.serializedOutput;
              this._processRequest(e, d.callback);
            }),
            (c.prototype._processRequest = function (a, b) {
              this._requestsQueue.push({ url: a, callback: b }), this._sendNextRequest();
            }),
            (c.prototype._sendNextRequest = function () {
              if (!this._beginReporting)
                return void this._logger.debug(
                  j,
                  '#_sendNextRequest() > Exiting as we have not started reporting.',
                );
              if (this._sendingRequest)
                return void this._logger.debug(
                  j,
                  '#_sendNextRequest() > Exiting as we are currently sending a request.',
                );
              var a = this._requestsQueue.shift();
              if (!a)
                return void this._logger.debug(
                  j,
                  '#_sendNextRequest() > Exiting as we have no requests to send.',
                );
              (this._sendingRequest = !0), this._logger.debug(j, '#_sendNextRequest() > ' + a.url);
              var b = this,
                c = new g(),
                h = function () {
                  c.close(),
                    a.callback && a.callback.call(null),
                    (b._sendingRequest = !1),
                    b._sendNextRequest();
                },
                i = function (a) {
                  h();
                },
                k = function (a) {
                  b._logger.warn(
                    j,
                    '#_onFilterReportAvailable() > Failed to send heartbeat report.',
                  ),
                    h();
                };
              if (!this._quietMode) {
                c.addEventListener(d.SUCCESS, i, this), c.addEventListener(d.ERROR, k, this);
                var l = new f(a.url, e.GET);
                c.load(l);
              }
            }),
            (c.prototype._onClockCheckStatusTick = function (a) {
              function b(a) {
                if (a.data) {
                  var b = new h(a.data.response, i._logger),
                    c = b.parse();
                  c
                    ? i._channel.trigger(new d(u, c))
                    : i._logger.warn(
                        j,
                        '#_onClockCheckStatusTick() > Failed to parse the config. settings.',
                      );
                }
                n.close();
              }
              function c(a) {
                i._logger.warn(
                  j,
                  '#_onClockCheckStatusTick() > Failed to obtain the config. settings.',
                ),
                  n.close();
              }
              if (!this._isConfigured)
                return void this._logger.warn(
                  j,
                  '#_onClockCheckStatusTick() > Unable to send request: not configured.',
                );
              if (!this._publisher)
                return void this._logger.warn(j, '#_onClockCheckStatusTick() > Publisher is NULL.');
              if (!this._beginReporting)
                return void this._logger.debug(
                  j,
                  '#_onClockCheckStatusTick() > Exiting as we have not started reporting.',
                );
              var i = this,
                k = this._publisher.replace(/[^a-zA-Z0-9]+/, '-').toLocaleLowerCase(),
                l = this._checkStatusServer + k + '.xml?r=' + new Date().getTime(),
                m = new f(l, e.GET),
                n = new g();
              n.addEventListener(d.SUCCESS, b, this),
                n.addEventListener(d.ERROR, c, this),
                this._logger.debug(j, '#_onClockCheckStatusTick() > Get new settings from: ' + l),
                n.load(m);
            }),
            (c.prototype._updateRequestProtocol = function (a, b) {
              var c = a;
              return (
                0 === c.indexOf('http://')
                  ? (c = c.slice(7))
                  : 0 === c.indexOf('https://') && (c = c.slice(8)),
                b ? 'https://' + c : 'http://' + c
              );
            }),
            (c.prototype._installEventListeners = function () {
              this._channel.on(q, this._onApiConfig, this),
                this._channel.on(r, this._onBeginReporting, this),
                this._channel.on(s, this._onFilterReportAvailable, this),
                this._channel.on(t, this._onClockCheckStatusTick, this);
            }),
            (c.prototype._uninstallEventListeners = function () {
              this._channel.off(null, null, this);
            });
          var j = 'ah::Network',
            k = 'tracking_server',
            l = 'check_status_server',
            m = 'publisher',
            n = 'quiet_mode',
            o = 'ssl',
            p = 'report',
            q = 'api:config',
            r = 'api:video_begin_reporting',
            s = 'filter:data_available',
            t = 'clock:check_status.tick',
            u = 'net:check_status_complete';
          b.network.Network = c;
        })(a.ADB.core, b),
        (function (a, b) {
          'use strict';
          function c(a, b) {
            if (!a) throw new Error('Reference to the channel object cannot be NULL');
            if (((this._channel = a), !b))
              throw new Error('Reference to the logger object cannot be NULL');
            (this._logger = b),
              (this._isDestroyed = !1),
              (this._isBufferingInProgress = !1),
              (this._reportBuffer = {}),
              (this._tsHistory = {}),
              (this._workQueue = new i()),
              this._installEventListeners();
          }
          function d(a) {
            var b = [];
            return (
              a &&
                a.forEach(function (a) {
                  a.eventData.type() == k.EVENT_TYPE_PAUSE ||
                  a.eventData.type() == k.EVENT_TYPE_STALL ||
                  a.eventData.type() == k.EVENT_TYPE_BUFFER
                    ? (!a.filterReport || a.eventData.duration() > u) && b.push(a)
                    : b.push(a);
                }),
              b
            );
          }
          function e(a) {
            var b = -1,
              c = -1,
              d = [];
            return (
              a.forEach(function (a) {
                a.eventData.type() == k.EVENT_TYPE_START
                  ? a.assetData.type() == l.TYPE_MAIN_CONTENT
                    ? -1 == b
                      ? (b = d.push(a) - 1)
                      : (a.eventData.prevTs(-1), (d[b] = a))
                    : -1 == c
                    ? (c = d.push(a) - 1)
                    : (a.eventData.prevTs(-1), (d[c] = a))
                  : d.push(a);
              }),
              d
            );
          }
          function f(a) {
            var b = [];
            return (
              a.forEach(function (c) {
                if (c.eventData.type() == k.EVENT_TYPE_PLAY) {
                  if (c.eventData.duration() > t) b.push(c);
                  else if (
                    0 == c.eventData.duration() &&
                    c.assetData.type() == l.TYPE_MAIN_CONTENT
                  ) {
                    var d = g(a);
                    d.indexOf(c) == d.length - 1 && b.push(c);
                  }
                } else b.push(c);
              }),
              b
            );
          }
          function g(a) {
            var b = [];
            return (
              a.forEach(function (a) {
                (a.eventData.type() != k.EVENT_TYPE_PLAY &&
                  a.eventData.type() != k.EVENT_TYPE_BUFFER &&
                  a.eventData.type() != k.EVENT_TYPE_START) ||
                  b.push(a);
              }),
              b
            );
          }
          var h = a.radio.Command,
            i = a.radio.CommandQueue,
            j = a.Event,
            k = b.model.EventDao,
            l = b.model.AssetDao;
          (c.prototype.destroy = function () {
            this._isDestroyed ||
              ((this._isDestroyed = !0),
              this._logger.debug(w, '#destroy()'),
              this._uninstallEventListeners(),
              this.clear());
          }),
            (c.prototype.clear = function () {
              this._logger.debug(w, '#clear()'),
                this._workQueue.cancelAllCommands(),
                (this._reportBuffer = {}),
                (this._tsHistory = {}),
                (this._isBufferingInProgress = !1);
            }),
            (c.prototype.flush = function () {
              this._workQueue.addCommand(new h(this._flushBufferReport, this));
            }),
            (c.prototype._bufferReport = function (a) {
              if (!this._isDestroyed) {
                var b = a[q];
                if (b) {
                  var c = b.sessionData.sessionId();
                  (this._reportBuffer[c] = this._reportBuffer[c] || []),
                    this._reportBuffer[c].push(b);
                }
                if (!this._isBufferingInProgress) {
                  this._isBufferingInProgress = !0;
                  var d = {};
                  (d[p] = !0), (d[r] = 1), this._channel.command(s, d);
                }
              }
            }),
            (c.prototype._flushBufferReport = function () {
              function a(a) {
                if (a)
                  for (var c = 0; c < a.length; c++) {
                    var d = a[c],
                      e = d.sessionData.sessionId();
                    b._tsHistory[e] = b._tsHistory[e] || {};
                    var f =
                      d.eventData.type() +
                      '.' +
                      (d.assetData.type() == l.TYPE_AD
                        ? d.assetData.adData().adId()
                        : d.assetData.videoId());
                    b._tsHistory[e].hasOwnProperty(f) && d.eventData.prevTs(b._tsHistory[e][f]),
                      (b._tsHistory[e][f] = d.eventData.ts());
                  }
              }
              if (!this._isDestroyed) {
                var b = this;
                for (var c in this._reportBuffer)
                  if (this._reportBuffer.hasOwnProperty(c)) {
                    var g = f(e(d(this._reportBuffer[c])));
                    a(g);
                    for (var h = 0; h < g.length; h++) {
                      var i = g[h],
                        k = {};
                      (k[q] = i), this._channel.trigger(new j(n, k));
                    }
                  }
                this._reportBuffer = {};
                var m = this._channel.request(v),
                  o = this._tsHistory[m] || {};
                (this._tsHistory = {}),
                  (this._tsHistory[m] = o),
                  (this._isBufferingInProgress = !1);
              }
            }),
            (c.prototype._onContextReportAvailable = function (a) {
              var b = a.data;
              this._workQueue.addCommand(new h(this._bufferReport, this, [b]));
            }),
            (c.prototype._onClockFlushFilterTick = function (a) {
              this.flush();
            }),
            (c.prototype._installEventListeners = function () {
              this._channel.on(m, this._onContextReportAvailable, this),
                this._channel.on(o, this._onClockFlushFilterTick, this);
            }),
            (c.prototype._uninstallEventListeners = function () {
              this._channel.off(null, null, this);
            });
          var m = 'context:report_available',
            n = 'filter:data_available',
            o = 'clock:flush_filter.tick',
            p = 'reset',
            q = 'report',
            r = 'repeat_count',
            s = 'clock:flush_filter.resume',
            t = 250,
            u = 250,
            v = 'session_id',
            w = 'ah::ReportFilter';
          b.filter.ReportFilter = c;
        })(a.ADB.core, b),
        (function (a, b) {
          'use strict';
          function c(a, b) {
            this._onFail = { fn: a, ctx: b };
          }
          var d = a.ErrorInfo;
          (c.prototype.validateFields = function (a, b) {
            if (!a) return this._fail('Data cannot be null');
            if (b)
              for (var c = 0; c < b.length; c++) {
                var d = b[c];
                switch (d) {
                  case 'videoId':
                    if (!a.hasOwnProperty('videoId'))
                      return this._fail('The ID for the main video must be specified.');
                    if ('string' != typeof a.videoId)
                      return this._fail('The ID for the main video must be a String.');
                    if ('' === a.videoId)
                      return this._fail('The ID for the main video cannot be an empty string.');
                    break;
                  case 'streamType':
                    if (!a.hasOwnProperty('streamType'))
                      return this._fail('The stream type for the main video must be specified.');
                    if ('string' != typeof a.streamType)
                      return this._fail('The stream type for the main video must be a String.');
                    if ('' === a.streamType)
                      return this._fail(
                        'The stream type for the main video cannot be an empty string.',
                      );
                    break;
                  case 'videoLength':
                    if (!a.hasOwnProperty('videoLength'))
                      return this._fail('The length of the main video must be specified.');
                    if ('number' != typeof a.videoLength)
                      return this._fail('The length of the main video must be a Number.');
                    if (isNaN(a.videoLength))
                      return this._fail('The length of the main video cannot be NaN.');
                    break;
                  case 'playhead':
                    if (!a.hasOwnProperty('playhead'))
                      return this._fail('The playhead for the main video must be specified.');
                    if ('number' != typeof a.playhead)
                      return this._fail('The playhead for the main video must be a Number.');
                    if (isNaN(a.playhead))
                      return this._fail('The playhead for the main video cannot be NaN.');
                    break;
                  case 'playerName':
                    if (!a.hasOwnProperty('playerName'))
                      return this._fail('The player name for the main video must be specified.');
                    if ('string' != typeof a.playerName)
                      return this._fail('The player name for the main video must be a String.');
                    if ('' === a.playerName)
                      return this._fail(
                        'The player name for the main video cannot be an empty string.',
                      );
                    break;
                  case 'rsid':
                    if (!a.hasOwnProperty('rsid'))
                      return this._fail(
                        'account (rsid) is required and has to be set in the AppMeasurement instance.',
                      );
                    if ('string' != typeof a.rsid)
                      return this._fail(
                        'account (rsid) of the AppMeasurement instance must be a String.',
                      );
                    if ('' === a.rsid)
                      return this._fail(
                        'account (rsid) of the AppMeasurement instance  cannot be an empty string.',
                      );
                    break;
                  case 'trackingServer':
                    if (!a.hasOwnProperty('trackingServer'))
                      return this._fail(
                        'trackingServer is required and has to be set in the AppMeasurement instance.',
                      );
                    if ('string' != typeof a.trackingServer)
                      return this._fail(
                        'trackingServer of the AppMeasurement instance must be a String.',
                      );
                    if ('' === a.trackingServer)
                      return this._fail(
                        'trackingServer of the AppMeasurement instance cannot be an empty string.',
                      );
                    break;
                  case 'podPlayerName':
                    if (!a.hasOwnProperty('podPlayerName'))
                      return this._fail('The player name for the ad-break must be specified.');
                    if ('string' != typeof a.podPlayerName)
                      return this._fail('The player name for the ad-break must be a String.');
                    if ('' === a.podPlayerName)
                      return this._fail(
                        'The player name for the ad-break cannot be an empty string.',
                      );
                    break;
                  case 'podPosition':
                    if (!a.hasOwnProperty('podPosition'))
                      return this._fail('Position (index) of the ad-break must be specified.');
                    if ('number' != typeof a.podPosition)
                      return this._fail('Position (index) of the ad-break must be a Number.');
                    if (isNaN(a.podPosition))
                      return this._fail('Position (index) of the ad-break cannot be NaN.');
                    break;
                  case 'adId':
                    if (!a.hasOwnProperty('adId'))
                      return this._fail('The ad ID must be specified.');
                    if ('string' != typeof a.adId) return this._fail('The ad ID must be a String.');
                    if ('' === a.adId) return this._fail('The ad ID cannot be an empty string.');
                    break;
                  case 'adPosition':
                    if (!a.hasOwnProperty('adPosition'))
                      return this._fail('Position (index) of the ad must be specified.');
                    if ('number' != typeof a.adPosition)
                      return this._fail('Position (index) of the ad must be a Number.');
                    if (isNaN(a.adPosition))
                      return this._fail('Position (index) of the ad cannot be NaN.');
                    break;
                  case 'chapterPosition':
                    if (!a.hasOwnProperty('chapterPosition'))
                      return this._fail('Position (index) of the chapter must be specified.');
                    if ('number' != typeof a.chapterPosition)
                      return this._fail('Position (index) of the chapter must be a Number.');
                    if (isNaN(a.chapterPosition))
                      return this._fail('Position (index) of the chapter cannot be NaN.');
                    break;
                  case 'chapterOffset':
                    if (!a.hasOwnProperty('chapterOffset'))
                      return this._fail('Chapter start-time (offset) must be specified.');
                    if ('number' != typeof a.chapterOffset)
                      return this._fail('Chapter start-time (offset) must be a Number.');
                    if (isNaN(a.chapterOffset))
                      return this._fail('Chapter start-time (offset) cannot be NaN.');
                    break;
                  case 'chapterLength':
                    if (!a.hasOwnProperty('chapterLength'))
                      return this._fail('The length of the chapter must be specified.');
                    if ('number' != typeof a.chapterLength)
                      return this._fail('The length of the chapter must be a Number.');
                    if (isNaN(a.chapterLength))
                      return this._fail('The length of the chapter cannot be NaN.');
                    break;
                  default:
                    return this._fail('Unable to validate unknown parameter: ' + d);
                }
              }
            return !0;
          }),
            (c.prototype._fail = function (a) {
              var b = new d('Invalid input data', a);
              return this._onFail.fn && this._onFail.fn.call(this._onFail.ctx, b), !1;
            }),
            (b.context.InputDataValidator = c);
        })(a.ADB.va, b),
        (function (a, b) {
          'use strict';
          function c(a, b) {
            if (!b) throw new Error('Reference to the logger object cannot be NULL');
            if (((this._logger = b), !a))
              throw new Error('Reference to the context object cannot be NULL');
            this._context = a;
          }
          var d = b.model.Report;
          c.prototype.createReportForItem = function (a) {
            return (
              this._logger.debug(e, 'Creating report for item: ' + a.eventData.type()),
              new d(
                this._context._adobeAnalyticsData,
                this._context._userData,
                this._context._aamData,
                this._context._serviceProviderData,
                this._context._sessionData,
                a,
              )
            );
          };
          var e = 'ah::ReportFactory';
          b.context.ReportFactory = c;
        })(a.ADB.core, b),
        (function (a, b, c, d) {
          'use strict';
          function e(a, b) {
            if (!a) throw new Error('Reference to the channel object cannot be NULL');
            if (((this._channel = a), !b))
              throw new Error('Reference to the logger object cannot be NULL');
            (this._logger = b),
              (this._lastInBandItem = null),
              (this._stashedLastInBandItem = null),
              (this._stashedMainMetadata = null),
              (this._autoComputedStartupTime = 0),
              (this._reportingInterval = ma),
              (this._assetData = null),
              (this._streamData = null),
              (this._qosData = null),
              (this._sessionData = null),
              (this._cuserData = null),
              (this._adobeAnalyticsData = new j()),
              (this._serviceProviderData = new k()),
              (this._userData = new l()),
              (this._aamData = new m()),
              (this._isTrackingSessionActive = !1),
              (this._isVideoComplete = !1),
              (this._isDestroyed = !1),
              (this._doNotOverrideEventDuration = !1),
              (this._reportFactory = new u(this, this._logger)),
              (this._inputDataValidator = new v(function (a) {
                this._logger.error(w, a.getMessage() + ' | ' + a.getDetails()),
                  this._channel.trigger(new h(y, a));
              }, this)),
              (this._trackExternalErrors = !0),
              this._installEventListeners();
          }
          var f = c.md5,
            g = c.ObjectUtils,
            h = a.Event,
            i = d.model.SessionDao,
            j = d.model.AdobeAnalyticsDao,
            k = d.model.ServiceProviderDao,
            l = d.model.UserDao,
            m = d.model.AudienceManagerDao,
            n = d.model.EventDao,
            o = d.model.AssetDao,
            p = d.model.StreamDao,
            q = d.model.QoSDao,
            r = d.model.AdDao,
            s = d.model.ChapterDao,
            t = d.model.TrackItem,
            u = d.context.ReportFactory,
            v = d.context.InputDataValidator;
          (e.prototype.destroy = function () {
            this._isDestroyed ||
              ((this._isDestroyed = !0),
              this._logger.debug(w, '#destroy()'),
              this._uninstallEventListeners());
          }),
            (e.prototype._onApiAnalyticsStart = function (a) {
              this._logger.debug(w, '#_onApiAnalyticsStart()');
              var b = a.data;
              if (
                this._checkCall('_onApiAnalyticsStart') &&
                this._inputDataValidator.validateFields(b, ['playhead'])
              ) {
                this._userData.visitorId(b.vid),
                  this._userData.analyticsVisitorId(b.aid),
                  this._userData.marketingCloudVisitorId(b.mid),
                  this._aamData.audienceManagerBlob(b.blob),
                  this._aamData.audienceManagerLocationHint(b.loc_hint),
                  b.customerIDs && (this._cuserData = b.customerIDs),
                  this._updateQoSInfo(b);
                var c = new t(this, n.EVENT_TYPE_AA_START, b.playhead, null, b._eventData[E]);
                c.assetData.adData(null),
                  c.assetData.type(o.TYPE_MAIN_CONTENT),
                  (this._cuserData = null),
                  this._sendHit(c);
              }
            }),
            (e.prototype._onApiAnalyticsAdStart = function (a) {
              this._logger.debug(w, '#_onApiAnalyticsAdStart()');
              var b = a.data;
              if (
                this._checkCall('_onApiAnalyticsAdStart') &&
                this._inputDataValidator.validateFields(b, ['playhead'])
              ) {
                this._updateQoSInfo(b);
                var c = new t(this, n.EVENT_TYPE_AA_AD_START, b.playhead, null, b._eventData[E]);
                this._sendHit(c);
              }
            }),
            (e.prototype._onApiVideoLoad = function (a) {
              var b = a.data;
              this._logger.debug(
                w,
                '#_onApiVideoLoad(rsid=' + b.rsid + ', aa_trackingServer=' + b.trackingServer + ')',
              ),
                this._resetInternalState(),
                this._inputDataValidator.validateFields(b, ['rsid', 'trackingServer']) &&
                  (this._sessionData.sessionId(this._generateSessionId()),
                  (this._isTrackingSessionActive = !0));
            }),
            (e.prototype._onApiVideoUnload = function (a) {
              if ((this._logger.debug(w, '#_onApiVideoUnload()'), !this._isTrackingSessionActive))
                return void this._logger.debug(
                  w,
                  '#_onApiVideoUnload() > No active tracking session.',
                );
              this._isTrackingSessionActive = !1;
            }),
            (e.prototype._onApiVideoStart = function (a) {
              var b = a.data;
              if (
                (this._logger.debug(
                  w,
                  '#_onApiVideoStart(id=' +
                    b.videoId +
                    ', name=' +
                    b.videoName +
                    ', length=' +
                    b.videoLength +
                    ', type=' +
                    b.streamType +
                    ', playerName=' +
                    b.playerName +
                    ')',
                ),
                this._checkCall('_onApiVideoStart') &&
                  this._inputDataValidator.validateFields(b, [
                    'videoId',
                    'streamType',
                    'videoLength',
                    'playhead',
                    'playerName',
                  ]))
              ) {
                (this._lastInBandItem = null),
                  (this._stashedLastInBandItem = null),
                  this._adobeAnalyticsData.reportSuiteId(b.rsid),
                  this._adobeAnalyticsData.trackingServer(b.trackingServer),
                  this._adobeAnalyticsData.ssl(Number(b.useSsl)),
                  this._serviceProviderData.ovp(b.ovp),
                  this._serviceProviderData.sdk(b.sdk),
                  this._serviceProviderData.channel(b.channel),
                  this._serviceProviderData.libVersion(b.version),
                  this._serviceProviderData.apiLevel(b.apiLvl),
                  this._serviceProviderData.playerName(b.playerName),
                  this._assetData.adData(null),
                  this._assetData.chapterData(null),
                  this._assetData.videoId(b.videoId),
                  this._assetData.length(b.videoLength),
                  this._assetData.type(o.TYPE_MAIN_CONTENT),
                  this._assetData.publisher(b.publisher),
                  this._assetData.name(b.videoName),
                  this._streamData.type(b.streamType),
                  this._updateQoSInfo(b);
                var c = b.metaNielsen ? g.merge(b.metaVideo, b.metaNielsen) : b.metaVideo,
                  d = new t(this, n.EVENT_TYPE_START, b.playhead, c, b._eventData[E]);
                this._sendHit(d);
              }
            }),
            (e.prototype._onApiVideoResume = function (a) {
              var b = a.data;
              if (
                (this._logger.debug(
                  w,
                  '#_onApiVideoResume(id=' +
                    b.videoId +
                    ', name=' +
                    b.videoName +
                    ', length=' +
                    b.videoLength +
                    ', type=' +
                    b.streamType +
                    ', playerName=' +
                    b.playerName +
                    ')',
                ),
                this._checkCall('_onApiVideoResume') &&
                  this._inputDataValidator.validateFields(b, [
                    'videoId',
                    'streamType',
                    'videoLength',
                    'playhead',
                    'playerName',
                  ]))
              ) {
                this._assetData.videoId(b.videoId),
                  this._assetData.length(b.videoLength),
                  this._assetData.type(o.TYPE_MAIN_CONTENT),
                  this._assetData.name(b.videoName),
                  this._streamData.type(b.streamType);
                var c = new t(this, n.EVENT_TYPE_RESUME, b.playhead, null, b._eventData[E]);
                this._sendHit(c);
              }
            }),
            (e.prototype._onApiVideoSessionEnd = function (a) {
              this._logger.debug(w, '#_onApiVideoSessionEnd()');
              var b = a.data;
              if (
                this._checkCall('_onApiVideoSessionEnd') &&
                this._inputDataValidator.validateFields(b, ['playhead'])
              ) {
                var c = new t(this, n.EVENT_TYPE_END, b.playhead, null, b._eventData[E]);
                c.assetData.adData(null), c.assetData.type(o.TYPE_MAIN_CONTENT), this._sendHit(c);
              }
            }),
            (e.prototype._onApiVideoComplete = function (a) {
              this._logger.debug(w, '#_onApiVideoComplete()');
              var b = a.data;
              if (this._checkCall('_onApiVideoComplete')) {
                var c = new t(
                  this,
                  n.EVENT_TYPE_COMPLETE,
                  this._assetData.length(),
                  null,
                  b._eventData[E],
                );
                this._sendHit(c), (this._isVideoComplete = !0);
              }
            }),
            (e.prototype._onApiVideoSkip = function (a) {
              this._logger.debug(w, '#_onApiVideoSkip()');
              var b = a.data;
              if (this._checkCall('_onApiVideoSkip')) {
                var c = new t(this, n.EVENT_TYPE_SKIP, b.playhead, null, b._eventData[E]);
                this._sendHit(c), (this._isVideoComplete = !0);
              }
            }),
            (e.prototype._onApiPlay = function (a) {
              this._logger.debug(w, '#_onApiPlay()');
              var b = a.data;
              if (
                this._checkCall('_onApiPlay') &&
                this._inputDataValidator.validateFields(b, ['playhead'])
              ) {
                this._updateQoSInfo(b);
                var c = new t(this, n.EVENT_TYPE_PLAY, b.playhead, null, b._eventData[E]);
                this._sendHit(c);
              }
            }),
            (e.prototype._onApiPause = function (a) {
              this._logger.debug(w, '#_onApiPause()');
              var b = a.data;
              if (
                this._checkCall('_onApiPause') &&
                this._inputDataValidator.validateFields(b, ['playhead'])
              ) {
                this._updateQoSInfo(b);
                var c = b.playheadStalled ? n.EVENT_TYPE_STALL : n.EVENT_TYPE_PAUSE,
                  d = new t(this, c, b.playhead, null, b._eventData[E]);
                b._eventData.hasOwnProperty(F) && (d.filterReport = b._eventData[F]),
                  this._sendHit(d);
              }
            }),
            (e.prototype._onApiBufferStart = function (a) {
              this._logger.debug(w, '#_onApiBufferStart()');
              var b = a.data;
              if (
                this._checkCall('_onApiBufferStart') &&
                this._inputDataValidator.validateFields(b, ['playhead'])
              ) {
                this._updateQoSInfo(b);
                var c = new t(this, n.EVENT_TYPE_BUFFER, b.playhead, null, b._eventData[E]);
                this._sendHit(c);
              }
            }),
            (e.prototype._onApiAdBreakStart = function (a) {
              this._logger.debug(w, '#_onApiAdBreakStart()');
              var b = a.data;
              this._checkCall('_onApiAdBreakStart') &&
                this._inputDataValidator.validateFields(b, ['playhead']) &&
                (this._flushLastInbandItem(b), this._updateLastInbandItemToBuffering());
            }),
            (e.prototype._onApiAdBreakComplete = function (a) {
              this._logger.debug(w, '#_onApiAdBreakComplete()');
              var b = a.data;
              this._checkCall('_onApiAdBreakComplete') &&
                this._inputDataValidator.validateFields(b, ['playhead']) &&
                (this._flushLastInbandItem(b), this._restoreLastInbandItem());
            }),
            (e.prototype._onApiAdStart = function (a) {
              var b = a.data;
              if (
                (this._logger.debug(
                  w,
                  '#_onApiAdStart(id=' +
                    b.adId +
                    ', player_name=' +
                    b.podPlayerName +
                    ', parent_name=' +
                    this._assetData.videoId() +
                    ', pod_pos=' +
                    b.adPosition +
                    ')',
                ),
                this._checkCall('_onApiAdStart') &&
                  this._inputDataValidator.validateFields(b, [
                    'playhead',
                    'podPosition',
                    'podPlayerName',
                    'adId',
                    'adPosition',
                  ]))
              ) {
                var c = new r();
                c.adId(b.adId),
                  c.adName(b.adName),
                  c.adLength(b.adLength),
                  c.resolver(b.podPlayerName),
                  c.podId(f(this._assetData.videoId()) + '_' + b.podPosition),
                  c.podPosition(b.adPosition + ''),
                  c.podName(b.podName),
                  c.podOffset(b.podSecond),
                  c.sid(this._generateSessionId()),
                  this._assetData.adData(c),
                  this._assetData.type(o.TYPE_AD),
                  this._updateQoSInfo(b);
                var d = g.merge(b.metaVideo, b.metaAd);
                (d = b.metaNielsen ? g.merge(d, b.metaNielsen) : d),
                  (d = b.metaAdNielsen ? g.merge(d, b.metaAdNielsen) : d);
                var e = new t(this, n.EVENT_TYPE_START, b.playhead, d, b._eventData[E]);
                this._sendHit(e), this._restoreLastInbandItem();
                if (!!b.adGranularTracking) {
                  var h = b.adTrackingInterval ? b.adTrackingInterval : this._reportingInterval;
                  this._updateReportingInterval(h, !0);
                }
              }
            }),
            (e.prototype._onApiAdComplete = function (a) {
              this._logger.debug(w, '#_onApiAdComplete()');
              var b = a.data;
              if (
                this._checkCall('_onApiAdComplete') &&
                this._inputDataValidator.validateFields(b, ['playhead'])
              ) {
                if (this._assetData.type() != o.TYPE_AD)
                  return void this._logger.warn(
                    w,
                    '#_onApiAdComplete() > Ignoring the ad complete event, because we are no longer in an ad.',
                  );
                this._updateQoSInfo(b);
                var c = new t(this, n.EVENT_TYPE_COMPLETE, b.playhead, null, b._eventData[E]);
                this._sendHit(c),
                  this._updateLastInbandItemToBuffering(),
                  this._assetData.adData(null),
                  this._assetData.type(o.TYPE_MAIN_CONTENT),
                  this._updateReportingInterval(this._reportingInterval, !1);
              }
            }),
            (e.prototype._onApiAdSkip = function (a) {
              this._logger.debug(w, '#_onApiAdSkip()');
              var b = a.data;
              if (
                this._checkCall('_onApiAdSkip') &&
                this._inputDataValidator.validateFields(b, ['playhead'])
              ) {
                if (this._assetData.type() != o.TYPE_AD)
                  return void this._logger.warn(
                    w,
                    '#_onApiAdSkip() > Ignoring the ad skip event, because we are no longer in an ad.',
                  );
                this._updateQoSInfo(b);
                var c = new t(this, n.EVENT_TYPE_SKIP, b.playhead, null, b._eventData[E]);
                this._sendHit(c),
                  this._updateLastInbandItemToBuffering(),
                  this._assetData.adData(null),
                  this._assetData.type(o.TYPE_MAIN_CONTENT),
                  this._updateReportingInterval(this._reportingInterval, !1);
              }
            }),
            (e.prototype._onApiChapterStart = function (a) {
              var b = a.data;
              if (
                (this._logger.debug(
                  w,
                  '#_onApiChapterStart(name=' +
                    b.chapterName +
                    ', length=' +
                    b.chapterLength +
                    ', position=' +
                    b.chapterPosition +
                    ', chapter_offset=' +
                    b.chapterOffset +
                    ')',
                ),
                this._checkCall('_onApiChapterStart') &&
                  this._inputDataValidator.validateFields(b, [
                    'playhead',
                    'chapterPosition',
                    'chapterOffset',
                    'chapterLength',
                  ]))
              ) {
                var c = new s();
                c.id(f(this._assetData.videoId()) + '_' + b.chapterPosition),
                  c.name(b.chapterName),
                  c.length(b.chapterLength),
                  c.position(b.chapterPosition),
                  c.offset(b.chapterOffset),
                  c.sid(this._generateSessionId()),
                  this._assetData.chapterData(c),
                  this._updateQoSInfo(b);
                var d = g.merge(b.metaVideo, b.metaChapter),
                  e = new t(this, n.EVENT_TYPE_CHAPTER_START, b.playhead, d, b._eventData[E]);
                e.assetData.adData(null), e.assetData.type(o.TYPE_MAIN_CONTENT), this._sendHit(e);
              }
            }),
            (e.prototype._onApiChapterComplete = function (a) {
              this._logger.debug(w, '#_onApiChapterComplete()');
              var b = a.data;
              if (
                this._checkCall('_onApiChapterComplete') &&
                this._inputDataValidator.validateFields(b, ['playhead'])
              ) {
                if (!this._assetData.chapterData())
                  return void this._logger.warn(
                    w,
                    '#_onApiChapterComplete() > Ignoring the chapter complete event, because we are no longer in a chapter.',
                  );
                this._updateQoSInfo(b);
                var c = new t(
                  this,
                  n.EVENT_TYPE_CHAPTER_COMPLETE,
                  b.playhead,
                  null,
                  b._eventData[E],
                );
                c.assetData.adData(null),
                  c.assetData.type(o.TYPE_MAIN_CONTENT),
                  this._sendHit(c),
                  this._assetData.chapterData(null);
              }
            }),
            (e.prototype._onApiChapterSkip = function (a) {
              this._logger.debug(w, '#_onApiChapterSkip()');
              var b = a.data;
              if (
                this._checkCall('_onApiChapterSkip') &&
                this._inputDataValidator.validateFields(b, ['playhead'])
              ) {
                if (!this._assetData.chapterData())
                  return void this._logger.warn(
                    w,
                    '#_onApiChapterSkip() > Ignoring the chapter skip event, because we are no longer in a chapter.',
                  );
                this._updateQoSInfo(b);
                var c = new t(this, n.EVENT_TYPE_CHAPTER_SKIP, b.playhead, null, b._eventData[E]);
                c.assetData.adData(null),
                  c.assetData.type(o.TYPE_MAIN_CONTENT),
                  this._sendHit(c),
                  this._assetData.chapterData(null);
              }
            }),
            (e.prototype._onApiBitrateChange = function (a) {
              this._logger.debug(w, '#_onApiBitrateChange()');
              var b = a.data;
              if (
                this._checkCall('_onApiBitrateChange') &&
                this._inputDataValidator.validateFields(b, ['playhead'])
              ) {
                this._updateQoSInfo(b);
                var c = new t(this, n.EVENT_TYPE_BITRATE_CHANGE, b.playhead, null, b._eventData[E]);
                this._sendHit(c);
              }
            }),
            (e.prototype._onApiTrackError = function (a) {
              var b = a.data;
              if (
                (this._logger.debug(
                  w,
                  '#_onApiTrackError(source=' +
                    b._eventData.source +
                    ', err_id=' +
                    b._eventData.error_id +
                    ')',
                ),
                !this._isTrackingSessionActive)
              )
                return void this._logger.warn(
                  w,
                  '#_onApiTrackError() > No active tracking session.',
                );
              if (this._trackExternalErrors || b._eventData.source === x) {
                this._updateQoSInfo(b);
                var c = new t(this, n.EVENT_TYPE_ERROR, 0, null, b._eventData[E]);
                c.eventData.id(b._eventData.error_id),
                  c.eventData.source(b._eventData.source),
                  this._sendHit(c);
              }
            }),
            (e.prototype._onApiTrackInternalError = function (a) {
              var b = a.data;
              this._logger.debug(
                w,
                '#_onApiTrackInternalError(source=' + b.source + ', err_id=' + b.error_id + ')',
              ),
                this._updateQoSInfo(b);
              var c = new t(this, n.EVENT_TYPE_ERROR, 0);
              c.eventData.id(b.error_id), c.eventData.source(b.source), this._sendHit(c);
            }),
            (e.prototype._onApiQuantumEnd = function (a) {
              this._logger.debug(w, '#_onApiQuantumEnd(interval=' + this._channel.request(B) + ')');
              var b = a.data;
              if (
                this._checkCall('_onApiQuantumEnd') &&
                this._inputDataValidator.validateFields(b, ['playhead'])
              ) {
                var c = this._lastInBandItem;
                if (c) {
                  this._updateQoSInfo(b);
                  var d = new t(this, c.eventData.type(), b.playhead, c.meta, c.callback);
                  (d.filterReport = c.filterReport), this._sendHit(d, !0);
                }
              }
            }),
            (e.prototype._onNetworkCheckStatusComplete = function (a) {
              var b = a.data;
              (this._trackExternalErrors = b[I]),
                (this._reportingInterval = b[J]),
                this._reportingInterval || (this._reportingInterval = ma),
                this._logger.debug(
                  w,
                  '#_onNetworkCheckStatusComplete(track_ext_err=' + this._trackExternalErrors + ')',
                );
            }),
            (e.prototype._onResetSessionId = function (a) {
              var b = this._generateSessionId();
              (this._sessionData = new i()),
                this._sessionData.sessionId(b),
                this._logger.debug(w, '#_resetSessionId(new sessionId=' + b + ')');
            }),
            (e.prototype._installEventListeners = function () {
              this._channel.on(L, this._onApiAnalyticsStart, this),
                this._channel.on(M, this._onApiAnalyticsAdStart, this),
                this._channel.on(N, this._onApiVideoLoad, this),
                this._channel.on(O, this._onApiVideoUnload, this),
                this._channel.on(P, this._onApiVideoStart, this),
                this._channel.on(Q, this._onApiVideoComplete, this),
                this._channel.on(R, this._onApiVideoSkip, this),
                this._channel.on(S, this._onApiVideoResume, this),
                this._channel.on(T, this._onApiVideoSessionEnd, this),
                this._channel.on(U, this._onApiAdBreakStart, this),
                this._channel.on(V, this._onApiAdBreakComplete, this),
                this._channel.on(W, this._onApiAdStart, this),
                this._channel.on(X, this._onApiAdComplete, this),
                this._channel.on(Y, this._onApiAdSkip, this),
                this._channel.on(Z, this._onApiPlay, this),
                this._channel.on($, this._onApiPause, this),
                this._channel.on(_, this._onApiBufferStart, this),
                this._channel.on(aa, this._onApiChapterStart, this),
                this._channel.on(ba, this._onApiChapterComplete, this),
                this._channel.on(ca, this._onApiChapterSkip, this),
                this._channel.on(fa, this._onApiBitrateChange, this),
                this._channel.on(da, this._onApiTrackError, this),
                this._channel.on(ea, this._onApiTrackInternalError, this),
                this._channel.on(ga, this._onApiQuantumEnd, this),
                this._channel.on(ia, this._onNetworkCheckStatusComplete, this),
                this._channel.on(D, this._onResetSessionId, this),
                this._channel.reply(
                  C,
                  function () {
                    return this._sessionData && this._sessionData.sessionId()
                      ? this._sessionData.sessionId()
                      : null;
                  },
                  this,
                );
            }),
            (e.prototype._uninstallEventListeners = function () {
              this._channel.off(null, null, this);
            }),
            (e.prototype._resetInternalState = function () {
              this._logger.debug(w, '#_resetInternalState()'),
                (this._isTrackingSessionActive = !1),
                (this._isVideoComplete = !1),
                (this._autoComputedStartupTime = 0),
                (this._lastInBandItem = null),
                (this._stashedLastInBandItem = null),
                (this._streamData = new p()),
                (this._qosData = new q()),
                (this._sessionData = new i()),
                (this._assetData = new o()),
                (this._cuserData = null);
            }),
            (e.prototype._generateSessionId = function () {
              return '' + new Date().getTime() + Math.floor(1e9 * Math.random());
            }),
            (e.prototype._updateQoSInfo = function (a) {
              this._qosData.bitrate(a.bitrate || 0),
                this._qosData.fps(a.fps || 0),
                this._qosData.droppedFrames(a.droppedFrames || 0),
                null == a.startupTime || isNaN(a.startupTime)
                  ? (this._qosData.startupTime(this._autoComputedStartupTime),
                    (this._qosData.isStartupTimeOverridden = !1))
                  : (this._qosData.startupTime(a.startupTime),
                    (this._qosData.isStartupTimeOverridden = !0));
            }),
            (e.prototype._checkCall = function (a) {
              return this._isTrackingSessionActive
                ? !this._isVideoComplete ||
                    '_onApiVideoSessionEnd' === a ||
                    (this._logger.warn(w, '#' + a + '() > The video content already completed.'),
                    !1)
                : (this._logger.warn(w, '#' + a + '() > No active tracking session.'), !1);
            }),
            (e.prototype._updateReportingInterval = function (a, b) {
              var c = {};
              (c[K] = !!b), (c[J] = a), this._channel.trigger(new h(ja, c));
            }),
            (e.prototype._updateLastInBandItem = function (a) {
              var b = this._lastInBandItem,
                c = new Date().getTime(),
                d = b.assetData.type() === o.TYPE_AD || a.assetData.type() === o.TYPE_AD,
                e = 1e3 * Math.abs(a.eventData.playhead() - b.eventData.playhead()),
                f = Math.abs(c - b.eventData.ts()),
                g = Math.abs(e - f),
                h = f;
              h > ka
                ? (this._logger.warn(
                    w,
                    ' Resetting duration in lastInBandItem[' +
                      b.assetData.type() +
                      ':' +
                      b.eventData.type() +
                      '] call to 0 as calculated duration (' +
                      h +
                      ')exceeds 10mins',
                  ),
                  (h = 0))
                : b.eventData.type() == n.EVENT_TYPE_PLAY &&
                  !d &&
                  !this._doNotOverrideEventDuration &&
                  g > la &&
                  ((h = Math.min(e, f)),
                  this._logger.warn(
                    w,
                    ' Resetting duration in lastInBandItem[' +
                      b.assetData.type() +
                      ':' +
                      b.eventData.type() +
                      '] call to ' +
                      h +
                      ' as calculated error delta (' +
                      g +
                      ')exceeds 2sec',
                  )),
                (this._doNotOverrideEventDuration = !1),
                b.eventData.duration(h),
                b.eventData.ts(c),
                b.eventData.playhead(a.eventData.playhead()),
                b.qosData.startupTime(a.qosData.startupTime()),
                (b.qosData.isStartupTimeOverridden = a.qosData.isStartupTimeOverridden);
            }),
            (e.prototype._updateLastInbandItemToBuffering = function () {
              this._stashedLastInBandItem = this._lastInBandItem;
              var a = 0;
              null != this._lastInBandItem &&
                (this._lastInBandItem.assetData.type() == o.TYPE_MAIN_CONTENT &&
                  this._lastInBandItem.eventData.type() == n.EVENT_TYPE_START &&
                  (this._stashedMainMetadata = this._lastInBandItem.meta),
                (a = this._lastInBandItem.eventData.playhead()));
              var b = new t(this, n.EVENT_TYPE_BUFFER, a, null, null);
              b.assetData.adData(null),
                b.assetData.type(o.TYPE_MAIN_CONTENT),
                (this._lastInBandItem = b);
            }),
            (e.prototype._restoreLastInbandItem = function () {
              if (null != this._stashedLastInBandItem) {
                var a = null;
                this._stashedLastInBandItem.eventData.type() == n.EVENT_TYPE_START &&
                  (this._lastInBandItem.assetData.type() == o.TYPE_AD
                    ? (a = this._lastInBandItem.meta)
                    : ((a = this._stashedMainMetadata), (this._stashedMainMetadata = null)));
                var b = new t(
                  this,
                  this._stashedLastInBandItem.eventData.type(),
                  this._stashedLastInBandItem.eventData.playhead(),
                  a,
                  this._stashedLastInBandItem.callback,
                );
                (b.filterReport = this._stashedLastInBandItem.filterReport),
                  (this._lastInBandItem = b),
                  (this._stashedLastInBandItem = null);
              }
            }),
            (e.prototype._flushLastInbandItem = function (a) {
              if (this._lastInBandItem) {
                this._updateQoSInfo(a);
                var b = new t(
                  this,
                  this._lastInBandItem.eventData.type(),
                  a.playhead,
                  this._lastInBandItem.meta,
                  this._lastInBandItem.callback,
                );
                this._sendHit(b, !0);
              }
            }),
            (e.prototype._createAndSendReport = function (a) {
              var b = this._reportFactory.createReportForItem(a);
              b.qosData.isStartupTimeOverridden ||
                b.qosData.startupTime(this._autoComputedStartupTime);
              var c = {};
              if (
                ((c[G] = b),
                this._channel.trigger(new h(ha, c)),
                b.eventData.type() == n.EVENT_TYPE_START ||
                  b.eventData.type() == n.EVENT_TYPE_PLAY ||
                  b.eventData.type() == n.EVENT_TYPE_PAUSE ||
                  b.eventData.type() == n.EVENT_TYPE_STALL ||
                  b.eventData.type() == n.EVENT_TYPE_BUFFER)
              ) {
                var d = {};
                (d[H] = !0), this._channel.command(z, d);
              }
            }),
            (e.prototype._sendHit = function (a, b) {
              switch (a.eventData.type()) {
                case n.EVENT_TYPE_START:
                case n.EVENT_TYPE_PLAY:
                case n.EVENT_TYPE_PAUSE:
                case n.EVENT_TYPE_STALL:
                case n.EVENT_TYPE_BUFFER:
                  this._lastInBandItem
                    ? (this._updateLastInBandItem(a),
                      this._lastInBandItem.eventData.type() == n.EVENT_TYPE_START &&
                        this._lastInBandItem.assetData.type() == o.TYPE_MAIN_CONTENT &&
                        (this._autoComputedStartupTime +=
                          this._lastInBandItem.eventData.duration()),
                      this._createAndSendReport(this._lastInBandItem),
                      (b && this._lastInBandItem.eventData.type() == a.eventData.type()) ||
                        this._createAndSendReport(a))
                    : this._createAndSendReport(a),
                    (this._lastInBandItem = a);
                  break;
                case n.EVENT_TYPE_COMPLETE:
                case n.EVENT_TYPE_SKIP:
                  if (
                    (this._lastInBandItem &&
                      (this._updateLastInBandItem(a),
                      this._createAndSendReport(this._lastInBandItem)),
                    a.eventData.type() !== n.EVENT_TYPE_SKIP && this._createAndSendReport(a),
                    a.assetData.type() == o.TYPE_MAIN_CONTENT)
                  ) {
                    (this._lastInBandItem = null), (this._stashedLastInBandItem = null);
                    var c = {};
                    (c[H] = !0), this._channel.command(A, c);
                  } else
                    a.assetData.type() == o.TYPE_AD &&
                      (this._lastInBandItem.assetData.adData(null),
                      this._lastInBandItem.assetData.type(o.TYPE_MAIN_CONTENT),
                      (this._doNotOverrideEventDuration = !0));
                  break;
                case n.EVENT_TYPE_CHAPTER_START:
                case n.EVENT_TYPE_CHAPTER_COMPLETE:
                case n.EVENT_TYPE_CHAPTER_SKIP:
                  this._lastInBandItem &&
                    (this._updateLastInBandItem(a),
                    this._createAndSendReport(this._lastInBandItem)),
                    a.eventData.type() !== n.EVENT_TYPE_CHAPTER_SKIP &&
                      this._createAndSendReport(a),
                    this._lastInBandItem &&
                      (this._lastInBandItem.assetData.chapterData(
                        a.eventData.type() == n.EVENT_TYPE_CHAPTER_START
                          ? new s(a.assetData.chapterData())
                          : null,
                      ),
                      this._lastInBandItem.eventData.duration(0),
                      this._createAndSendReport(this._lastInBandItem));
                  break;
                default:
                  this._createAndSendReport(a);
              }
            });
          var w = 'ah::Context',
            x = 'sourceErrorSDK',
            y = 'error',
            z = 'clock:reporting.resume',
            A = 'clock:reporting.pause',
            B = 'reporting_interval',
            C = 'session_id',
            D = 'reset_session_id',
            E = 'callback',
            F = 'filter_report',
            G = 'report',
            H = 'reset',
            I = 'track_external_errors',
            J = 'reporting_interval',
            K = 'do_not_override_interval',
            L = 'api:aa_start',
            M = 'api:aa_ad_start',
            N = 'api:video_load',
            O = 'api:video_unload',
            P = 'api:video_start',
            Q = 'api:video_complete',
            R = 'api:video_skip',
            S = 'api:video_resume',
            T = 'api:video_session_end',
            U = 'api:adbreak_start',
            V = 'api:adbreak_complete',
            W = 'api:ad_start',
            X = 'api:ad_complete',
            Y = 'api:ad_skip',
            Z = 'api:play',
            $ = 'api:pause',
            _ = 'api:buffer_start',
            aa = 'api:chapter_start',
            ba = 'api:chapter_complete',
            ca = 'api:chapter_skip',
            da = 'api:track_error',
            ea = 'api:track_internal_error',
            fa = 'api:bitrate_change',
            ga = 'api:quantum_end',
            ha = 'context:report_available',
            ia = 'net:check_status_complete',
            ja = 'reporting:update_interval',
            ka = 6e5,
            la = 2e3,
            ma = 10;
          d.context.Context = e;
        })(a.ADB.core, a.ADB.va, a.ADB.va.utils, b),
        (function (a) {
          'use strict';
          function b(a, b) {
            (this.trackingServer = a),
              (this.publisher = b),
              (this.ssl = !1),
              (this.ovp = c),
              (this.sdk = c),
              (this.quietMode = !1),
              (this.debugLogging = !1),
              (this.__isPrimetime = !1),
              (this.__psdkVersion = null);
          }
          var c = 'unknown';
          a.AdobeHeartbeatPluginConfig = b;
        })(b),
        (function (a) {
          'use strict';
          function b() {}
          (b.prototype.onError = function (a) {}),
            (b.prototype.onTrackingDisabled = function () {}),
            (a.AdobeHeartbeatPluginDelegate = b);
        })(b),
        (function (a, b, c) {
          'use strict';
          function d(a) {
            d.__super__.constructor.call(this, q),
              (this._radio = new i(this._logger)),
              (this._channel = this._radio.channel(y)),
              (this._delegate = a),
              (this._context = new l(this._channel, this._logger)),
              (this._filter = new m(this._channel, this._logger)),
              (this._network = new n(this._channel, this._logger)),
              this._setupDataResolver();
          }
          var e = a.Event,
            f = a.Trigger,
            g = a.plugin.BasePlugin,
            h = a.plugin.ParamMapping,
            i = a.radio.Radio,
            j = b.ErrorInfo,
            k = b.Version,
            l = c.context.Context,
            m = c.filter.ReportFilter,
            n = c.network.Network,
            o = c.clock.Clock,
            p = c.AdobeHeartbeatPluginConfig;
          a.extend(d, g),
            (d.prototype.configure = function (a) {
              if (!a) throw new Error('Reference to the configuration data cannot be NULL.');
              if (!(a instanceof p))
                throw new Error(
                  'Expected config data to be instance of AdobeHeartbeatPluginConfig.',
                );
              (this._config = a),
                this._config.debugLogging ? this._logger.enable() : this._logger.disable(),
                this._logger.debug(
                  this._logTag,
                  '#configure({trackingServer=' +
                    this._config.trackingServer +
                    ', publisher=' +
                    this._config.publisher +
                    ', quietMode=' +
                    this._config.quietMode +
                    ', ssl=' +
                    this._config.ssl +
                    '})',
                );
              var b = this._config.trackingServer + '/settings/',
                c = {};
              (c[ja] = this._config.trackingServer),
                (c[ka] = b),
                (c[la] = this._config.publisher),
                (c[ma] = this._config.quietMode),
                (c[na] = this._config.ssl),
                this._channel.trigger(new e(sa, c)),
                (this._isConfigured = !0);
            }),
            (d.prototype.bootstrap = function (a) {
              d.__super__.bootstrap.call(this, a),
                this._channel.on(z, this._onError, this),
                (this._clock = new o(this._pluginManager, this._channel, this._logger)),
                this._channel.command(Ra),
                this._channel.trigger(new e(Ya)),
                this._channel.on(pa, this._onCheckStatusComplete, this),
                this._registerCommands(),
                this._registerBehaviours();
            }),
            (d.prototype._teardown = function () {
              this._logger.debug(this._logTag, '#_teardown()'),
                this._radio.shutdown(),
                this._context.destroy(),
                this._clock.destroy(),
                this._filter.destroy(),
                this._network.destroy();
            }),
            (d.prototype._canProcess = function () {
              return this._isConfigured
                ? this._errorInfo
                  ? (this._logger.error(this._logTag, '_canProcess() > Plugin in ERROR state.'), !1)
                  : d.__super__._canProcess.call(this)
                : (this._logger.error(this._logTag, '_canProcess() > Plugin not configured.'), !1);
            }),
            (d.prototype._cmdAnalyticsError = function (a) {
              this._errorInfo ||
                ((this._errorInfo = new j(
                  'Internal error',
                  'AdobeAnalyticsPlugin is in ERROR state.',
                )),
                this._trigger(z, this._errorInfo),
                this._delegate && this._delegate.onError(this._errorInfo));
            }),
            (d.prototype._cmdAnalyticsStart = function (a) {
              this._canProcess() && this._channel.trigger(new e(qa, a));
            }),
            (d.prototype._cmdAnalyticsAdStart = function (a) {
              this._canProcess() && this._channel.trigger(new e(ra, a));
            }),
            (d.prototype._cmdVideoLoad = function (a) {
              (this._errorInfo = null),
                this._canProcess() &&
                  (this._isTrackingSessionActive && this._channel.trigger(new e(ua, a)),
                  (this._isTrackingSessionActive = !1),
                  (this._isPaused = !0),
                  (this._isSeeking = !1),
                  (this._isBuffering = !1),
                  (this._isVideoIdle = !1),
                  this._filter.clear(),
                  this._channel.trigger(new e(ta, a)),
                  (this._isTrackingSessionActive = !0));
            }),
            (d.prototype._cmdVideoUnload = function (a) {
              (this._errorInfo = null),
                this._canProcess() &&
                  (this._channel.trigger(new e(ua, a)),
                  this._filter.flush(),
                  this._runReportingTimer(!1),
                  this._runFlushFilterTimer(!1),
                  this._runIdleTimer(!1),
                  (this._isTrackingSessionActive = !1));
            }),
            (d.prototype._cmdBeginReporting = function (a) {
              this._canProcess() && this._channel.trigger(new e(Pa, {}));
            }),
            (d.prototype._cmdVideoSessionEnd = function (a) {
              this._canProcess() && this._channel.trigger(new e(za, a));
            }),
            (d.prototype._cmdVideoStart = function (a) {
              this._canProcess() && (this._channel.trigger(new e(va, a)), this._filter.flush());
            }),
            (d.prototype._cmdVideoComplete = function (a) {
              this._canProcess() && this._channel.trigger(new e(wa, a));
            }),
            (d.prototype._cmdVideoSkip = function (a) {
              this._canProcess() && this._channel.trigger(new e(xa, a));
            }),
            (d.prototype._cmdVideoResume = function (a) {
              this._canProcess() && this._channel.trigger(new e(ya, a));
            }),
            (d.prototype._cmdPlay = function (a) {
              this._canProcess() && ((this._isPaused = !1), this._resumePlaybackIfPossible(a));
            }),
            (d.prototype._cmdPause = function (a) {
              this._canProcess() &&
                (this._channel.trigger(new e(Ga, a)),
                (this._isPaused = !0),
                this._runIdleTimer(!0));
            }),
            (d.prototype._cmdAdBreakStart = function (a) {
              this._canProcess() && this._channel.trigger(new e(Aa, a));
            }),
            (d.prototype._cmdAdBreakComplete = function (a) {
              this._canProcess() &&
                (this._channel.trigger(new e(Ba, a)), this._resumePlaybackIfPossible(a));
            }),
            (d.prototype._cmdAdStart = function (a) {
              this._canProcess() &&
                (this._channel.trigger(new e(Ca, a)), this._resumePlaybackIfPossible(a));
            }),
            (d.prototype._cmdAdComplete = function (a) {
              this._canProcess() && this._channel.trigger(new e(Da, a));
            }),
            (d.prototype._cmdAdSkip = function (a) {
              this._canProcess() && this._channel.trigger(new e(Ea, a));
            }),
            (d.prototype._cmdBufferStart = function (a) {
              this._canProcess() &&
                (this._channel.trigger(new e(Ha, a)),
                (this._isBuffering = !0),
                this._runIdleTimer(!0));
            }),
            (d.prototype._cmdBufferComplete = function (a) {
              this._canProcess() &&
                ((this._isBuffering = !1),
                this._isPaused
                  ? this._channel.trigger(new e(Ga, a))
                  : this._resumePlaybackIfPossible(a));
            }),
            (d.prototype._cmdSeekStart = function (a) {
              this._canProcess() &&
                (this._channel.trigger(new e(Ga, a)),
                (this._isSeeking = !0),
                this._runIdleTimer(!0));
            }),
            (d.prototype._cmdSeekComplete = function (a) {
              this._canProcess() && ((this._isSeeking = !1), this._resumePlaybackIfPossible(a));
            }),
            (d.prototype._cmdChapterStart = function (a) {
              this._canProcess() && this._channel.trigger(new e(Ia, a));
            }),
            (d.prototype._cmdChapterComplete = function (a) {
              this._canProcess() && this._channel.trigger(new e(Ja, a));
            }),
            (d.prototype._cmdChapterSkip = function (a) {
              this._canProcess() && this._channel.trigger(new e(Ka, a));
            }),
            (d.prototype._cmdBitrateChange = function (a) {
              this._canProcess() && this._channel.trigger(new e(Na, a));
            }),
            (d.prototype._cmdTrackError = function (a) {
              this._canProcess() && this._channel.trigger(new e(La, a));
            }),
            (d.prototype._cmdClockReportingTick = function (a) {
              this._canProcess() && this._channel.trigger(new e(Oa, a));
            }),
            (d.prototype._onCheckStatusComplete = function (a) {
              if (this._canProcess()) {
                var b = !1;
                a && a.data && a.data[oa] && (b = a.data[oa]),
                  this._logger.debug(
                    this._logTag,
                    '#_onCheckStatusComplete(trackingDisabled=' + b + ')',
                  ),
                  b && this._delegate && this._delegate.onTrackingDisabled();
              }
            }),
            (d.prototype._cmdIdleTick = function (a) {
              this._canProcess() &&
                ((this._isVideoIdle = !0),
                this._trigger(aa),
                this._channel.trigger(new e(za, a)),
                this._filter.flush(),
                this._runReportingTimer(!1),
                this._runFlushFilterTimer(!1),
                this._runIdleTimer(!1),
                this._trigger($));
            }),
            (d.prototype._onError = function (a) {
              this._errorInfo = a.data;
              var b = {};
              (b[ha] = Qa),
                (b[ia] = this._errorInfo.getMessage() + '|' + this._errorInfo.getDetails()),
                this._channel.trigger(new e(Ma, b)),
                this._runReportingTimer(!1),
                this._trigger(z, this._errorInfo),
                this._delegate && this._delegate.onError(this._errorInfo);
            }),
            (d.prototype._runIdleTimer = function (a) {
              var b = {};
              (b[ga] = !0), a ? this._channel.command(Wa, b) : this._channel.command(Xa, b);
            }),
            (d.prototype._runFlushFilterTimer = function (a) {
              var b = {};
              (b[ga] = !0), a ? this._channel.command(Ua, b) : this._channel.command(Va, b);
            }),
            (d.prototype._runReportingTimer = function (a) {
              var b = {};
              (b[ga] = !0), a ? this._channel.command(Sa, b) : this._channel.command(Ta, b);
            }),
            (d.prototype._registerCommands = function () {
              this._pluginManager.comply(this, 'handleAnalyticsError', this._cmdAnalyticsError),
                this._pluginManager.comply(this, 'handleAnalyticsStart', this._cmdAnalyticsStart),
                this._pluginManager.comply(
                  this,
                  'handleAnalyticsAdStart',
                  this._cmdAnalyticsAdStart,
                ),
                this._pluginManager.comply(this, 'handleVideoLoad', this._cmdVideoLoad),
                this._pluginManager.comply(this, 'handleVideoUnload', this._cmdVideoUnload),
                this._pluginManager.comply(this, 'handleBeginReporting', this._cmdBeginReporting),
                this._pluginManager.comply(this, 'handleVideoSessionEnd', this._cmdVideoSessionEnd),
                this._pluginManager.comply(this, 'handleVideoStart', this._cmdVideoStart),
                this._pluginManager.comply(this, 'handleVideoComplete', this._cmdVideoComplete),
                this._pluginManager.comply(this, 'handleVideoSkip', this._cmdVideoSkip),
                this._pluginManager.comply(this, 'handleVideoResume', this._cmdVideoResume),
                this._pluginManager.comply(this, 'handlePlay', this._cmdPlay),
                this._pluginManager.comply(this, 'handlePause', this._cmdPause),
                this._pluginManager.comply(this, 'handleAdBreakStart', this._cmdAdBreakStart),
                this._pluginManager.comply(this, 'handleAdBreakComplete', this._cmdAdBreakComplete),
                this._pluginManager.comply(this, 'handleAdStart', this._cmdAdStart),
                this._pluginManager.comply(this, 'handleAdComplete', this._cmdAdComplete),
                this._pluginManager.comply(this, 'handleAdSkip', this._cmdAdSkip),
                this._pluginManager.comply(this, 'handleBufferStart', this._cmdBufferStart),
                this._pluginManager.comply(this, 'handleBufferComplete', this._cmdBufferComplete),
                this._pluginManager.comply(this, 'handleSeekStart', this._cmdSeekStart),
                this._pluginManager.comply(this, 'handleSeekComplete', this._cmdSeekComplete),
                this._pluginManager.comply(this, 'handleChapterStart', this._cmdChapterStart),
                this._pluginManager.comply(this, 'handleChapterComplete', this._cmdChapterComplete),
                this._pluginManager.comply(this, 'handleChapterSkip', this._cmdChapterSkip),
                this._pluginManager.comply(this, 'handleBitrateChange', this._cmdBitrateChange),
                this._pluginManager.comply(this, 'handleTrackError', this._cmdTrackError),
                this._pluginManager.comply(
                  this,
                  'handleClockReportingTick',
                  this._cmdClockReportingTick,
                ),
                this._pluginManager.comply(this, 'handleIdleTick', this._cmdIdleTick);
            }),
            (d.prototype._registerBehaviours = function () {
              this._pluginManager.registerBehaviour(new f(t, C), this, 'handleVideoLoad', [
                new h(s, 'rsid', 'rsid'),
                new h(s, 'tracking_server', 'trackingServer'),
              ]),
                this._pluginManager.registerBehaviour(new f(t, D), this, 'handleVideoUnload'),
                this._pluginManager.registerBehaviour(new f(t, ba), this, 'handleBeginReporting'),
                this._pluginManager.registerBehaviour(new f(t, E), this, 'handleVideoSessionEnd', [
                  new h(t, 'video.playhead', 'playhead'),
                ]),
                this._pluginManager.registerBehaviour(new f(t, F), this, 'handleVideoStart', [
                  new h(t, 'video.id', 'videoId'),
                  new h(t, 'video.name', 'videoName'),
                  new h(t, 'video.length', 'videoLength'),
                  new h(t, 'video.playhead', 'playhead'),
                  new h(t, 'video.playerName', 'playerName'),
                  new h(t, 'video.streamType', 'streamType'),
                  new h(t, 'qos.fps', 'fps'),
                  new h(t, 'qos.droppedFrames', 'droppedFrames'),
                  new h(t, 'qos.bitrate', 'bitrate'),
                  new h(t, 'qos.startupTime', 'startupTime'),
                  new h(s, 'rsid', 'rsid'),
                  new h(s, 'tracking_server', 'trackingServer'),
                  new h(s, 'channel', 'channel'),
                  new h(s, 'meta.video.*', 'metaVideo'),
                  new h(s, 'ssl', 'useSsl'),
                  new h(u, 'meta', 'metaNielsen'),
                  new h(r, 'publisher', 'publisher'),
                  new h(r, 'sdk', 'sdk'),
                  new h(r, 'ovp', 'ovp'),
                  new h(r, 'version', 'version'),
                  new h(r, 'api_level', 'apiLvl'),
                ]),
                this._pluginManager.registerBehaviour(new f(t, H), this, 'handleVideoComplete', [
                  new h(t, 'qos.fps', 'fps'),
                  new h(t, 'qos.droppedFrames', 'droppedFrames'),
                  new h(t, 'qos.bitrate', 'bitrate'),
                  new h(t, 'qos.startupTime', 'startupTime'),
                ]),
                this._pluginManager.registerBehaviour(new f(t, I), this, 'handleVideoSkip', [
                  new h(t, 'video.playhead', 'playhead'),
                  new h(t, 'qos.fps', 'fps'),
                  new h(t, 'qos.droppedFrames', 'droppedFrames'),
                  new h(t, 'qos.bitrate', 'bitrate'),
                  new h(t, 'qos.startupTime', 'startupTime'),
                ]),
                this._pluginManager.registerBehaviour(new f(t, G), this, 'handleVideoResume', [
                  new h(t, 'video.id', 'videoId'),
                  new h(t, 'video.name', 'videoName'),
                  new h(t, 'video.length', 'videoLength'),
                  new h(t, 'video.playhead', 'playhead'),
                  new h(t, 'video.playerName', 'playerName'),
                  new h(t, 'video.streamType', 'streamType'),
                ]),
                this._pluginManager.registerBehaviour(new f(t, J), this, 'handlePlay', [
                  new h(t, 'video.playhead', 'playhead'),
                  new h(t, 'qos.fps', 'fps'),
                  new h(t, 'qos.droppedFrames', 'droppedFrames'),
                  new h(t, 'qos.bitrate', 'bitrate'),
                  new h(t, 'qos.startupTime', 'startupTime'),
                ]),
                this._pluginManager.registerBehaviour(new f(t, K), this, 'handlePause', [
                  new h(t, 'video.playhead', 'playhead'),
                  new h(t, 'video.playheadStalled', 'playheadStalled'),
                  new h(t, 'qos.fps', 'fps'),
                  new h(t, 'qos.droppedFrames', 'droppedFrames'),
                  new h(t, 'qos.bitrate', 'bitrate'),
                  new h(t, 'qos.startupTime', 'startupTime'),
                ]),
                this._pluginManager.registerBehaviour(new f(t, M), this, 'handleAdBreakStart', [
                  new h(t, 'ad.isInAdBreak', 'isInAdBreak'),
                  new h(t, 'video.playhead', 'playhead'),
                  new h(t, 'qos.fps', 'fps'),
                  new h(t, 'qos.droppedFrames', 'droppedFrames'),
                  new h(t, 'qos.bitrate', 'bitrate'),
                  new h(t, 'qos.startupTime', 'startupTime'),
                ]),
                this._pluginManager.registerBehaviour(new f(t, N), this, 'handleAdBreakComplete', [
                  new h(t, 'ad.isInAdBreak', 'isInAdBreak'),
                  new h(t, 'video.playhead', 'playhead'),
                  new h(t, 'qos.fps', 'fps'),
                  new h(t, 'qos.droppedFrames', 'droppedFrames'),
                  new h(t, 'qos.bitrate', 'bitrate'),
                  new h(t, 'qos.startupTime', 'startupTime'),
                ]),
                this._pluginManager.registerBehaviour(new f(t, O), this, 'handleAdStart', [
                  new h(t, 'video.playhead', 'playhead'),
                  new h(t, 'ad.id', 'adId'),
                  new h(t, 'ad.name', 'adName'),
                  new h(t, 'ad.length', 'adLength'),
                  new h(t, 'ad.position', 'adPosition'),
                  new h(t, 'ad.granularTracking', 'adGranularTracking'),
                  new h(t, 'ad.trackingInterval', 'adTrackingInterval'),
                  new h(t, 'pod.name', 'podName'),
                  new h(t, 'pod.playerName', 'podPlayerName'),
                  new h(t, 'pod.position', 'podPosition'),
                  new h(t, 'pod.startTime', 'podSecond'),
                  new h(t, 'qos.fps', 'fps'),
                  new h(t, 'qos.droppedFrames', 'droppedFrames'),
                  new h(t, 'qos.bitrate', 'bitrate'),
                  new h(t, 'qos.startupTime', 'startupTime'),
                  new h(s, 'meta.video.*', 'metaVideo'),
                  new h(s, 'meta.ad.*', 'metaAd'),
                  new h(u, 'meta', 'metaNielsen'),
                  new h(u, 'metaAd', 'metaAdNielsen'),
                ]),
                this._pluginManager.registerBehaviour(new f(t, P), this, 'handleAdComplete', [
                  new h(t, 'video.playhead', 'playhead'),
                  new h(t, 'ad.isInAdBreak', 'isInAdBreak'),
                  new h(t, 'qos.fps', 'fps'),
                  new h(t, 'qos.droppedFrames', 'droppedFrames'),
                  new h(t, 'qos.bitrate', 'bitrate'),
                  new h(t, 'qos.startupTime', 'startupTime'),
                ]),
                this._pluginManager.registerBehaviour(new f(t, Q), this, 'handleAdSkip', [
                  new h(t, 'video.playhead', 'playhead'),
                  new h(t, 'ad.isInAdBreak', 'isInAdBreak'),
                  new h(t, 'qos.fps', 'fps'),
                  new h(t, 'qos.droppedFrames', 'droppedFrames'),
                  new h(t, 'qos.bitrate', 'bitrate'),
                  new h(t, 'qos.startupTime', 'startupTime'),
                ]),
                this._pluginManager.registerBehaviour(new f(t, R), this, 'handleBufferStart', [
                  new h(t, 'video.playhead', 'playhead'),
                  new h(t, 'qos.fps', 'fps'),
                  new h(t, 'qos.droppedFrames', 'droppedFrames'),
                  new h(t, 'qos.bitrate', 'bitrate'),
                  new h(t, 'qos.startupTime', 'startupTime'),
                ]),
                this._pluginManager.registerBehaviour(new f(t, S), this, 'handleBufferComplete', [
                  new h(t, 'video.playhead', 'playhead'),
                  new h(t, 'video.playheadStalled', 'playheadStalled'),
                  new h(t, 'qos.fps', 'fps'),
                  new h(t, 'qos.droppedFrames', 'droppedFrames'),
                  new h(t, 'qos.bitrate', 'bitrate'),
                  new h(t, 'qos.startupTime', 'startupTime'),
                ]),
                this._pluginManager.registerBehaviour(new f(t, T), this, 'handleSeekStart', [
                  new h(t, 'video.playhead', 'playhead'),
                ]),
                this._pluginManager.registerBehaviour(new f(t, U), this, 'handleSeekComplete', [
                  new h(t, 'video.playhead', 'playhead'),
                  new h(t, 'ad.isInAd', 'isInAd'),
                  new h(t, 'ad.id', 'adId'),
                  new h(t, 'ad.position', 'adPosition'),
                  new h(t, 'pod.playerName', 'podPlayerName'),
                  new h(t, 'pod.position', 'podPosition'),
                  new h(t, 'chapter.isInChapter', 'isInChapter'),
                  new h(t, 'chapter.position', 'chapterPosition'),
                  new h(t, 'chapter.name', 'chapterName'),
                  new h(t, 'chapter.length', 'chapterLength'),
                  new h(t, 'chapter.startTime', 'chapterOffset'),
                  new h(t, 'qos.fps', 'fps'),
                  new h(t, 'qos.droppedFrames', 'droppedFrames'),
                  new h(t, 'qos.bitrate', 'bitrate'),
                  new h(t, 'qos.startupTime', 'startupTime'),
                ]),
                this._pluginManager.registerBehaviour(new f(t, V), this, 'handleChapterStart', [
                  new h(t, 'video.playhead', 'playhead'),
                  new h(t, 'chapter.position', 'chapterPosition'),
                  new h(t, 'chapter.name', 'chapterName'),
                  new h(t, 'chapter.length', 'chapterLength'),
                  new h(t, 'chapter.startTime', 'chapterOffset'),
                  new h(t, 'qos.fps', 'fps'),
                  new h(t, 'qos.droppedFrames', 'droppedFrames'),
                  new h(t, 'qos.bitrate', 'bitrate'),
                  new h(t, 'qos.startupTime', 'startupTime'),
                  new h(s, 'meta.video.*', 'metaVideo'),
                  new h(s, 'meta.chapter.*', 'metaChapter'),
                  new h(u, 'meta', 'metaNielsen'),
                ]),
                this._pluginManager.registerBehaviour(new f(t, W), this, 'handleChapterComplete', [
                  new h(t, 'video.playhead', 'playhead'),
                  new h(t, 'qos.fps', 'fps'),
                  new h(t, 'qos.droppedFrames', 'droppedFrames'),
                  new h(t, 'qos.bitrate', 'bitrate'),
                  new h(t, 'qos.startupTime', 'startupTime'),
                ]),
                this._pluginManager.registerBehaviour(new f(t, X), this, 'handleChapterSkip', [
                  new h(t, 'video.playhead', 'playhead'),
                  new h(t, 'qos.fps', 'fps'),
                  new h(t, 'qos.droppedFrames', 'droppedFrames'),
                  new h(t, 'qos.bitrate', 'bitrate'),
                  new h(t, 'qos.startupTime', 'startupTime'),
                ]),
                this._pluginManager.registerBehaviour(new f(t, Y), this, 'handleBitrateChange', [
                  new h(t, 'video.playhead', 'playhead'),
                  new h(t, 'qos.fps', 'fps'),
                  new h(t, 'qos.droppedFrames', 'droppedFrames'),
                  new h(t, 'qos.bitrate', 'bitrate'),
                  new h(t, 'qos.startupTime', 'startupTime'),
                ]),
                this._pluginManager.registerBehaviour(new f(t, Z), this, 'handleTrackError'),
                this._pluginManager.registerBehaviour(
                  new f(v, da),
                  this,
                  'handleClockReportingTick',
                  [
                    new h(t, 'video.playhead', 'playhead'),
                    new h(t, 'qos.fps', 'fps'),
                    new h(t, 'qos.droppedFrames', 'droppedFrames'),
                    new h(t, 'qos.bitrate', 'bitrate'),
                    new h(t, 'qos.startupTime', 'startupTime'),
                  ],
                ),
                this._pluginManager.registerBehaviour(
                  new f(t, L),
                  this,
                  'handleClockReportingTick',
                  [
                    new h(t, 'video.playhead', 'playhead'),
                    new h(t, 'qos.fps', 'fps'),
                    new h(t, 'qos.droppedFrames', 'droppedFrames'),
                    new h(t, 'qos.bitrate', 'bitrate'),
                    new h(t, 'qos.startupTime', 'startupTime'),
                  ],
                ),
                this._pluginManager.registerBehaviour(new f(v, fa), this, 'handleIdleTick', [
                  new h(t, 'video.playhead', 'playhead'),
                ]),
                this._pluginManager.registerBehaviour(
                  new f(r, aa),
                  this,
                  'handleClockReportingTick',
                  [
                    new h(t, 'video.playhead', 'playhead'),
                    new h(t, 'qos.fps', 'fps'),
                    new h(t, 'qos.droppedFrames', 'droppedFrames'),
                    new h(t, 'qos.bitrate', 'bitrate'),
                    new h(t, 'qos.startupTime', 'startupTime'),
                  ],
                ),
                this._pluginManager.registerBehaviour(new f(s, z), this, 'handleAnalyticsError'),
                this._pluginManager.registerBehaviour(new f(s, A), this, 'handleAnalyticsStart', [
                  new h(s, 'vid', 'vid'),
                  new h(s, 'aid', 'aid'),
                  new h(s, 'mid', 'mid'),
                  new h(s, 'customerIDs', 'customerIDs'),
                  new h(s, 'blob', 'blob'),
                  new h(s, 'loc_hint', 'loc_hint'),
                  new h(t, 'video.playhead', 'playhead'),
                  new h(t, 'qos.fps', 'fps'),
                  new h(t, 'qos.droppedFrames', 'droppedFrames'),
                  new h(t, 'qos.bitrate', 'bitrate'),
                  new h(t, 'qos.startupTime', 'startupTime'),
                ]),
                this._pluginManager.registerBehaviour(new f(s, B), this, 'handleAnalyticsAdStart', [
                  new h(t, 'video.playhead', 'playhead'),
                  new h(t, 'qos.fps', 'fps'),
                  new h(t, 'qos.droppedFrames', 'droppedFrames'),
                  new h(t, 'qos.bitrate', 'bitrate'),
                  new h(t, 'qos.startupTime', 'startupTime'),
                ]);
            }),
            (d.prototype._setupDataResolver = function () {
              var a = {},
                b = this;
              (a.version = function () {
                return k.getVersion();
              }),
                (a.api_level = function () {
                  return k.getApiLevel();
                }),
                (a.tracking_server = function () {
                  return b._config ? b._config.trackingServer : null;
                }),
                (a.publisher = function () {
                  return b._config ? b._config.publisher : null;
                }),
                (a.quiet_mode = function () {
                  return !!b._config && b._config.quietMode;
                }),
                (a.ovp = function () {
                  return b._config ? b._config.ovp : null;
                }),
                (a.sdk = function () {
                  return b._config ? b._config.sdk : null;
                }),
                (a.is_primetime = function () {
                  return !!b._config && b._config.__isPrimetime;
                }),
                (a.psdk_version = function () {
                  return b._config ? b._config.__psdkVersion : null;
                }),
                (a.session_id = function () {
                  return b._channel.request(w);
                }),
                (this._dataResolver = function (b) {
                  if (!b || 0 == b.length) return null;
                  for (var c = null, d = 0; d < b.length; d++) {
                    var e = b[d];
                    (c = c || {}), (c[e] = a.hasOwnProperty(e) ? a[e].call(this) : null);
                  }
                  return c;
                });
            }),
            (d.prototype._resumePlaybackIfPossible = function (a) {
              this._errorInfo ||
                this._isPaused ||
                this._isSeeking ||
                this._isBuffering ||
                (this._isVideoIdle
                  ? ((this._isVideoIdle = !1), this._resumePlaybackFromIdle())
                  : this._channel.trigger(new e(Fa, a)),
                this._runIdleTimer(!1));
            }),
            (d.prototype._resumePlaybackFromIdle = function () {
              this._trigger(aa),
                this._filter.clear(),
                this._channel.trigger(new e(x)),
                this._trigger(_),
                this._runReportingTimer(!0),
                this._runFlushFilterTimer(!0);
            });
          var q = 'adobe-heartbeat',
            r = q,
            s = 'adobe-analytics',
            t = 'player',
            u = 'nielsen',
            v = 'service.clock',
            w = 'session_id',
            x = 'reset_session_id',
            y = 'heartbeat-channel',
            z = 'error',
            A = 'aa_start',
            B = 'sc_ad_start',
            C = 'video_load',
            D = 'video_unload',
            E = 'video_session_end',
            F = 'video_start',
            G = 'video_resume',
            H = 'video_complete',
            I = 'video_skip',
            J = 'play',
            K = 'pause',
            L = 'content_start',
            M = 'adbreak_start',
            N = 'adbreak_complete',
            O = 'ad_start',
            P = 'ad_complete',
            Q = 'ad_skip',
            R = 'buffer_start',
            S = 'buffer_complete',
            T = 'seek_start',
            U = 'seek_complete',
            V = 'chapter_start',
            W = 'chapter_complete',
            X = 'chapter_skip',
            Y = 'bitrate_change',
            Z = 'track_error',
            $ = 'video_idle_start',
            _ = 'video_idle_resume',
            aa = 'quantum_close',
            ba = 'video_begin_reporting',
            ca = 'heartbeat.reporting',
            da = ca + '.tick',
            ea = 'heartbeat.idle',
            fa = ea + '.tick',
            ga = 'reset',
            ha = 'source',
            ia = 'error_id',
            ja = 'tracking_server',
            ka = 'check_status_server',
            la = 'publisher',
            ma = 'quiet_mode',
            na = 'ssl',
            oa = 'tracking_disabled',
            pa = 'net:check_status_complete',
            qa = 'api:aa_start',
            ra = 'api:aa_ad_start',
            sa = 'api:config',
            ta = 'api:video_load',
            ua = 'api:video_unload',
            va = 'api:video_start',
            wa = 'api:video_complete',
            xa = 'api:video_skip',
            ya = 'api:video_resume',
            za = 'api:video_session_end',
            Aa = 'api:adbreak_start',
            Ba = 'api:adbreak_complete',
            Ca = 'api:ad_start',
            Da = 'api:ad_complete',
            Ea = 'api:ad_skip',
            Fa = 'api:play',
            Ga = 'api:pause',
            Ha = 'api:buffer_start',
            Ia = 'api:chapter_start',
            Ja = 'api:chapter_complete',
            Ka = 'api:chapter_skip',
            La = 'api:track_error',
            Ma = 'api:track_internal_error',
            Na = 'api:bitrate_change',
            Oa = 'api:quantum_end',
            Pa = 'api:video_begin_reporting',
            Qa = 'sourceErrorHeartbeat',
            Ra = 'clock:check_status.resume',
            Sa = 'clock:reporting.resume',
            Ta = 'clock:reporting.pause',
            Ua = 'clock:flush_filter.resume',
            Va = 'clock:flush_filter.pause',
            Wa = 'clock:idle.resume',
            Xa = 'clock:idle.pause',
            Ya = 'clock:check_status.get_settings';
          c.AdobeHeartbeatPlugin = d;
        })(a.ADB.core, a.ADB.va, b),
        a.ADB.va.plugins.ah || (a.ADB.va.plugins.ah = b);
    })(this);

    // AdobeAnalyticsPlugin
    !(function (a) {
      if (void 0 === b) var b = {};
      !(function (a, b) {
        'use strict';
        function c(a, b) {
          this._onFail = { fn: a, ctx: b };
        }
        var d = a.ErrorInfo;
        (c.prototype.validateFields = function (a, b) {
          if (!a) return this._fail('Data cannot be null');
          if (b)
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              switch (d) {
                case 'videoId':
                  if (!a.hasOwnProperty('videoId'))
                    return this._fail('The ID for the main video must be specified.');
                  if ('string' != typeof a.videoId)
                    return this._fail('The ID for the main video must be a String.');
                  if ('' === a.videoId)
                    return this._fail('The ID for the main video cannot be an empty string.');
                  break;
                case 'mediaType':
                  if (!a.hasOwnProperty('mediaType'))
                    return this._fail('The media type for the main video must be specified.');
                  if ('string' != typeof a.mediaType)
                    return this._fail('The media type for the main video must be a String.');
                  if ('' === a.mediaType)
                    return this._fail(
                      'The stream type for the main video cannot be an empty string.',
                    );
                  break;
                case 'streamType':
                  if (!a.hasOwnProperty('streamType'))
                    return this._fail('The stream type for the main video must be specified.');
                  if ('string' != typeof a.streamType)
                    return this._fail('The stream type for the main video must be a String.');
                  if ('' === a.streamType)
                    return this._fail(
                      'The stream type for the main video cannot be an empty string.',
                    );
                  break;
                case 'playerName':
                  if (!a.hasOwnProperty('playerName'))
                    return this._fail('The player name for the main video must be specified.');
                  if ('string' != typeof a.playerName)
                    return this._fail('The player name for the main video must be a String.');
                  if ('' === a.playerName)
                    return this._fail(
                      'The player name for the main video cannot be an empty string.',
                    );
                  break;
                case 'videoLength':
                  if (!a.hasOwnProperty('videoLength'))
                    return this._fail('The length of the main video must be specified.');
                  if ('number' != typeof a.videoLength)
                    return this._fail('The length of the main video must be a Number.');
                  if (isNaN(a.videoLength))
                    return this._fail('The length of the main video cannot be NaN.');
                  break;
                case 'podPlayerName':
                  if (!a.hasOwnProperty('podPlayerName'))
                    return this._fail('The player name for the ad-break must be specified.');
                  if ('string' != typeof a.podPlayerName)
                    return this._fail('The player name for the ad-break must be a String.');
                  if ('' === a.podPlayerName)
                    return this._fail(
                      'The player name for the ad-break cannot be an empty string.',
                    );
                  break;
                case 'podPosition':
                  if (!a.hasOwnProperty('podPosition'))
                    return this._fail('Position (index) of the ad-break must be specified.');
                  if ('number' != typeof a.podPosition)
                    return this._fail('Position (index) of the ad-break must be a Number.');
                  if (isNaN(a.podPosition))
                    return this._fail('Position (index) of the ad-break cannot be NaN.');
                  break;
                case 'adId':
                  if (!a.hasOwnProperty('adId')) return this._fail('The ad ID must be specified.');
                  if ('string' != typeof a.adId) return this._fail('The ad ID must be a String.');
                  if ('' === a.adId) return this._fail('The ad ID cannot be an empty string.');
                  break;
                case 'adPosition':
                  if (!a.hasOwnProperty('adPosition'))
                    return this._fail('Position (index) of the ad must be specified.');
                  if ('number' != typeof a.adPosition)
                    return this._fail('Position (index) of the ad must be a Number.');
                  if (isNaN(a.adPosition))
                    return this._fail('Position (index) of the ad cannot be NaN.');
                  break;
                case 'adLength':
                  if (!a.hasOwnProperty('adLength'))
                    return this._fail('The length of the ad must be specified.');
                  if ('number' != typeof a.adLength)
                    return this._fail('The length of the ad must be a Number.');
                  if (isNaN(a.adLength)) return this._fail('The length of the ad cannot be NaN.');
                  break;
                default:
                  return this._fail('Unable to validate unknown parameter: ' + d);
              }
            }
          return !0;
        }),
          (c.prototype._fail = function (a) {
            var b = new d('Invalid input data', a);
            return this._onFail.fn && this._onFail.fn.call(this._onFail.ctx, b), !1;
          }),
          (b.InputDataValidator = c);
      })(a.ADB.va, b),
        (function (a) {
          'use strict';
          function b() {
            (this.channel = c), (this.debugLogging = !1);
          }
          var c = '';
          a.AdobeAnalyticsPluginConfig = b;
        })(b),
        (function (a) {
          'use strict';
          function b() {}
          (b.prototype.onError = function (a) {}), (a.AdobeAnalyticsPluginDelegate = b);
        })(b),
        (function (a, b, c, d) {
          'use strict';
          function e(a) {
            this._aaPlugin = a;
          }
          function f(a, b) {
            if ((f.__super__.constructor.call(this, s), !a))
              throw new Error('The reference to the AppMeasurement object cannot be NULL.');
            if (a.unsupportedBrowser)
              throw new Error('AppMeasurement is not supported in current browser.');
            (this._appMeasurement = a),
              (this._appMeasurementBridge = new e(this)),
              (this._delegate = b),
              (this._videoMetadata = {}),
              (this._adMetadata = {}),
              (this._chapterMetadata = {}),
              (this._errorInfo = null),
              (this._appMeasurementReady = !1),
              (this._beginReporting = !1),
              (this._workQueue = new l(!0, x)),
              (this._inputDataValidator = new r(function (a) {
                (this._errorInfo = a),
                  this._logger.error(this._logTag, a.getMessage() + ' | ' + a.getDetails());
                var b = this;
                setTimeout(function () {
                  b._trigger(y, a), b._delegate && b._delegate.onError(b._errorInfo);
                }, 0);
              }, this)),
              this._appMeasurement.isReadyToTrack(),
              this._setupDataResolver();
          }
          var g = a.Trigger,
            h = a.plugin.BasePlugin,
            i = a.plugin.ParamMapping,
            j = a.radio.Channel,
            k = a.radio.Command,
            l = a.radio.CommandQueue,
            m = b.ErrorInfo,
            n = c.md5,
            o = c.StringUtils,
            p = c.ObjectUtils,
            q = d.AdobeAnalyticsPluginConfig,
            r = d.InputDataValidator;
          (e.prototype.onAppMeasurementReady = function () {
            this._aaPlugin && this._aaPlugin._onAppMeasurementReady();
          }),
            (e.prototype.release = function () {
              this._aaPlugin = null;
            }),
            a.extend(f, h),
            (f.prototype.configure = function (a) {
              if (!a) throw new Error('Reference to the configuration data cannot be NULL.');
              if (!(a instanceof q))
                throw new Error(
                  'Expected config data to be instance of AdobeAnalyticsPluginConfig.',
                );
              (this._config = a),
                this._config.debugLogging ? this._logger.enable() : this._logger.disable(),
                this._logger.debug(
                  this._logTag,
                  '#configure({trackingServer=' +
                    this._config.debugLogging +
                    ', channel=' +
                    this._config.channel +
                    ', ssl=' +
                    this._appMeasurement.ssl +
                    '})',
                );
            }),
            (f.prototype.bootstrap = function (a) {
              f.__super__.bootstrap.call(this, a),
                this._registerCommands(),
                this._registerBehaviours();
            }),
            (f.prototype.setup = function () {
              this._appMeasurement.isReadyToTrack()
                ? this._onAppMeasurementReady()
                : this._appMeasurement.callbackWhenReadyToTrack(
                    this._appMeasurementBridge,
                    this._appMeasurementBridge.onAppMeasurementReady,
                    [],
                  ),
                f.__super__.setup.call(this);
            }),
            (f.prototype.setVideoMetadata = function (a) {
              this._videoMetadata = p.clone(a);
            }),
            (f.prototype.setAdMetadata = function (a) {
              this._adMetadata = p.clone(a);
            }),
            (f.prototype.setChapterMetadata = function (a) {
              this._chapterMetadata = p.clone(a);
            }),
            (f.prototype._teardown = function () {
              this._logger.debug(this._logTag, '#_teardown()'),
                this._appMeasurementBridge.release();
            }),
            (f.prototype._canProcess = function () {
              return this._errorInfo
                ? (this._logger.error(this._logTag, '#_canProcess() > In ERROR state.'), !1)
                : f.__super__._canProcess.call(this);
            }),
            (f.prototype._cmdVideoLoad = function (a) {
              this._errorInfo = null;
            }),
            (f.prototype._cmdBeginReporting = function (a) {
              this._logger.debug(this._logTag, '#_cmdBeginReporting()'),
                (this._beginReporting = !0),
                this._resumeWorkQueue();
            }),
            (f.prototype._cmdVideoStart = function (a) {
              this._logger.debug(this._logTag, '#_cmdVideoStart()'),
                this._canProcess() &&
                  this._workQueue.addCommand(new k(this._executeOpen, this, [a]));
            }),
            (f.prototype._cmdAdStart = function (a) {
              this._logger.debug(this._logTag, '#_cmdAdStart()'),
                this._canProcess() &&
                  this._workQueue.addCommand(new k(this._executeOpenAd, this, [a]));
            }),
            (f.prototype._cmdHeartbeatPluginError = function (a) {
              this._errorInfo ||
                ((this._errorInfo = new m('Internal error', 'HeartbeatPlugin is in ERROR state.')),
                this._trigger(y, this._errorInfo),
                this._delegate && this._delegate.onError(this._errorInfo));
            }),
            (f.prototype._track = function (a) {
              try {
                var b = this._appMeasurement.linkTrackVars;
                (this._appMeasurement.linkTrackVars = ''),
                  this._appMeasurement.track(a),
                  (this._appMeasurement.linkTrackVars = b);
              } catch (a) {
                this._logger.warn(this._logTag, 'appMeasurement.track() call threw an exception.');
              }
            }),
            (f.prototype._executeOpen = function (a) {
              if (
                (this._logger.debug(
                  this._logTag,
                  '#_executeOpen(id=' +
                    a.videoId +
                    ', videoName=' +
                    a.videoName +
                    ', mediaType=' +
                    a.mediaType +
                    ', streamType=' +
                    a.streamType +
                    ', length=' +
                    a.videoLength +
                    ', playerName=' +
                    a.playerName +
                    ', channel=' +
                    a.channel +
                    ', isPrimetime=' +
                    a.isPrimetime +
                    ', sessionId=' +
                    a.sessionId +
                    ')',
                ),
                this._canProcess() &&
                  this._inputDataValidator.validateFields(a, [
                    'videoId',
                    'mediaType',
                    'streamType',
                    'videoLength',
                    'playerName',
                  ]))
              ) {
                var b = {};
                for (var c in a.metaVideo) a.metaVideo.hasOwnProperty(c) && (b[c] = a.metaVideo[c]);
                if (a.metaNielsen)
                  for (var c in a.metaNielsen)
                    a.metaNielsen.hasOwnProperty(c) && (b[c] = a.metaNielsen[c]);
                (b['a.contentType'] = a.streamType),
                  (b['a.media.name'] = a.videoId),
                  (b['a.media.friendlyName'] = a.videoName || ''),
                  (b['a.media.length'] = Math.floor(a.videoLength) || '0.0'),
                  (b['a.media.playerName'] = a.playerName),
                  (b['a.media.channel'] = a.channel || ''),
                  (b['a.media.view'] = !0),
                  (b['a.media.vsid'] = a.sessionId);
                var d = {};
                (d.contextData = b),
                  'audio' === a.mediaType ? ((d.pev3 = B), (d.ms_a = '1')) : (d.pev3 = z),
                  (d.pe = a.isPrimetime ? E : D),
                  this._track(d);
                var e = this;
                setTimeout(function () {
                  e._trigger(H, a);
                }, 0);
              }
            }),
            (f.prototype._executeOpenAd = function (a) {
              var b = n(a.videoId) + '_' + a.podPosition;
              if (
                (this._logger.debug(
                  this._logTag,
                  '#_executeOpenAd(id=' +
                    a.adId +
                    ', mediaType=' +
                    a.mediaType +
                    ', streamType=' +
                    a.streamType +
                    ', length=' +
                    a.adLength +
                    ', podPlayerName=' +
                    a.podPlayerName +
                    ', parentId=' +
                    a.videoId +
                    ', podId=' +
                    b +
                    ', parentPodPosition=' +
                    a.adPosition +
                    ', podSecond=' +
                    a.podSecond +
                    ')',
                ),
                this._canProcess() &&
                  this._inputDataValidator.validateFields(a, [
                    'videoId',
                    'mediaType',
                    'streamType',
                    'playerName',
                    'adId',
                    'adLength',
                    'podPlayerName',
                    'adPosition',
                  ]))
              ) {
                a.podSecond = null == a.podSecond || isNaN(a.podSecond) ? a.playhead : a.podSecond;
                var c,
                  d = {};
                for (c in a.metaVideo) a.metaVideo.hasOwnProperty(c) && (d[c] = a.metaVideo[c]);
                for (c in a.metaAd) a.metaAd.hasOwnProperty(c) && (d[c] = a.metaAd[c]);
                if (a.metaNielsen)
                  for (var c in a.metaNielsen)
                    a.metaNielsen.hasOwnProperty(c) && (d[c] = a.metaNielsen[c]);
                (d['a.contentType'] = a.streamType),
                  (d['a.media.name'] = a.videoId),
                  (d['a.media.playerName'] = a.playerName),
                  (d['a.media.channel'] = a.channel || ''),
                  (d['a.media.vsid'] = a.sessionId),
                  (d['a.media.friendlyName'] = a.videoName || ''),
                  (d['a.media.length'] = Math.floor(a.videoLength) || '0.0'),
                  (d['a.media.ad.name'] = a.adId),
                  (d['a.media.ad.friendlyName'] = a.adName || ''),
                  (d['a.media.ad.podFriendlyName'] = a.podName || ''),
                  (d['a.media.ad.length'] = Math.floor(a.adLength) || '0.0'),
                  (d['a.media.ad.playerName'] = a.podPlayerName),
                  (d['a.media.ad.pod'] = b),
                  (d['a.media.ad.podPosition'] = Math.floor(a.adPosition) || '0.0'),
                  (d['a.media.ad.podSecond'] = Math.floor(a.podSecond) || '0.0'),
                  (d['a.media.ad.view'] = !0);
                var e = {};
                (e.contextData = d),
                  'audio' === a.mediaType ? ((e.pev3 = C), (e.ms_a = '1')) : (e.pev3 = A),
                  (e.pe = a.isPrimetime ? G : F),
                  this._track(e);
                var f = this;
                setTimeout(function () {
                  f._trigger(I, a);
                }, 0);
              }
            }),
            (f.prototype._setupDataResolver = function () {
              var a = {},
                b = this;
              (a.rsid = function () {
                return b._appMeasurement.account;
              }),
                (a.tracking_server = function () {
                  return b._appMeasurement.ssl && b._appMeasurement.trackingServerSecure
                    ? b._appMeasurement.trackingServerSecure
                    : b._appMeasurement.trackingServer;
                }),
                (a.ssl = function () {
                  return b._appMeasurement.ssl;
                }),
                (a.vid = function () {
                  return b._appMeasurement.visitorID;
                }),
                (a.aid = function () {
                  return b._appMeasurement.analyticsVisitorID;
                }),
                (a.mid = function () {
                  return b._appMeasurement.marketingCloudVisitorID;
                }),
                (a.blob = function () {
                  return b._appMeasurement.audienceManagerBlob;
                }),
                (a.loc_hint = function () {
                  return b._appMeasurement.audienceManagerLocationHint
                    ? parseInt(b._appMeasurement.audienceManagerLocationHint)
                    : '';
                }),
                (a.customerIDs = function () {
                  var a = {},
                    c = b._appMeasurement.visitor.getCustomerIDs();
                  for (var d in c)
                    if (c.hasOwnProperty(d)) {
                      var e = c[d];
                      if ('object' == typeof e) {
                        for (var f in e)
                          e.hasOwnProperty(f) &&
                            ('authState' == f ? (a[d + '.as'] = e[f]) : (a[d + '.' + f] = e[f]));
                        a[d + '.as'] || (a[d + '.as'] = '0');
                      }
                    }
                  return a;
                }),
                (a.channel = function () {
                  return b._config ? b._config.channel : null;
                }),
                (a.meta = function (a) {
                  var c = a.split('.');
                  if (c.length < 2) return null;
                  var d = c.shift();
                  switch (((a = c.join('.')), d)) {
                    case 'video':
                      return a == j.WILDCARD ? b._videoMetadata : b._videoMetadata[a];
                    case 'ad':
                      return a == j.WILDCARD ? b._adMetadata : b._adMetadata[a];
                    case 'chapter':
                      return a == j.WILDCARD ? b._chapterMetadata : b._chapterMetadata[a];
                    default:
                      return null;
                  }
                }),
                (this._dataResolver = function (b) {
                  if (!b || 0 == b.length) return null;
                  for (var c = null, d = 0; d < b.length; d++) {
                    var e = b[d];
                    (c = c || {}),
                      o.startsWith(e, 'meta.')
                        ? (c[e] = a.meta(e.split('meta.')[1]))
                        : (c[e] = a.hasOwnProperty(e) ? a[e].call(this) : null);
                  }
                  return c;
                });
            }),
            (f.prototype._registerCommands = function () {
              this._pluginManager.comply(this, 'handleVideoLoad', this._cmdVideoLoad),
                this._pluginManager.comply(this, 'handleBeginReporting', this._cmdBeginReporting),
                this._pluginManager.comply(this, 'handleVideoStart', this._cmdVideoStart),
                this._pluginManager.comply(this, 'handleAdStart', this._cmdAdStart),
                this._pluginManager.comply(
                  this,
                  'handleHeartbeatPluginError',
                  this._cmdHeartbeatPluginError,
                );
            }),
            (f.prototype._registerBehaviours = function () {
              this._pluginManager.registerBehaviour(new g(v, J), this, 'handleVideoLoad'),
                this._pluginManager.registerBehaviour(new g(v, M), this, 'handleBeginReporting'),
                this._pluginManager.registerBehaviour(new g(v, K), this, 'handleVideoStart', [
                  new i(v, 'video.id', 'videoId'),
                  new i(v, 'video.mediaType', 'mediaType'),
                  new i(v, 'video.streamType', 'streamType'),
                  new i(v, 'video.name', 'videoName'),
                  new i(v, 'video.length', 'videoLength'),
                  new i(v, 'video.playerName', 'playerName'),
                  new i(v, 'video.streamType', 'streamType'),
                  new i(w, 'is_primetime', 'isPrimetime'),
                  new i(w, 'session_id', 'sessionId'),
                  new i(t, 'channel', 'channel'),
                  new i(t, 'meta.video.*', 'metaVideo'),
                  new i(u, 'meta', 'metaNielsen'),
                ]),
                this._pluginManager.registerBehaviour(new g(v, L), this, 'handleAdStart', [
                  new i(v, 'video.id', 'videoId'),
                  new i(v, 'video.mediaType', 'mediaType'),
                  new i(v, 'video.streamType', 'streamType'),
                  new i(v, 'video.playhead', 'playhead'),
                  new i(v, 'video.playerName', 'playerName'),
                  new i(v, 'video.name', 'videoName'),
                  new i(v, 'video.length', 'videoLength'),
                  new i(v, 'ad.id', 'adId'),
                  new i(v, 'ad.length', 'adLength'),
                  new i(v, 'ad.position', 'adPosition'),
                  new i(v, 'ad.name', 'adName'),
                  new i(v, 'pod.name', 'podName'),
                  new i(v, 'pod.position', 'podPosition'),
                  new i(v, 'pod.playerName', 'podPlayerName'),
                  new i(v, 'pod.startTime', 'podSecond'),
                  new i(w, 'is_primetime', 'isPrimetime'),
                  new i(w, 'session_id', 'sessionId'),
                  new i(t, 'channel', 'channel'),
                  new i(t, 'meta.video.*', 'metaVideo'),
                  new i(t, 'meta.ad.*', 'metaAd'),
                  new i(u, 'meta', 'metaNielsen'),
                ]),
                this._pluginManager.registerBehaviour(
                  new g(w, y),
                  this,
                  'handleHeartbeatPluginError',
                );
            }),
            (f.prototype._onAppMeasurementReady = function () {
              this._logger.debug(this._logTag, '#_onAppMeasurementReady'),
                (this._appMeasurementReady = !0),
                this._resumeWorkQueue();
            }),
            (f.prototype._resumeWorkQueue = function () {
              this._appMeasurementReady &&
                this._beginReporting &&
                (this._logger.debug(this._logTag, '#_resumeWorkQueue'), this._workQueue.resume());
            });
          var s = 'adobe-analytics',
            t = s,
            u = 'nielsen',
            v = 'player',
            w = 'adobe-heartbeat',
            x = 2e3,
            y = 'error',
            z = 'video',
            A = 'videoAd',
            B = 'audio',
            C = 'audioAd',
            D = 'ms_s',
            E = 'msp_s',
            F = 'msa_s',
            G = 'mspa_s',
            H = 'aa_start',
            I = 'sc_ad_start',
            J = 'video_load',
            K = 'video_start',
            L = 'ad_start',
            M = 'video_begin_reporting';
          d.AdobeAnalyticsPlugin = f;
        })(a.ADB.core, a.ADB.va, a.ADB.va.utils, b),
        (function (a) {
          'use strict';
          var b = {
              SHOW: 'a.media.show',
              SEASON: 'a.media.season',
              EPISODE: 'a.media.episode',
              ASSET_ID: 'a.media.asset',
              GENRE: 'a.media.genre',
              FIRST_AIR_DATE: 'a.media.airDate',
              FIRST_DIGITAL_DATE: 'a.media.digitalDate',
              RATING: 'a.media.rating',
              ORIGINATOR: 'a.media.originator',
              NETWORK: 'a.media.network',
              SHOW_TYPE: 'a.media.type',
              AD_LOAD: 'a.media.adLoad',
              MVPD: 'a.media.pass.mvpd',
              AUTHORIZED: 'a.media.pass.auth',
              DAY_PART: 'a.media.dayPart',
              FEED: 'a.media.feed',
              STREAM_FORMAT: 'a.media.format',
            },
            c = {
              ARTIST: 'a.media.artist',
              ALBUM: 'a.media.album',
              LABEL: 'a.media.label',
              AUTHOR: 'a.media.author',
              STATION: 'a.media.station',
              PUBLISHER: 'a.media.publisher',
            },
            d = {
              ADVERTISER: 'a.media.ad.advertiser',
              CAMPAIGN_ID: 'a.media.ad.campaign',
              CREATIVE_ID: 'a.media.ad.creative',
              PLACEMENT_ID: 'a.media.ad.placement',
              SITE_ID: 'a.media.ad.site',
              CREATIVE_URL: 'a.media.ad.creativeURL',
            };
          (a.VideoMetadataKeys = b), (a.AudioMetadataKeys = c), (a.AdMetadataKeys = d);
        })(b),
        a.ADB.va.plugins.aa || (a.ADB.va.plugins.aa = b);
    })(this);

    // MediaHeartbeat
    !(function (a) {
      !(function (a, b) {
        'use strict';
        function c() {
          (this._processAction = !0), (this._store = {});
        }
        function d(a) {
          if (!a) throw new Error('Reference to the logger object cannot be NULL');
          (this._logger = a), (this._rules = []);
        }
        (c.prototype.setRuleName = function (a) {
          this._ruleName = a;
        }),
          (c.prototype.getRuleName = function (a, b) {
            return this._ruleName;
          }),
          (c.prototype.setData = function (a, b) {
            this._store[a] = b;
          }),
          (c.prototype.getData = function (a) {
            return this._store[a];
          }),
          (c.prototype.shouldProcessAction = function () {
            return this._processAction;
          }),
          (c.prototype.stopProcessingAction = function () {
            this._processAction = !1;
          }),
          (c.prototype.startProcessingAction = function () {
            this._processAction = !0;
          }),
          (d.createContext = function () {
            return new c();
          }),
          (d.createPredicate = function (a, b, c) {
            return { fn: a, expectedValue: b, msg: c };
          }),
          (d.prototype.registerRule = function (a, b, c, d, e) {
            this._rules.push({ name: a, desc: b, preconditions: c, actions: d, scope: e });
          }),
          (d.prototype.registerEnterExitAction = function (a, b) {
            (this._enterAction = a), (this._exitAction = b);
          }),
          (d.prototype._handleFailure = function (a, b) {
            this._logger.error(e, a.desc + ' -  ' + b.msg);
          }),
          (d.prototype._getRule = function (a) {
            for (var b = 0; b < this._rules.length; ++b)
              if (this._rules[b].name === a) return this._rules[b];
            return null;
          }),
          (d.prototype.processRule = function (a, b) {
            var c = !0,
              f = this._getRule(a);
            if (f) {
              var g = f.scope;
              b || (b = d.createContext()), b.setRuleName(a);
              for (var h = !1, i = 0; i < f.preconditions.length; ++i) {
                var j = f.preconditions[i];
                if ((h = !!j.fn.call(g, b) !== j.expectedValue)) {
                  this._handleFailure(f, j);
                  break;
                }
              }
              if (h) c = !1;
              else {
                b.startProcessingAction(), this._enterAction && this._enterAction.call(g, b);
                for (var i = 0; i < f.actions.length; ++i) {
                  var k = f.actions[i];
                  if (!b.shouldProcessAction()) {
                    this._logger.info(e, 'Stopping actions for ' + f.desc);
                    break;
                  }
                  k.call(g, b);
                }
                this._exitAction && b.shouldProcessAction() && this._exitAction.call(g, b);
              }
            } else this._logger.warn(e, 'No registered event found for ruleName ' + a), (c = !1);
            return c;
          });
        var e = 'RuleEngine';
        b._RuleEngine = d;
      })(a.ADB.core, a.ADB.va),
        (function (a, b) {
          'use strict';
          function c(a, b, c) {
            (this.taskFn = a), (this.scope = b), (this.interval = c), (this.remainingInterval = c);
          }
          function d(a) {
            if (!a) throw new Error('Reference to the logger object cannot be NULL');
            (this._logger = a), (this._tasks = []), (this._pausedTasks = []);
          }
          (c.prototype.elapsedTime = function (a) {
            this.remainingInterval -= a;
          }),
            (c.prototype.shouldExecute = function () {
              return this.remainingInterval <= 0;
            }),
            (c.prototype.execute = function () {
              this.taskFn.call(this.scope);
            }),
            (d.prototype._getCurrentTimeInMS = function () {
              return new Date().getTime();
            }),
            (d.prototype._runTasksForTime = function (a) {
              var b = [],
                c = a - this._lastTickTime;
              this._lastTickTime = a;
              for (var d = 0; d < this._tasks.length; ) {
                var e = this._tasks[d];
                e.elapsedTime(c), e.shouldExecute() ? (b.push(e), this._tasks.splice(d, 1)) : ++d;
              }
              this._checkStopTimer();
              for (var d = 0; d < b.length; ++d) b[d].execute();
            }),
            (d.prototype._onTick = function () {
              var a = this._getCurrentTimeInMS();
              this._runTasksForTime(a);
            }),
            (d.prototype._startTimer = function () {
              var a = this;
              this._timer ||
                (this._logger.info(e, '#startTimer()'),
                (a._lastTickTime = this._getCurrentTimeInMS()),
                (this._timer = window.setInterval(function () {
                  a._onTick();
                }, f)));
            }),
            (d.prototype._stopTimer = function () {
              this._timer &&
                (this._logger.info(e, '#stopTimer()'),
                window.clearInterval(this._timer),
                (this._timer = null));
            }),
            (d.prototype._checkStartTimer = function () {
              this._tasks.length > 0 && this._startTimer();
            }),
            (d.prototype._checkStopTimer = function () {
              0 === this._tasks.length && this._stopTimer();
            }),
            (d.prototype._removeTask = function (a, b) {
              for (var c = 0; c < a.length; ++c) if (a[c] === b) return a.splice(c, 1), !0;
              return !1;
            }),
            (d.prototype.scheduleTask = function (a, b, d) {
              if ((this._logger.info(e, '#scheduleTask()'), !a))
                throw new Error('Reference to the taskFn cannot be NULL');
              var f = new c(a, b, d);
              return this._tasks.push(f), this._checkStartTimer(), f;
            }),
            (d.prototype.cancelTask = function (a) {
              this._logger.info(e, '#cancelTask()'),
                this._removeTask(this._tasks, a),
                this._checkStopTimer();
            }),
            (d.prototype.pauseTask = function (a) {
              this._logger.info(e, '#pauseTask()'),
                this._removeTask(this._tasks, a) && this._pausedTasks.push(a),
                this._checkStopTimer();
            }),
            (d.prototype.resumeTask = function (a) {
              this._logger.info(e, '#resumeTask()'),
                this._removeTask(this._pausedTasks, a) && this._tasks.push(a),
                this._checkStartTimer();
            }),
            (d.prototype.clearTasks = function () {
              this._stopTimer(), (this._tasks = []), (this._pausedTasks = []);
            });
          var e = 'TaskScheduler',
            f = 250;
          b._TaskScheduler = d;
        })(a.ADB.core, a.ADB.va),
        (function (a) {
          'use strict';
          function b() {
            (this.trackingServer = void 0),
              (this.channel = void 0),
              (this.ovp = void 0),
              (this.appVersion = void 0),
              (this.playerName = void 0),
              (this.ssl = !1),
              (this.debugLogging = !1);
          }
          (a.MediaHeartbeatConfig = b), (a.MediaHeartbeatConfig.sharedInstance = new b());
        })(a.ADB.va),
        (function (a) {
          'use strict';
          function b() {
            this.data = {};
          }
          var c = a.plugins.videoplayer.VideoInfo,
            d = a.plugins.videoplayer.AdBreakInfo,
            e = a.plugins.videoplayer.AdInfo,
            f = a.plugins.videoplayer.ChapterInfo,
            g = a.plugins.videoplayer.QoSInfo;
          (b.MEDIAINFO_KEY_NAME = 'a.name'),
            (b.MEDIAINFO_KEY_VIDEOID = 'a.videoId'),
            (b.MEDIAINFO_KEY_ADID = 'a.adId'),
            (b.MEDIAINFO_KEY_LENGTH = 'a.length'),
            (b.MEDIAINFO_KEY_PLAYHEAD = 'a.playhead'),
            (b.MEDIAINFO_KEY_MEDIATYPE = 'a.mediaType'),
            (b.MEDIAINFO_KEY_STREAMTYPE = 'a.streamType'),
            (b.MEDIAINFO_KEY_POSITION = 'a.position'),
            (b.MEDIAINFO_KEY_STARTTIME = 'a.startTime'),
            (b.MEDIAINFO_KEY_BITRATE = 'a.bitrate'),
            (b.MEDIAINFO_KEY_FPS = 'a.fps'),
            (b.MEDIAINFO_KEY_DROPPEDFRAMES = 'a.droppedFrames'),
            (b.MEDIAINFO_KEY_STARTUPTIME = 'a.startupTime'),
            (b.MEDIAINFO_KEY_TIMEDMETADATA = 'a.timedMetadata'),
            (b.prototype.setValue = function (a, b) {
              this.data[a] = b;
            }),
            (b.prototype.getValue = function (a) {
              return this.data.hasOwnProperty(a) ? this.data[a] : null;
            }),
            (b.prototype.createVideoInfo = function () {
              var a = new c();
              return (
                (a.id =
                  null != this.getValue(b.MEDIAINFO_KEY_VIDEOID)
                    ? this.getValue(b.MEDIAINFO_KEY_VIDEOID)
                    : ''),
                (a.name =
                  null != this.getValue(b.MEDIAINFO_KEY_NAME)
                    ? this.getValue(b.MEDIAINFO_KEY_NAME)
                    : ''),
                (a.length =
                  null != this.getValue(b.MEDIAINFO_KEY_LENGTH)
                    ? this.getValue(b.MEDIAINFO_KEY_LENGTH)
                    : 0),
                (a.playhead =
                  null != this.getValue(b.MEDIAINFO_KEY_PLAYHEAD)
                    ? this.getValue(b.MEDIAINFO_KEY_PLAYHEAD)
                    : 0),
                (a.mediaType =
                  null != this.getValue(b.MEDIAINFO_KEY_MEDIATYPE)
                    ? this.getValue(b.MEDIAINFO_KEY_MEDIATYPE)
                    : ''),
                (a.streamType =
                  null != this.getValue(b.MEDIAINFO_KEY_STREAMTYPE)
                    ? this.getValue(b.MEDIAINFO_KEY_STREAMTYPE)
                    : ''),
                a
              );
            }),
            (b.prototype.createAdBreakInfo = function () {
              var a = new d();
              return (
                (a.name =
                  null != this.getValue(b.MEDIAINFO_KEY_NAME)
                    ? this.getValue(b.MEDIAINFO_KEY_NAME)
                    : ''),
                (a.position =
                  null != this.getValue(b.MEDIAINFO_KEY_POSITION)
                    ? this.getValue(b.MEDIAINFO_KEY_POSITION)
                    : 0),
                (a.startTime =
                  null != this.getValue(b.MEDIAINFO_KEY_STARTTIME)
                    ? this.getValue(b.MEDIAINFO_KEY_STARTTIME)
                    : 0),
                a
              );
            }),
            (b.prototype.createAdInfo = function () {
              var a = new e();
              return (
                (a.id =
                  null != this.getValue(b.MEDIAINFO_KEY_ADID)
                    ? this.getValue(b.MEDIAINFO_KEY_ADID)
                    : ''),
                (a.name =
                  null != this.getValue(b.MEDIAINFO_KEY_NAME)
                    ? this.getValue(b.MEDIAINFO_KEY_NAME)
                    : ''),
                (a.length =
                  null != this.getValue(b.MEDIAINFO_KEY_LENGTH)
                    ? this.getValue(b.MEDIAINFO_KEY_LENGTH)
                    : 0),
                (a.position =
                  null != this.getValue(b.MEDIAINFO_KEY_POSITION)
                    ? this.getValue(b.MEDIAINFO_KEY_POSITION)
                    : 0),
                a
              );
            }),
            (b.prototype.createChapterInfo = function () {
              var a = new f();
              return (
                (a.name =
                  null != this.getValue(b.MEDIAINFO_KEY_NAME)
                    ? this.getValue(b.MEDIAINFO_KEY_NAME)
                    : ''),
                (a.length =
                  null != this.getValue(b.MEDIAINFO_KEY_LENGTH)
                    ? this.getValue(b.MEDIAINFO_KEY_LENGTH)
                    : 0),
                (a.startTime =
                  null != this.getValue(b.MEDIAINFO_KEY_STARTTIME)
                    ? this.getValue(b.MEDIAINFO_KEY_STARTTIME)
                    : 0),
                (a.position =
                  null != this.getValue(b.MEDIAINFO_KEY_POSITION)
                    ? this.getValue(b.MEDIAINFO_KEY_POSITION)
                    : 0),
                a
              );
            }),
            (b.prototype.createQoSInfo = function () {
              var a = new g();
              return (
                (a.bitrate =
                  null != this.getValue(b.MEDIAINFO_KEY_BITRATE)
                    ? this.getValue(b.MEDIAINFO_KEY_BITRATE)
                    : 0),
                (a.fps =
                  null != this.getValue(b.MEDIAINFO_KEY_FPS)
                    ? this.getValue(b.MEDIAINFO_KEY_FPS)
                    : 0),
                (a.droppedFrames =
                  null != this.getValue(b.MEDIAINFO_KEY_DROPPEDFRAMES)
                    ? this.getValue(b.MEDIAINFO_KEY_DROPPEDFRAMES)
                    : 0),
                (a.startupTime =
                  null != this.getValue(b.MEDIAINFO_KEY_STARTUPTIME)
                    ? this.getValue(b.MEDIAINFO_KEY_STARTUPTIME)
                    : 0),
                a
              );
            }),
            (b.prototype.isEqual = function (a) {
              if (this === a) return !0;
              if (!a || 'object' != typeof a || 'function' != typeof a.getValue) return !1;
              for (
                var c = [
                    b.MEDIAINFO_KEY_NAME,
                    b.MEDIAINFO_KEY_VIDEOID,
                    b.MEDIAINFO_KEY_ADID,
                    b.MEDIAINFO_KEY_LENGTH,
                    b.MEDIAINFO_KEY_PLAYHEAD,
                    b.MEDIAINFO_KEY_STREAMTYPE,
                    b.MEDIAINFO_KEY_MEDIATYPE,
                    b.MEDIAINFO_KEY_POSITION,
                    b.MEDIAINFO_KEY_STARTTIME,
                    b.MEDIAINFO_KEY_BITRATE,
                    b.MEDIAINFO_KEY_FPS,
                    b.MEDIAINFO_KEY_DROPPEDFRAMES,
                    b.MEDIAINFO_KEY_STARTUPTIME,
                    b.MEDIAINFO_KEY_TIMEDMETADATA,
                  ],
                  d = 0;
                d < c.length;
                ++d
              ) {
                var e = c[d];
                if (this.getValue(e) !== a.getValue(e)) return !1;
              }
              return !0;
            }),
            (a.MediaObject = b);
        })(a.ADB.va),
        (function (a) {
          'use strict';
          function b(a, c) {
            if (!c) throw new Error('Visitor instance cannot be NULL');
            (this._visitor = c),
              (this._logger = a),
              (this._status = b.OPT_UNKNOWN),
              (this._optInFetchPermissionsCallback =
                this._optInFetchPermissionsCallback.bind(this));
          }
          var c = 'PrivacyManager';
          (b.prototype.getStatus = function () {
            return this._status;
          }),
            (b.prototype.configure = function (a) {
              this.reset(),
                (this._callback = a),
                (this._optIn = window.adobe && window.adobe.optIn ? window.adobe.optIn : void 0),
                this._optIn && this._optIn.doesOptInApply
                  ? (this._logger.info(c, 'OptIn service enabled'),
                    (this._waitingForOptInCallback = !0),
                    (this._optInMediaApproved = !1))
                  : this._logger.info(c, 'OptIn service does not apply'),
                (this._waitingForVisitorCallback = !0),
                (this._visitorOptOut = !1),
                this._fetchVisitorOptOut(),
                this._fetchOptIn(),
                this._updateStatus();
            }),
            (b.prototype.reset = function () {
              this._unsubscribeOptIn(), (this._status = b.OPT_UNKNOWN), (this._callback = null);
            }),
            (b.prototype._fetchVisitorOptOut = function () {
              this._logger.info(c, 'Fetching Visitor.isOptedOut');
              try {
                var a = this;
                this._visitor.isOptedOut(
                  function (b) {
                    a._logger.info(c, 'Visitor.isOptedOut : ' + b),
                      (a._waitingForVisitorCallback = !1),
                      (a._visitorOptOut = b),
                      a._updateStatus();
                  },
                  void 0,
                  !0,
                );
              } catch (a) {
                this._logger.warn(c, 'Error fetching Visitor.isOptedOut'),
                  (this._waitingForVisitorCallback = !1);
              }
            }),
            (b.prototype._fetchOptIn = function () {
              try {
                if (!this._optIn || !this._optIn.doesOptInApply) return;
                this._logger.info(c, 'Fetching permissions from OptIn service'),
                  this._optInListenerRegistered ||
                    (this._optIn.fetchPermissions(this._optInFetchPermissionsCallback, !0),
                    (this._optInListenerRegistered = !0));
              } catch (a) {
                this._logger.warn(c, 'Error fetching permissions from OptIn service'),
                  (this._waitingForOptInCallback = !1);
              }
            }),
            (b.prototype._unsubscribeOptIn = function () {
              try {
                this._optIn &&
                  this._optInListenerRegistered &&
                  (this._optIn.off('complete', this._optInFetchPermissionsCallback),
                  (this._optInListenerRegistered = !1));
              } catch (a) {
                this._logger.error(c, 'Error unsubscribing from OptIn service');
              }
            }),
            (b.prototype._optInFetchPermissionsCallback = function () {
              this._waitingForOptInCallback = !1;
              var a = this._optIn.isApproved(this._optIn.Categories.ECID),
                b = this._optIn.isApproved(this._optIn.Categories.ANALYTICS),
                d =
                  void 0 === this._optIn.Categories.MEDIA_ANALYTICS ||
                  this._optIn.isApproved(this._optIn.Categories.MEDIA_ANALYTICS);
              (this._optInMediaApproved = a && b && d),
                this._logger.info(
                  c,
                  'OptIn fetchPermissions ECID : ' + a + ' Analytics : ' + b + ' Media : ' + d,
                ),
                this._updateStatus();
            }),
            (b.prototype._updateStatus = function () {
              if (
                !(
                  this._waitingForVisitorCallback ||
                  (this._optIn && this._optIn.doesOptInApply && this._waitingForOptInCallback)
                )
              ) {
                var a =
                    this._visitorOptOut ||
                    (this._optIn && this._optIn.doesOptInApply && !this._optInMediaApproved),
                  d = a ? b.OPT_OUT : b.OPT_IN;
                if (this._status !== d) {
                  this._logger.info(c, 'Privacy changed from ' + this._status + ' to ' + d),
                    (this._status = d);
                  var e = this;
                  setTimeout(function () {
                    try {
                      e._callback && e._callback(d);
                    } catch (a) {}
                  }, 0);
                }
              }
            }),
            (b.OPT_OUT = 'optout'),
            (b.OPT_IN = 'optin'),
            (b.OPT_UNKNOWN = 'optunknown'),
            (a._PrivacyManager = b);
        })(a.ADB.va),
        (function (a, b) {
          'use strict';
          function c(a) {
            c.__super__.constructor.call(this), (this._heartbeat = a);
          }
          function d(a) {
            d.__super__.constructor.call(this), (this._heartbeat = a);
          }
          function e(a) {
            e.__super__.constructor.call(this), (this._heartbeat = a);
          }
          function f(a) {
            f.__super__.constructor.call(this), (this._heartbeat = a);
          }
          a.extend(c, b.plugins.aa.AdobeAnalyticsPluginDelegate),
            (c.prototype.onError = function (a) {
              this._heartbeat && this._heartbeat._onDelegateError(a);
            }),
            a.extend(d, b.plugins.ah.AdobeHeartbeatPluginDelegate),
            (d.prototype.onError = function (a) {
              this._heartbeat && this._heartbeat._onDelegateError(a);
            }),
            (d.prototype.onTrackingDisabled = function () {
              this._heartbeat && this._heartbeat._onDelegateTrackingDisabled();
            }),
            a.extend(e, b.HeartbeatDelegate),
            (e.prototype.onError = function (a) {
              this._heartbeat && this._heartbeat._onDelegateError(a);
            }),
            a.extend(f, b.plugins.videoplayer.VideoPlayerPluginDelegate),
            (f.prototype.getVideoInfo = function () {
              return this._heartbeat && this._heartbeat._videoInfo
                ? (this._heartbeat._delegate &&
                    (this._heartbeat._videoInfo.playhead =
                      this._heartbeat._delegate.getCurrentPlaybackTime()),
                  this._heartbeat._videoInfo)
                : null;
            }),
            (f.prototype.getAdBreakInfo = function () {
              return this._heartbeat && this._heartbeat._adBreakInfo
                ? this._heartbeat._adBreakInfo
                : null;
            }),
            (f.prototype.getAdInfo = function () {
              return this._heartbeat && this._heartbeat._adInfo ? this._heartbeat._adInfo : null;
            }),
            (f.prototype.getChapterInfo = function () {
              return this._heartbeat && this._heartbeat._chapterInfo
                ? this._heartbeat._chapterInfo
                : null;
            }),
            (f.prototype.getQoSInfo = function () {
              if (
                this._heartbeat &&
                this._heartbeat._delegate &&
                this._heartbeat._delegate.getQoSObject()
              ) {
                var a = this._heartbeat._delegate.getQoSObject();
                if (a && 'object' == typeof a && a.setValue) return a.createQoSInfo();
              }
              return null;
            }),
            (b._MediaAnalyticsPluginDelegate = c),
            (b._MediaHeartbeatPluginDelegate = d),
            (b._ADBMediaHeartbeatDelegate = e),
            (b._MediaHeartbeatVideoPlayerPluginDelegate = f);
        })(a.ADB.core, a.ADB.va),
        (function (a, b) {
          'use strict';
          function c(a, d) {
            c.__super__.constructor.call(this),
              (this._heartbeat = a),
              (this._logger = d),
              (this._validator = new b.plugins.nielsen.MetadataValidator(d));
          }
          var d = 'MediaHeartbeatNielsenPluginDelegate',
            e = {
              NielsenContentMetadata: 'media_nielsen_content_metadata',
              NielsenChannelMetadata: 'media_nielsen_channel_metadata',
              NielsenAdMetadata: 'media_nielsen_ad_metadata',
            };
          b.plugins.nielsen && a.extend(c, b.plugins.nielsen.NielsenPluginDelegate),
            (c.prototype.getMetadataInfo = function () {
              if (this._heartbeat && this._heartbeat._currentMediaObject) {
                var a = this._heartbeat._currentMediaObject.getValue(e.NielsenContentMetadata);
                if (a && 'object' == typeof a)
                  return (
                    this._validator.validateContentMetadata(
                      a,
                      'MediaHeartbeat.NielsenContentMetadataKeys',
                    ),
                    a
                  );
                this._logger.warn(
                  d,
                  'We expect a valid object for MediaHeartbeat.MediaObjectKey.NielsenContentMetadata in MediaObject',
                );
              }
              return null;
            }),
            (c.prototype.getAdMetadataInfo = function () {
              if (this._heartbeat && this._heartbeat._currentAdObject) {
                var a = this._heartbeat._currentAdObject.getValue(e.NielsenAdMetadata);
                if (a && 'object' == typeof a)
                  return (
                    this._validator.validateAdMetadata(a, 'MediaHeartbeat.NielsenAdMetadataKeys'), a
                  );
                this._logger.warn(
                  d,
                  'We expect a valid object for MediaHeartbeat.MediaObjectKey.NielsenAdMetadata in MediaObject',
                );
              }
              return null;
            }),
            (c.prototype.getChannelInfo = function () {
              if (this._heartbeat && this._heartbeat._currentMediaObject) {
                var a = this._heartbeat._currentMediaObject.getValue(e.NielsenChannelMetadata);
                if (a && 'object' == typeof a)
                  return (
                    this._validator.validateChannelMetadata(
                      a,
                      'MediaHeartbeat.NielsenChannelMetadataKeys',
                    ),
                    a
                  );
                this._logger.warn(
                  d,
                  'We expect a valid object for MediaHeartbeat.MediaObjectKey.NielsenChannelMetadata in MediaObject',
                );
              }
              return null;
            }),
            (c.prototype.onError = function (a) {
              this._heartbeat && this._heartbeat._onDelegateError(a);
            }),
            b.plugins.nielsen && ((b._NielsenObjectKey = e), (b._NielsenPluginDelegate = c));
        })(a.ADB.core, a.ADB.va),
        (function (b, c) {
          'use strict';
          function d() {}
          function e(b, d, e) {
            if (((this._appMeasurement = e || a.s), !this._appMeasurement))
              throw new Error('MediaHeartbeat needs a valid AppMeasurement instance.');
            if (!this._appMeasurement.visitor || !this._appMeasurement.visitor.marketingCloudOrgID)
              throw new Error(
                'MediaHeartbeat needs a valid visitor instance with marketingCloudOrgId set.',
              );
            if (!b) throw new Error('MediaHeartbeat needs a valid delegate object.');
            if (!d || 'object' != typeof d || !d.trackingServer)
              throw new Error(
                'MediaHeartbeat needs a valid config object with trackingServer set.',
              );
            (this._config = d),
              (this._delegate = b),
              (this._debugLogging = c.MediaHeartbeat._debugLogging || this._config.debugLogging),
              (this._logger = new f()),
              this._debugLogging ? this._logger.enable() : this._logger.disable(),
              (this._ruleEngine = new t(this._logger)),
              (this._taskScheduler = new u(this._logger)),
              (this._privacyManager = new v(this._logger, this._appMeasurement.visitor)),
              this._resetState(),
              this._setupRules();
          }
          var f = b.Logger,
            g = c.MediaObject,
            h = c.Heartbeat,
            i = c.HeartbeatConfig,
            j = c._ADBMediaHeartbeatDelegate,
            k = c.plugins.videoplayer.VideoPlayerPlugin,
            l = c.plugins.videoplayer.VideoPlayerPluginConfig,
            m = c._MediaHeartbeatVideoPlayerPluginDelegate,
            n = c.plugins.aa.AdobeAnalyticsPlugin,
            o = c.plugins.aa.AdobeAnalyticsPluginConfig,
            p = c._MediaAnalyticsPluginDelegate,
            q = c.plugins.ah.AdobeHeartbeatPlugin,
            r = c.plugins.ah.AdobeHeartbeatPluginConfig,
            s = c._MediaHeartbeatPluginDelegate,
            t = c._RuleEngine,
            u = c._TaskScheduler,
            v = c._PrivacyManager,
            w = c.utils.ObjectUtils,
            x = c.utils.VersionUtils;
          if (
            ((d.prototype.getCurrentPlaybackTime = function () {
              return null;
            }),
            (d.prototype.getQoSObject = function () {
              return null;
            }),
            (e.MediaType = { Video: 'video', Audio: 'audio' }),
            (e.Event = {
              AdBreakStart: 'adBreakStart',
              AdBreakComplete: 'adBreakComplete',
              AdStart: 'adStart',
              AdComplete: 'adComplete',
              AdSkip: 'adSkip',
              ChapterStart: 'chapterStart',
              ChapterComplete: 'chapterComplete',
              ChapterSkip: 'chapterSkip',
              SeekStart: 'seekStart',
              SeekComplete: 'seekComplete',
              BufferStart: 'bufferStart',
              BufferComplete: 'bufferComplete',
              BitrateChange: 'bitrateChange',
              TimedMetadataUpdate: 'timedMetadataUpdate',
            }),
            (e.StreamType = {
              VOD: 'vod',
              LIVE: 'live',
              LINEAR: 'linear',
              PODCAST: 'podcast',
              AUDIOBOOK: 'audiobook',
              AOD: 'aod',
            }),
            (e.MediaObjectKey = {
              StandardVideoMetadata: 'media_standard_content_metadata',
              StandardMediaMetadata: 'media_standard_content_metadata',
              StandardAdMetadata: 'media_standard_ad_metadata',
              VideoResumed: 'resumed',
              MediaResumed: 'resumed',
              PrerollTrackingWaitingTime: 'preroll_tracking_waiting_time',
            }),
            (e.VideoMetadataKeys = c.plugins.aa.VideoMetadataKeys),
            (e.AudioMetadataKeys = c.plugins.aa.AudioMetadataKeys),
            (e.AdMetadataKeys = c.plugins.aa.AdMetadataKeys),
            (e.createMediaObject = function (a, b, c, d, f) {
              var h = new g();
              h.setValue(g.MEDIAINFO_KEY_VIDEOID, b),
                h.setValue(g.MEDIAINFO_KEY_NAME, a),
                h.setValue(g.MEDIAINFO_KEY_LENGTH, c),
                h.setValue(g.MEDIAINFO_KEY_PLAYHEAD, 0);
              var i = d || e.StreamType.VOD;
              return (
                h.setValue(g.MEDIAINFO_KEY_STREAMTYPE, i),
                ('string' != typeof f || (f != e.MediaType.Video && f != e.MediaType.Audio)) &&
                  (f = e.MediaType.Video),
                h.setValue(g.MEDIAINFO_KEY_MEDIATYPE, f),
                h
              );
            }),
            (e.createAdBreakObject = function (a, b, c) {
              var d = new g();
              return (
                d.setValue(g.MEDIAINFO_KEY_NAME, a),
                d.setValue(g.MEDIAINFO_KEY_POSITION, b),
                d.setValue(g.MEDIAINFO_KEY_STARTTIME, c),
                d
              );
            }),
            (e.createAdObject = function (a, b, c, d) {
              var e = new g();
              return (
                e.setValue(g.MEDIAINFO_KEY_NAME, a),
                e.setValue(g.MEDIAINFO_KEY_ADID, b),
                e.setValue(g.MEDIAINFO_KEY_POSITION, c),
                e.setValue(g.MEDIAINFO_KEY_LENGTH, d),
                e
              );
            }),
            (e.createChapterObject = function (a, b, c, d) {
              var e = new g();
              return (
                e.setValue(g.MEDIAINFO_KEY_NAME, a),
                e.setValue(g.MEDIAINFO_KEY_POSITION, b),
                e.setValue(g.MEDIAINFO_KEY_LENGTH, c),
                e.setValue(g.MEDIAINFO_KEY_STARTTIME, d),
                e
              );
            }),
            (e.createQoSObject = function (a, b, c, d) {
              var e = new g();
              return (
                e.setValue(g.MEDIAINFO_KEY_BITRATE, a),
                e.setValue(g.MEDIAINFO_KEY_FPS, c),
                e.setValue(g.MEDIAINFO_KEY_DROPPEDFRAMES, d),
                e.setValue(g.MEDIAINFO_KEY_STARTUPTIME, b),
                e
              );
            }),
            (e.createTimedMetadataObject = function (a) {
              var b = new g();
              return b.setValue(g.MEDIAINFO_KEY_TIMEDMETADATA, a), b;
            }),
            (e.version = function () {
              return c.Version.getVersion();
            }),
            (e.prototype.trackSessionStart = function (a, b) {
              this._logger.info(D, '#::trackSessionStart()');
              var c = t.createContext();
              c.setData(E, a),
                c.setData(J, this._cleanContextData(b)),
                this._processRule(B.SessionStart, c);
            }),
            (e.prototype.trackPlay = function () {
              this._logger.info(D, '#::trackPlay()'), this._processRule(B.Play);
            }),
            (e.prototype.trackPause = function () {
              this._logger.info(D, '#::trackPause()'), this._processRule(B.Pause);
            }),
            (e.prototype.trackComplete = function () {
              this._logger.info(D, '#::trackComplete()'), this._processRule(B.VideoComplete);
            }),
            (e.prototype.trackSessionEnd = function () {
              this._logger.info(D, '#::trackSessionEnd()'), this._processRule(B.SessionEnd);
            }),
            (e.prototype.trackError = function (a) {
              this._logger.info(D, '#::trackError()');
              var b = t.createContext();
              b.setData(K, a), this._processRule(B.Error, b);
            }),
            (e.prototype.trackEvent = function (a, b, c) {
              this._logger.info(D, '#::trackEvent() - ' + a);
              var d,
                f = t.createContext();
              switch (a) {
                case e.Event.AdBreakStart:
                  f.setData(F, b), f.setData(J, this._cleanContextData(c)), (d = B.AdBreakStart);
                  break;
                case e.Event.AdBreakComplete:
                  d = B.AdBreakComplete;
                  break;
                case e.Event.AdStart:
                  f.setData(G, b), f.setData(J, this._cleanContextData(c)), (d = B.AdStart);
                  break;
                case e.Event.AdComplete:
                  d = B.AdComplete;
                  break;
                case e.Event.AdSkip:
                  d = B.AdSkip;
                  break;
                case e.Event.SeekStart:
                  d = B.SeekStart;
                  break;
                case e.Event.SeekComplete:
                  d = B.SeekComplete;
                  break;
                case e.Event.ChapterStart:
                  f.setData(H, b), f.setData(J, this._cleanContextData(c)), (d = B.ChapterStart);
                  break;
                case e.Event.ChapterComplete:
                  d = B.ChapterComplete;
                  break;
                case e.Event.ChapterSkip:
                  d = B.ChapterSkip;
                  break;
                case e.Event.BufferStart:
                  d = B.BufferStart;
                  break;
                case e.Event.BufferComplete:
                  d = B.BufferComplete;
                  break;
                case e.Event.BitrateChange:
                  d = B.BitrateChange;
                  break;
                case e.Event.TimedMetadataUpdate:
                  (d = B.TimedMetadataUpdate), f.setData(I, b);
                  break;
                default:
                  return void this._logger.error(D, 'Incorrect event name.');
              }
              this._processRule(d, f);
            }),
            c.plugins.nielsen)
          ) {
            var y = c.MediaHeartbeatConfig;
            (y.prototype.nielsenConfigKey = void 0), (y.prototype.nielsenAppInfo = void 0);
            var z = c._NielsenObjectKey;
            (e.MediaObjectKey.NielsenContentMetadata = z.NielsenContentMetadata),
              (e.MediaObjectKey.NielsenAdMetadata = z.NielsenAdMetadata),
              (e.MediaObjectKey.NielsenChannelMetadata = z.NielsenChannelMetadata),
              (e.NielsenContentMetadataKeys = c.plugins.nielsen.ContentMetadataKeys),
              (e.NielsenChannelMetadataKeys = c.plugins.nielsen.ChannelMetadataKeys),
              (e.NielsenAdMetadataKeys = c.plugins.nielsen.AdMetadataKeys),
              (e.prototype.nielsenLoadMetadata = function (a) {
                this._nielsenPlugin && this._nielsenPlugin.loadMetadata(a);
              });
          }
          (e.prototype._setState = function (a, b) {
            this._mediaState[a] = b;
          }),
            (e.prototype._isInState = function (a) {
              return this._mediaState[a];
            }),
            (e.prototype._isTrackingDisabled = function (a) {
              return this._mediaHeartbeatDisabled;
            }),
            (e.prototype._isInSession = function (a) {
              return this._isInState(A.Session);
            }),
            (e.prototype._isInMedia = function (a) {
              return this._isInState(A.Media);
            }),
            (e.prototype._isInAd = function (a) {
              return this._isInState(A.Ad);
            }),
            (e.prototype._isInAdBreak = function (a) {
              return this._isInState(A.AdBreak);
            }),
            (e.prototype._isInChapter = function (a) {
              return this._isInState(A.Chapter);
            }),
            (e.prototype._isInPlay = function (a) {
              return this._isInState(A.PlayPause);
            }),
            (e.prototype._isInPause = function (a) {
              return !this._isInState(A.PlayPause);
            }),
            (e.prototype._isInBuffer = function (a) {
              return this._isInState(A.Buffer);
            }),
            (e.prototype._isInSeek = function (a) {
              return this._isInState(A.Seek);
            }),
            (e.prototype._isPlatformTrackingSupported = function (a) {
              return !this._appMeasurement.unsupportedBrowser;
            }),
            (e.prototype._isAudioTrackingSupported = function (a) {
              return (
                a.getData(E).getValue(g.MEDIAINFO_KEY_MEDIATYPE) !== e.MediaType.Audio ||
                x.isGreaterThanEqual(this._appMeasurement.version, '2.11.0')
              );
            }),
            (e.prototype._isValidMediaObject = function (a) {
              var b = a.getData(E);
              if (b && b instanceof g) {
                var c = b.getValue(e.MediaObjectKey.MediaResumed);
                null != c &&
                  'boolean' != typeof c &&
                  this._logger.warn(
                    D,
                    'Ignoring value set for MediaHeartbeat.MediaObjectKey.MediaResumed in MediaObject as we expect a boolean value',
                  );
                var d = b.getValue(e.MediaObjectKey.PrerollTrackingWaitingTime);
                if (null != d) {
                  (('string' == typeof d || 'number' == typeof d) && !isNaN(d)) ||
                    this._logger.warn(
                      D,
                      'Ignoring value set for MediaHeartbeat.MediaObjectKey.PrerollTrackingWaitingTime in MediaObject as we expect a valid duration as number in milliseconds.',
                    );
                }
                var f = b.getValue(e.MediaObjectKey.StandardMediaMetadata);
                return (
                  null != f &&
                    'object' != typeof f &&
                    this._logger.warn(
                      D,
                      'Ignoring value set for MediaHeartbeat.MediaObjectKey.StandardMediaMetadata in MediaObject as we expect a valid object with kv pairs.',
                    ),
                  !0
                );
              }
              return !1;
            }),
            (e.prototype._isValidAdBreakObject = function (a) {
              var b = a.getData(F);
              return b && b instanceof g;
            }),
            (e.prototype._isDifferentAdBreakObject = function (a) {
              var b = a.getData(F);
              return !(this._currentAdBreakObject && this._currentAdBreakObject.isEqual(b));
            }),
            (e.prototype._isValidAdObject = function (a) {
              var b = a.getData(G);
              if (b && b instanceof g) {
                var c = b.getValue(N);
                null != c &&
                  'boolean' != typeof c &&
                  this._logger.warn(
                    D,
                    'Ignoring value set for MediaHeartbeat.MediaObjectKey.GranularAdTracking in AdObject as we expect a boolean value.',
                  );
                var d = b.getValue(e.MediaObjectKey.StandardAdMetadata);
                return (
                  null != d &&
                    'object' != typeof d &&
                    this._logger.warn(
                      D,
                      'Ignoring value set for MediaHeartbeat.MediaObjectKey.StandardAdMetadata in AdObject as we expect a valid object with kv pairs.',
                    ),
                  !0
                );
              }
              return !1;
            }),
            (e.prototype._isDifferentAdObject = function (a) {
              var b = a.getData(G);
              return !(this._currentAdObject && this._currentAdObject.isEqual(b));
            }),
            (e.prototype._isValidChapterObject = function (a) {
              var b = a.getData(H);
              return b && b instanceof g;
            }),
            (e.prototype._isDifferentChapterObject = function (a) {
              var b = a.getData(H);
              return !(this._currentChapterObject && this._currentChapterObject.isEqual(b));
            }),
            (e.prototype._isValidTimedMetadataObject = function (a) {
              var b = a.getData(I);
              if (b && b instanceof g) {
                var c = b.getValue(g.MEDIAINFO_KEY_TIMEDMETADATA);
                return c && 'string' == typeof c;
              }
              return !1;
            }),
            (e.prototype._shouldAllowPlayerStateChange = function (a) {
              return !(this._isInState(A.AdBreak) && !this._isInState(A.Ad));
            }),
            (e.prototype._didBeginReporting = function (a) {
              return this._isInState(A.Reporting);
            }),
            (e.prototype._deferredTrackPlay = function () {
              this._prerollWaitEnabled &&
                (this._logger.info(D, 'Executing deferred API:trackPlay.'),
                (this._prerollWaitEnabled = !1),
                (this._playTaskHandle = null),
                this._processRule(B.Play));
            }),
            (e.prototype._cmdEnterAction = function (a) {
              var b = a.getRuleName();
              if (this._prerollWaitEnabled)
                if (this._playReceived)
                  switch (b) {
                    case B.SeekStart:
                    case B.BufferStart:
                      this._logger.info(
                        D,
                        'Cancelling scheduled API:trackPlay because of SeekStart/BufferStart event',
                      ),
                        this._taskScheduler.cancelTask(this._playTaskHandle),
                        (this._playTaskHandle = null);
                      break;
                    case B.SeekComplete:
                    case B.BufferComplete:
                      this._logger.info(
                        D,
                        'Rescheduled API:trackPlay after SeekComplete/BufferComplete event',
                      ),
                        (this._playTaskHandle = this._taskScheduler.scheduleTask(
                          this._deferredTrackPlay,
                          this,
                          this._prerollWaitTime,
                        ));
                      break;
                    case B.Play:
                      this._logger.info(
                        D,
                        'Dropping API:trackPlay as we already have a API:trackPlay scheduled.',
                      ),
                        a.stopProcessingAction();
                      break;
                    case B.Pause:
                      this._logger.info(
                        D,
                        'Cancelling scheduled API:trackPlay because of API:trackPause call.',
                      ),
                        this._taskScheduler.cancelTask(this._playTaskHandle),
                        (this._playTaskHandle = null),
                        (this._prerollWaitEnabled = !1);
                      break;
                    case B.AdBreakStart:
                      this._logger.info(
                        D,
                        'Received API:trackEvent(AdBreakStart) within ' +
                          this._prerollWaitTime +
                          ' ms after API:trackPlay. We will track this as preroll AdBreak.',
                      ),
                        this._taskScheduler.cancelTask(this._playTaskHandle),
                        (this._playTaskHandle = null),
                        (this._prerollWaitEnabled = !1),
                        (this._playAfterAdStart = !0);
                  }
                else
                  switch (b) {
                    case B.Play:
                      this._logger.info(
                        D,
                        'Deferring API:trackPlay for ' + this._prerollWaitTime + ' ms.',
                      ),
                        (this._playReceived = !0),
                        (this._playUnhandledFromPrerollWaitTime = !0),
                        (this._playTaskHandle = this._taskScheduler.scheduleTask(
                          this._deferredTrackPlay,
                          this,
                          this._prerollWaitTime,
                        )),
                        a.stopProcessingAction();
                      break;
                    case B.Pause:
                      this._logger.info(D, 'Received trackPause before first trackPlay.'),
                        (this._prerollWaitEnabled = !1);
                      break;
                    case B.AdBreakStart:
                      this._logger.info(
                        D,
                        'Received trackEvent(AdBreakStart) before first trackPlay.',
                      ),
                        (this._prerollWaitEnabled = !1);
                  }
            }),
            (e.prototype._cmdExitAction = function (a) {
              var b = a.getRuleName();
              this._playAfterAdStart &&
                (b === B.AdStart
                  ? (this._cmdPlay(a), (this._playAfterAdStart = !1))
                  : b === B.AdBreakComplete && (this._playAfterAdStart = !1)),
                b !== B.AdStart || this._isInState(A.FPlayPause) || this._cmdPlay(a),
                this._prerollWaitEnabled ||
                  !this._playUnhandledFromPrerollWaitTime ||
                  (b !== B.BufferComplete && b !== B.SeekComplete && b !== B.AdBreakComplete) ||
                  this._isInState(A.FPlayPause) ||
                  this._isInState(A.Buffer) ||
                  this._isInState(A.Seek) ||
                  (this._logger.info(
                    D,
                    'Executing pending API:trackPlay. This case most likely happens tracking Preroll AdBreak without any Ads.',
                  ),
                  this._cmdPlay(a));
            }),
            (e.prototype._cmdConfigure = function (a) {
              this._configureAdobeAnalyticsPlugin(),
                this._configureAdobeHearbeatPlugin(),
                this._configureVideoPlayerPlugin(),
                this._configureOtherPlugins(),
                this._configureHeartbeat(),
                this._privacyManager.configure(this._onPrivacyChange.bind(this));
            }),
            (e.prototype._cmdBeginReporting = function (a) {
              this._playerPlugin && this._playerPlugin.beginReporting(),
                this._setState(A.Reporting, !0);
            }),
            (e.prototype._cmdSessionStart = function (a) {
              var b = a.getData(E),
                c = a.getData(J);
              (this._currentMediaObject = b),
                (this._videoInfo = b.createVideoInfo()),
                (this._videoInfo.playerName = this._config.playerName
                  ? this._config.playerName
                  : '');
              var d = b.getValue(e.MediaObjectKey.StandardMediaMetadata);
              (d && 'object' == typeof d) || (d = null);
              var f = b.getValue(e.MediaObjectKey.MediaResumed);
              'boolean' == typeof f && (this._videoInfo.resumed = f);
              var g = b.getValue(e.MediaObjectKey.PrerollTrackingWaitingTime);
              ('string' != typeof g && 'number' != typeof g) ||
                isNaN(g) ||
                ((this._prerollWaitTime = Number(g)),
                this._prerollWaitTime <= 0 && (this._prerollWaitEnabled = !1));
              var h = this._prepareMetadata(d, c);
              (h[L] = this._videoInfo.mediaType),
                this._aaPlugin.setVideoMetadata(h),
                this._playerPlugin.trackVideoLoad(),
                this._playerPlugin.trackSessionStart(),
                this._setState(A.Session, !0),
                this._setState(A.Media, !0);
            }),
            (e.prototype._destroyHeartbeat = function (a, b) {
              a && a.trackVideoUnload(), b && b.destroy();
            }),
            (e.prototype._cmdVideoEnd = function (a) {
              var b = a.getRuleName() === B.VideoComplete;
              if (this._isInState(A.Reporting)) {
                var c = this,
                  d = this._heartbeat,
                  e = this._playerPlugin;
                this._playerPlugin.trackComplete(function () {
                  c._destroyHeartbeat(e, d);
                }, b);
              } else this._destroyHeartbeat(this._playerPlugin, this._heartbeat);
              this._setState(A.Media, !1);
            }),
            (e.prototype._cmdHandleMediaComplete = function (a) {
              this._isInMedia(a) ||
                (this._logger.info(
                  D,
                  'API:trackComplete has already cleaned up Heartbeat instance.',
                ),
                this._cmdSessionEnd(a),
                a.stopProcessingAction());
            }),
            (e.prototype._cmdSessionEnd = function (a) {
              this._setState(A.Session, !1), this._resetState();
            }),
            (e.prototype._cmdDisableTracking = function (a) {
              this._logger.info(
                D,
                '#_cmdDisableTracking: ADBMediaHeartbeat Tracking Disabled Remotely.',
              ),
                (this._mediaHeartbeatDisabled = !0);
            }),
            (e.prototype._cmdBufferStart = function (a) {
              this._playerPlugin.trackBufferStart(), this._setState(A.Buffer, !0);
            }),
            (e.prototype._cmdBufferComplete = function (a) {
              this._isInState(A.Buffer) && this._playerPlugin.trackBufferComplete(),
                this._setState(A.Buffer, !1);
            }),
            (e.prototype._cmdSeekStart = function (a) {
              this._playerPlugin.trackSeekStart(), this._setState(A.Seek, !0);
            }),
            (e.prototype._cmdSeekComplete = function (a) {
              this._isInState(A.Seek) && this._playerPlugin.trackSeekComplete(),
                this._setState(A.Seek, !1);
            }),
            (e.prototype._cmdPlay = function (a) {
              this._playerPlugin.trackPlay(),
                this._setState(A.PlayPause, !0),
                this._setState(A.FPlayPause, !0),
                (this._playUnhandledFromPrerollWaitTime = !1);
            }),
            (e.prototype._cmdPause = function (a) {
              this._playerPlugin.trackPause(),
                this._setState(A.PlayPause, !1),
                this._setState(A.FPlayPause, !0);
            }),
            (e.prototype._cmdAdBreakStart = function (a) {
              var b = a.getData(F);
              (this._currentAdBreakObject = b),
                (this._adBreakInfo = b.createAdBreakInfo()),
                (this._adBreakInfo.playerName = this._config.playerName
                  ? this._config.playerName
                  : ''),
                this._playerPlugin.trackAdBreakStart(),
                this._setState(A.AdBreak, !0);
            }),
            (e.prototype._cmdAdBreakComplete = function (a) {
              (this._currentAdBreakObject = null),
                (this._adBreakInfo = null),
                this._isInState(A.AdBreak) && this._playerPlugin.trackAdBreakComplete(),
                this._setState(A.AdBreak, !1);
            }),
            (e.prototype._cmdAdStart = function (a) {
              var b = a.getData(G),
                c = a.getData(J);
              (this._currentAdObject = b), (this._adInfo = b.createAdInfo());
              var d = b.getValue(N);
              'boolean' == typeof d && (this._adInfo.granularTracking = d);
              var f = b.getValue(e.MediaObjectKey.StandardAdMetadata);
              (f && 'object' == typeof f) || (f = null);
              var g = this._prepareMetadata(f, c);
              this._aaPlugin.setAdMetadata(g),
                this._playerPlugin.trackAdStart(),
                this._setState(A.Ad, !0);
            }),
            (e.prototype._cmdAdComplete = function (a) {
              (this._currentAdObject = null),
                (this._adInfo = null),
                this._isInState(A.Ad) && this._playerPlugin.trackAdComplete(),
                this._setState(A.Ad, !1);
            }),
            (e.prototype._cmdAdSkip = function (a) {
              (this._currentAdObject = null),
                (this._adInfo = null),
                this._isInState(A.Ad) && this._playerPlugin.trackAdSkip(),
                this._setState(A.Ad, !1);
            }),
            (e.prototype._cmdChapterStart = function (a) {
              var b = a.getData(H),
                c = a.getData(J);
              (this._currentChapterObject = b), (this._chapterInfo = b.createChapterInfo());
              var d = this._prepareMetadata(null, c);
              this._aaPlugin.setChapterMetadata(d),
                this._playerPlugin.trackChapterStart(),
                this._setState(A.Chapter, !0);
            }),
            (e.prototype._cmdChapterComplete = function (a) {
              (this._currentChapterObject = null),
                (this._chapterInfo = null),
                this._isInState(A.Chapter) && this._playerPlugin.trackChapterComplete(),
                this._setState(A.Chapter, !1);
            }),
            (e.prototype._cmdChapterSkip = function (a) {
              (this._currentChapterObject = null),
                (this._chapterInfo = null),
                this._isInState(A.Chapter) && this._playerPlugin.trackChapterSkip(),
                this._setState(A.Chapter, !1);
            }),
            (e.prototype._cmdError = function (a) {
              var b = a.getData(K);
              b || (b = 'unknown_error_id'), this._playerPlugin.trackVideoPlayerError(b);
            }),
            (e.prototype._cmdBitrate = function (a) {
              this._playerPlugin.trackBitrateChange();
            }),
            (e.prototype._cmdTimedMetadataUpdate = function (a) {
              var b = a.getData(I),
                c = b.getValue(g.MEDIAINFO_KEY_TIMEDMETADATA);
              this._playerPlugin.trackTimedMetadata(c);
            }),
            (e.prototype._processRule = function (a, b) {
              return this._ruleEngine.processRule(a, b);
            }),
            (e.prototype._setupRules = function () {
              this._ruleEngine.registerEnterExitAction(this._cmdEnterAction, this._cmdExitAction),
                this._ruleEngine.registerRule(
                  B.SessionStart,
                  'API:trackSessionStart',
                  [
                    t.createPredicate(
                      this._isPlatformTrackingSupported,
                      !0,
                      C.ErrUnSupportedPlatform,
                    ),
                    t.createPredicate(this._isTrackingDisabled, !1, C.ErrTrackingDisabled),
                    t.createPredicate(this._isInSession, !1, C.ErrInSession),
                    t.createPredicate(this._isValidMediaObject, !0, C.ErrInvalidMediaObject),
                    t.createPredicate(
                      this._isAudioTrackingSupported,
                      !0,
                      C.ErrAudioTrackingNotSupported,
                    ),
                  ],
                  [this._cmdConfigure, this._cmdSessionStart],
                  this,
                ),
                this._ruleEngine.registerRule(
                  B.SessionEnd,
                  'API:trackSessionEnd',
                  [t.createPredicate(this._isInSession, !0, C.ErrNotInSession)],
                  [
                    this._cmdHandleMediaComplete,
                    this._cmdAdSkip,
                    this._cmdAdBreakComplete,
                    this._cmdChapterSkip,
                    this._cmdVideoEnd,
                    this._cmdSessionEnd,
                  ],
                  this,
                ),
                this._ruleEngine.registerRule(
                  B.VideoComplete,
                  'API:trackComplete',
                  [
                    t.createPredicate(this._isInSession, !0, C.ErrNotInSession),
                    t.createPredicate(this._isInMedia, !0, C.ErrNotInMedia),
                  ],
                  [
                    this._cmdAdSkip,
                    this._cmdAdBreakComplete,
                    this._cmdChapterSkip,
                    this._cmdVideoEnd,
                  ],
                  this,
                ),
                this._ruleEngine.registerRule(
                  B.Error,
                  'API:trackError',
                  [
                    t.createPredicate(this._isInSession, !0, C.ErrNotInSession),
                    t.createPredicate(this._isInMedia, !0, C.ErrNotInMedia),
                  ],
                  [this._cmdError],
                  this,
                ),
                this._ruleEngine.registerRule(
                  B.Play,
                  'API:trackPlay',
                  [
                    t.createPredicate(this._isInSession, !0, C.ErrNotInSession),
                    t.createPredicate(this._isInMedia, !0, C.ErrNotInMedia),
                    t.createPredicate(
                      this._shouldAllowPlayerStateChange,
                      !0,
                      C.ErrInvalidPlayerState,
                    ),
                  ],
                  [this._cmdSeekComplete, this._cmdBufferComplete, this._cmdPlay],
                  this,
                ),
                this._ruleEngine.registerRule(
                  B.Pause,
                  'API:trackPause',
                  [
                    t.createPredicate(this._isInSession, !0, C.ErrNotInSession),
                    t.createPredicate(this._isInMedia, !0, C.ErrNotInMedia),
                    t.createPredicate(
                      this._shouldAllowPlayerStateChange,
                      !0,
                      C.ErrInvalidPlayerState,
                    ),
                    t.createPredicate(this._isInBuffer, !1, C.ErrInBuffer),
                    t.createPredicate(this._isInSeek, !1, C.ErrInSeek),
                  ],
                  [this._cmdPause],
                  this,
                ),
                this._ruleEngine.registerRule(
                  B.BufferStart,
                  'API:trackEvent(BufferStart)',
                  [
                    t.createPredicate(this._isInSession, !0, C.ErrNotInSession),
                    t.createPredicate(this._isInMedia, !0, C.ErrNotInMedia),
                    t.createPredicate(
                      this._shouldAllowPlayerStateChange,
                      !0,
                      C.ErrInvalidPlayerState,
                    ),
                    t.createPredicate(this._isInBuffer, !1, C.ErrInBuffer),
                    t.createPredicate(this._isInSeek, !1, C.ErrInSeek),
                  ],
                  [this._cmdBufferStart],
                  this,
                ),
                this._ruleEngine.registerRule(
                  B.BufferComplete,
                  'API:trackEvent(BufferComplete)',
                  [
                    t.createPredicate(this._isInSession, !0, C.ErrNotInSession),
                    t.createPredicate(this._isInMedia, !0, C.ErrNotInMedia),
                    t.createPredicate(
                      this._shouldAllowPlayerStateChange,
                      !0,
                      C.ErrInvalidPlayerState,
                    ),
                    t.createPredicate(this._isInBuffer, !0, C.ErrNotInBuffer),
                  ],
                  [this._cmdBufferComplete],
                  this,
                ),
                this._ruleEngine.registerRule(
                  B.SeekStart,
                  'API:trackEvent(SeekStart)',
                  [
                    t.createPredicate(this._isInSession, !0, C.ErrNotInSession),
                    t.createPredicate(this._isInMedia, !0, C.ErrNotInMedia),
                    t.createPredicate(
                      this._shouldAllowPlayerStateChange,
                      !0,
                      C.ErrInvalidPlayerState,
                    ),
                    t.createPredicate(this._isInSeek, !1, C.ErrInSeek),
                    t.createPredicate(this._isInBuffer, !1, C.ErrInBuffer),
                  ],
                  [this._cmdSeekStart],
                  this,
                ),
                this._ruleEngine.registerRule(
                  B.SeekComplete,
                  'API:trackEvent(SeekComplete)',
                  [
                    t.createPredicate(this._isInSession, !0, C.ErrNotInSession),
                    t.createPredicate(this._isInMedia, !0, C.ErrNotInMedia),
                    t.createPredicate(
                      this._shouldAllowPlayerStateChange,
                      !0,
                      C.ErrInvalidPlayerState,
                    ),
                    t.createPredicate(this._isInSeek, !0, C.ErrNotInSeek),
                  ],
                  [this._cmdSeekComplete],
                  this,
                ),
                this._ruleEngine.registerRule(
                  B.AdBreakStart,
                  'API:trackEvent(AdBreakStart)',
                  [
                    t.createPredicate(this._isInSession, !0, C.ErrNotInSession),
                    t.createPredicate(this._isInMedia, !0, C.ErrNotInMedia),
                    t.createPredicate(this._isValidAdBreakObject, !0, C.ErrInvalidAdBreakObject),
                    t.createPredicate(
                      this._isDifferentAdBreakObject,
                      !0,
                      C.ErrDuplicateAdBreakObject,
                    ),
                  ],
                  [this._cmdAdSkip, this._cmdAdBreakComplete, this._cmdAdBreakStart],
                  this,
                ),
                this._ruleEngine.registerRule(
                  B.AdBreakComplete,
                  'API:trackEvent(AdBreakComplete)',
                  [
                    t.createPredicate(this._isInSession, !0, C.ErrNotInSession),
                    t.createPredicate(this._isInMedia, !0, C.ErrNotInMedia),
                    t.createPredicate(this._isInAdBreak, !0, C.ErrNotInAdBreak),
                  ],
                  [this._cmdAdSkip, this._cmdAdBreakComplete],
                  this,
                ),
                this._ruleEngine.registerRule(
                  B.AdStart,
                  'API:trackEvent(AdStart)',
                  [
                    t.createPredicate(this._isInSession, !0, C.ErrNotInSession),
                    t.createPredicate(this._isInMedia, !0, C.ErrNotInMedia),
                    t.createPredicate(this._isInAdBreak, !0, C.ErrNotInAdBreak),
                    t.createPredicate(this._isValidAdObject, !0, C.ErrInvalidAdObject),
                    t.createPredicate(this._isDifferentAdObject, !0, C.ErrDuplicateAdObject),
                  ],
                  [this._cmdAdSkip, this._cmdAdStart],
                  this,
                ),
                this._ruleEngine.registerRule(
                  B.AdComplete,
                  'API:trackEvent(AdComplete)',
                  [
                    t.createPredicate(this._isInSession, !0, C.ErrNotInSession),
                    t.createPredicate(this._isInMedia, !0, C.ErrNotInMedia),
                    t.createPredicate(this._isInAdBreak, !0, C.ErrNotInAdBreak),
                    t.createPredicate(this._isInAd, !0, C.ErrNotInAd),
                  ],
                  [this._cmdAdComplete],
                  this,
                ),
                this._ruleEngine.registerRule(
                  B.AdSkip,
                  'API:trackEvent(AdSkip)',
                  [
                    t.createPredicate(this._isInSession, !0, C.ErrNotInSession),
                    t.createPredicate(this._isInMedia, !0, C.ErrNotInMedia),
                    t.createPredicate(this._isInAdBreak, !0, C.ErrNotInAdBreak),
                    t.createPredicate(this._isInAd, !0, C.ErrNotInAd),
                  ],
                  [this._cmdAdSkip],
                  this,
                ),
                this._ruleEngine.registerRule(
                  B.ChapterStart,
                  'API:trackEvent(ChapterStart)',
                  [
                    t.createPredicate(this._isInSession, !0, C.ErrNotInSession),
                    t.createPredicate(this._isInMedia, !0, C.ErrNotInMedia),
                    t.createPredicate(this._isValidChapterObject, !0, C.ErrInvalidChapterObject),
                    t.createPredicate(
                      this._isDifferentChapterObject,
                      !0,
                      C.ErrDuplicateChapterObject,
                    ),
                  ],
                  [this._cmdChapterSkip, this._cmdChapterStart],
                  this,
                ),
                this._ruleEngine.registerRule(
                  B.ChapterComplete,
                  'API:trackEvent(ChapterComplete)',
                  [
                    t.createPredicate(this._isInSession, !0, C.ErrNotInSession),
                    t.createPredicate(this._isInMedia, !0, C.ErrNotInMedia),
                    t.createPredicate(this._isInChapter, !0, C.ErrNotInChapter),
                  ],
                  [this._cmdChapterComplete],
                  this,
                ),
                this._ruleEngine.registerRule(
                  B.ChapterSkip,
                  'API:trackEvent(ChapterSkip)',
                  [
                    t.createPredicate(this._isInSession, !0, C.ErrNotInSession),
                    t.createPredicate(this._isInMedia, !0, C.ErrNotInMedia),
                    t.createPredicate(this._isInChapter, !0, C.ErrNotInChapter),
                  ],
                  [this._cmdChapterSkip],
                  this,
                ),
                this._ruleEngine.registerRule(
                  B.BitrateChange,
                  'API:trackEvent(BitrateChange)',
                  [
                    t.createPredicate(this._isInSession, !0, C.ErrNotInSession),
                    t.createPredicate(this._isInMedia, !0, C.ErrNotInMedia),
                  ],
                  [this._cmdBitrate],
                  this,
                ),
                this._ruleEngine.registerRule(
                  B.TimedMetadataUpdate,
                  'API:trackEvent(TimedMetadataUpdate)',
                  [
                    t.createPredicate(this._isInSession, !0, C.ErrNotInSession),
                    t.createPredicate(this._isInMedia, !0, C.ErrNotInMedia),
                    t.createPredicate(
                      this._isValidTimedMetadataObject,
                      !0,
                      C.ErrInvalidTimedMetadataObject,
                    ),
                  ],
                  [this._cmdTimedMetadataUpdate],
                  this,
                ),
                this._ruleEngine.registerRule(
                  B.DisableTracking,
                  'Internal::DisableTracking',
                  [t.createPredicate(this._isTrackingDisabled, !1, C.ErrTrackingDisabled)],
                  [this._cmdDisableTracking],
                  this,
                ),
                this._ruleEngine.registerRule(
                  B.BeginReporting,
                  'Internal::BeginReporting',
                  [
                    t.createPredicate(this._isInSession, !0, C.ErrNotInSession),
                    t.createPredicate(this._isInMedia, !0, C.ErrNotInMedia),
                    t.createPredicate(this._didBeginReporting, !1, C.ErrBeginReporting),
                  ],
                  [this._cmdBeginReporting],
                  this,
                );
            }),
            (e.prototype._configureAdobeAnalyticsPlugin = function () {
              this._aaPlugin = new n(this._appMeasurement, new p(this));
              var a = new o();
              (a.channel = this._config.channel ? this._config.channel : ''),
                (a.debugLogging = c.MediaHeartbeat._debugLogging || this._config.debugLogging),
                this._aaPlugin.configure(a),
                this._plugins.push(this._aaPlugin);
            }),
            (e.prototype._configureAdobeHearbeatPlugin = function () {
              var a = this._appMeasurement.visitor
                ? this._appMeasurement.visitor.marketingCloudOrgID
                : '';
              this._ahPlugin = new q(new s(this));
              var b = new r(this._config.trackingServer, a);
              (b.debugLogging = c.MediaHeartbeat._debugLogging || this._config.debugLogging),
                (b.ovp = this._config.ovp ? this._config.ovp : ''),
                (b.ssl = this._config.ssl),
                (b.sdk = this._config.appVersion ? this._config.appVersion : '');
              var d = this._primetimeTVSDKVersion();
              d && d.length > 0 && ((b.__primetime = !0), (b.__psdkVersion = d)),
                this._ahPlugin.configure(b),
                this._plugins.push(this._ahPlugin);
            }),
            (e.prototype._configureVideoPlayerPlugin = function () {
              this._playerPlugin = new k(new m(this));
              var a = new l();
              (a.debugLogging = c.MediaHeartbeat._debugLogging || this._config.debugLogging),
                this._playerPlugin.configure(a),
                this._plugins.push(this._playerPlugin);
            }),
            (e.prototype._configureOtherPlugins = function () {
              if (
                c.plugins.nielsen &&
                this._config.nielsenConfigKey &&
                this._config.nielsenAppInfo
              ) {
                this._nielsenPlugin = new c.plugins.nielsen.NielsenPlugin(
                  new c._NielsenPluginDelegate(this, this._logger),
                );
                var a = new c.plugins.nielsen.NielsenPluginConfig();
                (a.debugLogging = c.MediaHeartbeat._debugLogging || this._config.debugLogging),
                  (a.appInfo = this._config.nielsenAppInfo),
                  (a.configKey = this._config.nielsenConfigKey),
                  this._nielsenPlugin.configure(a),
                  this._plugins.push(this._nielsenPlugin);
              }
            }),
            (e.prototype._configureHeartbeat = function () {
              var a = new i();
              (a.debugLogging = c.MediaHeartbeat._debugLogging || this._config.debugLogging),
                (this._heartbeat = new h(new j(this), this._plugins)),
                this._heartbeat.configure(a);
            }),
            (e.prototype._resetState = function () {
              this._taskScheduler.clearTasks(),
                this._privacyManager.reset(),
                (this._mediaState = {}),
                (this._plugins = []),
                (this._playerPlugin = null),
                (this._aaPlugin = null),
                (this._ahPlugin = null),
                (this._nielsenPlugin = null),
                (this._heartbeat = null),
                (this._currentMediaObject = null),
                (this._currentAdBreakObject = null),
                (this._currentAdObject = null),
                (this._currentChapterObject = null),
                (this._videoInfo = null),
                (this._adBreakInfo = null),
                (this._adInfo = null),
                (this._chapterInfo = null),
                (this._prerollWaitEnabled = !0),
                (this._prerollWaitTime = O),
                (this._playReceived = !1),
                (this._playUnhandledFromPrerollWaitTime = !1),
                (this._playTaskHandle = null),
                (this._playAfterAdStart = !1);
            }),
            (e.prototype._primetimeTVSDKVersion = function () {
              return this._currentMediaObject ? this._currentMediaObject.getValue(M) : null;
            }),
            (e.prototype._cleanContextData = function (a) {
              if (null == a || 'object' != typeof a) return null;
              var b = {};
              for (var c in a)
                if (a.hasOwnProperty(c)) {
                  var d = a[c];
                  ('number' != typeof d && 'string' != typeof d && 'boolean' != typeof d) ||
                    (b[c] = d);
                }
              return b;
            }),
            (e.prototype._prepareMetadata = function (a, b) {
              var c = {};
              if ((b && w.append(c, b), a)) {
                var d = this._cleanContextData(a);
                w.append(c, d);
              }
              return delete c[L], c;
            }),
            (e.prototype._onDelegateError = function (a) {
              this._logger.error(D, a.getMessage() + ' | ' + a.getDetails());
            }),
            (e.prototype._onDelegateTrackingDisabled = function () {
              this._processRule(B.SessionEnd), this._processRule(B.DisableTracking);
            }),
            (e.prototype._onPrivacyChange = function (a) {
              this._logger.info(D, '#_onPrivacyChange: Privacy Status: ' + a),
                a === v.OPT_IN
                  ? this._processRule(B.BeginReporting)
                  : a === v.OPT_OUT && this._processRule(B.SessionEnd);
            });
          var A = {
              Session: 0,
              Media: 1,
              AdBreak: 2,
              Ad: 3,
              Chapter: 4,
              PlayPause: 5,
              Buffer: 6,
              Seek: 7,
              FPlayPause: 8,
              Reporting: 9,
            },
            B = {
              SessionStart: 0,
              SessionEnd: 1,
              VideoComplete: 2,
              Play: 3,
              Pause: 4,
              Error: 5,
              AdBreakStart: 6,
              AdBreakComplete: 7,
              AdStart: 8,
              AdComplete: 9,
              AdSkip: 10,
              ChapterStart: 11,
              ChapterComplete: 12,
              ChapterSkip: 13,
              SeekStart: 14,
              SeekComplete: 15,
              BufferStart: 16,
              BufferComplete: 17,
              BitrateChange: 18,
              TimedMetadataUpdate: 19,
              DisableTracking: 20,
              BeginReporting: 21,
            },
            C = {
              ErrUnSupportedPlatform:
                'MediaHeartbeat does not support tracking due to AppMeasurement or VisitorAPI not supporting the browser.',
              ErrNotInSession:
                'MediaHeartbeat is not in active tracking session, call "API:trackSessionStart" to begin a new tracking session.',
              ErrInSession:
                'MediaHeartbeat is in active tracking session, call "API:trackSessionEnd" to end current tracking session.',
              ErrNotInMedia:
                'MediaHeartbeat has completed tracking session, call "API:trackSessionEnd" first to end current session and then begin a new tracking session.',
              ErrInBuffer:
                'MediaHeartbeat is tracking buffer events, call "API:trackEvent(BufferComplete)" first to stop tracking buffer events.',
              ErrNotInBuffer:
                'MediaHeartbeat is not tracking buffer events, call "API:trackEvent(BufferStart)" before "API:trackEvent(BufferComplete)".',
              ErrInSeek:
                'MediaHeartbeat is tracking seek events, call "API:trackEvent(SeekComplete)" first to stop tracking seek events.',
              ErrNotInSeek:
                'MediaHeartbeat is not tracking seek events, call "API:trackEvent(SeekStart)" before "API:trackEvent(SeekComplete)".',
              ErrNotInAdBreak:
                'MediaHeartbeat is not tracking any AdBreak, call "API:trackEvent(AdBreakStart)" to begin tracking AdBreak',
              ErrNotInAd:
                'MediaHeartbeat is not tracking any Ad, call "API:trackEvent(AdStart)" to begin tracking Ad',
              ErrNotInChapter:
                'MediaHeartbeat is not tracking any Chapter, call "API:trackEvent(ChapterStart)" to begin tracking Chapter',
              ErrInvalidMediaObject: 'MediaInfo passed into "API:trackSessionStart" is invalid.',
              ErrInvalidAdBreakObject:
                'AdBreakInfo passed into "API:trackEvent(AdBreakStart)" is invalid.',
              ErrDuplicateAdBreakObject:
                'MediaHeartbeat is currently tracking the AdBreak passed into "API:trackEvent(AdBreakStart)".',
              ErrInvalidAdObject: 'AdInfo passed into "API:trackEvent(AdStart)" is invalid.',
              ErrDuplicateAdObject:
                'MediaHeartbeat is currently tracking the Ad passed into "API:trackEvent(AdStart)".',
              ErrInvalidChapterObject:
                'ChapterInfo passed into "API:trackEvent(ChapterStart)" is invalid.',
              ErrDuplicateChapterObject:
                'MediaHeartbeat is currently tracking the Chapter passed into "API:trackEvent(ChapterStart)".',
              ErrInvalidTimedMetadataObject:
                'TimedMetadata passed into "API:trackEvent(TimedMetadataUpdate)" is invalid.',
              ErrInvalidPlayerState:
                'MediaHeartbeat is tracking an AdBreak but not tracking any Ad and will drop any calls to track player state (Play, Pause, Buffer or Seek) in this state.',
              ErrAudioTrackingNotSupported:
                "Upgrade your AppMeasurement library to version >= '2.11.0' to support tracking audio content.",
              ErrTrackingDisabled:
                'MediaHeartbeat tracking is disabled for this publisher. Please contact Adobe Representative to enable tracking.',
              ErrBeginReporting: 'MediaHeartbeat has already started reporting.',
            },
            D = 'MediaHeartbeat',
            E = 'key_media_object',
            F = 'key_adbreak_object',
            G = 'key_ad_object',
            H = 'key_chapter_object',
            I = 'key_timed_metadata_object',
            J = 'key_custom_metadata',
            K = 'key_error_id',
            L = 'a.media.streamType',
            M = 'a.__pttvsdkVersion',
            N = 'granular_ad_tracking',
            O = 250;
          (c._MediaHeartbeatRule = B),
            (c._MediaHeartbeatErrorMessage = C),
            (c.MediaHeartbeatDelegate = d),
            (c.MediaHeartbeat = e),
            (c.MediaHeartbeat._debugLogging = !1);
        })(a.ADB.core, a.ADB.va),
        a.ADB || (a.ADB = {}),
        a.ADB.core || (a.ADB.core = core),
        a.ADB.va || (a.ADB.va = va),
        a.ADB.va.plugins || (a.ADB.va.plugins = {});
    })(this);
  }).call(lib);
  exports.va = lib.ADB.va;
  exports.core = lib.ADB.core;
});
