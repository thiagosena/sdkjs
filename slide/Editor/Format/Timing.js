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



    function CBaseFormatObject() {
        CBaseObject.call(this);
    }
    CBaseFormatObject.prototype = Object.create(CBaseObject.prototype);
    CBaseFormatObject.prototype.constructor = CBaseFormatObject;
    CBaseFormatObject.prototype.classType = AscDFH.historyitem_type_Unknown;
    CBaseFormatObject.prototype.getObjectType = function() {
        return this.classType;
    };


    function InitClass(fClass, fBase, nType) {
        fClass.prototype = Object.create(fBase.prototype);
        fClass.prototype.constructor = fClass;
        fClass.prototype.classType = nType;
    }

    function CTiming() {
        CBaseFormatObject.call(this);
        this.bldLst = null;//TODO: implement
        this.tnLst  = null;//TODO: implement
    }
    InitClass(CTiming, CBaseFormatObject, AscDFH.historyitem_type_Unknown);
    CTiming.prototype.setBldLst = function(oPr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.bldLst, oPr));
        this.bldLst = oPr;
    };
    CTiming.prototype.setTnLst = function(oPr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.tnLst, oPr));
        this.tnLst = oPr;
    };

    function CBldLst() {
        CBaseFormatObject.call(this);
        this.list = [];
    }
    InitClass(CBldLst, CBaseFormatObject, AscDFH.historyitem_type_Unknown);
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


    function CBaseLst() {
        CBaseFormatObject.call(this);
        this.list = []
    }
    InitClass(CBaseLst, CBaseFormatObject, AscDFH.historyitem_type_Unknown);
    CBaseLst.prototype.addToLst = function(nIdx, oPr) {
        var nInsertIdx = Math.min(this.list.length, Math.max(0, nIdx));
        History.Add(new CChangesDrawingsContent(this, AscDFH.historyitem_Unknown_Unknown, nInsertIdx, [oPr], true));
        this.list.splice(nInsertIdx, 0, oPr);
    };
    CBaseLst.prototype.removeFromLst = function(nIdx) {
        if(nIdx > -1 && nIdx < this.list.length) {
            History.Add(new CChangesDrawingsContent(this, AscDFH.historyitem_Unknown_Unknown, nIdx, [this.list[nIdx]], true));
            this.list.splice(nIdx, 1);
        }
    };

    function CBldBase() {
        CBaseFormatObject.call(this);
        this.grpId = null;
        this.spid = null;
        this.uiExpand = null;
    }
    InitClass(CBldBase, CBaseFormatObject, AscDFH.historyitem_type_Unknown);
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
    InitClass(CBldDgm, CBldBase, AscDFH.historyitem_type_Unknown);
    CBldDgm.prototype.setBld = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.bld, pr));
        this.bld = pr;
    };

    function CBldGraphic() {
        CBldBase.call(this);
        this.bldAsOne = null;
        this.bldSub = null;
    }
    InitClass(CBldGraphic, CBldBase, AscDFH.historyitem_type_Unknown);
    CBldGraphic.prototype.setBldAsOne = function(pr) {
        oHistory.Add(new CChangeBool(this, AscDFH.historyitem_Unknown_Unknown, this.bldAsOne, pr));
        this.bldAsOne = pr;
    };
    CBldGraphic.prototype.setBldAsOne = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.bldSub, pr));
        this.bldSub = pr;
    };

    function CBldOleChart() {
        CBldDgm.call(this);
        this.animBg = null;
    }
    InitClass(CBldOleChart, CBldDgm, AscDFH.historyitem_type_Unknown);
    CBldOleChart.prototype.setAnimBg = function(pr) {
        oHistory.Add(new CChangeBool(this, AscDFH.historyitem_Unknown_Unknown, this.animBg, pr));
        this.animBg = pr;
    };

    function CBldP() {
        CBldOleChart.call(this);
        this.tmplLst = null;
        this.advAuto = null;
        this.autoUpdateAnimB = null;
        this.bldLvl = null;
        this.build = null;
        this.rev = null;
    }
    InitClass(CBldP, CBldOleChart, AscDFH.historyitem_type_Unknown);
    CBldP.prototype.setTmplLst = function(pr) {
        oHistory.Add(new CChangeBool(this, AscDFH.historyitem_Unknown_Unknown, this.tmplLst, pr));
        this.tmplLst = pr;
    };
    CBldP.prototype.setAdvAuto = function(pr) {
        oHistory.Add(new CChangeBool(this, AscDFH.historyitem_Unknown_Unknown, this.advAuto, pr));
        this.advAuto = pr;
    };
    CBldP.prototype.setAutoUpdateAnimB = function(pr) {
        oHistory.Add(new CChangeBool(this, AscDFH.historyitem_Unknown_Unknown, this.autoUpdateAnimB, pr));
        this.autoUpdateAnimB = pr;
    };
    CBldP.prototype.setBldLvl = function(pr) {
        oHistory.Add(new CChangeBool(this, AscDFH.historyitem_Unknown_Unknown, this.bldLvl, pr));
        this.bldLvl = pr;
    };
    CBldP.prototype.setBuild = function(pr) {
        oHistory.Add(new CChangeBool(this, AscDFH.historyitem_Unknown_Unknown, this.build, pr));
        this.build = pr;
    };
    CBldP.prototype.setRev = function(pr) {
        oHistory.Add(new CChangeBool(this, AscDFH.historyitem_Unknown_Unknown, this.rev, pr));
        this.rev = pr;
    };

    function CTmplLst() {
        CBaseLst.call(this);
    }
    InitClass(CTmplLst, CBaseLst, AscDFH.historyitem_type_Unknown);

    function CTmpl() {
        CBaseFormatObject.call(this);
        this.lvl = null;
        this.tnLst = null
    }
    InitClass(CTmpl, CBaseFormatObject, AscDFH.historyitem_type_Unknown);
    CTmpl.prototype.setLvl = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.lvl, pr));
        this.lvl = pr;
    };
    CTmpl.prototype.setTnLst = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.tnLst, pr));
        this.tnLst = pr;
    };

    function CTnLst() {
        CBaseLst.call(this);
    }
    InitClass(CTnLst, CBaseLst, AscDFH.historyitem_type_Unknown);

    function CAnim() {
        CBaseFormatObject.call(this);
        this.cBhvr = null;
        this.tavLst = null;
        this.by = null;
        this.calcmode = null;
        this.from = null;
        this.to = null;
        this.valueType = null;
    }
    InitClass(CAnim, CBaseFormatObject, AscDFH.historyitem_type_Unknown);
    CAnim.prototype.setCBhvr = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.cBhvr, pr));
        this.cBhvr = pr;
    };
    CAnim.prototype.setTavLst = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.tavLst, pr));
        this.tavLst = pr;
    };
    CAnim.prototype.setBy = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.by, pr));
        this.by = pr;
    };
    CAnim.prototype.setCalcMode = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.calcmode, pr));
        this.calcmode = pr;
    };
    CAnim.prototype.setFrom = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.from, pr));
        this.from = pr;
    };
    CAnim.prototype.setTo = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.to, pr));
        this.to = pr;
    };
    CAnim.prototype.setValueType = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.valueType, pr));
        this.valueType = pr;
    };
})(window);
