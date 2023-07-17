var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/pagerank.js/lib/index.js
var require_lib = __commonJS({
  "node_modules/pagerank.js/lib/index.js"(exports, module2) {
    "use strict";
    function forOwn(object, callback) {
      if (typeof object === "object" && typeof callback === "function") {
        for (var key in object) {
          if (object.hasOwnProperty(key) === true) {
            if (callback(key, object[key]) === false) {
              break;
            }
          }
        }
      }
    }
    module2.exports = function() {
      var self = {
        count: 0,
        edges: {},
        nodes: {}
      };
      self.link = function(source, target, weight) {
        if (isFinite(weight) !== true || weight === null) {
          weight = 1;
        }
        weight = parseFloat(weight);
        if (self.nodes.hasOwnProperty(source) !== true) {
          self.count++;
          self.nodes[source] = {
            weight: 0,
            outbound: 0
          };
        }
        self.nodes[source].outbound += weight;
        if (self.nodes.hasOwnProperty(target) !== true) {
          self.count++;
          self.nodes[target] = {
            weight: 0,
            outbound: 0
          };
        }
        if (self.edges.hasOwnProperty(source) !== true) {
          self.edges[source] = {};
        }
        if (self.edges[source].hasOwnProperty(target) !== true) {
          self.edges[source][target] = 0;
        }
        self.edges[source][target] += weight;
      };
      self.rank = function(alpha, epsilon, callback) {
        var delta = 1, inverse = 1 / self.count;
        forOwn(self.edges, function(source) {
          if (self.nodes[source].outbound > 0) {
            forOwn(self.edges[source], function(target) {
              self.edges[source][target] /= self.nodes[source].outbound;
            });
          }
        });
        forOwn(self.nodes, function(key) {
          self.nodes[key].weight = inverse;
        });
        while (delta > epsilon) {
          var leak = 0, nodes = {};
          forOwn(self.nodes, function(key, value) {
            nodes[key] = value.weight;
            if (value.outbound === 0) {
              leak += value.weight;
            }
            self.nodes[key].weight = 0;
          });
          leak *= alpha;
          forOwn(self.nodes, function(source) {
            forOwn(self.edges[source], function(target, weight) {
              self.nodes[target].weight += alpha * nodes[source] * weight;
            });
            self.nodes[source].weight += (1 - alpha) * inverse + leak * inverse;
          });
          delta = 0;
          forOwn(self.nodes, function(key, value) {
            delta += Math.abs(value.weight - nodes[key]);
          });
        }
        forOwn(self.nodes, function(key) {
          return callback(key, self.nodes[key].weight);
        });
      };
      self.reset = function() {
        self.count = 0;
        self.edges = {};
        self.nodes = {};
      };
      return self;
    }();
  }
});

// node_modules/vhtml/dist/vhtml.js
var require_vhtml = __commonJS({
  "node_modules/vhtml/dist/vhtml.js"(exports, module2) {
    (function(global, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.vhtml = factory();
    })(exports, function() {
      "use strict";
      var emptyTags = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];
      var esc = function esc2(str) {
        return String(str).replace(/[&<>"']/g, function(s) {
          return "&" + map[s] + ";";
        });
      };
      var map = { "&": "amp", "<": "lt", ">": "gt", '"': "quot", "'": "apos" };
      var setInnerHTMLAttr = "dangerouslySetInnerHTML";
      var DOMAttributeNames = {
        className: "class",
        htmlFor: "for"
      };
      var sanitized = {};
      function h2(name, attrs) {
        var stack = [], s = "";
        attrs = attrs || {};
        for (var i = arguments.length; i-- > 2; ) {
          stack.push(arguments[i]);
        }
        if (typeof name === "function") {
          attrs.children = stack.reverse();
          return name(attrs);
        }
        if (name) {
          s += "<" + name;
          if (attrs)
            for (var _i in attrs) {
              if (attrs[_i] !== false && attrs[_i] != null && _i !== setInnerHTMLAttr) {
                s += " " + (DOMAttributeNames[_i] ? DOMAttributeNames[_i] : esc(_i)) + '="' + esc(attrs[_i]) + '"';
              }
            }
          s += ">";
        }
        if (emptyTags.indexOf(name) === -1) {
          if (attrs[setInnerHTMLAttr]) {
            s += attrs[setInnerHTMLAttr].__html;
          } else
            while (stack.length) {
              var child = stack.pop();
              if (child) {
                if (child.pop) {
                  for (var _i2 = child.length; _i2--; ) {
                    stack.push(child[_i2]);
                  }
                } else {
                  s += sanitized[child] === true ? child : esc(child);
                }
              }
            }
          s += name ? "</" + name + ">" : "";
        }
        sanitized[s] = true;
        return s;
      }
      return h2;
    });
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => SRPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian9 = require("obsidian");
var graph = __toESM(require_lib());

// src/settings.ts
var import_obsidian2 = require("obsidian");

// src/lang/helpers.ts
var import_obsidian = require("obsidian");

// src/lang/locale/af.ts
var af_default = {};

// src/lang/locale/ar.ts
var ar_default = {
  // flashcard-modal.tsx
  DECKS: "\u0627\u0644\u0631\u064F\u0632\u0645\u064E\u0627\u062A",
  DUE_CARDS: "\u0628\u0637\u0627\u0642\u0627\u062A \u0645\u064F\u0633\u062A\u062D\u0642\u0629",
  NEW_CARDS: "\u0628\u0637\u0627\u0642\u0627\u062A \u062C\u062F\u064A\u062F\u0629",
  TOTAL_CARDS: "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A",
  BACK: "\u0631\u062C\u0648\u0639",
  SKIP: "Skip",
  EDIT_CARD: "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0628\u0637\u0627\u0642\u0629",
  RESET_CARD_PROGRESS: "\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u062A\u0642\u062F\u0651\u064F\u0645\u0652 \u0627\u0644\u0628\u0637\u0627\u0642\u0629",
  HARD: "\u0635\u0639\u0628",
  GOOD: "\u062C\u064A\u062F",
  EASY: "\u0633\u0647\u0644",
  SHOW_ANSWER: "\u0623\u0638\u0647\u0650\u0631 \u0627\u0644\u0625\u062C\u0627\u0628\u0629",
  CARD_PROGRESS_RESET: ".\u062A\u0645\u0651\u064E\u062A \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u062A\u0642\u062F\u0651\u064F\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629",
  SAVE: "\u062D\u0641\u0638",
  CANCEL: "\u0625\u0644\u063A\u0627\u0621",
  NO_INPUT: ".\u0644\u0645 \u064A\u062A\u0650\u0645 \u062A\u0642\u062F\u064A\u0645 \u0623\u064A \u0645\u064F\u062F\u062E\u0644\u0627\u062A",
  CURRENT_EASE_HELP_TEXT: ":\u0627\u0644\u0633\u0647\u0648\u0644\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629",
  CURRENT_INTERVAL_HELP_TEXT: ":\u0627\u0644\u0641\u0627\u0635\u0644 \u0627\u0644\u0632\u0645\u0646\u064A \u0627\u0644\u062D\u0627\u0644\u064A",
  CARD_GENERATED_FROM: "${notePath} :\u062A\u0645 \u0625\u0646\u0634\u0627\u0624\u0647\u0627 \u0645\u0646",
  // main.ts
  OPEN_NOTE_FOR_REVIEW: "\u0627\u0641\u062A\u062D \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629",
  REVIEW_CARDS: "\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A",
  REVIEW_EASY_FILE_MENU: "\u0645\u0631\u0627\u062C\u0639\u0629: \u0633\u0647\u0644",
  REVIEW_GOOD_FILE_MENU: "\u0645\u0631\u0627\u062C\u0639\u0629: \u062C\u064A\u062F",
  REVIEW_HARD_FILE_MENU: "\u0645\u0631\u0627\u062C\u0639\u0629: \u0635\u0639\u0628",
  REVIEW_NOTE_EASY_CMD: "\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0643\u0640 \u0633\u0647\u0644\u0629",
  REVIEW_NOTE_GOOD_CMD: "\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0643\u0640 \u062C\u064A\u062F\u0629",
  REVIEW_NOTE_HARD_CMD: "\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0643\u0640 \u0635\u0639\u0628\u0629",
  CRAM_ALL_CARDS: "\u062D\u062F\u062F \u0631\u064F\u0632\u0645\u064E\u0629 \u0644\u0644\u062D\u0634\u0631",
  REVIEW_ALL_CARDS: "\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u0645\u0646 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",
  REVIEW_CARDS_IN_NOTE: "\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A  \u0645\u0646 \u0647\u0630\u0647 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",
  CRAM_CARDS_IN_NOTE: "\u0623\u062D\u0634\u0631 \u062C\u0645\u064A\u0639 \u0628\u0637\u0627\u0642\u0627\u062A \u0647\u0630\u0647 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",
  VIEW_STATS: "\u0639\u0631\u0636 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A",
  STATUS_BAR: "\u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062D\u0642\u0629 ${dueFlashcardsCount},\u0645\u0644\u0627\u062D\u0638\u0627\u062A ${dueNotesCount}:\u0645\u0631\u0627\u062C\u0639\u0629",
  SYNC_TIME_TAKEN: "${t}ms \u0627\u0633\u062A\u063A\u0631\u0627\u0642 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629",
  NOTE_IN_IGNORED_FOLDER: ".\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u064A\u062A\u0645 \u062D\u0641\u0638\u0647\u0627 \u0636\u0645\u0646 \u0627\u0644\u0645\u062C\u0644\u062F \u0627\u0644\u0630\u064A \u062A\u0645 \u062A\u062C\u0627\u0647\u0644\u0647 (\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A)",
  PLEASE_TAG_NOTE: ".\u064A\u0631\u062C\u0649 \u0648\u0636\u0639 \u0648\u0633\u0645 \u0639\u0644\u0649 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u0634\u0643\u0644 \u0645\u0646\u0627\u0633\u0628 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629 (\u0641\u064A \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A)",
  RESPONSE_RECEIVED: ".\u0627\u0633\u062A\u064F\u0644\u0645\u062A \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629",
  NO_DECK_EXISTS: "${deckName} \u0644\u0627 \u064A\u0648\u062C\u062F \u0631\u064F\u0632\u0645\u064E\u0629",
  ALL_CAUGHT_UP: "\u{1F606} \u0644\u0642\u062F \u062A\u0645 \u0627\u0644\u0642\u0628\u0636 \u0639\u0644\u064A\u0643\u0645 \u062C\u0645\u064A\u0639\u0627 \u0627\u0644\u0622\u0646",
  // scheduling.ts
  DAYS_STR_IVL: "\u064A\u0648\u0645/\u0623\u064A\u0627\u0645 ${interval}",
  MONTHS_STR_IVL: "\u0634\u0647\u0631/\u0623\u0634\u0647\u0631 ${interval}",
  YEARS_STR_IVL: "\u0633\u0646\u0629/\u0633\u0646\u0648\u0627\u062A ${interval}",
  DAYS_STR_IVL_MOBILE: "\u064A${interval}",
  MONTHS_STR_IVL_MOBILE: "\u0634${interval}",
  YEARS_STR_IVL_MOBILE: "\u0633${interval}",
  // settings.ts
  SETTINGS_HEADER: "Spaced Repetition Plugin - Settings",
  CHECK_WIKI: '.<a href="${wiki_url}">wiki</a> \u0644\u0645\u0632\u064A\u062F \u0645\u0646 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u060C \u062A\u062D\u0642\u0642 \u0645\u0646',
  FOLDERS_TO_IGNORE: "\u0645\u062C\u0644\u062F\u0627\u062A \u0644\u062A\u062C\u0627\u0647\u0644\u0647\u0627",
  FOLDERS_TO_IGNORE_DESC: "Templates Meta/Scripts : \u0623\u062F\u062E\u0644 \u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u062C\u0644\u062F \u0645\u0641\u0635\u0648\u0644\u0629 \u0628\u0648\u0627\u0633\u0637\u0629 \u0633\u0637\u0648\u0631 \u062C\u062F\u064A\u062F\u0629,\u0645\u062B\u0627\u0644",
  FLASHCARDS: "\u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A",
  FLASHCARD_EASY_LABEL: "\u0646\u0635 \u0627\u0644\u0632\u0631 \u0633\u0647\u0644",
  FLASHCARD_GOOD_LABEL: "\u0646\u0635 \u0627\u0644\u0632\u0631 \u062C\u064A\u062F",
  FLASHCARD_HARD_LABEL: "\u0646\u0635 \u0627\u0644\u0632\u0631 \u0635\u0639\u0628",
  FLASHCARD_EASY_DESC: '"\u062A\u062E\u0635\u064A\u0635 \u0627\u0644\u062A\u0633\u0645\u064A\u0629 \u0644\u0644\u0632\u0631 "\u0633\u0647\u0644',
  FLASHCARD_GOOD_DESC: '"\u062A\u062E\u0635\u064A\u0635 \u0627\u0644\u062A\u0633\u0645\u064A\u0629 \u0644\u0644\u0632\u0631 "\u062C\u064A\u062F',
  FLASHCARD_HARD_DESC: '"\u062A\u062E\u0635\u064A\u0635 \u0627\u0644\u062A\u0633\u0645\u064A\u0629 \u0644\u0644\u0632\u0631 "\u0635\u0639\u0628',
  FLASHCARD_TAGS: "\u0648\u064F\u0633\u0648\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A",
  FLASHCARD_TAGS_DESC: "#2\u0623\u062F\u062E\u0644 \u0627\u0644\u0648\u064F\u0633\u0648\u0645 \u0645\u0641\u0635\u0648\u0644\u0629 \u0628\u0645\u0633\u0627\u0641\u0627\u062A \u0623\u0648 \u0623\u0633\u0637\u0631 \u062C\u062F\u064A\u062F\u0629 \u060C \u0623\u064A \u0628\u0637\u0627\u0642\u0627\u062A# \u0631\u0632\u0645\u06293# \u0631\u0632\u0645\u0629",
  CONVERT_FOLDERS_TO_DECKS: "\u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0645\u062C\u0644\u062F\u0627\u062A \u0625\u0644\u0649 \u0645\u0644\u0641\u0627\u062A \u0623\u0635\u0644\u064A\u0629 \u0648 \u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0641\u0631\u0639\u064A\u0629\u061F",
  CONVERT_FOLDERS_TO_DECKS_DESC: ".\u0647\u0630\u0627 \u0647\u0648 \u0628\u062F\u064A\u0644 \u0644\u062E\u064A\u0627\u0631 \u0648\u0633\u0648\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0623\u0639\u0644\u0627\u0647",
  INLINE_SCHEDULING_COMMENTS: "\u062D\u0641\u0638 \u062A\u0639\u0644\u064A\u0642 \u0627\u0644\u062C\u062F\u0648\u0644\u0629 \u0639\u0644\u0649 \u0646\u0641\u0633 \u0627\u0644\u0633\u0637\u0631 \u0645\u062B\u0644 \u0627\u0644\u0633\u0637\u0631 \u0627\u0644\u0623\u062E\u064A\u0631 \u0644\u0644\u0628\u0637\u0627\u0642\u0629 \u061F",
  INLINE_SCHEDULING_COMMENTS_DESC: "\u0644\u0627 \u062A\u0643\u0633\u0631 \u062A\u0646\u0633\u064A\u0642 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 HTML \u0633\u064A\u0624\u062F\u064A \u062A\u0634\u063A\u064A\u0644 \u0647\u0630\u0627 \u0625\u0644\u0649 \u062C\u0639\u0644 \u062A\u0639\u0644\u064A\u0642\u0627\u062A",
  BURY_SIBLINGS_TILL_NEXT_DAY: "\u0623\u062E\u0641\u064A \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0634\u0642\u064A\u0642\u0629 \u062D\u062A\u0649 \u0627\u0644\u064A\u0648\u0645 \u0627\u0644\u062A\u0627\u0644\u064A",
  BURY_SIBLINGS_TILL_NEXT_DAY_DESC: "cloze deletions : \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0634\u0642\u064A\u0642\u0629 \u0647\u064A \u0628\u0637\u0627\u0642\u0627\u062A \u062A\u0645 \u0625\u0646\u0634\u0627\u0624\u0647\u0627 \u0645\u0646 \u0646\u0641\u0633 \u0646\u0635 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0643\u0640",
  SHOW_CARD_CONTEXT: "\u0625\u0638\u0647\u0627\u0631 \u0627\u0644\u0633\u064A\u0627\u0642 \u0641\u064A \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A\u061F",
  SHOW_CARD_CONTEXT_DESC: "i.e. Title > Heading 1 > Subheading > ... > Subheading",
  CARD_MODAL_HEIGHT_PERCENT: "\u0646\u0633\u0628\u0629 \u0627\u0631\u062A\u0641\u0627\u0639 \u0627\u0644\u0628\u0637\u0627\u0642\u0629",
  CARD_MODAL_SIZE_PERCENT_DESC: "\u064A\u062C\u0628 \u0636\u0628\u0637\u0647\u0627 \u0639\u0644\u0649 100 \u066A \u0639\u0644\u0649 \u0627\u0644\u0647\u0627\u062A\u0641 \u0627\u0644\u0645\u062D\u0645\u0648\u0644 \u0623\u0648 \u0625\u0630\u0627 \u0643\u0627\u0646 \u0644\u062F\u064A\u0643 \u0635\u0648\u0631 \u0643\u0628\u064A\u0631\u0629 \u062C\u062F\u064B\u0627",
  RESET_DEFAULT: "\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0625\u0644\u0649 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A",
  CARD_MODAL_WIDTH_PERCENT: "\u0646\u0633\u0628\u0629 \u0639\u0631\u0636 \u0627\u0644\u0628\u0637\u0627\u0642\u0629",
  RANDOMIZE_CARD_ORDER: "\u062A\u0631\u062A\u064A\u0628 \u0628\u0637\u0627\u0642\u0629 \u0639\u0634\u0648\u0627\u0626\u064A \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629\u061F",
  DISABLE_CLOZE_CARDS: "\u061Fcloze \u062A\u0639\u0637\u064A\u0644 \u0628\u0637\u0627\u0642\u0627\u062A",
  CONVERT_HIGHLIGHTS_TO_CLOZES: "Convert ==hightlights== to clozes?",
  CONVERT_BOLD_TEXT_TO_CLOZES: "Convert **bolded text** to clozes?",
  CONVERT_CURLY_BRACKETS_TO_CLOZES: "Convert {{curly brackets}} to clozes?",
  INLINE_CARDS_SEPARATOR: "\u0641\u0627\u0635\u0644 \u0645\u0646 \u0623\u062C\u0644 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0645\u0636\u0645\u0646\u0629",
  FIX_SEPARATORS_MANUALLY_WARNING: "\u0636\u0639 \u0641\u064A \u062D\u0633\u0627\u0628\u0643 \u0623\u0646\u0647 \u0628\u0639\u062F \u062A\u063A\u064A\u064A\u0631 \u0647\u0630\u0627 \u060C \u064A\u062C\u0628 \u0639\u0644\u064A\u0643 \u062A\u0639\u062F\u064A\u0644 \u0623\u064A \u0628\u0637\u0627\u0642\u0627\u062A \u0644\u062F\u064A\u0643 \u0628\u0627\u0644\u0641\u0639\u0644 \u064A\u062F\u0648\u064A\u064B\u0627",
  INLINE_REVERSED_CARDS_SEPARATOR: "\u0641\u0627\u0635\u0644 \u0645\u0646 \u0623\u062C\u0644 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0639\u0643\u0633\u064A\u0629 \u0627\u0644\u0645\u0636\u0645\u0646\u0629",
  MULTILINE_CARDS_SEPARATOR: "\u0641\u0627\u0635\u0644 \u0645\u0646 \u0623\u062C\u0644 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0645\u062A\u0639\u062F\u062F\u0629",
  MULTILINE_REVERSED_CARDS_SEPARATOR: "\u0641\u0627\u0635\u0644 \u0645\u0646 \u0623\u062C\u0644 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0639\u0643\u0633\u064A\u0629 \u0627\u0644\u0645\u062A\u0639\u062F\u062F\u0629",
  NOTES: "\u0645\u0644\u0627\u062D\u0638\u0627\u062A",
  REVIEW_PANE_ON_STARTUP: "\u062A\u0645\u0643\u064A\u0646 \u062C\u0632\u0621 \u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0639\u0646\u062F \u0628\u062F\u0621 \u0627\u0644\u062A\u0634\u063A\u064A\u0644",
  TAGS_TO_REVIEW: "\u0648\u0633\u0648\u0645 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629",
  TAGS_TO_REVIEW_DESC: "#\u0623\u062F\u062E\u0644 \u0627\u0644\u0648\u0633\u0648\u0645 \u0645\u0641\u0635\u0648\u0644\u0629 \u0628\u0645\u0633\u0627\u0641\u0627\u062A \u0623\u0648 \u062E\u0637\u0648\u0637 \u062C\u062F\u064A\u062F\u0629 \u060C \u0623\u064A : \u0645\u0631\u0627\u062C\u0639\u0629# \u0648\u0633\u06452# \u0648\u0633\u06453",
  OPEN_RANDOM_NOTE: "\u0627\u0641\u062A\u062D \u0645\u0644\u0627\u062D\u0638\u0629 \u0639\u0634\u0648\u0627\u0626\u064A\u0629 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629",
  OPEN_RANDOM_NOTE_DESC: "(Pagerank) \u0639\u0646\u062F \u062A\u0639\u0637\u064A\u0644 \u0647\u0630\u0627 \u0627\u0644\u062E\u064A\u0627\u0631 \u060C\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0633\u064A\u062A\u0645 \u062A\u0631\u062A\u064A\u0628\u064F\u0647\u0627 \u062D\u0633\u0628 \u0627\u0644\u0623\u0647\u0645\u064A\u0629",
  AUTO_NEXT_NOTE: "\u0627\u0641\u062A\u062D \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u064B\u0627 \u0628\u0639\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629",
  DISABLE_FILE_MENU_REVIEW_OPTIONS: "\u062A\u0639\u0637\u064A\u0644 \u062E\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0641\u064A \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u060C \u0623\u064A \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629:\u0627\u0644\u0633\u0647\u0644 \u0627\u0644\u0635\u0639\u0628 \u0627\u0644\u062C\u064A\u062F",
  DISABLE_FILE_MENU_REVIEW_OPTIONS_DESC: "\u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0647\u0630\u0627 \u0627\u0644\u062E\u064A\u0627\u0631 Obsidian \u0623\u0639\u062F \u062A\u0634\u063A\u064A\u0644 , command hotkeys. \u0628\u0639\u062F \u0627\u0644\u062A\u0639\u0637\u064A\u0644 \u060C \u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645",
  MAX_N_DAYS_REVIEW_QUEUE: "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u062A\u064A \u064A\u062C\u0628 \u0639\u0631\u0636\u0647\u0627 \u0639\u0644\u0649 \u0627\u0644\u0644\u0648\u062D\u0629 \u0627\u0644\u064A\u0645\u0646\u0649",
  MIN_ONE_DAY: "\u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645 1 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644",
  VALID_NUMBER_WARNING: "\u064A\u0631\u062C\u0649 \u062A\u0642\u062F\u064A\u0645 \u0631\u0642\u0645 \u0635\u0627\u0644\u062D",
  UI_PREFERENCES: "\u062A\u0641\u0636\u064A\u0644\u0627\u062A \u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE: "\u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u0634\u062C\u0631\u064A \u0644\u0644\u0631\u064F\u0632\u0645 \u0645\u0648\u0633\u0639 \u0628\u062D\u064A\u062B \u062A\u0637\u0647\u0631 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0641\u0631\u0639\u064A\u0629 \u0643\u0644\u0647\u0627",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE_DESC: " \u0639\u0637\u0644 \u0647\u0630\u0627 \u0627\u0644\u062E\u064A\u0627\u0631 \u0644\u0637\u064A \u0627\u0644\u0631\u064F\u0632\u0645 \u0627\u0644\u0645\u062A\u062F\u0627\u062E\u0644\u0629 \u0641\u064A \u0646\u0641\u0633 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 , \u0645\u0641\u064A\u062F \u0625\u0630\u0627 \u0643\u0627\u0646 \u0644\u062F\u064A\u0643 \u0628\u0637\u0627\u0642\u0627\u062A \u062A\u0646\u062A\u0645\u064A \u0625\u0644\u0649 \u0627\u0644\u0639\u062F\u064A\u062F \u0645\u0646 \u0627\u0644\u0631\u064F\u0632\u0645 \u0641\u064A \u0646\u0641\u0633 \u0627\u0644\u0645\u0644\u0641",
  ALGORITHM: "\u062E\u0648\u0627\u0631\u0632\u0645\u064A\u0629",
  CHECK_ALGORITHM_WIKI: '<a href="${algo_url}">algorithm implementation</a> :\u0644\u0645\u0632\u064A\u062F \u0645\u0646 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u062A\u062D\u0642\u0642 \u0645\u0646',
  BASE_EASE: "\u0633\u0647\u0648\u0644\u0629 \u0627\u0644\u0642\u0627\u0639\u062F\u0629",
  BASE_EASE_DESC: "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649 = 130 \u060C \u0648\u064A\u0641\u0636\u0644 \u062D\u0648\u0627\u0644\u064A 250.",
  BASE_EASE_MIN_WARNING: "\u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0633\u0647\u0648\u0644\u0629 \u0627\u0644\u0642\u0627\u0639\u062F\u0629 130 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644.",
  LAPSE_INTERVAL_CHANGE: "\u0627\u0644\u0641\u0627\u0635\u0644 \u0627\u0644\u0632\u0645\u0646\u064A \u064A\u062A\u063A\u064A\u0631 \u0639\u0646\u062F \u0645\u0631\u0627\u062C\u0639\u0629 \u0628\u0637\u0627\u0642\u0629/\u0645\u0644\u0627\u062D\u0638\u0629 \u0635\u0639\u0628\u0629",
  LAPSE_INTERVAL_CHANGE_DESC: "newInterval = oldInterval * intervalChange / 100.",
  EASY_BONUS: "\u0645\u0643\u0627\u0641\u0623\u0629 \u0633\u0647\u0644\u0629",
  EASY_BONUS_DESC: "\u062A\u062A\u064A\u062D \u0644\u0643 \u0627\u0644\u0645\u0643\u0627\u0641\u0623\u0629 \u0627\u0644\u0633\u0647\u0644\u0629 \u0636\u0628\u0637 \u0627\u0644\u0641\u0631\u0642 \u0641\u064A \u0627\u0644\u0641\u0648\u0627\u0635\u0644 \u0627\u0644\u0632\u0645\u0646\u064A\u0629 \u0628\u064A\u0646 \u0627\u0644\u0631\u062F \u0627\u0644\u062C\u064A\u062F \u0648\u0627\u0644\u0633\u0647\u0644 \u0639\u0644\u0649 \u0628\u0637\u0627\u0642\u0629/\u0645\u0644\u0627\u062D\u0638\u0629 (\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649 = 100 \u066A).",
  EASY_BONUS_MIN_WARNING: "\u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0627\u0644\u0645\u0643\u0627\u0641\u0623\u0629 \u0627\u0644\u0633\u0647\u0644\u0629 100 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644.",
  MAX_INTERVAL: "Maximum interval in days",
  MAX_INTERVAL_DESC: "\u064A\u062A\u064A\u062D \u0644\u0643 \u0648\u0636\u0639 \u062D\u062F \u0623\u0639\u0644\u0649  \u0644\u0644\u0641\u0627\u0635\u0644 \u0627\u0644\u0632\u0645\u0646\u064A (\u0627\u0641\u062A\u0631\u0627\u0636\u064A = 100 \u0639\u0627\u0645).",
  MAX_INTERVAL_MIN_WARNING: "\u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u0641\u0627\u0635\u0644 \u0627\u0644\u0632\u0645\u0646\u064A \u0644\u0645\u062F\u0629 \u064A\u0648\u0645 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644.",
  MAX_LINK_CONTRIB: "\u0623\u0642\u0635\u0649 \u0645\u0633\u0627\u0647\u0645\u0629 \u0627\u0631\u062A\u0628\u0627\u0637",
  MAX_LINK_CONTRIB_DESC: "\u0623\u0642\u0635\u0649 \u0645\u0633\u0627\u0647\u0645\u0629 \u0644\u0644\u0633\u0647\u0648\u0644\u0629 \u0627\u0644\u0645\u0631\u062C\u062D\u0629 \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0627\u0644\u0633\u0647\u0648\u0644\u0629 \u0627\u0644\u0623\u0648\u0644\u064A\u0629.",
  LOGGING: "\u062A\u0633\u062C\u064A\u0644",
  DISPLAY_DEBUG_INFO: "\u0639\u0631\u0636 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D \u0639\u0644\u0649 \u0648\u062D\u062F\u0629 \u062A\u062D\u0643\u0645 \u0627\u0644\u0645\u0637\u0648\u0631\u061F",
  // sidebar.ts
  NOTES_REVIEW_QUEUE: "\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629",
  CLOSE: "\u0623\u063A\u0644\u0642",
  NEW: "\u062C\u062F\u064A\u062F",
  YESTERDAY: "\u0627\u0644\u0628\u0627\u0631\u062D\u0629",
  TODAY: "\u0627\u0644\u064A\u0648\u0645",
  TOMORROW: "\u0627\u0644\u063A\u062F",
  // stats-modal.tsx
  STATS_TITLE: "\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A",
  MONTH: "\u0634\u0647\u0631",
  QUARTER: "\u0631\u0628\u0639 \u0627\u0644\u0633\u0646\u0629",
  YEAR: "\u0633\u0646\u0629",
  LIFETIME: "",
  FORECAST: "",
  FORECAST_DESC: "\u0639\u062F\u062F \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062D\u0642\u0629 \u0641\u064A \u0627\u0644\u0645\u0633\u062A\u0642\u0628\u0644",
  SCHEDULED: "\u0627\u0644\u0645\u0642\u0631\u0631",
  DAYS: "\u0623\u064A\u0627\u0645",
  NUMBER_OF_CARDS: "\u0639\u062F\u062F \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A",
  REVIEWS_PER_DAY: "\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0627\u062A/\u0627\u0644\u064A\u0648\u0645 ${avg} :\u0645\u062A\u0648\u0633\u0637",
  INTERVALS: "\u0641\u0648\u0627\u0635\u0644 \u0632\u0645\u0646\u064A\u0629",
  INTERVALS_DESC: "\u0627\u0644\u062A\u0623\u062E\u064A\u0631 \u062D\u062A\u0649 \u064A\u062A\u0645 \u0639\u0631\u0636 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0627\u062A \u0645\u0631\u0629 \u0623\u062E\u0631\u0649",
  COUNT: "\u0639\u062F\u062F",
  INTERVALS_SUMMARY: "${longest} : \u0623\u0637\u0648\u0644 \u0641\u0627\u0635\u0644 \u0632\u0645\u0646\u064A ,${avg} :\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0641\u0627\u0635\u0644 \u0627\u0644\u0632\u0645\u0646\u064A",
  EASES: "\u0627\u0644\u0633\u0647\u0648\u0644\u0629",
  EASES_SUMMARY: "${avgEase} :\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0633\u0647\u0648\u0644\u0629",
  CARD_TYPES: "\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A",
  CARD_TYPES_DESC: "\u0648\u0647\u0630\u0627 \u064A\u0634\u0645\u0644 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0645\u062E\u0641\u064A\u0629 \u0643\u0630\u0644\u0643 \u060C \u0625\u0646 \u0648\u062C\u062F\u062A",
  CARD_TYPE_NEW: "\u062C\u062F\u064A\u062F\u0629",
  CARD_TYPE_YOUNG: "\u0635\u063A\u064A\u0631\u0629",
  CARD_TYPE_MATURE: "\u0646\u0627\u0636\u062C\u0629",
  CARD_TYPES_SUMMARY: " ${totalCardsCount} :\u0625\u062C\u0645\u0627\u0644\u064A \u0639\u062F\u062F \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A"
};

// src/lang/locale/cz.ts
var cz_default = {
  // flashcard-modal.tsx
  DECKS: "Bal\xED\u010Dky",
  DUE_CARDS: "Karti\u010Dky po term\xEDnu",
  NEW_CARDS: "Nov\xE9 karti\u010Dky",
  TOTAL_CARDS: "Karti\u010Dek celkem",
  BACK: "Back",
  SKIP: "Skip",
  EDIT_CARD: "Edit Card",
  RESET_CARD_PROGRESS: "Vynulovat pokrok karti\u010Dky",
  HARD: "Te\u017Ek\xE9",
  GOOD: "Dobr\xE9",
  EASY: "Jednoduch\xE9",
  SHOW_ANSWER: "Uk\xE1zat odpov\u011B\u010F",
  CARD_PROGRESS_RESET: "Pokrok karti\u010Dky byl vynulov\xE1n.",
  SAVE: "Save",
  CANCEL: "Cancel",
  NO_INPUT: "No input provided.",
  CURRENT_EASE_HELP_TEXT: "Current Ease: ",
  CURRENT_INTERVAL_HELP_TEXT: "Current Interval: ",
  CARD_GENERATED_FROM: "Generated from: ${notePath}",
  // main.ts
  OPEN_NOTE_FOR_REVIEW: "Otev\u0159\xEDt pozn\xE1mku k revizi",
  REVIEW_CARDS: "Pozn\xE1mek k revizi",
  REVIEW_EASY_FILE_MENU: "Revize: Jednoduch\xE9",
  REVIEW_GOOD_FILE_MENU: "Revize: Dobr\xE9",
  REVIEW_HARD_FILE_MENU: "Revize: T\u011B\u017Ek\xE9",
  REVIEW_NOTE_EASY_CMD: "Ozna\u010Dit pozn\xE1mku jako jednoduchou",
  REVIEW_NOTE_GOOD_CMD: "Ozna\u010Dit pozn\xE1mku jako dobrou",
  REVIEW_NOTE_HARD_CMD: "Ozna\u010Dit pozn\xE1mku jako te\u017Ekou",
  REVIEW_ALL_CARDS: "Revidovat karti\u010Dky ve v\u0161ech pozn\xE1mk\xE1ch",
  CRAM_ALL_CARDS: "Select a deck to cram",
  REVIEW_CARDS_IN_NOTE: "Revidovat karti\u010Dky v t\xE9to pozn\xE1mce.",
  CRAM_CARDS_IN_NOTE: "Cram karti\u010Dky v t\xE9to pozn\xE1mce.",
  VIEW_STATS: "Uk\xE1zat statistiky",
  STATUS_BAR: "Revize: ${dueNotesCount} pozn\xE1mek, ${dueFlashcardsCount} karti\u010Dek po term\xEDnu",
  SYNC_TIME_TAKEN: "Synchronizace trvala ${t}ms",
  NOTE_IN_IGNORED_FOLDER: "Pozn\xE1mka je ulo\u017Eena v ignorovan\xE9 slo\u017Ece (zkontrolujte nastaven\xED).",
  PLEASE_TAG_NOTE: "Pros\xEDm ozna\u010Dne pozn\xE1mku odpov\xEDdaj\xEDc\xEDm tagem pro revizi (v nastaven\xED).",
  RESPONSE_RECEIVED: "Odpov\u011B\u010F p\u0159ijata.",
  NO_DECK_EXISTS: "Neexistuje \u017E\xE1dn\xFD bal\xED\u010Dek pro ${deckName}",
  ALL_CAUGHT_UP: "V\u0161e zrevidov\xE1no",
  // scheduling.ts
  DAYS_STR_IVL: "${interval} den/dn\xED",
  MONTHS_STR_IVL: "${interval} m\u011Bs\xEDc(\u016F)",
  YEARS_STR_IVL: "${interval} rok(\u016F)",
  DAYS_STR_IVL_MOBILE: "${interval}d",
  MONTHS_STR_IVL_MOBILE: "${interval}m",
  YEARS_STR_IVL_MOBILE: "${interval}r",
  // settings.ts
  SETTINGS_HEADER: "Spaced Repetition Plugin - Nastaven\xED",
  CHECK_WIKI: 'Pro v\xEDce informac\xED jd\u011Bte na <a href="${wiki_url}">wiki</a>.',
  FOLDERS_TO_IGNORE: "Ignorovan\xE9 slo\u017Eky",
  FOLDERS_TO_IGNORE_DESC: "Zadejte cesty ke slo\u017Ek\xE1m odd\u011Blen\xE9 od\u0159\xE1dkov\xE1n\xEDm nap\u0159\xEDkad. \u0160ablony Meta/Scripts",
  FLASHCARDS: "Karti\u010Dky",
  FLASHCARD_EASY_LABEL: "Easy Button Text",
  FLASHCARD_GOOD_LABEL: "Good Button Text",
  FLASHCARD_HARD_LABEL: "Hard Button Text",
  FLASHCARD_EASY_DESC: 'Customize the label for the "Easy" Button',
  FLASHCARD_GOOD_DESC: 'Customize the label for the "Good" Button',
  FLASHCARD_HARD_DESC: 'Customize the label for the "Hard" Button',
  FLASHCARD_TAGS: "Tag pro karti\u010Dky",
  FLASHCARD_TAGS_DESC: "Zadete tagy ood\u011Blen\xE9 mezerou nebo od\u0159\xE1dkov\xE1n\xEDm nap\u0159\xEDklad. #karti\u010Dky #bal\xED\u010Dke2 #bal\xED\u010Dek3.",
  CONVERT_FOLDERS_TO_DECKS: "P\u0159ev\xE9st slo\u017Eky na bal\xED\u010Dky a podbal\xED\u010Dky?",
  CONVERT_FOLDERS_TO_DECKS_DESC: "Toto je alternativa k tag\u016Fm karti\u010Dek viz nastaven\xED v\xFD\u0161e.",
  INLINE_SCHEDULING_COMMENTS: "Ulo\u017Eit pl\xE1novac\xED koment\xE1\u0159 na stejn\xFD \u0159\xE1dek jako posledn\xED polo\u017Eka karti\u010Dky?",
  INLINE_SCHEDULING_COMMENTS_DESC: "Zapnut\xED t\xE9to volby zp\u016Fsob\xED, \u017Ee HTML koment\xE1\u0159e nebudou rozb\xEDjet form\xE1tov\xE1n\xED list\u016F.",
  BURY_SIBLINGS_TILL_NEXT_DAY: "Odlo\u017Eit p\u0159\xEDbuzn\xE9 karti\u010Dky na dal\u0161\xED den?",
  BURY_SIBLINGS_TILL_NEXT_DAY_DESC: "P\u0159\xEDbuzn\xE9 karti\u010Dky jsou karti\u010Dky generovan\xE9 z textu stejn\xE9 pozn\xE1mky nap\u0159\xEDklad cloze smaz\xE1n\xED",
  SHOW_CARD_CONTEXT: "Uk\xE1zat kontext v karti\u010Dce?",
  SHOW_CARD_CONTEXT_DESC: "nap\u0159\xEDklad Titulek > Nadpis1 > Podnadpis > ... > Podnadpis",
  CARD_MODAL_HEIGHT_PERCENT: "V\xFD\u0161ka karti\u010Dek v procentech",
  CARD_MODAL_SIZE_PERCENT_DESC: "M\u011Blo by b\xFDt nastaveno na 100% na mobilu nebo kdy\u017E pou\u017E\xEDv\xE1te velk\xE9 obr\xE1zky",
  RESET_DEFAULT: "Resetovat v\xFDchoz\xED nastaven\xED",
  CARD_MODAL_WIDTH_PERCENT: "\u0160\xED\u0159ka karti\u010Dek v procentech",
  RANDOMIZE_CARD_ORDER: "N\xE1hodn\u011B zm\u011Bnit po\u0159ad\xED karti\u010Dek b\u011Bhem revize?",
  DISABLE_CLOZE_CARDS: "Vypnout cloze karti\u010Dky?",
  CONVERT_HIGHLIGHTS_TO_CLOZES: "P\u0159ev\xE9st ==zv\xFDrazn\u011Bn\xED== na clozes?",
  CONVERT_BOLD_TEXT_TO_CLOZES: "P\u0159ev\xE9st **tu\u010Dn\xFD text** na clozes?",
  CONVERT_CURLY_BRACKETS_TO_CLOZES: "P\u0159ev\xE9st {{slo\u017Een\xE9 z\xE1vorky}} na clozes?",
  INLINE_CARDS_SEPARATOR: "Odd\u011Blova\u010D pro inline karti\u010Dky",
  FIX_SEPARATORS_MANUALLY_WARNING: "Pozor. Jakmile toto zm\u011Bn\xEDte, budete muset ru\u010Dn\u011B upravit v\u0161echny existuj\xEDc\xED karti\u010Dky.",
  INLINE_REVERSED_CARDS_SEPARATOR: "Odd\u011Blova\u010D pro oto\u010Den\xE9 inline karti\u010Dky",
  MULTILINE_CARDS_SEPARATOR: "Odd\u011Blova\u010D pro v\xEDce\u0159\xE1dkov\xE9 karti\u010Dky",
  MULTILINE_REVERSED_CARDS_SEPARATOR: "Odd\u011Blova\u010D pro v\xEDce\u0159\xE1dkove oto\u010Den\xE9 karti\u010Dky",
  NOTES: "Pozn\xE1mky",
  REVIEW_PANE_ON_STARTUP: "Enable note review pane on startup",
  TAGS_TO_REVIEW: "Tag pro revizi",
  TAGS_TO_REVIEW_DESC: "Zadejte tagy odd\u011Blen\xE9 mezerami nebo od\u0159\xE1dkov\xE1n\xEDm nap\u0159\xEDklad #review #tag2 #tag3.",
  OPEN_RANDOM_NOTE: "Otev\u0159\xEDt n\xE1hodnou pozn\xE1mku pro revizi",
  OPEN_RANDOM_NOTE_DESC: "Pokud toto vypnete, pozn\xE1mky budou \u0159azeny dle d\u016Fle\u017Eitosti (PageRank).",
  AUTO_NEXT_NOTE: "Otev\u0159\xEDt automaticky dal\u0161\xED pozn\xE1mku po dokon\u010Den\xED revize",
  DISABLE_FILE_MENU_REVIEW_OPTIONS: "Vypnout volby revize v menu souboru nap\u0159\xEDklad 'Revize: Jednoduch\xE9'",
  DISABLE_FILE_MENU_REVIEW_OPTIONS_DESC: "Po vypnut\xED m\u016F\u017Eete pou\u017E\xEDvat kl\xE1vesov\xE9 zkratky. Restartujte Obsidian po zm\u011Bn\u011B nastaven\xED.",
  MAX_N_DAYS_REVIEW_QUEUE: "Maxim\xE1ln\xED po\u010Det dn\xED zobrazen\xFDch v prav\xE9m panelu",
  MIN_ONE_DAY: "Po\u010Det dn\xED mus\xED b\xFDt minim\xE1ln\u011B 1.",
  VALID_NUMBER_WARNING: "Pros\xEDm zadejte validn\xED \u010D\xEDslo.",
  UI_PREFERENCES: "P\u0159edvolby u\u017Eivatelsk\xE9ho rozhran\xED",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE: "Stromy bal\xED\u010Dky by m\u011Bly b\xFDt zpo\u010D\xE1tku zobrazeny jako rozbalen\xE9",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE_DESC: "Vypn\u011Bte toto, chcete-li sbalit vno\u0159en\xE9 bal\xED\u010Dky na stejn\xE9 kart\u011B. To je u\u017Eite\u010Dn\xE9, pokud m\xE1te karti\u010Dky, kter\xE9 pat\u0159\xED k mnoha bal\xED\u010Dk\u016Fm ve stejn\xE9m souboru.",
  ALGORITHM: "Algoritmus",
  CHECK_ALGORITHM_WIKI: 'Pro v\xEDce informac\xED jd\u011Bte na <a href="${algo_url}">popis algoritmu</a>.',
  BASE_EASE: "Z\xE1kladn\xED slo\u017Eitost",
  BASE_EASE_DESC: "minimum = 130, nejl\xE9pe p\u0159ibli\u017En\u011B 250.",
  BASE_EASE_MIN_WARNING: "Z\xE1kladn\xED slo\u017Eitost mus\xED b\xFDt minim\xE1ln\u011B 130.",
  LAPSE_INTERVAL_CHANGE: "Zm\u011Bna intervalu pokud karti\u010Dku/pozn\xE1mku ozna\u010D\xEDte jako slo\u017Eitou",
  LAPSE_INTERVAL_CHANGE_DESC: "nov\xFD_inteval = star\xFD_interval * zm\u011Bna_intevalu / 100.",
  EASY_BONUS: "Bonus pro jednoduch\xE9",
  EASY_BONUS_DESC: "Tento bonus umo\u017E\u0148uje nastavit rozd\xEDl intervalu mezi jednoduch\xFDmi a dobr\xFDmi karti\u010Dkami/pozn\xE1mkami (minimum = 100%).",
  EASY_BONUS_MIN_WARNING: "Bonus pro jednoduchost mus\xED b\xFDt minim\xE1ln\u011B 100.",
  MAX_INTERVAL: "Maximum interval in days",
  MAX_INTERVAL_DESC: "Umo\u017E\u0148uje nastavit horn\xED limit pro interval (defaultn\u011B = 100 let).",
  MAX_INTERVAL_MIN_WARNING: "Maxim\xE1ln\xED interval mus\xED b\xFDt alespo\u0148 1 den.",
  MAX_LINK_CONTRIB: "Maxim\xE1ln\xED p\u0159\xEDsp\u011Bv\u011Bk prolinkov\xE1n\xED",
  MAX_LINK_CONTRIB_DESC: "Maxim\xE1ln\xED p\u0159\xEDsp\u011Bvek v\xE1\u017Een\xE9 slo\u017Eitosti prolinkovan\xFDch pozn\xE1mek pou\u017Eit\xFD pro ur\u010Den\xED po\u010D\xE1te\u010Dn\xED slo\u017Eitosti.",
  LOGGING: "Zaznamen\xE1v\xE1m",
  DISPLAY_DEBUG_INFO: "Zobrazit informace pro lad\u011Bn\xED na v\xFDvoj\xE1\u0159sk\xE9 konzoli?",
  // sidebar.ts
  NOTES_REVIEW_QUEUE: "Fronta pozn\xE1mek k revizi",
  CLOSE: "Uzav\u0159en\xE9",
  NEW: "Nov\xE9",
  YESTERDAY: "V\u010Dera",
  TODAY: "Dnes",
  TOMORROW: "Z\xEDtra",
  // stats-modal.tsx
  STATS_TITLE: "Statistiky",
  MONTH: "M\u011Bs\xEDc",
  QUARTER: "\u010Ctvrtlet\xED",
  YEAR: "Rok",
  LIFETIME: "Celkov\u011B",
  FORECAST: "P\u0159edpov\u011B\u010F",
  FORECAST_DESC: "Celkov\xFD po\u010Det karti\u010Dek, kter\xFDm vypr\u0161\xED term\xEDn",
  SCHEDULED: "Napl\xE1nov\xE1no",
  DAYS: "Dn\xED",
  NUMBER_OF_CARDS: "Po\u010Det karti\u010Dek",
  REVIEWS_PER_DAY: "Pr\u016Fm\u011Br: ${avg} revize/den",
  INTERVALS: "Intervaly",
  INTERVALS_DESC: "Doba, za kterou bude znovu zobrazeno k revize",
  COUNT: "Po\u010Det",
  INTERVALS_SUMMARY: "Pr\u016Fm\u011Brn\xFD interval: ${avg}, Nejdel\u0161\xED interval: ${longest}",
  EASES: "Slo\u017Eitost",
  EASES_SUMMARY: "Pr\u016Fm\u011Brn\xE1 slo\u017Eitost: ${avgEase}",
  CARD_TYPES: "Typy karti\u010Dek",
  CARD_TYPES_DESC: "Obsahuje i odlo\u017Een\xE9 karti\u010Dky (pokud existuj\xED)",
  CARD_TYPE_NEW: "Nov\xE1",
  CARD_TYPE_YOUNG: "Mlad\xE1",
  CARD_TYPE_MATURE: "Dosp\u011Bl\xE1",
  CARD_TYPES_SUMMARY: "Karti\u010Dek celkem: ${totalCardsCount}"
};

// src/lang/locale/bn.ts
var bn_default = {};

// src/lang/locale/da.ts
var da_default = {};

// src/lang/locale/de.ts
var de_default = {
  // flashcard-modal.tsx
  DECKS: "Stapel",
  DUE_CARDS: "Anstehende Karten",
  NEW_CARDS: "Neue Karten",
  TOTAL_CARDS: "Alle Karten",
  BACK: "Back",
  SKIP: "Skip",
  EDIT_CARD: "Edit Card",
  RESET_CARD_PROGRESS: "Kartenfortschritt zur\xFCcksetzten",
  HARD: "Schwer",
  GOOD: "Gut",
  EASY: "Einfach",
  SHOW_ANSWER: "Zeige Antwort",
  CARD_PROGRESS_RESET: "Kartenfortschritt wurde zur\xFCckgesetzt.",
  SAVE: "Save",
  CANCEL: "Cancel",
  NO_INPUT: "No input provided.",
  CURRENT_EASE_HELP_TEXT: "Current Ease: ",
  CURRENT_INTERVAL_HELP_TEXT: "Current Interval: ",
  CARD_GENERATED_FROM: "Generated from: ${notePath}",
  // main.ts
  OPEN_NOTE_FOR_REVIEW: "Notiz zur Wiederholung \xF6ffnen",
  REVIEW_CARDS: "Lernkarten wiederholen",
  REVIEW_EASY_FILE_MENU: "Notiz abschliessen als: Einfach",
  REVIEW_GOOD_FILE_MENU: "Notiz abschliessen als: Gut",
  REVIEW_HARD_FILE_MENU: "Notiz abschliessen als: Schwer",
  REVIEW_NOTE_EASY_CMD: "Notiz abschliessen als: Einfach",
  REVIEW_NOTE_GOOD_CMD: "Notiz abschliessen als: Gut",
  REVIEW_NOTE_HARD_CMD: "Notiz abschliessen als: Schwer",
  REVIEW_ALL_CARDS: "Alle Lernkarten wiederholen",
  CRAM_ALL_CARDS: "Select a deck to cram",
  REVIEW_CARDS_IN_NOTE: "Lernkarten in dieser Notiz wiederholen",
  CRAM_CARDS_IN_NOTE: "Lernkarten in dieser Notiz pauken.",
  VIEW_STATS: "Statistiken anzeigen",
  STATUS_BAR: "Wiederholung: ${dueNotesCount} Notiz(en), ${dueFlashcardsCount} Karte(n) anstehend",
  SYNC_TIME_TAKEN: "Sync dauerte ${t}ms",
  NOTE_IN_IGNORED_FOLDER: "Notiz befindet sich in einem ausgeschlossenen Ordner (siehe Einstellungen).",
  PLEASE_TAG_NOTE: "Bitte die Notiz f\xFCr Wiederholungen entsprechend taggen (siehe Einstellungen).",
  RESPONSE_RECEIVED: "Antwort erhalten.",
  NO_DECK_EXISTS: "Kein Stapel f\xFCr ${deckName} gefunden.",
  ALL_CAUGHT_UP: "Yuhu! Alles geschafft! :D.",
  // scheduling.ts
  DAYS_STR_IVL: "${interval} Tag(e)",
  MONTHS_STR_IVL: "${interval} Monat(e)",
  YEARS_STR_IVL: "${interval} Jahr(e)",
  DAYS_STR_IVL_MOBILE: "${interval}d",
  MONTHS_STR_IVL_MOBILE: "${interval}m",
  YEARS_STR_IVL_MOBILE: "${interval}y",
  // settings.ts
  SETTINGS_HEADER: "Spaced Repetition Plugin - Einstellungen",
  CHECK_WIKI: 'Weitere Informationen gibt es im <a href="${wiki_url}">Wiki</a> (english).',
  FOLDERS_TO_IGNORE: "Ausgeschlossene Ordner",
  FOLDERS_TO_IGNORE_DESC: "Mehrere Ordner mit Zeilenumbr\xFCchen getrennt angeben. Bsp. OrdnerA[Zeilenumbruch]OrdnerB/Unterordner",
  FLASHCARDS: "Lernkarten",
  FLASHCARD_EASY_LABEL: "Easy Button Text",
  FLASHCARD_GOOD_LABEL: "Good Button Text",
  FLASHCARD_HARD_LABEL: "Hard Button Text",
  FLASHCARD_EASY_DESC: 'Customize the label for the "Easy" Button',
  FLASHCARD_GOOD_DESC: 'Customize the label for the "Good" Button',
  FLASHCARD_HARD_DESC: 'Customize the label for the "Hard" Button',
  FLASHCARD_TAGS: "Lernkarten Tags",
  FLASHCARD_TAGS_DESC: "Mehrere Tags mit Leerzeichen oder Zeilenumbr\xFCchen getrennt angeben. Bsp. #karte #stapel2 #stapel3.",
  CONVERT_FOLDERS_TO_DECKS: "Ordner in Stapel und Substapel umwandeln?",
  CONVERT_FOLDERS_TO_DECKS_DESC: 'Eine Alternative zur oberen "Lernkarten Tags" Option.',
  INLINE_SCHEDULING_COMMENTS: "Den Fortschritt in der gleichen Zeile wie die letzte Zeile einer Lernkartei speichern?",
  INLINE_SCHEDULING_COMMENTS_DESC: "Wenn aktiviert, wird der HTML Kommentar die umgebende Liste nicht aufbrechen.",
  BURY_SIBLINGS_TILL_NEXT_DAY: "Verwandte Karten auf den n\xE4chsten Tag verlegen?",
  BURY_SIBLINGS_TILL_NEXT_DAY_DESC: "Verwandte Karten sind aus der gleichen Karte generiert worden (z.B. L\xFCckentextkarten oder beidseitige Karten).",
  SHOW_CARD_CONTEXT: "Kontext in den Karten anzeigen?",
  SHOW_CARD_CONTEXT_DESC: "Bsp. Titel > \xDCberschrift 1 > Sektion > ... > Untersektion",
  CARD_MODAL_HEIGHT_PERCENT: "H\xF6he der Lernkartei in Prozent",
  CARD_MODAL_SIZE_PERCENT_DESC: "Auf kleinen Bildschirmen (z.B. Smartphones) oder bei sehr grossen Bildern sollte dieser Wert auf 100% gesetzt werden.",
  RESET_DEFAULT: "Standardeinstellung wiederherstellen",
  CARD_MODAL_WIDTH_PERCENT: "Breite einer Lernkarte in Prozent",
  RANDOMIZE_CARD_ORDER: "W\xE4hrend der Wiederhoung die Reihenfolge zuf\xE4llig mischen?",
  DISABLE_CLOZE_CARDS: "L\xFCckentextkarten (cloze deletions) deaktivieren?",
  CONVERT_HIGHLIGHTS_TO_CLOZES: "==Hervorgehobenen== Text in L\xFCckentextkarten umwandeln?",
  CONVERT_BOLD_TEXT_TO_CLOZES: "**Fettgedruckten** Text in L\xFCckentextkarten umwandeln?",
  CONVERT_CURLY_BRACKETS_TO_CLOZES: "{{Geschweifte Klammern}} Text in L\xFCckentextkarten umwandeln?",
  INLINE_CARDS_SEPARATOR: "Trennzeichen f\xFCr einzeilige Lernkarten",
  FIX_SEPARATORS_MANUALLY_WARNING: "Wenn diese Einstellung ge\xE4ndert wird, dann m\xFCssen die entsprechenden Lernkarten manuell angepasst werden.",
  INLINE_REVERSED_CARDS_SEPARATOR: "Trennzeichen f\xFCr einzeilige beidseitige Lernkarten",
  MULTILINE_CARDS_SEPARATOR: "Trennzeichen f\xFCr mehrzeilige Lernkarten",
  MULTILINE_REVERSED_CARDS_SEPARATOR: "Trennzeichen f\xFCr mehrzeilige beidseitige Lernkarten",
  NOTES: "Notizen",
  REVIEW_PANE_ON_STARTUP: "Enable note review pane on startup",
  TAGS_TO_REVIEW: "Zu wiederholende Tags",
  TAGS_TO_REVIEW_DESC: "Mehrere Tags k\xF6nnen mit Leerzeichen oder Zeilenumbr\xFCchen getrennt angegeben werden. Bsp. #karte #tag1 #tag2.",
  OPEN_RANDOM_NOTE: "Zuf\xE4llige Karten wiederholen",
  OPEN_RANDOM_NOTE_DESC: "Wenn dies deaktiviert wird, dann werden die Notizen nach Wichtigkeit wiederholt (PageRank).",
  AUTO_NEXT_NOTE: "Nach einer Wiederholung automatisch die n\xE4chste Karte \xF6ffnen",
  DISABLE_FILE_MENU_REVIEW_OPTIONS: "Optionen zur Wiederholung im Men\xFC einer Datei deaktivieren. Bsp. Wiederholen: Einfach Gut Schwer",
  DISABLE_FILE_MENU_REVIEW_OPTIONS_DESC: "Nach dem Deaktivieren k\xF6nnen die Tastenk\xFCrzel zur Wiederholung verwendet werden. Obsidian muss nach einer \xC4nderung neu geladen weren.",
  MAX_N_DAYS_REVIEW_QUEUE: "Maximale Anzahl anstehender Notizen, die im rechten Fensterbereich angezeigt werden",
  MIN_ONE_DAY: "Anzahl der Tage muss mindestens 1 sein.",
  VALID_NUMBER_WARNING: "Bitte eine g\xFCltige Zahl eingeben.",
  UI_PREFERENCES: "Einstellungen der Benutzeroberfl\xE4che",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE: "Deckb\xE4ume sollten anf\xE4nglich erweitert angezeigt werden",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE_DESC: "Deaktivieren Sie dies, um verschachtelte Decks in derselben Karte zu reduzieren. N\xFCtzlich, wenn Sie Karten haben, die zu vielen Decks in derselben Datei geh\xF6ren.",
  ALGORITHM: "Algorithmus",
  CHECK_ALGORITHM_WIKI: 'Weiterf\xFChrende Informationen: <a href="${algo_url}">Implementierung des Algorithmus</a> (english).',
  BASE_EASE: "Basis der Einfachheit",
  BASE_EASE_DESC: "Minimum ist 130. Empfohlen wird ca. 250.",
  BASE_EASE_MIN_WARNING: "Basis der Einfachheit muss mindestens 130 sein.",
  LAPSE_INTERVAL_CHANGE: "Anpassungsfaktor des Intervalls wenn eine Notiz / Karte 'Schwer' abgeschlossen wird",
  LAPSE_INTERVAL_CHANGE_DESC: "neuesIntervall = altesIntervall * anpassungsfaktor / 100.",
  EASY_BONUS: "Einfachheit-Bonus",
  EASY_BONUS_DESC: "Der Einfachheit-Bonus gibt an um welchen Faktor (in Prozent) das Intervall l\xE4nger sein soll, wenn eine Notiz / Karte 'Einfach' statt 'Gut' abgeschlossen wird. Minimum ist 100%.",
  EASY_BONUS_MIN_WARNING: "Der Einfachheit-Bonus muss mindestens 100 sein.",
  MAX_INTERVAL: "Maximum interval in days",
  MAX_INTERVAL_DESC: "Das maximale Intervall (in Tagen) f\xFCr Wiederholungen. Standard sind 100 Jahre.",
  MAX_INTERVAL_MIN_WARNING: "Das maximale Interall muss mindestens ein Tag sein.",
  MAX_LINK_CONTRIB: "Maximaler Einfluss von Links",
  MAX_LINK_CONTRIB_DESC: "Maximaler Einfluss der Einfachheiten verlinkter Notizen zur gewichteten initialen Einfachheit einer neuen Lernkarte.",
  LOGGING: "Logging",
  DISPLAY_DEBUG_INFO: "Informationen zum Debugging in der Entwicklerkonsole anzeigen?",
  // sidebar.ts
  NOTES_REVIEW_QUEUE: "Anstehende Notizen zur Wiederholung",
  CLOSE: "Schliessen",
  NEW: "Neu",
  YESTERDAY: "Gestern",
  TODAY: "Heute",
  TOMORROW: "Morgen",
  // stats-modal.tsx
  STATS_TITLE: "Statistiken",
  MONTH: "Month",
  QUARTER: "Quarter",
  YEAR: "Year",
  LIFETIME: "Lifetime",
  FORECAST: "Prognose",
  FORECAST_DESC: "Anzahl der k\xFCnftig anstehenden Karten",
  SCHEDULED: "Anstehend",
  DAYS: "Tage",
  NUMBER_OF_CARDS: "Anzahl der Karten",
  REVIEWS_PER_DAY: "Durchschnitt: ${avg} Wiederholungen/Tag",
  INTERVALS: "Intervalle",
  INTERVALS_DESC: "Intervalle bis Wiederholungen anstehen",
  COUNT: "Anzahl",
  INTERVALS_SUMMARY: "Durchschnittliches Intervall: ${avg}, L\xE4ngstes Intervall: ${longest}",
  EASES: "Einfachheit",
  EASES_SUMMARY: "Durchschnittliche Einfachheit: ${avgEase}",
  CARD_TYPES: "Kategorisierung",
  CARD_TYPES_DESC: "Verlegte Karten eingeschlossen",
  CARD_TYPE_NEW: "Neu",
  CARD_TYPE_YOUNG: "Jung",
  CARD_TYPE_MATURE: "Ausgereift",
  CARD_TYPES_SUMMARY: "Insgesamt ${totalCardsCount} Karten"
};

// src/lang/locale/en.ts
var en_default = {
  // flashcard-modal.tsx
  DECKS: "Decks",
  DUE_CARDS: "Due Cards",
  NEW_CARDS: "New Cards",
  TOTAL_CARDS: "Total Cards",
  BACK: "Back",
  SKIP: "Skip",
  EDIT_CARD: "Edit Card",
  RESET_CARD_PROGRESS: "Reset card's progress",
  HARD: "Hard",
  GOOD: "Good",
  EASY: "Easy",
  SHOW_ANSWER: "Show Answer",
  CARD_PROGRESS_RESET: "Card's progress has been reset.",
  SAVE: "Save",
  CANCEL: "Cancel",
  NO_INPUT: "No input provided.",
  CURRENT_EASE_HELP_TEXT: "Current Ease: ",
  CURRENT_INTERVAL_HELP_TEXT: "Current Interval: ",
  CARD_GENERATED_FROM: "Generated from: ${notePath}",
  // main.ts
  OPEN_NOTE_FOR_REVIEW: "Open a note for review",
  REVIEW_CARDS: "Review flashcards",
  REVIEW_EASY_FILE_MENU: "Review: Easy",
  REVIEW_GOOD_FILE_MENU: "Review: Good",
  REVIEW_HARD_FILE_MENU: "Review: Hard",
  REVIEW_NOTE_EASY_CMD: "Review note as easy",
  REVIEW_NOTE_GOOD_CMD: "Review note as good",
  REVIEW_NOTE_HARD_CMD: "Review note as hard",
  CRAM_ALL_CARDS: "Select a deck to cram",
  REVIEW_ALL_CARDS: "Review flashcards from all notes",
  REVIEW_CARDS_IN_NOTE: "Review flashcards in this note",
  CRAM_CARDS_IN_NOTE: "Cram flashcards in this note",
  VIEW_STATS: "View statistics",
  STATUS_BAR: "Review: ${dueNotesCount} note(s), ${dueFlashcardsCount} card(s) due",
  SYNC_TIME_TAKEN: "Sync took ${t}ms",
  NOTE_IN_IGNORED_FOLDER: "Note is saved under ignored folder (check settings).",
  PLEASE_TAG_NOTE: "Please tag the note appropriately for reviewing (in settings).",
  RESPONSE_RECEIVED: "Response received.",
  NO_DECK_EXISTS: "No deck exists for ${deckName}",
  ALL_CAUGHT_UP: "You're all caught up now :D.",
  // scheduling.ts
  DAYS_STR_IVL: "${interval} day(s)",
  MONTHS_STR_IVL: "${interval} month(s)",
  YEARS_STR_IVL: "${interval} year(s)",
  DAYS_STR_IVL_MOBILE: "${interval}d",
  MONTHS_STR_IVL_MOBILE: "${interval}m",
  YEARS_STR_IVL_MOBILE: "${interval}y",
  // settings.ts
  SETTINGS_HEADER: "Spaced Repetition Plugin - Settings",
  CHECK_WIKI: 'For more information, check the <a href="${wiki_url}">wiki</a>.',
  FOLDERS_TO_IGNORE: "Folders to ignore",
  FOLDERS_TO_IGNORE_DESC: "Enter folder paths separated by newlines i.e. Templates Meta/Scripts",
  FLASHCARDS: "Flashcards",
  FLASHCARD_EASY_LABEL: "Easy Button Text",
  FLASHCARD_GOOD_LABEL: "Good Button Text",
  FLASHCARD_HARD_LABEL: "Hard Button Text",
  FLASHCARD_EASY_DESC: 'Customize the label for the "Easy" Button',
  FLASHCARD_GOOD_DESC: 'Customize the label for the "Good" Button',
  FLASHCARD_HARD_DESC: 'Customize the label for the "Hard" Button',
  FLASHCARD_TAGS: "Flashcard tags",
  FLASHCARD_TAGS_DESC: "Enter tags separated by spaces or newlines i.e. #flashcards #deck2 #deck3.",
  CONVERT_FOLDERS_TO_DECKS: "Convert folders to decks and subdecks?",
  CONVERT_FOLDERS_TO_DECKS_DESC: "This is an alternative to the Flashcard tags option above.",
  INLINE_SCHEDULING_COMMENTS: "Save scheduling comment on the same line as the flashcard's last line?",
  INLINE_SCHEDULING_COMMENTS_DESC: "Turning this on will make the HTML comments not break list formatting.",
  BURY_SIBLINGS_TILL_NEXT_DAY: "Bury sibling cards until the next day?",
  BURY_SIBLINGS_TILL_NEXT_DAY_DESC: "Siblings are cards generated from the same card text i.e. cloze deletions",
  SHOW_CARD_CONTEXT: "Show context in cards?",
  SHOW_CARD_CONTEXT_DESC: "i.e. Title > Heading 1 > Subheading > ... > Subheading",
  CARD_MODAL_HEIGHT_PERCENT: "Flashcard Height Percentage",
  CARD_MODAL_SIZE_PERCENT_DESC: "Should be set to 100% on mobile or if you have very large images",
  RESET_DEFAULT: "Reset to default",
  CARD_MODAL_WIDTH_PERCENT: "Flashcard Width Percentage",
  RANDOMIZE_CARD_ORDER: "Randomize card order during review?",
  DISABLE_CLOZE_CARDS: "Disable cloze cards?",
  CONVERT_HIGHLIGHTS_TO_CLOZES: "Convert ==hightlights== to clozes?",
  CONVERT_BOLD_TEXT_TO_CLOZES: "Convert **bolded text** to clozes?",
  CONVERT_CURLY_BRACKETS_TO_CLOZES: "Convert {{curly brackets}} to clozes?",
  INLINE_CARDS_SEPARATOR: "Separator for inline flashcards",
  FIX_SEPARATORS_MANUALLY_WARNING: "Note that after changing this you have to manually edit any flashcards you already have.",
  INLINE_REVERSED_CARDS_SEPARATOR: "Separator for inline reversed flashcards",
  MULTILINE_CARDS_SEPARATOR: "Separator for multiline flashcards",
  MULTILINE_REVERSED_CARDS_SEPARATOR: "Separator for multiline reversed flashcards",
  NOTES: "Notes",
  REVIEW_PANE_ON_STARTUP: "Enable note review pane on startup",
  TAGS_TO_REVIEW: "Tags to review",
  TAGS_TO_REVIEW_DESC: "Enter tags separated by spaces or newlines i.e. #review #tag2 #tag3.",
  OPEN_RANDOM_NOTE: "Open a random note for review",
  OPEN_RANDOM_NOTE_DESC: "When you turn this off, notes are ordered by importance (PageRank).",
  AUTO_NEXT_NOTE: "Open next note automatically after a review",
  DISABLE_FILE_MENU_REVIEW_OPTIONS: "Disable review options in the file menu i.e. Review: Easy Good Hard",
  DISABLE_FILE_MENU_REVIEW_OPTIONS_DESC: "After disabling, you can review using the command hotkeys. Reload Obsidian after changing this.",
  MAX_N_DAYS_REVIEW_QUEUE: "Maximum number of days to display on right panel",
  MIN_ONE_DAY: "The number of days must be at least 1.",
  VALID_NUMBER_WARNING: "Please provide a valid number.",
  UI_PREFERENCES: "UI Preferences",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE: "Deck trees should be initially displayed as expanded",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE_DESC: "Turn this off to collapse nested decks in the same card. Useful if you have cards which belong to many decks in the same file.",
  ALGORITHM: "Algorithm",
  CHECK_ALGORITHM_WIKI: 'For more information, check the <a href="${algo_url}">algorithm implementation</a>.',
  BASE_EASE: "Base ease",
  BASE_EASE_DESC: "minimum = 130, preferrably approximately 250.",
  BASE_EASE_MIN_WARNING: "The base ease must be at least 130.",
  LAPSE_INTERVAL_CHANGE: "Interval change when you review a flashcard/note as hard",
  LAPSE_INTERVAL_CHANGE_DESC: "newInterval = oldInterval * intervalChange / 100.",
  EASY_BONUS: "Easy Bonus",
  EASY_BONUS_DESC: "The easy bonus allows you to set the difference in intervals between answering Good and Easy on a flashcard/note (minimum = 100%).",
  EASY_BONUS_MIN_WARNING: "The easy bonus must be at least 100.",
  MAX_INTERVAL: "Maximum interval in days",
  MAX_INTERVAL_DESC: "Allows you to place an upper limit on the interval (default = 100 years).",
  MAX_INTERVAL_MIN_WARNING: "The maximum interval must be at least 1 day.",
  MAX_LINK_CONTRIB: "Maximum link contribution",
  MAX_LINK_CONTRIB_DESC: "Maximum contribution of the weighted ease of linked notes to the initial ease.",
  LOGGING: "Logging",
  DISPLAY_DEBUG_INFO: "Display debugging information on the developer console?",
  // sidebar.ts
  NOTES_REVIEW_QUEUE: "Notes Review Queue",
  CLOSE: "Close",
  NEW: "New",
  YESTERDAY: "Yesterday",
  TODAY: "Today",
  TOMORROW: "Tomorrow",
  // stats-modal.tsx
  STATS_TITLE: "Statistics",
  MONTH: "Month",
  QUARTER: "Quarter",
  YEAR: "Year",
  LIFETIME: "Lifetime",
  FORECAST: "Forecast",
  FORECAST_DESC: "The number of cards due in the future",
  SCHEDULED: "Scheduled",
  DAYS: "Days",
  NUMBER_OF_CARDS: "Number of cards",
  REVIEWS_PER_DAY: "Average: ${avg} reviews/day",
  INTERVALS: "Intervals",
  INTERVALS_DESC: "Delays until reviews are shown again",
  COUNT: "Count",
  INTERVALS_SUMMARY: "Average interval: ${avg}, Longest interval: ${longest}",
  EASES: "Eases",
  EASES_SUMMARY: "Average ease: ${avgEase}",
  CARD_TYPES: "Card Types",
  CARD_TYPES_DESC: "This includes buried cards as well, if any",
  CARD_TYPE_NEW: "New",
  CARD_TYPE_YOUNG: "Young",
  CARD_TYPE_MATURE: "Mature",
  CARD_TYPES_SUMMARY: "Total cards: ${totalCardsCount}"
};

// src/lang/locale/en-gb.ts
var en_gb_default = {};

// src/lang/locale/es.ts
var es_default = {
  // flashcard-modal.tsx
  DECKS: "Mazos",
  DUE_CARDS: "Tarjetas Vencidas",
  NEW_CARDS: "Tarjetas Nuevas",
  TOTAL_CARDS: "Tarjetas Totales",
  BACK: "Atr\xE1s",
  SKIP: "Saltar",
  EDIT_CARD: "Editar Tarjeta",
  RESET_CARD_PROGRESS: "Reiniciar progreso de la tarjeta",
  HARD: "Dif\xEDcil",
  GOOD: "Bien",
  EASY: "F\xE1cil",
  SHOW_ANSWER: "Mostrar Respuesta",
  CARD_PROGRESS_RESET: "El progreso de la tarjeta se ha reiniciado.",
  SAVE: "Guardar",
  CANCEL: "Cancelar",
  NO_INPUT: "Se ha prove\xEDdo entrada.",
  CURRENT_EASE_HELP_TEXT: "Facilidad Actual: ",
  CURRENT_INTERVAL_HELP_TEXT: "Intervalo Actual: ",
  CARD_GENERATED_FROM: "Generado Desde: ${notePath}",
  // main.ts
  OPEN_NOTE_FOR_REVIEW: "Abrir nota para revisi\xF3n",
  REVIEW_CARDS: "Revisar Tarjetas",
  REVIEW_EASY_FILE_MENU: "Revisar: F\xE1cil",
  REVIEW_GOOD_FILE_MENU: "Revisar: Bien",
  REVIEW_HARD_FILE_MENU: "Revisar: Dif\xEDcil",
  REVIEW_NOTE_EASY_CMD: "Revisar nota como f\xE1cil",
  REVIEW_NOTE_GOOD_CMD: "Revisar nota como bien",
  REVIEW_NOTE_HARD_CMD: "Revisar nota como dif\xEDcil",
  CRAM_ALL_CARDS: "Selecciona un mazo a memorizar",
  REVIEW_ALL_CARDS: "Revisar tarjetas de todas las notas",
  REVIEW_CARDS_IN_NOTE: "Revisar tarjetas en esta nota",
  CRAM_CARDS_IN_NOTE: "Memorizar tarjetas en esta nota",
  VIEW_STATS: "Ver estad\xEDsticas",
  STATUS_BAR: "Revisar: ${dueNotesCount} nota(s), ${dueFlashcardsCount} tarjetas vencidas",
  SYNC_TIME_TAKEN: "La sincronizaci\xF3n tom\xF3 ${t} milisegundos",
  NOTE_IN_IGNORED_FOLDER: "La nota est\xE1 guardada en un directorio ignorado (revisa los ajustes).",
  PLEASE_TAG_NOTE: "Por favor etiquete apropiadamente la nota para revisi\xF3n (en los ajustes).",
  RESPONSE_RECEIVED: "Respuesta Recibida",
  NO_DECK_EXISTS: "No existen mazos para: ${deckName}",
  ALL_CAUGHT_UP: "\xA1Est\xE1s al d\xEDa! \u{1F603}",
  // scheduling.ts
  DAYS_STR_IVL: "${interval} d\xEDa(s)",
  MONTHS_STR_IVL: "${interval} mes(es)",
  YEARS_STR_IVL: "${interval} a\xF1o(s)",
  DAYS_STR_IVL_MOBILE: "${interval}d",
  MONTHS_STR_IVL_MOBILE: "${interval}m",
  YEARS_STR_IVL_MOBILE: "${interval}a",
  // settings.ts
  SETTINGS_HEADER: "Extensi\xF3n de Repetici\xF3n Espaciada - Ajustes",
  CHECK_WIKI: 'Para m\xE1s informaci\xF3n revisa la <a href="${wiki_url}">wiki</a>.',
  FOLDERS_TO_IGNORE: "Directorios a ignorar",
  FOLDERS_TO_IGNORE_DESC: "Escriba las rutas de los directorios separadas por saltos de l\xEDnea, por ejemplo, Plantillas Extra/Guiones",
  FLASHCARDS: "Tarjetas de Memorizaci\xF3n",
  FLASHCARD_EASY_LABEL: "Texto del bot\xF3n: F\xE1cil",
  FLASHCARD_GOOD_LABEL: "Texto del bot\xF3n: Bien",
  FLASHCARD_HARD_LABEL: "Texto del bot\xF3n: Dif\xEDcil",
  FLASHCARD_EASY_DESC: "Personalize la etiqueta para el bot\xF3n: F\xE1cil",
  FLASHCARD_GOOD_DESC: "Personalize la etiqueta para el bot\xF3n: Bien",
  FLASHCARD_HARD_DESC: "Personalize la etiqueta para el bot\xF3n: Dif\xEDcil",
  FLASHCARD_TAGS: "Etiquetas de las Tarjetas de Memorizaci\xF3n",
  FLASHCARD_TAGS_DESC: "Escriba las etiquetas separadas por espacios o saltos de l\xEDnea, por ejemplo, #memorizar #mazo2 #mazo3",
  CONVERT_FOLDERS_TO_DECKS: "\xBFConvertir directorios a mazos y submazos?",
  CONVERT_FOLDERS_TO_DECKS_DESC: "Esta es una opci\xF3n alternativa a las etiquetas de las Tarjetas de Memorizaci\xF3n.",
  INLINE_SCHEDULING_COMMENTS: "\xBFGuardar el comentario para programaci\xF3n de las tarjetas en la \xFAltima l\xEDnea?",
  INLINE_SCHEDULING_COMMENTS_DESC: "Activar esto har\xE1 que los comentarios HTML no rompan el formato de las listas.",
  BURY_SIBLINGS_TILL_NEXT_DAY: "\xBFEnterrar tarjetas hermanas hasta el siguiente d\xEDa?",
  BURY_SIBLINGS_TILL_NEXT_DAY_DESC: "Los hermanos son tarjetas generadas del mismo texto de la tarjeta, por ejemplo, deletreos de huecos (cloze deletions en ingl\xE9s)",
  SHOW_CARD_CONTEXT: "\xBFMostrar contexto en las tarjetas?",
  SHOW_CARD_CONTEXT_DESC: "Por Ejemplo: T\xEDtulo > Cabecera > Sub-Cabecera > ... > Sub-Cabecera",
  CARD_MODAL_HEIGHT_PERCENT: "Porcentaje de la altura de las tarjetas de memoria",
  CARD_MODAL_SIZE_PERCENT_DESC: "Deber\xEDa ser establecido en 100% si tienes im\xE1genes grandes",
  RESET_DEFAULT: "Reiniciar a la configuraci\xF3n por defecto",
  CARD_MODAL_WIDTH_PERCENT: "Porcentaje del ancho de las tarjetas de memoria",
  RANDOMIZE_CARD_ORDER: "\xBFAleatorizar el orden de las tarjetas para revisi\xF3n?",
  DISABLE_CLOZE_CARDS: "\xBFDeshabilitar deletreo de huecos en las tarjetas?",
  CONVERT_HIGHLIGHTS_TO_CLOZES: "\xBFConvertir ==resaltados== a deletreo de huecos?",
  CONVERT_BOLD_TEXT_TO_CLOZES: "\xBFConvertir **texto en negrita** a deletreo de huecos?",
  CONVERT_CURLY_BRACKETS_TO_CLOZES: "\xBFConvertir {{llaves rizadas}} a deletreo de huecos?",
  INLINE_CARDS_SEPARATOR: "Separador de tarjetas de memorizaci\xF3n en l\xEDnea",
  FIX_SEPARATORS_MANUALLY_WARNING: "Note que despu\xE9s de cambiar este ajuste, tendr\xE1 que cambiar manualmente todas las notas que tenga.",
  INLINE_REVERSED_CARDS_SEPARATOR: "Separador de tarjetas de memorizaci\xF3n para tarjetas de notas invertidas",
  MULTILINE_CARDS_SEPARATOR: "Separador para tarjetas de memorizaci\xF3n multil\xEDnea",
  MULTILINE_REVERSED_CARDS_SEPARATOR: "Separador para tarjetas de memorizaci\xF3n multil\xEDnea invertidas",
  NOTES: "Notes",
  REVIEW_PANE_ON_STARTUP: "Activar panel de revisi\xF3n de notas al arrancar",
  TAGS_TO_REVIEW: "Etiquetas a revisar",
  TAGS_TO_REVIEW_DESC: "Escriba las etiquetas separadas por espacios o saltos de l\xEDneas, por ejemplo, #revisi\xF3n #etiqueta2 #etiqueta3.",
  OPEN_RANDOM_NOTE: "Abrir una nota al azar para revisar",
  OPEN_RANDOM_NOTE_DESC: "Cuando deshabilita esto, las notas son ordenadas por importancia (Algoritmo PageRank).",
  AUTO_NEXT_NOTE: "Abrir la siguiente nota autom\xE1ticamente despu\xE9s de una revisi\xF3n",
  DISABLE_FILE_MENU_REVIEW_OPTIONS: "Deshabilitar opciones de revisi\xF3n en el men\xFA de archivo, por ejemplo, Revisi\xF3n: F\xE1cil Bien Dif\xEDcil",
  DISABLE_FILE_MENU_REVIEW_OPTIONS_DESC: "Despu\xE9s de deshabilitarlo, puede hacer las revisiones utilizando atajos de teclado. Reinicie Obsidian despu\xE9s de cambiar esto.",
  MAX_N_DAYS_REVIEW_QUEUE: "N\xFAmero m\xE1ximo de d\xEDas a mostrar en el panel derecho.",
  MIN_ONE_DAY: "El n\xFAmero de d\xEDas debe ser al menos uno.",
  VALID_NUMBER_WARNING: "Por favor especifique un n\xFAmero v\xE1lido.",
  UI_PREFERENCES: "Preferencias de la interfaz de usuario.",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE: "Los \xE1rboles de mazos deber\xEDan ser expandidos al inicio.",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE_DESC: "Desactiva esto para contraer mazos anidados en la misma tarjeta. \xDAtil si tienes tarjetas que pertenecen a muchos mazos en el mismo archivo.",
  ALGORITHM: "Algoritmo",
  CHECK_ALGORITHM_WIKI: 'Para m\xE1s informaci\xF3n, revisa la <a href="${algo_url}">implementaci\xF3n del algoritmo</a>.',
  BASE_EASE: "Base ease",
  BASE_EASE_DESC: "El m\xEDnimo es 130, es preferible que est\xE9 aproximado a 250.",
  BASE_EASE_MIN_WARNING: "La facilidad base de las tarjetas debe ser al menos 130.",
  LAPSE_INTERVAL_CHANGE: "El intervalo cambiar\xE1 cuando se revise una tarjeta o nota como Dif\xEDcil.",
  LAPSE_INTERVAL_CHANGE_DESC: "NuevoInterval = ViejoIntervalo * CambioDeIntervalo / 100.",
  EASY_BONUS: "Bonificaci\xF3n para F\xE1cil",
  EASY_BONUS_DESC: "La bonificaci\xF3n para F\xE1cil te permite establecer la diferencia entre intervalos al responder Bien y F\xE1cil en las tarjetas o notas (m\xEDnimo = 100%).",
  EASY_BONUS_MIN_WARNING: "El bono de facilidad debe ser al menos 100.",
  MAX_INTERVAL: "Intervalo m\xE1ximo en d\xEDas",
  MAX_INTERVAL_DESC: "Te permite establecer un l\xEDmite mayor en el intervalo (por defecto es de 100 a\xF1os).",
  MAX_INTERVAL_MIN_WARNING: "El intervalo m\xE1ximo debe ser de al menos un d\xEDa.",
  MAX_LINK_CONTRIB: "Contribuci\xF3n m\xE1xima de las notas vinculadas.",
  MAX_LINK_CONTRIB_DESC: "Contribuci\xF3n m\xE1xima de la facilidad ponderada de las notas vinculadas a la facilidad inicial.",
  LOGGING: "Registro",
  DISPLAY_DEBUG_INFO: "\xBFMostrar informaci\xF3n de depuraci\xF3n en la consola de desarrollador?",
  // sidebar.ts
  NOTES_REVIEW_QUEUE: "Cola de notas a revisar",
  CLOSE: "Cerrar",
  NEW: "Nuevo",
  YESTERDAY: "Ayer",
  TODAY: "Hoy",
  TOMORROW: "Ma\xF1ana",
  // stats-modal.tsx
  STATS_TITLE: "Estad\xEDsticas",
  MONTH: "Mes",
  QUARTER: "Trimestre o Cuatrimestre",
  // En Inglés: Quarter.
  YEAR: "A\xF1o",
  LIFETIME: "Tiempo de Vida",
  FORECAST: "Pron\xF3stico",
  FORECAST_DESC: "El n\xFAmero de tarjetas vencidas en el futuro",
  SCHEDULED: "Programado",
  DAYS: "D\xEDas",
  NUMBER_OF_CARDS: "N\xFAmero de tarjetas",
  REVIEWS_PER_DAY: "Carga: ${avg} Revisiones por d\xEDa",
  INTERVALS: "Intervalos",
  INTERVALS_DESC: "Retrasos hasta que las revisiones se muestren de nuevo",
  COUNT: "Conteo",
  INTERVALS_SUMMARY: "Intervalo de carga: ${avg}, Intervalo mayor: ${longest}",
  EASES: "Facilidad",
  EASES_SUMMARY: "Carga de Facilidad: ${avgEase}",
  CARD_TYPES: "Tipos de tarjetas",
  CARD_TYPES_DESC: "Esto incluye tambi\xE9n a las tarjetas enterradas, si las hay",
  CARD_TYPE_NEW: "Nueva",
  CARD_TYPE_YOUNG: "Joven",
  CARD_TYPE_MATURE: "Madura",
  CARD_TYPES_SUMMARY: "Tarjetas Totales: ${totalCardsCount}"
};

// src/lang/locale/fr.ts
var fr_default = {};

// src/lang/locale/hi.ts
var hi_default = {};

// src/lang/locale/id.ts
var id_default = {};

// src/lang/locale/it.ts
var it_default = {};

// src/lang/locale/ja.ts
var ja_default = {
  // flashcard-modal.tsx
  DECKS: "\u30C7\u30C3\u30AD",
  DUE_CARDS: "\u671F\u65E5\u306E\u30AB\u30FC\u30C9",
  NEW_CARDS: "\u65B0\u898F\u306E\u30AB\u30FC\u30C9",
  TOTAL_CARDS: "\u30AB\u30FC\u30C9\u5408\u8A08",
  BACK: "Back",
  SKIP: "Skip",
  EDIT_CARD: "Edit Card",
  RESET_CARD_PROGRESS: "\u30AB\u30FC\u30C9\u306E\u9032\u6357\u3092\u30EA\u30BB\u30C3\u30C8",
  HARD: "Hard",
  GOOD: "Good",
  EASY: "Easy",
  SHOW_ANSWER: "\u89E3\u7B54\u3092\u8868\u793A",
  CARD_PROGRESS_RESET: "\u30AB\u30FC\u30C9\u306E\u9032\u6357\u304C\u30EA\u30BB\u30C3\u30C8\u3055\u308C\u307E\u3057\u305F\u3002",
  SAVE: "Save",
  CANCEL: "Cancel",
  NO_INPUT: "No input provided.",
  CURRENT_EASE_HELP_TEXT: "Current Ease: ",
  CURRENT_INTERVAL_HELP_TEXT: "Current Interval: ",
  CARD_GENERATED_FROM: "Generated from: ${notePath}",
  // main.ts
  OPEN_NOTE_FOR_REVIEW: "\u30EC\u30D3\u30E5\u30FC\u3059\u308B\u30CE\u30FC\u30C8\u3092\u958B\u304F",
  REVIEW_CARDS: "\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9\u306E\u30EC\u30D3\u30E5\u30FC",
  REVIEW_EASY_FILE_MENU: "\u30EC\u30D3\u30E5\u30FC: Easy",
  REVIEW_GOOD_FILE_MENU: "\u30EC\u30D3\u30E5\u30FC: Good",
  REVIEW_HARD_FILE_MENU: "\u30EC\u30D3\u30E5\u30FC: Hard",
  REVIEW_NOTE_EASY_CMD: "\u30CE\u30FC\u30C8\u3092Easy\u3068\u3057\u3066\u30EC\u30D3\u30E5\u30FC\u3059\u308B",
  REVIEW_NOTE_GOOD_CMD: "\u30CE\u30FC\u30C8\u3092Good\u3068\u3057\u3066\u30EC\u30D3\u30E5\u30FC\u3059\u308B",
  REVIEW_NOTE_HARD_CMD: "\u30CE\u30FC\u30C8\u3092Hard\u3068\u3057\u3066\u30EC\u30D3\u30E5\u30FC\u3059\u308B",
  REVIEW_ALL_CARDS: "\u3059\u3079\u3066\u306E\u30CE\u30FC\u30C8\u304B\u3089\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9\u3092\u30EC\u30D3\u30E5\u30FC\u3059\u308B",
  CRAM_ALL_CARDS: "Select a deck to cram",
  REVIEW_CARDS_IN_NOTE: "\u3053\u306E\u30CE\u30FC\u30C8\u306E\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9\u3092\u30EC\u30D3\u30E5\u30FC\u3059\u308B",
  CRAM_CARDS_IN_NOTE: "\u3053\u306E\u30CE\u30FC\u30C8\u306E\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9\u3092\u8A70\u3081\u8FBC\u307F\u5B66\u7FD2\u3059\u308B",
  VIEW_STATS: "\u7D71\u8A08\u3092\u95B2\u89A7\u3059\u308B",
  STATUS_BAR: "\u30EC\u30D3\u30E5\u30FC: ${dueNotesCount}\u30CE\u30FC\u30C8, ${dueFlashcardsCount}\u30AB\u30FC\u30C9\u304C\u671F\u65E5",
  SYNC_TIME_TAKEN: "\u540C\u671F\u306B${t}ms\u304B\u304B\u308A\u307E\u3057\u305F\u3002",
  NOTE_IN_IGNORED_FOLDER: "\u30CE\u30FC\u30C8\u304C\u7121\u8996\u3059\u308B\u30D5\u30A9\u30EB\u30C0\u306B\u4FDD\u5B58\u3055\u308C\u3066\u3044\u307E\u3059(\u8A2D\u5B9A\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044)\u3002",
  PLEASE_TAG_NOTE: "\u30EC\u30D3\u30E5\u30FC\u3092\u884C\u3046\u306B\u306F\u30CE\u30FC\u30C8\u306B\u5BFE\u3057\u3066\u6B63\u3057\u304F\u30BF\u30B0\u4ED8\u3051\u3057\u3066\u304F\u3060\u3055\u3044(\u8A2D\u5B9A\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044)\u3002",
  RESPONSE_RECEIVED: "\u7B54\u3048\u3092\u53D7\u3051\u53D6\u308A\u307E\u3057\u305F\u3002",
  NO_DECK_EXISTS: "${deckName}\u306B\u306F\u30C7\u30C3\u30AD\u304C\u5B58\u5728\u3057\u307E\u305B\u3093\u3002",
  ALL_CAUGHT_UP: "\u4ECA\u65E5\u306E\u8AB2\u984C\u3092\u3059\u3079\u3066\u9054\u6210\u3057\u307E\u3057\u305F :D",
  // scheduling.ts
  DAYS_STR_IVL: "${interval}\u65E5\u5F8C",
  MONTHS_STR_IVL: "${interval}\u6708\u5F8C",
  YEARS_STR_IVL: "${interval}\u5E74\u5F8C",
  DAYS_STR_IVL_MOBILE: "${interval}d",
  MONTHS_STR_IVL_MOBILE: "${interval}m",
  YEARS_STR_IVL_MOBILE: "${interval}y",
  // settings.ts
  SETTINGS_HEADER: "Spaced Repetition Plugin - \u8A2D\u5B9A",
  CHECK_WIKI: '\u8A73\u7D30\u306B\u3064\u3044\u3066\u306F<a href="${wiki_url}">wiki</a>\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002',
  FOLDERS_TO_IGNORE: "\u7121\u8996\u3059\u308B\u30D5\u30A9\u30EB\u30C0",
  FOLDERS_TO_IGNORE_DESC: '\u30D5\u30A9\u30EB\u30C0\u30D1\u30B9\u3092\u6539\u884C\u3067\u533A\u5207\u3063\u3066\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002"Templates Meta/Scripts" \u306E\u3088\u3046\u306A\u30B9\u30DA\u30FC\u30B9\u306B\u3088\u308B\u533A\u5207\u308A\u3067\u306E\u66F8\u304D\u65B9\u306F\u7121\u52B9\u3067\u3059\u3002',
  FLASHCARDS: "\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9",
  FLASHCARD_EASY_LABEL: "Easy Button Text",
  FLASHCARD_GOOD_LABEL: "Good Button Text",
  FLASHCARD_HARD_LABEL: "Hard Button Text",
  FLASHCARD_EASY_DESC: 'Customize the label for the "Easy" Button',
  FLASHCARD_GOOD_DESC: 'Customize the label for the "Good" Button',
  FLASHCARD_HARD_DESC: 'Customize the label for the "Hard" Button',
  FLASHCARD_TAGS: "\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9\u306B\u4F7F\u7528\u3059\u308B\u30BF\u30B0",
  FLASHCARD_TAGS_DESC: '\u30BF\u30B0\u3092\u30B9\u30DA\u30FC\u30B9\u307E\u305F\u306F\u6539\u884C\u3067\u533A\u5207\u3063\u3066\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u4F8B: "#flashcards #deck2 #deck3"',
  CONVERT_FOLDERS_TO_DECKS: "\u30D5\u30A9\u30EB\u30C0\u3092\u30C7\u30C3\u30AD\u3068\u30B5\u30D6\u30C7\u30C3\u30AD\u3068\u3057\u3066\u4F7F\u7528\u3057\u307E\u3059\u304B\uFF1F",
  CONVERT_FOLDERS_TO_DECKS_DESC: "\u3053\u308C\u306F\u4E0A\u8A18\u306E\u30BF\u30B0\u3092\u4F7F\u7528\u3057\u305F\u30C7\u30C3\u30AD\u69CB\u7BC9\u306E\u4EE3\u66FF\u3068\u306A\u308B\u30AA\u30D7\u30B7\u30E7\u30F3\u3067\u3059\u3002",
  INLINE_SCHEDULING_COMMENTS: "\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9\u306E\u6700\u7D42\u884C\u3068\u540C\u4E00\u306E\u884C\u306B\u30B9\u30B1\u30B8\u30E5\u30FC\u30EA\u30F3\u30B0\u30B3\u30E1\u30F3\u30C8\u3092\u4FDD\u5B58\u3057\u307E\u3059\u304B\uFF1F",
  INLINE_SCHEDULING_COMMENTS_DESC: "\u3053\u306E\u30AA\u30D7\u30B7\u30E7\u30F3\u3092\u6709\u52B9\u5316\u3059\u308B\u3068\u3001HTML\u30B3\u30E1\u30F3\u30C8\u306B\u3088\u3063\u3066Markdown\u306E\u30EA\u30B9\u30C8\u30D5\u30A9\u30FC\u30DE\u30C3\u30C8\u304C\u5D29\u308C\u306A\u304F\u306A\u308A\u307E\u3059\u3002",
  BURY_SIBLINGS_TILL_NEXT_DAY: "\u6B21\u306E\u30EC\u30D3\u30E5\u30FC\u307E\u3067\u30B7\u30D6\u30EA\u30F3\u30B0\u3092\u5EF6\u671F\u3057\u307E\u3059\u304B\uFF1F",
  BURY_SIBLINGS_TILL_NEXT_DAY_DESC: "\u30B7\u30D6\u30EA\u30F3\u30B0\u306F\u540C\u4E00\u306E\u30AB\u30FC\u30C9\u30C6\u30AD\u30B9\u30C8\u304B\u3089\u751F\u6210\u3055\u308C\u305F\u30AB\u30FC\u30C9\u3001\u3064\u307E\u308A\u7A74\u57CB\u3081\u554F\u984C\u306E\u6D3E\u751F\u30AB\u30FC\u30C9\u3067\u3059\u3002",
  SHOW_CARD_CONTEXT: "\u30AB\u30FC\u30C9\u306B\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\u3092\u8868\u793A\u3057\u307E\u3059\u304B\uFF1F",
  SHOW_CARD_CONTEXT_DESC: "\uFF62\u30BF\u30A4\u30C8\u30EB > \u898B\u51FA\u3057 1 > \u526F\u898B\u51FA\u3057 > ... > \u526F\u898B\u51FA\u3057\uFF63\u306E\u8868\u793A\u3092\u884C\u3046\u304B\u3069\u3046\u304B\u3092\u6C7A\u3081\u307E\u3059\u3002",
  CARD_MODAL_HEIGHT_PERCENT: "\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9\u306E\u7E26\u30B5\u30A4\u30BA\u306E\u30D1\u30FC\u30BB\u30F3\u30C6\u30FC\u30B8",
  CARD_MODAL_SIZE_PERCENT_DESC: "\u30E2\u30D0\u30A4\u30EB\u7248\u3001\u307E\u305F\u306F\u975E\u5E38\u306B\u5927\u304D\u306A\u30B5\u30A4\u30BA\u306E\u753B\u50CF\u304C\u3042\u308B\u5834\u5408\u306B\u306F100%\u306B\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\u3002",
  RESET_DEFAULT: "\u30C7\u30D5\u30A9\u30EB\u30C8\u5024\u306B\u30EA\u30BB\u30C3\u30C8\u3059\u308B",
  CARD_MODAL_WIDTH_PERCENT: "\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9\u306E\u6A2A\u30B5\u30A4\u30BA\u306E\u30D1\u30FC\u30BB\u30F3\u30C6\u30FC\u30B8",
  RANDOMIZE_CARD_ORDER: "\u30EC\u30D3\u30E5\u30FC\u4E2D\u306E\u30AB\u30FC\u30C9\u306E\u9806\u756A\u3092\u30E9\u30F3\u30C0\u30E0\u306B\u3057\u307E\u3059\u304B\uFF1F",
  DISABLE_CLOZE_CARDS: "\u7A74\u57CB\u3081\u30AB\u30FC\u30C9\u3092\u7121\u52B9\u5316\u3057\u307E\u3059\u304B\uFF1F",
  CONVERT_HIGHLIGHTS_TO_CLOZES: "==\u30CF\u30A4\u30E9\u30A4\u30C8==\u3092\u7A74\u57CB\u3081\u3068\u3057\u3066\u4F7F\u7528\u3057\u307E\u3059\u304B\uFF1F",
  CONVERT_BOLD_TEXT_TO_CLOZES: "**\u30DC\u30FC\u30EB\u30C9\u4F53**\u3092\u7A74\u57CB\u3081\u3068\u3057\u3066\u4F7F\u7528\u3057\u307E\u3059\u304B\uFF1F",
  CONVERT_CURLY_BRACKETS_TO_CLOZES: "{{\u4E2D\u62EC\u5F27}}\u3092\u7A74\u57CB\u3081\u3068\u3057\u3066\u4F7F\u7528\u3057\u307E\u3059\u304B\uFF1F",
  INLINE_CARDS_SEPARATOR: "\u30A4\u30F3\u30E9\u30A4\u30F3\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9\u306B\u4F7F\u7528\u3059\u308B\u30BB\u30D1\u30EC\u30FC\u30BF\u30FC",
  FIX_SEPARATORS_MANUALLY_WARNING: "\u3053\u306E\u30AA\u30D7\u30B7\u30E7\u30F3\u3092\u5909\u66F4\u3059\u308B\u5834\u5408\u306B\u306F\u3001\u4F5C\u6210\u6E08\u307F\u306E\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9\u3092\u624B\u52D5\u3067\u7DE8\u96C6\u3057\u76F4\u3059\u5FC5\u8981\u304C\u3042\u308B\u3053\u3068\u306B\u6CE8\u610F\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  INLINE_REVERSED_CARDS_SEPARATOR: "\u30A4\u30F3\u30E9\u30A4\u30F3\u306E\u8868\u88CF\u53CD\u8EE2\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9\u306B\u4F7F\u7528\u3059\u308B\u30BB\u30D1\u30EC\u30FC\u30BF\u30FC",
  MULTILINE_CARDS_SEPARATOR: "\u8907\u6570\u884C\u306E\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9\u306B\u4F7F\u7528\u3059\u308B\u30BB\u30D1\u30EC\u30FC\u30BF\u30FC",
  MULTILINE_REVERSED_CARDS_SEPARATOR: "\u8907\u6570\u884C\u306E\u8868\u88CF\u53CD\u8EE2\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9\u306B\u4F7F\u7528\u3059\u308B\u30BB\u30D1\u30EC\u30FC\u30BF\u30FC",
  NOTES: "\u30CE\u30FC\u30C8",
  REVIEW_PANE_ON_STARTUP: "Enable note review pane on startup",
  TAGS_TO_REVIEW: "\u30EC\u30D3\u30E5\u30FC\u306B\u4F7F\u7528\u3059\u308B\u30BF\u30B0",
  TAGS_TO_REVIEW_DESC: '\u30BF\u30B0\u3092\u30B9\u30DA\u30FC\u30B9\u307E\u305F\u306F\u6539\u884C\u3067\u533A\u5207\u3063\u3066\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u4F8B: "#review #tag2 #tag3"',
  OPEN_RANDOM_NOTE: "\u30E9\u30F3\u30C0\u30E0\u306B\u30CE\u30FC\u30C8\u3092\u958B\u3044\u3066\u30EC\u30D3\u30E5\u30FC\u3059\u308B",
  OPEN_RANDOM_NOTE_DESC: "\u3053\u306E\u30AA\u30D7\u30B7\u30E7\u30F3\u304C\u7121\u52B9\u5316\u3055\u308C\u3066\u3044\u308B\u72B6\u614B\u3067\u306F\u3001\u30CE\u30FC\u30C8\u306F\u91CD\u8981\u5EA6(\u30DA\u30FC\u30B8\u30E9\u30F3\u30AF)\u306B\u3088\u308B\u9806\u756A\u3067\u8868\u793A\u3055\u308C\u307E\u3059\u3002",
  AUTO_NEXT_NOTE: "\u30EC\u30D3\u30E5\u30FC\u5F8C\u306B\u6B21\u306E\u30CE\u30FC\u30C8\u3092\u81EA\u52D5\u7684\u306B\u958B\u304F",
  DISABLE_FILE_MENU_REVIEW_OPTIONS: "\u30D5\u30A1\u30A4\u30EB\u30E1\u30CB\u30E5\u30FC\u3067\u306E\u30EC\u30D3\u30E5\u30FC\u30AA\u30D7\u30B7\u30E7\u30F3\u3092\u7121\u52B9\u5316(\uFF62\u30EC\u30D3\u30E5\u30FC: Easy\uFF63\u7B49\u306E\u9805\u76EE\u3092\u975E\u8868\u793A\u306B\u3059\u308B)",
  DISABLE_FILE_MENU_REVIEW_OPTIONS_DESC: "\u7121\u52B9\u5316\u3057\u305F\u5F8C\u3001\u30B3\u30DE\u30F3\u30C9\u30DB\u30C3\u30C8\u30AD\u30FC\u3092\u4F7F\u3063\u3066\u30EC\u30D3\u30E5\u30FC\u3059\u308B\u3053\u3068\u304C\u53EF\u80FD\u306B\u306A\u308A\u307E\u3059\u3002\u3053\u306E\u30AA\u30D7\u30B7\u30E7\u30F3\u3092\u5909\u66F4\u3057\u305F\u5834\u5408\u306B\u306FObsidian\u3092\u30EA\u30ED\u30FC\u30C9\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  MAX_N_DAYS_REVIEW_QUEUE: "\u53F3\u30D1\u30CD\u30EB\u306B\u8868\u793A\u3059\u308B\u6700\u5927\u306E\u65E5\u6570",
  MIN_ONE_DAY: "\u65E5\u6570\u306B\u306F1\u4EE5\u4E0A\u306E\u6570\u5B57\u3092\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  VALID_NUMBER_WARNING: "\u6709\u52B9\u306A\u6570\u5B57\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  UI_PREFERENCES: "\u30E6\u30FC\u30B6\u30FC \u30A4\u30F3\u30BF\u30FC\u30D5\u30A7\u30A4\u30B9\u306E\u8A2D\u5B9A",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE: "\u30C7\u30C3\u30AD \u30C4\u30EA\u30FC\u306F\u6700\u521D\u306F\u5C55\u958B\u3057\u3066\u8868\u793A\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE_DESC: "\u3053\u308C\u3092\u30AA\u30D5\u306B\u3059\u308B\u3068\u3001\u540C\u3058\u30AB\u30FC\u30C9\u5185\u306E\u30CD\u30B9\u30C8\u3055\u308C\u305F\u30C7\u30C3\u30AD\u304C\u6298\u308A\u305F\u305F\u307E\u308C\u307E\u3059\u3002\u540C\u3058\u30D5\u30A1\u30A4\u30EB\u306B\u591A\u304F\u306E\u30C7\u30C3\u30AD\u306B\u5C5E\u3059\u308B\u30AB\u30FC\u30C9\u304C\u3042\u308B\u5834\u5408\u306B\u4FBF\u5229\u3067\u3059\u3002",
  ALGORITHM: "\u30A2\u30EB\u30B4\u30EA\u30BA\u30E0",
  CHECK_ALGORITHM_WIKI: '\u8A73\u7D30\u306B\u3064\u3044\u3066\u306F<a href="${algo_url}">\u30A2\u30EB\u30B4\u30EA\u30BA\u30E0\u306E\u5B9F\u88C5</a>\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002',
  BASE_EASE: "\u30D9\u30FC\u30B9\u306E\u6613\u3057\u3055",
  BASE_EASE_DESC: "\u6700\u5C0F\u5024\u306F130\u3067\u3059\u304C\u3001 \u9069\u6B63\u5024\u306F\u304A\u304A\u3088\u305D250\u3067\u3059\u3002",
  BASE_EASE_MIN_WARNING: "\u30D9\u30FC\u30B9\u306E\u6613\u3057\u3055\u306B\u306F130\u4EE5\u4E0A\u306E\u6570\u5B57\u3092\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  LAPSE_INTERVAL_CHANGE: "\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9/\u30CE\u30FC\u30C8\u3092Hard\u3068\u3057\u3066\u30EC\u30D3\u30E5\u30FC\u3057\u305F\u969B\u306E\u9593\u9694\u5909\u66F4",
  LAPSE_INTERVAL_CHANGE_DESC: '"\u65B0\u3057\u3044\u9593\u9694 = \u4EE5\u524D\u306E\u9593\u9694 * \u9593\u9694\u5909\u66F4 / 100" \u3068\u3057\u3066\u8A08\u7B97\u3055\u308C\u307E\u3059\u3002',
  EASY_BONUS: "Easy\u30DC\u30FC\u30CA\u30B9",
  EASY_BONUS_DESC: "Easy\u30DC\u30FC\u30CA\u30B9\u306B\u3088\u3063\u3066\u30D5\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9/\u30CE\u30FC\u30C8\u306B\u304A\u3051\u308B\u9593\u9694\u306E\u5DEE\u5206\u3092\u8A2D\u5B9A\u3067\u304D\u307E\u3059(\u6700\u5C0F\u5024 = 100%)\u3002",
  EASY_BONUS_MIN_WARNING: "Easy\u30DC\u30FC\u30CA\u30B9\u306B\u306F100\u4EE5\u4E0A\u306E\u6570\u5B57\u3092\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  MAX_INTERVAL: "Maximum interval in days",
  MAX_INTERVAL_DESC: "\u9593\u9694\u306B\u4E0A\u9650\u5024\u3092\u8A2D\u5B9A\u3059\u308B\u3053\u3068\u304C\u3067\u304D\u307E\u3059(\u30C7\u30D5\u30A9\u30EB\u30C8\u5024 = 100\u5E74)\u3002",
  MAX_INTERVAL_MIN_WARNING: "\u9593\u9694\u306E\u6700\u5927\u5024\u306B\u306F1\u4EE5\u4E0A\u306E\u6570\u5B57\u3092\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  MAX_LINK_CONTRIB: "\u30EA\u30F3\u30AF\u30B3\u30F3\u30C8\u30EA\u30D3\u30E5\u30FC\u30B7\u30E7\u30F3\u306E\u6700\u5927\u5024",
  MAX_LINK_CONTRIB_DESC: "\u6700\u521D\u306E\u6613\u3057\u3055\u306B\u5BFE\u3057\u3066\u3001\u30EA\u30F3\u30AF\u3055\u308C\u305F\u30CE\u30FC\u30C8\u306E\u91CD\u307F\u4ED8\u3051\u3055\u308C\u305F\u6613\u3057\u3055\u304C\u5BC4\u4E0E\u3059\u308B\u6700\u5927\u5024\u3092\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  LOGGING: "\u30ED\u30B0\u7BA1\u7406",
  DISPLAY_DEBUG_INFO: "\u30C7\u30D9\u30ED\u30C3\u30D1\u30FC\u30B3\u30F3\u30BD\u30FC\u30EB\u306B\u3066\u30C7\u30D0\u30C3\u30B0\u60C5\u5831\u3092\u8868\u793A\u3057\u307E\u3059\u304B\uFF1F",
  // sidebar.ts
  NOTES_REVIEW_QUEUE: "\u30CE\u30FC\u30C8\u30EC\u30D3\u30E5\u30FC\u306E\u30AD\u30E5\u30FC",
  CLOSE: "\u9589\u3058\u308B",
  NEW: "\u65B0\u898F",
  YESTERDAY: "\u6628\u65E5",
  TODAY: "\u4ECA\u65E5",
  TOMORROW: "\u660E\u65E5",
  // stats-modal.tsx
  STATS_TITLE: "\u7D71\u8A08",
  MONTH: "Month",
  QUARTER: "Quarter",
  YEAR: "Year",
  LIFETIME: "Lifetime",
  FORECAST: "\u4E88\u6E2C",
  FORECAST_DESC: "\u5FA9\u7FD2\u671F\u65E5\u304C\u6765\u308B\u30AB\u30FC\u30C9\u306E\u679A\u6570",
  SCHEDULED: "\u30B9\u30B1\u30B8\u30E5\u30FC\u30EA\u30F3\u30B0\u6E08\u307F",
  DAYS: "\u65E5",
  NUMBER_OF_CARDS: "\u30AB\u30FC\u30C9\u6570",
  REVIEWS_PER_DAY: "\u5E73\u5747: ${avg}\u30EC\u30D3\u30E5\u30FC/\u65E5",
  INTERVALS: "\u9593\u9694",
  INTERVALS_DESC: "\u6B21\u306E\u30EC\u30D3\u30E5\u30FC\u4E88\u5B9A\u65E5",
  COUNT: "\u30AB\u30A6\u30F3\u30C8",
  INTERVALS_SUMMARY: "\u9593\u9694\u306E\u5E73\u5747\u5024: ${avg}, \u6700\u9577\u306E\u9593\u9694: ${longest}",
  EASES: "\u6613\u3057\u3055",
  EASES_SUMMARY: "\u6613\u3057\u3055\u306E\u5E73\u5747\u5024: ${avgEase}",
  CARD_TYPES: "\u30AB\u30FC\u30C9\u30BF\u30A4\u30D7",
  CARD_TYPES_DESC: "\u5EF6\u671F\u306E\u30AB\u30FC\u30C9\u304C\u3042\u308B\u5834\u5408\u306B\u306F\u3053\u308C\u306B\u542B\u307E\u308C\u307E\u3059",
  CARD_TYPE_NEW: "\u65B0\u898F",
  CARD_TYPE_YOUNG: "\u5FA9\u7FD2(\u521D\u671F)",
  CARD_TYPE_MATURE: "\u5FA9\u7FD2(\u5F8C\u671F)",
  CARD_TYPES_SUMMARY: "\u30AB\u30FC\u30C9\u306E\u5408\u8A08: ${totalCardsCount}\u679A"
};

// src/lang/locale/ko.ts
var ko_default = {
  // flashcard-modal.tsx
  DECKS: "\uB371",
  DUE_CARDS: "\uB2E4\uC2DC \uBCFC \uCE74\uB4DC\uB4E4",
  NEW_CARDS: "\uC0C8\uB85C\uC6B4 \uCE74\uB4DC\uB4E4",
  TOTAL_CARDS: "\uC804\uCCB4 \uCE74\uB4DC\uB4E4",
  BACK: "Back",
  SKIP: "Skip",
  EDIT_CARD: "Edit Card",
  RESET_CARD_PROGRESS: "\uCE74\uB4DC\uC758 \uC9C4\uD589\uC0C1\uD669\uC744 \uCD08\uAE30\uD654\uD569\uB2C8\uB2E4.",
  HARD: "\uC5B4\uB824\uC6C0(Hard)",
  GOOD: "\uC88B\uC74C(Good)",
  EASY: "\uC26C\uC6C0(Easy)",
  SHOW_ANSWER: "\uC815\uB2F5 \uD655\uC778\uD558\uAE30",
  CARD_PROGRESS_RESET: "\uCE74\uB4DC\uC758 \uC9C4\uD589\uC0C1\uD669\uC774 \uCD08\uAE30\uD654\uB418\uC5C8\uC2B5\uB2C8\uB2E4.",
  SAVE: "Save",
  CANCEL: "Cancel",
  NO_INPUT: "No input provided.",
  CURRENT_EASE_HELP_TEXT: "Current Ease: ",
  CURRENT_INTERVAL_HELP_TEXT: "Current Interval: ",
  CARD_GENERATED_FROM: "Generated from: ${notePath}",
  // main.ts
  OPEN_NOTE_FOR_REVIEW: "\uB9AC\uBDF0\uD560 \uB178\uD2B8 \uC5F4\uAE30",
  REVIEW_CARDS: "\uD50C\uB798\uC2DC\uCE74\uB4DC \uB9AC\uBDF0",
  REVIEW_EASY_FILE_MENU: "\uB9AC\uBDF0: \uC26C\uC6C0(Easy)",
  REVIEW_GOOD_FILE_MENU: "\uB9AC\uBDF0: \uC88B\uC74C(Good)",
  REVIEW_HARD_FILE_MENU: "\uB9AC\uBDF0: \uC5B4\uB824\uC6C0(Hard)",
  REVIEW_NOTE_EASY_CMD: "\uB178\uD2B8\uB97C \uC26C\uC6C0(easy)\uC73C\uB85C \uB9AC\uBDF0\uD569\uB2C8\uB2E4",
  REVIEW_NOTE_GOOD_CMD: "\uB178\uD2B8\uB97C \uC88B\uC74C(good)\uC73C\uB85C \uB9AC\uBDF0\uD569\uB2C8\uB2E4",
  REVIEW_NOTE_HARD_CMD: "\uB178\uD2B8\uB97C \uC5B4\uB824\uC6C0(hard)\uC73C\uB85C \uB9AC\uBDF0\uD569\uB2C8\uB2E4",
  REVIEW_ALL_CARDS: "\uBAA8\uB4E0 \uB178\uD2B8\uB4E4\uC758 \uD50C\uB798\uC2DC\uCE74\uB4DC\uB4E4\uC744 \uB9AC\uBDF0\uD569\uB2C8\uB2E4",
  CRAM_ALL_CARDS: "Select a deck to cram",
  REVIEW_CARDS_IN_NOTE: "\uC774 \uB178\uD2B8\uC758 \uD50C\uB798\uC2DC\uCE74\uB4DC\uB4E4\uC744 \uB9AC\uBDF0\uD569\uB2C8\uB2E4",
  CRAM_CARDS_IN_NOTE: "\uC774 \uB178\uD2B8\uC758 \uD50C\uB798\uC2DC\uCE74\uB4DC\uB4E4\uC744 \uBCBC\uB77D\uCE58\uAE30\uD569\uB2C8\uB2E4.",
  VIEW_STATS: "\uD1B5\uACC4 \uD655\uC778",
  STATUS_BAR: "--\uB9AC\uBDF0: ${dueNotesCount} \uB178\uD2B8, ${dueFlashcardsCount} \uCE74\uB4DC \uB0A8\uC558\uC2B5\uB2C8\uB2E4.",
  SYNC_TIME_TAKEN: "\uB3D9\uAE30\uD654\uC5D0 ${t}\uBC00\uB9AC\uCD08 \uAC78\uB838\uC2B5\uB2C8\uB2E4",
  NOTE_IN_IGNORED_FOLDER: "\uB178\uD2B8\uAC00 \uBB34\uC2DC\uB41C \uD3F4\uB354 \uC544\uB798\uC5D0 \uC800\uC7A5\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4. (\uC124\uC815\uC744 \uD655\uC778\uD574\uC8FC\uC138\uC694)",
  PLEASE_TAG_NOTE: "\uB9AC\uBDF0\uB97C \uD558\uAE30\uC704\uD574 \uB178\uD2B8\uC5D0 \uC801\uC808\uD788 \uD0DC\uADF8\uD574\uC8FC\uC138\uC694. (\uC124\uC815\uC744 \uD655\uC778\uD574\uC8FC\uC138\uC694)",
  RESPONSE_RECEIVED: "\uC694\uCCAD\uC774 \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4",
  NO_DECK_EXISTS: "${deckName}\uC774\uB77C\uB294 \uC774\uB984\uC758 \uB371\uC774 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",
  ALL_CAUGHT_UP: "\uBAA8\uB450 \uD655\uC778\uD588\uC2B5\uB2C8\uB2E4. :D",
  // scheduling.ts
  DAYS_STR_IVL: "${interval} \uC77C \uD6C4",
  MONTHS_STR_IVL: "${interval} \uAC1C\uC6D4 \uD6C4",
  YEARS_STR_IVL: "${interval} \uB144 \uD6C4",
  DAYS_STR_IVL_MOBILE: "${interval}d",
  MONTHS_STR_IVL_MOBILE: "${interval}m",
  YEARS_STR_IVL_MOBILE: "${interval}y",
  // settings.ts
  SETTINGS_HEADER: "Spaced Repetition Plugin - \uC124\uC815",
  CHECK_WIKI: '\uB354 \uB9CE\uC740 \uC815\uBCF4\uB97C \uC6D0\uD558\uC2DC\uBA74, <a href="${wiki_url}">wiki</a>\uB97C \uD655\uC778\uD574\uC8FC\uC138\uC694.',
  FOLDERS_TO_IGNORE: "\uBB34\uC2DC\uD560 \uD3F4\uB354\uB4E4",
  FOLDERS_TO_IGNORE_DESC: "\uD3F4\uB354 \uACBD\uB85C\uB97C \uBE48 \uC904\uB85C \uAD6C\uBD84\uD574\uC11C \uC785\uB825\uD574\uC8FC\uC138\uC694. 'Templates Meta/Scripts' \uC640 \uAC19\uC774 \uC785\uB825\uD558\uB294 \uAC83\uC740 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",
  FLASHCARDS: "\uD50C\uB798\uC2DC\uCE74\uB4DC",
  FLASHCARD_EASY_LABEL: "Easy Button Text",
  FLASHCARD_GOOD_LABEL: "Good Button Text",
  FLASHCARD_HARD_LABEL: "Hard Button Text",
  FLASHCARD_EASY_DESC: 'Customize the label for the "Easy" Button',
  FLASHCARD_GOOD_DESC: 'Customize the label for the "Good" Button',
  FLASHCARD_HARD_DESC: 'Customize the label for the "Hard" Button',
  FLASHCARD_TAGS: "\uD50C\uB798\uC2DC\uCE74\uB4DC \uD0DC\uADF8",
  FLASHCARD_TAGS_DESC: "\uD0DC\uADF8\uB97C \uACF5\uBC31 \uB610\uB294 \uBE48 \uC904\uB85C \uAD6C\uBD84\uD574\uC11C \uC785\uB825\uD574\uC8FC\uC138\uC694. \uC608) '#flashcards #deck2 #deck3'",
  CONVERT_FOLDERS_TO_DECKS: "\uD3F4\uB354\uB97C \uB371\uACFC \uC11C\uBE0C\uB371\uC73C\uB85C \uC0AC\uC6A9\uD560\uAE4C\uC694?",
  CONVERT_FOLDERS_TO_DECKS_DESC: "\uC774 \uAE30\uB2A5\uC740 \uC704\uC758 \uD50C\uB798\uC2DC\uCE74\uB4DC \uD0DC\uADF8 \uC635\uC158\uC744 \uB300\uCCB4\uD569\uB2C8\uB2E4.",
  INLINE_SCHEDULING_COMMENTS: "\uD50C\uB798\uC2DC\uCE74\uB4DC\uC758 \uB9C8\uC9C0\uB9C9 \uC904\uACFC \uB3D9\uC77C\uD55C \uC904\uC5D0 \uC2A4\uCF00\uC904\uB9C1 \uCF54\uBA58\uD2B8\uB97C \uC800\uC7A5\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
  INLINE_SCHEDULING_COMMENTS_DESC: "\uC774 \uC635\uC158\uC744 \uC0AC\uC6A9\uD558\uBA74 HTML \uC8FC\uC11D\uC774 \uBAA9\uB85D\uC758 \uD3EC\uB9E4\uD305\uC744 \uBB34\uB108\uD2B8\uB9AC\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",
  BURY_SIBLINGS_TILL_NEXT_DAY: "Sibling \uCE74\uB4DC\uB97C \uB2E4\uC74C\uB0A0\uAE4C\uC9C0 \uBB3B\uC5B4\uB450\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
  BURY_SIBLINGS_TILL_NEXT_DAY_DESC: "Sibling \uCE74\uB4DC\uB294 \uB3D9\uC77C\uD55C \uCE74\uB4DC \uD14D\uC2A4\uD2B8\uC5D0\uC11C \uC0DD\uC131\uB41C \uCE74\uB4DC\uC785\uB2C8\uB2E4. i.e. cloze deletions",
  SHOW_CARD_CONTEXT: "\uCE74\uB4DC\uC758 \uBB38\uB9E5(context)\uC744 \uD45C\uC2DC\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
  SHOW_CARD_CONTEXT_DESC: "\uCE74\uB4DC\uC5D0\uC11C 'Title > Heading 1 > Subheading > ... > Subheading' \uC758 \uD45C\uC2DC\uB97C \uD560\uC9C0 \uC124\uC815\uD569\uB2C8\uB2E4.",
  CARD_MODAL_HEIGHT_PERCENT: "\uD50C\uB798\uC2DC\uCE74\uB4DC \uB192\uC774 \uBE44\uC728",
  CARD_MODAL_SIZE_PERCENT_DESC: "\uBAA8\uBC14\uC77C \uBC84\uC804 \uD639\uC740 \uB9E4\uC6B0 \uD070 \uC774\uBBF8\uC9C0\uAC00 \uC788\uB294 \uACBD\uC6B0 100%\uB85C \uC124\uC815\uD574\uC57C \uD569\uB2C8\uB2E4.",
  RESET_DEFAULT: "\uAE30\uBCF8\uAC12\uC73C\uB85C \uCD08\uAE30\uD654",
  CARD_MODAL_WIDTH_PERCENT: "\uD50C\uB798\uC2DC\uCE74\uB4DC \uB108\uBE44 \uBE44\uC728",
  RANDOMIZE_CARD_ORDER: "\uB9AC\uBDF0\uC911\uC778 \uCE74\uB4DC\uC758 \uC21C\uC11C\uB97C \uB79C\uB364\uC73C\uB85C \uB450\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
  DISABLE_CLOZE_CARDS: "\uBE48 \uCE78 \uCC44\uC6B0\uAE30 \uCE74\uB4DC\uB97C \uBE44\uD65C\uC131\uD654\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
  CONVERT_HIGHLIGHTS_TO_CLOZES: "==hightlights== \uB97C \uBE48 \uCE78 \uCC44\uC6B0\uAE30\uB85C \uC804\uD658\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
  CONVERT_BOLD_TEXT_TO_CLOZES: "**bolded text** \uB97C \uBE48 \uCE78 \uCC44\uC6B0\uAE30\uB85C \uC804\uD658\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
  CONVERT_CURLY_BRACKETS_TO_CLOZES: "{{curly brackets}} \uB97C \uBE48 \uCE78 \uCC44\uC6B0\uAE30\uB85C \uC804\uD658\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
  INLINE_CARDS_SEPARATOR: "\uC778\uB77C\uC778 \uD50C\uB798\uC2DC\uCE74\uB4DC \uAD6C\uBD84\uC790",
  FIX_SEPARATORS_MANUALLY_WARNING: "\uC8FC\uC758: \uC774 \uC635\uC158\uC744 \uC218\uC815\uD55C \uD6C4\uC5D0\uB294 \uC774\uBBF8 \uC791\uC131\uB41C \uD50C\uB798\uC2DC\uCE74\uB4DC\uB97C \uC218\uB3D9\uC73C\uB85C \uC218\uC815\uD574\uC57C \uD568\uC744 \uC8FC\uC758\uD558\uC2ED\uC2DC\uC624.",
  INLINE_REVERSED_CARDS_SEPARATOR: "\uC778\uB77C\uC778 \uBC18\uC804 \uD50C\uB798\uC2DC\uCE74\uB4DC \uAD6C\uBD84\uC790",
  MULTILINE_CARDS_SEPARATOR: "\uC5EC\uB7EC \uC904 \uD50C\uB798\uC2DC\uCE74\uB4DC \uAD6C\uBD84\uC790",
  MULTILINE_REVERSED_CARDS_SEPARATOR: "\uC5EC\uB7EC \uC904 \uBC18\uC804 \uD50C\uB798\uC2DC\uCE74\uB4DC \uAD6C\uBD84\uC790",
  NOTES: "\uB178\uD2B8",
  REVIEW_PANE_ON_STARTUP: "Enable note review pane on startup",
  TAGS_TO_REVIEW: "\uB9AC\uBDF0\uC5D0 \uC0AC\uC6A9\uD560 \uD0DC\uADF8",
  TAGS_TO_REVIEW_DESC: "\uD0DC\uADF8\uB97C \uACF5\uBC31 \uB610\uB294 \uBE48 \uC904\uB85C \uAD6C\uBD84\uD574\uC11C \uC785\uB825\uD574\uC8FC\uC138\uC694. \uC608) '#review #tag2 #tag3'",
  OPEN_RANDOM_NOTE: "\uB9AC\uBDF0\uB97C \uC704\uD574 \uB79C\uB364 \uB178\uD2B8\uB97C \uC5FD\uB2C8\uB2E4.",
  OPEN_RANDOM_NOTE_DESC: "\uC774 \uC635\uC158\uC774 \uAEBC\uC838\uC788\uC73C\uBA74, \uB178\uD2B8\uB294 \uC911\uC694\uB3C4(\uD398\uC774\uC9C0 \uB7AD\uD06C)\uC5D0 \uB530\uB77C \uC815\uB82C\uB429\uB2C8\uB2E4.",
  AUTO_NEXT_NOTE: "\uB9AC\uBDF0 \uD6C4\uC5D0 \uB2E4\uC74C \uB178\uD2B8\uB97C \uC790\uB3D9\uC73C\uB85C \uC5FD\uB2C8\uB2E4.",
  DISABLE_FILE_MENU_REVIEW_OPTIONS: "\uD30C\uC77C \uBA54\uB274\uC5D0\uC11C\uC758 \uB9AC\uBDF0 \uC635\uC158\uC744 \uBE44\uD65C\uC131\uD654 \uD569\uB2C8\uB2E4. \uC608) \uB9AC\uBDF0: Easy Good Hard",
  DISABLE_FILE_MENU_REVIEW_OPTIONS_DESC: "\uC774 \uC635\uC158\uC744 \uBE44\uD65C\uC131\uD654 \uD55C \uD6C4, \uBA85\uB839 \uB2E8\uCD95\uD0A4\uB97C \uC774\uC6A9\uD574 \uB9AC\uBDF0\uD558\uC2E4 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC774 \uC635\uC158\uC744 \uBCC0\uACBD\uD55C \uD6C4\uC5D0 \uC635\uC2DC\uB514\uC5B8\uC744 \uC0C8\uB85C\uACE0\uCE68 \uD558\uC2ED\uC2DC\uC624.",
  MAX_N_DAYS_REVIEW_QUEUE: "\uC624\uB978\uCABD \uD328\uB110\uC5D0 \uD45C\uC2DC\uD560 \uCD5C\uB300 \uC77C\uC218",
  MIN_ONE_DAY: "\uC801\uC5B4\uB3C4 1\uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.",
  VALID_NUMBER_WARNING: "\uC720\uD6A8\uD55C \uC22B\uC790\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694.",
  UI_PREFERENCES: "\uC0AC\uC6A9\uC790 \uC778\uD130\uD398\uC774\uC2A4 \uAE30\uBCF8 \uC124\uC815",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE: "\uB371 \uD2B8\uB9AC\uB294 \uCC98\uC74C\uC5D0 \uD655\uC7A5\uB41C \uAC83\uC73C\uB85C \uD45C\uC2DC\uB418\uC5B4\uC57C \uD569\uB2C8\uB2E4.",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE_DESC: "\uAC19\uC740 \uCE74\uB4DC\uC5D0 \uC911\uCCA9\uB41C \uB371\uC744 \uC811\uC73C\uB824\uBA74 \uC774 \uC635\uC158\uC744 \uB044\uC2ED\uC2DC\uC624. \uAC19\uC740 \uD30C\uC77C\uC5D0 \uC5EC\uB7EC \uB371\uC5D0 \uC18D\uD55C \uCE74\uB4DC\uAC00 \uC788\uB294 \uACBD\uC6B0 \uC720\uC6A9\uD569\uB2C8\uB2E4.",
  ALGORITHM: "\uC54C\uACE0\uB9AC\uC998",
  CHECK_ALGORITHM_WIKI: '\uB354 \uB9CE\uC740 \uC815\uBCF4\uB97C \uC6D0\uD558\uC2DC\uBA74, <a href="${algo_url}">algorithm implementation</a>\uC744 \uD655\uC778\uD574\uC8FC\uC138\uC694.',
  BASE_EASE: "\uAE30\uBCF8 ease",
  BASE_EASE_DESC: "\uCD5C\uC19F\uAC12 = 130, \uC801\uC815\uCE58\uB294 \uB300\uB7B5 250\uC785\uB2C8\uB2E4.",
  BASE_EASE_MIN_WARNING: "\uAE30\uBCF8 ease\uB294 \uC801\uC5B4\uB3C4 130 \uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.",
  LAPSE_INTERVAL_CHANGE: "\uD50C\uB798\uC2DC\uCE74\uB4DC/\uB178\uD2B8\uB97C \uC5B4\uB824\uC6C0(Hard)\uC73C\uB85C \uB9AC\uBDF0\uD588\uC744 \uB54C\uC758 \uAC04\uACA9 \uBCC0\uACBD",
  LAPSE_INTERVAL_CHANGE_DESC: "\uC0C8\uB85C\uC6B4 \uAC04\uACA9 = \uC774\uC804 \uAC04\uACA9 * \uAC04\uACA9\uBCC0\uACBD \uAC12 / 100.",
  EASY_BONUS: "\uC26C\uC6C0(Easy) \uBCF4\uB108\uC2A4",
  EASY_BONUS_DESC: "\uC26C\uC6C0(Easy) \uBCF4\uB108\uC2A4\uB294 \uD50C\uB798\uC2DC\uCE74\uB4DC/\uB178\uD2B8\uC5D0\uC11C \uC88B\uC74C(Good)\uACFC \uC26C\uC6C0(Easy) \uC0AC\uC774\uC758 \uAC04\uACA9 \uCC28\uC774\uB97C \uC124\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. (\uCD5C\uC18C = 100%)",
  EASY_BONUS_MIN_WARNING: "\uC26C\uC6C0(Easy) \uBCF4\uB108\uC2A4\uB294 \uC801\uC5B4\uB3C4 100\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.",
  MAX_INTERVAL: "Maximum interval in days",
  MAX_INTERVAL_DESC: "\uAC04\uACA9\uC758 \uC0C1\uD55C\uC120\uC744 \uB458 \uC218 \uC788\uC2B5\uB2C8\uB2E4. (\uAE30\uBCF8\uAC12 = 100\uB144)",
  MAX_INTERVAL_MIN_WARNING: "\uCD5C\uB300 \uAC04\uACA9\uC740 \uC801\uC5B4\uB3C4 1\uC77C\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.",
  MAX_LINK_CONTRIB: "\uCD5C\uB300 \uC5F0\uACB0 \uAE30\uC5EC\uB3C4",
  MAX_LINK_CONTRIB_DESC: "\uB9C1\uD06C\uB41C \uB178\uD2B8\uC758 \uCD08\uAE30 ease\uC5D0 \uB300\uD55C \uAC00\uC911\uCE58\uAC00 \uC801\uC6A9\uB41C ease\uC758 \uCD5C\uB300 \uAE30\uC5EC\uB3C4\uC785\uB2C8\uB2E4.",
  LOGGING: "\uB85C\uAE45",
  DISPLAY_DEBUG_INFO: "\uB514\uBC84\uAE45 \uC815\uBCF4\uB97C \uAC1C\uBC1C\uC790 \uCF58\uC194\uC5D0 \uD45C\uC2DC\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
  // sidebar.ts
  NOTES_REVIEW_QUEUE: "\uB9AC\uBDF0\uD560 \uB178\uD2B8 \uB300\uAE30\uC5F4",
  CLOSE: "\uB2EB\uAE30",
  NEW: "New",
  YESTERDAY: "\uC5B4\uC81C",
  TODAY: "\uC624\uB298",
  TOMORROW: "\uB0B4\uC77C",
  // stats-modal.tsx
  STATS_TITLE: "\uD1B5\uACC4",
  MONTH: "\uC6D4",
  QUARTER: "\uBD84\uAE30",
  YEAR: "\uB144",
  LIFETIME: "\uD3C9\uC0DD",
  FORECAST: "\uC608\uCE21",
  FORECAST_DESC: "\uC774\uD6C4\uC5D0 \uD559\uC2B5\uD560 \uCE74\uB4DC\uC758 \uC218",
  SCHEDULED: "Scheduled",
  DAYS: "\uC77C",
  NUMBER_OF_CARDS: "\uCE74\uB4DC\uC758 \uC218",
  REVIEWS_PER_DAY: "\uD3C9\uADE0: ${avg} \uB9AC\uBDF0/\uC77C",
  INTERVALS: "\uAC04\uACA9",
  INTERVALS_DESC: "\uB9AC\uBDF0\uB97C \uB2E4\uC2DC \uD560 \uB54C \uAE4C\uC9C0\uC758 \uAE30\uAC04",
  COUNT: "Count",
  INTERVALS_SUMMARY: "\uD3C9\uADE0 \uAC04\uACA9: ${avg}, \uAC00\uC7A5 \uAE34 \uAC04\uACA9: ${longest}",
  EASES: "Eases",
  EASES_SUMMARY: "Average ease: ${avgEase}",
  CARD_TYPES: "\uCE74\uB4DC \uD0C0\uC785",
  CARD_TYPES_DESC: "\uC5EC\uAE30\uC5D0\uB294 \uBB3B\uC5B4\uB454 \uCE74\uB4DC\uB3C4 \uD3EC\uD568\uB429\uB2C8\uB2E4.",
  CARD_TYPE_NEW: "New",
  CARD_TYPE_YOUNG: "Young",
  CARD_TYPE_MATURE: "Mature",
  CARD_TYPES_SUMMARY: "\uC804\uCCB4 \uCE74\uB4DC \uC218: ${totalCardsCount}"
};

// src/lang/locale/mr.ts
var mr_default = {};

// src/lang/locale/nl.ts
var nl_default = {};

// src/lang/locale/no.ts
var no_default = {};

// src/lang/locale/pl.ts
var pl_default = {};

// src/lang/locale/pt.ts
var pt_default = {};

// src/lang/locale/pt-br.ts
var pt_br_default = {
  // flashcard-modal.tsx
  DECKS: "Baralhos",
  DUE_CARDS: "Cartas para Colocar em Dia",
  NEW_CARDS: "Novas Cartas",
  TOTAL_CARDS: "Total de Cartas",
  BACK: "Back",
  SKIP: "Skip",
  EDIT_CARD: "Edit Card",
  RESET_CARD_PROGRESS: "Reiniciar o Progresso da Carta",
  HARD: "Dif\xEDcil",
  GOOD: "OK",
  EASY: "F\xE1cil",
  SHOW_ANSWER: "Mostrar Resposta",
  CARD_PROGRESS_RESET: "O Progresso da Carta foi reiniciado",
  SAVE: "Save",
  CANCEL: "Cancel",
  NO_INPUT: "No input provided.",
  CURRENT_EASE_HELP_TEXT: "Current Ease: ",
  CURRENT_INTERVAL_HELP_TEXT: "Current Interval: ",
  CARD_GENERATED_FROM: "Generated from: ${notePath}",
  // main.ts
  OPEN_NOTE_FOR_REVIEW: "Abrir uma nota para revisar",
  REVIEW_CARDS: "Revisar flashcards",
  REVIEW_EASY_FILE_MENU: "Revis\xE3o: F\xE1cil",
  REVIEW_GOOD_FILE_MENU: "Revis\xE3o: OK",
  REVIEW_HARD_FILE_MENU: "Revis\xE3o: Dif\xEDcil",
  REVIEW_NOTE_EASY_CMD: "Revisar nota como f\xE1cil",
  REVIEW_NOTE_GOOD_CMD: "Revisar nota como OK",
  REVIEW_NOTE_HARD_CMD: "Revisar nota como dif\xEDcil",
  REVIEW_ALL_CARDS: "Revisar flashcards de todas as notas",
  CRAM_ALL_CARDS: "Select a deck to cram",
  REVIEW_CARDS_IN_NOTE: "Revisar flashcards nessa nota",
  CRAM_CARDS_IN_NOTE: "Revisar todas as flashcards nessa nota",
  VIEW_STATS: "Ver estat\xEDsticas",
  STATUS_BAR: "Revis\xE3o: ${dueNotesCount} nota(s), ${dueFlashcardsCount} Carta(s) para colocar em dia",
  SYNC_TIME_TAKEN: "Sicroniza\xE7\xE3o levou ${t}ms",
  NOTE_IN_IGNORED_FOLDER: "Nota \xE9 salva na pasta ignorada (cheque as configura\xE7\xF5es).",
  PLEASE_TAG_NOTE: "Por favor etiquete a nota apropriadamente para revisar (nas configura\xE7\xF5es).",
  RESPONSE_RECEIVED: "Resposta recebida.",
  NO_DECK_EXISTS: "Nenhum baralho existe para ${deckName}",
  ALL_CAUGHT_UP: "Voc\xEA colocou tudo em prazo agora :D.",
  // scheduling.ts
  DAYS_STR_IVL: "${interval} dia(s)",
  MONTHS_STR_IVL: "${interval} m\xEAs(es)",
  YEARS_STR_IVL: "${interval} ano(s)",
  DAYS_STR_IVL_MOBILE: "${interval}d",
  MONTHS_STR_IVL_MOBILE: "${interval}m",
  YEARS_STR_IVL_MOBILE: "${interval}a",
  // settings.ts
  SETTINGS_HEADER: "Plguin Spaced Repetition - Configura\xE7\xE3o",
  CHECK_WIKI: 'Para mais informa\xE7\xF5es, checke o <a href="${wiki_url}">wiki</a>.',
  FOLDERS_TO_IGNORE: "Pastas para ignorar",
  FOLDERS_TO_IGNORE_DESC: "Ensira o caminho das pastas separado por quebras de linha ex: Templates Meta/Scripts",
  FLASHCARDS: "Flashcards",
  FLASHCARD_EASY_LABEL: "Texto do Bot\xE3o de F\xE1cil",
  FLASHCARD_GOOD_LABEL: "Texto do Bot\xE3o de OK",
  FLASHCARD_HARD_LABEL: "Texto do Bot\xE3o de Dif\xEDcil",
  FLASHCARD_EASY_DESC: 'Costumize o r\xF3tulo para o bot\xE3o de "F\xE1cil"',
  FLASHCARD_GOOD_DESC: 'Costumize o r\xF3tulo para o bot\xE3o de "OK"',
  FLASHCARD_HARD_DESC: 'Customize o r\xF3tulo para o bot\xE3o de "Dif\xEDcil"',
  FLASHCARD_TAGS: "Etiquetas dos Flashcards",
  FLASHCARD_TAGS_DESC: "Ensira etiquetas separadas por espa\xE7os ou quebras de linha ex: #flashcards #baralho2 #baralho3.",
  CONVERT_FOLDERS_TO_DECKS: "Converter pastas para baralhos e sub-baralhos?",
  CONVERT_FOLDERS_TO_DECKS_DESC: "Isso \xE9 uma alternativa para a op\xE7\xE3o de etiqueta dos Flashcards em cima.",
  INLINE_SCHEDULING_COMMENTS: "Salvar coment\xE1rios de agendamento na mesma linha que a \xFAltima linha do flashcard?",
  INLINE_SCHEDULING_COMMENTS_DESC: "Ligar isso vai fazer com que os coment\xE1rios em HTML n\xE3o quebrem a formata\xE7\xE3o de listas.",
  BURY_SIBLINGS_TILL_NEXT_DAY: "Enterrar cartas irm\xE3s at\xE9 o pr\xF3ximo dia?",
  BURY_SIBLINGS_TILL_NEXT_DAY_DESC: "Cartas irm\xE3s s\xE3o geradas pelo texto da mesma carta ex: omiss\xE3o de palavras",
  SHOW_CARD_CONTEXT: "Mostrar conxtexto nas cartas?",
  SHOW_CARD_CONTEXT_DESC: "ex: T\xEDtulo > Cabe\xE7alho 1 > Subcabe\xE7alho > ... > Subcabe\xE7alho",
  CARD_MODAL_HEIGHT_PERCENT: "Porcentagem da Altura do Flashcard",
  CARD_MODAL_SIZE_PERCENT_DESC: "Deveria estar configurado em 100% em dispositivos m\xF3veis ou se voc\xEA tem imagens muito grandes",
  RESET_DEFAULT: "Reiniciar para a pr\xE9-defini\xE7\xE3o",
  CARD_MODAL_WIDTH_PERCENT: "Porcentagem de Largura do Flashcard",
  RANDOMIZE_CARD_ORDER: "Aleatorizar a ordem das cartas durante a revis\xE3o?",
  DISABLE_CLOZE_CARDS: "Desabilitar cartas que usam omiss\xE3o de palavras?",
  CONVERT_HIGHLIGHTS_TO_CLOZES: "Converter ==marca-texto== em omiss\xF5es?",
  CONVERT_BOLD_TEXT_TO_CLOZES: "Converter **texto em negrito** em omiss\xF5es?",
  CONVERT_CURLY_BRACKETS_TO_CLOZES: "Converter {{chaves}} em omiss\xF5es?",
  INLINE_CARDS_SEPARATOR: "Separador para flashcards inline",
  FIX_SEPARATORS_MANUALLY_WARNING: "Note que depois de mudar isso voc\xEA vai ter que manualmente mudar quaisquer flashcards que voc\xEA tenha.",
  INLINE_REVERSED_CARDS_SEPARATOR: "Separador para flashcards inline reversos",
  MULTILINE_CARDS_SEPARATOR: "Separador para flashcards de m\xFAltiplas linhas",
  MULTILINE_REVERSED_CARDS_SEPARATOR: "Separador para flashcards de m\xFAltiplas linhas reversos",
  NOTES: "Notas",
  REVIEW_PANE_ON_STARTUP: "Enable note review pane on startup",
  TAGS_TO_REVIEW: "Etiquetas para revisar",
  TAGS_TO_REVIEW_DESC: "Ensira etiquetas separadas por espa\xE7os ou quebra de linhas ex: #revisar #etiqueta2 #etiqueta3.",
  OPEN_RANDOM_NOTE: "Abrir uma nota aleat\xF3ria para revisar",
  OPEN_RANDOM_NOTE_DESC: "Quando voc\xEA desabilitar isso, as notas v\xE3o ser ordenadas por import\xE2ncia (PageRank).",
  AUTO_NEXT_NOTE: "Abrir a pr\xF3xima nota automaticamente depois de uma revis\xE3o",
  DISABLE_FILE_MENU_REVIEW_OPTIONS: "Desabilitar op\xE7\xF5es de revis\xE3o no menu de arquivos ex: Revis\xE3o: F\xE1cil OK Dif\xEDcil",
  DISABLE_FILE_MENU_REVIEW_OPTIONS_DESC: "Depois de desabilitar, voc\xEA pode revisar usando os atalhos de comando. Reinicie Obsidian depois de mudar isso.",
  MAX_N_DAYS_REVIEW_QUEUE: "N\xFAmero m\xE1ximo de dias para exibir no painel direito",
  MIN_ONE_DAY: "O n\xFAmero de dias deve ser pelo menos 1.",
  VALID_NUMBER_WARNING: "Por favor ensira um n\xFAmero v\xE1lido.",
  UI_PREFERENCES: "Prefer\xEAncias de UI",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE: "\xC1rvores de baralhos devem inicialmente serem exibidas como expandidas",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE_DESC: "Desabilite isso para colapsar baralhos que est\xE3o um dentro do outro na mesma carta. \xDAtil se voc\xEA tem cartas que pertencem a muitos baralhos em um mesmo arquivo.",
  ALGORITHM: "Algor\xEDtmo",
  CHECK_ALGORITHM_WIKI: 'Para mais informa\xE7\xF5es, cheque a <a href="${algo_url}">implementa\xE7\xE3o do algor\xEDtmo</a>.',
  BASE_EASE: "Facilidade base",
  BASE_EASE_DESC: "m\xEDnimo = 130, preferivelmente aproximadamente 250.",
  BASE_EASE_MIN_WARNING: "A facilidade base deve ser pelo menos 130.",
  LAPSE_INTERVAL_CHANGE: "Mudan\xE7a de intervalo quando voc\xEA revisa um(a) flashcard/nota como dif\xEDcil",
  LAPSE_INTERVAL_CHANGE_DESC: "novoIntervalo = velhoIntervalo * mudancaIntervalo / 100.",
  EASY_BONUS: "B\xF4nus de F\xE1cil",
  EASY_BONUS_DESC: "O b\xF4nus de f\xE1cil te permite mudar a difer\xEAncia entre intervalos de responder OK e F\xE1cil em um(a) flashcard/nota (m\xEDnimo = 100%).",
  EASY_BONUS_MIN_WARNING: "O b\xF4nus de f\xE1cil deve ser pelo menos 100.",
  MAX_INTERVAL: "Maximum interval in days",
  MAX_INTERVAL_DESC: "Te permite colocar um limite m\xE1ximo no intervalo (pr\xE9-defini\xE7\xE3o = 100 anos).",
  MAX_INTERVAL_MIN_WARNING: "O intervalo m\xE1ximo deve ser pelo menos 1 dia.",
  MAX_LINK_CONTRIB: "Contribui\xE7\xE3o M\xE1xima de Links",
  MAX_LINK_CONTRIB_DESC: "Contribui\xE7\xE3o m\xE1xima da facilidade ponderada das notas linkadas \xE0 facilidade inicial.",
  LOGGING: "Logging",
  DISPLAY_DEBUG_INFO: "Mostrar informa\xE7\xE3o de debugging no console de desenvolvimento?",
  // sidebar.ts
  NOTES_REVIEW_QUEUE: "Fila de Notas para Revisar",
  CLOSE: "Fechar",
  NEW: "Novo",
  YESTERDAY: "Ontem",
  TODAY: "Hoje",
  TOMORROW: "Amanh\xE3",
  // stats-modal.tsx
  STATS_TITLE: "Estat\xEDsticas",
  MONTH: "M\xEAs",
  QUARTER: "Quarto",
  YEAR: "Ano",
  LIFETIME: "Tempo Total",
  FORECAST: "Previs\xE3o",
  FORECAST_DESC: "O n\xFAmero de cartas a serem colocadas em dia no futuro",
  SCHEDULED: "Agendado",
  DAYS: "Dias",
  NUMBER_OF_CARDS: "N\xFAmero de cartas",
  REVIEWS_PER_DAY: "M\xE9dia: ${avg} revis\xF5es/dia",
  INTERVALS: "Intervalos",
  INTERVALS_DESC: "Atrasos at\xE9 que as revis\xF5es sejam exibidas de novo",
  COUNT: "Contagem",
  INTERVALS_SUMMARY: "Intervalo em m\xE9dia: ${avg}, Maior intervalo: ${longest}",
  EASES: "Facilidades",
  EASES_SUMMARY: "Facilidade em m\xE9dia: ${avgEase}",
  CARD_TYPES: "Tipos de Cartas",
  CARD_TYPES_DESC: "Isso tamb\xE9m inclui cartas enterrados, caso existam",
  CARD_TYPE_NEW: "Novo",
  CARD_TYPE_YOUNG: "Jovem",
  CARD_TYPE_MATURE: "Amadurecido",
  CARD_TYPES_SUMMARY: "Total de cartas: ${totalCardsCount}"
};

// src/lang/locale/ro.ts
var ro_default = {};

// src/lang/locale/ru.ts
var ru_default = {
  // flashcard-modal.tsx
  DECKS: "\u041A\u043E\u043B\u043E\u0434\u044B",
  DUE_CARDS: "\u041F\u0440\u0435\u0434\u0441\u0442\u043E\u044F\u0449\u0438\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438",
  NEW_CARDS: "\u041D\u043E\u0432\u044B\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438",
  TOTAL_CARDS: "\u0412\u0441\u0435\u0433\u043E \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A",
  BACK: "\u041D\u0430\u0437\u0430\u0434",
  SKIP: "\u041F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C",
  EDIT_CARD: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443",
  RESET_CARD_PROGRESS: "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438",
  HARD: "\u0421\u043B\u043E\u0436\u043D\u043E",
  GOOD: "\u041D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E",
  EASY: "\u041B\u0435\u0433\u043A\u043E",
  SHOW_ANSWER: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043E\u0442\u0432\u0435\u0442",
  CARD_PROGRESS_RESET: "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0438\u0437\u0443\u0447\u0435\u043D\u0438\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438",
  SAVE: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
  CANCEL: "\u041E\u0442\u043C\u0435\u043D\u0430",
  NO_INPUT: "\u041F\u0443\u0441\u0442\u043E\u0439 \u0432\u0432\u043E\u0434.",
  CURRENT_EASE_HELP_TEXT: "\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u041B\u0435\u0433\u043A\u043E\u0441\u0442\u044C: ",
  CURRENT_INTERVAL_HELP_TEXT: "\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0438\u043D\u0442\u0435\u0440\u0432\u0430\u043B: ",
  CARD_GENERATED_FROM: "\u0421\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E \u0438\u0437: ${notePath}",
  // main.ts
  OPEN_NOTE_FOR_REVIEW: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0437\u0430\u043C\u0435\u0442\u043A\u0443 \u0434\u043B\u044F \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F",
  REVIEW_CARDS: "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438",
  REVIEW_EASY_FILE_MENU: "\u041F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0435: \u041B\u0435\u0433\u043A\u043E",
  REVIEW_GOOD_FILE_MENU: "\u041F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0435: \u041D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E",
  REVIEW_HARD_FILE_MENU: "\u041F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0435: \u0421\u043B\u043E\u0436\u043D\u043E",
  REVIEW_NOTE_EASY_CMD: "\u041F\u043E\u0432\u0442\u043E\u0440\u044F\u0442\u044C \u0437\u0430\u043C\u0435\u0442\u043A\u0443 \u043A\u0430\u043A \u041B\u0451\u0433\u043A\u0443\u044E",
  REVIEW_NOTE_GOOD_CMD: "\u041F\u043E\u0432\u0442\u043E\u0440\u044F\u0442\u044C \u0437\u0430\u043C\u0435\u0442\u043A\u0443 \u043A\u0430\u043A \u041D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u0443\u044E",
  REVIEW_NOTE_HARD_CMD: "\u041F\u043E\u0432\u0442\u043E\u0440\u044F\u0442\u044C \u0437\u0430\u043C\u0435\u0442\u043A\u0443 \u043A\u0430\u043A \u0421\u043B\u043E\u0436\u043D\u0443\u044E",
  CRAM_ALL_CARDS: "\u0417\u0443\u0431\u0440\u0438\u0442\u044C \u0432\u0441\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u0432 \u044D\u0442\u043E\u0439 \u043A\u043E\u043B\u043E\u0434\u0435",
  REVIEW_ALL_CARDS: "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u0432\u0441\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u0432\u043E \u0432\u0441\u0435\u0445 \u0437\u0430\u043C\u0435\u0442\u043A\u0430\u0445",
  REVIEW_CARDS_IN_NOTE: "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u0432 \u044D\u0442\u043E\u0439 \u0437\u0430\u043C\u0435\u0442\u043A\u0435",
  CRAM_CARDS_IN_NOTE: "\u0417\u0443\u0431\u0440\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u0432 \u044D\u0442\u043E\u0439 \u0437\u0430\u043C\u0435\u0442\u043A\u0435",
  VIEW_STATS: "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0443",
  STATUS_BAR: "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C: ${dueNotesCount} \u0437\u0430\u043C\u0435\u0442\u043E\u043A(-\u043A\u0438), ${dueFlashcardsCount} \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A(-\u043A\u0438) \u043F\u0440\u0435\u0434\u0441\u0442\u043E\u0438\u0442",
  SYNC_TIME_TAKEN: "\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u0437\u0430\u043D\u044F\u043B\u0430 ${t}\u043C\u0441",
  NOTE_IN_IGNORED_FOLDER: "\u0417\u0430\u043C\u0435\u0442\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430 \u0432 \u0438\u0433\u043D\u043E\u0440\u0438\u0440\u0443\u0435\u043C\u0443\u044E \u043F\u0430\u043F\u043A\u0443 (\u0441\u043C. \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438).",
  PLEASE_TAG_NOTE: "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430 \u043F\u043E\u043C\u0435\u0442\u044C\u0442\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0443 \u043A\u0430\u043A \u043D\u0430\u0434\u043E \u0434\u043B\u044F \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F (\u0441\u043C. \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438).",
  RESPONSE_RECEIVED: "\u041E\u0442\u0432\u0435\u0442 \u043F\u043E\u043B\u0443\u0447\u0435\u043D.",
  NO_DECK_EXISTS: "\u041D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u0443\u0440\u043E\u0432\u043D\u044F ${deckName}",
  ALL_CAUGHT_UP: "\u041C\u043E\u043B\u043E\u0434\u0435\u0446! \u0422\u044B \u0441\u043F\u0440\u0430\u0432\u0438\u043B\u0441\u044F \u0438 \u0434\u043E\u0448\u0435\u043B \u0434\u043E \u043A\u043E\u043D\u0446\u0430! :D",
  // scheduling.ts
  DAYS_STR_IVL: "${interval} \u0434\u043D\u0435\u0439",
  MONTHS_STR_IVL: "${interval} \u043C\u0435\u0441\u044F\u0446\u043E\u0432",
  YEARS_STR_IVL: "${interval} \u0433\u043E\u0434\u0430 (\u043B\u0435\u0442)",
  DAYS_STR_IVL_MOBILE: "${interval}\u0434.",
  MONTHS_STR_IVL_MOBILE: "${interval}\u043C.",
  YEARS_STR_IVL_MOBILE: "${interval}\u0433.",
  // settings.ts
  SETTINGS_HEADER: "\u041F\u043B\u0430\u0433\u0438\u043D Spaced Repetition - \u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
  CHECK_WIKI: '\u0414\u043B\u044F \u0434\u043E\u043F. \u0438\u043D\u0444\u044B, \u0441\u043C\u043E\u0442\u0440\u0438 <a href="${wiki_url}">wiki</a>.',
  FOLDERS_TO_IGNORE: "\u0418\u0433\u043D\u043E\u0440\u0438\u0440\u0443\u0435\u043C\u044B\u0435 \u043F\u0430\u043F\u043A\u0438",
  FOLDERS_TO_IGNORE_DESC: "\u0412\u0435\u0434\u0438\u0442\u0435 \u043F\u0443\u0442\u0438 \u043F\u0430\u043F\u043E\u043A, \u043A\u0430\u0436\u0434\u0430\u044F \u043D\u0430 \u0441\u0432\u043E\u0435\u0439 \u0441\u0442\u0440\u043E\u043A\u0435, \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: Templates Meta/Scripts",
  FLASHCARDS: "\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0438",
  FLASHCARD_EASY_LABEL: "\u0422\u0435\u043A\u0441\u0442 \u043A\u043D\u043E\u043F\u043A\u0438 \u041B\u0435\u0433\u043A\u043E",
  FLASHCARD_GOOD_LABEL: "\u0422\u0435\u043A\u0441\u0442 \u043A\u043D\u043E\u043F\u043A\u0438 \u041D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E",
  FLASHCARD_HARD_LABEL: "\u0422\u0435\u043A\u0441\u0442 \u043A\u043D\u043E\u043F\u043A\u0438 \u0421\u043B\u043E\u0436\u043D\u043E",
  FLASHCARD_EASY_DESC: '\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u044F\u0440\u043B\u044B\u043A \u0434\u043B\u044F \u043A\u043D\u043E\u043F\u043A\u0438 "\u041B\u0435\u0433\u043A\u043E"',
  FLASHCARD_GOOD_DESC: '\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u044F\u0440\u043B\u044B\u043A \u0434\u043B\u044F \u043A\u043D\u043E\u043F\u043A\u0438 "\u041D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E"',
  FLASHCARD_HARD_DESC: '\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u044F\u0440\u043B\u044B\u043A \u0434\u043B\u044F \u043A\u043D\u043E\u043F\u043A\u0438 "\u0421\u043B\u043E\u0436\u043D\u043E"',
  FLASHCARD_TAGS: "\u0422\u044D\u0433\u0438 \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A",
  FLASHCARD_TAGS_DESC: "\u0412\u0435\u0434\u0438\u0442\u0435 \u0442\u044D\u0433\u0438 \u0440\u0430\u0437\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u0435 Enter-\u043E\u043C \u0438\u043B\u0438 \u043F\u0440\u043E\u0431\u0435\u043B\u043E\u043C, \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: #flashcards #deck2 #deck3.",
  CONVERT_FOLDERS_TO_DECKS: "\u041A\u043E\u043D\u0432\u0435\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0430\u043F\u043A\u0438 \u0432 \u0443\u0440\u043E\u0432\u043D\u0438 \u0438 \u043F\u043E\u0434\u0443\u0440\u043E\u0432\u043D\u0438?",
  CONVERT_FOLDERS_TO_DECKS_DESC: "\u042D\u0442\u043E \u0430\u043B\u044C\u0442\u0435\u0440\u043D\u0430\u0442\u0438\u0432\u0430 \u0442\u044D\u0433\u0430\u043C \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A, \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u0441\u0432\u0435\u0440\u0445\u0443.",
  INLINE_SCHEDULING_COMMENTS: "\u0421\u043E\u0445\u0440\u0430\u043D\u044F\u0442\u044C \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u043D\u0430 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0439 \u0441\u0442\u0440\u043E\u043A\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438?",
  INLINE_SCHEDULING_COMMENTS_DESC: "\u0412\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u044D\u0442\u043E\u0439 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0441\u0434\u0435\u043B\u0430\u0435\u0442 \u0442\u0430\u043A, \u0447\u0442\u043E HTML \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438 \u043D\u0435 \u0431\u0443\u0434\u0443\u0442 \u043B\u043E\u043C\u0430\u0442\u044C \u0444\u043E\u0440\u043C\u0430\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0441\u043F\u0438\u0441\u043A\u0430.",
  BURY_SIBLINGS_TILL_NEXT_DAY: "\u041F\u0440\u044F\u0442\u0430\u0442\u044C \u0440\u043E\u0434\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u0434\u043E \u0441\u043B\u0435\u0434. \u0434\u043D\u044F?",
  BURY_SIBLINGS_TILL_NEXT_DAY_DESC: "\u0420\u043E\u0434\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 - \u0442\u0435, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u044B \u0438\u0437 \u043E\u0434\u043D\u043E\u0433\u043E \u0442\u0435\u043A\u0441\u0442\u0430, \u043F\u0440\u0438\u043C\u0435\u0440: \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u0441 \u043F\u0440\u043E\u043F\u0443\u0441\u043A\u0430\u043C\u0438 ([...])",
  SHOW_CARD_CONTEXT: "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442(\u0443\u0440\u043E\u0432\u0435\u043D\u044C) \u0432 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430\u0445(\u0432\u043E \u0432\u0440\u0435\u043C\u044F \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F)?",
  SHOW_CARD_CONTEXT_DESC: "\u043F\u0440\u0438\u043C\u0435\u0440: Title > Heading 1 > Subheading > ... > Subheading",
  CARD_MODAL_HEIGHT_PERCENT: "\u0412\u044B\u0441\u043E\u0442\u0430 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u0432\u043F\u0440\u043E\u0446\u0435\u043D\u0442\u0430\u0445",
  CARD_MODAL_SIZE_PERCENT_DESC: "\u0415\u0441\u043B\u0438 \u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0435\u0441\u044C \u043C\u043E\u0431\u0438\u043B\u044C\u043D\u044B\u043C \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u043E\u043C, \u0432\u044B\u0441\u0442\u0430\u0432\u044C\u0442\u0435 100% \u0438\u043B\u0438 \u0443 \u0432\u0430\u0441 \u0431\u0443\u0434\u0443\u0442 \u043E\u0433\u0440\u043E\u043C\u043D\u044B\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",
  RESET_DEFAULT: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E",
  CARD_MODAL_WIDTH_PERCENT: "\u0428\u0438\u0440\u0438\u043D\u0430 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u0432 \u043F\u0440\u043E\u0446\u0435\u043D\u0442\u0430\u0445",
  RANDOMIZE_CARD_ORDER: "\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439 \u043F\u043E\u0440\u044F\u0434\u043E\u043A \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A \u0432\u043E \u0432\u0440\u0435\u043C\u044F \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F?",
  DISABLE_CLOZE_CARDS: "\u0412\u044B\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u044B \u0441 \u043F\u0440\u043E\u043F\u0443\u0441\u043A\u0430\u043C\u0438 (\u043F\u0440\u0438\u043C\u0435\u0440: [...])?",
  CONVERT_HIGHLIGHTS_TO_CLOZES: "\u041A\u043E\u043D\u0432\u0435\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C ==\u0432\u044B\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442== \u0432 \u043F\u0440\u043E\u043F\u0443\u0441\u043A\u0438 (\u043F\u0440\u0438\u043C\u0435\u0440: [...])?",
  CONVERT_BOLD_TEXT_TO_CLOZES: "\u041A\u043E\u043D\u0432\u0435\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C **\u0436\u0438\u0440\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442** \u0432 \u043F\u0440\u043E\u043F\u0443\u0441\u043A\u0438 (\u043F\u0440\u0438\u043C\u0435\u0440: [...])?",
  CONVERT_CURLY_BRACKETS_TO_CLOZES: "\u041A\u043E\u043D\u0432\u0435\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C {{\u0444\u0438\u0433\u0443\u0440\u043D\u044B\u0435 \u0441\u043A\u043E\u0431\u043A\u0438}} \u0432 \u043F\u0440\u043E\u043F\u0443\u0441\u043A\u0438 (\u043F\u0440\u0438\u043C\u0435\u0440: [...])?",
  INLINE_CARDS_SEPARATOR: "\u0420\u0430\u0437\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u044C \u0434\u043B\u044F \u0432\u043D\u0443\u0442\u0440\u0438\u0441\u0442\u0440\u043E\u0447\u043D\u044B\u0445 \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A",
  FIX_SEPARATORS_MANUALLY_WARNING: "\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435! \u041F\u043E\u0441\u043B\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u044D\u0442\u043E\u0433\u043E \u0432\u0430\u043C \u043F\u0440\u0438\u0434\u0451\u0442\u0441\u044F \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438",
  INLINE_REVERSED_CARDS_SEPARATOR: "\u0420\u0430\u0437\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u044C \u0434\u043B\u044F \u043E\u0431\u0440\u0430\u0442\u043D\u044B\u0445 \u0432\u043D\u0443\u0442\u0440\u0438\u0441\u0442\u0440\u043E\u0447\u043D\u044B\u0445 \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A",
  MULTILINE_CARDS_SEPARATOR: "\u0420\u0430\u0437\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u044C \u0434\u043B\u044F \u043C\u043D\u043E\u0433\u043E\u0441\u0442\u0440\u043E\u0447\u043D\u044B\u0445 \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A",
  MULTILINE_REVERSED_CARDS_SEPARATOR: "\u0420\u0430\u0437\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u044C \u0434\u043B\u044F \u043E\u0431\u0440\u0430\u0442\u043D\u044B\u0445 \u043C\u043D\u043E\u0433\u043E\u0441\u0442\u0440\u043E\u0447\u043D\u044B\u0445 \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A",
  NOTES: "\u0417\u0430\u043C\u0435\u0442\u043A\u0438",
  REVIEW_PANE_ON_STARTUP: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043F\u0430\u043D\u0435\u043B\u044C \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F \u043F\u0440\u0438 \u0437\u0430\u043F\u0443\u0441\u043A\u0435 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u044B",
  TAGS_TO_REVIEW: "\u0422\u044D\u0433\u0438 \u0434\u043B\u044F \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F",
  TAGS_TO_REVIEW_DESC: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u044D\u0433\u0438, \u0440\u0430\u0437\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u0435 Enter-\u0430\u043C\u0438 \u0438\u043B\u0438 \u043F\u0440\u043E\u0431\u0435\u043B\u0430\u043C\u0438, \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: #review #tag2 #tag3.",
  OPEN_RANDOM_NOTE: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u0443\u044E \u0437\u0430\u043C\u0435\u0442\u043A\u0443 \u0434\u043B\u044F \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F",
  OPEN_RANDOM_NOTE_DESC: "\u0415\u0441\u043B\u0438 \u0432\u044B\u043A\u043B\u044E\u0447\u0438\u0442\u044C, \u0442\u043E \u0437\u0430\u043C\u0435\u0442\u043A\u0438 \u0431\u0443\u0434\u0443\u0442 \u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u044C \u043F\u043E \u0432\u0430\u0436\u043D\u043E\u0441\u0442\u0438 (PageRank).",
  AUTO_NEXT_NOTE: "\u041F\u043E\u0441\u043B\u0435 \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0443\u044E \u0437\u0430\u043C\u0435\u0442\u043A\u0443",
  DISABLE_FILE_MENU_REVIEW_OPTIONS: "\u0412\u044B\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0432\u044B\u0431\u043E\u0440 \u0441\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F \u0432 \u043C\u0435\u043D\u044E \u0444\u0430\u0439\u043B\u0430, \u0442.\u0435.: \u041F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0435: \u041B\u0435\u0433\u043A\u043E \u041D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E \u0421\u043B\u043E\u0436\u043D\u043E",
  DISABLE_FILE_MENU_REVIEW_OPTIONS_DESC: "\u041F\u043E\u0441\u043B\u0435 \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0432\u044B \u0441\u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u043E\u0432\u0442\u043E\u0440\u044F\u0442\u044C \u043F\u0440\u0438 \u043F\u043E\u043C\u043E\u0449\u0438 \u0445\u043E\u0442\u043A\u0435\u0435\u0432. \u041F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 Obsidian \u043F\u043E\u0441\u043B\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u044D\u0442\u043E\u0433\u043E.",
  MAX_N_DAYS_REVIEW_QUEUE: "\u041D\u0430\u0438\u0431\u043E\u043B\u044C\u0448\u0435\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0434\u043D\u0435\u0439 \u0434\u043B\u044F \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u043D\u0430 \u043F\u0430\u043D\u0435\u043B\u0438 \u0441\u043F\u0440\u0430\u0432\u0430",
  MIN_ONE_DAY: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0434\u043D\u0435\u0439 \u043D\u0435 \u043C\u0435\u043D\u044C\u0448\u0435 1.",
  VALID_NUMBER_WARNING: "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u043E\u0434\u0445\u043E\u0434\u044F\u0449\u0435\u0435 \u0447\u0438\u0441\u043B\u043E.",
  UI_PREFERENCES: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441 \u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE: "\u0414\u0435\u0440\u0435\u0432\u044C\u044F \u043A\u043E\u043B\u043E\u0434 \u0434\u043E\u043B\u0436\u043D\u044B \u0438\u0437\u043D\u0430\u0447\u0430\u043B\u044C\u043D\u043E \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0442\u044C\u0441\u044F \u043A\u0430\u043A \u0440\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044B\u0435",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE_DESC: "\u041E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u044D\u0442\u043E\u0442 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440, \u0447\u0442\u043E\u0431\u044B \u0441\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0432\u043B\u043E\u0436\u0435\u043D\u043D\u044B\u0435 \u043A\u043E\u043B\u043E\u0434\u044B \u043D\u0430 \u043E\u0434\u043D\u043E\u0439 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0435. \u041F\u043E\u043B\u0435\u0437\u043D\u043E, \u0435\u0441\u043B\u0438 \u0443 \u0432\u0430\u0441 \u0435\u0441\u0442\u044C \u043A\u0430\u0440\u0442\u044B, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043F\u0440\u0438\u043D\u0430\u0434\u043B\u0435\u0436\u0430\u0442 \u043C\u043D\u043E\u0433\u0438\u043C \u043A\u043E\u043B\u043E\u0434\u0430\u043C \u0432 \u043E\u0434\u043D\u043E\u043C \u0444\u0430\u0439\u043B\u0435.",
  ALGORITHM: "\u0410\u043B\u0433\u043E\u0440\u0438\u0442\u043C",
  CHECK_ALGORITHM_WIKI: '\u0417\u0430 \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0435\u0439 \u043E\u0431\u0440\u0430\u0449\u0430\u0439\u0442\u0435\u0441\u044C \u043A <a href="${algo_url}">\u0440\u0435\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u0430</a>.',
  BASE_EASE: "\u0411\u0430\u0437\u043E\u0432\u0430\u044F \u041B\u0451\u0433\u043A\u043E\u0441\u0442\u044C",
  BASE_EASE_DESC: "\u043C\u0438\u043D\u0438\u043C\u0443\u043C = 130, \u043F\u0440\u0435\u0434\u043F\u043E\u0447\u0442\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u043E\u043A\u043E\u043B\u043E 250.",
  BASE_EASE_MIN_WARNING: "\u041B\u0451\u0433\u043A\u043E\u0441\u0442\u044C \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C \u043C\u0438\u043D\u0438\u043C\u0443\u043C 130.",
  LAPSE_INTERVAL_CHANGE: "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u043F\u0440\u043E\u043C\u0435\u0436\u0443\u0442\u043A\u0430 \u043A\u043E\u0433\u0434\u0430 \u0432\u044B \u043E\u0442\u0432\u0435\u0447\u0430\u0435\u0442\u0435 \u0421\u043B\u043E\u0436\u043D\u043E \u0432\u043E \u0432\u0440\u0435\u043C\u044F \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438/\u0437\u0430\u043C\u0435\u0442\u043A\u0438",
  LAPSE_INTERVAL_CHANGE_DESC: "\u043D\u043E\u0432\u044B\u0439\u041F\u0440\u043E\u043C\u0435\u0436\u0443\u0442\u043E\u043A = \u0441\u0442\u0430\u0440\u044B\u0439\u041F\u0440\u043E\u043C\u0435\u0436\u0443\u0442\u043E\u043A * \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435\u041F\u0440\u043E\u043C\u0435\u0436\u0443\u0442\u043A\u0430 / 100.",
  EASY_BONUS: "\u041B\u0435\u0433\u043A\u043E: \u0431\u043E\u043D\u0443\u0441",
  EASY_BONUS_DESC: "\u0411\u043E\u043D\u0443\u0441 \u0437\u0430 \u041B\u0435\u0433\u043A\u043E \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u0432\u0430\u043C \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0440\u0430\u0437\u043D\u0438\u0446\u0443 \u0432 \u043F\u0440\u043E\u043C\u0435\u0436\u0443\u0442\u043A\u0430\u0445 \u043C\u0435\u0436\u0434\u0443 \u043E\u0442\u0432\u0435\u0442\u0430\u043C\u0438 \u0425\u043E\u0440\u043E\u0448\u043E \u0438 \u041B\u0435\u0433\u043A\u043E \u043D\u0430 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0435/\u0437\u0430\u043C\u0435\u0442\u043A\u0435 (\u043C\u0438\u043D. = 100%).",
  EASY_BONUS_MIN_WARNING: "\u0411\u043E\u043D\u0443\u0441 \u0437\u0430 \u041B\u0435\u0433\u043A\u043E \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u044C\u0448\u0435 100.",
  MAX_INTERVAL: "Maximum interval in days",
  MAX_INTERVAL_DESC: "\u041F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u0432\u0430\u043C \u0443\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0442\u044C \u0432\u0435\u0440\u0445\u043D\u044E\u044E \u0433\u0440\u0430\u043D\u0438\u0446\u0443 \u043D\u0430 \u043F\u0440\u043E\u043C\u0435\u0436\u0443\u0442\u043E\u043A (\u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E = 100 \u043B\u0435\u0442).",
  MAX_INTERVAL_MIN_WARNING: "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u043F\u0440\u043E\u043C\u0435\u0436\u0443\u0442\u043E\u043A \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u044C\u0448\u0435 1.",
  MAX_LINK_CONTRIB: "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0432\u043A\u043B\u0430\u0434 \u0441\u0432\u044F\u0437\u0438 (\u0441\u0441\u044B\u043B\u043A\u0438)",
  MAX_LINK_CONTRIB_DESC: "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0432\u043A\u043B\u0430\u0434 \u0432\u0437\u0432\u0435\u0448\u0435\u043D\u043D\u043E\u0439 \u041B\u0451\u0433\u043A\u043E\u0441\u0442\u0438 \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0445 \u0437\u0430\u043C\u0435\u0442\u043E\u043A \u0432 \u043D\u0430\u0447\u0430\u043B\u044C\u043D\u0443\u044E \u041B\u0451\u0433\u043A\u043E\u0441\u0442\u044C.",
  LOGGING: "\u0412\u0435\u0434\u0435\u043D\u0438\u0435 \u043B\u043E\u0433\u0430",
  DISPLAY_DEBUG_INFO: "\u041E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0442\u044C \u043E\u0442\u043B\u0430\u0434\u043E\u0447\u043D\u0443\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u0432 \u043A\u043E\u043D\u0441\u043E\u043B\u0435 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u0430 (developer console)?",
  // sidebar.ts
  NOTES_REVIEW_QUEUE: "\u041E\u0447\u0435\u0440\u0435\u0434\u044C \u0437\u0430\u043C\u0435\u0442\u043E\u043A \u043D\u0430 \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0435",
  CLOSE: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C",
  NEW: "\u041D\u043E\u0432\u044B\u0435",
  YESTERDAY: "\u0412\u0447\u0435\u0440\u0430\u0448\u043D\u0438\u0435",
  TODAY: "\u0421\u0435\u0433\u043E\u0434\u043D\u044F\u0448\u043D\u0438\u0435",
  TOMORROW: "\u0417\u0430\u0432\u0442\u0440\u0430\u0448\u043D\u0438\u0435",
  // stats-modal.tsx
  STATS_TITLE: "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430",
  MONTH: "\u041C\u0435\u0441\u044F\u0446",
  QUARTER: "\u0427\u0435\u0442\u0432\u0435\u0440\u0442\u044C",
  YEAR: "\u0413\u043E\u0434",
  LIFETIME: "\u0412\u0441\u0451 \u0432\u0440\u0435\u043C\u044F",
  FORECAST: "\u041F\u0440\u043E\u0433\u043D\u043E\u0437",
  FORECAST_DESC: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A \u043F\u0440\u0435\u0434\u0441\u0442\u043E\u044F\u0449\u0438\u0445 \u0432 \u0431\u0443\u0434\u0443\u0449\u0435\u043C",
  SCHEDULED: "\u0417\u0430\u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043E",
  DAYS: "\u0414\u043D\u0435\u0439",
  NUMBER_OF_CARDS: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A",
  REVIEWS_PER_DAY: "\u0421\u0440\u0435\u0434\u043D\u0435\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E: ${avg} \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0439 \u0432 \u0434\u0435\u043D\u044C",
  //!!!
  INTERVALS: "\u0418\u043D\u0442\u0435\u0440\u0432\u0430\u043B\u044B",
  INTERVALS_DESC: "\u041F\u0440\u043E\u043C\u0435\u0436\u0443\u0442\u043A\u0438 \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u0434\u043E \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0433\u043E \u043F\u043E\u043A\u0430\u0437\u0430 \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A \u0432\u043E \u0432\u0440\u0435\u043C\u044F \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F",
  COUNT: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E",
  INTERVALS_SUMMARY: "\u0421\u0440\u0435\u0434\u043D\u0438\u0439 \u043F\u0440\u043E\u043C\u0435\u0436\u0443\u0442\u043E\u043A: ${avg}, \u0421\u0430\u043C\u044B\u0439 \u0434\u043B\u0438\u043D\u043D\u044B\u0439 \u043F\u0440\u043E\u043C\u0435\u0436\u0443\u0442\u043E\u043A: ${longest}",
  EASES: "\u041B\u0451\u0433\u043A\u043E\u0441\u0442\u044C (\u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 \u0432 \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u0435, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0432\u043B\u0438\u044F\u0435\u0442 \u043D\u0430 \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442 \u0438 \u0432\u0440\u0435\u043C\u044F \u043F\u043E\u043A\u0430\u0437\u0430 \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A) \n (\u043E\u0442 \u0430\u043D\u0433\u043B. ease, \u0441\u043C. \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u0430)",
  EASES_SUMMARY: "\u0421\u0440\u0435\u0434\u043D\u0435\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u041B\u0451\u0433\u043A\u043E\u0441\u0442\u0438: ${avgEase}",
  CARD_TYPES: "\u0422\u0438\u043F\u044B \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A",
  CARD_TYPES_DESC: "\u0412\u043A\u043B\u044E\u0447\u0430\u044F \u0441\u043F\u0440\u044F\u0442\u0430\u043D\u043D\u044B\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438, \u0435\u0441\u043B\u0438 \u0442\u0430\u043A\u0438\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0442.",
  CARD_TYPE_NEW: "\u041D\u043E\u0432\u044B\u0445",
  CARD_TYPE_YOUNG: "\u041C\u043E\u043B\u043E\u0434\u044B\u0445",
  CARD_TYPE_MATURE: "\u0412\u0437\u0440\u043E\u0441\u043B\u044B\u0445",
  CARD_TYPES_SUMMARY: "\u0412\u0441\u0435\u0433\u043E \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A: ${totalCardsCount}"
};

// src/lang/locale/ta.ts
var ta_default = {};

// src/lang/locale/te.ts
var te_default = {};

// src/lang/locale/th.ts
var th_default = {};

// src/lang/locale/tr.ts
var tr_default = {};

// src/lang/locale/uk.ts
var uk_default = {};

// src/lang/locale/ur.ts
var ur_default = {};

// src/lang/locale/vi.ts
var vi_default = {};

// src/lang/locale/zh-cn.ts
var zh_cn_default = {
  // flashcard-modal.tsx
  DECKS: "\u5361\u7EC4",
  DUE_CARDS: "\u5230\u671F\u5361\u7247",
  NEW_CARDS: "\u65B0\u5361\u7247",
  TOTAL_CARDS: "\u5168\u90E8\u5361\u7247",
  BACK: "\u8FD4\u56DE",
  SKIP: "\u7565\u8FC7",
  EDIT_CARD: "\u7F16\u8F91\u5361\u7247",
  RESET_CARD_PROGRESS: "\u91CD\u7F6E\u5361\u7247",
  HARD: "\u8F83\u96BE",
  GOOD: "\u8BB0\u5F97",
  EASY: "\u7B80\u5355",
  SHOW_ANSWER: "\u663E\u793A\u7B54\u6848",
  CARD_PROGRESS_RESET: "\u5361\u7247\u5DF2\u88AB\u91CD\u7F6E\u3002",
  SAVE: "\u50A8\u5B58",
  CANCEL: "\u53D6\u6D88",
  NO_INPUT: "\u6CA1\u6709\u63D0\u4F9B\u8F93\u5165\u3002",
  CURRENT_EASE_HELP_TEXT: "\u76EE\u524D\u638C\u63E1\u7A0B\u5EA6\uFF1A",
  CURRENT_INTERVAL_HELP_TEXT: "\u76EE\u524D\u95F4\u9694\uFF1A",
  CARD_GENERATED_FROM: "\u751F\u6210\u81EA\uFF1A${notePath}",
  // main.ts
  OPEN_NOTE_FOR_REVIEW: "\u6253\u5F00\u4E00\u4E2A\u7B14\u8BB0\u5F00\u59CB\u590D\u4E60",
  REVIEW_CARDS: "\u590D\u4E60\u5361\u7247",
  REVIEW_EASY_FILE_MENU: "\u590D\u4E60\uFF1A\u7B80\u5355",
  REVIEW_GOOD_FILE_MENU: "\u590D\u4E60\uFF1A\u8BB0\u5F97",
  REVIEW_HARD_FILE_MENU: "\u590D\u4E60\uFF1A\u8F83\u96BE",
  REVIEW_NOTE_EASY_CMD: "\u6807\u8BB0\u4E3A\u201C\u7B80\u5355\u201D",
  REVIEW_NOTE_GOOD_CMD: "\u6807\u8BB0\u4E3A\u201C\u8BB0\u5F97\u201D",
  REVIEW_NOTE_HARD_CMD: "\u6807\u8BB0\u4E3A\u201C\u8F83\u96BE\u201D",
  REVIEW_ALL_CARDS: "\u590D\u4E60\u6240\u6709\u7B14\u8BB0\u4E2D\u7684\u5361\u7247",
  CRAM_ALL_CARDS: "\u9009\u62E9\u8981\u96C6\u4E2D\u590D\u4E60\u7684\u5361\u7EC4",
  REVIEW_CARDS_IN_NOTE: "\u590D\u4E60\u6B64\u7B14\u8BB0\u4E2D\u7684\u5361\u7247",
  CRAM_CARDS_IN_NOTE: "\u96C6\u4E2D\u590D\u4E60\u6B64\u7B14\u8BB0\u4E2D\u7684\u5361\u7247",
  VIEW_STATS: "\u67E5\u770B\u6570\u636E",
  STATUS_BAR: "\u590D\u4E60: ${dueNotesCount} \u7B14\u8BB0, ${dueFlashcardsCount} \u5361\u7247\u5DF2\u5230\u671F",
  SYNC_TIME_TAKEN: "\u540C\u6B65\u65F6\u95F4 ${t}ms",
  NOTE_IN_IGNORED_FOLDER: "\u7B14\u8BB0\u4FDD\u5B58\u5728\u5DF2\u88AB\u5FFD\u7565\u7684\u8DEF\u5F84\u4E2D\uFF08\u68C0\u67E5\u8BBE\u7F6E\u9009\u9879\uFF09\u3002",
  PLEASE_TAG_NOTE: "\u8BF7\u5C06\u9700\u8981\u590D\u4E60\u7684\u7B14\u8BB0\u4E2D\u52A0\u5165\u6B63\u786E\u7684\u6807\u7B7E\uFF08\u68C0\u67E5\u8BBE\u7F6E\u9009\u9879\uFF09\u3002",
  RESPONSE_RECEIVED: "\u53CD\u9988\u5DF2\u6536\u5230",
  NO_DECK_EXISTS: "\u6CA1\u6709 ${deckName} \u5361\u7EC4",
  ALL_CAUGHT_UP: "\u90FD\u590D\u4E60\u5B8C\u5566\uFF0C\u4F60\u771F\u68D2\uFF01",
  // scheduling.ts
  DAYS_STR_IVL: "${interval}\u5929",
  MONTHS_STR_IVL: "${interval}\u6708",
  YEARS_STR_IVL: "${interval}\u5E74",
  DAYS_STR_IVL_MOBILE: "${interval}\u5929",
  MONTHS_STR_IVL_MOBILE: "${interval}\u6708",
  YEARS_STR_IVL_MOBILE: "${interval}\u5E74",
  // settings.ts
  SETTINGS_HEADER: "\u95F4\u9694\u91CD\u590D\u63D2\u4EF6 - \u8BBE\u7F6E",
  CHECK_WIKI: '\u4E86\u89E3\u66F4\u591A, \u8BF7\u70B9\u51FB<a href="${wiki_url}">wiki</a>.',
  FOLDERS_TO_IGNORE: "\u5FFD\u7565\u6B64\u6587\u4EF6\u5939",
  FOLDERS_TO_IGNORE_DESC: "\u8F93\u5165\u6587\u4EF6\u5939\u8DEF\u5F84\uFF0C\u7528\u65B0\u5EFA\u884C\u5206\u9694\uFF0C\u4F8B\u5982\uFF1ATemplates Meta/Scripts",
  FLASHCARDS: "\u5361\u7247",
  FLASHCARD_EASY_LABEL: "\u201C\u7B80\u5355\u201D\u6309\u94AE\u6587\u672C",
  FLASHCARD_GOOD_LABEL: "\u201C\u8BB0\u5F97\u201D\u6309\u94AE\u6587\u672C",
  FLASHCARD_HARD_LABEL: "\u201C\u8F83\u96BE\u201D\u6309\u94AE\u6587\u672C",
  FLASHCARD_EASY_DESC: "\u81EA\u5B9A\u4E49\u201C\u7B80\u5355\u201D\u6309\u94AE\u7684\u6807\u7B7E",
  FLASHCARD_GOOD_DESC: "\u81EA\u5B9A\u4E49\u201C\u8BB0\u5F97\u201D\u6309\u94AE\u7684\u6807\u7B7E",
  FLASHCARD_HARD_DESC: "\u81EA\u5B9A\u4E49\u201C\u8F83\u96BE\u201D\u6309\u94AE\u7684\u6807\u7B7E",
  FLASHCARD_TAGS: "\u5361\u7247\u6807\u7B7E",
  FLASHCARD_TAGS_DESC: "\u8F93\u5165\u6807\u7B7E\uFF0C\u7528\u7A7A\u683C\u6216\u65B0\u5EFA\u884C\u5206\u9694\uFF0C\u4F8B\u5982\uFF1A#flashcards #deck2 #deck3.",
  CONVERT_FOLDERS_TO_DECKS: "\u662F\u5426\u5C06\u6587\u4EF6\u5939\u5185\u5BB9\u8F6C\u6362\u4E3A\u5361\u7247\u7EC4\u548C\u5B50\u5361\u7247\u7EC4\uFF1F",
  CONVERT_FOLDERS_TO_DECKS_DESC: "\u6B64\u9009\u9879\u4E3A\u5361\u7247\u6807\u7B7E\u9009\u9879\u7684\u66FF\u4EE3\u9009\u9879\u3002",
  INLINE_SCHEDULING_COMMENTS: "\u662F\u5426\u5C06\u8BA1\u5212\u91CD\u590D\u65F6\u95F4\u4FDD\u5B58\u5728\u5361\u7247\u6700\u540E\u4E00\u884C\u7684\u540C\u4E00\u884C\uFF1F",
  INLINE_SCHEDULING_COMMENTS_DESC: "HTML\u6CE8\u91CA\u4E0D\u518D\u7834\u574F\u5217\u8868\u683C\u5F0F",
  BURY_SIBLINGS_TILL_NEXT_DAY: "\u5C06\u5173\u8054\u5361\u7247\u9690\u85CF\u81F3\u4E0B\u4E00\u5929\uFF1F",
  BURY_SIBLINGS_TILL_NEXT_DAY_DESC: "\u5173\u8054\u5361\u7247\u662F\u6765\u81EA\u540C\u4E00\u5361\u7247\u7684\u4E0D\u540C\u5F62\u5F0F\uFF0C \u4F8B\u5982\uFF1A\u5B8C\u5F62\u586B\u7A7A\u5361\u7247",
  SHOW_CARD_CONTEXT: "\u5728\u5361\u7247\u4E2D\u663E\u793A\u4E0A\u4E0B\u6587\uFF1F",
  SHOW_CARD_CONTEXT_DESC: "\u4F8B\u5982\uFF1A\u6807\u9898 > \u526F\u6807\u9898 > \u5C0F\u6807\u9898 > ... > \u5C0F\u6807\u9898",
  CARD_MODAL_HEIGHT_PERCENT: "\u5361\u7247\u9AD8\u5EA6\u767E\u5206\u6BD4",
  CARD_MODAL_SIZE_PERCENT_DESC: "\u8BF7\u5728\u79FB\u52A8\u7AEF\u4F7F\u7528\u5E76\u9700\u8981\u6D4F\u89C8\u8F83\u5927\u56FE\u7247\u65F6\u8BBE\u4E3A100%",
  RESET_DEFAULT: "\u91CD\u7F6E\u4E3A\u9ED8\u8BA4",
  CARD_MODAL_WIDTH_PERCENT: "\u5361\u7247\u5BBD\u5EA6\u767E\u5206\u6BD4",
  RANDOMIZE_CARD_ORDER: "\u590D\u4E60\u65F6\u968F\u673A\u663E\u793A\u5361\u7247\uFF1F",
  DISABLE_CLOZE_CARDS: "\u4E0D\u8FDB\u884C\u5B8C\u5F62\u586B\u7A7A\uFF1F",
  CONVERT_HIGHLIGHTS_TO_CLOZES: "\u5C06 ==\u9AD8\u4EAE== \u8F6C\u6362\u4E3A\u5B8C\u5F62\u586B\u7A7A\uFF1F",
  CONVERT_BOLD_TEXT_TO_CLOZES: "\u5C06 **\u7C97\u4F53** \u8F6C\u6362\u4E3A\u5B8C\u5F62\u586B\u7A7A\uFF1F",
  CONVERT_CURLY_BRACKETS_TO_CLOZES: "\u5C06 {{\u5927\u62EC\u53F7}} \u8F6C\u6362\u4E3A\u5B8C\u5F62\u586B\u7A7A\uFF1F",
  INLINE_CARDS_SEPARATOR: "\u5355\u884C\u5361\u7247\u7684\u5206\u9694\u7B26",
  FIX_SEPARATORS_MANUALLY_WARNING: "\u6CE8\u610F\uFF1A\u66F4\u6539\u6B64\u9009\u9879\u540E\u4F60\u5C06\u9700\u8981\u81EA\u884C\u66F4\u6539\u5DF2\u5B58\u5728\u5361\u7247\u7684\u5206\u9694\u7B26\u3002",
  INLINE_REVERSED_CARDS_SEPARATOR: "\u5355\u884C\u7FFB\u8F6C\u5361\u7247\u7684\u5206\u9694\u7B26",
  MULTILINE_CARDS_SEPARATOR: "\u591A\u884C\u5361\u7247\u7684\u5206\u9694\u7B26",
  MULTILINE_REVERSED_CARDS_SEPARATOR: "\u591A\u884C\u7FFB\u8F6C\u5361\u7247\u7684\u5206\u9694\u7B26",
  NOTES: "\u7B14\u8BB0",
  REVIEW_PANE_ON_STARTUP: "\u542F\u52A8\u65F6\u5F00\u542F\u7B14\u8BB0\u590D\u4E60\u7A97\u683C",
  TAGS_TO_REVIEW: "\u590D\u4E60\u6807\u7B7E",
  TAGS_TO_REVIEW_DESC: "\u8F93\u5165\u6807\u7B7E\uFF0C\u7528\u7A7A\u683C\u6216\u65B0\u5EFA\u884C\u5206\u9694\uFF0C\u4F8B\u5982\uFF1A#review #tag2 #tag3.",
  OPEN_RANDOM_NOTE: "\u590D\u4E60\u968F\u673A\u7B14\u8BB0",
  OPEN_RANDOM_NOTE_DESC: "\u5173\u95ED\u6B64\u9009\u9879\uFF0C\u7B14\u8BB0\u5C06\u4EE5\u91CD\u8981\u5EA6(PageRank)\u6392\u5E8F\u3002",
  AUTO_NEXT_NOTE: "\u590D\u4E60\u540E\u81EA\u52A8\u6253\u5F00\u4E0B\u4E00\u4E2A\u7B14\u8BB0",
  DISABLE_FILE_MENU_REVIEW_OPTIONS: "\u5173\u95ED\u6587\u4EF6\u9009\u5355\u4E2D\u7684\u590D\u4E60\u9009\u9879 \u4F8B\u5982\uFF1A\u590D\u4E60\uFF1A\u7B80\u5355 \u8BB0\u5F97 \u8F83\u96BE",
  DISABLE_FILE_MENU_REVIEW_OPTIONS_DESC: "\u5173\u95ED\u6B64\u9009\u9879\u540E\u4F60\u53EF\u4EE5\u4F7F\u7528\u5FEB\u6377\u952E\u5F00\u59CB\u590D\u4E60\u3002\u91CD\u65B0\u542F\u52A8Obsidian\u4F7F\u672C\u9009\u9879\u751F\u6548\u3002",
  MAX_N_DAYS_REVIEW_QUEUE: "\u53F3\u8FB9\u680F\u4E2D\u663E\u793A\u7684\u6700\u5927\u5929\u6570",
  MIN_ONE_DAY: "\u5929\u6570\u6700\u5C0F\u503C\u4E3A1",
  VALID_NUMBER_WARNING: "\u8BF7\u8F93\u5165\u6709\u6548\u7684\u6570\u5B57\u3002",
  UI_PREFERENCES: "\u7528\u6237\u754C\u9762\u9996\u9009\u9879",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE: "\u7532\u677F\u6811\u6700\u521D\u5E94\u663E\u793A\u4E3A\u5C55\u5F00",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE_DESC: "\u5173\u95ED\u6B64\u9009\u9879\u53EF\u6298\u53E0\u540C\u4E00\u5F20\u5361\u7247\u4E2D\u7684\u5D4C\u5957\u724C\u7EC4\u3002\u5982\u679C\u60A8\u7684\u5361\u7247\u5C5E\u4E8E\u540C\u4E00\u6587\u4EF6\u4E2D\u7684\u8BB8\u591A\u5957\u724C\uFF0C\u5219\u5F88\u6709\u7528\u3002",
  ALGORITHM: "\u7B97\u6CD5",
  CHECK_ALGORITHM_WIKI: '\u4E86\u89E3\u66F4\u591A, \u8BF7\u70B9\u51FB<a href="${algo_url}">\u7B97\u6CD5\u5B9E\u73B0</a>.',
  BASE_EASE: "\u57FA\u7840\u638C\u63E1\u7A0B\u5EA6",
  BASE_EASE_DESC: "\u6700\u5C0F\u503C130\uFF0C\u63A8\u8350\u503C\u7EA6250.",
  BASE_EASE_MIN_WARNING: "\u57FA\u7840\u638C\u63E1\u7A0B\u5EA6\u7684\u6700\u5C0F\u503C\u4E3A130\u3002",
  LAPSE_INTERVAL_CHANGE: "\u5C06\u590D\u4E60\u65F6\u6807\u6CE8\u4E3A\u201C\u8F83\u96BE\u201D\u7684\u5361\u7247\u6216\u7B14\u8BB0\u590D\u4E60\u95F4\u9694\u7F29\u77ED",
  LAPSE_INTERVAL_CHANGE_DESC: "\u65B0\u590D\u4E60\u95F4\u9694 = \u539F\u590D\u4E60\u95F4\u9694 * \u95F4\u9694\u6539\u53D8\u7CFB\u6570 / 100.",
  EASY_BONUS: "\u7B80\u5355\u5956\u52B1",
  EASY_BONUS_DESC: "\u7B80\u5355\u5956\u52B1\u8BBE\u5B9A\u201C\u8BB0\u5F97\u201D\u548C\u201C\u7B80\u5355\u201D\u5361\u7247\u6216\u7B14\u8BB0\u7684\u590D\u4E60\u95F4\u9694\u5DEE\u8DDD\uFF08\u6700\u5C0F\u503C100%\uFF09\u3002",
  EASY_BONUS_MIN_WARNING: "\u7B80\u5355\u5956\u52B1\u81F3\u5C11\u4E3A100\u3002",
  MAX_INTERVAL: "\u6700\u5927\u95F4\u9694\uFF08\u5929\uFF09",
  MAX_INTERVAL_DESC: "\u8BBE\u5B9A\u590D\u4E60\u7684\u6700\u5927\u95F4\u9694\u65F6\u95F4\uFF08\u9ED8\u8BA4\u503C100\u5E74\uFF09\u3002",
  MAX_INTERVAL_MIN_WARNING: "\u6700\u5927\u95F4\u9694\u81F3\u5C11\u4E3A1\u5929",
  MAX_LINK_CONTRIB: "\u6700\u5927\u94FE\u63A5\u6536\u76CA",
  MAX_LINK_CONTRIB_DESC: "\u94FE\u63A5\u7B14\u8BB0\u7684\u52A0\u6743\u638C\u63E1\u7A0B\u5EA6\u5BF9\u539F\u59CB\u638C\u63E1\u7A0B\u5EA6\u7684\u6700\u5927\u8D21\u732E\u3002",
  LOGGING: "\u8BB0\u5F55\u4E2D",
  DISPLAY_DEBUG_INFO: "\u5728\u5F00\u53D1\u8005\u63A7\u5236\u53F0\u4E2D\u663E\u793A\u8C03\u8BD5\u4FE1\u606F\uFF1F",
  // sidebar.ts
  NOTES_REVIEW_QUEUE: "\u7B14\u8BB0\u590D\u4E60\u5E8F\u5217",
  CLOSE: "\u4E34\u8FD1",
  NEW: "\u65B0",
  YESTERDAY: "\u6628\u5929",
  TODAY: "\u4ECA\u5929",
  TOMORROW: "\u660E\u5929",
  // stats-modal.tsx
  STATS_TITLE: "\u6570\u636E",
  MONTH: "\u6708",
  QUARTER: "\u5B63",
  YEAR: "\u5E74",
  LIFETIME: "\u5168\u90E8",
  FORECAST: "\u9884\u671F",
  FORECAST_DESC: "\u5C06\u8981\u5230\u671F\u7684\u5361\u7247\u6570\u91CF",
  SCHEDULED: "\u5DF2\u6392\u671F",
  DAYS: "\u5929",
  NUMBER_OF_CARDS: "\u5361\u7247\u6570\u91CF",
  REVIEWS_PER_DAY: "\u5E73\u5747: \u590D\u4E60${avg} /\u5929",
  INTERVALS: "\u95F4\u9694",
  INTERVALS_DESC: "\u5230\u4E0B\u4E00\u6B21\u590D\u4E60\u7684\u65F6\u95F4\u95F4\u9694",
  COUNT: "\u8BA1\u6570",
  INTERVALS_SUMMARY: "\u5E73\u5747\u95F4\u9694\u65F6\u95F4: ${avg}, \u6700\u957F\u95F4\u9694\u65F6\u95F4: ${longest}",
  EASES: "\u638C\u63E1\u7A0B\u5EA6",
  EASES_SUMMARY: "\u5E73\u5747\u638C\u63E1\u7A0B\u5EA6: ${avgEase}",
  CARD_TYPES: "\u5361\u7247\u7C7B\u578B",
  CARD_TYPES_DESC: "\u5982\u6709\uFF0C\u5C06\u663E\u793A\u9690\u85CF\u7684\u5361\u7247",
  CARD_TYPE_NEW: "\u65B0",
  CARD_TYPE_YOUNG: "\u8F83\u65B0",
  CARD_TYPE_MATURE: "\u719F\u6089",
  CARD_TYPES_SUMMARY: "\u603B\u5361\u7247\u6570: ${totalCardsCount}"
};

// src/lang/locale/zh-tw.ts
var zh_tw_default = {
  // flashcard-modal.tsx
  DECKS: "\u724C\u7D44",
  DUE_CARDS: "\u5230\u671F\u5361\u7247",
  NEW_CARDS: "\u65B0\u5361\u7247",
  TOTAL_CARDS: "\u5168\u90E8\u5361\u7247",
  BACK: "\u8FD4\u56DE",
  SKIP: "\u7565\u904E",
  EDIT_CARD: "\u7DE8\u8F2F\u5361\u7247",
  RESET_CARD_PROGRESS: "\u91CD\u7F6E\u5361\u7247",
  HARD: "\u8F03\u96E3",
  GOOD: "\u8A18\u5F97",
  EASY: "\u7C21\u55AE",
  SHOW_ANSWER: "\u986F\u793A\u7B54\u6848",
  CARD_PROGRESS_RESET: "\u5361\u7247\u5DF2\u88AB\u91CD\u7F6E\u3002",
  SAVE: "\u5132\u5B58",
  CANCEL: "\u53D6\u6D88",
  NO_INPUT: "\u6C92\u6709\u63D0\u4F9B\u8F38\u5165\u3002",
  CURRENT_EASE_HELP_TEXT: "\u76EE\u524D\u638C\u63E1\u7A0B\u5EA6\uFF1A",
  CURRENT_INTERVAL_HELP_TEXT: "\u76EE\u524D\u9593\u9694\u6642\u9593\uFF1A",
  CARD_GENERATED_FROM: "\u751F\u6210\u81EA\uFF1A${notePath}",
  // main.ts
  OPEN_NOTE_FOR_REVIEW: "\u6253\u958B\u4E00\u500B\u7B46\u8A18\u958B\u59CB\u5FA9\u7FD2",
  REVIEW_CARDS: "\u5FA9\u7FD2\u5361\u7247",
  REVIEW_EASY_FILE_MENU: "\u5FA9\u7FD2\uFF1A\u7C21\u55AE",
  REVIEW_GOOD_FILE_MENU: "\u5FA9\u7FD2\uFF1A\u8A18\u5F97",
  REVIEW_HARD_FILE_MENU: "\u5FA9\u7FD2\uFF1A\u8F03\u96E3",
  REVIEW_NOTE_EASY_CMD: "\u6A19\u8A18\u70BA\u300C\u7C21\u55AE\u300D",
  REVIEW_NOTE_GOOD_CMD: "\u6A19\u8A18\u70BA\u300C\u8A18\u5F97\u300D",
  REVIEW_NOTE_HARD_CMD: "\u6A19\u8A18\u70BA\u300C\u8F03\u96E3\u300D",
  REVIEW_CARDS_IN_NOTE: "\u5FA9\u7FD2\u6B64\u7B46\u8A18\u4E2D\u7684\u5361\u7247",
  CRAM_ALL_CARDS: "\u9078\u64C7\u8981\u4E0D\u8A08\u96E3\u6613\u5EA6\u5FA9\u7FD2\u7684\u724C\u7D44",
  REVIEW_ALL_CARDS: "\u5FA9\u7FD2\u6240\u6709\u7B46\u8A18\u4E2D\u7684\u5361\u7247",
  CRAM_CARDS_IN_NOTE: "\u4E0D\u8A08\u96E3\u6613\u5EA6\u5FA9\u7FD2\u6B64\u7B46\u8A18\u4E2D\u7684\u5361\u7247",
  VIEW_STATS: "\u6AA2\u8996\u6578\u64DA",
  STATUS_BAR: "\u5FA9\u7FD2: ${dueNotesCount} \u7B46\u8A18, ${dueFlashcardsCount} \u5361\u7247\u5DF2\u5230\u671F",
  SYNC_TIME_TAKEN: "\u540C\u6B65\u6642\u9593 ${t}ms",
  NOTE_IN_IGNORED_FOLDER: "\u7B46\u8A18\u5132\u5B58\u5728\u5DF2\u88AB\u5FFD\u7565\u7684\u8DEF\u5F91\u4E2D\uFF08\u6AA2\u67E5\u8A2D\u5B9A\u9078\u9805\uFF09\u3002",
  PLEASE_TAG_NOTE: "\u8ACB\u5C07\u9700\u8981\u5FA9\u7FD2\u7684\u7B46\u8A18\u4E2D\u52A0\u5165\u6B63\u78BA\u7684\u6A19\u7C64\uFF08\u6AA2\u67E5\u8A2D\u5B9A\u9078\u9805\uFF09\u3002",
  RESPONSE_RECEIVED: "\u56DE\u994B\u5DF2\u6536\u5230",
  NO_DECK_EXISTS: "\u6C92\u6709 ${deckName} \u724C\u7D44",
  ALL_CAUGHT_UP: "\u90FD\u5FA9\u7FD2\u5B8C\u5566\uFF0C\u4F60\u771F\u68D2\uFF01",
  // scheduling.ts
  DAYS_STR_IVL: "${interval}\u5929",
  MONTHS_STR_IVL: "${interval}\u6708",
  YEARS_STR_IVL: "${interval}\u5E74",
  DAYS_STR_IVL_MOBILE: "${interval}\u5929",
  MONTHS_STR_IVL_MOBILE: "${interval}\u6708",
  YEARS_STR_IVL_MOBILE: "${interval}\u5E74",
  // settings.ts
  SETTINGS_HEADER: "\u9593\u9694\u91CD\u8907\u5916\u639B - \u8A2D\u5B9A",
  CHECK_WIKI: '\u77AD\u89E3\u66F4\u591A, \u8ACB\u9EDE\u9078<a href="${wiki_url}">wiki</a>.',
  FOLDERS_TO_IGNORE: "\u5FFD\u7565\u6B64\u8CC7\u6599\u593E",
  FOLDERS_TO_IGNORE_DESC: "\u8F38\u5165\u8CC7\u6599\u593E\u8DEF\u5F91\uFF08\u7528\u63DB\u884C\u5B57\u5143\u5206\u9694\uFF09\uFF0C\u4F8B\u5982\uFF1ATemplates Meta/Scripts",
  FLASHCARDS: "\u5361\u7247",
  FLASHCARD_EASY_LABEL: "\u7C21\u55AE\u6309\u9215\u6587\u5B57",
  FLASHCARD_GOOD_LABEL: "\u8A18\u5F97\u6309\u9215\u6587\u5B57",
  FLASHCARD_HARD_LABEL: "\u8F03\u96E3\u6309\u9215\u6587\u5B57",
  FLASHCARD_EASY_DESC: "\u81EA\u8A02\u300C\u7C21\u55AE\u300D\u6309\u9215\u7684\u6A19\u7C64",
  FLASHCARD_GOOD_DESC: "\u81EA\u8A02\u300C\u8A18\u5F97\u300D\u6309\u9215\u7684\u6A19\u7C64",
  FLASHCARD_HARD_DESC: "\u81EA\u8A02\u300C\u8F03\u96E3\u300D\u6309\u9215\u7684\u6A19\u7C64",
  FLASHCARD_TAGS: "\u5361\u7247\u6A19\u7C64",
  FLASHCARD_TAGS_DESC: "\u8F38\u5165\u6A19\u7C64\uFF08\u7528\u7A7A\u767D\u6216\u63DB\u884C\u5B57\u5143\u5206\u9694\uFF09\uFF0C\u4F8B\u5982\uFF1A#flashcards #deck2 #deck3.",
  CONVERT_FOLDERS_TO_DECKS: "\u662F\u5426\u5C07\u8CC7\u6599\u593E\u5167\u5BB9\u8F49\u63DB\u70BA\u724C\u7D44\u548C\u5B50\u724C\u7D44\uFF1F",
  CONVERT_FOLDERS_TO_DECKS_DESC: "\u6B64\u9078\u9805\u70BA\u5361\u7247\u6A19\u7C64\u9078\u9805\u7684\u66FF\u4EE3\u9078\u9805\u3002",
  INLINE_SCHEDULING_COMMENTS: "\u662F\u5426\u5C07\u8A08\u5283\u91CD\u8907\u6642\u9593\u5132\u5B58\u5728\u5361\u7247\u6700\u5F8C\u4E00\u884C\u7684\u540C\u4E00\u884C\uFF1F",
  INLINE_SCHEDULING_COMMENTS_DESC: "\u52FE\u9078\u5F8CHTML\u8A3B\u89E3\u4E0D\u6703\u7834\u58DE\u5217\u8868\u683C\u5F0F\u554F\u984C\u3002",
  BURY_SIBLINGS_TILL_NEXT_DAY: "\u5C07\u53CD\u8F49\u5361\u7247\u96B1\u85CF\u81F3\u4E0B\u4E00\u5929\uFF1F",
  BURY_SIBLINGS_TILL_NEXT_DAY_DESC: "\u53CD\u8F49\u5361\u7247\u7531\u540C\u4E00\u5361\u7247\u6587\u5B57\u7522\u751F\uFF0C\u4F8B\u5982\uFF1A\u586B\u7A7A\u514B\u6F0F\u5B57",
  SHOW_CARD_CONTEXT: "\u5728\u5361\u7247\u4E2D\u986F\u793A\u4E0A\u4E0B\u6587\uFF1F",
  SHOW_CARD_CONTEXT_DESC: "\u4F8B\u5982\uFF1A\u6A19\u984C > \u526F\u6A19\u984C > \u5C0F\u6A19\u984C > ... > \u5C0F\u6A19\u984C",
  CARD_MODAL_HEIGHT_PERCENT: "\u5361\u7247\u9AD8\u5EA6\u767E\u5206\u6BD4",
  CARD_MODAL_SIZE_PERCENT_DESC: "\u5728\u79FB\u52D5\u7AEF\u6216\u9700\u8981\u8F03\u5927\u5716\u7247\u6642\u61C9\u8A2D\u5B9A\u70BA100%",
  RESET_DEFAULT: "\u91CD\u7F6E\u70BA\u9810\u8A2D\u503C",
  CARD_MODAL_WIDTH_PERCENT: "\u5361\u7247\u5BEC\u5EA6\u767E\u5206\u6BD4",
  RANDOMIZE_CARD_ORDER: "\u5FA9\u7FD2\u6642\u96A8\u6A5F\u986F\u793A\u5361\u7247\uFF1F",
  DISABLE_CLOZE_CARDS: "\u505C\u7528\u586B\u7A7A\u514B\u6F0F\u5B57\u5361\u7247\uFF1F",
  CONVERT_HIGHLIGHTS_TO_CLOZES: "\u5C07 ==\u9AD8\u4EAE== \u8F49\u63DB\u70BA\u586B\u7A7A\u514B\u6F0F\u5B57\uFF1F",
  CONVERT_BOLD_TEXT_TO_CLOZES: "\u5C07 **\u7C97\u9AD4** \u8F49\u63DB\u70BA\u586B\u7A7A\u514B\u6F0F\u5B57\uFF1F",
  CONVERT_CURLY_BRACKETS_TO_CLOZES: "\u5C07 {{\u5927\u62EC\u865F}} \u8F49\u63DB\u70BA\u586B\u7A7A\u514B\u6F0F\u5B57\uFF1F",
  INLINE_CARDS_SEPARATOR: "\u55AE\u884C\u5361\u7247\u7684\u5206\u9694\u5B57\u5143",
  FIX_SEPARATORS_MANUALLY_WARNING: "\u6CE8\u610F\uFF1A\u66F4\u6539\u6B64\u9078\u9805\u5F8C\u4F60\u5C07\u9700\u8981\u81EA\u884C\u66F4\u6539\u5DF2\u5B58\u5728\u5361\u7247\u7684\u5206\u9694\u5B57\u5143\u3002",
  INLINE_REVERSED_CARDS_SEPARATOR: "\u55AE\u884C\u53CD\u8F49\u5361\u7247\u7684\u5206\u9694\u5B57\u5143",
  MULTILINE_CARDS_SEPARATOR: "\u591A\u884C\u5361\u7247\u7684\u5206\u9694\u5B57\u5143",
  MULTILINE_REVERSED_CARDS_SEPARATOR: "\u591A\u884C\u7FFB\u8F49\u5361\u7247\u7684\u5206\u9694\u5B57\u5143",
  NOTES: "\u7B46\u8A18",
  REVIEW_PANE_ON_STARTUP: "\u555F\u52D5\u6642\u958B\u555F\u7B46\u8A18\u5FA9\u7FD2\u7A97\u683C",
  TAGS_TO_REVIEW: "\u5FA9\u7FD2\u6A19\u7C64",
  TAGS_TO_REVIEW_DESC: "\u8F38\u5165\u6A19\u7C64\uFF0C\u7528\u7A7A\u683C\u6216\u63DB\u884C\u5B57\u5143\u5206\u9694\uFF0C\u4F8B\u5982\uFF1A#review #tag2 #tag3.",
  OPEN_RANDOM_NOTE: "\u5FA9\u7FD2\u96A8\u6A5F\u7B46\u8A18",
  OPEN_RANDOM_NOTE_DESC: "\u95DC\u9589\u6B64\u9078\u9805\uFF0C\u7B46\u8A18\u5C07\u4EE5\u91CD\u8981\u5EA6(PageRank)\u6392\u5E8F\u3002",
  AUTO_NEXT_NOTE: "\u5FA9\u7FD2\u5F8C\u81EA\u52D5\u6253\u958B\u4E0B\u4E00\u500B\u7B46\u8A18",
  DISABLE_FILE_MENU_REVIEW_OPTIONS: "\u95DC\u9589\u6A94\u6848\u9078\u55AE\u4E2D\u7684\u5FA9\u7FD2\u9078\u9805 \u4F8B\u5982\uFF1A\u5FA9\u7FD2\uFF1A\u7C21\u55AE \u8A18\u5F97 \u8F03\u96E3",
  DISABLE_FILE_MENU_REVIEW_OPTIONS_DESC: "\u95DC\u9589\u6A94\u6848\u9078\u55AE\u7684\u5FA9\u7FD2\u9078\u9805\uFF0C\u4F8B\u5982\uFF1A\u5FA9\u7FD2: \u7C21\u55AE \u8A18\u5F97 \u8F03\u96E3\u3002",
  MAX_N_DAYS_REVIEW_QUEUE: "\u53F3\u908A\u9762\u677F\u986F\u793A\u7684\u6700\u5927\u5929\u6578",
  MIN_ONE_DAY: "\u5929\u6578\u6700\u5C0F\u503C\u70BA1",
  VALID_NUMBER_WARNING: "\u8ACB\u8F38\u5165\u6709\u6548\u7684\u6578\u5B57\u3002",
  UI_PREFERENCES: "\u7528\u6236\u4ECB\u9762\u9996\u9078\u9805",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE: "\u724C\u7D44\u6A39\u6700\u521D\u61C9\u986F\u793A\u70BA\u5C55\u958B",
  INITIALLY_EXPAND_SUBDECKS_IN_TREE_DESC: "\u95DC\u9589\u6B64\u9078\u9805\u53EF\u647A\u758A\u540C\u4E00\u5F35\u5361\u7247\u4E2D\u7684\u5DE2\u72C0\u724C\u7D44\u3002\u5982\u679C\u60A8\u7684\u5361\u7247\u5C6C\u65BC\u540C\u4E00\u6A94\u6848\u4E2D\u7684\u8A31\u591A\u5957\u724C\uFF0C\u5247\u5F88\u6709\u7528\u3002",
  ALGORITHM: "\u6F14\u7B97\u6CD5",
  CHECK_ALGORITHM_WIKI: '\u77AD\u89E3\u66F4\u591A, \u8ACB\u9EDE\u9078<a href="${algo_url}">\u7B97\u6CD5\u5BE6\u73FE</a>.',
  BASE_EASE: "\u57FA\u790E\u638C\u63E1\u7A0B\u5EA6",
  BASE_EASE_DESC: "\u6700\u5C0F\u503C130\uFF0C\u63A8\u85A6\u503C\u7D04250.",
  BASE_EASE_MIN_WARNING: "\u57FA\u790E\u638C\u63E1\u7A0B\u5EA6\u7684\u6700\u5C0F\u503C\u70BA130\u3002",
  LAPSE_INTERVAL_CHANGE: "\u5C07\u5FA9\u7FD2\u6642\u6A19\u8A3B\u70BA\u300C\u8F03\u96E3\u300D\u7684\u5361\u7247\u6216\u7B46\u8A18\u5FA9\u7FD2\u9593\u9694\u7E2E\u77ED",
  LAPSE_INTERVAL_CHANGE_DESC: "\u65B0\u5FA9\u7FD2\u9593\u9694 = \u539F\u5FA9\u7FD2\u9593\u9694 * \u9593\u9694\u6539\u8B8A\u4FC2\u6578 / 100.",
  EASY_BONUS: "\u7C21\u55AE\u734E\u52F5",
  EASY_BONUS_DESC: "\u7C21\u55AE\u734E\u52F5\u8A2D\u5B9A\u300C\u8A18\u5F97\u300D\u548C\u300C\u7C21\u55AE\u300D\u5361\u7247\u6216\u7B46\u8A18\u7684\u5FA9\u7FD2\u9593\u9694\u5DEE\u8DDD\uFF08\u6700\u5C0F\u503C100%\uFF09\u3002",
  EASY_BONUS_MIN_WARNING: "\u7C21\u55AE\u734E\u52F5\u81F3\u5C11\u70BA100\u3002",
  MAX_INTERVAL: "\u6700\u5927\u9593\u9694\uFF08\u5929\uFF09",
  MAX_INTERVAL_DESC: "\u8A2D\u5B9A\u5FA9\u7FD2\u7684\u6700\u5927\u9593\u9694\u6642\u9593\uFF08\u9810\u8A2D\u503C100\u5E74\uFF09\u3002",
  MAX_INTERVAL_MIN_WARNING: "\u6700\u5927\u9593\u9694\u81F3\u5C11\u70BA1\u5929",
  MAX_LINK_CONTRIB: "\u6700\u5927\u93C8\u63A5\u8CA2\u737B",
  MAX_LINK_CONTRIB_DESC: "\u93C8\u63A5\u7B46\u8A18\u7684\u52A0\u6B0A\u638C\u63E1\u7A0B\u5EA6\u5C0D\u539F\u59CB\u638C\u63E1\u7A0B\u5EA6\u7684\u6700\u5927\u8CA2\u737B\u3002",
  LOGGING: "\u8A18\u9304\u4E2D",
  DISPLAY_DEBUG_INFO: "\u5728\u958B\u767C\u8005\u63A7\u5236\u53F0\u4E2D\u986F\u793A\u9664\u932F\u8CC7\u8A0A\uFF1F",
  // sidebar.ts
  NOTES_REVIEW_QUEUE: "\u7B46\u8A18\u5FA9\u7FD2\u5E8F\u5217",
  CLOSE: "\u81E8\u8FD1",
  NEW: "\u65B0",
  YESTERDAY: "\u6628\u5929",
  TODAY: "\u4ECA\u5929",
  TOMORROW: "\u660E\u5929",
  // stats-modal.tsx
  STATS_TITLE: "\u7D71\u8A08",
  MONTH: "\u6708",
  QUARTER: "\u5B63",
  YEAR: "\u5E74",
  LIFETIME: "\u5168\u90E8",
  FORECAST: "\u9810\u6E2C",
  FORECAST_DESC: "\u5C07\u8981\u5230\u671F\u7684\u5361\u7247\u6578\u91CF",
  SCHEDULED: "\u5DF2\u6392\u7A0B",
  DAYS: "\u5929",
  NUMBER_OF_CARDS: "\u5361\u7247\u6578\u91CF",
  REVIEWS_PER_DAY: "\u5E73\u5747: \u5FA9\u7FD2${avg} /\u5929",
  INTERVALS: "\u9593\u9694",
  INTERVALS_DESC: "\u5230\u4E0B\u4E00\u6B21\u5FA9\u7FD2\u7684\u6642\u9593\u9593\u9694",
  COUNT: "\u8A08\u6578",
  INTERVALS_SUMMARY: "\u5E73\u5747\u9593\u9694\u6642\u9593: ${avg}, \u6700\u9577\u9593\u9694\u6642\u9593: ${longest}",
  EASES: "\u638C\u63E1\u7A0B\u5EA6",
  EASES_SUMMARY: "\u5E73\u5747\u638C\u63E1\u7A0B\u5EA6: ${avgEase}",
  CARD_TYPES: "\u5361\u7247\u578B\u5225",
  CARD_TYPES_DESC: "\u5982\u6709\uFF0C\u5C07\u986F\u793A\u96B1\u85CF\u7684\u5361\u7247",
  CARD_TYPE_NEW: "\u65B0",
  CARD_TYPE_YOUNG: "\u8F03\u65B0",
  CARD_TYPE_MATURE: "\u719F\u6089",
  CARD_TYPES_SUMMARY: "\u7E3D\u5361\u7247\u6578: ${totalCardsCount}"
};

// src/lang/helpers.ts
var localeMap = {
  af: af_default,
  ar: ar_default,
  bn: bn_default,
  cs: cz_default,
  da: da_default,
  de: de_default,
  en: en_default,
  "en-gb": en_gb_default,
  es: es_default,
  fr: fr_default,
  hi: hi_default,
  id: id_default,
  it: it_default,
  ja: ja_default,
  ko: ko_default,
  mr: mr_default,
  nl: nl_default,
  nn: no_default,
  pl: pl_default,
  pt: pt_default,
  "pt-br": pt_br_default,
  ro: ro_default,
  ru: ru_default,
  ta: ta_default,
  te: te_default,
  th: th_default,
  tr: tr_default,
  uk: uk_default,
  ur: ur_default,
  vi: vi_default,
  "zh-cn": zh_cn_default,
  "zh-tw": zh_tw_default
};
var locale = localeMap[import_obsidian.moment.locale()];
function interpolate(str, params) {
  const names = Object.keys(params);
  const vals = Object.values(params);
  return new Function(...names, `return \`${str}\`;`)(...vals);
}
function t(str, params) {
  if (!locale) {
    console.error(`SRS error: Locale ${import_obsidian.moment.locale()} not found.`);
  }
  const result = locale && locale[str] || en_default[str];
  if (params) {
    return interpolate(result, params);
  }
  return result;
}

// src/settings.ts
var DEFAULT_SETTINGS = {
  // flashcards
  flashcardEasyText: t("EASY"),
  flashcardGoodText: t("GOOD"),
  flashcardHardText: t("HARD"),
  flashcardTags: ["#flashcards"],
  convertFoldersToDecks: true,
  cardCommentOnSameLine: true,
  burySiblingCards: false,
  showContextInCards: true,
  flashcardHeightPercentage: import_obsidian2.Platform.isMobile ? 100 : 80,
  flashcardWidthPercentage: import_obsidian2.Platform.isMobile ? 100 : 40,
  randomizeCardOrder: true,
  convertHighlightsToClozes: true,
  convertBoldTextToClozes: false,
  convertCurlyBracketsToClozes: false,
  singleLineCardSeparator: "\u2192",
  singleLineReversedCardSeparator: "\u2194",
  multilineCardSeparator: "?",
  multilineReversedCardSeparator: "??",
  editLaterTag: "#edit-later",
  // notes
  enableNoteReviewPaneOnStartup: true,
  tagsToReview: ["#review"],
  noteFoldersToIgnore: [],
  openRandomNote: false,
  autoNextNote: false,
  disableFileMenuReviewOptions: false,
  maxNDaysNotesReviewQueue: 365,
  // UI settings
  initiallyExpandAllSubdecksInTree: false,
  // algorithm
  baseEase: 250,
  lapsesIntervalChange: 0.5,
  easyBonus: 1.3,
  maximumInterval: 36525,
  maxLinkFactor: 1,
  // logging
  showDebugMessages: false
};
var applyDebounceTimer = 0;
function applySettingsUpdate(callback) {
  clearTimeout(applyDebounceTimer);
  applyDebounceTimer = window.setTimeout(callback, 512);
}
var SRSettingTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app2, plugin) {
    super(app2, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    const header = containerEl.createEl("h1", { text: `${t("SETTINGS_HEADER")}` });
    header.addClass("sr-centered");
    containerEl.createDiv().innerHTML = t("CHECK_WIKI", {
      wiki_url: "https://www.stephenmwangi.com/obsidian-spaced-repetition/"
    });
    new import_obsidian2.Setting(containerEl).setName(t("FOLDERS_TO_IGNORE")).setDesc(t("FOLDERS_TO_IGNORE_DESC")).addTextArea(
      (text) => text.setValue(this.plugin.data.settings.noteFoldersToIgnore.join("\n")).onChange((value) => {
        applySettingsUpdate(async () => {
          this.plugin.data.settings.noteFoldersToIgnore = value.split(/\n+/).map((v) => v.trim()).filter((v) => v);
          await this.plugin.savePluginData();
        });
      })
    );
    containerEl.createEl("h3", { text: `${t("FLASHCARDS")}` });
    new import_obsidian2.Setting(containerEl).setName(t("FLASHCARD_TAGS")).setDesc(t("FLASHCARD_TAGS_DESC")).addTextArea(
      (text) => text.setValue(this.plugin.data.settings.flashcardTags.join(" ")).onChange((value) => {
        applySettingsUpdate(async () => {
          this.plugin.data.settings.flashcardTags = value.split(/\s+/);
          await this.plugin.savePluginData();
        });
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("CONVERT_FOLDERS_TO_DECKS")).setDesc(t("CONVERT_FOLDERS_TO_DECKS_DESC")).addToggle(
      (toggle) => toggle.setValue(this.plugin.data.settings.convertFoldersToDecks).onChange(async (value) => {
        this.plugin.data.settings.convertFoldersToDecks = value;
        await this.plugin.savePluginData();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("INLINE_SCHEDULING_COMMENTS")).setDesc(t("INLINE_SCHEDULING_COMMENTS_DESC")).addToggle(
      (toggle) => toggle.setValue(this.plugin.data.settings.cardCommentOnSameLine).onChange(async (value) => {
        this.plugin.data.settings.cardCommentOnSameLine = value;
        await this.plugin.savePluginData();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("BURY_SIBLINGS_TILL_NEXT_DAY")).setDesc(t("BURY_SIBLINGS_TILL_NEXT_DAY_DESC")).addToggle(
      (toggle) => toggle.setValue(this.plugin.data.settings.burySiblingCards).onChange(async (value) => {
        this.plugin.data.settings.burySiblingCards = value;
        await this.plugin.savePluginData();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("SHOW_CARD_CONTEXT")).setDesc(t("SHOW_CARD_CONTEXT_DESC")).addToggle(
      (toggle) => toggle.setValue(this.plugin.data.settings.showContextInCards).onChange(async (value) => {
        this.plugin.data.settings.showContextInCards = value;
        await this.plugin.savePluginData();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("CARD_MODAL_HEIGHT_PERCENT")).setDesc(t("CARD_MODAL_SIZE_PERCENT_DESC")).addSlider(
      (slider) => slider.setLimits(10, 100, 5).setValue(this.plugin.data.settings.flashcardHeightPercentage).setDynamicTooltip().onChange(async (value) => {
        this.plugin.data.settings.flashcardHeightPercentage = value;
        await this.plugin.savePluginData();
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.flashcardHeightPercentage = DEFAULT_SETTINGS.flashcardHeightPercentage;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t("CARD_MODAL_WIDTH_PERCENT")).setDesc(t("CARD_MODAL_SIZE_PERCENT_DESC")).addSlider(
      (slider) => slider.setLimits(10, 100, 5).setValue(this.plugin.data.settings.flashcardWidthPercentage).setDynamicTooltip().onChange(async (value) => {
        this.plugin.data.settings.flashcardWidthPercentage = value;
        await this.plugin.savePluginData();
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.flashcardWidthPercentage = DEFAULT_SETTINGS.flashcardWidthPercentage;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t("RANDOMIZE_CARD_ORDER")).addToggle(
      (toggle) => toggle.setValue(this.plugin.data.settings.randomizeCardOrder).onChange(async (value) => {
        this.plugin.data.settings.randomizeCardOrder = value;
        await this.plugin.savePluginData();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("CONVERT_HIGHLIGHTS_TO_CLOZES")).addToggle(
      (toggle) => toggle.setValue(this.plugin.data.settings.convertHighlightsToClozes).onChange(async (value) => {
        this.plugin.data.settings.convertHighlightsToClozes = value;
        await this.plugin.savePluginData();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("CONVERT_BOLD_TEXT_TO_CLOZES")).addToggle(
      (toggle) => toggle.setValue(this.plugin.data.settings.convertBoldTextToClozes).onChange(async (value) => {
        this.plugin.data.settings.convertBoldTextToClozes = value;
        await this.plugin.savePluginData();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("CONVERT_CURLY_BRACKETS_TO_CLOZES")).addToggle(
      (toggle) => toggle.setValue(this.plugin.data.settings.convertCurlyBracketsToClozes).onChange(async (value) => {
        this.plugin.data.settings.convertCurlyBracketsToClozes = value;
        await this.plugin.savePluginData();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("INLINE_CARDS_SEPARATOR")).setDesc(t("FIX_SEPARATORS_MANUALLY_WARNING")).addText(
      (text) => text.setValue(this.plugin.data.settings.singleLineCardSeparator).onChange((value) => {
        applySettingsUpdate(async () => {
          this.plugin.data.settings.singleLineCardSeparator = value;
          await this.plugin.savePluginData();
        });
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.singleLineCardSeparator = DEFAULT_SETTINGS.singleLineCardSeparator;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t("INLINE_REVERSED_CARDS_SEPARATOR")).setDesc(t("FIX_SEPARATORS_MANUALLY_WARNING")).addText(
      (text) => text.setValue(this.plugin.data.settings.singleLineReversedCardSeparator).onChange((value) => {
        applySettingsUpdate(async () => {
          this.plugin.data.settings.singleLineReversedCardSeparator = value;
          await this.plugin.savePluginData();
        });
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.singleLineReversedCardSeparator = DEFAULT_SETTINGS.singleLineReversedCardSeparator;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t("MULTILINE_CARDS_SEPARATOR")).setDesc(t("FIX_SEPARATORS_MANUALLY_WARNING")).addText(
      (text) => text.setValue(this.plugin.data.settings.multilineCardSeparator).onChange((value) => {
        applySettingsUpdate(async () => {
          this.plugin.data.settings.multilineCardSeparator = value;
          await this.plugin.savePluginData();
        });
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.multilineCardSeparator = DEFAULT_SETTINGS.multilineCardSeparator;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t("MULTILINE_REVERSED_CARDS_SEPARATOR")).setDesc(t("FIX_SEPARATORS_MANUALLY_WARNING")).addText(
      (text) => text.setValue(this.plugin.data.settings.multilineReversedCardSeparator).onChange((value) => {
        applySettingsUpdate(async () => {
          this.plugin.data.settings.multilineReversedCardSeparator = value;
          await this.plugin.savePluginData();
        });
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.multilineReversedCardSeparator = DEFAULT_SETTINGS.multilineReversedCardSeparator;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t("FLASHCARD_EASY_LABEL")).setDesc(t("FLASHCARD_EASY_DESC")).addText(
      (text) => text.setValue(this.plugin.data.settings.flashcardEasyText).onChange((value) => {
        applySettingsUpdate(async () => {
          this.plugin.data.settings.flashcardEasyText = value;
          await this.plugin.savePluginData();
        });
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.flashcardEasyText = DEFAULT_SETTINGS.flashcardEasyText;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t("FLASHCARD_GOOD_LABEL")).setDesc(t("FLASHCARD_GOOD_DESC")).addText(
      (text) => text.setValue(this.plugin.data.settings.flashcardGoodText).onChange((value) => {
        applySettingsUpdate(async () => {
          this.plugin.data.settings.flashcardGoodText = value;
          await this.plugin.savePluginData();
        });
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.flashcardGoodText = DEFAULT_SETTINGS.flashcardGoodText;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t("FLASHCARD_HARD_LABEL")).setDesc(t("FLASHCARD_HARD_DESC")).addText(
      (text) => text.setValue(this.plugin.data.settings.flashcardHardText).onChange((value) => {
        applySettingsUpdate(async () => {
          this.plugin.data.settings.flashcardHardText = value;
          await this.plugin.savePluginData();
        });
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.flashcardHardText = DEFAULT_SETTINGS.flashcardHardText;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    containerEl.createEl("h3", { text: `${t("NOTES")}` });
    new import_obsidian2.Setting(containerEl).setName(t("REVIEW_PANE_ON_STARTUP")).addToggle(
      (toggle) => toggle.setValue(this.plugin.data.settings.enableNoteReviewPaneOnStartup).onChange(async (value) => {
        this.plugin.data.settings.enableNoteReviewPaneOnStartup = value;
        await this.plugin.savePluginData();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("TAGS_TO_REVIEW")).setDesc(t("TAGS_TO_REVIEW_DESC")).addTextArea(
      (text) => text.setValue(this.plugin.data.settings.tagsToReview.join(" ")).onChange((value) => {
        applySettingsUpdate(async () => {
          this.plugin.data.settings.tagsToReview = value.split(/\s+/);
          await this.plugin.savePluginData();
        });
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("OPEN_RANDOM_NOTE")).setDesc(t("OPEN_RANDOM_NOTE_DESC")).addToggle(
      (toggle) => toggle.setValue(this.plugin.data.settings.openRandomNote).onChange(async (value) => {
        this.plugin.data.settings.openRandomNote = value;
        await this.plugin.savePluginData();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("AUTO_NEXT_NOTE")).addToggle(
      (toggle) => toggle.setValue(this.plugin.data.settings.autoNextNote).onChange(async (value) => {
        this.plugin.data.settings.autoNextNote = value;
        await this.plugin.savePluginData();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("DISABLE_FILE_MENU_REVIEW_OPTIONS")).setDesc(t("DISABLE_FILE_MENU_REVIEW_OPTIONS_DESC")).addToggle(
      (toggle) => toggle.setValue(this.plugin.data.settings.disableFileMenuReviewOptions).onChange(async (value) => {
        this.plugin.data.settings.disableFileMenuReviewOptions = value;
        await this.plugin.savePluginData();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("MAX_N_DAYS_REVIEW_QUEUE")).addText(
      (text) => text.setValue(this.plugin.data.settings.maxNDaysNotesReviewQueue.toString()).onChange((value) => {
        applySettingsUpdate(async () => {
          const numValue = Number.parseInt(value);
          if (!isNaN(numValue)) {
            if (numValue < 1) {
              new import_obsidian2.Notice(t("MIN_ONE_DAY"));
              text.setValue(
                this.plugin.data.settings.maxNDaysNotesReviewQueue.toString()
              );
              return;
            }
            this.plugin.data.settings.maxNDaysNotesReviewQueue = numValue;
            await this.plugin.savePluginData();
          } else {
            new import_obsidian2.Notice(t("VALID_NUMBER_WARNING"));
          }
        });
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.maxNDaysNotesReviewQueue = DEFAULT_SETTINGS.maxNDaysNotesReviewQueue;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    containerEl.createEl("h3", { text: `${t("UI_PREFERENCES")}` });
    new import_obsidian2.Setting(containerEl).setName(t("INITIALLY_EXPAND_SUBDECKS_IN_TREE")).setDesc(t("INITIALLY_EXPAND_SUBDECKS_IN_TREE_DESC")).addToggle(
      (toggle) => toggle.setValue(this.plugin.data.settings.initiallyExpandAllSubdecksInTree).onChange(async (value) => {
        this.plugin.data.settings.initiallyExpandAllSubdecksInTree = value;
        await this.plugin.savePluginData();
      })
    );
    containerEl.createEl("h3", { text: `${t("ALGORITHM")}` });
    containerEl.createDiv().innerHTML = t("CHECK_ALGORITHM_WIKI", {
      algo_url: "https://www.stephenmwangi.com/obsidian-spaced-repetition/algorithms/"
    });
    new import_obsidian2.Setting(containerEl).setName(t("BASE_EASE")).setDesc(t("BASE_EASE_DESC")).addText(
      (text) => text.setValue(this.plugin.data.settings.baseEase.toString()).onChange((value) => {
        applySettingsUpdate(async () => {
          const numValue = Number.parseInt(value);
          if (!isNaN(numValue)) {
            if (numValue < 130) {
              new import_obsidian2.Notice(t("BASE_EASE_MIN_WARNING"));
              text.setValue(this.plugin.data.settings.baseEase.toString());
              return;
            }
            this.plugin.data.settings.baseEase = numValue;
            await this.plugin.savePluginData();
          } else {
            new import_obsidian2.Notice(t("VALID_NUMBER_WARNING"));
          }
        });
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.baseEase = DEFAULT_SETTINGS.baseEase;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t("LAPSE_INTERVAL_CHANGE")).setDesc(t("LAPSE_INTERVAL_CHANGE_DESC")).addSlider(
      (slider) => slider.setLimits(1, 99, 1).setValue(this.plugin.data.settings.lapsesIntervalChange * 100).setDynamicTooltip().onChange(async (value) => {
        this.plugin.data.settings.lapsesIntervalChange = value / 100;
        await this.plugin.savePluginData();
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.lapsesIntervalChange = DEFAULT_SETTINGS.lapsesIntervalChange;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t("EASY_BONUS")).setDesc(t("EASY_BONUS_DESC")).addText(
      (text) => text.setValue((this.plugin.data.settings.easyBonus * 100).toString()).onChange((value) => {
        applySettingsUpdate(async () => {
          const numValue = Number.parseInt(value) / 100;
          if (!isNaN(numValue)) {
            if (numValue < 1) {
              new import_obsidian2.Notice(t("EASY_BONUS_MIN_WARNING"));
              text.setValue(
                (this.plugin.data.settings.easyBonus * 100).toString()
              );
              return;
            }
            this.plugin.data.settings.easyBonus = numValue;
            await this.plugin.savePluginData();
          } else {
            new import_obsidian2.Notice(t("VALID_NUMBER_WARNING"));
          }
        });
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.easyBonus = DEFAULT_SETTINGS.easyBonus;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t("MAX_INTERVAL")).setDesc(t("MAX_INTERVAL_DESC")).addText(
      (text) => text.setValue(this.plugin.data.settings.maximumInterval.toString()).onChange((value) => {
        applySettingsUpdate(async () => {
          const numValue = Number.parseInt(value);
          if (!isNaN(numValue)) {
            if (numValue < 1) {
              new import_obsidian2.Notice(t("MAX_INTERVAL_MIN_WARNING"));
              text.setValue(
                this.plugin.data.settings.maximumInterval.toString()
              );
              return;
            }
            this.plugin.data.settings.maximumInterval = numValue;
            await this.plugin.savePluginData();
          } else {
            new import_obsidian2.Notice(t("VALID_NUMBER_WARNING"));
          }
        });
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.maximumInterval = DEFAULT_SETTINGS.maximumInterval;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t("MAX_LINK_CONTRIB")).setDesc(t("MAX_LINK_CONTRIB_DESC")).addSlider(
      (slider) => slider.setLimits(0, 100, 1).setValue(this.plugin.data.settings.maxLinkFactor * 100).setDynamicTooltip().onChange(async (value) => {
        this.plugin.data.settings.maxLinkFactor = value / 100;
        await this.plugin.savePluginData();
      })
    ).addExtraButton((button) => {
      button.setIcon("reset").setTooltip(t("RESET_DEFAULT")).onClick(async () => {
        this.plugin.data.settings.maxLinkFactor = DEFAULT_SETTINGS.maxLinkFactor;
        await this.plugin.savePluginData();
        this.display();
      });
    });
    containerEl.createEl("h3", { text: `${t("LOGGING")}` });
    new import_obsidian2.Setting(containerEl).setName(t("DISPLAY_DEBUG_INFO")).addToggle(
      (toggle) => toggle.setValue(this.plugin.data.settings.showDebugMessages).onChange(async (value) => {
        this.plugin.data.settings.showDebugMessages = value;
        await this.plugin.savePluginData();
      })
    );
  }
};

// src/flashcard-modal.tsx
var import_obsidian3 = require("obsidian");
var import_vhtml = __toESM(require_vhtml());

// src/scheduling.ts
function schedule(response, cardStats, settings, dueDates) {
  let interval = cardStats.interval;
  let ease = cardStats.ease;
  let delayBeforeReview = Math.max(0, Math.floor(cardStats.delayBeforeReview / (24 * 3600 * 1e3)));
  switch (response) {
    case 0 /* Easy */: {
      ease += 20;
      interval = settings.easyBonus * ((interval + delayBeforeReview) * ease) / 100;
    }
    case 1 /* Good */: {
      interval = (interval + delayBeforeReview / 2) * ease / 100;
    }
    case 2 /* Hard */: {
      ease = Math.max(130, ease - 20);
      interval = Math.max(
        1,
        (interval + delayBeforeReview / 4) * settings.lapsesIntervalChange
      );
    }
  }
  if (dueDates !== void 0) {
    interval = Math.round(interval);
    if (!Object.prototype.hasOwnProperty.call(dueDates, interval)) {
      dueDates[interval] = 0;
    } else {
      if (interval > 4) {
        let fuzz = 0;
        if (interval < 7)
          fuzz = 1;
        else if (interval < 30)
          fuzz = Math.max(2, Math.floor(interval * 0.15));
        else
          fuzz = Math.max(4, Math.floor(interval * 0.05));
        const originalInterval = interval;
        outer:
          for (let i = 1; i <= fuzz; i++) {
            for (const ivl of [originalInterval - i, originalInterval + i]) {
              if (!Object.prototype.hasOwnProperty.call(dueDates, ivl)) {
                dueDates[ivl] = 0;
                interval = ivl;
                break outer;
              }
              if (dueDates[ivl] < dueDates[interval])
                interval = ivl;
            }
          }
      }
    }
    dueDates[interval]++;
  }
  interval = Math.min(interval, settings.maximumInterval);
  interval = Math.round(interval * 10) / 10;
  return { interval, ease, delayBeforeReview };
}
function textInterval(interval, isMobile) {
  if (interval === void 0) {
    return t("NEW");
  }
  const m = Math.round(interval / 3.04375) / 10, y = Math.round(interval / 36.525) / 10;
  if (isMobile) {
    if (m < 1)
      return t("DAYS_STR_IVL_MOBILE", { interval });
    else if (y < 1)
      return t("MONTHS_STR_IVL_MOBILE", { interval: m });
    else
      return t("YEARS_STR_IVL_MOBILE", { interval: y });
  } else {
    if (m < 1)
      return t("DAYS_STR_IVL", { interval });
    else if (y < 1)
      return t("MONTHS_STR_IVL", { interval: m });
    else
      return t("YEARS_STR_IVL", { interval: y });
  }
}

// src/constants.ts
var SCHEDULING_INFO_REGEX = /^---\n((?:.*\n)*)sr-due: (.+)\nsr-interval: (\d+)\nsr-ease: (\d+)\n((?:.*\n)?)---/;
var YAML_FRONT_MATTER_REGEX = /^---\n((?:.*\n)*?)---/;
var MULTI_SCHEDULING_EXTRACTOR = /!([\d-]+),(\d+),(\d+)/gm;
var LEGACY_SCHEDULING_EXTRACTOR = /<!--SR:([\d-]+),(\d+),(\d+)-->/gm;
var IMAGE_FORMATS = [
  "jpg",
  "jpeg",
  "gif",
  "png",
  "svg",
  "webp",
  "apng",
  "avif",
  "jfif",
  "pjpeg",
  "pjp",
  "bmp"
];
var AUDIO_FORMATS = ["mp3", "webm", "m4a", "wav", "ogg"];
var VIDEO_FORMATS = ["mp4", "mkv", "avi", "mov"];
var COLLAPSE_ICON = '<svg viewBox="0 0 100 100" width="8" height="8" class="right-triangle"><path fill="currentColor" stroke="currentColor" d="M94.9,20.8c-1.4-2.5-4.1-4.1-7.1-4.1H12.2c-3,0-5.7,1.6-7.1,4.1c-1.3,2.4-1.2,5.2,0.2,7.6L43.1,88c1.5,2.3,4,3.7,6.9,3.7 s5.4-1.4,6.9-3.7l37.8-59.6C96.1,26,96.2,23.2,94.9,20.8L94.9,20.8z"></path></svg>';

// src/utils.ts
var escapeRegexString = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function cyrb53(str, seed = 0) {
  let h1 = 3735928559 ^ seed, h2 = 1103547991 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909);
  h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
}

// src/flashcard-modal.tsx
var FlashcardEditModal = class extends import_obsidian3.Modal {
  constructor(app2, plugin, existingText) {
    super(app2);
    this.didSubmit = false;
    this.submitClickCallback = (_) => this.submit();
    this.cancelClickCallback = (_) => this.cancel();
    this.submitEnterCallback = (evt) => {
      if ((evt.ctrlKey || evt.metaKey) && evt.key === "Enter") {
        evt.preventDefault();
        this.submit();
      }
    };
    this.plugin = plugin;
    this.titleEl.setText(t("EDIT_CARD"));
    this.titleEl.addClass("sr-centered");
    this.modalText = existingText;
    this.waitForClose = new Promise((resolve, reject) => {
      this.resolvePromise = resolve;
      this.rejectPromise = reject;
    });
    this.display();
    this.open();
  }
  static Prompt(app2, plugin, placeholder) {
    const newPromptModal = new FlashcardEditModal(app2, plugin, placeholder);
    return newPromptModal.waitForClose;
  }
  display() {
    this.contentEl.empty();
    this.modalEl.addClass("sr-flashcard-input-modal");
    const mainContentContainer = this.contentEl.createDiv();
    mainContentContainer.addClass("sr-flashcard-input-area");
    this.inputComponent = this.createInputField(mainContentContainer, this.modalText);
    this.createButtonBar(mainContentContainer);
  }
  createButton(container, text, callback) {
    const btn = new import_obsidian3.ButtonComponent(container);
    btn.setButtonText(text).onClick(callback);
    return btn;
  }
  createButtonBar(mainContentContainer) {
    const buttonBarContainer = mainContentContainer.createDiv();
    buttonBarContainer.addClass("sr-flashcard-edit-button-bar");
    this.createButton(
      buttonBarContainer,
      t("SAVE"),
      this.submitClickCallback
    ).setCta().buttonEl.style.marginRight = "0";
    this.createButton(buttonBarContainer, t("CANCEL"), this.cancelClickCallback);
  }
  createInputField(container, value) {
    const textComponent = new import_obsidian3.TextAreaComponent(container);
    textComponent.inputEl.style.width = "100%";
    textComponent.setValue(value != null ? value : "").onChange((value2) => this.input = value2).inputEl.addEventListener("keydown", this.submitEnterCallback);
    return textComponent;
  }
  submit() {
    this.didSubmit = true;
    this.close();
  }
  cancel() {
    this.close();
  }
  onOpen() {
    super.onOpen();
    this.inputComponent.inputEl.focus();
  }
  onClose() {
    super.onClose();
    this.resolveInput();
    this.removeInputListener();
  }
  resolveInput() {
    if (!this.didSubmit)
      this.rejectPromise(t("NO_INPUT"));
    else
      this.resolvePromise(this.input);
  }
  removeInputListener() {
    this.inputComponent.inputEl.removeEventListener("keydown", this.submitEnterCallback);
  }
};
var FlashcardModal = class extends import_obsidian3.Modal {
  constructor(app2, plugin, ignoreStats = false) {
    super(app2);
    this.plugin = plugin;
    this.ignoreStats = ignoreStats;
    this.titleEl.setText(t("DECKS"));
    this.titleEl.addClass("sr-centered");
    if (import_obsidian3.Platform.isMobile) {
      this.contentEl.style.display = "block";
    }
    this.modalEl.style.height = this.plugin.data.settings.flashcardHeightPercentage + "%";
    this.modalEl.style.width = this.plugin.data.settings.flashcardWidthPercentage + "%";
    this.contentEl.style.position = "relative";
    this.contentEl.style.height = "92%";
    this.contentEl.addClass("sr-modal-content");
    document.body.onkeydown = (e2) => {
      if (document.activeElement.nodeName !== "TEXTAREA" && this.mode !== 0 /* DecksList */) {
        const consume = () => {
          e2.preventDefault();
          e2.stopPropagation();
        };
        if (this.mode !== 3 /* Closed */ && e2.code === "KeyS") {
          this.skipCurrentCard();
          consume();
        } else if (this.mode === 1 /* Front */ && (e2.code === "Space" || e2.code === "Enter")) {
          this.showAnswer();
          consume();
        } else if (this.mode === 2 /* Back */) {
          if (e2.code === "Numpad1" || e2.code === "Digit1") {
            this.processReview(2 /* Hard */);
            consume();
          } else if (e2.code === "Numpad2" || e2.code === "Digit2" || e2.code === "Space") {
            this.processReview(1 /* Good */);
            consume();
          } else if (e2.code === "Numpad3" || e2.code === "Digit3") {
            this.processReview(0 /* Easy */);
            consume();
          } else if (e2.code === "Numpad0" || e2.code === "Digit0") {
            this.processReview(3 /* Reset */);
            consume();
          }
        }
      }
    };
  }
  onOpen() {
    this.decksList();
  }
  onClose() {
    this.mode = 3 /* Closed */;
  }
  decksList() {
    const aimDeck = this.plugin.deckTree.subdecks.filter(
      (deck) => deck.deckName === this.plugin.data.historyDeck
    );
    if (this.plugin.data.historyDeck && aimDeck.length > 0) {
      const deck = aimDeck[0];
      this.currentDeck = deck;
      this.checkDeck = deck.parent;
      this.setupCardsView();
      deck.nextCard(this);
      return;
    }
    this.mode = 0 /* DecksList */;
    this.titleEl.setText(t("DECKS"));
    this.titleEl.innerHTML += /* @__PURE__ */ (0, import_vhtml.default)("p", { style: "margin:0px;line-height:12px;" }, /* @__PURE__ */ (0, import_vhtml.default)(
      "span",
      {
        style: "background-color:#4caf50;color:#ffffff;",
        "aria-label": t("DUE_CARDS"),
        class: "tag-pane-tag-count tree-item-flair sr-deck-counts"
      },
      this.plugin.deckTree.dueFlashcardsCount.toString()
    ), /* @__PURE__ */ (0, import_vhtml.default)(
      "span",
      {
        style: "background-color:#2196f3;",
        "aria-label": t("NEW_CARDS"),
        class: "tag-pane-tag-count tree-item-flair sr-deck-counts"
      },
      this.plugin.deckTree.newFlashcardsCount.toString()
    ), /* @__PURE__ */ (0, import_vhtml.default)(
      "span",
      {
        style: "background-color:#ff7043;",
        "aria-label": t("TOTAL_CARDS"),
        class: "tag-pane-tag-count tree-item-flair sr-deck-counts"
      },
      this.plugin.deckTree.totalFlashcards.toString()
    ));
    this.contentEl.empty();
    this.contentEl.setAttribute("id", "sr-flashcard-view");
    for (const deck of this.plugin.deckTree.subdecks) {
      deck.render(this.contentEl, this);
    }
  }
  setupCardsView() {
    this.contentEl.empty();
    const flashCardMenu = this.contentEl.createDiv("sr-flashcard-menu");
    const backButton = flashCardMenu.createEl("button");
    backButton.addClass("sr-flashcard-menu-item");
    (0, import_obsidian3.setIcon)(backButton, "arrow-left");
    backButton.setAttribute("aria-label", t("BACK"));
    backButton.addEventListener("click", () => {
      this.plugin.data.historyDeck = "";
      this.decksList();
    });
    this.editButton = flashCardMenu.createEl("button");
    this.editButton.addClass("sr-flashcard-menu-item");
    (0, import_obsidian3.setIcon)(this.editButton, "edit");
    this.editButton.setAttribute("aria-label", t("EDIT_CARD"));
    this.editButton.addEventListener("click", async () => {
      const textPromptArr = this.currentCard.cardText.split("\n");
      let textPrompt = "";
      if (textPromptArr[textPromptArr.length - 1].startsWith("<!--SR:")) {
        textPrompt = textPromptArr.slice(0, -1).join("\n");
      } else {
        textPrompt = this.currentCard.cardText;
      }
      const editModal = FlashcardEditModal.Prompt(this.app, this.plugin, textPrompt);
      editModal.then(async (modifiedCardText) => {
        this.modifyCardText(textPrompt, modifiedCardText);
      }).catch((reason) => console.log(reason));
    });
    this.resetButton = flashCardMenu.createEl("button");
    this.resetButton.addClass("sr-flashcard-menu-item");
    (0, import_obsidian3.setIcon)(this.resetButton, "refresh-cw");
    this.resetButton.setAttribute("aria-label", t("RESET_CARD_PROGRESS"));
    this.resetButton.addEventListener("click", () => {
      this.processReview(3 /* Reset */);
    });
    const cardInfo = flashCardMenu.createEl("button");
    cardInfo.addClass("sr-flashcard-menu-item");
    (0, import_obsidian3.setIcon)(cardInfo, "info");
    cardInfo.setAttribute("aria-label", "View Card Info");
    cardInfo.addEventListener("click", async () => {
      var _a;
      const currentEaseStr = t("CURRENT_EASE_HELP_TEXT") + ((_a = this.currentCard.ease) != null ? _a : t("NEW"));
      const currentIntervalStr = t("CURRENT_INTERVAL_HELP_TEXT") + textInterval(this.currentCard.interval, false);
      const generatedFromStr = t("CARD_GENERATED_FROM", {
        notePath: this.currentCard.note.path
      });
      new import_obsidian3.Notice(currentEaseStr + "\n" + currentIntervalStr + "\n" + generatedFromStr);
    });
    const skipButton = flashCardMenu.createEl("button");
    skipButton.addClass("sr-flashcard-menu-item");
    (0, import_obsidian3.setIcon)(skipButton, "chevrons-right");
    skipButton.setAttribute("aria-label", t("SKIP"));
    skipButton.addEventListener("click", () => {
      this.skipCurrentCard();
    });
    if (this.plugin.data.settings.showContextInCards) {
      this.contextView = this.contentEl.createDiv();
      this.contextView.setAttribute("id", "sr-context");
    }
    this.flashcardView = this.contentEl.createDiv("div");
    this.flashcardView.setAttribute("id", "sr-flashcard-view");
    this.responseDiv = this.contentEl.createDiv("sr-flashcard-response");
    this.hardBtn = document.createElement("button");
    this.hardBtn.setAttribute("id", "sr-hard-btn");
    this.hardBtn.setText(this.plugin.data.settings.flashcardHardText);
    this.hardBtn.addEventListener("click", () => {
      this.processReview(2 /* Hard */);
    });
    this.responseDiv.appendChild(this.hardBtn);
    this.goodBtn = document.createElement("button");
    this.goodBtn.setAttribute("id", "sr-good-btn");
    this.goodBtn.setText(this.plugin.data.settings.flashcardGoodText);
    this.goodBtn.addEventListener("click", () => {
      this.processReview(1 /* Good */);
    });
    this.responseDiv.appendChild(this.goodBtn);
    this.easyBtn = document.createElement("button");
    this.easyBtn.setAttribute("id", "sr-easy-btn");
    this.easyBtn.setText(this.plugin.data.settings.flashcardEasyText);
    this.easyBtn.addEventListener("click", () => {
      this.processReview(0 /* Easy */);
    });
    this.responseDiv.appendChild(this.easyBtn);
    this.responseDiv.style.display = "none";
    this.answerBtn = this.contentEl.createDiv();
    this.answerBtn.setAttribute("id", "sr-show-answer");
    this.answerBtn.setText(t("SHOW_ANSWER"));
    this.answerBtn.addEventListener("click", () => {
      this.showAnswer();
    });
    if (this.ignoreStats) {
      this.goodBtn.style.display = "none";
      this.responseDiv.addClass("sr-ignorestats-response");
      this.easyBtn.addClass("sr-ignorestats-btn");
      this.hardBtn.addClass("sr-ignorestats-btn");
    }
  }
  async modifyCardText(originalText, replacementText) {
    if (!replacementText)
      return;
    if (replacementText == originalText)
      return;
    let fileText = await this.app.vault.read(this.currentCard.note);
    const originalTextRegex = new RegExp(escapeRegexString(originalText), "gm");
    fileText = fileText.replace(originalTextRegex, replacementText);
    await this.app.vault.modify(this.currentCard.note, fileText);
    this.currentDeck.deleteFlashcardAtIndex(this.currentCardIdx, this.currentCard.isDue);
    this.burySiblingCards(false);
  }
  showAnswer() {
    this.mode = 2 /* Back */;
    this.answerBtn.style.display = "none";
    this.responseDiv.style.display = "grid";
    if (this.currentCard.isDue) {
      this.resetButton.disabled = false;
    }
    if (this.currentCard.cardType !== 4 /* Cloze */) {
      const hr = document.createElement("hr");
      hr.setAttribute("id", "sr-hr-card-divide");
      this.flashcardView.appendChild(hr);
    } else {
      this.flashcardView.empty();
    }
    this.renderMarkdownWrapper(this.currentCard.back, this.flashcardView);
  }
  async processReview(response) {
    if (this.ignoreStats) {
      if (response == 0 /* Easy */) {
        this.currentDeck.deleteFlashcardAtIndex(
          this.currentCardIdx,
          this.currentCard.isDue
        );
      }
      this.currentDeck.nextCard(this);
      return;
    }
    let interval, ease, due;
    this.currentDeck.deleteFlashcardAtIndex(this.currentCardIdx, this.currentCard.isDue);
    if (response !== 3 /* Reset */) {
      let schedObj;
      if (this.currentCard.isDue) {
        let newCardStats = schedule(
          response,
          this.currentCard.stats,
          this.plugin.data.settings,
          this.plugin.dueDatesFlashcards
        );
      } else {
        let initial_ease = this.plugin.data.settings.baseEase;
        if (Object.prototype.hasOwnProperty.call(
          this.plugin.easeByPath,
          this.currentCard.note.path
        )) {
          initial_ease = Math.round(this.plugin.easeByPath[this.currentCard.note.path]);
        }
        schedObj = schedule(
          response,
          {
            1: number,
            initial_ease,
            0: number
          },
          this.plugin.data.settings,
          this.plugin.dueDatesFlashcards
        );
        interval = schedObj.interval;
        ease = schedObj.ease;
      }
      interval = schedObj.interval;
      ease = schedObj.ease;
      due = window.moment(Date.now() + interval * 24 * 3600 * 1e3);
    } else {
      this.currentCard.interval = 1;
      this.currentCard.ease = this.plugin.data.settings.baseEase;
      if (this.currentCard.isDue) {
        this.currentDeck.dueFlashcards.push(this.currentCard);
      } else {
        this.currentDeck.newFlashcards.push(this.currentCard);
      }
      due = window.moment(Date.now());
      new import_obsidian3.Notice(t("CARD_PROGRESS_RESET"));
      this.currentDeck.nextCard(this);
      return;
    }
    const dueString = due.format("YYYY-MM-DD");
    let fileText = await this.app.vault.read(this.currentCard.note);
    const replacementRegex = new RegExp(escapeRegexString(this.currentCard.cardText), "gm");
    let sep = this.plugin.data.settings.cardCommentOnSameLine ? " " : "\n";
    if (this.currentCard.cardText.endsWith("```") && sep !== "\n") {
      sep = "\n";
    }
    if (this.currentCard.cardText.lastIndexOf("<!--SR:") === -1) {
      this.currentCard.cardText = this.currentCard.cardText + sep + `<!--SR:!${dueString},${interval},${ease}-->`;
    } else {
      let scheduling = [
        ...this.currentCard.cardText.matchAll(MULTI_SCHEDULING_EXTRACTOR)
      ];
      if (scheduling.length === 0) {
        scheduling = [...this.currentCard.cardText.matchAll(LEGACY_SCHEDULING_EXTRACTOR)];
      }
      const currCardSched = ["0", dueString, interval.toString(), ease.toString()];
      if (this.currentCard.isDue) {
        scheduling[this.currentCard.siblingIdx] = currCardSched;
      } else {
        scheduling.push(currCardSched);
      }
      this.currentCard.cardText = this.currentCard.cardText.replace(/<!--SR:.+-->/gm, "");
      this.currentCard.cardText += "<!--SR:";
      for (let i = 0; i < scheduling.length; i++) {
        this.currentCard.cardText += `!${scheduling[i][1]},${scheduling[i][2]},${scheduling[i][3]}`;
      }
      this.currentCard.cardText += "-->";
    }
    fileText = fileText.replace(replacementRegex, () => this.currentCard.cardText);
    for (const sibling of this.currentCard.siblings) {
      sibling.cardText = this.currentCard.cardText;
    }
    if (this.plugin.data.settings.burySiblingCards) {
      this.burySiblingCards(true);
    }
    await this.app.vault.modify(this.currentCard.note, fileText);
    this.currentDeck.nextCard(this);
  }
  async burySiblingCards(tillNextDay) {
    if (tillNextDay) {
      this.plugin.data.buryList.push(cyrb53(this.currentCard.cardText));
      await this.plugin.savePluginData();
    }
    for (const sibling of this.currentCard.siblings) {
      const dueIdx = this.currentDeck.dueFlashcards.indexOf(sibling);
      const newIdx = this.currentDeck.newFlashcards.indexOf(sibling);
      if (dueIdx !== -1) {
        this.currentDeck.deleteFlashcardAtIndex(
          dueIdx,
          this.currentDeck.dueFlashcards[dueIdx].isDue
        );
      } else if (newIdx !== -1) {
        this.currentDeck.deleteFlashcardAtIndex(
          newIdx,
          this.currentDeck.newFlashcards[newIdx].isDue
        );
      }
    }
  }
  skipCurrentCard() {
    this.currentDeck.deleteFlashcardAtIndex(this.currentCardIdx, this.currentCard.isDue);
    this.burySiblingCards(false);
    this.currentDeck.nextCard(this);
  }
  // slightly modified version of the renderMarkdown function in
  // https://github.com/mgmeyers/obsidian-kanban/blob/main/src/KanbanView.tsx
  async renderMarkdownWrapper(markdownString, containerEl, recursiveDepth = 0) {
    if (recursiveDepth > 4)
      return;
    import_obsidian3.MarkdownRenderer.renderMarkdown(
      markdownString,
      containerEl,
      this.currentCard.note.path,
      this.plugin
    );
    containerEl.findAll(".internal-embed").forEach((el) => {
      const link = this.parseLink(el.getAttribute("src"));
      if (!link.target) {
        el.innerText = link.text;
      } else if (link.target instanceof import_obsidian3.TFile) {
        if (link.target.extension !== "md") {
          this.embedMediaFile(el, link.target);
        } else {
          el.innerText = "";
          this.renderTransclude(el, link, recursiveDepth);
        }
      }
    });
  }
  parseLink(src) {
    const linkComponentsRegex = /^(?<file>[^#^]+)?(?:#(?!\^)(?<heading>.+)|#\^(?<blockId>.+)|#)?$/;
    const matched = typeof src === "string" && src.match(linkComponentsRegex);
    const file = matched.groups.file || this.currentCard.note.path;
    const target = this.plugin.app.metadataCache.getFirstLinkpathDest(
      file,
      this.currentCard.note.path
    );
    return {
      text: matched[0],
      file: matched.groups.file,
      heading: matched.groups.heading,
      blockId: matched.groups.blockId,
      target
    };
  }
  embedMediaFile(el, target) {
    el.innerText = "";
    if (IMAGE_FORMATS.includes(target.extension)) {
      el.createEl(
        "img",
        {
          attr: {
            src: this.plugin.app.vault.getResourcePath(target)
          }
        },
        (img) => {
          if (el.hasAttribute("width"))
            img.setAttribute("width", el.getAttribute("width"));
          else
            img.setAttribute("width", "100%");
          if (el.hasAttribute("alt"))
            img.setAttribute("alt", el.getAttribute("alt"));
          el.addEventListener(
            "click",
            (ev) => ev.target.style.minWidth = ev.target.style.minWidth === "100%" ? null : "100%"
          );
        }
      );
      el.addClasses(["image-embed", "is-loaded"]);
    } else if (AUDIO_FORMATS.includes(target.extension) || VIDEO_FORMATS.includes(target.extension)) {
      el.createEl(
        AUDIO_FORMATS.includes(target.extension) ? "audio" : "video",
        {
          attr: {
            controls: "",
            src: this.plugin.app.vault.getResourcePath(target)
          }
        },
        (audio) => {
          if (el.hasAttribute("alt"))
            audio.setAttribute("alt", el.getAttribute("alt"));
        }
      );
      el.addClasses(["media-embed", "is-loaded"]);
    } else {
      el.innerText = target.path;
    }
  }
  async renderTransclude(el, link, recursiveDepth) {
    var _a, _b, _c, _d;
    const cache = this.app.metadataCache.getCache(link.target.path);
    const text = await this.app.vault.cachedRead(link.target);
    let blockText;
    if (link.heading) {
      const clean = (s) => s.replace(/[\W\s]/g, "");
      const headingIndex = (_a = cache.headings) == null ? void 0 : _a.findIndex(
        (h2) => clean(h2.heading) === clean(link.heading)
      );
      const heading = cache.headings[headingIndex];
      const startAt = heading.position.start.offset;
      const endAt = ((_d = (_c = (_b = cache.headings.slice(headingIndex + 1).find((h2) => h2.level <= heading.level)) == null ? void 0 : _b.position) == null ? void 0 : _c.start) == null ? void 0 : _d.offset) || text.length;
      blockText = text.substring(startAt, endAt);
    } else if (link.blockId) {
      const block = cache.blocks[link.blockId];
      const startAt = block.position.start.offset;
      const endAt = block.position.end.offset;
      blockText = text.substring(startAt, endAt);
    } else {
      blockText = text;
    }
    this.renderMarkdownWrapper(blockText, el, recursiveDepth + 1);
  }
};

// src/sidebar.ts
var import_obsidian4 = require("obsidian");
var REVIEW_QUEUE_VIEW_TYPE = "review-queue-list-view";
var ReviewQueueListView = class extends import_obsidian4.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.registerEvent(this.app.workspace.on("file-open", () => this.redraw()));
    this.registerEvent(this.app.vault.on("rename", () => this.redraw()));
  }
  getViewType() {
    return REVIEW_QUEUE_VIEW_TYPE;
  }
  getDisplayText() {
    return t("NOTES_REVIEW_QUEUE");
  }
  getIcon() {
    return "SpacedRepIcon";
  }
  onHeaderMenu(menu) {
    menu.addItem((item) => {
      item.setTitle(t("CLOSE")).setIcon("cross").onClick(() => {
        this.app.workspace.detachLeavesOfType(REVIEW_QUEUE_VIEW_TYPE);
      });
    });
  }
  redraw() {
    const activeFile = this.app.workspace.getActiveFile();
    const rootEl = createDiv("nav-folder mod-root");
    const childrenEl = rootEl.createDiv("nav-folder-children");
    for (const deckKey in this.plugin.reviewDecks) {
      const deck = this.plugin.reviewDecks[deckKey];
      const deckCollapsed = !deck.activeFolders.has(deck.deckName);
      const deckFolderEl = this.createRightPaneFolder(
        childrenEl,
        deckKey,
        deckCollapsed,
        false,
        deck
      ).getElementsByClassName("nav-folder-children")[0];
      if (deck.newNotes.length > 0) {
        const newNotesFolderEl = this.createRightPaneFolder(
          deckFolderEl,
          t("NEW"),
          !deck.activeFolders.has(t("NEW")),
          deckCollapsed,
          deck
        );
        for (const newFile of deck.newNotes) {
          const fileIsOpen = activeFile && newFile.path === activeFile.path;
          if (fileIsOpen) {
            deck.activeFolders.add(deck.deckName);
            deck.activeFolders.add(t("NEW"));
            this.changeFolderIconToExpanded(newNotesFolderEl);
            this.changeFolderIconToExpanded(deckFolderEl);
          }
          this.createRightPaneFile(
            newNotesFolderEl,
            newFile,
            fileIsOpen,
            !deck.activeFolders.has(t("NEW")),
            deck,
            this.plugin
          );
        }
      }
      if (deck.scheduledNotes.length > 0) {
        const now = Date.now();
        let currUnix = -1;
        let schedFolderEl = null, folderTitle = "";
        const maxDaysToRender = this.plugin.data.settings.maxNDaysNotesReviewQueue;
        for (const sNote of deck.scheduledNotes) {
          if (sNote.dueUnix != currUnix) {
            const nDays = Math.ceil((sNote.dueUnix - now) / (24 * 3600 * 1e3));
            if (nDays > maxDaysToRender) {
              break;
            }
            if (nDays === -1) {
              folderTitle = t("YESTERDAY");
            } else if (nDays === 0) {
              folderTitle = t("TODAY");
            } else if (nDays === 1) {
              folderTitle = t("TOMORROW");
            } else {
              folderTitle = new Date(sNote.dueUnix).toDateString();
            }
            schedFolderEl = this.createRightPaneFolder(
              deckFolderEl,
              folderTitle,
              !deck.activeFolders.has(folderTitle),
              deckCollapsed,
              deck
            );
            currUnix = sNote.dueUnix;
          }
          const fileIsOpen = activeFile && sNote.note.path === activeFile.path;
          if (fileIsOpen) {
            deck.activeFolders.add(deck.deckName);
            deck.activeFolders.add(folderTitle);
            this.changeFolderIconToExpanded(schedFolderEl);
            this.changeFolderIconToExpanded(deckFolderEl);
          }
          this.createRightPaneFile(
            schedFolderEl,
            sNote.note,
            fileIsOpen,
            !deck.activeFolders.has(folderTitle),
            deck,
            this.plugin
          );
        }
      }
    }
    const contentEl = this.containerEl.children[1];
    contentEl.empty();
    contentEl.appendChild(rootEl);
  }
  createRightPaneFolder(parentEl, folderTitle, collapsed, hidden, deck) {
    const folderEl = parentEl.createDiv("nav-folder");
    const folderTitleEl = folderEl.createDiv("nav-folder-title");
    const childrenEl = folderEl.createDiv("nav-folder-children");
    const collapseIconEl = folderTitleEl.createDiv(
      "nav-folder-collapse-indicator collapse-icon"
    );
    collapseIconEl.innerHTML = COLLAPSE_ICON;
    if (collapsed) {
      collapseIconEl.childNodes[0].style.transform = "rotate(-90deg)";
    }
    folderTitleEl.createDiv("nav-folder-title-content").setText(folderTitle);
    if (hidden) {
      folderEl.style.display = "none";
    }
    folderTitleEl.onClickEvent(() => {
      for (const child of childrenEl.childNodes) {
        if (child.style.display === "block" || child.style.display === "") {
          child.style.display = "none";
          collapseIconEl.childNodes[0].style.transform = "rotate(-90deg)";
          deck.activeFolders.delete(folderTitle);
        } else {
          child.style.display = "block";
          collapseIconEl.childNodes[0].style.transform = "";
          deck.activeFolders.add(folderTitle);
        }
      }
    });
    return folderEl;
  }
  createRightPaneFile(folderEl, file, fileElActive, hidden, deck, plugin) {
    const navFileEl = folderEl.getElementsByClassName("nav-folder-children")[0].createDiv("nav-file");
    if (hidden) {
      navFileEl.style.display = "none";
    }
    const navFileTitle = navFileEl.createDiv("nav-file-title");
    if (fileElActive) {
      navFileTitle.addClass("is-active");
    }
    navFileTitle.createDiv("nav-file-title-content").setText(file.basename);
    navFileTitle.addEventListener(
      "click",
      async (event) => {
        event.preventDefault();
        plugin.lastSelectedReviewDeck = deck.deckName;
        await this.app.workspace.getLeaf().openFile(file);
        return false;
      },
      false
    );
    navFileTitle.addEventListener(
      "contextmenu",
      (event) => {
        event.preventDefault();
        const fileMenu = new import_obsidian4.Menu();
        this.app.workspace.trigger("file-menu", fileMenu, file, "my-context-menu", null);
        fileMenu.showAtPosition({
          x: event.pageX,
          y: event.pageY
        });
        return false;
      },
      false
    );
  }
  changeFolderIconToExpanded(folderEl) {
    const collapseIconEl = folderEl.find("div.nav-folder-collapse-indicator");
    collapseIconEl.childNodes[0].style.transform = "";
  }
};

// src/parser.ts
function parse(text, singlelineCardSeparator, singlelineReversedCardSeparator, multilineCardSeparator, multilineReversedCardSeparator, convertHighlightsToClozes, convertBoldTextToClozes, convertCurlyBracketsToClozes) {
  let cardText = "";
  const cards = [];
  let cardType = null;
  let lineNumber = 0;
  const lines = text.replaceAll("\r\n", "\n").split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].length === 0) {
      if (cardType) {
        cards.push({ cardType, cardText, lineNumber });
        cardType = null;
      }
      cardText = "";
      continue;
    } else if (lines[i].startsWith("<!--") && !lines[i].startsWith("<!--SR:")) {
      while (i + 1 < lines.length && !lines[i].includes("-->")) {
        i++;
      }
      ;
      i++;
      continue;
    }
    if (cardText.length > 0) {
      cardText += "\n";
    }
    cardText += lines[i];
    if (lines[i].includes(singlelineReversedCardSeparator) || lines[i].includes(singlelineCardSeparator)) {
      cardType = lines[i].includes(singlelineReversedCardSeparator) ? 1 /* SingleLineBothWays */ : 0 /* SingleLine */;
      cardText = lines[i];
      lineNumber = i;
      if (i + 1 < lines.length && lines[i + 1].startsWith("<!--SR:")) {
        cardText += "\n" + lines[i + 1];
        i++;
      }
      cards.push({ cardType, cardText, lineNumber });
      cardType = null;
      cardText = "";
    } else if (cardType === null && (convertHighlightsToClozes && /==.*?==/gm.test(lines[i]) || convertBoldTextToClozes && /\*\*.*?\*\*/gm.test(lines[i]) || convertCurlyBracketsToClozes && /{{.*?}}/gm.test(lines[i]))) {
      cardType = 4 /* Cloze */;
      lineNumber = i;
    } else if (lines[i] === multilineCardSeparator) {
      cardType = 2 /* MultiLine */;
      lineNumber = i;
    } else if (lines[i] === multilineReversedCardSeparator) {
      cardType = 3 /* MultiLineBothWays */;
      lineNumber = i;
    } else if (lines[i].startsWith("```") || lines[i].startsWith("~~~")) {
      const codeBlockClose = lines[i].match(/`+|~+/)[0];
      while (i + 1 < lines.length && !lines[i + 1].startsWith(codeBlockClose)) {
        i++;
        cardText += "\n" + lines[i];
      }
      cardText += "\n" + codeBlockClose;
      i++;
    }
  }
  if (cardType && cardText) {
    cards.push({ cardType, cardText, lineNumber });
  }
  return cards;
}
function getCardSiblings(cardType, cardText, settings) {
  const siblingMatches = [];
  if (cardType === 4 /* Cloze */) {
    const siblings = [];
    if (settings.convertHighlightsToClozes) {
      siblings.push(...cardText.matchAll(/==(.*?)==/gm));
    }
    if (settings.convertBoldTextToClozes) {
      siblings.push(...cardText.matchAll(/\*\*(.*?)\*\*/gm));
    }
    if (settings.convertCurlyBracketsToClozes) {
      siblings.push(...cardText.matchAll(/{{(.*?)}}/gm));
    }
    siblings.sort((a, b) => {
      if (a.index < b.index) {
        return -1;
      }
      if (a.index > b.index) {
        return 1;
      }
      return 0;
    });
    let front, back;
    for (const m of siblings) {
      const deletionStart = m.index, deletionEnd = deletionStart + m[0].length;
      front = cardText.substring(0, deletionStart) + "<span style='color:#2196f3'>[...]</span>" + cardText.substring(deletionEnd);
      front = front.replace(/==/gm, "").replace(/\*\*/gm, "").replace(/{{/gm, "").replace(/}}/gm, "");
      back = cardText.substring(0, deletionStart) + "<span style='color:#2196f3'>" + cardText.substring(deletionStart, deletionEnd) + "</span>" + cardText.substring(deletionEnd);
      back = back.replace(/==/gm, "").replace(/\*\*/gm, "").replace(/{{/gm, "").replace(/}}/gm, "");
      siblingMatches.push([front, back]);
    }
  } else {
    let idx;
    if (cardType === 0 /* SingleLine */) {
      idx = cardText.indexOf(settings.singleLineCardSeparator);
      siblingMatches.push([
        cardText.substring(0, idx),
        cardText.substring(idx + settings.singleLineCardSeparator.length)
      ]);
    } else if (cardType === 1 /* SingleLineBothWays */) {
      idx = cardText.indexOf(settings.singleLineReversedCardSeparator);
      const side1 = cardText.substring(0, idx), side2 = cardText.substring(
        idx + settings.singleLineReversedCardSeparator.length
      );
      siblingMatches.push([side1, side2]);
      siblingMatches.push([side2, side1]);
    } else if (cardType === 2 /* MultiLine */) {
      idx = cardText.indexOf("\n" + settings.multilineCardSeparator + "\n");
      siblingMatches.push([
        cardText.substring(0, idx),
        cardText.substring(idx + 2 + settings.multilineCardSeparator.length)
      ]);
    } else if (cardType === 3 /* MultiLineBothWays */) {
      idx = cardText.indexOf("\n" + settings.multilineReversedCardSeparator + "\n");
      const side1 = cardText.substring(0, idx), side2 = cardText.substring(
        idx + 2 + settings.multilineReversedCardSeparator.length
      );
      siblingMatches.push([side1, side2]);
      siblingMatches.push([side2, side1]);
    }
  }
  return siblingMatches;
}
function parseScheduleString(schedule2) {
  const dueUnix = window.moment(schedule2[1], ["YYYY-MM-DD", "DD-MM-YYYY"]).valueOf();
  return { dueUnix, interval: parseInt(schedule2[2]), ease: parseInt(schedule2[3]) };
}
function doSchedulingStuff(fileText, cardText, siblingMatches) {
  let schedulingMatches = [...cardText.matchAll(MULTI_SCHEDULING_EXTRACTOR)];
  if (schedulingMatches.length === 0)
    schedulingMatches = [...cardText.matchAll(LEGACY_SCHEDULING_EXTRACTOR)];
  const scheduling = schedulingMatches.map(parseScheduleString);
  let newFileText = null;
  if (schedulingMatches.length > siblingMatches.length) {
    const idxSched = cardText.lastIndexOf("<!--SR:") + 7;
    let newCardText = cardText.substring(0, idxSched);
    for (let i = 0; i < siblingMatches.length; i++)
      newCardText += `!${schedulingMatches[i][1]},${schedulingMatches[i][2]},${schedulingMatches[i][3]}`;
    newCardText += "-->";
    const replacementRegex = new RegExp(escapeRegexString(cardText), "gm");
    newFileText = fileText.replace(replacementRegex, () => newCardText);
  }
  return { scheduling, newFileText };
}

// src/icons/appIcon.ts
var import_obsidian5 = require("obsidian");
var iconSvg = `<path fill="currentColor" stroke="currentColor" d="M 88.960938 17.257812 L 47.457031 17.257812 C 45.679688 17.257812 44.230469 18.703125 44.230469 20.484375 L 44.230469 86.558594 C 44.230469 88.335938 45.679688 89.785156 47.457031 89.785156 L 88.960938 89.785156 C 90.738281 89.785156 92.1875 88.335938 92.1875 86.558594 L 92.1875 20.484375 C 92.1875 18.703125 90.738281 17.257812 88.960938 17.257812 Z M 88.28125 85.878906 L 48.136719 85.878906 L 48.136719 21.164062 L 88.28125 21.164062 Z M 88.28125 85.878906 "/>
        <path fill="currentColor" stroke="currentColor"  d="M 88.960938 9.445312 L 61.667969 9.445312 C 59.925781 3.816406 54.011719 0.515625 48.269531 2.054688 L 8.183594 12.796875 C 2.304688 14.371094 -1.199219 20.4375 0.378906 26.316406 L 17.476562 90.140625 C 18.796875 95.066406 23.269531 98.324219 28.144531 98.324219 C 29.085938 98.324219 30.046875 98.199219 31 97.945312 L 40.765625 95.328125 C 42.625 96.75 44.941406 97.597656 47.457031 97.597656 L 88.960938 97.597656 C 95.046875 97.597656 100 92.644531 100 86.558594 L 100 20.484375 C 100 14.398438 95.046875 9.445312 88.960938 9.445312 Z M 29.988281 94.171875 C 26.1875 95.191406 22.269531 92.925781 21.25 89.128906 L 4.152344 25.304688 C 3.132812 21.507812 5.394531 17.585938 9.195312 16.570312 L 49.28125 5.828125 C 52.578125 4.945312 55.960938 6.53125 57.464844 9.445312 L 47.457031 9.445312 C 41.371094 9.445312 36.417969 14.398438 36.417969 20.484375 L 36.417969 86.558594 C 36.417969 88.558594 36.957031 90.433594 37.890625 92.054688 Z M 96.09375 86.558594 C 96.09375 90.492188 92.894531 93.691406 88.960938 93.691406 L 47.457031 93.691406 C 43.523438 93.691406 40.324219 90.492188 40.324219 86.558594 L 40.324219 20.484375 C 40.324219 16.550781 43.523438 13.351562 47.457031 13.351562 L 88.960938 13.351562 C 92.894531 13.351562 96.09375 16.550781 96.09375 20.484375 Z M 96.09375 86.558594 "/>
        <path fill="currentColor" stroke="currentColor"  d="M 54.101562 53.09375 L 60.070312 57.410156 L 57.789062 64.378906 C 56.90625 67.074219 59.996094 69.320312 62.285156 67.648438 L 68.210938 63.324219 L 74.132812 67.648438 C 76.421875 69.320312 79.511719 67.074219 78.628906 64.378906 L 76.347656 57.410156 L 82.320312 53.09375 C 84.613281 51.433594 83.441406 47.804688 80.605469 47.804688 L 73.242188 47.804688 L 70.988281 40.839844 C 70.117188 38.144531 66.300781 38.144531 65.429688 40.839844 L 63.179688 47.804688 L 55.8125 47.804688 C 52.980469 47.804688 51.804688 51.433594 54.101562 53.09375 Z M 54.101562 53.09375 "/>
        `;
function showAppIcon() {
  (0, import_obsidian5.addIcon)("SpacedRepIcon", iconSvg);
}

// src/card-review-view/sr-view.ts
var import_obsidian8 = require("obsidian");

// src/card-review-view/render-card.ts
var import_obsidian6 = require("obsidian");
async function renderMarkdownWrapper(markdownString, note, containerEl, recursiveDepth = 0) {
  if (recursiveDepth > 4)
    return;
  import_obsidian6.MarkdownRenderer.renderMarkdown(
    markdownString,
    containerEl,
    note.path,
    this.plugin
  );
  containerEl.findAll(".internal-embed").forEach((el) => {
    const link = parseLink(el.getAttribute("src"));
    if (!link.target) {
      el.innerText = link.text;
    } else if (link.target instanceof import_obsidian6.TFile) {
      if (link.target.extension !== "md") {
        embedMediaFile(el, link.target);
      } else {
        el.innerText = "";
        renderTransclude(el, note, link, recursiveDepth);
      }
    }
  });
}
function parseLink(src) {
  const linkComponentsRegex = /^(?<file>[^#^]+)?(?:#(?!\^)(?<heading>.+)|#\^(?<blockId>.+)|#)?$/;
  const matched = typeof src === "string" && src.match(linkComponentsRegex);
  const file = matched.groups.file || this.currentCard.note.path;
  const target = this.plugin.app.metadataCache.getFirstLinkpathDest(
    file,
    this.currentCard.note.path
  );
  return {
    text: matched[0],
    file: matched.groups.file,
    heading: matched.groups.heading,
    blockId: matched.groups.blockId,
    target
  };
}
function embedMediaFile(el, target) {
  el.innerText = "";
  if (IMAGE_FORMATS.includes(target.extension)) {
    el.createEl(
      "img",
      {
        attr: {
          src: this.plugin.app.vault.getResourcePath(target)
        }
      },
      (img) => {
        if (el.hasAttribute("width"))
          img.setAttribute("width", el.getAttribute("width"));
        else
          img.setAttribute("width", "100%");
        if (el.hasAttribute("alt"))
          img.setAttribute("alt", el.getAttribute("alt"));
        el.addEventListener(
          "click",
          (ev) => ev.target.style.minWidth = ev.target.style.minWidth === "100%" ? null : "100%"
        );
      }
    );
    el.addClasses(["image-embed", "is-loaded"]);
  } else if (AUDIO_FORMATS.includes(target.extension) || VIDEO_FORMATS.includes(target.extension)) {
    el.createEl(
      AUDIO_FORMATS.includes(target.extension) ? "audio" : "video",
      {
        attr: {
          controls: "",
          src: this.plugin.app.vault.getResourcePath(target)
        }
      },
      (audio) => {
        if (el.hasAttribute("alt"))
          audio.setAttribute("alt", el.getAttribute("alt"));
      }
    );
    el.addClasses(["media-embed", "is-loaded"]);
  } else {
    el.innerText = target.path;
  }
}
async function renderTransclude(el, note, link, recursiveDepth) {
  var _a, _b, _c, _d;
  const cache = this.app.metadataCache.getCache(link.target.path);
  const text = await this.app.vault.cachedRead(link.target);
  let blockText;
  if (link.heading) {
    const clean = (s) => s.replace(/[\W\s]/g, "");
    const headingIndex = (_a = cache.headings) == null ? void 0 : _a.findIndex(
      (h2) => clean(h2.heading) === clean(link.heading)
    );
    const heading = cache.headings[headingIndex];
    const startAt = heading.position.start.offset;
    const endAt = ((_d = (_c = (_b = cache.headings.slice(headingIndex + 1).find((h2) => h2.level <= heading.level)) == null ? void 0 : _b.position) == null ? void 0 : _c.start) == null ? void 0 : _d.offset) || text.length;
    blockText = text.substring(startAt, endAt);
  } else if (link.blockId) {
    const block = cache.blocks[link.blockId];
    const startAt = block.position.start.offset;
    const endAt = block.position.end.offset;
    blockText = text.substring(startAt, endAt);
  } else {
    blockText = text;
  }
  renderMarkdownWrapper(blockText, note, el, recursiveDepth + 1);
}

// src/card-review-view/flashcard-menu.ts
var import_obsidian7 = require("obsidian");
function setupFlashCardMenu(flashcardMenuDiv) {
  function makeButton(id, iconName, ariaLabel) {
    let button = flashcardMenuDiv.createEl("button");
    button.addClass("sr-flashcard-menu-item");
    (0, import_obsidian7.setIcon)(button, iconName);
    button.setAttribute("id", id);
    button.setAttribute("aria-label", ariaLabel);
    return button;
  }
  makeButton("sr-quit-view-btn", "arrow-left", t("BACK"));
  makeButton("sr-edit-card-btn", "edit", t("EDIT_CARD"));
  makeButton("sr-reset-card-btn", "refresh-cw", t("RESET_CARD_PROGRESS"));
  makeButton("sr-card-info-btn", "info", "View Card Info");
  makeButton("sr-skip-card-btn", "chevrons-right", t("SKIP"));
}

// src/card-review-view/response-menu.ts
function setupResponseMenu(contentEl, settings) {
  let responseDiv = contentEl.createDiv("sr-flashcard-response");
  let ratingBtnsDiv = responseDiv.createDiv("sr-flashcard-rating-btns");
  ratingBtnsDiv.style.display = "none";
  let hardBtn = ratingBtnsDiv.createEl("button");
  hardBtn.setAttribute("id", "sr-hard-btn");
  hardBtn.setText(settings.flashcardHardText);
  let goodBtn = ratingBtnsDiv.createEl("button");
  goodBtn.setAttribute("id", "sr-good-btn");
  goodBtn.setText(settings.flashcardGoodText);
  let easyBtn = ratingBtnsDiv.createEl("button");
  easyBtn.setAttribute("id", "sr-easy-btn");
  easyBtn.setText(settings.flashcardEasyText);
  let answerBtn = responseDiv.createEl("button");
  answerBtn.setAttribute("id", "sr-show-answer-btn");
  answerBtn.setText(t("SHOW_ANSWER"));
  return { responseDiv, ratingBtnsDiv, answerBtn };
}

// src/card-review-view/util.ts
function forEachButton(fn) {
  const buttonInfo = [
    ["sr-hard-btn", 2 /* Hard */],
    ["sr-good-btn", 1 /* Medium */],
    ["sr-easy-btn", 0 /* Easy */]
  ];
  for (let [buttonId, reviewRating] of buttonInfo) {
    fn(buttonId, reviewRating);
  }
}

// node_modules/@badrap/result/dist/index.modern.mjs
var r = class {
  unwrap(r2, t3) {
    const e2 = this._chain((t4) => n.ok(r2 ? r2(t4) : t4), (r3) => t3 ? n.ok(t3(r3)) : n.err(r3));
    if (e2.isErr)
      throw e2.error;
    return e2.value;
  }
  map(r2, t3) {
    return this._chain((t4) => n.ok(r2(t4)), (r3) => n.err(t3 ? t3(r3) : r3));
  }
  chain(r2, t3) {
    return this._chain(r2, t3 || ((r3) => n.err(r3)));
  }
};
var t2 = class extends r {
  constructor(r2) {
    super(), this.value = void 0, this.isOk = true, this.isErr = false, this.value = r2;
  }
  _chain(r2, t3) {
    return r2(this.value);
  }
};
var e = class extends r {
  constructor(r2) {
    super(), this.error = void 0, this.isOk = false, this.isErr = true, this.error = r2;
  }
  _chain(r2, t3) {
    return t3(this.error);
  }
};
var n;
!function(r2) {
  r2.ok = function(r3) {
    return new t2(r3);
  }, r2.err = function(r3) {
    return new e(r3 || new Error());
  }, r2.all = function(t3) {
    if (Array.isArray(t3)) {
      const e3 = [];
      for (let r3 = 0; r3 < t3.length; r3++) {
        const n3 = t3[r3];
        if (n3.isErr)
          return n3;
        e3.push(n3.value);
      }
      return r2.ok(e3);
    }
    const e2 = {}, n2 = Object.keys(t3);
    for (let r3 = 0; r3 < n2.length; r3++) {
      const s = t3[n2[r3]];
      if (s.isErr)
        return s;
      e2[n2[r3]] = s.value;
    }
    return r2.ok(e2);
  };
}(n || (n = {}));

// src/ddd/modules/review/useCases/ReviewCard/ReviewCard.ts
var ReviewCard = class {
  constructor(cardRepo, reviewService2) {
    this.cardRepo = cardRepo;
    this.reviewService = reviewService2;
  }
  async execute(request) {
    const { card, reviewRating } = request;
    card.reviewSettings = this.reviewService.newReviewSettings(card.reviewSettings, reviewRating);
    console.log("reviewSettings changed to ", card.reviewSettings);
    try {
      await this.cardRepo.save(card);
      return n.ok(null);
    } catch (err) {
      return n.err(err);
    }
  }
};

// src/ddd/modules/review/services/ReviewService/implementations/CustomReviewService.ts
var CustomReviewService = class {
  constructor(pluginSettings2) {
    this.pluginSettings = pluginSettings2;
  }
  newReviewSettings(reviewSettings, rating) {
    return this.customNewReviewSettings(reviewSettings, rating, this.pluginSettings);
  }
  customNewReviewSettings(reviewSettings, rating, pluginSettings2) {
    let interval = reviewSettings.interval;
    let ease = reviewSettings.ease;
    let delayBeforeReview = Math.max(0, Math.floor(reviewSettings.delayBeforeReview / (24 * 3600 * 1e3)));
    switch (rating) {
      case 0 /* Easy */: {
        ease += 20;
        interval = pluginSettings2.easyBonus * ((interval + delayBeforeReview) * ease) / 100;
      }
      case 1 /* Medium */: {
        interval = (interval + delayBeforeReview / 2) * ease / 100;
      }
      case 2 /* Hard */: {
        ease = Math.max(130, ease - 20);
        interval = Math.max(
          1,
          (interval + delayBeforeReview / 4) * pluginSettings2.lapsesIntervalChange
        );
      }
    }
    interval = Math.min(interval, pluginSettings2.maximumInterval);
    interval = Math.round(interval * 10) / 10;
    return { interval, ease, delayBeforeReview };
  }
};

// src/ddd/modules/review/services/ReviewService/index.ts
var pluginSettings = DEFAULT_SETTINGS;
var reviewService = new CustomReviewService(pluginSettings);

// src/card-review-view/sr-view.ts
var SR_VIEW = "spaced-repetition-view";
var SpacedRepetitionView = class extends import_obsidian8.ItemView {
  // private dueCards: Card[];
  // private newCards: Card[];
  // private currentCardIdx: number
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
  }
  getViewType() {
    return SR_VIEW;
  }
  getDisplayText() {
    return "Card review";
  }
  async onOpen() {
    this.reviewCardUseCase = new ReviewCard(this.plugin.cardRepo, reviewService);
    const decks = await this.plugin.cardRepo.decks();
    this.cardsToReview = await this.plugin.cardRepo.getByDecks([...decks]);
    this.cardIndex = 0;
    this.setupCardsView();
    this.showNextCard();
  }
  async onClose() {
  }
  setupCardsView() {
    this.contentEl.empty();
    const flashcardMenuDiv = this.contentEl.createDiv("sr-flashcard-menu");
    setupFlashCardMenu(flashcardMenuDiv);
    flashcardMenuDiv.children.namedItem("sr-quit-view-btn");
    let flashcardView = this.contentEl.createDiv();
    flashcardView.setAttribute("id", "sr-flashcard-view");
    this.flashcardView = flashcardView;
    let out = setupResponseMenu(this.contentEl, this.plugin.data.settings);
    this.answerBtn = out.answerBtn;
    this.answerBtn.addEventListener("click", () => this.showAnswer());
    this.ratingBtnsDiv = out.ratingBtnsDiv;
    forEachButton((buttonId, response) => {
      this.ratingBtnsDiv.children.namedItem(buttonId).addEventListener("click", () => {
        this.reviewCardUseCase.execute({
          card: this.currentCard,
          reviewRating: response
        });
        this.showNextCard();
      });
    });
  }
  showAnswer() {
    this.answerBtn.style.display = "none";
    this.ratingBtnsDiv.style.display = "flex";
    this.flashcardView.createEl("hr", "sr-hr-card-divide");
    renderMarkdownWrapper(this.currentCard.back, this.currentCard.location.file, this.flashcardView);
  }
  showNextCard() {
    this.ratingBtnsDiv.style.display = "none";
    this.answerBtn.style.display = "flex";
    this.flashcardView.empty();
    this.currentCard = this.getNewCard();
    renderMarkdownWrapper(this.currentCard.front, this.currentCard.location.file, this.flashcardView);
  }
  /**
  * Select new card from pool of due and new cards and get its stats.
  */
  getNewCard() {
    const newCard = this.cardsToReview[this.cardIndex];
    console.log("new card ", newCard);
    this.cardIndex += 1;
    return newCard;
  }
};

// node_modules/uuid/dist/esm-browser/rng.js
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}

// node_modules/uuid/dist/esm-browser/stringify.js
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

// node_modules/uuid/dist/esm-browser/native.js
var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var native_default = {
  randomUUID
};

// node_modules/uuid/dist/esm-browser/v4.js
function v4(options, buf, offset) {
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default = v4;

// src/ddd/core/domain/Identifier.ts
var Identifier = class {
  constructor(value) {
    this.value = value;
    this.value = value;
  }
  equals(id) {
    if (id === null || id === void 0) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return false;
    }
    return id.toValue() === this.value;
  }
  toString() {
    return String(this.value);
  }
  /**
   * Return raw value of identifier
   */
  toValue() {
    return this.value;
  }
};

// src/ddd/core/domain/UniqueEntityId.ts
var UniqueEntityId = class extends Identifier {
  constructor(id) {
    super(id ? id : v4_default());
  }
};

// src/ddd/core/domain/Entity.ts
var isEntity = (v) => {
  return v instanceof Entity;
};
var Entity = class {
  // Take note of this particular nuance here:
  // Why is "id" optional?
  constructor(props, id) {
    this._id = id ? id : new UniqueEntityId();
    this.props = props;
  }
  // Entities are compared based on their referential
  // equality.
  equals(object) {
    if (object == null || object == void 0) {
      return false;
    }
    if (this === object) {
      return true;
    }
    if (!isEntity(object)) {
      return false;
    }
    return this._id.equals(object._id);
  }
};

// src/ddd/modules/review/domain/Deck.ts
var Deck = class extends Entity {
  constructor(props, id) {
    super(props, id);
  }
  static create(props, id) {
    if (props.subdecks.some((deck) => deck === props.parent)) {
      throw new Error(`Parent deck ${props.parent} is also in children`);
    }
    return new Deck(props, id);
  }
};

// src/repo/ObsidianCardRepo.ts
var ObsidianCard = class extends Entity {
  constructor(props, id) {
    super(props, id);
  }
  static create(props, id) {
    return n.ok(new ObsidianCard(props, id));
  }
  static isDue(card) {
    throw new Error("Not yet implemented!");
  }
  get id() {
    return this._id;
  }
  get type() {
    return this.props.type;
  }
  get deck() {
    return this.props.deck;
  }
  get front() {
    return this.props.front;
  }
  get back() {
    return this.props.back;
  }
  get reviewSettings() {
    return this.props.reviewSettings;
  }
  set reviewSettings(reviewSettings) {
    this.props.reviewSettings = reviewSettings;
  }
  get location() {
    return this.props.location;
  }
};
var ObsidianCardRepo = class {
  constructor(pluginSettings2) {
    this.settings = pluginSettings2;
    this._items = [];
  }
  // async saveCardsFromNote (note: TFile): Promise<void> { }
  async getByDecks(decks) {
    return this._items.filter((card) => decks.contains(card.deck));
  }
  async save(card) {
    if (!this._items.contains(card)) {
      this._items.push(card);
    }
  }
  async decks() {
    return new Set(this._items.map((card) => card.deck));
  }
};

// src/main.ts
var DEFAULT_DATA = {
  settings: DEFAULT_SETTINGS,
  buryDate: "",
  buryList: [],
  historyDeck: null
};
var SRPlugin = class extends import_obsidian9.Plugin {
  constructor() {
    super(...arguments);
    this.syncLock = false;
  }
  async onload() {
    await this.loadPluginData();
    showAppIcon();
    this.registerView(SR_VIEW, (leaf) => new SpacedRepetitionView(leaf, this));
    this.addRibbonIcon("SpacedRepIcon", t("REVIEW_CARDS"), async () => {
      if (!this.syncLock) {
        await this.sync();
        this.app.workspace.detachLeavesOfType(SR_VIEW);
        await this.app.workspace.getLeaf("tab").setViewState({
          type: SR_VIEW,
          active: true
        });
        this.app.workspace.revealLeaf(
          this.app.workspace.getLeavesOfType(SR_VIEW)[0]
        );
      }
    });
    if (!this.data.settings.disableFileMenuReviewOptions) {
      this.registerEvent(
        this.app.workspace.on("file-menu", (menu, fileish) => {
          if (fileish instanceof import_obsidian9.TFile && fileish.extension === "md") {
            menu.addItem((item) => {
              item.setTitle(t("REVIEW_EASY_FILE_MENU")).setIcon("SpacedRepIcon").onClick(() => {
                this.saveReviewResponse(fileish, ReviewResponse.Easy);
              });
            });
            menu.addItem((item) => {
              item.setTitle(t("REVIEW_GOOD_FILE_MENU")).setIcon("SpacedRepIcon").onClick(() => {
                this.saveReviewResponse(fileish, ReviewResponse.Good);
              });
            });
            menu.addItem((item) => {
              item.setTitle(t("REVIEW_HARD_FILE_MENU")).setIcon("SpacedRepIcon").onClick(() => {
                this.saveReviewResponse(fileish, ReviewResponse.Hard);
              });
            });
          }
        })
      );
    }
    this.addCommand({
      id: "srs-note-review-easy",
      name: t("REVIEW_NOTE_EASY_CMD"),
      callback: () => {
        const openFile = this.app.workspace.getActiveFile();
        if (openFile && openFile.extension === "md") {
          this.saveReviewResponse(openFile, ReviewResponse.Easy);
        }
      }
    });
    this.addCommand({
      id: "srs-note-review-good",
      name: t("REVIEW_NOTE_GOOD_CMD"),
      callback: () => {
        const openFile = this.app.workspace.getActiveFile();
        if (openFile && openFile.extension === "md") {
          this.saveReviewResponse(openFile, ReviewResponse.Good);
        }
      }
    });
    this.addCommand({
      id: "srs-note-review-hard",
      name: t("REVIEW_NOTE_HARD_CMD"),
      callback: () => {
        const openFile = this.app.workspace.getActiveFile();
        if (openFile && openFile.extension === "md") {
          this.saveReviewResponse(openFile, ReviewResponse.Hard);
        }
      }
    });
    this.addCommand({
      id: "srs-review-flashcards",
      name: t("REVIEW_ALL_CARDS"),
      callback: async () => {
        if (!this.syncLock) {
          await this.sync();
          new FlashcardModal(this.app, this).open();
        }
      }
    });
    this.addCommand({
      id: "srs-cram-flashcards",
      name: t("CRAM_ALL_CARDS"),
      callback: async () => {
        await this.sync(true);
        new FlashcardModal(this.app, this, true).open();
      }
    });
    this.addCommand({
      id: "srs-review-flashcards-in-note",
      name: t("REVIEW_CARDS_IN_NOTE"),
      callback: async () => {
        const openFile = this.app.workspace.getActiveFile();
        if (openFile && openFile.extension === "md") {
          await this.sync();
          const deckPath = this.findDeckPath(openFile);
          const cards = await this.cardRepo.getByDecks([deckPath]);
          new FlashcardModal(this.app, this).open();
        }
      }
    });
    this.addCommand({
      id: "srs-cram-flashcards-in-note",
      name: t("CRAM_CARDS_IN_NOTE"),
      callback: async () => {
        const openFile = this.app.workspace.getActiveFile();
        if (openFile && openFile.extension === "md") {
          this.deckTree = new Deck("root", null);
          const deckPath = this.findDeckPath(openFile);
          await this.findFlashcardsInNote(openFile, deckPath, false, true);
          new FlashcardModal(this.app, this, true).open();
        }
      }
    });
    this.addCommand({
      id: "srs-view-stats",
      name: t("VIEW_STATS"),
      callback: async () => {
        if (!this.syncLock) {
          await this.sync();
          new StatsModal(this.app, this).open();
        }
      }
    });
    this.addSettingTab(new SRSettingTab(this.app, this));
    this.app.workspace.onLayoutReady(() => {
      this.initView();
      setTimeout(async () => {
        await this.sync();
      }, 2e3);
    });
  }
  onunload() {
    this.app.workspace.getLeavesOfType(REVIEW_QUEUE_VIEW_TYPE).forEach((leaf) => leaf.detach());
  }
  async sync(ignoreStats = false) {
    if (this.syncLock) {
      return;
    }
    this.syncLock = true;
    this.cardRepo = new ObsidianCardRepo(this.data.settings);
    const now = window.moment(Date.now());
    const todayDate = now.format("YYYY-MM-DD");
    if (todayDate !== this.data.buryDate) {
      this.data.buryDate = todayDate;
      this.data.buryList = [];
    }
    const notes = this.app.vault.getMarkdownFiles();
    for (const note of notes) {
      if (this.data.settings.noteFoldersToIgnore.some(
        (folder) => note.path.startsWith(folder)
      )) {
        continue;
      }
      const deckPath = this.findDeckPath(note);
      if (deckPath.length !== 0) {
        let cardsInNote = await this.findFlashcardsInNote(
          note,
          deckPath,
          false,
          ignoreStats
        );
        for (const card of cardsInNote) {
          this.cardRepo.save(card);
        }
      }
    }
    graph.rank(0.85, 1e-6, (node, rank2) => {
      this.pageranks[node] = rank2 * 1e4;
    });
    if (this.data.settings.showDebugMessages) {
      console.log(`SR: ${t("EASES")}`, this.easeByPath);
      console.log(`SR: ${t("DECKS")}`, this.deckTree);
    }
    if (this.data.settings.showDebugMessages) {
      console.log("SR: " + t("SYNC_TIME_TAKEN", { t: Date.now() - now.valueOf() }));
    }
    if (this.data.settings.enableNoteReviewPaneOnStartup) {
      this.reviewQueueView.redraw();
    }
    this.syncLock = false;
  }
  async saveReviewResponse(note, response) {
    const fileCachedData = this.app.metadataCache.getFileCache(note) || {};
    const frontmatter = fileCachedData.frontmatter || {};
    const tags = (0, import_obsidian9.getAllTags)(fileCachedData) || [];
    if (this.data.settings.noteFoldersToIgnore.some((folder) => note.path.startsWith(folder))) {
      new import_obsidian9.Notice(t("NOTE_IN_IGNORED_FOLDER"));
      return;
    }
    let shouldIgnore = true;
    for (const tag of tags) {
      if (this.data.settings.tagsToReview.some(
        (tagToReview) => tag === tagToReview || tag.startsWith(tagToReview + "/")
      )) {
        shouldIgnore = false;
        break;
      }
    }
    if (shouldIgnore) {
      new import_obsidian9.Notice(t("PLEASE_TAG_NOTE"));
      return;
    }
    let fileText = await this.app.vault.read(note);
    let ease, interval, delayBeforeReview;
    const now = Date.now();
    if (!(Object.prototype.hasOwnProperty.call(frontmatter, "sr-due") && Object.prototype.hasOwnProperty.call(frontmatter, "sr-interval") && Object.prototype.hasOwnProperty.call(frontmatter, "sr-ease"))) {
      let linkTotal = 0, linkPGTotal = 0, totalLinkCount = 0;
      for (const statObj of this.incomingLinks[note.path] || []) {
        const ease2 = this.easeByPath[statObj.sourcePath];
        if (ease2) {
          linkTotal += statObj.linkCount * this.pageranks[statObj.sourcePath] * ease2;
          linkPGTotal += this.pageranks[statObj.sourcePath] * statObj.linkCount;
          totalLinkCount += statObj.linkCount;
        }
      }
      const outgoingLinks = this.app.metadataCache.resolvedLinks[note.path] || {};
      for (const linkedFilePath in outgoingLinks) {
        const ease2 = this.easeByPath[linkedFilePath];
        if (ease2) {
          linkTotal += outgoingLinks[linkedFilePath] * this.pageranks[linkedFilePath] * ease2;
          linkPGTotal += this.pageranks[linkedFilePath] * outgoingLinks[linkedFilePath];
          totalLinkCount += outgoingLinks[linkedFilePath];
        }
      }
      const linkContribution = this.data.settings.maxLinkFactor * Math.min(1, Math.log(totalLinkCount + 0.5) / Math.log(64));
      ease = (1 - linkContribution) * this.data.settings.baseEase + (totalLinkCount > 0 ? linkContribution * linkTotal / linkPGTotal : linkContribution * this.data.settings.baseEase);
      if (Object.prototype.hasOwnProperty.call(this.easeByPath, note.path)) {
        ease = (ease + this.easeByPath[note.path]) / 2;
      }
      ease = Math.round(ease);
      interval = 1;
      delayBeforeReview = 0;
    } else {
      interval = frontmatter["sr-interval"];
      ease = frontmatter["sr-ease"];
      delayBeforeReview = now - window.moment(frontmatter["sr-due"], ["YYYY-MM-DD", "DD-MM-YYYY", "ddd MMM DD YYYY"]).valueOf();
    }
    const schedObj = schedule(
      response,
      {
        interval,
        ease,
        delayBeforeReview
      },
      this.data.settings,
      this.dueDatesNotes
    );
    interval = schedObj.interval;
    ease = schedObj.ease;
    const due = window.moment(now + interval * 24 * 3600 * 1e3);
    const dueString = due.format("YYYY-MM-DD");
    if (SCHEDULING_INFO_REGEX.test(fileText)) {
      const schedulingInfo = SCHEDULING_INFO_REGEX.exec(fileText);
      fileText = fileText.replace(
        SCHEDULING_INFO_REGEX,
        `---
${schedulingInfo[1]}sr-due: ${dueString}
sr-interval: ${interval}
sr-ease: ${ease}
${schedulingInfo[5]}---`
      );
    } else if (YAML_FRONT_MATTER_REGEX.test(fileText)) {
      const existingYaml = YAML_FRONT_MATTER_REGEX.exec(fileText);
      fileText = fileText.replace(
        YAML_FRONT_MATTER_REGEX,
        `---
${existingYaml[1]}sr-due: ${dueString}
sr-interval: ${interval}
sr-ease: ${ease}
---`
      );
    } else {
      fileText = `---
sr-due: ${dueString}
sr-interval: ${interval}
sr-ease: ${ease}
---

${fileText}`;
    }
    if (this.data.settings.burySiblingCards) {
      await this.findFlashcardsInNote(note, [], true);
      await this.savePluginData();
    }
    await this.app.vault.modify(note, fileText);
    new import_obsidian9.Notice(t("RESPONSE_RECEIVED"));
    await this.sync();
  }
  findDeckPath(note) {
    let deckPath = [];
    if (this.data.settings.convertFoldersToDecks) {
      deckPath = note.path.split("/");
      deckPath.pop();
      if (deckPath.length === 0) {
        deckPath = ["/"];
      }
    } else {
      const fileCachedData = this.app.metadataCache.getFileCache(note) || {};
      const tags = (0, import_obsidian9.getAllTags)(fileCachedData) || [];
      outer:
        for (const tagToReview of this.data.settings.flashcardTags) {
          for (const tag of tags) {
            if (tag === tagToReview || tag.startsWith(tagToReview + "/")) {
              deckPath = tag.substring(1).split("/");
              break outer;
            }
          }
        }
    }
    return deckPath;
  }
  async findFlashcardsInNote(note, deckPath, buryOnly = false, ignoreStats = false) {
    var _a;
    let fileText = await this.app.vault.read(note);
    const fileCachedData = this.app.metadataCache.getFileCache(note) || {};
    const headings = fileCachedData.headings || [];
    const settings = this.data.settings;
    const noteDeckPath = deckPath;
    let cards = [];
    const now = Date.now();
    const parsedCards = parse(
      fileText,
      settings.singleLineCardSeparator,
      settings.singleLineReversedCardSeparator,
      settings.multilineCardSeparator,
      settings.multilineReversedCardSeparator,
      settings.convertHighlightsToClozes,
      settings.convertBoldTextToClozes,
      settings.convertCurlyBracketsToClozes
    );
    for (const parsedCard of parsedCards) {
      let { cardType, cardText, lineNumber } = parsedCard;
      deckPath = noteDeckPath;
      if (!settings.convertFoldersToDecks) {
        const tagInCardRegExp = /^#[^\s#]+/gi;
        const cardDeckPath = (_a = cardText.match(tagInCardRegExp)) == null ? void 0 : _a.slice(-1)[0].replace("#", "").split("/");
        if (cardDeckPath) {
          deckPath = cardDeckPath;
          cardText = cardText.replaceAll(tagInCardRegExp, "");
        }
      }
      const deck = Deck.create({ name: deckPath.join(), parent: null, subdecks: [] });
      const siblingMatches = getCardSiblings(cardType, cardText, settings);
      const { scheduling, newFileText } = doSchedulingStuff(fileText, cardText, siblingMatches);
      if (newFileText != null) {
        await this.app.vault.modify(note, newFileText);
      }
      let siblings = [];
      for (let i = 0; i < siblingMatches.length; i++) {
        let cardProps = {
          type: cardType,
          deck,
          front: siblingMatches[i][0].trim(),
          back: siblingMatches[i][1].trim(),
          cardText,
          context: getCardContext(lineNumber, headings, note.basename),
          // isDue: i < scheduling.length,
          location: { file: note, lineNumber },
          indexInSiblings: i,
          // Set later
          siblings: void 0,
          // Set later
          reviewSettings: void 0
        };
        siblings.push(cardProps);
      }
      let cardReviewSettings = {
        interval: 0,
        ease: 0,
        delayBeforeReview: 0
      };
      for (const s of scheduling) {
        if (s != null) {
          cardReviewSettings = {
            interval: s.interval,
            ease: s.ease,
            delayBeforeReview: now - s.dueUnix
          };
        }
      }
      for (let sibling of siblings) {
        sibling.reviewSettings = cardReviewSettings;
      }
      for (let sibling of siblings) {
        sibling.siblings = siblings;
        cards.push(ObsidianCard.create(sibling).unwrap());
      }
    }
    return cards;
  }
  async loadPluginData() {
    this.data = Object.assign({}, DEFAULT_DATA, await this.loadData());
    this.data.settings = Object.assign({}, DEFAULT_SETTINGS, this.data.settings);
  }
  async savePluginData() {
    await this.saveData(this.data);
  }
  initView() {
    this.registerView(
      REVIEW_QUEUE_VIEW_TYPE,
      (leaf) => this.reviewQueueView = new ReviewQueueListView(leaf, this)
    );
    if (this.data.settings.enableNoteReviewPaneOnStartup && app.workspace.getLeavesOfType(REVIEW_QUEUE_VIEW_TYPE).length == 0) {
      this.app.workspace.getRightLeaf(false).setViewState({
        type: REVIEW_QUEUE_VIEW_TYPE,
        active: true
      });
    }
  }
};
function getCardContext(cardLine, headings, note_title) {
  const stack = [];
  for (const heading of headings) {
    if (heading.position.start.line > cardLine) {
      break;
    }
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop();
    }
    stack.push(heading);
  }
  let context = `${note_title} > `;
  for (const headingObj of stack) {
    headingObj.heading = headingObj.heading.replace(/\[\^\d+\]/gm, "").trim();
    context += `${headingObj.heading} > `;
  }
  return context.slice(0, -3);
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL3BhZ2VyYW5rLmpzL2xpYi9pbmRleC5qcyIsICJub2RlX21vZHVsZXMvdmh0bWwvc3JjL2VtcHR5LXRhZ3MuanMiLCAibm9kZV9tb2R1bGVzL3ZodG1sL3NyYy92aHRtbC5qcyIsICJzcmMvbWFpbi50cyIsICJzcmMvc2V0dGluZ3MudHMiLCAic3JjL2xhbmcvaGVscGVycy50cyIsICJzcmMvbGFuZy9sb2NhbGUvYWYudHMiLCAic3JjL2xhbmcvbG9jYWxlL2FyLnRzIiwgInNyYy9sYW5nL2xvY2FsZS9jei50cyIsICJzcmMvbGFuZy9sb2NhbGUvYm4udHMiLCAic3JjL2xhbmcvbG9jYWxlL2RhLnRzIiwgInNyYy9sYW5nL2xvY2FsZS9kZS50cyIsICJzcmMvbGFuZy9sb2NhbGUvZW4udHMiLCAic3JjL2xhbmcvbG9jYWxlL2VuLWdiLnRzIiwgInNyYy9sYW5nL2xvY2FsZS9lcy50cyIsICJzcmMvbGFuZy9sb2NhbGUvZnIudHMiLCAic3JjL2xhbmcvbG9jYWxlL2hpLnRzIiwgInNyYy9sYW5nL2xvY2FsZS9pZC50cyIsICJzcmMvbGFuZy9sb2NhbGUvaXQudHMiLCAic3JjL2xhbmcvbG9jYWxlL2phLnRzIiwgInNyYy9sYW5nL2xvY2FsZS9rby50cyIsICJzcmMvbGFuZy9sb2NhbGUvbXIudHMiLCAic3JjL2xhbmcvbG9jYWxlL25sLnRzIiwgInNyYy9sYW5nL2xvY2FsZS9uby50cyIsICJzcmMvbGFuZy9sb2NhbGUvcGwudHMiLCAic3JjL2xhbmcvbG9jYWxlL3B0LnRzIiwgInNyYy9sYW5nL2xvY2FsZS9wdC1ici50cyIsICJzcmMvbGFuZy9sb2NhbGUvcm8udHMiLCAic3JjL2xhbmcvbG9jYWxlL3J1LnRzIiwgInNyYy9sYW5nL2xvY2FsZS90YS50cyIsICJzcmMvbGFuZy9sb2NhbGUvdGUudHMiLCAic3JjL2xhbmcvbG9jYWxlL3RoLnRzIiwgInNyYy9sYW5nL2xvY2FsZS90ci50cyIsICJzcmMvbGFuZy9sb2NhbGUvdWsudHMiLCAic3JjL2xhbmcvbG9jYWxlL3VyLnRzIiwgInNyYy9sYW5nL2xvY2FsZS92aS50cyIsICJzcmMvbGFuZy9sb2NhbGUvemgtY24udHMiLCAic3JjL2xhbmcvbG9jYWxlL3poLXR3LnRzIiwgInNyYy9mbGFzaGNhcmQtbW9kYWwudHN4IiwgInNyYy9zY2hlZHVsaW5nLnRzIiwgInNyYy9jb25zdGFudHMudHMiLCAic3JjL3V0aWxzLnRzIiwgInNyYy9zaWRlYmFyLnRzIiwgInNyYy9wYXJzZXIudHMiLCAic3JjL2ljb25zL2FwcEljb24udHMiLCAic3JjL2NhcmQtcmV2aWV3LXZpZXcvc3Itdmlldy50cyIsICJzcmMvY2FyZC1yZXZpZXctdmlldy9yZW5kZXItY2FyZC50cyIsICJzcmMvY2FyZC1yZXZpZXctdmlldy9mbGFzaGNhcmQtbWVudS50cyIsICJzcmMvY2FyZC1yZXZpZXctdmlldy9yZXNwb25zZS1tZW51LnRzIiwgInNyYy9jYXJkLXJldmlldy12aWV3L3V0aWwudHMiLCAibm9kZV9tb2R1bGVzL0BiYWRyYXAvcmVzdWx0L3NyYy9pbmRleC50cyIsICJzcmMvZGRkL21vZHVsZXMvcmV2aWV3L3VzZUNhc2VzL1Jldmlld0NhcmQvUmV2aWV3Q2FyZC50cyIsICJzcmMvZGRkL21vZHVsZXMvcmV2aWV3L3NlcnZpY2VzL1Jldmlld1NlcnZpY2UvaW1wbGVtZW50YXRpb25zL0N1c3RvbVJldmlld1NlcnZpY2UudHMiLCAic3JjL2RkZC9tb2R1bGVzL3Jldmlldy9zZXJ2aWNlcy9SZXZpZXdTZXJ2aWNlL2luZGV4LnRzIiwgIm5vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcm5nLmpzIiwgIm5vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwgIm5vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvbmF0aXZlLmpzIiwgIm5vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCAic3JjL2RkZC9jb3JlL2RvbWFpbi9JZGVudGlmaWVyLnRzIiwgInNyYy9kZGQvY29yZS9kb21haW4vVW5pcXVlRW50aXR5SWQudHMiLCAic3JjL2RkZC9jb3JlL2RvbWFpbi9FbnRpdHkudHMiLCAic3JjL2RkZC9tb2R1bGVzL3Jldmlldy9kb21haW4vRGVjay50cyIsICJzcmMvcmVwby9PYnNpZGlhbkNhcmRSZXBvLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGZvck93bihvYmplY3QsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JykgJiYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAgICAgICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKGtleSwgb2JqZWN0W2tleV0pID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHtcbiAgICAgICAgY291bnQ6IDAsXG4gICAgICAgIGVkZ2VzOiB7fSxcbiAgICAgICAgbm9kZXM6IHt9XG4gICAgfTtcblxuICAgIHNlbGYubGluayA9IGZ1bmN0aW9uIChzb3VyY2UsIHRhcmdldCwgd2VpZ2h0KSB7XG4gICAgICAgIGlmICgoaXNGaW5pdGUod2VpZ2h0KSAhPT0gdHJ1ZSkgfHwgKHdlaWdodCA9PT0gbnVsbCkpIHtcbiAgICAgICAgICAgIHdlaWdodCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHdlaWdodCA9IHBhcnNlRmxvYXQod2VpZ2h0KTtcblxuICAgICAgICBpZiAoc2VsZi5ub2Rlcy5oYXNPd25Qcm9wZXJ0eShzb3VyY2UpICE9PSB0cnVlKSB7XG4gICAgICAgICAgICBzZWxmLmNvdW50Kys7XG4gICAgICAgICAgICBzZWxmLm5vZGVzW3NvdXJjZV0gPSB7XG4gICAgICAgICAgICAgICAgd2VpZ2h0OiAwLFxuICAgICAgICAgICAgICAgIG91dGJvdW5kOiAwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi5ub2Rlc1tzb3VyY2VdLm91dGJvdW5kICs9IHdlaWdodDtcblxuICAgICAgICBpZiAoc2VsZi5ub2Rlcy5oYXNPd25Qcm9wZXJ0eSh0YXJnZXQpICE9PSB0cnVlKSB7XG4gICAgICAgICAgICBzZWxmLmNvdW50Kys7XG4gICAgICAgICAgICBzZWxmLm5vZGVzW3RhcmdldF0gPSB7XG4gICAgICAgICAgICAgICAgd2VpZ2h0OiAwLFxuICAgICAgICAgICAgICAgIG91dGJvdW5kOiAwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGYuZWRnZXMuaGFzT3duUHJvcGVydHkoc291cmNlKSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgc2VsZi5lZGdlc1tzb3VyY2VdID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZi5lZGdlc1tzb3VyY2VdLmhhc093blByb3BlcnR5KHRhcmdldCkgIT09IHRydWUpIHtcbiAgICAgICAgICAgIHNlbGYuZWRnZXNbc291cmNlXVt0YXJnZXRdID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYuZWRnZXNbc291cmNlXVt0YXJnZXRdICs9IHdlaWdodDtcbiAgICB9O1xuXG4gICAgc2VsZi5yYW5rID0gZnVuY3Rpb24gKGFscGhhLCBlcHNpbG9uLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgZGVsdGEgPSAxLFxuICAgICAgICAgICAgaW52ZXJzZSA9IDEgLyBzZWxmLmNvdW50O1xuXG4gICAgICAgIGZvck93bihzZWxmLmVkZ2VzLCBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5ub2Rlc1tzb3VyY2VdLm91dGJvdW5kID4gMCkge1xuICAgICAgICAgICAgICAgIGZvck93bihzZWxmLmVkZ2VzW3NvdXJjZV0sIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lZGdlc1tzb3VyY2VdW3RhcmdldF0gLz0gc2VsZi5ub2Rlc1tzb3VyY2VdLm91dGJvdW5kO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBmb3JPd24oc2VsZi5ub2RlcywgZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgc2VsZi5ub2Rlc1trZXldLndlaWdodCA9IGludmVyc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdoaWxlIChkZWx0YSA+IGVwc2lsb24pIHtcbiAgICAgICAgICAgIHZhciBsZWFrID0gMCxcbiAgICAgICAgICAgICAgICBub2RlcyA9IHt9O1xuXG4gICAgICAgICAgICBmb3JPd24oc2VsZi5ub2RlcywgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBub2Rlc1trZXldID0gdmFsdWUud2VpZ2h0O1xuXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLm91dGJvdW5kID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlYWsgKz0gdmFsdWUud2VpZ2h0O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNlbGYubm9kZXNba2V5XS53ZWlnaHQgPSAwO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGxlYWsgKj0gYWxwaGE7XG5cbiAgICAgICAgICAgIGZvck93bihzZWxmLm5vZGVzLCBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgZm9yT3duKHNlbGYuZWRnZXNbc291cmNlXSwgZnVuY3Rpb24gKHRhcmdldCwgd2VpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZXNbdGFyZ2V0XS53ZWlnaHQgKz0gYWxwaGEgKiBub2Rlc1tzb3VyY2VdICogd2VpZ2h0O1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5ub2Rlc1tzb3VyY2VdLndlaWdodCArPSAoMSAtIGFscGhhKSAqIGludmVyc2UgKyBsZWFrICogaW52ZXJzZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkZWx0YSA9IDA7XG5cbiAgICAgICAgICAgIGZvck93bihzZWxmLm5vZGVzLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGRlbHRhICs9IE1hdGguYWJzKHZhbHVlLndlaWdodCAtIG5vZGVzW2tleV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3JPd24oc2VsZi5ub2RlcywgZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGtleSwgc2VsZi5ub2Rlc1trZXldLndlaWdodCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzZWxmLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLmNvdW50ID0gMDtcbiAgICAgICAgc2VsZi5lZGdlcyA9IHt9O1xuICAgICAgICBzZWxmLm5vZGVzID0ge307XG4gICAgfTtcblxuICAgIHJldHVybiBzZWxmO1xufSkoKTtcbiIsICJleHBvcnQgZGVmYXVsdCBbXG5cdCdhcmVhJyxcblx0J2Jhc2UnLFxuXHQnYnInLFxuXHQnY29sJyxcblx0J2NvbW1hbmQnLFxuXHQnZW1iZWQnLFxuXHQnaHInLFxuXHQnaW1nJyxcblx0J2lucHV0Jyxcblx0J2tleWdlbicsXG5cdCdsaW5rJyxcblx0J21ldGEnLFxuXHQncGFyYW0nLFxuXHQnc291cmNlJyxcblx0J3RyYWNrJyxcblx0J3dicidcbl07IiwgImltcG9ydCBlbXB0eVRhZ3MgZnJvbSAnLi9lbXB0eS10YWdzJztcblxuLy8gZXNjYXBlIGFuIGF0dHJpYnV0ZVxubGV0IGVzYyA9IHN0ciA9PiBTdHJpbmcoc3RyKS5yZXBsYWNlKC9bJjw+XCInXS9nLCBzPT5gJiR7bWFwW3NdfTtgKTtcbmxldCBtYXAgPSB7JyYnOidhbXAnLCc8JzonbHQnLCc+JzonZ3QnLCdcIic6J3F1b3QnLFwiJ1wiOidhcG9zJ307XG5sZXQgc2V0SW5uZXJIVE1MQXR0ciA9ICdkYW5nZXJvdXNseVNldElubmVySFRNTCc7XG5sZXQgRE9NQXR0cmlidXRlTmFtZXMgPSB7XG5cdGNsYXNzTmFtZTogJ2NsYXNzJyxcblx0aHRtbEZvcjogJ2Zvcidcbn07XG5cbmxldCBzYW5pdGl6ZWQgPSB7fTtcblxuLyoqIEh5cGVyc2NyaXB0IHJldml2ZXIgdGhhdCBjb25zdHJ1Y3RzIGEgc2FuaXRpemVkIEhUTUwgc3RyaW5nLiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaChuYW1lLCBhdHRycykge1xuXHRsZXQgc3RhY2s9W10sIHMgPSAnJztcblx0YXR0cnMgPSBhdHRycyB8fCB7fTtcblx0Zm9yIChsZXQgaT1hcmd1bWVudHMubGVuZ3RoOyBpLS0gPiAyOyApIHtcblx0XHRzdGFjay5wdXNoKGFyZ3VtZW50c1tpXSk7XG5cdH1cblxuXHQvLyBTb3J0b2YgY29tcG9uZW50IHN1cHBvcnQhXG5cdGlmICh0eXBlb2YgbmFtZT09PSdmdW5jdGlvbicpIHtcblx0XHRhdHRycy5jaGlsZHJlbiA9IHN0YWNrLnJldmVyc2UoKTtcblx0XHRyZXR1cm4gbmFtZShhdHRycyk7XG5cdFx0Ly8gcmV0dXJuIG5hbWUoYXR0cnMsIHN0YWNrLnJldmVyc2UoKSk7XG5cdH1cblxuXHRpZiAobmFtZSkge1xuXHRcdHMgKz0gJzwnICsgbmFtZTtcblx0XHRpZiAoYXR0cnMpIGZvciAobGV0IGkgaW4gYXR0cnMpIHtcblx0XHRcdGlmIChhdHRyc1tpXSE9PWZhbHNlICYmIGF0dHJzW2ldIT1udWxsICYmIGkgIT09IHNldElubmVySFRNTEF0dHIpIHtcblx0XHRcdFx0cyArPSBgICR7RE9NQXR0cmlidXRlTmFtZXNbaV0gPyBET01BdHRyaWJ1dGVOYW1lc1tpXSA6IGVzYyhpKX09XCIke2VzYyhhdHRyc1tpXSl9XCJgO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRzICs9ICc+Jztcblx0fVxuXG5cdGlmIChlbXB0eVRhZ3MuaW5kZXhPZihuYW1lKSA9PT0gLTEpIHtcblx0XHRpZiAoYXR0cnNbc2V0SW5uZXJIVE1MQXR0cl0pIHtcblx0XHRcdHMgKz0gYXR0cnNbc2V0SW5uZXJIVE1MQXR0cl0uX19odG1sO1xuXHRcdH1cblx0XHRlbHNlIHdoaWxlIChzdGFjay5sZW5ndGgpIHtcblx0XHRcdGxldCBjaGlsZCA9IHN0YWNrLnBvcCgpO1xuXHRcdFx0aWYgKGNoaWxkKSB7XG5cdFx0XHRcdGlmIChjaGlsZC5wb3ApIHtcblx0XHRcdFx0XHRmb3IgKGxldCBpPWNoaWxkLmxlbmd0aDsgaS0tOyApIHN0YWNrLnB1c2goY2hpbGRbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHMgKz0gc2FuaXRpemVkW2NoaWxkXT09PXRydWUgPyBjaGlsZCA6IGVzYyhjaGlsZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRzICs9IG5hbWUgPyBgPC8ke25hbWV9PmAgOiAnJztcblx0fVxuXG5cdHNhbml0aXplZFtzXSA9IHRydWU7XG5cdHJldHVybiBzO1xufVxuIiwgImltcG9ydCB7XG4gIE5vdGljZSxcbiAgUGx1Z2luLFxuICBUQWJzdHJhY3RGaWxlLFxuICBURmlsZSxcbiAgSGVhZGluZ0NhY2hlLFxuICBnZXRBbGxUYWdzLFxuICBGcm9udE1hdHRlckNhY2hlLFxufSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCAqIGFzIGdyYXBoIGZyb20gXCJwYWdlcmFuay5qc1wiO1xuXG5pbXBvcnQgeyBTUlNldHRpbmdUYWIsIFNSU2V0dGluZ3MsIERFRkFVTFRfU0VUVElOR1MgfSBmcm9tIFwic3JjL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBGbGFzaGNhcmRNb2RhbCB9IGZyb20gXCJzcmMvZmxhc2hjYXJkLW1vZGFsXCI7XG4vLyBpbXBvcnQgeyBTdGF0c01vZGFsLCBTdGF0cyB9IGZyb20gXCJzcmMvc3RhdHMtbW9kYWxcIjtcbmltcG9ydCB7IFJldmlld1F1ZXVlTGlzdFZpZXcsIFJFVklFV19RVUVVRV9WSUVXX1RZUEUgfSBmcm9tIFwic3JjL3NpZGViYXJcIjtcbmltcG9ydCB7IENhcmRTdGF0cywgc2NoZWR1bGUgfSBmcm9tIFwic3JjL3NjaGVkdWxpbmdcIjtcbmltcG9ydCB7XG4gIFlBTUxfRlJPTlRfTUFUVEVSX1JFR0VYLFxuICBTQ0hFRFVMSU5HX0lORk9fUkVHRVgsXG59IGZyb20gXCJzcmMvY29uc3RhbnRzXCI7XG5pbXBvcnQgeyB0IH0gZnJvbSBcInNyYy9sYW5nL2hlbHBlcnNcIjtcbmltcG9ydCB7IGdldENhcmRTaWJsaW5ncywgcGFyc2UsIGRvU2NoZWR1bGluZ1N0dWZmIH0gZnJvbSBcInNyYy9wYXJzZXJcIjtcbmltcG9ydCB7IHNob3dBcHBJY29uIH0gZnJvbSBcInNyYy9pY29ucy9hcHBJY29uXCI7XG5pbXBvcnQgeyBTcGFjZWRSZXBldGl0aW9uVmlldywgU1JfVklFVyB9IGZyb20gXCJzcmMvY2FyZC1yZXZpZXctdmlldy9zci12aWV3XCI7XG5cbmltcG9ydCB7IERlY2sgfSBmcm9tIFwiLi9kZGQvbW9kdWxlcy9yZXZpZXcvZG9tYWluL0RlY2tcIjtcbmltcG9ydCB7IE9ic2lkaWFuQ2FyZCB9IGZyb20gXCIuL3JlcG8vT2JzaWRpYW5DYXJkUmVwb1wiO1xuaW1wb3J0IHsgT2JzaWRpYW5DYXJkUmVwbyB9IGZyb20gXCIuL3JlcG8vT2JzaWRpYW5DYXJkUmVwb1wiO1xuaW1wb3J0IHsgQ2FyZFJldmlld1NldHRpbmdzIH0gZnJvbSBcIi4vZGRkL21vZHVsZXMvcmV2aWV3L2RvbWFpbi9DYXJkUmV2aWV3U2V0dGluZ3NcIjtcblxuaW50ZXJmYWNlIFBsdWdpbkRhdGEge1xuICBzZXR0aW5nczogU1JTZXR0aW5ncztcbiAgYnVyeURhdGU6IHN0cmluZztcbiAgLy8gaGFzaGVzIG9mIGNhcmQgdGV4dHNcbiAgLy8gc2hvdWxkIHdvcmsgYXMgbG9uZyBhcyB1c2VyIGRvZXNuJ3QgbW9kaWZ5IGNhcmQncyB0ZXh0XG4gIC8vIHdoaWNoIGNvdmVycyBtb3N0IG9mIHRoZSBjYXNlc1xuICBidXJ5TGlzdDogc3RyaW5nW107XG4gIGhpc3RvcnlEZWNrOiBzdHJpbmcgfCBudWxsO1xufVxuXG5jb25zdCBERUZBVUxUX0RBVEE6IFBsdWdpbkRhdGEgPSB7XG4gIHNldHRpbmdzOiBERUZBVUxUX1NFVFRJTkdTLFxuICBidXJ5RGF0ZTogXCJcIixcbiAgYnVyeUxpc3Q6IFtdLFxuICBoaXN0b3J5RGVjazogbnVsbCxcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGlua1N0YXQge1xuICBzb3VyY2VQYXRoOiBzdHJpbmc7XG4gIGxpbmtDb3VudDogbnVtYmVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTUlBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG4gIHByaXZhdGUgc3RhdHVzQmFyOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSByZXZpZXdRdWV1ZVZpZXc6IFJldmlld1F1ZXVlTGlzdFZpZXc7XG4gIHB1YmxpYyBkYXRhOiBQbHVnaW5EYXRhO1xuICBwdWJsaWMgc3luY0xvY2sgPSBmYWxzZTtcblxuICBwdWJsaWMgbGFzdFNlbGVjdGVkUmV2aWV3RGVjazogc3RyaW5nO1xuXG4gIC8vIHB1YmxpYyBuZXdOb3RlczogVEZpbGVbXSA9IFtdO1xuICAvLyBwdWJsaWMgc2NoZWR1bGVkTm90ZXM6IFNjaGVkTm90ZVtdID0gW107XG4gIC8vIHB1YmxpYyBlYXNlQnlQYXRoOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gIC8vIHByaXZhdGUgaW5jb21pbmdMaW5rczogUmVjb3JkPHN0cmluZywgTGlua1N0YXRbXT4gPSB7fTtcbiAgLy8gcHJpdmF0ZSBwYWdlcmFua3M6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgLy8gcHJpdmF0ZSBkdWVOb3Rlc0NvdW50ID0gMDtcbiAgLy8gcHVibGljIGR1ZURhdGVzTm90ZXM6IFJlY29yZDxudW1iZXIsIG51bWJlcj4gPSB7fTsgLy8gUmVjb3JkPCMgb2YgZGF5cyBpbiBmdXR1cmUsIGR1ZSBjb3VudD5cblxuICAvLyBwdWJsaWMgZGVja1RyZWU6IERlY2sgPSBuZXcgRGVjayhcInJvb3RcIiwgbnVsbCk7XG4gIC8vIHB1YmxpYyBkdWVEYXRlc0ZsYXNoY2FyZHM6IFJlY29yZDxudW1iZXIsIG51bWJlcj4gPSB7fTsgLy8gUmVjb3JkPCMgb2YgZGF5cyBpbiBmdXR1cmUsIGR1ZSBjb3VudD5cbiAgLy8gcHVibGljIGNhcmRTdGF0czogU3RhdHM7XG5cbiAgcHVibGljIGNhcmRSZXBvOiBPYnNpZGlhbkNhcmRSZXBvO1xuXG4gIGFzeW5jIG9ubG9hZCAoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5sb2FkUGx1Z2luRGF0YSgpO1xuXG4gICAgc2hvd0FwcEljb24oKTtcblxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KFNSX1ZJRVcsIChsZWFmKSA9PiBuZXcgU3BhY2VkUmVwZXRpdGlvblZpZXcobGVhZiwgdGhpcykpO1xuXG4gICAgdGhpcy5hZGRSaWJib25JY29uKFwiU3BhY2VkUmVwSWNvblwiLCB0KFwiUkVWSUVXX0NBUkRTXCIpLCBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuc3luY0xvY2spIHtcbiAgICAgICAgYXdhaXQgdGhpcy5zeW5jKCk7XG4gICAgICAgIC8vIG5ldyBGbGFzaGNhcmRNb2RhbCh0aGlzLmFwcCwgdGhpcykub3BlbigpO1xuXG4gICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5kZXRhY2hMZWF2ZXNPZlR5cGUoU1JfVklFVyk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5hcHAud29ya3NwYWNlLmdldExlYWYoXCJ0YWJcIikuc2V0Vmlld1N0YXRlKHtcbiAgICAgICAgICB0eXBlOiBTUl9WSUVXLFxuICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLnJldmVhbExlYWYoXG4gICAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLmdldExlYXZlc09mVHlwZShTUl9WSUVXKVswXVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKCF0aGlzLmRhdGEuc2V0dGluZ3MuZGlzYWJsZUZpbGVNZW51UmV2aWV3T3B0aW9ucykge1xuICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFxuICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub24oXCJmaWxlLW1lbnVcIiwgKG1lbnUsIGZpbGVpc2g6IFRBYnN0cmFjdEZpbGUpID0+IHtcbiAgICAgICAgICBpZiAoZmlsZWlzaCBpbnN0YW5jZW9mIFRGaWxlICYmIGZpbGVpc2guZXh0ZW5zaW9uID09PSBcIm1kXCIpIHtcbiAgICAgICAgICAgIG1lbnUuYWRkSXRlbSgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICBpdGVtLnNldFRpdGxlKHQoXCJSRVZJRVdfRUFTWV9GSUxFX01FTlVcIikpXG4gICAgICAgICAgICAgICAgLnNldEljb24oXCJTcGFjZWRSZXBJY29uXCIpXG4gICAgICAgICAgICAgICAgLm9uQ2xpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlUmV2aWV3UmVzcG9uc2UoZmlsZWlzaCwgUmV2aWV3UmVzcG9uc2UuRWFzeSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbWVudS5hZGRJdGVtKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIGl0ZW0uc2V0VGl0bGUodChcIlJFVklFV19HT09EX0ZJTEVfTUVOVVwiKSlcbiAgICAgICAgICAgICAgICAuc2V0SWNvbihcIlNwYWNlZFJlcEljb25cIilcbiAgICAgICAgICAgICAgICAub25DbGljaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNhdmVSZXZpZXdSZXNwb25zZShmaWxlaXNoLCBSZXZpZXdSZXNwb25zZS5Hb29kKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtZW51LmFkZEl0ZW0oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgaXRlbS5zZXRUaXRsZSh0KFwiUkVWSUVXX0hBUkRfRklMRV9NRU5VXCIpKVxuICAgICAgICAgICAgICAgIC5zZXRJY29uKFwiU3BhY2VkUmVwSWNvblwiKVxuICAgICAgICAgICAgICAgIC5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZVJldmlld1Jlc3BvbnNlKGZpbGVpc2gsIFJldmlld1Jlc3BvbnNlLkhhcmQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6IFwic3JzLW5vdGUtcmV2aWV3LWVhc3lcIixcbiAgICAgIG5hbWU6IHQoXCJSRVZJRVdfTk9URV9FQVNZX0NNRFwiKSxcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9wZW5GaWxlOiBURmlsZSB8IG51bGwgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlRmlsZSgpO1xuICAgICAgICBpZiAob3BlbkZpbGUgJiYgb3BlbkZpbGUuZXh0ZW5zaW9uID09PSBcIm1kXCIpIHtcbiAgICAgICAgICB0aGlzLnNhdmVSZXZpZXdSZXNwb25zZShvcGVuRmlsZSwgUmV2aWV3UmVzcG9uc2UuRWFzeSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6IFwic3JzLW5vdGUtcmV2aWV3LWdvb2RcIixcbiAgICAgIG5hbWU6IHQoXCJSRVZJRVdfTk9URV9HT09EX0NNRFwiKSxcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9wZW5GaWxlOiBURmlsZSB8IG51bGwgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlRmlsZSgpO1xuICAgICAgICBpZiAob3BlbkZpbGUgJiYgb3BlbkZpbGUuZXh0ZW5zaW9uID09PSBcIm1kXCIpIHtcbiAgICAgICAgICB0aGlzLnNhdmVSZXZpZXdSZXNwb25zZShvcGVuRmlsZSwgUmV2aWV3UmVzcG9uc2UuR29vZCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6IFwic3JzLW5vdGUtcmV2aWV3LWhhcmRcIixcbiAgICAgIG5hbWU6IHQoXCJSRVZJRVdfTk9URV9IQVJEX0NNRFwiKSxcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9wZW5GaWxlOiBURmlsZSB8IG51bGwgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlRmlsZSgpO1xuICAgICAgICBpZiAob3BlbkZpbGUgJiYgb3BlbkZpbGUuZXh0ZW5zaW9uID09PSBcIm1kXCIpIHtcbiAgICAgICAgICB0aGlzLnNhdmVSZXZpZXdSZXNwb25zZShvcGVuRmlsZSwgUmV2aWV3UmVzcG9uc2UuSGFyZCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6IFwic3JzLXJldmlldy1mbGFzaGNhcmRzXCIsXG4gICAgICBuYW1lOiB0KFwiUkVWSUVXX0FMTF9DQVJEU1wiKSxcbiAgICAgIGNhbGxiYWNrOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5zeW5jTG9jaykge1xuICAgICAgICAgIGF3YWl0IHRoaXMuc3luYygpO1xuICAgICAgICAgIG5ldyBGbGFzaGNhcmRNb2RhbCh0aGlzLmFwcCwgdGhpcykub3BlbigpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgIGlkOiBcInNycy1jcmFtLWZsYXNoY2FyZHNcIixcbiAgICAgIG5hbWU6IHQoXCJDUkFNX0FMTF9DQVJEU1wiKSxcbiAgICAgIGNhbGxiYWNrOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMuc3luYyh0cnVlKTtcbiAgICAgICAgbmV3IEZsYXNoY2FyZE1vZGFsKHRoaXMuYXBwLCB0aGlzLCB0cnVlKS5vcGVuKCk7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgIGlkOiBcInNycy1yZXZpZXctZmxhc2hjYXJkcy1pbi1ub3RlXCIsXG4gICAgICBuYW1lOiB0KFwiUkVWSUVXX0NBUkRTX0lOX05PVEVcIiksXG4gICAgICBjYWxsYmFjazogYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBvcGVuRmlsZTogVEZpbGUgfCBudWxsID0gdGhpcy5hcHAud29ya3NwYWNlLmdldEFjdGl2ZUZpbGUoKTtcbiAgICAgICAgaWYgKG9wZW5GaWxlICYmIG9wZW5GaWxlLmV4dGVuc2lvbiA9PT0gXCJtZFwiKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5zeW5jKCk7XG4gICAgICAgICAgLy8gdGhpcy5kZWNrVHJlZSA9IG5ldyBEZWNrKFwicm9vdFwiLCBudWxsKTtcbiAgICAgICAgICBjb25zdCBkZWNrUGF0aDogc3RyaW5nW10gPSB0aGlzLmZpbmREZWNrUGF0aChvcGVuRmlsZSk7XG4gICAgICAgICAgY29uc3QgY2FyZHMgPSBhd2FpdCB0aGlzLmNhcmRSZXBvLmdldEJ5RGVja3MoW2RlY2tQYXRoXSk7XG4gICAgICAgICAgLy8gUmV2aWV3Q2FyZHMoY2FyZHMpXG4gICAgICAgICAgbmV3IEZsYXNoY2FyZE1vZGFsKHRoaXMuYXBwLCB0aGlzKS5vcGVuKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6IFwic3JzLWNyYW0tZmxhc2hjYXJkcy1pbi1ub3RlXCIsXG4gICAgICBuYW1lOiB0KFwiQ1JBTV9DQVJEU19JTl9OT1RFXCIpLFxuICAgICAgY2FsbGJhY2s6IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3Qgb3BlbkZpbGU6IFRGaWxlIHwgbnVsbCA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVGaWxlKCk7XG4gICAgICAgIGlmIChvcGVuRmlsZSAmJiBvcGVuRmlsZS5leHRlbnNpb24gPT09IFwibWRcIikge1xuXG4gICAgICAgICAgdGhpcy5kZWNrVHJlZSA9IG5ldyBEZWNrKFwicm9vdFwiLCBudWxsKTtcbiAgICAgICAgICBjb25zdCBkZWNrUGF0aDogc3RyaW5nW10gPSB0aGlzLmZpbmREZWNrUGF0aChvcGVuRmlsZSk7XG4gICAgICAgICAgYXdhaXQgdGhpcy5maW5kRmxhc2hjYXJkc0luTm90ZShvcGVuRmlsZSwgZGVja1BhdGgsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICBuZXcgRmxhc2hjYXJkTW9kYWwodGhpcy5hcHAsIHRoaXMsIHRydWUpLm9wZW4oKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICBpZDogXCJzcnMtdmlldy1zdGF0c1wiLFxuICAgICAgbmFtZTogdChcIlZJRVdfU1RBVFNcIiksXG4gICAgICBjYWxsYmFjazogYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuc3luY0xvY2spIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnN5bmMoKTtcbiAgICAgICAgICBuZXcgU3RhdHNNb2RhbCh0aGlzLmFwcCwgdGhpcykub3BlbigpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBTUlNldHRpbmdUYWIodGhpcy5hcHAsIHRoaXMpKTtcblxuICAgIHRoaXMuYXBwLndvcmtzcGFjZS5vbkxheW91dFJlYWR5KCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdFZpZXcoKTtcbiAgICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4geyBhd2FpdCB0aGlzLnN5bmMoKTsgfSwgMjAwMCk7XG4gICAgfSk7XG4gIH1cblxuICBvbnVubG9hZCAoKTogdm9pZCB7XG4gICAgdGhpcy5hcHAud29ya3NwYWNlLmdldExlYXZlc09mVHlwZShSRVZJRVdfUVVFVUVfVklFV19UWVBFKS5mb3JFYWNoKChsZWFmKSA9PiBsZWFmLmRldGFjaCgpKTtcbiAgfVxuXG4gIGFzeW5jIHN5bmMgKGlnbm9yZVN0YXRzID0gZmFsc2UpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy5zeW5jTG9jaykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnN5bmNMb2NrID0gdHJ1ZTtcblxuICAgIC8vIHJlc2V0IG5vdGVzIHN0dWZmXG4gICAgLy8gZ3JhcGgucmVzZXQoKTtcbiAgICAvLyB0aGlzLmVhc2VCeVBhdGggPSB7fTtcbiAgICAvLyB0aGlzLmluY29taW5nTGlua3MgPSB7fTtcbiAgICAvLyB0aGlzLnBhZ2VyYW5rcyA9IHt9O1xuICAgIC8vIHRoaXMuZHVlTm90ZXNDb3VudCA9IDA7XG4gICAgLy8gdGhpcy5kdWVEYXRlc05vdGVzID0ge307XG5cbiAgICAvLyByZXNldCBmbGFzaGNhcmRzIHN0dWZmXG4gICAgLy8gdGhpcy5kZWNrVHJlZSA9IG5ldyBEZWNrKFwicm9vdFwiLCBudWxsKTtcbiAgICAvLyB0aGlzLmR1ZURhdGVzRmxhc2hjYXJkcyA9IHt9O1xuICAgIC8vIHRoaXMuY2FyZFN0YXRzID0ge1xuICAgIC8vICAgZWFzZXM6IHt9LFxuICAgIC8vICAgaW50ZXJ2YWxzOiB7fSxcbiAgICAvLyAgIG5ld0NvdW50OiAwLFxuICAgIC8vICAgeW91bmdDb3VudDogMCxcbiAgICAvLyAgIG1hdHVyZUNvdW50OiAwLFxuICAgIC8vIH07XG5cbiAgICB0aGlzLmNhcmRSZXBvID0gbmV3IE9ic2lkaWFuQ2FyZFJlcG8odGhpcy5kYXRhLnNldHRpbmdzKTtcblxuICAgIGNvbnN0IG5vdyA9IHdpbmRvdy5tb21lbnQoRGF0ZS5ub3coKSk7XG4gICAgY29uc3QgdG9kYXlEYXRlOiBzdHJpbmcgPSBub3cuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKTtcbiAgICAvLyBjbGVhciBidXJ5IGxpc3QgaWYgd2UndmUgY2hhbmdlZCBkYXRlc1xuICAgIGlmICh0b2RheURhdGUgIT09IHRoaXMuZGF0YS5idXJ5RGF0ZSkge1xuICAgICAgdGhpcy5kYXRhLmJ1cnlEYXRlID0gdG9kYXlEYXRlO1xuICAgICAgdGhpcy5kYXRhLmJ1cnlMaXN0ID0gW107XG4gICAgfVxuXG4gICAgY29uc3Qgbm90ZXM6IFRGaWxlW10gPSB0aGlzLmFwcC52YXVsdC5nZXRNYXJrZG93bkZpbGVzKCk7XG5cbiAgICBmb3IgKGNvbnN0IG5vdGUgb2Ygbm90ZXMpIHtcbiAgICAgIGlmICh0aGlzLmRhdGEuc2V0dGluZ3Mubm90ZUZvbGRlcnNUb0lnbm9yZS5zb21lKFxuICAgICAgICAoZm9sZGVyKSA9PiBub3RlLnBhdGguc3RhcnRzV2l0aChmb2xkZXIpXG4gICAgICApKSB7IGNvbnRpbnVlOyB9XG5cbiAgICAgIC8vIGlmICh0aGlzLmluY29taW5nTGlua3Nbbm90ZS5wYXRoXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyAgIHRoaXMuaW5jb21pbmdMaW5rc1tub3RlLnBhdGhdID0gW107XG4gICAgICAvLyB9XG4gICAgICAvLyBjb25zdCBsaW5rcyA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUucmVzb2x2ZWRMaW5rc1tub3RlLnBhdGhdIHx8IHt9O1xuICAgICAgLy8gZm9yIChjb25zdCB0YXJnZXRQYXRoIGluIGxpbmtzKSB7XG4gICAgICAvLyAgIGlmICh0aGlzLmluY29taW5nTGlua3NbdGFyZ2V0UGF0aF0gPT09IHVuZGVmaW5lZClcbiAgICAgIC8vICAgICB0aGlzLmluY29taW5nTGlua3NbdGFyZ2V0UGF0aF0gPSBbXTtcblxuICAgICAgLy8gICAvLyBtYXJrZG93biBmaWxlcyBvbmx5XG4gICAgICAvLyAgIGlmICh0YXJnZXRQYXRoLnNwbGl0KFwiLlwiKS5wb3AoKS50b0xvd2VyQ2FzZSgpID09PSBcIm1kXCIpIHtcbiAgICAgIC8vICAgICB0aGlzLmluY29taW5nTGlua3NbdGFyZ2V0UGF0aF0ucHVzaCh7XG4gICAgICAvLyAgICAgICBzb3VyY2VQYXRoOiBub3RlLnBhdGgsXG4gICAgICAvLyAgICAgICBsaW5rQ291bnQ6IGxpbmtzW3RhcmdldFBhdGhdLFxuICAgICAgLy8gICAgIH0pO1xuXG4gICAgICAvLyAgICAgZ3JhcGgubGluayhub3RlLnBhdGgsIHRhcmdldFBhdGgsIGxpbmtzW3RhcmdldFBhdGhdKTtcbiAgICAgIC8vICAgfVxuICAgICAgLy8gfVxuXG4gICAgICBjb25zdCBkZWNrUGF0aDogc3RyaW5nW10gPSB0aGlzLmZpbmREZWNrUGF0aChub3RlKTtcbiAgICAgIGlmIChkZWNrUGF0aC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgbGV0IGNhcmRzSW5Ob3RlID0gYXdhaXQgdGhpcy5maW5kRmxhc2hjYXJkc0luTm90ZShcbiAgICAgICAgICBub3RlLFxuICAgICAgICAgIGRlY2tQYXRoLFxuICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgIGlnbm9yZVN0YXRzXG4gICAgICAgICk7XG4gICAgICAgIGZvciAoY29uc3QgY2FyZCBvZiBjYXJkc0luTm90ZSkge1xuICAgICAgICAgIHRoaXMuY2FyZFJlcG8uc2F2ZShjYXJkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG5cbiAgICAgIC8vIFNlZSBpZiBjYXJkIGhhcyBhIFwidG8tcmV2aWV3XCIgdGFnLCBzdWNoIGFzIFwiI3Jldmlld1wiXG5cbiAgICAgIC8vIGNvbnN0IGZpbGVDYWNoZWREYXRhID0gdGhpcy5hcHAubWV0YWRhdGFDYWNoZS5nZXRGaWxlQ2FjaGUobm90ZSkgfHwge307XG4gICAgICAvLyBjb25zdCB0YWdzID0gZ2V0QWxsVGFncyhmaWxlQ2FjaGVkRGF0YSkgfHwgW107XG5cbiAgICAgIC8vIGxldCBzaG91bGRJZ25vcmUgPSB0cnVlO1xuICAgICAgLy8gLy8gY29uc3QgbWF0Y2hlZE5vdGVUYWdzID0gW107XG5cbiAgICAgIC8vIGZvciAoY29uc3QgdGFnVG9SZXZpZXcgb2YgdGhpcy5kYXRhLnNldHRpbmdzLnRhZ3NUb1Jldmlldykge1xuICAgICAgLy8gICBpZiAodGFncy5zb21lKCh0YWcpID0+IHRhZyA9PT0gdGFnVG9SZXZpZXcgfHwgdGFnLnN0YXJ0c1dpdGgodGFnVG9SZXZpZXcgKyBcIi9cIikpKSB7XG4gICAgICAvLyAgICAgLy8gaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5yZXZpZXdEZWNrcywgdGFnVG9SZXZpZXcpKSB7XG4gICAgICAvLyAgICAgLy8gICB0aGlzLnJldmlld0RlY2tzW3RhZ1RvUmV2aWV3XSA9IG5ldyBSZXZpZXdEZWNrKHRhZ1RvUmV2aWV3KTtcbiAgICAgIC8vICAgICAvLyB9XG4gICAgICAvLyAgICAgLy8gbWF0Y2hlZE5vdGVUYWdzLnB1c2godGFnVG9SZXZpZXcpO1xuICAgICAgLy8gICAgIHNob3VsZElnbm9yZSA9IGZhbHNlO1xuICAgICAgLy8gICAgIGJyZWFrO1xuICAgICAgLy8gICB9XG4gICAgICAvLyB9XG4gICAgICAvLyBpZiAoc2hvdWxkSWdub3JlKSB7XG4gICAgICAvLyAgIGNvbnRpbnVlO1xuICAgICAgLy8gfVxuXG4gICAgICAvLyAvLyBmaWxlIGhhcyBubyBzY2hlZHVsaW5nIGluZm9ybWF0aW9uXG4gICAgICAvLyBjb25zdCBmcm9udG1hdHRlcjogRnJvbnRNYXR0ZXJDYWNoZSB8IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID1cbiAgICAgIC8vICAgZmlsZUNhY2hlZERhdGEuZnJvbnRtYXR0ZXIgfHwge307XG4gICAgICAvLyBpZiAoXG4gICAgICAvLyAgICEoXG4gICAgICAvLyAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb250bWF0dGVyLCBcInNyLWR1ZVwiKSAmJlxuICAgICAgLy8gICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChmcm9udG1hdHRlciwgXCJzci1pbnRlcnZhbFwiKSAmJlxuICAgICAgLy8gICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChmcm9udG1hdHRlciwgXCJzci1lYXNlXCIpXG4gICAgICAvLyAgIClcbiAgICAgIC8vICkge1xuICAgICAgLy8gICAvLyBmb3IgKGNvbnN0IG1hdGNoZWROb3RlVGFnIG9mIG1hdGNoZWROb3RlVGFncykge1xuICAgICAgLy8gICAvLyAgIHRoaXMucmV2aWV3RGVja3NbbWF0Y2hlZE5vdGVUYWddLm5ld05vdGVzLnB1c2gobm90ZSk7XG4gICAgICAvLyAgIC8vIH1cbiAgICAgIC8vICAgY29udGludWU7XG4gICAgICAvLyB9XG5cbiAgICAgIC8vIGNvbnN0IGR1ZVVuaXg6IG51bWJlciA9IHdpbmRvd1xuICAgICAgLy8gICAubW9tZW50KGZyb250bWF0dGVyW1wic3ItZHVlXCJdLCBbXCJZWVlZLU1NLUREXCIsIFwiREQtTU0tWVlZWVwiLCBcImRkZCBNTU0gREQgWVlZWVwiXSlcbiAgICAgIC8vICAgLnZhbHVlT2YoKTtcblxuICAgICAgLy8gZm9yIChjb25zdCBtYXRjaGVkTm90ZVRhZyBvZiBtYXRjaGVkTm90ZVRhZ3MpIHtcbiAgICAgIC8vICAgdGhpcy5yZXZpZXdEZWNrc1ttYXRjaGVkTm90ZVRhZ10uc2NoZWR1bGVkTm90ZXMucHVzaCh7IG5vdGUsIGR1ZVVuaXggfSk7XG4gICAgICAvLyAgIGlmIChkdWVVbml4IDw9IG5vdy52YWx1ZU9mKCkpIHtcbiAgICAgIC8vICAgICB0aGlzLnJldmlld0RlY2tzW21hdGNoZWROb3RlVGFnXS5kdWVOb3Rlc0NvdW50Kys7XG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH1cblxuICAgICAgLy8gaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLmVhc2VCeVBhdGgsIG5vdGUucGF0aCkpIHtcbiAgICAgIC8vICAgdGhpcy5lYXNlQnlQYXRoW25vdGUucGF0aF0gPVxuICAgICAgLy8gICAgICh0aGlzLmVhc2VCeVBhdGhbbm90ZS5wYXRoXSArIGZyb250bWF0dGVyW1wic3ItZWFzZVwiXSkgLyAyO1xuICAgICAgLy8gfSBlbHNlIHtcbiAgICAgIC8vICAgdGhpcy5lYXNlQnlQYXRoW25vdGUucGF0aF0gPSBmcm9udG1hdHRlcltcInNyLWVhc2VcIl07XG4gICAgICAvLyB9XG5cbiAgICAgIC8vIGlmIChkdWVVbml4IDw9IG5vdy52YWx1ZU9mKCkpIHtcbiAgICAgIC8vICAgdGhpcy5kdWVOb3Rlc0NvdW50Kys7XG4gICAgICAvLyB9XG5cbiAgICAgIC8vICAgY29uc3QgbkRheXM6IG51bWJlciA9IE1hdGguY2VpbCgoZHVlVW5peCAtIG5vdy52YWx1ZU9mKCkpIC8gKDI0ICogMzYwMCAqIDEwMDApKTtcbiAgICAgIC8vICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5kdWVEYXRlc05vdGVzLCBuRGF5cykpIHtcbiAgICAgIC8vICAgICB0aGlzLmR1ZURhdGVzTm90ZXNbbkRheXNdID0gMDtcbiAgICAgIC8vICAgfVxuICAgICAgLy8gICB0aGlzLmR1ZURhdGVzTm90ZXNbbkRheXNdKys7XG4gICAgfVxuXG4gICAgZ3JhcGgucmFuaygwLjg1LCAwLjAwMDAwMSwgKG5vZGU6IHN0cmluZywgcmFuazogbnVtYmVyKSA9PiB7XG4gICAgICB0aGlzLnBhZ2VyYW5rc1tub2RlXSA9IHJhbmsgKiAxMDAwMDtcbiAgICB9KTtcbiAgICAvLyBzb3J0IHRoZSBkZWNrIG5hbWVzXG4gICAgLy8gdGhpcy5kZWNrVHJlZS5zb3J0U3ViZGVja3NMaXN0KCk7XG4gICAgaWYgKHRoaXMuZGF0YS5zZXR0aW5ncy5zaG93RGVidWdNZXNzYWdlcykge1xuICAgICAgY29uc29sZS5sb2coYFNSOiAke3QoXCJFQVNFU1wiKX1gLCB0aGlzLmVhc2VCeVBhdGgpO1xuICAgICAgY29uc29sZS5sb2coYFNSOiAke3QoXCJERUNLU1wiKX1gLCB0aGlzLmRlY2tUcmVlKTtcbiAgICB9XG5cbiAgICAvLyBmb3IgKGNvbnN0IGRlY2tLZXkgaW4gdGhpcy5yZXZpZXdEZWNrcykge1xuICAgIC8vICAgdGhpcy5yZXZpZXdEZWNrc1tkZWNrS2V5XS5zb3J0Tm90ZXModGhpcy5wYWdlcmFua3MpO1xuICAgIC8vIH1cblxuICAgIGlmICh0aGlzLmRhdGEuc2V0dGluZ3Muc2hvd0RlYnVnTWVzc2FnZXMpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiU1I6IFwiICsgdChcIlNZTkNfVElNRV9UQUtFTlwiLCB7IHQ6IERhdGUubm93KCkgLSBub3cudmFsdWVPZigpLCB9KSk7XG4gICAgfVxuXG4gICAgLy8gdGhpcy5zdGF0dXNCYXIuc2V0VGV4dChcbiAgICAvLyAgIHQoXCJTVEFUVVNfQkFSXCIsIHtcbiAgICAvLyAgICAgZHVlTm90ZXNDb3VudDogdGhpcy5kdWVOb3Rlc0NvdW50LFxuICAgIC8vICAgICBkdWVGbGFzaGNhcmRzQ291bnQ6IHRoaXMuZGVja1RyZWUuZHVlRmxhc2hjYXJkc0NvdW50LFxuICAgIC8vICAgfSlcbiAgICAvLyApO1xuXG4gICAgaWYgKHRoaXMuZGF0YS5zZXR0aW5ncy5lbmFibGVOb3RlUmV2aWV3UGFuZU9uU3RhcnR1cCkge1xuICAgICAgdGhpcy5yZXZpZXdRdWV1ZVZpZXcucmVkcmF3KCk7XG4gICAgfVxuICAgIHRoaXMuc3luY0xvY2sgPSBmYWxzZTtcbiAgfVxuXG5cbiAgYXN5bmMgc2F2ZVJldmlld1Jlc3BvbnNlIChub3RlOiBURmlsZSwgcmVzcG9uc2U6IFJldmlld1Jlc3BvbnNlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZmlsZUNhY2hlZERhdGEgPSB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZShub3RlKSB8fCB7fTtcbiAgICBjb25zdCBmcm9udG1hdHRlcjogRnJvbnRNYXR0ZXJDYWNoZSB8IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID1cbiAgICAgIGZpbGVDYWNoZWREYXRhLmZyb250bWF0dGVyIHx8IHt9O1xuXG4gICAgY29uc3QgdGFncyA9IGdldEFsbFRhZ3MoZmlsZUNhY2hlZERhdGEpIHx8IFtdO1xuICAgIGlmICh0aGlzLmRhdGEuc2V0dGluZ3Mubm90ZUZvbGRlcnNUb0lnbm9yZS5zb21lKChmb2xkZXIpID0+IG5vdGUucGF0aC5zdGFydHNXaXRoKGZvbGRlcikpKSB7XG4gICAgICBuZXcgTm90aWNlKHQoXCJOT1RFX0lOX0lHTk9SRURfRk9MREVSXCIpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgc2hvdWxkSWdub3JlID0gdHJ1ZTtcbiAgICBmb3IgKGNvbnN0IHRhZyBvZiB0YWdzKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuZGF0YS5zZXR0aW5ncy50YWdzVG9SZXZpZXcuc29tZShcbiAgICAgICAgICAodGFnVG9SZXZpZXcpID0+IHRhZyA9PT0gdGFnVG9SZXZpZXcgfHwgdGFnLnN0YXJ0c1dpdGgodGFnVG9SZXZpZXcgKyBcIi9cIilcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIHNob3VsZElnbm9yZSA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkSWdub3JlKSB7XG4gICAgICBuZXcgTm90aWNlKHQoXCJQTEVBU0VfVEFHX05PVEVcIikpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBmaWxlVGV4dDogc3RyaW5nID0gYXdhaXQgdGhpcy5hcHAudmF1bHQucmVhZChub3RlKTtcbiAgICBsZXQgZWFzZTogbnVtYmVyLCBpbnRlcnZhbDogbnVtYmVyLCBkZWxheUJlZm9yZVJldmlldzogbnVtYmVyO1xuICAgIGNvbnN0IG5vdzogbnVtYmVyID0gRGF0ZS5ub3coKTtcbiAgICAvLyBuZXcgbm90ZVxuICAgIGlmIChcbiAgICAgICEoXG4gICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChmcm9udG1hdHRlciwgXCJzci1kdWVcIikgJiZcbiAgICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb250bWF0dGVyLCBcInNyLWludGVydmFsXCIpICYmXG4gICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChmcm9udG1hdHRlciwgXCJzci1lYXNlXCIpXG4gICAgICApXG4gICAgKSB7XG4gICAgICBsZXQgbGlua1RvdGFsID0gMCxcbiAgICAgICAgbGlua1BHVG90YWwgPSAwLFxuICAgICAgICB0b3RhbExpbmtDb3VudCA9IDA7XG5cbiAgICAgIGZvciAoY29uc3Qgc3RhdE9iaiBvZiB0aGlzLmluY29taW5nTGlua3Nbbm90ZS5wYXRoXSB8fCBbXSkge1xuICAgICAgICBjb25zdCBlYXNlOiBudW1iZXIgPSB0aGlzLmVhc2VCeVBhdGhbc3RhdE9iai5zb3VyY2VQYXRoXTtcbiAgICAgICAgaWYgKGVhc2UpIHtcbiAgICAgICAgICBsaW5rVG90YWwgKz0gc3RhdE9iai5saW5rQ291bnQgKiB0aGlzLnBhZ2VyYW5rc1tzdGF0T2JqLnNvdXJjZVBhdGhdICogZWFzZTtcbiAgICAgICAgICBsaW5rUEdUb3RhbCArPSB0aGlzLnBhZ2VyYW5rc1tzdGF0T2JqLnNvdXJjZVBhdGhdICogc3RhdE9iai5saW5rQ291bnQ7XG4gICAgICAgICAgdG90YWxMaW5rQ291bnQgKz0gc3RhdE9iai5saW5rQ291bnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3Qgb3V0Z29pbmdMaW5rcyA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUucmVzb2x2ZWRMaW5rc1tub3RlLnBhdGhdIHx8IHt9O1xuICAgICAgZm9yIChjb25zdCBsaW5rZWRGaWxlUGF0aCBpbiBvdXRnb2luZ0xpbmtzKSB7XG4gICAgICAgIGNvbnN0IGVhc2U6IG51bWJlciA9IHRoaXMuZWFzZUJ5UGF0aFtsaW5rZWRGaWxlUGF0aF07XG4gICAgICAgIGlmIChlYXNlKSB7XG4gICAgICAgICAgbGlua1RvdGFsICs9XG4gICAgICAgICAgICBvdXRnb2luZ0xpbmtzW2xpbmtlZEZpbGVQYXRoXSAqIHRoaXMucGFnZXJhbmtzW2xpbmtlZEZpbGVQYXRoXSAqIGVhc2U7XG4gICAgICAgICAgbGlua1BHVG90YWwgKz0gdGhpcy5wYWdlcmFua3NbbGlua2VkRmlsZVBhdGhdICogb3V0Z29pbmdMaW5rc1tsaW5rZWRGaWxlUGF0aF07XG4gICAgICAgICAgdG90YWxMaW5rQ291bnQgKz0gb3V0Z29pbmdMaW5rc1tsaW5rZWRGaWxlUGF0aF07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgbGlua0NvbnRyaWJ1dGlvbjogbnVtYmVyID1cbiAgICAgICAgdGhpcy5kYXRhLnNldHRpbmdzLm1heExpbmtGYWN0b3IgKlxuICAgICAgICBNYXRoLm1pbigxLjAsIE1hdGgubG9nKHRvdGFsTGlua0NvdW50ICsgMC41KSAvIE1hdGgubG9nKDY0KSk7XG4gICAgICBlYXNlID1cbiAgICAgICAgKDEuMCAtIGxpbmtDb250cmlidXRpb24pICogdGhpcy5kYXRhLnNldHRpbmdzLmJhc2VFYXNlICtcbiAgICAgICAgKHRvdGFsTGlua0NvdW50ID4gMFxuICAgICAgICAgID8gKGxpbmtDb250cmlidXRpb24gKiBsaW5rVG90YWwpIC8gbGlua1BHVG90YWxcbiAgICAgICAgICA6IGxpbmtDb250cmlidXRpb24gKiB0aGlzLmRhdGEuc2V0dGluZ3MuYmFzZUVhc2UpO1xuICAgICAgLy8gYWRkIG5vdGUncyBhdmVyYWdlIGZsYXNoY2FyZCBlYXNlIGlmIGF2YWlsYWJsZVxuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLmVhc2VCeVBhdGgsIG5vdGUucGF0aCkpIHtcbiAgICAgICAgZWFzZSA9IChlYXNlICsgdGhpcy5lYXNlQnlQYXRoW25vdGUucGF0aF0pIC8gMjtcbiAgICAgIH1cbiAgICAgIGVhc2UgPSBNYXRoLnJvdW5kKGVhc2UpO1xuICAgICAgaW50ZXJ2YWwgPSAxLjA7XG4gICAgICBkZWxheUJlZm9yZVJldmlldyA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGludGVydmFsID0gZnJvbnRtYXR0ZXJbXCJzci1pbnRlcnZhbFwiXTtcbiAgICAgIGVhc2UgPSBmcm9udG1hdHRlcltcInNyLWVhc2VcIl07XG4gICAgICBkZWxheUJlZm9yZVJldmlldyA9XG4gICAgICAgIG5vdyAtXG4gICAgICAgIHdpbmRvd1xuICAgICAgICAgIC5tb21lbnQoZnJvbnRtYXR0ZXJbXCJzci1kdWVcIl0sIFtcIllZWVktTU0tRERcIiwgXCJERC1NTS1ZWVlZXCIsIFwiZGRkIE1NTSBERCBZWVlZXCJdKVxuICAgICAgICAgIC52YWx1ZU9mKCk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZWRPYmo6IENhcmRTdGF0cyA9IHNjaGVkdWxlKFxuICAgICAgcmVzcG9uc2UsXG4gICAgICB7XG4gICAgICAgIGludGVydmFsLFxuICAgICAgICBlYXNlLFxuICAgICAgICBkZWxheUJlZm9yZVJldmlldyxcbiAgICAgIH0sXG4gICAgICB0aGlzLmRhdGEuc2V0dGluZ3MsXG4gICAgICB0aGlzLmR1ZURhdGVzTm90ZXNcbiAgICApO1xuICAgIGludGVydmFsID0gc2NoZWRPYmouaW50ZXJ2YWw7XG4gICAgZWFzZSA9IHNjaGVkT2JqLmVhc2U7XG5cbiAgICBjb25zdCBkdWUgPSB3aW5kb3cubW9tZW50KG5vdyArIGludGVydmFsICogMjQgKiAzNjAwICogMTAwMCk7XG4gICAgY29uc3QgZHVlU3RyaW5nOiBzdHJpbmcgPSBkdWUuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKTtcblxuICAgIC8vIGNoZWNrIGlmIHNjaGVkdWxpbmcgaW5mbyBleGlzdHNcbiAgICBpZiAoU0NIRURVTElOR19JTkZPX1JFR0VYLnRlc3QoZmlsZVRleHQpKSB7XG4gICAgICBjb25zdCBzY2hlZHVsaW5nSW5mbyA9IFNDSEVEVUxJTkdfSU5GT19SRUdFWC5leGVjKGZpbGVUZXh0KTtcbiAgICAgIGZpbGVUZXh0ID0gZmlsZVRleHQucmVwbGFjZShcbiAgICAgICAgU0NIRURVTElOR19JTkZPX1JFR0VYLFxuICAgICAgICBgLS0tXFxuJHtzY2hlZHVsaW5nSW5mb1sxXX1zci1kdWU6ICR7ZHVlU3RyaW5nfVxcbmAgK1xuICAgICAgICBgc3ItaW50ZXJ2YWw6ICR7aW50ZXJ2YWx9XFxuc3ItZWFzZTogJHtlYXNlfVxcbmAgK1xuICAgICAgICBgJHtzY2hlZHVsaW5nSW5mb1s1XX0tLS1gXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoWUFNTF9GUk9OVF9NQVRURVJfUkVHRVgudGVzdChmaWxlVGV4dCkpIHtcbiAgICAgIC8vIG5ldyBub3RlIHdpdGggZXhpc3RpbmcgWUFNTCBmcm9udCBtYXR0ZXJcbiAgICAgIGNvbnN0IGV4aXN0aW5nWWFtbCA9IFlBTUxfRlJPTlRfTUFUVEVSX1JFR0VYLmV4ZWMoZmlsZVRleHQpO1xuICAgICAgZmlsZVRleHQgPSBmaWxlVGV4dC5yZXBsYWNlKFxuICAgICAgICBZQU1MX0ZST05UX01BVFRFUl9SRUdFWCxcbiAgICAgICAgYC0tLVxcbiR7ZXhpc3RpbmdZYW1sWzFdfXNyLWR1ZTogJHtkdWVTdHJpbmd9XFxuYCArXG4gICAgICAgIGBzci1pbnRlcnZhbDogJHtpbnRlcnZhbH1cXG5zci1lYXNlOiAke2Vhc2V9XFxuLS0tYFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZVRleHQgPVxuICAgICAgICBgLS0tXFxuc3ItZHVlOiAke2R1ZVN0cmluZ31cXG5zci1pbnRlcnZhbDogJHtpbnRlcnZhbH1cXG5gICtcbiAgICAgICAgYHNyLWVhc2U6ICR7ZWFzZX1cXG4tLS1cXG5cXG4ke2ZpbGVUZXh0fWA7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGF0YS5zZXR0aW5ncy5idXJ5U2libGluZ0NhcmRzKSB7XG4gICAgICBhd2FpdCB0aGlzLmZpbmRGbGFzaGNhcmRzSW5Ob3RlKG5vdGUsIFtdLCB0cnVlKTsgLy8gYnVyeSBhbGwgY2FyZHMgaW4gY3VycmVudCBub3RlXG4gICAgICBhd2FpdCB0aGlzLnNhdmVQbHVnaW5EYXRhKCk7XG4gICAgfVxuICAgIGF3YWl0IHRoaXMuYXBwLnZhdWx0Lm1vZGlmeShub3RlLCBmaWxlVGV4dCk7XG5cbiAgICBuZXcgTm90aWNlKHQoXCJSRVNQT05TRV9SRUNFSVZFRFwiKSk7XG5cbiAgICBhd2FpdCB0aGlzLnN5bmMoKTtcbiAgfVxuXG4gIGZpbmREZWNrUGF0aCAobm90ZTogVEZpbGUpOiBzdHJpbmdbXSB7XG4gICAgbGV0IGRlY2tQYXRoOiBzdHJpbmdbXSA9IFtdO1xuICAgIGlmICh0aGlzLmRhdGEuc2V0dGluZ3MuY29udmVydEZvbGRlcnNUb0RlY2tzKSB7XG4gICAgICBkZWNrUGF0aCA9IG5vdGUucGF0aC5zcGxpdChcIi9cIik7XG4gICAgICBkZWNrUGF0aC5wb3AoKTsgLy8gcmVtb3ZlIGZpbGVuYW1lXG4gICAgICBpZiAoZGVja1BhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGRlY2tQYXRoID0gW1wiL1wiXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZUNhY2hlZERhdGEgPSB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZShub3RlKSB8fCB7fTtcbiAgICAgIGNvbnN0IHRhZ3MgPSBnZXRBbGxUYWdzKGZpbGVDYWNoZWREYXRhKSB8fCBbXTtcblxuICAgICAgb3V0ZXI6IGZvciAoY29uc3QgdGFnVG9SZXZpZXcgb2YgdGhpcy5kYXRhLnNldHRpbmdzLmZsYXNoY2FyZFRhZ3MpIHtcbiAgICAgICAgZm9yIChjb25zdCB0YWcgb2YgdGFncykge1xuICAgICAgICAgIGlmICh0YWcgPT09IHRhZ1RvUmV2aWV3IHx8IHRhZy5zdGFydHNXaXRoKHRhZ1RvUmV2aWV3ICsgXCIvXCIpKSB7XG4gICAgICAgICAgICBkZWNrUGF0aCA9IHRhZy5zdWJzdHJpbmcoMSkuc3BsaXQoXCIvXCIpO1xuICAgICAgICAgICAgYnJlYWsgb3V0ZXI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlY2tQYXRoO1xuICB9XG5cbiAgYXN5bmMgZmluZEZsYXNoY2FyZHNJbk5vdGUgKFxuICAgIG5vdGU6IFRGaWxlLFxuICAgIGRlY2tQYXRoOiBzdHJpbmdbXSxcbiAgICBidXJ5T25seSA9IGZhbHNlLFxuICAgIGlnbm9yZVN0YXRzID0gZmFsc2UsXG4gICk6IFByb21pc2U8T2JzaWRpYW5DYXJkW10+IHtcbiAgICBsZXQgZmlsZVRleHQ6IHN0cmluZyA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LnJlYWQobm90ZSk7XG4gICAgY29uc3QgZmlsZUNhY2hlZERhdGEgPSB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZShub3RlKSB8fCB7fTtcbiAgICBjb25zdCBoZWFkaW5nczogSGVhZGluZ0NhY2hlW10gPSBmaWxlQ2FjaGVkRGF0YS5oZWFkaW5ncyB8fCBbXTtcbiAgICAvLyBsZXQgdG90YWxOb3RlRWFzZSA9IDA7XG4gICAgLy8gbGV0IHNjaGVkdWxlZENvdW50ID0gMDtcbiAgICBjb25zdCBzZXR0aW5nczogU1JTZXR0aW5ncyA9IHRoaXMuZGF0YS5zZXR0aW5ncztcbiAgICBjb25zdCBub3RlRGVja1BhdGggPSBkZWNrUGF0aDtcblxuICAgIGxldCBjYXJkczogT2JzaWRpYW5DYXJkW10gPSBbXTtcblxuICAgIGNvbnN0IG5vdzogbnVtYmVyID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCBwYXJzZWRDYXJkcyA9IHBhcnNlKFxuICAgICAgZmlsZVRleHQsXG4gICAgICBzZXR0aW5ncy5zaW5nbGVMaW5lQ2FyZFNlcGFyYXRvcixcbiAgICAgIHNldHRpbmdzLnNpbmdsZUxpbmVSZXZlcnNlZENhcmRTZXBhcmF0b3IsXG4gICAgICBzZXR0aW5ncy5tdWx0aWxpbmVDYXJkU2VwYXJhdG9yLFxuICAgICAgc2V0dGluZ3MubXVsdGlsaW5lUmV2ZXJzZWRDYXJkU2VwYXJhdG9yLFxuICAgICAgc2V0dGluZ3MuY29udmVydEhpZ2hsaWdodHNUb0Nsb3plcyxcbiAgICAgIHNldHRpbmdzLmNvbnZlcnRCb2xkVGV4dFRvQ2xvemVzLFxuICAgICAgc2V0dGluZ3MuY29udmVydEN1cmx5QnJhY2tldHNUb0Nsb3plc1xuICAgICk7XG5cbiAgICBmb3IgKGNvbnN0IHBhcnNlZENhcmQgb2YgcGFyc2VkQ2FyZHMpIHtcbiAgICAgIGxldCB7IGNhcmRUeXBlLCBjYXJkVGV4dCwgbGluZU51bWJlciB9ID0gcGFyc2VkQ2FyZDtcblxuICAgICAgZGVja1BhdGggPSBub3RlRGVja1BhdGg7XG5cbiAgICAgIC8vIFRoYXQgbWVhbnMgdGhlIGNhcmQgaXMgbm90IGluY2x1ZGVkIGluIHJldmlld3MuLi4gd2h5P1xuICAgICAgLy8gaWYgKGNhcmRUZXh0LmluY2x1ZGVzKHNldHRpbmdzLmVkaXRMYXRlclRhZykpIHtcbiAgICAgIC8vICAgY29udGludWU7XG4gICAgICAvLyB9XG5cbiAgICAgIGlmICghc2V0dGluZ3MuY29udmVydEZvbGRlcnNUb0RlY2tzKSB7XG4gICAgICAgIGNvbnN0IHRhZ0luQ2FyZFJlZ0V4cCA9IC9eI1teXFxzI10rL2dpO1xuICAgICAgICBjb25zdCBjYXJkRGVja1BhdGggPSBjYXJkVGV4dFxuICAgICAgICAgIC5tYXRjaCh0YWdJbkNhcmRSZWdFeHApXG4gICAgICAgICAgPy5zbGljZSgtMSlbMF1cbiAgICAgICAgICAucmVwbGFjZShcIiNcIiwgXCJcIilcbiAgICAgICAgICAuc3BsaXQoXCIvXCIpO1xuICAgICAgICBpZiAoY2FyZERlY2tQYXRoKSB7XG4gICAgICAgICAgZGVja1BhdGggPSBjYXJkRGVja1BhdGg7XG4gICAgICAgICAgY2FyZFRleHQgPSBjYXJkVGV4dC5yZXBsYWNlQWxsKHRhZ0luQ2FyZFJlZ0V4cCwgXCJcIik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgZGVjayA9IERlY2suY3JlYXRlKHsgbmFtZTogZGVja1BhdGguam9pbigpLCBwYXJlbnQ6IG51bGwsIHN1YmRlY2tzOiBbXSB9KTtcblxuXG4gICAgICAvLyB0aGlzLmRlY2tUcmVlLmNyZWF0ZURlY2soWy4uLmRlY2tQYXRoXSk7XG5cbiAgICAgIC8vIGNvbnN0IGNhcmRUZXh0SGFzaDogc3RyaW5nID0gY3lyYjUzKGNhcmRUZXh0KTtcblxuICAgICAgLy8gaWYgKGJ1cnlPbmx5KSB7XG4gICAgICAvLyAgIHRoaXMuZGF0YS5idXJ5TGlzdC5wdXNoKGNhcmRUZXh0SGFzaCk7XG4gICAgICAvLyAgIGNvbnRpbnVlO1xuICAgICAgLy8gfVxuXG4gICAgICBjb25zdCBzaWJsaW5nTWF0Y2hlcyA9IGdldENhcmRTaWJsaW5ncyhjYXJkVHlwZSwgY2FyZFRleHQsIHNldHRpbmdzKTtcblxuICAgICAgY29uc3QgeyBzY2hlZHVsaW5nLCBuZXdGaWxlVGV4dCB9ID0gZG9TY2hlZHVsaW5nU3R1ZmYoZmlsZVRleHQsIGNhcmRUZXh0LCBzaWJsaW5nTWF0Y2hlcyk7XG4gICAgICBpZiAobmV3RmlsZVRleHQgIT0gbnVsbCkge1xuICAgICAgICBhd2FpdCB0aGlzLmFwcC52YXVsdC5tb2RpZnkobm90ZSwgbmV3RmlsZVRleHQpO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgYWxsIHNpYmxpbmdzIHRvIGxpc3Qgb2YgY2FyZHNcbiAgICAgIC8vIHtcbiAgICAgIC8vIFByb3RvLWNhcmRzXG4gICAgICBsZXQgc2libGluZ3MgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2libGluZ01hdGNoZXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICBsZXQgY2FyZFByb3BzID0ge1xuICAgICAgICAgIHR5cGU6IGNhcmRUeXBlLFxuXG4gICAgICAgICAgZGVjazogZGVjayxcblxuICAgICAgICAgIGZyb250OiBzaWJsaW5nTWF0Y2hlc1tpXVswXS50cmltKCksXG4gICAgICAgICAgYmFjazogc2libGluZ01hdGNoZXNbaV1bMV0udHJpbSgpLFxuICAgICAgICAgIGNhcmRUZXh0LFxuICAgICAgICAgIGNvbnRleHQ6IGdldENhcmRDb250ZXh0KGxpbmVOdW1iZXIsIGhlYWRpbmdzLCBub3RlLmJhc2VuYW1lKSxcblxuICAgICAgICAgIC8vIGlzRHVlOiBpIDwgc2NoZWR1bGluZy5sZW5ndGgsXG4gICAgICAgICAgbG9jYXRpb246IHsgZmlsZTogbm90ZSwgbGluZU51bWJlciB9LFxuXG4gICAgICAgICAgaW5kZXhJblNpYmxpbmdzOiBpLFxuICAgICAgICAgIC8vIFNldCBsYXRlclxuICAgICAgICAgIHNpYmxpbmdzOiB1bmRlZmluZWQsXG5cbiAgICAgICAgICAvLyBTZXQgbGF0ZXJcbiAgICAgICAgICByZXZpZXdTZXR0aW5nczogdW5kZWZpbmVkLFxuICAgICAgICB9O1xuXG4gICAgICAgIHNpYmxpbmdzLnB1c2goY2FyZFByb3BzKTtcbiAgICAgIH1cblxuICAgICAgLy8gU2V0IHJldmlldyBzZXR0aW5nc1xuICAgICAgLy8ge1xuICAgICAgbGV0IGNhcmRSZXZpZXdTZXR0aW5nczogQ2FyZFJldmlld1NldHRpbmdzID0ge1xuICAgICAgICBpbnRlcnZhbDogMCxcbiAgICAgICAgZWFzZTogMCxcbiAgICAgICAgZGVsYXlCZWZvcmVSZXZpZXc6IDAsXG4gICAgICB9O1xuICAgICAgZm9yIChjb25zdCBzIG9mIHNjaGVkdWxpbmcpIHtcbiAgICAgICAgaWYgKHMgIT0gbnVsbCkge1xuICAgICAgICAgIGNhcmRSZXZpZXdTZXR0aW5ncyA9IHtcbiAgICAgICAgICAgIGludGVydmFsOiBzLmludGVydmFsLFxuICAgICAgICAgICAgZWFzZTogcy5lYXNlLFxuICAgICAgICAgICAgZGVsYXlCZWZvcmVSZXZpZXc6IG5vdyAtIHMuZHVlVW5peCxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBzaWJsaW5nIG9mIHNpYmxpbmdzKSB7XG4gICAgICAgIHNpYmxpbmcucmV2aWV3U2V0dGluZ3MgPSBjYXJkUmV2aWV3U2V0dGluZ3M7XG4gICAgICB9XG4gICAgICAvLyB9XG5cbiAgICAgIGZvciAobGV0IHNpYmxpbmcgb2Ygc2libGluZ3MpIHtcbiAgICAgICAgc2libGluZy5zaWJsaW5ncyA9IHNpYmxpbmdzO1xuICAgICAgICBjYXJkcy5wdXNoKE9ic2lkaWFuQ2FyZC5jcmVhdGUoc2libGluZykudW53cmFwKCkpO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gaWYgKHNjaGVkdWxlZENvdW50ID4gMCkge1xuICAgIC8vICAgY29uc3QgZmxhc2hjYXJkc0luTm90ZUF2Z0Vhc2U6IG51bWJlciA9IHRvdGFsTm90ZUVhc2UgLyBzY2hlZHVsZWRDb3VudDtcbiAgICAvLyAgIGNvbnN0IGZsYXNoY2FyZENvbnRyaWJ1dGlvbjogbnVtYmVyID0gTWF0aC5taW4oXG4gICAgLy8gICAgIDEuMCxcbiAgICAvLyAgICAgTWF0aC5sb2coc2NoZWR1bGVkQ291bnQgKyAwLjUpIC8gTWF0aC5sb2coNjQpXG4gICAgLy8gICApO1xuICAgIC8vICAgcmV0dXJuIChcbiAgICAvLyAgICAgZmxhc2hjYXJkc0luTm90ZUF2Z0Vhc2UgKiBmbGFzaGNhcmRDb250cmlidXRpb24gK1xuICAgIC8vICAgICBzZXR0aW5ncy5iYXNlRWFzZSAqICgxLjAgLSBmbGFzaGNhcmRDb250cmlidXRpb24pXG4gICAgLy8gICApO1xuICAgIC8vIH1cblxuICAgIHJldHVybiBjYXJkcztcbiAgfVxuXG4gIGFzeW5jIGxvYWRQbHVnaW5EYXRhICgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLmRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX0RBVEEsIGF3YWl0IHRoaXMubG9hZERhdGEoKSk7XG4gICAgdGhpcy5kYXRhLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9TRVRUSU5HUywgdGhpcy5kYXRhLnNldHRpbmdzKTtcbiAgfVxuXG4gIGFzeW5jIHNhdmVQbHVnaW5EYXRhICgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuZGF0YSk7XG4gIH07XG5cbiAgaW5pdFZpZXcgKCk6IHZvaWQge1xuICAgIHRoaXMucmVnaXN0ZXJWaWV3KFxuICAgICAgUkVWSUVXX1FVRVVFX1ZJRVdfVFlQRSxcbiAgICAgIChsZWFmKSA9PiAodGhpcy5yZXZpZXdRdWV1ZVZpZXcgPSBuZXcgUmV2aWV3UXVldWVMaXN0VmlldyhsZWFmLCB0aGlzKSlcbiAgICApO1xuXG4gICAgaWYgKFxuICAgICAgdGhpcy5kYXRhLnNldHRpbmdzLmVuYWJsZU5vdGVSZXZpZXdQYW5lT25TdGFydHVwICYmXG4gICAgICBhcHAud29ya3NwYWNlLmdldExlYXZlc09mVHlwZShSRVZJRVdfUVVFVUVfVklFV19UWVBFKS5sZW5ndGggPT0gMFxuICAgICkge1xuICAgICAgdGhpcy5hcHAud29ya3NwYWNlLmdldFJpZ2h0TGVhZihmYWxzZSkuc2V0Vmlld1N0YXRlKHtcbiAgICAgICAgdHlwZTogUkVWSUVXX1FVRVVFX1ZJRVdfVFlQRSxcbiAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldENhcmRDb250ZXh0IChjYXJkTGluZTogbnVtYmVyLCBoZWFkaW5nczogSGVhZGluZ0NhY2hlW10sIG5vdGVfdGl0bGU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHN0YWNrOiBIZWFkaW5nQ2FjaGVbXSA9IFtdO1xuICBmb3IgKGNvbnN0IGhlYWRpbmcgb2YgaGVhZGluZ3MpIHtcbiAgICBpZiAoaGVhZGluZy5wb3NpdGlvbi5zdGFydC5saW5lID4gY2FyZExpbmUpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHdoaWxlIChzdGFjay5sZW5ndGggPiAwICYmIHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdLmxldmVsID49IGhlYWRpbmcubGV2ZWwpIHtcbiAgICAgIHN0YWNrLnBvcCgpO1xuICAgIH1cblxuICAgIHN0YWNrLnB1c2goaGVhZGluZyk7XG4gIH1cblxuICBsZXQgY29udGV4dCA9IGAke25vdGVfdGl0bGV9ID4gYDtcbiAgZm9yIChjb25zdCBoZWFkaW5nT2JqIG9mIHN0YWNrKSB7XG4gICAgaGVhZGluZ09iai5oZWFkaW5nID0gaGVhZGluZ09iai5oZWFkaW5nLnJlcGxhY2UoL1xcW1xcXlxcZCtcXF0vZ20sIFwiXCIpLnRyaW0oKTtcbiAgICBjb250ZXh0ICs9IGAke2hlYWRpbmdPYmouaGVhZGluZ30gPiBgO1xuICB9XG4gIHJldHVybiBjb250ZXh0LnNsaWNlKDAsIC0zKTtcbn1cbiIsICJpbXBvcnQgeyBOb3RpY2UsIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcsIEFwcCwgUGxhdGZvcm0gfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB0eXBlIFNSUGx1Z2luIGZyb20gXCJzcmMvbWFpblwiO1xuaW1wb3J0IHsgdCB9IGZyb20gXCJzcmMvbGFuZy9oZWxwZXJzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU1JTZXR0aW5ncyB7XG4gIC8vIGZsYXNoY2FyZHNcbiAgZmxhc2hjYXJkRWFzeVRleHQ6IHN0cmluZztcbiAgZmxhc2hjYXJkR29vZFRleHQ6IHN0cmluZztcbiAgZmxhc2hjYXJkSGFyZFRleHQ6IHN0cmluZztcbiAgZmxhc2hjYXJkVGFnczogc3RyaW5nW107XG4gIGNvbnZlcnRGb2xkZXJzVG9EZWNrczogYm9vbGVhbjtcbiAgY2FyZENvbW1lbnRPblNhbWVMaW5lOiBib29sZWFuO1xuICBidXJ5U2libGluZ0NhcmRzOiBib29sZWFuO1xuICBzaG93Q29udGV4dEluQ2FyZHM6IGJvb2xlYW47XG4gIGZsYXNoY2FyZEhlaWdodFBlcmNlbnRhZ2U6IG51bWJlcjtcbiAgZmxhc2hjYXJkV2lkdGhQZXJjZW50YWdlOiBudW1iZXI7XG4gIHJhbmRvbWl6ZUNhcmRPcmRlcjogYm9vbGVhbjtcbiAgY29udmVydEhpZ2hsaWdodHNUb0Nsb3plczogYm9vbGVhbjtcbiAgY29udmVydEJvbGRUZXh0VG9DbG96ZXM6IGJvb2xlYW47XG4gIGNvbnZlcnRDdXJseUJyYWNrZXRzVG9DbG96ZXM6IGJvb2xlYW47XG4gIHNpbmdsZUxpbmVDYXJkU2VwYXJhdG9yOiBzdHJpbmc7XG4gIHNpbmdsZUxpbmVSZXZlcnNlZENhcmRTZXBhcmF0b3I6IHN0cmluZztcbiAgbXVsdGlsaW5lQ2FyZFNlcGFyYXRvcjogc3RyaW5nO1xuICBtdWx0aWxpbmVSZXZlcnNlZENhcmRTZXBhcmF0b3I6IHN0cmluZztcbiAgZWRpdExhdGVyVGFnOiBzdHJpbmc7XG4gIC8vIG5vdGVzXG4gIGVuYWJsZU5vdGVSZXZpZXdQYW5lT25TdGFydHVwOiBib29sZWFuO1xuICB0YWdzVG9SZXZpZXc6IHN0cmluZ1tdO1xuICBub3RlRm9sZGVyc1RvSWdub3JlOiBzdHJpbmdbXTtcbiAgb3BlblJhbmRvbU5vdGU6IGJvb2xlYW47XG4gIGF1dG9OZXh0Tm90ZTogYm9vbGVhbjtcbiAgZGlzYWJsZUZpbGVNZW51UmV2aWV3T3B0aW9uczogYm9vbGVhbjtcbiAgbWF4TkRheXNOb3Rlc1Jldmlld1F1ZXVlOiBudW1iZXI7XG4gIC8vIFVJIHByZWZlcmVuY2VzXG4gIGluaXRpYWxseUV4cGFuZEFsbFN1YmRlY2tzSW5UcmVlOiBib29sZWFuO1xuICAvLyBhbGdvcml0aG1cbiAgYmFzZUVhc2U6IG51bWJlcjtcbiAgbGFwc2VzSW50ZXJ2YWxDaGFuZ2U6IG51bWJlcjtcbiAgZWFzeUJvbnVzOiBudW1iZXI7XG4gIG1heGltdW1JbnRlcnZhbDogbnVtYmVyO1xuICBtYXhMaW5rRmFjdG9yOiBudW1iZXI7XG4gIC8vIGxvZ2dpbmdcbiAgc2hvd0RlYnVnTWVzc2FnZXM6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1NFVFRJTkdTOiBTUlNldHRpbmdzID0ge1xuICAvLyBmbGFzaGNhcmRzXG4gIGZsYXNoY2FyZEVhc3lUZXh0OiB0KFwiRUFTWVwiKSxcbiAgZmxhc2hjYXJkR29vZFRleHQ6IHQoXCJHT09EXCIpLFxuICBmbGFzaGNhcmRIYXJkVGV4dDogdChcIkhBUkRcIiksXG4gIGZsYXNoY2FyZFRhZ3M6IFtcIiNmbGFzaGNhcmRzXCJdLFxuICBjb252ZXJ0Rm9sZGVyc1RvRGVja3M6IHRydWUsXG4gIGNhcmRDb21tZW50T25TYW1lTGluZTogdHJ1ZSxcbiAgYnVyeVNpYmxpbmdDYXJkczogZmFsc2UsXG4gIHNob3dDb250ZXh0SW5DYXJkczogdHJ1ZSxcbiAgZmxhc2hjYXJkSGVpZ2h0UGVyY2VudGFnZTogUGxhdGZvcm0uaXNNb2JpbGUgPyAxMDAgOiA4MCxcbiAgZmxhc2hjYXJkV2lkdGhQZXJjZW50YWdlOiBQbGF0Zm9ybS5pc01vYmlsZSA/IDEwMCA6IDQwLFxuICByYW5kb21pemVDYXJkT3JkZXI6IHRydWUsXG4gIGNvbnZlcnRIaWdobGlnaHRzVG9DbG96ZXM6IHRydWUsXG4gIGNvbnZlcnRCb2xkVGV4dFRvQ2xvemVzOiBmYWxzZSxcbiAgY29udmVydEN1cmx5QnJhY2tldHNUb0Nsb3plczogZmFsc2UsXG4gIHNpbmdsZUxpbmVDYXJkU2VwYXJhdG9yOiBcIlx1MjE5MlwiLFxuICBzaW5nbGVMaW5lUmV2ZXJzZWRDYXJkU2VwYXJhdG9yOiBcIlx1MjE5NFwiLFxuICBtdWx0aWxpbmVDYXJkU2VwYXJhdG9yOiBcIj9cIixcbiAgbXVsdGlsaW5lUmV2ZXJzZWRDYXJkU2VwYXJhdG9yOiBcIj8/XCIsXG4gIGVkaXRMYXRlclRhZzogXCIjZWRpdC1sYXRlclwiLFxuICAvLyBub3Rlc1xuICBlbmFibGVOb3RlUmV2aWV3UGFuZU9uU3RhcnR1cDogdHJ1ZSxcbiAgdGFnc1RvUmV2aWV3OiBbXCIjcmV2aWV3XCJdLFxuICBub3RlRm9sZGVyc1RvSWdub3JlOiBbXSxcbiAgb3BlblJhbmRvbU5vdGU6IGZhbHNlLFxuICBhdXRvTmV4dE5vdGU6IGZhbHNlLFxuICBkaXNhYmxlRmlsZU1lbnVSZXZpZXdPcHRpb25zOiBmYWxzZSxcbiAgbWF4TkRheXNOb3Rlc1Jldmlld1F1ZXVlOiAzNjUsXG4gIC8vIFVJIHNldHRpbmdzXG4gIGluaXRpYWxseUV4cGFuZEFsbFN1YmRlY2tzSW5UcmVlOiBmYWxzZSxcbiAgLy8gYWxnb3JpdGhtXG4gIGJhc2VFYXNlOiAyNTAsXG4gIGxhcHNlc0ludGVydmFsQ2hhbmdlOiAwLjUsXG4gIGVhc3lCb251czogMS4zLFxuICBtYXhpbXVtSW50ZXJ2YWw6IDM2NTI1LFxuICBtYXhMaW5rRmFjdG9yOiAxLjAsXG4gIC8vIGxvZ2dpbmdcbiAgc2hvd0RlYnVnTWVzc2FnZXM6IGZhbHNlLFxufTtcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL21nbWV5ZXJzL29ic2lkaWFuLWthbmJhbi9ibG9iL21haW4vc3JjL1NldHRpbmdzLnRzXG5sZXQgYXBwbHlEZWJvdW5jZVRpbWVyID0gMDtcbmZ1bmN0aW9uIGFwcGx5U2V0dGluZ3NVcGRhdGUgKGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gIGNsZWFyVGltZW91dChhcHBseURlYm91bmNlVGltZXIpO1xuICBhcHBseURlYm91bmNlVGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgNTEyKTtcbn1cblxuZXhwb3J0IGNsYXNzIFNSU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuICBwcml2YXRlIHBsdWdpbjogU1JQbHVnaW47XG5cbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogU1JQbHVnaW4pIHtcbiAgICBzdXBlcihhcHAsIHBsdWdpbik7XG4gICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gIH1cblxuICBkaXNwbGF5ICgpOiB2b2lkIHtcbiAgICBjb25zdCB7IGNvbnRhaW5lckVsIH0gPSB0aGlzO1xuXG4gICAgY29udGFpbmVyRWwuZW1wdHkoKTtcblxuICAgIGNvbnN0IGhlYWRlciA9IGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDFcIiwgeyB0ZXh0OiBgJHt0KFwiU0VUVElOR1NfSEVBREVSXCIpfWAgfSk7XG4gICAgaGVhZGVyLmFkZENsYXNzKFwic3ItY2VudGVyZWRcIik7XG5cbiAgICBjb250YWluZXJFbC5jcmVhdGVEaXYoKS5pbm5lckhUTUwgPSB0KFwiQ0hFQ0tfV0lLSVwiLCB7XG4gICAgICB3aWtpX3VybDogXCJodHRwczovL3d3dy5zdGVwaGVubXdhbmdpLmNvbS9vYnNpZGlhbi1zcGFjZWQtcmVwZXRpdGlvbi9cIixcbiAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUodChcIkZPTERFUlNfVE9fSUdOT1JFXCIpKVxuICAgICAgLnNldERlc2ModChcIkZPTERFUlNfVE9fSUdOT1JFX0RFU0NcIikpXG4gICAgICAuYWRkVGV4dEFyZWEoKHRleHQpID0+XG4gICAgICAgIHRleHRcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5ub3RlRm9sZGVyc1RvSWdub3JlLmpvaW4oXCJcXG5cIikpXG4gICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgYXBwbHlTZXR0aW5nc1VwZGF0ZShhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3Mubm90ZUZvbGRlcnNUb0lnbm9yZSA9IHZhbHVlXG4gICAgICAgICAgICAgICAgLnNwbGl0KC9cXG4rLylcbiAgICAgICAgICAgICAgICAubWFwKCh2KSA9PiB2LnRyaW0oKSlcbiAgICAgICAgICAgICAgICAuZmlsdGVyKCh2KSA9PiB2KTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVBsdWdpbkRhdGEoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoM1wiLCB7IHRleHQ6IGAke3QoXCJGTEFTSENBUkRTXCIpfWAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKHQoXCJGTEFTSENBUkRfVEFHU1wiKSlcbiAgICAgIC5zZXREZXNjKHQoXCJGTEFTSENBUkRfVEFHU19ERVNDXCIpKVxuICAgICAgLmFkZFRleHRBcmVhKCh0ZXh0KSA9PlxuICAgICAgICB0ZXh0XG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MuZmxhc2hjYXJkVGFncy5qb2luKFwiIFwiKSlcbiAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBhcHBseVNldHRpbmdzVXBkYXRlKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5mbGFzaGNhcmRUYWdzID0gdmFsdWUuc3BsaXQoL1xccysvKTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVBsdWdpbkRhdGEoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSh0KFwiQ09OVkVSVF9GT0xERVJTX1RPX0RFQ0tTXCIpKVxuICAgICAgLnNldERlc2ModChcIkNPTlZFUlRfRk9MREVSU19UT19ERUNLU19ERVNDXCIpKVxuICAgICAgLmFkZFRvZ2dsZSgodG9nZ2xlKSA9PlxuICAgICAgICB0b2dnbGVcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5jb252ZXJ0Rm9sZGVyc1RvRGVja3MpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5jb252ZXJ0Rm9sZGVyc1RvRGVja3MgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVQbHVnaW5EYXRhKCk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKHQoXCJJTkxJTkVfU0NIRURVTElOR19DT01NRU5UU1wiKSlcbiAgICAgIC5zZXREZXNjKHQoXCJJTkxJTkVfU0NIRURVTElOR19DT01NRU5UU19ERVNDXCIpKVxuICAgICAgLmFkZFRvZ2dsZSgodG9nZ2xlKSA9PlxuICAgICAgICB0b2dnbGVcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5jYXJkQ29tbWVudE9uU2FtZUxpbmUpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5jYXJkQ29tbWVudE9uU2FtZUxpbmUgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVQbHVnaW5EYXRhKCk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKHQoXCJCVVJZX1NJQkxJTkdTX1RJTExfTkVYVF9EQVlcIikpXG4gICAgICAuc2V0RGVzYyh0KFwiQlVSWV9TSUJMSU5HU19USUxMX05FWFRfREFZX0RFU0NcIikpXG4gICAgICAuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XG4gICAgICAgIHRvZ2dsZVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLmJ1cnlTaWJsaW5nQ2FyZHMpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5idXJ5U2libGluZ0NhcmRzID0gdmFsdWU7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlUGx1Z2luRGF0YSgpO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSh0KFwiU0hPV19DQVJEX0NPTlRFWFRcIikpXG4gICAgICAuc2V0RGVzYyh0KFwiU0hPV19DQVJEX0NPTlRFWFRfREVTQ1wiKSlcbiAgICAgIC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT5cbiAgICAgICAgdG9nZ2xlXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3Muc2hvd0NvbnRleHRJbkNhcmRzKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3Muc2hvd0NvbnRleHRJbkNhcmRzID0gdmFsdWU7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlUGx1Z2luRGF0YSgpO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSh0KFwiQ0FSRF9NT0RBTF9IRUlHSFRfUEVSQ0VOVFwiKSlcbiAgICAgIC5zZXREZXNjKHQoXCJDQVJEX01PREFMX1NJWkVfUEVSQ0VOVF9ERVNDXCIpKVxuICAgICAgLmFkZFNsaWRlcigoc2xpZGVyKSA9PlxuICAgICAgICBzbGlkZXJcbiAgICAgICAgICAuc2V0TGltaXRzKDEwLCAxMDAsIDUpXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MuZmxhc2hjYXJkSGVpZ2h0UGVyY2VudGFnZSlcbiAgICAgICAgICAuc2V0RHluYW1pY1Rvb2x0aXAoKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MuZmxhc2hjYXJkSGVpZ2h0UGVyY2VudGFnZSA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVBsdWdpbkRhdGEoKTtcbiAgICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLmFkZEV4dHJhQnV0dG9uKChidXR0b24pID0+IHtcbiAgICAgICAgYnV0dG9uXG4gICAgICAgICAgLnNldEljb24oXCJyZXNldFwiKVxuICAgICAgICAgIC5zZXRUb29sdGlwKHQoXCJSRVNFVF9ERUZBVUxUXCIpKVxuICAgICAgICAgIC5vbkNsaWNrKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MuZmxhc2hjYXJkSGVpZ2h0UGVyY2VudGFnZSA9XG4gICAgICAgICAgICAgIERFRkFVTFRfU0VUVElOR1MuZmxhc2hjYXJkSGVpZ2h0UGVyY2VudGFnZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVQbHVnaW5EYXRhKCk7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSh0KFwiQ0FSRF9NT0RBTF9XSURUSF9QRVJDRU5UXCIpKVxuICAgICAgLnNldERlc2ModChcIkNBUkRfTU9EQUxfU0laRV9QRVJDRU5UX0RFU0NcIikpXG4gICAgICAuYWRkU2xpZGVyKChzbGlkZXIpID0+XG4gICAgICAgIHNsaWRlclxuICAgICAgICAgIC5zZXRMaW1pdHMoMTAsIDEwMCwgNSlcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5mbGFzaGNhcmRXaWR0aFBlcmNlbnRhZ2UpXG4gICAgICAgICAgLnNldER5bmFtaWNUb29sdGlwKClcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLmZsYXNoY2FyZFdpZHRoUGVyY2VudGFnZSA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVBsdWdpbkRhdGEoKTtcbiAgICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLmFkZEV4dHJhQnV0dG9uKChidXR0b24pID0+IHtcbiAgICAgICAgYnV0dG9uXG4gICAgICAgICAgLnNldEljb24oXCJyZXNldFwiKVxuICAgICAgICAgIC5zZXRUb29sdGlwKHQoXCJSRVNFVF9ERUZBVUxUXCIpKVxuICAgICAgICAgIC5vbkNsaWNrKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MuZmxhc2hjYXJkV2lkdGhQZXJjZW50YWdlID1cbiAgICAgICAgICAgICAgREVGQVVMVF9TRVRUSU5HUy5mbGFzaGNhcmRXaWR0aFBlcmNlbnRhZ2U7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlUGx1Z2luRGF0YSgpO1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5KCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKS5zZXROYW1lKHQoXCJSQU5ET01JWkVfQ0FSRF9PUkRFUlwiKSkuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XG4gICAgICB0b2dnbGVcbiAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MucmFuZG9taXplQ2FyZE9yZGVyKVxuICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5yYW5kb21pemVDYXJkT3JkZXIgPSB2YWx1ZTtcbiAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlUGx1Z2luRGF0YSgpO1xuICAgICAgICB9KVxuICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbCkuc2V0TmFtZSh0KFwiQ09OVkVSVF9ISUdITElHSFRTX1RPX0NMT1pFU1wiKSkuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XG4gICAgICB0b2dnbGVcbiAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MuY29udmVydEhpZ2hsaWdodHNUb0Nsb3plcylcbiAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MuY29udmVydEhpZ2hsaWdodHNUb0Nsb3plcyA9IHZhbHVlO1xuICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVQbHVnaW5EYXRhKCk7XG4gICAgICAgIH0pXG4gICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKS5zZXROYW1lKHQoXCJDT05WRVJUX0JPTERfVEVYVF9UT19DTE9aRVNcIikpLmFkZFRvZ2dsZSgodG9nZ2xlKSA9PlxuICAgICAgdG9nZ2xlXG4gICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLmNvbnZlcnRCb2xkVGV4dFRvQ2xvemVzKVxuICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5jb252ZXJ0Qm9sZFRleHRUb0Nsb3plcyA9IHZhbHVlO1xuICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVQbHVnaW5EYXRhKCk7XG4gICAgICAgIH0pXG4gICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUodChcIkNPTlZFUlRfQ1VSTFlfQlJBQ0tFVFNfVE9fQ0xPWkVTXCIpKVxuICAgICAgLmFkZFRvZ2dsZSgodG9nZ2xlKSA9PlxuICAgICAgICB0b2dnbGVcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5jb252ZXJ0Q3VybHlCcmFja2V0c1RvQ2xvemVzKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MuY29udmVydEN1cmx5QnJhY2tldHNUb0Nsb3plcyA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVBsdWdpbkRhdGEoKTtcbiAgICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUodChcIklOTElORV9DQVJEU19TRVBBUkFUT1JcIikpXG4gICAgICAuc2V0RGVzYyh0KFwiRklYX1NFUEFSQVRPUlNfTUFOVUFMTFlfV0FSTklOR1wiKSlcbiAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICB0ZXh0XG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3Muc2luZ2xlTGluZUNhcmRTZXBhcmF0b3IpXG4gICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgYXBwbHlTZXR0aW5nc1VwZGF0ZShhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3Muc2luZ2xlTGluZUNhcmRTZXBhcmF0b3IgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVBsdWdpbkRhdGEoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pXG4gICAgICApXG4gICAgICAuYWRkRXh0cmFCdXR0b24oKGJ1dHRvbikgPT4ge1xuICAgICAgICBidXR0b25cbiAgICAgICAgICAuc2V0SWNvbihcInJlc2V0XCIpXG4gICAgICAgICAgLnNldFRvb2x0aXAodChcIlJFU0VUX0RFRkFVTFRcIikpXG4gICAgICAgICAgLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5zaW5nbGVMaW5lQ2FyZFNlcGFyYXRvciA9XG4gICAgICAgICAgICAgIERFRkFVTFRfU0VUVElOR1Muc2luZ2xlTGluZUNhcmRTZXBhcmF0b3I7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlUGx1Z2luRGF0YSgpO1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5KCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUodChcIklOTElORV9SRVZFUlNFRF9DQVJEU19TRVBBUkFUT1JcIikpXG4gICAgICAuc2V0RGVzYyh0KFwiRklYX1NFUEFSQVRPUlNfTUFOVUFMTFlfV0FSTklOR1wiKSlcbiAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICB0ZXh0XG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3Muc2luZ2xlTGluZVJldmVyc2VkQ2FyZFNlcGFyYXRvcilcbiAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBhcHBseVNldHRpbmdzVXBkYXRlKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5zaW5nbGVMaW5lUmV2ZXJzZWRDYXJkU2VwYXJhdG9yID0gdmFsdWU7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVQbHVnaW5EYXRhKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLmFkZEV4dHJhQnV0dG9uKChidXR0b24pID0+IHtcbiAgICAgICAgYnV0dG9uXG4gICAgICAgICAgLnNldEljb24oXCJyZXNldFwiKVxuICAgICAgICAgIC5zZXRUb29sdGlwKHQoXCJSRVNFVF9ERUZBVUxUXCIpKVxuICAgICAgICAgIC5vbkNsaWNrKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3Muc2luZ2xlTGluZVJldmVyc2VkQ2FyZFNlcGFyYXRvciA9XG4gICAgICAgICAgICAgIERFRkFVTFRfU0VUVElOR1Muc2luZ2xlTGluZVJldmVyc2VkQ2FyZFNlcGFyYXRvcjtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVQbHVnaW5EYXRhKCk7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSh0KFwiTVVMVElMSU5FX0NBUkRTX1NFUEFSQVRPUlwiKSlcbiAgICAgIC5zZXREZXNjKHQoXCJGSVhfU0VQQVJBVE9SU19NQU5VQUxMWV9XQVJOSU5HXCIpKVxuICAgICAgLmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgIHRleHRcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5tdWx0aWxpbmVDYXJkU2VwYXJhdG9yKVxuICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGFwcGx5U2V0dGluZ3NVcGRhdGUoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLm11bHRpbGluZUNhcmRTZXBhcmF0b3IgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVBsdWdpbkRhdGEoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pXG4gICAgICApXG4gICAgICAuYWRkRXh0cmFCdXR0b24oKGJ1dHRvbikgPT4ge1xuICAgICAgICBidXR0b25cbiAgICAgICAgICAuc2V0SWNvbihcInJlc2V0XCIpXG4gICAgICAgICAgLnNldFRvb2x0aXAodChcIlJFU0VUX0RFRkFVTFRcIikpXG4gICAgICAgICAgLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5tdWx0aWxpbmVDYXJkU2VwYXJhdG9yID1cbiAgICAgICAgICAgICAgREVGQVVMVF9TRVRUSU5HUy5tdWx0aWxpbmVDYXJkU2VwYXJhdG9yO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVBsdWdpbkRhdGEoKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKHQoXCJNVUxUSUxJTkVfUkVWRVJTRURfQ0FSRFNfU0VQQVJBVE9SXCIpKVxuICAgICAgLnNldERlc2ModChcIkZJWF9TRVBBUkFUT1JTX01BTlVBTExZX1dBUk5JTkdcIikpXG4gICAgICAuYWRkVGV4dCgodGV4dCkgPT5cbiAgICAgICAgdGV4dFxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLm11bHRpbGluZVJldmVyc2VkQ2FyZFNlcGFyYXRvcilcbiAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBhcHBseVNldHRpbmdzVXBkYXRlKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5tdWx0aWxpbmVSZXZlcnNlZENhcmRTZXBhcmF0b3IgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVBsdWdpbkRhdGEoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pXG4gICAgICApXG4gICAgICAuYWRkRXh0cmFCdXR0b24oKGJ1dHRvbikgPT4ge1xuICAgICAgICBidXR0b25cbiAgICAgICAgICAuc2V0SWNvbihcInJlc2V0XCIpXG4gICAgICAgICAgLnNldFRvb2x0aXAodChcIlJFU0VUX0RFRkFVTFRcIikpXG4gICAgICAgICAgLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5tdWx0aWxpbmVSZXZlcnNlZENhcmRTZXBhcmF0b3IgPVxuICAgICAgICAgICAgICBERUZBVUxUX1NFVFRJTkdTLm11bHRpbGluZVJldmVyc2VkQ2FyZFNlcGFyYXRvcjtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVQbHVnaW5EYXRhKCk7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSh0KFwiRkxBU0hDQVJEX0VBU1lfTEFCRUxcIikpXG4gICAgICAuc2V0RGVzYyh0KFwiRkxBU0hDQVJEX0VBU1lfREVTQ1wiKSlcbiAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICB0ZXh0LnNldFZhbHVlKHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MuZmxhc2hjYXJkRWFzeVRleHQpLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgIGFwcGx5U2V0dGluZ3NVcGRhdGUoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5mbGFzaGNhcmRFYXN5VGV4dCA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVBsdWdpbkRhdGEoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5hZGRFeHRyYUJ1dHRvbigoYnV0dG9uKSA9PiB7XG4gICAgICAgIGJ1dHRvblxuICAgICAgICAgIC5zZXRJY29uKFwicmVzZXRcIilcbiAgICAgICAgICAuc2V0VG9vbHRpcCh0KFwiUkVTRVRfREVGQVVMVFwiKSlcbiAgICAgICAgICAub25DbGljayhhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLmZsYXNoY2FyZEVhc3lUZXh0ID1cbiAgICAgICAgICAgICAgREVGQVVMVF9TRVRUSU5HUy5mbGFzaGNhcmRFYXN5VGV4dDtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVQbHVnaW5EYXRhKCk7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSh0KFwiRkxBU0hDQVJEX0dPT0RfTEFCRUxcIikpXG4gICAgICAuc2V0RGVzYyh0KFwiRkxBU0hDQVJEX0dPT0RfREVTQ1wiKSlcbiAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICB0ZXh0LnNldFZhbHVlKHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MuZmxhc2hjYXJkR29vZFRleHQpLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgIGFwcGx5U2V0dGluZ3NVcGRhdGUoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5mbGFzaGNhcmRHb29kVGV4dCA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVBsdWdpbkRhdGEoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5hZGRFeHRyYUJ1dHRvbigoYnV0dG9uKSA9PiB7XG4gICAgICAgIGJ1dHRvblxuICAgICAgICAgIC5zZXRJY29uKFwicmVzZXRcIilcbiAgICAgICAgICAuc2V0VG9vbHRpcCh0KFwiUkVTRVRfREVGQVVMVFwiKSlcbiAgICAgICAgICAub25DbGljayhhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLmZsYXNoY2FyZEdvb2RUZXh0ID1cbiAgICAgICAgICAgICAgREVGQVVMVF9TRVRUSU5HUy5mbGFzaGNhcmRHb29kVGV4dDtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVQbHVnaW5EYXRhKCk7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSh0KFwiRkxBU0hDQVJEX0hBUkRfTEFCRUxcIikpXG4gICAgICAuc2V0RGVzYyh0KFwiRkxBU0hDQVJEX0hBUkRfREVTQ1wiKSlcbiAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICB0ZXh0LnNldFZhbHVlKHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MuZmxhc2hjYXJkSGFyZFRleHQpLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgIGFwcGx5U2V0dGluZ3NVcGRhdGUoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5mbGFzaGNhcmRIYXJkVGV4dCA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVBsdWdpbkRhdGEoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5hZGRFeHRyYUJ1dHRvbigoYnV0dG9uKSA9PiB7XG4gICAgICAgIGJ1dHRvblxuICAgICAgICAgIC5zZXRJY29uKFwicmVzZXRcIilcbiAgICAgICAgICAuc2V0VG9vbHRpcCh0KFwiUkVTRVRfREVGQVVMVFwiKSlcbiAgICAgICAgICAub25DbGljayhhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLmZsYXNoY2FyZEhhcmRUZXh0ID1cbiAgICAgICAgICAgICAgREVGQVVMVF9TRVRUSU5HUy5mbGFzaGNhcmRIYXJkVGV4dDtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVQbHVnaW5EYXRhKCk7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoM1wiLCB7IHRleHQ6IGAke3QoXCJOT1RFU1wiKX1gIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpLnNldE5hbWUodChcIlJFVklFV19QQU5FX09OX1NUQVJUVVBcIikpLmFkZFRvZ2dsZSgodG9nZ2xlKSA9PlxuICAgICAgdG9nZ2xlXG4gICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLmVuYWJsZU5vdGVSZXZpZXdQYW5lT25TdGFydHVwKVxuICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5lbmFibGVOb3RlUmV2aWV3UGFuZU9uU3RhcnR1cCA9IHZhbHVlO1xuICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVQbHVnaW5EYXRhKCk7XG4gICAgICAgIH0pXG4gICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUodChcIlRBR1NfVE9fUkVWSUVXXCIpKVxuICAgICAgLnNldERlc2ModChcIlRBR1NfVE9fUkVWSUVXX0RFU0NcIikpXG4gICAgICAuYWRkVGV4dEFyZWEoKHRleHQpID0+XG4gICAgICAgIHRleHRcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy50YWdzVG9SZXZpZXcuam9pbihcIiBcIikpXG4gICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgYXBwbHlTZXR0aW5nc1VwZGF0ZShhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MudGFnc1RvUmV2aWV3ID0gdmFsdWUuc3BsaXQoL1xccysvKTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVBsdWdpbkRhdGEoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSh0KFwiT1BFTl9SQU5ET01fTk9URVwiKSlcbiAgICAgIC5zZXREZXNjKHQoXCJPUEVOX1JBTkRPTV9OT1RFX0RFU0NcIikpXG4gICAgICAuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XG4gICAgICAgIHRvZ2dsZVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLm9wZW5SYW5kb21Ob3RlKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3Mub3BlblJhbmRvbU5vdGUgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVQbHVnaW5EYXRhKCk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbCkuc2V0TmFtZSh0KFwiQVVUT19ORVhUX05PVEVcIikpLmFkZFRvZ2dsZSgodG9nZ2xlKSA9PlxuICAgICAgdG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MuYXV0b05leHROb3RlKS5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5hdXRvTmV4dE5vdGUgPSB2YWx1ZTtcbiAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVBsdWdpbkRhdGEoKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUodChcIkRJU0FCTEVfRklMRV9NRU5VX1JFVklFV19PUFRJT05TXCIpKVxuICAgICAgLnNldERlc2ModChcIkRJU0FCTEVfRklMRV9NRU5VX1JFVklFV19PUFRJT05TX0RFU0NcIikpXG4gICAgICAuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XG4gICAgICAgIHRvZ2dsZVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLmRpc2FibGVGaWxlTWVudVJldmlld09wdGlvbnMpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5kaXNhYmxlRmlsZU1lbnVSZXZpZXdPcHRpb25zID0gdmFsdWU7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlUGx1Z2luRGF0YSgpO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSh0KFwiTUFYX05fREFZU19SRVZJRVdfUVVFVUVcIikpXG4gICAgICAuYWRkVGV4dCgodGV4dCkgPT5cbiAgICAgICAgdGV4dFxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLm1heE5EYXlzTm90ZXNSZXZpZXdRdWV1ZS50b1N0cmluZygpKVxuICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGFwcGx5U2V0dGluZ3NVcGRhdGUoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBudW1WYWx1ZTogbnVtYmVyID0gTnVtYmVyLnBhcnNlSW50KHZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKCFpc05hTihudW1WYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAobnVtVmFsdWUgPCAxKSB7XG4gICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHQoXCJNSU5fT05FX0RBWVwiKSk7XG4gICAgICAgICAgICAgICAgICB0ZXh0LnNldFZhbHVlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLm1heE5EYXlzTm90ZXNSZXZpZXdRdWV1ZS50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MubWF4TkRheXNOb3Rlc1Jldmlld1F1ZXVlID0gbnVtVmFsdWU7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVBsdWdpbkRhdGEoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHQoXCJWQUxJRF9OVU1CRVJfV0FSTklOR1wiKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pXG4gICAgICApXG4gICAgICAuYWRkRXh0cmFCdXR0b24oKGJ1dHRvbikgPT4ge1xuICAgICAgICBidXR0b25cbiAgICAgICAgICAuc2V0SWNvbihcInJlc2V0XCIpXG4gICAgICAgICAgLnNldFRvb2x0aXAodChcIlJFU0VUX0RFRkFVTFRcIikpXG4gICAgICAgICAgLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5tYXhORGF5c05vdGVzUmV2aWV3UXVldWUgPVxuICAgICAgICAgICAgICBERUZBVUxUX1NFVFRJTkdTLm1heE5EYXlzTm90ZXNSZXZpZXdRdWV1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVQbHVnaW5EYXRhKCk7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoM1wiLCB7IHRleHQ6IGAke3QoXCJVSV9QUkVGRVJFTkNFU1wiKX1gIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSh0KFwiSU5JVElBTExZX0VYUEFORF9TVUJERUNLU19JTl9UUkVFXCIpKVxuICAgICAgLnNldERlc2ModChcIklOSVRJQUxMWV9FWFBBTkRfU1VCREVDS1NfSU5fVFJFRV9ERVNDXCIpKVxuICAgICAgLmFkZFRvZ2dsZSgodG9nZ2xlKSA9PlxuICAgICAgICB0b2dnbGVcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5pbml0aWFsbHlFeHBhbmRBbGxTdWJkZWNrc0luVHJlZSlcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLmluaXRpYWxseUV4cGFuZEFsbFN1YmRlY2tzSW5UcmVlID0gdmFsdWU7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlUGx1Z2luRGF0YSgpO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoM1wiLCB7IHRleHQ6IGAke3QoXCJBTEdPUklUSE1cIil9YCB9KTtcbiAgICBjb250YWluZXJFbC5jcmVhdGVEaXYoKS5pbm5lckhUTUwgPSB0KFwiQ0hFQ0tfQUxHT1JJVEhNX1dJS0lcIiwge1xuICAgICAgYWxnb191cmw6IFwiaHR0cHM6Ly93d3cuc3RlcGhlbm13YW5naS5jb20vb2JzaWRpYW4tc3BhY2VkLXJlcGV0aXRpb24vYWxnb3JpdGhtcy9cIixcbiAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUodChcIkJBU0VfRUFTRVwiKSlcbiAgICAgIC5zZXREZXNjKHQoXCJCQVNFX0VBU0VfREVTQ1wiKSlcbiAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICB0ZXh0LnNldFZhbHVlKHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MuYmFzZUVhc2UudG9TdHJpbmcoKSkub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgYXBwbHlTZXR0aW5nc1VwZGF0ZShhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBudW1WYWx1ZTogbnVtYmVyID0gTnVtYmVyLnBhcnNlSW50KHZhbHVlKTtcbiAgICAgICAgICAgIGlmICghaXNOYU4obnVtVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGlmIChudW1WYWx1ZSA8IDEzMCkge1xuICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodChcIkJBU0VfRUFTRV9NSU5fV0FSTklOR1wiKSk7XG4gICAgICAgICAgICAgICAgdGV4dC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLmJhc2VFYXNlLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MuYmFzZUVhc2UgPSBudW1WYWx1ZTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVBsdWdpbkRhdGEoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG5ldyBOb3RpY2UodChcIlZBTElEX05VTUJFUl9XQVJOSU5HXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5hZGRFeHRyYUJ1dHRvbigoYnV0dG9uKSA9PiB7XG4gICAgICAgIGJ1dHRvblxuICAgICAgICAgIC5zZXRJY29uKFwicmVzZXRcIilcbiAgICAgICAgICAuc2V0VG9vbHRpcCh0KFwiUkVTRVRfREVGQVVMVFwiKSlcbiAgICAgICAgICAub25DbGljayhhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLmJhc2VFYXNlID0gREVGQVVMVF9TRVRUSU5HUy5iYXNlRWFzZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVQbHVnaW5EYXRhKCk7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSh0KFwiTEFQU0VfSU5URVJWQUxfQ0hBTkdFXCIpKVxuICAgICAgLnNldERlc2ModChcIkxBUFNFX0lOVEVSVkFMX0NIQU5HRV9ERVNDXCIpKVxuICAgICAgLmFkZFNsaWRlcigoc2xpZGVyKSA9PlxuICAgICAgICBzbGlkZXJcbiAgICAgICAgICAuc2V0TGltaXRzKDEsIDk5LCAxKVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLmxhcHNlc0ludGVydmFsQ2hhbmdlICogMTAwKVxuICAgICAgICAgIC5zZXREeW5hbWljVG9vbHRpcCgpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLmxhcHNlc0ludGVydmFsQ2hhbmdlID0gdmFsdWUgLyAxMDA7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlUGx1Z2luRGF0YSgpO1xuICAgICAgICAgIH0pXG4gICAgICApXG4gICAgICAuYWRkRXh0cmFCdXR0b24oKGJ1dHRvbikgPT4ge1xuICAgICAgICBidXR0b25cbiAgICAgICAgICAuc2V0SWNvbihcInJlc2V0XCIpXG4gICAgICAgICAgLnNldFRvb2x0aXAodChcIlJFU0VUX0RFRkFVTFRcIikpXG4gICAgICAgICAgLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5sYXBzZXNJbnRlcnZhbENoYW5nZSA9XG4gICAgICAgICAgICAgIERFRkFVTFRfU0VUVElOR1MubGFwc2VzSW50ZXJ2YWxDaGFuZ2U7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlUGx1Z2luRGF0YSgpO1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5KCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUodChcIkVBU1lfQk9OVVNcIikpXG4gICAgICAuc2V0RGVzYyh0KFwiRUFTWV9CT05VU19ERVNDXCIpKVxuICAgICAgLmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgIHRleHRcbiAgICAgICAgICAuc2V0VmFsdWUoKHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MuZWFzeUJvbnVzICogMTAwKS50b1N0cmluZygpKVxuICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGFwcGx5U2V0dGluZ3NVcGRhdGUoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBudW1WYWx1ZTogbnVtYmVyID0gTnVtYmVyLnBhcnNlSW50KHZhbHVlKSAvIDEwMDtcbiAgICAgICAgICAgICAgaWYgKCFpc05hTihudW1WYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAobnVtVmFsdWUgPCAxLjApIHtcbiAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodChcIkVBU1lfQk9OVVNfTUlOX1dBUk5JTkdcIikpO1xuICAgICAgICAgICAgICAgICAgdGV4dC5zZXRWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MuZWFzeUJvbnVzICogMTAwKS50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MuZWFzeUJvbnVzID0gbnVtVmFsdWU7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVBsdWdpbkRhdGEoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHQoXCJWQUxJRF9OVU1CRVJfV0FSTklOR1wiKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pXG4gICAgICApXG4gICAgICAuYWRkRXh0cmFCdXR0b24oKGJ1dHRvbikgPT4ge1xuICAgICAgICBidXR0b25cbiAgICAgICAgICAuc2V0SWNvbihcInJlc2V0XCIpXG4gICAgICAgICAgLnNldFRvb2x0aXAodChcIlJFU0VUX0RFRkFVTFRcIikpXG4gICAgICAgICAgLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5lYXN5Qm9udXMgPSBERUZBVUxUX1NFVFRJTkdTLmVhc3lCb251cztcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVQbHVnaW5EYXRhKCk7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSh0KFwiTUFYX0lOVEVSVkFMXCIpKVxuICAgICAgLnNldERlc2ModChcIk1BWF9JTlRFUlZBTF9ERVNDXCIpKVxuICAgICAgLmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgIHRleHRcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5tYXhpbXVtSW50ZXJ2YWwudG9TdHJpbmcoKSlcbiAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBhcHBseVNldHRpbmdzVXBkYXRlKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgbnVtVmFsdWU6IG51bWJlciA9IE51bWJlci5wYXJzZUludCh2YWx1ZSk7XG4gICAgICAgICAgICAgIGlmICghaXNOYU4obnVtVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKG51bVZhbHVlIDwgMSkge1xuICAgICAgICAgICAgICAgICAgbmV3IE5vdGljZSh0KFwiTUFYX0lOVEVSVkFMX01JTl9XQVJOSU5HXCIpKTtcbiAgICAgICAgICAgICAgICAgIHRleHQuc2V0VmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MubWF4aW11bUludGVydmFsLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5tYXhpbXVtSW50ZXJ2YWwgPSBudW1WYWx1ZTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlUGx1Z2luRGF0YSgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodChcIlZBTElEX05VTUJFUl9XQVJOSU5HXCIpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5hZGRFeHRyYUJ1dHRvbigoYnV0dG9uKSA9PiB7XG4gICAgICAgIGJ1dHRvblxuICAgICAgICAgIC5zZXRJY29uKFwicmVzZXRcIilcbiAgICAgICAgICAuc2V0VG9vbHRpcCh0KFwiUkVTRVRfREVGQVVMVFwiKSlcbiAgICAgICAgICAub25DbGljayhhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLm1heGltdW1JbnRlcnZhbCA9XG4gICAgICAgICAgICAgIERFRkFVTFRfU0VUVElOR1MubWF4aW11bUludGVydmFsO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVBsdWdpbkRhdGEoKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKHQoXCJNQVhfTElOS19DT05UUklCXCIpKVxuICAgICAgLnNldERlc2ModChcIk1BWF9MSU5LX0NPTlRSSUJfREVTQ1wiKSlcbiAgICAgIC5hZGRTbGlkZXIoKHNsaWRlcikgPT5cbiAgICAgICAgc2xpZGVyXG4gICAgICAgICAgLnNldExpbWl0cygwLCAxMDAsIDEpXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MubWF4TGlua0ZhY3RvciAqIDEwMClcbiAgICAgICAgICAuc2V0RHluYW1pY1Rvb2x0aXAoKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5tYXhMaW5rRmFjdG9yID0gdmFsdWUgLyAxMDA7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlUGx1Z2luRGF0YSgpO1xuICAgICAgICAgIH0pXG4gICAgICApXG4gICAgICAuYWRkRXh0cmFCdXR0b24oKGJ1dHRvbikgPT4ge1xuICAgICAgICBidXR0b25cbiAgICAgICAgICAuc2V0SWNvbihcInJlc2V0XCIpXG4gICAgICAgICAgLnNldFRvb2x0aXAodChcIlJFU0VUX0RFRkFVTFRcIikpXG4gICAgICAgICAgLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5tYXhMaW5rRmFjdG9yID0gREVGQVVMVF9TRVRUSU5HUy5tYXhMaW5rRmFjdG9yO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVBsdWdpbkRhdGEoKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBjb250YWluZXJFbC5jcmVhdGVFbChcImgzXCIsIHsgdGV4dDogYCR7dChcIkxPR0dJTkdcIil9YCB9KTtcbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbCkuc2V0TmFtZSh0KFwiRElTUExBWV9ERUJVR19JTkZPXCIpKS5hZGRUb2dnbGUoKHRvZ2dsZSkgPT5cbiAgICAgIHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLnNob3dEZWJ1Z01lc3NhZ2VzKS5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5zaG93RGVidWdNZXNzYWdlcyA9IHZhbHVlO1xuICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlUGx1Z2luRGF0YSgpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iLCAiLy8gaHR0cHM6Ly9naXRodWIuY29tL21nbWV5ZXJzL29ic2lkaWFuLWthbmJhbi9ibG9iLzkzMDE0YzI1MTI1MDdmZGU5ZWFmZDI0MWU4ZDQzNjhhOGRmZGY4NTMvc3JjL2xhbmcvaGVscGVycy50c1xuXG5pbXBvcnQgeyBtb21lbnQgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCBhZiBmcm9tIFwiLi9sb2NhbGUvYWZcIjtcbmltcG9ydCBhciBmcm9tIFwiLi9sb2NhbGUvYXJcIjtcbmltcG9ydCBjeiBmcm9tIFwiLi9sb2NhbGUvY3pcIjtcbmltcG9ydCBibiBmcm9tIFwiLi9sb2NhbGUvYm5cIjtcbmltcG9ydCBkYSBmcm9tIFwiLi9sb2NhbGUvZGFcIjtcbmltcG9ydCBkZSBmcm9tIFwiLi9sb2NhbGUvZGVcIjtcbmltcG9ydCBlbiBmcm9tIFwiLi9sb2NhbGUvZW5cIjtcbmltcG9ydCBlbkdCIGZyb20gXCIuL2xvY2FsZS9lbi1nYlwiO1xuaW1wb3J0IGVzIGZyb20gXCIuL2xvY2FsZS9lc1wiO1xuaW1wb3J0IGZyIGZyb20gXCIuL2xvY2FsZS9mclwiO1xuaW1wb3J0IGhpIGZyb20gXCIuL2xvY2FsZS9oaVwiO1xuaW1wb3J0IGlkIGZyb20gXCIuL2xvY2FsZS9pZFwiO1xuaW1wb3J0IGl0IGZyb20gXCIuL2xvY2FsZS9pdFwiO1xuaW1wb3J0IGphIGZyb20gXCIuL2xvY2FsZS9qYVwiO1xuaW1wb3J0IGtvIGZyb20gXCIuL2xvY2FsZS9rb1wiO1xuaW1wb3J0IG1yIGZyb20gXCIuL2xvY2FsZS9tclwiO1xuaW1wb3J0IG5sIGZyb20gXCIuL2xvY2FsZS9ubFwiO1xuaW1wb3J0IG5vIGZyb20gXCIuL2xvY2FsZS9ub1wiO1xuaW1wb3J0IHBsIGZyb20gXCIuL2xvY2FsZS9wbFwiO1xuaW1wb3J0IHB0IGZyb20gXCIuL2xvY2FsZS9wdFwiO1xuaW1wb3J0IHB0QlIgZnJvbSBcIi4vbG9jYWxlL3B0LWJyXCI7XG5pbXBvcnQgcm8gZnJvbSBcIi4vbG9jYWxlL3JvXCI7XG5pbXBvcnQgcnUgZnJvbSBcIi4vbG9jYWxlL3J1XCI7XG5pbXBvcnQgdGEgZnJvbSBcIi4vbG9jYWxlL3RhXCI7XG5pbXBvcnQgdGUgZnJvbSBcIi4vbG9jYWxlL3RlXCI7XG5pbXBvcnQgdGggZnJvbSBcIi4vbG9jYWxlL3RoXCI7XG5pbXBvcnQgdHIgZnJvbSBcIi4vbG9jYWxlL3RyXCI7XG5pbXBvcnQgdWsgZnJvbSBcIi4vbG9jYWxlL3VrXCI7XG5pbXBvcnQgdXIgZnJvbSBcIi4vbG9jYWxlL3VyXCI7XG5pbXBvcnQgdmkgZnJvbSBcIi4vbG9jYWxlL3ZpXCI7XG5pbXBvcnQgemhDTiBmcm9tIFwiLi9sb2NhbGUvemgtY25cIjtcbmltcG9ydCB6aFRXIGZyb20gXCIuL2xvY2FsZS96aC10d1wiO1xuXG5leHBvcnQgY29uc3QgbG9jYWxlTWFwOiB7IFtrOiBzdHJpbmddOiBQYXJ0aWFsPHR5cGVvZiBlbj4gfSA9IHtcbiAgICBhZixcbiAgICBhcixcbiAgICBibixcbiAgICBjczogY3osXG4gICAgZGEsXG4gICAgZGUsXG4gICAgZW4sXG4gICAgXCJlbi1nYlwiOiBlbkdCLFxuICAgIGVzLFxuICAgIGZyLFxuICAgIGhpLFxuICAgIGlkLFxuICAgIGl0LFxuICAgIGphLFxuICAgIGtvLFxuICAgIG1yLFxuICAgIG5sLFxuICAgIG5uOiBubyxcbiAgICBwbCxcbiAgICBwdCxcbiAgICBcInB0LWJyXCI6IHB0QlIsXG4gICAgcm8sXG4gICAgcnUsXG4gICAgdGEsXG4gICAgdGUsXG4gICAgdGgsXG4gICAgdHIsXG4gICAgdWssXG4gICAgdXIsXG4gICAgdmksXG4gICAgXCJ6aC1jblwiOiB6aENOLFxuICAgIFwiemgtdHdcIjogemhUVyxcbn07XG5cbmNvbnN0IGxvY2FsZSA9IGxvY2FsZU1hcFttb21lbnQubG9jYWxlKCldO1xuXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDEwMTU4NDAvXG5mdW5jdGlvbiBpbnRlcnBvbGF0ZShzdHI6IHN0cmluZywgcGFyYW1zOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IHN0cmluZyB7XG4gICAgY29uc3QgbmFtZXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMocGFyYW1zKTtcbiAgICBjb25zdCB2YWxzOiB1bmtub3duW10gPSBPYmplY3QudmFsdWVzKHBhcmFtcyk7XG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbiguLi5uYW1lcywgYHJldHVybiBcXGAke3N0cn1cXGA7YCkoLi4udmFscyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0KHN0cjoga2V5b2YgdHlwZW9mIGVuLCBwYXJhbXM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IHN0cmluZyB7XG4gICAgaWYgKCFsb2NhbGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgU1JTIGVycm9yOiBMb2NhbGUgJHttb21lbnQubG9jYWxlKCl9IG5vdCBmb3VuZC5gKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSAobG9jYWxlICYmIGxvY2FsZVtzdHJdKSB8fCBlbltzdHJdO1xuXG4gICAgaWYgKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gaW50ZXJwb2xhdGUocmVzdWx0LCBwYXJhbXMpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG4iLCAiLy8gQWZyaWthYW5zXG5cbmV4cG9ydCBkZWZhdWx0IHt9O1xuIiwgIi8vIFx1MDYyN1x1MDY0NFx1MDYzOVx1MDYzMVx1MDYyOFx1MDY0QVx1MDYyOVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgLy8gZmxhc2hjYXJkLW1vZGFsLnRzeFxuICAgIERFQ0tTOiBcIlx1MDYyN1x1MDY0NFx1MDYzMVx1MDY0Rlx1MDYzMlx1MDY0NVx1MDY0RVx1MDYyN1x1MDYyQVwiLFxuICAgIERVRV9DQVJEUzogXCJcdTA2MjhcdTA2MzdcdTA2MjdcdTA2NDJcdTA2MjdcdTA2MkEgXHUwNjQ1XHUwNjRGXHUwNjMzXHUwNjJBXHUwNjJEXHUwNjQyXHUwNjI5XCIsXG4gICAgTkVXX0NBUkRTOiBcIlx1MDYyOFx1MDYzN1x1MDYyN1x1MDY0Mlx1MDYyN1x1MDYyQSBcdTA2MkNcdTA2MkZcdTA2NEFcdTA2MkZcdTA2MjlcIixcbiAgICBUT1RBTF9DQVJEUzogXCJcdTA2MjVcdTA2MkNcdTA2NDVcdTA2MjdcdTA2NDRcdTA2NEEgXHUwNjI3XHUwNjQ0XHUwNjI4XHUwNjM3XHUwNjI3XHUwNjQyXHUwNjI3XHUwNjJBXCIsXG4gICAgQkFDSzogXCJcdTA2MzFcdTA2MkNcdTA2NDhcdTA2MzlcIixcbiAgICBTS0lQOiBcIlNraXBcIixcbiAgICBFRElUX0NBUkQ6IFwiXHUwNjJBXHUwNjM5XHUwNjJGXHUwNjRBXHUwNjQ0IFx1MDYyN1x1MDY0NFx1MDYyOFx1MDYzN1x1MDYyN1x1MDY0Mlx1MDYyOVwiLFxuICAgIFJFU0VUX0NBUkRfUFJPR1JFU1M6IFwiXHUwNjI1XHUwNjM5XHUwNjI3XHUwNjJGXHUwNjI5IFx1MDYyQVx1MDYzOVx1MDY0QVx1MDY0QVx1MDY0NiBcdTA2MkFcdTA2NDJcdTA2MkZcdTA2NTFcdTA2NEZcdTA2NDVcdTA2NTIgXHUwNjI3XHUwNjQ0XHUwNjI4XHUwNjM3XHUwNjI3XHUwNjQyXHUwNjI5XCIsXG4gICAgSEFSRDogXCJcdTA2MzVcdTA2MzlcdTA2MjhcIixcbiAgICBHT09EOiBcIlx1MDYyQ1x1MDY0QVx1MDYyRlwiLFxuICAgIEVBU1k6IFwiXHUwNjMzXHUwNjQ3XHUwNjQ0XCIsXG4gICAgU0hPV19BTlNXRVI6IFwiXHUwNjIzXHUwNjM4XHUwNjQ3XHUwNjUwXHUwNjMxIFx1MDYyN1x1MDY0NFx1MDYyNVx1MDYyQ1x1MDYyN1x1MDYyOFx1MDYyOVwiLFxuICAgIENBUkRfUFJPR1JFU1NfUkVTRVQ6IFwiLlx1MDYyQVx1MDY0NVx1MDY1MVx1MDY0RVx1MDYyQSBcdTA2MjVcdTA2MzlcdTA2MjdcdTA2MkZcdTA2MjkgXHUwNjJBXHUwNjM5XHUwNjRBXHUwNjRBXHUwNjQ2IFx1MDYyQVx1MDY0Mlx1MDYyRlx1MDY1MVx1MDY0Rlx1MDY0NSBcdTA2MjdcdTA2NDRcdTA2MjhcdTA2MzdcdTA2MjdcdTA2NDJcdTA2MjlcIixcbiAgICBTQVZFOiBcIlx1MDYyRFx1MDY0MVx1MDYzOFwiLFxuICAgIENBTkNFTDogXCJcdTA2MjVcdTA2NDRcdTA2M0FcdTA2MjdcdTA2MjFcIixcbiAgICBOT19JTlBVVDogXCIuXHUwNjQ0XHUwNjQ1IFx1MDY0QVx1MDYyQVx1MDY1MFx1MDY0NSBcdTA2MkFcdTA2NDJcdTA2MkZcdTA2NEFcdTA2NDUgXHUwNjIzXHUwNjRBIFx1MDY0NVx1MDY0Rlx1MDYyRlx1MDYyRVx1MDY0NFx1MDYyN1x1MDYyQVwiLFxuICAgIENVUlJFTlRfRUFTRV9IRUxQX1RFWFQ6IFwiOlx1MDYyN1x1MDY0NFx1MDYzM1x1MDY0N1x1MDY0OFx1MDY0NFx1MDYyOSBcdTA2MjdcdTA2NDRcdTA2MkRcdTA2MjdcdTA2NDRcdTA2NEFcdTA2MjlcIixcbiAgICBDVVJSRU5UX0lOVEVSVkFMX0hFTFBfVEVYVDogXCI6XHUwNjI3XHUwNjQ0XHUwNjQxXHUwNjI3XHUwNjM1XHUwNjQ0IFx1MDYyN1x1MDY0NFx1MDYzMlx1MDY0NVx1MDY0Nlx1MDY0QSBcdTA2MjdcdTA2NDRcdTA2MkRcdTA2MjdcdTA2NDRcdTA2NEFcIixcbiAgICBDQVJEX0dFTkVSQVRFRF9GUk9NOiBcIiR7bm90ZVBhdGh9IDpcdTA2MkFcdTA2NDUgXHUwNjI1XHUwNjQ2XHUwNjM0XHUwNjI3XHUwNjI0XHUwNjQ3XHUwNjI3IFx1MDY0NVx1MDY0NlwiLFxuXG4gICAgLy8gbWFpbi50c1xuICAgIE9QRU5fTk9URV9GT1JfUkVWSUVXOiBcIlx1MDYyN1x1MDY0MVx1MDYyQVx1MDYyRCBcdTA2MjdcdTA2NDRcdTA2NDVcdTA2NDRcdTA2MjdcdTA2MkRcdTA2MzhcdTA2MjkgXHUwNjQ0XHUwNjQ0XHUwNjQ1XHUwNjMxXHUwNjI3XHUwNjJDXHUwNjM5XHUwNjI5XCIsXG4gICAgUkVWSUVXX0NBUkRTOiBcIlx1MDY0NVx1MDYzMVx1MDYyN1x1MDYyQ1x1MDYzOVx1MDYyOSBcdTA2MjdcdTA2NDRcdTA2MjhcdTA2MzdcdTA2MjdcdTA2NDJcdTA2MjdcdTA2MkFcIixcbiAgICBSRVZJRVdfRUFTWV9GSUxFX01FTlU6IFwiXHUwNjQ1XHUwNjMxXHUwNjI3XHUwNjJDXHUwNjM5XHUwNjI5OiBcdTA2MzNcdTA2NDdcdTA2NDRcIixcbiAgICBSRVZJRVdfR09PRF9GSUxFX01FTlU6IFwiXHUwNjQ1XHUwNjMxXHUwNjI3XHUwNjJDXHUwNjM5XHUwNjI5OiBcdTA2MkNcdTA2NEFcdTA2MkZcIixcbiAgICBSRVZJRVdfSEFSRF9GSUxFX01FTlU6IFwiXHUwNjQ1XHUwNjMxXHUwNjI3XHUwNjJDXHUwNjM5XHUwNjI5OiBcdTA2MzVcdTA2MzlcdTA2MjhcIixcbiAgICBSRVZJRVdfTk9URV9FQVNZX0NNRDogXCJcdTA2NDVcdTA2MzFcdTA2MjdcdTA2MkNcdTA2MzlcdTA2MjkgXHUwNjI3XHUwNjQ0XHUwNjQ1XHUwNjQ0XHUwNjI3XHUwNjJEXHUwNjM4XHUwNjI5IFx1MDY0M1x1MDY0MCBcdTA2MzNcdTA2NDdcdTA2NDRcdTA2MjlcIixcbiAgICBSRVZJRVdfTk9URV9HT09EX0NNRDogXCJcdTA2NDVcdTA2MzFcdTA2MjdcdTA2MkNcdTA2MzlcdTA2MjkgXHUwNjI3XHUwNjQ0XHUwNjQ1XHUwNjQ0XHUwNjI3XHUwNjJEXHUwNjM4XHUwNjI5IFx1MDY0M1x1MDY0MCBcdTA2MkNcdTA2NEFcdTA2MkZcdTA2MjlcIixcbiAgICBSRVZJRVdfTk9URV9IQVJEX0NNRDogXCJcdTA2NDVcdTA2MzFcdTA2MjdcdTA2MkNcdTA2MzlcdTA2MjkgXHUwNjI3XHUwNjQ0XHUwNjQ1XHUwNjQ0XHUwNjI3XHUwNjJEXHUwNjM4XHUwNjI5IFx1MDY0M1x1MDY0MCBcdTA2MzVcdTA2MzlcdTA2MjhcdTA2MjlcIixcbiAgICBDUkFNX0FMTF9DQVJEUzogXCJcdTA2MkRcdTA2MkZcdTA2MkYgXHUwNjMxXHUwNjRGXHUwNjMyXHUwNjQ1XHUwNjRFXHUwNjI5IFx1MDY0NFx1MDY0NFx1MDYyRFx1MDYzNFx1MDYzMVwiLFxuICAgIFJFVklFV19BTExfQ0FSRFM6IFwiXHUwNjQ1XHUwNjMxXHUwNjI3XHUwNjJDXHUwNjM5XHUwNjI5IFx1MDYyN1x1MDY0NFx1MDYyOFx1MDYzN1x1MDYyN1x1MDY0Mlx1MDYyN1x1MDYyQSBcdTA2NDVcdTA2NDYgXHUwNjJDXHUwNjQ1XHUwNjRBXHUwNjM5IFx1MDYyN1x1MDY0NFx1MDY0NVx1MDY0NFx1MDYyN1x1MDYyRFx1MDYzOFx1MDYyN1x1MDYyQVwiLFxuICAgIFJFVklFV19DQVJEU19JTl9OT1RFOiBcIlx1MDY0NVx1MDYzMVx1MDYyN1x1MDYyQ1x1MDYzOVx1MDYyOSBcdTA2MjdcdTA2NDRcdTA2MjhcdTA2MzdcdTA2MjdcdTA2NDJcdTA2MjdcdTA2MkEgIFx1MDY0NVx1MDY0NiBcdTA2NDdcdTA2MzBcdTA2NDcgXHUwNjI3XHUwNjQ0XHUwNjQ1XHUwNjQ0XHUwNjI3XHUwNjJEXHUwNjM4XHUwNjI5XCIsXG4gICAgQ1JBTV9DQVJEU19JTl9OT1RFOiBcIlx1MDYyM1x1MDYyRFx1MDYzNFx1MDYzMSBcdTA2MkNcdTA2NDVcdTA2NEFcdTA2MzkgXHUwNjI4XHUwNjM3XHUwNjI3XHUwNjQyXHUwNjI3XHUwNjJBIFx1MDY0N1x1MDYzMFx1MDY0NyBcdTA2MjdcdTA2NDRcdTA2NDVcdTA2NDRcdTA2MjdcdTA2MkRcdTA2MzhcdTA2MjlcIixcbiAgICBWSUVXX1NUQVRTOiBcIlx1MDYzOVx1MDYzMVx1MDYzNiBcdTA2MjdcdTA2NDRcdTA2MjVcdTA2MkRcdTA2MzVcdTA2MjdcdTA2MjZcdTA2NEFcdTA2MjdcdTA2MkFcIixcbiAgICBTVEFUVVNfQkFSOiBcIlx1MDYyN1x1MDY0NFx1MDYyOFx1MDYzN1x1MDYyN1x1MDY0Mlx1MDYyN1x1MDYyQSBcdTA2MjdcdTA2NDRcdTA2NDVcdTA2MzNcdTA2MkFcdTA2MkRcdTA2NDJcdTA2MjkgJHtkdWVGbGFzaGNhcmRzQ291bnR9LFx1MDY0NVx1MDY0NFx1MDYyN1x1MDYyRFx1MDYzOFx1MDYyN1x1MDYyQSAke2R1ZU5vdGVzQ291bnR9Olx1MDY0NVx1MDYzMVx1MDYyN1x1MDYyQ1x1MDYzOVx1MDYyOVwiLFxuICAgIFNZTkNfVElNRV9UQUtFTjogXCIke3R9bXMgXHUwNjI3XHUwNjMzXHUwNjJBXHUwNjNBXHUwNjMxXHUwNjI3XHUwNjQyIFx1MDYyN1x1MDY0NFx1MDY0NVx1MDYzMlx1MDYyN1x1MDY0NVx1MDY0Nlx1MDYyOVwiLFxuICAgIE5PVEVfSU5fSUdOT1JFRF9GT0xERVI6IFwiLlx1MDYyN1x1MDY0NFx1MDY0NVx1MDY0NFx1MDYyN1x1MDYyRFx1MDYzOFx1MDYyOSBcdTA2NEFcdTA2MkFcdTA2NDUgXHUwNjJEXHUwNjQxXHUwNjM4XHUwNjQ3XHUwNjI3IFx1MDYzNlx1MDY0NVx1MDY0NiBcdTA2MjdcdTA2NDRcdTA2NDVcdTA2MkNcdTA2NDRcdTA2MkYgXHUwNjI3XHUwNjQ0XHUwNjMwXHUwNjRBIFx1MDYyQVx1MDY0NSBcdTA2MkFcdTA2MkNcdTA2MjdcdTA2NDdcdTA2NDRcdTA2NDcgKFx1MDYyQVx1MDYyRFx1MDY0Mlx1MDY0MiBcdTA2NDVcdTA2NDYgXHUwNjI3XHUwNjQ0XHUwNjI1XHUwNjM5XHUwNjJGXHUwNjI3XHUwNjJGXHUwNjI3XHUwNjJBKVwiLFxuICAgIFBMRUFTRV9UQUdfTk9URTogXCIuXHUwNjRBXHUwNjMxXHUwNjJDXHUwNjQ5IFx1MDY0OFx1MDYzNlx1MDYzOSBcdTA2NDhcdTA2MzNcdTA2NDUgXHUwNjM5XHUwNjQ0XHUwNjQ5IFx1MDYyN1x1MDY0NFx1MDY0NVx1MDY0NFx1MDYyN1x1MDYyRFx1MDYzOFx1MDYyOSBcdTA2MjhcdTA2MzRcdTA2NDNcdTA2NDQgXHUwNjQ1XHUwNjQ2XHUwNjI3XHUwNjMzXHUwNjI4IFx1MDY0NFx1MDY0NFx1MDY0NVx1MDYzMVx1MDYyN1x1MDYyQ1x1MDYzOVx1MDYyOSAoXHUwNjQxXHUwNjRBIFx1MDYyN1x1MDY0NFx1MDYyNVx1MDYzOVx1MDYyRlx1MDYyN1x1MDYyRlx1MDYyN1x1MDYyQSlcIixcbiAgICBSRVNQT05TRV9SRUNFSVZFRDogXCIuXHUwNjI3XHUwNjMzXHUwNjJBXHUwNjRGXHUwNjQ0XHUwNjQ1XHUwNjJBIFx1MDYyN1x1MDY0NFx1MDYyN1x1MDYzM1x1MDYyQVx1MDYyQ1x1MDYyN1x1MDYyOFx1MDYyOVwiLFxuICAgIE5PX0RFQ0tfRVhJU1RTOiBcIiR7ZGVja05hbWV9IFx1MDY0NFx1MDYyNyBcdTA2NEFcdTA2NDhcdTA2MkNcdTA2MkYgXHUwNjMxXHUwNjRGXHUwNjMyXHUwNjQ1XHUwNjRFXHUwNjI5XCIsXG4gICAgQUxMX0NBVUdIVF9VUDogXCJcdUQ4M0RcdURFMDYgXHUwNjQ0XHUwNjQyXHUwNjJGIFx1MDYyQVx1MDY0NSBcdTA2MjdcdTA2NDRcdTA2NDJcdTA2MjhcdTA2MzYgXHUwNjM5XHUwNjQ0XHUwNjRBXHUwNjQzXHUwNjQ1IFx1MDYyQ1x1MDY0NVx1MDY0QVx1MDYzOVx1MDYyNyBcdTA2MjdcdTA2NDRcdTA2MjJcdTA2NDZcIixcblxuICAgIC8vIHNjaGVkdWxpbmcudHNcbiAgICBEQVlTX1NUUl9JVkw6IFwiXHUwNjRBXHUwNjQ4XHUwNjQ1L1x1MDYyM1x1MDY0QVx1MDYyN1x1MDY0NSAke2ludGVydmFsfVwiLFxuICAgIE1PTlRIU19TVFJfSVZMOiBcIlx1MDYzNFx1MDY0N1x1MDYzMS9cdTA2MjNcdTA2MzRcdTA2NDdcdTA2MzEgJHtpbnRlcnZhbH1cIixcbiAgICBZRUFSU19TVFJfSVZMOiBcIlx1MDYzM1x1MDY0Nlx1MDYyOS9cdTA2MzNcdTA2NDZcdTA2NDhcdTA2MjdcdTA2MkEgJHtpbnRlcnZhbH1cIixcbiAgICBEQVlTX1NUUl9JVkxfTU9CSUxFOiBcIlx1MDY0QSR7aW50ZXJ2YWx9XCIsXG4gICAgTU9OVEhTX1NUUl9JVkxfTU9CSUxFOiBcIlx1MDYzNCR7aW50ZXJ2YWx9XCIsXG4gICAgWUVBUlNfU1RSX0lWTF9NT0JJTEU6IFwiXHUwNjMzJHtpbnRlcnZhbH1cIixcblxuICAgIC8vIHNldHRpbmdzLnRzXG4gICAgU0VUVElOR1NfSEVBREVSOiBcIlNwYWNlZCBSZXBldGl0aW9uIFBsdWdpbiAtIFNldHRpbmdzXCIsXG4gICAgQ0hFQ0tfV0lLSTogJy48YSBocmVmPVwiJHt3aWtpX3VybH1cIj53aWtpPC9hPiBcdTA2NDRcdTA2NDVcdTA2MzJcdTA2NEFcdTA2MkYgXHUwNjQ1XHUwNjQ2IFx1MDYyN1x1MDY0NFx1MDY0NVx1MDYzOVx1MDY0NFx1MDY0OFx1MDY0NVx1MDYyN1x1MDYyQSBcdTA2MEMgXHUwNjJBXHUwNjJEXHUwNjQyXHUwNjQyIFx1MDY0NVx1MDY0NicsXG4gICAgRk9MREVSU19UT19JR05PUkU6IFwiXHUwNjQ1XHUwNjJDXHUwNjQ0XHUwNjJGXHUwNjI3XHUwNjJBIFx1MDY0NFx1MDYyQVx1MDYyQ1x1MDYyN1x1MDY0N1x1MDY0NFx1MDY0N1x1MDYyN1wiLFxuICAgIEZPTERFUlNfVE9fSUdOT1JFX0RFU0M6XG4gICAgICAgIFwiVGVtcGxhdGVzIE1ldGEvU2NyaXB0cyA6IFx1MDYyM1x1MDYyRlx1MDYyRVx1MDY0NCBcdTA2NDVcdTA2MzNcdTA2MjdcdTA2MzFcdTA2MjdcdTA2MkEgXHUwNjI3XHUwNjQ0XHUwNjQ1XHUwNjJDXHUwNjQ0XHUwNjJGIFx1MDY0NVx1MDY0MVx1MDYzNVx1MDY0OFx1MDY0NFx1MDYyOSBcdTA2MjhcdTA2NDhcdTA2MjdcdTA2MzNcdTA2MzdcdTA2MjkgXHUwNjMzXHUwNjM3XHUwNjQ4XHUwNjMxIFx1MDYyQ1x1MDYyRlx1MDY0QVx1MDYyRlx1MDYyOSxcdTA2NDVcdTA2MkJcdTA2MjdcdTA2NDRcIixcbiAgICBGTEFTSENBUkRTOiBcIlx1MDYyN1x1MDY0NFx1MDYyOFx1MDYzN1x1MDYyN1x1MDY0Mlx1MDYyN1x1MDYyQVwiLFxuICAgIEZMQVNIQ0FSRF9FQVNZX0xBQkVMOiBcIlx1MDY0Nlx1MDYzNSBcdTA2MjdcdTA2NDRcdTA2MzJcdTA2MzEgXHUwNjMzXHUwNjQ3XHUwNjQ0XCIsXG4gICAgRkxBU0hDQVJEX0dPT0RfTEFCRUw6IFwiXHUwNjQ2XHUwNjM1IFx1MDYyN1x1MDY0NFx1MDYzMlx1MDYzMSBcdTA2MkNcdTA2NEFcdTA2MkZcIixcbiAgICBGTEFTSENBUkRfSEFSRF9MQUJFTDogXCJcdTA2NDZcdTA2MzUgXHUwNjI3XHUwNjQ0XHUwNjMyXHUwNjMxIFx1MDYzNVx1MDYzOVx1MDYyOFwiLFxuICAgIEZMQVNIQ0FSRF9FQVNZX0RFU0M6ICdcIlx1MDYyQVx1MDYyRVx1MDYzNVx1MDY0QVx1MDYzNSBcdTA2MjdcdTA2NDRcdTA2MkFcdTA2MzNcdTA2NDVcdTA2NEFcdTA2MjkgXHUwNjQ0XHUwNjQ0XHUwNjMyXHUwNjMxIFwiXHUwNjMzXHUwNjQ3XHUwNjQ0JyxcbiAgICBGTEFTSENBUkRfR09PRF9ERVNDOiAnXCJcdTA2MkFcdTA2MkVcdTA2MzVcdTA2NEFcdTA2MzUgXHUwNjI3XHUwNjQ0XHUwNjJBXHUwNjMzXHUwNjQ1XHUwNjRBXHUwNjI5IFx1MDY0NFx1MDY0NFx1MDYzMlx1MDYzMSBcIlx1MDYyQ1x1MDY0QVx1MDYyRicsXG4gICAgRkxBU0hDQVJEX0hBUkRfREVTQzogJ1wiXHUwNjJBXHUwNjJFXHUwNjM1XHUwNjRBXHUwNjM1IFx1MDYyN1x1MDY0NFx1MDYyQVx1MDYzM1x1MDY0NVx1MDY0QVx1MDYyOSBcdTA2NDRcdTA2NDRcdTA2MzJcdTA2MzEgXCJcdTA2MzVcdTA2MzlcdTA2MjgnLFxuICAgIEZMQVNIQ0FSRF9UQUdTOiBcIlx1MDY0OFx1MDY0Rlx1MDYzM1x1MDY0OFx1MDY0NSBcdTA2MjdcdTA2NDRcdTA2MjhcdTA2MzdcdTA2MjdcdTA2NDJcdTA2MjdcdTA2MkFcIixcbiAgICBGTEFTSENBUkRfVEFHU19ERVNDOiBcIiMyXHUwNjIzXHUwNjJGXHUwNjJFXHUwNjQ0IFx1MDYyN1x1MDY0NFx1MDY0OFx1MDY0Rlx1MDYzM1x1MDY0OFx1MDY0NSBcdTA2NDVcdTA2NDFcdTA2MzVcdTA2NDhcdTA2NDRcdTA2MjkgXHUwNjI4XHUwNjQ1XHUwNjMzXHUwNjI3XHUwNjQxXHUwNjI3XHUwNjJBIFx1MDYyM1x1MDY0OCBcdTA2MjNcdTA2MzNcdTA2MzdcdTA2MzEgXHUwNjJDXHUwNjJGXHUwNjRBXHUwNjJGXHUwNjI5IFx1MDYwQyBcdTA2MjNcdTA2NEEgXHUwNjI4XHUwNjM3XHUwNjI3XHUwNjQyXHUwNjI3XHUwNjJBIyBcdTA2MzFcdTA2MzJcdTA2NDVcdTA2MjkzIyBcdTA2MzFcdTA2MzJcdTA2NDVcdTA2MjlcIixcbiAgICBDT05WRVJUX0ZPTERFUlNfVE9fREVDS1M6IFwiXHUwNjJBXHUwNjJEXHUwNjQ4XHUwNjRBXHUwNjQ0IFx1MDYyN1x1MDY0NFx1MDY0NVx1MDYyQ1x1MDY0NFx1MDYyRlx1MDYyN1x1MDYyQSBcdTA2MjVcdTA2NDRcdTA2NDkgXHUwNjQ1XHUwNjQ0XHUwNjQxXHUwNjI3XHUwNjJBIFx1MDYyM1x1MDYzNVx1MDY0NFx1MDY0QVx1MDYyOSBcdTA2NDggXHUwNjQ1XHUwNjQ0XHUwNjQxXHUwNjI3XHUwNjJBIFx1MDYyN1x1MDY0NFx1MDY0MVx1MDYzMVx1MDYzOVx1MDY0QVx1MDYyOVx1MDYxRlwiLFxuICAgIENPTlZFUlRfRk9MREVSU19UT19ERUNLU19ERVNDOiBcIi5cdTA2NDdcdTA2MzBcdTA2MjcgXHUwNjQ3XHUwNjQ4IFx1MDYyOFx1MDYyRlx1MDY0QVx1MDY0NCBcdTA2NDRcdTA2MkVcdTA2NEFcdTA2MjdcdTA2MzEgXHUwNjQ4XHUwNjMzXHUwNjQ4XHUwNjQ1IFx1MDYyN1x1MDY0NFx1MDYyOFx1MDYzN1x1MDYyN1x1MDY0Mlx1MDYyOSBcdTA2MjNcdTA2MzlcdTA2NDRcdTA2MjdcdTA2NDdcIixcbiAgICBJTkxJTkVfU0NIRURVTElOR19DT01NRU5UUzogXCJcdTA2MkRcdTA2NDFcdTA2MzggXHUwNjJBXHUwNjM5XHUwNjQ0XHUwNjRBXHUwNjQyIFx1MDYyN1x1MDY0NFx1MDYyQ1x1MDYyRlx1MDY0OFx1MDY0NFx1MDYyOSBcdTA2MzlcdTA2NDRcdTA2NDkgXHUwNjQ2XHUwNjQxXHUwNjMzIFx1MDYyN1x1MDY0NFx1MDYzM1x1MDYzN1x1MDYzMSBcdTA2NDVcdTA2MkJcdTA2NDQgXHUwNjI3XHUwNjQ0XHUwNjMzXHUwNjM3XHUwNjMxIFx1MDYyN1x1MDY0NFx1MDYyM1x1MDYyRVx1MDY0QVx1MDYzMSBcdTA2NDRcdTA2NDRcdTA2MjhcdTA2MzdcdTA2MjdcdTA2NDJcdTA2MjkgXHUwNjFGXCIsXG4gICAgSU5MSU5FX1NDSEVEVUxJTkdfQ09NTUVOVFNfREVTQzogXCJcdTA2NDRcdTA2MjcgXHUwNjJBXHUwNjQzXHUwNjMzXHUwNjMxIFx1MDYyQVx1MDY0Nlx1MDYzM1x1MDY0QVx1MDY0MiBcdTA2MjdcdTA2NDRcdTA2NDJcdTA2MjdcdTA2MjZcdTA2NDVcdTA2MjkgSFRNTCBcdTA2MzNcdTA2NEFcdTA2MjRcdTA2MkZcdTA2NEEgXHUwNjJBXHUwNjM0XHUwNjNBXHUwNjRBXHUwNjQ0IFx1MDY0N1x1MDYzMFx1MDYyNyBcdTA2MjVcdTA2NDRcdTA2NDkgXHUwNjJDXHUwNjM5XHUwNjQ0IFx1MDYyQVx1MDYzOVx1MDY0NFx1MDY0QVx1MDY0Mlx1MDYyN1x1MDYyQVwiLFxuICAgIEJVUllfU0lCTElOR1NfVElMTF9ORVhUX0RBWTogXCJcdTA2MjNcdTA2MkVcdTA2NDFcdTA2NEEgXHUwNjI3XHUwNjQ0XHUwNjI4XHUwNjM3XHUwNjI3XHUwNjQyXHUwNjI3XHUwNjJBIFx1MDYyN1x1MDY0NFx1MDYzNFx1MDY0Mlx1MDY0QVx1MDY0Mlx1MDYyOSBcdTA2MkRcdTA2MkFcdTA2NDkgXHUwNjI3XHUwNjQ0XHUwNjRBXHUwNjQ4XHUwNjQ1IFx1MDYyN1x1MDY0NFx1MDYyQVx1MDYyN1x1MDY0NFx1MDY0QVwiLFxuICAgIEJVUllfU0lCTElOR1NfVElMTF9ORVhUX0RBWV9ERVNDOlxuICAgICAgICBcImNsb3plIGRlbGV0aW9ucyA6IFx1MDYyN1x1MDY0NFx1MDYyOFx1MDYzN1x1MDYyN1x1MDY0Mlx1MDYyN1x1MDYyQSBcdTA2MjdcdTA2NDRcdTA2MzRcdTA2NDJcdTA2NEFcdTA2NDJcdTA2MjkgXHUwNjQ3XHUwNjRBIFx1MDYyOFx1MDYzN1x1MDYyN1x1MDY0Mlx1MDYyN1x1MDYyQSBcdTA2MkFcdTA2NDUgXHUwNjI1XHUwNjQ2XHUwNjM0XHUwNjI3XHUwNjI0XHUwNjQ3XHUwNjI3IFx1MDY0NVx1MDY0NiBcdTA2NDZcdTA2NDFcdTA2MzMgXHUwNjQ2XHUwNjM1IFx1MDYyN1x1MDY0NFx1MDYyOFx1MDYzN1x1MDYyN1x1MDY0Mlx1MDYyOSBcdTA2NDNcdTA2NDBcIixcbiAgICBTSE9XX0NBUkRfQ09OVEVYVDogXCJcdTA2MjVcdTA2MzhcdTA2NDdcdTA2MjdcdTA2MzEgXHUwNjI3XHUwNjQ0XHUwNjMzXHUwNjRBXHUwNjI3XHUwNjQyIFx1MDY0MVx1MDY0QSBcdTA2MjdcdTA2NDRcdTA2MjhcdTA2MzdcdTA2MjdcdTA2NDJcdTA2MjdcdTA2MkFcdTA2MUZcIixcbiAgICBTSE9XX0NBUkRfQ09OVEVYVF9ERVNDOiBcImkuZS4gVGl0bGUgPiBIZWFkaW5nIDEgPiBTdWJoZWFkaW5nID4gLi4uID4gU3ViaGVhZGluZ1wiLFxuICAgIENBUkRfTU9EQUxfSEVJR0hUX1BFUkNFTlQ6IFwiXHUwNjQ2XHUwNjMzXHUwNjI4XHUwNjI5IFx1MDYyN1x1MDYzMVx1MDYyQVx1MDY0MVx1MDYyN1x1MDYzOSBcdTA2MjdcdTA2NDRcdTA2MjhcdTA2MzdcdTA2MjdcdTA2NDJcdTA2MjlcIixcbiAgICBDQVJEX01PREFMX1NJWkVfUEVSQ0VOVF9ERVNDOlxuICAgICAgICBcIlx1MDY0QVx1MDYyQ1x1MDYyOCBcdTA2MzZcdTA2MjhcdTA2MzdcdTA2NDdcdTA2MjcgXHUwNjM5XHUwNjQ0XHUwNjQ5IDEwMCBcdTA2NkEgXHUwNjM5XHUwNjQ0XHUwNjQ5IFx1MDYyN1x1MDY0NFx1MDY0N1x1MDYyN1x1MDYyQVx1MDY0MSBcdTA2MjdcdTA2NDRcdTA2NDVcdTA2MkRcdTA2NDVcdTA2NDhcdTA2NDQgXHUwNjIzXHUwNjQ4IFx1MDYyNVx1MDYzMFx1MDYyNyBcdTA2NDNcdTA2MjdcdTA2NDYgXHUwNjQ0XHUwNjJGXHUwNjRBXHUwNjQzIFx1MDYzNVx1MDY0OFx1MDYzMSBcdTA2NDNcdTA2MjhcdTA2NEFcdTA2MzFcdTA2MjkgXHUwNjJDXHUwNjJGXHUwNjRCXHUwNjI3XCIsXG4gICAgUkVTRVRfREVGQVVMVDogXCJcdTA2MjVcdTA2MzlcdTA2MjdcdTA2MkZcdTA2MjkgXHUwNjJBXHUwNjM5XHUwNjRBXHUwNjRBXHUwNjQ2IFx1MDYyNVx1MDY0NFx1MDY0OSBcdTA2MjdcdTA2NDRcdTA2MjdcdTA2NDFcdTA2MkFcdTA2MzFcdTA2MjdcdTA2MzZcdTA2NEFcIixcbiAgICBDQVJEX01PREFMX1dJRFRIX1BFUkNFTlQ6IFwiXHUwNjQ2XHUwNjMzXHUwNjI4XHUwNjI5IFx1MDYzOVx1MDYzMVx1MDYzNiBcdTA2MjdcdTA2NDRcdTA2MjhcdTA2MzdcdTA2MjdcdTA2NDJcdTA2MjlcIixcbiAgICBSQU5ET01JWkVfQ0FSRF9PUkRFUjogXCJcdTA2MkFcdTA2MzFcdTA2MkFcdTA2NEFcdTA2MjggXHUwNjI4XHUwNjM3XHUwNjI3XHUwNjQyXHUwNjI5IFx1MDYzOVx1MDYzNFx1MDY0OFx1MDYyN1x1MDYyNlx1MDY0QSBcdTA2MjNcdTA2MkJcdTA2NDZcdTA2MjdcdTA2MjEgXHUwNjI3XHUwNjQ0XHUwNjQ1XHUwNjMxXHUwNjI3XHUwNjJDXHUwNjM5XHUwNjI5XHUwNjFGXCIsXG4gICAgRElTQUJMRV9DTE9aRV9DQVJEUzogXCJcdTA2MUZjbG96ZSBcdTA2MkFcdTA2MzlcdTA2MzdcdTA2NEFcdTA2NDQgXHUwNjI4XHUwNjM3XHUwNjI3XHUwNjQyXHUwNjI3XHUwNjJBXCIsXG4gICAgQ09OVkVSVF9ISUdITElHSFRTX1RPX0NMT1pFUzogXCJDb252ZXJ0ID09aGlnaHRsaWdodHM9PSB0byBjbG96ZXM/XCIsXG4gICAgQ09OVkVSVF9CT0xEX1RFWFRfVE9fQ0xPWkVTOiBcIkNvbnZlcnQgKipib2xkZWQgdGV4dCoqIHRvIGNsb3plcz9cIixcbiAgICBDT05WRVJUX0NVUkxZX0JSQUNLRVRTX1RPX0NMT1pFUzogXCJDb252ZXJ0IHt7Y3VybHkgYnJhY2tldHN9fSB0byBjbG96ZXM/XCIsXG4gICAgSU5MSU5FX0NBUkRTX1NFUEFSQVRPUjogXCJcdTA2NDFcdTA2MjdcdTA2MzVcdTA2NDQgXHUwNjQ1XHUwNjQ2IFx1MDYyM1x1MDYyQ1x1MDY0NCBcdTA2MjdcdTA2NDRcdTA2MjhcdTA2MzdcdTA2MjdcdTA2NDJcdTA2MjdcdTA2MkEgXHUwNjI3XHUwNjQ0XHUwNjQ1XHUwNjM2XHUwNjQ1XHUwNjQ2XHUwNjI5XCIsXG4gICAgRklYX1NFUEFSQVRPUlNfTUFOVUFMTFlfV0FSTklORzpcbiAgICAgICAgXCJcdTA2MzZcdTA2MzkgXHUwNjQxXHUwNjRBIFx1MDYyRFx1MDYzM1x1MDYyN1x1MDYyOFx1MDY0MyBcdTA2MjNcdTA2NDZcdTA2NDcgXHUwNjI4XHUwNjM5XHUwNjJGIFx1MDYyQVx1MDYzQVx1MDY0QVx1MDY0QVx1MDYzMSBcdTA2NDdcdTA2MzBcdTA2MjcgXHUwNjBDIFx1MDY0QVx1MDYyQ1x1MDYyOCBcdTA2MzlcdTA2NDRcdTA2NEFcdTA2NDMgXHUwNjJBXHUwNjM5XHUwNjJGXHUwNjRBXHUwNjQ0IFx1MDYyM1x1MDY0QSBcdTA2MjhcdTA2MzdcdTA2MjdcdTA2NDJcdTA2MjdcdTA2MkEgXHUwNjQ0XHUwNjJGXHUwNjRBXHUwNjQzIFx1MDYyOFx1MDYyN1x1MDY0NFx1MDY0MVx1MDYzOVx1MDY0NCBcdTA2NEFcdTA2MkZcdTA2NDhcdTA2NEFcdTA2NEJcdTA2MjdcIixcbiAgICBJTkxJTkVfUkVWRVJTRURfQ0FSRFNfU0VQQVJBVE9SOiBcIlx1MDY0MVx1MDYyN1x1MDYzNVx1MDY0NCBcdTA2NDVcdTA2NDYgXHUwNjIzXHUwNjJDXHUwNjQ0IFx1MDYyN1x1MDY0NFx1MDYyOFx1MDYzN1x1MDYyN1x1MDY0Mlx1MDYyN1x1MDYyQSBcdTA2MjdcdTA2NDRcdTA2MzlcdTA2NDNcdTA2MzNcdTA2NEFcdTA2MjkgXHUwNjI3XHUwNjQ0XHUwNjQ1XHUwNjM2XHUwNjQ1XHUwNjQ2XHUwNjI5XCIsXG4gICAgTVVMVElMSU5FX0NBUkRTX1NFUEFSQVRPUjogXCJcdTA2NDFcdTA2MjdcdTA2MzVcdTA2NDQgXHUwNjQ1XHUwNjQ2IFx1MDYyM1x1MDYyQ1x1MDY0NCBcdTA2MjdcdTA2NDRcdTA2MjhcdTA2MzdcdTA2MjdcdTA2NDJcdTA2MjdcdTA2MkEgXHUwNjI3XHUwNjQ0XHUwNjQ1XHUwNjJBXHUwNjM5XHUwNjJGXHUwNjJGXHUwNjI5XCIsXG4gICAgTVVMVElMSU5FX1JFVkVSU0VEX0NBUkRTX1NFUEFSQVRPUjogXCJcdTA2NDFcdTA2MjdcdTA2MzVcdTA2NDQgXHUwNjQ1XHUwNjQ2IFx1MDYyM1x1MDYyQ1x1MDY0NCBcdTA2MjdcdTA2NDRcdTA2MjhcdTA2MzdcdTA2MjdcdTA2NDJcdTA2MjdcdTA2MkEgXHUwNjI3XHUwNjQ0XHUwNjM5XHUwNjQzXHUwNjMzXHUwNjRBXHUwNjI5IFx1MDYyN1x1MDY0NFx1MDY0NVx1MDYyQVx1MDYzOVx1MDYyRlx1MDYyRlx1MDYyOVwiLFxuICAgIE5PVEVTOiBcIlx1MDY0NVx1MDY0NFx1MDYyN1x1MDYyRFx1MDYzOFx1MDYyN1x1MDYyQVwiLFxuICAgIFJFVklFV19QQU5FX09OX1NUQVJUVVA6IFwiXHUwNjJBXHUwNjQ1XHUwNjQzXHUwNjRBXHUwNjQ2IFx1MDYyQ1x1MDYzMlx1MDYyMSBcdTA2NDVcdTA2MzFcdTA2MjdcdTA2MkNcdTA2MzlcdTA2MjkgXHUwNjI3XHUwNjQ0XHUwNjQ1XHUwNjQ0XHUwNjI3XHUwNjJEXHUwNjM4XHUwNjI3XHUwNjJBIFx1MDYzOVx1MDY0Nlx1MDYyRiBcdTA2MjhcdTA2MkZcdTA2MjEgXHUwNjI3XHUwNjQ0XHUwNjJBXHUwNjM0XHUwNjNBXHUwNjRBXHUwNjQ0XCIsXG4gICAgVEFHU19UT19SRVZJRVc6IFwiXHUwNjQ4XHUwNjMzXHUwNjQ4XHUwNjQ1IFx1MDY0NFx1MDY0NFx1MDY0NVx1MDYzMVx1MDYyN1x1MDYyQ1x1MDYzOVx1MDYyOVwiLFxuICAgIFRBR1NfVE9fUkVWSUVXX0RFU0M6IFwiI1x1MDYyM1x1MDYyRlx1MDYyRVx1MDY0NCBcdTA2MjdcdTA2NDRcdTA2NDhcdTA2MzNcdTA2NDhcdTA2NDUgXHUwNjQ1XHUwNjQxXHUwNjM1XHUwNjQ4XHUwNjQ0XHUwNjI5IFx1MDYyOFx1MDY0NVx1MDYzM1x1MDYyN1x1MDY0MVx1MDYyN1x1MDYyQSBcdTA2MjNcdTA2NDggXHUwNjJFXHUwNjM3XHUwNjQ4XHUwNjM3IFx1MDYyQ1x1MDYyRlx1MDY0QVx1MDYyRlx1MDYyOSBcdTA2MEMgXHUwNjIzXHUwNjRBIDogXHUwNjQ1XHUwNjMxXHUwNjI3XHUwNjJDXHUwNjM5XHUwNjI5IyBcdTA2NDhcdTA2MzNcdTA2NDUyIyBcdTA2NDhcdTA2MzNcdTA2NDUzXCIsXG4gICAgT1BFTl9SQU5ET01fTk9URTogXCJcdTA2MjdcdTA2NDFcdTA2MkFcdTA2MkQgXHUwNjQ1XHUwNjQ0XHUwNjI3XHUwNjJEXHUwNjM4XHUwNjI5IFx1MDYzOVx1MDYzNFx1MDY0OFx1MDYyN1x1MDYyNlx1MDY0QVx1MDYyOSBcdTA2NDRcdTA2NDRcdTA2NDVcdTA2MzFcdTA2MjdcdTA2MkNcdTA2MzlcdTA2MjlcIixcbiAgICBPUEVOX1JBTkRPTV9OT1RFX0RFU0M6IFwiKFBhZ2VyYW5rKSBcdTA2MzlcdTA2NDZcdTA2MkYgXHUwNjJBXHUwNjM5XHUwNjM3XHUwNjRBXHUwNjQ0IFx1MDY0N1x1MDYzMFx1MDYyNyBcdTA2MjdcdTA2NDRcdTA2MkVcdTA2NEFcdTA2MjdcdTA2MzEgXHUwNjBDXHUwNjI3XHUwNjQ0XHUwNjQ1XHUwNjQ0XHUwNjI3XHUwNjJEXHUwNjM4XHUwNjI3XHUwNjJBIFx1MDYzM1x1MDY0QVx1MDYyQVx1MDY0NSBcdTA2MkFcdTA2MzFcdTA2MkFcdTA2NEFcdTA2MjhcdTA2NEZcdTA2NDdcdTA2MjcgXHUwNjJEXHUwNjMzXHUwNjI4IFx1MDYyN1x1MDY0NFx1MDYyM1x1MDY0N1x1MDY0NVx1MDY0QVx1MDYyOVwiLFxuICAgIEFVVE9fTkVYVF9OT1RFOiBcIlx1MDYyN1x1MDY0MVx1MDYyQVx1MDYyRCBcdTA2MjdcdTA2NDRcdTA2NDVcdTA2NDRcdTA2MjdcdTA2MkRcdTA2MzhcdTA2MjkgXHUwNjI3XHUwNjQ0XHUwNjJBXHUwNjI3XHUwNjQ0XHUwNjRBXHUwNjI5IFx1MDYyQVx1MDY0NFx1MDY0Mlx1MDYyN1x1MDYyNlx1MDY0QVx1MDY0Qlx1MDYyNyBcdTA2MjhcdTA2MzlcdTA2MkYgXHUwNjI3XHUwNjQ0XHUwNjQ1XHUwNjMxXHUwNjI3XHUwNjJDXHUwNjM5XHUwNjI5XCIsXG4gICAgRElTQUJMRV9GSUxFX01FTlVfUkVWSUVXX09QVElPTlM6XG4gICAgICAgIFwiXHUwNjJBXHUwNjM5XHUwNjM3XHUwNjRBXHUwNjQ0IFx1MDYyRVx1MDY0QVx1MDYyN1x1MDYzMVx1MDYyN1x1MDYyQSBcdTA2MjdcdTA2NDRcdTA2NDVcdTA2MzFcdTA2MjdcdTA2MkNcdTA2MzlcdTA2MjkgXHUwNjQxXHUwNjRBIFx1MDY0Mlx1MDYyN1x1MDYyNlx1MDY0NVx1MDYyOSBcdTA2MjdcdTA2NDRcdTA2NDVcdTA2NDRcdTA2NDFcdTA2MjdcdTA2MkEgXHUwNjBDIFx1MDYyM1x1MDY0QSBcdTA2MjdcdTA2NDRcdTA2NDVcdTA2MzFcdTA2MjdcdTA2MkNcdTA2MzlcdTA2Mjk6XHUwNjI3XHUwNjQ0XHUwNjMzXHUwNjQ3XHUwNjQ0IFx1MDYyN1x1MDY0NFx1MDYzNVx1MDYzOVx1MDYyOCBcdTA2MjdcdTA2NDRcdTA2MkNcdTA2NEFcdTA2MkZcIixcbiAgICBESVNBQkxFX0ZJTEVfTUVOVV9SRVZJRVdfT1BUSU9OU19ERVNDOlxuICAgICAgICBcIlx1MDYzOVx1MDY0Nlx1MDYyRiBcdTA2MkFcdTA2M0FcdTA2NEFcdTA2NEFcdTA2MzEgXHUwNjQ3XHUwNjMwXHUwNjI3IFx1MDYyN1x1MDY0NFx1MDYyRVx1MDY0QVx1MDYyN1x1MDYzMSBPYnNpZGlhbiBcdTA2MjNcdTA2MzlcdTA2MkYgXHUwNjJBXHUwNjM0XHUwNjNBXHUwNjRBXHUwNjQ0ICwgY29tbWFuZCBob3RrZXlzLiBcdTA2MjhcdTA2MzlcdTA2MkYgXHUwNjI3XHUwNjQ0XHUwNjJBXHUwNjM5XHUwNjM3XHUwNjRBXHUwNjQ0IFx1MDYwQyBcdTA2NEFcdTA2NDVcdTA2NDNcdTA2NDZcdTA2NDMgXHUwNjI3XHUwNjQ0XHUwNjQ1XHUwNjMxXHUwNjI3XHUwNjJDXHUwNjM5XHUwNjI5IFx1MDYyOFx1MDYyN1x1MDYzM1x1MDYyQVx1MDYyRVx1MDYyRlx1MDYyN1x1MDY0NVwiLFxuICAgIE1BWF9OX0RBWVNfUkVWSUVXX1FVRVVFOiBcIlx1MDYyN1x1MDY0NFx1MDYyRFx1MDYyRiBcdTA2MjdcdTA2NDRcdTA2MjNcdTA2NDJcdTA2MzVcdTA2NDkgXHUwNjQ0XHUwNjM5XHUwNjJGXHUwNjJGIFx1MDYyN1x1MDY0NFx1MDYyM1x1MDY0QVx1MDYyN1x1MDY0NSBcdTA2MjdcdTA2NDRcdTA2MkFcdTA2NEEgXHUwNjRBXHUwNjJDXHUwNjI4IFx1MDYzOVx1MDYzMVx1MDYzNlx1MDY0N1x1MDYyNyBcdTA2MzlcdTA2NDRcdTA2NDkgXHUwNjI3XHUwNjQ0XHUwNjQ0XHUwNjQ4XHUwNjJEXHUwNjI5IFx1MDYyN1x1MDY0NFx1MDY0QVx1MDY0NVx1MDY0Nlx1MDY0OVwiLFxuICAgIE1JTl9PTkVfREFZOiBcIlx1MDY0QVx1MDYyQ1x1MDYyOCBcdTA2MjNcdTA2NDYgXHUwNjRBXHUwNjQzXHUwNjQ4XHUwNjQ2IFx1MDYzOVx1MDYyRlx1MDYyRiBcdTA2MjdcdTA2NDRcdTA2MjNcdTA2NEFcdTA2MjdcdTA2NDUgMSBcdTA2MzlcdTA2NDRcdTA2NDkgXHUwNjI3XHUwNjQ0XHUwNjIzXHUwNjQyXHUwNjQ0XCIsXG4gICAgVkFMSURfTlVNQkVSX1dBUk5JTkc6IFwiXHUwNjRBXHUwNjMxXHUwNjJDXHUwNjQ5IFx1MDYyQVx1MDY0Mlx1MDYyRlx1MDY0QVx1MDY0NSBcdTA2MzFcdTA2NDJcdTA2NDUgXHUwNjM1XHUwNjI3XHUwNjQ0XHUwNjJEXCIsXG4gICAgVUlfUFJFRkVSRU5DRVM6IFwiXHUwNjJBXHUwNjQxXHUwNjM2XHUwNjRBXHUwNjQ0XHUwNjI3XHUwNjJBIFx1MDY0OFx1MDYyN1x1MDYyQ1x1MDY0N1x1MDYyOSBcdTA2MjdcdTA2NDRcdTA2NDVcdTA2MzNcdTA2MkFcdTA2MkVcdTA2MkZcdTA2NDVcIixcbiAgICBJTklUSUFMTFlfRVhQQU5EX1NVQkRFQ0tTX0lOX1RSRUU6XG4gICAgICAgIFwiXHUwNjRBXHUwNjJDXHUwNjI4IFx1MDYyM1x1MDY0NiBcdTA2NEFcdTA2NDNcdTA2NDhcdTA2NDYgXHUwNjI3XHUwNjQ0XHUwNjM5XHUwNjMxXHUwNjM2IFx1MDYyN1x1MDY0NFx1MDYzNFx1MDYyQ1x1MDYzMVx1MDY0QSBcdTA2NDRcdTA2NDRcdTA2MzFcdTA2NEZcdTA2MzJcdTA2NDUgXHUwNjQ1XHUwNjQ4XHUwNjMzXHUwNjM5IFx1MDYyOFx1MDYyRFx1MDY0QVx1MDYyQiBcdTA2MkFcdTA2MzdcdTA2NDdcdTA2MzEgXHUwNjI3XHUwNjQ0XHUwNjQ1XHUwNjQ0XHUwNjQxXHUwNjI3XHUwNjJBIFx1MDYyN1x1MDY0NFx1MDY0MVx1MDYzMVx1MDYzOVx1MDY0QVx1MDYyOSBcdTA2NDNcdTA2NDRcdTA2NDdcdTA2MjdcIixcbiAgICBJTklUSUFMTFlfRVhQQU5EX1NVQkRFQ0tTX0lOX1RSRUVfREVTQzpcbiAgICAgICAgXCIgXHUwNjM5XHUwNjM3XHUwNjQ0IFx1MDY0N1x1MDYzMFx1MDYyNyBcdTA2MjdcdTA2NDRcdTA2MkVcdTA2NEFcdTA2MjdcdTA2MzEgXHUwNjQ0XHUwNjM3XHUwNjRBIFx1MDYyN1x1MDY0NFx1MDYzMVx1MDY0Rlx1MDYzMlx1MDY0NSBcdTA2MjdcdTA2NDRcdTA2NDVcdTA2MkFcdTA2MkZcdTA2MjdcdTA2MkVcdTA2NDRcdTA2MjkgXHUwNjQxXHUwNjRBIFx1MDY0Nlx1MDY0MVx1MDYzMyBcdTA2MjdcdTA2NDRcdTA2MjhcdTA2MzdcdTA2MjdcdTA2NDJcdTA2MjkgLCBcdTA2NDVcdTA2NDFcdTA2NEFcdTA2MkYgXHUwNjI1XHUwNjMwXHUwNjI3IFx1MDY0M1x1MDYyN1x1MDY0NiBcdTA2NDRcdTA2MkZcdTA2NEFcdTA2NDMgXHUwNjI4XHUwNjM3XHUwNjI3XHUwNjQyXHUwNjI3XHUwNjJBIFx1MDYyQVx1MDY0Nlx1MDYyQVx1MDY0NVx1MDY0QSBcdTA2MjVcdTA2NDRcdTA2NDkgXHUwNjI3XHUwNjQ0XHUwNjM5XHUwNjJGXHUwNjRBXHUwNjJGIFx1MDY0NVx1MDY0NiBcdTA2MjdcdTA2NDRcdTA2MzFcdTA2NEZcdTA2MzJcdTA2NDUgXHUwNjQxXHUwNjRBIFx1MDY0Nlx1MDY0MVx1MDYzMyBcdTA2MjdcdTA2NDRcdTA2NDVcdTA2NDRcdTA2NDFcIixcbiAgICBBTEdPUklUSE06IFwiXHUwNjJFXHUwNjQ4XHUwNjI3XHUwNjMxXHUwNjMyXHUwNjQ1XHUwNjRBXHUwNjI5XCIsXG4gICAgQ0hFQ0tfQUxHT1JJVEhNX1dJS0k6XG4gICAgICAgICc8YSBocmVmPVwiJHthbGdvX3VybH1cIj5hbGdvcml0aG0gaW1wbGVtZW50YXRpb248L2E+IDpcdTA2NDRcdTA2NDVcdTA2MzJcdTA2NEFcdTA2MkYgXHUwNjQ1XHUwNjQ2IFx1MDYyN1x1MDY0NFx1MDY0NVx1MDYzOVx1MDY0NFx1MDY0OFx1MDY0NVx1MDYyN1x1MDYyQSBcdTA2MkFcdTA2MkRcdTA2NDJcdTA2NDIgXHUwNjQ1XHUwNjQ2JyxcbiAgICBCQVNFX0VBU0U6IFwiXHUwNjMzXHUwNjQ3XHUwNjQ4XHUwNjQ0XHUwNjI5IFx1MDYyN1x1MDY0NFx1MDY0Mlx1MDYyN1x1MDYzOVx1MDYyRlx1MDYyOVwiLFxuICAgIEJBU0VfRUFTRV9ERVNDOiBcIlx1MDYyN1x1MDY0NFx1MDYyRFx1MDYyRiBcdTA2MjdcdTA2NDRcdTA2MjNcdTA2MkZcdTA2NDZcdTA2NDkgPSAxMzAgXHUwNjBDIFx1MDY0OFx1MDY0QVx1MDY0MVx1MDYzNlx1MDY0NCBcdTA2MkRcdTA2NDhcdTA2MjdcdTA2NDRcdTA2NEEgMjUwLlwiLFxuICAgIEJBU0VfRUFTRV9NSU5fV0FSTklORzogXCJcdTA2NEFcdTA2MkNcdTA2MjggXHUwNjIzXHUwNjQ2IFx1MDYyQVx1MDY0M1x1MDY0OFx1MDY0NiBcdTA2MzNcdTA2NDdcdTA2NDhcdTA2NDRcdTA2MjkgXHUwNjI3XHUwNjQ0XHUwNjQyXHUwNjI3XHUwNjM5XHUwNjJGXHUwNjI5IDEzMCBcdTA2MzlcdTA2NDRcdTA2NDkgXHUwNjI3XHUwNjQ0XHUwNjIzXHUwNjQyXHUwNjQ0LlwiLFxuICAgIExBUFNFX0lOVEVSVkFMX0NIQU5HRTogXCJcdTA2MjdcdTA2NDRcdTA2NDFcdTA2MjdcdTA2MzVcdTA2NDQgXHUwNjI3XHUwNjQ0XHUwNjMyXHUwNjQ1XHUwNjQ2XHUwNjRBIFx1MDY0QVx1MDYyQVx1MDYzQVx1MDY0QVx1MDYzMSBcdTA2MzlcdTA2NDZcdTA2MkYgXHUwNjQ1XHUwNjMxXHUwNjI3XHUwNjJDXHUwNjM5XHUwNjI5IFx1MDYyOFx1MDYzN1x1MDYyN1x1MDY0Mlx1MDYyOS9cdTA2NDVcdTA2NDRcdTA2MjdcdTA2MkRcdTA2MzhcdTA2MjkgXHUwNjM1XHUwNjM5XHUwNjI4XHUwNjI5XCIsXG4gICAgTEFQU0VfSU5URVJWQUxfQ0hBTkdFX0RFU0M6IFwibmV3SW50ZXJ2YWwgPSBvbGRJbnRlcnZhbCAqIGludGVydmFsQ2hhbmdlIC8gMTAwLlwiLFxuICAgIEVBU1lfQk9OVVM6IFwiXHUwNjQ1XHUwNjQzXHUwNjI3XHUwNjQxXHUwNjIzXHUwNjI5IFx1MDYzM1x1MDY0N1x1MDY0NFx1MDYyOVwiLFxuICAgIEVBU1lfQk9OVVNfREVTQzpcbiAgICAgICAgXCJcdTA2MkFcdTA2MkFcdTA2NEFcdTA2MkQgXHUwNjQ0XHUwNjQzIFx1MDYyN1x1MDY0NFx1MDY0NVx1MDY0M1x1MDYyN1x1MDY0MVx1MDYyM1x1MDYyOSBcdTA2MjdcdTA2NDRcdTA2MzNcdTA2NDdcdTA2NDRcdTA2MjkgXHUwNjM2XHUwNjI4XHUwNjM3IFx1MDYyN1x1MDY0NFx1MDY0MVx1MDYzMVx1MDY0MiBcdTA2NDFcdTA2NEEgXHUwNjI3XHUwNjQ0XHUwNjQxXHUwNjQ4XHUwNjI3XHUwNjM1XHUwNjQ0IFx1MDYyN1x1MDY0NFx1MDYzMlx1MDY0NVx1MDY0Nlx1MDY0QVx1MDYyOSBcdTA2MjhcdTA2NEFcdTA2NDYgXHUwNjI3XHUwNjQ0XHUwNjMxXHUwNjJGIFx1MDYyN1x1MDY0NFx1MDYyQ1x1MDY0QVx1MDYyRiBcdTA2NDhcdTA2MjdcdTA2NDRcdTA2MzNcdTA2NDdcdTA2NDQgXHUwNjM5XHUwNjQ0XHUwNjQ5IFx1MDYyOFx1MDYzN1x1MDYyN1x1MDY0Mlx1MDYyOS9cdTA2NDVcdTA2NDRcdTA2MjdcdTA2MkRcdTA2MzhcdTA2MjkgKFx1MDYyN1x1MDY0NFx1MDYyRFx1MDYyRiBcdTA2MjdcdTA2NDRcdTA2MjNcdTA2MkZcdTA2NDZcdTA2NDkgPSAxMDAgXHUwNjZBKS5cIixcbiAgICBFQVNZX0JPTlVTX01JTl9XQVJOSU5HOiBcIlx1MDY0QVx1MDYyQ1x1MDYyOCBcdTA2MjNcdTA2NDYgXHUwNjJBXHUwNjQzXHUwNjQ4XHUwNjQ2IFx1MDYyN1x1MDY0NFx1MDY0NVx1MDY0M1x1MDYyN1x1MDY0MVx1MDYyM1x1MDYyOSBcdTA2MjdcdTA2NDRcdTA2MzNcdTA2NDdcdTA2NDRcdTA2MjkgMTAwIFx1MDYzOVx1MDY0NFx1MDY0OSBcdTA2MjdcdTA2NDRcdTA2MjNcdTA2NDJcdTA2NDQuXCIsXG4gICAgTUFYX0lOVEVSVkFMOiBcIk1heGltdW0gaW50ZXJ2YWwgaW4gZGF5c1wiLFxuICAgIE1BWF9JTlRFUlZBTF9ERVNDOiBcIlx1MDY0QVx1MDYyQVx1MDY0QVx1MDYyRCBcdTA2NDRcdTA2NDMgXHUwNjQ4XHUwNjM2XHUwNjM5IFx1MDYyRFx1MDYyRiBcdTA2MjNcdTA2MzlcdTA2NDRcdTA2NDkgIFx1MDY0NFx1MDY0NFx1MDY0MVx1MDYyN1x1MDYzNVx1MDY0NCBcdTA2MjdcdTA2NDRcdTA2MzJcdTA2NDVcdTA2NDZcdTA2NEEgKFx1MDYyN1x1MDY0MVx1MDYyQVx1MDYzMVx1MDYyN1x1MDYzNlx1MDY0QSA9IDEwMCBcdTA2MzlcdTA2MjdcdTA2NDUpLlwiLFxuICAgIE1BWF9JTlRFUlZBTF9NSU5fV0FSTklORzogXCJcdTA2NEFcdTA2MkNcdTA2MjggXHUwNjIzXHUwNjQ2IFx1MDY0QVx1MDY0M1x1MDY0OFx1MDY0NiBcdTA2MjdcdTA2NDRcdTA2MkRcdTA2MkYgXHUwNjI3XHUwNjQ0XHUwNjIzXHUwNjQyXHUwNjM1XHUwNjQ5IFx1MDY0NFx1MDY0NFx1MDY0MVx1MDYyN1x1MDYzNVx1MDY0NCBcdTA2MjdcdTA2NDRcdTA2MzJcdTA2NDVcdTA2NDZcdTA2NEEgXHUwNjQ0XHUwNjQ1XHUwNjJGXHUwNjI5IFx1MDY0QVx1MDY0OFx1MDY0NSBcdTA2NDhcdTA2MjdcdTA2MkRcdTA2MkYgXHUwNjM5XHUwNjQ0XHUwNjQ5IFx1MDYyN1x1MDY0NFx1MDYyM1x1MDY0Mlx1MDY0NC5cIixcbiAgICBNQVhfTElOS19DT05UUklCOiBcIlx1MDYyM1x1MDY0Mlx1MDYzNVx1MDY0OSBcdTA2NDVcdTA2MzNcdTA2MjdcdTA2NDdcdTA2NDVcdTA2MjkgXHUwNjI3XHUwNjMxXHUwNjJBXHUwNjI4XHUwNjI3XHUwNjM3XCIsXG4gICAgTUFYX0xJTktfQ09OVFJJQl9ERVNDOiBcIlx1MDYyM1x1MDY0Mlx1MDYzNVx1MDY0OSBcdTA2NDVcdTA2MzNcdTA2MjdcdTA2NDdcdTA2NDVcdTA2MjkgXHUwNjQ0XHUwNjQ0XHUwNjMzXHUwNjQ3XHUwNjQ4XHUwNjQ0XHUwNjI5IFx1MDYyN1x1MDY0NFx1MDY0NVx1MDYzMVx1MDYyQ1x1MDYyRFx1MDYyOSBcdTA2NDRcdTA2NDRcdTA2NDVcdTA2NDRcdTA2MjdcdTA2MkRcdTA2MzhcdTA2MjdcdTA2MkEgXHUwNjI3XHUwNjQ0XHUwNjQ1XHUwNjMxXHUwNjJBXHUwNjI4XHUwNjM3XHUwNjI5IFx1MDYyOFx1MDYyN1x1MDY0NFx1MDYzM1x1MDY0N1x1MDY0OFx1MDY0NFx1MDYyOSBcdTA2MjdcdTA2NDRcdTA2MjNcdTA2NDhcdTA2NDRcdTA2NEFcdTA2MjkuXCIsXG4gICAgTE9HR0lORzogXCJcdTA2MkFcdTA2MzNcdTA2MkNcdTA2NEFcdTA2NDRcIixcbiAgICBESVNQTEFZX0RFQlVHX0lORk86IFwiXHUwNjM5XHUwNjMxXHUwNjM2IFx1MDY0NVx1MDYzOVx1MDY0NFx1MDY0OFx1MDY0NVx1MDYyN1x1MDYyQSBcdTA2MjdcdTA2NDRcdTA2MkFcdTA2MzVcdTA2MkRcdTA2NEFcdTA2MkQgXHUwNjM5XHUwNjQ0XHUwNjQ5IFx1MDY0OFx1MDYyRFx1MDYyRlx1MDYyOSBcdTA2MkFcdTA2MkRcdTA2NDNcdTA2NDUgXHUwNjI3XHUwNjQ0XHUwNjQ1XHUwNjM3XHUwNjQ4XHUwNjMxXHUwNjFGXCIsXG5cbiAgICAvLyBzaWRlYmFyLnRzXG4gICAgTk9URVNfUkVWSUVXX1FVRVVFOiBcIlx1MDY0NVx1MDY0NFx1MDYyN1x1MDYyRFx1MDYzOFx1MDYyN1x1MDYyQSBcdTA2NDJcdTA2MjdcdTA2MjZcdTA2NDVcdTA2MjkgXHUwNjI3XHUwNjQ0XHUwNjQ1XHUwNjMxXHUwNjI3XHUwNjJDXHUwNjM5XHUwNjI5XCIsXG4gICAgQ0xPU0U6IFwiXHUwNjIzXHUwNjNBXHUwNjQ0XHUwNjQyXCIsXG4gICAgTkVXOiBcIlx1MDYyQ1x1MDYyRlx1MDY0QVx1MDYyRlwiLFxuICAgIFlFU1RFUkRBWTogXCJcdTA2MjdcdTA2NDRcdTA2MjhcdTA2MjdcdTA2MzFcdTA2MkRcdTA2MjlcIixcbiAgICBUT0RBWTogXCJcdTA2MjdcdTA2NDRcdTA2NEFcdTA2NDhcdTA2NDVcIixcbiAgICBUT01PUlJPVzogXCJcdTA2MjdcdTA2NDRcdTA2M0FcdTA2MkZcIixcblxuICAgIC8vIHN0YXRzLW1vZGFsLnRzeFxuICAgIFNUQVRTX1RJVExFOiBcIlx1MDYyNVx1MDYyRFx1MDYzNVx1MDYyN1x1MDYyNlx1MDY0QVx1MDYyN1x1MDYyQVwiLFxuICAgIE1PTlRIOiBcIlx1MDYzNFx1MDY0N1x1MDYzMVwiLFxuICAgIFFVQVJURVI6IFwiXHUwNjMxXHUwNjI4XHUwNjM5IFx1MDYyN1x1MDY0NFx1MDYzM1x1MDY0Nlx1MDYyOVwiLFxuICAgIFlFQVI6IFwiXHUwNjMzXHUwNjQ2XHUwNjI5XCIsXG4gICAgTElGRVRJTUU6IFwiXCIsXG4gICAgRk9SRUNBU1Q6IFwiXCIsXG4gICAgRk9SRUNBU1RfREVTQzogXCJcdTA2MzlcdTA2MkZcdTA2MkYgXHUwNjI3XHUwNjQ0XHUwNjI4XHUwNjM3XHUwNjI3XHUwNjQyXHUwNjI3XHUwNjJBIFx1MDYyN1x1MDY0NFx1MDY0NVx1MDYzM1x1MDYyQVx1MDYyRFx1MDY0Mlx1MDYyOSBcdTA2NDFcdTA2NEEgXHUwNjI3XHUwNjQ0XHUwNjQ1XHUwNjMzXHUwNjJBXHUwNjQyXHUwNjI4XHUwNjQ0XCIsXG4gICAgU0NIRURVTEVEOiBcIlx1MDYyN1x1MDY0NFx1MDY0NVx1MDY0Mlx1MDYzMVx1MDYzMVwiLFxuICAgIERBWVM6IFwiXHUwNjIzXHUwNjRBXHUwNjI3XHUwNjQ1XCIsXG4gICAgTlVNQkVSX09GX0NBUkRTOiBcIlx1MDYzOVx1MDYyRlx1MDYyRiBcdTA2MjdcdTA2NDRcdTA2MjhcdTA2MzdcdTA2MjdcdTA2NDJcdTA2MjdcdTA2MkFcIixcbiAgICBSRVZJRVdTX1BFUl9EQVk6IFwiXHUwNjI3XHUwNjQ0XHUwNjQ1XHUwNjMxXHUwNjI3XHUwNjJDXHUwNjM5XHUwNjI3XHUwNjJBL1x1MDYyN1x1MDY0NFx1MDY0QVx1MDY0OFx1MDY0NSAke2F2Z30gOlx1MDY0NVx1MDYyQVx1MDY0OFx1MDYzM1x1MDYzN1wiLFxuICAgIElOVEVSVkFMUzogXCJcdTA2NDFcdTA2NDhcdTA2MjdcdTA2MzVcdTA2NDQgXHUwNjMyXHUwNjQ1XHUwNjQ2XHUwNjRBXHUwNjI5XCIsXG4gICAgSU5URVJWQUxTX0RFU0M6IFwiXHUwNjI3XHUwNjQ0XHUwNjJBXHUwNjIzXHUwNjJFXHUwNjRBXHUwNjMxIFx1MDYyRFx1MDYyQVx1MDY0OSBcdTA2NEFcdTA2MkFcdTA2NDUgXHUwNjM5XHUwNjMxXHUwNjM2IFx1MDYyN1x1MDY0NFx1MDY0NVx1MDYzMVx1MDYyN1x1MDYyQ1x1MDYzOVx1MDYyN1x1MDYyQSBcdTA2NDVcdTA2MzFcdTA2MjkgXHUwNjIzXHUwNjJFXHUwNjMxXHUwNjQ5XCIsXG4gICAgQ09VTlQ6IFwiXHUwNjM5XHUwNjJGXHUwNjJGXCIsXG4gICAgSU5URVJWQUxTX1NVTU1BUlk6IFwiJHtsb25nZXN0fSA6IFx1MDYyM1x1MDYzN1x1MDY0OFx1MDY0NCBcdTA2NDFcdTA2MjdcdTA2MzVcdTA2NDQgXHUwNjMyXHUwNjQ1XHUwNjQ2XHUwNjRBICwke2F2Z30gOlx1MDY0NVx1MDYyQVx1MDY0OFx1MDYzM1x1MDYzNyBcdTA2MjdcdTA2NDRcdTA2NDFcdTA2MjdcdTA2MzVcdTA2NDQgXHUwNjI3XHUwNjQ0XHUwNjMyXHUwNjQ1XHUwNjQ2XHUwNjRBXCIsXG4gICAgRUFTRVM6IFwiXHUwNjI3XHUwNjQ0XHUwNjMzXHUwNjQ3XHUwNjQ4XHUwNjQ0XHUwNjI5XCIsXG4gICAgRUFTRVNfU1VNTUFSWTogXCIke2F2Z0Vhc2V9IDpcdTA2NDVcdTA2MkFcdTA2NDhcdTA2MzNcdTA2MzcgXHUwNjI3XHUwNjQ0XHUwNjMzXHUwNjQ3XHUwNjQ4XHUwNjQ0XHUwNjI5XCIsXG4gICAgQ0FSRF9UWVBFUzogXCJcdTA2MjNcdTA2NDZcdTA2NDhcdTA2MjdcdTA2MzkgXHUwNjI3XHUwNjQ0XHUwNjI4XHUwNjM3XHUwNjI3XHUwNjQyXHUwNjI3XHUwNjJBXCIsXG4gICAgQ0FSRF9UWVBFU19ERVNDOiBcIlx1MDY0OFx1MDY0N1x1MDYzMFx1MDYyNyBcdTA2NEFcdTA2MzRcdTA2NDVcdTA2NDQgXHUwNjI3XHUwNjQ0XHUwNjI4XHUwNjM3XHUwNjI3XHUwNjQyXHUwNjI3XHUwNjJBIFx1MDYyN1x1MDY0NFx1MDY0NVx1MDYyRVx1MDY0MVx1MDY0QVx1MDYyOSBcdTA2NDNcdTA2MzBcdTA2NDRcdTA2NDMgXHUwNjBDIFx1MDYyNVx1MDY0NiBcdTA2NDhcdTA2MkNcdTA2MkZcdTA2MkFcIixcbiAgICBDQVJEX1RZUEVfTkVXOiBcIlx1MDYyQ1x1MDYyRlx1MDY0QVx1MDYyRlx1MDYyOVwiLFxuICAgIENBUkRfVFlQRV9ZT1VORzogXCJcdTA2MzVcdTA2M0FcdTA2NEFcdTA2MzFcdTA2MjlcIixcbiAgICBDQVJEX1RZUEVfTUFUVVJFOiBcIlx1MDY0Nlx1MDYyN1x1MDYzNlx1MDYyQ1x1MDYyOVwiLFxuICAgIENBUkRfVFlQRVNfU1VNTUFSWTogXCIgJHt0b3RhbENhcmRzQ291bnR9IDpcdTA2MjVcdTA2MkNcdTA2NDVcdTA2MjdcdTA2NDRcdTA2NEEgXHUwNjM5XHUwNjJGXHUwNjJGIFx1MDYyN1x1MDY0NFx1MDYyOFx1MDYzN1x1MDYyN1x1MDY0Mlx1MDYyN1x1MDYyQVwiLFxufTtcbiIsICIvLyBcdTAxMERlXHUwMTYxdGluYVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgLy8gZmxhc2hjYXJkLW1vZGFsLnRzeFxuICAgIERFQ0tTOiBcIkJhbFx1MDBFRFx1MDEwRGt5XCIsXG4gICAgRFVFX0NBUkRTOiBcIkthcnRpXHUwMTBEa3kgcG8gdGVybVx1MDBFRG51XCIsXG4gICAgTkVXX0NBUkRTOiBcIk5vdlx1MDBFOSBrYXJ0aVx1MDEwRGt5XCIsXG4gICAgVE9UQUxfQ0FSRFM6IFwiS2FydGlcdTAxMERlayBjZWxrZW1cIixcbiAgICBCQUNLOiBcIkJhY2tcIixcbiAgICBTS0lQOiBcIlNraXBcIixcbiAgICBFRElUX0NBUkQ6IFwiRWRpdCBDYXJkXCIsXG4gICAgUkVTRVRfQ0FSRF9QUk9HUkVTUzogXCJWeW51bG92YXQgcG9rcm9rIGthcnRpXHUwMTBEa3lcIixcbiAgICBIQVJEOiBcIlRlXHUwMTdFa1x1MDBFOVwiLFxuICAgIEdPT0Q6IFwiRG9iclx1MDBFOVwiLFxuICAgIEVBU1k6IFwiSmVkbm9kdWNoXHUwMEU5XCIsXG4gICAgU0hPV19BTlNXRVI6IFwiVWtcdTAwRTF6YXQgb2Rwb3ZcdTAxMUJcdTAxMEZcIixcbiAgICBDQVJEX1BST0dSRVNTX1JFU0VUOiBcIlBva3JvayBrYXJ0aVx1MDEwRGt5IGJ5bCB2eW51bG92XHUwMEUxbi5cIixcbiAgICBTQVZFOiBcIlNhdmVcIixcbiAgICBDQU5DRUw6IFwiQ2FuY2VsXCIsXG4gICAgTk9fSU5QVVQ6IFwiTm8gaW5wdXQgcHJvdmlkZWQuXCIsXG4gICAgQ1VSUkVOVF9FQVNFX0hFTFBfVEVYVDogXCJDdXJyZW50IEVhc2U6IFwiLFxuICAgIENVUlJFTlRfSU5URVJWQUxfSEVMUF9URVhUOiBcIkN1cnJlbnQgSW50ZXJ2YWw6IFwiLFxuICAgIENBUkRfR0VORVJBVEVEX0ZST006IFwiR2VuZXJhdGVkIGZyb206ICR7bm90ZVBhdGh9XCIsXG5cbiAgICAvLyBtYWluLnRzXG4gICAgT1BFTl9OT1RFX0ZPUl9SRVZJRVc6IFwiT3Rldlx1MDE1OVx1MDBFRHQgcG96blx1MDBFMW1rdSBrIHJldml6aVwiLFxuICAgIFJFVklFV19DQVJEUzogXCJQb3puXHUwMEUxbWVrIGsgcmV2aXppXCIsXG4gICAgUkVWSUVXX0VBU1lfRklMRV9NRU5VOiBcIlJldml6ZTogSmVkbm9kdWNoXHUwMEU5XCIsXG4gICAgUkVWSUVXX0dPT0RfRklMRV9NRU5VOiBcIlJldml6ZTogRG9iclx1MDBFOVwiLFxuICAgIFJFVklFV19IQVJEX0ZJTEVfTUVOVTogXCJSZXZpemU6IFRcdTAxMUJcdTAxN0VrXHUwMEU5XCIsXG4gICAgUkVWSUVXX05PVEVfRUFTWV9DTUQ6IFwiT3puYVx1MDEwRGl0IHBvem5cdTAwRTFta3UgamFrbyBqZWRub2R1Y2hvdVwiLFxuICAgIFJFVklFV19OT1RFX0dPT0RfQ01EOiBcIk96bmFcdTAxMERpdCBwb3puXHUwMEUxbWt1IGpha28gZG9icm91XCIsXG4gICAgUkVWSUVXX05PVEVfSEFSRF9DTUQ6IFwiT3puYVx1MDEwRGl0IHBvem5cdTAwRTFta3UgamFrbyB0ZVx1MDE3RWtvdVwiLFxuICAgIFJFVklFV19BTExfQ0FSRFM6IFwiUmV2aWRvdmF0IGthcnRpXHUwMTBEa3kgdmUgdlx1MDE2MWVjaCBwb3puXHUwMEUxbWtcdTAwRTFjaFwiLFxuICAgIENSQU1fQUxMX0NBUkRTOiBcIlNlbGVjdCBhIGRlY2sgdG8gY3JhbVwiLFxuICAgIFJFVklFV19DQVJEU19JTl9OT1RFOiBcIlJldmlkb3ZhdCBrYXJ0aVx1MDEwRGt5IHYgdFx1MDBFOXRvIHBvem5cdTAwRTFtY2UuXCIsXG4gICAgQ1JBTV9DQVJEU19JTl9OT1RFOiBcIkNyYW0ga2FydGlcdTAxMERreSB2IHRcdTAwRTl0byBwb3puXHUwMEUxbWNlLlwiLFxuICAgIFZJRVdfU1RBVFM6IFwiVWtcdTAwRTF6YXQgc3RhdGlzdGlreVwiLFxuICAgIFNUQVRVU19CQVI6IFwiUmV2aXplOiAke2R1ZU5vdGVzQ291bnR9IHBvem5cdTAwRTFtZWssICR7ZHVlRmxhc2hjYXJkc0NvdW50fSBrYXJ0aVx1MDEwRGVrIHBvIHRlcm1cdTAwRURudVwiLFxuICAgIFNZTkNfVElNRV9UQUtFTjogXCJTeW5jaHJvbml6YWNlIHRydmFsYSAke3R9bXNcIixcbiAgICBOT1RFX0lOX0lHTk9SRURfRk9MREVSOiBcIlBvem5cdTAwRTFta2EgamUgdWxvXHUwMTdFZW5hIHYgaWdub3JvdmFuXHUwMEU5IHNsb1x1MDE3RWNlICh6a29udHJvbHVqdGUgbmFzdGF2ZW5cdTAwRUQpLlwiLFxuICAgIFBMRUFTRV9UQUdfTk9URTogXCJQcm9zXHUwMEVEbSBvem5hXHUwMTBEbmUgcG96blx1MDBFMW1rdSBvZHBvdlx1MDBFRGRhalx1MDBFRGNcdTAwRURtIHRhZ2VtIHBybyByZXZpemkgKHYgbmFzdGF2ZW5cdTAwRUQpLlwiLFxuICAgIFJFU1BPTlNFX1JFQ0VJVkVEOiBcIk9kcG92XHUwMTFCXHUwMTBGIHBcdTAxNTlpamF0YS5cIixcbiAgICBOT19ERUNLX0VYSVNUUzogXCJOZWV4aXN0dWplIFx1MDE3RVx1MDBFMWRuXHUwMEZEIGJhbFx1MDBFRFx1MDEwRGVrIHBybyAke2RlY2tOYW1lfVwiLFxuICAgIEFMTF9DQVVHSFRfVVA6IFwiVlx1MDE2MWUgenJldmlkb3ZcdTAwRTFub1wiLFxuXG4gICAgLy8gc2NoZWR1bGluZy50c1xuICAgIERBWVNfU1RSX0lWTDogXCIke2ludGVydmFsfSBkZW4vZG5cdTAwRURcIixcbiAgICBNT05USFNfU1RSX0lWTDogXCIke2ludGVydmFsfSBtXHUwMTFCc1x1MDBFRGMoXHUwMTZGKVwiLFxuICAgIFlFQVJTX1NUUl9JVkw6IFwiJHtpbnRlcnZhbH0gcm9rKFx1MDE2RilcIixcbiAgICBEQVlTX1NUUl9JVkxfTU9CSUxFOiBcIiR7aW50ZXJ2YWx9ZFwiLFxuICAgIE1PTlRIU19TVFJfSVZMX01PQklMRTogXCIke2ludGVydmFsfW1cIixcbiAgICBZRUFSU19TVFJfSVZMX01PQklMRTogXCIke2ludGVydmFsfXJcIixcblxuICAgIC8vIHNldHRpbmdzLnRzXG4gICAgU0VUVElOR1NfSEVBREVSOiBcIlNwYWNlZCBSZXBldGl0aW9uIFBsdWdpbiAtIE5hc3RhdmVuXHUwMEVEXCIsXG4gICAgQ0hFQ0tfV0lLSTogJ1BybyB2XHUwMEVEY2UgaW5mb3JtYWNcdTAwRUQgamRcdTAxMUJ0ZSBuYSA8YSBocmVmPVwiJHt3aWtpX3VybH1cIj53aWtpPC9hPi4nLFxuICAgIEZPTERFUlNfVE9fSUdOT1JFOiBcIklnbm9yb3Zhblx1MDBFOSBzbG9cdTAxN0VreVwiLFxuICAgIEZPTERFUlNfVE9fSUdOT1JFX0RFU0M6XG4gICAgICAgIFwiWmFkZWp0ZSBjZXN0eSBrZSBzbG9cdTAxN0VrXHUwMEUxbSBvZGRcdTAxMUJsZW5cdTAwRTkgb2RcdTAxNTlcdTAwRTFka292XHUwMEUxblx1MDBFRG0gbmFwXHUwMTU5XHUwMEVEa2FkLiBcdTAxNjBhYmxvbnkgTWV0YS9TY3JpcHRzXCIsXG4gICAgRkxBU0hDQVJEUzogXCJLYXJ0aVx1MDEwRGt5XCIsXG4gICAgRkxBU0hDQVJEX0VBU1lfTEFCRUw6IFwiRWFzeSBCdXR0b24gVGV4dFwiLFxuICAgIEZMQVNIQ0FSRF9HT09EX0xBQkVMOiBcIkdvb2QgQnV0dG9uIFRleHRcIixcbiAgICBGTEFTSENBUkRfSEFSRF9MQUJFTDogXCJIYXJkIEJ1dHRvbiBUZXh0XCIsXG4gICAgRkxBU0hDQVJEX0VBU1lfREVTQzogJ0N1c3RvbWl6ZSB0aGUgbGFiZWwgZm9yIHRoZSBcIkVhc3lcIiBCdXR0b24nLFxuICAgIEZMQVNIQ0FSRF9HT09EX0RFU0M6ICdDdXN0b21pemUgdGhlIGxhYmVsIGZvciB0aGUgXCJHb29kXCIgQnV0dG9uJyxcbiAgICBGTEFTSENBUkRfSEFSRF9ERVNDOiAnQ3VzdG9taXplIHRoZSBsYWJlbCBmb3IgdGhlIFwiSGFyZFwiIEJ1dHRvbicsXG4gICAgRkxBU0hDQVJEX1RBR1M6IFwiVGFnIHBybyBrYXJ0aVx1MDEwRGt5XCIsXG4gICAgRkxBU0hDQVJEX1RBR1NfREVTQzpcbiAgICAgICAgXCJaYWRldGUgdGFneSBvb2RcdTAxMUJsZW5cdTAwRTkgbWV6ZXJvdSBuZWJvIG9kXHUwMTU5XHUwMEUxZGtvdlx1MDBFMW5cdTAwRURtIG5hcFx1MDE1OVx1MDBFRGtsYWQuICNrYXJ0aVx1MDEwRGt5ICNiYWxcdTAwRURcdTAxMERrZTIgI2JhbFx1MDBFRFx1MDEwRGVrMy5cIixcbiAgICBDT05WRVJUX0ZPTERFUlNfVE9fREVDS1M6IFwiUFx1MDE1OWV2XHUwMEU5c3Qgc2xvXHUwMTdFa3kgbmEgYmFsXHUwMEVEXHUwMTBEa3kgYSBwb2RiYWxcdTAwRURcdTAxMERreT9cIixcbiAgICBDT05WRVJUX0ZPTERFUlNfVE9fREVDS1NfREVTQzogXCJUb3RvIGplIGFsdGVybmF0aXZhIGsgdGFnXHUwMTZGbSBrYXJ0aVx1MDEwRGVrIHZpeiBuYXN0YXZlblx1MDBFRCB2XHUwMEZEXHUwMTYxZS5cIixcbiAgICBJTkxJTkVfU0NIRURVTElOR19DT01NRU5UUzpcbiAgICAgICAgXCJVbG9cdTAxN0VpdCBwbFx1MDBFMW5vdmFjXHUwMEVEIGtvbWVudFx1MDBFMVx1MDE1OSBuYSBzdGVqblx1MDBGRCBcdTAxNTlcdTAwRTFkZWsgamFrbyBwb3NsZWRuXHUwMEVEIHBvbG9cdTAxN0VrYSBrYXJ0aVx1MDEwRGt5P1wiLFxuICAgIElOTElORV9TQ0hFRFVMSU5HX0NPTU1FTlRTX0RFU0M6XG4gICAgICAgIFwiWmFwbnV0XHUwMEVEIHRcdTAwRTl0byB2b2xieSB6cFx1MDE2RnNvYlx1MDBFRCwgXHUwMTdFZSBIVE1MIGtvbWVudFx1MDBFMVx1MDE1OWUgbmVidWRvdSByb3piXHUwMEVEamV0IGZvcm1cdTAwRTF0b3ZcdTAwRTFuXHUwMEVEIGxpc3RcdTAxNkYuXCIsXG4gICAgQlVSWV9TSUJMSU5HU19USUxMX05FWFRfREFZOiBcIk9kbG9cdTAxN0VpdCBwXHUwMTU5XHUwMEVEYnV6blx1MDBFOSBrYXJ0aVx1MDEwRGt5IG5hIGRhbFx1MDE2MVx1MDBFRCBkZW4/XCIsXG4gICAgQlVSWV9TSUJMSU5HU19USUxMX05FWFRfREFZX0RFU0M6XG4gICAgICAgIFwiUFx1MDE1OVx1MDBFRGJ1em5cdTAwRTkga2FydGlcdTAxMERreSBqc291IGthcnRpXHUwMTBEa3kgZ2VuZXJvdmFuXHUwMEU5IHogdGV4dHUgc3Rlam5cdTAwRTkgcG96blx1MDBFMW1reSBuYXBcdTAxNTlcdTAwRURrbGFkIGNsb3plIHNtYXpcdTAwRTFuXHUwMEVEXCIsXG4gICAgU0hPV19DQVJEX0NPTlRFWFQ6IFwiVWtcdTAwRTF6YXQga29udGV4dCB2IGthcnRpXHUwMTBEY2U/XCIsXG4gICAgU0hPV19DQVJEX0NPTlRFWFRfREVTQzogXCJuYXBcdTAxNTlcdTAwRURrbGFkIFRpdHVsZWsgPiBOYWRwaXMxID4gUG9kbmFkcGlzID4gLi4uID4gUG9kbmFkcGlzXCIsXG4gICAgQ0FSRF9NT0RBTF9IRUlHSFRfUEVSQ0VOVDogXCJWXHUwMEZEXHUwMTYxa2Ega2FydGlcdTAxMERlayB2IHByb2NlbnRlY2hcIixcbiAgICBDQVJEX01PREFMX1NJWkVfUEVSQ0VOVF9ERVNDOlxuICAgICAgICBcIk1cdTAxMUJsbyBieSBiXHUwMEZEdCBuYXN0YXZlbm8gbmEgMTAwJSBuYSBtb2JpbHUgbmVibyBrZHlcdTAxN0UgcG91XHUwMTdFXHUwMEVEdlx1MDBFMXRlIHZlbGtcdTAwRTkgb2JyXHUwMEUxemt5XCIsXG4gICAgUkVTRVRfREVGQVVMVDogXCJSZXNldG92YXQgdlx1MDBGRGNob3pcdTAwRUQgbmFzdGF2ZW5cdTAwRURcIixcbiAgICBDQVJEX01PREFMX1dJRFRIX1BFUkNFTlQ6IFwiXHUwMTYwXHUwMEVEXHUwMTU5a2Ega2FydGlcdTAxMERlayB2IHByb2NlbnRlY2hcIixcbiAgICBSQU5ET01JWkVfQ0FSRF9PUkRFUjogXCJOXHUwMEUxaG9kblx1MDExQiB6bVx1MDExQm5pdCBwb1x1MDE1OWFkXHUwMEVEIGthcnRpXHUwMTBEZWsgYlx1MDExQmhlbSByZXZpemU/XCIsXG4gICAgRElTQUJMRV9DTE9aRV9DQVJEUzogXCJWeXBub3V0IGNsb3plIGthcnRpXHUwMTBEa3k/XCIsXG4gICAgQ09OVkVSVF9ISUdITElHSFRTX1RPX0NMT1pFUzogXCJQXHUwMTU5ZXZcdTAwRTlzdCA9PXp2XHUwMEZEcmF6blx1MDExQm5cdTAwRUQ9PSBuYSBjbG96ZXM/XCIsXG4gICAgQ09OVkVSVF9CT0xEX1RFWFRfVE9fQ0xPWkVTOiBcIlBcdTAxNTlldlx1MDBFOXN0ICoqdHVcdTAxMERuXHUwMEZEIHRleHQqKiBuYSBjbG96ZXM/XCIsXG4gICAgQ09OVkVSVF9DVVJMWV9CUkFDS0VUU19UT19DTE9aRVM6IFwiUFx1MDE1OWV2XHUwMEU5c3Qge3tzbG9cdTAxN0Vlblx1MDBFOSB6XHUwMEUxdm9ya3l9fSBuYSBjbG96ZXM/XCIsXG4gICAgSU5MSU5FX0NBUkRTX1NFUEFSQVRPUjogXCJPZGRcdTAxMUJsb3ZhXHUwMTBEIHBybyBpbmxpbmUga2FydGlcdTAxMERreVwiLFxuICAgIEZJWF9TRVBBUkFUT1JTX01BTlVBTExZX1dBUk5JTkc6XG4gICAgICAgIFwiUG96b3IuIEpha21pbGUgdG90byB6bVx1MDExQm5cdTAwRUR0ZSwgYnVkZXRlIG11c2V0IHJ1XHUwMTBEblx1MDExQiB1cHJhdml0IHZcdTAxNjFlY2hueSBleGlzdHVqXHUwMEVEY1x1MDBFRCBrYXJ0aVx1MDEwRGt5LlwiLFxuICAgIElOTElORV9SRVZFUlNFRF9DQVJEU19TRVBBUkFUT1I6IFwiT2RkXHUwMTFCbG92YVx1MDEwRCBwcm8gb3RvXHUwMTBEZW5cdTAwRTkgaW5saW5lIGthcnRpXHUwMTBEa3lcIixcbiAgICBNVUxUSUxJTkVfQ0FSRFNfU0VQQVJBVE9SOiBcIk9kZFx1MDExQmxvdmFcdTAxMEQgcHJvIHZcdTAwRURjZVx1MDE1OVx1MDBFMWRrb3ZcdTAwRTkga2FydGlcdTAxMERreVwiLFxuICAgIE1VTFRJTElORV9SRVZFUlNFRF9DQVJEU19TRVBBUkFUT1I6IFwiT2RkXHUwMTFCbG92YVx1MDEwRCBwcm8gdlx1MDBFRGNlXHUwMTU5XHUwMEUxZGtvdmUgb3RvXHUwMTBEZW5cdTAwRTkga2FydGlcdTAxMERreVwiLFxuICAgIE5PVEVTOiBcIlBvem5cdTAwRTFta3lcIixcbiAgICBSRVZJRVdfUEFORV9PTl9TVEFSVFVQOiBcIkVuYWJsZSBub3RlIHJldmlldyBwYW5lIG9uIHN0YXJ0dXBcIixcbiAgICBUQUdTX1RPX1JFVklFVzogXCJUYWcgcHJvIHJldml6aVwiLFxuICAgIFRBR1NfVE9fUkVWSUVXX0RFU0M6XG4gICAgICAgIFwiWmFkZWp0ZSB0YWd5IG9kZFx1MDExQmxlblx1MDBFOSBtZXplcmFtaSBuZWJvIG9kXHUwMTU5XHUwMEUxZGtvdlx1MDBFMW5cdTAwRURtIG5hcFx1MDE1OVx1MDBFRGtsYWQgI3JldmlldyAjdGFnMiAjdGFnMy5cIixcbiAgICBPUEVOX1JBTkRPTV9OT1RFOiBcIk90ZXZcdTAxNTlcdTAwRUR0IG5cdTAwRTFob2Rub3UgcG96blx1MDBFMW1rdSBwcm8gcmV2aXppXCIsXG4gICAgT1BFTl9SQU5ET01fTk9URV9ERVNDOiBcIlBva3VkIHRvdG8gdnlwbmV0ZSwgcG96blx1MDBFMW1reSBidWRvdSBcdTAxNTlhemVueSBkbGUgZFx1MDE2RmxlXHUwMTdFaXRvc3RpIChQYWdlUmFuaykuXCIsXG4gICAgQVVUT19ORVhUX05PVEU6IFwiT3Rldlx1MDE1OVx1MDBFRHQgYXV0b21hdGlja3kgZGFsXHUwMTYxXHUwMEVEIHBvem5cdTAwRTFta3UgcG8gZG9rb25cdTAxMERlblx1MDBFRCByZXZpemVcIixcbiAgICBESVNBQkxFX0ZJTEVfTUVOVV9SRVZJRVdfT1BUSU9OUzpcbiAgICAgICAgXCJWeXBub3V0IHZvbGJ5IHJldml6ZSB2IG1lbnUgc291Ym9ydSBuYXBcdTAxNTlcdTAwRURrbGFkICdSZXZpemU6IEplZG5vZHVjaFx1MDBFOSdcIixcbiAgICBESVNBQkxFX0ZJTEVfTUVOVV9SRVZJRVdfT1BUSU9OU19ERVNDOlxuICAgICAgICBcIlBvIHZ5cG51dFx1MDBFRCBtXHUwMTZGXHUwMTdFZXRlIHBvdVx1MDE3RVx1MDBFRHZhdCBrbFx1MDBFMXZlc292XHUwMEU5IHprcmF0a3kuIFJlc3RhcnR1anRlIE9ic2lkaWFuIHBvIHptXHUwMTFCblx1MDExQiBuYXN0YXZlblx1MDBFRC5cIixcbiAgICBNQVhfTl9EQVlTX1JFVklFV19RVUVVRTogXCJNYXhpbVx1MDBFMWxuXHUwMEVEIHBvXHUwMTBEZXQgZG5cdTAwRUQgem9icmF6ZW5cdTAwRkRjaCB2IHByYXZcdTAwRTltIHBhbmVsdVwiLFxuICAgIE1JTl9PTkVfREFZOiBcIlBvXHUwMTBEZXQgZG5cdTAwRUQgbXVzXHUwMEVEIGJcdTAwRkR0IG1pbmltXHUwMEUxbG5cdTAxMUIgMS5cIixcbiAgICBWQUxJRF9OVU1CRVJfV0FSTklORzogXCJQcm9zXHUwMEVEbSB6YWRlanRlIHZhbGlkblx1MDBFRCBcdTAxMERcdTAwRURzbG8uXCIsXG4gICAgVUlfUFJFRkVSRU5DRVM6IFwiUFx1MDE1OWVkdm9sYnkgdVx1MDE3RWl2YXRlbHNrXHUwMEU5aG8gcm96aHJhblx1MDBFRFwiLFxuICAgIElOSVRJQUxMWV9FWFBBTkRfU1VCREVDS1NfSU5fVFJFRTpcbiAgICAgICAgXCJTdHJvbXkgYmFsXHUwMEVEXHUwMTBEa3kgYnkgbVx1MDExQmx5IGJcdTAwRkR0IHpwb1x1MDEwRFx1MDBFMXRrdSB6b2JyYXplbnkgamFrbyByb3piYWxlblx1MDBFOVwiLFxuICAgIElOSVRJQUxMWV9FWFBBTkRfU1VCREVDS1NfSU5fVFJFRV9ERVNDOlxuICAgICAgICBcIlZ5cG5cdTAxMUJ0ZSB0b3RvLCBjaGNldGUtbGkgc2JhbGl0IHZub1x1MDE1OWVuXHUwMEU5IGJhbFx1MDBFRFx1MDEwRGt5IG5hIHN0ZWpuXHUwMEU5IGthcnRcdTAxMUIuIFRvIGplIHVcdTAxN0VpdGVcdTAxMERuXHUwMEU5LCBwb2t1ZCBtXHUwMEUxdGUga2FydGlcdTAxMERreSwga3Rlclx1MDBFOSBwYXRcdTAxNTlcdTAwRUQgayBtbm9oYSBiYWxcdTAwRURcdTAxMERrXHUwMTZGbSB2ZSBzdGVqblx1MDBFOW0gc291Ym9ydS5cIixcbiAgICBBTEdPUklUSE06IFwiQWxnb3JpdG11c1wiLFxuICAgIENIRUNLX0FMR09SSVRITV9XSUtJOiAnUHJvIHZcdTAwRURjZSBpbmZvcm1hY1x1MDBFRCBqZFx1MDExQnRlIG5hIDxhIGhyZWY9XCIke2FsZ29fdXJsfVwiPnBvcGlzIGFsZ29yaXRtdTwvYT4uJyxcbiAgICBCQVNFX0VBU0U6IFwiWlx1MDBFMWtsYWRuXHUwMEVEIHNsb1x1MDE3RWl0b3N0XCIsXG4gICAgQkFTRV9FQVNFX0RFU0M6IFwibWluaW11bSA9IDEzMCwgbmVqbFx1MDBFOXBlIHBcdTAxNTlpYmxpXHUwMTdFblx1MDExQiAyNTAuXCIsXG4gICAgQkFTRV9FQVNFX01JTl9XQVJOSU5HOiBcIlpcdTAwRTFrbGFkblx1MDBFRCBzbG9cdTAxN0VpdG9zdCBtdXNcdTAwRUQgYlx1MDBGRHQgbWluaW1cdTAwRTFsblx1MDExQiAxMzAuXCIsXG4gICAgTEFQU0VfSU5URVJWQUxfQ0hBTkdFOiBcIlptXHUwMTFCbmEgaW50ZXJ2YWx1IHBva3VkIGthcnRpXHUwMTBEa3UvcG96blx1MDBFMW1rdSBvem5hXHUwMTBEXHUwMEVEdGUgamFrbyBzbG9cdTAxN0VpdG91XCIsXG4gICAgTEFQU0VfSU5URVJWQUxfQ0hBTkdFX0RFU0M6IFwibm92XHUwMEZEX2ludGV2YWwgPSBzdGFyXHUwMEZEX2ludGVydmFsICogem1cdTAxMUJuYV9pbnRldmFsdSAvIDEwMC5cIixcbiAgICBFQVNZX0JPTlVTOiBcIkJvbnVzIHBybyBqZWRub2R1Y2hcdTAwRTlcIixcbiAgICBFQVNZX0JPTlVTX0RFU0M6XG4gICAgICAgIFwiVGVudG8gYm9udXMgdW1vXHUwMTdFXHUwMTQ4dWplIG5hc3Rhdml0IHJvemRcdTAwRURsIGludGVydmFsdSBtZXppIGplZG5vZHVjaFx1MDBGRG1pIGEgZG9iclx1MDBGRG1pIGthcnRpXHUwMTBEa2FtaS9wb3puXHUwMEUxbWthbWkgKG1pbmltdW0gPSAxMDAlKS5cIixcbiAgICBFQVNZX0JPTlVTX01JTl9XQVJOSU5HOiBcIkJvbnVzIHBybyBqZWRub2R1Y2hvc3QgbXVzXHUwMEVEIGJcdTAwRkR0IG1pbmltXHUwMEUxbG5cdTAxMUIgMTAwLlwiLFxuICAgIE1BWF9JTlRFUlZBTDogXCJNYXhpbXVtIGludGVydmFsIGluIGRheXNcIixcbiAgICBNQVhfSU5URVJWQUxfREVTQzogXCJVbW9cdTAxN0VcdTAxNDh1amUgbmFzdGF2aXQgaG9yblx1MDBFRCBsaW1pdCBwcm8gaW50ZXJ2YWwgKGRlZmF1bHRuXHUwMTFCID0gMTAwIGxldCkuXCIsXG4gICAgTUFYX0lOVEVSVkFMX01JTl9XQVJOSU5HOiBcIk1heGltXHUwMEUxbG5cdTAwRUQgaW50ZXJ2YWwgbXVzXHUwMEVEIGJcdTAwRkR0IGFsZXNwb1x1MDE0OCAxIGRlbi5cIixcbiAgICBNQVhfTElOS19DT05UUklCOiBcIk1heGltXHUwMEUxbG5cdTAwRUQgcFx1MDE1OVx1MDBFRHNwXHUwMTFCdlx1MDExQmsgcHJvbGlua292XHUwMEUxblx1MDBFRFwiLFxuICAgIE1BWF9MSU5LX0NPTlRSSUJfREVTQzpcbiAgICAgICAgXCJNYXhpbVx1MDBFMWxuXHUwMEVEIHBcdTAxNTlcdTAwRURzcFx1MDExQnZlayB2XHUwMEUxXHUwMTdFZW5cdTAwRTkgc2xvXHUwMTdFaXRvc3RpIHByb2xpbmtvdmFuXHUwMEZEY2ggcG96blx1MDBFMW1layBwb3VcdTAxN0VpdFx1MDBGRCBwcm8gdXJcdTAxMERlblx1MDBFRCBwb1x1MDEwRFx1MDBFMXRlXHUwMTBEblx1MDBFRCBzbG9cdTAxN0VpdG9zdGkuXCIsXG4gICAgTE9HR0lORzogXCJaYXpuYW1lblx1MDBFMXZcdTAwRTFtXCIsXG4gICAgRElTUExBWV9ERUJVR19JTkZPOiBcIlpvYnJheml0IGluZm9ybWFjZSBwcm8gbGFkXHUwMTFCblx1MDBFRCBuYSB2XHUwMEZEdm9qXHUwMEUxXHUwMTU5c2tcdTAwRTkga29uem9saT9cIixcblxuICAgIC8vIHNpZGViYXIudHNcbiAgICBOT1RFU19SRVZJRVdfUVVFVUU6IFwiRnJvbnRhIHBvem5cdTAwRTFtZWsgayByZXZpemlcIixcbiAgICBDTE9TRTogXCJVemF2XHUwMTU5ZW5cdTAwRTlcIixcbiAgICBORVc6IFwiTm92XHUwMEU5XCIsXG4gICAgWUVTVEVSREFZOiBcIlZcdTAxMERlcmFcIixcbiAgICBUT0RBWTogXCJEbmVzXCIsXG4gICAgVE9NT1JST1c6IFwiWlx1MDBFRHRyYVwiLFxuXG4gICAgLy8gc3RhdHMtbW9kYWwudHN4XG4gICAgU1RBVFNfVElUTEU6IFwiU3RhdGlzdGlreVwiLFxuICAgIE1PTlRIOiBcIk1cdTAxMUJzXHUwMEVEY1wiLFxuICAgIFFVQVJURVI6IFwiXHUwMTBDdHZydGxldFx1MDBFRFwiLFxuICAgIFlFQVI6IFwiUm9rXCIsXG4gICAgTElGRVRJTUU6IFwiQ2Vsa292XHUwMTFCXCIsXG4gICAgRk9SRUNBU1Q6IFwiUFx1MDE1OWVkcG92XHUwMTFCXHUwMTBGXCIsXG4gICAgRk9SRUNBU1RfREVTQzogXCJDZWxrb3ZcdTAwRkQgcG9cdTAxMERldCBrYXJ0aVx1MDEwRGVrLCBrdGVyXHUwMEZEbSB2eXByXHUwMTYxXHUwMEVEIHRlcm1cdTAwRURuXCIsXG4gICAgU0NIRURVTEVEOiBcIk5hcGxcdTAwRTFub3ZcdTAwRTFub1wiLFxuICAgIERBWVM6IFwiRG5cdTAwRURcIixcbiAgICBOVU1CRVJfT0ZfQ0FSRFM6IFwiUG9cdTAxMERldCBrYXJ0aVx1MDEwRGVrXCIsXG4gICAgUkVWSUVXU19QRVJfREFZOiBcIlByXHUwMTZGbVx1MDExQnI6ICR7YXZnfSByZXZpemUvZGVuXCIsXG4gICAgSU5URVJWQUxTOiBcIkludGVydmFseVwiLFxuICAgIElOVEVSVkFMU19ERVNDOiBcIkRvYmEsIHphIGt0ZXJvdSBidWRlIHpub3Z1IHpvYnJhemVubyBrIHJldml6ZVwiLFxuICAgIENPVU5UOiBcIlBvXHUwMTBEZXRcIixcbiAgICBJTlRFUlZBTFNfU1VNTUFSWTogXCJQclx1MDE2Rm1cdTAxMUJyblx1MDBGRCBpbnRlcnZhbDogJHthdmd9LCBOZWpkZWxcdTAxNjFcdTAwRUQgaW50ZXJ2YWw6ICR7bG9uZ2VzdH1cIixcbiAgICBFQVNFUzogXCJTbG9cdTAxN0VpdG9zdFwiLFxuICAgIEVBU0VTX1NVTU1BUlk6IFwiUHJcdTAxNkZtXHUwMTFCcm5cdTAwRTEgc2xvXHUwMTdFaXRvc3Q6ICR7YXZnRWFzZX1cIixcbiAgICBDQVJEX1RZUEVTOiBcIlR5cHkga2FydGlcdTAxMERla1wiLFxuICAgIENBUkRfVFlQRVNfREVTQzogXCJPYnNhaHVqZSBpIG9kbG9cdTAxN0Vlblx1MDBFOSBrYXJ0aVx1MDEwRGt5IChwb2t1ZCBleGlzdHVqXHUwMEVEKVwiLFxuICAgIENBUkRfVFlQRV9ORVc6IFwiTm92XHUwMEUxXCIsXG4gICAgQ0FSRF9UWVBFX1lPVU5HOiBcIk1sYWRcdTAwRTFcIixcbiAgICBDQVJEX1RZUEVfTUFUVVJFOiBcIkRvc3BcdTAxMUJsXHUwMEUxXCIsXG4gICAgQ0FSRF9UWVBFU19TVU1NQVJZOiBcIkthcnRpXHUwMTBEZWsgY2Vsa2VtOiAke3RvdGFsQ2FyZHNDb3VudH1cIixcbn07XG4iLCAiLy8gQmVuZ2FsaVxuXG5leHBvcnQgZGVmYXVsdCB7fTtcbiIsICIvLyBEYW5za1xuXG5leHBvcnQgZGVmYXVsdCB7fTtcbiIsICIvLyBEZXV0c2NoXG5cbi8vIE9ic2lkaWFuIHNwZWNpZmljIG5hbWVzIChmb2xkZXIsIG5vdGUsIHRhZywgZXRjLikgYXJlIGNvbnNpc3RlbnQgd2l0aCB0aGUgZ2VybWFuIHRyYW5zbGF0aW9uOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL29ic2lkaWFubWQvb2JzaWRpYW4tdHJhbnNsYXRpb25zL2Jsb2IvbWFzdGVyL2RlLmpzb25cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIC8vIGZsYXNoY2FyZC1tb2RhbC50c3hcbiAgICBERUNLUzogXCJTdGFwZWxcIixcbiAgICBEVUVfQ0FSRFM6IFwiQW5zdGVoZW5kZSBLYXJ0ZW5cIixcbiAgICBORVdfQ0FSRFM6IFwiTmV1ZSBLYXJ0ZW5cIixcbiAgICBUT1RBTF9DQVJEUzogXCJBbGxlIEthcnRlblwiLFxuICAgIEJBQ0s6IFwiQmFja1wiLFxuICAgIFNLSVA6IFwiU2tpcFwiLFxuICAgIEVESVRfQ0FSRDogXCJFZGl0IENhcmRcIixcbiAgICBSRVNFVF9DQVJEX1BST0dSRVNTOiBcIkthcnRlbmZvcnRzY2hyaXR0IHp1clx1MDBGQ2Nrc2V0enRlblwiLFxuICAgIEhBUkQ6IFwiU2Nod2VyXCIsXG4gICAgR09PRDogXCJHdXRcIixcbiAgICBFQVNZOiBcIkVpbmZhY2hcIixcbiAgICBTSE9XX0FOU1dFUjogXCJaZWlnZSBBbnR3b3J0XCIsXG4gICAgQ0FSRF9QUk9HUkVTU19SRVNFVDogXCJLYXJ0ZW5mb3J0c2Nocml0dCB3dXJkZSB6dXJcdTAwRkNja2dlc2V0enQuXCIsXG4gICAgU0FWRTogXCJTYXZlXCIsXG4gICAgQ0FOQ0VMOiBcIkNhbmNlbFwiLFxuICAgIE5PX0lOUFVUOiBcIk5vIGlucHV0IHByb3ZpZGVkLlwiLFxuICAgIENVUlJFTlRfRUFTRV9IRUxQX1RFWFQ6IFwiQ3VycmVudCBFYXNlOiBcIixcbiAgICBDVVJSRU5UX0lOVEVSVkFMX0hFTFBfVEVYVDogXCJDdXJyZW50IEludGVydmFsOiBcIixcbiAgICBDQVJEX0dFTkVSQVRFRF9GUk9NOiBcIkdlbmVyYXRlZCBmcm9tOiAke25vdGVQYXRofVwiLFxuXG4gICAgLy8gbWFpbi50c1xuICAgIE9QRU5fTk9URV9GT1JfUkVWSUVXOiBcIk5vdGl6IHp1ciBXaWVkZXJob2x1bmcgXHUwMEY2ZmZuZW5cIixcbiAgICBSRVZJRVdfQ0FSRFM6IFwiTGVybmthcnRlbiB3aWVkZXJob2xlblwiLFxuICAgIFJFVklFV19FQVNZX0ZJTEVfTUVOVTogXCJOb3RpeiBhYnNjaGxpZXNzZW4gYWxzOiBFaW5mYWNoXCIsXG4gICAgUkVWSUVXX0dPT0RfRklMRV9NRU5VOiBcIk5vdGl6IGFic2NobGllc3NlbiBhbHM6IEd1dFwiLFxuICAgIFJFVklFV19IQVJEX0ZJTEVfTUVOVTogXCJOb3RpeiBhYnNjaGxpZXNzZW4gYWxzOiBTY2h3ZXJcIixcbiAgICBSRVZJRVdfTk9URV9FQVNZX0NNRDogXCJOb3RpeiBhYnNjaGxpZXNzZW4gYWxzOiBFaW5mYWNoXCIsXG4gICAgUkVWSUVXX05PVEVfR09PRF9DTUQ6IFwiTm90aXogYWJzY2hsaWVzc2VuIGFsczogR3V0XCIsXG4gICAgUkVWSUVXX05PVEVfSEFSRF9DTUQ6IFwiTm90aXogYWJzY2hsaWVzc2VuIGFsczogU2Nod2VyXCIsXG4gICAgUkVWSUVXX0FMTF9DQVJEUzogXCJBbGxlIExlcm5rYXJ0ZW4gd2llZGVyaG9sZW5cIixcbiAgICBDUkFNX0FMTF9DQVJEUzogXCJTZWxlY3QgYSBkZWNrIHRvIGNyYW1cIixcbiAgICBSRVZJRVdfQ0FSRFNfSU5fTk9URTogXCJMZXJua2FydGVuIGluIGRpZXNlciBOb3RpeiB3aWVkZXJob2xlblwiLFxuICAgIENSQU1fQ0FSRFNfSU5fTk9URTogXCJMZXJua2FydGVuIGluIGRpZXNlciBOb3RpeiBwYXVrZW4uXCIsXG4gICAgVklFV19TVEFUUzogXCJTdGF0aXN0aWtlbiBhbnplaWdlblwiLFxuICAgIFNUQVRVU19CQVI6XG4gICAgICAgIFwiV2llZGVyaG9sdW5nOiAke2R1ZU5vdGVzQ291bnR9IE5vdGl6KGVuKSwgJHtkdWVGbGFzaGNhcmRzQ291bnR9IEthcnRlKG4pIGFuc3RlaGVuZFwiLFxuICAgIFNZTkNfVElNRV9UQUtFTjogXCJTeW5jIGRhdWVydGUgJHt0fW1zXCIsXG4gICAgTk9URV9JTl9JR05PUkVEX0ZPTERFUjpcbiAgICAgICAgXCJOb3RpeiBiZWZpbmRldCBzaWNoIGluIGVpbmVtIGF1c2dlc2NobG9zc2VuZW4gT3JkbmVyIChzaWVoZSBFaW5zdGVsbHVuZ2VuKS5cIixcbiAgICBQTEVBU0VfVEFHX05PVEU6XG4gICAgICAgIFwiQml0dGUgZGllIE5vdGl6IGZcdTAwRkNyIFdpZWRlcmhvbHVuZ2VuIGVudHNwcmVjaGVuZCB0YWdnZW4gKHNpZWhlIEVpbnN0ZWxsdW5nZW4pLlwiLFxuICAgIFJFU1BPTlNFX1JFQ0VJVkVEOiBcIkFudHdvcnQgZXJoYWx0ZW4uXCIsXG4gICAgTk9fREVDS19FWElTVFM6IFwiS2VpbiBTdGFwZWwgZlx1MDBGQ3IgJHtkZWNrTmFtZX0gZ2VmdW5kZW4uXCIsXG4gICAgQUxMX0NBVUdIVF9VUDogXCJZdWh1ISBBbGxlcyBnZXNjaGFmZnQhIDpELlwiLFxuXG4gICAgLy8gc2NoZWR1bGluZy50c1xuICAgIERBWVNfU1RSX0lWTDogXCIke2ludGVydmFsfSBUYWcoZSlcIixcbiAgICBNT05USFNfU1RSX0lWTDogXCIke2ludGVydmFsfSBNb25hdChlKVwiLFxuICAgIFlFQVJTX1NUUl9JVkw6IFwiJHtpbnRlcnZhbH0gSmFocihlKVwiLFxuICAgIERBWVNfU1RSX0lWTF9NT0JJTEU6IFwiJHtpbnRlcnZhbH1kXCIsXG4gICAgTU9OVEhTX1NUUl9JVkxfTU9CSUxFOiBcIiR7aW50ZXJ2YWx9bVwiLFxuICAgIFlFQVJTX1NUUl9JVkxfTU9CSUxFOiBcIiR7aW50ZXJ2YWx9eVwiLFxuXG4gICAgLy8gc2V0dGluZ3MudHNcbiAgICBTRVRUSU5HU19IRUFERVI6IFwiU3BhY2VkIFJlcGV0aXRpb24gUGx1Z2luIC0gRWluc3RlbGx1bmdlblwiLFxuICAgIENIRUNLX1dJS0k6ICdXZWl0ZXJlIEluZm9ybWF0aW9uZW4gZ2lidCBlcyBpbSA8YSBocmVmPVwiJHt3aWtpX3VybH1cIj5XaWtpPC9hPiAoZW5nbGlzaCkuJyxcbiAgICBGT0xERVJTX1RPX0lHTk9SRTogXCJBdXNnZXNjaGxvc3NlbmUgT3JkbmVyXCIsXG4gICAgRk9MREVSU19UT19JR05PUkVfREVTQzpcbiAgICAgICAgXCJNZWhyZXJlIE9yZG5lciBtaXQgWmVpbGVudW1iclx1MDBGQ2NoZW4gZ2V0cmVubnQgYW5nZWJlbi4gQnNwLiBPcmRuZXJBW1plaWxlbnVtYnJ1Y2hdT3JkbmVyQi9VbnRlcm9yZG5lclwiLFxuICAgIEZMQVNIQ0FSRFM6IFwiTGVybmthcnRlblwiLFxuICAgIEZMQVNIQ0FSRF9FQVNZX0xBQkVMOiBcIkVhc3kgQnV0dG9uIFRleHRcIixcbiAgICBGTEFTSENBUkRfR09PRF9MQUJFTDogXCJHb29kIEJ1dHRvbiBUZXh0XCIsXG4gICAgRkxBU0hDQVJEX0hBUkRfTEFCRUw6IFwiSGFyZCBCdXR0b24gVGV4dFwiLFxuICAgIEZMQVNIQ0FSRF9FQVNZX0RFU0M6ICdDdXN0b21pemUgdGhlIGxhYmVsIGZvciB0aGUgXCJFYXN5XCIgQnV0dG9uJyxcbiAgICBGTEFTSENBUkRfR09PRF9ERVNDOiAnQ3VzdG9taXplIHRoZSBsYWJlbCBmb3IgdGhlIFwiR29vZFwiIEJ1dHRvbicsXG4gICAgRkxBU0hDQVJEX0hBUkRfREVTQzogJ0N1c3RvbWl6ZSB0aGUgbGFiZWwgZm9yIHRoZSBcIkhhcmRcIiBCdXR0b24nLFxuICAgIEZMQVNIQ0FSRF9UQUdTOiBcIkxlcm5rYXJ0ZW4gVGFnc1wiLFxuICAgIEZMQVNIQ0FSRF9UQUdTX0RFU0M6XG4gICAgICAgIFwiTWVocmVyZSBUYWdzIG1pdCBMZWVyemVpY2hlbiBvZGVyIFplaWxlbnVtYnJcdTAwRkNjaGVuIGdldHJlbm50IGFuZ2ViZW4uIEJzcC4gI2thcnRlICNzdGFwZWwyICNzdGFwZWwzLlwiLFxuICAgIENPTlZFUlRfRk9MREVSU19UT19ERUNLUzogXCJPcmRuZXIgaW4gU3RhcGVsIHVuZCBTdWJzdGFwZWwgdW13YW5kZWxuP1wiLFxuICAgIENPTlZFUlRfRk9MREVSU19UT19ERUNLU19ERVNDOiAnRWluZSBBbHRlcm5hdGl2ZSB6dXIgb2JlcmVuIFwiTGVybmthcnRlbiBUYWdzXCIgT3B0aW9uLicsXG4gICAgSU5MSU5FX1NDSEVEVUxJTkdfQ09NTUVOVFM6XG4gICAgICAgIFwiRGVuIEZvcnRzY2hyaXR0IGluIGRlciBnbGVpY2hlbiBaZWlsZSB3aWUgZGllIGxldHp0ZSBaZWlsZSBlaW5lciBMZXJua2FydGVpIHNwZWljaGVybj9cIixcbiAgICBJTkxJTkVfU0NIRURVTElOR19DT01NRU5UU19ERVNDOlxuICAgICAgICBcIldlbm4gYWt0aXZpZXJ0LCB3aXJkIGRlciBIVE1MIEtvbW1lbnRhciBkaWUgdW1nZWJlbmRlIExpc3RlIG5pY2h0IGF1ZmJyZWNoZW4uXCIsXG4gICAgQlVSWV9TSUJMSU5HU19USUxMX05FWFRfREFZOiBcIlZlcndhbmR0ZSBLYXJ0ZW4gYXVmIGRlbiBuXHUwMEU0Y2hzdGVuIFRhZyB2ZXJsZWdlbj9cIixcbiAgICBCVVJZX1NJQkxJTkdTX1RJTExfTkVYVF9EQVlfREVTQzpcbiAgICAgICAgXCJWZXJ3YW5kdGUgS2FydGVuIHNpbmQgYXVzIGRlciBnbGVpY2hlbiBLYXJ0ZSBnZW5lcmllcnQgd29yZGVuICh6LkIuIExcdTAwRkNja2VudGV4dGthcnRlbiBvZGVyIGJlaWRzZWl0aWdlIEthcnRlbikuXCIsXG4gICAgU0hPV19DQVJEX0NPTlRFWFQ6IFwiS29udGV4dCBpbiBkZW4gS2FydGVuIGFuemVpZ2VuP1wiLFxuICAgIFNIT1dfQ0FSRF9DT05URVhUX0RFU0M6IFwiQnNwLiBUaXRlbCA+IFx1MDBEQ2JlcnNjaHJpZnQgMSA+IFNla3Rpb24gPiAuLi4gPiBVbnRlcnNla3Rpb25cIixcbiAgICBDQVJEX01PREFMX0hFSUdIVF9QRVJDRU5UOiBcIkhcdTAwRjZoZSBkZXIgTGVybmthcnRlaSBpbiBQcm96ZW50XCIsXG4gICAgQ0FSRF9NT0RBTF9TSVpFX1BFUkNFTlRfREVTQzpcbiAgICAgICAgXCJBdWYga2xlaW5lbiBCaWxkc2NoaXJtZW4gKHouQi4gU21hcnRwaG9uZXMpIG9kZXIgYmVpIHNlaHIgZ3Jvc3NlbiBCaWxkZXJuIHNvbGx0ZSBkaWVzZXIgV2VydCBhdWYgMTAwJSBnZXNldHp0IHdlcmRlbi5cIixcbiAgICBSRVNFVF9ERUZBVUxUOiBcIlN0YW5kYXJkZWluc3RlbGx1bmcgd2llZGVyaGVyc3RlbGxlblwiLFxuICAgIENBUkRfTU9EQUxfV0lEVEhfUEVSQ0VOVDogXCJCcmVpdGUgZWluZXIgTGVybmthcnRlIGluIFByb3plbnRcIixcbiAgICBSQU5ET01JWkVfQ0FSRF9PUkRFUjogXCJXXHUwMEU0aHJlbmQgZGVyIFdpZWRlcmhvdW5nIGRpZSBSZWloZW5mb2xnZSB6dWZcdTAwRTRsbGlnIG1pc2NoZW4/XCIsXG4gICAgRElTQUJMRV9DTE9aRV9DQVJEUzogXCJMXHUwMEZDY2tlbnRleHRrYXJ0ZW4gKGNsb3plIGRlbGV0aW9ucykgZGVha3RpdmllcmVuP1wiLFxuICAgIENPTlZFUlRfSElHSExJR0hUU19UT19DTE9aRVM6IFwiPT1IZXJ2b3JnZWhvYmVuZW49PSBUZXh0IGluIExcdTAwRkNja2VudGV4dGthcnRlbiB1bXdhbmRlbG4/XCIsXG4gICAgQ09OVkVSVF9CT0xEX1RFWFRfVE9fQ0xPWkVTOiBcIioqRmV0dGdlZHJ1Y2t0ZW4qKiBUZXh0IGluIExcdTAwRkNja2VudGV4dGthcnRlbiB1bXdhbmRlbG4/XCIsXG4gICAgQ09OVkVSVF9DVVJMWV9CUkFDS0VUU19UT19DTE9aRVM6XG4gICAgICAgIFwie3tHZXNjaHdlaWZ0ZSBLbGFtbWVybn19IFRleHQgaW4gTFx1MDBGQ2NrZW50ZXh0a2FydGVuIHVtd2FuZGVsbj9cIixcbiAgICBJTkxJTkVfQ0FSRFNfU0VQQVJBVE9SOiBcIlRyZW5uemVpY2hlbiBmXHUwMEZDciBlaW56ZWlsaWdlIExlcm5rYXJ0ZW5cIixcbiAgICBGSVhfU0VQQVJBVE9SU19NQU5VQUxMWV9XQVJOSU5HOlxuICAgICAgICBcIldlbm4gZGllc2UgRWluc3RlbGx1bmcgZ2VcdTAwRTRuZGVydCB3aXJkLCBkYW5uIG1cdTAwRkNzc2VuIGRpZSBlbnRzcHJlY2hlbmRlbiBMZXJua2FydGVuIG1hbnVlbGwgYW5nZXBhc3N0IHdlcmRlbi5cIixcbiAgICBJTkxJTkVfUkVWRVJTRURfQ0FSRFNfU0VQQVJBVE9SOiBcIlRyZW5uemVpY2hlbiBmXHUwMEZDciBlaW56ZWlsaWdlIGJlaWRzZWl0aWdlIExlcm5rYXJ0ZW5cIixcbiAgICBNVUxUSUxJTkVfQ0FSRFNfU0VQQVJBVE9SOiBcIlRyZW5uemVpY2hlbiBmXHUwMEZDciBtZWhyemVpbGlnZSBMZXJua2FydGVuXCIsXG4gICAgTVVMVElMSU5FX1JFVkVSU0VEX0NBUkRTX1NFUEFSQVRPUjogXCJUcmVubnplaWNoZW4gZlx1MDBGQ3IgbWVocnplaWxpZ2UgYmVpZHNlaXRpZ2UgTGVybmthcnRlblwiLFxuICAgIE5PVEVTOiBcIk5vdGl6ZW5cIixcbiAgICBSRVZJRVdfUEFORV9PTl9TVEFSVFVQOiBcIkVuYWJsZSBub3RlIHJldmlldyBwYW5lIG9uIHN0YXJ0dXBcIixcbiAgICBUQUdTX1RPX1JFVklFVzogXCJadSB3aWVkZXJob2xlbmRlIFRhZ3NcIixcbiAgICBUQUdTX1RPX1JFVklFV19ERVNDOlxuICAgICAgICBcIk1laHJlcmUgVGFncyBrXHUwMEY2bm5lbiBtaXQgTGVlcnplaWNoZW4gb2RlciBaZWlsZW51bWJyXHUwMEZDY2hlbiBnZXRyZW5udCBhbmdlZ2ViZW4gd2VyZGVuLiBCc3AuICNrYXJ0ZSAjdGFnMSAjdGFnMi5cIixcbiAgICBPUEVOX1JBTkRPTV9OT1RFOiBcIlp1Zlx1MDBFNGxsaWdlIEthcnRlbiB3aWVkZXJob2xlblwiLFxuICAgIE9QRU5fUkFORE9NX05PVEVfREVTQzpcbiAgICAgICAgXCJXZW5uIGRpZXMgZGVha3RpdmllcnQgd2lyZCwgZGFubiB3ZXJkZW4gZGllIE5vdGl6ZW4gbmFjaCBXaWNodGlna2VpdCB3aWVkZXJob2x0IChQYWdlUmFuaykuXCIsXG4gICAgQVVUT19ORVhUX05PVEU6IFwiTmFjaCBlaW5lciBXaWVkZXJob2x1bmcgYXV0b21hdGlzY2ggZGllIG5cdTAwRTRjaHN0ZSBLYXJ0ZSBcdTAwRjZmZm5lblwiLFxuICAgIERJU0FCTEVfRklMRV9NRU5VX1JFVklFV19PUFRJT05TOlxuICAgICAgICBcIk9wdGlvbmVuIHp1ciBXaWVkZXJob2x1bmcgaW0gTWVuXHUwMEZDIGVpbmVyIERhdGVpIGRlYWt0aXZpZXJlbi4gQnNwLiBXaWVkZXJob2xlbjogRWluZmFjaCBHdXQgU2Nod2VyXCIsXG4gICAgRElTQUJMRV9GSUxFX01FTlVfUkVWSUVXX09QVElPTlNfREVTQzpcbiAgICAgICAgXCJOYWNoIGRlbSBEZWFrdGl2aWVyZW4ga1x1MDBGNm5uZW4gZGllIFRhc3RlbmtcdTAwRkNyemVsIHp1ciBXaWVkZXJob2x1bmcgdmVyd2VuZGV0IHdlcmRlbi4gT2JzaWRpYW4gbXVzcyBuYWNoIGVpbmVyIFx1MDBDNG5kZXJ1bmcgbmV1IGdlbGFkZW4gd2VyZW4uXCIsXG4gICAgTUFYX05fREFZU19SRVZJRVdfUVVFVUU6XG4gICAgICAgIFwiTWF4aW1hbGUgQW56YWhsIGFuc3RlaGVuZGVyIE5vdGl6ZW4sIGRpZSBpbSByZWNodGVuIEZlbnN0ZXJiZXJlaWNoIGFuZ2V6ZWlndCB3ZXJkZW5cIixcbiAgICBNSU5fT05FX0RBWTogXCJBbnphaGwgZGVyIFRhZ2UgbXVzcyBtaW5kZXN0ZW5zIDEgc2Vpbi5cIixcbiAgICBWQUxJRF9OVU1CRVJfV0FSTklORzogXCJCaXR0ZSBlaW5lIGdcdTAwRkNsdGlnZSBaYWhsIGVpbmdlYmVuLlwiLFxuICAgIFVJX1BSRUZFUkVOQ0VTOiBcIkVpbnN0ZWxsdW5nZW4gZGVyIEJlbnV0emVyb2JlcmZsXHUwMEU0Y2hlXCIsXG4gICAgSU5JVElBTExZX0VYUEFORF9TVUJERUNLU19JTl9UUkVFOiBcIkRlY2tiXHUwMEU0dW1lIHNvbGx0ZW4gYW5mXHUwMEU0bmdsaWNoIGVyd2VpdGVydCBhbmdlemVpZ3Qgd2VyZGVuXCIsXG4gICAgSU5JVElBTExZX0VYUEFORF9TVUJERUNLU19JTl9UUkVFX0RFU0M6XG4gICAgICAgIFwiRGVha3RpdmllcmVuIFNpZSBkaWVzLCB1bSB2ZXJzY2hhY2h0ZWx0ZSBEZWNrcyBpbiBkZXJzZWxiZW4gS2FydGUgenUgcmVkdXppZXJlbi4gTlx1MDBGQ3R6bGljaCwgd2VubiBTaWUgS2FydGVuIGhhYmVuLCBkaWUgenUgdmllbGVuIERlY2tzIGluIGRlcnNlbGJlbiBEYXRlaSBnZWhcdTAwRjZyZW4uXCIsXG4gICAgQUxHT1JJVEhNOiBcIkFsZ29yaXRobXVzXCIsXG4gICAgQ0hFQ0tfQUxHT1JJVEhNX1dJS0k6XG4gICAgICAgICdXZWl0ZXJmXHUwMEZDaHJlbmRlIEluZm9ybWF0aW9uZW46IDxhIGhyZWY9XCIke2FsZ29fdXJsfVwiPkltcGxlbWVudGllcnVuZyBkZXMgQWxnb3JpdGhtdXM8L2E+IChlbmdsaXNoKS4nLFxuICAgIEJBU0VfRUFTRTogXCJCYXNpcyBkZXIgRWluZmFjaGhlaXRcIixcbiAgICBCQVNFX0VBU0VfREVTQzogXCJNaW5pbXVtIGlzdCAxMzAuIEVtcGZvaGxlbiB3aXJkIGNhLiAyNTAuXCIsXG4gICAgQkFTRV9FQVNFX01JTl9XQVJOSU5HOiBcIkJhc2lzIGRlciBFaW5mYWNoaGVpdCBtdXNzIG1pbmRlc3RlbnMgMTMwIHNlaW4uXCIsXG4gICAgTEFQU0VfSU5URVJWQUxfQ0hBTkdFOlxuICAgICAgICBcIkFucGFzc3VuZ3NmYWt0b3IgZGVzIEludGVydmFsbHMgd2VubiBlaW5lIE5vdGl6IC8gS2FydGUgJ1NjaHdlcicgYWJnZXNjaGxvc3NlbiB3aXJkXCIsXG4gICAgTEFQU0VfSU5URVJWQUxfQ0hBTkdFX0RFU0M6IFwibmV1ZXNJbnRlcnZhbGwgPSBhbHRlc0ludGVydmFsbCAqIGFucGFzc3VuZ3NmYWt0b3IgLyAxMDAuXCIsXG4gICAgRUFTWV9CT05VUzogXCJFaW5mYWNoaGVpdC1Cb251c1wiLFxuICAgIEVBU1lfQk9OVVNfREVTQzpcbiAgICAgICAgXCJEZXIgRWluZmFjaGhlaXQtQm9udXMgZ2lidCBhbiB1bSB3ZWxjaGVuIEZha3RvciAoaW4gUHJvemVudCkgZGFzIEludGVydmFsbCBsXHUwMEU0bmdlciBzZWluIHNvbGwsIHdlbm4gZWluZSBOb3RpeiAvIEthcnRlICdFaW5mYWNoJyBzdGF0dCAnR3V0JyBhYmdlc2NobG9zc2VuIHdpcmQuIE1pbmltdW0gaXN0IDEwMCUuXCIsXG4gICAgRUFTWV9CT05VU19NSU5fV0FSTklORzogXCJEZXIgRWluZmFjaGhlaXQtQm9udXMgbXVzcyBtaW5kZXN0ZW5zIDEwMCBzZWluLlwiLFxuICAgIE1BWF9JTlRFUlZBTDogXCJNYXhpbXVtIGludGVydmFsIGluIGRheXNcIixcbiAgICBNQVhfSU5URVJWQUxfREVTQzpcbiAgICAgICAgXCJEYXMgbWF4aW1hbGUgSW50ZXJ2YWxsIChpbiBUYWdlbikgZlx1MDBGQ3IgV2llZGVyaG9sdW5nZW4uIFN0YW5kYXJkIHNpbmQgMTAwIEphaHJlLlwiLFxuICAgIE1BWF9JTlRFUlZBTF9NSU5fV0FSTklORzogXCJEYXMgbWF4aW1hbGUgSW50ZXJhbGwgbXVzcyBtaW5kZXN0ZW5zIGVpbiBUYWcgc2Vpbi5cIixcbiAgICBNQVhfTElOS19DT05UUklCOiBcIk1heGltYWxlciBFaW5mbHVzcyB2b24gTGlua3NcIixcbiAgICBNQVhfTElOS19DT05UUklCX0RFU0M6XG4gICAgICAgIFwiTWF4aW1hbGVyIEVpbmZsdXNzIGRlciBFaW5mYWNoaGVpdGVuIHZlcmxpbmt0ZXIgTm90aXplbiB6dXIgZ2V3aWNodGV0ZW4gaW5pdGlhbGVuIEVpbmZhY2hoZWl0IGVpbmVyIG5ldWVuIExlcm5rYXJ0ZS5cIixcbiAgICBMT0dHSU5HOiBcIkxvZ2dpbmdcIixcbiAgICBESVNQTEFZX0RFQlVHX0lORk86IFwiSW5mb3JtYXRpb25lbiB6dW0gRGVidWdnaW5nIGluIGRlciBFbnR3aWNrbGVya29uc29sZSBhbnplaWdlbj9cIixcblxuICAgIC8vIHNpZGViYXIudHNcbiAgICBOT1RFU19SRVZJRVdfUVVFVUU6IFwiQW5zdGVoZW5kZSBOb3RpemVuIHp1ciBXaWVkZXJob2x1bmdcIixcbiAgICBDTE9TRTogXCJTY2hsaWVzc2VuXCIsXG4gICAgTkVXOiBcIk5ldVwiLFxuICAgIFlFU1RFUkRBWTogXCJHZXN0ZXJuXCIsXG4gICAgVE9EQVk6IFwiSGV1dGVcIixcbiAgICBUT01PUlJPVzogXCJNb3JnZW5cIixcblxuICAgIC8vIHN0YXRzLW1vZGFsLnRzeFxuICAgIFNUQVRTX1RJVExFOiBcIlN0YXRpc3Rpa2VuXCIsXG4gICAgTU9OVEg6IFwiTW9udGhcIixcbiAgICBRVUFSVEVSOiBcIlF1YXJ0ZXJcIixcbiAgICBZRUFSOiBcIlllYXJcIixcbiAgICBMSUZFVElNRTogXCJMaWZldGltZVwiLFxuICAgIEZPUkVDQVNUOiBcIlByb2dub3NlXCIsXG4gICAgRk9SRUNBU1RfREVTQzogXCJBbnphaGwgZGVyIGtcdTAwRkNuZnRpZyBhbnN0ZWhlbmRlbiBLYXJ0ZW5cIixcbiAgICBTQ0hFRFVMRUQ6IFwiQW5zdGVoZW5kXCIsXG4gICAgREFZUzogXCJUYWdlXCIsXG4gICAgTlVNQkVSX09GX0NBUkRTOiBcIkFuemFobCBkZXIgS2FydGVuXCIsXG4gICAgUkVWSUVXU19QRVJfREFZOiBcIkR1cmNoc2Nobml0dDogJHthdmd9IFdpZWRlcmhvbHVuZ2VuL1RhZ1wiLFxuICAgIElOVEVSVkFMUzogXCJJbnRlcnZhbGxlXCIsXG4gICAgSU5URVJWQUxTX0RFU0M6IFwiSW50ZXJ2YWxsZSBiaXMgV2llZGVyaG9sdW5nZW4gYW5zdGVoZW5cIixcbiAgICBDT1VOVDogXCJBbnphaGxcIixcbiAgICBJTlRFUlZBTFNfU1VNTUFSWTogXCJEdXJjaHNjaG5pdHRsaWNoZXMgSW50ZXJ2YWxsOiAke2F2Z30sIExcdTAwRTRuZ3N0ZXMgSW50ZXJ2YWxsOiAke2xvbmdlc3R9XCIsXG4gICAgRUFTRVM6IFwiRWluZmFjaGhlaXRcIixcbiAgICBFQVNFU19TVU1NQVJZOiBcIkR1cmNoc2Nobml0dGxpY2hlIEVpbmZhY2hoZWl0OiAke2F2Z0Vhc2V9XCIsXG4gICAgQ0FSRF9UWVBFUzogXCJLYXRlZ29yaXNpZXJ1bmdcIixcbiAgICBDQVJEX1RZUEVTX0RFU0M6IFwiVmVybGVndGUgS2FydGVuIGVpbmdlc2NobG9zc2VuXCIsXG4gICAgQ0FSRF9UWVBFX05FVzogXCJOZXVcIixcbiAgICBDQVJEX1RZUEVfWU9VTkc6IFwiSnVuZ1wiLFxuICAgIENBUkRfVFlQRV9NQVRVUkU6IFwiQXVzZ2VyZWlmdFwiLFxuICAgIENBUkRfVFlQRVNfU1VNTUFSWTogXCJJbnNnZXNhbXQgJHt0b3RhbENhcmRzQ291bnR9IEthcnRlblwiLFxufTtcbiIsICIvLyBFbmdsaXNoXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICAvLyBmbGFzaGNhcmQtbW9kYWwudHN4XG4gICAgREVDS1M6IFwiRGVja3NcIixcbiAgICBEVUVfQ0FSRFM6IFwiRHVlIENhcmRzXCIsXG4gICAgTkVXX0NBUkRTOiBcIk5ldyBDYXJkc1wiLFxuICAgIFRPVEFMX0NBUkRTOiBcIlRvdGFsIENhcmRzXCIsXG4gICAgQkFDSzogXCJCYWNrXCIsXG4gICAgU0tJUDogXCJTa2lwXCIsXG4gICAgRURJVF9DQVJEOiBcIkVkaXQgQ2FyZFwiLFxuICAgIFJFU0VUX0NBUkRfUFJPR1JFU1M6IFwiUmVzZXQgY2FyZCdzIHByb2dyZXNzXCIsXG4gICAgSEFSRDogXCJIYXJkXCIsXG4gICAgR09PRDogXCJHb29kXCIsXG4gICAgRUFTWTogXCJFYXN5XCIsXG4gICAgU0hPV19BTlNXRVI6IFwiU2hvdyBBbnN3ZXJcIixcbiAgICBDQVJEX1BST0dSRVNTX1JFU0VUOiBcIkNhcmQncyBwcm9ncmVzcyBoYXMgYmVlbiByZXNldC5cIixcbiAgICBTQVZFOiBcIlNhdmVcIixcbiAgICBDQU5DRUw6IFwiQ2FuY2VsXCIsXG4gICAgTk9fSU5QVVQ6IFwiTm8gaW5wdXQgcHJvdmlkZWQuXCIsXG4gICAgQ1VSUkVOVF9FQVNFX0hFTFBfVEVYVDogXCJDdXJyZW50IEVhc2U6IFwiLFxuICAgIENVUlJFTlRfSU5URVJWQUxfSEVMUF9URVhUOiBcIkN1cnJlbnQgSW50ZXJ2YWw6IFwiLFxuICAgIENBUkRfR0VORVJBVEVEX0ZST006IFwiR2VuZXJhdGVkIGZyb206ICR7bm90ZVBhdGh9XCIsXG5cbiAgICAvLyBtYWluLnRzXG4gICAgT1BFTl9OT1RFX0ZPUl9SRVZJRVc6IFwiT3BlbiBhIG5vdGUgZm9yIHJldmlld1wiLFxuICAgIFJFVklFV19DQVJEUzogXCJSZXZpZXcgZmxhc2hjYXJkc1wiLFxuICAgIFJFVklFV19FQVNZX0ZJTEVfTUVOVTogXCJSZXZpZXc6IEVhc3lcIixcbiAgICBSRVZJRVdfR09PRF9GSUxFX01FTlU6IFwiUmV2aWV3OiBHb29kXCIsXG4gICAgUkVWSUVXX0hBUkRfRklMRV9NRU5VOiBcIlJldmlldzogSGFyZFwiLFxuICAgIFJFVklFV19OT1RFX0VBU1lfQ01EOiBcIlJldmlldyBub3RlIGFzIGVhc3lcIixcbiAgICBSRVZJRVdfTk9URV9HT09EX0NNRDogXCJSZXZpZXcgbm90ZSBhcyBnb29kXCIsXG4gICAgUkVWSUVXX05PVEVfSEFSRF9DTUQ6IFwiUmV2aWV3IG5vdGUgYXMgaGFyZFwiLFxuICAgIENSQU1fQUxMX0NBUkRTOiBcIlNlbGVjdCBhIGRlY2sgdG8gY3JhbVwiLFxuICAgIFJFVklFV19BTExfQ0FSRFM6IFwiUmV2aWV3IGZsYXNoY2FyZHMgZnJvbSBhbGwgbm90ZXNcIixcbiAgICBSRVZJRVdfQ0FSRFNfSU5fTk9URTogXCJSZXZpZXcgZmxhc2hjYXJkcyBpbiB0aGlzIG5vdGVcIixcbiAgICBDUkFNX0NBUkRTX0lOX05PVEU6IFwiQ3JhbSBmbGFzaGNhcmRzIGluIHRoaXMgbm90ZVwiLFxuICAgIFZJRVdfU1RBVFM6IFwiVmlldyBzdGF0aXN0aWNzXCIsXG4gICAgU1RBVFVTX0JBUjogXCJSZXZpZXc6ICR7ZHVlTm90ZXNDb3VudH0gbm90ZShzKSwgJHtkdWVGbGFzaGNhcmRzQ291bnR9IGNhcmQocykgZHVlXCIsXG4gICAgU1lOQ19USU1FX1RBS0VOOiBcIlN5bmMgdG9vayAke3R9bXNcIixcbiAgICBOT1RFX0lOX0lHTk9SRURfRk9MREVSOiBcIk5vdGUgaXMgc2F2ZWQgdW5kZXIgaWdub3JlZCBmb2xkZXIgKGNoZWNrIHNldHRpbmdzKS5cIixcbiAgICBQTEVBU0VfVEFHX05PVEU6IFwiUGxlYXNlIHRhZyB0aGUgbm90ZSBhcHByb3ByaWF0ZWx5IGZvciByZXZpZXdpbmcgKGluIHNldHRpbmdzKS5cIixcbiAgICBSRVNQT05TRV9SRUNFSVZFRDogXCJSZXNwb25zZSByZWNlaXZlZC5cIixcbiAgICBOT19ERUNLX0VYSVNUUzogXCJObyBkZWNrIGV4aXN0cyBmb3IgJHtkZWNrTmFtZX1cIixcbiAgICBBTExfQ0FVR0hUX1VQOiBcIllvdSdyZSBhbGwgY2F1Z2h0IHVwIG5vdyA6RC5cIixcblxuICAgIC8vIHNjaGVkdWxpbmcudHNcbiAgICBEQVlTX1NUUl9JVkw6IFwiJHtpbnRlcnZhbH0gZGF5KHMpXCIsXG4gICAgTU9OVEhTX1NUUl9JVkw6IFwiJHtpbnRlcnZhbH0gbW9udGgocylcIixcbiAgICBZRUFSU19TVFJfSVZMOiBcIiR7aW50ZXJ2YWx9IHllYXIocylcIixcbiAgICBEQVlTX1NUUl9JVkxfTU9CSUxFOiBcIiR7aW50ZXJ2YWx9ZFwiLFxuICAgIE1PTlRIU19TVFJfSVZMX01PQklMRTogXCIke2ludGVydmFsfW1cIixcbiAgICBZRUFSU19TVFJfSVZMX01PQklMRTogXCIke2ludGVydmFsfXlcIixcblxuICAgIC8vIHNldHRpbmdzLnRzXG4gICAgU0VUVElOR1NfSEVBREVSOiBcIlNwYWNlZCBSZXBldGl0aW9uIFBsdWdpbiAtIFNldHRpbmdzXCIsXG4gICAgQ0hFQ0tfV0lLSTogJ0ZvciBtb3JlIGluZm9ybWF0aW9uLCBjaGVjayB0aGUgPGEgaHJlZj1cIiR7d2lraV91cmx9XCI+d2lraTwvYT4uJyxcbiAgICBGT0xERVJTX1RPX0lHTk9SRTogXCJGb2xkZXJzIHRvIGlnbm9yZVwiLFxuICAgIEZPTERFUlNfVE9fSUdOT1JFX0RFU0M6IFwiRW50ZXIgZm9sZGVyIHBhdGhzIHNlcGFyYXRlZCBieSBuZXdsaW5lcyBpLmUuIFRlbXBsYXRlcyBNZXRhL1NjcmlwdHNcIixcbiAgICBGTEFTSENBUkRTOiBcIkZsYXNoY2FyZHNcIixcbiAgICBGTEFTSENBUkRfRUFTWV9MQUJFTDogXCJFYXN5IEJ1dHRvbiBUZXh0XCIsXG4gICAgRkxBU0hDQVJEX0dPT0RfTEFCRUw6IFwiR29vZCBCdXR0b24gVGV4dFwiLFxuICAgIEZMQVNIQ0FSRF9IQVJEX0xBQkVMOiBcIkhhcmQgQnV0dG9uIFRleHRcIixcbiAgICBGTEFTSENBUkRfRUFTWV9ERVNDOiAnQ3VzdG9taXplIHRoZSBsYWJlbCBmb3IgdGhlIFwiRWFzeVwiIEJ1dHRvbicsXG4gICAgRkxBU0hDQVJEX0dPT0RfREVTQzogJ0N1c3RvbWl6ZSB0aGUgbGFiZWwgZm9yIHRoZSBcIkdvb2RcIiBCdXR0b24nLFxuICAgIEZMQVNIQ0FSRF9IQVJEX0RFU0M6ICdDdXN0b21pemUgdGhlIGxhYmVsIGZvciB0aGUgXCJIYXJkXCIgQnV0dG9uJyxcbiAgICBGTEFTSENBUkRfVEFHUzogXCJGbGFzaGNhcmQgdGFnc1wiLFxuICAgIEZMQVNIQ0FSRF9UQUdTX0RFU0M6XG4gICAgICAgIFwiRW50ZXIgdGFncyBzZXBhcmF0ZWQgYnkgc3BhY2VzIG9yIG5ld2xpbmVzIGkuZS4gI2ZsYXNoY2FyZHMgI2RlY2syICNkZWNrMy5cIixcbiAgICBDT05WRVJUX0ZPTERFUlNfVE9fREVDS1M6IFwiQ29udmVydCBmb2xkZXJzIHRvIGRlY2tzIGFuZCBzdWJkZWNrcz9cIixcbiAgICBDT05WRVJUX0ZPTERFUlNfVE9fREVDS1NfREVTQzogXCJUaGlzIGlzIGFuIGFsdGVybmF0aXZlIHRvIHRoZSBGbGFzaGNhcmQgdGFncyBvcHRpb24gYWJvdmUuXCIsXG4gICAgSU5MSU5FX1NDSEVEVUxJTkdfQ09NTUVOVFM6XG4gICAgICAgIFwiU2F2ZSBzY2hlZHVsaW5nIGNvbW1lbnQgb24gdGhlIHNhbWUgbGluZSBhcyB0aGUgZmxhc2hjYXJkJ3MgbGFzdCBsaW5lP1wiLFxuICAgIElOTElORV9TQ0hFRFVMSU5HX0NPTU1FTlRTX0RFU0M6XG4gICAgICAgIFwiVHVybmluZyB0aGlzIG9uIHdpbGwgbWFrZSB0aGUgSFRNTCBjb21tZW50cyBub3QgYnJlYWsgbGlzdCBmb3JtYXR0aW5nLlwiLFxuICAgIEJVUllfU0lCTElOR1NfVElMTF9ORVhUX0RBWTogXCJCdXJ5IHNpYmxpbmcgY2FyZHMgdW50aWwgdGhlIG5leHQgZGF5P1wiLFxuICAgIEJVUllfU0lCTElOR1NfVElMTF9ORVhUX0RBWV9ERVNDOlxuICAgICAgICBcIlNpYmxpbmdzIGFyZSBjYXJkcyBnZW5lcmF0ZWQgZnJvbSB0aGUgc2FtZSBjYXJkIHRleHQgaS5lLiBjbG96ZSBkZWxldGlvbnNcIixcbiAgICBTSE9XX0NBUkRfQ09OVEVYVDogXCJTaG93IGNvbnRleHQgaW4gY2FyZHM/XCIsXG4gICAgU0hPV19DQVJEX0NPTlRFWFRfREVTQzogXCJpLmUuIFRpdGxlID4gSGVhZGluZyAxID4gU3ViaGVhZGluZyA+IC4uLiA+IFN1YmhlYWRpbmdcIixcbiAgICBDQVJEX01PREFMX0hFSUdIVF9QRVJDRU5UOiBcIkZsYXNoY2FyZCBIZWlnaHQgUGVyY2VudGFnZVwiLFxuICAgIENBUkRfTU9EQUxfU0laRV9QRVJDRU5UX0RFU0M6XG4gICAgICAgIFwiU2hvdWxkIGJlIHNldCB0byAxMDAlIG9uIG1vYmlsZSBvciBpZiB5b3UgaGF2ZSB2ZXJ5IGxhcmdlIGltYWdlc1wiLFxuICAgIFJFU0VUX0RFRkFVTFQ6IFwiUmVzZXQgdG8gZGVmYXVsdFwiLFxuICAgIENBUkRfTU9EQUxfV0lEVEhfUEVSQ0VOVDogXCJGbGFzaGNhcmQgV2lkdGggUGVyY2VudGFnZVwiLFxuICAgIFJBTkRPTUlaRV9DQVJEX09SREVSOiBcIlJhbmRvbWl6ZSBjYXJkIG9yZGVyIGR1cmluZyByZXZpZXc/XCIsXG4gICAgRElTQUJMRV9DTE9aRV9DQVJEUzogXCJEaXNhYmxlIGNsb3plIGNhcmRzP1wiLFxuICAgIENPTlZFUlRfSElHSExJR0hUU19UT19DTE9aRVM6IFwiQ29udmVydCA9PWhpZ2h0bGlnaHRzPT0gdG8gY2xvemVzP1wiLFxuICAgIENPTlZFUlRfQk9MRF9URVhUX1RPX0NMT1pFUzogXCJDb252ZXJ0ICoqYm9sZGVkIHRleHQqKiB0byBjbG96ZXM/XCIsXG4gICAgQ09OVkVSVF9DVVJMWV9CUkFDS0VUU19UT19DTE9aRVM6IFwiQ29udmVydCB7e2N1cmx5IGJyYWNrZXRzfX0gdG8gY2xvemVzP1wiLFxuICAgIElOTElORV9DQVJEU19TRVBBUkFUT1I6IFwiU2VwYXJhdG9yIGZvciBpbmxpbmUgZmxhc2hjYXJkc1wiLFxuICAgIEZJWF9TRVBBUkFUT1JTX01BTlVBTExZX1dBUk5JTkc6XG4gICAgICAgIFwiTm90ZSB0aGF0IGFmdGVyIGNoYW5naW5nIHRoaXMgeW91IGhhdmUgdG8gbWFudWFsbHkgZWRpdCBhbnkgZmxhc2hjYXJkcyB5b3UgYWxyZWFkeSBoYXZlLlwiLFxuICAgIElOTElORV9SRVZFUlNFRF9DQVJEU19TRVBBUkFUT1I6IFwiU2VwYXJhdG9yIGZvciBpbmxpbmUgcmV2ZXJzZWQgZmxhc2hjYXJkc1wiLFxuICAgIE1VTFRJTElORV9DQVJEU19TRVBBUkFUT1I6IFwiU2VwYXJhdG9yIGZvciBtdWx0aWxpbmUgZmxhc2hjYXJkc1wiLFxuICAgIE1VTFRJTElORV9SRVZFUlNFRF9DQVJEU19TRVBBUkFUT1I6IFwiU2VwYXJhdG9yIGZvciBtdWx0aWxpbmUgcmV2ZXJzZWQgZmxhc2hjYXJkc1wiLFxuICAgIE5PVEVTOiBcIk5vdGVzXCIsXG4gICAgUkVWSUVXX1BBTkVfT05fU1RBUlRVUDogXCJFbmFibGUgbm90ZSByZXZpZXcgcGFuZSBvbiBzdGFydHVwXCIsXG4gICAgVEFHU19UT19SRVZJRVc6IFwiVGFncyB0byByZXZpZXdcIixcbiAgICBUQUdTX1RPX1JFVklFV19ERVNDOiBcIkVudGVyIHRhZ3Mgc2VwYXJhdGVkIGJ5IHNwYWNlcyBvciBuZXdsaW5lcyBpLmUuICNyZXZpZXcgI3RhZzIgI3RhZzMuXCIsXG4gICAgT1BFTl9SQU5ET01fTk9URTogXCJPcGVuIGEgcmFuZG9tIG5vdGUgZm9yIHJldmlld1wiLFxuICAgIE9QRU5fUkFORE9NX05PVEVfREVTQzogXCJXaGVuIHlvdSB0dXJuIHRoaXMgb2ZmLCBub3RlcyBhcmUgb3JkZXJlZCBieSBpbXBvcnRhbmNlIChQYWdlUmFuaykuXCIsXG4gICAgQVVUT19ORVhUX05PVEU6IFwiT3BlbiBuZXh0IG5vdGUgYXV0b21hdGljYWxseSBhZnRlciBhIHJldmlld1wiLFxuICAgIERJU0FCTEVfRklMRV9NRU5VX1JFVklFV19PUFRJT05TOlxuICAgICAgICBcIkRpc2FibGUgcmV2aWV3IG9wdGlvbnMgaW4gdGhlIGZpbGUgbWVudSBpLmUuIFJldmlldzogRWFzeSBHb29kIEhhcmRcIixcbiAgICBESVNBQkxFX0ZJTEVfTUVOVV9SRVZJRVdfT1BUSU9OU19ERVNDOlxuICAgICAgICBcIkFmdGVyIGRpc2FibGluZywgeW91IGNhbiByZXZpZXcgdXNpbmcgdGhlIGNvbW1hbmQgaG90a2V5cy4gUmVsb2FkIE9ic2lkaWFuIGFmdGVyIGNoYW5naW5nIHRoaXMuXCIsXG4gICAgTUFYX05fREFZU19SRVZJRVdfUVVFVUU6IFwiTWF4aW11bSBudW1iZXIgb2YgZGF5cyB0byBkaXNwbGF5IG9uIHJpZ2h0IHBhbmVsXCIsXG4gICAgTUlOX09ORV9EQVk6IFwiVGhlIG51bWJlciBvZiBkYXlzIG11c3QgYmUgYXQgbGVhc3QgMS5cIixcbiAgICBWQUxJRF9OVU1CRVJfV0FSTklORzogXCJQbGVhc2UgcHJvdmlkZSBhIHZhbGlkIG51bWJlci5cIixcbiAgICBVSV9QUkVGRVJFTkNFUzogXCJVSSBQcmVmZXJlbmNlc1wiLFxuICAgIElOSVRJQUxMWV9FWFBBTkRfU1VCREVDS1NfSU5fVFJFRTogXCJEZWNrIHRyZWVzIHNob3VsZCBiZSBpbml0aWFsbHkgZGlzcGxheWVkIGFzIGV4cGFuZGVkXCIsXG4gICAgSU5JVElBTExZX0VYUEFORF9TVUJERUNLU19JTl9UUkVFX0RFU0M6XG4gICAgICAgIFwiVHVybiB0aGlzIG9mZiB0byBjb2xsYXBzZSBuZXN0ZWQgZGVja3MgaW4gdGhlIHNhbWUgY2FyZC4gVXNlZnVsIGlmIHlvdSBoYXZlIGNhcmRzIHdoaWNoIGJlbG9uZyB0byBtYW55IGRlY2tzIGluIHRoZSBzYW1lIGZpbGUuXCIsXG4gICAgQUxHT1JJVEhNOiBcIkFsZ29yaXRobVwiLFxuICAgIENIRUNLX0FMR09SSVRITV9XSUtJOlxuICAgICAgICAnRm9yIG1vcmUgaW5mb3JtYXRpb24sIGNoZWNrIHRoZSA8YSBocmVmPVwiJHthbGdvX3VybH1cIj5hbGdvcml0aG0gaW1wbGVtZW50YXRpb248L2E+LicsXG4gICAgQkFTRV9FQVNFOiBcIkJhc2UgZWFzZVwiLFxuICAgIEJBU0VfRUFTRV9ERVNDOiBcIm1pbmltdW0gPSAxMzAsIHByZWZlcnJhYmx5IGFwcHJveGltYXRlbHkgMjUwLlwiLFxuICAgIEJBU0VfRUFTRV9NSU5fV0FSTklORzogXCJUaGUgYmFzZSBlYXNlIG11c3QgYmUgYXQgbGVhc3QgMTMwLlwiLFxuICAgIExBUFNFX0lOVEVSVkFMX0NIQU5HRTogXCJJbnRlcnZhbCBjaGFuZ2Ugd2hlbiB5b3UgcmV2aWV3IGEgZmxhc2hjYXJkL25vdGUgYXMgaGFyZFwiLFxuICAgIExBUFNFX0lOVEVSVkFMX0NIQU5HRV9ERVNDOiBcIm5ld0ludGVydmFsID0gb2xkSW50ZXJ2YWwgKiBpbnRlcnZhbENoYW5nZSAvIDEwMC5cIixcbiAgICBFQVNZX0JPTlVTOiBcIkVhc3kgQm9udXNcIixcbiAgICBFQVNZX0JPTlVTX0RFU0M6XG4gICAgICAgIFwiVGhlIGVhc3kgYm9udXMgYWxsb3dzIHlvdSB0byBzZXQgdGhlIGRpZmZlcmVuY2UgaW4gaW50ZXJ2YWxzIGJldHdlZW4gYW5zd2VyaW5nIEdvb2QgYW5kIEVhc3kgb24gYSBmbGFzaGNhcmQvbm90ZSAobWluaW11bSA9IDEwMCUpLlwiLFxuICAgIEVBU1lfQk9OVVNfTUlOX1dBUk5JTkc6IFwiVGhlIGVhc3kgYm9udXMgbXVzdCBiZSBhdCBsZWFzdCAxMDAuXCIsXG4gICAgTUFYX0lOVEVSVkFMOiBcIk1heGltdW0gaW50ZXJ2YWwgaW4gZGF5c1wiLFxuICAgIE1BWF9JTlRFUlZBTF9ERVNDOiBcIkFsbG93cyB5b3UgdG8gcGxhY2UgYW4gdXBwZXIgbGltaXQgb24gdGhlIGludGVydmFsIChkZWZhdWx0ID0gMTAwIHllYXJzKS5cIixcbiAgICBNQVhfSU5URVJWQUxfTUlOX1dBUk5JTkc6IFwiVGhlIG1heGltdW0gaW50ZXJ2YWwgbXVzdCBiZSBhdCBsZWFzdCAxIGRheS5cIixcbiAgICBNQVhfTElOS19DT05UUklCOiBcIk1heGltdW0gbGluayBjb250cmlidXRpb25cIixcbiAgICBNQVhfTElOS19DT05UUklCX0RFU0M6XG4gICAgICAgIFwiTWF4aW11bSBjb250cmlidXRpb24gb2YgdGhlIHdlaWdodGVkIGVhc2Ugb2YgbGlua2VkIG5vdGVzIHRvIHRoZSBpbml0aWFsIGVhc2UuXCIsXG4gICAgTE9HR0lORzogXCJMb2dnaW5nXCIsXG4gICAgRElTUExBWV9ERUJVR19JTkZPOiBcIkRpc3BsYXkgZGVidWdnaW5nIGluZm9ybWF0aW9uIG9uIHRoZSBkZXZlbG9wZXIgY29uc29sZT9cIixcblxuICAgIC8vIHNpZGViYXIudHNcbiAgICBOT1RFU19SRVZJRVdfUVVFVUU6IFwiTm90ZXMgUmV2aWV3IFF1ZXVlXCIsXG4gICAgQ0xPU0U6IFwiQ2xvc2VcIixcbiAgICBORVc6IFwiTmV3XCIsXG4gICAgWUVTVEVSREFZOiBcIlllc3RlcmRheVwiLFxuICAgIFRPREFZOiBcIlRvZGF5XCIsXG4gICAgVE9NT1JST1c6IFwiVG9tb3Jyb3dcIixcblxuICAgIC8vIHN0YXRzLW1vZGFsLnRzeFxuICAgIFNUQVRTX1RJVExFOiBcIlN0YXRpc3RpY3NcIixcbiAgICBNT05USDogXCJNb250aFwiLFxuICAgIFFVQVJURVI6IFwiUXVhcnRlclwiLFxuICAgIFlFQVI6IFwiWWVhclwiLFxuICAgIExJRkVUSU1FOiBcIkxpZmV0aW1lXCIsXG4gICAgRk9SRUNBU1Q6IFwiRm9yZWNhc3RcIixcbiAgICBGT1JFQ0FTVF9ERVNDOiBcIlRoZSBudW1iZXIgb2YgY2FyZHMgZHVlIGluIHRoZSBmdXR1cmVcIixcbiAgICBTQ0hFRFVMRUQ6IFwiU2NoZWR1bGVkXCIsXG4gICAgREFZUzogXCJEYXlzXCIsXG4gICAgTlVNQkVSX09GX0NBUkRTOiBcIk51bWJlciBvZiBjYXJkc1wiLFxuICAgIFJFVklFV1NfUEVSX0RBWTogXCJBdmVyYWdlOiAke2F2Z30gcmV2aWV3cy9kYXlcIixcbiAgICBJTlRFUlZBTFM6IFwiSW50ZXJ2YWxzXCIsXG4gICAgSU5URVJWQUxTX0RFU0M6IFwiRGVsYXlzIHVudGlsIHJldmlld3MgYXJlIHNob3duIGFnYWluXCIsXG4gICAgQ09VTlQ6IFwiQ291bnRcIixcbiAgICBJTlRFUlZBTFNfU1VNTUFSWTogXCJBdmVyYWdlIGludGVydmFsOiAke2F2Z30sIExvbmdlc3QgaW50ZXJ2YWw6ICR7bG9uZ2VzdH1cIixcbiAgICBFQVNFUzogXCJFYXNlc1wiLFxuICAgIEVBU0VTX1NVTU1BUlk6IFwiQXZlcmFnZSBlYXNlOiAke2F2Z0Vhc2V9XCIsXG4gICAgQ0FSRF9UWVBFUzogXCJDYXJkIFR5cGVzXCIsXG4gICAgQ0FSRF9UWVBFU19ERVNDOiBcIlRoaXMgaW5jbHVkZXMgYnVyaWVkIGNhcmRzIGFzIHdlbGwsIGlmIGFueVwiLFxuICAgIENBUkRfVFlQRV9ORVc6IFwiTmV3XCIsXG4gICAgQ0FSRF9UWVBFX1lPVU5HOiBcIllvdW5nXCIsXG4gICAgQ0FSRF9UWVBFX01BVFVSRTogXCJNYXR1cmVcIixcbiAgICBDQVJEX1RZUEVTX1NVTU1BUlk6IFwiVG90YWwgY2FyZHM6ICR7dG90YWxDYXJkc0NvdW50fVwiLFxufTtcbiIsICIvLyBCcml0aXNoIEVuZ2xpc2hcblxuZXhwb3J0IGRlZmF1bHQge307XG4iLCAiLy8gU3BhbmlzaCAtIEVzcGFcdTAwRjFvbC5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIC8vIGZsYXNoY2FyZC1tb2RhbC50c3hcbiAgICBERUNLUzogXCJNYXpvc1wiLFxuICAgIERVRV9DQVJEUzogXCJUYXJqZXRhcyBWZW5jaWRhc1wiLFxuICAgIE5FV19DQVJEUzogXCJUYXJqZXRhcyBOdWV2YXNcIixcbiAgICBUT1RBTF9DQVJEUzogXCJUYXJqZXRhcyBUb3RhbGVzXCIsXG4gICAgQkFDSzogXCJBdHJcdTAwRTFzXCIsXG4gICAgU0tJUDogXCJTYWx0YXJcIixcbiAgICBFRElUX0NBUkQ6IFwiRWRpdGFyIFRhcmpldGFcIixcbiAgICBSRVNFVF9DQVJEX1BST0dSRVNTOiBcIlJlaW5pY2lhciBwcm9ncmVzbyBkZSBsYSB0YXJqZXRhXCIsXG4gICAgSEFSRDogXCJEaWZcdTAwRURjaWxcIixcbiAgICBHT09EOiBcIkJpZW5cIixcbiAgICBFQVNZOiBcIkZcdTAwRTFjaWxcIixcbiAgICBTSE9XX0FOU1dFUjogXCJNb3N0cmFyIFJlc3B1ZXN0YVwiLFxuICAgIENBUkRfUFJPR1JFU1NfUkVTRVQ6IFwiRWwgcHJvZ3Jlc28gZGUgbGEgdGFyamV0YSBzZSBoYSByZWluaWNpYWRvLlwiLFxuICAgIFNBVkU6IFwiR3VhcmRhclwiLFxuICAgIENBTkNFTDogXCJDYW5jZWxhclwiLFxuICAgIE5PX0lOUFVUOiBcIlNlIGhhIHByb3ZlXHUwMEVEZG8gZW50cmFkYS5cIixcbiAgICBDVVJSRU5UX0VBU0VfSEVMUF9URVhUOiBcIkZhY2lsaWRhZCBBY3R1YWw6IFwiLFxuICAgIENVUlJFTlRfSU5URVJWQUxfSEVMUF9URVhUOiBcIkludGVydmFsbyBBY3R1YWw6IFwiLFxuICAgIENBUkRfR0VORVJBVEVEX0ZST006IFwiR2VuZXJhZG8gRGVzZGU6ICR7bm90ZVBhdGh9XCIsXG5cbiAgICAvLyBtYWluLnRzXG4gICAgT1BFTl9OT1RFX0ZPUl9SRVZJRVc6IFwiQWJyaXIgbm90YSBwYXJhIHJldmlzaVx1MDBGM25cIixcbiAgICBSRVZJRVdfQ0FSRFM6IFwiUmV2aXNhciBUYXJqZXRhc1wiLFxuICAgIFJFVklFV19FQVNZX0ZJTEVfTUVOVTogXCJSZXZpc2FyOiBGXHUwMEUxY2lsXCIsXG4gICAgUkVWSUVXX0dPT0RfRklMRV9NRU5VOiBcIlJldmlzYXI6IEJpZW5cIixcbiAgICBSRVZJRVdfSEFSRF9GSUxFX01FTlU6IFwiUmV2aXNhcjogRGlmXHUwMEVEY2lsXCIsXG4gICAgUkVWSUVXX05PVEVfRUFTWV9DTUQ6IFwiUmV2aXNhciBub3RhIGNvbW8gZlx1MDBFMWNpbFwiLFxuICAgIFJFVklFV19OT1RFX0dPT0RfQ01EOiBcIlJldmlzYXIgbm90YSBjb21vIGJpZW5cIixcbiAgICBSRVZJRVdfTk9URV9IQVJEX0NNRDogXCJSZXZpc2FyIG5vdGEgY29tbyBkaWZcdTAwRURjaWxcIixcbiAgICBDUkFNX0FMTF9DQVJEUzogXCJTZWxlY2Npb25hIHVuIG1hem8gYSBtZW1vcml6YXJcIixcbiAgICBSRVZJRVdfQUxMX0NBUkRTOiBcIlJldmlzYXIgdGFyamV0YXMgZGUgdG9kYXMgbGFzIG5vdGFzXCIsXG4gICAgUkVWSUVXX0NBUkRTX0lOX05PVEU6IFwiUmV2aXNhciB0YXJqZXRhcyBlbiBlc3RhIG5vdGFcIixcbiAgICBDUkFNX0NBUkRTX0lOX05PVEU6IFwiTWVtb3JpemFyIHRhcmpldGFzIGVuIGVzdGEgbm90YVwiLFxuICAgIFZJRVdfU1RBVFM6IFwiVmVyIGVzdGFkXHUwMEVEc3RpY2FzXCIsXG4gICAgU1RBVFVTX0JBUjogXCJSZXZpc2FyOiAke2R1ZU5vdGVzQ291bnR9IG5vdGEocyksICR7ZHVlRmxhc2hjYXJkc0NvdW50fSB0YXJqZXRhcyB2ZW5jaWRhc1wiLFxuICAgIFNZTkNfVElNRV9UQUtFTjogXCJMYSBzaW5jcm9uaXphY2lcdTAwRjNuIHRvbVx1MDBGMyAke3R9IG1pbGlzZWd1bmRvc1wiLFxuICAgIE5PVEVfSU5fSUdOT1JFRF9GT0xERVI6IFwiTGEgbm90YSBlc3RcdTAwRTEgZ3VhcmRhZGEgZW4gdW4gZGlyZWN0b3JpbyBpZ25vcmFkbyAocmV2aXNhIGxvcyBhanVzdGVzKS5cIixcbiAgICBQTEVBU0VfVEFHX05PVEU6IFwiUG9yIGZhdm9yIGV0aXF1ZXRlIGFwcm9waWFkYW1lbnRlIGxhIG5vdGEgcGFyYSByZXZpc2lcdTAwRjNuIChlbiBsb3MgYWp1c3RlcykuXCIsXG4gICAgUkVTUE9OU0VfUkVDRUlWRUQ6IFwiUmVzcHVlc3RhIFJlY2liaWRhXCIsXG4gICAgTk9fREVDS19FWElTVFM6IFwiTm8gZXhpc3RlbiBtYXpvcyBwYXJhOiAke2RlY2tOYW1lfVwiLFxuICAgIEFMTF9DQVVHSFRfVVA6IFwiXHUwMEExRXN0XHUwMEUxcyBhbCBkXHUwMEVEYSEgXHVEODNEXHVERTAzXCIsXG5cbiAgICAvLyBzY2hlZHVsaW5nLnRzXG4gICAgREFZU19TVFJfSVZMOiBcIiR7aW50ZXJ2YWx9IGRcdTAwRURhKHMpXCIsXG4gICAgTU9OVEhTX1NUUl9JVkw6IFwiJHtpbnRlcnZhbH0gbWVzKGVzKVwiLFxuICAgIFlFQVJTX1NUUl9JVkw6IFwiJHtpbnRlcnZhbH0gYVx1MDBGMW8ocylcIixcbiAgICBEQVlTX1NUUl9JVkxfTU9CSUxFOiBcIiR7aW50ZXJ2YWx9ZFwiLFxuICAgIE1PTlRIU19TVFJfSVZMX01PQklMRTogXCIke2ludGVydmFsfW1cIixcbiAgICBZRUFSU19TVFJfSVZMX01PQklMRTogXCIke2ludGVydmFsfWFcIixcblxuICAgIC8vIHNldHRpbmdzLnRzXG4gICAgU0VUVElOR1NfSEVBREVSOiBcIkV4dGVuc2lcdTAwRjNuIGRlIFJlcGV0aWNpXHUwMEYzbiBFc3BhY2lhZGEgLSBBanVzdGVzXCIsXG4gICAgQ0hFQ0tfV0lLSTogJ1BhcmEgbVx1MDBFMXMgaW5mb3JtYWNpXHUwMEYzbiByZXZpc2EgbGEgPGEgaHJlZj1cIiR7d2lraV91cmx9XCI+d2lraTwvYT4uJyxcbiAgICBGT0xERVJTX1RPX0lHTk9SRTogXCJEaXJlY3RvcmlvcyBhIGlnbm9yYXJcIixcbiAgICBGT0xERVJTX1RPX0lHTk9SRV9ERVNDOlxuICAgICAgICBcIkVzY3JpYmEgbGFzIHJ1dGFzIGRlIGxvcyBkaXJlY3RvcmlvcyBzZXBhcmFkYXMgcG9yIHNhbHRvcyBkZSBsXHUwMEVEbmVhLCBwb3IgZWplbXBsbywgUGxhbnRpbGxhcyBFeHRyYS9HdWlvbmVzXCIsXG4gICAgRkxBU0hDQVJEUzogXCJUYXJqZXRhcyBkZSBNZW1vcml6YWNpXHUwMEYzblwiLFxuICAgIEZMQVNIQ0FSRF9FQVNZX0xBQkVMOiBcIlRleHRvIGRlbCBib3RcdTAwRjNuOiBGXHUwMEUxY2lsXCIsXG4gICAgRkxBU0hDQVJEX0dPT0RfTEFCRUw6IFwiVGV4dG8gZGVsIGJvdFx1MDBGM246IEJpZW5cIixcbiAgICBGTEFTSENBUkRfSEFSRF9MQUJFTDogXCJUZXh0byBkZWwgYm90XHUwMEYzbjogRGlmXHUwMEVEY2lsXCIsXG4gICAgRkxBU0hDQVJEX0VBU1lfREVTQzogXCJQZXJzb25hbGl6ZSBsYSBldGlxdWV0YSBwYXJhIGVsIGJvdFx1MDBGM246IEZcdTAwRTFjaWxcIixcbiAgICBGTEFTSENBUkRfR09PRF9ERVNDOiBcIlBlcnNvbmFsaXplIGxhIGV0aXF1ZXRhIHBhcmEgZWwgYm90XHUwMEYzbjogQmllblwiLFxuICAgIEZMQVNIQ0FSRF9IQVJEX0RFU0M6IFwiUGVyc29uYWxpemUgbGEgZXRpcXVldGEgcGFyYSBlbCBib3RcdTAwRjNuOiBEaWZcdTAwRURjaWxcIixcbiAgICBGTEFTSENBUkRfVEFHUzogXCJFdGlxdWV0YXMgZGUgbGFzIFRhcmpldGFzIGRlIE1lbW9yaXphY2lcdTAwRjNuXCIsXG4gICAgRkxBU0hDQVJEX1RBR1NfREVTQzpcbiAgICAgICAgXCJFc2NyaWJhIGxhcyBldGlxdWV0YXMgc2VwYXJhZGFzIHBvciBlc3BhY2lvcyBvIHNhbHRvcyBkZSBsXHUwMEVEbmVhLCBwb3IgZWplbXBsbywgI21lbW9yaXphciAjbWF6bzIgI21hem8zXCIsXG4gICAgQ09OVkVSVF9GT0xERVJTX1RPX0RFQ0tTOiBcIlx1MDBCRkNvbnZlcnRpciBkaXJlY3RvcmlvcyBhIG1hem9zIHkgc3VibWF6b3M/XCIsXG4gICAgQ09OVkVSVF9GT0xERVJTX1RPX0RFQ0tTX0RFU0M6XG4gICAgICAgIFwiRXN0YSBlcyB1bmEgb3BjaVx1MDBGM24gYWx0ZXJuYXRpdmEgYSBsYXMgZXRpcXVldGFzIGRlIGxhcyBUYXJqZXRhcyBkZSBNZW1vcml6YWNpXHUwMEYzbi5cIixcbiAgICBJTkxJTkVfU0NIRURVTElOR19DT01NRU5UUzpcbiAgICAgICAgXCJcdTAwQkZHdWFyZGFyIGVsIGNvbWVudGFyaW8gcGFyYSBwcm9ncmFtYWNpXHUwMEYzbiBkZSBsYXMgdGFyamV0YXMgZW4gbGEgXHUwMEZBbHRpbWEgbFx1MDBFRG5lYT9cIixcbiAgICBJTkxJTkVfU0NIRURVTElOR19DT01NRU5UU19ERVNDOlxuICAgICAgICBcIkFjdGl2YXIgZXN0byBoYXJcdTAwRTEgcXVlIGxvcyBjb21lbnRhcmlvcyBIVE1MIG5vIHJvbXBhbiBlbCBmb3JtYXRvIGRlIGxhcyBsaXN0YXMuXCIsXG4gICAgQlVSWV9TSUJMSU5HU19USUxMX05FWFRfREFZOiBcIlx1MDBCRkVudGVycmFyIHRhcmpldGFzIGhlcm1hbmFzIGhhc3RhIGVsIHNpZ3VpZW50ZSBkXHUwMEVEYT9cIixcbiAgICBCVVJZX1NJQkxJTkdTX1RJTExfTkVYVF9EQVlfREVTQzpcbiAgICAgICAgXCJMb3MgaGVybWFub3Mgc29uIHRhcmpldGFzIGdlbmVyYWRhcyBkZWwgbWlzbW8gdGV4dG8gZGUgbGEgdGFyamV0YSwgcG9yIGVqZW1wbG8sIGRlbGV0cmVvcyBkZSBodWVjb3MgKGNsb3plIGRlbGV0aW9ucyBlbiBpbmdsXHUwMEU5cylcIixcbiAgICBTSE9XX0NBUkRfQ09OVEVYVDogXCJcdTAwQkZNb3N0cmFyIGNvbnRleHRvIGVuIGxhcyB0YXJqZXRhcz9cIixcbiAgICBTSE9XX0NBUkRfQ09OVEVYVF9ERVNDOiBcIlBvciBFamVtcGxvOiBUXHUwMEVEdHVsbyA+IENhYmVjZXJhID4gU3ViLUNhYmVjZXJhID4gLi4uID4gU3ViLUNhYmVjZXJhXCIsXG4gICAgQ0FSRF9NT0RBTF9IRUlHSFRfUEVSQ0VOVDogXCJQb3JjZW50YWplIGRlIGxhIGFsdHVyYSBkZSBsYXMgdGFyamV0YXMgZGUgbWVtb3JpYVwiLFxuICAgIENBUkRfTU9EQUxfU0laRV9QRVJDRU5UX0RFU0M6IFwiRGViZXJcdTAwRURhIHNlciBlc3RhYmxlY2lkbyBlbiAxMDAlIHNpIHRpZW5lcyBpbVx1MDBFMWdlbmVzIGdyYW5kZXNcIixcbiAgICBSRVNFVF9ERUZBVUxUOiBcIlJlaW5pY2lhciBhIGxhIGNvbmZpZ3VyYWNpXHUwMEYzbiBwb3IgZGVmZWN0b1wiLFxuICAgIENBUkRfTU9EQUxfV0lEVEhfUEVSQ0VOVDogXCJQb3JjZW50YWplIGRlbCBhbmNobyBkZSBsYXMgdGFyamV0YXMgZGUgbWVtb3JpYVwiLFxuICAgIFJBTkRPTUlaRV9DQVJEX09SREVSOiBcIlx1MDBCRkFsZWF0b3JpemFyIGVsIG9yZGVuIGRlIGxhcyB0YXJqZXRhcyBwYXJhIHJldmlzaVx1MDBGM24/XCIsXG4gICAgRElTQUJMRV9DTE9aRV9DQVJEUzogXCJcdTAwQkZEZXNoYWJpbGl0YXIgZGVsZXRyZW8gZGUgaHVlY29zIGVuIGxhcyB0YXJqZXRhcz9cIixcbiAgICBDT05WRVJUX0hJR0hMSUdIVFNfVE9fQ0xPWkVTOiBcIlx1MDBCRkNvbnZlcnRpciA9PXJlc2FsdGFkb3M9PSBhIGRlbGV0cmVvIGRlIGh1ZWNvcz9cIixcbiAgICBDT05WRVJUX0JPTERfVEVYVF9UT19DTE9aRVM6IFwiXHUwMEJGQ29udmVydGlyICoqdGV4dG8gZW4gbmVncml0YSoqIGEgZGVsZXRyZW8gZGUgaHVlY29zP1wiLFxuICAgIENPTlZFUlRfQ1VSTFlfQlJBQ0tFVFNfVE9fQ0xPWkVTOiBcIlx1MDBCRkNvbnZlcnRpciB7e2xsYXZlcyByaXphZGFzfX0gYSBkZWxldHJlbyBkZSBodWVjb3M/XCIsXG4gICAgSU5MSU5FX0NBUkRTX1NFUEFSQVRPUjogXCJTZXBhcmFkb3IgZGUgdGFyamV0YXMgZGUgbWVtb3JpemFjaVx1MDBGM24gZW4gbFx1MDBFRG5lYVwiLFxuICAgIEZJWF9TRVBBUkFUT1JTX01BTlVBTExZX1dBUk5JTkc6XG4gICAgICAgIFwiTm90ZSBxdWUgZGVzcHVcdTAwRTlzIGRlIGNhbWJpYXIgZXN0ZSBhanVzdGUsIHRlbmRyXHUwMEUxIHF1ZSBjYW1iaWFyIG1hbnVhbG1lbnRlIHRvZGFzIGxhcyBub3RhcyBxdWUgdGVuZ2EuXCIsXG4gICAgSU5MSU5FX1JFVkVSU0VEX0NBUkRTX1NFUEFSQVRPUjpcbiAgICAgICAgXCJTZXBhcmFkb3IgZGUgdGFyamV0YXMgZGUgbWVtb3JpemFjaVx1MDBGM24gcGFyYSB0YXJqZXRhcyBkZSBub3RhcyBpbnZlcnRpZGFzXCIsXG4gICAgTVVMVElMSU5FX0NBUkRTX1NFUEFSQVRPUjogXCJTZXBhcmFkb3IgcGFyYSB0YXJqZXRhcyBkZSBtZW1vcml6YWNpXHUwMEYzbiBtdWx0aWxcdTAwRURuZWFcIixcbiAgICBNVUxUSUxJTkVfUkVWRVJTRURfQ0FSRFNfU0VQQVJBVE9SOlxuICAgICAgICBcIlNlcGFyYWRvciBwYXJhIHRhcmpldGFzIGRlIG1lbW9yaXphY2lcdTAwRjNuIG11bHRpbFx1MDBFRG5lYSBpbnZlcnRpZGFzXCIsXG4gICAgTk9URVM6IFwiTm90ZXNcIixcbiAgICBSRVZJRVdfUEFORV9PTl9TVEFSVFVQOiBcIkFjdGl2YXIgcGFuZWwgZGUgcmV2aXNpXHUwMEYzbiBkZSBub3RhcyBhbCBhcnJhbmNhclwiLFxuICAgIFRBR1NfVE9fUkVWSUVXOiBcIkV0aXF1ZXRhcyBhIHJldmlzYXJcIixcbiAgICBUQUdTX1RPX1JFVklFV19ERVNDOlxuICAgICAgICBcIkVzY3JpYmEgbGFzIGV0aXF1ZXRhcyBzZXBhcmFkYXMgcG9yIGVzcGFjaW9zIG8gc2FsdG9zIGRlIGxcdTAwRURuZWFzLCBwb3IgZWplbXBsbywgI3JldmlzaVx1MDBGM24gI2V0aXF1ZXRhMiAjZXRpcXVldGEzLlwiLFxuICAgIE9QRU5fUkFORE9NX05PVEU6IFwiQWJyaXIgdW5hIG5vdGEgYWwgYXphciBwYXJhIHJldmlzYXJcIixcbiAgICBPUEVOX1JBTkRPTV9OT1RFX0RFU0M6XG4gICAgICAgIFwiQ3VhbmRvIGRlc2hhYmlsaXRhIGVzdG8sIGxhcyBub3RhcyBzb24gb3JkZW5hZGFzIHBvciBpbXBvcnRhbmNpYSAoQWxnb3JpdG1vIFBhZ2VSYW5rKS5cIixcbiAgICBBVVRPX05FWFRfTk9URTogXCJBYnJpciBsYSBzaWd1aWVudGUgbm90YSBhdXRvbVx1MDBFMXRpY2FtZW50ZSBkZXNwdVx1MDBFOXMgZGUgdW5hIHJldmlzaVx1MDBGM25cIixcbiAgICBESVNBQkxFX0ZJTEVfTUVOVV9SRVZJRVdfT1BUSU9OUzpcbiAgICAgICAgXCJEZXNoYWJpbGl0YXIgb3BjaW9uZXMgZGUgcmV2aXNpXHUwMEYzbiBlbiBlbCBtZW5cdTAwRkEgZGUgYXJjaGl2bywgcG9yIGVqZW1wbG8sIFJldmlzaVx1MDBGM246IEZcdTAwRTFjaWwgQmllbiBEaWZcdTAwRURjaWxcIixcbiAgICBESVNBQkxFX0ZJTEVfTUVOVV9SRVZJRVdfT1BUSU9OU19ERVNDOlxuICAgICAgICBcIkRlc3B1XHUwMEU5cyBkZSBkZXNoYWJpbGl0YXJsbywgcHVlZGUgaGFjZXIgbGFzIHJldmlzaW9uZXMgdXRpbGl6YW5kbyBhdGFqb3MgZGUgdGVjbGFkby4gUmVpbmljaWUgT2JzaWRpYW4gZGVzcHVcdTAwRTlzIGRlIGNhbWJpYXIgZXN0by5cIixcbiAgICBNQVhfTl9EQVlTX1JFVklFV19RVUVVRTogXCJOXHUwMEZBbWVybyBtXHUwMEUxeGltbyBkZSBkXHUwMEVEYXMgYSBtb3N0cmFyIGVuIGVsIHBhbmVsIGRlcmVjaG8uXCIsXG4gICAgTUlOX09ORV9EQVk6IFwiRWwgblx1MDBGQW1lcm8gZGUgZFx1MDBFRGFzIGRlYmUgc2VyIGFsIG1lbm9zIHVuby5cIixcbiAgICBWQUxJRF9OVU1CRVJfV0FSTklORzogXCJQb3IgZmF2b3IgZXNwZWNpZmlxdWUgdW4gblx1MDBGQW1lcm8gdlx1MDBFMWxpZG8uXCIsXG4gICAgVUlfUFJFRkVSRU5DRVM6IFwiUHJlZmVyZW5jaWFzIGRlIGxhIGludGVyZmF6IGRlIHVzdWFyaW8uXCIsXG4gICAgSU5JVElBTExZX0VYUEFORF9TVUJERUNLU19JTl9UUkVFOiBcIkxvcyBcdTAwRTFyYm9sZXMgZGUgbWF6b3MgZGViZXJcdTAwRURhbiBzZXIgZXhwYW5kaWRvcyBhbCBpbmljaW8uXCIsXG4gICAgSU5JVElBTExZX0VYUEFORF9TVUJERUNLU19JTl9UUkVFX0RFU0M6XG4gICAgICAgIFwiRGVzYWN0aXZhIGVzdG8gcGFyYSBjb250cmFlciBtYXpvcyBhbmlkYWRvcyBlbiBsYSBtaXNtYSB0YXJqZXRhLiBcdTAwREF0aWwgc2kgdGllbmVzIHRhcmpldGFzIHF1ZSBwZXJ0ZW5lY2VuIGEgbXVjaG9zIG1hem9zIGVuIGVsIG1pc21vIGFyY2hpdm8uXCIsXG4gICAgQUxHT1JJVEhNOiBcIkFsZ29yaXRtb1wiLFxuICAgIENIRUNLX0FMR09SSVRITV9XSUtJOlxuICAgICAgICAnUGFyYSBtXHUwMEUxcyBpbmZvcm1hY2lcdTAwRjNuLCByZXZpc2EgbGEgPGEgaHJlZj1cIiR7YWxnb191cmx9XCI+aW1wbGVtZW50YWNpXHUwMEYzbiBkZWwgYWxnb3JpdG1vPC9hPi4nLFxuICAgIEJBU0VfRUFTRTogXCJCYXNlIGVhc2VcIixcbiAgICBCQVNFX0VBU0VfREVTQzogXCJFbCBtXHUwMEVEbmltbyBlcyAxMzAsIGVzIHByZWZlcmlibGUgcXVlIGVzdFx1MDBFOSBhcHJveGltYWRvIGEgMjUwLlwiLFxuICAgIEJBU0VfRUFTRV9NSU5fV0FSTklORzogXCJMYSBmYWNpbGlkYWQgYmFzZSBkZSBsYXMgdGFyamV0YXMgZGViZSBzZXIgYWwgbWVub3MgMTMwLlwiLFxuICAgIExBUFNFX0lOVEVSVkFMX0NIQU5HRTpcbiAgICAgICAgXCJFbCBpbnRlcnZhbG8gY2FtYmlhclx1MDBFMSBjdWFuZG8gc2UgcmV2aXNlIHVuYSB0YXJqZXRhIG8gbm90YSBjb21vIERpZlx1MDBFRGNpbC5cIixcbiAgICBMQVBTRV9JTlRFUlZBTF9DSEFOR0VfREVTQzogXCJOdWV2b0ludGVydmFsID0gVmllam9JbnRlcnZhbG8gKiBDYW1iaW9EZUludGVydmFsbyAvIDEwMC5cIixcbiAgICBFQVNZX0JPTlVTOiBcIkJvbmlmaWNhY2lcdTAwRjNuIHBhcmEgRlx1MDBFMWNpbFwiLFxuICAgIEVBU1lfQk9OVVNfREVTQzpcbiAgICAgICAgXCJMYSBib25pZmljYWNpXHUwMEYzbiBwYXJhIEZcdTAwRTFjaWwgdGUgcGVybWl0ZSBlc3RhYmxlY2VyIGxhIGRpZmVyZW5jaWEgZW50cmUgaW50ZXJ2YWxvcyBhbCByZXNwb25kZXIgQmllbiB5IEZcdTAwRTFjaWwgZW4gbGFzIHRhcmpldGFzIG8gbm90YXMgKG1cdTAwRURuaW1vID0gMTAwJSkuXCIsXG4gICAgRUFTWV9CT05VU19NSU5fV0FSTklORzogXCJFbCBib25vIGRlIGZhY2lsaWRhZCBkZWJlIHNlciBhbCBtZW5vcyAxMDAuXCIsXG4gICAgTUFYX0lOVEVSVkFMOiBcIkludGVydmFsbyBtXHUwMEUxeGltbyBlbiBkXHUwMEVEYXNcIixcbiAgICBNQVhfSU5URVJWQUxfREVTQzpcbiAgICAgICAgXCJUZSBwZXJtaXRlIGVzdGFibGVjZXIgdW4gbFx1MDBFRG1pdGUgbWF5b3IgZW4gZWwgaW50ZXJ2YWxvIChwb3IgZGVmZWN0byBlcyBkZSAxMDAgYVx1MDBGMW9zKS5cIixcbiAgICBNQVhfSU5URVJWQUxfTUlOX1dBUk5JTkc6IFwiRWwgaW50ZXJ2YWxvIG1cdTAwRTF4aW1vIGRlYmUgc2VyIGRlIGFsIG1lbm9zIHVuIGRcdTAwRURhLlwiLFxuICAgIE1BWF9MSU5LX0NPTlRSSUI6IFwiQ29udHJpYnVjaVx1MDBGM24gbVx1MDBFMXhpbWEgZGUgbGFzIG5vdGFzIHZpbmN1bGFkYXMuXCIsXG4gICAgTUFYX0xJTktfQ09OVFJJQl9ERVNDOlxuICAgICAgICBcIkNvbnRyaWJ1Y2lcdTAwRjNuIG1cdTAwRTF4aW1hIGRlIGxhIGZhY2lsaWRhZCBwb25kZXJhZGEgZGUgbGFzIG5vdGFzIHZpbmN1bGFkYXMgYSBsYSBmYWNpbGlkYWQgaW5pY2lhbC5cIixcbiAgICBMT0dHSU5HOiBcIlJlZ2lzdHJvXCIsXG4gICAgRElTUExBWV9ERUJVR19JTkZPOiBcIlx1MDBCRk1vc3RyYXIgaW5mb3JtYWNpXHUwMEYzbiBkZSBkZXB1cmFjaVx1MDBGM24gZW4gbGEgY29uc29sYSBkZSBkZXNhcnJvbGxhZG9yP1wiLFxuXG4gICAgLy8gc2lkZWJhci50c1xuICAgIE5PVEVTX1JFVklFV19RVUVVRTogXCJDb2xhIGRlIG5vdGFzIGEgcmV2aXNhclwiLFxuICAgIENMT1NFOiBcIkNlcnJhclwiLFxuICAgIE5FVzogXCJOdWV2b1wiLFxuICAgIFlFU1RFUkRBWTogXCJBeWVyXCIsXG4gICAgVE9EQVk6IFwiSG95XCIsXG4gICAgVE9NT1JST1c6IFwiTWFcdTAwRjFhbmFcIixcblxuICAgIC8vIHN0YXRzLW1vZGFsLnRzeFxuICAgIFNUQVRTX1RJVExFOiBcIkVzdGFkXHUwMEVEc3RpY2FzXCIsXG4gICAgTU9OVEg6IFwiTWVzXCIsXG4gICAgUVVBUlRFUjogXCJUcmltZXN0cmUgbyBDdWF0cmltZXN0cmVcIiwgLy8gRW4gSW5nbFx1MDBFOXM6IFF1YXJ0ZXIuXG4gICAgWUVBUjogXCJBXHUwMEYxb1wiLFxuICAgIExJRkVUSU1FOiBcIlRpZW1wbyBkZSBWaWRhXCIsXG4gICAgRk9SRUNBU1Q6IFwiUHJvblx1MDBGM3N0aWNvXCIsXG4gICAgRk9SRUNBU1RfREVTQzogXCJFbCBuXHUwMEZBbWVybyBkZSB0YXJqZXRhcyB2ZW5jaWRhcyBlbiBlbCBmdXR1cm9cIixcbiAgICBTQ0hFRFVMRUQ6IFwiUHJvZ3JhbWFkb1wiLFxuICAgIERBWVM6IFwiRFx1MDBFRGFzXCIsXG4gICAgTlVNQkVSX09GX0NBUkRTOiBcIk5cdTAwRkFtZXJvIGRlIHRhcmpldGFzXCIsXG4gICAgUkVWSUVXU19QRVJfREFZOiBcIkNhcmdhOiAke2F2Z30gUmV2aXNpb25lcyBwb3IgZFx1MDBFRGFcIixcbiAgICBJTlRFUlZBTFM6IFwiSW50ZXJ2YWxvc1wiLFxuICAgIElOVEVSVkFMU19ERVNDOiBcIlJldHJhc29zIGhhc3RhIHF1ZSBsYXMgcmV2aXNpb25lcyBzZSBtdWVzdHJlbiBkZSBudWV2b1wiLFxuICAgIENPVU5UOiBcIkNvbnRlb1wiLFxuICAgIElOVEVSVkFMU19TVU1NQVJZOiBcIkludGVydmFsbyBkZSBjYXJnYTogJHthdmd9LCBJbnRlcnZhbG8gbWF5b3I6ICR7bG9uZ2VzdH1cIixcbiAgICBFQVNFUzogXCJGYWNpbGlkYWRcIixcbiAgICBFQVNFU19TVU1NQVJZOiBcIkNhcmdhIGRlIEZhY2lsaWRhZDogJHthdmdFYXNlfVwiLFxuICAgIENBUkRfVFlQRVM6IFwiVGlwb3MgZGUgdGFyamV0YXNcIixcbiAgICBDQVJEX1RZUEVTX0RFU0M6IFwiRXN0byBpbmNsdXllIHRhbWJpXHUwMEU5biBhIGxhcyB0YXJqZXRhcyBlbnRlcnJhZGFzLCBzaSBsYXMgaGF5XCIsXG4gICAgQ0FSRF9UWVBFX05FVzogXCJOdWV2YVwiLFxuICAgIENBUkRfVFlQRV9ZT1VORzogXCJKb3ZlblwiLFxuICAgIENBUkRfVFlQRV9NQVRVUkU6IFwiTWFkdXJhXCIsXG4gICAgQ0FSRF9UWVBFU19TVU1NQVJZOiBcIlRhcmpldGFzIFRvdGFsZXM6ICR7dG90YWxDYXJkc0NvdW50fVwiLFxufTtcbiIsICIvLyBmcmFuXHUwMEU3YWlzXG5cbmV4cG9ydCBkZWZhdWx0IHt9O1xuIiwgIi8vIFx1MDkzOVx1MDkzRlx1MDkyOFx1MDk0RFx1MDkyNlx1MDk0MFxuXG5leHBvcnQgZGVmYXVsdCB7fTtcbiIsICIvLyBCYWhhc2EgSW5kb25lc2lhXG5cbmV4cG9ydCBkZWZhdWx0IHt9O1xuIiwgIi8vIEl0YWxpYW5vXG5cbmV4cG9ydCBkZWZhdWx0IHt9O1xuIiwgIi8vIFx1NjVFNVx1NjcyQ1x1OEE5RVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgLy8gZmxhc2hjYXJkLW1vZGFsLnRzeFxuICAgIERFQ0tTOiBcIlx1MzBDN1x1MzBDM1x1MzBBRFwiLFxuICAgIERVRV9DQVJEUzogXCJcdTY3MUZcdTY1RTVcdTMwNkVcdTMwQUJcdTMwRkNcdTMwQzlcIixcbiAgICBORVdfQ0FSRFM6IFwiXHU2NUIwXHU4OThGXHUzMDZFXHUzMEFCXHUzMEZDXHUzMEM5XCIsXG4gICAgVE9UQUxfQ0FSRFM6IFwiXHUzMEFCXHUzMEZDXHUzMEM5XHU1NDA4XHU4QTA4XCIsXG4gICAgQkFDSzogXCJCYWNrXCIsXG4gICAgU0tJUDogXCJTa2lwXCIsXG4gICAgRURJVF9DQVJEOiBcIkVkaXQgQ2FyZFwiLFxuICAgIFJFU0VUX0NBUkRfUFJPR1JFU1M6IFwiXHUzMEFCXHUzMEZDXHUzMEM5XHUzMDZFXHU5MDMyXHU2MzU3XHUzMDkyXHUzMEVBXHUzMEJCXHUzMEMzXHUzMEM4XCIsXG4gICAgSEFSRDogXCJIYXJkXCIsXG4gICAgR09PRDogXCJHb29kXCIsXG4gICAgRUFTWTogXCJFYXN5XCIsXG4gICAgU0hPV19BTlNXRVI6IFwiXHU4OUUzXHU3QjU0XHUzMDkyXHU4ODY4XHU3OTNBXCIsXG4gICAgQ0FSRF9QUk9HUkVTU19SRVNFVDogXCJcdTMwQUJcdTMwRkNcdTMwQzlcdTMwNkVcdTkwMzJcdTYzNTdcdTMwNENcdTMwRUFcdTMwQkJcdTMwQzNcdTMwQzhcdTMwNTVcdTMwOENcdTMwN0VcdTMwNTdcdTMwNUZcdTMwMDJcIixcbiAgICBTQVZFOiBcIlNhdmVcIixcbiAgICBDQU5DRUw6IFwiQ2FuY2VsXCIsXG4gICAgTk9fSU5QVVQ6IFwiTm8gaW5wdXQgcHJvdmlkZWQuXCIsXG4gICAgQ1VSUkVOVF9FQVNFX0hFTFBfVEVYVDogXCJDdXJyZW50IEVhc2U6IFwiLFxuICAgIENVUlJFTlRfSU5URVJWQUxfSEVMUF9URVhUOiBcIkN1cnJlbnQgSW50ZXJ2YWw6IFwiLFxuICAgIENBUkRfR0VORVJBVEVEX0ZST006IFwiR2VuZXJhdGVkIGZyb206ICR7bm90ZVBhdGh9XCIsXG5cbiAgICAvLyBtYWluLnRzXG4gICAgT1BFTl9OT1RFX0ZPUl9SRVZJRVc6IFwiXHUzMEVDXHUzMEQzXHUzMEU1XHUzMEZDXHUzMDU5XHUzMDhCXHUzMENFXHUzMEZDXHUzMEM4XHUzMDkyXHU5NThCXHUzMDRGXCIsXG4gICAgUkVWSUVXX0NBUkRTOiBcIlx1MzBENVx1MzBFOVx1MzBDM1x1MzBCN1x1MzBFNVx1MzBBQlx1MzBGQ1x1MzBDOVx1MzA2RVx1MzBFQ1x1MzBEM1x1MzBFNVx1MzBGQ1wiLFxuICAgIFJFVklFV19FQVNZX0ZJTEVfTUVOVTogXCJcdTMwRUNcdTMwRDNcdTMwRTVcdTMwRkM6IEVhc3lcIixcbiAgICBSRVZJRVdfR09PRF9GSUxFX01FTlU6IFwiXHUzMEVDXHUzMEQzXHUzMEU1XHUzMEZDOiBHb29kXCIsXG4gICAgUkVWSUVXX0hBUkRfRklMRV9NRU5VOiBcIlx1MzBFQ1x1MzBEM1x1MzBFNVx1MzBGQzogSGFyZFwiLFxuICAgIFJFVklFV19OT1RFX0VBU1lfQ01EOiBcIlx1MzBDRVx1MzBGQ1x1MzBDOFx1MzA5MkVhc3lcdTMwNjhcdTMwNTdcdTMwNjZcdTMwRUNcdTMwRDNcdTMwRTVcdTMwRkNcdTMwNTlcdTMwOEJcIixcbiAgICBSRVZJRVdfTk9URV9HT09EX0NNRDogXCJcdTMwQ0VcdTMwRkNcdTMwQzhcdTMwOTJHb29kXHUzMDY4XHUzMDU3XHUzMDY2XHUzMEVDXHUzMEQzXHUzMEU1XHUzMEZDXHUzMDU5XHUzMDhCXCIsXG4gICAgUkVWSUVXX05PVEVfSEFSRF9DTUQ6IFwiXHUzMENFXHUzMEZDXHUzMEM4XHUzMDkySGFyZFx1MzA2OFx1MzA1N1x1MzA2Nlx1MzBFQ1x1MzBEM1x1MzBFNVx1MzBGQ1x1MzA1OVx1MzA4QlwiLFxuICAgIFJFVklFV19BTExfQ0FSRFM6IFwiXHUzMDU5XHUzMDc5XHUzMDY2XHUzMDZFXHUzMENFXHUzMEZDXHUzMEM4XHUzMDRCXHUzMDg5XHUzMEQ1XHUzMEU5XHUzMEMzXHUzMEI3XHUzMEU1XHUzMEFCXHUzMEZDXHUzMEM5XHUzMDkyXHUzMEVDXHUzMEQzXHUzMEU1XHUzMEZDXHUzMDU5XHUzMDhCXCIsXG4gICAgQ1JBTV9BTExfQ0FSRFM6IFwiU2VsZWN0IGEgZGVjayB0byBjcmFtXCIsXG4gICAgUkVWSUVXX0NBUkRTX0lOX05PVEU6IFwiXHUzMDUzXHUzMDZFXHUzMENFXHUzMEZDXHUzMEM4XHUzMDZFXHUzMEQ1XHUzMEU5XHUzMEMzXHUzMEI3XHUzMEU1XHUzMEFCXHUzMEZDXHUzMEM5XHUzMDkyXHUzMEVDXHUzMEQzXHUzMEU1XHUzMEZDXHUzMDU5XHUzMDhCXCIsXG4gICAgQ1JBTV9DQVJEU19JTl9OT1RFOiBcIlx1MzA1M1x1MzA2RVx1MzBDRVx1MzBGQ1x1MzBDOFx1MzA2RVx1MzBENVx1MzBFOVx1MzBDM1x1MzBCN1x1MzBFNVx1MzBBQlx1MzBGQ1x1MzBDOVx1MzA5Mlx1OEE3MFx1MzA4MVx1OEZCQ1x1MzA3Rlx1NUI2Nlx1N0ZEMlx1MzA1OVx1MzA4QlwiLFxuICAgIFZJRVdfU1RBVFM6IFwiXHU3RDcxXHU4QTA4XHUzMDkyXHU5NUIyXHU4OUE3XHUzMDU5XHUzMDhCXCIsXG4gICAgU1RBVFVTX0JBUjogXCJcdTMwRUNcdTMwRDNcdTMwRTVcdTMwRkM6ICR7ZHVlTm90ZXNDb3VudH1cdTMwQ0VcdTMwRkNcdTMwQzgsICR7ZHVlRmxhc2hjYXJkc0NvdW50fVx1MzBBQlx1MzBGQ1x1MzBDOVx1MzA0Q1x1NjcxRlx1NjVFNVwiLFxuICAgIFNZTkNfVElNRV9UQUtFTjogXCJcdTU0MENcdTY3MUZcdTMwNkIke3R9bXNcdTMwNEJcdTMwNEJcdTMwOEFcdTMwN0VcdTMwNTdcdTMwNUZcdTMwMDJcIixcbiAgICBOT1RFX0lOX0lHTk9SRURfRk9MREVSOiBcIlx1MzBDRVx1MzBGQ1x1MzBDOFx1MzA0Q1x1NzEyMVx1ODk5Nlx1MzA1OVx1MzA4Qlx1MzBENVx1MzBBOVx1MzBFQlx1MzBDMFx1MzA2Qlx1NEZERFx1NUI1OFx1MzA1NVx1MzA4Q1x1MzA2Nlx1MzA0NFx1MzA3RVx1MzA1OShcdThBMkRcdTVCOUFcdTMwOTJcdTc4QkFcdThBOERcdTMwNTdcdTMwNjZcdTMwNEZcdTMwNjBcdTMwNTVcdTMwNDQpXHUzMDAyXCIsXG4gICAgUExFQVNFX1RBR19OT1RFOlxuICAgICAgICBcIlx1MzBFQ1x1MzBEM1x1MzBFNVx1MzBGQ1x1MzA5Mlx1ODg0Q1x1MzA0Nlx1MzA2Qlx1MzA2Rlx1MzBDRVx1MzBGQ1x1MzBDOFx1MzA2Qlx1NUJGRVx1MzA1N1x1MzA2Nlx1NkI2M1x1MzA1N1x1MzA0Rlx1MzBCRlx1MzBCMFx1NEVEOFx1MzA1MVx1MzA1N1x1MzA2Nlx1MzA0Rlx1MzA2MFx1MzA1NVx1MzA0NChcdThBMkRcdTVCOUFcdTMwOTJcdTc4QkFcdThBOERcdTMwNTdcdTMwNjZcdTMwNEZcdTMwNjBcdTMwNTVcdTMwNDQpXHUzMDAyXCIsXG4gICAgUkVTUE9OU0VfUkVDRUlWRUQ6IFwiXHU3QjU0XHUzMDQ4XHUzMDkyXHU1M0Q3XHUzMDUxXHU1M0Q2XHUzMDhBXHUzMDdFXHUzMDU3XHUzMDVGXHUzMDAyXCIsXG4gICAgTk9fREVDS19FWElTVFM6IFwiJHtkZWNrTmFtZX1cdTMwNkJcdTMwNkZcdTMwQzdcdTMwQzNcdTMwQURcdTMwNENcdTVCNThcdTU3MjhcdTMwNTdcdTMwN0VcdTMwNUJcdTMwOTNcdTMwMDJcIixcbiAgICBBTExfQ0FVR0hUX1VQOiBcIlx1NEVDQVx1NjVFNVx1MzA2RVx1OEFCMlx1OTg0Q1x1MzA5Mlx1MzA1OVx1MzA3OVx1MzA2Nlx1OTA1NFx1NjIxMFx1MzA1N1x1MzA3RVx1MzA1N1x1MzA1RiA6RFwiLFxuXG4gICAgLy8gc2NoZWR1bGluZy50c1xuICAgIERBWVNfU1RSX0lWTDogXCIke2ludGVydmFsfVx1NjVFNVx1NUY4Q1wiLFxuICAgIE1PTlRIU19TVFJfSVZMOiBcIiR7aW50ZXJ2YWx9XHU2NzA4XHU1RjhDXCIsXG4gICAgWUVBUlNfU1RSX0lWTDogXCIke2ludGVydmFsfVx1NUU3NFx1NUY4Q1wiLFxuICAgIERBWVNfU1RSX0lWTF9NT0JJTEU6IFwiJHtpbnRlcnZhbH1kXCIsXG4gICAgTU9OVEhTX1NUUl9JVkxfTU9CSUxFOiBcIiR7aW50ZXJ2YWx9bVwiLFxuICAgIFlFQVJTX1NUUl9JVkxfTU9CSUxFOiBcIiR7aW50ZXJ2YWx9eVwiLFxuXG4gICAgLy8gc2V0dGluZ3MudHNcbiAgICBTRVRUSU5HU19IRUFERVI6IFwiU3BhY2VkIFJlcGV0aXRpb24gUGx1Z2luIC0gXHU4QTJEXHU1QjlBXCIsXG4gICAgQ0hFQ0tfV0lLSTogJ1x1OEE3M1x1N0QzMFx1MzA2Qlx1MzA2NFx1MzA0NFx1MzA2Nlx1MzA2RjxhIGhyZWY9XCIke3dpa2lfdXJsfVwiPndpa2k8L2E+XHUzMDkyXHU3OEJBXHU4QThEXHUzMDU3XHUzMDY2XHUzMDRGXHUzMDYwXHUzMDU1XHUzMDQ0XHUzMDAyJyxcbiAgICBGT0xERVJTX1RPX0lHTk9SRTogXCJcdTcxMjFcdTg5OTZcdTMwNTlcdTMwOEJcdTMwRDVcdTMwQTlcdTMwRUJcdTMwQzBcIixcbiAgICBGT0xERVJTX1RPX0lHTk9SRV9ERVNDOlxuICAgICAgICAnXHUzMEQ1XHUzMEE5XHUzMEVCXHUzMEMwXHUzMEQxXHUzMEI5XHUzMDkyXHU2NTM5XHU4ODRDXHUzMDY3XHU1MzNBXHU1MjA3XHUzMDYzXHUzMDY2XHU1MTY1XHU1MjlCXHUzMDU3XHUzMDY2XHUzMDRGXHUzMDYwXHUzMDU1XHUzMDQ0XHUzMDAyXCJUZW1wbGF0ZXMgTWV0YS9TY3JpcHRzXCIgXHUzMDZFXHUzMDg4XHUzMDQ2XHUzMDZBXHUzMEI5XHUzMERBXHUzMEZDXHUzMEI5XHUzMDZCXHUzMDg4XHUzMDhCXHU1MzNBXHU1MjA3XHUzMDhBXHUzMDY3XHUzMDZFXHU2NkY4XHUzMDREXHU2NUI5XHUzMDZGXHU3MTIxXHU1MkI5XHUzMDY3XHUzMDU5XHUzMDAyJyxcbiAgICBGTEFTSENBUkRTOiBcIlx1MzBENVx1MzBFOVx1MzBDM1x1MzBCN1x1MzBFNVx1MzBBQlx1MzBGQ1x1MzBDOVwiLFxuICAgIEZMQVNIQ0FSRF9FQVNZX0xBQkVMOiBcIkVhc3kgQnV0dG9uIFRleHRcIixcbiAgICBGTEFTSENBUkRfR09PRF9MQUJFTDogXCJHb29kIEJ1dHRvbiBUZXh0XCIsXG4gICAgRkxBU0hDQVJEX0hBUkRfTEFCRUw6IFwiSGFyZCBCdXR0b24gVGV4dFwiLFxuICAgIEZMQVNIQ0FSRF9FQVNZX0RFU0M6ICdDdXN0b21pemUgdGhlIGxhYmVsIGZvciB0aGUgXCJFYXN5XCIgQnV0dG9uJyxcbiAgICBGTEFTSENBUkRfR09PRF9ERVNDOiAnQ3VzdG9taXplIHRoZSBsYWJlbCBmb3IgdGhlIFwiR29vZFwiIEJ1dHRvbicsXG4gICAgRkxBU0hDQVJEX0hBUkRfREVTQzogJ0N1c3RvbWl6ZSB0aGUgbGFiZWwgZm9yIHRoZSBcIkhhcmRcIiBCdXR0b24nLFxuICAgIEZMQVNIQ0FSRF9UQUdTOiBcIlx1MzBENVx1MzBFOVx1MzBDM1x1MzBCN1x1MzBFNVx1MzBBQlx1MzBGQ1x1MzBDOVx1MzA2Qlx1NEY3Rlx1NzUyOFx1MzA1OVx1MzA4Qlx1MzBCRlx1MzBCMFwiLFxuICAgIEZMQVNIQ0FSRF9UQUdTX0RFU0M6XG4gICAgICAgICdcdTMwQkZcdTMwQjBcdTMwOTJcdTMwQjlcdTMwREFcdTMwRkNcdTMwQjlcdTMwN0VcdTMwNUZcdTMwNkZcdTY1MzlcdTg4NENcdTMwNjdcdTUzM0FcdTUyMDdcdTMwNjNcdTMwNjZcdTUxNjVcdTUyOUJcdTMwNTdcdTMwNjZcdTMwNEZcdTMwNjBcdTMwNTVcdTMwNDRcdTMwMDJcdTRGOEI6IFwiI2ZsYXNoY2FyZHMgI2RlY2syICNkZWNrM1wiJyxcbiAgICBDT05WRVJUX0ZPTERFUlNfVE9fREVDS1M6IFwiXHUzMEQ1XHUzMEE5XHUzMEVCXHUzMEMwXHUzMDkyXHUzMEM3XHUzMEMzXHUzMEFEXHUzMDY4XHUzMEI1XHUzMEQ2XHUzMEM3XHUzMEMzXHUzMEFEXHUzMDY4XHUzMDU3XHUzMDY2XHU0RjdGXHU3NTI4XHUzMDU3XHUzMDdFXHUzMDU5XHUzMDRCXHVGRjFGXCIsXG4gICAgQ09OVkVSVF9GT0xERVJTX1RPX0RFQ0tTX0RFU0M6XG4gICAgICAgIFwiXHUzMDUzXHUzMDhDXHUzMDZGXHU0RTBBXHU4QTE4XHUzMDZFXHUzMEJGXHUzMEIwXHUzMDkyXHU0RjdGXHU3NTI4XHUzMDU3XHUzMDVGXHUzMEM3XHUzMEMzXHUzMEFEXHU2OUNCXHU3QkM5XHUzMDZFXHU0RUUzXHU2NkZGXHUzMDY4XHUzMDZBXHUzMDhCXHUzMEFBXHUzMEQ3XHUzMEI3XHUzMEU3XHUzMEYzXHUzMDY3XHUzMDU5XHUzMDAyXCIsXG4gICAgSU5MSU5FX1NDSEVEVUxJTkdfQ09NTUVOVFM6XG4gICAgICAgIFwiXHUzMEQ1XHUzMEU5XHUzMEMzXHUzMEI3XHUzMEU1XHUzMEFCXHUzMEZDXHUzMEM5XHUzMDZFXHU2NzAwXHU3RDQyXHU4ODRDXHUzMDY4XHU1NDBDXHU0RTAwXHUzMDZFXHU4ODRDXHUzMDZCXHUzMEI5XHUzMEIxXHUzMEI4XHUzMEU1XHUzMEZDXHUzMEVBXHUzMEYzXHUzMEIwXHUzMEIzXHUzMEUxXHUzMEYzXHUzMEM4XHUzMDkyXHU0RkREXHU1QjU4XHUzMDU3XHUzMDdFXHUzMDU5XHUzMDRCXHVGRjFGXCIsXG4gICAgSU5MSU5FX1NDSEVEVUxJTkdfQ09NTUVOVFNfREVTQzpcbiAgICAgICAgXCJcdTMwNTNcdTMwNkVcdTMwQUFcdTMwRDdcdTMwQjdcdTMwRTdcdTMwRjNcdTMwOTJcdTY3MDlcdTUyQjlcdTUzMTZcdTMwNTlcdTMwOEJcdTMwNjhcdTMwMDFIVE1MXHUzMEIzXHUzMEUxXHUzMEYzXHUzMEM4XHUzMDZCXHUzMDg4XHUzMDYzXHUzMDY2TWFya2Rvd25cdTMwNkVcdTMwRUFcdTMwQjlcdTMwQzhcdTMwRDVcdTMwQTlcdTMwRkNcdTMwREVcdTMwQzNcdTMwQzhcdTMwNENcdTVEMjlcdTMwOENcdTMwNkFcdTMwNEZcdTMwNkFcdTMwOEFcdTMwN0VcdTMwNTlcdTMwMDJcIixcbiAgICBCVVJZX1NJQkxJTkdTX1RJTExfTkVYVF9EQVk6IFwiXHU2QjIxXHUzMDZFXHUzMEVDXHUzMEQzXHUzMEU1XHUzMEZDXHUzMDdFXHUzMDY3XHUzMEI3XHUzMEQ2XHUzMEVBXHUzMEYzXHUzMEIwXHUzMDkyXHU1RUY2XHU2NzFGXHUzMDU3XHUzMDdFXHUzMDU5XHUzMDRCXHVGRjFGXCIsXG4gICAgQlVSWV9TSUJMSU5HU19USUxMX05FWFRfREFZX0RFU0M6XG4gICAgICAgIFwiXHUzMEI3XHUzMEQ2XHUzMEVBXHUzMEYzXHUzMEIwXHUzMDZGXHU1NDBDXHU0RTAwXHUzMDZFXHUzMEFCXHUzMEZDXHUzMEM5XHUzMEM2XHUzMEFEXHUzMEI5XHUzMEM4XHUzMDRCXHUzMDg5XHU3NTFGXHU2MjEwXHUzMDU1XHUzMDhDXHUzMDVGXHUzMEFCXHUzMEZDXHUzMEM5XHUzMDAxXHUzMDY0XHUzMDdFXHUzMDhBXHU3QTc0XHU1N0NCXHUzMDgxXHU1NTRGXHU5ODRDXHUzMDZFXHU2RDNFXHU3NTFGXHUzMEFCXHUzMEZDXHUzMEM5XHUzMDY3XHUzMDU5XHUzMDAyXCIsXG4gICAgU0hPV19DQVJEX0NPTlRFWFQ6IFwiXHUzMEFCXHUzMEZDXHUzMEM5XHUzMDZCXHUzMEIzXHUzMEYzXHUzMEM2XHUzMEFEXHUzMEI5XHUzMEM4XHUzMDkyXHU4ODY4XHU3OTNBXHUzMDU3XHUzMDdFXHUzMDU5XHUzMDRCXHVGRjFGXCIsXG4gICAgU0hPV19DQVJEX0NPTlRFWFRfREVTQzpcbiAgICAgICAgXCJcdUZGNjJcdTMwQkZcdTMwQTRcdTMwQzhcdTMwRUIgPiBcdTg5OEJcdTUxRkFcdTMwNTcgMSA+IFx1NTI2Rlx1ODk4Qlx1NTFGQVx1MzA1NyA+IC4uLiA+IFx1NTI2Rlx1ODk4Qlx1NTFGQVx1MzA1N1x1RkY2M1x1MzA2RVx1ODg2OFx1NzkzQVx1MzA5Mlx1ODg0Q1x1MzA0Nlx1MzA0Qlx1MzA2OVx1MzA0Nlx1MzA0Qlx1MzA5Mlx1NkM3QVx1MzA4MVx1MzA3RVx1MzA1OVx1MzAwMlwiLFxuICAgIENBUkRfTU9EQUxfSEVJR0hUX1BFUkNFTlQ6IFwiXHUzMEQ1XHUzMEU5XHUzMEMzXHUzMEI3XHUzMEU1XHUzMEFCXHUzMEZDXHUzMEM5XHUzMDZFXHU3RTI2XHUzMEI1XHUzMEE0XHUzMEJBXHUzMDZFXHUzMEQxXHUzMEZDXHUzMEJCXHUzMEYzXHUzMEM2XHUzMEZDXHUzMEI4XCIsXG4gICAgQ0FSRF9NT0RBTF9TSVpFX1BFUkNFTlRfREVTQzpcbiAgICAgICAgXCJcdTMwRTJcdTMwRDBcdTMwQTRcdTMwRUJcdTcyNDhcdTMwMDFcdTMwN0VcdTMwNUZcdTMwNkZcdTk3NUVcdTVFMzhcdTMwNkJcdTU5MjdcdTMwNERcdTMwNkFcdTMwQjVcdTMwQTRcdTMwQkFcdTMwNkVcdTc1M0JcdTUwQ0ZcdTMwNENcdTMwNDJcdTMwOEJcdTU4MzRcdTU0MDhcdTMwNkJcdTMwNkYxMDAlXHUzMDZCXHUzMDU5XHUzMDhCXHU1RkM1XHU4OTgxXHUzMDRDXHUzMDQyXHUzMDhBXHUzMDdFXHUzMDU5XHUzMDAyXCIsXG4gICAgUkVTRVRfREVGQVVMVDogXCJcdTMwQzdcdTMwRDVcdTMwQTlcdTMwRUJcdTMwQzhcdTUwMjRcdTMwNkJcdTMwRUFcdTMwQkJcdTMwQzNcdTMwQzhcdTMwNTlcdTMwOEJcIixcbiAgICBDQVJEX01PREFMX1dJRFRIX1BFUkNFTlQ6IFwiXHUzMEQ1XHUzMEU5XHUzMEMzXHUzMEI3XHUzMEU1XHUzMEFCXHUzMEZDXHUzMEM5XHUzMDZFXHU2QTJBXHUzMEI1XHUzMEE0XHUzMEJBXHUzMDZFXHUzMEQxXHUzMEZDXHUzMEJCXHUzMEYzXHUzMEM2XHUzMEZDXHUzMEI4XCIsXG4gICAgUkFORE9NSVpFX0NBUkRfT1JERVI6IFwiXHUzMEVDXHUzMEQzXHUzMEU1XHUzMEZDXHU0RTJEXHUzMDZFXHUzMEFCXHUzMEZDXHUzMEM5XHUzMDZFXHU5ODA2XHU3NTZBXHUzMDkyXHUzMEU5XHUzMEYzXHUzMEMwXHUzMEUwXHUzMDZCXHUzMDU3XHUzMDdFXHUzMDU5XHUzMDRCXHVGRjFGXCIsXG4gICAgRElTQUJMRV9DTE9aRV9DQVJEUzogXCJcdTdBNzRcdTU3Q0JcdTMwODFcdTMwQUJcdTMwRkNcdTMwQzlcdTMwOTJcdTcxMjFcdTUyQjlcdTUzMTZcdTMwNTdcdTMwN0VcdTMwNTlcdTMwNEJcdUZGMUZcIixcbiAgICBDT05WRVJUX0hJR0hMSUdIVFNfVE9fQ0xPWkVTOiBcIj09XHUzMENGXHUzMEE0XHUzMEU5XHUzMEE0XHUzMEM4PT1cdTMwOTJcdTdBNzRcdTU3Q0JcdTMwODFcdTMwNjhcdTMwNTdcdTMwNjZcdTRGN0ZcdTc1MjhcdTMwNTdcdTMwN0VcdTMwNTlcdTMwNEJcdUZGMUZcIixcbiAgICBDT05WRVJUX0JPTERfVEVYVF9UT19DTE9aRVM6IFwiKipcdTMwRENcdTMwRkNcdTMwRUJcdTMwQzlcdTRGNTMqKlx1MzA5Mlx1N0E3NFx1NTdDQlx1MzA4MVx1MzA2OFx1MzA1N1x1MzA2Nlx1NEY3Rlx1NzUyOFx1MzA1N1x1MzA3RVx1MzA1OVx1MzA0Qlx1RkYxRlwiLFxuICAgIENPTlZFUlRfQ1VSTFlfQlJBQ0tFVFNfVE9fQ0xPWkVTOiBcInt7XHU0RTJEXHU2MkVDXHU1RjI3fX1cdTMwOTJcdTdBNzRcdTU3Q0JcdTMwODFcdTMwNjhcdTMwNTdcdTMwNjZcdTRGN0ZcdTc1MjhcdTMwNTdcdTMwN0VcdTMwNTlcdTMwNEJcdUZGMUZcIixcbiAgICBJTkxJTkVfQ0FSRFNfU0VQQVJBVE9SOiBcIlx1MzBBNFx1MzBGM1x1MzBFOVx1MzBBNFx1MzBGM1x1MzBENVx1MzBFOVx1MzBDM1x1MzBCN1x1MzBFNVx1MzBBQlx1MzBGQ1x1MzBDOVx1MzA2Qlx1NEY3Rlx1NzUyOFx1MzA1OVx1MzA4Qlx1MzBCQlx1MzBEMVx1MzBFQ1x1MzBGQ1x1MzBCRlx1MzBGQ1wiLFxuICAgIEZJWF9TRVBBUkFUT1JTX01BTlVBTExZX1dBUk5JTkc6XG4gICAgICAgIFwiXHUzMDUzXHUzMDZFXHUzMEFBXHUzMEQ3XHUzMEI3XHUzMEU3XHUzMEYzXHUzMDkyXHU1OTA5XHU2NkY0XHUzMDU5XHUzMDhCXHU1ODM0XHU1NDA4XHUzMDZCXHUzMDZGXHUzMDAxXHU0RjVDXHU2MjEwXHU2RTA4XHUzMDdGXHUzMDZFXHUzMEQ1XHUzMEU5XHUzMEMzXHUzMEI3XHUzMEU1XHUzMEFCXHUzMEZDXHUzMEM5XHUzMDkyXHU2MjRCXHU1MkQ1XHUzMDY3XHU3REU4XHU5NkM2XHUzMDU3XHU3NkY0XHUzMDU5XHU1RkM1XHU4OTgxXHUzMDRDXHUzMDQyXHUzMDhCXHUzMDUzXHUzMDY4XHUzMDZCXHU2Q0U4XHU2MTBGXHUzMDU3XHUzMDY2XHUzMDRGXHUzMDYwXHUzMDU1XHUzMDQ0XHUzMDAyXCIsXG4gICAgSU5MSU5FX1JFVkVSU0VEX0NBUkRTX1NFUEFSQVRPUjogXCJcdTMwQTRcdTMwRjNcdTMwRTlcdTMwQTRcdTMwRjNcdTMwNkVcdTg4NjhcdTg4Q0ZcdTUzQ0RcdThFRTJcdTMwRDVcdTMwRTlcdTMwQzNcdTMwQjdcdTMwRTVcdTMwQUJcdTMwRkNcdTMwQzlcdTMwNkJcdTRGN0ZcdTc1MjhcdTMwNTlcdTMwOEJcdTMwQkJcdTMwRDFcdTMwRUNcdTMwRkNcdTMwQkZcdTMwRkNcIixcbiAgICBNVUxUSUxJTkVfQ0FSRFNfU0VQQVJBVE9SOiBcIlx1ODkwN1x1NjU3MFx1ODg0Q1x1MzA2RVx1MzBENVx1MzBFOVx1MzBDM1x1MzBCN1x1MzBFNVx1MzBBQlx1MzBGQ1x1MzBDOVx1MzA2Qlx1NEY3Rlx1NzUyOFx1MzA1OVx1MzA4Qlx1MzBCQlx1MzBEMVx1MzBFQ1x1MzBGQ1x1MzBCRlx1MzBGQ1wiLFxuICAgIE1VTFRJTElORV9SRVZFUlNFRF9DQVJEU19TRVBBUkFUT1I6IFwiXHU4OTA3XHU2NTcwXHU4ODRDXHUzMDZFXHU4ODY4XHU4OENGXHU1M0NEXHU4RUUyXHUzMEQ1XHUzMEU5XHUzMEMzXHUzMEI3XHUzMEU1XHUzMEFCXHUzMEZDXHUzMEM5XHUzMDZCXHU0RjdGXHU3NTI4XHUzMDU5XHUzMDhCXHUzMEJCXHUzMEQxXHUzMEVDXHUzMEZDXHUzMEJGXHUzMEZDXCIsXG4gICAgTk9URVM6IFwiXHUzMENFXHUzMEZDXHUzMEM4XCIsXG4gICAgUkVWSUVXX1BBTkVfT05fU1RBUlRVUDogXCJFbmFibGUgbm90ZSByZXZpZXcgcGFuZSBvbiBzdGFydHVwXCIsXG4gICAgVEFHU19UT19SRVZJRVc6IFwiXHUzMEVDXHUzMEQzXHUzMEU1XHUzMEZDXHUzMDZCXHU0RjdGXHU3NTI4XHUzMDU5XHUzMDhCXHUzMEJGXHUzMEIwXCIsXG4gICAgVEFHU19UT19SRVZJRVdfREVTQzpcbiAgICAgICAgJ1x1MzBCRlx1MzBCMFx1MzA5Mlx1MzBCOVx1MzBEQVx1MzBGQ1x1MzBCOVx1MzA3RVx1MzA1Rlx1MzA2Rlx1NjUzOVx1ODg0Q1x1MzA2N1x1NTMzQVx1NTIwN1x1MzA2M1x1MzA2Nlx1NTE2NVx1NTI5Qlx1MzA1N1x1MzA2Nlx1MzA0Rlx1MzA2MFx1MzA1NVx1MzA0NFx1MzAwMlx1NEY4QjogXCIjcmV2aWV3ICN0YWcyICN0YWczXCInLFxuICAgIE9QRU5fUkFORE9NX05PVEU6IFwiXHUzMEU5XHUzMEYzXHUzMEMwXHUzMEUwXHUzMDZCXHUzMENFXHUzMEZDXHUzMEM4XHUzMDkyXHU5NThCXHUzMDQ0XHUzMDY2XHUzMEVDXHUzMEQzXHUzMEU1XHUzMEZDXHUzMDU5XHUzMDhCXCIsXG4gICAgT1BFTl9SQU5ET01fTk9URV9ERVNDOlxuICAgICAgICBcIlx1MzA1M1x1MzA2RVx1MzBBQVx1MzBEN1x1MzBCN1x1MzBFN1x1MzBGM1x1MzA0Q1x1NzEyMVx1NTJCOVx1NTMxNlx1MzA1NVx1MzA4Q1x1MzA2Nlx1MzA0NFx1MzA4Qlx1NzJCNlx1NjE0Qlx1MzA2N1x1MzA2Rlx1MzAwMVx1MzBDRVx1MzBGQ1x1MzBDOFx1MzA2Rlx1OTFDRFx1ODk4MVx1NUVBNihcdTMwREFcdTMwRkNcdTMwQjhcdTMwRTlcdTMwRjNcdTMwQUYpXHUzMDZCXHUzMDg4XHUzMDhCXHU5ODA2XHU3NTZBXHUzMDY3XHU4ODY4XHU3OTNBXHUzMDU1XHUzMDhDXHUzMDdFXHUzMDU5XHUzMDAyXCIsXG4gICAgQVVUT19ORVhUX05PVEU6IFwiXHUzMEVDXHUzMEQzXHUzMEU1XHUzMEZDXHU1RjhDXHUzMDZCXHU2QjIxXHUzMDZFXHUzMENFXHUzMEZDXHUzMEM4XHUzMDkyXHU4MUVBXHU1MkQ1XHU3Njg0XHUzMDZCXHU5NThCXHUzMDRGXCIsXG4gICAgRElTQUJMRV9GSUxFX01FTlVfUkVWSUVXX09QVElPTlM6XG4gICAgICAgIFwiXHUzMEQ1XHUzMEExXHUzMEE0XHUzMEVCXHUzMEUxXHUzMENCXHUzMEU1XHUzMEZDXHUzMDY3XHUzMDZFXHUzMEVDXHUzMEQzXHUzMEU1XHUzMEZDXHUzMEFBXHUzMEQ3XHUzMEI3XHUzMEU3XHUzMEYzXHUzMDkyXHU3MTIxXHU1MkI5XHU1MzE2KFx1RkY2Mlx1MzBFQ1x1MzBEM1x1MzBFNVx1MzBGQzogRWFzeVx1RkY2M1x1N0I0OVx1MzA2RVx1OTgwNVx1NzZFRVx1MzA5Mlx1OTc1RVx1ODg2OFx1NzkzQVx1MzA2Qlx1MzA1OVx1MzA4QilcIixcbiAgICBESVNBQkxFX0ZJTEVfTUVOVV9SRVZJRVdfT1BUSU9OU19ERVNDOlxuICAgICAgICBcIlx1NzEyMVx1NTJCOVx1NTMxNlx1MzA1N1x1MzA1Rlx1NUY4Q1x1MzAwMVx1MzBCM1x1MzBERVx1MzBGM1x1MzBDOVx1MzBEQlx1MzBDM1x1MzBDOFx1MzBBRFx1MzBGQ1x1MzA5Mlx1NEY3Rlx1MzA2M1x1MzA2Nlx1MzBFQ1x1MzBEM1x1MzBFNVx1MzBGQ1x1MzA1OVx1MzA4Qlx1MzA1M1x1MzA2OFx1MzA0Q1x1NTNFRlx1ODBGRFx1MzA2Qlx1MzA2QVx1MzA4QVx1MzA3RVx1MzA1OVx1MzAwMlx1MzA1M1x1MzA2RVx1MzBBQVx1MzBEN1x1MzBCN1x1MzBFN1x1MzBGM1x1MzA5Mlx1NTkwOVx1NjZGNFx1MzA1N1x1MzA1Rlx1NTgzNFx1NTQwOFx1MzA2Qlx1MzA2Rk9ic2lkaWFuXHUzMDkyXHUzMEVBXHUzMEVEXHUzMEZDXHUzMEM5XHUzMDU3XHUzMDY2XHUzMDRGXHUzMDYwXHUzMDU1XHUzMDQ0XHUzMDAyXCIsXG4gICAgTUFYX05fREFZU19SRVZJRVdfUVVFVUU6IFwiXHU1M0YzXHUzMEQxXHUzMENEXHUzMEVCXHUzMDZCXHU4ODY4XHU3OTNBXHUzMDU5XHUzMDhCXHU2NzAwXHU1OTI3XHUzMDZFXHU2NUU1XHU2NTcwXCIsXG4gICAgTUlOX09ORV9EQVk6IFwiXHU2NUU1XHU2NTcwXHUzMDZCXHUzMDZGMVx1NEVFNVx1NEUwQVx1MzA2RVx1NjU3MFx1NUI1N1x1MzA5Mlx1NjMwN1x1NUI5QVx1MzA1N1x1MzA2Nlx1MzA0Rlx1MzA2MFx1MzA1NVx1MzA0NFx1MzAwMlwiLFxuICAgIFZBTElEX05VTUJFUl9XQVJOSU5HOiBcIlx1NjcwOVx1NTJCOVx1MzA2QVx1NjU3MFx1NUI1N1x1MzA5Mlx1NTE2NVx1NTI5Qlx1MzA1N1x1MzA2Nlx1MzA0Rlx1MzA2MFx1MzA1NVx1MzA0NFx1MzAwMlwiLFxuICAgIFVJX1BSRUZFUkVOQ0VTOiBcIlx1MzBFNlx1MzBGQ1x1MzBCNlx1MzBGQyBcdTMwQTRcdTMwRjNcdTMwQkZcdTMwRkNcdTMwRDVcdTMwQTdcdTMwQTRcdTMwQjlcdTMwNkVcdThBMkRcdTVCOUFcIixcbiAgICBJTklUSUFMTFlfRVhQQU5EX1NVQkRFQ0tTX0lOX1RSRUU6IFwiXHUzMEM3XHUzMEMzXHUzMEFEIFx1MzBDNFx1MzBFQVx1MzBGQ1x1MzA2Rlx1NjcwMFx1NTIxRFx1MzA2Rlx1NUM1NVx1OTU4Qlx1MzA1N1x1MzA2Nlx1ODg2OFx1NzkzQVx1MzA1OVx1MzA4Qlx1NUZDNVx1ODk4MVx1MzA0Q1x1MzA0Mlx1MzA4QVx1MzA3RVx1MzA1OVwiLFxuICAgIElOSVRJQUxMWV9FWFBBTkRfU1VCREVDS1NfSU5fVFJFRV9ERVNDOlxuICAgICAgICBcIlx1MzA1M1x1MzA4Q1x1MzA5Mlx1MzBBQVx1MzBENVx1MzA2Qlx1MzA1OVx1MzA4Qlx1MzA2OFx1MzAwMVx1NTQwQ1x1MzA1OFx1MzBBQlx1MzBGQ1x1MzBDOVx1NTE4NVx1MzA2RVx1MzBDRFx1MzBCOVx1MzBDOFx1MzA1NVx1MzA4Q1x1MzA1Rlx1MzBDN1x1MzBDM1x1MzBBRFx1MzA0Q1x1NjI5OFx1MzA4QVx1MzA1Rlx1MzA1Rlx1MzA3RVx1MzA4Q1x1MzA3RVx1MzA1OVx1MzAwMlx1NTQwQ1x1MzA1OFx1MzBENVx1MzBBMVx1MzBBNFx1MzBFQlx1MzA2Qlx1NTkxQVx1MzA0Rlx1MzA2RVx1MzBDN1x1MzBDM1x1MzBBRFx1MzA2Qlx1NUM1RVx1MzA1OVx1MzA4Qlx1MzBBQlx1MzBGQ1x1MzBDOVx1MzA0Q1x1MzA0Mlx1MzA4Qlx1NTgzNFx1NTQwOFx1MzA2Qlx1NEZCRlx1NTIyOVx1MzA2N1x1MzA1OVx1MzAwMlwiLFxuICAgIEFMR09SSVRITTogXCJcdTMwQTJcdTMwRUJcdTMwQjRcdTMwRUFcdTMwQkFcdTMwRTBcIixcbiAgICBDSEVDS19BTEdPUklUSE1fV0lLSTpcbiAgICAgICAgJ1x1OEE3M1x1N0QzMFx1MzA2Qlx1MzA2NFx1MzA0NFx1MzA2Nlx1MzA2RjxhIGhyZWY9XCIke2FsZ29fdXJsfVwiPlx1MzBBMlx1MzBFQlx1MzBCNFx1MzBFQVx1MzBCQVx1MzBFMFx1MzA2RVx1NUI5Rlx1ODhDNTwvYT5cdTMwOTJcdTc4QkFcdThBOERcdTMwNTdcdTMwNjZcdTMwNEZcdTMwNjBcdTMwNTVcdTMwNDRcdTMwMDInLFxuICAgIEJBU0VfRUFTRTogXCJcdTMwRDlcdTMwRkNcdTMwQjlcdTMwNkVcdTY2MTNcdTMwNTdcdTMwNTVcIixcbiAgICBCQVNFX0VBU0VfREVTQzogXCJcdTY3MDBcdTVDMEZcdTUwMjRcdTMwNkYxMzBcdTMwNjdcdTMwNTlcdTMwNENcdTMwMDEgXHU5MDY5XHU2QjYzXHU1MDI0XHUzMDZGXHUzMDRBXHUzMDRBXHUzMDg4XHUzMDVEMjUwXHUzMDY3XHUzMDU5XHUzMDAyXCIsXG4gICAgQkFTRV9FQVNFX01JTl9XQVJOSU5HOiBcIlx1MzBEOVx1MzBGQ1x1MzBCOVx1MzA2RVx1NjYxM1x1MzA1N1x1MzA1NVx1MzA2Qlx1MzA2RjEzMFx1NEVFNVx1NEUwQVx1MzA2RVx1NjU3MFx1NUI1N1x1MzA5Mlx1NjMwN1x1NUI5QVx1MzA1N1x1MzA2Nlx1MzA0Rlx1MzA2MFx1MzA1NVx1MzA0NFx1MzAwMlwiLFxuICAgIExBUFNFX0lOVEVSVkFMX0NIQU5HRTogXCJcdTMwRDVcdTMwRTlcdTMwQzNcdTMwQjdcdTMwRTVcdTMwQUJcdTMwRkNcdTMwQzkvXHUzMENFXHUzMEZDXHUzMEM4XHUzMDkySGFyZFx1MzA2OFx1MzA1N1x1MzA2Nlx1MzBFQ1x1MzBEM1x1MzBFNVx1MzBGQ1x1MzA1N1x1MzA1Rlx1OTY5Qlx1MzA2RVx1OTU5M1x1OTY5NFx1NTkwOVx1NjZGNFwiLFxuICAgIExBUFNFX0lOVEVSVkFMX0NIQU5HRV9ERVNDOiAnXCJcdTY1QjBcdTMwNTdcdTMwNDRcdTk1OTNcdTk2OTQgPSBcdTRFRTVcdTUyNERcdTMwNkVcdTk1OTNcdTk2OTQgKiBcdTk1OTNcdTk2OTRcdTU5MDlcdTY2RjQgLyAxMDBcIiBcdTMwNjhcdTMwNTdcdTMwNjZcdThBMDhcdTdCOTdcdTMwNTVcdTMwOENcdTMwN0VcdTMwNTlcdTMwMDInLFxuICAgIEVBU1lfQk9OVVM6IFwiRWFzeVx1MzBEQ1x1MzBGQ1x1MzBDQVx1MzBCOVwiLFxuICAgIEVBU1lfQk9OVVNfREVTQzpcbiAgICAgICAgXCJFYXN5XHUzMERDXHUzMEZDXHUzMENBXHUzMEI5XHUzMDZCXHUzMDg4XHUzMDYzXHUzMDY2XHUzMEQ1XHUzMEU5XHUzMEMzXHUzMEI3XHUzMEU1XHUzMEFCXHUzMEZDXHUzMEM5L1x1MzBDRVx1MzBGQ1x1MzBDOFx1MzA2Qlx1MzA0QVx1MzA1MVx1MzA4Qlx1OTU5M1x1OTY5NFx1MzA2RVx1NURFRVx1NTIwNlx1MzA5Mlx1OEEyRFx1NUI5QVx1MzA2N1x1MzA0RFx1MzA3RVx1MzA1OShcdTY3MDBcdTVDMEZcdTUwMjQgPSAxMDAlKVx1MzAwMlwiLFxuICAgIEVBU1lfQk9OVVNfTUlOX1dBUk5JTkc6IFwiRWFzeVx1MzBEQ1x1MzBGQ1x1MzBDQVx1MzBCOVx1MzA2Qlx1MzA2RjEwMFx1NEVFNVx1NEUwQVx1MzA2RVx1NjU3MFx1NUI1N1x1MzA5Mlx1NjMwN1x1NUI5QVx1MzA1N1x1MzA2Nlx1MzA0Rlx1MzA2MFx1MzA1NVx1MzA0NFx1MzAwMlwiLFxuICAgIE1BWF9JTlRFUlZBTDogXCJNYXhpbXVtIGludGVydmFsIGluIGRheXNcIixcbiAgICBNQVhfSU5URVJWQUxfREVTQzogXCJcdTk1OTNcdTk2OTRcdTMwNkJcdTRFMEFcdTk2NTBcdTUwMjRcdTMwOTJcdThBMkRcdTVCOUFcdTMwNTlcdTMwOEJcdTMwNTNcdTMwNjhcdTMwNENcdTMwNjdcdTMwNERcdTMwN0VcdTMwNTkoXHUzMEM3XHUzMEQ1XHUzMEE5XHUzMEVCXHUzMEM4XHU1MDI0ID0gMTAwXHU1RTc0KVx1MzAwMlwiLFxuICAgIE1BWF9JTlRFUlZBTF9NSU5fV0FSTklORzogXCJcdTk1OTNcdTk2OTRcdTMwNkVcdTY3MDBcdTU5MjdcdTUwMjRcdTMwNkJcdTMwNkYxXHU0RUU1XHU0RTBBXHUzMDZFXHU2NTcwXHU1QjU3XHUzMDkyXHU2MzA3XHU1QjlBXHUzMDU3XHUzMDY2XHUzMDRGXHUzMDYwXHUzMDU1XHUzMDQ0XHUzMDAyXCIsXG4gICAgTUFYX0xJTktfQ09OVFJJQjogXCJcdTMwRUFcdTMwRjNcdTMwQUZcdTMwQjNcdTMwRjNcdTMwQzhcdTMwRUFcdTMwRDNcdTMwRTVcdTMwRkNcdTMwQjdcdTMwRTdcdTMwRjNcdTMwNkVcdTY3MDBcdTU5MjdcdTUwMjRcIixcbiAgICBNQVhfTElOS19DT05UUklCX0RFU0M6XG4gICAgICAgIFwiXHU2NzAwXHU1MjFEXHUzMDZFXHU2NjEzXHUzMDU3XHUzMDU1XHUzMDZCXHU1QkZFXHUzMDU3XHUzMDY2XHUzMDAxXHUzMEVBXHUzMEYzXHUzMEFGXHUzMDU1XHUzMDhDXHUzMDVGXHUzMENFXHUzMEZDXHUzMEM4XHUzMDZFXHU5MUNEXHUzMDdGXHU0RUQ4XHUzMDUxXHUzMDU1XHUzMDhDXHUzMDVGXHU2NjEzXHUzMDU3XHUzMDU1XHUzMDRDXHU1QkM0XHU0RTBFXHUzMDU5XHUzMDhCXHU2NzAwXHU1OTI3XHU1MDI0XHUzMDkyXHU2MzA3XHU1QjlBXHUzMDU3XHUzMDY2XHUzMDRGXHUzMDYwXHUzMDU1XHUzMDQ0XHUzMDAyXCIsXG4gICAgTE9HR0lORzogXCJcdTMwRURcdTMwQjBcdTdCQTFcdTc0MDZcIixcbiAgICBESVNQTEFZX0RFQlVHX0lORk86IFwiXHUzMEM3XHUzMEQ5XHUzMEVEXHUzMEMzXHUzMEQxXHUzMEZDXHUzMEIzXHUzMEYzXHUzMEJEXHUzMEZDXHUzMEVCXHUzMDZCXHUzMDY2XHUzMEM3XHUzMEQwXHUzMEMzXHUzMEIwXHU2MEM1XHU1ODMxXHUzMDkyXHU4ODY4XHU3OTNBXHUzMDU3XHUzMDdFXHUzMDU5XHUzMDRCXHVGRjFGXCIsXG5cbiAgICAvLyBzaWRlYmFyLnRzXG4gICAgTk9URVNfUkVWSUVXX1FVRVVFOiBcIlx1MzBDRVx1MzBGQ1x1MzBDOFx1MzBFQ1x1MzBEM1x1MzBFNVx1MzBGQ1x1MzA2RVx1MzBBRFx1MzBFNVx1MzBGQ1wiLFxuICAgIENMT1NFOiBcIlx1OTU4OVx1MzA1OFx1MzA4QlwiLFxuICAgIE5FVzogXCJcdTY1QjBcdTg5OEZcIixcbiAgICBZRVNURVJEQVk6IFwiXHU2NjI4XHU2NUU1XCIsXG4gICAgVE9EQVk6IFwiXHU0RUNBXHU2NUU1XCIsXG4gICAgVE9NT1JST1c6IFwiXHU2NjBFXHU2NUU1XCIsXG5cbiAgICAvLyBzdGF0cy1tb2RhbC50c3hcbiAgICBTVEFUU19USVRMRTogXCJcdTdENzFcdThBMDhcIixcbiAgICBNT05USDogXCJNb250aFwiLFxuICAgIFFVQVJURVI6IFwiUXVhcnRlclwiLFxuICAgIFlFQVI6IFwiWWVhclwiLFxuICAgIExJRkVUSU1FOiBcIkxpZmV0aW1lXCIsXG4gICAgRk9SRUNBU1Q6IFwiXHU0RTg4XHU2RTJDXCIsXG4gICAgRk9SRUNBU1RfREVTQzogXCJcdTVGQTlcdTdGRDJcdTY3MUZcdTY1RTVcdTMwNENcdTY3NjVcdTMwOEJcdTMwQUJcdTMwRkNcdTMwQzlcdTMwNkVcdTY3OUFcdTY1NzBcIixcbiAgICBTQ0hFRFVMRUQ6IFwiXHUzMEI5XHUzMEIxXHUzMEI4XHUzMEU1XHUzMEZDXHUzMEVBXHUzMEYzXHUzMEIwXHU2RTA4XHUzMDdGXCIsXG4gICAgREFZUzogXCJcdTY1RTVcIixcbiAgICBOVU1CRVJfT0ZfQ0FSRFM6IFwiXHUzMEFCXHUzMEZDXHUzMEM5XHU2NTcwXCIsXG4gICAgUkVWSUVXU19QRVJfREFZOiBcIlx1NUU3M1x1NTc0NzogJHthdmd9XHUzMEVDXHUzMEQzXHUzMEU1XHUzMEZDL1x1NjVFNVwiLFxuICAgIElOVEVSVkFMUzogXCJcdTk1OTNcdTk2OTRcIixcbiAgICBJTlRFUlZBTFNfREVTQzogXCJcdTZCMjFcdTMwNkVcdTMwRUNcdTMwRDNcdTMwRTVcdTMwRkNcdTRFODhcdTVCOUFcdTY1RTVcIixcbiAgICBDT1VOVDogXCJcdTMwQUJcdTMwQTZcdTMwRjNcdTMwQzhcIixcbiAgICBJTlRFUlZBTFNfU1VNTUFSWTogXCJcdTk1OTNcdTk2OTRcdTMwNkVcdTVFNzNcdTU3NDdcdTUwMjQ6ICR7YXZnfSwgXHU2NzAwXHU5NTc3XHUzMDZFXHU5NTkzXHU5Njk0OiAke2xvbmdlc3R9XCIsXG4gICAgRUFTRVM6IFwiXHU2NjEzXHUzMDU3XHUzMDU1XCIsXG4gICAgRUFTRVNfU1VNTUFSWTogXCJcdTY2MTNcdTMwNTdcdTMwNTVcdTMwNkVcdTVFNzNcdTU3NDdcdTUwMjQ6ICR7YXZnRWFzZX1cIixcbiAgICBDQVJEX1RZUEVTOiBcIlx1MzBBQlx1MzBGQ1x1MzBDOVx1MzBCRlx1MzBBNFx1MzBEN1wiLFxuICAgIENBUkRfVFlQRVNfREVTQzogXCJcdTVFRjZcdTY3MUZcdTMwNkVcdTMwQUJcdTMwRkNcdTMwQzlcdTMwNENcdTMwNDJcdTMwOEJcdTU4MzRcdTU0MDhcdTMwNkJcdTMwNkZcdTMwNTNcdTMwOENcdTMwNkJcdTU0MkJcdTMwN0VcdTMwOENcdTMwN0VcdTMwNTlcIixcbiAgICBDQVJEX1RZUEVfTkVXOiBcIlx1NjVCMFx1ODk4RlwiLFxuICAgIENBUkRfVFlQRV9ZT1VORzogXCJcdTVGQTlcdTdGRDIoXHU1MjFEXHU2NzFGKVwiLFxuICAgIENBUkRfVFlQRV9NQVRVUkU6IFwiXHU1RkE5XHU3RkQyKFx1NUY4Q1x1NjcxRilcIixcbiAgICBDQVJEX1RZUEVTX1NVTU1BUlk6IFwiXHUzMEFCXHUzMEZDXHUzMEM5XHUzMDZFXHU1NDA4XHU4QTA4OiAke3RvdGFsQ2FyZHNDb3VudH1cdTY3OUFcIixcbn07XG4iLCAiLy8gXHVENTVDXHVBRDZEXHVDNUI0XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICAvLyBmbGFzaGNhcmQtbW9kYWwudHN4XG4gICAgREVDS1M6IFwiXHVCMzcxXCIsXG4gICAgRFVFX0NBUkRTOiBcIlx1QjJFNFx1QzJEQyBcdUJDRkMgXHVDRTc0XHVCNERDXHVCNEU0XCIsXG4gICAgTkVXX0NBUkRTOiBcIlx1QzBDOFx1Qjg1Q1x1QzZCNCBcdUNFNzRcdUI0RENcdUI0RTRcIixcbiAgICBUT1RBTF9DQVJEUzogXCJcdUM4MDRcdUNDQjQgXHVDRTc0XHVCNERDXHVCNEU0XCIsXG4gICAgQkFDSzogXCJCYWNrXCIsXG4gICAgU0tJUDogXCJTa2lwXCIsXG4gICAgRURJVF9DQVJEOiBcIkVkaXQgQ2FyZFwiLFxuICAgIFJFU0VUX0NBUkRfUFJPR1JFU1M6IFwiXHVDRTc0XHVCNERDXHVDNzU4IFx1QzlDNFx1RDU4OVx1QzBDMVx1RDY2OVx1Qzc0NCBcdUNEMDhcdUFFMzBcdUQ2NTRcdUQ1NjlcdUIyQzhcdUIyRTQuXCIsXG4gICAgSEFSRDogXCJcdUM1QjRcdUI4MjRcdUM2QzAoSGFyZClcIixcbiAgICBHT09EOiBcIlx1Qzg4Qlx1Qzc0QyhHb29kKVwiLFxuICAgIEVBU1k6IFwiXHVDMjZDXHVDNkMwKEVhc3kpXCIsXG4gICAgU0hPV19BTlNXRVI6IFwiXHVDODE1XHVCMkY1IFx1RDY1NVx1Qzc3OFx1RDU1OFx1QUUzMFwiLFxuICAgIENBUkRfUFJPR1JFU1NfUkVTRVQ6IFwiXHVDRTc0XHVCNERDXHVDNzU4IFx1QzlDNFx1RDU4OVx1QzBDMVx1RDY2OVx1Qzc3NCBcdUNEMDhcdUFFMzBcdUQ2NTRcdUI0MThcdUM1QzhcdUMyQjVcdUIyQzhcdUIyRTQuXCIsXG4gICAgU0FWRTogXCJTYXZlXCIsXG4gICAgQ0FOQ0VMOiBcIkNhbmNlbFwiLFxuICAgIE5PX0lOUFVUOiBcIk5vIGlucHV0IHByb3ZpZGVkLlwiLFxuICAgIENVUlJFTlRfRUFTRV9IRUxQX1RFWFQ6IFwiQ3VycmVudCBFYXNlOiBcIixcbiAgICBDVVJSRU5UX0lOVEVSVkFMX0hFTFBfVEVYVDogXCJDdXJyZW50IEludGVydmFsOiBcIixcbiAgICBDQVJEX0dFTkVSQVRFRF9GUk9NOiBcIkdlbmVyYXRlZCBmcm9tOiAke25vdGVQYXRofVwiLFxuXG4gICAgLy8gbWFpbi50c1xuICAgIE9QRU5fTk9URV9GT1JfUkVWSUVXOiBcIlx1QjlBQ1x1QkRGMFx1RDU2MCBcdUIxNzhcdUQyQjggXHVDNUY0XHVBRTMwXCIsXG4gICAgUkVWSUVXX0NBUkRTOiBcIlx1RDUwQ1x1Qjc5OFx1QzJEQ1x1Q0U3NFx1QjREQyBcdUI5QUNcdUJERjBcIixcbiAgICBSRVZJRVdfRUFTWV9GSUxFX01FTlU6IFwiXHVCOUFDXHVCREYwOiBcdUMyNkNcdUM2QzAoRWFzeSlcIixcbiAgICBSRVZJRVdfR09PRF9GSUxFX01FTlU6IFwiXHVCOUFDXHVCREYwOiBcdUM4OEJcdUM3NEMoR29vZClcIixcbiAgICBSRVZJRVdfSEFSRF9GSUxFX01FTlU6IFwiXHVCOUFDXHVCREYwOiBcdUM1QjRcdUI4MjRcdUM2QzAoSGFyZClcIixcbiAgICBSRVZJRVdfTk9URV9FQVNZX0NNRDogXCJcdUIxNzhcdUQyQjhcdUI5N0MgXHVDMjZDXHVDNkMwKGVhc3kpXHVDNzNDXHVCODVDIFx1QjlBQ1x1QkRGMFx1RDU2OVx1QjJDOFx1QjJFNFwiLFxuICAgIFJFVklFV19OT1RFX0dPT0RfQ01EOiBcIlx1QjE3OFx1RDJCOFx1Qjk3QyBcdUM4OEJcdUM3NEMoZ29vZClcdUM3M0NcdUI4NUMgXHVCOUFDXHVCREYwXHVENTY5XHVCMkM4XHVCMkU0XCIsXG4gICAgUkVWSUVXX05PVEVfSEFSRF9DTUQ6IFwiXHVCMTc4XHVEMkI4XHVCOTdDIFx1QzVCNFx1QjgyNFx1QzZDMChoYXJkKVx1QzczQ1x1Qjg1QyBcdUI5QUNcdUJERjBcdUQ1NjlcdUIyQzhcdUIyRTRcIixcbiAgICBSRVZJRVdfQUxMX0NBUkRTOiBcIlx1QkFBOFx1QjRFMCBcdUIxNzhcdUQyQjhcdUI0RTRcdUM3NTggXHVENTBDXHVCNzk4XHVDMkRDXHVDRTc0XHVCNERDXHVCNEU0XHVDNzQ0IFx1QjlBQ1x1QkRGMFx1RDU2OVx1QjJDOFx1QjJFNFwiLFxuICAgIENSQU1fQUxMX0NBUkRTOiBcIlNlbGVjdCBhIGRlY2sgdG8gY3JhbVwiLFxuICAgIFJFVklFV19DQVJEU19JTl9OT1RFOiBcIlx1Qzc3NCBcdUIxNzhcdUQyQjhcdUM3NTggXHVENTBDXHVCNzk4XHVDMkRDXHVDRTc0XHVCNERDXHVCNEU0XHVDNzQ0IFx1QjlBQ1x1QkRGMFx1RDU2OVx1QjJDOFx1QjJFNFwiLFxuICAgIENSQU1fQ0FSRFNfSU5fTk9URTogXCJcdUM3NzQgXHVCMTc4XHVEMkI4XHVDNzU4IFx1RDUwQ1x1Qjc5OFx1QzJEQ1x1Q0U3NFx1QjREQ1x1QjRFNFx1Qzc0NCBcdUJDQkNcdUI3N0RcdUNFNThcdUFFMzBcdUQ1NjlcdUIyQzhcdUIyRTQuXCIsXG4gICAgVklFV19TVEFUUzogXCJcdUQxQjVcdUFDQzQgXHVENjU1XHVDNzc4XCIsXG4gICAgU1RBVFVTX0JBUjogXCItLVx1QjlBQ1x1QkRGMDogJHtkdWVOb3Rlc0NvdW50fSBcdUIxNzhcdUQyQjgsICR7ZHVlRmxhc2hjYXJkc0NvdW50fSBcdUNFNzRcdUI0REMgXHVCMEE4XHVDNTU4XHVDMkI1XHVCMkM4XHVCMkU0LlwiLFxuICAgIFNZTkNfVElNRV9UQUtFTjogXCJcdUIzRDlcdUFFMzBcdUQ2NTRcdUM1RDAgJHt0fVx1QkMwMFx1QjlBQ1x1Q0QwOCBcdUFDNzhcdUI4MzhcdUMyQjVcdUIyQzhcdUIyRTRcIixcbiAgICBOT1RFX0lOX0lHTk9SRURfRk9MREVSOiBcIlx1QjE3OFx1RDJCOFx1QUMwMCBcdUJCMzRcdUMyRENcdUI0MUMgXHVEM0Y0XHVCMzU0IFx1QzU0NFx1Qjc5OFx1QzVEMCBcdUM4MDBcdUM3QTVcdUI0MThcdUM1QjQgXHVDNzg4XHVDMkI1XHVCMkM4XHVCMkU0LiAoXHVDMTI0XHVDODE1XHVDNzQ0IFx1RDY1NVx1Qzc3OFx1RDU3NFx1QzhGQ1x1QzEzOFx1QzY5NClcIixcbiAgICBQTEVBU0VfVEFHX05PVEU6IFwiXHVCOUFDXHVCREYwXHVCOTdDIFx1RDU1OFx1QUUzMFx1QzcwNFx1RDU3NCBcdUIxNzhcdUQyQjhcdUM1RDAgXHVDODAxXHVDODA4XHVENzg4IFx1RDBEQ1x1QURGOFx1RDU3NFx1QzhGQ1x1QzEzOFx1QzY5NC4gKFx1QzEyNFx1QzgxNVx1Qzc0NCBcdUQ2NTVcdUM3NzhcdUQ1NzRcdUM4RkNcdUMxMzhcdUM2OTQpXCIsXG4gICAgUkVTUE9OU0VfUkVDRUlWRUQ6IFwiXHVDNjk0XHVDQ0FEXHVDNzc0IFx1QzY0NFx1QjhDQ1x1QjQxOFx1QzVDOFx1QzJCNVx1QjJDOFx1QjJFNFwiLFxuICAgIE5PX0RFQ0tfRVhJU1RTOiBcIiR7ZGVja05hbWV9XHVDNzc0XHVCNzdDXHVCMjk0IFx1Qzc3NFx1Qjk4NFx1Qzc1OCBcdUIzNzFcdUM3NzQgXHVDODc0XHVDN0FDXHVENTU4XHVDOUMwIFx1QzU0QVx1QzJCNVx1QjJDOFx1QjJFNC5cIixcbiAgICBBTExfQ0FVR0hUX1VQOiBcIlx1QkFBOFx1QjQ1MCBcdUQ2NTVcdUM3NzhcdUQ1ODhcdUMyQjVcdUIyQzhcdUIyRTQuIDpEXCIsXG5cbiAgICAvLyBzY2hlZHVsaW5nLnRzXG4gICAgREFZU19TVFJfSVZMOiBcIiR7aW50ZXJ2YWx9IFx1Qzc3QyBcdUQ2QzRcIixcbiAgICBNT05USFNfU1RSX0lWTDogXCIke2ludGVydmFsfSBcdUFDMUNcdUM2RDQgXHVENkM0XCIsXG4gICAgWUVBUlNfU1RSX0lWTDogXCIke2ludGVydmFsfSBcdUIxNDQgXHVENkM0XCIsXG4gICAgREFZU19TVFJfSVZMX01PQklMRTogXCIke2ludGVydmFsfWRcIixcbiAgICBNT05USFNfU1RSX0lWTF9NT0JJTEU6IFwiJHtpbnRlcnZhbH1tXCIsXG4gICAgWUVBUlNfU1RSX0lWTF9NT0JJTEU6IFwiJHtpbnRlcnZhbH15XCIsXG5cbiAgICAvLyBzZXR0aW5ncy50c1xuICAgIFNFVFRJTkdTX0hFQURFUjogXCJTcGFjZWQgUmVwZXRpdGlvbiBQbHVnaW4gLSBcdUMxMjRcdUM4MTVcIixcbiAgICBDSEVDS19XSUtJOiAnXHVCMzU0IFx1QjlDRVx1Qzc0MCBcdUM4MTVcdUJDRjRcdUI5N0MgXHVDNkQwXHVENTU4XHVDMkRDXHVCQTc0LCA8YSBocmVmPVwiJHt3aWtpX3VybH1cIj53aWtpPC9hPlx1Qjk3QyBcdUQ2NTVcdUM3NzhcdUQ1NzRcdUM4RkNcdUMxMzhcdUM2OTQuJyxcbiAgICBGT0xERVJTX1RPX0lHTk9SRTogXCJcdUJCMzRcdUMyRENcdUQ1NjAgXHVEM0Y0XHVCMzU0XHVCNEU0XCIsXG4gICAgRk9MREVSU19UT19JR05PUkVfREVTQzpcbiAgICAgICAgXCJcdUQzRjRcdUIzNTQgXHVBQ0JEXHVCODVDXHVCOTdDIFx1QkU0OCBcdUM5MDRcdUI4NUMgXHVBRDZDXHVCRDg0XHVENTc0XHVDMTFDIFx1Qzc4NVx1QjgyNVx1RDU3NFx1QzhGQ1x1QzEzOFx1QzY5NC4gJ1RlbXBsYXRlcyBNZXRhL1NjcmlwdHMnIFx1QzY0MCBcdUFDMTlcdUM3NzQgXHVDNzg1XHVCODI1XHVENTU4XHVCMjk0IFx1QUM4M1x1Qzc0MCBcdUM3MjBcdUQ2QThcdUQ1NThcdUM5QzAgXHVDNTRBXHVDMkI1XHVCMkM4XHVCMkU0LlwiLFxuICAgIEZMQVNIQ0FSRFM6IFwiXHVENTBDXHVCNzk4XHVDMkRDXHVDRTc0XHVCNERDXCIsXG4gICAgRkxBU0hDQVJEX0VBU1lfTEFCRUw6IFwiRWFzeSBCdXR0b24gVGV4dFwiLFxuICAgIEZMQVNIQ0FSRF9HT09EX0xBQkVMOiBcIkdvb2QgQnV0dG9uIFRleHRcIixcbiAgICBGTEFTSENBUkRfSEFSRF9MQUJFTDogXCJIYXJkIEJ1dHRvbiBUZXh0XCIsXG4gICAgRkxBU0hDQVJEX0VBU1lfREVTQzogJ0N1c3RvbWl6ZSB0aGUgbGFiZWwgZm9yIHRoZSBcIkVhc3lcIiBCdXR0b24nLFxuICAgIEZMQVNIQ0FSRF9HT09EX0RFU0M6ICdDdXN0b21pemUgdGhlIGxhYmVsIGZvciB0aGUgXCJHb29kXCIgQnV0dG9uJyxcbiAgICBGTEFTSENBUkRfSEFSRF9ERVNDOiAnQ3VzdG9taXplIHRoZSBsYWJlbCBmb3IgdGhlIFwiSGFyZFwiIEJ1dHRvbicsXG4gICAgRkxBU0hDQVJEX1RBR1M6IFwiXHVENTBDXHVCNzk4XHVDMkRDXHVDRTc0XHVCNERDIFx1RDBEQ1x1QURGOFwiLFxuICAgIEZMQVNIQ0FSRF9UQUdTX0RFU0M6XG4gICAgICAgIFwiXHVEMERDXHVBREY4XHVCOTdDIFx1QUNGNVx1QkMzMSBcdUI2MTBcdUIyOTQgXHVCRTQ4IFx1QzkwNFx1Qjg1QyBcdUFENkNcdUJEODRcdUQ1NzRcdUMxMUMgXHVDNzg1XHVCODI1XHVENTc0XHVDOEZDXHVDMTM4XHVDNjk0LiBcdUM2MDgpICcjZmxhc2hjYXJkcyAjZGVjazIgI2RlY2szJ1wiLFxuICAgIENPTlZFUlRfRk9MREVSU19UT19ERUNLUzogXCJcdUQzRjRcdUIzNTRcdUI5N0MgXHVCMzcxXHVBQ0ZDIFx1QzExQ1x1QkUwQ1x1QjM3MVx1QzczQ1x1Qjg1QyBcdUMwQUNcdUM2QTlcdUQ1NjBcdUFFNENcdUM2OTQ/XCIsXG4gICAgQ09OVkVSVF9GT0xERVJTX1RPX0RFQ0tTX0RFU0M6IFwiXHVDNzc0IFx1QUUzMFx1QjJBNVx1Qzc0MCBcdUM3MDRcdUM3NTggXHVENTBDXHVCNzk4XHVDMkRDXHVDRTc0XHVCNERDIFx1RDBEQ1x1QURGOCBcdUM2MzVcdUMxNThcdUM3NDQgXHVCMzAwXHVDQ0I0XHVENTY5XHVCMkM4XHVCMkU0LlwiLFxuICAgIElOTElORV9TQ0hFRFVMSU5HX0NPTU1FTlRTOlxuICAgICAgICBcIlx1RDUwQ1x1Qjc5OFx1QzJEQ1x1Q0U3NFx1QjREQ1x1Qzc1OCBcdUI5QzhcdUM5QzBcdUI5QzkgXHVDOTA0XHVBQ0ZDIFx1QjNEOVx1Qzc3Q1x1RDU1QyBcdUM5MDRcdUM1RDAgXHVDMkE0XHVDRjAwXHVDOTA0XHVCOUMxIFx1Q0Y1NFx1QkE1OFx1RDJCOFx1Qjk3QyBcdUM4MDBcdUM3QTVcdUQ1NThcdUMyRENcdUFDQTBcdUMyQjVcdUIyQzhcdUFFNEM/XCIsXG4gICAgSU5MSU5FX1NDSEVEVUxJTkdfQ09NTUVOVFNfREVTQzpcbiAgICAgICAgXCJcdUM3NzQgXHVDNjM1XHVDMTU4XHVDNzQ0IFx1QzBBQ1x1QzZBOVx1RDU1OFx1QkE3NCBIVE1MIFx1QzhGQ1x1QzExRFx1Qzc3NCBcdUJBQTlcdUI4NURcdUM3NTggXHVEM0VDXHVCOUU0XHVEMzA1XHVDNzQ0IFx1QkIzNFx1QjEwOFx1RDJCOFx1QjlBQ1x1QzlDMCBcdUM1NEFcdUMyQjVcdUIyQzhcdUIyRTQuXCIsXG4gICAgQlVSWV9TSUJMSU5HU19USUxMX05FWFRfREFZOiBcIlNpYmxpbmcgXHVDRTc0XHVCNERDXHVCOTdDIFx1QjJFNFx1Qzc0Q1x1QjBBMFx1QUU0Q1x1QzlDMCBcdUJCM0JcdUM1QjRcdUI0NTBcdUMyRENcdUFDQTBcdUMyQjVcdUIyQzhcdUFFNEM/XCIsXG4gICAgQlVSWV9TSUJMSU5HU19USUxMX05FWFRfREFZX0RFU0M6XG4gICAgICAgIFwiU2libGluZyBcdUNFNzRcdUI0RENcdUIyOTQgXHVCM0Q5XHVDNzdDXHVENTVDIFx1Q0U3NFx1QjREQyBcdUQxNERcdUMyQTRcdUQyQjhcdUM1RDBcdUMxMUMgXHVDMEREXHVDMTMxXHVCNDFDIFx1Q0U3NFx1QjREQ1x1Qzc4NVx1QjJDOFx1QjJFNC4gaS5lLiBjbG96ZSBkZWxldGlvbnNcIixcbiAgICBTSE9XX0NBUkRfQ09OVEVYVDogXCJcdUNFNzRcdUI0RENcdUM3NTggXHVCQjM4XHVCOUU1KGNvbnRleHQpXHVDNzQ0IFx1RDQ1Q1x1QzJEQ1x1RDU1OFx1QzJEQ1x1QUNBMFx1QzJCNVx1QjJDOFx1QUU0Qz9cIixcbiAgICBTSE9XX0NBUkRfQ09OVEVYVF9ERVNDOlxuICAgICAgICBcIlx1Q0U3NFx1QjREQ1x1QzVEMFx1QzExQyAnVGl0bGUgPiBIZWFkaW5nIDEgPiBTdWJoZWFkaW5nID4gLi4uID4gU3ViaGVhZGluZycgXHVDNzU4IFx1RDQ1Q1x1QzJEQ1x1Qjk3QyBcdUQ1NjBcdUM5QzAgXHVDMTI0XHVDODE1XHVENTY5XHVCMkM4XHVCMkU0LlwiLFxuICAgIENBUkRfTU9EQUxfSEVJR0hUX1BFUkNFTlQ6IFwiXHVENTBDXHVCNzk4XHVDMkRDXHVDRTc0XHVCNERDIFx1QjE5Mlx1Qzc3NCBcdUJFNDRcdUM3MjhcIixcbiAgICBDQVJEX01PREFMX1NJWkVfUEVSQ0VOVF9ERVNDOlxuICAgICAgICBcIlx1QkFBOFx1QkMxNFx1Qzc3QyBcdUJDODRcdUM4MDQgXHVENjM5XHVDNzQwIFx1QjlFNFx1QzZCMCBcdUQwNzAgXHVDNzc0XHVCQkY4XHVDOUMwXHVBQzAwIFx1Qzc4OFx1QjI5NCBcdUFDQkRcdUM2QjAgMTAwJVx1Qjg1QyBcdUMxMjRcdUM4MTVcdUQ1NzRcdUM1N0MgXHVENTY5XHVCMkM4XHVCMkU0LlwiLFxuICAgIFJFU0VUX0RFRkFVTFQ6IFwiXHVBRTMwXHVCQ0Y4XHVBQzEyXHVDNzNDXHVCODVDIFx1Q0QwOFx1QUUzMFx1RDY1NFwiLFxuICAgIENBUkRfTU9EQUxfV0lEVEhfUEVSQ0VOVDogXCJcdUQ1MENcdUI3OThcdUMyRENcdUNFNzRcdUI0REMgXHVCMTA4XHVCRTQ0IFx1QkU0NFx1QzcyOFwiLFxuICAgIFJBTkRPTUlaRV9DQVJEX09SREVSOiBcIlx1QjlBQ1x1QkRGMFx1QzkxMVx1Qzc3OCBcdUNFNzRcdUI0RENcdUM3NTggXHVDMjFDXHVDMTFDXHVCOTdDIFx1Qjc5Q1x1QjM2NFx1QzczQ1x1Qjg1QyBcdUI0NTBcdUMyRENcdUFDQTBcdUMyQjVcdUIyQzhcdUFFNEM/XCIsXG4gICAgRElTQUJMRV9DTE9aRV9DQVJEUzogXCJcdUJFNDggXHVDRTc4IFx1Q0M0NFx1QzZCMFx1QUUzMCBcdUNFNzRcdUI0RENcdUI5N0MgXHVCRTQ0XHVENjVDXHVDMTMxXHVENjU0XHVENTU4XHVDMkRDXHVBQ0EwXHVDMkI1XHVCMkM4XHVBRTRDP1wiLFxuICAgIENPTlZFUlRfSElHSExJR0hUU19UT19DTE9aRVM6IFwiPT1oaWdodGxpZ2h0cz09IFx1Qjk3QyBcdUJFNDggXHVDRTc4IFx1Q0M0NFx1QzZCMFx1QUUzMFx1Qjg1QyBcdUM4MDRcdUQ2NThcdUQ1NThcdUMyRENcdUFDQTBcdUMyQjVcdUIyQzhcdUFFNEM/XCIsXG4gICAgQ09OVkVSVF9CT0xEX1RFWFRfVE9fQ0xPWkVTOiBcIioqYm9sZGVkIHRleHQqKiBcdUI5N0MgXHVCRTQ4IFx1Q0U3OCBcdUNDNDRcdUM2QjBcdUFFMzBcdUI4NUMgXHVDODA0XHVENjU4XHVENTU4XHVDMkRDXHVBQ0EwXHVDMkI1XHVCMkM4XHVBRTRDP1wiLFxuICAgIENPTlZFUlRfQ1VSTFlfQlJBQ0tFVFNfVE9fQ0xPWkVTOiBcInt7Y3VybHkgYnJhY2tldHN9fSBcdUI5N0MgXHVCRTQ4IFx1Q0U3OCBcdUNDNDRcdUM2QjBcdUFFMzBcdUI4NUMgXHVDODA0XHVENjU4XHVENTU4XHVDMkRDXHVBQ0EwXHVDMkI1XHVCMkM4XHVBRTRDP1wiLFxuICAgIElOTElORV9DQVJEU19TRVBBUkFUT1I6IFwiXHVDNzc4XHVCNzdDXHVDNzc4IFx1RDUwQ1x1Qjc5OFx1QzJEQ1x1Q0U3NFx1QjREQyBcdUFENkNcdUJEODRcdUM3OTBcIixcbiAgICBGSVhfU0VQQVJBVE9SU19NQU5VQUxMWV9XQVJOSU5HOlxuICAgICAgICBcIlx1QzhGQ1x1Qzc1ODogXHVDNzc0IFx1QzYzNVx1QzE1OFx1Qzc0NCBcdUMyMThcdUM4MTVcdUQ1NUMgXHVENkM0XHVDNUQwXHVCMjk0IFx1Qzc3NFx1QkJGOCBcdUM3OTFcdUMxMzFcdUI0MUMgXHVENTBDXHVCNzk4XHVDMkRDXHVDRTc0XHVCNERDXHVCOTdDIFx1QzIxOFx1QjNEOVx1QzczQ1x1Qjg1QyBcdUMyMThcdUM4MTVcdUQ1NzRcdUM1N0MgXHVENTY4XHVDNzQ0IFx1QzhGQ1x1Qzc1OFx1RDU1OFx1QzJFRFx1QzJEQ1x1QzYyNC5cIixcbiAgICBJTkxJTkVfUkVWRVJTRURfQ0FSRFNfU0VQQVJBVE9SOiBcIlx1Qzc3OFx1Qjc3Q1x1Qzc3OCBcdUJDMThcdUM4MDQgXHVENTBDXHVCNzk4XHVDMkRDXHVDRTc0XHVCNERDIFx1QUQ2Q1x1QkQ4NFx1Qzc5MFwiLFxuICAgIE1VTFRJTElORV9DQVJEU19TRVBBUkFUT1I6IFwiXHVDNUVDXHVCN0VDIFx1QzkwNCBcdUQ1MENcdUI3OThcdUMyRENcdUNFNzRcdUI0REMgXHVBRDZDXHVCRDg0XHVDNzkwXCIsXG4gICAgTVVMVElMSU5FX1JFVkVSU0VEX0NBUkRTX1NFUEFSQVRPUjogXCJcdUM1RUNcdUI3RUMgXHVDOTA0IFx1QkMxOFx1QzgwNCBcdUQ1MENcdUI3OThcdUMyRENcdUNFNzRcdUI0REMgXHVBRDZDXHVCRDg0XHVDNzkwXCIsXG4gICAgTk9URVM6IFwiXHVCMTc4XHVEMkI4XCIsXG4gICAgUkVWSUVXX1BBTkVfT05fU1RBUlRVUDogXCJFbmFibGUgbm90ZSByZXZpZXcgcGFuZSBvbiBzdGFydHVwXCIsXG4gICAgVEFHU19UT19SRVZJRVc6IFwiXHVCOUFDXHVCREYwXHVDNUQwIFx1QzBBQ1x1QzZBOVx1RDU2MCBcdUQwRENcdUFERjhcIixcbiAgICBUQUdTX1RPX1JFVklFV19ERVNDOlxuICAgICAgICBcIlx1RDBEQ1x1QURGOFx1Qjk3QyBcdUFDRjVcdUJDMzEgXHVCNjEwXHVCMjk0IFx1QkU0OCBcdUM5MDRcdUI4NUMgXHVBRDZDXHVCRDg0XHVENTc0XHVDMTFDIFx1Qzc4NVx1QjgyNVx1RDU3NFx1QzhGQ1x1QzEzOFx1QzY5NC4gXHVDNjA4KSAnI3JldmlldyAjdGFnMiAjdGFnMydcIixcbiAgICBPUEVOX1JBTkRPTV9OT1RFOiBcIlx1QjlBQ1x1QkRGMFx1Qjk3QyBcdUM3MDRcdUQ1NzQgXHVCNzlDXHVCMzY0IFx1QjE3OFx1RDJCOFx1Qjk3QyBcdUM1RkRcdUIyQzhcdUIyRTQuXCIsXG4gICAgT1BFTl9SQU5ET01fTk9URV9ERVNDOiBcIlx1Qzc3NCBcdUM2MzVcdUMxNThcdUM3NzQgXHVBRUJDXHVDODM4XHVDNzg4XHVDNzNDXHVCQTc0LCBcdUIxNzhcdUQyQjhcdUIyOTQgXHVDOTExXHVDNjk0XHVCM0M0KFx1RDM5OFx1Qzc3NFx1QzlDMCBcdUI3QURcdUQwNkMpXHVDNUQwIFx1QjUzMFx1Qjc3QyBcdUM4MTVcdUI4MkNcdUI0MjlcdUIyQzhcdUIyRTQuXCIsXG4gICAgQVVUT19ORVhUX05PVEU6IFwiXHVCOUFDXHVCREYwIFx1RDZDNFx1QzVEMCBcdUIyRTRcdUM3NEMgXHVCMTc4XHVEMkI4XHVCOTdDIFx1Qzc5MFx1QjNEOVx1QzczQ1x1Qjg1QyBcdUM1RkRcdUIyQzhcdUIyRTQuXCIsXG4gICAgRElTQUJMRV9GSUxFX01FTlVfUkVWSUVXX09QVElPTlM6XG4gICAgICAgIFwiXHVEMzBDXHVDNzdDIFx1QkE1NFx1QjI3NFx1QzVEMFx1QzExQ1x1Qzc1OCBcdUI5QUNcdUJERjAgXHVDNjM1XHVDMTU4XHVDNzQ0IFx1QkU0NFx1RDY1Q1x1QzEzMVx1RDY1NCBcdUQ1NjlcdUIyQzhcdUIyRTQuIFx1QzYwOCkgXHVCOUFDXHVCREYwOiBFYXN5IEdvb2QgSGFyZFwiLFxuICAgIERJU0FCTEVfRklMRV9NRU5VX1JFVklFV19PUFRJT05TX0RFU0M6XG4gICAgICAgIFwiXHVDNzc0IFx1QzYzNVx1QzE1OFx1Qzc0NCBcdUJFNDRcdUQ2NUNcdUMxMzFcdUQ2NTQgXHVENTVDIFx1RDZDNCwgXHVCQTg1XHVCODM5IFx1QjJFOFx1Q0Q5NVx1RDBBNFx1Qjk3QyBcdUM3NzRcdUM2QTlcdUQ1NzQgXHVCOUFDXHVCREYwXHVENTU4XHVDMkU0IFx1QzIxOCBcdUM3ODhcdUMyQjVcdUIyQzhcdUIyRTQuIFx1Qzc3NCBcdUM2MzVcdUMxNThcdUM3NDQgXHVCQ0MwXHVBQ0JEXHVENTVDIFx1RDZDNFx1QzVEMCBcdUM2MzVcdUMyRENcdUI1MTRcdUM1QjhcdUM3NDQgXHVDMEM4XHVCODVDXHVBQ0UwXHVDRTY4IFx1RDU1OFx1QzJFRFx1QzJEQ1x1QzYyNC5cIixcbiAgICBNQVhfTl9EQVlTX1JFVklFV19RVUVVRTogXCJcdUM2MjRcdUI5NzhcdUNBQkQgXHVEMzI4XHVCMTEwXHVDNUQwIFx1RDQ1Q1x1QzJEQ1x1RDU2MCBcdUNENUNcdUIzMDAgXHVDNzdDXHVDMjE4XCIsXG4gICAgTUlOX09ORV9EQVk6IFwiXHVDODAxXHVDNUI0XHVCM0M0IDFcdUM3NzRcdUMwQzFcdUM3NzRcdUM1QjRcdUM1N0MgXHVENTY5XHVCMkM4XHVCMkU0LlwiLFxuICAgIFZBTElEX05VTUJFUl9XQVJOSU5HOiBcIlx1QzcyMFx1RDZBOFx1RDU1QyBcdUMyMkJcdUM3OTBcdUI5N0MgXHVDNzg1XHVCODI1XHVENTc0XHVDOEZDXHVDMTM4XHVDNjk0LlwiLFxuICAgIFVJX1BSRUZFUkVOQ0VTOiBcIlx1QzBBQ1x1QzZBOVx1Qzc5MCBcdUM3NzhcdUQxMzBcdUQzOThcdUM3NzRcdUMyQTQgXHVBRTMwXHVCQ0Y4IFx1QzEyNFx1QzgxNVwiLFxuICAgIElOSVRJQUxMWV9FWFBBTkRfU1VCREVDS1NfSU5fVFJFRTogXCJcdUIzNzEgXHVEMkI4XHVCOUFDXHVCMjk0IFx1Q0M5OFx1Qzc0Q1x1QzVEMCBcdUQ2NTVcdUM3QTVcdUI0MUMgXHVBQzgzXHVDNzNDXHVCODVDIFx1RDQ1Q1x1QzJEQ1x1QjQxOFx1QzVCNFx1QzU3QyBcdUQ1NjlcdUIyQzhcdUIyRTQuXCIsXG4gICAgSU5JVElBTExZX0VYUEFORF9TVUJERUNLU19JTl9UUkVFX0RFU0M6XG4gICAgICAgIFwiXHVBQzE5XHVDNzQwIFx1Q0U3NFx1QjREQ1x1QzVEMCBcdUM5MTFcdUNDQTlcdUI0MUMgXHVCMzcxXHVDNzQ0IFx1QzgxMVx1QzczQ1x1QjgyNFx1QkE3NCBcdUM3NzQgXHVDNjM1XHVDMTU4XHVDNzQ0IFx1QjA0NFx1QzJFRFx1QzJEQ1x1QzYyNC4gXHVBQzE5XHVDNzQwIFx1RDMwQ1x1Qzc3Q1x1QzVEMCBcdUM1RUNcdUI3RUMgXHVCMzcxXHVDNUQwIFx1QzE4RFx1RDU1QyBcdUNFNzRcdUI0RENcdUFDMDAgXHVDNzg4XHVCMjk0IFx1QUNCRFx1QzZCMCBcdUM3MjBcdUM2QTlcdUQ1NjlcdUIyQzhcdUIyRTQuXCIsXG4gICAgQUxHT1JJVEhNOiBcIlx1QzU0Q1x1QUNFMFx1QjlBQ1x1Qzk5OFwiLFxuICAgIENIRUNLX0FMR09SSVRITV9XSUtJOlxuICAgICAgICAnXHVCMzU0IFx1QjlDRVx1Qzc0MCBcdUM4MTVcdUJDRjRcdUI5N0MgXHVDNkQwXHVENTU4XHVDMkRDXHVCQTc0LCA8YSBocmVmPVwiJHthbGdvX3VybH1cIj5hbGdvcml0aG0gaW1wbGVtZW50YXRpb248L2E+XHVDNzQ0IFx1RDY1NVx1Qzc3OFx1RDU3NFx1QzhGQ1x1QzEzOFx1QzY5NC4nLFxuICAgIEJBU0VfRUFTRTogXCJcdUFFMzBcdUJDRjggZWFzZVwiLFxuICAgIEJBU0VfRUFTRV9ERVNDOiBcIlx1Q0Q1Q1x1QzE5Rlx1QUMxMiA9IDEzMCwgXHVDODAxXHVDODE1XHVDRTU4XHVCMjk0IFx1QjMwMFx1QjdCNSAyNTBcdUM3ODVcdUIyQzhcdUIyRTQuXCIsXG4gICAgQkFTRV9FQVNFX01JTl9XQVJOSU5HOiBcIlx1QUUzMFx1QkNGOCBlYXNlXHVCMjk0IFx1QzgwMVx1QzVCNFx1QjNDNCAxMzAgXHVDNzc0XHVDNUI0XHVDNTdDIFx1RDU2OVx1QjJDOFx1QjJFNC5cIixcbiAgICBMQVBTRV9JTlRFUlZBTF9DSEFOR0U6IFwiXHVENTBDXHVCNzk4XHVDMkRDXHVDRTc0XHVCNERDL1x1QjE3OFx1RDJCOFx1Qjk3QyBcdUM1QjRcdUI4MjRcdUM2QzAoSGFyZClcdUM3M0NcdUI4NUMgXHVCOUFDXHVCREYwXHVENTg4XHVDNzQ0IFx1QjU0Q1x1Qzc1OCBcdUFDMDRcdUFDQTkgXHVCQ0MwXHVBQ0JEXCIsXG4gICAgTEFQU0VfSU5URVJWQUxfQ0hBTkdFX0RFU0M6IFwiXHVDMEM4XHVCODVDXHVDNkI0IFx1QUMwNFx1QUNBOSA9IFx1Qzc3NFx1QzgwNCBcdUFDMDRcdUFDQTkgKiBcdUFDMDRcdUFDQTlcdUJDQzBcdUFDQkQgXHVBQzEyIC8gMTAwLlwiLFxuICAgIEVBU1lfQk9OVVM6IFwiXHVDMjZDXHVDNkMwKEVhc3kpIFx1QkNGNFx1QjEwOFx1QzJBNFwiLFxuICAgIEVBU1lfQk9OVVNfREVTQzpcbiAgICAgICAgXCJcdUMyNkNcdUM2QzAoRWFzeSkgXHVCQ0Y0XHVCMTA4XHVDMkE0XHVCMjk0IFx1RDUwQ1x1Qjc5OFx1QzJEQ1x1Q0U3NFx1QjREQy9cdUIxNzhcdUQyQjhcdUM1RDBcdUMxMUMgXHVDODhCXHVDNzRDKEdvb2QpXHVBQ0ZDIFx1QzI2Q1x1QzZDMChFYXN5KSBcdUMwQUNcdUM3NzRcdUM3NTggXHVBQzA0XHVBQ0E5IFx1Q0MyOFx1Qzc3NFx1Qjk3QyBcdUMxMjRcdUM4MTVcdUQ1NjAgXHVDMjE4IFx1Qzc4OFx1QzJCNVx1QjJDOFx1QjJFNC4gKFx1Q0Q1Q1x1QzE4QyA9IDEwMCUpXCIsXG4gICAgRUFTWV9CT05VU19NSU5fV0FSTklORzogXCJcdUMyNkNcdUM2QzAoRWFzeSkgXHVCQ0Y0XHVCMTA4XHVDMkE0XHVCMjk0IFx1QzgwMVx1QzVCNFx1QjNDNCAxMDBcdUM3NzRcdUM1QjRcdUM1N0MgXHVENTY5XHVCMkM4XHVCMkU0LlwiLFxuICAgIE1BWF9JTlRFUlZBTDogXCJNYXhpbXVtIGludGVydmFsIGluIGRheXNcIixcbiAgICBNQVhfSU5URVJWQUxfREVTQzogXCJcdUFDMDRcdUFDQTlcdUM3NTggXHVDMEMxXHVENTVDXHVDMTIwXHVDNzQ0IFx1QjQ1OCBcdUMyMTggXHVDNzg4XHVDMkI1XHVCMkM4XHVCMkU0LiAoXHVBRTMwXHVCQ0Y4XHVBQzEyID0gMTAwXHVCMTQ0KVwiLFxuICAgIE1BWF9JTlRFUlZBTF9NSU5fV0FSTklORzogXCJcdUNENUNcdUIzMDAgXHVBQzA0XHVBQ0E5XHVDNzQwIFx1QzgwMVx1QzVCNFx1QjNDNCAxXHVDNzdDXHVDNzc0XHVDNUI0XHVDNTdDIFx1RDU2OVx1QjJDOFx1QjJFNC5cIixcbiAgICBNQVhfTElOS19DT05UUklCOiBcIlx1Q0Q1Q1x1QjMwMCBcdUM1RjBcdUFDQjAgXHVBRTMwXHVDNUVDXHVCM0M0XCIsXG4gICAgTUFYX0xJTktfQ09OVFJJQl9ERVNDOlxuICAgICAgICBcIlx1QjlDMVx1RDA2Q1x1QjQxQyBcdUIxNzhcdUQyQjhcdUM3NTggXHVDRDA4XHVBRTMwIGVhc2VcdUM1RDAgXHVCMzAwXHVENTVDIFx1QUMwMFx1QzkxMVx1Q0U1OFx1QUMwMCBcdUM4MDFcdUM2QTlcdUI0MUMgZWFzZVx1Qzc1OCBcdUNENUNcdUIzMDAgXHVBRTMwXHVDNUVDXHVCM0M0XHVDNzg1XHVCMkM4XHVCMkU0LlwiLFxuICAgIExPR0dJTkc6IFwiXHVCODVDXHVBRTQ1XCIsXG4gICAgRElTUExBWV9ERUJVR19JTkZPOiBcIlx1QjUxNFx1QkM4NFx1QUU0NSBcdUM4MTVcdUJDRjRcdUI5N0MgXHVBQzFDXHVCQzFDXHVDNzkwIFx1Q0Y1OFx1QzE5NFx1QzVEMCBcdUQ0NUNcdUMyRENcdUQ1NThcdUMyRENcdUFDQTBcdUMyQjVcdUIyQzhcdUFFNEM/XCIsXG5cbiAgICAvLyBzaWRlYmFyLnRzXG4gICAgTk9URVNfUkVWSUVXX1FVRVVFOiBcIlx1QjlBQ1x1QkRGMFx1RDU2MCBcdUIxNzhcdUQyQjggXHVCMzAwXHVBRTMwXHVDNUY0XCIsXG4gICAgQ0xPU0U6IFwiXHVCMkVCXHVBRTMwXCIsXG4gICAgTkVXOiBcIk5ld1wiLFxuICAgIFlFU1RFUkRBWTogXCJcdUM1QjRcdUM4MUNcIixcbiAgICBUT0RBWTogXCJcdUM2MjRcdUIyOThcIixcbiAgICBUT01PUlJPVzogXCJcdUIwQjRcdUM3N0NcIixcblxuICAgIC8vIHN0YXRzLW1vZGFsLnRzeFxuICAgIFNUQVRTX1RJVExFOiBcIlx1RDFCNVx1QUNDNFwiLFxuICAgIE1PTlRIOiBcIlx1QzZENFwiLFxuICAgIFFVQVJURVI6IFwiXHVCRDg0XHVBRTMwXCIsXG4gICAgWUVBUjogXCJcdUIxNDRcIixcbiAgICBMSUZFVElNRTogXCJcdUQzQzlcdUMwRERcIixcbiAgICBGT1JFQ0FTVDogXCJcdUM2MDhcdUNFMjFcIixcbiAgICBGT1JFQ0FTVF9ERVNDOiBcIlx1Qzc3NFx1RDZDNFx1QzVEMCBcdUQ1NTlcdUMyQjVcdUQ1NjAgXHVDRTc0XHVCNERDXHVDNzU4IFx1QzIxOFwiLFxuICAgIFNDSEVEVUxFRDogXCJTY2hlZHVsZWRcIixcbiAgICBEQVlTOiBcIlx1Qzc3Q1wiLFxuICAgIE5VTUJFUl9PRl9DQVJEUzogXCJcdUNFNzRcdUI0RENcdUM3NTggXHVDMjE4XCIsXG4gICAgUkVWSUVXU19QRVJfREFZOiBcIlx1RDNDOVx1QURFMDogJHthdmd9IFx1QjlBQ1x1QkRGMC9cdUM3N0NcIixcbiAgICBJTlRFUlZBTFM6IFwiXHVBQzA0XHVBQ0E5XCIsXG4gICAgSU5URVJWQUxTX0RFU0M6IFwiXHVCOUFDXHVCREYwXHVCOTdDIFx1QjJFNFx1QzJEQyBcdUQ1NjAgXHVCNTRDIFx1QUU0Q1x1QzlDMFx1Qzc1OCBcdUFFMzBcdUFDMDRcIixcbiAgICBDT1VOVDogXCJDb3VudFwiLFxuICAgIElOVEVSVkFMU19TVU1NQVJZOiBcIlx1RDNDOVx1QURFMCBcdUFDMDRcdUFDQTk6ICR7YXZnfSwgXHVBQzAwXHVDN0E1IFx1QUUzNCBcdUFDMDRcdUFDQTk6ICR7bG9uZ2VzdH1cIixcbiAgICBFQVNFUzogXCJFYXNlc1wiLFxuICAgIEVBU0VTX1NVTU1BUlk6IFwiQXZlcmFnZSBlYXNlOiAke2F2Z0Vhc2V9XCIsXG4gICAgQ0FSRF9UWVBFUzogXCJcdUNFNzRcdUI0REMgXHVEMEMwXHVDNzg1XCIsXG4gICAgQ0FSRF9UWVBFU19ERVNDOiBcIlx1QzVFQ1x1QUUzMFx1QzVEMFx1QjI5NCBcdUJCM0JcdUM1QjRcdUI0NTQgXHVDRTc0XHVCNERDXHVCM0M0IFx1RDNFQ1x1RDU2OFx1QjQyOVx1QjJDOFx1QjJFNC5cIixcbiAgICBDQVJEX1RZUEVfTkVXOiBcIk5ld1wiLFxuICAgIENBUkRfVFlQRV9ZT1VORzogXCJZb3VuZ1wiLFxuICAgIENBUkRfVFlQRV9NQVRVUkU6IFwiTWF0dXJlXCIsXG4gICAgQ0FSRF9UWVBFU19TVU1NQVJZOiBcIlx1QzgwNFx1Q0NCNCBcdUNFNzRcdUI0REMgXHVDMjE4OiAke3RvdGFsQ2FyZHNDb3VudH1cIixcbn07XG4iLCAiLy8gTWFyYXRoaVxuXG5leHBvcnQgZGVmYXVsdCB7fTtcbiIsICIvLyBOZWRlcmxhbmRzXG5cbmV4cG9ydCBkZWZhdWx0IHt9O1xuIiwgIi8vIE5vcnNrXG5cbmV4cG9ydCBkZWZhdWx0IHt9O1xuIiwgIi8vIGpcdTAxMTl6eWsgcG9sc2tpXG5cbmV4cG9ydCBkZWZhdWx0IHt9O1xuIiwgIi8vIFBvcnR1Z3VcdTAwRUFzXG5cbmV4cG9ydCBkZWZhdWx0IHt9O1xuIiwgIi8vIFBvcnR1Z3VcdTAwRUFzIGRvIEJyYXNpbFxuLy8gQnJhemlsaWFuIFBvcnR1Z3Vlc2VcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIC8vIGZsYXNoY2FyZC1tb2RhbC50c3hcbiAgICBERUNLUzogXCJCYXJhbGhvc1wiLFxuICAgIERVRV9DQVJEUzogXCJDYXJ0YXMgcGFyYSBDb2xvY2FyIGVtIERpYVwiLFxuICAgIE5FV19DQVJEUzogXCJOb3ZhcyBDYXJ0YXNcIixcbiAgICBUT1RBTF9DQVJEUzogXCJUb3RhbCBkZSBDYXJ0YXNcIixcbiAgICBCQUNLOiBcIkJhY2tcIixcbiAgICBTS0lQOiBcIlNraXBcIixcbiAgICBFRElUX0NBUkQ6IFwiRWRpdCBDYXJkXCIsXG4gICAgUkVTRVRfQ0FSRF9QUk9HUkVTUzogXCJSZWluaWNpYXIgbyBQcm9ncmVzc28gZGEgQ2FydGFcIixcbiAgICBIQVJEOiBcIkRpZlx1MDBFRGNpbFwiLFxuICAgIEdPT0Q6IFwiT0tcIixcbiAgICBFQVNZOiBcIkZcdTAwRTFjaWxcIixcbiAgICBTSE9XX0FOU1dFUjogXCJNb3N0cmFyIFJlc3Bvc3RhXCIsXG4gICAgQ0FSRF9QUk9HUkVTU19SRVNFVDogXCJPIFByb2dyZXNzbyBkYSBDYXJ0YSBmb2kgcmVpbmljaWFkb1wiLFxuICAgIFNBVkU6IFwiU2F2ZVwiLFxuICAgIENBTkNFTDogXCJDYW5jZWxcIixcbiAgICBOT19JTlBVVDogXCJObyBpbnB1dCBwcm92aWRlZC5cIixcbiAgICBDVVJSRU5UX0VBU0VfSEVMUF9URVhUOiBcIkN1cnJlbnQgRWFzZTogXCIsXG4gICAgQ1VSUkVOVF9JTlRFUlZBTF9IRUxQX1RFWFQ6IFwiQ3VycmVudCBJbnRlcnZhbDogXCIsXG4gICAgQ0FSRF9HRU5FUkFURURfRlJPTTogXCJHZW5lcmF0ZWQgZnJvbTogJHtub3RlUGF0aH1cIixcblxuICAgIC8vIG1haW4udHNcbiAgICBPUEVOX05PVEVfRk9SX1JFVklFVzogXCJBYnJpciB1bWEgbm90YSBwYXJhIHJldmlzYXJcIixcbiAgICBSRVZJRVdfQ0FSRFM6IFwiUmV2aXNhciBmbGFzaGNhcmRzXCIsXG4gICAgUkVWSUVXX0VBU1lfRklMRV9NRU5VOiBcIlJldmlzXHUwMEUzbzogRlx1MDBFMWNpbFwiLFxuICAgIFJFVklFV19HT09EX0ZJTEVfTUVOVTogXCJSZXZpc1x1MDBFM286IE9LXCIsXG4gICAgUkVWSUVXX0hBUkRfRklMRV9NRU5VOiBcIlJldmlzXHUwMEUzbzogRGlmXHUwMEVEY2lsXCIsXG4gICAgUkVWSUVXX05PVEVfRUFTWV9DTUQ6IFwiUmV2aXNhciBub3RhIGNvbW8gZlx1MDBFMWNpbFwiLFxuICAgIFJFVklFV19OT1RFX0dPT0RfQ01EOiBcIlJldmlzYXIgbm90YSBjb21vIE9LXCIsXG4gICAgUkVWSUVXX05PVEVfSEFSRF9DTUQ6IFwiUmV2aXNhciBub3RhIGNvbW8gZGlmXHUwMEVEY2lsXCIsXG4gICAgUkVWSUVXX0FMTF9DQVJEUzogXCJSZXZpc2FyIGZsYXNoY2FyZHMgZGUgdG9kYXMgYXMgbm90YXNcIixcbiAgICBDUkFNX0FMTF9DQVJEUzogXCJTZWxlY3QgYSBkZWNrIHRvIGNyYW1cIixcbiAgICBSRVZJRVdfQ0FSRFNfSU5fTk9URTogXCJSZXZpc2FyIGZsYXNoY2FyZHMgbmVzc2Egbm90YVwiLFxuICAgIENSQU1fQ0FSRFNfSU5fTk9URTogXCJSZXZpc2FyIHRvZGFzIGFzIGZsYXNoY2FyZHMgbmVzc2Egbm90YVwiLFxuICAgIFZJRVdfU1RBVFM6IFwiVmVyIGVzdGF0XHUwMEVEc3RpY2FzXCIsXG4gICAgU1RBVFVTX0JBUjpcbiAgICAgICAgXCJSZXZpc1x1MDBFM286ICR7ZHVlTm90ZXNDb3VudH0gbm90YShzKSwgJHtkdWVGbGFzaGNhcmRzQ291bnR9IENhcnRhKHMpIHBhcmEgY29sb2NhciBlbSBkaWFcIixcbiAgICBTWU5DX1RJTUVfVEFLRU46IFwiU2ljcm9uaXphXHUwMEU3XHUwMEUzbyBsZXZvdSAke3R9bXNcIixcbiAgICBOT1RFX0lOX0lHTk9SRURfRk9MREVSOiBcIk5vdGEgXHUwMEU5IHNhbHZhIG5hIHBhc3RhIGlnbm9yYWRhIChjaGVxdWUgYXMgY29uZmlndXJhXHUwMEU3XHUwMEY1ZXMpLlwiLFxuICAgIFBMRUFTRV9UQUdfTk9URTogXCJQb3IgZmF2b3IgZXRpcXVldGUgYSBub3RhIGFwcm9wcmlhZGFtZW50ZSBwYXJhIHJldmlzYXIgKG5hcyBjb25maWd1cmFcdTAwRTdcdTAwRjVlcykuXCIsXG4gICAgUkVTUE9OU0VfUkVDRUlWRUQ6IFwiUmVzcG9zdGEgcmVjZWJpZGEuXCIsXG4gICAgTk9fREVDS19FWElTVFM6IFwiTmVuaHVtIGJhcmFsaG8gZXhpc3RlIHBhcmEgJHtkZWNrTmFtZX1cIixcbiAgICBBTExfQ0FVR0hUX1VQOiBcIlZvY1x1MDBFQSBjb2xvY291IHR1ZG8gZW0gcHJhem8gYWdvcmEgOkQuXCIsXG5cbiAgICAvLyBzY2hlZHVsaW5nLnRzXG4gICAgREFZU19TVFJfSVZMOiBcIiR7aW50ZXJ2YWx9IGRpYShzKVwiLFxuICAgIE1PTlRIU19TVFJfSVZMOiBcIiR7aW50ZXJ2YWx9IG1cdTAwRUFzKGVzKVwiLFxuICAgIFlFQVJTX1NUUl9JVkw6IFwiJHtpbnRlcnZhbH0gYW5vKHMpXCIsXG4gICAgREFZU19TVFJfSVZMX01PQklMRTogXCIke2ludGVydmFsfWRcIixcbiAgICBNT05USFNfU1RSX0lWTF9NT0JJTEU6IFwiJHtpbnRlcnZhbH1tXCIsXG4gICAgWUVBUlNfU1RSX0lWTF9NT0JJTEU6IFwiJHtpbnRlcnZhbH1hXCIsXG5cbiAgICAvLyBzZXR0aW5ncy50c1xuICAgIFNFVFRJTkdTX0hFQURFUjogXCJQbGd1aW4gU3BhY2VkIFJlcGV0aXRpb24gLSBDb25maWd1cmFcdTAwRTdcdTAwRTNvXCIsXG4gICAgQ0hFQ0tfV0lLSTogJ1BhcmEgbWFpcyBpbmZvcm1hXHUwMEU3XHUwMEY1ZXMsIGNoZWNrZSBvIDxhIGhyZWY9XCIke3dpa2lfdXJsfVwiPndpa2k8L2E+LicsXG4gICAgRk9MREVSU19UT19JR05PUkU6IFwiUGFzdGFzIHBhcmEgaWdub3JhclwiLFxuICAgIEZPTERFUlNfVE9fSUdOT1JFX0RFU0M6XG4gICAgICAgIFwiRW5zaXJhIG8gY2FtaW5obyBkYXMgcGFzdGFzIHNlcGFyYWRvIHBvciBxdWVicmFzIGRlIGxpbmhhIGV4OiBUZW1wbGF0ZXMgTWV0YS9TY3JpcHRzXCIsXG4gICAgRkxBU0hDQVJEUzogXCJGbGFzaGNhcmRzXCIsXG4gICAgRkxBU0hDQVJEX0VBU1lfTEFCRUw6IFwiVGV4dG8gZG8gQm90XHUwMEUzbyBkZSBGXHUwMEUxY2lsXCIsXG4gICAgRkxBU0hDQVJEX0dPT0RfTEFCRUw6IFwiVGV4dG8gZG8gQm90XHUwMEUzbyBkZSBPS1wiLFxuICAgIEZMQVNIQ0FSRF9IQVJEX0xBQkVMOiBcIlRleHRvIGRvIEJvdFx1MDBFM28gZGUgRGlmXHUwMEVEY2lsXCIsXG4gICAgRkxBU0hDQVJEX0VBU1lfREVTQzogJ0Nvc3R1bWl6ZSBvIHJcdTAwRjN0dWxvIHBhcmEgbyBib3RcdTAwRTNvIGRlIFwiRlx1MDBFMWNpbFwiJyxcbiAgICBGTEFTSENBUkRfR09PRF9ERVNDOiAnQ29zdHVtaXplIG8gclx1MDBGM3R1bG8gcGFyYSBvIGJvdFx1MDBFM28gZGUgXCJPS1wiJyxcbiAgICBGTEFTSENBUkRfSEFSRF9ERVNDOiAnQ3VzdG9taXplIG8gclx1MDBGM3R1bG8gcGFyYSBvIGJvdFx1MDBFM28gZGUgXCJEaWZcdTAwRURjaWxcIicsXG4gICAgRkxBU0hDQVJEX1RBR1M6IFwiRXRpcXVldGFzIGRvcyBGbGFzaGNhcmRzXCIsXG4gICAgRkxBU0hDQVJEX1RBR1NfREVTQzpcbiAgICAgICAgXCJFbnNpcmEgZXRpcXVldGFzIHNlcGFyYWRhcyBwb3IgZXNwYVx1MDBFN29zIG91IHF1ZWJyYXMgZGUgbGluaGEgZXg6ICNmbGFzaGNhcmRzICNiYXJhbGhvMiAjYmFyYWxobzMuXCIsXG4gICAgQ09OVkVSVF9GT0xERVJTX1RPX0RFQ0tTOiBcIkNvbnZlcnRlciBwYXN0YXMgcGFyYSBiYXJhbGhvcyBlIHN1Yi1iYXJhbGhvcz9cIixcbiAgICBDT05WRVJUX0ZPTERFUlNfVE9fREVDS1NfREVTQzpcbiAgICAgICAgXCJJc3NvIFx1MDBFOSB1bWEgYWx0ZXJuYXRpdmEgcGFyYSBhIG9wXHUwMEU3XHUwMEUzbyBkZSBldGlxdWV0YSBkb3MgRmxhc2hjYXJkcyBlbSBjaW1hLlwiLFxuICAgIElOTElORV9TQ0hFRFVMSU5HX0NPTU1FTlRTOlxuICAgICAgICBcIlNhbHZhciBjb21lbnRcdTAwRTFyaW9zIGRlIGFnZW5kYW1lbnRvIG5hIG1lc21hIGxpbmhhIHF1ZSBhIFx1MDBGQWx0aW1hIGxpbmhhIGRvIGZsYXNoY2FyZD9cIixcbiAgICBJTkxJTkVfU0NIRURVTElOR19DT01NRU5UU19ERVNDOlxuICAgICAgICBcIkxpZ2FyIGlzc28gdmFpIGZhemVyIGNvbSBxdWUgb3MgY29tZW50XHUwMEUxcmlvcyBlbSBIVE1MIG5cdTAwRTNvIHF1ZWJyZW0gYSBmb3JtYXRhXHUwMEU3XHUwMEUzbyBkZSBsaXN0YXMuXCIsXG4gICAgQlVSWV9TSUJMSU5HU19USUxMX05FWFRfREFZOiBcIkVudGVycmFyIGNhcnRhcyBpcm1cdTAwRTNzIGF0XHUwMEU5IG8gcHJcdTAwRjN4aW1vIGRpYT9cIixcbiAgICBCVVJZX1NJQkxJTkdTX1RJTExfTkVYVF9EQVlfREVTQzpcbiAgICAgICAgXCJDYXJ0YXMgaXJtXHUwMEUzcyBzXHUwMEUzbyBnZXJhZGFzIHBlbG8gdGV4dG8gZGEgbWVzbWEgY2FydGEgZXg6IG9taXNzXHUwMEUzbyBkZSBwYWxhdnJhc1wiLFxuICAgIFNIT1dfQ0FSRF9DT05URVhUOiBcIk1vc3RyYXIgY29ueHRleHRvIG5hcyBjYXJ0YXM/XCIsXG4gICAgU0hPV19DQVJEX0NPTlRFWFRfREVTQzogXCJleDogVFx1MDBFRHR1bG8gPiBDYWJlXHUwMEU3YWxobyAxID4gU3ViY2FiZVx1MDBFN2FsaG8gPiAuLi4gPiBTdWJjYWJlXHUwMEU3YWxob1wiLFxuICAgIENBUkRfTU9EQUxfSEVJR0hUX1BFUkNFTlQ6IFwiUG9yY2VudGFnZW0gZGEgQWx0dXJhIGRvIEZsYXNoY2FyZFwiLFxuICAgIENBUkRfTU9EQUxfU0laRV9QRVJDRU5UX0RFU0M6XG4gICAgICAgIFwiRGV2ZXJpYSBlc3RhciBjb25maWd1cmFkbyBlbSAxMDAlIGVtIGRpc3Bvc2l0aXZvcyBtXHUwMEYzdmVpcyBvdSBzZSB2b2NcdTAwRUEgdGVtIGltYWdlbnMgbXVpdG8gZ3JhbmRlc1wiLFxuICAgIFJFU0VUX0RFRkFVTFQ6IFwiUmVpbmljaWFyIHBhcmEgYSBwclx1MDBFOS1kZWZpbmlcdTAwRTdcdTAwRTNvXCIsXG4gICAgQ0FSRF9NT0RBTF9XSURUSF9QRVJDRU5UOiBcIlBvcmNlbnRhZ2VtIGRlIExhcmd1cmEgZG8gRmxhc2hjYXJkXCIsXG4gICAgUkFORE9NSVpFX0NBUkRfT1JERVI6IFwiQWxlYXRvcml6YXIgYSBvcmRlbSBkYXMgY2FydGFzIGR1cmFudGUgYSByZXZpc1x1MDBFM28/XCIsXG4gICAgRElTQUJMRV9DTE9aRV9DQVJEUzogXCJEZXNhYmlsaXRhciBjYXJ0YXMgcXVlIHVzYW0gb21pc3NcdTAwRTNvIGRlIHBhbGF2cmFzP1wiLFxuICAgIENPTlZFUlRfSElHSExJR0hUU19UT19DTE9aRVM6IFwiQ29udmVydGVyID09bWFyY2EtdGV4dG89PSBlbSBvbWlzc1x1MDBGNWVzP1wiLFxuICAgIENPTlZFUlRfQk9MRF9URVhUX1RPX0NMT1pFUzogXCJDb252ZXJ0ZXIgKip0ZXh0byBlbSBuZWdyaXRvKiogZW0gb21pc3NcdTAwRjVlcz9cIixcbiAgICBDT05WRVJUX0NVUkxZX0JSQUNLRVRTX1RPX0NMT1pFUzogXCJDb252ZXJ0ZXIge3tjaGF2ZXN9fSBlbSBvbWlzc1x1MDBGNWVzP1wiLFxuICAgIElOTElORV9DQVJEU19TRVBBUkFUT1I6IFwiU2VwYXJhZG9yIHBhcmEgZmxhc2hjYXJkcyBpbmxpbmVcIixcbiAgICBGSVhfU0VQQVJBVE9SU19NQU5VQUxMWV9XQVJOSU5HOlxuICAgICAgICBcIk5vdGUgcXVlIGRlcG9pcyBkZSBtdWRhciBpc3NvIHZvY1x1MDBFQSB2YWkgdGVyIHF1ZSBtYW51YWxtZW50ZSBtdWRhciBxdWFpc3F1ZXIgZmxhc2hjYXJkcyBxdWUgdm9jXHUwMEVBIHRlbmhhLlwiLFxuICAgIElOTElORV9SRVZFUlNFRF9DQVJEU19TRVBBUkFUT1I6IFwiU2VwYXJhZG9yIHBhcmEgZmxhc2hjYXJkcyBpbmxpbmUgcmV2ZXJzb3NcIixcbiAgICBNVUxUSUxJTkVfQ0FSRFNfU0VQQVJBVE9SOiBcIlNlcGFyYWRvciBwYXJhIGZsYXNoY2FyZHMgZGUgbVx1MDBGQWx0aXBsYXMgbGluaGFzXCIsXG4gICAgTVVMVElMSU5FX1JFVkVSU0VEX0NBUkRTX1NFUEFSQVRPUjogXCJTZXBhcmFkb3IgcGFyYSBmbGFzaGNhcmRzIGRlIG1cdTAwRkFsdGlwbGFzIGxpbmhhcyByZXZlcnNvc1wiLFxuICAgIE5PVEVTOiBcIk5vdGFzXCIsXG4gICAgUkVWSUVXX1BBTkVfT05fU1RBUlRVUDogXCJFbmFibGUgbm90ZSByZXZpZXcgcGFuZSBvbiBzdGFydHVwXCIsXG4gICAgVEFHU19UT19SRVZJRVc6IFwiRXRpcXVldGFzIHBhcmEgcmV2aXNhclwiLFxuICAgIFRBR1NfVE9fUkVWSUVXX0RFU0M6XG4gICAgICAgIFwiRW5zaXJhIGV0aXF1ZXRhcyBzZXBhcmFkYXMgcG9yIGVzcGFcdTAwRTdvcyBvdSBxdWVicmEgZGUgbGluaGFzIGV4OiAjcmV2aXNhciAjZXRpcXVldGEyICNldGlxdWV0YTMuXCIsXG4gICAgT1BFTl9SQU5ET01fTk9URTogXCJBYnJpciB1bWEgbm90YSBhbGVhdFx1MDBGM3JpYSBwYXJhIHJldmlzYXJcIixcbiAgICBPUEVOX1JBTkRPTV9OT1RFX0RFU0M6XG4gICAgICAgIFwiUXVhbmRvIHZvY1x1MDBFQSBkZXNhYmlsaXRhciBpc3NvLCBhcyBub3RhcyB2XHUwMEUzbyBzZXIgb3JkZW5hZGFzIHBvciBpbXBvcnRcdTAwRTJuY2lhIChQYWdlUmFuaykuXCIsXG4gICAgQVVUT19ORVhUX05PVEU6IFwiQWJyaXIgYSBwclx1MDBGM3hpbWEgbm90YSBhdXRvbWF0aWNhbWVudGUgZGVwb2lzIGRlIHVtYSByZXZpc1x1MDBFM29cIixcbiAgICBESVNBQkxFX0ZJTEVfTUVOVV9SRVZJRVdfT1BUSU9OUzpcbiAgICAgICAgXCJEZXNhYmlsaXRhciBvcFx1MDBFN1x1MDBGNWVzIGRlIHJldmlzXHUwMEUzbyBubyBtZW51IGRlIGFycXVpdm9zIGV4OiBSZXZpc1x1MDBFM286IEZcdTAwRTFjaWwgT0sgRGlmXHUwMEVEY2lsXCIsXG4gICAgRElTQUJMRV9GSUxFX01FTlVfUkVWSUVXX09QVElPTlNfREVTQzpcbiAgICAgICAgXCJEZXBvaXMgZGUgZGVzYWJpbGl0YXIsIHZvY1x1MDBFQSBwb2RlIHJldmlzYXIgdXNhbmRvIG9zIGF0YWxob3MgZGUgY29tYW5kby4gUmVpbmljaWUgT2JzaWRpYW4gZGVwb2lzIGRlIG11ZGFyIGlzc28uXCIsXG4gICAgTUFYX05fREFZU19SRVZJRVdfUVVFVUU6IFwiTlx1MDBGQW1lcm8gbVx1MDBFMXhpbW8gZGUgZGlhcyBwYXJhIGV4aWJpciBubyBwYWluZWwgZGlyZWl0b1wiLFxuICAgIE1JTl9PTkVfREFZOiBcIk8gblx1MDBGQW1lcm8gZGUgZGlhcyBkZXZlIHNlciBwZWxvIG1lbm9zIDEuXCIsXG4gICAgVkFMSURfTlVNQkVSX1dBUk5JTkc6IFwiUG9yIGZhdm9yIGVuc2lyYSB1bSBuXHUwMEZBbWVybyB2XHUwMEUxbGlkby5cIixcbiAgICBVSV9QUkVGRVJFTkNFUzogXCJQcmVmZXJcdTAwRUFuY2lhcyBkZSBVSVwiLFxuICAgIElOSVRJQUxMWV9FWFBBTkRfU1VCREVDS1NfSU5fVFJFRTpcbiAgICAgICAgXCJcdTAwQzFydm9yZXMgZGUgYmFyYWxob3MgZGV2ZW0gaW5pY2lhbG1lbnRlIHNlcmVtIGV4aWJpZGFzIGNvbW8gZXhwYW5kaWRhc1wiLFxuICAgIElOSVRJQUxMWV9FWFBBTkRfU1VCREVDS1NfSU5fVFJFRV9ERVNDOlxuICAgICAgICBcIkRlc2FiaWxpdGUgaXNzbyBwYXJhIGNvbGFwc2FyIGJhcmFsaG9zIHF1ZSBlc3RcdTAwRTNvIHVtIGRlbnRybyBkbyBvdXRybyBuYSBtZXNtYSBjYXJ0YS4gXHUwMERBdGlsIHNlIHZvY1x1MDBFQSB0ZW0gY2FydGFzIHF1ZSBwZXJ0ZW5jZW0gYSBtdWl0b3MgYmFyYWxob3MgZW0gdW0gbWVzbW8gYXJxdWl2by5cIixcbiAgICBBTEdPUklUSE06IFwiQWxnb3JcdTAwRUR0bW9cIixcbiAgICBDSEVDS19BTEdPUklUSE1fV0lLSTpcbiAgICAgICAgJ1BhcmEgbWFpcyBpbmZvcm1hXHUwMEU3XHUwMEY1ZXMsIGNoZXF1ZSBhIDxhIGhyZWY9XCIke2FsZ29fdXJsfVwiPmltcGxlbWVudGFcdTAwRTdcdTAwRTNvIGRvIGFsZ29yXHUwMEVEdG1vPC9hPi4nLFxuICAgIEJBU0VfRUFTRTogXCJGYWNpbGlkYWRlIGJhc2VcIixcbiAgICBCQVNFX0VBU0VfREVTQzogXCJtXHUwMEVEbmltbyA9IDEzMCwgcHJlZmVyaXZlbG1lbnRlIGFwcm94aW1hZGFtZW50ZSAyNTAuXCIsXG4gICAgQkFTRV9FQVNFX01JTl9XQVJOSU5HOiBcIkEgZmFjaWxpZGFkZSBiYXNlIGRldmUgc2VyIHBlbG8gbWVub3MgMTMwLlwiLFxuICAgIExBUFNFX0lOVEVSVkFMX0NIQU5HRTpcbiAgICAgICAgXCJNdWRhblx1MDBFN2EgZGUgaW50ZXJ2YWxvIHF1YW5kbyB2b2NcdTAwRUEgcmV2aXNhIHVtKGEpIGZsYXNoY2FyZC9ub3RhIGNvbW8gZGlmXHUwMEVEY2lsXCIsXG4gICAgTEFQU0VfSU5URVJWQUxfQ0hBTkdFX0RFU0M6IFwibm92b0ludGVydmFsbyA9IHZlbGhvSW50ZXJ2YWxvICogbXVkYW5jYUludGVydmFsbyAvIDEwMC5cIixcbiAgICBFQVNZX0JPTlVTOiBcIkJcdTAwRjRudXMgZGUgRlx1MDBFMWNpbFwiLFxuICAgIEVBU1lfQk9OVVNfREVTQzpcbiAgICAgICAgXCJPIGJcdTAwRjRudXMgZGUgZlx1MDBFMWNpbCB0ZSBwZXJtaXRlIG11ZGFyIGEgZGlmZXJcdTAwRUFuY2lhIGVudHJlIGludGVydmFsb3MgZGUgcmVzcG9uZGVyIE9LIGUgRlx1MDBFMWNpbCBlbSB1bShhKSBmbGFzaGNhcmQvbm90YSAobVx1MDBFRG5pbW8gPSAxMDAlKS5cIixcbiAgICBFQVNZX0JPTlVTX01JTl9XQVJOSU5HOiBcIk8gYlx1MDBGNG51cyBkZSBmXHUwMEUxY2lsIGRldmUgc2VyIHBlbG8gbWVub3MgMTAwLlwiLFxuICAgIE1BWF9JTlRFUlZBTDogXCJNYXhpbXVtIGludGVydmFsIGluIGRheXNcIixcbiAgICBNQVhfSU5URVJWQUxfREVTQzpcbiAgICAgICAgXCJUZSBwZXJtaXRlIGNvbG9jYXIgdW0gbGltaXRlIG1cdTAwRTF4aW1vIG5vIGludGVydmFsbyAocHJcdTAwRTktZGVmaW5pXHUwMEU3XHUwMEUzbyA9IDEwMCBhbm9zKS5cIixcbiAgICBNQVhfSU5URVJWQUxfTUlOX1dBUk5JTkc6IFwiTyBpbnRlcnZhbG8gbVx1MDBFMXhpbW8gZGV2ZSBzZXIgcGVsbyBtZW5vcyAxIGRpYS5cIixcbiAgICBNQVhfTElOS19DT05UUklCOiBcIkNvbnRyaWJ1aVx1MDBFN1x1MDBFM28gTVx1MDBFMXhpbWEgZGUgTGlua3NcIixcbiAgICBNQVhfTElOS19DT05UUklCX0RFU0M6XG4gICAgICAgIFwiQ29udHJpYnVpXHUwMEU3XHUwMEUzbyBtXHUwMEUxeGltYSBkYSBmYWNpbGlkYWRlIHBvbmRlcmFkYSBkYXMgbm90YXMgbGlua2FkYXMgXHUwMEUwIGZhY2lsaWRhZGUgaW5pY2lhbC5cIixcbiAgICBMT0dHSU5HOiBcIkxvZ2dpbmdcIixcbiAgICBESVNQTEFZX0RFQlVHX0lORk86IFwiTW9zdHJhciBpbmZvcm1hXHUwMEU3XHUwMEUzbyBkZSBkZWJ1Z2dpbmcgbm8gY29uc29sZSBkZSBkZXNlbnZvbHZpbWVudG8/XCIsXG5cbiAgICAvLyBzaWRlYmFyLnRzXG4gICAgTk9URVNfUkVWSUVXX1FVRVVFOiBcIkZpbGEgZGUgTm90YXMgcGFyYSBSZXZpc2FyXCIsXG4gICAgQ0xPU0U6IFwiRmVjaGFyXCIsXG4gICAgTkVXOiBcIk5vdm9cIixcbiAgICBZRVNURVJEQVk6IFwiT250ZW1cIixcbiAgICBUT0RBWTogXCJIb2plXCIsXG4gICAgVE9NT1JST1c6IFwiQW1hbmhcdTAwRTNcIixcblxuICAgIC8vIHN0YXRzLW1vZGFsLnRzeFxuICAgIFNUQVRTX1RJVExFOiBcIkVzdGF0XHUwMEVEc3RpY2FzXCIsXG4gICAgTU9OVEg6IFwiTVx1MDBFQXNcIixcbiAgICBRVUFSVEVSOiBcIlF1YXJ0b1wiLFxuICAgIFlFQVI6IFwiQW5vXCIsXG4gICAgTElGRVRJTUU6IFwiVGVtcG8gVG90YWxcIixcbiAgICBGT1JFQ0FTVDogXCJQcmV2aXNcdTAwRTNvXCIsXG4gICAgRk9SRUNBU1RfREVTQzogXCJPIG5cdTAwRkFtZXJvIGRlIGNhcnRhcyBhIHNlcmVtIGNvbG9jYWRhcyBlbSBkaWEgbm8gZnV0dXJvXCIsXG4gICAgU0NIRURVTEVEOiBcIkFnZW5kYWRvXCIsXG4gICAgREFZUzogXCJEaWFzXCIsXG4gICAgTlVNQkVSX09GX0NBUkRTOiBcIk5cdTAwRkFtZXJvIGRlIGNhcnRhc1wiLFxuICAgIFJFVklFV1NfUEVSX0RBWTogXCJNXHUwMEU5ZGlhOiAke2F2Z30gcmV2aXNcdTAwRjVlcy9kaWFcIixcbiAgICBJTlRFUlZBTFM6IFwiSW50ZXJ2YWxvc1wiLFxuICAgIElOVEVSVkFMU19ERVNDOiBcIkF0cmFzb3MgYXRcdTAwRTkgcXVlIGFzIHJldmlzXHUwMEY1ZXMgc2VqYW0gZXhpYmlkYXMgZGUgbm92b1wiLFxuICAgIENPVU5UOiBcIkNvbnRhZ2VtXCIsXG4gICAgSU5URVJWQUxTX1NVTU1BUlk6IFwiSW50ZXJ2YWxvIGVtIG1cdTAwRTlkaWE6ICR7YXZnfSwgTWFpb3IgaW50ZXJ2YWxvOiAke2xvbmdlc3R9XCIsXG4gICAgRUFTRVM6IFwiRmFjaWxpZGFkZXNcIixcbiAgICBFQVNFU19TVU1NQVJZOiBcIkZhY2lsaWRhZGUgZW0gbVx1MDBFOWRpYTogJHthdmdFYXNlfVwiLFxuICAgIENBUkRfVFlQRVM6IFwiVGlwb3MgZGUgQ2FydGFzXCIsXG4gICAgQ0FSRF9UWVBFU19ERVNDOiBcIklzc28gdGFtYlx1MDBFOW0gaW5jbHVpIGNhcnRhcyBlbnRlcnJhZG9zLCBjYXNvIGV4aXN0YW1cIixcbiAgICBDQVJEX1RZUEVfTkVXOiBcIk5vdm9cIixcbiAgICBDQVJEX1RZUEVfWU9VTkc6IFwiSm92ZW1cIixcbiAgICBDQVJEX1RZUEVfTUFUVVJFOiBcIkFtYWR1cmVjaWRvXCIsXG4gICAgQ0FSRF9UWVBFU19TVU1NQVJZOiBcIlRvdGFsIGRlIGNhcnRhczogJHt0b3RhbENhcmRzQ291bnR9XCIsXG59O1xuIiwgIi8vIFJvbVx1MDBFMm5cdTAxMDNcblxuZXhwb3J0IGRlZmF1bHQge307XG4iLCAiLy8gXHUwNDFGXHUwNDM1XHUwNDQwXHUwNDM1XHUwNDMyXHUwNDNFXHUwNDM0IFx1MDQzRFx1MDQzMCBcdTA0NDBcdTA0NDNcdTA0NDFcdTA0NDFcdTA0M0FcdTA0MzhcdTA0MzkgXHUwNDRGXHUwNDM3XHUwNDRCXHUwNDNBXG5cbi8vIEB5dGF0aWNobm8gXHUwNDIxXHUwNDMwXHUwNDQ0XHUwNDQwXHUwNDNFXHUwNDNEXHUwNDNFXHUwNDMyIFx1MDQxQ1x1MDQzMFx1MDQzQVx1MDQ0MVx1MDQzOFx1MDQzQ1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3l0YXRpY2hub1xuXG4vLyBcdTA0MUNcdTA0MzhcdTA0M0FcdTA0M0FcdTA0M0UgXHUwNDEyXHUwNDM1XHUwNDM0XHUwNDQwXHUwNDQzXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbWlra292ZWRydVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgLy8gZmxhc2hjYXJkLW1vZGFsLnRzeFxuICAgIERFQ0tTOiBcIlx1MDQxQVx1MDQzRVx1MDQzQlx1MDQzRVx1MDQzNFx1MDQ0QlwiLFxuICAgIERVRV9DQVJEUzogXCJcdTA0MUZcdTA0NDBcdTA0MzVcdTA0MzRcdTA0NDFcdTA0NDJcdTA0M0VcdTA0NEZcdTA0NDlcdTA0MzhcdTA0MzUgXHUwNDNBXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDNFXHUwNDQ3XHUwNDNBXHUwNDM4XCIsXG4gICAgTkVXX0NBUkRTOiBcIlx1MDQxRFx1MDQzRVx1MDQzMlx1MDQ0Qlx1MDQzNSBcdTA0M0FcdTA0MzBcdTA0NDBcdTA0NDJcdTA0M0VcdTA0NDdcdTA0M0FcdTA0MzhcIixcbiAgICBUT1RBTF9DQVJEUzogXCJcdTA0MTJcdTA0NDFcdTA0MzVcdTA0MzNcdTA0M0UgXHUwNDNBXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDNFXHUwNDQ3XHUwNDM1XHUwNDNBXCIsXG4gICAgQkFDSzogXCJcdTA0MURcdTA0MzBcdTA0MzdcdTA0MzBcdTA0MzRcIixcbiAgICBTS0lQOiBcIlx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIEVESVRfQ0FSRDogXCJcdTA0MjBcdTA0MzVcdTA0MzRcdTA0MzBcdTA0M0FcdTA0NDJcdTA0MzhcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDNBXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDNFXHUwNDQ3XHUwNDNBXHUwNDQzXCIsXG4gICAgUkVTRVRfQ0FSRF9QUk9HUkVTUzogXCJcdTA0MjFcdTA0MzFcdTA0NDBcdTA0M0VcdTA0NDFcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxIFx1MDQzQVx1MDQzMFx1MDQ0MFx1MDQ0Mlx1MDQzRVx1MDQ0N1x1MDQzQVx1MDQzOFwiLFxuICAgIEhBUkQ6IFwiXHUwNDIxXHUwNDNCXHUwNDNFXHUwNDM2XHUwNDNEXHUwNDNFXCIsXG4gICAgR09PRDogXCJcdTA0MURcdTA0M0VcdTA0NDBcdTA0M0NcdTA0MzBcdTA0M0JcdTA0NENcdTA0M0RcdTA0M0VcIixcbiAgICBFQVNZOiBcIlx1MDQxQlx1MDQzNVx1MDQzM1x1MDQzQVx1MDQzRVwiLFxuICAgIFNIT1dfQU5TV0VSOiBcIlx1MDQxRlx1MDQzRVx1MDQzQVx1MDQzMFx1MDQzN1x1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0M0VcdTA0NDJcdTA0MzJcdTA0MzVcdTA0NDJcIixcbiAgICBDQVJEX1BST0dSRVNTX1JFU0VUOiBcIlx1MDQyMVx1MDQzMVx1MDQ0MFx1MDQzRVx1MDQ0MVx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzVcdTA0NDFcdTA0NDEgXHUwNDM4XHUwNDM3XHUwNDQzXHUwNDQ3XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzQVx1MDQzMFx1MDQ0MFx1MDQ0Mlx1MDQzRVx1MDQ0N1x1MDQzQVx1MDQzOFwiLFxuICAgIFNBVkU6IFwiXHUwNDIxXHUwNDNFXHUwNDQ1XHUwNDQwXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgQ0FOQ0VMOiBcIlx1MDQxRVx1MDQ0Mlx1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzMFwiLFxuICAgIE5PX0lOUFVUOiBcIlx1MDQxRlx1MDQ0M1x1MDQ0MVx1MDQ0Mlx1MDQzRVx1MDQzOSBcdTA0MzJcdTA0MzJcdTA0M0VcdTA0MzQuXCIsXG4gICAgQ1VSUkVOVF9FQVNFX0hFTFBfVEVYVDogXCJcdTA0MjJcdTA0MzVcdTA0M0FcdTA0NDNcdTA0NDlcdTA0MzBcdTA0NEYgXHUwNDFCXHUwNDM1XHUwNDMzXHUwNDNBXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDRDOiBcIixcbiAgICBDVVJSRU5UX0lOVEVSVkFMX0hFTFBfVEVYVDogXCJcdTA0MjJcdTA0MzVcdTA0M0FcdTA0NDNcdTA0NDlcdTA0MzhcdTA0MzkgXHUwNDM4XHUwNDNEXHUwNDQyXHUwNDM1XHUwNDQwXHUwNDMyXHUwNDMwXHUwNDNCOiBcIixcbiAgICBDQVJEX0dFTkVSQVRFRF9GUk9NOiBcIlx1MDQyMVx1MDQzM1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQ0MFx1MDQzOFx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzRFx1MDQzRSBcdTA0MzhcdTA0Mzc6ICR7bm90ZVBhdGh9XCIsXG5cbiAgICAvLyBtYWluLnRzXG4gICAgT1BFTl9OT1RFX0ZPUl9SRVZJRVc6IFwiXHUwNDFFXHUwNDQyXHUwNDNBXHUwNDQwXHUwNDRCXHUwNDQyXHUwNDRDIFx1MDQzN1x1MDQzMFx1MDQzQ1x1MDQzNVx1MDQ0Mlx1MDQzQVx1MDQ0MyBcdTA0MzRcdTA0M0JcdTA0NEYgXHUwNDNGXHUwNDNFXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDQwXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGXCIsXG4gICAgUkVWSUVXX0NBUkRTOiBcIlx1MDQxRlx1MDQzRVx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0M0FcdTA0MzBcdTA0NDBcdTA0NDJcdTA0M0VcdTA0NDdcdTA0M0FcdTA0MzhcIixcbiAgICBSRVZJRVdfRUFTWV9GSUxFX01FTlU6IFwiXHUwNDFGXHUwNDNFXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDQwXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1OiBcdTA0MUJcdTA0MzVcdTA0MzNcdTA0M0FcdTA0M0VcIixcbiAgICBSRVZJRVdfR09PRF9GSUxFX01FTlU6IFwiXHUwNDFGXHUwNDNFXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDQwXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1OiBcdTA0MURcdTA0M0VcdTA0NDBcdTA0M0NcdTA0MzBcdTA0M0JcdTA0NENcdTA0M0RcdTA0M0VcIixcbiAgICBSRVZJRVdfSEFSRF9GSUxFX01FTlU6IFwiXHUwNDFGXHUwNDNFXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDQwXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1OiBcdTA0MjFcdTA0M0JcdTA0M0VcdTA0MzZcdTA0M0RcdTA0M0VcIixcbiAgICBSRVZJRVdfTk9URV9FQVNZX0NNRDogXCJcdTA0MUZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0NEZcdTA0NDJcdTA0NEMgXHUwNDM3XHUwNDMwXHUwNDNDXHUwNDM1XHUwNDQyXHUwNDNBXHUwNDQzIFx1MDQzQVx1MDQzMFx1MDQzQSBcdTA0MUJcdTA0NTFcdTA0MzNcdTA0M0FcdTA0NDNcdTA0NEVcIixcbiAgICBSRVZJRVdfTk9URV9HT09EX0NNRDogXCJcdTA0MUZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0NEZcdTA0NDJcdTA0NEMgXHUwNDM3XHUwNDMwXHUwNDNDXHUwNDM1XHUwNDQyXHUwNDNBXHUwNDQzIFx1MDQzQVx1MDQzMFx1MDQzQSBcdTA0MURcdTA0M0VcdTA0NDBcdTA0M0NcdTA0MzBcdTA0M0JcdTA0NENcdTA0M0RcdTA0NDNcdTA0NEVcIixcbiAgICBSRVZJRVdfTk9URV9IQVJEX0NNRDogXCJcdTA0MUZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0NEZcdTA0NDJcdTA0NEMgXHUwNDM3XHUwNDMwXHUwNDNDXHUwNDM1XHUwNDQyXHUwNDNBXHUwNDQzIFx1MDQzQVx1MDQzMFx1MDQzQSBcdTA0MjFcdTA0M0JcdTA0M0VcdTA0MzZcdTA0M0RcdTA0NDNcdTA0NEVcIixcbiAgICBDUkFNX0FMTF9DQVJEUzogXCJcdTA0MTdcdTA0NDNcdTA0MzFcdTA0NDBcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDMyXHUwNDQxXHUwNDM1IFx1MDQzQVx1MDQzMFx1MDQ0MFx1MDQ0Mlx1MDQzRVx1MDQ0N1x1MDQzQVx1MDQzOCBcdTA0MzIgXHUwNDREXHUwNDQyXHUwNDNFXHUwNDM5IFx1MDQzQVx1MDQzRVx1MDQzQlx1MDQzRVx1MDQzNFx1MDQzNVwiLFxuICAgIFJFVklFV19BTExfQ0FSRFM6IFwiXHUwNDFGXHUwNDNFXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDQwXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQzMlx1MDQ0MVx1MDQzNSBcdTA0M0FcdTA0MzBcdTA0NDBcdTA0NDJcdTA0M0VcdTA0NDdcdTA0M0FcdTA0MzggXHUwNDMyXHUwNDNFIFx1MDQzMlx1MDQ0MVx1MDQzNVx1MDQ0NSBcdTA0MzdcdTA0MzBcdTA0M0NcdTA0MzVcdTA0NDJcdTA0M0FcdTA0MzBcdTA0NDVcIixcbiAgICBSRVZJRVdfQ0FSRFNfSU5fTk9URTogXCJcdTA0MUZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDNBXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDNFXHUwNDQ3XHUwNDNBXHUwNDM4IFx1MDQzMiBcdTA0NERcdTA0NDJcdTA0M0VcdTA0MzkgXHUwNDM3XHUwNDMwXHUwNDNDXHUwNDM1XHUwNDQyXHUwNDNBXHUwNDM1XCIsXG4gICAgQ1JBTV9DQVJEU19JTl9OT1RFOiBcIlx1MDQxN1x1MDQ0M1x1MDQzMVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0M0FcdTA0MzBcdTA0NDBcdTA0NDJcdTA0M0VcdTA0NDdcdTA0M0FcdTA0MzggXHUwNDMyIFx1MDQ0RFx1MDQ0Mlx1MDQzRVx1MDQzOSBcdTA0MzdcdTA0MzBcdTA0M0NcdTA0MzVcdTA0NDJcdTA0M0FcdTA0MzVcIixcbiAgICBWSUVXX1NUQVRTOiBcIlx1MDQxRlx1MDQzRVx1MDQ0MVx1MDQzQ1x1MDQzRVx1MDQ0Mlx1MDQ0MFx1MDQzNVx1MDQ0Mlx1MDQ0QyBcdTA0NDFcdTA0NDJcdTA0MzBcdTA0NDJcdTA0MzhcdTA0NDFcdTA0NDJcdTA0MzhcdTA0M0FcdTA0NDNcIixcbiAgICBTVEFUVVNfQkFSOlxuICAgICAgICBcIlx1MDQxRlx1MDQzRVx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQ0QzogJHtkdWVOb3Rlc0NvdW50fSBcdTA0MzdcdTA0MzBcdTA0M0NcdTA0MzVcdTA0NDJcdTA0M0VcdTA0M0EoLVx1MDQzQVx1MDQzOCksICR7ZHVlRmxhc2hjYXJkc0NvdW50fSBcdTA0M0FcdTA0MzBcdTA0NDBcdTA0NDJcdTA0M0VcdTA0NDdcdTA0MzVcdTA0M0EoLVx1MDQzQVx1MDQzOCkgXHUwNDNGXHUwNDQwXHUwNDM1XHUwNDM0XHUwNDQxXHUwNDQyXHUwNDNFXHUwNDM4XHUwNDQyXCIsXG4gICAgU1lOQ19USU1FX1RBS0VOOiBcIlx1MDQyMVx1MDQzOFx1MDQzRFx1MDQ0NVx1MDQ0MFx1MDQzRVx1MDQzRFx1MDQzOFx1MDQzN1x1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQ0RiBcdTA0MzdcdTA0MzBcdTA0M0RcdTA0NEZcdTA0M0JcdTA0MzAgJHt0fVx1MDQzQ1x1MDQ0MVwiLFxuICAgIE5PVEVfSU5fSUdOT1JFRF9GT0xERVI6IFwiXHUwNDE3XHUwNDMwXHUwNDNDXHUwNDM1XHUwNDQyXHUwNDNBXHUwNDMwIFx1MDQ0MVx1MDQzRVx1MDQ0NVx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzMCBcdTA0MzIgXHUwNDM4XHUwNDMzXHUwNDNEXHUwNDNFXHUwNDQwXHUwNDM4XHUwNDQwXHUwNDQzXHUwNDM1XHUwNDNDXHUwNDQzXHUwNDRFIFx1MDQzRlx1MDQzMFx1MDQzRlx1MDQzQVx1MDQ0MyAoXHUwNDQxXHUwNDNDLiBcdTA0M0RcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NDBcdTA0M0VcdTA0MzlcdTA0M0FcdTA0MzgpLlwiLFxuICAgIFBMRUFTRV9UQUdfTk9URTogXCJcdTA0MUZcdTA0M0VcdTA0MzZcdTA0MzBcdTA0M0JcdTA0NDNcdTA0MzlcdTA0NDFcdTA0NDJcdTA0MzAgXHUwNDNGXHUwNDNFXHUwNDNDXHUwNDM1XHUwNDQyXHUwNDRDXHUwNDQyXHUwNDM1IFx1MDQzN1x1MDQzMFx1MDQzQ1x1MDQzNVx1MDQ0Mlx1MDQzQVx1MDQ0MyBcdTA0M0FcdTA0MzBcdTA0M0EgXHUwNDNEXHUwNDMwXHUwNDM0XHUwNDNFIFx1MDQzNFx1MDQzQlx1MDQ0RiBcdTA0M0ZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYgKFx1MDQ0MVx1MDQzQy4gXHUwNDNEXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDQwXHUwNDNFXHUwNDM5XHUwNDNBXHUwNDM4KS5cIixcbiAgICBSRVNQT05TRV9SRUNFSVZFRDogXCJcdTA0MUVcdTA0NDJcdTA0MzJcdTA0MzVcdTA0NDIgXHUwNDNGXHUwNDNFXHUwNDNCXHUwNDQzXHUwNDQ3XHUwNDM1XHUwNDNELlwiLFxuICAgIE5PX0RFQ0tfRVhJU1RTOiBcIlx1MDQxRFx1MDQzNSBcdTA0NDFcdTA0NDNcdTA0NDlcdTA0MzVcdTA0NDFcdTA0NDJcdTA0MzJcdTA0NDNcdTA0MzVcdTA0NDIgXHUwNDQzXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDNEXHUwNDRGICR7ZGVja05hbWV9XCIsXG4gICAgQUxMX0NBVUdIVF9VUDogXCJcdTA0MUNcdTA0M0VcdTA0M0JcdTA0M0VcdTA0MzRcdTA0MzVcdTA0NDYhIFx1MDQyMlx1MDQ0QiBcdTA0NDFcdTA0M0ZcdTA0NDBcdTA0MzBcdTA0MzJcdTA0MzhcdTA0M0JcdTA0NDFcdTA0NEYgXHUwNDM4IFx1MDQzNFx1MDQzRVx1MDQ0OFx1MDQzNVx1MDQzQiBcdTA0MzRcdTA0M0UgXHUwNDNBXHUwNDNFXHUwNDNEXHUwNDQ2XHUwNDMwISA6RFwiLFxuXG4gICAgLy8gc2NoZWR1bGluZy50c1xuICAgIERBWVNfU1RSX0lWTDogXCIke2ludGVydmFsfSBcdTA0MzRcdTA0M0RcdTA0MzVcdTA0MzlcIixcbiAgICBNT05USFNfU1RSX0lWTDogXCIke2ludGVydmFsfSBcdTA0M0NcdTA0MzVcdTA0NDFcdTA0NEZcdTA0NDZcdTA0M0VcdTA0MzJcIixcbiAgICBZRUFSU19TVFJfSVZMOiBcIiR7aW50ZXJ2YWx9IFx1MDQzM1x1MDQzRVx1MDQzNFx1MDQzMCAoXHUwNDNCXHUwNDM1XHUwNDQyKVwiLFxuICAgIERBWVNfU1RSX0lWTF9NT0JJTEU6IFwiJHtpbnRlcnZhbH1cdTA0MzQuXCIsXG4gICAgTU9OVEhTX1NUUl9JVkxfTU9CSUxFOiBcIiR7aW50ZXJ2YWx9XHUwNDNDLlwiLFxuICAgIFlFQVJTX1NUUl9JVkxfTU9CSUxFOiBcIiR7aW50ZXJ2YWx9XHUwNDMzLlwiLFxuXG4gICAgLy8gc2V0dGluZ3MudHNcbiAgICBTRVRUSU5HU19IRUFERVI6IFwiXHUwNDFGXHUwNDNCXHUwNDMwXHUwNDMzXHUwNDM4XHUwNDNEIFNwYWNlZCBSZXBldGl0aW9uIC0gXHUwNDFEXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDQwXHUwNDNFXHUwNDM5XHUwNDNBXHUwNDM4XCIsXG4gICAgQ0hFQ0tfV0lLSTogJ1x1MDQxNFx1MDQzQlx1MDQ0RiBcdTA0MzRcdTA0M0VcdTA0M0YuIFx1MDQzOFx1MDQzRFx1MDQ0NFx1MDQ0QiwgXHUwNDQxXHUwNDNDXHUwNDNFXHUwNDQyXHUwNDQwXHUwNDM4IDxhIGhyZWY9XCIke3dpa2lfdXJsfVwiPndpa2k8L2E+LicsXG4gICAgRk9MREVSU19UT19JR05PUkU6IFwiXHUwNDE4XHUwNDMzXHUwNDNEXHUwNDNFXHUwNDQwXHUwNDM4XHUwNDQwXHUwNDQzXHUwNDM1XHUwNDNDXHUwNDRCXHUwNDM1IFx1MDQzRlx1MDQzMFx1MDQzRlx1MDQzQVx1MDQzOFwiLFxuICAgIEZPTERFUlNfVE9fSUdOT1JFX0RFU0M6XG4gICAgICAgIFwiXHUwNDEyXHUwNDM1XHUwNDM0XHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQ0M1x1MDQ0Mlx1MDQzOCBcdTA0M0ZcdTA0MzBcdTA0M0ZcdTA0M0VcdTA0M0EsIFx1MDQzQVx1MDQzMFx1MDQzNlx1MDQzNFx1MDQzMFx1MDQ0RiBcdTA0M0RcdTA0MzAgXHUwNDQxXHUwNDMyXHUwNDNFXHUwNDM1XHUwNDM5IFx1MDQ0MVx1MDQ0Mlx1MDQ0MFx1MDQzRVx1MDQzQVx1MDQzNSwgXHUwNDNEXHUwNDMwXHUwNDNGXHUwNDQwXHUwNDM4XHUwNDNDXHUwNDM1XHUwNDQwOiBUZW1wbGF0ZXMgTWV0YS9TY3JpcHRzXCIsXG4gICAgRkxBU0hDQVJEUzogXCJcdTA0MUFcdTA0MzBcdTA0NDBcdTA0NDJcdTA0M0VcdTA0NDdcdTA0M0FcdTA0MzhcIixcbiAgICBGTEFTSENBUkRfRUFTWV9MQUJFTDogXCJcdTA0MjJcdTA0MzVcdTA0M0FcdTA0NDFcdTA0NDIgXHUwNDNBXHUwNDNEXHUwNDNFXHUwNDNGXHUwNDNBXHUwNDM4IFx1MDQxQlx1MDQzNVx1MDQzM1x1MDQzQVx1MDQzRVwiLFxuICAgIEZMQVNIQ0FSRF9HT09EX0xBQkVMOiBcIlx1MDQyMlx1MDQzNVx1MDQzQVx1MDQ0MVx1MDQ0MiBcdTA0M0FcdTA0M0RcdTA0M0VcdTA0M0ZcdTA0M0FcdTA0MzggXHUwNDFEXHUwNDNFXHUwNDQwXHUwNDNDXHUwNDMwXHUwNDNCXHUwNDRDXHUwNDNEXHUwNDNFXCIsXG4gICAgRkxBU0hDQVJEX0hBUkRfTEFCRUw6IFwiXHUwNDIyXHUwNDM1XHUwNDNBXHUwNDQxXHUwNDQyIFx1MDQzQVx1MDQzRFx1MDQzRVx1MDQzRlx1MDQzQVx1MDQzOCBcdTA0MjFcdTA0M0JcdTA0M0VcdTA0MzZcdTA0M0RcdTA0M0VcIixcbiAgICBGTEFTSENBUkRfRUFTWV9ERVNDOiAnXHUwNDFEXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDQwXHUwNDNFXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQ0Rlx1MDQ0MFx1MDQzQlx1MDQ0Qlx1MDQzQSBcdTA0MzRcdTA0M0JcdTA0NEYgXHUwNDNBXHUwNDNEXHUwNDNFXHUwNDNGXHUwNDNBXHUwNDM4IFwiXHUwNDFCXHUwNDM1XHUwNDMzXHUwNDNBXHUwNDNFXCInLFxuICAgIEZMQVNIQ0FSRF9HT09EX0RFU0M6ICdcdTA0MURcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NDBcdTA0M0VcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDRGXHUwNDQwXHUwNDNCXHUwNDRCXHUwNDNBIFx1MDQzNFx1MDQzQlx1MDQ0RiBcdTA0M0FcdTA0M0RcdTA0M0VcdTA0M0ZcdTA0M0FcdTA0MzggXCJcdTA0MURcdTA0M0VcdTA0NDBcdTA0M0NcdTA0MzBcdTA0M0JcdTA0NENcdTA0M0RcdTA0M0VcIicsXG4gICAgRkxBU0hDQVJEX0hBUkRfREVTQzogJ1x1MDQxRFx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0MFx1MDQzRVx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0NEZcdTA0NDBcdTA0M0JcdTA0NEJcdTA0M0EgXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQzQVx1MDQzRFx1MDQzRVx1MDQzRlx1MDQzQVx1MDQzOCBcIlx1MDQyMVx1MDQzQlx1MDQzRVx1MDQzNlx1MDQzRFx1MDQzRVwiJyxcbiAgICBGTEFTSENBUkRfVEFHUzogXCJcdTA0MjJcdTA0NERcdTA0MzNcdTA0MzggXHUwNDNBXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDNFXHUwNDQ3XHUwNDM1XHUwNDNBXCIsXG4gICAgRkxBU0hDQVJEX1RBR1NfREVTQzpcbiAgICAgICAgXCJcdTA0MTJcdTA0MzVcdTA0MzRcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDQyXHUwNDREXHUwNDMzXHUwNDM4IFx1MDQ0MFx1MDQzMFx1MDQzN1x1MDQzNFx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQzNSBFbnRlci1cdTA0M0VcdTA0M0MgXHUwNDM4XHUwNDNCXHUwNDM4IFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzMVx1MDQzNVx1MDQzQlx1MDQzRVx1MDQzQywgXHUwNDNEXHUwNDMwXHUwNDNGXHUwNDQwXHUwNDM4XHUwNDNDXHUwNDM1XHUwNDQwOiAjZmxhc2hjYXJkcyAjZGVjazIgI2RlY2szLlwiLFxuICAgIENPTlZFUlRfRk9MREVSU19UT19ERUNLUzogXCJcdTA0MUFcdTA0M0VcdTA0M0RcdTA0MzJcdTA0MzVcdTA0NDBcdTA0NDJcdTA0MzhcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDNGXHUwNDMwXHUwNDNGXHUwNDNBXHUwNDM4IFx1MDQzMiBcdTA0NDNcdTA0NDBcdTA0M0VcdTA0MzJcdTA0M0RcdTA0MzggXHUwNDM4IFx1MDQzRlx1MDQzRVx1MDQzNFx1MDQ0M1x1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzRFx1MDQzOD9cIixcbiAgICBDT05WRVJUX0ZPTERFUlNfVE9fREVDS1NfREVTQzogXCJcdTA0MkRcdTA0NDJcdTA0M0UgXHUwNDMwXHUwNDNCXHUwNDRDXHUwNDQyXHUwNDM1XHUwNDQwXHUwNDNEXHUwNDMwXHUwNDQyXHUwNDM4XHUwNDMyXHUwNDMwIFx1MDQ0Mlx1MDQ0RFx1MDQzM1x1MDQzMFx1MDQzQyBcdTA0M0FcdTA0MzBcdTA0NDBcdTA0NDJcdTA0M0VcdTA0NDdcdTA0MzVcdTA0M0EsIFx1MDQzRFx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0MFx1MDQzRVx1MDQzOVx1MDQzQVx1MDQzMCBcdTA0NDFcdTA0MzJcdTA0MzVcdTA0NDBcdTA0NDVcdTA0NDMuXCIsXG4gICAgSU5MSU5FX1NDSEVEVUxJTkdfQ09NTUVOVFM6IFwiXHUwNDIxXHUwNDNFXHUwNDQ1XHUwNDQwXHUwNDMwXHUwNDNEXHUwNDRGXHUwNDQyXHUwNDRDIFx1MDQzQVx1MDQzRVx1MDQzQ1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQ0Mlx1MDQzMFx1MDQ0MFx1MDQzOFx1MDQzOSBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NEYgXHUwNDNEXHUwNDMwIFx1MDQzRlx1MDQzRVx1MDQ0MVx1MDQzQlx1MDQzNVx1MDQzNFx1MDQzRFx1MDQzNVx1MDQzOSBcdTA0NDFcdTA0NDJcdTA0NDBcdTA0M0VcdTA0M0FcdTA0MzUgXHUwNDNBXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDNFXHUwNDQ3XHUwNDNBXHUwNDM4P1wiLFxuICAgIElOTElORV9TQ0hFRFVMSU5HX0NPTU1FTlRTX0RFU0M6XG4gICAgICAgIFwiXHUwNDEyXHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQ0RFx1MDQ0Mlx1MDQzRVx1MDQzOSBcdTA0M0RcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NDBcdTA0M0VcdTA0MzlcdTA0M0FcdTA0MzggXHUwNDQxXHUwNDM0XHUwNDM1XHUwNDNCXHUwNDMwXHUwNDM1XHUwNDQyIFx1MDQ0Mlx1MDQzMFx1MDQzQSwgXHUwNDQ3XHUwNDQyXHUwNDNFIEhUTUwgXHUwNDNBXHUwNDNFXHUwNDNDXHUwNDNDXHUwNDM1XHUwNDNEXHUwNDQyXHUwNDMwXHUwNDQwXHUwNDM4XHUwNDM4IFx1MDQzRFx1MDQzNSBcdTA0MzFcdTA0NDNcdTA0MzRcdTA0NDNcdTA0NDIgXHUwNDNCXHUwNDNFXHUwNDNDXHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQ0NFx1MDQzRVx1MDQ0MFx1MDQzQ1x1MDQzMFx1MDQ0Mlx1MDQzOFx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0NDFcdTA0M0ZcdTA0MzhcdTA0NDFcdTA0M0FcdTA0MzAuXCIsXG4gICAgQlVSWV9TSUJMSU5HU19USUxMX05FWFRfREFZOiBcIlx1MDQxRlx1MDQ0MFx1MDQ0Rlx1MDQ0Mlx1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0NDBcdTA0M0VcdTA0MzRcdTA0NDFcdTA0NDJcdTA0MzJcdTA0MzVcdTA0M0RcdTA0M0RcdTA0NEJcdTA0MzUgXHUwNDNBXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDNFXHUwNDQ3XHUwNDNBXHUwNDM4IFx1MDQzNFx1MDQzRSBcdTA0NDFcdTA0M0JcdTA0MzVcdTA0MzQuIFx1MDQzNFx1MDQzRFx1MDQ0Rj9cIixcbiAgICBCVVJZX1NJQkxJTkdTX1RJTExfTkVYVF9EQVlfREVTQzpcbiAgICAgICAgXCJcdTA0MjBcdTA0M0VcdTA0MzRcdTA0NDFcdTA0NDJcdTA0MzJcdTA0MzVcdTA0M0RcdTA0M0RcdTA0NEJcdTA0MzUgXHUwNDNBXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDNFXHUwNDQ3XHUwNDNBXHUwNDM4IC0gXHUwNDQyXHUwNDM1LCBcdTA0M0FcdTA0M0VcdTA0NDJcdTA0M0VcdTA0NDBcdTA0NEJcdTA0MzUgXHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDM3XHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDRCIFx1MDQzOFx1MDQzNyBcdTA0M0VcdTA0MzRcdTA0M0RcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDQyXHUwNDM1XHUwNDNBXHUwNDQxXHUwNDQyXHUwNDMwLCBcdTA0M0ZcdTA0NDBcdTA0MzhcdTA0M0NcdTA0MzVcdTA0NDA6IFx1MDQzQVx1MDQzMFx1MDQ0MFx1MDQ0Mlx1MDQzRVx1MDQ0N1x1MDQzQVx1MDQzOCBcdTA0NDEgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDNBXHUwNDMwXHUwNDNDXHUwNDM4IChbLi4uXSlcIixcbiAgICBTSE9XX0NBUkRfQ09OVEVYVDogXCJcdTA0MUZcdTA0M0VcdTA0M0FcdTA0MzBcdTA0MzdcdTA0NEJcdTA0MzJcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDNBXHUwNDNFXHUwNDNEXHUwNDQyXHUwNDM1XHUwNDNBXHUwNDQxXHUwNDQyKFx1MDQ0M1x1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQzRFx1MDQ0QykgXHUwNDMyIFx1MDQzQVx1MDQzMFx1MDQ0MFx1MDQ0Mlx1MDQzRVx1MDQ0N1x1MDQzQVx1MDQzMFx1MDQ0NShcdTA0MzJcdTA0M0UgXHUwNDMyXHUwNDQwXHUwNDM1XHUwNDNDXHUwNDRGIFx1MDQzRlx1MDQzRVx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0Rik/XCIsXG4gICAgU0hPV19DQVJEX0NPTlRFWFRfREVTQzogXCJcdTA0M0ZcdTA0NDBcdTA0MzhcdTA0M0NcdTA0MzVcdTA0NDA6IFRpdGxlID4gSGVhZGluZyAxID4gU3ViaGVhZGluZyA+IC4uLiA+IFN1YmhlYWRpbmdcIixcbiAgICBDQVJEX01PREFMX0hFSUdIVF9QRVJDRU5UOiBcIlx1MDQxMlx1MDQ0Qlx1MDQ0MVx1MDQzRVx1MDQ0Mlx1MDQzMCBcdTA0M0FcdTA0MzBcdTA0NDBcdTA0NDJcdTA0M0VcdTA0NDdcdTA0M0FcdTA0MzggXHUwNDMyXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDQ2XHUwNDM1XHUwNDNEXHUwNDQyXHUwNDMwXHUwNDQ1XCIsXG4gICAgQ0FSRF9NT0RBTF9TSVpFX1BFUkNFTlRfREVTQzpcbiAgICAgICAgXCJcdTA0MTVcdTA0NDFcdTA0M0JcdTA0MzggXHUwNDNGXHUwNDNFXHUwNDNCXHUwNDRDXHUwNDM3XHUwNDQzXHUwNDM1XHUwNDQyXHUwNDM1XHUwNDQxXHUwNDRDIFx1MDQzQ1x1MDQzRVx1MDQzMVx1MDQzOFx1MDQzQlx1MDQ0Q1x1MDQzRFx1MDQ0Qlx1MDQzQyBcdTA0NDJcdTA0MzVcdTA0M0JcdTA0MzVcdTA0NDRcdTA0M0VcdTA0M0RcdTA0M0VcdTA0M0MsIFx1MDQzMlx1MDQ0Qlx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzMlx1MDQ0Q1x1MDQ0Mlx1MDQzNSAxMDAlIFx1MDQzOFx1MDQzQlx1MDQzOCBcdTA0NDMgXHUwNDMyXHUwNDMwXHUwNDQxIFx1MDQzMVx1MDQ0M1x1MDQzNFx1MDQ0M1x1MDQ0MiBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0M0VcdTA0M0NcdTA0M0RcdTA0NEJcdTA0MzUgXHUwNDM4XHUwNDM3XHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGXCIsXG4gICAgUkVTRVRfREVGQVVMVDogXCJcdTA0MURcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NDBcdTA0M0VcdTA0MzlcdTA0M0FcdTA0MzggXHUwNDNGXHUwNDNFIFx1MDQ0M1x1MDQzQ1x1MDQzRVx1MDQzQlx1MDQ0N1x1MDQzMFx1MDQzRFx1MDQzOFx1MDQ0RVwiLFxuICAgIENBUkRfTU9EQUxfV0lEVEhfUEVSQ0VOVDogXCJcdTA0MjhcdTA0MzhcdTA0NDBcdTA0MzhcdTA0M0RcdTA0MzAgXHUwNDNBXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDNFXHUwNDQ3XHUwNDNBXHUwNDM4IFx1MDQzMiBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NDZcdTA0MzVcdTA0M0RcdTA0NDJcdTA0MzBcdTA0NDVcIixcbiAgICBSQU5ET01JWkVfQ0FSRF9PUkRFUjogXCJcdTA0MjFcdTA0M0JcdTA0NDNcdTA0NDdcdTA0MzBcdTA0MzlcdTA0M0RcdTA0NEJcdTA0MzkgXHUwNDNGXHUwNDNFXHUwNDQwXHUwNDRGXHUwNDM0XHUwNDNFXHUwNDNBIFx1MDQzQVx1MDQzMFx1MDQ0MFx1MDQ0Mlx1MDQzRVx1MDQ0N1x1MDQzNVx1MDQzQSBcdTA0MzJcdTA0M0UgXHUwNDMyXHUwNDQwXHUwNDM1XHUwNDNDXHUwNDRGIFx1MDQzRlx1MDQzRVx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0Rj9cIixcbiAgICBESVNBQkxFX0NMT1pFX0NBUkRTOiBcIlx1MDQxMlx1MDQ0Qlx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0M0FcdTA0MzBcdTA0NDBcdTA0NDJcdTA0NEIgXHUwNDQxIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQzQVx1MDQzMFx1MDQzQ1x1MDQzOCAoXHUwNDNGXHUwNDQwXHUwNDM4XHUwNDNDXHUwNDM1XHUwNDQwOiBbLi4uXSk/XCIsXG4gICAgQ09OVkVSVF9ISUdITElHSFRTX1RPX0NMT1pFUzogXCJcdTA0MUFcdTA0M0VcdTA0M0RcdTA0MzJcdTA0MzVcdTA0NDBcdTA0NDJcdTA0MzhcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0NEMgPT1cdTA0MzJcdTA0NEJcdTA0MzRcdTA0MzVcdTA0M0JcdTA0MzVcdTA0M0RcdTA0M0RcdTA0NEJcdTA0MzkgXHUwNDQyXHUwNDM1XHUwNDNBXHUwNDQxXHUwNDQyPT0gXHUwNDMyIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQzQVx1MDQzOCAoXHUwNDNGXHUwNDQwXHUwNDM4XHUwNDNDXHUwNDM1XHUwNDQwOiBbLi4uXSk/XCIsXG4gICAgQ09OVkVSVF9CT0xEX1RFWFRfVE9fQ0xPWkVTOiBcIlx1MDQxQVx1MDQzRVx1MDQzRFx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQ0Mlx1MDQzOFx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQ0QyAqKlx1MDQzNlx1MDQzOFx1MDQ0MFx1MDQzRFx1MDQ0Qlx1MDQzOSBcdTA0NDJcdTA0MzVcdTA0M0FcdTA0NDFcdTA0NDIqKiBcdTA0MzIgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDNBXHUwNDM4IChcdTA0M0ZcdTA0NDBcdTA0MzhcdTA0M0NcdTA0MzVcdTA0NDA6IFsuLi5dKT9cIixcbiAgICBDT05WRVJUX0NVUkxZX0JSQUNLRVRTX1RPX0NMT1pFUzpcbiAgICAgICAgXCJcdTA0MUFcdTA0M0VcdTA0M0RcdTA0MzJcdTA0MzVcdTA0NDBcdTA0NDJcdTA0MzhcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0NEMge3tcdTA0NDRcdTA0MzhcdTA0MzNcdTA0NDNcdTA0NDBcdTA0M0RcdTA0NEJcdTA0MzUgXHUwNDQxXHUwNDNBXHUwNDNFXHUwNDMxXHUwNDNBXHUwNDM4fX0gXHUwNDMyIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQzQVx1MDQzOCAoXHUwNDNGXHUwNDQwXHUwNDM4XHUwNDNDXHUwNDM1XHUwNDQwOiBbLi4uXSk/XCIsXG4gICAgSU5MSU5FX0NBUkRTX1NFUEFSQVRPUjogXCJcdTA0MjBcdTA0MzBcdTA0MzdcdTA0MzRcdTA0MzVcdTA0M0JcdTA0MzhcdTA0NDJcdTA0MzVcdTA0M0JcdTA0NEMgXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQzMlx1MDQzRFx1MDQ0M1x1MDQ0Mlx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQ0Mlx1MDQ0MFx1MDQzRVx1MDQ0N1x1MDQzRFx1MDQ0Qlx1MDQ0NSBcdTA0M0FcdTA0MzBcdTA0NDBcdTA0NDJcdTA0M0VcdTA0NDdcdTA0MzVcdTA0M0FcIixcbiAgICBGSVhfU0VQQVJBVE9SU19NQU5VQUxMWV9XQVJOSU5HOlxuICAgICAgICBcIlx1MDQxMlx1MDQzRFx1MDQzOFx1MDQzQ1x1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSEgXHUwNDFGXHUwNDNFXHUwNDQxXHUwNDNCXHUwNDM1IFx1MDQzOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RiBcdTA0NERcdTA0NDJcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDMyXHUwNDMwXHUwNDNDIFx1MDQzRlx1MDQ0MFx1MDQzOFx1MDQzNFx1MDQ1MVx1MDQ0Mlx1MDQ0MVx1MDQ0RiBcdTA0MzJcdTA0NDBcdTA0NDNcdTA0NDdcdTA0M0RcdTA0NDNcdTA0NEUgXHUwNDQwXHUwNDM1XHUwNDM0XHUwNDMwXHUwNDNBXHUwNDQyXHUwNDM4XHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQ0M1x1MDQzNlx1MDQzNSBcdTA0NDFcdTA0NDNcdTA0NDlcdTA0MzVcdTA0NDFcdTA0NDJcdTA0MzJcdTA0NDNcdTA0NEVcdTA0NDlcdTA0MzhcdTA0MzUgXHUwNDNBXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDNFXHUwNDQ3XHUwNDNBXHUwNDM4XCIsXG4gICAgSU5MSU5FX1JFVkVSU0VEX0NBUkRTX1NFUEFSQVRPUjogXCJcdTA0MjBcdTA0MzBcdTA0MzdcdTA0MzRcdTA0MzVcdTA0M0JcdTA0MzhcdTA0NDJcdTA0MzVcdTA0M0JcdTA0NEMgXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQ0Mlx1MDQzRFx1MDQ0Qlx1MDQ0NSBcdTA0MzJcdTA0M0RcdTA0NDNcdTA0NDJcdTA0NDBcdTA0MzhcdTA0NDFcdTA0NDJcdTA0NDBcdTA0M0VcdTA0NDdcdTA0M0RcdTA0NEJcdTA0NDUgXHUwNDNBXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDNFXHUwNDQ3XHUwNDM1XHUwNDNBXCIsXG4gICAgTVVMVElMSU5FX0NBUkRTX1NFUEFSQVRPUjogXCJcdTA0MjBcdTA0MzBcdTA0MzdcdTA0MzRcdTA0MzVcdTA0M0JcdTA0MzhcdTA0NDJcdTA0MzVcdTA0M0JcdTA0NEMgXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQzQ1x1MDQzRFx1MDQzRVx1MDQzM1x1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQ0MFx1MDQzRVx1MDQ0N1x1MDQzRFx1MDQ0Qlx1MDQ0NSBcdTA0M0FcdTA0MzBcdTA0NDBcdTA0NDJcdTA0M0VcdTA0NDdcdTA0MzVcdTA0M0FcIixcbiAgICBNVUxUSUxJTkVfUkVWRVJTRURfQ0FSRFNfU0VQQVJBVE9SOiBcIlx1MDQyMFx1MDQzMFx1MDQzN1x1MDQzNFx1MDQzNVx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQzNVx1MDQzQlx1MDQ0QyBcdTA0MzRcdTA0M0JcdTA0NEYgXHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDQyXHUwNDNEXHUwNDRCXHUwNDQ1IFx1MDQzQ1x1MDQzRFx1MDQzRVx1MDQzM1x1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQ0MFx1MDQzRVx1MDQ0N1x1MDQzRFx1MDQ0Qlx1MDQ0NSBcdTA0M0FcdTA0MzBcdTA0NDBcdTA0NDJcdTA0M0VcdTA0NDdcdTA0MzVcdTA0M0FcIixcbiAgICBOT1RFUzogXCJcdTA0MTdcdTA0MzBcdTA0M0NcdTA0MzVcdTA0NDJcdTA0M0FcdTA0MzhcIixcbiAgICBSRVZJRVdfUEFORV9PTl9TVEFSVFVQOiBcIlx1MDQxMlx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0M0ZcdTA0MzBcdTA0M0RcdTA0MzVcdTA0M0JcdTA0NEMgXHUwNDNGXHUwNDNFXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDQwXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGIFx1MDQzRlx1MDQ0MFx1MDQzOCBcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0M0FcdTA0MzUgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDMwXHUwNDNDXHUwNDNDXHUwNDRCXCIsXG4gICAgVEFHU19UT19SRVZJRVc6IFwiXHUwNDIyXHUwNDREXHUwNDMzXHUwNDM4IFx1MDQzNFx1MDQzQlx1MDQ0RiBcdTA0M0ZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEZcIixcbiAgICBUQUdTX1RPX1JFVklFV19ERVNDOlxuICAgICAgICBcIlx1MDQxMlx1MDQzMlx1MDQzNVx1MDQzNFx1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0NDJcdTA0NERcdTA0MzNcdTA0MzgsIFx1MDQ0MFx1MDQzMFx1MDQzN1x1MDQzNFx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQzNSBFbnRlci1cdTA0MzBcdTA0M0NcdTA0MzggXHUwNDM4XHUwNDNCXHUwNDM4IFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzMVx1MDQzNVx1MDQzQlx1MDQzMFx1MDQzQ1x1MDQzOCwgXHUwNDNEXHUwNDMwXHUwNDNGXHUwNDQwXHUwNDM4XHUwNDNDXHUwNDM1XHUwNDQwOiAjcmV2aWV3ICN0YWcyICN0YWczLlwiLFxuICAgIE9QRU5fUkFORE9NX05PVEU6IFwiXHUwNDFFXHUwNDQyXHUwNDNBXHUwNDQwXHUwNDRCXHUwNDQyXHUwNDRDIFx1MDQ0MVx1MDQzQlx1MDQ0M1x1MDQ0N1x1MDQzMFx1MDQzOVx1MDQzRFx1MDQ0M1x1MDQ0RSBcdTA0MzdcdTA0MzBcdTA0M0NcdTA0MzVcdTA0NDJcdTA0M0FcdTA0NDMgXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQzRlx1MDQzRVx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RlwiLFxuICAgIE9QRU5fUkFORE9NX05PVEVfREVTQzogXCJcdTA0MTVcdTA0NDFcdTA0M0JcdTA0MzggXHUwNDMyXHUwNDRCXHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM4XHUwNDQyXHUwNDRDLCBcdTA0NDJcdTA0M0UgXHUwNDM3XHUwNDMwXHUwNDNDXHUwNDM1XHUwNDQyXHUwNDNBXHUwNDM4IFx1MDQzMVx1MDQ0M1x1MDQzNFx1MDQ0M1x1MDQ0MiBcdTA0NDFcdTA0M0JcdTA0MzVcdTA0MzRcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDNGXHUwNDNFIFx1MDQzMlx1MDQzMFx1MDQzNlx1MDQzRFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzOCAoUGFnZVJhbmspLlwiLFxuICAgIEFVVE9fTkVYVF9OT1RFOiBcIlx1MDQxRlx1MDQzRVx1MDQ0MVx1MDQzQlx1MDQzNSBcdTA0M0ZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYgXHUwNDMwXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDNDXHUwNDMwXHUwNDQyXHUwNDM4XHUwNDQ3XHUwNDM1XHUwNDQxXHUwNDNBXHUwNDM4IFx1MDQzRVx1MDQ0Mlx1MDQzQVx1MDQ0MFx1MDQ0Qlx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0NDFcdTA0M0JcdTA0MzVcdTA0MzRcdTA0NDNcdTA0NEVcdTA0NDlcdTA0NDNcdTA0NEUgXHUwNDM3XHUwNDMwXHUwNDNDXHUwNDM1XHUwNDQyXHUwNDNBXHUwNDQzXCIsXG4gICAgRElTQUJMRV9GSUxFX01FTlVfUkVWSUVXX09QVElPTlM6XG4gICAgICAgIFwiXHUwNDEyXHUwNDRCXHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQzRVx1MDQ0MCBcdTA0NDFcdTA0M0JcdTA0M0VcdTA0MzZcdTA0M0RcdTA0M0VcdTA0NDFcdTA0NDJcdTA0MzggXHUwNDNGXHUwNDNFXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDQwXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGIFx1MDQzMiBcdTA0M0NcdTA0MzVcdTA0M0RcdTA0NEUgXHUwNDQ0XHUwNDMwXHUwNDM5XHUwNDNCXHUwNDMwLCBcdTA0NDIuXHUwNDM1LjogXHUwNDFGXHUwNDNFXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDQwXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1OiBcdTA0MUJcdTA0MzVcdTA0MzNcdTA0M0FcdTA0M0UgXHUwNDFEXHUwNDNFXHUwNDQwXHUwNDNDXHUwNDMwXHUwNDNCXHUwNDRDXHUwNDNEXHUwNDNFIFx1MDQyMVx1MDQzQlx1MDQzRVx1MDQzNlx1MDQzRFx1MDQzRVwiLFxuICAgIERJU0FCTEVfRklMRV9NRU5VX1JFVklFV19PUFRJT05TX0RFU0M6XG4gICAgICAgIFwiXHUwNDFGXHUwNDNFXHUwNDQxXHUwNDNCXHUwNDM1IFx1MDQzMlx1MDQ0Qlx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RiBcdTA0MzJcdTA0NEIgXHUwNDQxXHUwNDNDXHUwNDNFXHUwNDM2XHUwNDM1XHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQzRVx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQ0Rlx1MDQ0Mlx1MDQ0QyBcdTA0M0ZcdTA0NDBcdTA0MzggXHUwNDNGXHUwNDNFXHUwNDNDXHUwNDNFXHUwNDQ5XHUwNDM4IFx1MDQ0NVx1MDQzRVx1MDQ0Mlx1MDQzQVx1MDQzNVx1MDQzNVx1MDQzMi4gXHUwNDFGXHUwNDM1XHUwNDQwXHUwNDM1XHUwNDM3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM3XHUwNDM4XHUwNDQyXHUwNDM1IE9ic2lkaWFuIFx1MDQzRlx1MDQzRVx1MDQ0MVx1MDQzQlx1MDQzNSBcdTA0MzhcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYgXHUwNDREXHUwNDQyXHUwNDNFXHUwNDMzXHUwNDNFLlwiLFxuICAgIE1BWF9OX0RBWVNfUkVWSUVXX1FVRVVFOiBcIlx1MDQxRFx1MDQzMFx1MDQzOFx1MDQzMVx1MDQzRVx1MDQzQlx1MDQ0Q1x1MDQ0OFx1MDQzNVx1MDQzNSBcdTA0M0FcdTA0M0VcdTA0M0JcdTA0MzhcdTA0NDdcdTA0MzVcdTA0NDFcdTA0NDJcdTA0MzJcdTA0M0UgXHUwNDM0XHUwNDNEXHUwNDM1XHUwNDM5IFx1MDQzNFx1MDQzQlx1MDQ0RiBcdTA0M0VcdTA0NDJcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDNEXHUwNDMwIFx1MDQzRlx1MDQzMFx1MDQzRFx1MDQzNVx1MDQzQlx1MDQzOCBcdTA0NDFcdTA0M0ZcdTA0NDBcdTA0MzBcdTA0MzJcdTA0MzBcIixcbiAgICBNSU5fT05FX0RBWTogXCJcdTA0MUFcdTA0M0VcdTA0M0JcdTA0MzhcdTA0NDdcdTA0MzVcdTA0NDFcdTA0NDJcdTA0MzJcdTA0M0UgXHUwNDM0XHUwNDNEXHUwNDM1XHUwNDM5IFx1MDQzRFx1MDQzNSBcdTA0M0NcdTA0MzVcdTA0M0RcdTA0NENcdTA0NDhcdTA0MzUgMS5cIixcbiAgICBWQUxJRF9OVU1CRVJfV0FSTklORzogXCJcdTA0MUZcdTA0M0VcdTA0MzZcdTA0MzBcdTA0M0JcdTA0NDNcdTA0MzlcdTA0NDFcdTA0NDJcdTA0MzAgXHUwNDMyXHUwNDMyXHUwNDM1XHUwNDM0XHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQzRVx1MDQzNFx1MDQ0NVx1MDQzRVx1MDQzNFx1MDQ0Rlx1MDQ0OVx1MDQzNVx1MDQzNSBcdTA0NDdcdTA0MzhcdTA0NDFcdTA0M0JcdTA0M0UuXCIsXG4gICAgVUlfUFJFRkVSRU5DRVM6IFwiXHUwNDFGXHUwNDNFXHUwNDNCXHUwNDRDXHUwNDM3XHUwNDNFXHUwNDMyXHUwNDMwXHUwNDQyXHUwNDM1XHUwNDNCXHUwNDRDXHUwNDQxXHUwNDNBXHUwNDM4XHUwNDM5IFx1MDQzOFx1MDQzRFx1MDQ0Mlx1MDQzNVx1MDQ0MFx1MDQ0NFx1MDQzNVx1MDQzOVx1MDQ0MSBcdTA0MURcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NDBcdTA0M0VcdTA0MzlcdTA0M0FcdTA0MzhcIixcbiAgICBJTklUSUFMTFlfRVhQQU5EX1NVQkRFQ0tTX0lOX1RSRUU6XG4gICAgICAgIFwiXHUwNDE0XHUwNDM1XHUwNDQwXHUwNDM1XHUwNDMyXHUwNDRDXHUwNDRGIFx1MDQzQVx1MDQzRVx1MDQzQlx1MDQzRVx1MDQzNCBcdTA0MzRcdTA0M0VcdTA0M0JcdTA0MzZcdTA0M0RcdTA0NEIgXHUwNDM4XHUwNDM3XHUwNDNEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDNCXHUwNDRDXHUwNDNEXHUwNDNFIFx1MDQzRVx1MDQ0Mlx1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzMFx1MDQ0Mlx1MDQ0Q1x1MDQ0MVx1MDQ0RiBcdTA0M0FcdTA0MzBcdTA0M0EgXHUwNDQwXHUwNDMwXHUwNDM3XHUwNDMyXHUwNDM1XHUwNDQwXHUwNDNEXHUwNDQzXHUwNDQyXHUwNDRCXHUwNDM1XCIsXG4gICAgSU5JVElBTExZX0VYUEFORF9TVUJERUNLU19JTl9UUkVFX0RFU0M6XG4gICAgICAgIFwiXHUwNDFFXHUwNDQyXHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQ0RFx1MDQ0Mlx1MDQzRVx1MDQ0MiBcdTA0M0ZcdTA0MzBcdTA0NDBcdTA0MzBcdTA0M0NcdTA0MzVcdTA0NDJcdTA0NDAsIFx1MDQ0N1x1MDQ0Mlx1MDQzRVx1MDQzMVx1MDQ0QiBcdTA0NDFcdTA0MzJcdTA0MzVcdTA0NDBcdTA0M0RcdTA0NDNcdTA0NDJcdTA0NEMgXHUwNDMyXHUwNDNCXHUwNDNFXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDNEXHUwNDRCXHUwNDM1IFx1MDQzQVx1MDQzRVx1MDQzQlx1MDQzRVx1MDQzNFx1MDQ0QiBcdTA0M0RcdTA0MzAgXHUwNDNFXHUwNDM0XHUwNDNEXHUwNDNFXHUwNDM5IFx1MDQzQVx1MDQzMFx1MDQ0MFx1MDQ0Mlx1MDQzRVx1MDQ0N1x1MDQzQVx1MDQzNS4gXHUwNDFGXHUwNDNFXHUwNDNCXHUwNDM1XHUwNDM3XHUwNDNEXHUwNDNFLCBcdTA0MzVcdTA0NDFcdTA0M0JcdTA0MzggXHUwNDQzIFx1MDQzMlx1MDQzMFx1MDQ0MSBcdTA0MzVcdTA0NDFcdTA0NDJcdTA0NEMgXHUwNDNBXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDRCLCBcdTA0M0FcdTA0M0VcdTA0NDJcdTA0M0VcdTA0NDBcdTA0NEJcdTA0MzUgXHUwNDNGXHUwNDQwXHUwNDM4XHUwNDNEXHUwNDMwXHUwNDM0XHUwNDNCXHUwNDM1XHUwNDM2XHUwNDMwXHUwNDQyIFx1MDQzQ1x1MDQzRFx1MDQzRVx1MDQzM1x1MDQzOFx1MDQzQyBcdTA0M0FcdTA0M0VcdTA0M0JcdTA0M0VcdTA0MzRcdTA0MzBcdTA0M0MgXHUwNDMyIFx1MDQzRVx1MDQzNFx1MDQzRFx1MDQzRVx1MDQzQyBcdTA0NDRcdTA0MzBcdTA0MzlcdTA0M0JcdTA0MzUuXCIsXG4gICAgQUxHT1JJVEhNOiBcIlx1MDQxMFx1MDQzQlx1MDQzM1x1MDQzRVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzQ1wiLFxuICAgIENIRUNLX0FMR09SSVRITV9XSUtJOlxuICAgICAgICAnXHUwNDE3XHUwNDMwIFx1MDQzNFx1MDQzRVx1MDQzRlx1MDQzRVx1MDQzQlx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQzNVx1MDQzQlx1MDQ0Q1x1MDQzRFx1MDQzRVx1MDQzOSBcdTA0MzhcdTA0M0RcdTA0NDRcdTA0M0VcdTA0NDBcdTA0M0NcdTA0MzBcdTA0NDZcdTA0MzhcdTA0MzVcdTA0MzkgXHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDQ5XHUwNDMwXHUwNDM5XHUwNDQyXHUwNDM1XHUwNDQxXHUwNDRDIFx1MDQzQSA8YSBocmVmPVwiJHthbGdvX3VybH1cIj5cdTA0NDBcdTA0MzVcdTA0MzBcdTA0M0JcdTA0MzhcdTA0MzdcdTA0MzBcdTA0NDZcdTA0MzhcdTA0NEYgXHUwNDMwXHUwNDNCXHUwNDMzXHUwNDNFXHUwNDQwXHUwNDM4XHUwNDQyXHUwNDNDXHUwNDMwPC9hPi4nLFxuICAgIEJBU0VfRUFTRTogXCJcdTA0MTFcdTA0MzBcdTA0MzdcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NEYgXHUwNDFCXHUwNDUxXHUwNDMzXHUwNDNBXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDRDXCIsXG4gICAgQkFTRV9FQVNFX0RFU0M6IFwiXHUwNDNDXHUwNDM4XHUwNDNEXHUwNDM4XHUwNDNDXHUwNDQzXHUwNDNDID0gMTMwLCBcdTA0M0ZcdTA0NDBcdTA0MzVcdTA0MzRcdTA0M0ZcdTA0M0VcdTA0NDdcdTA0NDJcdTA0MzhcdTA0NDJcdTA0MzVcdTA0M0JcdTA0NENcdTA0M0RcdTA0M0UgXHUwNDNFXHUwNDNBXHUwNDNFXHUwNDNCXHUwNDNFIDI1MC5cIixcbiAgICBCQVNFX0VBU0VfTUlOX1dBUk5JTkc6IFwiXHUwNDFCXHUwNDUxXHUwNDMzXHUwNDNBXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDRDIFx1MDQzNFx1MDQzRVx1MDQzQlx1MDQzNlx1MDQzRFx1MDQzMCBcdTA0MzFcdTA0NEJcdTA0NDJcdTA0NEMgXHUwNDNDXHUwNDM4XHUwNDNEXHUwNDM4XHUwNDNDXHUwNDQzXHUwNDNDIDEzMC5cIixcbiAgICBMQVBTRV9JTlRFUlZBTF9DSEFOR0U6XG4gICAgICAgIFwiXHUwNDE4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzQ1x1MDQzNVx1MDQzNlx1MDQ0M1x1MDQ0Mlx1MDQzQVx1MDQzMCBcdTA0M0FcdTA0M0VcdTA0MzNcdTA0MzRcdTA0MzAgXHUwNDMyXHUwNDRCIFx1MDQzRVx1MDQ0Mlx1MDQzMlx1MDQzNVx1MDQ0N1x1MDQzMFx1MDQzNVx1MDQ0Mlx1MDQzNSBcdTA0MjFcdTA0M0JcdTA0M0VcdTA0MzZcdTA0M0RcdTA0M0UgXHUwNDMyXHUwNDNFIFx1MDQzMlx1MDQ0MFx1MDQzNVx1MDQzQ1x1MDQ0RiBcdTA0M0ZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYgXHUwNDNBXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDNFXHUwNDQ3XHUwNDNBXHUwNDM4L1x1MDQzN1x1MDQzMFx1MDQzQ1x1MDQzNVx1MDQ0Mlx1MDQzQVx1MDQzOFwiLFxuICAgIExBUFNFX0lOVEVSVkFMX0NIQU5HRV9ERVNDOiBcIlx1MDQzRFx1MDQzRVx1MDQzMlx1MDQ0Qlx1MDQzOVx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzQ1x1MDQzNVx1MDQzNlx1MDQ0M1x1MDQ0Mlx1MDQzRVx1MDQzQSA9IFx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQ0MFx1MDQ0Qlx1MDQzOVx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzQ1x1MDQzNVx1MDQzNlx1MDQ0M1x1MDQ0Mlx1MDQzRVx1MDQzQSAqIFx1MDQzOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNVx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzQ1x1MDQzNVx1MDQzNlx1MDQ0M1x1MDQ0Mlx1MDQzQVx1MDQzMCAvIDEwMC5cIixcbiAgICBFQVNZX0JPTlVTOiBcIlx1MDQxQlx1MDQzNVx1MDQzM1x1MDQzQVx1MDQzRTogXHUwNDMxXHUwNDNFXHUwNDNEXHUwNDQzXHUwNDQxXCIsXG4gICAgRUFTWV9CT05VU19ERVNDOlxuICAgICAgICBcIlx1MDQxMVx1MDQzRVx1MDQzRFx1MDQ0M1x1MDQ0MSBcdTA0MzdcdTA0MzAgXHUwNDFCXHUwNDM1XHUwNDMzXHUwNDNBXHUwNDNFIFx1MDQzRlx1MDQzRVx1MDQzN1x1MDQzMlx1MDQzRVx1MDQzQlx1MDQ0Rlx1MDQzNVx1MDQ0MiBcdTA0MzJcdTA0MzBcdTA0M0MgXHUwNDQzXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQ0MFx1MDQzMFx1MDQzN1x1MDQzRFx1MDQzOFx1MDQ0Nlx1MDQ0MyBcdTA0MzIgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDNDXHUwNDM1XHUwNDM2XHUwNDQzXHUwNDQyXHUwNDNBXHUwNDMwXHUwNDQ1IFx1MDQzQ1x1MDQzNVx1MDQzNlx1MDQzNFx1MDQ0MyBcdTA0M0VcdTA0NDJcdTA0MzJcdTA0MzVcdTA0NDJcdTA0MzBcdTA0M0NcdTA0MzggXHUwNDI1XHUwNDNFXHUwNDQwXHUwNDNFXHUwNDQ4XHUwNDNFIFx1MDQzOCBcdTA0MUJcdTA0MzVcdTA0MzNcdTA0M0FcdTA0M0UgXHUwNDNEXHUwNDMwIFx1MDQzQVx1MDQzMFx1MDQ0MFx1MDQ0Mlx1MDQzRVx1MDQ0N1x1MDQzQVx1MDQzNS9cdTA0MzdcdTA0MzBcdTA0M0NcdTA0MzVcdTA0NDJcdTA0M0FcdTA0MzUgKFx1MDQzQ1x1MDQzOFx1MDQzRC4gPSAxMDAlKS5cIixcbiAgICBFQVNZX0JPTlVTX01JTl9XQVJOSU5HOiBcIlx1MDQxMVx1MDQzRVx1MDQzRFx1MDQ0M1x1MDQ0MSBcdTA0MzdcdTA0MzAgXHUwNDFCXHUwNDM1XHUwNDMzXHUwNDNBXHUwNDNFIFx1MDQzNFx1MDQzRVx1MDQzQlx1MDQzNlx1MDQzNVx1MDQzRCBcdTA0MzFcdTA0NEJcdTA0NDJcdTA0NEMgXHUwNDNEXHUwNDM1IFx1MDQzQ1x1MDQzNVx1MDQzRFx1MDQ0Q1x1MDQ0OFx1MDQzNSAxMDAuXCIsXG4gICAgTUFYX0lOVEVSVkFMOiBcIk1heGltdW0gaW50ZXJ2YWwgaW4gZGF5c1wiLFxuICAgIE1BWF9JTlRFUlZBTF9ERVNDOlxuICAgICAgICBcIlx1MDQxRlx1MDQzRVx1MDQzN1x1MDQzMlx1MDQzRVx1MDQzQlx1MDQ0Rlx1MDQzNVx1MDQ0MiBcdTA0MzJcdTA0MzBcdTA0M0MgXHUwNDQzXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDMwXHUwNDMyXHUwNDNCXHUwNDM4XHUwNDMyXHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQ0NVx1MDQzRFx1MDQ0RVx1MDQ0RSBcdTA0MzNcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NDZcdTA0NDMgXHUwNDNEXHUwNDMwIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzQ1x1MDQzNVx1MDQzNlx1MDQ0M1x1MDQ0Mlx1MDQzRVx1MDQzQSAoXHUwNDNGXHUwNDNFIFx1MDQ0M1x1MDQzQ1x1MDQzRVx1MDQzQlx1MDQ0N1x1MDQzMFx1MDQzRFx1MDQzOFx1MDQ0RSA9IDEwMCBcdTA0M0JcdTA0MzVcdTA0NDIpLlwiLFxuICAgIE1BWF9JTlRFUlZBTF9NSU5fV0FSTklORzogXCJcdTA0MUNcdTA0MzBcdTA0M0FcdTA0NDFcdTA0MzhcdTA0M0NcdTA0MzBcdTA0M0JcdTA0NENcdTA0M0RcdTA0NEJcdTA0MzkgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDNDXHUwNDM1XHUwNDM2XHUwNDQzXHUwNDQyXHUwNDNFXHUwNDNBIFx1MDQzNFx1MDQzRVx1MDQzQlx1MDQzNlx1MDQzNVx1MDQzRCBcdTA0MzFcdTA0NEJcdTA0NDJcdTA0NEMgXHUwNDNEXHUwNDM1IFx1MDQzQ1x1MDQzNVx1MDQzRFx1MDQ0Q1x1MDQ0OFx1MDQzNSAxLlwiLFxuICAgIE1BWF9MSU5LX0NPTlRSSUI6IFwiXHUwNDFDXHUwNDMwXHUwNDNBXHUwNDQxXHUwNDM4XHUwNDNDXHUwNDMwXHUwNDNCXHUwNDRDXHUwNDNEXHUwNDRCXHUwNDM5IFx1MDQzMlx1MDQzQVx1MDQzQlx1MDQzMFx1MDQzNCBcdTA0NDFcdTA0MzJcdTA0NEZcdTA0MzdcdTA0MzggKFx1MDQ0MVx1MDQ0MVx1MDQ0Qlx1MDQzQlx1MDQzQVx1MDQzOClcIixcbiAgICBNQVhfTElOS19DT05UUklCX0RFU0M6XG4gICAgICAgIFwiXHUwNDFDXHUwNDMwXHUwNDNBXHUwNDQxXHUwNDM4XHUwNDNDXHUwNDMwXHUwNDNCXHUwNDRDXHUwNDNEXHUwNDRCXHUwNDM5IFx1MDQzMlx1MDQzQVx1MDQzQlx1MDQzMFx1MDQzNCBcdTA0MzJcdTA0MzdcdTA0MzJcdTA0MzVcdTA0NDhcdTA0MzVcdTA0M0RcdTA0M0RcdTA0M0VcdTA0MzkgXHUwNDFCXHUwNDUxXHUwNDMzXHUwNDNBXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDM4IFx1MDQ0MVx1MDQzMlx1MDQ0Rlx1MDQzN1x1MDQzMFx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQ0NSBcdTA0MzdcdTA0MzBcdTA0M0NcdTA0MzVcdTA0NDJcdTA0M0VcdTA0M0EgXHUwNDMyIFx1MDQzRFx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQzQlx1MDQ0Q1x1MDQzRFx1MDQ0M1x1MDQ0RSBcdTA0MUJcdTA0NTFcdTA0MzNcdTA0M0FcdTA0M0VcdTA0NDFcdTA0NDJcdTA0NEMuXCIsXG4gICAgTE9HR0lORzogXCJcdTA0MTJcdTA0MzVcdTA0MzRcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDNCXHUwNDNFXHUwNDMzXHUwNDMwXCIsXG4gICAgRElTUExBWV9ERUJVR19JTkZPOlxuICAgICAgICBcIlx1MDQxRVx1MDQ0Mlx1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0M0VcdTA0NDJcdTA0M0JcdTA0MzBcdTA0MzRcdTA0M0VcdTA0NDdcdTA0M0RcdTA0NDNcdTA0NEUgXHUwNDM4XHUwNDNEXHUwNDQ0XHUwNDNFXHUwNDQwXHUwNDNDXHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDRFIFx1MDQzMiBcdTA0M0FcdTA0M0VcdTA0M0RcdTA0NDFcdTA0M0VcdTA0M0JcdTA0MzUgXHUwNDQwXHUwNDMwXHUwNDM3XHUwNDQwXHUwNDMwXHUwNDMxXHUwNDNFXHUwNDQyXHUwNDQ3XHUwNDM4XHUwNDNBXHUwNDMwIChkZXZlbG9wZXIgY29uc29sZSk/XCIsXG5cbiAgICAvLyBzaWRlYmFyLnRzXG4gICAgTk9URVNfUkVWSUVXX1FVRVVFOiBcIlx1MDQxRVx1MDQ0N1x1MDQzNVx1MDQ0MFx1MDQzNVx1MDQzNFx1MDQ0QyBcdTA0MzdcdTA0MzBcdTA0M0NcdTA0MzVcdTA0NDJcdTA0M0VcdTA0M0EgXHUwNDNEXHUwNDMwIFx1MDQzRlx1MDQzRVx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNVwiLFxuICAgIENMT1NFOiBcIlx1MDQxN1x1MDQzMFx1MDQzQVx1MDQ0MFx1MDQ0Qlx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIE5FVzogXCJcdTA0MURcdTA0M0VcdTA0MzJcdTA0NEJcdTA0MzVcIixcbiAgICBZRVNURVJEQVk6IFwiXHUwNDEyXHUwNDQ3XHUwNDM1XHUwNDQwXHUwNDMwXHUwNDQ4XHUwNDNEXHUwNDM4XHUwNDM1XCIsXG4gICAgVE9EQVk6IFwiXHUwNDIxXHUwNDM1XHUwNDMzXHUwNDNFXHUwNDM0XHUwNDNEXHUwNDRGXHUwNDQ4XHUwNDNEXHUwNDM4XHUwNDM1XCIsXG4gICAgVE9NT1JST1c6IFwiXHUwNDE3XHUwNDMwXHUwNDMyXHUwNDQyXHUwNDQwXHUwNDMwXHUwNDQ4XHUwNDNEXHUwNDM4XHUwNDM1XCIsXG5cbiAgICAvLyBzdGF0cy1tb2RhbC50c3hcbiAgICBTVEFUU19USVRMRTogXCJcdTA0MjFcdTA0NDJcdTA0MzBcdTA0NDJcdTA0MzhcdTA0NDFcdTA0NDJcdTA0MzhcdTA0M0FcdTA0MzBcIixcbiAgICBNT05USDogXCJcdTA0MUNcdTA0MzVcdTA0NDFcdTA0NEZcdTA0NDZcIixcbiAgICBRVUFSVEVSOiBcIlx1MDQyN1x1MDQzNVx1MDQ0Mlx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIFlFQVI6IFwiXHUwNDEzXHUwNDNFXHUwNDM0XCIsXG4gICAgTElGRVRJTUU6IFwiXHUwNDEyXHUwNDQxXHUwNDUxIFx1MDQzMlx1MDQ0MFx1MDQzNVx1MDQzQ1x1MDQ0RlwiLFxuICAgIEZPUkVDQVNUOiBcIlx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQzRFx1MDQzRVx1MDQzN1wiLFxuICAgIEZPUkVDQVNUX0RFU0M6IFwiXHUwNDFBXHUwNDNFXHUwNDNCXHUwNDM4XHUwNDQ3XHUwNDM1XHUwNDQxXHUwNDQyXHUwNDMyXHUwNDNFIFx1MDQzQVx1MDQzMFx1MDQ0MFx1MDQ0Mlx1MDQzRVx1MDQ0N1x1MDQzNVx1MDQzQSBcdTA0M0ZcdTA0NDBcdTA0MzVcdTA0MzRcdTA0NDFcdTA0NDJcdTA0M0VcdTA0NEZcdTA0NDlcdTA0MzhcdTA0NDUgXHUwNDMyIFx1MDQzMVx1MDQ0M1x1MDQzNFx1MDQ0M1x1MDQ0OVx1MDQzNVx1MDQzQ1wiLFxuICAgIFNDSEVEVUxFRDogXCJcdTA0MTdcdTA0MzBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0M0VcIixcbiAgICBEQVlTOiBcIlx1MDQxNFx1MDQzRFx1MDQzNVx1MDQzOVwiLFxuICAgIE5VTUJFUl9PRl9DQVJEUzogXCJcdTA0MUFcdTA0M0VcdTA0M0JcdTA0MzhcdTA0NDdcdTA0MzVcdTA0NDFcdTA0NDJcdTA0MzJcdTA0M0UgXHUwNDNBXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDNFXHUwNDQ3XHUwNDM1XHUwNDNBXCIsXG4gICAgUkVWSUVXU19QRVJfREFZOiBcIlx1MDQyMVx1MDQ0MFx1MDQzNVx1MDQzNFx1MDQzRFx1MDQzNVx1MDQzNSBcdTA0M0FcdTA0M0VcdTA0M0JcdTA0MzhcdTA0NDdcdTA0MzVcdTA0NDFcdTA0NDJcdTA0MzJcdTA0M0U6ICR7YXZnfSBcdTA0M0ZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzkgXHUwNDMyIFx1MDQzNFx1MDQzNVx1MDQzRFx1MDQ0Q1wiLCAvLyEhIVxuICAgIElOVEVSVkFMUzogXCJcdTA0MThcdTA0M0RcdTA0NDJcdTA0MzVcdTA0NDBcdTA0MzJcdTA0MzBcdTA0M0JcdTA0NEJcIixcbiAgICBJTlRFUlZBTFNfREVTQzogXCJcdTA0MUZcdTA0NDBcdTA0M0VcdTA0M0NcdTA0MzVcdTA0MzZcdTA0NDNcdTA0NDJcdTA0M0FcdTA0MzggXHUwNDMyXHUwNDQwXHUwNDM1XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM4IFx1MDQzNFx1MDQzRSBcdTA0NDFcdTA0M0JcdTA0MzVcdTA0MzRcdTA0NDNcdTA0NEVcdTA0NDlcdTA0MzVcdTA0MzNcdTA0M0UgXHUwNDNGXHUwNDNFXHUwNDNBXHUwNDMwXHUwNDM3XHUwNDMwIFx1MDQzQVx1MDQzMFx1MDQ0MFx1MDQ0Mlx1MDQzRVx1MDQ0N1x1MDQzNVx1MDQzQSBcdTA0MzJcdTA0M0UgXHUwNDMyXHUwNDQwXHUwNDM1XHUwNDNDXHUwNDRGIFx1MDQzRlx1MDQzRVx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RlwiLFxuICAgIENPVU5UOiBcIlx1MDQxQVx1MDQzRVx1MDQzQlx1MDQzOFx1MDQ0N1x1MDQzNVx1MDQ0MVx1MDQ0Mlx1MDQzMlx1MDQzRVwiLFxuICAgIElOVEVSVkFMU19TVU1NQVJZOiBcIlx1MDQyMVx1MDQ0MFx1MDQzNVx1MDQzNFx1MDQzRFx1MDQzOFx1MDQzOSBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0M0NcdTA0MzVcdTA0MzZcdTA0NDNcdTA0NDJcdTA0M0VcdTA0M0E6ICR7YXZnfSwgXHUwNDIxXHUwNDMwXHUwNDNDXHUwNDRCXHUwNDM5IFx1MDQzNFx1MDQzQlx1MDQzOFx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQzOSBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0M0NcdTA0MzVcdTA0MzZcdTA0NDNcdTA0NDJcdTA0M0VcdTA0M0E6ICR7bG9uZ2VzdH1cIixcbiAgICBFQVNFUzogXCJcdTA0MUJcdTA0NTFcdTA0MzNcdTA0M0FcdTA0M0VcdTA0NDFcdTA0NDJcdTA0NEMgKFx1MDQzRlx1MDQzMFx1MDQ0MFx1MDQzMFx1MDQzQ1x1MDQzNVx1MDQ0Mlx1MDQ0MCBcdTA0MzIgXHUwNDMwXHUwNDNCXHUwNDMzXHUwNDNFXHUwNDQwXHUwNDM4XHUwNDQyXHUwNDNDXHUwNDM1LCBcdTA0M0FcdTA0M0VcdTA0NDJcdTA0M0VcdTA0NDBcdTA0NEJcdTA0MzkgXHUwNDMyXHUwNDNCXHUwNDM4XHUwNDRGXHUwNDM1XHUwNDQyIFx1MDQzRFx1MDQzMCBcdTA0M0ZcdTA0NDBcdTA0MzhcdTA0M0VcdTA0NDBcdTA0MzhcdTA0NDJcdTA0MzVcdTA0NDIgXHUwNDM4IFx1MDQzMlx1MDQ0MFx1MDQzNVx1MDQzQ1x1MDQ0RiBcdTA0M0ZcdTA0M0VcdTA0M0FcdTA0MzBcdTA0MzdcdTA0MzAgXHUwNDNBXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDNFXHUwNDQ3XHUwNDM1XHUwNDNBKSBcXG4gKFx1MDQzRVx1MDQ0MiBcdTA0MzBcdTA0M0RcdTA0MzNcdTA0M0IuIGVhc2UsIFx1MDQ0MVx1MDQzQy4gXHUwNDNEXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDQwXHUwNDNFXHUwNDM5XHUwNDNBXHUwNDM4IFx1MDQzMFx1MDQzQlx1MDQzM1x1MDQzRVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzQ1x1MDQzMClcIixcbiAgICBFQVNFU19TVU1NQVJZOiBcIlx1MDQyMVx1MDQ0MFx1MDQzNVx1MDQzNFx1MDQzRFx1MDQzNVx1MDQzNSBcdTA0M0FcdTA0M0VcdTA0M0JcdTA0MzhcdTA0NDdcdTA0MzVcdTA0NDFcdTA0NDJcdTA0MzJcdTA0M0UgXHUwNDFCXHUwNDUxXHUwNDMzXHUwNDNBXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDM4OiAke2F2Z0Vhc2V9XCIsXG4gICAgQ0FSRF9UWVBFUzogXCJcdTA0MjJcdTA0MzhcdTA0M0ZcdTA0NEIgXHUwNDNBXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDNFXHUwNDQ3XHUwNDM1XHUwNDNBXCIsXG4gICAgQ0FSRF9UWVBFU19ERVNDOiBcIlx1MDQxMlx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzMFx1MDQ0RiBcdTA0NDFcdTA0M0ZcdTA0NDBcdTA0NEZcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0RcdTA0NEJcdTA0MzUgXHUwNDNBXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDNFXHUwNDQ3XHUwNDNBXHUwNDM4LCBcdTA0MzVcdTA0NDFcdTA0M0JcdTA0MzggXHUwNDQyXHUwNDMwXHUwNDNBXHUwNDM4XHUwNDM1IFx1MDQ0MVx1MDQ0M1x1MDQ0OVx1MDQzNVx1MDQ0MVx1MDQ0Mlx1MDQzMlx1MDQ0M1x1MDQ0RVx1MDQ0Mi5cIixcbiAgICBDQVJEX1RZUEVfTkVXOiBcIlx1MDQxRFx1MDQzRVx1MDQzMlx1MDQ0Qlx1MDQ0NVwiLFxuICAgIENBUkRfVFlQRV9ZT1VORzogXCJcdTA0MUNcdTA0M0VcdTA0M0JcdTA0M0VcdTA0MzRcdTA0NEJcdTA0NDVcIixcbiAgICBDQVJEX1RZUEVfTUFUVVJFOiBcIlx1MDQxMlx1MDQzN1x1MDQ0MFx1MDQzRVx1MDQ0MVx1MDQzQlx1MDQ0Qlx1MDQ0NVwiLFxuICAgIENBUkRfVFlQRVNfU1VNTUFSWTogXCJcdTA0MTJcdTA0NDFcdTA0MzVcdTA0MzNcdTA0M0UgXHUwNDNBXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDNFXHUwNDQ3XHUwNDM1XHUwNDNBOiAke3RvdGFsQ2FyZHNDb3VudH1cIixcbn07XG4iLCAiLy8gVGFtaWxcblxuZXhwb3J0IGRlZmF1bHQge307XG4iLCAiLy8gVGVsdWd1XG5cbmV4cG9ydCBkZWZhdWx0IHt9O1xuIiwgIi8vIFRoYWlcblxuZXhwb3J0IGRlZmF1bHQge307XG4iLCAiLy8gVFx1MDBGQ3JrXHUwMEU3ZVxuXG5leHBvcnQgZGVmYXVsdCB7fTtcbiIsICIvLyBVa3JhaW5pYW5cblxuZXhwb3J0IGRlZmF1bHQge307XG4iLCAiLy8gVXJkdVxuXG5leHBvcnQgZGVmYXVsdCB7fTtcbiIsICIvLyBWaWV0bmFtZXNlXG5cbmV4cG9ydCBkZWZhdWx0IHt9O1xuIiwgIi8vIFx1N0I4MFx1NEY1M1x1NEUyRFx1NjU4N1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgLy8gZmxhc2hjYXJkLW1vZGFsLnRzeFxuICAgIERFQ0tTOiBcIlx1NTM2MVx1N0VDNFwiLFxuICAgIERVRV9DQVJEUzogXCJcdTUyMzBcdTY3MUZcdTUzNjFcdTcyNDdcIixcbiAgICBORVdfQ0FSRFM6IFwiXHU2NUIwXHU1MzYxXHU3MjQ3XCIsXG4gICAgVE9UQUxfQ0FSRFM6IFwiXHU1MTY4XHU5MEU4XHU1MzYxXHU3MjQ3XCIsXG4gICAgQkFDSzogXCJcdThGRDRcdTU2REVcIixcbiAgICBTS0lQOiBcIlx1NzU2NVx1OEZDN1wiLFxuICAgIEVESVRfQ0FSRDogXCJcdTdGMTZcdThGOTFcdTUzNjFcdTcyNDdcIixcbiAgICBSRVNFVF9DQVJEX1BST0dSRVNTOiBcIlx1OTFDRFx1N0Y2RVx1NTM2MVx1NzI0N1wiLFxuICAgIEhBUkQ6IFwiXHU4RjgzXHU5NkJFXCIsXG4gICAgR09PRDogXCJcdThCQjBcdTVGOTdcIixcbiAgICBFQVNZOiBcIlx1N0I4MFx1NTM1NVwiLFxuICAgIFNIT1dfQU5TV0VSOiBcIlx1NjYzRVx1NzkzQVx1N0I1NFx1Njg0OFwiLFxuICAgIENBUkRfUFJPR1JFU1NfUkVTRVQ6IFwiXHU1MzYxXHU3MjQ3XHU1REYyXHU4OEFCXHU5MUNEXHU3RjZFXHUzMDAyXCIsXG4gICAgU0FWRTogXCJcdTUwQThcdTVCNThcIixcbiAgICBDQU5DRUw6IFwiXHU1M0Q2XHU2RDg4XCIsXG4gICAgTk9fSU5QVVQ6IFwiXHU2Q0ExXHU2NzA5XHU2M0QwXHU0RjlCXHU4RjkzXHU1MTY1XHUzMDAyXCIsXG4gICAgQ1VSUkVOVF9FQVNFX0hFTFBfVEVYVDogXCJcdTc2RUVcdTUyNERcdTYzOENcdTYzRTFcdTdBMEJcdTVFQTZcdUZGMUFcIixcbiAgICBDVVJSRU5UX0lOVEVSVkFMX0hFTFBfVEVYVDogXCJcdTc2RUVcdTUyNERcdTk1RjRcdTk2OTRcdUZGMUFcIixcbiAgICBDQVJEX0dFTkVSQVRFRF9GUk9NOiBcIlx1NzUxRlx1NjIxMFx1ODFFQVx1RkYxQSR7bm90ZVBhdGh9XCIsXG5cbiAgICAvLyBtYWluLnRzXG4gICAgT1BFTl9OT1RFX0ZPUl9SRVZJRVc6IFwiXHU2MjUzXHU1RjAwXHU0RTAwXHU0RTJBXHU3QjE0XHU4QkIwXHU1RjAwXHU1OUNCXHU1OTBEXHU0RTYwXCIsXG4gICAgUkVWSUVXX0NBUkRTOiBcIlx1NTkwRFx1NEU2MFx1NTM2MVx1NzI0N1wiLFxuICAgIFJFVklFV19FQVNZX0ZJTEVfTUVOVTogXCJcdTU5MERcdTRFNjBcdUZGMUFcdTdCODBcdTUzNTVcIixcbiAgICBSRVZJRVdfR09PRF9GSUxFX01FTlU6IFwiXHU1OTBEXHU0RTYwXHVGRjFBXHU4QkIwXHU1Rjk3XCIsXG4gICAgUkVWSUVXX0hBUkRfRklMRV9NRU5VOiBcIlx1NTkwRFx1NEU2MFx1RkYxQVx1OEY4M1x1OTZCRVwiLFxuICAgIFJFVklFV19OT1RFX0VBU1lfQ01EOiBcIlx1NjgwN1x1OEJCMFx1NEUzQVx1MjAxQ1x1N0I4MFx1NTM1NVx1MjAxRFwiLFxuICAgIFJFVklFV19OT1RFX0dPT0RfQ01EOiBcIlx1NjgwN1x1OEJCMFx1NEUzQVx1MjAxQ1x1OEJCMFx1NUY5N1x1MjAxRFwiLFxuICAgIFJFVklFV19OT1RFX0hBUkRfQ01EOiBcIlx1NjgwN1x1OEJCMFx1NEUzQVx1MjAxQ1x1OEY4M1x1OTZCRVx1MjAxRFwiLFxuICAgIFJFVklFV19BTExfQ0FSRFM6IFwiXHU1OTBEXHU0RTYwXHU2MjQwXHU2NzA5XHU3QjE0XHU4QkIwXHU0RTJEXHU3Njg0XHU1MzYxXHU3MjQ3XCIsXG4gICAgQ1JBTV9BTExfQ0FSRFM6IFwiXHU5MDA5XHU2MkU5XHU4OTgxXHU5NkM2XHU0RTJEXHU1OTBEXHU0RTYwXHU3Njg0XHU1MzYxXHU3RUM0XCIsXG4gICAgUkVWSUVXX0NBUkRTX0lOX05PVEU6IFwiXHU1OTBEXHU0RTYwXHU2QjY0XHU3QjE0XHU4QkIwXHU0RTJEXHU3Njg0XHU1MzYxXHU3MjQ3XCIsXG4gICAgQ1JBTV9DQVJEU19JTl9OT1RFOiBcIlx1OTZDNlx1NEUyRFx1NTkwRFx1NEU2MFx1NkI2NFx1N0IxNFx1OEJCMFx1NEUyRFx1NzY4NFx1NTM2MVx1NzI0N1wiLFxuICAgIFZJRVdfU1RBVFM6IFwiXHU2N0U1XHU3NzBCXHU2NTcwXHU2MzZFXCIsXG4gICAgU1RBVFVTX0JBUjogXCJcdTU5MERcdTRFNjA6ICR7ZHVlTm90ZXNDb3VudH0gXHU3QjE0XHU4QkIwLCAke2R1ZUZsYXNoY2FyZHNDb3VudH0gXHU1MzYxXHU3MjQ3XHU1REYyXHU1MjMwXHU2NzFGXCIsXG4gICAgU1lOQ19USU1FX1RBS0VOOiBcIlx1NTQwQ1x1NkI2NVx1NjVGNlx1OTVGNCAke3R9bXNcIixcbiAgICBOT1RFX0lOX0lHTk9SRURfRk9MREVSOiBcIlx1N0IxNFx1OEJCMFx1NEZERFx1NUI1OFx1NTcyOFx1NURGMlx1ODhBQlx1NUZGRFx1NzU2NVx1NzY4NFx1OERFRlx1NUY4NFx1NEUyRFx1RkYwOFx1NjhDMFx1NjdFNVx1OEJCRVx1N0Y2RVx1OTAwOVx1OTg3OVx1RkYwOVx1MzAwMlwiLFxuICAgIFBMRUFTRV9UQUdfTk9URTogXCJcdThCRjdcdTVDMDZcdTk3MDBcdTg5ODFcdTU5MERcdTRFNjBcdTc2ODRcdTdCMTRcdThCQjBcdTRFMkRcdTUyQTBcdTUxNjVcdTZCNjNcdTc4NkVcdTc2ODRcdTY4MDdcdTdCN0VcdUZGMDhcdTY4QzBcdTY3RTVcdThCQkVcdTdGNkVcdTkwMDlcdTk4NzlcdUZGMDlcdTMwMDJcIixcbiAgICBSRVNQT05TRV9SRUNFSVZFRDogXCJcdTUzQ0RcdTk5ODhcdTVERjJcdTY1MzZcdTUyMzBcIixcbiAgICBOT19ERUNLX0VYSVNUUzogXCJcdTZDQTFcdTY3MDkgJHtkZWNrTmFtZX0gXHU1MzYxXHU3RUM0XCIsXG4gICAgQUxMX0NBVUdIVF9VUDogXCJcdTkwRkRcdTU5MERcdTRFNjBcdTVCOENcdTU1NjZcdUZGMENcdTRGNjBcdTc3MUZcdTY4RDJcdUZGMDFcIixcblxuICAgIC8vIHNjaGVkdWxpbmcudHNcbiAgICBEQVlTX1NUUl9JVkw6IFwiJHtpbnRlcnZhbH1cdTU5MjlcIixcbiAgICBNT05USFNfU1RSX0lWTDogXCIke2ludGVydmFsfVx1NjcwOFwiLFxuICAgIFlFQVJTX1NUUl9JVkw6IFwiJHtpbnRlcnZhbH1cdTVFNzRcIixcbiAgICBEQVlTX1NUUl9JVkxfTU9CSUxFOiBcIiR7aW50ZXJ2YWx9XHU1OTI5XCIsXG4gICAgTU9OVEhTX1NUUl9JVkxfTU9CSUxFOiBcIiR7aW50ZXJ2YWx9XHU2NzA4XCIsXG4gICAgWUVBUlNfU1RSX0lWTF9NT0JJTEU6IFwiJHtpbnRlcnZhbH1cdTVFNzRcIixcblxuICAgIC8vIHNldHRpbmdzLnRzXG4gICAgU0VUVElOR1NfSEVBREVSOiBcIlx1OTVGNFx1OTY5NFx1OTFDRFx1NTkwRFx1NjNEMlx1NEVGNiAtIFx1OEJCRVx1N0Y2RVwiLFxuICAgIENIRUNLX1dJS0k6ICdcdTRFODZcdTg5RTNcdTY2RjRcdTU5MUEsIFx1OEJGN1x1NzBCOVx1NTFGQjxhIGhyZWY9XCIke3dpa2lfdXJsfVwiPndpa2k8L2E+LicsXG4gICAgRk9MREVSU19UT19JR05PUkU6IFwiXHU1RkZEXHU3NTY1XHU2QjY0XHU2NTg3XHU0RUY2XHU1OTM5XCIsXG4gICAgRk9MREVSU19UT19JR05PUkVfREVTQzogXCJcdThGOTNcdTUxNjVcdTY1ODdcdTRFRjZcdTU5MzlcdThERUZcdTVGODRcdUZGMENcdTc1MjhcdTY1QjBcdTVFRkFcdTg4NENcdTUyMDZcdTk2OTRcdUZGMENcdTRGOEJcdTU5ODJcdUZGMUFUZW1wbGF0ZXMgTWV0YS9TY3JpcHRzXCIsXG4gICAgRkxBU0hDQVJEUzogXCJcdTUzNjFcdTcyNDdcIixcbiAgICBGTEFTSENBUkRfRUFTWV9MQUJFTDogXCJcdTIwMUNcdTdCODBcdTUzNTVcdTIwMURcdTYzMDlcdTk0QUVcdTY1ODdcdTY3MkNcIixcbiAgICBGTEFTSENBUkRfR09PRF9MQUJFTDogXCJcdTIwMUNcdThCQjBcdTVGOTdcdTIwMURcdTYzMDlcdTk0QUVcdTY1ODdcdTY3MkNcIixcbiAgICBGTEFTSENBUkRfSEFSRF9MQUJFTDogXCJcdTIwMUNcdThGODNcdTk2QkVcdTIwMURcdTYzMDlcdTk0QUVcdTY1ODdcdTY3MkNcIixcbiAgICBGTEFTSENBUkRfRUFTWV9ERVNDOiBcIlx1ODFFQVx1NUI5QVx1NEU0OVx1MjAxQ1x1N0I4MFx1NTM1NVx1MjAxRFx1NjMwOVx1OTRBRVx1NzY4NFx1NjgwN1x1N0I3RVwiLFxuICAgIEZMQVNIQ0FSRF9HT09EX0RFU0M6IFwiXHU4MUVBXHU1QjlBXHU0RTQ5XHUyMDFDXHU4QkIwXHU1Rjk3XHUyMDFEXHU2MzA5XHU5NEFFXHU3Njg0XHU2ODA3XHU3QjdFXCIsXG4gICAgRkxBU0hDQVJEX0hBUkRfREVTQzogXCJcdTgxRUFcdTVCOUFcdTRFNDlcdTIwMUNcdThGODNcdTk2QkVcdTIwMURcdTYzMDlcdTk0QUVcdTc2ODRcdTY4MDdcdTdCN0VcIixcbiAgICBGTEFTSENBUkRfVEFHUzogXCJcdTUzNjFcdTcyNDdcdTY4MDdcdTdCN0VcIixcbiAgICBGTEFTSENBUkRfVEFHU19ERVNDOiBcIlx1OEY5M1x1NTE2NVx1NjgwN1x1N0I3RVx1RkYwQ1x1NzUyOFx1N0E3QVx1NjgzQ1x1NjIxNlx1NjVCMFx1NUVGQVx1ODg0Q1x1NTIwNlx1OTY5NFx1RkYwQ1x1NEY4Qlx1NTk4Mlx1RkYxQSNmbGFzaGNhcmRzICNkZWNrMiAjZGVjazMuXCIsXG4gICAgQ09OVkVSVF9GT0xERVJTX1RPX0RFQ0tTOiBcIlx1NjYyRlx1NTQyNlx1NUMwNlx1NjU4N1x1NEVGNlx1NTkzOVx1NTE4NVx1NUJCOVx1OEY2Q1x1NjM2Mlx1NEUzQVx1NTM2MVx1NzI0N1x1N0VDNFx1NTQ4Q1x1NUI1MFx1NTM2MVx1NzI0N1x1N0VDNFx1RkYxRlwiLFxuICAgIENPTlZFUlRfRk9MREVSU19UT19ERUNLU19ERVNDOiBcIlx1NkI2NFx1OTAwOVx1OTg3OVx1NEUzQVx1NTM2MVx1NzI0N1x1NjgwN1x1N0I3RVx1OTAwOVx1OTg3OVx1NzY4NFx1NjZGRlx1NEVFM1x1OTAwOVx1OTg3OVx1MzAwMlwiLFxuICAgIElOTElORV9TQ0hFRFVMSU5HX0NPTU1FTlRTOiBcIlx1NjYyRlx1NTQyNlx1NUMwNlx1OEJBMVx1NTIxMlx1OTFDRFx1NTkwRFx1NjVGNlx1OTVGNFx1NEZERFx1NUI1OFx1NTcyOFx1NTM2MVx1NzI0N1x1NjcwMFx1NTQwRVx1NEUwMFx1ODg0Q1x1NzY4NFx1NTQwQ1x1NEUwMFx1ODg0Q1x1RkYxRlwiLFxuICAgIElOTElORV9TQ0hFRFVMSU5HX0NPTU1FTlRTX0RFU0M6IFwiSFRNTFx1NkNFOFx1OTFDQVx1NEUwRFx1NTE4RFx1NzgzNFx1NTc0Rlx1NTIxN1x1ODg2OFx1NjgzQ1x1NUYwRlwiLFxuICAgIEJVUllfU0lCTElOR1NfVElMTF9ORVhUX0RBWTogXCJcdTVDMDZcdTUxNzNcdTgwNTRcdTUzNjFcdTcyNDdcdTk2OTBcdTg1Q0ZcdTgxRjNcdTRFMEJcdTRFMDBcdTU5MjlcdUZGMUZcIixcbiAgICBCVVJZX1NJQkxJTkdTX1RJTExfTkVYVF9EQVlfREVTQzogXCJcdTUxNzNcdTgwNTRcdTUzNjFcdTcyNDdcdTY2MkZcdTY3NjVcdTgxRUFcdTU0MENcdTRFMDBcdTUzNjFcdTcyNDdcdTc2ODRcdTRFMERcdTU0MENcdTVGNjJcdTVGMEZcdUZGMEMgXHU0RjhCXHU1OTgyXHVGRjFBXHU1QjhDXHU1RjYyXHU1ODZCXHU3QTdBXHU1MzYxXHU3MjQ3XCIsXG4gICAgU0hPV19DQVJEX0NPTlRFWFQ6IFwiXHU1NzI4XHU1MzYxXHU3MjQ3XHU0RTJEXHU2NjNFXHU3OTNBXHU0RTBBXHU0RTBCXHU2NTg3XHVGRjFGXCIsXG4gICAgU0hPV19DQVJEX0NPTlRFWFRfREVTQzogXCJcdTRGOEJcdTU5ODJcdUZGMUFcdTY4MDdcdTk4OTggPiBcdTUyNkZcdTY4MDdcdTk4OTggPiBcdTVDMEZcdTY4MDdcdTk4OTggPiAuLi4gPiBcdTVDMEZcdTY4MDdcdTk4OThcIixcbiAgICBDQVJEX01PREFMX0hFSUdIVF9QRVJDRU5UOiBcIlx1NTM2MVx1NzI0N1x1OUFEOFx1NUVBNlx1NzY3RVx1NTIwNlx1NkJENFwiLFxuICAgIENBUkRfTU9EQUxfU0laRV9QRVJDRU5UX0RFU0M6IFwiXHU4QkY3XHU1NzI4XHU3OUZCXHU1MkE4XHU3QUVGXHU0RjdGXHU3NTI4XHU1RTc2XHU5NzAwXHU4OTgxXHU2RDRGXHU4OUM4XHU4RjgzXHU1OTI3XHU1NkZFXHU3MjQ3XHU2NUY2XHU4QkJFXHU0RTNBMTAwJVwiLFxuICAgIFJFU0VUX0RFRkFVTFQ6IFwiXHU5MUNEXHU3RjZFXHU0RTNBXHU5RUQ4XHU4QkE0XCIsXG4gICAgQ0FSRF9NT0RBTF9XSURUSF9QRVJDRU5UOiBcIlx1NTM2MVx1NzI0N1x1NUJCRFx1NUVBNlx1NzY3RVx1NTIwNlx1NkJENFwiLFxuICAgIFJBTkRPTUlaRV9DQVJEX09SREVSOiBcIlx1NTkwRFx1NEU2MFx1NjVGNlx1OTY4Rlx1NjczQVx1NjYzRVx1NzkzQVx1NTM2MVx1NzI0N1x1RkYxRlwiLFxuICAgIERJU0FCTEVfQ0xPWkVfQ0FSRFM6IFwiXHU0RTBEXHU4RkRCXHU4ODRDXHU1QjhDXHU1RjYyXHU1ODZCXHU3QTdBXHVGRjFGXCIsXG4gICAgQ09OVkVSVF9ISUdITElHSFRTX1RPX0NMT1pFUzogXCJcdTVDMDYgPT1cdTlBRDhcdTRFQUU9PSBcdThGNkNcdTYzNjJcdTRFM0FcdTVCOENcdTVGNjJcdTU4NkJcdTdBN0FcdUZGMUZcIixcbiAgICBDT05WRVJUX0JPTERfVEVYVF9UT19DTE9aRVM6IFwiXHU1QzA2ICoqXHU3Qzk3XHU0RjUzKiogXHU4RjZDXHU2MzYyXHU0RTNBXHU1QjhDXHU1RjYyXHU1ODZCXHU3QTdBXHVGRjFGXCIsXG4gICAgQ09OVkVSVF9DVVJMWV9CUkFDS0VUU19UT19DTE9aRVM6IFwiXHU1QzA2IHt7XHU1OTI3XHU2MkVDXHU1M0Y3fX0gXHU4RjZDXHU2MzYyXHU0RTNBXHU1QjhDXHU1RjYyXHU1ODZCXHU3QTdBXHVGRjFGXCIsXG4gICAgSU5MSU5FX0NBUkRTX1NFUEFSQVRPUjogXCJcdTUzNTVcdTg4NENcdTUzNjFcdTcyNDdcdTc2ODRcdTUyMDZcdTk2OTRcdTdCMjZcIixcbiAgICBGSVhfU0VQQVJBVE9SU19NQU5VQUxMWV9XQVJOSU5HOiBcIlx1NkNFOFx1NjEwRlx1RkYxQVx1NjZGNFx1NjUzOVx1NkI2NFx1OTAwOVx1OTg3OVx1NTQwRVx1NEY2MFx1NUMwNlx1OTcwMFx1ODk4MVx1ODFFQVx1ODg0Q1x1NjZGNFx1NjUzOVx1NURGMlx1NUI1OFx1NTcyOFx1NTM2MVx1NzI0N1x1NzY4NFx1NTIwNlx1OTY5NFx1N0IyNlx1MzAwMlwiLFxuICAgIElOTElORV9SRVZFUlNFRF9DQVJEU19TRVBBUkFUT1I6IFwiXHU1MzU1XHU4ODRDXHU3RkZCXHU4RjZDXHU1MzYxXHU3MjQ3XHU3Njg0XHU1MjA2XHU5Njk0XHU3QjI2XCIsXG4gICAgTVVMVElMSU5FX0NBUkRTX1NFUEFSQVRPUjogXCJcdTU5MUFcdTg4NENcdTUzNjFcdTcyNDdcdTc2ODRcdTUyMDZcdTk2OTRcdTdCMjZcIixcbiAgICBNVUxUSUxJTkVfUkVWRVJTRURfQ0FSRFNfU0VQQVJBVE9SOiBcIlx1NTkxQVx1ODg0Q1x1N0ZGQlx1OEY2Q1x1NTM2MVx1NzI0N1x1NzY4NFx1NTIwNlx1OTY5NFx1N0IyNlwiLFxuICAgIE5PVEVTOiBcIlx1N0IxNFx1OEJCMFwiLFxuICAgIFJFVklFV19QQU5FX09OX1NUQVJUVVA6IFwiXHU1NDJGXHU1MkE4XHU2NUY2XHU1RjAwXHU1NDJGXHU3QjE0XHU4QkIwXHU1OTBEXHU0RTYwXHU3QTk3XHU2ODNDXCIsXG4gICAgVEFHU19UT19SRVZJRVc6IFwiXHU1OTBEXHU0RTYwXHU2ODA3XHU3QjdFXCIsXG4gICAgVEFHU19UT19SRVZJRVdfREVTQzogXCJcdThGOTNcdTUxNjVcdTY4MDdcdTdCN0VcdUZGMENcdTc1MjhcdTdBN0FcdTY4M0NcdTYyMTZcdTY1QjBcdTVFRkFcdTg4NENcdTUyMDZcdTk2OTRcdUZGMENcdTRGOEJcdTU5ODJcdUZGMUEjcmV2aWV3ICN0YWcyICN0YWczLlwiLFxuICAgIE9QRU5fUkFORE9NX05PVEU6IFwiXHU1OTBEXHU0RTYwXHU5NjhGXHU2NzNBXHU3QjE0XHU4QkIwXCIsXG4gICAgT1BFTl9SQU5ET01fTk9URV9ERVNDOiBcIlx1NTE3M1x1OTVFRFx1NkI2NFx1OTAwOVx1OTg3OVx1RkYwQ1x1N0IxNFx1OEJCMFx1NUMwNlx1NEVFNVx1OTFDRFx1ODk4MVx1NUVBNihQYWdlUmFuaylcdTYzOTJcdTVFOEZcdTMwMDJcIixcbiAgICBBVVRPX05FWFRfTk9URTogXCJcdTU5MERcdTRFNjBcdTU0MEVcdTgxRUFcdTUyQThcdTYyNTNcdTVGMDBcdTRFMEJcdTRFMDBcdTRFMkFcdTdCMTRcdThCQjBcIixcbiAgICBESVNBQkxFX0ZJTEVfTUVOVV9SRVZJRVdfT1BUSU9OUzogXCJcdTUxNzNcdTk1RURcdTY1ODdcdTRFRjZcdTkwMDlcdTUzNTVcdTRFMkRcdTc2ODRcdTU5MERcdTRFNjBcdTkwMDlcdTk4NzkgXHU0RjhCXHU1OTgyXHVGRjFBXHU1OTBEXHU0RTYwXHVGRjFBXHU3QjgwXHU1MzU1IFx1OEJCMFx1NUY5NyBcdThGODNcdTk2QkVcIixcbiAgICBESVNBQkxFX0ZJTEVfTUVOVV9SRVZJRVdfT1BUSU9OU19ERVNDOlxuICAgICAgICBcIlx1NTE3M1x1OTVFRFx1NkI2NFx1OTAwOVx1OTg3OVx1NTQwRVx1NEY2MFx1NTNFRlx1NEVFNVx1NEY3Rlx1NzUyOFx1NUZFQlx1NjM3N1x1OTUyRVx1NUYwMFx1NTlDQlx1NTkwRFx1NEU2MFx1MzAwMlx1OTFDRFx1NjVCMFx1NTQyRlx1NTJBOE9ic2lkaWFuXHU0RjdGXHU2NzJDXHU5MDA5XHU5ODc5XHU3NTFGXHU2NTQ4XHUzMDAyXCIsXG4gICAgTUFYX05fREFZU19SRVZJRVdfUVVFVUU6IFwiXHU1M0YzXHU4RkI5XHU2ODBGXHU0RTJEXHU2NjNFXHU3OTNBXHU3Njg0XHU2NzAwXHU1OTI3XHU1OTI5XHU2NTcwXCIsXG4gICAgTUlOX09ORV9EQVk6IFwiXHU1OTI5XHU2NTcwXHU2NzAwXHU1QzBGXHU1MDNDXHU0RTNBMVwiLFxuICAgIFZBTElEX05VTUJFUl9XQVJOSU5HOiBcIlx1OEJGN1x1OEY5M1x1NTE2NVx1NjcwOVx1NjU0OFx1NzY4NFx1NjU3MFx1NUI1N1x1MzAwMlwiLFxuICAgIFVJX1BSRUZFUkVOQ0VTOiBcIlx1NzUyOFx1NjIzN1x1NzU0Q1x1OTc2Mlx1OTk5Nlx1OTAwOVx1OTg3OVwiLFxuICAgIElOSVRJQUxMWV9FWFBBTkRfU1VCREVDS1NfSU5fVFJFRTogXCJcdTc1MzJcdTY3N0ZcdTY4MTFcdTY3MDBcdTUyMURcdTVFOTRcdTY2M0VcdTc5M0FcdTRFM0FcdTVDNTVcdTVGMDBcIixcbiAgICBJTklUSUFMTFlfRVhQQU5EX1NVQkRFQ0tTX0lOX1RSRUVfREVTQzpcbiAgICAgICAgXCJcdTUxNzNcdTk1RURcdTZCNjRcdTkwMDlcdTk4NzlcdTUzRUZcdTYyOThcdTUzRTBcdTU0MENcdTRFMDBcdTVGMjBcdTUzNjFcdTcyNDdcdTRFMkRcdTc2ODRcdTVENENcdTU5NTdcdTcyNENcdTdFQzRcdTMwMDJcdTU5ODJcdTY3OUNcdTYwQThcdTc2ODRcdTUzNjFcdTcyNDdcdTVDNUVcdTRFOEVcdTU0MENcdTRFMDBcdTY1ODdcdTRFRjZcdTRFMkRcdTc2ODRcdThCQjhcdTU5MUFcdTU5NTdcdTcyNENcdUZGMENcdTUyMTlcdTVGODhcdTY3MDlcdTc1MjhcdTMwMDJcIixcbiAgICBBTEdPUklUSE06IFwiXHU3Qjk3XHU2Q0Q1XCIsXG4gICAgQ0hFQ0tfQUxHT1JJVEhNX1dJS0k6ICdcdTRFODZcdTg5RTNcdTY2RjRcdTU5MUEsIFx1OEJGN1x1NzBCOVx1NTFGQjxhIGhyZWY9XCIke2FsZ29fdXJsfVwiPlx1N0I5N1x1NkNENVx1NUI5RVx1NzNCMDwvYT4uJyxcbiAgICBCQVNFX0VBU0U6IFwiXHU1N0ZBXHU3ODQwXHU2MzhDXHU2M0UxXHU3QTBCXHU1RUE2XCIsXG4gICAgQkFTRV9FQVNFX0RFU0M6IFwiXHU2NzAwXHU1QzBGXHU1MDNDMTMwXHVGRjBDXHU2M0E4XHU4MzUwXHU1MDNDXHU3RUE2MjUwLlwiLFxuICAgIEJBU0VfRUFTRV9NSU5fV0FSTklORzogXCJcdTU3RkFcdTc4NDBcdTYzOENcdTYzRTFcdTdBMEJcdTVFQTZcdTc2ODRcdTY3MDBcdTVDMEZcdTUwM0NcdTRFM0ExMzBcdTMwMDJcIixcbiAgICBMQVBTRV9JTlRFUlZBTF9DSEFOR0U6IFwiXHU1QzA2XHU1OTBEXHU0RTYwXHU2NUY2XHU2ODA3XHU2Q0U4XHU0RTNBXHUyMDFDXHU4RjgzXHU5NkJFXHUyMDFEXHU3Njg0XHU1MzYxXHU3MjQ3XHU2MjE2XHU3QjE0XHU4QkIwXHU1OTBEXHU0RTYwXHU5NUY0XHU5Njk0XHU3RjI5XHU3N0VEXCIsXG4gICAgTEFQU0VfSU5URVJWQUxfQ0hBTkdFX0RFU0M6IFwiXHU2NUIwXHU1OTBEXHU0RTYwXHU5NUY0XHU5Njk0ID0gXHU1MzlGXHU1OTBEXHU0RTYwXHU5NUY0XHU5Njk0ICogXHU5NUY0XHU5Njk0XHU2NTM5XHU1M0Q4XHU3Q0ZCXHU2NTcwIC8gMTAwLlwiLFxuICAgIEVBU1lfQk9OVVM6IFwiXHU3QjgwXHU1MzU1XHU1OTU2XHU1MkIxXCIsXG4gICAgRUFTWV9CT05VU19ERVNDOiBcIlx1N0I4MFx1NTM1NVx1NTk1Nlx1NTJCMVx1OEJCRVx1NUI5QVx1MjAxQ1x1OEJCMFx1NUY5N1x1MjAxRFx1NTQ4Q1x1MjAxQ1x1N0I4MFx1NTM1NVx1MjAxRFx1NTM2MVx1NzI0N1x1NjIxNlx1N0IxNFx1OEJCMFx1NzY4NFx1NTkwRFx1NEU2MFx1OTVGNFx1OTY5NFx1NURFRVx1OERERFx1RkYwOFx1NjcwMFx1NUMwRlx1NTAzQzEwMCVcdUZGMDlcdTMwMDJcIixcbiAgICBFQVNZX0JPTlVTX01JTl9XQVJOSU5HOiBcIlx1N0I4MFx1NTM1NVx1NTk1Nlx1NTJCMVx1ODFGM1x1NUMxMVx1NEUzQTEwMFx1MzAwMlwiLFxuICAgIE1BWF9JTlRFUlZBTDogXCJcdTY3MDBcdTU5MjdcdTk1RjRcdTk2OTRcdUZGMDhcdTU5MjlcdUZGMDlcIixcbiAgICBNQVhfSU5URVJWQUxfREVTQzogXCJcdThCQkVcdTVCOUFcdTU5MERcdTRFNjBcdTc2ODRcdTY3MDBcdTU5MjdcdTk1RjRcdTk2OTRcdTY1RjZcdTk1RjRcdUZGMDhcdTlFRDhcdThCQTRcdTUwM0MxMDBcdTVFNzRcdUZGMDlcdTMwMDJcIixcbiAgICBNQVhfSU5URVJWQUxfTUlOX1dBUk5JTkc6IFwiXHU2NzAwXHU1OTI3XHU5NUY0XHU5Njk0XHU4MUYzXHU1QzExXHU0RTNBMVx1NTkyOVwiLFxuICAgIE1BWF9MSU5LX0NPTlRSSUI6IFwiXHU2NzAwXHU1OTI3XHU5NEZFXHU2M0E1XHU2NTM2XHU3NkNBXCIsXG4gICAgTUFYX0xJTktfQ09OVFJJQl9ERVNDOiBcIlx1OTRGRVx1NjNBNVx1N0IxNFx1OEJCMFx1NzY4NFx1NTJBMFx1Njc0M1x1NjM4Q1x1NjNFMVx1N0EwQlx1NUVBNlx1NUJGOVx1NTM5Rlx1NTlDQlx1NjM4Q1x1NjNFMVx1N0EwQlx1NUVBNlx1NzY4NFx1NjcwMFx1NTkyN1x1OEQyMVx1NzMyRVx1MzAwMlwiLFxuICAgIExPR0dJTkc6IFwiXHU4QkIwXHU1RjU1XHU0RTJEXCIsXG4gICAgRElTUExBWV9ERUJVR19JTkZPOiBcIlx1NTcyOFx1NUYwMFx1NTNEMVx1ODAwNVx1NjNBN1x1NTIzNlx1NTNGMFx1NEUyRFx1NjYzRVx1NzkzQVx1OEMwM1x1OEJENVx1NEZFMVx1NjA2Rlx1RkYxRlwiLFxuXG4gICAgLy8gc2lkZWJhci50c1xuICAgIE5PVEVTX1JFVklFV19RVUVVRTogXCJcdTdCMTRcdThCQjBcdTU5MERcdTRFNjBcdTVFOEZcdTUyMTdcIixcbiAgICBDTE9TRTogXCJcdTRFMzRcdThGRDFcIixcbiAgICBORVc6IFwiXHU2NUIwXCIsXG4gICAgWUVTVEVSREFZOiBcIlx1NjYyOFx1NTkyOVwiLFxuICAgIFRPREFZOiBcIlx1NEVDQVx1NTkyOVwiLFxuICAgIFRPTU9SUk9XOiBcIlx1NjYwRVx1NTkyOVwiLFxuXG4gICAgLy8gc3RhdHMtbW9kYWwudHN4XG4gICAgU1RBVFNfVElUTEU6IFwiXHU2NTcwXHU2MzZFXCIsXG4gICAgTU9OVEg6IFwiXHU2NzA4XCIsXG4gICAgUVVBUlRFUjogXCJcdTVCNjNcIixcbiAgICBZRUFSOiBcIlx1NUU3NFwiLFxuICAgIExJRkVUSU1FOiBcIlx1NTE2OFx1OTBFOFwiLFxuICAgIEZPUkVDQVNUOiBcIlx1OTg4NFx1NjcxRlwiLFxuICAgIEZPUkVDQVNUX0RFU0M6IFwiXHU1QzA2XHU4OTgxXHU1MjMwXHU2NzFGXHU3Njg0XHU1MzYxXHU3MjQ3XHU2NTcwXHU5MUNGXCIsXG4gICAgU0NIRURVTEVEOiBcIlx1NURGMlx1NjM5Mlx1NjcxRlwiLFxuICAgIERBWVM6IFwiXHU1OTI5XCIsXG4gICAgTlVNQkVSX09GX0NBUkRTOiBcIlx1NTM2MVx1NzI0N1x1NjU3MFx1OTFDRlwiLFxuICAgIFJFVklFV1NfUEVSX0RBWTogXCJcdTVFNzNcdTU3NDc6IFx1NTkwRFx1NEU2MCR7YXZnfSAvXHU1OTI5XCIsXG4gICAgSU5URVJWQUxTOiBcIlx1OTVGNFx1OTY5NFwiLFxuICAgIElOVEVSVkFMU19ERVNDOiBcIlx1NTIzMFx1NEUwQlx1NEUwMFx1NkIyMVx1NTkwRFx1NEU2MFx1NzY4NFx1NjVGNlx1OTVGNFx1OTVGNFx1OTY5NFwiLFxuICAgIENPVU5UOiBcIlx1OEJBMVx1NjU3MFwiLFxuICAgIElOVEVSVkFMU19TVU1NQVJZOiBcIlx1NUU3M1x1NTc0N1x1OTVGNFx1OTY5NFx1NjVGNlx1OTVGNDogJHthdmd9LCBcdTY3MDBcdTk1N0ZcdTk1RjRcdTk2OTRcdTY1RjZcdTk1RjQ6ICR7bG9uZ2VzdH1cIixcbiAgICBFQVNFUzogXCJcdTYzOENcdTYzRTFcdTdBMEJcdTVFQTZcIixcbiAgICBFQVNFU19TVU1NQVJZOiBcIlx1NUU3M1x1NTc0N1x1NjM4Q1x1NjNFMVx1N0EwQlx1NUVBNjogJHthdmdFYXNlfVwiLFxuICAgIENBUkRfVFlQRVM6IFwiXHU1MzYxXHU3MjQ3XHU3QzdCXHU1NzhCXCIsXG4gICAgQ0FSRF9UWVBFU19ERVNDOiBcIlx1NTk4Mlx1NjcwOVx1RkYwQ1x1NUMwNlx1NjYzRVx1NzkzQVx1OTY5MFx1ODVDRlx1NzY4NFx1NTM2MVx1NzI0N1wiLFxuICAgIENBUkRfVFlQRV9ORVc6IFwiXHU2NUIwXCIsXG4gICAgQ0FSRF9UWVBFX1lPVU5HOiBcIlx1OEY4M1x1NjVCMFwiLFxuICAgIENBUkRfVFlQRV9NQVRVUkU6IFwiXHU3MTlGXHU2MDg5XCIsXG4gICAgQ0FSRF9UWVBFU19TVU1NQVJZOiBcIlx1NjAzQlx1NTM2MVx1NzI0N1x1NjU3MDogJHt0b3RhbENhcmRzQ291bnR9XCIsXG59O1xuIiwgIi8vIFx1N0U0MVx1OUFENFx1NEUyRFx1NjU4N1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgLy8gZmxhc2hjYXJkLW1vZGFsLnRzeFxuICAgIERFQ0tTOiBcIlx1NzI0Q1x1N0Q0NFwiLFxuICAgIERVRV9DQVJEUzogXCJcdTUyMzBcdTY3MUZcdTUzNjFcdTcyNDdcIixcbiAgICBORVdfQ0FSRFM6IFwiXHU2NUIwXHU1MzYxXHU3MjQ3XCIsXG4gICAgVE9UQUxfQ0FSRFM6IFwiXHU1MTY4XHU5MEU4XHU1MzYxXHU3MjQ3XCIsXG4gICAgQkFDSzogXCJcdThGRDRcdTU2REVcIixcbiAgICBTS0lQOiBcIlx1NzU2NVx1OTA0RVwiLFxuICAgIEVESVRfQ0FSRDogXCJcdTdERThcdThGMkZcdTUzNjFcdTcyNDdcIixcbiAgICBSRVNFVF9DQVJEX1BST0dSRVNTOiBcIlx1OTFDRFx1N0Y2RVx1NTM2MVx1NzI0N1wiLFxuICAgIEhBUkQ6IFwiXHU4RjAzXHU5NkUzXCIsXG4gICAgR09PRDogXCJcdThBMThcdTVGOTdcIixcbiAgICBFQVNZOiBcIlx1N0MyMVx1NTVBRVwiLFxuICAgIFNIT1dfQU5TV0VSOiBcIlx1OTg2Rlx1NzkzQVx1N0I1NFx1Njg0OFwiLFxuICAgIENBUkRfUFJPR1JFU1NfUkVTRVQ6IFwiXHU1MzYxXHU3MjQ3XHU1REYyXHU4OEFCXHU5MUNEXHU3RjZFXHUzMDAyXCIsXG4gICAgU0FWRTogXCJcdTUxMzJcdTVCNThcIixcbiAgICBDQU5DRUw6IFwiXHU1M0Q2XHU2RDg4XCIsXG4gICAgTk9fSU5QVVQ6IFwiXHU2QzkyXHU2NzA5XHU2M0QwXHU0RjlCXHU4RjM4XHU1MTY1XHUzMDAyXCIsXG4gICAgQ1VSUkVOVF9FQVNFX0hFTFBfVEVYVDogXCJcdTc2RUVcdTUyNERcdTYzOENcdTYzRTFcdTdBMEJcdTVFQTZcdUZGMUFcIixcbiAgICBDVVJSRU5UX0lOVEVSVkFMX0hFTFBfVEVYVDogXCJcdTc2RUVcdTUyNERcdTk1OTNcdTk2OTRcdTY2NDJcdTk1OTNcdUZGMUFcIixcbiAgICBDQVJEX0dFTkVSQVRFRF9GUk9NOiBcIlx1NzUxRlx1NjIxMFx1ODFFQVx1RkYxQSR7bm90ZVBhdGh9XCIsXG5cbiAgICAvLyBtYWluLnRzXG4gICAgT1BFTl9OT1RFX0ZPUl9SRVZJRVc6IFwiXHU2MjUzXHU5NThCXHU0RTAwXHU1MDBCXHU3QjQ2XHU4QTE4XHU5NThCXHU1OUNCXHU1RkE5XHU3RkQyXCIsXG4gICAgUkVWSUVXX0NBUkRTOiBcIlx1NUZBOVx1N0ZEMlx1NTM2MVx1NzI0N1wiLFxuICAgIFJFVklFV19FQVNZX0ZJTEVfTUVOVTogXCJcdTVGQTlcdTdGRDJcdUZGMUFcdTdDMjFcdTU1QUVcIixcbiAgICBSRVZJRVdfR09PRF9GSUxFX01FTlU6IFwiXHU1RkE5XHU3RkQyXHVGRjFBXHU4QTE4XHU1Rjk3XCIsXG4gICAgUkVWSUVXX0hBUkRfRklMRV9NRU5VOiBcIlx1NUZBOVx1N0ZEMlx1RkYxQVx1OEYwM1x1OTZFM1wiLFxuICAgIFJFVklFV19OT1RFX0VBU1lfQ01EOiBcIlx1NkExOVx1OEExOFx1NzBCQVx1MzAwQ1x1N0MyMVx1NTVBRVx1MzAwRFwiLFxuICAgIFJFVklFV19OT1RFX0dPT0RfQ01EOiBcIlx1NkExOVx1OEExOFx1NzBCQVx1MzAwQ1x1OEExOFx1NUY5N1x1MzAwRFwiLFxuICAgIFJFVklFV19OT1RFX0hBUkRfQ01EOiBcIlx1NkExOVx1OEExOFx1NzBCQVx1MzAwQ1x1OEYwM1x1OTZFM1x1MzAwRFwiLFxuICAgIFJFVklFV19DQVJEU19JTl9OT1RFOiBcIlx1NUZBOVx1N0ZEMlx1NkI2NFx1N0I0Nlx1OEExOFx1NEUyRFx1NzY4NFx1NTM2MVx1NzI0N1wiLFxuICAgIENSQU1fQUxMX0NBUkRTOiBcIlx1OTA3OFx1NjRDN1x1ODk4MVx1NEUwRFx1OEEwOFx1OTZFM1x1NjYxM1x1NUVBNlx1NUZBOVx1N0ZEMlx1NzY4NFx1NzI0Q1x1N0Q0NFwiLFxuICAgIFJFVklFV19BTExfQ0FSRFM6IFwiXHU1RkE5XHU3RkQyXHU2MjQwXHU2NzA5XHU3QjQ2XHU4QTE4XHU0RTJEXHU3Njg0XHU1MzYxXHU3MjQ3XCIsXG4gICAgQ1JBTV9DQVJEU19JTl9OT1RFOiBcIlx1NEUwRFx1OEEwOFx1OTZFM1x1NjYxM1x1NUVBNlx1NUZBOVx1N0ZEMlx1NkI2NFx1N0I0Nlx1OEExOFx1NEUyRFx1NzY4NFx1NTM2MVx1NzI0N1wiLFxuICAgIFZJRVdfU1RBVFM6IFwiXHU2QUEyXHU4OTk2XHU2NTc4XHU2NERBXCIsXG4gICAgU1RBVFVTX0JBUjogXCJcdTVGQTlcdTdGRDI6ICR7ZHVlTm90ZXNDb3VudH0gXHU3QjQ2XHU4QTE4LCAke2R1ZUZsYXNoY2FyZHNDb3VudH0gXHU1MzYxXHU3MjQ3XHU1REYyXHU1MjMwXHU2NzFGXCIsXG4gICAgU1lOQ19USU1FX1RBS0VOOiBcIlx1NTQwQ1x1NkI2NVx1NjY0Mlx1OTU5MyAke3R9bXNcIixcbiAgICBOT1RFX0lOX0lHTk9SRURfRk9MREVSOiBcIlx1N0I0Nlx1OEExOFx1NTEzMlx1NUI1OFx1NTcyOFx1NURGMlx1ODhBQlx1NUZGRFx1NzU2NVx1NzY4NFx1OERFRlx1NUY5MVx1NEUyRFx1RkYwOFx1NkFBMlx1NjdFNVx1OEEyRFx1NUI5QVx1OTA3OFx1OTgwNVx1RkYwOVx1MzAwMlwiLFxuICAgIFBMRUFTRV9UQUdfTk9URTogXCJcdThBQ0JcdTVDMDdcdTk3MDBcdTg5ODFcdTVGQTlcdTdGRDJcdTc2ODRcdTdCNDZcdThBMThcdTRFMkRcdTUyQTBcdTUxNjVcdTZCNjNcdTc4QkFcdTc2ODRcdTZBMTlcdTdDNjRcdUZGMDhcdTZBQTJcdTY3RTVcdThBMkRcdTVCOUFcdTkwNzhcdTk4MDVcdUZGMDlcdTMwMDJcIixcbiAgICBSRVNQT05TRV9SRUNFSVZFRDogXCJcdTU2REVcdTk5NEJcdTVERjJcdTY1MzZcdTUyMzBcIixcbiAgICBOT19ERUNLX0VYSVNUUzogXCJcdTZDOTJcdTY3MDkgJHtkZWNrTmFtZX0gXHU3MjRDXHU3RDQ0XCIsXG4gICAgQUxMX0NBVUdIVF9VUDogXCJcdTkwRkRcdTVGQTlcdTdGRDJcdTVCOENcdTU1NjZcdUZGMENcdTRGNjBcdTc3MUZcdTY4RDJcdUZGMDFcIixcblxuICAgIC8vIHNjaGVkdWxpbmcudHNcbiAgICBEQVlTX1NUUl9JVkw6IFwiJHtpbnRlcnZhbH1cdTU5MjlcIixcbiAgICBNT05USFNfU1RSX0lWTDogXCIke2ludGVydmFsfVx1NjcwOFwiLFxuICAgIFlFQVJTX1NUUl9JVkw6IFwiJHtpbnRlcnZhbH1cdTVFNzRcIixcbiAgICBEQVlTX1NUUl9JVkxfTU9CSUxFOiBcIiR7aW50ZXJ2YWx9XHU1OTI5XCIsXG4gICAgTU9OVEhTX1NUUl9JVkxfTU9CSUxFOiBcIiR7aW50ZXJ2YWx9XHU2NzA4XCIsXG4gICAgWUVBUlNfU1RSX0lWTF9NT0JJTEU6IFwiJHtpbnRlcnZhbH1cdTVFNzRcIixcblxuICAgIC8vIHNldHRpbmdzLnRzXG4gICAgU0VUVElOR1NfSEVBREVSOiBcIlx1OTU5M1x1OTY5NFx1OTFDRFx1ODkwN1x1NTkxNlx1NjM5QiAtIFx1OEEyRFx1NUI5QVwiLFxuICAgIENIRUNLX1dJS0k6ICdcdTc3QURcdTg5RTNcdTY2RjRcdTU5MUEsIFx1OEFDQlx1OUVERVx1OTA3ODxhIGhyZWY9XCIke3dpa2lfdXJsfVwiPndpa2k8L2E+LicsXG4gICAgRk9MREVSU19UT19JR05PUkU6IFwiXHU1RkZEXHU3NTY1XHU2QjY0XHU4Q0M3XHU2NTk5XHU1OTNFXCIsXG4gICAgRk9MREVSU19UT19JR05PUkVfREVTQzogXCJcdThGMzhcdTUxNjVcdThDQzdcdTY1OTlcdTU5M0VcdThERUZcdTVGOTFcdUZGMDhcdTc1MjhcdTYzREJcdTg4NENcdTVCNTdcdTUxNDNcdTUyMDZcdTk2OTRcdUZGMDlcdUZGMENcdTRGOEJcdTU5ODJcdUZGMUFUZW1wbGF0ZXMgTWV0YS9TY3JpcHRzXCIsXG4gICAgRkxBU0hDQVJEUzogXCJcdTUzNjFcdTcyNDdcIixcbiAgICBGTEFTSENBUkRfRUFTWV9MQUJFTDogXCJcdTdDMjFcdTU1QUVcdTYzMDlcdTkyMTVcdTY1ODdcdTVCNTdcIixcbiAgICBGTEFTSENBUkRfR09PRF9MQUJFTDogXCJcdThBMThcdTVGOTdcdTYzMDlcdTkyMTVcdTY1ODdcdTVCNTdcIixcbiAgICBGTEFTSENBUkRfSEFSRF9MQUJFTDogXCJcdThGMDNcdTk2RTNcdTYzMDlcdTkyMTVcdTY1ODdcdTVCNTdcIixcbiAgICBGTEFTSENBUkRfRUFTWV9ERVNDOiBcIlx1ODFFQVx1OEEwMlx1MzAwQ1x1N0MyMVx1NTVBRVx1MzAwRFx1NjMwOVx1OTIxNVx1NzY4NFx1NkExOVx1N0M2NFwiLFxuICAgIEZMQVNIQ0FSRF9HT09EX0RFU0M6IFwiXHU4MUVBXHU4QTAyXHUzMDBDXHU4QTE4XHU1Rjk3XHUzMDBEXHU2MzA5XHU5MjE1XHU3Njg0XHU2QTE5XHU3QzY0XCIsXG4gICAgRkxBU0hDQVJEX0hBUkRfREVTQzogXCJcdTgxRUFcdThBMDJcdTMwMENcdThGMDNcdTk2RTNcdTMwMERcdTYzMDlcdTkyMTVcdTc2ODRcdTZBMTlcdTdDNjRcIixcbiAgICBGTEFTSENBUkRfVEFHUzogXCJcdTUzNjFcdTcyNDdcdTZBMTlcdTdDNjRcIixcbiAgICBGTEFTSENBUkRfVEFHU19ERVNDOiBcIlx1OEYzOFx1NTE2NVx1NkExOVx1N0M2NFx1RkYwOFx1NzUyOFx1N0E3QVx1NzY3RFx1NjIxNlx1NjNEQlx1ODg0Q1x1NUI1N1x1NTE0M1x1NTIwNlx1OTY5NFx1RkYwOVx1RkYwQ1x1NEY4Qlx1NTk4Mlx1RkYxQSNmbGFzaGNhcmRzICNkZWNrMiAjZGVjazMuXCIsXG4gICAgQ09OVkVSVF9GT0xERVJTX1RPX0RFQ0tTOiBcIlx1NjYyRlx1NTQyNlx1NUMwN1x1OENDN1x1NjU5OVx1NTkzRVx1NTE2N1x1NUJCOVx1OEY0OVx1NjNEQlx1NzBCQVx1NzI0Q1x1N0Q0NFx1NTQ4Q1x1NUI1MFx1NzI0Q1x1N0Q0NFx1RkYxRlwiLFxuICAgIENPTlZFUlRfRk9MREVSU19UT19ERUNLU19ERVNDOiBcIlx1NkI2NFx1OTA3OFx1OTgwNVx1NzBCQVx1NTM2MVx1NzI0N1x1NkExOVx1N0M2NFx1OTA3OFx1OTgwNVx1NzY4NFx1NjZGRlx1NEVFM1x1OTA3OFx1OTgwNVx1MzAwMlwiLFxuICAgIElOTElORV9TQ0hFRFVMSU5HX0NPTU1FTlRTOiBcIlx1NjYyRlx1NTQyNlx1NUMwN1x1OEEwOFx1NTI4M1x1OTFDRFx1ODkwN1x1NjY0Mlx1OTU5M1x1NTEzMlx1NUI1OFx1NTcyOFx1NTM2MVx1NzI0N1x1NjcwMFx1NUY4Q1x1NEUwMFx1ODg0Q1x1NzY4NFx1NTQwQ1x1NEUwMFx1ODg0Q1x1RkYxRlwiLFxuICAgIElOTElORV9TQ0hFRFVMSU5HX0NPTU1FTlRTX0RFU0M6IFwiXHU1MkZFXHU5MDc4XHU1RjhDSFRNTFx1OEEzQlx1ODlFM1x1NEUwRFx1NjcwM1x1NzgzNFx1NThERVx1NTIxN1x1ODg2OFx1NjgzQ1x1NUYwRlx1NTU0Rlx1OTg0Q1x1MzAwMlwiLFxuICAgIEJVUllfU0lCTElOR1NfVElMTF9ORVhUX0RBWTogXCJcdTVDMDdcdTUzQ0RcdThGNDlcdTUzNjFcdTcyNDdcdTk2QjFcdTg1Q0ZcdTgxRjNcdTRFMEJcdTRFMDBcdTU5MjlcdUZGMUZcIixcbiAgICBCVVJZX1NJQkxJTkdTX1RJTExfTkVYVF9EQVlfREVTQzogXCJcdTUzQ0RcdThGNDlcdTUzNjFcdTcyNDdcdTc1MzFcdTU0MENcdTRFMDBcdTUzNjFcdTcyNDdcdTY1ODdcdTVCNTdcdTc1MjJcdTc1MUZcdUZGMENcdTRGOEJcdTU5ODJcdUZGMUFcdTU4NkJcdTdBN0FcdTUxNEJcdTZGMEZcdTVCNTdcIixcbiAgICBTSE9XX0NBUkRfQ09OVEVYVDogXCJcdTU3MjhcdTUzNjFcdTcyNDdcdTRFMkRcdTk4NkZcdTc5M0FcdTRFMEFcdTRFMEJcdTY1ODdcdUZGMUZcIixcbiAgICBTSE9XX0NBUkRfQ09OVEVYVF9ERVNDOiBcIlx1NEY4Qlx1NTk4Mlx1RkYxQVx1NkExOVx1OTg0QyA+IFx1NTI2Rlx1NkExOVx1OTg0QyA+IFx1NUMwRlx1NkExOVx1OTg0QyA+IC4uLiA+IFx1NUMwRlx1NkExOVx1OTg0Q1wiLFxuICAgIENBUkRfTU9EQUxfSEVJR0hUX1BFUkNFTlQ6IFwiXHU1MzYxXHU3MjQ3XHU5QUQ4XHU1RUE2XHU3NjdFXHU1MjA2XHU2QkQ0XCIsXG4gICAgQ0FSRF9NT0RBTF9TSVpFX1BFUkNFTlRfREVTQzogXCJcdTU3MjhcdTc5RkJcdTUyRDVcdTdBRUZcdTYyMTZcdTk3MDBcdTg5ODFcdThGMDNcdTU5MjdcdTU3MTZcdTcyNDdcdTY2NDJcdTYxQzlcdThBMkRcdTVCOUFcdTcwQkExMDAlXCIsXG4gICAgUkVTRVRfREVGQVVMVDogXCJcdTkxQ0RcdTdGNkVcdTcwQkFcdTk4MTBcdThBMkRcdTUwM0NcIixcbiAgICBDQVJEX01PREFMX1dJRFRIX1BFUkNFTlQ6IFwiXHU1MzYxXHU3MjQ3XHU1QkVDXHU1RUE2XHU3NjdFXHU1MjA2XHU2QkQ0XCIsXG4gICAgUkFORE9NSVpFX0NBUkRfT1JERVI6IFwiXHU1RkE5XHU3RkQyXHU2NjQyXHU5NkE4XHU2QTVGXHU5ODZGXHU3OTNBXHU1MzYxXHU3MjQ3XHVGRjFGXCIsXG4gICAgRElTQUJMRV9DTE9aRV9DQVJEUzogXCJcdTUwNUNcdTc1MjhcdTU4NkJcdTdBN0FcdTUxNEJcdTZGMEZcdTVCNTdcdTUzNjFcdTcyNDdcdUZGMUZcIixcbiAgICBDT05WRVJUX0hJR0hMSUdIVFNfVE9fQ0xPWkVTOiBcIlx1NUMwNyA9PVx1OUFEOFx1NEVBRT09IFx1OEY0OVx1NjNEQlx1NzBCQVx1NTg2Qlx1N0E3QVx1NTE0Qlx1NkYwRlx1NUI1N1x1RkYxRlwiLFxuICAgIENPTlZFUlRfQk9MRF9URVhUX1RPX0NMT1pFUzogXCJcdTVDMDcgKipcdTdDOTdcdTlBRDQqKiBcdThGNDlcdTYzREJcdTcwQkFcdTU4NkJcdTdBN0FcdTUxNEJcdTZGMEZcdTVCNTdcdUZGMUZcIixcbiAgICBDT05WRVJUX0NVUkxZX0JSQUNLRVRTX1RPX0NMT1pFUzogXCJcdTVDMDcge3tcdTU5MjdcdTYyRUNcdTg2NUZ9fSBcdThGNDlcdTYzREJcdTcwQkFcdTU4NkJcdTdBN0FcdTUxNEJcdTZGMEZcdTVCNTdcdUZGMUZcIixcbiAgICBJTkxJTkVfQ0FSRFNfU0VQQVJBVE9SOiBcIlx1NTVBRVx1ODg0Q1x1NTM2MVx1NzI0N1x1NzY4NFx1NTIwNlx1OTY5NFx1NUI1N1x1NTE0M1wiLFxuICAgIEZJWF9TRVBBUkFUT1JTX01BTlVBTExZX1dBUk5JTkc6IFwiXHU2Q0U4XHU2MTBGXHVGRjFBXHU2NkY0XHU2NTM5XHU2QjY0XHU5MDc4XHU5ODA1XHU1RjhDXHU0RjYwXHU1QzA3XHU5NzAwXHU4OTgxXHU4MUVBXHU4ODRDXHU2NkY0XHU2NTM5XHU1REYyXHU1QjU4XHU1NzI4XHU1MzYxXHU3MjQ3XHU3Njg0XHU1MjA2XHU5Njk0XHU1QjU3XHU1MTQzXHUzMDAyXCIsXG4gICAgSU5MSU5FX1JFVkVSU0VEX0NBUkRTX1NFUEFSQVRPUjogXCJcdTU1QUVcdTg4NENcdTUzQ0RcdThGNDlcdTUzNjFcdTcyNDdcdTc2ODRcdTUyMDZcdTk2OTRcdTVCNTdcdTUxNDNcIixcbiAgICBNVUxUSUxJTkVfQ0FSRFNfU0VQQVJBVE9SOiBcIlx1NTkxQVx1ODg0Q1x1NTM2MVx1NzI0N1x1NzY4NFx1NTIwNlx1OTY5NFx1NUI1N1x1NTE0M1wiLFxuICAgIE1VTFRJTElORV9SRVZFUlNFRF9DQVJEU19TRVBBUkFUT1I6IFwiXHU1OTFBXHU4ODRDXHU3RkZCXHU4RjQ5XHU1MzYxXHU3MjQ3XHU3Njg0XHU1MjA2XHU5Njk0XHU1QjU3XHU1MTQzXCIsXG4gICAgTk9URVM6IFwiXHU3QjQ2XHU4QTE4XCIsXG4gICAgUkVWSUVXX1BBTkVfT05fU1RBUlRVUDogXCJcdTU1NUZcdTUyRDVcdTY2NDJcdTk1OEJcdTU1NUZcdTdCNDZcdThBMThcdTVGQTlcdTdGRDJcdTdBOTdcdTY4M0NcIixcbiAgICBUQUdTX1RPX1JFVklFVzogXCJcdTVGQTlcdTdGRDJcdTZBMTlcdTdDNjRcIixcbiAgICBUQUdTX1RPX1JFVklFV19ERVNDOiBcIlx1OEYzOFx1NTE2NVx1NkExOVx1N0M2NFx1RkYwQ1x1NzUyOFx1N0E3QVx1NjgzQ1x1NjIxNlx1NjNEQlx1ODg0Q1x1NUI1N1x1NTE0M1x1NTIwNlx1OTY5NFx1RkYwQ1x1NEY4Qlx1NTk4Mlx1RkYxQSNyZXZpZXcgI3RhZzIgI3RhZzMuXCIsXG4gICAgT1BFTl9SQU5ET01fTk9URTogXCJcdTVGQTlcdTdGRDJcdTk2QThcdTZBNUZcdTdCNDZcdThBMThcIixcbiAgICBPUEVOX1JBTkRPTV9OT1RFX0RFU0M6IFwiXHU5NURDXHU5NTg5XHU2QjY0XHU5MDc4XHU5ODA1XHVGRjBDXHU3QjQ2XHU4QTE4XHU1QzA3XHU0RUU1XHU5MUNEXHU4OTgxXHU1RUE2KFBhZ2VSYW5rKVx1NjM5Mlx1NUU4Rlx1MzAwMlwiLFxuICAgIEFVVE9fTkVYVF9OT1RFOiBcIlx1NUZBOVx1N0ZEMlx1NUY4Q1x1ODFFQVx1NTJENVx1NjI1M1x1OTU4Qlx1NEUwQlx1NEUwMFx1NTAwQlx1N0I0Nlx1OEExOFwiLFxuICAgIERJU0FCTEVfRklMRV9NRU5VX1JFVklFV19PUFRJT05TOiBcIlx1OTVEQ1x1OTU4OVx1NkE5NFx1Njg0OFx1OTA3OFx1NTVBRVx1NEUyRFx1NzY4NFx1NUZBOVx1N0ZEMlx1OTA3OFx1OTgwNSBcdTRGOEJcdTU5ODJcdUZGMUFcdTVGQTlcdTdGRDJcdUZGMUFcdTdDMjFcdTU1QUUgXHU4QTE4XHU1Rjk3IFx1OEYwM1x1OTZFM1wiLFxuICAgIERJU0FCTEVfRklMRV9NRU5VX1JFVklFV19PUFRJT05TX0RFU0M6IFwiXHU5NURDXHU5NTg5XHU2QTk0XHU2ODQ4XHU5MDc4XHU1NUFFXHU3Njg0XHU1RkE5XHU3RkQyXHU5MDc4XHU5ODA1XHVGRjBDXHU0RjhCXHU1OTgyXHVGRjFBXHU1RkE5XHU3RkQyOiBcdTdDMjFcdTU1QUUgXHU4QTE4XHU1Rjk3IFx1OEYwM1x1OTZFM1x1MzAwMlwiLFxuICAgIE1BWF9OX0RBWVNfUkVWSUVXX1FVRVVFOiBcIlx1NTNGM1x1OTA4QVx1OTc2Mlx1Njc3Rlx1OTg2Rlx1NzkzQVx1NzY4NFx1NjcwMFx1NTkyN1x1NTkyOVx1NjU3OFwiLFxuICAgIE1JTl9PTkVfREFZOiBcIlx1NTkyOVx1NjU3OFx1NjcwMFx1NUMwRlx1NTAzQ1x1NzBCQTFcIixcbiAgICBWQUxJRF9OVU1CRVJfV0FSTklORzogXCJcdThBQ0JcdThGMzhcdTUxNjVcdTY3MDlcdTY1NDhcdTc2ODRcdTY1NzhcdTVCNTdcdTMwMDJcIixcbiAgICBVSV9QUkVGRVJFTkNFUzogXCJcdTc1MjhcdTYyMzZcdTRFQ0JcdTk3NjJcdTk5OTZcdTkwNzhcdTk4MDVcIixcbiAgICBJTklUSUFMTFlfRVhQQU5EX1NVQkRFQ0tTX0lOX1RSRUU6IFwiXHU3MjRDXHU3RDQ0XHU2QTM5XHU2NzAwXHU1MjFEXHU2MUM5XHU5ODZGXHU3OTNBXHU3MEJBXHU1QzU1XHU5NThCXCIsXG4gICAgSU5JVElBTExZX0VYUEFORF9TVUJERUNLU19JTl9UUkVFX0RFU0M6XG4gICAgICAgIFwiXHU5NURDXHU5NTg5XHU2QjY0XHU5MDc4XHU5ODA1XHU1M0VGXHU2NDdBXHU3NThBXHU1NDBDXHU0RTAwXHU1RjM1XHU1MzYxXHU3MjQ3XHU0RTJEXHU3Njg0XHU1REUyXHU3MkMwXHU3MjRDXHU3RDQ0XHUzMDAyXHU1OTgyXHU2NzlDXHU2MEE4XHU3Njg0XHU1MzYxXHU3MjQ3XHU1QzZDXHU2NUJDXHU1NDBDXHU0RTAwXHU2QTk0XHU2ODQ4XHU0RTJEXHU3Njg0XHU4QTMxXHU1OTFBXHU1OTU3XHU3MjRDXHVGRjBDXHU1MjQ3XHU1Rjg4XHU2NzA5XHU3NTI4XHUzMDAyXCIsXG4gICAgQUxHT1JJVEhNOiBcIlx1NkYxNFx1N0I5N1x1NkNENVwiLFxuICAgIENIRUNLX0FMR09SSVRITV9XSUtJOiAnXHU3N0FEXHU4OUUzXHU2NkY0XHU1OTFBLCBcdThBQ0JcdTlFREVcdTkwNzg8YSBocmVmPVwiJHthbGdvX3VybH1cIj5cdTdCOTdcdTZDRDVcdTVCRTZcdTczRkU8L2E+LicsXG4gICAgQkFTRV9FQVNFOiBcIlx1NTdGQVx1NzkwRVx1NjM4Q1x1NjNFMVx1N0EwQlx1NUVBNlwiLFxuICAgIEJBU0VfRUFTRV9ERVNDOiBcIlx1NjcwMFx1NUMwRlx1NTAzQzEzMFx1RkYwQ1x1NjNBOFx1ODVBNlx1NTAzQ1x1N0QwNDI1MC5cIixcbiAgICBCQVNFX0VBU0VfTUlOX1dBUk5JTkc6IFwiXHU1N0ZBXHU3OTBFXHU2MzhDXHU2M0UxXHU3QTBCXHU1RUE2XHU3Njg0XHU2NzAwXHU1QzBGXHU1MDNDXHU3MEJBMTMwXHUzMDAyXCIsXG4gICAgTEFQU0VfSU5URVJWQUxfQ0hBTkdFOiBcIlx1NUMwN1x1NUZBOVx1N0ZEMlx1NjY0Mlx1NkExOVx1OEEzQlx1NzBCQVx1MzAwQ1x1OEYwM1x1OTZFM1x1MzAwRFx1NzY4NFx1NTM2MVx1NzI0N1x1NjIxNlx1N0I0Nlx1OEExOFx1NUZBOVx1N0ZEMlx1OTU5M1x1OTY5NFx1N0UyRVx1NzdFRFwiLFxuICAgIExBUFNFX0lOVEVSVkFMX0NIQU5HRV9ERVNDOiBcIlx1NjVCMFx1NUZBOVx1N0ZEMlx1OTU5M1x1OTY5NCA9IFx1NTM5Rlx1NUZBOVx1N0ZEMlx1OTU5M1x1OTY5NCAqIFx1OTU5M1x1OTY5NFx1NjUzOVx1OEI4QVx1NEZDMlx1NjU3OCAvIDEwMC5cIixcbiAgICBFQVNZX0JPTlVTOiBcIlx1N0MyMVx1NTVBRVx1NzM0RVx1NTJGNVwiLFxuICAgIEVBU1lfQk9OVVNfREVTQzogXCJcdTdDMjFcdTU1QUVcdTczNEVcdTUyRjVcdThBMkRcdTVCOUFcdTMwMENcdThBMThcdTVGOTdcdTMwMERcdTU0OENcdTMwMENcdTdDMjFcdTU1QUVcdTMwMERcdTUzNjFcdTcyNDdcdTYyMTZcdTdCNDZcdThBMThcdTc2ODRcdTVGQTlcdTdGRDJcdTk1OTNcdTk2OTRcdTVERUVcdThERERcdUZGMDhcdTY3MDBcdTVDMEZcdTUwM0MxMDAlXHVGRjA5XHUzMDAyXCIsXG4gICAgRUFTWV9CT05VU19NSU5fV0FSTklORzogXCJcdTdDMjFcdTU1QUVcdTczNEVcdTUyRjVcdTgxRjNcdTVDMTFcdTcwQkExMDBcdTMwMDJcIixcbiAgICBNQVhfSU5URVJWQUw6IFwiXHU2NzAwXHU1OTI3XHU5NTkzXHU5Njk0XHVGRjA4XHU1OTI5XHVGRjA5XCIsXG4gICAgTUFYX0lOVEVSVkFMX0RFU0M6IFwiXHU4QTJEXHU1QjlBXHU1RkE5XHU3RkQyXHU3Njg0XHU2NzAwXHU1OTI3XHU5NTkzXHU5Njk0XHU2NjQyXHU5NTkzXHVGRjA4XHU5ODEwXHU4QTJEXHU1MDNDMTAwXHU1RTc0XHVGRjA5XHUzMDAyXCIsXG4gICAgTUFYX0lOVEVSVkFMX01JTl9XQVJOSU5HOiBcIlx1NjcwMFx1NTkyN1x1OTU5M1x1OTY5NFx1ODFGM1x1NUMxMVx1NzBCQTFcdTU5MjlcIixcbiAgICBNQVhfTElOS19DT05UUklCOiBcIlx1NjcwMFx1NTkyN1x1OTNDOFx1NjNBNVx1OENBMlx1NzM3QlwiLFxuICAgIE1BWF9MSU5LX0NPTlRSSUJfREVTQzogXCJcdTkzQzhcdTYzQTVcdTdCNDZcdThBMThcdTc2ODRcdTUyQTBcdTZCMEFcdTYzOENcdTYzRTFcdTdBMEJcdTVFQTZcdTVDMERcdTUzOUZcdTU5Q0JcdTYzOENcdTYzRTFcdTdBMEJcdTVFQTZcdTc2ODRcdTY3MDBcdTU5MjdcdThDQTJcdTczN0JcdTMwMDJcIixcbiAgICBMT0dHSU5HOiBcIlx1OEExOFx1OTMwNFx1NEUyRFwiLFxuICAgIERJU1BMQVlfREVCVUdfSU5GTzogXCJcdTU3MjhcdTk1OEJcdTc2N0NcdTgwMDVcdTYzQTdcdTUyMzZcdTUzRjBcdTRFMkRcdTk4NkZcdTc5M0FcdTk2NjRcdTkzMkZcdThDQzdcdThBMEFcdUZGMUZcIixcblxuICAgIC8vIHNpZGViYXIudHNcbiAgICBOT1RFU19SRVZJRVdfUVVFVUU6IFwiXHU3QjQ2XHU4QTE4XHU1RkE5XHU3RkQyXHU1RThGXHU1MjE3XCIsXG4gICAgQ0xPU0U6IFwiXHU4MUU4XHU4RkQxXCIsXG4gICAgTkVXOiBcIlx1NjVCMFwiLFxuICAgIFlFU1RFUkRBWTogXCJcdTY2MjhcdTU5MjlcIixcbiAgICBUT0RBWTogXCJcdTRFQ0FcdTU5MjlcIixcbiAgICBUT01PUlJPVzogXCJcdTY2MEVcdTU5MjlcIixcblxuICAgIC8vIHN0YXRzLW1vZGFsLnRzeFxuICAgIFNUQVRTX1RJVExFOiBcIlx1N0Q3MVx1OEEwOFwiLFxuICAgIE1PTlRIOiBcIlx1NjcwOFwiLFxuICAgIFFVQVJURVI6IFwiXHU1QjYzXCIsXG4gICAgWUVBUjogXCJcdTVFNzRcIixcbiAgICBMSUZFVElNRTogXCJcdTUxNjhcdTkwRThcIixcbiAgICBGT1JFQ0FTVDogXCJcdTk4MTBcdTZFMkNcIixcbiAgICBGT1JFQ0FTVF9ERVNDOiBcIlx1NUMwN1x1ODk4MVx1NTIzMFx1NjcxRlx1NzY4NFx1NTM2MVx1NzI0N1x1NjU3OFx1OTFDRlwiLFxuICAgIFNDSEVEVUxFRDogXCJcdTVERjJcdTYzOTJcdTdBMEJcIixcbiAgICBEQVlTOiBcIlx1NTkyOVwiLFxuICAgIE5VTUJFUl9PRl9DQVJEUzogXCJcdTUzNjFcdTcyNDdcdTY1NzhcdTkxQ0ZcIixcbiAgICBSRVZJRVdTX1BFUl9EQVk6IFwiXHU1RTczXHU1NzQ3OiBcdTVGQTlcdTdGRDIke2F2Z30gL1x1NTkyOVwiLFxuICAgIElOVEVSVkFMUzogXCJcdTk1OTNcdTk2OTRcIixcbiAgICBJTlRFUlZBTFNfREVTQzogXCJcdTUyMzBcdTRFMEJcdTRFMDBcdTZCMjFcdTVGQTlcdTdGRDJcdTc2ODRcdTY2NDJcdTk1OTNcdTk1OTNcdTk2OTRcIixcbiAgICBDT1VOVDogXCJcdThBMDhcdTY1NzhcIixcbiAgICBJTlRFUlZBTFNfU1VNTUFSWTogXCJcdTVFNzNcdTU3NDdcdTk1OTNcdTk2OTRcdTY2NDJcdTk1OTM6ICR7YXZnfSwgXHU2NzAwXHU5NTc3XHU5NTkzXHU5Njk0XHU2NjQyXHU5NTkzOiAke2xvbmdlc3R9XCIsXG4gICAgRUFTRVM6IFwiXHU2MzhDXHU2M0UxXHU3QTBCXHU1RUE2XCIsXG4gICAgRUFTRVNfU1VNTUFSWTogXCJcdTVFNzNcdTU3NDdcdTYzOENcdTYzRTFcdTdBMEJcdTVFQTY6ICR7YXZnRWFzZX1cIixcbiAgICBDQVJEX1RZUEVTOiBcIlx1NTM2MVx1NzI0N1x1NTc4Qlx1NTIyNVwiLFxuICAgIENBUkRfVFlQRVNfREVTQzogXCJcdTU5ODJcdTY3MDlcdUZGMENcdTVDMDdcdTk4NkZcdTc5M0FcdTk2QjFcdTg1Q0ZcdTc2ODRcdTUzNjFcdTcyNDdcIixcbiAgICBDQVJEX1RZUEVfTkVXOiBcIlx1NjVCMFwiLFxuICAgIENBUkRfVFlQRV9ZT1VORzogXCJcdThGMDNcdTY1QjBcIixcbiAgICBDQVJEX1RZUEVfTUFUVVJFOiBcIlx1NzE5Rlx1NjA4OVwiLFxuICAgIENBUkRfVFlQRVNfU1VNTUFSWTogXCJcdTdFM0RcdTUzNjFcdTcyNDdcdTY1Nzg6ICR7dG90YWxDYXJkc0NvdW50fVwiLFxufTtcbiIsICJpbXBvcnQge1xuICAgIEJ1dHRvbkNvbXBvbmVudCxcbiAgICBNb2RhbCxcbiAgICBBcHAsXG4gICAgTWFya2Rvd25SZW5kZXJlcixcbiAgICBOb3RpY2UsXG4gICAgUGxhdGZvcm0sXG4gICAgVEZpbGUsXG4gICAgVGV4dEFyZWFDb21wb25lbnQsXG4gICAgc2V0SWNvbixcbn0gZnJvbSBcIm9ic2lkaWFuXCI7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG5pbXBvcnQgaCBmcm9tIFwidmh0bWxcIjtcblxuaW1wb3J0IHR5cGUgU1JQbHVnaW4gZnJvbSBcInNyYy9tYWluXCI7XG5pbXBvcnQgeyBDYXJkLCBDYXJkVHlwZSwgc2NoZWR1bGUsIHRleHRJbnRlcnZhbCwgUmV2aWV3UmVzcG9uc2UgfSBmcm9tIFwic3JjL3NjaGVkdWxpbmdcIjtcbmltcG9ydCB7XG4gICAgQ09MTEFQU0VfSUNPTixcbiAgICBNVUxUSV9TQ0hFRFVMSU5HX0VYVFJBQ1RPUixcbiAgICBMRUdBQ1lfU0NIRURVTElOR19FWFRSQUNUT1IsXG4gICAgSU1BR0VfRk9STUFUUyxcbiAgICBBVURJT19GT1JNQVRTLFxuICAgIFZJREVPX0ZPUk1BVFMsXG59IGZyb20gXCJzcmMvY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBlc2NhcGVSZWdleFN0cmluZywgY3lyYjUzIH0gZnJvbSBcInNyYy91dGlsc1wiO1xuaW1wb3J0IHsgdCB9IGZyb20gXCJzcmMvbGFuZy9oZWxwZXJzXCI7XG5cbmV4cG9ydCBlbnVtIEZsYXNoY2FyZE1vZGFsTW9kZSB7XG4gICAgRGVja3NMaXN0LFxuICAgIEZyb250LFxuICAgIEJhY2ssXG4gICAgQ2xvc2VkLFxufVxuXG4vLyBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9jaGhvdW1hbm4vcXVpY2thZGQvYmxvYi9iY2UwYjRjZGFjNDRiODY3ODU0ZDYyMzM3OTZlMzQwNmRmZDE2M2M2L3NyYy9ndWkvR2VuZXJpY0lucHV0UHJvbXB0L0dlbmVyaWNJbnB1dFByb21wdC50cyNMNVxuZXhwb3J0IGNsYXNzIEZsYXNoY2FyZEVkaXRNb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgICBwdWJsaWMgcGx1Z2luOiBTUlBsdWdpbjtcbiAgICBwdWJsaWMgaW5wdXQ6IHN0cmluZztcbiAgICBwdWJsaWMgd2FpdEZvckNsb3NlOiBQcm9taXNlPHN0cmluZz47XG5cbiAgICBwcml2YXRlIHJlc29sdmVQcm9taXNlOiAoaW5wdXQ6IHN0cmluZykgPT4gdm9pZDtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHByaXZhdGUgcmVqZWN0UHJvbWlzZTogKHJlYXNvbj86IGFueSkgPT4gdm9pZDtcbiAgICBwcml2YXRlIGRpZFN1Ym1pdCA9IGZhbHNlO1xuICAgIHByaXZhdGUgaW5wdXRDb21wb25lbnQ6IFRleHRBcmVhQ29tcG9uZW50O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbW9kYWxUZXh0OiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgc3RhdGljIFByb21wdChhcHA6IEFwcCwgcGx1Z2luOiBTUlBsdWdpbiwgcGxhY2Vob2xkZXI6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IG5ld1Byb21wdE1vZGFsID0gbmV3IEZsYXNoY2FyZEVkaXRNb2RhbChhcHAsIHBsdWdpbiwgcGxhY2Vob2xkZXIpO1xuICAgICAgICByZXR1cm4gbmV3UHJvbXB0TW9kYWwud2FpdEZvckNsb3NlO1xuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBTUlBsdWdpbiwgZXhpc3RpbmdUZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoYXBwKTtcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gICAgICAgIHRoaXMudGl0bGVFbC5zZXRUZXh0KHQoXCJFRElUX0NBUkRcIikpO1xuICAgICAgICB0aGlzLnRpdGxlRWwuYWRkQ2xhc3MoXCJzci1jZW50ZXJlZFwiKTtcbiAgICAgICAgdGhpcy5tb2RhbFRleHQgPSBleGlzdGluZ1RleHQ7XG5cbiAgICAgICAgdGhpcy53YWl0Rm9yQ2xvc2UgPSBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICAgICAgICAgICAgdGhpcy5yZWplY3RQcm9taXNlID0gcmVqZWN0O1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kaXNwbGF5KCk7XG4gICAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGlzcGxheSgpIHtcbiAgICAgICAgdGhpcy5jb250ZW50RWwuZW1wdHkoKTtcbiAgICAgICAgdGhpcy5tb2RhbEVsLmFkZENsYXNzKFwic3ItZmxhc2hjYXJkLWlucHV0LW1vZGFsXCIpO1xuXG4gICAgICAgIGNvbnN0IG1haW5Db250ZW50Q29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCA9IHRoaXMuY29udGVudEVsLmNyZWF0ZURpdigpO1xuICAgICAgICBtYWluQ29udGVudENvbnRhaW5lci5hZGRDbGFzcyhcInNyLWZsYXNoY2FyZC1pbnB1dC1hcmVhXCIpO1xuICAgICAgICB0aGlzLmlucHV0Q29tcG9uZW50ID0gdGhpcy5jcmVhdGVJbnB1dEZpZWxkKG1haW5Db250ZW50Q29udGFpbmVyLCB0aGlzLm1vZGFsVGV4dCk7XG4gICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uQmFyKG1haW5Db250ZW50Q29udGFpbmVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUJ1dHRvbihcbiAgICAgICAgY29udGFpbmVyOiBIVE1MRWxlbWVudCxcbiAgICAgICAgdGV4dDogc3RyaW5nLFxuICAgICAgICBjYWxsYmFjazogKGV2dDogTW91c2VFdmVudCkgPT4gdm9pZFxuICAgICkge1xuICAgICAgICBjb25zdCBidG4gPSBuZXcgQnV0dG9uQ29tcG9uZW50KGNvbnRhaW5lcik7XG4gICAgICAgIGJ0bi5zZXRCdXR0b25UZXh0KHRleHQpLm9uQ2xpY2soY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gYnRuO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQnV0dG9uQmFyKG1haW5Db250ZW50Q29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCkge1xuICAgICAgICBjb25zdCBidXR0b25CYXJDb250YWluZXI6IEhUTUxEaXZFbGVtZW50ID0gbWFpbkNvbnRlbnRDb250YWluZXIuY3JlYXRlRGl2KCk7XG4gICAgICAgIGJ1dHRvbkJhckNvbnRhaW5lci5hZGRDbGFzcyhcInNyLWZsYXNoY2FyZC1lZGl0LWJ1dHRvbi1iYXJcIik7XG4gICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uKFxuICAgICAgICAgICAgYnV0dG9uQmFyQ29udGFpbmVyLFxuICAgICAgICAgICAgdChcIlNBVkVcIiksXG4gICAgICAgICAgICB0aGlzLnN1Ym1pdENsaWNrQ2FsbGJhY2tcbiAgICAgICAgKS5zZXRDdGEoKS5idXR0b25FbC5zdHlsZS5tYXJnaW5SaWdodCA9IFwiMFwiO1xuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbihidXR0b25CYXJDb250YWluZXIsIHQoXCJDQU5DRUxcIiksIHRoaXMuY2FuY2VsQ2xpY2tDYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNyZWF0ZUlucHV0RmllbGQoY29udGFpbmVyOiBIVE1MRWxlbWVudCwgdmFsdWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCB0ZXh0Q29tcG9uZW50ID0gbmV3IFRleHRBcmVhQ29tcG9uZW50KGNvbnRhaW5lcik7XG5cbiAgICAgICAgdGV4dENvbXBvbmVudC5pbnB1dEVsLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICAgIHRleHRDb21wb25lbnRcbiAgICAgICAgICAgIC5zZXRWYWx1ZSh2YWx1ZSA/PyBcIlwiKVxuICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4gKHRoaXMuaW5wdXQgPSB2YWx1ZSkpXG4gICAgICAgICAgICAuaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLnN1Ym1pdEVudGVyQ2FsbGJhY2spO1xuXG4gICAgICAgIHJldHVybiB0ZXh0Q29tcG9uZW50O1xuICAgIH1cblxuICAgIHByaXZhdGUgc3VibWl0Q2xpY2tDYWxsYmFjayA9IChfOiBNb3VzZUV2ZW50KSA9PiB0aGlzLnN1Ym1pdCgpO1xuICAgIHByaXZhdGUgY2FuY2VsQ2xpY2tDYWxsYmFjayA9IChfOiBNb3VzZUV2ZW50KSA9PiB0aGlzLmNhbmNlbCgpO1xuXG4gICAgcHJpdmF0ZSBzdWJtaXRFbnRlckNhbGxiYWNrID0gKGV2dDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICBpZiAoKGV2dC5jdHJsS2V5IHx8IGV2dC5tZXRhS2V5KSAmJiBldnQua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5zdWJtaXQoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBwcml2YXRlIHN1Ym1pdCgpIHtcbiAgICAgICAgdGhpcy5kaWRTdWJtaXQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cblxuICAgIG9uT3BlbigpIHtcbiAgICAgICAgc3VwZXIub25PcGVuKCk7XG5cbiAgICAgICAgdGhpcy5pbnB1dENvbXBvbmVudC5pbnB1dEVsLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgb25DbG9zZSgpIHtcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xuICAgICAgICB0aGlzLnJlc29sdmVJbnB1dCgpO1xuICAgICAgICB0aGlzLnJlbW92ZUlucHV0TGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc29sdmVJbnB1dCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpZFN1Ym1pdCkgdGhpcy5yZWplY3RQcm9taXNlKHQoXCJOT19JTlBVVFwiKSk7XG4gICAgICAgIGVsc2UgdGhpcy5yZXNvbHZlUHJvbWlzZSh0aGlzLmlucHV0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZUlucHV0TGlzdGVuZXIoKSB7XG4gICAgICAgIHRoaXMuaW5wdXRDb21wb25lbnQuaW5wdXRFbC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLnN1Ym1pdEVudGVyQ2FsbGJhY2spO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEZsYXNoY2FyZE1vZGFsIGV4dGVuZHMgTW9kYWwge1xuICAgIHB1YmxpYyBwbHVnaW46IFNSUGx1Z2luO1xuICAgIHB1YmxpYyBhbnN3ZXJCdG46IEhUTUxFbGVtZW50O1xuICAgIHB1YmxpYyBmbGFzaGNhcmRWaWV3OiBIVE1MRWxlbWVudDtcbiAgICBwdWJsaWMgaGFyZEJ0bjogSFRNTEVsZW1lbnQ7XG4gICAgcHVibGljIGdvb2RCdG46IEhUTUxFbGVtZW50O1xuICAgIHB1YmxpYyBlYXN5QnRuOiBIVE1MRWxlbWVudDtcbiAgICBwdWJsaWMgbmV4dEJ0bjogSFRNTEVsZW1lbnQ7XG4gICAgcHVibGljIHJlc3BvbnNlRGl2OiBIVE1MRWxlbWVudDtcbiAgICBwdWJsaWMgcmVzZXRCdXR0b246IEhUTUxFbGVtZW50O1xuICAgIHB1YmxpYyBlZGl0QnV0dG9uOiBIVE1MRWxlbWVudDtcbiAgICBwdWJsaWMgY29udGV4dFZpZXc6IEhUTUxFbGVtZW50O1xuICAgIHB1YmxpYyBjdXJyZW50Q2FyZDogQ2FyZDtcbiAgICBwdWJsaWMgY3VycmVudENhcmRJZHg6IG51bWJlcjtcbiAgICBwdWJsaWMgY3VycmVudERlY2s6IERlY2s7XG4gICAgcHVibGljIGNoZWNrRGVjazogRGVjaztcbiAgICBwdWJsaWMgbW9kZTogRmxhc2hjYXJkTW9kYWxNb2RlO1xuICAgIHB1YmxpYyBpZ25vcmVTdGF0czogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IFNSUGx1Z2luLCBpZ25vcmVTdGF0cyA9IGZhbHNlKSB7XG4gICAgICAgIHN1cGVyKGFwcCk7XG5cbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gICAgICAgIHRoaXMuaWdub3JlU3RhdHMgPSBpZ25vcmVTdGF0cztcblxuICAgICAgICB0aGlzLnRpdGxlRWwuc2V0VGV4dCh0KFwiREVDS1NcIikpO1xuICAgICAgICB0aGlzLnRpdGxlRWwuYWRkQ2xhc3MoXCJzci1jZW50ZXJlZFwiKTtcblxuICAgICAgICBpZiAoUGxhdGZvcm0uaXNNb2JpbGUpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudEVsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb2RhbEVsLnN0eWxlLmhlaWdodCA9IHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MuZmxhc2hjYXJkSGVpZ2h0UGVyY2VudGFnZSArIFwiJVwiO1xuICAgICAgICB0aGlzLm1vZGFsRWwuc3R5bGUud2lkdGggPSB0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLmZsYXNoY2FyZFdpZHRoUGVyY2VudGFnZSArIFwiJVwiO1xuXG4gICAgICAgIHRoaXMuY29udGVudEVsLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xuICAgICAgICB0aGlzLmNvbnRlbnRFbC5zdHlsZS5oZWlnaHQgPSBcIjkyJVwiO1xuICAgICAgICB0aGlzLmNvbnRlbnRFbC5hZGRDbGFzcyhcInNyLW1vZGFsLWNvbnRlbnRcIik7XG5cbiAgICAgICAgLy8gVE9ETzogcmVmYWN0b3IgaW50byBldmVudCBoYW5kbGVyP1xuICAgICAgICBkb2N1bWVudC5ib2R5Lm9ua2V5ZG93biA9IChlKSA9PiB7XG4gICAgICAgICAgICAvLyBUT0RPOiBQbGVhc2UgZml4IHRoaXMuIEl0J3MgdWdseS5cbiAgICAgICAgICAgIC8vIENoZWNrcyBpZiB0aGUgaW5wdXQgdGV4dGJveCBpcyBpbiBmb2N1cyBiZWZvcmUgcHJvY2Vzc2luZyBrZXlib2FyZCBzaG9ydGN1dHMuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ub2RlTmFtZSAhPT0gXCJURVhUQVJFQVwiICYmXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlICE9PSBGbGFzaGNhcmRNb2RhbE1vZGUuRGVja3NMaXN0XG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb25zdW1lID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlICE9PSBGbGFzaGNhcmRNb2RhbE1vZGUuQ2xvc2VkICYmIGUuY29kZSA9PT0gXCJLZXlTXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5za2lwQ3VycmVudENhcmQoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3VtZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZSA9PT0gRmxhc2hjYXJkTW9kYWxNb2RlLkZyb250ICYmXG4gICAgICAgICAgICAgICAgICAgIChlLmNvZGUgPT09IFwiU3BhY2VcIiB8fCBlLmNvZGUgPT09IFwiRW50ZXJcIilcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93QW5zd2VyKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN1bWUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gRmxhc2hjYXJkTW9kYWxNb2RlLkJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuY29kZSA9PT0gXCJOdW1wYWQxXCIgfHwgZS5jb2RlID09PSBcIkRpZ2l0MVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NSZXZpZXcoUmV2aWV3UmVzcG9uc2UuSGFyZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdW1lKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5jb2RlID09PSBcIk51bXBhZDJcIiB8fCBlLmNvZGUgPT09IFwiRGlnaXQyXCIgfHwgZS5jb2RlID09PSBcIlNwYWNlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc1JldmlldyhSZXZpZXdSZXNwb25zZS5Hb29kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN1bWUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlLmNvZGUgPT09IFwiTnVtcGFkM1wiIHx8IGUuY29kZSA9PT0gXCJEaWdpdDNcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzUmV2aWV3KFJldmlld1Jlc3BvbnNlLkVhc3kpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3VtZSgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGUuY29kZSA9PT0gXCJOdW1wYWQwXCIgfHwgZS5jb2RlID09PSBcIkRpZ2l0MFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NSZXZpZXcoUmV2aWV3UmVzcG9uc2UuUmVzZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3VtZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIG9uT3BlbigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kZWNrc0xpc3QoKTtcbiAgICB9XG5cbiAgICBvbkNsb3NlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1vZGUgPSBGbGFzaGNhcmRNb2RhbE1vZGUuQ2xvc2VkO1xuICAgIH1cblxuICAgIGRlY2tzTGlzdCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYWltRGVjayA9IHRoaXMucGx1Z2luLmRlY2tUcmVlLnN1YmRlY2tzLmZpbHRlcihcbiAgICAgICAgICAgIChkZWNrKSA9PiBkZWNrLmRlY2tOYW1lID09PSB0aGlzLnBsdWdpbi5kYXRhLmhpc3RvcnlEZWNrXG4gICAgICAgICk7XG4gICAgICAgIGlmICh0aGlzLnBsdWdpbi5kYXRhLmhpc3RvcnlEZWNrICYmIGFpbURlY2subGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgZGVjayA9IGFpbURlY2tbMF07XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnREZWNrID0gZGVjaztcbiAgICAgICAgICAgIHRoaXMuY2hlY2tEZWNrID0gZGVjay5wYXJlbnQ7XG4gICAgICAgICAgICB0aGlzLnNldHVwQ2FyZHNWaWV3KCk7XG4gICAgICAgICAgICBkZWNrLm5leHRDYXJkKHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cblxuICAgICAgICB0aGlzLm1vZGUgPSBGbGFzaGNhcmRNb2RhbE1vZGUuRGVja3NMaXN0O1xuICAgICAgICB0aGlzLnRpdGxlRWwuc2V0VGV4dCh0KFwiREVDS1NcIikpO1xuICAgICAgICB0aGlzLnRpdGxlRWwuaW5uZXJIVE1MICs9IChcbiAgICAgICAgICAgIDxwIHN0eWxlPVwibWFyZ2luOjBweDtsaW5lLWhlaWdodDoxMnB4O1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjojNGNhZjUwO2NvbG9yOiNmZmZmZmY7XCJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17dChcIkRVRV9DQVJEU1wiKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0YWctcGFuZS10YWctY291bnQgdHJlZS1pdGVtLWZsYWlyIHNyLWRlY2stY291bnRzXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnBsdWdpbi5kZWNrVHJlZS5kdWVGbGFzaGNhcmRzQ291bnQudG9TdHJpbmcoKX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiMyMTk2ZjM7XCJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17dChcIk5FV19DQVJEU1wiKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0YWctcGFuZS10YWctY291bnQgdHJlZS1pdGVtLWZsYWlyIHNyLWRlY2stY291bnRzXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnBsdWdpbi5kZWNrVHJlZS5uZXdGbGFzaGNhcmRzQ291bnQudG9TdHJpbmcoKX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiNmZjcwNDM7XCJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17dChcIlRPVEFMX0NBUkRTXCIpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInRhZy1wYW5lLXRhZy1jb3VudCB0cmVlLWl0ZW0tZmxhaXIgc3ItZGVjay1jb3VudHNcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucGx1Z2luLmRlY2tUcmVlLnRvdGFsRmxhc2hjYXJkcy50b1N0cmluZygpfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jb250ZW50RWwuZW1wdHkoKTtcbiAgICAgICAgdGhpcy5jb250ZW50RWwuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzci1mbGFzaGNhcmQtdmlld1wiKTtcblxuICAgICAgICBmb3IgKGNvbnN0IGRlY2sgb2YgdGhpcy5wbHVnaW4uZGVja1RyZWUuc3ViZGVja3MpIHtcbiAgICAgICAgICAgIGRlY2sucmVuZGVyKHRoaXMuY29udGVudEVsLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldHVwQ2FyZHNWaWV3KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpO1xuXG4gICAgICAgIGNvbnN0IGZsYXNoQ2FyZE1lbnUgPSB0aGlzLmNvbnRlbnRFbC5jcmVhdGVEaXYoXCJzci1mbGFzaGNhcmQtbWVudVwiKTtcblxuICAgICAgICBjb25zdCBiYWNrQnV0dG9uID0gZmxhc2hDYXJkTWVudS5jcmVhdGVFbChcImJ1dHRvblwiKTtcbiAgICAgICAgYmFja0J1dHRvbi5hZGRDbGFzcyhcInNyLWZsYXNoY2FyZC1tZW51LWl0ZW1cIik7XG4gICAgICAgIHNldEljb24oYmFja0J1dHRvbiwgXCJhcnJvdy1sZWZ0XCIpO1xuICAgICAgICBiYWNrQnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgdChcIkJBQ0tcIikpO1xuICAgICAgICBiYWNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5kYXRhLmhpc3RvcnlEZWNrID0gXCJcIjtcbiAgICAgICAgICAgIHRoaXMuZGVja3NMaXN0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZWRpdEJ1dHRvbiA9IGZsYXNoQ2FyZE1lbnUuY3JlYXRlRWwoXCJidXR0b25cIik7XG4gICAgICAgIHRoaXMuZWRpdEJ1dHRvbi5hZGRDbGFzcyhcInNyLWZsYXNoY2FyZC1tZW51LWl0ZW1cIik7XG4gICAgICAgIHNldEljb24odGhpcy5lZGl0QnV0dG9uLCBcImVkaXRcIik7XG4gICAgICAgIHRoaXMuZWRpdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIHQoXCJFRElUX0NBUkRcIikpO1xuICAgICAgICB0aGlzLmVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSBTUiBpbmZvIGZyb20gaW5wdXQgbW9kYWwgcHJvbXB0XG4gICAgICAgICAgICBjb25zdCB0ZXh0UHJvbXB0QXJyID0gdGhpcy5jdXJyZW50Q2FyZC5jYXJkVGV4dC5zcGxpdChcIlxcblwiKTtcbiAgICAgICAgICAgIGxldCB0ZXh0UHJvbXB0ID0gXCJcIjtcbiAgICAgICAgICAgIGlmICh0ZXh0UHJvbXB0QXJyW3RleHRQcm9tcHRBcnIubGVuZ3RoIC0gMV0uc3RhcnRzV2l0aChcIjwhLS1TUjpcIikpIHtcbiAgICAgICAgICAgICAgICB0ZXh0UHJvbXB0ID0gdGV4dFByb21wdEFyci5zbGljZSgwLCAtMSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGV4dFByb21wdCA9IHRoaXMuY3VycmVudENhcmQuY2FyZFRleHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGVkaXRNb2RhbCA9IEZsYXNoY2FyZEVkaXRNb2RhbC5Qcm9tcHQodGhpcy5hcHAsIHRoaXMucGx1Z2luLCB0ZXh0UHJvbXB0KTtcbiAgICAgICAgICAgIGVkaXRNb2RhbFxuICAgICAgICAgICAgICAgIC50aGVuKGFzeW5jIChtb2RpZmllZENhcmRUZXh0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kaWZ5Q2FyZFRleHQodGV4dFByb21wdCwgbW9kaWZpZWRDYXJkVGV4dCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4gY29uc29sZS5sb2cocmVhc29uKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucmVzZXRCdXR0b24gPSBmbGFzaENhcmRNZW51LmNyZWF0ZUVsKFwiYnV0dG9uXCIpO1xuICAgICAgICB0aGlzLnJlc2V0QnV0dG9uLmFkZENsYXNzKFwic3ItZmxhc2hjYXJkLW1lbnUtaXRlbVwiKTtcbiAgICAgICAgc2V0SWNvbih0aGlzLnJlc2V0QnV0dG9uLCBcInJlZnJlc2gtY3dcIik7XG4gICAgICAgIHRoaXMucmVzZXRCdXR0b24uc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCB0KFwiUkVTRVRfQ0FSRF9QUk9HUkVTU1wiKSk7XG4gICAgICAgIHRoaXMucmVzZXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc1JldmlldyhSZXZpZXdSZXNwb25zZS5SZXNldCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGNhcmRJbmZvID0gZmxhc2hDYXJkTWVudS5jcmVhdGVFbChcImJ1dHRvblwiKTtcbiAgICAgICAgY2FyZEluZm8uYWRkQ2xhc3MoXCJzci1mbGFzaGNhcmQtbWVudS1pdGVtXCIpO1xuICAgICAgICBzZXRJY29uKGNhcmRJbmZvLCBcImluZm9cIik7XG4gICAgICAgIGNhcmRJbmZvLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJWaWV3IENhcmQgSW5mb1wiKTtcbiAgICAgICAgY2FyZEluZm8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRFYXNlU3RyID1cbiAgICAgICAgICAgICAgICB0KFwiQ1VSUkVOVF9FQVNFX0hFTFBfVEVYVFwiKSArICh0aGlzLmN1cnJlbnRDYXJkLmVhc2UgPz8gdChcIk5FV1wiKSk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50SW50ZXJ2YWxTdHIgPVxuICAgICAgICAgICAgICAgIHQoXCJDVVJSRU5UX0lOVEVSVkFMX0hFTFBfVEVYVFwiKSArIHRleHRJbnRlcnZhbCh0aGlzLmN1cnJlbnRDYXJkLmludGVydmFsLCBmYWxzZSk7XG4gICAgICAgICAgICBjb25zdCBnZW5lcmF0ZWRGcm9tU3RyID0gdChcIkNBUkRfR0VORVJBVEVEX0ZST01cIiwge1xuICAgICAgICAgICAgICAgIG5vdGVQYXRoOiB0aGlzLmN1cnJlbnRDYXJkLm5vdGUucGF0aCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbmV3IE5vdGljZShjdXJyZW50RWFzZVN0ciArIFwiXFxuXCIgKyBjdXJyZW50SW50ZXJ2YWxTdHIgKyBcIlxcblwiICsgZ2VuZXJhdGVkRnJvbVN0cik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHNraXBCdXR0b24gPSBmbGFzaENhcmRNZW51LmNyZWF0ZUVsKFwiYnV0dG9uXCIpO1xuICAgICAgICBza2lwQnV0dG9uLmFkZENsYXNzKFwic3ItZmxhc2hjYXJkLW1lbnUtaXRlbVwiKTtcbiAgICAgICAgc2V0SWNvbihza2lwQnV0dG9uLCBcImNoZXZyb25zLXJpZ2h0XCIpO1xuICAgICAgICBza2lwQnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgdChcIlNLSVBcIikpO1xuICAgICAgICBza2lwQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNraXBDdXJyZW50Q2FyZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5zaG93Q29udGV4dEluQ2FyZHMpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dFZpZXcgPSB0aGlzLmNvbnRlbnRFbC5jcmVhdGVEaXYoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dFZpZXcuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzci1jb250ZXh0XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mbGFzaGNhcmRWaWV3ID0gdGhpcy5jb250ZW50RWwuY3JlYXRlRGl2KFwiZGl2XCIpO1xuICAgICAgICB0aGlzLmZsYXNoY2FyZFZpZXcuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzci1mbGFzaGNhcmQtdmlld1wiKTtcblxuICAgICAgICB0aGlzLnJlc3BvbnNlRGl2ID0gdGhpcy5jb250ZW50RWwuY3JlYXRlRGl2KFwic3ItZmxhc2hjYXJkLXJlc3BvbnNlXCIpO1xuXG4gICAgICAgIHRoaXMuaGFyZEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIHRoaXMuaGFyZEJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInNyLWhhcmQtYnRuXCIpO1xuICAgICAgICB0aGlzLmhhcmRCdG4uc2V0VGV4dCh0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLmZsYXNoY2FyZEhhcmRUZXh0KTtcbiAgICAgICAgdGhpcy5oYXJkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NSZXZpZXcoUmV2aWV3UmVzcG9uc2UuSGFyZCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlc3BvbnNlRGl2LmFwcGVuZENoaWxkKHRoaXMuaGFyZEJ0bik7XG5cbiAgICAgICAgdGhpcy5nb29kQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgdGhpcy5nb29kQnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIFwic3ItZ29vZC1idG5cIik7XG4gICAgICAgIHRoaXMuZ29vZEJ0bi5zZXRUZXh0KHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MuZmxhc2hjYXJkR29vZFRleHQpO1xuICAgICAgICB0aGlzLmdvb2RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc1JldmlldyhSZXZpZXdSZXNwb25zZS5Hb29kKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVzcG9uc2VEaXYuYXBwZW5kQ2hpbGQodGhpcy5nb29kQnRuKTtcblxuICAgICAgICB0aGlzLmVhc3lCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICB0aGlzLmVhc3lCdG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzci1lYXN5LWJ0blwiKTtcbiAgICAgICAgdGhpcy5lYXN5QnRuLnNldFRleHQodGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5mbGFzaGNhcmRFYXN5VGV4dCk7XG4gICAgICAgIHRoaXMuZWFzeUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzUmV2aWV3KFJldmlld1Jlc3BvbnNlLkVhc3kpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZXNwb25zZURpdi5hcHBlbmRDaGlsZCh0aGlzLmVhc3lCdG4pO1xuICAgICAgICB0aGlzLnJlc3BvbnNlRGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICAgICAgICB0aGlzLmFuc3dlckJ0biA9IHRoaXMuY29udGVudEVsLmNyZWF0ZURpdigpO1xuICAgICAgICB0aGlzLmFuc3dlckJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInNyLXNob3ctYW5zd2VyXCIpO1xuICAgICAgICB0aGlzLmFuc3dlckJ0bi5zZXRUZXh0KHQoXCJTSE9XX0FOU1dFUlwiKSk7XG4gICAgICAgIHRoaXMuYW5zd2VyQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNob3dBbnN3ZXIoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaWdub3JlU3RhdHMpIHtcbiAgICAgICAgICAgIHRoaXMuZ29vZEJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbiAgICAgICAgICAgIHRoaXMucmVzcG9uc2VEaXYuYWRkQ2xhc3MoXCJzci1pZ25vcmVzdGF0cy1yZXNwb25zZVwiKTtcbiAgICAgICAgICAgIHRoaXMuZWFzeUJ0bi5hZGRDbGFzcyhcInNyLWlnbm9yZXN0YXRzLWJ0blwiKTtcbiAgICAgICAgICAgIHRoaXMuaGFyZEJ0bi5hZGRDbGFzcyhcInNyLWlnbm9yZXN0YXRzLWJ0blwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgbW9kaWZ5Q2FyZFRleHQob3JpZ2luYWxUZXh0OiBzdHJpbmcsIHJlcGxhY2VtZW50VGV4dDogc3RyaW5nKSB7XG4gICAgICAgIGlmICghcmVwbGFjZW1lbnRUZXh0KSByZXR1cm47XG4gICAgICAgIGlmIChyZXBsYWNlbWVudFRleHQgPT0gb3JpZ2luYWxUZXh0KSByZXR1cm47XG4gICAgICAgIGxldCBmaWxlVGV4dDogc3RyaW5nID0gYXdhaXQgdGhpcy5hcHAudmF1bHQucmVhZCh0aGlzLmN1cnJlbnRDYXJkLm5vdGUpO1xuICAgICAgICBjb25zdCBvcmlnaW5hbFRleHRSZWdleCA9IG5ldyBSZWdFeHAoZXNjYXBlUmVnZXhTdHJpbmcob3JpZ2luYWxUZXh0KSwgXCJnbVwiKTtcbiAgICAgICAgZmlsZVRleHQgPSBmaWxlVGV4dC5yZXBsYWNlKG9yaWdpbmFsVGV4dFJlZ2V4LCByZXBsYWNlbWVudFRleHQpO1xuICAgICAgICBhd2FpdCB0aGlzLmFwcC52YXVsdC5tb2RpZnkodGhpcy5jdXJyZW50Q2FyZC5ub3RlLCBmaWxlVGV4dCk7XG4gICAgICAgIHRoaXMuY3VycmVudERlY2suZGVsZXRlRmxhc2hjYXJkQXRJbmRleCh0aGlzLmN1cnJlbnRDYXJkSWR4LCB0aGlzLmN1cnJlbnRDYXJkLmlzRHVlKTtcbiAgICAgICAgdGhpcy5idXJ5U2libGluZ0NhcmRzKGZhbHNlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dBbnN3ZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubW9kZSA9IEZsYXNoY2FyZE1vZGFsTW9kZS5CYWNrO1xuXG4gICAgICAgIHRoaXMuYW5zd2VyQnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy5yZXNwb25zZURpdi5zdHlsZS5kaXNwbGF5ID0gXCJncmlkXCI7XG5cbiAgICAgICAgaWYgKHRoaXMuY3VycmVudENhcmQuaXNEdWUpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRDYXJkLmNhcmRUeXBlICE9PSBDYXJkVHlwZS5DbG96ZSkge1xuICAgICAgICAgICAgY29uc3QgaHI6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhyXCIpO1xuICAgICAgICAgICAgaHIuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzci1oci1jYXJkLWRpdmlkZVwiKTtcbiAgICAgICAgICAgIHRoaXMuZmxhc2hjYXJkVmlldy5hcHBlbmRDaGlsZChocik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZsYXNoY2FyZFZpZXcuZW1wdHkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVuZGVyTWFya2Rvd25XcmFwcGVyKHRoaXMuY3VycmVudENhcmQuYmFjaywgdGhpcy5mbGFzaGNhcmRWaWV3KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIHByb2Nlc3NSZXZpZXcocmVzcG9uc2U6IFJldmlld1Jlc3BvbnNlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmICh0aGlzLmlnbm9yZVN0YXRzKSB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UgPT0gUmV2aWV3UmVzcG9uc2UuRWFzeSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudERlY2suZGVsZXRlRmxhc2hjYXJkQXRJbmRleChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50Q2FyZElkeCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50Q2FyZC5pc0R1ZVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnREZWNrLm5leHRDYXJkKHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGludGVydmFsOiBudW1iZXIsIGVhc2U6IG51bWJlciwgZHVlO1xuXG4gICAgICAgIHRoaXMuY3VycmVudERlY2suZGVsZXRlRmxhc2hjYXJkQXRJbmRleCh0aGlzLmN1cnJlbnRDYXJkSWR4LCB0aGlzLmN1cnJlbnRDYXJkLmlzRHVlKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlICE9PSBSZXZpZXdSZXNwb25zZS5SZXNldCkge1xuICAgICAgICAgICAgbGV0IHNjaGVkT2JqOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+O1xuICAgICAgICAgICAgLy8gc2NoZWR1bGVkIGNhcmRcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRDYXJkLmlzRHVlKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld0NhcmRTdGF0cyA9IHNjaGVkdWxlKFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50Q2FyZC5zdGF0cyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uZHVlRGF0ZXNGbGFzaGNhcmRzXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGluaXRpYWxfZWFzZTogbnVtYmVyID0gdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5iYXNlRWFzZTtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLmVhc2VCeVBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRDYXJkLm5vdGUucGF0aFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxfZWFzZSA9IE1hdGgucm91bmQodGhpcy5wbHVnaW4uZWFzZUJ5UGF0aFt0aGlzLmN1cnJlbnRDYXJkLm5vdGUucGF0aF0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNjaGVkT2JqID0gc2NoZWR1bGUoXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLFxuICAgICAgICAgICAgICAgICAgICB7MS4wOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxfZWFzZSxcbiAgICAgICAgICAgICAgICAgICAgMDpudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5kdWVEYXRlc0ZsYXNoY2FyZHNcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGludGVydmFsID0gc2NoZWRPYmouaW50ZXJ2YWw7XG4gICAgICAgICAgICAgICAgZWFzZSA9IHNjaGVkT2JqLmVhc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGludGVydmFsID0gc2NoZWRPYmouaW50ZXJ2YWw7XG4gICAgICAgICAgICBlYXNlID0gc2NoZWRPYmouZWFzZTtcbiAgICAgICAgICAgIGR1ZSA9IHdpbmRvdy5tb21lbnQoRGF0ZS5ub3coKSArIGludGVydmFsICogMjQgKiAzNjAwICogMTAwMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRDYXJkLmludGVydmFsID0gMS4wO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50Q2FyZC5lYXNlID0gdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5iYXNlRWFzZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRDYXJkLmlzRHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RGVjay5kdWVGbGFzaGNhcmRzLnB1c2godGhpcy5jdXJyZW50Q2FyZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudERlY2submV3Rmxhc2hjYXJkcy5wdXNoKHRoaXMuY3VycmVudENhcmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZHVlID0gd2luZG93Lm1vbWVudChEYXRlLm5vdygpKTtcbiAgICAgICAgICAgIG5ldyBOb3RpY2UodChcIkNBUkRfUFJPR1JFU1NfUkVTRVRcIikpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50RGVjay5uZXh0Q2FyZCh0aGlzKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGR1ZVN0cmluZzogc3RyaW5nID0gZHVlLmZvcm1hdChcIllZWVktTU0tRERcIik7XG5cbiAgICAgICAgbGV0IGZpbGVUZXh0OiBzdHJpbmcgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5yZWFkKHRoaXMuY3VycmVudENhcmQubm90ZSk7XG4gICAgICAgIGNvbnN0IHJlcGxhY2VtZW50UmVnZXggPSBuZXcgUmVnRXhwKGVzY2FwZVJlZ2V4U3RyaW5nKHRoaXMuY3VycmVudENhcmQuY2FyZFRleHQpLCBcImdtXCIpO1xuXG4gICAgICAgIGxldCBzZXA6IHN0cmluZyA9IHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MuY2FyZENvbW1lbnRPblNhbWVMaW5lID8gXCIgXCIgOiBcIlxcblwiO1xuICAgICAgICAvLyBPdmVycmlkZSBzZXBhcmF0b3IgaWYgbGFzdCBibG9jayBpcyBhIGNvZGVibG9ja1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50Q2FyZC5jYXJkVGV4dC5lbmRzV2l0aChcImBgYFwiKSAmJiBzZXAgIT09IFwiXFxuXCIpIHtcbiAgICAgICAgICAgIHNlcCA9IFwiXFxuXCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBpZiB3ZSdyZSBhZGRpbmcgc2NoZWR1bGluZyBpbmZvcm1hdGlvbiB0byB0aGUgZmxhc2hjYXJkXG4gICAgICAgIC8vIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICBpZiAodGhpcy5jdXJyZW50Q2FyZC5jYXJkVGV4dC5sYXN0SW5kZXhPZihcIjwhLS1TUjpcIikgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRDYXJkLmNhcmRUZXh0ID1cbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRDYXJkLmNhcmRUZXh0ICsgc2VwICsgYDwhLS1TUjohJHtkdWVTdHJpbmd9LCR7aW50ZXJ2YWx9LCR7ZWFzZX0tLT5gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHNjaGVkdWxpbmc6IChSZWdFeHBNYXRjaEFycmF5IHwgc3RyaW5nW10pW10gPSBbXG4gICAgICAgICAgICAgICAgLi4udGhpcy5jdXJyZW50Q2FyZC5jYXJkVGV4dC5tYXRjaEFsbChNVUxUSV9TQ0hFRFVMSU5HX0VYVFJBQ1RPUiksXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgaWYgKHNjaGVkdWxpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgc2NoZWR1bGluZyA9IFsuLi50aGlzLmN1cnJlbnRDYXJkLmNhcmRUZXh0Lm1hdGNoQWxsKExFR0FDWV9TQ0hFRFVMSU5HX0VYVFJBQ1RPUildO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBjdXJyQ2FyZFNjaGVkOiBzdHJpbmdbXSA9IFtcIjBcIiwgZHVlU3RyaW5nLCBpbnRlcnZhbC50b1N0cmluZygpLCBlYXNlLnRvU3RyaW5nKCldO1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudENhcmQuaXNEdWUpIHtcbiAgICAgICAgICAgICAgICBzY2hlZHVsaW5nW3RoaXMuY3VycmVudENhcmQuc2libGluZ0lkeF0gPSBjdXJyQ2FyZFNjaGVkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzY2hlZHVsaW5nLnB1c2goY3VyckNhcmRTY2hlZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY3VycmVudENhcmQuY2FyZFRleHQgPSB0aGlzLmN1cnJlbnRDYXJkLmNhcmRUZXh0LnJlcGxhY2UoLzwhLS1TUjouKy0tPi9nbSwgXCJcIik7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRDYXJkLmNhcmRUZXh0ICs9IFwiPCEtLVNSOlwiO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY2hlZHVsaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50Q2FyZC5jYXJkVGV4dCArPSBgISR7c2NoZWR1bGluZ1tpXVsxXX0sJHtzY2hlZHVsaW5nW2ldWzJdfSwke3NjaGVkdWxpbmdbaV1bM119YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY3VycmVudENhcmQuY2FyZFRleHQgKz0gXCItLT5cIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZpbGVUZXh0ID0gZmlsZVRleHQucmVwbGFjZShyZXBsYWNlbWVudFJlZ2V4LCAoKSA9PiB0aGlzLmN1cnJlbnRDYXJkLmNhcmRUZXh0KTtcbiAgICAgICAgZm9yIChjb25zdCBzaWJsaW5nIG9mIHRoaXMuY3VycmVudENhcmQuc2libGluZ3MpIHtcbiAgICAgICAgICAgIHNpYmxpbmcuY2FyZFRleHQgPSB0aGlzLmN1cnJlbnRDYXJkLmNhcmRUZXh0O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLmJ1cnlTaWJsaW5nQ2FyZHMpIHtcbiAgICAgICAgICAgIHRoaXMuYnVyeVNpYmxpbmdDYXJkcyh0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHRoaXMuYXBwLnZhdWx0Lm1vZGlmeSh0aGlzLmN1cnJlbnRDYXJkLm5vdGUsIGZpbGVUZXh0KTtcbiAgICAgICAgdGhpcy5jdXJyZW50RGVjay5uZXh0Q2FyZCh0aGlzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGJ1cnlTaWJsaW5nQ2FyZHModGlsbE5leHREYXk6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKHRpbGxOZXh0RGF5KSB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5kYXRhLmJ1cnlMaXN0LnB1c2goY3lyYjUzKHRoaXMuY3VycmVudENhcmQuY2FyZFRleHQpKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVQbHVnaW5EYXRhKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IHNpYmxpbmcgb2YgdGhpcy5jdXJyZW50Q2FyZC5zaWJsaW5ncykge1xuICAgICAgICAgICAgY29uc3QgZHVlSWR4ID0gdGhpcy5jdXJyZW50RGVjay5kdWVGbGFzaGNhcmRzLmluZGV4T2Yoc2libGluZyk7XG4gICAgICAgICAgICBjb25zdCBuZXdJZHggPSB0aGlzLmN1cnJlbnREZWNrLm5ld0ZsYXNoY2FyZHMuaW5kZXhPZihzaWJsaW5nKTtcblxuICAgICAgICAgICAgaWYgKGR1ZUlkeCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnREZWNrLmRlbGV0ZUZsYXNoY2FyZEF0SW5kZXgoXG4gICAgICAgICAgICAgICAgICAgIGR1ZUlkeCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RGVjay5kdWVGbGFzaGNhcmRzW2R1ZUlkeF0uaXNEdWVcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXdJZHggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RGVjay5kZWxldGVGbGFzaGNhcmRBdEluZGV4KFxuICAgICAgICAgICAgICAgICAgICBuZXdJZHgsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudERlY2submV3Rmxhc2hjYXJkc1tuZXdJZHhdLmlzRHVlXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2tpcEN1cnJlbnRDYXJkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmN1cnJlbnREZWNrLmRlbGV0ZUZsYXNoY2FyZEF0SW5kZXgodGhpcy5jdXJyZW50Q2FyZElkeCwgdGhpcy5jdXJyZW50Q2FyZC5pc0R1ZSk7XG4gICAgICAgIHRoaXMuYnVyeVNpYmxpbmdDYXJkcyhmYWxzZSk7XG4gICAgICAgIHRoaXMuY3VycmVudERlY2submV4dENhcmQodGhpcyk7XG4gICAgfVxuXG4gICAgLy8gc2xpZ2h0bHkgbW9kaWZpZWQgdmVyc2lvbiBvZiB0aGUgcmVuZGVyTWFya2Rvd24gZnVuY3Rpb24gaW5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbWdtZXllcnMvb2JzaWRpYW4ta2FuYmFuL2Jsb2IvbWFpbi9zcmMvS2FuYmFuVmlldy50c3hcbiAgICBhc3luYyByZW5kZXJNYXJrZG93bldyYXBwZXIoXG4gICAgICAgIG1hcmtkb3duU3RyaW5nOiBzdHJpbmcsXG4gICAgICAgIGNvbnRhaW5lckVsOiBIVE1MRWxlbWVudCxcbiAgICAgICAgcmVjdXJzaXZlRGVwdGggPSAwXG4gICAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmIChyZWN1cnNpdmVEZXB0aCA+IDQpIHJldHVybjtcblxuICAgICAgICBNYXJrZG93blJlbmRlcmVyLnJlbmRlck1hcmtkb3duKFxuICAgICAgICAgICAgbWFya2Rvd25TdHJpbmcsXG4gICAgICAgICAgICBjb250YWluZXJFbCxcbiAgICAgICAgICAgIHRoaXMuY3VycmVudENhcmQubm90ZS5wYXRoLFxuICAgICAgICAgICAgdGhpcy5wbHVnaW5cbiAgICAgICAgKTtcblxuICAgICAgICBjb250YWluZXJFbC5maW5kQWxsKFwiLmludGVybmFsLWVtYmVkXCIpLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsaW5rID0gdGhpcy5wYXJzZUxpbmsoZWwuZ2V0QXR0cmlidXRlKFwic3JjXCIpKTtcblxuICAgICAgICAgICAgLy8gZmlsZSBkb2VzIG5vdCBleGlzdCwgZGlzcGxheSBkZWFkIGxpbmtcbiAgICAgICAgICAgIGlmICghbGluay50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBlbC5pbm5lclRleHQgPSBsaW5rLnRleHQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxpbmsudGFyZ2V0IGluc3RhbmNlb2YgVEZpbGUpIHtcbiAgICAgICAgICAgICAgICBpZiAobGluay50YXJnZXQuZXh0ZW5zaW9uICE9PSBcIm1kXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWJlZE1lZGlhRmlsZShlbCwgbGluay50YXJnZXQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsLmlubmVyVGV4dCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyVHJhbnNjbHVkZShlbCwgbGluaywgcmVjdXJzaXZlRGVwdGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZUxpbmsoc3JjOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgbGlua0NvbXBvbmVudHNSZWdleCA9XG4gICAgICAgICAgICAvXig/PGZpbGU+W14jXl0rKT8oPzojKD8hXFxeKSg/PGhlYWRpbmc+LispfCNcXF4oPzxibG9ja0lkPi4rKXwjKT8kLztcbiAgICAgICAgY29uc3QgbWF0Y2hlZCA9IHR5cGVvZiBzcmMgPT09IFwic3RyaW5nXCIgJiYgc3JjLm1hdGNoKGxpbmtDb21wb25lbnRzUmVnZXgpO1xuICAgICAgICBjb25zdCBmaWxlID0gbWF0Y2hlZC5ncm91cHMuZmlsZSB8fCB0aGlzLmN1cnJlbnRDYXJkLm5vdGUucGF0aDtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5wbHVnaW4uYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0Rmlyc3RMaW5rcGF0aERlc3QoXG4gICAgICAgICAgICBmaWxlLFxuICAgICAgICAgICAgdGhpcy5jdXJyZW50Q2FyZC5ub3RlLnBhdGhcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRleHQ6IG1hdGNoZWRbMF0sXG4gICAgICAgICAgICBmaWxlOiBtYXRjaGVkLmdyb3Vwcy5maWxlLFxuICAgICAgICAgICAgaGVhZGluZzogbWF0Y2hlZC5ncm91cHMuaGVhZGluZyxcbiAgICAgICAgICAgIGJsb2NrSWQ6IG1hdGNoZWQuZ3JvdXBzLmJsb2NrSWQsXG4gICAgICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGVtYmVkTWVkaWFGaWxlKGVsOiBIVE1MRWxlbWVudCwgdGFyZ2V0OiBURmlsZSkge1xuICAgICAgICBlbC5pbm5lclRleHQgPSBcIlwiO1xuICAgICAgICBpZiAoSU1BR0VfRk9STUFUUy5pbmNsdWRlcyh0YXJnZXQuZXh0ZW5zaW9uKSkge1xuICAgICAgICAgICAgZWwuY3JlYXRlRWwoXG4gICAgICAgICAgICAgICAgXCJpbWdcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogdGhpcy5wbHVnaW4uYXBwLnZhdWx0LmdldFJlc291cmNlUGF0aCh0YXJnZXQpLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGltZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWwuaGFzQXR0cmlidXRlKFwid2lkdGhcIikpXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcuc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgZWwuZ2V0QXR0cmlidXRlKFwid2lkdGhcIikpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGltZy5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCBcIjEwMCVcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUoXCJhbHRcIikpIGltZy5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgZWwuZ2V0QXR0cmlidXRlKFwiYWx0XCIpKTtcbiAgICAgICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIChldikgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKGV2LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUubWluV2lkdGggPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZXYudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5taW5XaWR0aCA9PT0gXCIxMDAlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZWwuYWRkQ2xhc3NlcyhbXCJpbWFnZS1lbWJlZFwiLCBcImlzLWxvYWRlZFwiXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBBVURJT19GT1JNQVRTLmluY2x1ZGVzKHRhcmdldC5leHRlbnNpb24pIHx8XG4gICAgICAgICAgICBWSURFT19GT1JNQVRTLmluY2x1ZGVzKHRhcmdldC5leHRlbnNpb24pXG4gICAgICAgICkge1xuICAgICAgICAgICAgZWwuY3JlYXRlRWwoXG4gICAgICAgICAgICAgICAgQVVESU9fRk9STUFUUy5pbmNsdWRlcyh0YXJnZXQuZXh0ZW5zaW9uKSA/IFwiYXVkaW9cIiA6IFwidmlkZW9cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiB0aGlzLnBsdWdpbi5hcHAudmF1bHQuZ2V0UmVzb3VyY2VQYXRoKHRhcmdldCksXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoYXVkaW8pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsLmhhc0F0dHJpYnV0ZShcImFsdFwiKSkgYXVkaW8uc2V0QXR0cmlidXRlKFwiYWx0XCIsIGVsLmdldEF0dHJpYnV0ZShcImFsdFwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGVsLmFkZENsYXNzZXMoW1wibWVkaWEtZW1iZWRcIiwgXCJpcy1sb2FkZWRcIl0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWwuaW5uZXJUZXh0ID0gdGFyZ2V0LnBhdGg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIHJlbmRlclRyYW5zY2x1ZGUoXG4gICAgICAgIGVsOiBIVE1MRWxlbWVudCxcbiAgICAgICAgbGluazoge1xuICAgICAgICAgICAgdGV4dDogc3RyaW5nO1xuICAgICAgICAgICAgZmlsZTogc3RyaW5nO1xuICAgICAgICAgICAgaGVhZGluZzogc3RyaW5nO1xuICAgICAgICAgICAgYmxvY2tJZDogc3RyaW5nO1xuICAgICAgICAgICAgdGFyZ2V0OiBURmlsZTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVjdXJzaXZlRGVwdGg6IG51bWJlclxuICAgICkge1xuICAgICAgICBjb25zdCBjYWNoZSA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0Q2FjaGUobGluay50YXJnZXQucGF0aCk7XG4gICAgICAgIGNvbnN0IHRleHQgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5jYWNoZWRSZWFkKGxpbmsudGFyZ2V0KTtcbiAgICAgICAgbGV0IGJsb2NrVGV4dDtcbiAgICAgICAgaWYgKGxpbmsuaGVhZGluZykge1xuICAgICAgICAgICAgY29uc3QgY2xlYW4gPSAoczogc3RyaW5nKSA9PiBzLnJlcGxhY2UoL1tcXFdcXHNdL2csIFwiXCIpO1xuICAgICAgICAgICAgY29uc3QgaGVhZGluZ0luZGV4ID0gY2FjaGUuaGVhZGluZ3M/LmZpbmRJbmRleChcbiAgICAgICAgICAgICAgICAoaCkgPT4gY2xlYW4oaC5oZWFkaW5nKSA9PT0gY2xlYW4obGluay5oZWFkaW5nKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRpbmcgPSBjYWNoZS5oZWFkaW5nc1toZWFkaW5nSW5kZXhdO1xuXG4gICAgICAgICAgICBjb25zdCBzdGFydEF0ID0gaGVhZGluZy5wb3NpdGlvbi5zdGFydC5vZmZzZXQ7XG4gICAgICAgICAgICBjb25zdCBlbmRBdCA9XG4gICAgICAgICAgICAgICAgY2FjaGUuaGVhZGluZ3Muc2xpY2UoaGVhZGluZ0luZGV4ICsgMSkuZmluZCgoaCkgPT4gaC5sZXZlbCA8PSBoZWFkaW5nLmxldmVsKVxuICAgICAgICAgICAgICAgICAgICA/LnBvc2l0aW9uPy5zdGFydD8ub2Zmc2V0IHx8IHRleHQubGVuZ3RoO1xuXG4gICAgICAgICAgICBibG9ja1RleHQgPSB0ZXh0LnN1YnN0cmluZyhzdGFydEF0LCBlbmRBdCk7XG4gICAgICAgIH0gZWxzZSBpZiAobGluay5ibG9ja0lkKSB7XG4gICAgICAgICAgICBjb25zdCBibG9jayA9IGNhY2hlLmJsb2Nrc1tsaW5rLmJsb2NrSWRdO1xuICAgICAgICAgICAgY29uc3Qgc3RhcnRBdCA9IGJsb2NrLnBvc2l0aW9uLnN0YXJ0Lm9mZnNldDtcbiAgICAgICAgICAgIGNvbnN0IGVuZEF0ID0gYmxvY2sucG9zaXRpb24uZW5kLm9mZnNldDtcbiAgICAgICAgICAgIGJsb2NrVGV4dCA9IHRleHQuc3Vic3RyaW5nKHN0YXJ0QXQsIGVuZEF0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJsb2NrVGV4dCA9IHRleHQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbmRlck1hcmtkb3duV3JhcHBlcihibG9ja1RleHQsIGVsLCByZWN1cnNpdmVEZXB0aCArIDEpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIERlY2sge1xuICAgIHB1YmxpYyBkZWNrTmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBuZXdGbGFzaGNhcmRzOiBDYXJkW107XG4gICAgcHVibGljIG5ld0ZsYXNoY2FyZHNDb3VudCA9IDA7IC8vIGNvdW50cyB0aG9zZSBpbiBzdWJkZWNrcyB0b29cbiAgICBwdWJsaWMgZHVlRmxhc2hjYXJkczogQ2FyZFtdO1xuICAgIHB1YmxpYyBkdWVGbGFzaGNhcmRzQ291bnQgPSAwOyAvLyBjb3VudHMgdGhvc2UgaW4gc3ViZGVja3MgdG9vXG4gICAgcHVibGljIHRvdGFsRmxhc2hjYXJkcyA9IDA7IC8vIGNvdW50cyB0aG9zZSBpbiBzdWJkZWNrcyB0b29cbiAgICBwdWJsaWMgc3ViZGVja3M6IERlY2tbXTtcbiAgICBwdWJsaWMgcGFyZW50OiBEZWNrIHwgbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKGRlY2tOYW1lOiBzdHJpbmcsIHBhcmVudDogRGVjayB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5kZWNrTmFtZSA9IGRlY2tOYW1lO1xuICAgICAgICB0aGlzLm5ld0ZsYXNoY2FyZHMgPSBbXTtcbiAgICAgICAgdGhpcy5uZXdGbGFzaGNhcmRzQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmR1ZUZsYXNoY2FyZHMgPSBbXTtcbiAgICAgICAgdGhpcy5kdWVGbGFzaGNhcmRzQ291bnQgPSAwO1xuICAgICAgICB0aGlzLnRvdGFsRmxhc2hjYXJkcyA9IDA7XG4gICAgICAgIHRoaXMuc3ViZGVja3MgPSBbXTtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgfVxuXG4gICAgY3JlYXRlRGVjayhkZWNrUGF0aDogc3RyaW5nW10pOiB2b2lkIHtcbiAgICAgICAgaWYgKGRlY2tQYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGVja05hbWU6IHN0cmluZyA9IGRlY2tQYXRoLnNoaWZ0KCk7XG4gICAgICAgIGZvciAoY29uc3QgZGVjayBvZiB0aGlzLnN1YmRlY2tzKSB7XG4gICAgICAgICAgICBpZiAoZGVja05hbWUgPT09IGRlY2suZGVja05hbWUpIHtcbiAgICAgICAgICAgICAgICBkZWNrLmNyZWF0ZURlY2soZGVja1BhdGgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRlY2s6IERlY2sgPSBuZXcgRGVjayhkZWNrTmFtZSwgdGhpcyk7XG4gICAgICAgIHRoaXMuc3ViZGVja3MucHVzaChkZWNrKTtcbiAgICAgICAgZGVjay5jcmVhdGVEZWNrKGRlY2tQYXRoKTtcbiAgICB9XG5cbiAgICBpbnNlcnRGbGFzaGNhcmQoZGVja1BhdGg6IHN0cmluZ1tdLCBjYXJkT2JqOiBDYXJkKTogdm9pZCB7XG4gICAgICAgIGlmIChjYXJkT2JqLmlzRHVlKSB7XG4gICAgICAgICAgICB0aGlzLmR1ZUZsYXNoY2FyZHNDb3VudCsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5uZXdGbGFzaGNhcmRzQ291bnQrKztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRvdGFsRmxhc2hjYXJkcysrO1xuXG4gICAgICAgIGlmIChkZWNrUGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGlmIChjYXJkT2JqLmlzRHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kdWVGbGFzaGNhcmRzLnB1c2goY2FyZE9iaik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubmV3Rmxhc2hjYXJkcy5wdXNoKGNhcmRPYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGVja05hbWU6IHN0cmluZyA9IGRlY2tQYXRoLnNoaWZ0KCk7XG4gICAgICAgIGZvciAoY29uc3QgZGVjayBvZiB0aGlzLnN1YmRlY2tzKSB7XG4gICAgICAgICAgICBpZiAoZGVja05hbWUgPT09IGRlY2suZGVja05hbWUpIHtcbiAgICAgICAgICAgICAgICBkZWNrLmluc2VydEZsYXNoY2FyZChkZWNrUGF0aCwgY2FyZE9iaik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gY291bnQgZmxhc2hjYXJkcyB0aGF0IGhhdmUgZWl0aGVyIGJlZW4gYnVyaWVkXG4gICAgLy8gb3IgYXJlbid0IGR1ZSB5ZXRcbiAgICBjb3VudEZsYXNoY2FyZChkZWNrUGF0aDogc3RyaW5nW10sIG4gPSAxKTogdm9pZCB7XG4gICAgICAgIHRoaXMudG90YWxGbGFzaGNhcmRzICs9IG47XG5cbiAgICAgICAgY29uc3QgZGVja05hbWU6IHN0cmluZyA9IGRlY2tQYXRoLnNoaWZ0KCk7XG4gICAgICAgIGZvciAoY29uc3QgZGVjayBvZiB0aGlzLnN1YmRlY2tzKSB7XG4gICAgICAgICAgICBpZiAoZGVja05hbWUgPT09IGRlY2suZGVja05hbWUpIHtcbiAgICAgICAgICAgICAgICBkZWNrLmNvdW50Rmxhc2hjYXJkKGRlY2tQYXRoLCBuKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWxldGVGbGFzaGNhcmRBdEluZGV4KGluZGV4OiBudW1iZXIsIGNhcmRJc0R1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoY2FyZElzRHVlKSB7XG4gICAgICAgICAgICB0aGlzLmR1ZUZsYXNoY2FyZHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMuZHVlRmxhc2hjYXJkc0NvdW50LS07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5ld0ZsYXNoY2FyZHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMubmV3Rmxhc2hjYXJkc0NvdW50LS07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGVjazogRGVjayA9IHRoaXMucGFyZW50O1xuICAgICAgICB3aGlsZSAoZGVjayAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGNhcmRJc0R1ZSkge1xuICAgICAgICAgICAgICAgIGRlY2suZHVlRmxhc2hjYXJkc0NvdW50LS07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlY2submV3Rmxhc2hjYXJkc0NvdW50LS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWNrID0gZGVjay5wYXJlbnQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzb3J0U3ViZGVja3NMaXN0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN1YmRlY2tzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGlmIChhLmRlY2tOYW1lIDwgYi5kZWNrTmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYS5kZWNrTmFtZSA+IGIuZGVja05hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGNvbnN0IGRlY2sgb2YgdGhpcy5zdWJkZWNrcykge1xuICAgICAgICAgICAgZGVjay5zb3J0U3ViZGVja3NMaXN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoY29udGFpbmVyRWw6IEhUTUxFbGVtZW50LCBtb2RhbDogRmxhc2hjYXJkTW9kYWwpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZGVja1ZpZXc6IEhUTUxFbGVtZW50ID0gY29udGFpbmVyRWwuY3JlYXRlRGl2KFwidHJlZS1pdGVtXCIpO1xuXG4gICAgICAgIGNvbnN0IGRlY2tWaWV3U2VsZjogSFRNTEVsZW1lbnQgPSBkZWNrVmlldy5jcmVhdGVEaXYoXG4gICAgICAgICAgICBcInRyZWUtaXRlbS1zZWxmIHRhZy1wYW5lLXRhZyBpcy1jbGlja2FibGVcIlxuICAgICAgICApO1xuICAgICAgICBjb25zdCBzaG91bGRCZUluaXRpYWxseUV4cGFuZGVkOiBib29sZWFuID1cbiAgICAgICAgICAgIG1vZGFsLnBsdWdpbi5kYXRhLnNldHRpbmdzLmluaXRpYWxseUV4cGFuZEFsbFN1YmRlY2tzSW5UcmVlO1xuICAgICAgICBsZXQgY29sbGFwc2VkID0gIXNob3VsZEJlSW5pdGlhbGx5RXhwYW5kZWQ7XG4gICAgICAgIGxldCBjb2xsYXBzZUljb25FbDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuc3ViZGVja3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29sbGFwc2VJY29uRWwgPSBkZWNrVmlld1NlbGYuY3JlYXRlRGl2KFwidHJlZS1pdGVtLWljb24gY29sbGFwc2UtaWNvblwiKTtcbiAgICAgICAgICAgIGNvbGxhcHNlSWNvbkVsLmlubmVySFRNTCA9IENPTExBUFNFX0lDT047XG4gICAgICAgICAgICAoY29sbGFwc2VJY29uRWwuY2hpbGROb2Rlc1swXSBhcyBIVE1MRWxlbWVudCkuc3R5bGUudHJhbnNmb3JtID0gY29sbGFwc2VkXG4gICAgICAgICAgICAgICAgPyBcInJvdGF0ZSgtOTBkZWcpXCJcbiAgICAgICAgICAgICAgICA6IFwiXCI7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkZWNrVmlld0lubmVyOiBIVE1MRWxlbWVudCA9IGRlY2tWaWV3U2VsZi5jcmVhdGVEaXYoXCJ0cmVlLWl0ZW0taW5uZXJcIik7XG4gICAgICAgIGRlY2tWaWV3SW5uZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIG1vZGFsLnBsdWdpbi5kYXRhLmhpc3RvcnlEZWNrID0gdGhpcy5kZWNrTmFtZTtcbiAgICAgICAgICAgIG1vZGFsLmN1cnJlbnREZWNrID0gdGhpcztcbiAgICAgICAgICAgIG1vZGFsLmNoZWNrRGVjayA9IHRoaXMucGFyZW50O1xuICAgICAgICAgICAgbW9kYWwuc2V0dXBDYXJkc1ZpZXcoKTtcbiAgICAgICAgICAgIHRoaXMubmV4dENhcmQobW9kYWwpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZGVja1ZpZXdJbm5lclRleHQ6IEhUTUxFbGVtZW50ID0gZGVja1ZpZXdJbm5lci5jcmVhdGVEaXYoXCJ0YWctcGFuZS10YWctdGV4dFwiKTtcbiAgICAgICAgZGVja1ZpZXdJbm5lclRleHQuaW5uZXJIVE1MICs9IDxzcGFuIGNsYXNzPVwidGFnLXBhbmUtdGFnLXNlbGZcIj57dGhpcy5kZWNrTmFtZX08L3NwYW4+O1xuICAgICAgICBjb25zdCBkZWNrVmlld091dGVyOiBIVE1MRWxlbWVudCA9IGRlY2tWaWV3U2VsZi5jcmVhdGVEaXYoXCJ0cmVlLWl0ZW0tZmxhaXItb3V0ZXJcIik7XG4gICAgICAgIGRlY2tWaWV3T3V0ZXIuaW5uZXJIVE1MICs9IChcbiAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjojNGNhZjUwO1wiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidGFnLXBhbmUtdGFnLWNvdW50IHRyZWUtaXRlbS1mbGFpciBzci1kZWNrLWNvdW50c1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5kdWVGbGFzaGNhcmRzQ291bnQudG9TdHJpbmcoKX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiMyMTk2ZjM7XCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0YWctcGFuZS10YWctY291bnQgdHJlZS1pdGVtLWZsYWlyIHNyLWRlY2stY291bnRzXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLm5ld0ZsYXNoY2FyZHNDb3VudC50b1N0cmluZygpfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6I2ZmNzA0MztcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInRhZy1wYW5lLXRhZy1jb3VudCB0cmVlLWl0ZW0tZmxhaXIgc3ItZGVjay1jb3VudHNcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMudG90YWxGbGFzaGNhcmRzLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IGRlY2tWaWV3Q2hpbGRyZW46IEhUTUxFbGVtZW50ID0gZGVja1ZpZXcuY3JlYXRlRGl2KFwidHJlZS1pdGVtLWNoaWxkcmVuXCIpO1xuICAgICAgICBkZWNrVmlld0NoaWxkcmVuLnN0eWxlLmRpc3BsYXkgPSBjb2xsYXBzZWQgPyBcIm5vbmVcIiA6IFwiYmxvY2tcIjtcbiAgICAgICAgaWYgKHRoaXMuc3ViZGVja3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29sbGFwc2VJY29uRWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY29sbGFwc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIChjb2xsYXBzZUljb25FbC5jaGlsZE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50KS5zdHlsZS50cmFuc2Zvcm0gPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICBkZWNrVmlld0NoaWxkcmVuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgKGNvbGxhcHNlSWNvbkVsLmNoaWxkTm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQpLnN0eWxlLnRyYW5zZm9ybSA9XG4gICAgICAgICAgICAgICAgICAgICAgICBcInJvdGF0ZSgtOTBkZWcpXCI7XG4gICAgICAgICAgICAgICAgICAgIGRlY2tWaWV3Q2hpbGRyZW4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb2xsYXBzZWQgPSAhY29sbGFwc2VkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBkZWNrIG9mIHRoaXMuc3ViZGVja3MpIHtcbiAgICAgICAgICAgIGRlY2sucmVuZGVyKGRlY2tWaWV3Q2hpbGRyZW4sIG1vZGFsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5leHRDYXJkKG1vZGFsOiBGbGFzaGNhcmRNb2RhbCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5uZXdGbGFzaGNhcmRzLmxlbmd0aCArIHRoaXMuZHVlRmxhc2hjYXJkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmR1ZUZsYXNoY2FyZHNDb3VudCArIHRoaXMubmV3Rmxhc2hjYXJkc0NvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZGVjayBvZiB0aGlzLnN1YmRlY2tzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWNrLmR1ZUZsYXNoY2FyZHNDb3VudCArIGRlY2submV3Rmxhc2hjYXJkc0NvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWwuY3VycmVudERlY2sgPSBkZWNrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVjay5uZXh0Q2FyZChtb2RhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudCA9PSBtb2RhbC5jaGVja0RlY2spIHtcbiAgICAgICAgICAgICAgICBtb2RhbC5wbHVnaW4uZGF0YS5oaXN0b3J5RGVjayA9IFwiXCI7XG4gICAgICAgICAgICAgICAgbW9kYWwuZGVja3NMaXN0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Lm5leHRDYXJkKG1vZGFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIG1vZGFsLnJlc3BvbnNlRGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgbW9kYWwucmVzZXRCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICBtb2RhbC50aXRsZUVsLnNldFRleHQoXG4gICAgICAgICAgICBgJHt0aGlzLmRlY2tOYW1lfTogJHt0aGlzLmR1ZUZsYXNoY2FyZHNDb3VudCArIHRoaXMubmV3Rmxhc2hjYXJkc0NvdW50fWBcbiAgICAgICAgKTtcblxuICAgICAgICBtb2RhbC5hbnN3ZXJCdG4uc3R5bGUuZGlzcGxheSA9IFwiaW5pdGlhbFwiO1xuICAgICAgICBtb2RhbC5mbGFzaGNhcmRWaWV3LmVtcHR5KCk7XG4gICAgICAgIG1vZGFsLm1vZGUgPSBGbGFzaGNhcmRNb2RhbE1vZGUuRnJvbnQ7XG5cbiAgICAgICAgbGV0IGludGVydmFsID0gMS4wLFxuICAgICAgICAgICAgZWFzZTogbnVtYmVyID0gbW9kYWwucGx1Z2luLmRhdGEuc2V0dGluZ3MuYmFzZUVhc2UsXG4gICAgICAgICAgICBkZWxheUJlZm9yZVJldmlldyA9IDA7XG4gICAgICAgIGlmICh0aGlzLmR1ZUZsYXNoY2FyZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKG1vZGFsLnBsdWdpbi5kYXRhLnNldHRpbmdzLnJhbmRvbWl6ZUNhcmRPcmRlcikge1xuICAgICAgICAgICAgICAgIG1vZGFsLmN1cnJlbnRDYXJkSWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5kdWVGbGFzaGNhcmRzLmxlbmd0aCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1vZGFsLmN1cnJlbnRDYXJkSWR4ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1vZGFsLmN1cnJlbnRDYXJkID0gdGhpcy5kdWVGbGFzaGNhcmRzW21vZGFsLmN1cnJlbnRDYXJkSWR4XTtcbiAgICAgICAgICAgIG1vZGFsLnJlbmRlck1hcmtkb3duV3JhcHBlcihtb2RhbC5jdXJyZW50Q2FyZC5mcm9udCwgbW9kYWwuZmxhc2hjYXJkVmlldyk7XG5cbiAgICAgICAgICAgIGludGVydmFsID0gbW9kYWwuY3VycmVudENhcmQuaW50ZXJ2YWw7XG4gICAgICAgICAgICBlYXNlID0gbW9kYWwuY3VycmVudENhcmQuZWFzZTtcbiAgICAgICAgICAgIGRlbGF5QmVmb3JlUmV2aWV3ID0gbW9kYWwuY3VycmVudENhcmQuZGVsYXlCZWZvcmVSZXZpZXc7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5uZXdGbGFzaGNhcmRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmIChtb2RhbC5wbHVnaW4uZGF0YS5zZXR0aW5ncy5yYW5kb21pemVDYXJkT3JkZXIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwaWNrZWRDYXJkSWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5uZXdGbGFzaGNhcmRzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgbW9kYWwuY3VycmVudENhcmRJZHggPSBwaWNrZWRDYXJkSWR4O1xuXG4gICAgICAgICAgICAgICAgLy8gbG9vayBmb3IgZmlyc3QgdW5zY2hlZHVsZWQgc2libGluZ1xuICAgICAgICAgICAgICAgIGNvbnN0IHBpY2tlZENhcmQ6IENhcmQgPSB0aGlzLm5ld0ZsYXNoY2FyZHNbcGlja2VkQ2FyZElkeF07XG4gICAgICAgICAgICAgICAgbGV0IGlkeCA9IHBpY2tlZENhcmRJZHg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGlkeCA+PSAwICYmIHBpY2tlZENhcmQuc2libGluZ3MuaW5jbHVkZXModGhpcy5uZXdGbGFzaGNhcmRzW2lkeF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5uZXdGbGFzaGNhcmRzW2lkeF0uaXNEdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsLmN1cnJlbnRDYXJkSWR4ID0gaWR4O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlkeC0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbW9kYWwuY3VycmVudENhcmRJZHggPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtb2RhbC5jdXJyZW50Q2FyZCA9IHRoaXMubmV3Rmxhc2hjYXJkc1ttb2RhbC5jdXJyZW50Q2FyZElkeF07XG4gICAgICAgICAgICBtb2RhbC5yZW5kZXJNYXJrZG93bldyYXBwZXIobW9kYWwuY3VycmVudENhcmQuZnJvbnQsIG1vZGFsLmZsYXNoY2FyZFZpZXcpO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuICAgICAgICAgICAgICAgICAgICBtb2RhbC5wbHVnaW4uZWFzZUJ5UGF0aCxcbiAgICAgICAgICAgICAgICAgICAgbW9kYWwuY3VycmVudENhcmQubm90ZS5wYXRoXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgZWFzZSA9IG1vZGFsLnBsdWdpbi5lYXNlQnlQYXRoW21vZGFsLmN1cnJlbnRDYXJkLm5vdGUucGF0aF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBoYXJkSW50ZXJ2YWw6IG51bWJlciA9IHNjaGVkdWxlKFxuICAgICAgICAgICAgUmV2aWV3UmVzcG9uc2UuSGFyZCxcbiAgICAgICAgICAgIGludGVydmFsLFxuICAgICAgICAgICAgZWFzZSxcbiAgICAgICAgICAgIGRlbGF5QmVmb3JlUmV2aWV3LFxuICAgICAgICAgICAgbW9kYWwucGx1Z2luLmRhdGEuc2V0dGluZ3NcbiAgICAgICAgKS5pbnRlcnZhbDtcbiAgICAgICAgY29uc3QgZ29vZEludGVydmFsOiBudW1iZXIgPSBzY2hlZHVsZShcbiAgICAgICAgICAgIFJldmlld1Jlc3BvbnNlLkdvb2QsXG4gICAgICAgICAgICBpbnRlcnZhbCxcbiAgICAgICAgICAgIGVhc2UsXG4gICAgICAgICAgICBkZWxheUJlZm9yZVJldmlldyxcbiAgICAgICAgICAgIG1vZGFsLnBsdWdpbi5kYXRhLnNldHRpbmdzXG4gICAgICAgICkuaW50ZXJ2YWw7XG4gICAgICAgIGNvbnN0IGVhc3lJbnRlcnZhbDogbnVtYmVyID0gc2NoZWR1bGUoXG4gICAgICAgICAgICBSZXZpZXdSZXNwb25zZS5FYXN5LFxuICAgICAgICAgICAgaW50ZXJ2YWwsXG4gICAgICAgICAgICBlYXNlLFxuICAgICAgICAgICAgZGVsYXlCZWZvcmVSZXZpZXcsXG4gICAgICAgICAgICBtb2RhbC5wbHVnaW4uZGF0YS5zZXR0aW5nc1xuICAgICAgICApLmludGVydmFsO1xuXG4gICAgICAgIGlmIChtb2RhbC5pZ25vcmVTdGF0cykge1xuICAgICAgICAgICAgLy8gU2FtZSBmb3IgbW9iaWxlL2Rlc2t0b3BcbiAgICAgICAgICAgIG1vZGFsLmhhcmRCdG4uc2V0VGV4dChgJHttb2RhbC5wbHVnaW4uZGF0YS5zZXR0aW5ncy5mbGFzaGNhcmRIYXJkVGV4dH1gKTtcbiAgICAgICAgICAgIG1vZGFsLmVhc3lCdG4uc2V0VGV4dChgJHttb2RhbC5wbHVnaW4uZGF0YS5zZXR0aW5ncy5mbGFzaGNhcmRFYXN5VGV4dH1gKTtcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0Zm9ybS5pc01vYmlsZSkge1xuICAgICAgICAgICAgbW9kYWwuaGFyZEJ0bi5zZXRUZXh0KHRleHRJbnRlcnZhbChoYXJkSW50ZXJ2YWwsIHRydWUpKTtcbiAgICAgICAgICAgIG1vZGFsLmdvb2RCdG4uc2V0VGV4dCh0ZXh0SW50ZXJ2YWwoZ29vZEludGVydmFsLCB0cnVlKSk7XG4gICAgICAgICAgICBtb2RhbC5lYXN5QnRuLnNldFRleHQodGV4dEludGVydmFsKGVhc3lJbnRlcnZhbCwgdHJ1ZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW9kYWwuaGFyZEJ0bi5zZXRUZXh0KFxuICAgICAgICAgICAgICAgIGAke21vZGFsLnBsdWdpbi5kYXRhLnNldHRpbmdzLmZsYXNoY2FyZEhhcmRUZXh0fSAtICR7dGV4dEludGVydmFsKFxuICAgICAgICAgICAgICAgICAgICBoYXJkSW50ZXJ2YWwsXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICAgICAgKX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbW9kYWwuZ29vZEJ0bi5zZXRUZXh0KFxuICAgICAgICAgICAgICAgIGAke21vZGFsLnBsdWdpbi5kYXRhLnNldHRpbmdzLmZsYXNoY2FyZEdvb2RUZXh0fSAtICR7dGV4dEludGVydmFsKFxuICAgICAgICAgICAgICAgICAgICBnb29kSW50ZXJ2YWwsXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICAgICAgKX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbW9kYWwuZWFzeUJ0bi5zZXRUZXh0KFxuICAgICAgICAgICAgICAgIGAke21vZGFsLnBsdWdpbi5kYXRhLnNldHRpbmdzLmZsYXNoY2FyZEVhc3lUZXh0fSAtICR7dGV4dEludGVydmFsKFxuICAgICAgICAgICAgICAgICAgICBlYXN5SW50ZXJ2YWwsXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICAgICAgKX1gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1vZGFsLnBsdWdpbi5kYXRhLnNldHRpbmdzLnNob3dDb250ZXh0SW5DYXJkcylcbiAgICAgICAgICAgIG1vZGFsLmNvbnRleHRWaWV3LnNldFRleHQobW9kYWwuY3VycmVudENhcmQuY29udGV4dCk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWxsQ2FyZHMoZGVjazogRGVjayk6IENhcmRbXSB7XG4gICAgbGV0IGNhcmRzSW5TdWJEZWNrczogQ2FyZFtdID0gZGVjay5zdWJkZWNrcy5mbGF0TWFwKGFsbENhcmRzKTtcbiAgICByZXR1cm4gZGVjay5uZXdGbGFzaGNhcmRzLmNvbmNhdChkZWNrLmR1ZUZsYXNoY2FyZHMsIGNhcmRzSW5TdWJEZWNrcylcbn1cbiIsICJpbXBvcnQgeyBURmlsZSB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5pbXBvcnQgeyBTUlNldHRpbmdzIH0gZnJvbSBcInNyYy9zZXR0aW5nc1wiO1xuaW1wb3J0IHsgdCB9IGZyb20gXCJzcmMvbGFuZy9oZWxwZXJzXCI7XG5cbmV4cG9ydCBlbnVtIFJldmlld1Jlc3BvbnNlIHtcbiAgRWFzeSxcbiAgR29vZCxcbiAgSGFyZCxcbiAgUmVzZXQsXG59XG5cbi8vIEZsYXNoY2FyZHNcblxuZXhwb3J0IGludGVyZmFjZSBDYXJkIHtcbiAgZWRpdExhdGVyOiBib29sZWFuO1xuICAvLyBzY2hlZHVsaW5nXG4gIGlzRHVlOiBib29sZWFuO1xuICBpbnRlcnZhbD86IG51bWJlcjtcbiAgZWFzZT86IG51bWJlcjtcbiAgZGVsYXlCZWZvcmVSZXZpZXc/OiBudW1iZXI7XG4gIHN0YXRzPzogQ2FyZFN0YXRzO1xuICAvLyBub3RlXG4gIG5vdGU6IFRGaWxlO1xuICBsaW5lTm86IG51bWJlcjtcbiAgLy8gdmlzdWFsc1xuICBmcm9udDogc3RyaW5nO1xuICBiYWNrOiBzdHJpbmc7XG4gIGNhcmRUZXh0OiBzdHJpbmc7XG4gIGNvbnRleHQ6IHN0cmluZztcbiAgLy8gdHlwZXNcbiAgY2FyZFR5cGU6IENhcmRUeXBlO1xuICAvLyBpbmZvcm1hdGlvbiBmb3Igc2libGluZyBjYXJkc1xuICBzaWJsaW5nSWR4OiBudW1iZXI7XG4gIHNpYmxpbmdzOiBDYXJkW107XG59XG5cbmV4cG9ydCBlbnVtIENhcmRUeXBlIHtcbiAgU2luZ2xlTGluZUJhc2ljLFxuICBTaW5nbGVMaW5lUmV2ZXJzZWQsXG4gIE11bHRpTGluZUJhc2ljLFxuICBNdWx0aUxpbmVSZXZlcnNlZCxcbiAgQ2xvemUsXG59XG5cbnR5cGUgSW50ZXJ2YWwgPSBudW1iZXI7XG50eXBlIEVhc2UgPSBudW1iZXI7XG50eXBlIERlbGF5QmVmb3JlUmV2aWV3ID0gbnVtYmVyO1xuXG5leHBvcnQgdHlwZSBDYXJkU3RhdHMgPSB7XG4gIGludGVydmFsOiBJbnRlcnZhbDtcbiAgZWFzZTogRWFzZTtcbiAgZGVsYXlCZWZvcmVSZXZpZXc6IERlbGF5QmVmb3JlUmV2aWV3O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNjaGVkdWxlIChcbiAgcmVzcG9uc2U6IFJldmlld1Jlc3BvbnNlLFxuICBjYXJkU3RhdHM6IENhcmRTdGF0cyxcbiAgc2V0dGluZ3M6IFNSU2V0dGluZ3MsXG4gIGR1ZURhdGVzPzogUmVjb3JkPG51bWJlciwgbnVtYmVyPlxuKTogQ2FyZFN0YXRzIHtcbiAgbGV0IGludGVydmFsID0gY2FyZFN0YXRzLmludGVydmFsO1xuICBsZXQgZWFzZSA9IGNhcmRTdGF0cy5lYXNlO1xuICBsZXQgZGVsYXlCZWZvcmVSZXZpZXcgPSBNYXRoLm1heCgwLCBNYXRoLmZsb29yKGNhcmRTdGF0cy5kZWxheUJlZm9yZVJldmlldyAvICgyNCAqIDM2MDAgKiAxMDAwKSkpO1xuXG4gIHN3aXRjaCAocmVzcG9uc2UpIHtcbiAgICBjYXNlIFJldmlld1Jlc3BvbnNlLkVhc3k6IHtcbiAgICAgIGVhc2UgKz0gMjA7XG4gICAgICBpbnRlcnZhbCA9IHNldHRpbmdzLmVhc3lCb251cyAqICgoaW50ZXJ2YWwgKyBkZWxheUJlZm9yZVJldmlldykgKiBlYXNlKSAvIDEwMDtcbiAgICB9XG4gICAgY2FzZSBSZXZpZXdSZXNwb25zZS5Hb29kOiB7XG4gICAgICBpbnRlcnZhbCA9ICgoaW50ZXJ2YWwgKyBkZWxheUJlZm9yZVJldmlldyAvIDIpICogZWFzZSkgLyAxMDA7XG4gICAgfVxuICAgIGNhc2UgUmV2aWV3UmVzcG9uc2UuSGFyZDoge1xuICAgICAgZWFzZSA9IE1hdGgubWF4KDEzMCwgZWFzZSAtIDIwKTtcbiAgICAgIGludGVydmFsID0gTWF0aC5tYXgoXG4gICAgICAgIDEsXG4gICAgICAgIChpbnRlcnZhbCArIGRlbGF5QmVmb3JlUmV2aWV3IC8gNCkgKiBzZXR0aW5ncy5sYXBzZXNJbnRlcnZhbENoYW5nZVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvLyByZXBsYWNlcyByYW5kb20gZnV6eiB3aXRoIGxvYWQgYmFsYW5jaW5nIG92ZXIgdGhlIGZ1enogaW50ZXJ2YWxcbiAgaWYgKGR1ZURhdGVzICE9PSB1bmRlZmluZWQpIHtcbiAgICBpbnRlcnZhbCA9IE1hdGgucm91bmQoaW50ZXJ2YWwpO1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGR1ZURhdGVzLCBpbnRlcnZhbCkpIHtcbiAgICAgIGR1ZURhdGVzW2ludGVydmFsXSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGRpc2FibGUgZnV6emluZyBmb3Igc21hbGwgaW50ZXJ2YWxzXG4gICAgICBpZiAoaW50ZXJ2YWwgPiA0KSB7XG4gICAgICAgIGxldCBmdXp6ID0gMDtcbiAgICAgICAgaWYgKGludGVydmFsIDwgNykgZnV6eiA9IDE7XG4gICAgICAgIGVsc2UgaWYgKGludGVydmFsIDwgMzApIGZ1enogPSBNYXRoLm1heCgyLCBNYXRoLmZsb29yKGludGVydmFsICogMC4xNSkpO1xuICAgICAgICBlbHNlIGZ1enogPSBNYXRoLm1heCg0LCBNYXRoLmZsb29yKGludGVydmFsICogMC4wNSkpO1xuXG4gICAgICAgIGNvbnN0IG9yaWdpbmFsSW50ZXJ2YWwgPSBpbnRlcnZhbDtcbiAgICAgICAgb3V0ZXI6IGZvciAobGV0IGkgPSAxOyBpIDw9IGZ1eno7IGkrKykge1xuICAgICAgICAgIGZvciAoY29uc3QgaXZsIG9mIFtvcmlnaW5hbEludGVydmFsIC0gaSwgb3JpZ2luYWxJbnRlcnZhbCArIGldKSB7XG4gICAgICAgICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChkdWVEYXRlcywgaXZsKSkge1xuICAgICAgICAgICAgICBkdWVEYXRlc1tpdmxdID0gMDtcbiAgICAgICAgICAgICAgaW50ZXJ2YWwgPSBpdmw7XG4gICAgICAgICAgICAgIGJyZWFrIG91dGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGR1ZURhdGVzW2l2bF0gPCBkdWVEYXRlc1tpbnRlcnZhbF0pIGludGVydmFsID0gaXZsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGR1ZURhdGVzW2ludGVydmFsXSsrO1xuICB9XG5cbiAgaW50ZXJ2YWwgPSBNYXRoLm1pbihpbnRlcnZhbCwgc2V0dGluZ3MubWF4aW11bUludGVydmFsKTtcbiAgaW50ZXJ2YWwgPSBNYXRoLnJvdW5kKGludGVydmFsICogMTApIC8gMTA7XG5cbiAgcmV0dXJuIHsgaW50ZXJ2YWwsIGVhc2UsIGRlbGF5QmVmb3JlUmV2aWV3IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXh0SW50ZXJ2YWwgKGludGVydmFsOiBudW1iZXIsIGlzTW9iaWxlOiBib29sZWFuKTogc3RyaW5nIHtcbiAgaWYgKGludGVydmFsID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdChcIk5FV1wiKTtcbiAgfVxuXG4gIGNvbnN0IG06IG51bWJlciA9IE1hdGgucm91bmQoaW50ZXJ2YWwgLyAzLjA0Mzc1KSAvIDEwLFxuICAgIHk6IG51bWJlciA9IE1hdGgucm91bmQoaW50ZXJ2YWwgLyAzNi41MjUpIC8gMTA7XG5cbiAgaWYgKGlzTW9iaWxlKSB7XG4gICAgaWYgKG0gPCAxLjApIHJldHVybiB0KFwiREFZU19TVFJfSVZMX01PQklMRVwiLCB7IGludGVydmFsIH0pO1xuICAgIGVsc2UgaWYgKHkgPCAxLjApIHJldHVybiB0KFwiTU9OVEhTX1NUUl9JVkxfTU9CSUxFXCIsIHsgaW50ZXJ2YWw6IG0gfSk7XG4gICAgZWxzZSByZXR1cm4gdChcIllFQVJTX1NUUl9JVkxfTU9CSUxFXCIsIHsgaW50ZXJ2YWw6IHkgfSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKG0gPCAxLjApIHJldHVybiB0KFwiREFZU19TVFJfSVZMXCIsIHsgaW50ZXJ2YWwgfSk7XG4gICAgZWxzZSBpZiAoeSA8IDEuMCkgcmV0dXJuIHQoXCJNT05USFNfU1RSX0lWTFwiLCB7IGludGVydmFsOiBtIH0pO1xuICAgIGVsc2UgcmV0dXJuIHQoXCJZRUFSU19TVFJfSVZMXCIsIHsgaW50ZXJ2YWw6IHkgfSk7XG4gIH1cbn1cbiIsICJleHBvcnQgY29uc3QgU0NIRURVTElOR19JTkZPX1JFR0VYID1cbiAgICAvXi0tLVxcbigoPzouKlxcbikqKXNyLWR1ZTogKC4rKVxcbnNyLWludGVydmFsOiAoXFxkKylcXG5zci1lYXNlOiAoXFxkKylcXG4oKD86LipcXG4pPyktLS0vO1xuZXhwb3J0IGNvbnN0IFlBTUxfRlJPTlRfTUFUVEVSX1JFR0VYID0gL14tLS1cXG4oKD86LipcXG4pKj8pLS0tLztcblxuZXhwb3J0IGNvbnN0IE1VTFRJX1NDSEVEVUxJTkdfRVhUUkFDVE9SID0gLyEoW1xcZC1dKyksKFxcZCspLChcXGQrKS9nbTtcbmV4cG9ydCBjb25zdCBMRUdBQ1lfU0NIRURVTElOR19FWFRSQUNUT1IgPSAvPCEtLVNSOihbXFxkLV0rKSwoXFxkKyksKFxcZCspLS0+L2dtO1xuXG5leHBvcnQgY29uc3QgSU1BR0VfRk9STUFUUyA9IFtcbiAgICBcImpwZ1wiLFxuICAgIFwianBlZ1wiLFxuICAgIFwiZ2lmXCIsXG4gICAgXCJwbmdcIixcbiAgICBcInN2Z1wiLFxuICAgIFwid2VicFwiLFxuICAgIFwiYXBuZ1wiLFxuICAgIFwiYXZpZlwiLFxuICAgIFwiamZpZlwiLFxuICAgIFwicGpwZWdcIixcbiAgICBcInBqcFwiLFxuICAgIFwiYm1wXCIsXG5dO1xuZXhwb3J0IGNvbnN0IEFVRElPX0ZPUk1BVFMgPSBbXCJtcDNcIiwgXCJ3ZWJtXCIsIFwibTRhXCIsIFwid2F2XCIsIFwib2dnXCJdO1xuZXhwb3J0IGNvbnN0IFZJREVPX0ZPUk1BVFMgPSBbXCJtcDRcIiwgXCJta3ZcIiwgXCJhdmlcIiwgXCJtb3ZcIl07XG5cbmV4cG9ydCBjb25zdCBDT0xMQVBTRV9JQ09OID1cbiAgICAnPHN2ZyB2aWV3Qm94PVwiMCAwIDEwMCAxMDBcIiB3aWR0aD1cIjhcIiBoZWlnaHQ9XCI4XCIgY2xhc3M9XCJyaWdodC10cmlhbmdsZVwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTk0LjksMjAuOGMtMS40LTIuNS00LjEtNC4xLTcuMS00LjFIMTIuMmMtMywwLTUuNywxLjYtNy4xLDQuMWMtMS4zLDIuNC0xLjIsNS4yLDAuMiw3LjZMNDMuMSw4OGMxLjUsMi4zLDQsMy43LDYuOSwzLjcgczUuNC0xLjQsNi45LTMuN2wzNy44LTU5LjZDOTYuMSwyNiw5Ni4yLDIzLjIsOTQuOSwyMC44TDk0LjksMjAuOHpcIj48L3BhdGg+PC9zdmc+JztcbiIsICJ0eXBlIEhleCA9IG51bWJlcjtcblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzY5MDE5ODc0XG50eXBlIE9iamVjdFR5cGUgPSBSZWNvcmQ8UHJvcGVydHlLZXksIHVua25vd24+O1xudHlwZSBQaWNrQnlWYWx1ZTxPQkpfVCwgVkFMVUVfVD4gPSAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNTUxNTMwMDBcbiAgICBQaWNrPE9CSl9ULCB7IFtLIGluIGtleW9mIE9CSl9UXTogT0JKX1RbS10gZXh0ZW5kcyBWQUxVRV9UID8gSyA6IG5ldmVyIH1ba2V5b2YgT0JKX1RdPjtcbnR5cGUgT2JqZWN0RW50cmllczxPQkpfVD4gPSAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNjAxNDIwOTVcbiAgICB7IFtLIGluIGtleW9mIE9CSl9UXTogW2tleW9mIFBpY2tCeVZhbHVlPE9CSl9ULCBPQkpfVFtLXT4sIE9CSl9UW0tdXSB9W2tleW9mIE9CSl9UXVtdO1xuZXhwb3J0IGZ1bmN0aW9uIGdldFR5cGVkT2JqZWN0RW50cmllczxPQkpfVCBleHRlbmRzIE9iamVjdFR5cGU+KG9iajogT0JKX1QpOiBPYmplY3RFbnRyaWVzPE9CSl9UPiB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKG9iaikgYXMgT2JqZWN0RW50cmllczxPQkpfVD47XG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSBvZiB0aGUga2V5cyBvZiBhbiBvYmplY3Qgd2l0aCB0eXBlIGAoa2V5b2YgVClbXWBcbiAqIGluc3RlYWQgb2YgYHN0cmluZ1tdYFxuICogUGxlYXNlIHNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNTk0NTkwMDAgZm9yIG1vcmUgZGV0YWlsc1xuICpcbiAqIEBwYXJhbSBvYmogLSBBbiBvYmplY3RcbiAqIEByZXR1cm5zIEFuIGFycmF5IG9mIHRoZSBrZXlzIG9mIGBvYmpgIHdpdGggdHlwZSBgKGtleW9mIFQpW11gXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRLZXlzUHJlc2VydmVUeXBlID0gT2JqZWN0LmtleXMgYXMgPFQgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPj4oXG4gICAgb2JqOiBUXG4pID0+IEFycmF5PGtleW9mIFQ+O1xuXG4vKipcbiAqIEVzY2FwZXMgdGhlIGlucHV0IHN0cmluZyBzbyB0aGF0IGl0IGNhbiBiZSBjb252ZXJ0ZWQgdG8gYSByZWdleFxuICogd2hpbGUgbWFraW5nIHN1cmUgdGhhdCBzeW1ib2xzIGxpa2UgYD9gIGFuZCBgKmAgYXJlbid0IGludGVycHJldGVkXG4gKiBhcyByZWdleCBzcGVjaWFscy5cbiAqIFBsZWFzZSBzZWUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzY5Njk0ODYgZm9yIG1vcmUgZGV0YWlsc1xuICpcbiAqIEBwYXJhbSBzdHIgLSBUaGUgc3RyaW5nIHRvIGJlIGVzY2FwZWRcbiAqIEByZXR1cm5zIFRoZSBlc2NhcGVkIHN0cmluZ1xuICovXG5leHBvcnQgY29uc3QgZXNjYXBlUmVnZXhTdHJpbmcgPSAodGV4dDogc3RyaW5nKTogc3RyaW5nID0+XG4gICAgdGV4dC5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgXCJcXFxcJCZcIik7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgY3lyYjUzIGhhc2ggKGhleCBzdHJpbmcpIG9mIHRoZSBpbnB1dCBzdHJpbmdcbiAqIFBsZWFzZSBzZWUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzUyMTcxNDgwIGZvciBtb3JlIGRldGFpbHNcbiAqXG4gKiBAcGFyYW0gc3RyIC0gVGhlIHN0cmluZyB0byBiZSBoYXNoZWRcbiAqIEBwYXJhbSBzZWVkIC0gVGhlIHNlZWQgZm9yIHRoZSBjeXJiNTMgZnVuY3Rpb25cbiAqIEByZXR1cm5zIFRoZSBjeXJiNTMgaGFzaCAoaGV4IHN0cmluZykgb2YgYHN0cmAgc2VlZGVkIHVzaW5nIGBzZWVkYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3lyYjUzKHN0cjogc3RyaW5nLCBzZWVkID0gMCk6IHN0cmluZyB7XG4gICAgbGV0IGgxOiBIZXggPSAweGRlYWRiZWVmIF4gc2VlZCxcbiAgICAgICAgaDI6IEhleCA9IDB4NDFjNmNlNTcgXiBzZWVkO1xuICAgIGZvciAobGV0IGkgPSAwLCBjaDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICBjaCA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBoMSA9IE1hdGguaW11bChoMSBeIGNoLCAyNjU0NDM1NzYxKTtcbiAgICAgICAgaDIgPSBNYXRoLmltdWwoaDIgXiBjaCwgMTU5NzMzNDY3Nyk7XG4gICAgfVxuICAgIGgxID0gTWF0aC5pbXVsKGgxIF4gKGgxID4+PiAxNiksIDIyNDY4MjI1MDcpIF4gTWF0aC5pbXVsKGgyIF4gKGgyID4+PiAxMyksIDMyNjY0ODk5MDkpO1xuICAgIGgyID0gTWF0aC5pbXVsKGgyIF4gKGgyID4+PiAxNiksIDIyNDY4MjI1MDcpIF4gTWF0aC5pbXVsKGgxIF4gKGgxID4+PiAxMyksIDMyNjY0ODk5MDkpO1xuICAgIHJldHVybiAoNDI5NDk2NzI5NiAqICgyMDk3MTUxICYgaDIpICsgKGgxID4+PiAwKSkudG9TdHJpbmcoMTYpO1xufVxuIiwgImltcG9ydCB7IEl0ZW1WaWV3LCBXb3Jrc3BhY2VMZWFmLCBNZW51LCBURmlsZSB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5pbXBvcnQgdHlwZSBTUlBsdWdpbiBmcm9tIFwic3JjL21haW5cIjtcbmltcG9ydCB7IENPTExBUFNFX0lDT04gfSBmcm9tIFwic3JjL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgUmV2aWV3RGVjayB9IGZyb20gXCJzcmMvcmV2aWV3LWRlY2tcIjtcbmltcG9ydCB7IHQgfSBmcm9tIFwic3JjL2xhbmcvaGVscGVyc1wiO1xuXG5leHBvcnQgY29uc3QgUkVWSUVXX1FVRVVFX1ZJRVdfVFlQRSA9IFwicmV2aWV3LXF1ZXVlLWxpc3Qtdmlld1wiO1xuXG5leHBvcnQgY2xhc3MgUmV2aWV3UXVldWVMaXN0VmlldyBleHRlbmRzIEl0ZW1WaWV3IHtcbiAgICBwcml2YXRlIHBsdWdpbjogU1JQbHVnaW47XG5cbiAgICBjb25zdHJ1Y3RvcihsZWFmOiBXb3Jrc3BhY2VMZWFmLCBwbHVnaW46IFNSUGx1Z2luKSB7XG4gICAgICAgIHN1cGVyKGxlYWYpO1xuXG4gICAgICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQodGhpcy5hcHAud29ya3NwYWNlLm9uKFwiZmlsZS1vcGVuXCIsICgpID0+IHRoaXMucmVkcmF3KCkpKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KHRoaXMuYXBwLnZhdWx0Lm9uKFwicmVuYW1lXCIsICgpID0+IHRoaXMucmVkcmF3KCkpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Vmlld1R5cGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFJFVklFV19RVUVVRV9WSUVXX1RZUEU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERpc3BsYXlUZXh0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0KFwiTk9URVNfUkVWSUVXX1FVRVVFXCIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRJY29uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBcIlNwYWNlZFJlcEljb25cIjtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25IZWFkZXJNZW51KG1lbnU6IE1lbnUpOiB2b2lkIHtcbiAgICAgICAgbWVudS5hZGRJdGVtKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLnNldFRpdGxlKHQoXCJDTE9TRVwiKSlcbiAgICAgICAgICAgICAgICAuc2V0SWNvbihcImNyb3NzXCIpXG4gICAgICAgICAgICAgICAgLm9uQ2xpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2UuZGV0YWNoTGVhdmVzT2ZUeXBlKFJFVklFV19RVUVVRV9WSUVXX1RZUEUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVkcmF3KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBhY3RpdmVGaWxlOiBURmlsZSB8IG51bGwgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlRmlsZSgpO1xuXG4gICAgICAgIGNvbnN0IHJvb3RFbDogSFRNTEVsZW1lbnQgPSBjcmVhdGVEaXYoXCJuYXYtZm9sZGVyIG1vZC1yb290XCIpO1xuICAgICAgICBjb25zdCBjaGlsZHJlbkVsOiBIVE1MRWxlbWVudCA9IHJvb3RFbC5jcmVhdGVEaXYoXCJuYXYtZm9sZGVyLWNoaWxkcmVuXCIpO1xuXG4gICAgICAgIGZvciAoY29uc3QgZGVja0tleSBpbiB0aGlzLnBsdWdpbi5yZXZpZXdEZWNrcykge1xuICAgICAgICAgICAgY29uc3QgZGVjazogUmV2aWV3RGVjayA9IHRoaXMucGx1Z2luLnJldmlld0RlY2tzW2RlY2tLZXldO1xuXG4gICAgICAgICAgICBjb25zdCBkZWNrQ29sbGFwc2VkID0gIWRlY2suYWN0aXZlRm9sZGVycy5oYXMoZGVjay5kZWNrTmFtZSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGRlY2tGb2xkZXJFbDogSFRNTEVsZW1lbnQgPSB0aGlzLmNyZWF0ZVJpZ2h0UGFuZUZvbGRlcihcbiAgICAgICAgICAgICAgICBjaGlsZHJlbkVsLFxuICAgICAgICAgICAgICAgIGRlY2tLZXksXG4gICAgICAgICAgICAgICAgZGVja0NvbGxhcHNlZCxcbiAgICAgICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICAgICBkZWNrXG4gICAgICAgICAgICApLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJuYXYtZm9sZGVyLWNoaWxkcmVuXCIpWzBdIGFzIEhUTUxFbGVtZW50O1xuXG4gICAgICAgICAgICBpZiAoZGVjay5uZXdOb3Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3Tm90ZXNGb2xkZXJFbDogSFRNTEVsZW1lbnQgPSB0aGlzLmNyZWF0ZVJpZ2h0UGFuZUZvbGRlcihcbiAgICAgICAgICAgICAgICAgICAgZGVja0ZvbGRlckVsLFxuICAgICAgICAgICAgICAgICAgICB0KFwiTkVXXCIpLFxuICAgICAgICAgICAgICAgICAgICAhZGVjay5hY3RpdmVGb2xkZXJzLmhhcyh0KFwiTkVXXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgZGVja0NvbGxhcHNlZCxcbiAgICAgICAgICAgICAgICAgICAgZGVja1xuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5ld0ZpbGUgb2YgZGVjay5uZXdOb3Rlcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlSXNPcGVuID0gYWN0aXZlRmlsZSAmJiBuZXdGaWxlLnBhdGggPT09IGFjdGl2ZUZpbGUucGF0aDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGVJc09wZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlY2suYWN0aXZlRm9sZGVycy5hZGQoZGVjay5kZWNrTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWNrLmFjdGl2ZUZvbGRlcnMuYWRkKHQoXCJORVdcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VGb2xkZXJJY29uVG9FeHBhbmRlZChuZXdOb3Rlc0ZvbGRlckVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRm9sZGVySWNvblRvRXhwYW5kZWQoZGVja0ZvbGRlckVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVJpZ2h0UGFuZUZpbGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdOb3Rlc0ZvbGRlckVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3RmlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVJc09wZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAhZGVjay5hY3RpdmVGb2xkZXJzLmhhcyh0KFwiTkVXXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpblxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRlY2suc2NoZWR1bGVkTm90ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vdzogbnVtYmVyID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICBsZXQgY3VyclVuaXggPSAtMTtcbiAgICAgICAgICAgICAgICBsZXQgc2NoZWRGb2xkZXJFbDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgZm9sZGVyVGl0bGUgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1heERheXNUb1JlbmRlcjogbnVtYmVyID0gdGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5tYXhORGF5c05vdGVzUmV2aWV3UXVldWU7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHNOb3RlIG9mIGRlY2suc2NoZWR1bGVkTm90ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNOb3RlLmR1ZVVuaXggIT0gY3VyclVuaXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5EYXlzOiBudW1iZXIgPSBNYXRoLmNlaWwoKHNOb3RlLmR1ZVVuaXggLSBub3cpIC8gKDI0ICogMzYwMCAqIDEwMDApKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5EYXlzID4gbWF4RGF5c1RvUmVuZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuRGF5cyA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2xkZXJUaXRsZSA9IHQoXCJZRVNURVJEQVlcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5EYXlzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9sZGVyVGl0bGUgPSB0KFwiVE9EQVlcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5EYXlzID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9sZGVyVGl0bGUgPSB0KFwiVE9NT1JST1dcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbGRlclRpdGxlID0gbmV3IERhdGUoc05vdGUuZHVlVW5peCkudG9EYXRlU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVkRm9sZGVyRWwgPSB0aGlzLmNyZWF0ZVJpZ2h0UGFuZUZvbGRlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWNrRm9sZGVyRWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9sZGVyVGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIWRlY2suYWN0aXZlRm9sZGVycy5oYXMoZm9sZGVyVGl0bGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlY2tDb2xsYXBzZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVja1xuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJVbml4ID0gc05vdGUuZHVlVW5peDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVJc09wZW4gPSBhY3RpdmVGaWxlICYmIHNOb3RlLm5vdGUucGF0aCA9PT0gYWN0aXZlRmlsZS5wYXRoO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZUlzT3Blbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVjay5hY3RpdmVGb2xkZXJzLmFkZChkZWNrLmRlY2tOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlY2suYWN0aXZlRm9sZGVycy5hZGQoZm9sZGVyVGl0bGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VGb2xkZXJJY29uVG9FeHBhbmRlZChzY2hlZEZvbGRlckVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRm9sZGVySWNvblRvRXhwYW5kZWQoZGVja0ZvbGRlckVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlUmlnaHRQYW5lRmlsZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVkRm9sZGVyRWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBzTm90ZS5ub3RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZUlzT3BlbixcbiAgICAgICAgICAgICAgICAgICAgICAgICFkZWNrLmFjdGl2ZUZvbGRlcnMuaGFzKGZvbGRlclRpdGxlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpblxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbnRlbnRFbDogRWxlbWVudCA9IHRoaXMuY29udGFpbmVyRWwuY2hpbGRyZW5bMV07XG4gICAgICAgIGNvbnRlbnRFbC5lbXB0eSgpO1xuICAgICAgICBjb250ZW50RWwuYXBwZW5kQ2hpbGQocm9vdEVsKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVJpZ2h0UGFuZUZvbGRlcihcbiAgICAgICAgcGFyZW50RWw6IEhUTUxFbGVtZW50LFxuICAgICAgICBmb2xkZXJUaXRsZTogc3RyaW5nLFxuICAgICAgICBjb2xsYXBzZWQ6IGJvb2xlYW4sXG4gICAgICAgIGhpZGRlbjogYm9vbGVhbixcbiAgICAgICAgZGVjazogUmV2aWV3RGVja1xuICAgICk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3QgZm9sZGVyRWw6IEhUTUxEaXZFbGVtZW50ID0gcGFyZW50RWwuY3JlYXRlRGl2KFwibmF2LWZvbGRlclwiKTtcbiAgICAgICAgY29uc3QgZm9sZGVyVGl0bGVFbDogSFRNTERpdkVsZW1lbnQgPSBmb2xkZXJFbC5jcmVhdGVEaXYoXCJuYXYtZm9sZGVyLXRpdGxlXCIpO1xuICAgICAgICBjb25zdCBjaGlsZHJlbkVsOiBIVE1MRGl2RWxlbWVudCA9IGZvbGRlckVsLmNyZWF0ZURpdihcIm5hdi1mb2xkZXItY2hpbGRyZW5cIik7XG4gICAgICAgIGNvbnN0IGNvbGxhcHNlSWNvbkVsOiBIVE1MRGl2RWxlbWVudCA9IGZvbGRlclRpdGxlRWwuY3JlYXRlRGl2KFxuICAgICAgICAgICAgXCJuYXYtZm9sZGVyLWNvbGxhcHNlLWluZGljYXRvciBjb2xsYXBzZS1pY29uXCJcbiAgICAgICAgKTtcblxuICAgICAgICBjb2xsYXBzZUljb25FbC5pbm5lckhUTUwgPSBDT0xMQVBTRV9JQ09OO1xuICAgICAgICBpZiAoY29sbGFwc2VkKSB7XG4gICAgICAgICAgICAoY29sbGFwc2VJY29uRWwuY2hpbGROb2Rlc1swXSBhcyBIVE1MRWxlbWVudCkuc3R5bGUudHJhbnNmb3JtID0gXCJyb3RhdGUoLTkwZGVnKVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9sZGVyVGl0bGVFbC5jcmVhdGVEaXYoXCJuYXYtZm9sZGVyLXRpdGxlLWNvbnRlbnRcIikuc2V0VGV4dChmb2xkZXJUaXRsZSk7XG5cbiAgICAgICAgaWYgKGhpZGRlbikge1xuICAgICAgICAgICAgZm9sZGVyRWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9sZGVyVGl0bGVFbC5vbkNsaWNrRXZlbnQoKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBjaGlsZHJlbkVsLmNoaWxkTm9kZXMgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4pIHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQuc3R5bGUuZGlzcGxheSA9PT0gXCJibG9ja1wiIHx8IGNoaWxkLnN0eWxlLmRpc3BsYXkgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgICAgICAoY29sbGFwc2VJY29uRWwuY2hpbGROb2Rlc1swXSBhcyBIVE1MRWxlbWVudCkuc3R5bGUudHJhbnNmb3JtID1cbiAgICAgICAgICAgICAgICAgICAgICAgIFwicm90YXRlKC05MGRlZylcIjtcbiAgICAgICAgICAgICAgICAgICAgZGVjay5hY3RpdmVGb2xkZXJzLmRlbGV0ZShmb2xkZXJUaXRsZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgKGNvbGxhcHNlSWNvbkVsLmNoaWxkTm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQpLnN0eWxlLnRyYW5zZm9ybSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIGRlY2suYWN0aXZlRm9sZGVycy5hZGQoZm9sZGVyVGl0bGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZvbGRlckVsO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlUmlnaHRQYW5lRmlsZShcbiAgICAgICAgZm9sZGVyRWw6IEhUTUxFbGVtZW50LFxuICAgICAgICBmaWxlOiBURmlsZSxcbiAgICAgICAgZmlsZUVsQWN0aXZlOiBib29sZWFuLFxuICAgICAgICBoaWRkZW46IGJvb2xlYW4sXG4gICAgICAgIGRlY2s6IFJldmlld0RlY2ssXG4gICAgICAgIHBsdWdpbjogU1JQbHVnaW5cbiAgICApOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbmF2RmlsZUVsOiBIVE1MRWxlbWVudCA9IGZvbGRlckVsXG4gICAgICAgICAgICAuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm5hdi1mb2xkZXItY2hpbGRyZW5cIilbMF1cbiAgICAgICAgICAgIC5jcmVhdGVEaXYoXCJuYXYtZmlsZVwiKTtcbiAgICAgICAgaWYgKGhpZGRlbikge1xuICAgICAgICAgICAgbmF2RmlsZUVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5hdkZpbGVUaXRsZTogSFRNTEVsZW1lbnQgPSBuYXZGaWxlRWwuY3JlYXRlRGl2KFwibmF2LWZpbGUtdGl0bGVcIik7XG4gICAgICAgIGlmIChmaWxlRWxBY3RpdmUpIHtcbiAgICAgICAgICAgIG5hdkZpbGVUaXRsZS5hZGRDbGFzcyhcImlzLWFjdGl2ZVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5hdkZpbGVUaXRsZS5jcmVhdGVEaXYoXCJuYXYtZmlsZS10aXRsZS1jb250ZW50XCIpLnNldFRleHQoZmlsZS5iYXNlbmFtZSk7XG4gICAgICAgIG5hdkZpbGVUaXRsZS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICAgICAgYXN5bmMgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBwbHVnaW4ubGFzdFNlbGVjdGVkUmV2aWV3RGVjayA9IGRlY2suZGVja05hbWU7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5hcHAud29ya3NwYWNlLmdldExlYWYoKS5vcGVuRmlsZShmaWxlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcblxuICAgICAgICBuYXZGaWxlVGl0bGUuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIFwiY29udGV4dG1lbnVcIixcbiAgICAgICAgICAgIChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZU1lbnU6IE1lbnUgPSBuZXcgTWVudSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS50cmlnZ2VyKFwiZmlsZS1tZW51XCIsIGZpbGVNZW51LCBmaWxlLCBcIm15LWNvbnRleHQtbWVudVwiLCBudWxsKTtcbiAgICAgICAgICAgICAgICBmaWxlTWVudS5zaG93QXRQb3NpdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIHg6IGV2ZW50LnBhZ2VYLFxuICAgICAgICAgICAgICAgICAgICB5OiBldmVudC5wYWdlWSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZUZvbGRlckljb25Ub0V4cGFuZGVkKGZvbGRlckVsOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjb2xsYXBzZUljb25FbCA9IGZvbGRlckVsLmZpbmQoXCJkaXYubmF2LWZvbGRlci1jb2xsYXBzZS1pbmRpY2F0b3JcIik7XG4gICAgICAgIChjb2xsYXBzZUljb25FbC5jaGlsZE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50KS5zdHlsZS50cmFuc2Zvcm0gPSBcIlwiO1xuICAgIH1cbn1cbiIsICJpbXBvcnQgeyBDYXJkVHlwZSB9IGZyb20gXCJzcmMvZGRkL21vZHVsZXMvcmV2aWV3L2RvbWFpbi9DYXJkVHlwZVwiO1xuaW1wb3J0IHsgTEVHQUNZX1NDSEVEVUxJTkdfRVhUUkFDVE9SLCBNVUxUSV9TQ0hFRFVMSU5HX0VYVFJBQ1RPUiwgfSBmcm9tIFwic3JjL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgZXNjYXBlUmVnZXhTdHJpbmcgfSBmcm9tIFwic3JjL3V0aWxzXCI7XG5pbXBvcnQgeyBJbnRlcnZhbCwgRWFzZSB9IGZyb20gXCJzcmMvZGRkL21vZHVsZXMvcmV2aWV3L2RvbWFpbi9DYXJkUmV2aWV3U2V0dGluZ3NcIjtcblxudHlwZSBDYXJkVGV4dCA9IHN0cmluZztcbnR5cGUgTGluZU51bWJlciA9IG51bWJlcjtcbi8qKlxuICogUmV0dXJucyBmbGFzaGNhcmRzIGZvdW5kIGluIGB0ZXh0YFxuICpcbiAqIEBwYXJhbSB0ZXh0IC0gVGhlIHRleHQgdG8gZXh0cmFjdCBmbGFzaGNhcmRzIGZyb21cbiAqIEBwYXJhbSBzaW5nbGVsaW5lQ2FyZFNlcGFyYXRvciAtIFNlcGFyYXRvciBmb3IgaW5saW5lIGJhc2ljIGNhcmRzXG4gKiBAcGFyYW0gc2luZ2xlbGluZVJldmVyc2VkQ2FyZFNlcGFyYXRvciAtIFNlcGFyYXRvciBmb3IgaW5saW5lIHJldmVyc2VkIGNhcmRzXG4gKiBAcGFyYW0gbXVsdGlsaW5lQ2FyZFNlcGFyYXRvciAtIFNlcGFyYXRvciBmb3IgbXVsdGlsaW5lIGJhc2ljIGNhcmRzXG4gKiBAcGFyYW0gbXVsdGlsaW5lUmV2ZXJzZWRDYXJkU2VwYXJhdG9yIC0gU2VwYXJhdG9yIGZvciBtdWx0aWxpbmUgYmFzaWMgY2FyZFxuICogQHJldHVybnMgQW4gYXJyYXkgb2YgW0NhcmRUeXBlLCBjYXJkIHRleHQsIGxpbmUgbnVtYmVyXSB0dXBsZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlIChcbiAgdGV4dDogc3RyaW5nLFxuICBzaW5nbGVsaW5lQ2FyZFNlcGFyYXRvcjogc3RyaW5nLFxuICBzaW5nbGVsaW5lUmV2ZXJzZWRDYXJkU2VwYXJhdG9yOiBzdHJpbmcsXG4gIG11bHRpbGluZUNhcmRTZXBhcmF0b3I6IHN0cmluZyxcbiAgbXVsdGlsaW5lUmV2ZXJzZWRDYXJkU2VwYXJhdG9yOiBzdHJpbmcsXG4gIGNvbnZlcnRIaWdobGlnaHRzVG9DbG96ZXM6IGJvb2xlYW4sXG4gIGNvbnZlcnRCb2xkVGV4dFRvQ2xvemVzOiBib29sZWFuLFxuICBjb252ZXJ0Q3VybHlCcmFja2V0c1RvQ2xvemVzOiBib29sZWFuXG4pOiB7IGNhcmRUeXBlOiBDYXJkVHlwZSwgY2FyZFRleHQ6IENhcmRUZXh0LCBsaW5lTnVtYmVyOiBMaW5lTnVtYmVyOyB9W10ge1xuICBsZXQgY2FyZFRleHQgPSBcIlwiO1xuICBjb25zdCBjYXJkczogeyBjYXJkVHlwZTogQ2FyZFR5cGUsIGNhcmRUZXh0OiBDYXJkVGV4dCwgbGluZU51bWJlcjogTGluZU51bWJlcjsgfVtdID0gW107XG4gIGxldCBjYXJkVHlwZTogQ2FyZFR5cGUgfCBudWxsID0gbnVsbDtcbiAgbGV0IGxpbmVOdW1iZXIgPSAwO1xuXG4gIGNvbnN0IGxpbmVzOiBzdHJpbmdbXSA9IHRleHQucmVwbGFjZUFsbChcIlxcclxcblwiLCBcIlxcblwiKS5zcGxpdChcIlxcblwiKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICBpZiAobGluZXNbaV0ubGVuZ3RoID09PSAwKSB7XG4gICAgICBpZiAoY2FyZFR5cGUpIHtcbiAgICAgICAgY2FyZHMucHVzaCh7IGNhcmRUeXBlLCBjYXJkVGV4dCwgbGluZU51bWJlciB9KTtcbiAgICAgICAgY2FyZFR5cGUgPSBudWxsO1xuICAgICAgfVxuICAgICAgY2FyZFRleHQgPSBcIlwiO1xuICAgICAgY29udGludWU7XG4gICAgfSBlbHNlIGlmIChsaW5lc1tpXS5zdGFydHNXaXRoKFwiPCEtLVwiKSAmJiAhbGluZXNbaV0uc3RhcnRzV2l0aChcIjwhLS1TUjpcIikpIHtcbiAgICAgIHdoaWxlIChpICsgMSA8IGxpbmVzLmxlbmd0aCAmJiAhbGluZXNbaV0uaW5jbHVkZXMoXCItLT5cIikpIHtcbiAgICAgICAgaSsrO1xuICAgICAgfTtcbiAgICAgIGkrKztcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChjYXJkVGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICBjYXJkVGV4dCArPSBcIlxcblwiO1xuICAgIH1cbiAgICBjYXJkVGV4dCArPSBsaW5lc1tpXTtcblxuICAgIGlmIChcbiAgICAgIGxpbmVzW2ldLmluY2x1ZGVzKHNpbmdsZWxpbmVSZXZlcnNlZENhcmRTZXBhcmF0b3IpIHx8XG4gICAgICBsaW5lc1tpXS5pbmNsdWRlcyhzaW5nbGVsaW5lQ2FyZFNlcGFyYXRvcilcbiAgICApIHtcbiAgICAgIGNhcmRUeXBlID0gbGluZXNbaV0uaW5jbHVkZXMoc2luZ2xlbGluZVJldmVyc2VkQ2FyZFNlcGFyYXRvcilcbiAgICAgICAgPyBDYXJkVHlwZS5TaW5nbGVMaW5lQm90aFdheXNcbiAgICAgICAgOiBDYXJkVHlwZS5TaW5nbGVMaW5lO1xuICAgICAgY2FyZFRleHQgPSBsaW5lc1tpXTtcbiAgICAgIGxpbmVOdW1iZXIgPSBpO1xuICAgICAgaWYgKGkgKyAxIDwgbGluZXMubGVuZ3RoICYmIGxpbmVzW2kgKyAxXS5zdGFydHNXaXRoKFwiPCEtLVNSOlwiKSkge1xuICAgICAgICBjYXJkVGV4dCArPSBcIlxcblwiICsgbGluZXNbaSArIDFdO1xuICAgICAgICBpKys7XG4gICAgICB9XG4gICAgICBjYXJkcy5wdXNoKHsgY2FyZFR5cGUsIGNhcmRUZXh0LCBsaW5lTnVtYmVyIH0pO1xuICAgICAgY2FyZFR5cGUgPSBudWxsO1xuICAgICAgY2FyZFRleHQgPSBcIlwiO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBjYXJkVHlwZSA9PT0gbnVsbCAmJlxuICAgICAgKChjb252ZXJ0SGlnaGxpZ2h0c1RvQ2xvemVzICYmIC89PS4qPz09L2dtLnRlc3QobGluZXNbaV0pKSB8fFxuICAgICAgICAoY29udmVydEJvbGRUZXh0VG9DbG96ZXMgJiYgL1xcKlxcKi4qP1xcKlxcKi9nbS50ZXN0KGxpbmVzW2ldKSkgfHxcbiAgICAgICAgKGNvbnZlcnRDdXJseUJyYWNrZXRzVG9DbG96ZXMgJiYgL3t7Lio/fX0vZ20udGVzdChsaW5lc1tpXSkpKVxuICAgICkge1xuICAgICAgY2FyZFR5cGUgPSBDYXJkVHlwZS5DbG96ZTtcbiAgICAgIGxpbmVOdW1iZXIgPSBpO1xuICAgIH0gZWxzZSBpZiAobGluZXNbaV0gPT09IG11bHRpbGluZUNhcmRTZXBhcmF0b3IpIHtcbiAgICAgIGNhcmRUeXBlID0gQ2FyZFR5cGUuTXVsdGlMaW5lO1xuICAgICAgbGluZU51bWJlciA9IGk7XG4gICAgfSBlbHNlIGlmIChsaW5lc1tpXSA9PT0gbXVsdGlsaW5lUmV2ZXJzZWRDYXJkU2VwYXJhdG9yKSB7XG4gICAgICBjYXJkVHlwZSA9IENhcmRUeXBlLk11bHRpTGluZUJvdGhXYXlzO1xuICAgICAgbGluZU51bWJlciA9IGk7XG4gICAgfSBlbHNlIGlmIChsaW5lc1tpXS5zdGFydHNXaXRoKFwiYGBgXCIpIHx8IGxpbmVzW2ldLnN0YXJ0c1dpdGgoXCJ+fn5cIikpIHtcbiAgICAgIGNvbnN0IGNvZGVCbG9ja0Nsb3NlID0gbGluZXNbaV0ubWF0Y2goL2ArfH4rLylbMF07XG4gICAgICB3aGlsZSAoaSArIDEgPCBsaW5lcy5sZW5ndGggJiYgIWxpbmVzW2kgKyAxXS5zdGFydHNXaXRoKGNvZGVCbG9ja0Nsb3NlKSkge1xuICAgICAgICBpKys7XG4gICAgICAgIGNhcmRUZXh0ICs9IFwiXFxuXCIgKyBsaW5lc1tpXTtcbiAgICAgIH1cbiAgICAgIGNhcmRUZXh0ICs9IFwiXFxuXCIgKyBjb2RlQmxvY2tDbG9zZTtcbiAgICAgIGkrKztcbiAgICB9XG4gIH1cblxuICBpZiAoY2FyZFR5cGUgJiYgY2FyZFRleHQpIHtcbiAgICBjYXJkcy5wdXNoKHsgY2FyZFR5cGUsIGNhcmRUZXh0LCBsaW5lTnVtYmVyIH0pO1xuICB9XG5cbiAgcmV0dXJuIGNhcmRzO1xufVxuXG50eXBlIENhcmRGcm9udCA9IHN0cmluZztcbnR5cGUgQ2FyZEJhY2sgPSBzdHJpbmc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDYXJkU2libGluZ3MgKGNhcmRUeXBlOiBDYXJkVHlwZSwgY2FyZFRleHQ6IHN0cmluZywgc2V0dGluZ3M6IFNSU2V0dGluZ3MpOiBbQ2FyZEZyb250LCBDYXJkQmFja11bXSB7XG4gIGNvbnN0IHNpYmxpbmdNYXRjaGVzOiBbQ2FyZEZyb250LCBDYXJkQmFja11bXSA9IFtdO1xuICBpZiAoY2FyZFR5cGUgPT09IENhcmRUeXBlLkNsb3plKSB7XG4gICAgY29uc3Qgc2libGluZ3M6IFJlZ0V4cE1hdGNoQXJyYXlbXSA9IFtdO1xuICAgIGlmIChzZXR0aW5ncy5jb252ZXJ0SGlnaGxpZ2h0c1RvQ2xvemVzKSB7XG4gICAgICBzaWJsaW5ncy5wdXNoKC4uLmNhcmRUZXh0Lm1hdGNoQWxsKC89PSguKj8pPT0vZ20pKTtcbiAgICB9XG4gICAgaWYgKHNldHRpbmdzLmNvbnZlcnRCb2xkVGV4dFRvQ2xvemVzKSB7XG4gICAgICBzaWJsaW5ncy5wdXNoKC4uLmNhcmRUZXh0Lm1hdGNoQWxsKC9cXCpcXCooLio/KVxcKlxcKi9nbSkpO1xuICAgIH1cbiAgICBpZiAoc2V0dGluZ3MuY29udmVydEN1cmx5QnJhY2tldHNUb0Nsb3plcykge1xuICAgICAgc2libGluZ3MucHVzaCguLi5jYXJkVGV4dC5tYXRjaEFsbCgve3soLio/KX19L2dtKSk7XG4gICAgfVxuICAgIHNpYmxpbmdzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIGlmIChhLmluZGV4IDwgYi5pbmRleCkge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgICBpZiAoYS5pbmRleCA+IGIuaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgICByZXR1cm4gMDtcbiAgICB9KTtcblxuICAgIGxldCBmcm9udDogc3RyaW5nLCBiYWNrOiBzdHJpbmc7XG4gICAgZm9yIChjb25zdCBtIG9mIHNpYmxpbmdzKSB7XG4gICAgICBjb25zdCBkZWxldGlvblN0YXJ0OiBudW1iZXIgPSBtLmluZGV4LFxuICAgICAgICBkZWxldGlvbkVuZDogbnVtYmVyID0gZGVsZXRpb25TdGFydCArIG1bMF0ubGVuZ3RoO1xuICAgICAgZnJvbnQgPVxuICAgICAgICBjYXJkVGV4dC5zdWJzdHJpbmcoMCwgZGVsZXRpb25TdGFydCkgK1xuICAgICAgICBcIjxzcGFuIHN0eWxlPSdjb2xvcjojMjE5NmYzJz5bLi4uXTwvc3Bhbj5cIiArXG4gICAgICAgIGNhcmRUZXh0LnN1YnN0cmluZyhkZWxldGlvbkVuZCk7XG4gICAgICBmcm9udCA9IGZyb250XG4gICAgICAgIC5yZXBsYWNlKC89PS9nbSwgXCJcIilcbiAgICAgICAgLnJlcGxhY2UoL1xcKlxcKi9nbSwgXCJcIilcbiAgICAgICAgLnJlcGxhY2UoL3t7L2dtLCBcIlwiKVxuICAgICAgICAucmVwbGFjZSgvfX0vZ20sIFwiXCIpO1xuICAgICAgYmFjayA9XG4gICAgICAgIGNhcmRUZXh0LnN1YnN0cmluZygwLCBkZWxldGlvblN0YXJ0KSArXG4gICAgICAgIFwiPHNwYW4gc3R5bGU9J2NvbG9yOiMyMTk2ZjMnPlwiICtcbiAgICAgICAgY2FyZFRleHQuc3Vic3RyaW5nKGRlbGV0aW9uU3RhcnQsIGRlbGV0aW9uRW5kKSArXG4gICAgICAgIFwiPC9zcGFuPlwiICtcbiAgICAgICAgY2FyZFRleHQuc3Vic3RyaW5nKGRlbGV0aW9uRW5kKTtcbiAgICAgIGJhY2sgPSBiYWNrXG4gICAgICAgIC5yZXBsYWNlKC89PS9nbSwgXCJcIilcbiAgICAgICAgLnJlcGxhY2UoL1xcKlxcKi9nbSwgXCJcIilcbiAgICAgICAgLnJlcGxhY2UoL3t7L2dtLCBcIlwiKVxuICAgICAgICAucmVwbGFjZSgvfX0vZ20sIFwiXCIpO1xuICAgICAgc2libGluZ01hdGNoZXMucHVzaChbZnJvbnQsIGJhY2tdKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbGV0IGlkeDogbnVtYmVyO1xuICAgIGlmIChjYXJkVHlwZSA9PT0gQ2FyZFR5cGUuU2luZ2xlTGluZSkge1xuICAgICAgaWR4ID0gY2FyZFRleHQuaW5kZXhPZihzZXR0aW5ncy5zaW5nbGVMaW5lQ2FyZFNlcGFyYXRvcik7XG4gICAgICBzaWJsaW5nTWF0Y2hlcy5wdXNoKFtcbiAgICAgICAgY2FyZFRleHQuc3Vic3RyaW5nKDAsIGlkeCksXG4gICAgICAgIGNhcmRUZXh0LnN1YnN0cmluZyhpZHggKyBzZXR0aW5ncy5zaW5nbGVMaW5lQ2FyZFNlcGFyYXRvci5sZW5ndGgpLFxuICAgICAgXSk7XG4gICAgfSBlbHNlIGlmIChjYXJkVHlwZSA9PT0gQ2FyZFR5cGUuU2luZ2xlTGluZUJvdGhXYXlzKSB7XG4gICAgICBpZHggPSBjYXJkVGV4dC5pbmRleE9mKHNldHRpbmdzLnNpbmdsZUxpbmVSZXZlcnNlZENhcmRTZXBhcmF0b3IpO1xuICAgICAgY29uc3Qgc2lkZTE6IHN0cmluZyA9IGNhcmRUZXh0LnN1YnN0cmluZygwLCBpZHgpLFxuICAgICAgICBzaWRlMjogc3RyaW5nID0gY2FyZFRleHQuc3Vic3RyaW5nKFxuICAgICAgICAgIGlkeCArIHNldHRpbmdzLnNpbmdsZUxpbmVSZXZlcnNlZENhcmRTZXBhcmF0b3IubGVuZ3RoXG4gICAgICAgICk7XG4gICAgICBzaWJsaW5nTWF0Y2hlcy5wdXNoKFtzaWRlMSwgc2lkZTJdKTtcbiAgICAgIHNpYmxpbmdNYXRjaGVzLnB1c2goW3NpZGUyLCBzaWRlMV0pO1xuICAgIH0gZWxzZSBpZiAoY2FyZFR5cGUgPT09IENhcmRUeXBlLk11bHRpTGluZSkge1xuICAgICAgaWR4ID0gY2FyZFRleHQuaW5kZXhPZihcIlxcblwiICsgc2V0dGluZ3MubXVsdGlsaW5lQ2FyZFNlcGFyYXRvciArIFwiXFxuXCIpO1xuICAgICAgc2libGluZ01hdGNoZXMucHVzaChbXG4gICAgICAgIGNhcmRUZXh0LnN1YnN0cmluZygwLCBpZHgpLFxuICAgICAgICBjYXJkVGV4dC5zdWJzdHJpbmcoaWR4ICsgMiArIHNldHRpbmdzLm11bHRpbGluZUNhcmRTZXBhcmF0b3IubGVuZ3RoKSxcbiAgICAgIF0pO1xuICAgIH0gZWxzZSBpZiAoY2FyZFR5cGUgPT09IENhcmRUeXBlLk11bHRpTGluZUJvdGhXYXlzKSB7XG4gICAgICBpZHggPSBjYXJkVGV4dC5pbmRleE9mKFwiXFxuXCIgKyBzZXR0aW5ncy5tdWx0aWxpbmVSZXZlcnNlZENhcmRTZXBhcmF0b3IgKyBcIlxcblwiKTtcbiAgICAgIGNvbnN0IHNpZGUxOiBzdHJpbmcgPSBjYXJkVGV4dC5zdWJzdHJpbmcoMCwgaWR4KSxcbiAgICAgICAgc2lkZTI6IHN0cmluZyA9IGNhcmRUZXh0LnN1YnN0cmluZyhcbiAgICAgICAgICBpZHggKyAyICsgc2V0dGluZ3MubXVsdGlsaW5lUmV2ZXJzZWRDYXJkU2VwYXJhdG9yLmxlbmd0aFxuICAgICAgICApO1xuICAgICAgc2libGluZ01hdGNoZXMucHVzaChbc2lkZTEsIHNpZGUyXSk7XG4gICAgICBzaWJsaW5nTWF0Y2hlcy5wdXNoKFtzaWRlMiwgc2lkZTFdKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHNpYmxpbmdNYXRjaGVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTY2hlZHVsZVN0cmluZyAoc2NoZWR1bGU6IFJlZ0V4cE1hdGNoQXJyYXkpOiB7IGR1ZVVuaXg6IG51bWJlciwgaW50ZXJ2YWw6IEludGVydmFsLCBlYXNlOiBFYXNlOyB9IHtcbiAgY29uc3QgZHVlVW5peDogbnVtYmVyID0gd2luZG93XG4gICAgLm1vbWVudChzY2hlZHVsZVsxXSwgW1wiWVlZWS1NTS1ERFwiLCBcIkRELU1NLVlZWVlcIl0pXG4gICAgLnZhbHVlT2YoKTtcblxuICByZXR1cm4geyBkdWVVbml4LCBpbnRlcnZhbDogcGFyc2VJbnQoc2NoZWR1bGVbMl0pLCBlYXNlOiBwYXJzZUludChzY2hlZHVsZVszXSkgfTtcbn1cblxuLy8gSSBkb24ndCBrbm93IGV4YWN0bHkgd2hhdCB0aGlzIGZ1bmN0aW9uIGRvZXNcbmV4cG9ydCBmdW5jdGlvbiBkb1NjaGVkdWxpbmdTdHVmZiAoXG4gIGZpbGVUZXh0OiBzdHJpbmcsXG4gIGNhcmRUZXh0OiBzdHJpbmcsXG4gIHNpYmxpbmdNYXRjaGVzOiBbc3RyaW5nLCBzdHJpbmddW10pOiB7XG4gICAgc2NoZWR1bGluZzogeyBkdWVVbml4OiBudW1iZXIsIGludGVydmFsOiBJbnRlcnZhbCwgZWFzZTogRWFzZTsgfVtdLFxuICAgIG5ld0ZpbGVUZXh0OiBzdHJpbmcgfCBudWxsO1xuICB9IHtcbiAgLy8gRmluZCBzY2hlZHVsaW5nIGluZm9ybWF0aW9uIGluIGNhcmRUZXh0XG4gIGxldCBzY2hlZHVsaW5nTWF0Y2hlczogUmVnRXhwTWF0Y2hBcnJheVtdID0gWy4uLmNhcmRUZXh0Lm1hdGNoQWxsKE1VTFRJX1NDSEVEVUxJTkdfRVhUUkFDVE9SKV07XG4gIGlmIChzY2hlZHVsaW5nTWF0Y2hlcy5sZW5ndGggPT09IDApXG4gICAgc2NoZWR1bGluZ01hdGNoZXMgPSBbLi4uY2FyZFRleHQubWF0Y2hBbGwoTEVHQUNZX1NDSEVEVUxJTkdfRVhUUkFDVE9SKV07XG5cbiAgY29uc3Qgc2NoZWR1bGluZyA9IHNjaGVkdWxpbmdNYXRjaGVzLm1hcChwYXJzZVNjaGVkdWxlU3RyaW5nKTtcblxuICBsZXQgbmV3RmlsZVRleHQgPSBudWxsO1xuXG4gIC8vIHdlIGhhdmUgc29tZSBleHRyYSBzY2hlZHVsaW5nIGRhdGVzIHRvIGRlbGV0ZVxuICBpZiAoc2NoZWR1bGluZ01hdGNoZXMubGVuZ3RoID4gc2libGluZ01hdGNoZXMubGVuZ3RoKSB7XG4gICAgY29uc3QgaWR4U2NoZWQ6IG51bWJlciA9IGNhcmRUZXh0Lmxhc3RJbmRleE9mKFwiPCEtLVNSOlwiKSArIDc7XG4gICAgbGV0IG5ld0NhcmRUZXh0OiBzdHJpbmcgPSBjYXJkVGV4dC5zdWJzdHJpbmcoMCwgaWR4U2NoZWQpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2libGluZ01hdGNoZXMubGVuZ3RoOyBpKyspXG4gICAgICBuZXdDYXJkVGV4dCArPSBgISR7c2NoZWR1bGluZ01hdGNoZXNbaV1bMV19LCR7c2NoZWR1bGluZ01hdGNoZXNbaV1bMl19LCR7c2NoZWR1bGluZ01hdGNoZXNbaV1bM119YDtcbiAgICBuZXdDYXJkVGV4dCArPSBcIi0tPlwiO1xuXG4gICAgY29uc3QgcmVwbGFjZW1lbnRSZWdleCA9IG5ldyBSZWdFeHAoZXNjYXBlUmVnZXhTdHJpbmcoY2FyZFRleHQpLCBcImdtXCIpO1xuICAgIG5ld0ZpbGVUZXh0ID0gZmlsZVRleHQucmVwbGFjZShyZXBsYWNlbWVudFJlZ2V4LCAoKSA9PiBuZXdDYXJkVGV4dCk7XG4gIH1cblxuICByZXR1cm4geyBzY2hlZHVsaW5nLCBuZXdGaWxlVGV4dCB9O1xufVxuIiwgImltcG9ydCB7IGFkZEljb24gfSBmcm9tIFwib2JzaWRpYW5cIjtcblxuY29uc3QgaWNvblN2ZyA9IGA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgZD1cIk0gODguOTYwOTM4IDE3LjI1NzgxMiBMIDQ3LjQ1NzAzMSAxNy4yNTc4MTIgQyA0NS42Nzk2ODggMTcuMjU3ODEyIDQ0LjIzMDQ2OSAxOC43MDMxMjUgNDQuMjMwNDY5IDIwLjQ4NDM3NSBMIDQ0LjIzMDQ2OSA4Ni41NTg1OTQgQyA0NC4yMzA0NjkgODguMzM1OTM4IDQ1LjY3OTY4OCA4OS43ODUxNTYgNDcuNDU3MDMxIDg5Ljc4NTE1NiBMIDg4Ljk2MDkzOCA4OS43ODUxNTYgQyA5MC43MzgyODEgODkuNzg1MTU2IDkyLjE4NzUgODguMzM1OTM4IDkyLjE4NzUgODYuNTU4NTk0IEwgOTIuMTg3NSAyMC40ODQzNzUgQyA5Mi4xODc1IDE4LjcwMzEyNSA5MC43MzgyODEgMTcuMjU3ODEyIDg4Ljk2MDkzOCAxNy4yNTc4MTIgWiBNIDg4LjI4MTI1IDg1Ljg3ODkwNiBMIDQ4LjEzNjcxOSA4NS44Nzg5MDYgTCA0OC4xMzY3MTkgMjEuMTY0MDYyIEwgODguMjgxMjUgMjEuMTY0MDYyIFogTSA4OC4yODEyNSA4NS44Nzg5MDYgXCIvPlxuICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgIGQ9XCJNIDg4Ljk2MDkzOCA5LjQ0NTMxMiBMIDYxLjY2Nzk2OSA5LjQ0NTMxMiBDIDU5LjkyNTc4MSAzLjgxNjQwNiA1NC4wMTE3MTkgMC41MTU2MjUgNDguMjY5NTMxIDIuMDU0Njg4IEwgOC4xODM1OTQgMTIuNzk2ODc1IEMgMi4zMDQ2ODggMTQuMzcxMDk0IC0xLjE5OTIxOSAyMC40Mzc1IDAuMzc4OTA2IDI2LjMxNjQwNiBMIDE3LjQ3NjU2MiA5MC4xNDA2MjUgQyAxOC43OTY4NzUgOTUuMDY2NDA2IDIzLjI2OTUzMSA5OC4zMjQyMTkgMjguMTQ0NTMxIDk4LjMyNDIxOSBDIDI5LjA4NTkzOCA5OC4zMjQyMTkgMzAuMDQ2ODc1IDk4LjE5OTIxOSAzMSA5Ny45NDUzMTIgTCA0MC43NjU2MjUgOTUuMzI4MTI1IEMgNDIuNjI1IDk2Ljc1IDQ0Ljk0MTQwNiA5Ny41OTc2NTYgNDcuNDU3MDMxIDk3LjU5NzY1NiBMIDg4Ljk2MDkzOCA5Ny41OTc2NTYgQyA5NS4wNDY4NzUgOTcuNTk3NjU2IDEwMCA5Mi42NDQ1MzEgMTAwIDg2LjU1ODU5NCBMIDEwMCAyMC40ODQzNzUgQyAxMDAgMTQuMzk4NDM4IDk1LjA0Njg3NSA5LjQ0NTMxMiA4OC45NjA5MzggOS40NDUzMTIgWiBNIDI5Ljk4ODI4MSA5NC4xNzE4NzUgQyAyNi4xODc1IDk1LjE5MTQwNiAyMi4yNjk1MzEgOTIuOTI1NzgxIDIxLjI1IDg5LjEyODkwNiBMIDQuMTUyMzQ0IDI1LjMwNDY4OCBDIDMuMTMyODEyIDIxLjUwNzgxMiA1LjM5NDUzMSAxNy41ODU5MzggOS4xOTUzMTIgMTYuNTcwMzEyIEwgNDkuMjgxMjUgNS44MjgxMjUgQyA1Mi41NzgxMjUgNC45NDUzMTIgNTUuOTYwOTM4IDYuNTMxMjUgNTcuNDY0ODQ0IDkuNDQ1MzEyIEwgNDcuNDU3MDMxIDkuNDQ1MzEyIEMgNDEuMzcxMDk0IDkuNDQ1MzEyIDM2LjQxNzk2OSAxNC4zOTg0MzggMzYuNDE3OTY5IDIwLjQ4NDM3NSBMIDM2LjQxNzk2OSA4Ni41NTg1OTQgQyAzNi40MTc5NjkgODguNTU4NTk0IDM2Ljk1NzAzMSA5MC40MzM1OTQgMzcuODkwNjI1IDkyLjA1NDY4OCBaIE0gOTYuMDkzNzUgODYuNTU4NTk0IEMgOTYuMDkzNzUgOTAuNDkyMTg4IDkyLjg5NDUzMSA5My42OTE0MDYgODguOTYwOTM4IDkzLjY5MTQwNiBMIDQ3LjQ1NzAzMSA5My42OTE0MDYgQyA0My41MjM0MzggOTMuNjkxNDA2IDQwLjMyNDIxOSA5MC40OTIxODggNDAuMzI0MjE5IDg2LjU1ODU5NCBMIDQwLjMyNDIxOSAyMC40ODQzNzUgQyA0MC4zMjQyMTkgMTYuNTUwNzgxIDQzLjUyMzQzOCAxMy4zNTE1NjIgNDcuNDU3MDMxIDEzLjM1MTU2MiBMIDg4Ljk2MDkzOCAxMy4zNTE1NjIgQyA5Mi44OTQ1MzEgMTMuMzUxNTYyIDk2LjA5Mzc1IDE2LjU1MDc4MSA5Ni4wOTM3NSAyMC40ODQzNzUgWiBNIDk2LjA5Mzc1IDg2LjU1ODU5NCBcIi8+XG4gICAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiAgZD1cIk0gNTQuMTAxNTYyIDUzLjA5Mzc1IEwgNjAuMDcwMzEyIDU3LjQxMDE1NiBMIDU3Ljc4OTA2MiA2NC4zNzg5MDYgQyA1Ni45MDYyNSA2Ny4wNzQyMTkgNTkuOTk2MDk0IDY5LjMyMDMxMiA2Mi4yODUxNTYgNjcuNjQ4NDM4IEwgNjguMjEwOTM4IDYzLjMyNDIxOSBMIDc0LjEzMjgxMiA2Ny42NDg0MzggQyA3Ni40MjE4NzUgNjkuMzIwMzEyIDc5LjUxMTcxOSA2Ny4wNzQyMTkgNzguNjI4OTA2IDY0LjM3ODkwNiBMIDc2LjM0NzY1NiA1Ny40MTAxNTYgTCA4Mi4zMjAzMTIgNTMuMDkzNzUgQyA4NC42MTMyODEgNTEuNDMzNTk0IDgzLjQ0MTQwNiA0Ny44MDQ2ODggODAuNjA1NDY5IDQ3LjgwNDY4OCBMIDczLjI0MjE4OCA0Ny44MDQ2ODggTCA3MC45ODgyODEgNDAuODM5ODQ0IEMgNzAuMTE3MTg4IDM4LjE0NDUzMSA2Ni4zMDA3ODEgMzguMTQ0NTMxIDY1LjQyOTY4OCA0MC44Mzk4NDQgTCA2My4xNzk2ODggNDcuODA0Njg4IEwgNTUuODEyNSA0Ny44MDQ2ODggQyA1Mi45ODA0NjkgNDcuODA0Njg4IDUxLjgwNDY4OCA1MS40MzM1OTQgNTQuMTAxNTYyIDUzLjA5Mzc1IFogTSA1NC4xMDE1NjIgNTMuMDkzNzUgXCIvPlxuICAgICAgICBgO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0FwcEljb24gKCkge1xuICBhZGRJY29uKFwiU3BhY2VkUmVwSWNvblwiLCBpY29uU3ZnKTtcbn1cbiIsICJpbXBvcnQgeyBJdGVtVmlldywgV29ya3NwYWNlTGVhZiB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHR5cGUgU1JQbHVnaW4gZnJvbSBcInNyYy9tYWluXCI7XG4vLyBpbXBvcnQgeyB0IH0gZnJvbSBcInNyYy9sYW5nL2hlbHBlcnNcIjtcbi8vIGltcG9ydCB7IHRleHRJbnRlcnZhbCwgQ2FyZCwgUmV2aWV3UmVzcG9uc2UsIENhcmRTdGF0cywgc2NoZWR1bGUgfSBmcm9tIFwic3JjL3NjaGVkdWxpbmdcIjtcbi8vIGltcG9ydCB7IERlY2sgfSBmcm9tIFwic3JjL2RkZC9tb2R1bGVzL3Jldmlldy9kb21haW4vRGVja1wiO1xuXG5pbXBvcnQgeyByZW5kZXJNYXJrZG93bldyYXBwZXIgfSBmcm9tIFwiLi9yZW5kZXItY2FyZFwiO1xuaW1wb3J0IHsgc2V0dXBGbGFzaENhcmRNZW51IH0gZnJvbSBcIi4vZmxhc2hjYXJkLW1lbnVcIjtcbmltcG9ydCB7IHNldHVwUmVzcG9uc2VNZW51LCBBbnN3ZXJCdG4sIFJhdGluZ0J0bnNEaXYgfSBmcm9tIFwiLi9yZXNwb25zZS1tZW51XCI7XG5pbXBvcnQgeyBmb3JFYWNoQnV0dG9uIH0gZnJvbSBcIi4vdXRpbFwiO1xuXG5pbXBvcnQgeyBPYnNpZGlhbkNhcmQgfSBmcm9tIFwic3JjL3JlcG8vT2JzaWRpYW5DYXJkUmVwb1wiO1xuaW1wb3J0IHsgUmV2aWV3Q2FyZCB9IGZyb20gXCJzcmMvZGRkL21vZHVsZXMvcmV2aWV3L3VzZUNhc2VzL1Jldmlld0NhcmQvUmV2aWV3Q2FyZFwiO1xuaW1wb3J0IHsgcmV2aWV3U2VydmljZSB9IGZyb20gXCJzcmMvZGRkL21vZHVsZXMvcmV2aWV3L3NlcnZpY2VzL1Jldmlld1NlcnZpY2VcIjtcbi8vIGltcG9ydCB7IENhcmRSZXZpZXdSYXRpbmcgfSBmcm9tIFwic3JjL2RkZC9tb2R1bGVzL3Jldmlldy9kb21haW4vQ2FyZFJldmlld1JhdGluZ1wiO1xuLy8gaW1wb3J0IHsgR2V0Q2FyZHNGb3JSZXZpZXcgfSBmcm9tIFwic3JjL2RvbWFpbi91c2VDYXNlcy9TdGFydFJldmlld1Nlc3Npb24vR2V0Q2FyZHNGb3JSZXZpZXdcIjtcblxuZXhwb3J0IGNvbnN0IFNSX1ZJRVcgPSBcInNwYWNlZC1yZXBldGl0aW9uLXZpZXdcIjtcblxuZXhwb3J0IGNsYXNzIFNwYWNlZFJlcGV0aXRpb25WaWV3IGV4dGVuZHMgSXRlbVZpZXcge1xuICBwcml2YXRlIHBsdWdpbjogU1JQbHVnaW47XG4gIHByaXZhdGUgY2FyZHNUb1JldmlldzogT2JzaWRpYW5DYXJkW107XG4gIHByaXZhdGUgY2FyZEluZGV4OiBudW1iZXI7XG4gIHByaXZhdGUgY3VycmVudENhcmQ6IE9ic2lkaWFuQ2FyZDtcblxuICAvLyBwcml2YXRlIGNhcmRSZXZpZXdDb21wb25lbnQ6IENhcmRSZXZpZXdDb21wb25lbnRcbiAgcHJpdmF0ZSBmbGFzaGNhcmRWaWV3OiBIVE1MRGl2RWxlbWVudDtcbiAgcHJpdmF0ZSBhbnN3ZXJCdG46IEFuc3dlckJ0bjtcbiAgLy8gcHJpdmF0ZSByZXNwb25zZURpdjogUmVzcG9uc2VEaXY7XG4gIHByaXZhdGUgcmF0aW5nQnRuc0RpdjogUmF0aW5nQnRuc0RpdjtcblxuICBwcml2YXRlIHJldmlld0NhcmRVc2VDYXNlOiBSZXZpZXdDYXJkO1xuXG4gIC8vIHByaXZhdGUgZHVlQ2FyZHM6IENhcmRbXTtcbiAgLy8gcHJpdmF0ZSBuZXdDYXJkczogQ2FyZFtdO1xuICAvLyBwcml2YXRlIGN1cnJlbnRDYXJkSWR4OiBudW1iZXJcblxuICBjb25zdHJ1Y3RvcihsZWFmOiBXb3Jrc3BhY2VMZWFmLCBwbHVnaW46IFNSUGx1Z2luKSB7XG4gICAgc3VwZXIobGVhZik7XG5cbiAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgfVxuXG4gIGdldFZpZXdUeXBlICgpIHsgcmV0dXJuIFNSX1ZJRVc7IH1cblxuICBnZXREaXNwbGF5VGV4dCAoKSB7IHJldHVybiBcIkNhcmQgcmV2aWV3XCI7IH1cblxuICBhc3luYyBvbk9wZW4gKCkge1xuICAgIHRoaXMucmV2aWV3Q2FyZFVzZUNhc2UgPSBuZXcgUmV2aWV3Q2FyZCh0aGlzLnBsdWdpbi5jYXJkUmVwbywgcmV2aWV3U2VydmljZSk7XG4gICAgLy8gY29uc3QgcGFnZSA9IHRoaXMuY29udGFpbmVyRWwuY2hpbGRyZW5bMV07XG4gICAgLy8gcGFnZS5lbXB0eSgpO1xuXG4gICAgLy8gR2V0IGxpc3Qgb2YgYWxsIGZsYXNoY2FyZHNcbiAgICAvLyBjb25zdCBkZWNrcyA9IHRoaXMucGx1Z2luLmdldERlY2tzKClcbiAgICBjb25zdCBkZWNrcyA9IGF3YWl0IHRoaXMucGx1Z2luLmNhcmRSZXBvLmRlY2tzKCk7XG5cbiAgICB0aGlzLmNhcmRzVG9SZXZpZXcgPSBhd2FpdCB0aGlzLnBsdWdpbi5jYXJkUmVwby5nZXRCeURlY2tzKFsuLi5kZWNrc10pO1xuICAgIHRoaXMuY2FyZEluZGV4ID0gMDtcblxuXG5cbiAgICAvLyBhd2FpdCAobmV3IEdldENhcmRzRm9yUmV2aWV3KHRoaXMucGx1Z2luLmNhcmRSZXBvKSkuZXhlY3V0ZShcbiAgICAvLyAgIHtkZWNrczogZGVja3Msb25seUR1ZUNhcmRzOiBmYWxzZX1cbiAgICAvLyApXG5cbiAgICAvLyBMYXVuY2ggcmV2aWV3IHdpdGggYWxsIGNhcmRzXG4gICAgLy8gaWUgc3RhcnQgY29tcG9uZW50XG4gICAgdGhpcy5zZXR1cENhcmRzVmlldygpO1xuICAgIHRoaXMuc2hvd05leHRDYXJkKCk7XG4gIH1cblxuICBhc3luYyBvbkNsb3NlICgpIHtcbiAgICAvLyBOb3RoaW5nIHRvIGNsZWFuIHVwLlxuICB9XG5cbiAgc2V0dXBDYXJkc1ZpZXcgKCk6IHZvaWQge1xuICAgIHRoaXMuY29udGVudEVsLmVtcHR5KCk7XG5cbiAgICAvLyBUb3AgbWVudVxuICAgIGNvbnN0IGZsYXNoY2FyZE1lbnVEaXYgPSB0aGlzLmNvbnRlbnRFbC5jcmVhdGVEaXYoXCJzci1mbGFzaGNhcmQtbWVudVwiKTtcbiAgICBzZXR1cEZsYXNoQ2FyZE1lbnUoZmxhc2hjYXJkTWVudURpdik7XG4gICAgZmxhc2hjYXJkTWVudURpdi5jaGlsZHJlbi5uYW1lZEl0ZW0oXCJzci1xdWl0LXZpZXctYnRuXCIpO1xuXG4gICAgLy8gQWN0dWFsIGNhcmRcbiAgICBsZXQgZmxhc2hjYXJkVmlldyA9IHRoaXMuY29udGVudEVsLmNyZWF0ZURpdigpO1xuICAgIGZsYXNoY2FyZFZpZXcuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzci1mbGFzaGNhcmQtdmlld1wiKTtcbiAgICB0aGlzLmZsYXNoY2FyZFZpZXcgPSBmbGFzaGNhcmRWaWV3O1xuXG4gICAgLy8gQm90dG9tIHJlc3BvbnNlIG1lbnVcbiAgICBsZXQgb3V0ID0gc2V0dXBSZXNwb25zZU1lbnUodGhpcy5jb250ZW50RWwsIHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MpO1xuICAgIC8vIHRoaXMucmVzcG9uc2VEaXYgPSBvdXQucmVzcG9uc2VEaXY7XG5cbiAgICB0aGlzLmFuc3dlckJ0biA9IG91dC5hbnN3ZXJCdG47XG4gICAgdGhpcy5hbnN3ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMuc2hvd0Fuc3dlcigpKTtcblxuICAgIHRoaXMucmF0aW5nQnRuc0RpdiA9IG91dC5yYXRpbmdCdG5zRGl2O1xuICAgIGZvckVhY2hCdXR0b24oKGJ1dHRvbklkLCByZXNwb25zZSkgPT4ge1xuICAgICAgdGhpcy5yYXRpbmdCdG5zRGl2LmNoaWxkcmVuLm5hbWVkSXRlbShidXR0b25JZClcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZXZpZXdDYXJkVXNlQ2FzZS5leGVjdXRlKHtcbiAgICAgICAgICAgIGNhcmQ6IHRoaXMuY3VycmVudENhcmQsXG4gICAgICAgICAgICByZXZpZXdSYXRpbmc6IHJlc3BvbnNlXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5zaG93TmV4dENhcmQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuXG4gIHByaXZhdGUgc2hvd0Fuc3dlciAoKTogdm9pZCB7XG4gICAgLy8gdGhpcy5tb2RlID0gRmxhc2hjYXJkTW9kYWxNb2RlLkJhY2s7XG5cbiAgICAvLyBIaWRlIFwiU2hvdyBhbnN3ZXJcIiBidXR0b25zXG4gICAgdGhpcy5hbnN3ZXJCdG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIC8vIFNob3cgcmF0aW5nIGJ1dHRvbnNcbiAgICB0aGlzLnJhdGluZ0J0bnNEaXYuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuXG4gICAgLy8gaWYgKHRoaXMuY3VycmVudENhcmQuaXNEdWUpIHtcbiAgICAvLyAgICAgdGhpcy5yZXNldEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIC8vIH1cblxuICAgIC8vIGlmICh0aGlzLmN1cnJlbnRDYXJkLmNhcmRUeXBlICE9PSBDYXJkVHlwZS5DbG96ZSkge1xuICAgIC8vICAgICBjb25zdCBocjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHJcIik7XG4gICAgLy8gICAgIGhyLnNldEF0dHJpYnV0ZShcImlkXCIsIFwic3ItaHItY2FyZC1kaXZpZGVcIik7XG4gICAgLy8gICAgIHRoaXMuZmxhc2hjYXJkVmlldy5hcHBlbmRDaGlsZChocik7XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgICAgdGhpcy5mbGFzaGNhcmRWaWV3LmVtcHR5KCk7XG4gICAgLy8gfVxuXG4gICAgLy8gU2hvdyB0aGUgYmFjayBvZiB0aGUgY2FyZFxuICAgIC8vIGNvbnN0IGhyOiBIVE1MRWxlbWVudCA9IHRoaXMuZmxhc2hjYXJkVmlldy5jcmVhdGVFbChcImhyXCIsIFwic3ItaHItY2FyZC1kaXZpZGVcIik7XG4gICAgdGhpcy5mbGFzaGNhcmRWaWV3LmNyZWF0ZUVsKFwiaHJcIiwgXCJzci1oci1jYXJkLWRpdmlkZVwiKTtcblxuICAgIHJlbmRlck1hcmtkb3duV3JhcHBlcih0aGlzLmN1cnJlbnRDYXJkLmJhY2ssIHRoaXMuY3VycmVudENhcmQubG9jYXRpb24uZmlsZSwgdGhpcy5mbGFzaGNhcmRWaWV3KTtcblxuICB9XG5cbiAgc2hvd05leHRDYXJkICgpOiB2b2lkIHtcblxuICAgIC8vIEhpZGUgcmF0aW5nIGJ1dHRvbnNcbiAgICB0aGlzLnJhdGluZ0J0bnNEaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIC8vIHRoaXMucmVzZXRCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgIC8vIHRoaXMudGl0bGVFbC5zZXRUZXh0KFxuICAgIC8vICAgYCR7dGhpcy5kZWNrTmFtZX06ICR7dGhpcy5kdWVGbGFzaGNhcmRzQ291bnQgKyB0aGlzLm5ld0ZsYXNoY2FyZHNDb3VudH1gXG4gICAgLy8gKTtcblxuICAgIC8vIFNob3cgXCJzaG93IGFuc3dlclwiIGJ1dHRvblxuICAgIHRoaXMuYW5zd2VyQnRuLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICB0aGlzLmZsYXNoY2FyZFZpZXcuZW1wdHkoKTtcbiAgICAvLyB0aGlzLm1vZGUgPSBGbGFzaGNhcmR0aGlzTW9kZS5Gcm9udDtcblxuICAgIHRoaXMuY3VycmVudENhcmQgPSB0aGlzLmdldE5ld0NhcmQoKTtcbiAgICByZW5kZXJNYXJrZG93bldyYXBwZXIodGhpcy5jdXJyZW50Q2FyZC5mcm9udCwgdGhpcy5jdXJyZW50Q2FyZC5sb2NhdGlvbi5maWxlLCB0aGlzLmZsYXNoY2FyZFZpZXcpO1xuXG4gICAgLy8gbGV0IGdldEludGVydmFsID0gKHJlc3BvbnNlOiBSZXZpZXdSZXNwb25zZSkgPT4ge1xuICAgIC8vICAgY29uc3QgY2FyZFN0YXRzID0gc2NoZWR1bGUoXG4gICAgLy8gICAgIHJlc3BvbnNlLFxuICAgIC8vICAgICBuZXdDYXJkU3RhdHMsXG4gICAgLy8gICAgIHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3NcbiAgICAvLyAgIClcbiAgICAvLyAgIHJldHVybiBjYXJkU3RhdHMuaW50ZXJ2YWxcbiAgICAvLyB9XG5cbiAgICAvLyBTZXQgbmV3IGJ1dHRvbiB0ZXh0XG4gICAgLy8gZm9yRWFjaEJ1dHRvbihcbiAgICAvLyAgIChidXR0b25JZDogc3RyaW5nLCByZXNwb25zZTogQ2FyZFJldmlld1JhdGluZykgPT4ge1xuICAgIC8vICAgICBsZXQgbmV3QnRuVGV4dCA9IHRleHRJbnRlcnZhbChnZXRJbnRlcnZhbChyZXNwb25zZSksIHRydWUpXG4gICAgLy8gICAgIHRoaXMucmF0aW5nQnRuc0Rpdi5jaGlsZHJlbi5uYW1lZEl0ZW0oYnV0dG9uSWQpLnNldFRleHQobmV3QnRuVGV4dCk7XG4gICAgLy8gICB9XG4gICAgLy8gKVxuXG4gICAgLy8gaWYgKHRoaXMuaWdub3JlU3RhdHMpIHtcbiAgICAvLyAgIC8vIFNhbWUgZm9yIG1vYmlsZS9kZXNrdG9wXG4gICAgLy8gICB0aGlzLmhhcmRCdG4uc2V0VGV4dChgJHt0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLmZsYXNoY2FyZEhhcmRUZXh0fWApO1xuICAgIC8vICAgdGhpcy5lYXN5QnRuLnNldFRleHQoYCR7dGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5mbGFzaGNhcmRFYXN5VGV4dH1gKTtcbiAgICAvLyB9IGVsc2UgaWYgKFBsYXRmb3JtLmlzTW9iaWxlKSB7XG4gICAgLy8gICB0aGlzLmhhcmRCdG4uc2V0VGV4dCh0ZXh0SW50ZXJ2YWwoaGFyZEludGVydmFsLCB0cnVlKSk7XG4gICAgLy8gICB0aGlzLmdvb2RCdG4uc2V0VGV4dCh0ZXh0SW50ZXJ2YWwoZ29vZEludGVydmFsLCB0cnVlKSk7XG4gICAgLy8gICB0aGlzLmVhc3lCdG4uc2V0VGV4dCh0ZXh0SW50ZXJ2YWwoZWFzeUludGVydmFsLCB0cnVlKSk7XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIHRoaXMuaGFyZEJ0bi5zZXRUZXh0KFxuICAgIC8vICAgICBgJHt0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLmZsYXNoY2FyZEhhcmRUZXh0fSAtICR7dGV4dEludGVydmFsKFxuICAgIC8vICAgICAgIGhhcmRJbnRlcnZhbCxcbiAgICAvLyAgICAgICBmYWxzZVxuICAgIC8vICAgICApfWBcbiAgICAvLyAgICk7XG4gICAgLy8gICB0aGlzLmdvb2RCdG4uc2V0VGV4dChcbiAgICAvLyAgICAgYCR7dGhpcy5wbHVnaW4uZGF0YS5zZXR0aW5ncy5mbGFzaGNhcmRHb29kVGV4dH0gLSAke3RleHRJbnRlcnZhbChcbiAgICAvLyAgICAgICBnb29kSW50ZXJ2YWwsXG4gICAgLy8gICAgICAgZmFsc2VcbiAgICAvLyAgICAgKX1gXG4gICAgLy8gICApO1xuICAgIC8vICAgdGhpcy5lYXN5QnRuLnNldFRleHQoXG4gICAgLy8gICAgIGAke3RoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MuZmxhc2hjYXJkRWFzeVRleHR9IC0gJHt0ZXh0SW50ZXJ2YWwoXG4gICAgLy8gICAgICAgZWFzeUludGVydmFsLFxuICAgIC8vICAgICAgIGZhbHNlXG4gICAgLy8gICAgICl9YFxuICAgIC8vICAgKTtcbiAgICAvLyB9XG5cbiAgICAvLyAgIGlmICh0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLnNob3dDb250ZXh0SW5DYXJkcyl7XG4gICAgLy8gICAgIHRoaXMuY29udGV4dFZpZXcuc2V0VGV4dCh0aGlzLmN1cnJlbnRDYXJkLmNvbnRleHQpO1xuICAgIC8vIH1cbiAgfVxuXG4gIC8qKlxuICAqIFNlbGVjdCBuZXcgY2FyZCBmcm9tIHBvb2wgb2YgZHVlIGFuZCBuZXcgY2FyZHMgYW5kIGdldCBpdHMgc3RhdHMuXG4gICovXG4gIGdldE5ld0NhcmQgKCk6IE9ic2lkaWFuQ2FyZCB7XG4gICAgY29uc3QgbmV3Q2FyZCA9IHRoaXMuY2FyZHNUb1Jldmlld1t0aGlzLmNhcmRJbmRleF07XG4gICAgY29uc29sZS5sb2coXCJuZXcgY2FyZCBcIiwgbmV3Q2FyZCk7XG4gICAgdGhpcy5jYXJkSW5kZXggKz0gMTtcbiAgICByZXR1cm4gbmV3Q2FyZDtcblxuXG5cbiAgICAvLyAgIGxldCBpbnRlcnZhbCA9IDEuO1xuICAgIC8vICAgbGV0IGVhc2U6IG51bWJlciA9IHRoaXMucGx1Z2luLmRhdGEuc2V0dGluZ3MuYmFzZUVhc2U7XG4gICAgLy8gICBsZXQgZGVsYXlCZWZvcmVSZXZpZXcgPSAwO1xuICAgIC8vICAgbGV0IG5ld0NhcmQgPSBudWxsO1xuXG4gICAgLy8gICAvLyBJZiB0aGVyZSBhcmUgZHVlIGNhcmRzIGxlZnQgdG8gcmV2aWV3XG4gICAgLy8gICBpZiAodGhpcy5kdWVDYXJkcy5sZW5ndGggPiAwKSB7XG4gICAgLy8gICAgIC8vIEdldCB0aGUgbmV4dCBjYXJkIGluZGV4XG4gICAgLy8gICAgIGlmICh0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLnJhbmRvbWl6ZUNhcmRPcmRlcikge1xuICAgIC8vICAgICAgIHRoaXMuY3VycmVudENhcmRJZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmR1ZUNhcmRzLmxlbmd0aCk7XG4gICAgLy8gICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgdGhpcy5jdXJyZW50Q2FyZElkeCA9IDA7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgLy8gU2hvdyBpdFxuICAgIC8vICAgICBuZXdDYXJkID0gdGhpcy5kdWVDYXJkc1t0aGlzLmN1cnJlbnRDYXJkSWR4XTtcblxuICAgIC8vICAgICAvLyBsZXQgbmV3Q2FyZFN0YXRzID0gdGhpcy5jdXJyZW50Q2FyZC5zdGF0cztcbiAgICAvLyAgICAgLy8gaW50ZXJ2YWwgPSB0aGlzLmN1cnJlbnRDYXJkLmludGVydmFsO1xuICAgIC8vICAgICAvLyBlYXNlID0gdGhpcy5jdXJyZW50Q2FyZC5lYXNlO1xuICAgIC8vICAgICAvLyBkZWxheUJlZm9yZVJldmlldyA9IHRoaXMuY3VycmVudENhcmQuZGVsYXlCZWZvcmVSZXZpZXc7XG5cbiAgICAvLyAgICAgLy8gSWYgdGhlcmUgYXJlIG5vIG1vcmUgZHVlIGNhcmRzIGJ1dCB0aGVyZSBhcmUgbmV3IGNhcmRzXG4gICAgLy8gICB9IGVsc2UgaWYgKHRoaXMubmV3Q2FyZHMubGVuZ3RoID4gMCkge1xuXG4gICAgLy8gICAgIC8vIEdldCB0aGUgbmV4dCBjYXJkIGluZGV4XG4gICAgLy8gICAgIGlmICh0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLnJhbmRvbWl6ZUNhcmRPcmRlcikge1xuXG4gICAgLy8gICAgICAgY29uc3QgbmV3Q2FyZElkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMubmV3Q2FyZHMubGVuZ3RoKTtcblxuICAgIC8vICAgICAgIGxldCBmaW5kRmlyc3RVbnNjaGVkdWxlZFNpYmxpbmcgPSAocGlja2VkQ2FyZElkeDogbnVtYmVyKSA9PiB7XG4gICAgLy8gICAgICAgICBjb25zdCBwaWNrZWRDYXJkOiBDYXJkID0gdGhpcy5uZXdDYXJkc1twaWNrZWRDYXJkSWR4XTtcbiAgICAvLyAgICAgICAgIGxldCBpZHggPSBwaWNrZWRDYXJkSWR4O1xuICAgIC8vICAgICAgICAgbGV0IGZpcnN0U2libGluZ0lkeCA9IHBpY2tlZENhcmRJZHg7XG5cbiAgICAvLyAgICAgICAgIHdoaWxlIChpZHggPj0gMCAmJiBwaWNrZWRDYXJkLnNpYmxpbmdzLmluY2x1ZGVzKHRoaXMubmV3Q2FyZHNbaWR4XSkpIHtcbiAgICAvLyAgICAgICAgICAgaWYgKCF0aGlzLm5ld0NhcmRzW2lkeF0uaXNEdWUpIHtcbiAgICAvLyAgICAgICAgICAgICBmaXJzdFNpYmxpbmdJZHggPSBpZHg7XG4gICAgLy8gICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgaWR4LS07XG4gICAgLy8gICAgICAgICB9XG5cbiAgICAvLyAgICAgICAgIHJldHVybiBmaXJzdFNpYmxpbmdJZHhcbiAgICAvLyAgICAgICB9O1xuXG4gICAgLy8gICAgICAgdGhpcy5jdXJyZW50Q2FyZElkeCA9IGZpbmRGaXJzdFVuc2NoZWR1bGVkU2libGluZyhuZXdDYXJkSWR4KVxuXG4gICAgLy8gICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgdGhpcy5jdXJyZW50Q2FyZElkeCA9IDA7XG4gICAgLy8gICAgIH1cblxuICAgIC8vICAgICBuZXdDYXJkID0gdGhpcy5uZXdDYXJkc1t0aGlzLmN1cnJlbnRDYXJkSWR4XTtcblxuICAgIC8vICAgICBpZiAoXG4gICAgLy8gICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuICAgIC8vICAgICAgICAgdGhpcy5wbHVnaW4uZWFzZUJ5UGF0aCxcbiAgICAvLyAgICAgICAgIHRoaXMuY3VycmVudENhcmQubm90ZS5wYXRoXG4gICAgLy8gICAgICAgKVxuICAgIC8vICAgICApIHtcbiAgICAvLyAgICAgICBlYXNlID0gdGhpcy5wbHVnaW4uZWFzZUJ5UGF0aFt0aGlzLmN1cnJlbnRDYXJkLm5vdGUucGF0aF07XG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH1cblxuICAgIC8vICAgcmV0dXJuIFtuZXdDYXJkLCB7IGludGVydmFsLCBlYXNlLCBkZWxheUJlZm9yZVJldmlldyB9XTtcblxuICB9XG59XG5cbiIsICJpbXBvcnQgeyBNYXJrZG93blJlbmRlcmVyLCBURmlsZSB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgSU1BR0VfRk9STUFUUywgQVVESU9fRk9STUFUUywgVklERU9fRk9STUFUUywgfSBmcm9tIFwic3JjL2NvbnN0YW50c1wiO1xuXG4vLyBzbGlnaHRseSBtb2RpZmllZCB2ZXJzaW9uIG9mIHRoZSByZW5kZXJNYXJrZG93biBmdW5jdGlvbiBpblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL21nbWV5ZXJzL29ic2lkaWFuLWthbmJhbi9ibG9iL21haW4vc3JjL0thbmJhblZpZXcudHN4XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVuZGVyTWFya2Rvd25XcmFwcGVyIChcbiAgbWFya2Rvd25TdHJpbmc6IHN0cmluZyxcbiAgbm90ZTogVEZpbGUsXG4gIGNvbnRhaW5lckVsOiBIVE1MRWxlbWVudCxcbiAgcmVjdXJzaXZlRGVwdGggPSAwXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKHJlY3Vyc2l2ZURlcHRoID4gNCkgcmV0dXJuO1xuXG4gIE1hcmtkb3duUmVuZGVyZXIucmVuZGVyTWFya2Rvd24oXG4gICAgbWFya2Rvd25TdHJpbmcsXG4gICAgY29udGFpbmVyRWwsXG4gICAgbm90ZS5wYXRoLFxuICAgIHRoaXMucGx1Z2luXG4gICk7XG5cbiAgY29udGFpbmVyRWwuZmluZEFsbChcIi5pbnRlcm5hbC1lbWJlZFwiKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgIGNvbnN0IGxpbmsgPSBwYXJzZUxpbmsoZWwuZ2V0QXR0cmlidXRlKFwic3JjXCIpKTtcblxuICAgIC8vIGZpbGUgZG9lcyBub3QgZXhpc3QsIGRpc3BsYXkgZGVhZCBsaW5rXG4gICAgaWYgKCFsaW5rLnRhcmdldCkge1xuICAgICAgZWwuaW5uZXJUZXh0ID0gbGluay50ZXh0O1xuICAgIH0gZWxzZSBpZiAobGluay50YXJnZXQgaW5zdGFuY2VvZiBURmlsZSkge1xuICAgICAgaWYgKGxpbmsudGFyZ2V0LmV4dGVuc2lvbiAhPT0gXCJtZFwiKSB7XG4gICAgICAgIGVtYmVkTWVkaWFGaWxlKGVsLCBsaW5rLnRhcmdldCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5pbm5lclRleHQgPSBcIlwiO1xuICAgICAgICByZW5kZXJUcmFuc2NsdWRlKGVsLCBub3RlLCBsaW5rLCByZWN1cnNpdmVEZXB0aCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gcGFyc2VMaW5rIChzcmM6IHN0cmluZykge1xuICBjb25zdCBsaW5rQ29tcG9uZW50c1JlZ2V4ID1cbiAgICAvXig/PGZpbGU+W14jXl0rKT8oPzojKD8hXFxeKSg/PGhlYWRpbmc+LispfCNcXF4oPzxibG9ja0lkPi4rKXwjKT8kLztcbiAgY29uc3QgbWF0Y2hlZCA9IHR5cGVvZiBzcmMgPT09IFwic3RyaW5nXCIgJiYgc3JjLm1hdGNoKGxpbmtDb21wb25lbnRzUmVnZXgpO1xuICBjb25zdCBmaWxlID0gbWF0Y2hlZC5ncm91cHMuZmlsZSB8fCB0aGlzLmN1cnJlbnRDYXJkLm5vdGUucGF0aDtcbiAgY29uc3QgdGFyZ2V0ID0gdGhpcy5wbHVnaW4uYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0Rmlyc3RMaW5rcGF0aERlc3QoXG4gICAgZmlsZSxcbiAgICB0aGlzLmN1cnJlbnRDYXJkLm5vdGUucGF0aFxuICApO1xuICByZXR1cm4ge1xuICAgIHRleHQ6IG1hdGNoZWRbMF0sXG4gICAgZmlsZTogbWF0Y2hlZC5ncm91cHMuZmlsZSxcbiAgICBoZWFkaW5nOiBtYXRjaGVkLmdyb3Vwcy5oZWFkaW5nLFxuICAgIGJsb2NrSWQ6IG1hdGNoZWQuZ3JvdXBzLmJsb2NrSWQsXG4gICAgdGFyZ2V0OiB0YXJnZXQsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGVtYmVkTWVkaWFGaWxlIChlbDogSFRNTEVsZW1lbnQsIHRhcmdldDogVEZpbGUpIHtcbiAgZWwuaW5uZXJUZXh0ID0gXCJcIjtcbiAgaWYgKElNQUdFX0ZPUk1BVFMuaW5jbHVkZXModGFyZ2V0LmV4dGVuc2lvbikpIHtcbiAgICBlbC5jcmVhdGVFbChcbiAgICAgIFwiaW1nXCIsXG4gICAgICB7XG4gICAgICAgIGF0dHI6IHtcbiAgICAgICAgICBzcmM6IHRoaXMucGx1Z2luLmFwcC52YXVsdC5nZXRSZXNvdXJjZVBhdGgodGFyZ2V0KSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICAoaW1nKSA9PiB7XG4gICAgICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUoXCJ3aWR0aFwiKSlcbiAgICAgICAgICBpbWcuc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgZWwuZ2V0QXR0cmlidXRlKFwid2lkdGhcIikpO1xuICAgICAgICBlbHNlIGltZy5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCBcIjEwMCVcIik7XG4gICAgICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUoXCJhbHRcIikpIGltZy5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgZWwuZ2V0QXR0cmlidXRlKFwiYWx0XCIpKTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgICAgKGV2KSA9PlxuICAgICAgICAgICgoZXYudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5taW5XaWR0aCA9XG4gICAgICAgICAgICAoZXYudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5taW5XaWR0aCA9PT0gXCIxMDAlXCJcbiAgICAgICAgICAgICAgPyBudWxsXG4gICAgICAgICAgICAgIDogXCIxMDAlXCIpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgKTtcbiAgICBlbC5hZGRDbGFzc2VzKFtcImltYWdlLWVtYmVkXCIsIFwiaXMtbG9hZGVkXCJdKTtcbiAgfSBlbHNlIGlmIChcbiAgICBBVURJT19GT1JNQVRTLmluY2x1ZGVzKHRhcmdldC5leHRlbnNpb24pIHx8XG4gICAgVklERU9fRk9STUFUUy5pbmNsdWRlcyh0YXJnZXQuZXh0ZW5zaW9uKVxuICApIHtcbiAgICBlbC5jcmVhdGVFbChcbiAgICAgIEFVRElPX0ZPUk1BVFMuaW5jbHVkZXModGFyZ2V0LmV4dGVuc2lvbikgPyBcImF1ZGlvXCIgOiBcInZpZGVvXCIsXG4gICAgICB7XG4gICAgICAgIGF0dHI6IHtcbiAgICAgICAgICBjb250cm9sczogXCJcIixcbiAgICAgICAgICBzcmM6IHRoaXMucGx1Z2luLmFwcC52YXVsdC5nZXRSZXNvdXJjZVBhdGgodGFyZ2V0KSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICAoYXVkaW8pID0+IHtcbiAgICAgICAgaWYgKGVsLmhhc0F0dHJpYnV0ZShcImFsdFwiKSkgYXVkaW8uc2V0QXR0cmlidXRlKFwiYWx0XCIsIGVsLmdldEF0dHJpYnV0ZShcImFsdFwiKSk7XG4gICAgICB9XG4gICAgKTtcbiAgICBlbC5hZGRDbGFzc2VzKFtcIm1lZGlhLWVtYmVkXCIsIFwiaXMtbG9hZGVkXCJdKTtcbiAgfSBlbHNlIHtcbiAgICBlbC5pbm5lclRleHQgPSB0YXJnZXQucGF0aDtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiByZW5kZXJUcmFuc2NsdWRlIChcbiAgZWw6IEhUTUxFbGVtZW50LFxuICBub3RlOiBURmlsZSxcbiAgbGluazoge1xuICAgIHRleHQ6IHN0cmluZztcbiAgICBmaWxlOiBzdHJpbmc7XG4gICAgaGVhZGluZzogc3RyaW5nO1xuICAgIGJsb2NrSWQ6IHN0cmluZztcbiAgICB0YXJnZXQ6IFRGaWxlO1xuICB9LFxuICByZWN1cnNpdmVEZXB0aDogbnVtYmVyXG4pIHtcbiAgY29uc3QgY2FjaGUgPSB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldENhY2hlKGxpbmsudGFyZ2V0LnBhdGgpO1xuICBjb25zdCB0ZXh0ID0gYXdhaXQgdGhpcy5hcHAudmF1bHQuY2FjaGVkUmVhZChsaW5rLnRhcmdldCk7XG4gIGxldCBibG9ja1RleHQ7XG4gIGlmIChsaW5rLmhlYWRpbmcpIHtcbiAgICBjb25zdCBjbGVhbiA9IChzOiBzdHJpbmcpID0+IHMucmVwbGFjZSgvW1xcV1xcc10vZywgXCJcIik7XG4gICAgY29uc3QgaGVhZGluZ0luZGV4ID0gY2FjaGUuaGVhZGluZ3M/LmZpbmRJbmRleChcbiAgICAgIChoKSA9PiBjbGVhbihoLmhlYWRpbmcpID09PSBjbGVhbihsaW5rLmhlYWRpbmcpXG4gICAgKTtcbiAgICBjb25zdCBoZWFkaW5nID0gY2FjaGUuaGVhZGluZ3NbaGVhZGluZ0luZGV4XTtcblxuICAgIGNvbnN0IHN0YXJ0QXQgPSBoZWFkaW5nLnBvc2l0aW9uLnN0YXJ0Lm9mZnNldDtcbiAgICBjb25zdCBlbmRBdCA9XG4gICAgICBjYWNoZS5oZWFkaW5ncy5zbGljZShoZWFkaW5nSW5kZXggKyAxKS5maW5kKChoKSA9PiBoLmxldmVsIDw9IGhlYWRpbmcubGV2ZWwpXG4gICAgICAgID8ucG9zaXRpb24/LnN0YXJ0Py5vZmZzZXQgfHwgdGV4dC5sZW5ndGg7XG5cbiAgICBibG9ja1RleHQgPSB0ZXh0LnN1YnN0cmluZyhzdGFydEF0LCBlbmRBdCk7XG4gIH0gZWxzZSBpZiAobGluay5ibG9ja0lkKSB7XG4gICAgY29uc3QgYmxvY2sgPSBjYWNoZS5ibG9ja3NbbGluay5ibG9ja0lkXTtcbiAgICBjb25zdCBzdGFydEF0ID0gYmxvY2sucG9zaXRpb24uc3RhcnQub2Zmc2V0O1xuICAgIGNvbnN0IGVuZEF0ID0gYmxvY2sucG9zaXRpb24uZW5kLm9mZnNldDtcbiAgICBibG9ja1RleHQgPSB0ZXh0LnN1YnN0cmluZyhzdGFydEF0LCBlbmRBdCk7XG4gIH0gZWxzZSB7XG4gICAgYmxvY2tUZXh0ID0gdGV4dDtcbiAgfVxuXG4gIHJlbmRlck1hcmtkb3duV3JhcHBlcihibG9ja1RleHQsIG5vdGUsIGVsLCByZWN1cnNpdmVEZXB0aCArIDEpO1xufVxuIiwgImltcG9ydCB7IE5vdGljZSwgc2V0SWNvbiB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgdCB9IGZyb20gXCJzcmMvbGFuZy9oZWxwZXJzXCI7XG50eXBlIEZsYXNoY2FyZE1lbnVEaXYgPSBIVE1MRGl2RWxlbWVudDtcbmltcG9ydCB7IEZsYXNoY2FyZEVkaXRNb2RhbCB9IGZyb20gXCJzcmMvcmV2aWV3LXZpZXdcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwRmxhc2hDYXJkTWVudSAoZmxhc2hjYXJkTWVudURpdjogRmxhc2hjYXJkTWVudURpdik6IHZvaWQge1xuXG4gIC8vIGxldCBiYWNrQnV0dG9uID0gZmxhc2hjYXJkTWVudURpdi5jcmVhdGVFbChcImJ1dHRvblwiKTtcbiAgLy8gYmFja0J1dHRvbi5hZGRDbGFzcyhcInNyLWZsYXNoY2FyZC1tZW51LWl0ZW1cIik7XG4gIC8vIHNldEljb24oYmFja0J1dHRvbiwgXCJhcnJvdy1sZWZ0XCIpO1xuICAvLyBiYWNrQnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgdChcIkJBQ0tcIikpO1xuICAvLyBiYWNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIC8vICAgdGhpcy5wbHVnaW4uZGF0YS5oaXN0b3J5RGVjayA9IFwiXCI7XG4gIC8vICAgLy8gdGhpcy5kZWNrc0xpc3QoKTtcbiAgLy8gfSk7XG4gIGZ1bmN0aW9uIG1ha2VCdXR0b24gKFxuICAgIGlkOiBzdHJpbmcsXG4gICAgaWNvbk5hbWU6IHN0cmluZyxcbiAgICBhcmlhTGFiZWw6IHN0cmluZyxcbiAgKTogSFRNTEJ1dHRvbkVsZW1lbnQge1xuICAgIGxldCBidXR0b24gPSBmbGFzaGNhcmRNZW51RGl2LmNyZWF0ZUVsKFwiYnV0dG9uXCIpO1xuICAgIGJ1dHRvbi5hZGRDbGFzcyhcInNyLWZsYXNoY2FyZC1tZW51LWl0ZW1cIik7XG4gICAgc2V0SWNvbihidXR0b24sIGljb25OYW1lKTtcbiAgICBidXR0b24uc2V0QXR0cmlidXRlKFwiaWRcIiwgaWQpO1xuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIGFyaWFMYWJlbCk7XG4gICAgcmV0dXJuIGJ1dHRvbjtcbiAgfVxuXG4gIG1ha2VCdXR0b24oXCJzci1xdWl0LXZpZXctYnRuXCIsIFwiYXJyb3ctbGVmdFwiLCB0KFwiQkFDS1wiKSk7XG4gIG1ha2VCdXR0b24oXCJzci1lZGl0LWNhcmQtYnRuXCIsIFwiZWRpdFwiLCB0KFwiRURJVF9DQVJEXCIpKTtcbiAgbWFrZUJ1dHRvbihcInNyLXJlc2V0LWNhcmQtYnRuXCIsIFwicmVmcmVzaC1jd1wiLCB0KFwiUkVTRVRfQ0FSRF9QUk9HUkVTU1wiKSk7XG4gIG1ha2VCdXR0b24oXCJzci1jYXJkLWluZm8tYnRuXCIsIFwiaW5mb1wiLCBcIlZpZXcgQ2FyZCBJbmZvXCIpO1xuICBtYWtlQnV0dG9uKFwic3Itc2tpcC1jYXJkLWJ0blwiLCBcImNoZXZyb25zLXJpZ2h0XCIsIHQoXCJTS0lQXCIpKTtcblxuICAvLyBjb25zdCBza2lwQnV0dG9uID0gZmxhc2hjYXJkTWVudURpdi5jcmVhdGVFbChcIlxuICAvLyBsZXQgZWRpdEJ1dHRvbiA9IGZsYXNoY2FyZE1lbnVEaXYuY3JlYXRlRWwoXCJidXR0b25cIik7XG4gIC8vIGVkaXRCdXR0b24uYWRkQ2xhc3MoKTtcbiAgLy8gc2V0SWNvbihlZGl0QnV0dG9uLCBcImVkaXRcIik7XG4gIC8vIGVkaXRCdXR0b24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzci1lZGl0LWNhcmQtYnRuXCIpO1xuICAvLyBlZGl0QnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgdChcIkVESVRfQ0FSRFwiKSk7XG4gIC8vIGVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgLy8gICAvLyByZW1vdmUgU1IgaW5mbyBmcm9tIGlucHV0IG1vZGFsIHByb21wdFxuICAvLyAgIGNvbnN0IHRleHRQcm9tcHRBcnIgPSB0aGlzLmN1cnJlbnRDYXJkLmNhcmRUZXh0LnNwbGl0KFwiXFxuXCIpO1xuICAvLyAgIGxldCB0ZXh0UHJvbXB0ID0gXCJcIjtcbiAgLy8gICBpZiAodGV4dFByb21wdEFyclt0ZXh0UHJvbXB0QXJyLmxlbmd0aCAtIDFdLnN0YXJ0c1dpdGgoXCI8IS0tU1I6XCIpKSB7XG4gIC8vICAgICB0ZXh0UHJvbXB0ID0gdGV4dFByb21wdEFyci5zbGljZSgwLCAtMSkuam9pbihcIlxcblwiKTtcbiAgLy8gICB9IGVsc2Uge1xuICAvLyAgICAgdGV4dFByb21wdCA9IHRoaXMuY3VycmVudENhcmQuY2FyZFRleHQ7XG4gIC8vICAgfVxuXG4gIC8vICAgY29uc3QgZWRpdE1vZGFsID0gRmxhc2hjYXJkRWRpdE1vZGFsLlByb21wdCh0aGlzLmFwcCwgdGhpcy5wbHVnaW4sIHRleHRQcm9tcHQpO1xuICAvLyAgIGVkaXRNb2RhbFxuICAvLyAgICAgLnRoZW4oYXN5bmMgKG1vZGlmaWVkQ2FyZFRleHQpID0+IHtcbiAgLy8gICAgICAgdGhpcy5tb2RpZnlDYXJkVGV4dCh0ZXh0UHJvbXB0LCBtb2RpZmllZENhcmRUZXh0KTtcbiAgLy8gICAgIH0pXG4gIC8vICAgICAuY2F0Y2goKHJlYXNvbikgPT4gY29uc29sZS5sb2cocmVhc29uKSk7XG4gIC8vIH0pO1xuXG4gIC8vIGxldCByZXNldEJ1dHRvbiA9IGZsYXNoY2FyZE1lbnVEaXYuY3JlYXRlRWwoXCJidXR0b25cIik7XG4gIC8vIHJlc2V0QnV0dG9uLmFkZENsYXNzKFwic3ItZmxhc2hjYXJkLW1lbnUtaXRlbVwiKTtcbiAgLy8gc2V0SWNvbihyZXNldEJ1dHRvbiwgXCJyZWZyZXNoLWN3XCIpO1xuICAvLyByZXNldEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInNyLXJlc2V0LWNhcmQtYnRuXCIpO1xuICAvLyByZXNldEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIHQoXCJSRVNFVF9DQVJEX1BST0dSRVNTXCIpKTtcbiAgLy8gcmVzZXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgLy8gICAgIHRoaXMucHJvY2Vzc1JldmlldyhSZXZpZXdSZXNwb25zZS5SZXNldCk7XG4gIC8vIH0pO1xuXG4gIC8vIGNvbnN0IGNhcmRJbmZvID0gZmxhc2hjYXJkTWVudURpdi5jcmVhdGVFbChcImJ1dHRvblwiKTtcbiAgLy8gY2FyZEluZm8uYWRkQ2xhc3MoXCJzci1mbGFzaGNhcmQtbWVudS1pdGVtXCIpO1xuICAvLyBzZXRJY29uKGNhcmRJbmZvLCBcImluZm9cIik7XG4gIC8vIGNhcmRJbmZvLnNldEF0dHJpYnV0ZShcImlkXCIsIFwic3ItY2FyZC1pbmZvLWJ0blwiKTtcbiAgLy8gY2FyZEluZm8uc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIlZpZXcgQ2FyZCBJbmZvXCIpO1xuICAvLyBjYXJkSW5mby5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuICAvLyBjb25zdCBjdXJyZW50RWFzZVN0ciA9IHQoXCJDVVJSRU5UX0VBU0VfSEVMUF9URVhUXCIpICsgKHRoaXMuY3VycmVudENhcmQuZWFzZSA/PyB0KFwiTkVXXCIpKTtcbiAgLy8gY29uc3QgY3VycmVudEludGVydmFsU3RyID0gdChcIkNVUlJFTlRfSU5URVJWQUxfSEVMUF9URVhUXCIpICsgdGV4dEludGVydmFsKHRoaXMuY3VycmVudENhcmQuaW50ZXJ2YWwsIGZhbHNlKTtcbiAgLy8gY29uc3QgZ2VuZXJhdGVkRnJvbVN0ciA9IHQoXCJDQVJEX0dFTkVSQVRFRF9GUk9NXCIsIHtcbiAgLy8gICBub3RlUGF0aDogdGhpcy5jdXJyZW50Q2FyZC5ub3RlLnBhdGgsXG4gIC8vIH0pO1xuICAvLyBuZXcgTm90aWNlKGN1cnJlbnRFYXNlU3RyICsgXCJcXG5cIiArIGN1cnJlbnRJbnRlcnZhbFN0ciArIFwiXFxuXCIgKyBnZW5lcmF0ZWRGcm9tU3RyKTtcbiAgLy8gfSk7XG5cbiAgLy8gY29uc3Qgc2tpcEJ1dHRvbiA9IGZsYXNoY2FyZE1lbnVEaXYuY3JlYXRlRWwoXCJidXR0b25cIik7XG4gIC8vIHNraXBCdXR0b24uYWRkQ2xhc3MoXCJzci1mbGFzaGNhcmQtbWVudS1pdGVtXCIpO1xuICAvLyByZXNldEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInNyLWNhcmQtaW5mby1idG5cIik7XG4gIC8vIHNldEljb24oc2tpcEJ1dHRvbiwgXCJjaGV2cm9ucy1yaWdodFwiKTtcbiAgLy8gc2tpcEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIHQoXCJTS0lQXCIpKTtcbiAgLy8gc2tpcEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAvLyAgIHRoaXMuc2hvd05leHRDYXJkKCk7XG4gIC8vIH0pO1xuXG4gIC8vIGlmICh0aGlzLnBsdWdpbi5kYXRhLnNldHRpbmdzLnNob3dDb250ZXh0SW5DYXJkcykge1xuICAvLyAgIHRoaXMuY29udGV4dFZpZXcgPSB0aGlzLmNvbnRlbnRFbC5jcmVhdGVEaXYoKTtcbiAgLy8gICB0aGlzLmNvbnRleHRWaWV3LnNldEF0dHJpYnV0ZShcImlkXCIsIFwic3ItY29udGV4dFwiKTtcbiAgLy8gfVxufVxuXG4iLCAiaW1wb3J0IHsgdCB9IGZyb20gXCJzcmMvbGFuZy9oZWxwZXJzXCI7XG5pbXBvcnQgeyBTUlNldHRpbmdzIH0gZnJvbSBcInNyYy9zZXR0aW5nc1wiO1xuXG5leHBvcnQgdHlwZSBSZXNwb25zZU1lbnVEaXYgPSBIVE1MRGl2RWxlbWVudDtcbmV4cG9ydCB0eXBlIFJhdGluZ0J0bnNEaXYgPSBIVE1MRGl2RWxlbWVudDtcbmV4cG9ydCB0eXBlIEFuc3dlckJ0biA9IEhUTUxCdXR0b25FbGVtZW50O1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cFJlc3BvbnNlTWVudSAoY29udGVudEVsOiBIVE1MRWxlbWVudCwgc2V0dGluZ3M6IFNSU2V0dGluZ3MpOiB7IHJlc3BvbnNlRGl2OiBSZXNwb25zZU1lbnVEaXYsIHJhdGluZ0J0bnNEaXY6IFJhdGluZ0J0bnNEaXYsIGFuc3dlckJ0bjogQW5zd2VyQnRuOyB9IHtcbiAgbGV0IHJlc3BvbnNlRGl2ID0gY29udGVudEVsLmNyZWF0ZURpdihcInNyLWZsYXNoY2FyZC1yZXNwb25zZVwiKTtcblxuICBsZXQgcmF0aW5nQnRuc0RpdiA9IHJlc3BvbnNlRGl2LmNyZWF0ZURpdihcInNyLWZsYXNoY2FyZC1yYXRpbmctYnRuc1wiKTtcbiAgcmF0aW5nQnRuc0Rpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbiAgbGV0IGhhcmRCdG4gPSByYXRpbmdCdG5zRGl2LmNyZWF0ZUVsKFwiYnV0dG9uXCIpO1xuICBoYXJkQnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIFwic3ItaGFyZC1idG5cIik7XG4gIGhhcmRCdG4uc2V0VGV4dChzZXR0aW5ncy5mbGFzaGNhcmRIYXJkVGV4dCk7XG5cbiAgbGV0IGdvb2RCdG4gPSByYXRpbmdCdG5zRGl2LmNyZWF0ZUVsKFwiYnV0dG9uXCIpO1xuICBnb29kQnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIFwic3ItZ29vZC1idG5cIik7XG4gIGdvb2RCdG4uc2V0VGV4dChzZXR0aW5ncy5mbGFzaGNhcmRHb29kVGV4dCk7XG5cbiAgbGV0IGVhc3lCdG4gPSByYXRpbmdCdG5zRGl2LmNyZWF0ZUVsKFwiYnV0dG9uXCIpO1xuICBlYXN5QnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIFwic3ItZWFzeS1idG5cIik7XG4gIGVhc3lCdG4uc2V0VGV4dChzZXR0aW5ncy5mbGFzaGNhcmRFYXN5VGV4dCk7XG5cblxuICBsZXQgYW5zd2VyQnRuID0gcmVzcG9uc2VEaXYuY3JlYXRlRWwoXCJidXR0b25cIik7XG4gIGFuc3dlckJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInNyLXNob3ctYW5zd2VyLWJ0blwiKTtcbiAgYW5zd2VyQnRuLnNldFRleHQodChcIlNIT1dfQU5TV0VSXCIpKTtcblxuICAvLyBpZiAodGhpcy5pZ25vcmVTdGF0cykge1xuICAvLyAgICAgZ29vZEJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbiAgLy8gICAgIHJlc3BvbnNlRGl2LmFkZENsYXNzKFwic3ItaWdub3Jlc3RhdHMtcmVzcG9uc2VcIik7XG4gIC8vICAgICBlYXN5QnRuLmFkZENsYXNzKFwic3ItaWdub3Jlc3RhdHMtYnRuXCIpO1xuICAvLyAgICAgaGFyZEJ0bi5hZGRDbGFzcyhcInNyLWlnbm9yZXN0YXRzLWJ0blwiKTtcbiAgLy8gfVxuXG4gIHJldHVybiB7IHJlc3BvbnNlRGl2LCByYXRpbmdCdG5zRGl2LCBhbnN3ZXJCdG4gfTtcbn1cblxuIiwgImltcG9ydCB7IENhcmRSZXZpZXdSYXRpbmcgfSBmcm9tIFwic3JjL2RkZC9tb2R1bGVzL3Jldmlldy9kb21haW4vQ2FyZFJldmlld1JhdGluZ1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaEJ1dHRvbiAoZm46IChidXR0b25JZDogc3RyaW5nLCByZXZpZXdSYXRpbmc6IENhcmRSZXZpZXdSYXRpbmcpID0+IHZvaWQpOiB2b2lkIHtcbiAgY29uc3QgYnV0dG9uSW5mbzogW3N0cmluZywgQ2FyZFJldmlld1JhdGluZ11bXSA9IFtcbiAgICBbXCJzci1oYXJkLWJ0blwiLCBDYXJkUmV2aWV3UmF0aW5nLkhhcmRdLFxuICAgIFtcInNyLWdvb2QtYnRuXCIsIENhcmRSZXZpZXdSYXRpbmcuTWVkaXVtXSxcbiAgICBbXCJzci1lYXN5LWJ0blwiLCBDYXJkUmV2aWV3UmF0aW5nLkVhc3ldLFxuICBdO1xuICBmb3IgKGxldCBbYnV0dG9uSWQsIHJldmlld1JhdGluZ10gb2YgYnV0dG9uSW5mbykge1xuICAgIGZuKGJ1dHRvbklkLCByZXZpZXdSYXRpbmcpO1xuICB9XG59O1xuIiwgImFic3RyYWN0IGNsYXNzIF9SZXN1bHQ8VCwgRSBleHRlbmRzIEVycm9yPiB7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBfY2hhaW48WCwgVSBleHRlbmRzIEVycm9yPihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBVPlxuICApOiBSZXN1bHQ8WCwgVT47XG5cbiAgdW53cmFwKCk6IFQ7XG4gIHVud3JhcDxVPihvazogKHZhbHVlOiBUKSA9PiBVKTogVTtcbiAgdW53cmFwPFUsIFY+KG9rOiAodmFsdWU6IFQpID0+IFUsIGVycjogKGVycm9yOiBFKSA9PiBWKTogVSB8IFY7XG4gIHVud3JhcDxVPihvazogKHZhbHVlOiBUKSA9PiBVLCBlcnI6IChlcnJvcjogRSkgPT4gVSk6IFU7XG4gIHVud3JhcChvaz86ICh2YWx1ZTogVCkgPT4gdW5rbm93biwgZXJyPzogKGVycm9yOiBFKSA9PiB1bmtub3duKTogdW5rbm93biB7XG4gICAgY29uc3QgciA9IHRoaXMuX2NoYWluKFxuICAgICAgdmFsdWUgPT4gUmVzdWx0Lm9rKG9rID8gb2sodmFsdWUpIDogdmFsdWUpLFxuICAgICAgZXJyb3IgPT4gKGVyciA/IFJlc3VsdC5vayhlcnIoZXJyb3IpKSA6IFJlc3VsdC5lcnIoZXJyb3IpKVxuICAgICk7XG4gICAgaWYgKHIuaXNFcnIpIHtcbiAgICAgIHRocm93IHIuZXJyb3I7XG4gICAgfVxuICAgIHJldHVybiByLnZhbHVlO1xuICB9XG5cbiAgbWFwPFU+KG9rOiAodmFsdWU6IFQpID0+IFUpOiBSZXN1bHQ8VSwgRT47XG4gIG1hcDxVLCBGIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFUsXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IEZcbiAgKTogUmVzdWx0PFUsIEY+O1xuICBtYXAob2s6ICh2YWx1ZTogVCkgPT4gdW5rbm93biwgZXJyPzogKGVycm9yOiBFKSA9PiBFcnJvcik6IFJlc3VsdDx1bmtub3duPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYWluKFxuICAgICAgdmFsdWUgPT4gUmVzdWx0Lm9rKG9rKHZhbHVlKSksXG4gICAgICBlcnJvciA9PiBSZXN1bHQuZXJyKGVyciA/IGVycihlcnJvcikgOiBlcnJvcilcbiAgICApO1xuICB9XG5cbiAgY2hhaW48WD4ob2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIEU+KTogUmVzdWx0PFgsIEU+O1xuICBjaGFpbjxYPihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgRT4sXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBFPlxuICApOiBSZXN1bHQ8WCwgRT47XG4gIGNoYWluPFgsIFUgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT5cbiAgKTogUmVzdWx0PFgsIFU+O1xuICBjaGFpbihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8dW5rbm93bj4sXG4gICAgZXJyPzogKGVycm9yOiBFKSA9PiBSZXN1bHQ8dW5rbm93bj5cbiAgKTogUmVzdWx0PHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhaW4ob2ssIGVyciB8fCAoZXJyb3IgPT4gUmVzdWx0LmVycihlcnJvcikpKTtcbiAgfVxufVxuXG5jbGFzcyBfT2s8VCwgRSBleHRlbmRzIEVycm9yPiBleHRlbmRzIF9SZXN1bHQ8VCwgRT4ge1xuICByZWFkb25seSBpc09rID0gdHJ1ZTtcbiAgcmVhZG9ubHkgaXNFcnIgPSBmYWxzZTtcbiAgY29uc3RydWN0b3IocmVhZG9ubHkgdmFsdWU6IFQpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jaGFpbjxYLCBVIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBVPixcbiAgICBfZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBVPlxuICApOiBSZXN1bHQ8WCwgVT4ge1xuICAgIHJldHVybiBvayh0aGlzLnZhbHVlKTtcbiAgfVxufVxuXG5jbGFzcyBfRXJyPFQsIEUgZXh0ZW5kcyBFcnJvcj4gZXh0ZW5kcyBfUmVzdWx0PFQsIEU+IHtcbiAgcmVhZG9ubHkgaXNPayA9IGZhbHNlO1xuICByZWFkb25seSBpc0VyciA9IHRydWU7XG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGVycm9yOiBFKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY2hhaW48WCwgVSBleHRlbmRzIEVycm9yPihcbiAgICBfb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT5cbiAgKTogUmVzdWx0PFgsIFU+IHtcbiAgICByZXR1cm4gZXJyKHRoaXMuZXJyb3IpO1xuICB9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVzdWx0IHtcbiAgZXhwb3J0IGludGVyZmFjZSBPazxULCBFIGV4dGVuZHMgRXJyb3I+IGV4dGVuZHMgX09rPFQsIEU+IHt9XG4gIGV4cG9ydCBpbnRlcmZhY2UgRXJyPFQsIEUgZXh0ZW5kcyBFcnJvcj4gZXh0ZW5kcyBfRXJyPFQsIEU+IHt9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIG9rPFQsIEUgZXh0ZW5kcyBFcnJvcj4odmFsdWU6IFQpOiBSZXN1bHQ8VCwgRT4ge1xuICAgIHJldHVybiBuZXcgX09rKHZhbHVlKTtcbiAgfVxuICBleHBvcnQgZnVuY3Rpb24gZXJyPEUgZXh0ZW5kcyBFcnJvciwgVCA9IG5ldmVyPihlcnJvcj86IEUpOiBSZXN1bHQ8VCwgRT5cbiAgZXhwb3J0IGZ1bmN0aW9uIGVycjxFIGV4dGVuZHMgRXJyb3IsIFQgPSBuZXZlcj4oZXJyb3I6IEUpOiBSZXN1bHQ8VCwgRT4ge1xuICAgIHJldHVybiBuZXcgX0VycihlcnJvciB8fCBuZXcgRXJyb3IoKSk7XG4gIH1cblxuICB0eXBlIFUgPSBSZXN1bHQ8dW5rbm93bj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICAgIFIxMyBleHRlbmRzIFUsXG4gICAgUjE0IGV4dGVuZHMgVSxcbiAgICBSMTUgZXh0ZW5kcyBVXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTIsIFIxMywgUjE0LCBSMTVdXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICAgIE9rVHlwZTxSMTI+LFxuICAgICAgT2tUeXBlPFIxMz4sXG4gICAgICBPa1R5cGU8UjE0PixcbiAgICAgIE9rVHlwZTxSMTU+XG4gICAgXSxcbiAgICBFcnJUeXBlPFxuICAgICAgfCBSMFxuICAgICAgfCBSMVxuICAgICAgfCBSMlxuICAgICAgfCBSM1xuICAgICAgfCBSNFxuICAgICAgfCBSNVxuICAgICAgfCBSNlxuICAgICAgfCBSN1xuICAgICAgfCBSOFxuICAgICAgfCBSOVxuICAgICAgfCBSMTBcbiAgICAgIHwgUjExXG4gICAgICB8IFIxMlxuICAgICAgfCBSMTNcbiAgICAgIHwgUjE0XG4gICAgICB8IFIxNVxuICAgID5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICAgIFIxMiBleHRlbmRzIFUsXG4gICAgUjEzIGV4dGVuZHMgVSxcbiAgICBSMTQgZXh0ZW5kcyBVXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTIsIFIxMywgUjE0XVxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgICBPa1R5cGU8UjEyPixcbiAgICAgIE9rVHlwZTxSMTM+LFxuICAgICAgT2tUeXBlPFIxND5cbiAgICBdLFxuICAgIEVyclR5cGU8XG4gICAgICB8IFIwXG4gICAgICB8IFIxXG4gICAgICB8IFIyXG4gICAgICB8IFIzXG4gICAgICB8IFI0XG4gICAgICB8IFI1XG4gICAgICB8IFI2XG4gICAgICB8IFI3XG4gICAgICB8IFI4XG4gICAgICB8IFI5XG4gICAgICB8IFIxMFxuICAgICAgfCBSMTFcbiAgICAgIHwgUjEyXG4gICAgICB8IFIxM1xuICAgICAgfCBSMTRcbiAgICA+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICAgIFIxMyBleHRlbmRzIFVcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTEsIFIxMiwgUjEzXVxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgICBPa1R5cGU8UjEyPixcbiAgICAgIE9rVHlwZTxSMTM+XG4gICAgXSxcbiAgICBFcnJUeXBlPFxuICAgICAgUjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjkgfCBSMTAgfCBSMTEgfCBSMTIgfCBSMTNcbiAgICA+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTJdXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPlxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOSB8IFIxMCB8IFIxMT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExXVxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT5cbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjkgfCBSMTAgfCBSMTE+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFVcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwXVxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+XG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5IHwgUjEwPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVVxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5XVxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PlxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVVxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjhdXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD5cbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFVcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjddXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PlxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVVxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2XVxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PlxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNj5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVVxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjVdXG4gICk6IFJlc3VsdDxcbiAgICBbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPiwgT2tUeXBlPFIzPiwgT2tUeXBlPFI0PiwgT2tUeXBlPFI1Pl0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjU+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVVxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNF1cbiAgKTogUmVzdWx0PFxuICAgIFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+LCBPa1R5cGU8UjI+LCBPa1R5cGU8UjM+LCBPa1R5cGU8UjQ+XSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQ+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVLCBSMSBleHRlbmRzIFUsIFIyIGV4dGVuZHMgVSwgUjMgZXh0ZW5kcyBVPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSM11cbiAgKTogUmVzdWx0PFxuICAgIFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+LCBPa1R5cGU8UjI+LCBPa1R5cGU8UjM+XSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFIwIGV4dGVuZHMgVSwgUjEgZXh0ZW5kcyBVLCBSMiBleHRlbmRzIFU+KFxuICAgIG9iajogW1IwLCBSMSwgUjJdXG4gICk6IFJlc3VsdDxbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPl0sIEVyclR5cGU8UjAgfCBSMSB8IFIyPj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVLCBSMSBleHRlbmRzIFU+KFxuICAgIG9iajogW1IwLCBSMV1cbiAgKTogUmVzdWx0PFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+XSwgRXJyVHlwZTxSMCB8IFIxPj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVPihcbiAgICBvYmo6IFtSMF1cbiAgKTogUmVzdWx0PFtPa1R5cGU8UjA+XSwgRXJyVHlwZTxSMD4+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsKG9iajogW10pOiBSZXN1bHQ8W10+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFQgZXh0ZW5kcyBBcnJheTxVPiB8IFJlY29yZDxzdHJpbmcsIFU+PihcbiAgICBvYmo6IFRcbiAgKTogUmVzdWx0PFxuICAgIHsgW0sgaW4ga2V5b2YgVF06IFRbS10gZXh0ZW5kcyBSZXN1bHQ8aW5mZXIgST4gPyBJIDogbmV2ZXIgfSxcbiAgICB7XG4gICAgICBbSyBpbiBrZXlvZiBUXTogVFtLXSBleHRlbmRzIFJlc3VsdDx1bmtub3duLCBpbmZlciBFPiA/IEUgOiBuZXZlcjtcbiAgICB9W2tleW9mIFRdXG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGwob2JqOiB1bmtub3duKTogdW5rbm93biB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgY29uc3QgcmVzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBpdGVtID0gb2JqW2ldO1xuICAgICAgICBpZiAoaXRlbS5pc0Vycikge1xuICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5wdXNoKGl0ZW0udmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFJlc3VsdC5vayhyZXMpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSB7fTtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqIGFzIFJlY29yZDxzdHJpbmcsIFU+KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSAob2JqIGFzIFJlY29yZDxzdHJpbmcsIFU+KVtrZXlzW2ldXTtcbiAgICAgIGlmIChpdGVtLmlzRXJyKSB7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgfVxuICAgICAgcmVzW2tleXNbaV1dID0gaXRlbS52YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIFJlc3VsdC5vayhyZXMpO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIFJlc3VsdDxULCBFIGV4dGVuZHMgRXJyb3IgPSBFcnJvcj4gPVxuICB8IFJlc3VsdC5PazxULCBFPlxuICB8IFJlc3VsdC5FcnI8VCwgRT47XG5cbnR5cGUgT2tUeXBlPFIgZXh0ZW5kcyBSZXN1bHQ8dW5rbm93bj4+ID0gUiBleHRlbmRzIFJlc3VsdDxpbmZlciBPPiA/IE8gOiBuZXZlcjtcbnR5cGUgRXJyVHlwZTxSIGV4dGVuZHMgUmVzdWx0PHVua25vd24+PiA9IFIgZXh0ZW5kcyBSZXN1bHQ8dW5rbm93biwgaW5mZXIgRT5cbiAgPyBFXG4gIDogbmV2ZXI7XG4iLCAiaW1wb3J0IHsgUmVzdWx0IH0gZnJvbSBcIkBiYWRyYXAvcmVzdWx0XCI7XG5cbmltcG9ydCB7IFVzZUNhc2UgfSBmcm9tIFwic3JjL2RkZC9jb3JlL2RvbWFpbi9Vc2VDYXNlXCI7XG5cbmltcG9ydCB7IElDYXJkIH0gZnJvbSBcIi4uLy4uL2RvbWFpbi9DYXJkXCI7XG5pbXBvcnQgeyBDYXJkUmV2aWV3UmF0aW5nIH0gZnJvbSBcIi4uLy4uL2RvbWFpbi9DYXJkUmV2aWV3UmF0aW5nXCI7XG5pbXBvcnQgeyBJQ2FyZFJlcG8gfSBmcm9tIFwiLi4vLi4vcmVwb3MvSUNhcmRSZXBvXCI7XG5pbXBvcnQgeyBJUmV2aWV3U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9SZXZpZXdTZXJ2aWNlL0lSZXZpZXdTZXJ2aWNlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdCB7XG4gIGNhcmQ6IElDYXJkO1xuICByZXZpZXdSYXRpbmc6IENhcmRSZXZpZXdSYXRpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFJlc3BvbnNlID0gUmVzdWx0PHZvaWQ+O1xuXG5leHBvcnQgY2xhc3MgUmV2aWV3Q2FyZCBpbXBsZW1lbnRzIFVzZUNhc2U8UmVxdWVzdCwgUHJvbWlzZTxSZXNwb25zZT4+IHtcbiAgcHJpdmF0ZSBjYXJkUmVwbzogSUNhcmRSZXBvO1xuICBwcml2YXRlIHJldmlld1NlcnZpY2U6IElSZXZpZXdTZXJ2aWNlO1xuXG4gIGNvbnN0cnVjdG9yKGNhcmRSZXBvOiBJQ2FyZFJlcG8sIHJldmlld1NlcnZpY2U6IElSZXZpZXdTZXJ2aWNlKSB7XG4gICAgdGhpcy5jYXJkUmVwbyA9IGNhcmRSZXBvO1xuICAgIHRoaXMucmV2aWV3U2VydmljZSA9IHJldmlld1NlcnZpY2U7XG4gIH1cblxuICBhc3luYyBleGVjdXRlIChyZXF1ZXN0OiBSZXF1ZXN0KTogUHJvbWlzZTxSZXNwb25zZT4ge1xuICAgIGNvbnN0IHsgY2FyZCwgcmV2aWV3UmF0aW5nIH0gPSByZXF1ZXN0O1xuXG4gICAgY2FyZC5yZXZpZXdTZXR0aW5ncyA9IHRoaXMucmV2aWV3U2VydmljZS5uZXdSZXZpZXdTZXR0aW5ncyhjYXJkLnJldmlld1NldHRpbmdzLCByZXZpZXdSYXRpbmcpO1xuICAgIGNvbnNvbGUubG9nKFwicmV2aWV3U2V0dGluZ3MgY2hhbmdlZCB0byBcIiwgY2FyZC5yZXZpZXdTZXR0aW5ncyk7XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5jYXJkUmVwby5zYXZlKGNhcmQpO1xuICAgICAgcmV0dXJuIFJlc3VsdC5vayhudWxsKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBSZXN1bHQuZXJyKGVycik7XG4gICAgfVxuICB9O1xufVxuIiwgImltcG9ydCB7IElSZXZpZXdTZXJ2aWNlIH0gZnJvbSBcIi4uL0lSZXZpZXdTZXJ2aWNlXCI7XG5cbmltcG9ydCB7IENhcmRSZXZpZXdTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9kb21haW4vQ2FyZFJldmlld1NldHRpbmdzXCI7XG5pbXBvcnQgeyBDYXJkUmV2aWV3UmF0aW5nIH0gZnJvbSBcIi4uLy4uLy4uL2RvbWFpbi9DYXJkUmV2aWV3UmF0aW5nXCI7XG5cbmltcG9ydCB7IFNSU2V0dGluZ3MgfSBmcm9tIFwic3JjL3NldHRpbmdzXCI7XG5cbmV4cG9ydCBjbGFzcyBDdXN0b21SZXZpZXdTZXJ2aWNlIGltcGxlbWVudHMgSVJldmlld1NlcnZpY2Uge1xuICBwcml2YXRlIHBsdWdpblNldHRpbmdzOiBTUlNldHRpbmdzO1xuXG4gIGNvbnN0cnVjdG9yKHBsdWdpblNldHRpbmdzOiBTUlNldHRpbmdzKSB7XG4gICAgdGhpcy5wbHVnaW5TZXR0aW5ncyA9IHBsdWdpblNldHRpbmdzO1xuICB9XG5cbiAgbmV3UmV2aWV3U2V0dGluZ3MgKHJldmlld1NldHRpbmdzOiBDYXJkUmV2aWV3U2V0dGluZ3MsIHJhdGluZzogQ2FyZFJldmlld1JhdGluZyk6IENhcmRSZXZpZXdTZXR0aW5ncyB7XG4gICAgcmV0dXJuIHRoaXMuY3VzdG9tTmV3UmV2aWV3U2V0dGluZ3MocmV2aWV3U2V0dGluZ3MsIHJhdGluZywgdGhpcy5wbHVnaW5TZXR0aW5ncyk7XG4gIH1cblxuICBwcml2YXRlIGN1c3RvbU5ld1Jldmlld1NldHRpbmdzIChcbiAgICByZXZpZXdTZXR0aW5nczogQ2FyZFJldmlld1NldHRpbmdzLFxuICAgIHJhdGluZzogQ2FyZFJldmlld1JhdGluZyxcbiAgICBwbHVnaW5TZXR0aW5nczogU1JTZXR0aW5nc1xuICApOiBDYXJkUmV2aWV3U2V0dGluZ3Mge1xuICAgIGxldCBpbnRlcnZhbCA9IHJldmlld1NldHRpbmdzLmludGVydmFsO1xuICAgIGxldCBlYXNlID0gcmV2aWV3U2V0dGluZ3MuZWFzZTtcbiAgICBsZXQgZGVsYXlCZWZvcmVSZXZpZXcgPSBNYXRoLm1heCgwLCBNYXRoLmZsb29yKHJldmlld1NldHRpbmdzLmRlbGF5QmVmb3JlUmV2aWV3IC8gKDI0ICogMzYwMCAqIDEwMDApKSk7XG5cbiAgICBzd2l0Y2ggKHJhdGluZykge1xuICAgICAgY2FzZSBDYXJkUmV2aWV3UmF0aW5nLkVhc3k6IHtcbiAgICAgICAgZWFzZSArPSAyMDtcbiAgICAgICAgaW50ZXJ2YWwgPSBwbHVnaW5TZXR0aW5ncy5lYXN5Qm9udXMgKiAoKGludGVydmFsICsgZGVsYXlCZWZvcmVSZXZpZXcpICogZWFzZSkgLyAxMDA7XG4gICAgICB9XG4gICAgICBjYXNlIENhcmRSZXZpZXdSYXRpbmcuTWVkaXVtOiB7XG4gICAgICAgIGludGVydmFsID0gKGludGVydmFsICsgZGVsYXlCZWZvcmVSZXZpZXcgLyAyKSAqIGVhc2UgLyAxMDA7XG4gICAgICB9XG4gICAgICBjYXNlIENhcmRSZXZpZXdSYXRpbmcuSGFyZDoge1xuICAgICAgICBlYXNlID0gTWF0aC5tYXgoMTMwLCBlYXNlIC0gMjApO1xuICAgICAgICBpbnRlcnZhbCA9IE1hdGgubWF4KFxuICAgICAgICAgIDEsXG4gICAgICAgICAgKGludGVydmFsICsgZGVsYXlCZWZvcmVSZXZpZXcgLyA0KSAqIHBsdWdpblNldHRpbmdzLmxhcHNlc0ludGVydmFsQ2hhbmdlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmVwbGFjZXMgcmFuZG9tIGZ1enogd2l0aCBsb2FkIGJhbGFuY2luZyBvdmVyIHRoZSBmdXp6IGludGVydmFsXG4gICAgLy8gaWYgKGR1ZURhdGVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyAgIGludGVydmFsID0gTWF0aC5yb3VuZChpbnRlcnZhbCk7XG4gICAgLy8gICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChkdWVEYXRlcywgaW50ZXJ2YWwpKSB7XG4gICAgLy8gICAgIGR1ZURhdGVzW2ludGVydmFsXSA9IDA7XG4gICAgLy8gICB9IGVsc2Uge1xuICAgIC8vICAgICAvLyBkaXNhYmxlIGZ1enppbmcgZm9yIHNtYWxsIGludGVydmFsc1xuICAgIC8vICAgICBpZiAoaW50ZXJ2YWwgPiA0KSB7XG4gICAgLy8gICAgICAgbGV0IGZ1enogPSAwO1xuICAgIC8vICAgICAgIGlmIChpbnRlcnZhbCA8IDcpIGZ1enogPSAxO1xuICAgIC8vICAgICAgIGVsc2UgaWYgKGludGVydmFsIDwgMzApIGZ1enogPSBNYXRoLm1heCgyLCBNYXRoLmZsb29yKGludGVydmFsICogMC4xNSkpO1xuICAgIC8vICAgICAgIGVsc2UgZnV6eiA9IE1hdGgubWF4KDQsIE1hdGguZmxvb3IoaW50ZXJ2YWwgKiAwLjA1KSk7XG5cbiAgICAvLyAgICAgICBjb25zdCBvcmlnaW5hbEludGVydmFsID0gaW50ZXJ2YWw7XG4gICAgLy8gICAgICAgb3V0ZXI6IGZvciAobGV0IGkgPSAxOyBpIDw9IGZ1eno7IGkrKykge1xuICAgIC8vICAgICAgICAgZm9yIChjb25zdCBpdmwgb2YgW29yaWdpbmFsSW50ZXJ2YWwgLSBpLCBvcmlnaW5hbEludGVydmFsICsgaV0pIHtcbiAgICAvLyAgICAgICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZHVlRGF0ZXMsIGl2bCkpIHtcbiAgICAvLyAgICAgICAgICAgICBkdWVEYXRlc1tpdmxdID0gMDtcbiAgICAvLyAgICAgICAgICAgICBpbnRlcnZhbCA9IGl2bDtcbiAgICAvLyAgICAgICAgICAgICBicmVhayBvdXRlcjtcbiAgICAvLyAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgICBpZiAoZHVlRGF0ZXNbaXZsXSA8IGR1ZURhdGVzW2ludGVydmFsXSkgaW50ZXJ2YWwgPSBpdmw7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG5cbiAgICAvLyAgIGR1ZURhdGVzW2ludGVydmFsXSsrO1xuICAgIC8vIH1cblxuICAgIGludGVydmFsID0gTWF0aC5taW4oaW50ZXJ2YWwsIHBsdWdpblNldHRpbmdzLm1heGltdW1JbnRlcnZhbCk7XG4gICAgaW50ZXJ2YWwgPSBNYXRoLnJvdW5kKGludGVydmFsICogMTApIC8gMTA7XG5cbiAgICByZXR1cm4geyBpbnRlcnZhbCwgZWFzZSwgZGVsYXlCZWZvcmVSZXZpZXcgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IERFRkFVTFRfU0VUVElOR1MgfSBmcm9tIFwic3JjL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBDdXN0b21SZXZpZXdTZXJ2aWNlIH0gZnJvbSBcIi4vaW1wbGVtZW50YXRpb25zL0N1c3RvbVJldmlld1NlcnZpY2VcIjtcblxuY29uc3QgcGx1Z2luU2V0dGluZ3MgPSBERUZBVUxUX1NFVFRJTkdTO1xuXG5jb25zdCByZXZpZXdTZXJ2aWNlID0gbmV3IEN1c3RvbVJldmlld1NlcnZpY2UocGx1Z2luU2V0dGluZ3MpO1xuZXhwb3J0IHsgcmV2aWV3U2VydmljZSB9OyIsICIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiBJbiB0aGUgYnJvd3NlciB3ZSB0aGVyZWZvcmVcbi8vIHJlcXVpcmUgdGhlIGNyeXB0byBBUEkgYW5kIGRvIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGZhbGxiYWNrIHRvIGxvd2VyIHF1YWxpdHkgcmFuZG9tIG51bWJlclxuLy8gZ2VuZXJhdG9ycyAobGlrZSBNYXRoLnJhbmRvbSgpKS5cbmxldCBnZXRSYW5kb21WYWx1ZXM7XG5jb25zdCBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJuZygpIHtcbiAgLy8gbGF6eSBsb2FkIHNvIHRoYXQgZW52aXJvbm1lbnRzIHRoYXQgbmVlZCB0byBwb2x5ZmlsbCBoYXZlIGEgY2hhbmNlIHRvIGRvIHNvXG4gIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvIGltcGxlbWVudGF0aW9uLlxuICAgIGdldFJhbmRvbVZhbHVlcyA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0byk7XG5cbiAgICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKCkgbm90IHN1cHBvcnRlZC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCNnZXRyYW5kb212YWx1ZXMtbm90LXN1cHBvcnRlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xufSIsICJpbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG4vKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cblxuY29uc3QgYnl0ZVRvSGV4ID0gW107XG5cbmZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4LnB1c2goKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnNsaWNlKDEpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgLy8gTm90ZTogQmUgY2FyZWZ1bCBlZGl0aW5nIHRoaXMgY29kZSEgIEl0J3MgYmVlbiB0dW5lZCBmb3IgcGVyZm9ybWFuY2VcbiAgLy8gYW5kIHdvcmtzIGluIHdheXMgeW91IG1heSBub3QgZXhwZWN0LiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkL3B1bGwvNDM0XG4gIHJldHVybiAoYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV0pLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgY29uc3QgdXVpZCA9IHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwgImNvbnN0IHJhbmRvbVVVSUQgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8ucmFuZG9tVVVJRCAmJiBjcnlwdG8ucmFuZG9tVVVJRC5iaW5kKGNyeXB0byk7XG5leHBvcnQgZGVmYXVsdCB7XG4gIHJhbmRvbVVVSURcbn07IiwgImltcG9ydCBuYXRpdmUgZnJvbSAnLi9uYXRpdmUuanMnO1xuaW1wb3J0IHJuZyBmcm9tICcuL3JuZy5qcyc7XG5pbXBvcnQgeyB1bnNhZmVTdHJpbmdpZnkgfSBmcm9tICcuL3N0cmluZ2lmeS5qcyc7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIGlmIChuYXRpdmUucmFuZG9tVVVJRCAmJiAhYnVmICYmICFvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5hdGl2ZS5yYW5kb21VVUlEKCk7XG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3Qgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7IC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcblxuICBybmRzWzZdID0gcm5kc1s2XSAmIDB4MGYgfCAweDQwO1xuICBybmRzWzhdID0gcm5kc1s4XSAmIDB4M2YgfCAweDgwOyAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcblxuICBpZiAoYnVmKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHJuZHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuXG4gIHJldHVybiB1bnNhZmVTdHJpbmdpZnkocm5kcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHY0OyIsICJleHBvcnQgY2xhc3MgSWRlbnRpZmllcjxUPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdmFsdWU6IFQpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBlcXVhbHMgKGlkPzogSWRlbnRpZmllcjxUPik6IGJvb2xlYW4ge1xuICAgIGlmIChpZCA9PT0gbnVsbCB8fCBpZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghKGlkIGluc3RhbmNlb2YgdGhpcy5jb25zdHJ1Y3RvcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGlkLnRvVmFsdWUoKSA9PT0gdGhpcy52YWx1ZTtcbiAgfVxuXG4gIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gU3RyaW5nKHRoaXMudmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiByYXcgdmFsdWUgb2YgaWRlbnRpZmllclxuICAgKi9cbiAgdG9WYWx1ZSAoKTogVCB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gIH1cbn0iLCAiaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gXCJ1dWlkXCI7XG5cbmltcG9ydCB7IElkZW50aWZpZXIgfSBmcm9tIFwiLi9JZGVudGlmaWVyXCI7XG5cbmV4cG9ydCBjbGFzcyBVbmlxdWVFbnRpdHlJZCBleHRlbmRzIElkZW50aWZpZXI8c3RyaW5nIHwgbnVtYmVyPntcbiAgY29uc3RydWN0b3IoaWQ/OiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICBzdXBlcihpZCA/IGlkIDogdXVpZCgpKTtcbiAgfVxufSIsICJpbXBvcnQgeyBVbmlxdWVFbnRpdHlJZCB9IGZyb20gXCIuL1VuaXF1ZUVudGl0eUlkXCI7XG5cbmNvbnN0IGlzRW50aXR5ID0gKHY6IGFueSk6IHYgaXMgRW50aXR5PGFueT4gPT4ge1xuICByZXR1cm4gdiBpbnN0YW5jZW9mIEVudGl0eTtcbn07XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBFbnRpdHk8VD4ge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2lkOiBVbmlxdWVFbnRpdHlJZDtcbiAgcHJvdGVjdGVkIHByb3BzOiBUO1xuXG4gIC8vIFRha2Ugbm90ZSBvZiB0aGlzIHBhcnRpY3VsYXIgbnVhbmNlIGhlcmU6XG4gIC8vIFdoeSBpcyBcImlkXCIgb3B0aW9uYWw/XG4gIGNvbnN0cnVjdG9yKHByb3BzOiBULCBpZD86IFVuaXF1ZUVudGl0eUlkKSB7XG4gICAgdGhpcy5faWQgPSBpZCA/IGlkIDogbmV3IFVuaXF1ZUVudGl0eUlkKCk7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICB9XG5cbiAgLy8gRW50aXRpZXMgYXJlIGNvbXBhcmVkIGJhc2VkIG9uIHRoZWlyIHJlZmVyZW50aWFsXG4gIC8vIGVxdWFsaXR5LlxuICBwdWJsaWMgZXF1YWxzIChvYmplY3Q/OiBFbnRpdHk8VD4pOiBib29sZWFuIHtcblxuICAgIGlmIChvYmplY3QgPT0gbnVsbCB8fCBvYmplY3QgPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMgPT09IG9iamVjdCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCFpc0VudGl0eShvYmplY3QpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2lkLmVxdWFscyhvYmplY3QuX2lkKTtcbiAgfVxufSIsICJpbXBvcnQgeyBFbnRpdHkgfSBmcm9tIFwic3JjL2RkZC9jb3JlL2RvbWFpbi9FbnRpdHlcIjtcbmltcG9ydCB7IFVuaXF1ZUVudGl0eUlkIH0gZnJvbSBcInNyYy9kZGQvY29yZS9kb21haW4vVW5pcXVlRW50aXR5SWRcIjtcblxuaW50ZXJmYWNlIElEZWNrUHJvcHMge1xuICBuYW1lOiBzdHJpbmc7XG4gIHBhcmVudDogRGVjayB8IG51bGw7XG4gIHN1YmRlY2tzOiBEZWNrW107XG59XG5cbmV4cG9ydCBjbGFzcyBEZWNrIGV4dGVuZHMgRW50aXR5PElEZWNrUHJvcHM+IHtcbiAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcihwcm9wczogSURlY2tQcm9wcywgaWQ/OiBVbmlxdWVFbnRpdHlJZCkge1xuICAgIHN1cGVyKHByb3BzLCBpZCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSAocHJvcHM6IElEZWNrUHJvcHMsIGlkPzogVW5pcXVlRW50aXR5SWQpIHtcbiAgICBpZiAocHJvcHMuc3ViZGVja3Muc29tZSgoZGVjaykgPT4gZGVjayA9PT0gcHJvcHMucGFyZW50KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQYXJlbnQgZGVjayAke3Byb3BzLnBhcmVudH0gaXMgYWxzbyBpbiBjaGlsZHJlbmApO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IERlY2socHJvcHMsIGlkKTtcbiAgfVxufTsiLCAiaW1wb3J0IHsgUmVzdWx0IH0gZnJvbSBcIkBiYWRyYXAvcmVzdWx0XCI7XG5pbXBvcnQgeyBURmlsZSB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tIFwic3JjL2RkZC9jb3JlL2RvbWFpbi9FbnRpdHlcIjtcbmltcG9ydCB7IFVuaXF1ZUVudGl0eUlkIH0gZnJvbSBcInNyYy9kZGQvY29yZS9kb21haW4vVW5pcXVlRW50aXR5SWRcIjtcblxuaW1wb3J0IHsgSUNhcmQsIElDYXJkUHJvcHMgfSBmcm9tIFwic3JjL2RkZC9tb2R1bGVzL3Jldmlldy9kb21haW4vQ2FyZFwiO1xuaW1wb3J0IHsgQ2FyZFJldmlld1NldHRpbmdzIH0gZnJvbSBcInNyYy9kZGQvbW9kdWxlcy9yZXZpZXcvZG9tYWluL0NhcmRSZXZpZXdTZXR0aW5nc1wiO1xuaW1wb3J0IHsgQ2FyZFR5cGUgfSBmcm9tIFwic3JjL2RkZC9tb2R1bGVzL3Jldmlldy9kb21haW4vQ2FyZFR5cGVcIjtcbmltcG9ydCB7IERlY2sgfSBmcm9tIFwic3JjL2RkZC9tb2R1bGVzL3Jldmlldy9kb21haW4vRGVja1wiO1xuaW1wb3J0IHsgSUNhcmRSZXBvIH0gZnJvbSBcInNyYy9kZGQvbW9kdWxlcy9yZXZpZXcvcmVwb3MvSUNhcmRSZXBvXCI7XG5cbmltcG9ydCB7IFNSU2V0dGluZ3MgfSBmcm9tIFwic3JjL3NldHRpbmdzXCI7XG5cbnR5cGUgQ2FyZExvY2F0aW9uID0ge1xuICBmaWxlOiBURmlsZTtcbiAgbGluZU51bWJlcjogbnVtYmVyO1xufTtcblxuaW50ZXJmYWNlIElPYnNpZGlhbkNhcmRQcm9wcyBleHRlbmRzIElDYXJkUHJvcHMge1xuICBsb2NhdGlvbjogQ2FyZExvY2F0aW9uO1xuXG4gIHNpYmxpbmdzOiBPYnNpZGlhbkNhcmRbXTtcbiAgaW5kZXhJblNpYmxpbmdzOiBudW1iZXI7XG5cbiAgY29udGV4dDogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgT2JzaWRpYW5DYXJkIGV4dGVuZHMgRW50aXR5PElPYnNpZGlhbkNhcmRQcm9wcz4gaW1wbGVtZW50cyBJQ2FyZCB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IocHJvcHM6IElPYnNpZGlhbkNhcmRQcm9wcywgaWQ/OiBVbmlxdWVFbnRpdHlJZCkge1xuICAgIHN1cGVyKHByb3BzLCBpZCk7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlIChwcm9wczogSU9ic2lkaWFuQ2FyZFByb3BzLCBpZD86IFVuaXF1ZUVudGl0eUlkKTogUmVzdWx0PE9ic2lkaWFuQ2FyZD4ge1xuICAgIHJldHVybiBSZXN1bHQub2sobmV3IE9ic2lkaWFuQ2FyZChwcm9wcywgaWQpKTtcbiAgfVxuXG4gIHN0YXRpYyBpc0R1ZSAoY2FyZDogT2JzaWRpYW5DYXJkKTogYm9vbGVhbiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IHlldCBpbXBsZW1lbnRlZCFcIik7XG4gIH1cblxuICBnZXQgaWQgKCk6IFVuaXF1ZUVudGl0eUlkIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cblxuICBnZXQgdHlwZSAoKTogQ2FyZFR5cGUge1xuICAgIHJldHVybiB0aGlzLnByb3BzLnR5cGU7XG4gIH1cblxuICBnZXQgZGVjayAoKTogRGVjayB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuZGVjaztcbiAgfVxuXG4gIGdldCBmcm9udCAoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5mcm9udDtcbiAgfVxuXG4gIGdldCBiYWNrICgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmJhY2s7XG4gIH1cblxuICBnZXQgcmV2aWV3U2V0dGluZ3MgKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLnJldmlld1NldHRpbmdzO1xuICB9XG5cbiAgc2V0IHJldmlld1NldHRpbmdzIChyZXZpZXdTZXR0aW5nczogQ2FyZFJldmlld1NldHRpbmdzKSB7XG4gICAgdGhpcy5wcm9wcy5yZXZpZXdTZXR0aW5ncyA9IHJldmlld1NldHRpbmdzO1xuICB9XG5cbiAgZ2V0IGxvY2F0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5sb2NhdGlvbjtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgT2JzaWRpYW5DYXJkUmVwbyBpbXBsZW1lbnRzIElDYXJkUmVwbyB7XG4gIHByaXZhdGUgc2V0dGluZ3M6IFNSU2V0dGluZ3M7XG4gIHByaXZhdGUgX2l0ZW1zOiBPYnNpZGlhbkNhcmRbXTtcblxuICBjb25zdHJ1Y3RvcihwbHVnaW5TZXR0aW5nczogU1JTZXR0aW5ncykge1xuICAgIHRoaXMuc2V0dGluZ3MgPSBwbHVnaW5TZXR0aW5ncztcbiAgICB0aGlzLl9pdGVtcyA9IFtdO1xuICB9XG5cbiAgLy8gYXN5bmMgc2F2ZUNhcmRzRnJvbU5vdGUgKG5vdGU6IFRGaWxlKTogUHJvbWlzZTx2b2lkPiB7IH1cbiAgYXN5bmMgZ2V0QnlEZWNrcyAoZGVja3M6IERlY2tbXSk6IFByb21pc2U8T2JzaWRpYW5DYXJkW10+IHtcbiAgICByZXR1cm4gdGhpcy5faXRlbXMuZmlsdGVyKChjYXJkKSA9PiBkZWNrcy5jb250YWlucyhjYXJkLmRlY2spKTtcbiAgICAvLyByZXR1cm4gbmV3IEFycmF5KHRoaXMuX2l0ZW1zLm1hcCgoY2FyZCkgPT4gY2FyZC5kZWNrKSk7XG4gIH07XG5cbiAgYXN5bmMgc2F2ZSAoY2FyZDogT2JzaWRpYW5DYXJkKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLl9pdGVtcy5jb250YWlucyhjYXJkKSkge1xuICAgICAgdGhpcy5faXRlbXMucHVzaChjYXJkKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBkZWNrcyAoKTogUHJvbWlzZTxTZXQ8RGVjaz4+IHtcbiAgICByZXR1cm4gbmV3IFNldCh0aGlzLl9pdGVtcy5tYXAoKGNhcmQpID0+IGNhcmQuZGVjaykpO1xuICB9XG59Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBLG1EQUFBQSxTQUFBO0FBQUE7QUFFQSxhQUFTLE9BQU8sUUFBUSxVQUFVO0FBQzlCLFVBQUssT0FBTyxXQUFXLFlBQWMsT0FBTyxhQUFhLFlBQWE7QUFDbEUsaUJBQVMsT0FBTyxRQUFRO0FBQ3BCLGNBQUksT0FBTyxlQUFlLEdBQUcsTUFBTSxNQUFNO0FBQ3JDLGdCQUFJLFNBQVMsS0FBSyxPQUFPLEdBQUcsQ0FBQyxNQUFNLE9BQU87QUFDdEM7QUFBQSxZQUNKO0FBQUEsVUFDSjtBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUVBLElBQUFBLFFBQU8sVUFBVyxXQUFZO0FBQzFCLFVBQUksT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLFFBQ1AsT0FBTyxDQUFDO0FBQUEsUUFDUixPQUFPLENBQUM7QUFBQSxNQUNaO0FBRUEsV0FBSyxPQUFPLFNBQVUsUUFBUSxRQUFRLFFBQVE7QUFDMUMsWUFBSyxTQUFTLE1BQU0sTUFBTSxRQUFVLFdBQVcsTUFBTztBQUNsRCxtQkFBUztBQUFBLFFBQ2I7QUFFQSxpQkFBUyxXQUFXLE1BQU07QUFFMUIsWUFBSSxLQUFLLE1BQU0sZUFBZSxNQUFNLE1BQU0sTUFBTTtBQUM1QyxlQUFLO0FBQ0wsZUFBSyxNQUFNLE1BQU0sSUFBSTtBQUFBLFlBQ2pCLFFBQVE7QUFBQSxZQUNSLFVBQVU7QUFBQSxVQUNkO0FBQUEsUUFDSjtBQUVBLGFB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UyxpQ0FDbkIsSUFBSSxVQUFVLGdCQUFnQixzQkFBc0IsRUFBRSxVQUFVLEdBQ2hFO0FBQ0EsV0FBSyxJQUFJLFVBQVUsYUFBYSxLQUFLLEVBQUUsYUFBYTtBQUFBLFFBQ2xELE1BQU07QUFBQSxRQUNOLFFBQVE7QUFBQSxNQUNWLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUNGO0FBRUEsU0FBUyxlQUFnQixVQUFrQixVQUEwQixZQUE0QjtBQUMvRixRQUFNLFFBQXdCLENBQUM7QUFDL0IsYUFBVyxXQUFXLFVBQVU7QUFDOUIsUUFBSSxRQUFRLFNBQVMsTUFBTSxPQUFPLFVBQVU7QUFDMUM7QUFBQSxJQUNGO0FBRUEsV0FBTyxNQUFNLFNBQVMsS0FBSyxNQUFNLE1BQU0sU0FBUyxDQUFDLEVBQUUsU0FBUyxRQUFRLE9BQU87QUFDekUsWUFBTSxJQUFJO0FBQUEsSUFDWjtBQUVBLFVBQU0sS0FBSyxPQUFPO0FBQUEsRUFDcEI7QUFFQSxNQUFJLFVBQVUsR0FBRztBQUNqQixhQUFXLGNBQWMsT0FBTztBQUM5QixlQUFXLFVBQVUsV0FBVyxRQUFRLFFBQVEsZUFBZSxFQUFFLEVBQUUsS0FBSztBQUN4RSxlQUFXLEdBQUcsV0FBVztBQUFBLEVBQzNCO0FBQ0EsU0FBTyxRQUFRLE1BQU0sR0FBRyxFQUFFO0FBQzVCOyIsCiAgIm5hbWVzIjogWyJtb2R1bGUiLCAiZXNjIiwgIlN0cmluZyIsICJzdHIiLCAicmVwbGFjZSIsICJtYXAiLCAicyIsICJzZXRJbm5lckhUTUxBdHRyIiwgIkRPTUF0dHJpYnV0ZU5hbWVzIiwgInNhbml0aXplZCIsICJoIiwgIm5hbWUiLCAiYXR0cnMiLCAic3RhY2siLCAiaSIsICJhcmd1bWVudHMiLCAibGVuZ3RoIiwgInB1c2giLCAiY2hpbGRyZW4iLCAicmV2ZXJzZSIsICJlbXB0eVRhZ3MiLCAiaW5kZXhPZiIsICJfX2h0bWwiLCAiY2hpbGQiLCAicG9wIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiYXBwIiwgImltcG9ydF9vYnNpZGlhbiIsICJhcHAiLCAidmFsdWUiLCAiZSIsICJoIiwgImltcG9ydF9vYnNpZGlhbiIsICJzY2hlZHVsZSIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJoIiwgImltcG9ydF9vYnNpZGlhbiIsICJfUmVzdWx0IiwgInVud3JhcCIsICJvayIsICJlcnIiLCAiciIsICJ0aGlzIiwgIl9jaGFpbiIsICJ2YWx1ZSIsICJSZXN1bHQiLCAiZXJyb3IiLCAiaXNFcnIiLCAiZSIsICJtYXAiLCAiY2hhaW4iLCAiX09rIiwgImNvbnN0cnVjdG9yIiwgInN1cGVyIiwgImlzT2siLCAiX2VyciIsICJfRXJyIiwgIl9vayIsICJFcnJvciIsICJhbGwiLCAib2JqIiwgIkFycmF5IiwgImlzQXJyYXkiLCAicmVzIiwgImkiLCAibGVuZ3RoIiwgIml0ZW0iLCAicHVzaCIsICJrZXlzIiwgIk9iamVjdCIsICJyZXZpZXdTZXJ2aWNlIiwgInBsdWdpblNldHRpbmdzIiwgInBsdWdpblNldHRpbmdzIiwgInJhbmsiLCAiZWFzZSJdCn0K
