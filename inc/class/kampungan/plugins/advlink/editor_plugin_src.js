/**
 * $RCSfile: editor_plugin_src.js,v $
 * $Revision: 1.24 $
 * $Date: 2006/02/10 16:29:38 $
 *
 * @author Moxiecode
 * @copyright Copyright � 2004-2006, Moxiecode Systems AB, All rights reserved.
 */

/* Import plugin specific language pack */
kampungan.importPluginLanguagePack('advlink', 'en,tr,de,sv,zh_cn,cs,fa,fr_ca,fr,pl,pt_br,nl,he,nb,ru,ru_KOI8-R,ru_UTF-8,nn,cy,es,is,zh_tw,zh_tw_utf8,sk,da');

var kampungan_AdvancedLinkPlugin = {
	getInfo : function() {
		return {
			longname : 'Advanced link',
			author : 'Moxiecode Systems',
			authorurl : 'http://kampungan.moxiecode.com',
			infourl : 'http://kampungan.moxiecode.com/kampungan/docs/plugin_advlink.html',
			version : kampungan.majorVersion + "." + kampungan.minorVersion
		};
	},

	initInstance : function(inst) {
		inst.addShortcut('ctrl', 'k', 'lang_advlink_desc', 'mceAdvLink');
	},

	getControlHTML : function(cn) {
		switch (cn) {
			case "link":
				return kampungan.getButtonHTML(cn, 'lang_link_desc', '{$themeurl}/images/link.gif', 'mceAdvLink');
		}

		return "";
	},

	execCommand : function(editor_id, element, command, user_interface, value) {
		switch (command) {
			case "mceAdvLink":
				var anySelection = false;
				var inst = kampungan.getInstanceById(editor_id);
				var focusElm = inst.getFocusElement();
				var selectedText = inst.selection.getSelectedText();

				if (kampungan.selectedElement)
					anySelection = (kampungan.selectedElement.nodeName.toLowerCase() == "img") || (selectedText && selectedText.length > 0);

				if (anySelection || (focusElm != null && focusElm.nodeName == "A")) {
					var template = new Array();

					template['file']   = '../../plugins/advlink/link.htm';
					template['width']  = 480;
					template['height'] = 400;

					// Language specific width and height addons
					template['width']  += kampungan.getLang('lang_advlink_delta_width', 0);
					template['height'] += kampungan.getLang('lang_advlink_delta_height', 0);

					kampungan.openWindow(template, {editor_id : editor_id, inline : "yes"});
				}

				return true;
		}

		return false;
	},

	handleNodeChange : function(editor_id, node, undo_index, undo_levels, visual_aid, any_selection) {
		if (node == null)
			return;

		do {
			if (node.nodeName == "A" && kampungan.getAttrib(node, 'href') != "") {
				kampungan.switchClass(editor_id + '_advlink', 'mceButtonSelected');
				return true;
			}
		} while ((node = node.parentNode));

		if (any_selection) {
			kampungan.switchClass(editor_id + '_advlink', 'mceButtonNormal');
			return true;
		}

		kampungan.switchClass(editor_id + '_advlink', 'mceButtonDisabled');

		return true;
	}
};

kampungan.addPlugin("advlink", kampungan_AdvancedLinkPlugin);
