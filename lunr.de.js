/*!
 * Lunr languages, `German` language
 * https://github.com/MihaiValentin/lunr-languages
 *
 * Copyright 2014, Mihai Valentin
 * http://www.mozilla.org/MPL/
 */
/*!
 * based on
 * Snowball JavaScript Library v0.3
 * http://code.google.com/p/urim/
 * http://snowball.tartarus.org/
 *
 * Copyright 2010, Oleg Mazko
 * http://www.mozilla.org/MPL/
 */

/**
 * export the module via AMD, CommonJS or as a browser global
 * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
 */
;
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory)
  } else if (typeof exports === 'object') {
    /**
     * Node. Does not work with strict CommonJS, but
     * only CommonJS-like environments that support module.exports,
     * like Node.
     */
    module.exports = factory()
  } else {
    // Browser globals (root is window)
    factory()(root.lunr);
  }
}(this, function() {
  /**
   * Just return a value to define the module export.
   * This example returns an object, but the module
   * can return a function as the exported value.
   */
  return function(lunr) {
    /* throw error if lunr is not yet included */
    if ('undefined' === typeof lunr) {
      throw new Error('Lunr is not present. Please include / require Lunr before this script.');
    }

    /* throw error if lunr stemmer support is not yet included */
    if ('undefined' === typeof lunr.stemmerSupport) {
      throw new Error('Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script.');
    }

    /* register specific locale function */
    lunr.de = function() {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.de.stopWordFilter,
        lunr.de.stemmer
      );
    };

    /* lunr stemmer function */
    lunr.de.stemmer = (function() {
      /* create the wrapped stemmer object */
      var Among = lunr.stemmerSupport.Among,
        SnowballProgram = lunr.stemmerSupport.SnowballProgram,
        st = new function GermanStemmer() {
          var a_0 = [new Among("", -1, 6), new Among("U", 0, 2),
            new Among("Y", 0, 1), new Among("\u00E4", 0, 3),
            new Among("\u00F6", 0, 4), new Among("\u00FC", 0, 5)
          ],
            a_1 = [
              new Among("e", -1, 2), new Among("em", -1, 1),
              new Among("en", -1, 2), new Among("ern", -1, 1),
              new Among("er", -1, 1), new Among("s", -1, 3),
              new Among("es", 5, 2)
            ],
            a_2 = [new Among("en", -1, 1),
              new Among("er", -1, 1), new Among("st", -1, 2),
              new Among("est", 2, 1)
            ],
            a_3 = [new Among("ig", -1, 1),
              new Among("lich", -1, 1)
            ],
            a_4 = [new Among("end", -1, 1),
              new Among("ig", -1, 2), new Among("ung", -1, 1),
              new Among("lich", -1, 3), new Among("isch", -1, 2),
              new Among("ik", -1, 2), new Among("heit", -1, 3),
              new Among("keit", -1, 4)
            ],
            g_v = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 8, 0, 32, 8
            ],
            g_s_ending = [117, 30, 5],
            g_st_ending = [
              117, 30, 4
            ],
            I_x, I_p2, I_p1, sbp = new SnowballProgram();
          this.setCurrent = function(word) {
            sbp.setCurrent(word);
          };
          this.getCurrent = function() {
            return sbp.getCurrent();
          };

          function habr1(c1, c2, v_1) {
            if (sbp.eq_s(1, c1)) {
              sbp.ket = sbp.cursor;
              if (sbp.in_grouping(g_v, 97, 252)) {
                sbp.slice_from(c2);
                sbp.cursor = v_1;
                return true;
              }
            }
            return false;
          }

          function r_prelude() {
            var v_1 = sbp.cursor,
              v_2, v_3, v_4, v_5;
            while (true) {
              v_2 = sbp.cursor;
              sbp.bra = v_2;
              if (sbp.eq_s(1, "\u00DF")) {
                sbp.ket = sbp.cursor;
                sbp.slice_from("ss");
              } else {
                if (v_2 >= sbp.limit)
                  break;
                sbp.cursor = v_2 + 1;
              }
            }
            sbp.cursor = v_1;
            while (true) {
              v_3 = sbp.cursor;
              while (true) {
                v_4 = sbp.cursor;
                if (sbp.in_grouping(g_v, 97, 252)) {
                  v_5 = sbp.cursor;
                  sbp.bra = v_5;
                  if (habr1("u", "U", v_4))
                    break;
                  sbp.cursor = v_5;
                  if (habr1("y", "Y", v_4))
                    break;
                }
                if (v_4 >= sbp.limit) {
                  sbp.cursor = v_3;
                  return;
                }
                sbp.cursor = v_4 + 1;
              }
            }
          }

          function habr2() {
            while (!sbp.in_grouping(g_v, 97, 252)) {
              if (sbp.cursor >= sbp.limit)
                return true;
              sbp.cursor++;
            }
            while (!sbp.out_grouping(g_v, 97, 252)) {
              if (sbp.cursor >= sbp.limit)
                return true;
              sbp.cursor++;
            }
            return false;
          }

          function r_mark_regions() {
            I_p1 = sbp.limit;
            I_p2 = I_p1;
            var c = sbp.cursor + 3;
            if (0 <= c && c <= sbp.limit) {
              I_x = c;
              if (!habr2()) {
                I_p1 = sbp.cursor;
                if (I_p1 < I_x)
                  I_p1 = I_x;
                if (!habr2())
                  I_p2 = sbp.cursor;
              }
            }
          }

          function r_postlude() {
            var among_var, v_1;
            while (true) {
              v_1 = sbp.cursor;
              sbp.bra = v_1;
              among_var = sbp.find_among(a_0, 6);
              if (!among_var)
                return;
              sbp.ket = sbp.cursor;
              switch (among_var) {
                case 1:
                  sbp.slice_from("y");
                  break;
                case 2:
                case 5:
                  sbp.slice_from("u");
                  break;
                case 3:
                  sbp.slice_from("a");
                  break;
                case 4:
                  sbp.slice_from("o");
                  break;
                case 6:
                  if (sbp.cursor >= sbp.limit)
                    return;
                  sbp.cursor++;
                  break;
              }
            }
          }

          function r_R1() {
            return I_p1 <= sbp.cursor;
          }

          function r_R2() {
            return I_p2 <= sbp.cursor;
          }

          function r_standard_suffix() {
            var among_var, v_1 = sbp.limit - sbp.cursor,
              v_2, v_3, v_4;
            sbp.ket = sbp.cursor;
            among_var = sbp.find_among_b(a_1, 7);
            if (among_var) {
              sbp.bra = sbp.cursor;
              if (r_R1()) {
                switch (among_var) {
                  case 1:
                    sbp.slice_del();
                    break;
                  case 2:
                    sbp.slice_del();
                    sbp.ket = sbp.cursor;
                    if (sbp.eq_s_b(1, "s")) {
                      sbp.bra = sbp.cursor;
                      if (sbp.eq_s_b(3, "nis"))
                        sbp.slice_del();
                    }
                    break;
                  case 3:
                    if (sbp.in_grouping_b(g_s_ending, 98, 116))
                      sbp.slice_del();
                    break;
                }
              }
            }
            sbp.cursor = sbp.limit - v_1;
            sbp.ket = sbp.cursor;
            among_var = sbp.find_among_b(a_2, 4);
            if (among_var) {
              sbp.bra = sbp.cursor;
              if (r_R1()) {
                switch (among_var) {
                  case 1:
                    sbp.slice_del();
                    break;
                  case 2:
                    if (sbp.in_grouping_b(g_st_ending, 98, 116)) {
                      var c = sbp.cursor - 3;
                      if (sbp.limit_backward <= c && c <= sbp.limit) {
                        sbp.cursor = c;
                        sbp.slice_del();
                      }
                    }
                    break;
                }
              }
            }
            sbp.cursor = sbp.limit - v_1;
            sbp.ket = sbp.cursor;
            among_var = sbp.find_among_b(a_4, 8);
            if (among_var) {
              sbp.bra = sbp.cursor;
              if (r_R2()) {
                switch (among_var) {
                  case 1:
                    sbp.slice_del();
                    sbp.ket = sbp.cursor;
                    if (sbp.eq_s_b(2, "ig")) {
                      sbp.bra = sbp.cursor;
                      v_2 = sbp.limit - sbp.cursor;
                      if (!sbp.eq_s_b(1, "e")) {
                        sbp.cursor = sbp.limit - v_2;
                        if (r_R2())
                          sbp.slice_del();
                      }
                    }
                    break;
                  case 2:
                    v_3 = sbp.limit - sbp.cursor;
                    if (!sbp.eq_s_b(1, "e")) {
                      sbp.cursor = sbp.limit - v_3;
                      sbp.slice_del();
                    }
                    break;
                  case 3:
                    sbp.slice_del();
                    sbp.ket = sbp.cursor;
                    v_4 = sbp.limit - sbp.cursor;
                    if (!sbp.eq_s_b(2, "er")) {
                      sbp.cursor = sbp.limit - v_4;
                      if (!sbp.eq_s_b(2, "en"))
                        break;
                    }
                    sbp.bra = sbp.cursor;
                    if (r_R1())
                      sbp.slice_del();
                    break;
                  case 4:
                    sbp.slice_del();
                    sbp.ket = sbp.cursor;
                    among_var = sbp.find_among_b(a_3, 2);
                    if (among_var) {
                      sbp.bra = sbp.cursor;
                      if (r_R2() && among_var == 1)
                        sbp.slice_del();
                    }
                    break;
                }
              }
            }
          }
          this.stem = function() {
            var v_1 = sbp.cursor;
            r_prelude();
            sbp.cursor = v_1;
            r_mark_regions();
            sbp.limit_backward = v_1;
            sbp.cursor = sbp.limit;
            r_standard_suffix();
            sbp.cursor = sbp.limit_backward;
            r_postlude();
            return true;
          }
        };

      /* and return a function that stems a word for the current locale */
      return function(word) {
        st.setCurrent(word);
        st.stem();
        return st.getCurrent();
      }
    })();

    lunr.Pipeline.registerFunction(lunr.de.stemmer, 'stemmer-de');

    /* stop word filter function */
    lunr.de.stopWordFilter = function(token) {
      if (lunr.de.stopWordFilter.stopWords.indexOf(token) === -1) {
        return token;
      }
    };

    lunr.de.stopWordFilter.stopWords = new lunr.SortedSet();
    lunr.de.stopWordFilter.stopWords.length = 232;

    // The space at the beginning is crucial: It marks the empty string
    // as a stop word. lunr.js crashes during search when documents
    // processed by the pipeline still contain the empty string.
    lunr.de.stopWordFilter.stopWords.elements = ' aber alle allem allen aller alles als also am an ander andere anderem anderen anderer anderes anderm andern anderr anders auch auf aus bei bin bis bist da damit dann der den des dem die das daß derselbe derselben denselben desselben demselben dieselbe dieselben dasselbe dazu dein deine deinem deinen deiner deines denn derer dessen dich dir du dies diese diesem diesen dieser dieses doch dort durch ein eine einem einen einer eines einig einige einigem einigen einiger einiges einmal er ihn ihm es etwas euer eure eurem euren eurer eures für gegen gewesen hab habe haben hat hatte hatten hier hin hinter ich mich mir ihr ihre ihrem ihren ihrer ihres euch im in indem ins ist jede jedem jeden jeder jedes jene jenem jenen jener jenes jetzt kann kein keine keinem keinen keiner keines können könnte machen man manche manchem manchen mancher manches mein meine meinem meinen meiner meines mit muss musste nach nicht nichts noch nun nur ob oder ohne sehr sein seine seinem seinen seiner seines selbst sich sie ihnen sind so solche solchem solchen solcher solches soll sollte sondern sonst über um und uns unse unsem unsen unser unses unter viel vom von vor während war waren warst was weg weil weiter welche welchem welchen welcher welches wenn werde werden wie wieder will wir wird wirst wo wollen wollte würde würden zu zum zur zwar zwischen'.split(' ');

    lunr.Pipeline.registerFunction(lunr.de.stopWordFilter, 'stopWordFilter-de');
  };
}))