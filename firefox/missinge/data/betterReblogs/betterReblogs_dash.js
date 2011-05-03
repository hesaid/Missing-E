/*
 * 'Missing e' Extension
 *
 * Copyright 2011, Jeremy Cutler
 * Released under the GPL version 3 licence.
 * SEE: GPL-LICENSE.txt
 *
 * This file is part of 'Missing e'.
 *
 * 'Missing e' is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * 'Missing e' is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with 'Missing e'. If not, see <http://www.gnu.org/licenses/>.
 */

function setReblogTags(tags) {
   localStorage.setItem('tbr_ReblogTags',tags.join(','));
}

function MissingE_betterReblogs_dash_doStartup(passTags) {
   if (passTags === 1) {
      jQuery('#posts div.post_controls a[href^="/reblog/"]').live('mousedown',
                                                                function(e) {
         if (e.which !== 1 && e.which !== 2) { return; }
         var tags = jQuery(this).closest('li.post').find('span.tags a');
         var tagarr = [];
         if (/http:\/\/www\.tumblr\.com\/tagged\//.test(location.href)) {
            var i;
            var str = location.href.match(/[^\/\?]*(?:$|\?)/)[0];
            str = str.replace(/\?/,'').replace(/\+/,' ');
            var entities = str.match(/%[0-9a-fA-F]{2}/g);
            if (entities !== undefined && entities !== null) {
               for (i=0; i<entities.length; i++) {
                  var repl = String.fromCharCode(parseInt(entities[i].replace(/%/,''),16));
                  str = str.replace(entities[i],repl);
               }
            }
            tagarr.push(str);
         }
         tags.each(function() {
            tagarr.push(jQuery(this).html().replace(/^#/,''));
         });
         setReblogTags(tagarr);
      });
   }
}

