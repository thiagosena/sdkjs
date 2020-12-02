/*
 * (c) Copyright Ascensio System SIA 2010-2019
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-12 Ernesta Birznieka-Upisha
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

"use strict";

(function(window, undefined) {
    var CBaseObject = AscFormat.CBaseObject;
    var oHistory = AscCommon.History;
    var CChangeBool = AscDFH.CChangesDrawingsBool;
    var CChangeLong = AscDFH.CChangesDrawingsLong;
    var CChangeDouble = AscDFH.CChangesDrawingsDouble;
    var CChangeString = AscDFH.CChangesDrawingsString;
    var CChangeObjectNoId = AscDFH.CChangesDrawingsObjectNoId;
    var CChangeObject = AscDFH.CChangesDrawingsObject;
    var CChangeContent = AscDFH.CChangesDrawingsContent;
    var CChangeDouble2 = AscDFH.CChangesDrawingsDouble2;

    function CTiming() {
        CBaseObject.call(this);
        this.bldLst = null;//TODO: implement
        this.tnLst  = null;//TODO: implement
    }
    CTiming.prototype = Object.create(CBaseObject.prototype);
    CTiming.prototype.constructor = CTiming;
    CTiming.prototype.getObjectType = function() {
        return AscDFH.historyitem_type_Unknown;
    };
    CTiming.prototype.setBldLst = function(oPr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.bldLst, oPr));
        this.bldLst = oPr;
    };
    CTiming.prototype.setTnLst = function(oPr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.tnLst, oPr));
        this.tnLst = oPr;
    };

    function CBldLst() {
        CBaseObject.call(this);
        this.list = [];
    }
    CBldLst.prototype = Object.create(CBaseObject.prototype);
    CBldLst.prototype.constructor = CBldLst;
    CBldLst.prototype.getObjectType = function() {
        return AscDFH.historyitem_type_Unknown;
    };
    CBldLst.prototype.addToLst = function(nIdx, oPr) {
        var nInsertIdx = Math.min(this.list.length, Math.max(0, nIdx));
        History.Add(new CChangesDrawingsContent(this, AscDFH.historyitem_Unknown_Unknown, nInsertIdx, [oPr], true));
        this.list.splice(nInsertIdx, 0, oPr);
    };
    CBldLst.prototype.removeFromLst = function(nIdx) {
        if(nIdx > -1 && nIdx < this.list.length) {
            History.Add(new CChangesDrawingsContent(this, AscDFH.historyitem_Unknown_Unknown, nIdx, [this.list[nIdx]], true));
            this.list.splice(nIdx, 1);
        }
    };

    function CTnLst() {
        CBaseObject.call(this);
        this.list = [];
    }
    CTnLst.prototype = Object.create(CBaseObject.prototype);
    CTnLst.prototype.constructor = CTnLst;
    CTnLst.prototype.getObjectType = function() {
        return AscDFH.historyitem_type_Unknown;
    };
    CTnLst.prototype.addToLst = function(nIdx, oPr) {
        var nInsertIdx = Math.min(this.list.length, Math.max(0, nIdx));
        History.Add(new CChangesDrawingsContent(this, AscDFH.historyitem_Unknown_Unknown, nInsertIdx, [oPr], true));
        this.list.splice(nInsertIdx, 0, oPr);
    };
    CTnLst.prototype.removeFromLst = function(nIdx) {
        if(nIdx > -1 && nIdx < this.list.length) {
            History.Add(new CChangesDrawingsContent(this, AscDFH.historyitem_Unknown_Unknown, nIdx, [this.list[nIdx]], true));
            this.list.splice(nIdx, 1);
        }
    };

    function CBldBase() {
        CBaseObject.call(this);
        this.grpId = null;
        this.spid = null;
        this.uiExpand = null;
    }
    CBldBase.prototype = Object.create(CBaseObject.prototype);
    CBldBase.prototype.constructor = CBldBase;
    CBldBase.prototype.getObjectType = function() {
        return AscDFH.historyitem_type_Unknown;
    };
    CBldBase.prototype.setGrpId = function(pr) {
        oHistory.Add(new CChangeString(this, AscDFH.historyitem_Unknown_Unknown, this.grpId, pr));
        this.grpId = pr;
    };
    CBldBase.prototype.setSpid = function(pr) {
        oHistory.Add(new CChangeString(this, AscDFH.historyitem_Unknown_Unknown, this.spid, pr));
        this.spid = pr;
    };
    CBldBase.prototype.setUiExpand = function(pr) {
        oHistory.Add(new CChangeString(this, AscDFH.historyitem_Unknown_Unknown, this.uiExpand, pr));
        this.uiExpand = pr;
    };

    function CBldDgm() {
        CBldBase.call(this);
        this.bld = null;
    }
    CBldDgm.prototype = Object.create(CBldBase.prototype);
    CBldDgm.prototype.constructor = CBldDgm;
    CBldDgm.prototype.getObjectType = function() {
        return AscDFH.historyitem_type_Unknown;
    };
    CBldDgm.prototype.setBld = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.bld, pr));
        this.bld = pr;
    };
    
    function CBldGraphic() {
        CBldBase.call(this);
        this.bldAsOne = null;
        this.bldSub = null;
    }
    CBldGraphic.prototype = Object.create(CBaseObject.prototype);
    CBldGraphic.prototype.constructor = CBldGraphic;
    CBldGraphic.prototype.getObjectType = function() {
        return AscDFH.historyitem_type_Unknown;
    };
    CBldGraphic.prototype.setBldAsOne = function(pr) {
        oHistory.Add(new CChangeBool(this, AscDFH.historyitem_Unknown_Unknown, this.bldAsOne, pr));
        this.bldAsOne = pr;
    };
    CBldGraphic.prototype.setBldAsOne = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.bldSub, pr));
        this.bldSub = pr;
    };

    function CBldOleChart() {
        CBaseObject.call(this);
        //TODO:
    }
    CBldOleChart.prototype = Object.create(CBaseObject.prototype);
    CBldOleChart.prototype.constructor = CBldOleChart;

    function CBldP() {
        CBaseObject.call(this);
        //TODO:
    }
    CBldP.prototype = Object.create(CBaseObject.prototype);
    CBldP.prototype.constructor = CBldP;





})(window);