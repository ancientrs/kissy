/*
Copyright 2014, KISSY v1.50
MIT Licensed
build time: Feb 25 19:45
*/
/*
 Combined modules by KISSY Module Compiler: 

 overlay/extension/loading
 overlay/extension/mask
 overlay/close-xtpl
 overlay/overlay-xtpl
 overlay/overlay-render
 overlay/extension/overlay-effect
 overlay/control
 overlay/dialog-xtpl
 overlay/dialog-render
 overlay/dialog
 overlay/popup
 overlay
*/

KISSY.add("overlay/extension/loading", ["node"], function(S, require) {
  var Node = require("node");
  function Loading() {
  }
  Loading.prototype = {loading:function() {
    var self = this;
    if(!self._loadingExtEl) {
      self._loadingExtEl = (new Node("<div " + 'class="' + self.get("prefixCls") + 'ext-loading"' + ' style="position: absolute;' + "border: none;" + "width: 100%;" + "top: 0;" + "left: 0;" + "z-index: 99999;" + "height:100%;" + "*height: expression(this.parentNode.offsetHeight);" + '"/>')).appendTo(self.$el)
    }
    self._loadingExtEl.show()
  }, unloading:function() {
    var lel = this._loadingExtEl;
    if(lel) {
      lel.hide()
    }
  }};
  return Loading
});
KISSY.add("overlay/extension/mask", ["node"], function(S, require) {
  var UA = S.UA, Node = require("node"), ie6 = UA.ie === 6, $ = Node.all;
  function docWidth() {
    return ie6 ? "expression(KISSY.DOM.docWidth())" : "100%"
  }
  function docHeight() {
    return ie6 ? "expression(KISSY.DOM.docHeight())" : "100%"
  }
  function initMask(self, hiddenCls) {
    var maskCls = self.view.getBaseCssClasses("mask"), mask = $("<div " + ' style="width:' + docWidth() + ";" + "left:0;" + "top:0;" + "height:" + docHeight() + ";" + "position:" + (ie6 ? "absolute" : "fixed") + ';"' + ' class="' + maskCls + " " + hiddenCls + '">' + (ie6 ? "<" + "iframe " + 'style="position:absolute;' + "left:" + "0" + ";" + "top:" + "0" + ";" + "background:red;" + "width: expression(this.parentNode.offsetWidth);" + "height: expression(this.parentNode.offsetHeight);" + "filter:alpha(opacity=0);" + 
    'z-index:-1;"></iframe>' : "") + "</div>").prependTo("body");
    mask.unselectable();
    mask.on("mousedown", function(e) {
      e.preventDefault()
    });
    return mask
  }
  function Mask() {
  }
  Mask.ATTRS = {mask:{value:false}, maskNode:{}};
  var NONE = "none", effects = {fade:["Out", "In"], slide:["Up", "Down"]};
  function setMaskVisible(self, shown) {
    var maskNode = self.get("maskNode"), hiddenCls = self.view.getBaseCssClasses("mask-hidden");
    if(shown) {
      maskNode.removeClass(hiddenCls)
    }else {
      maskNode.addClass(hiddenCls)
    }
  }
  function processMask(mask, el, show, self) {
    var effect = mask.effect || NONE;
    setMaskVisible(self, show);
    if(effect === NONE) {
      return
    }
    var duration = mask.duration, easing = mask.easing, m, index = show ? 1 : 0;
    el.stop(1, 1);
    el.css("display", show ? NONE : "block");
    m = effect + effects[effect][index];
    el[m](duration, function() {
      el.css("display", "")
    }, easing)
  }
  function afterVisibleChange(e) {
    var v, self = this, maskNode = self.get("maskNode");
    if(v = e.newVal) {
      var elZIndex = Number(self.$el.css("z-index"));
      if(!isNaN(elZIndex)) {
        maskNode.css("z-index", elZIndex)
      }
    }
    processMask(self.get("mask"), maskNode, v, self)
  }
  Mask.prototype = {__renderUI:function() {
    var self = this;
    if(self.get("mask")) {
      self.set("maskNode", initMask(self, self.get("visible") ? "" : self.view.getBaseCssClasses("mask-hidden")))
    }
  }, __bindUI:function() {
    var self = this, maskNode, mask;
    if(mask = self.get("mask")) {
      maskNode = self.get("maskNode");
      if(mask.closeOnClick) {
        maskNode.on(Node.Gesture.tap, self.close, self)
      }
      self.on("afterVisibleChange", afterVisibleChange)
    }
  }, __destructor:function() {
    var mask;
    if(mask = this.get("maskNode")) {
      mask.remove()
    }
  }};
  return Mask
});
KISSY.add("overlay/close-xtpl", [], function(S, require, exports, module) {
  var t = function(scope, S, payload, undefined) {
    var buffer = "", engine = this, moduleWrap, escapeHtml = S.escapeHtml, nativeCommands = engine.nativeCommands, utils = engine.utils;
    if(typeof module !== "undefined" && module.kissy) {
      moduleWrap = module
    }
    var callCommandUtil = utils.callCommand, eachCommand = nativeCommands.each, withCommand = nativeCommands["with"], ifCommand = nativeCommands["if"], setCommand = nativeCommands.set, includeCommand = nativeCommands.include, parseCommand = nativeCommands.parse, extendCommand = nativeCommands.extend, blockCommand = nativeCommands.block, macroCommand = nativeCommands.macro;
    buffer += "";
    var option0 = {};
    var params1 = [];
    var id2 = scope.resolve(["closable"]);
    params1.push(id2);
    option0.params = params1;
    option0.fn = function(scope) {
      var buffer = "";
      buffer += '\n<a href="javascript:void(\'close\')"\n   id="ks-overlay-close-';
      var id3 = scope.resolve(["id"]);
      buffer += escapeHtml(id3);
      buffer += '"\n   class="';
      var option5 = {};
      var params6 = [];
      params6.push("close");
      option5.params = params6;
      var id4 = callCommandUtil(engine, scope, option5, "getBaseCssClasses", 4);
      buffer += escapeHtml(id4);
      buffer += "\"\n   role='button'>\n    <span class=\"";
      var option8 = {};
      var params9 = [];
      params9.push("close-x");
      option8.params = params9;
      var id7 = callCommandUtil(engine, scope, option8, "getBaseCssClasses", 6);
      buffer += escapeHtml(id7);
      buffer += '">close</span>\n</a>\n';
      return buffer
    };
    buffer += ifCommand.call(engine, scope, option0, payload);
    buffer += "\n";
    return buffer
  };
  t.TPL_NAME = "E:/code/kissy_git/kissy/kissy/src/overlay/src/overlay/close.xtpl.html";
  return t
});
KISSY.add("overlay/overlay-xtpl", ["overlay/close-xtpl", "component/extension/content-xtpl"], function(S, require, exports, module) {
  var t = function(scope, S, payload, undefined) {
    var buffer = "", engine = this, moduleWrap, escapeHtml = S.escapeHtml, nativeCommands = engine.nativeCommands, utils = engine.utils;
    if(typeof module !== "undefined" && module.kissy) {
      moduleWrap = module
    }
    var callCommandUtil = utils.callCommand, eachCommand = nativeCommands.each, withCommand = nativeCommands["with"], ifCommand = nativeCommands["if"], setCommand = nativeCommands.set, includeCommand = nativeCommands.include, parseCommand = nativeCommands.parse, extendCommand = nativeCommands.extend, blockCommand = nativeCommands.block, macroCommand = nativeCommands.macro;
    buffer += "";
    var option1 = {};
    var params2 = [];
    params2.push("overlay/close-xtpl");
    option1.params = params2;
    if(moduleWrap) {
      require("overlay/close-xtpl");
      option1.params[0] = moduleWrap.resolveByName(option1.params[0])
    }
    var id0 = includeCommand.call(engine, scope, option1, payload);
    if(id0 || id0 === 0) {
      buffer += id0
    }
    buffer += "\n";
    var option4 = {};
    var params5 = [];
    params5.push("component/extension/content-xtpl");
    option4.params = params5;
    if(moduleWrap) {
      require("component/extension/content-xtpl");
      option4.params[0] = moduleWrap.resolveByName(option4.params[0])
    }
    var id3 = includeCommand.call(engine, scope, option4, payload);
    if(id3 || id3 === 0) {
      buffer += id3
    }
    return buffer
  };
  t.TPL_NAME = "E:/code/kissy_git/kissy/kissy/src/overlay/src/overlay/overlay.xtpl.html";
  return t
});
KISSY.add("overlay/overlay-render", ["component/container", "./overlay-xtpl", "component/extension/content-render"], function(S, require) {
  var Container = require("component/container");
  var OverlayTpl = require("./overlay-xtpl");
  var ContentRenderExtension = require("component/extension/content-render");
  return Container.getDefaultRender().extend([ContentRenderExtension], {createDom:function() {
    this.fillChildrenElsBySelectors({closeBtn:"#ks-overlay-close-{id}"})
  }}, {ATTRS:{contentTpl:{value:OverlayTpl}}, HTML_PARSER:{closeBtn:function(el) {
    return el.one("." + this.getBaseCssClass("close"))
  }}})
});
KISSY.add("overlay/extension/overlay-effect", [], function(S) {
  var effects = {fade:["Out", "In"], slide:["Up", "Down"]};
  function getGhost(self) {
    var el = self.$el, ghost = el.clone(true);
    ghost.css({visibility:"visible", overflow:"hidden"}).addClass(self.get("prefixCls") + "overlay-ghost");
    return self.__afterCreateEffectGhost(ghost)
  }
  function processTarget(self, show, callback) {
    if(self.__effectGhost) {
      self.__effectGhost.stop(1, 1)
    }
    var el = self.$el, $ = S.all, effectCfg = self.get("effect"), target = $(effectCfg.target), duration = effectCfg.duration, targetBox = S.mix(target.offset(), {width:target.width(), height:target.height()}), elBox = S.mix(el.offset(), {width:el.width(), height:el.height()}), from, to, ghost = getGhost(self), easing = effectCfg.easing;
    ghost.insertAfter(el);
    if(show) {
      from = targetBox;
      to = elBox
    }else {
      from = elBox;
      to = targetBox
    }
    el.css("visibility", "hidden");
    ghost.css(from);
    self.__effectGhost = ghost;
    ghost.animate(to, {duration:duration, easing:easing, complete:function() {
      self.__effectGhost = null;
      ghost.remove();
      el.css("visibility", "");
      callback()
    }})
  }
  function processEffect(self, show, callback) {
    var el = self.$el, effectCfg = self.get("effect"), effect = effectCfg.effect || "none", target = effectCfg.target;
    if(effect === "none" && !target) {
      callback();
      return
    }
    if(target) {
      processTarget(self, show, callback);
      return
    }
    var duration = effectCfg.duration, easing = effectCfg.easing, index = show ? 1 : 0;
    el.stop(1, 1);
    el.css({visibility:"visible", display:show ? "none" : "block"});
    var m = effect + effects[effect][index];
    el[m](duration, function() {
      el.css({display:"block", visibility:""});
      callback()
    }, easing)
  }
  function OverlayEffect() {
  }
  OverlayEffect.ATTRS = {effect:{value:{effect:"", target:null, duration:0.5, easing:"easeOut"}, setter:function(v) {
    var effect = v.effect;
    if(typeof effect === "string" && !effects[effect]) {
      v.effect = ""
    }
  }}};
  OverlayEffect.prototype = {__afterCreateEffectGhost:function(ghost) {
    return ghost
  }, _onSetVisible:function(v) {
    var self = this;
    processEffect(self, v, function() {
      self.fire(v ? "show" : "hide")
    })
  }};
  return OverlayEffect
});
KISSY.add("overlay/control", ["component/container", "component/extension/shim", "component/extension/align", "./extension/loading", "./extension/mask", "./overlay-render", "./extension/overlay-effect"], function(S, require) {
  var Container = require("component/container");
  var Shim = require("component/extension/shim");
  var AlignExtension = require("component/extension/align");
  var Loading = require("./extension/loading");
  var Mask = require("./extension/mask");
  var OverlayRender = require("./overlay-render");
  var OverlayEffect = require("./extension/overlay-effect");
  var HIDE = "hide", actions = {hide:HIDE, destroy:"destroy"};
  return Container.extend([Shim, Loading, AlignExtension, Mask, OverlayEffect], {bindUI:function() {
    var self = this, closeBtn = self.get("closeBtn");
    if(closeBtn) {
      closeBtn.on("click", function(ev) {
        self.close();
        ev.preventDefault()
      })
    }
  }, close:function() {
    var self = this;
    self[actions[self.get("closeAction")] || HIDE]();
    return self
  }}, {ATTRS:{contentEl:{}, closable:{value:false, view:1}, closeBtn:{view:1}, closeAction:{value:HIDE}, focusable:{value:false}, allowTextSelection:{value:true}, handleGestureEvents:{value:false}, visible:{value:false}, xrender:{value:OverlayRender}}, xclass:"overlay"})
});
KISSY.add("overlay/dialog-xtpl", ["overlay/close-xtpl"], function(S, require, exports, module) {
  var t = function(scope, S, payload, undefined) {
    var buffer = "", engine = this, moduleWrap, escapeHtml = S.escapeHtml, nativeCommands = engine.nativeCommands, utils = engine.utils;
    if(typeof module !== "undefined" && module.kissy) {
      moduleWrap = module
    }
    var callCommandUtil = utils.callCommand, eachCommand = nativeCommands.each, withCommand = nativeCommands["with"], ifCommand = nativeCommands["if"], setCommand = nativeCommands.set, includeCommand = nativeCommands.include, parseCommand = nativeCommands.parse, extendCommand = nativeCommands.extend, blockCommand = nativeCommands.block, macroCommand = nativeCommands.macro;
    buffer += "";
    var option1 = {};
    var params2 = [];
    params2.push("overlay/close-xtpl");
    option1.params = params2;
    if(moduleWrap) {
      require("overlay/close-xtpl");
      option1.params[0] = moduleWrap.resolveByName(option1.params[0])
    }
    var id0 = includeCommand.call(engine, scope, option1, payload);
    if(id0 || id0 === 0) {
      buffer += id0
    }
    buffer += '\n<div id="ks-content-';
    var id3 = scope.resolve(["id"]);
    buffer += escapeHtml(id3);
    buffer += '"\n     class="';
    var option5 = {};
    var params6 = [];
    params6.push("content");
    option5.params = params6;
    var id4 = callCommandUtil(engine, scope, option5, "getBaseCssClasses", 3);
    buffer += escapeHtml(id4);
    buffer += '">\n    <div class="';
    var option8 = {};
    var params9 = [];
    params9.push("header");
    option8.params = params9;
    var id7 = callCommandUtil(engine, scope, option8, "getBaseCssClasses", 4);
    buffer += escapeHtml(id7);
    buffer += '"\n         style="\n';
    var option10 = {};
    var params11 = [];
    var id12 = scope.resolve(["headerStyle"]);
    params11.push(id12);
    option10.params = params11;
    option10.fn = function(scope) {
      var buffer = "";
      buffer += "\n ";
      var id13 = scope.resolve(["xindex"]);
      buffer += escapeHtml(id13);
      buffer += ":";
      var id14 = scope.resolve(["this"]);
      buffer += escapeHtml(id14);
      buffer += ";\n";
      return buffer
    };
    buffer += eachCommand.call(engine, scope, option10, payload);
    buffer += '\n"\n         id="ks-stdmod-header-';
    var id15 = scope.resolve(["id"]);
    buffer += escapeHtml(id15);
    buffer += '">';
    var id16 = scope.resolve(["headerContent"]);
    if(id16 || id16 === 0) {
      buffer += id16
    }
    buffer += '</div>\n\n    <div class="';
    var option18 = {};
    var params19 = [];
    params19.push("body");
    option18.params = params19;
    var id17 = callCommandUtil(engine, scope, option18, "getBaseCssClasses", 12);
    buffer += escapeHtml(id17);
    buffer += '"\n         style="\n';
    var option20 = {};
    var params21 = [];
    var id22 = scope.resolve(["bodyStyle"]);
    params21.push(id22);
    option20.params = params21;
    option20.fn = function(scope) {
      var buffer = "";
      buffer += "\n ";
      var id23 = scope.resolve(["xindex"]);
      buffer += escapeHtml(id23);
      buffer += ":";
      var id24 = scope.resolve(["this"]);
      buffer += escapeHtml(id24);
      buffer += ";\n";
      return buffer
    };
    buffer += eachCommand.call(engine, scope, option20, payload);
    buffer += '\n"\n         id="ks-stdmod-body-';
    var id25 = scope.resolve(["id"]);
    buffer += escapeHtml(id25);
    buffer += '">';
    var id26 = scope.resolve(["bodyContent"]);
    if(id26 || id26 === 0) {
      buffer += id26
    }
    buffer += '</div>\n\n    <div class="';
    var option28 = {};
    var params29 = [];
    params29.push("footer");
    option28.params = params29;
    var id27 = callCommandUtil(engine, scope, option28, "getBaseCssClasses", 20);
    buffer += escapeHtml(id27);
    buffer += '"\n         style="\n';
    var option30 = {};
    var params31 = [];
    var id32 = scope.resolve(["footerStyle"]);
    params31.push(id32);
    option30.params = params31;
    option30.fn = function(scope) {
      var buffer = "";
      buffer += "\n ";
      var id33 = scope.resolve(["xindex"]);
      buffer += escapeHtml(id33);
      buffer += ":";
      var id34 = scope.resolve(["this"]);
      buffer += escapeHtml(id34);
      buffer += ";\n";
      return buffer
    };
    buffer += eachCommand.call(engine, scope, option30, payload);
    buffer += '\n"\n         id="ks-stdmod-footer-';
    var id35 = scope.resolve(["id"]);
    buffer += escapeHtml(id35);
    buffer += '">';
    var id36 = scope.resolve(["footerContent"]);
    if(id36 || id36 === 0) {
      buffer += id36
    }
    buffer += '</div>\n</div>\n<div tabindex="0"></div>';
    return buffer
  };
  t.TPL_NAME = "E:/code/kissy_git/kissy/kissy/src/overlay/src/overlay/dialog.xtpl.html";
  return t
});
KISSY.add("overlay/dialog-render", ["./overlay-render", "./dialog-xtpl"], function(S, require) {
  var OverlayRender = require("./overlay-render");
  var DialogTpl = require("./dialog-xtpl");
  function _setStdModRenderContent(self, part, v) {
    part = self.control.get(part);
    part.html(v)
  }
  return OverlayRender.extend({beforeCreateDom:function(renderData) {
    S.mix(renderData.elAttrs, {role:"dialog", "aria-labelledby":"ks-stdmod-header-" + this.control.get("id")})
  }, createDom:function() {
    this.fillChildrenElsBySelectors({header:"#ks-stdmod-header-{id}", body:"#ks-stdmod-body-{id}", footer:"#ks-stdmod-footer-{id}"})
  }, getChildrenContainerEl:function() {
    return this.control.get("body")
  }, _onSetBodyStyle:function(v) {
    this.control.get("body").css(v)
  }, _onSetHeaderStyle:function(v) {
    this.control.get("header").css(v)
  }, _onSetFooterStyle:function(v) {
    this.control.get("footer").css(v)
  }, _onSetBodyContent:function(v) {
    _setStdModRenderContent(this, "body", v)
  }, _onSetHeaderContent:function(v) {
    _setStdModRenderContent(this, "header", v)
  }, _onSetFooterContent:function(v) {
    _setStdModRenderContent(this, "footer", v)
  }}, {ATTRS:{contentTpl:{value:DialogTpl}}, HTML_PARSER:{header:function(el) {
    return el.one("." + this.getBaseCssClass("header"))
  }, body:function(el) {
    return el.one("." + this.getBaseCssClass("body"))
  }, footer:function(el) {
    return el.one("." + this.getBaseCssClass("footer"))
  }, headerContent:function(el) {
    return el.one("." + this.getBaseCssClass("header")).html()
  }, bodyContent:function(el) {
    return el.one("." + this.getBaseCssClass("body")).html()
  }, footerContent:function(el) {
    var footer = el.one("." + this.getBaseCssClass("footer"));
    return footer && footer.html()
  }}})
});
KISSY.add("overlay/dialog", ["./control", "./dialog-render", "node"], function(S, require) {
  var Overlay = require("./control");
  var DialogRender = require("./dialog-render");
  var Node = require("node");
  var Dialog = Overlay.extend({__afterCreateEffectGhost:function(ghost) {
    var self = this, elBody = self.get("body");
    ghost.all("." + self.get("prefixCls") + "stdmod-body").css({height:elBody.height(), width:elBody.width()}).html("");
    return ghost
  }, handleKeyDownInternal:function(e) {
    if(this.get("escapeToClose") && e.keyCode === Node.KeyCode.ESC) {
      if(!(e.target.nodeName.toLowerCase() === "select" && !e.target.disabled)) {
        this.close();
        e.halt()
      }
      return
    }
    trapFocus.call(this, e)
  }, _onSetVisible:function(v, e) {
    var self = this, el = self.el;
    if(v) {
      self.__lastActive = el.ownerDocument.activeElement;
      self.focus();
      el.setAttribute("aria-hidden", "false")
    }else {
      el.setAttribute("aria-hidden", "true");
      try {
        if(self.__lastActive) {
          self.__lastActive.focus()
        }
      }catch(ee) {
      }
    }
    self.callSuper(v, e)
  }}, {ATTRS:{header:{view:1}, body:{view:1}, footer:{view:1}, bodyStyle:{value:{}, view:1}, footerStyle:{value:{}, view:1}, headerStyle:{value:{}, view:1}, headerContent:{value:"", view:1}, bodyContent:{value:"", view:1}, footerContent:{value:"", view:1}, closable:{value:true}, xrender:{value:DialogRender}, focusable:{value:true}, escapeToClose:{value:true}}, xclass:"dialog"});
  var KEY_TAB = Node.KeyCode.TAB;
  function trapFocus(e) {
    var self = this, keyCode = e.keyCode;
    if(keyCode !== KEY_TAB) {
      return
    }
    var $el = self.$el;
    var node = Node.all(e.target);
    var lastFocusItem = $el.last();
    if(node.equals($el) && e.shiftKey) {
      lastFocusItem[0].focus();
      e.halt()
    }else {
      if(node.equals(lastFocusItem) && !e.shiftKey) {
        self.focus();
        e.halt()
      }else {
        if(node.equals($el) || $el.contains(node)) {
          return
        }
      }
    }
    e.halt()
  }
  return Dialog
});
KISSY.add("overlay/popup", ["./control"], function(S, require) {
  var Overlay = require("./control");
  return Overlay.extend({initializer:function() {
    var self = this, trigger = self.get("trigger");
    if(trigger) {
      if(self.get("triggerType") === "mouse") {
        self._bindTriggerMouse();
        self.on("afterRenderUI", function() {
          self._bindContainerMouse()
        })
      }else {
        self._bindTriggerClick()
      }
    }
  }, _bindTriggerMouse:function() {
    var self = this, trigger = self.get("trigger"), timer;
    self.__mouseEnterPopup = function(ev) {
      self._clearHiddenTimer();
      timer = S.later(function() {
        self._showing(ev);
        timer = undefined
      }, self.get("mouseDelay") * 1E3)
    };
    trigger.on("mouseenter", self.__mouseEnterPopup);
    self._mouseLeavePopup = function() {
      if(timer) {
        timer.cancel();
        timer = undefined
      }
      self._setHiddenTimer()
    };
    trigger.on("mouseleave", self._mouseLeavePopup)
  }, _bindContainerMouse:function() {
    var self = this;
    self.$el.on("mouseleave", self._setHiddenTimer, self).on("mouseenter", self._clearHiddenTimer, self)
  }, _setHiddenTimer:function() {
    var self = this;
    self._hiddenTimer = S.later(function() {
      self._hiding()
    }, self.get("mouseDelay") * 1E3)
  }, _clearHiddenTimer:function() {
    var self = this;
    if(self._hiddenTimer) {
      self._hiddenTimer.cancel();
      self._hiddenTimer = undefined
    }
  }, _bindTriggerClick:function() {
    var self = this;
    self.__clickPopup = function(ev) {
      ev.preventDefault();
      if(self.get("toggle")) {
        self[self.get("visible") ? "_hiding" : "_showing"](ev)
      }else {
        self._showing(ev)
      }
    };
    self.get("trigger").on("click", self.__clickPopup)
  }, _showing:function(ev) {
    var self = this;
    self.set("currentTrigger", S.one(ev.target));
    self.show()
  }, _hiding:function() {
    this.set("currentTrigger", undefined);
    this.hide()
  }, destructor:function() {
    var self = this, $el = self.$el, t = self.get("trigger");
    if(t) {
      if(self.__clickPopup) {
        t.detach("click", self.__clickPopup)
      }
      if(self.__mouseEnterPopup) {
        t.detach("mouseenter", self.__mouseEnterPopup)
      }
      if(self._mouseLeavePopup) {
        t.detach("mouseleave", self._mouseLeavePopup)
      }
    }
    $el.detach("mouseleave", self._setHiddenTimer, self).detach("mouseenter", self._clearHiddenTimer, self)
  }}, {ATTRS:{trigger:{setter:function(v) {
    return S.all(v)
  }}, triggerType:{value:"click"}, currentTrigger:{}, mouseDelay:{value:0.1}, toggle:{value:false}}, xclass:"popup"})
});
KISSY.add("overlay", ["overlay/control", "overlay/dialog", "overlay/popup"], function(S, require) {
  var O = require("overlay/control");
  var D = require("overlay/dialog");
  var P = require("overlay/popup");
  O.Dialog = D;
  S.Dialog = D;
  O.Popup = P;
  S.Overlay = O;
  return O
});

