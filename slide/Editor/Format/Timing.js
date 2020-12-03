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

    function CEmptyObject() {
        CBaseFormatObject.call(this);
    }
    InitClass(CEmptyObject, CBaseFormatObject, AscDFH.historyitem_type_Unknown);

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

    function CCommonTimingList() {
        CBaseFormatObject.call(this);
        this.list = []
    }
    InitClass(CCommonTimingList, CBaseFormatObject, AscDFH.historyitem_type_Unknown);
    CCommonTimingList.prototype.addToLst = function(nIdx, oPr) {
        var nInsertIdx = Math.min(this.list.length, Math.max(0, nIdx));
        History.Add(new CChangesDrawingsContent(this, AscDFH.historyitem_Unknown_Unknown, nInsertIdx, [oPr], true));
        this.list.splice(nInsertIdx, 0, oPr);
    };
    CCommonTimingList.prototype.removeFromLst = function(nIdx) {
        if(nIdx > -1 && nIdx < this.list.length) {
            History.Add(new CChangesDrawingsContent(this, AscDFH.historyitem_Unknown_Unknown, nIdx, [this.list[nIdx]], true));
            this.list.splice(nIdx, 1);
        }
    };

    function CObjectTarget() {
        CBaseFormatObject.call(this);
        this.spid = null;
    }
    InitClass(CObjectTarget, CBaseFormatObject, AscDFH.historyitem_type_Unknown);
    CObjectTarget.prototype.setSpid = function(pr) {
        oHistory.Add(new CChangeString(this, AscDFH.historyitem_Unknown_Unknown, this.spid, pr));
        this.spid = pr;
    };

    function CBldBase() {
        CObjectTarget.call(this);
        this.grpId = null;
        this.uiExpand = null;
    }
    InitClass(CBldBase, CObjectTarget, AscDFH.historyitem_type_Unknown);
    CBldBase.prototype.setGrpId = function(pr) {
        oHistory.Add(new CChangeString(this, AscDFH.historyitem_Unknown_Unknown, this.grpId, pr));
        this.grpId = pr;
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
    function CCBhvr() {
        CBaseFormatObject.call(this);
        this.attrNameLst = null;
        this.cTn = null;
        this.tgtEl = null;
        this.accumulate = null;
        this.additive = null;
        this.by = null;
        this.from = null;
        this.override = null;
        this.rctx = null;
        this.to = null;
        this.xfrmType = null;
    }
    InitClass(CCBhvr, CBaseFormatObject, AscDFH.historyitem_type_Unknown);
    CCBhvr.prototype.setAttrNameLst = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.attrNameLst, pr));
        this.attrNameLst = pr;
    };
    CCBhvr.prototype.setCTn = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.cTn, pr));
        this.cTn = pr;
    };
    CCBhvr.prototype.setTgtEl = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.tgtEl, pr));
        this.tgtEl = pr;
    };
    CCBhvr.prototype.setAccumulate = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.accumulate, pr));
        this.accumulate = pr;
    };
    CCBhvr.prototype.setAdditive = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.additive, pr));
        this.additive = pr;
    };
    CCBhvr.prototype.setBy = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.by, pr));
        this.by = pr;
    };
    CCBhvr.prototype.setFrom = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.from, pr));
        this.from = pr;
    };
    CCBhvr.prototype.setOverride = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.override, pr));
        this.override = pr;
    };
    CCBhvr.prototype.setRctx = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.rctx, pr));
        this.rctx = pr;
    };
    CCBhvr.prototype.setTo = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.to, pr));
        this.to = pr;
    };
    CCBhvr.prototype.setXfrmType = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.xfrmType, pr));
        this.xfrmType = pr;
    };

    function CCTn() {
        CBaseFormatObject.call(this);
        this.childTnLst = null;
        this.endCondLst = null;
        this.endSync = null;
        this.iterate = null;
        this.stCondLst = null;
        this.subTnLst = null;
        this.accel = null;
        this.afterEffect = null;
        this.autoRev = null;
        this.bldLvl = null;
        this.decel = null;
        this.display = null;
        this.dur = null;
        this.evtFilter = null;
        this.fill = null;
        this.grpId = null;
        this.id = null;
        this.masterRel = null;
        this.nodePh = null;
        this.nodeType = null;
        this.presetClass = null;
        this.presetID = null;
        this.presetSubtype = null;
        this.repeatCount = null;
        this.repeatDur = null;
        this.restart = null;
        this.spd = null;
        this.syncBehavior = null;
        this.tmFilter = null;
    }
    InitClass(CCTn, CBaseFormatObject, AscDFH.historyitem_type_Unknown);
    CCTn.prototype.setChildTnLst = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.childTnLst, pr));
        this.childTnLst = pr;
    };
    CCTn.prototype.setEndCondLst = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.endCondLst, pr));
        this.endCondLst = pr;
    };
    CCTn.prototype.setEndSync = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.endSync, pr));
        this.endSync = pr;
    };
    CCTn.prototype.setIterate = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.iterate, pr));
        this.iterate = pr;
    };
    CCTn.prototype.setStCondLst = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.stCondLst, pr));
        this.stCondLst = pr;
    };
    CCTn.prototype.setSubTnLst = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.subTnLst, pr));
        this.subTnLst = pr;
    };
    CCTn.prototype.setAccel = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.accel, pr));
        this.accel = pr;
    };
    CCTn.prototype.setAfterEffect = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.afterEffect, pr));
        this.afterEffect = pr;
    };
    CCTn.prototype.setAutoRev = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.autoRev, pr));
        this.autoRev = pr;
    };
    CCTn.prototype.setBldLvl = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.bldLvl, pr));
        this.bldLvl = pr;
    };
    CCTn.prototype.setDecel = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.decel, pr));
        this.decel = pr;
    };
    CCTn.prototype.setDisplay = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.display, pr));
        this.display = pr;
    };
    CCTn.prototype.setDur = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.dur, pr));
        this.dur = pr;
    };
    CCTn.prototype.setEvtFilter = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.evtFilter, pr));
        this.evtFilter = pr;
    };
    CCTn.prototype.setFill = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.fill, pr));
        this.fill = pr;
    };
    CCTn.prototype.setGrpId = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.grpId, pr));
        this.grpId = pr;
    };
    CCTn.prototype.setId = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.id, pr));
        this.id = pr;
    };
    CCTn.prototype.setMasterRel = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.masterRel, pr));
        this.masterRel = pr;
    };
    CCTn.prototype.setNodePh = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.nodePh, pr));
        this.nodePh = pr;
    };
    CCTn.prototype.setNodeType = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.nodeType, pr));
        this.nodeType = pr;
    };
    CCTn.prototype.setPresetClass = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.presetClass, pr));
        this.presetClass = pr;
    };
    CCTn.prototype.setPresetID = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.presetID, pr));
        this.presetID = pr;
    };
    CCTn.prototype.setPresetSubtype = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.presetSubtype, pr));
        this.presetSubtype = pr;
    };
    CCTn.prototype.setRepeatCount = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.repeatCount, pr));
        this.repeatCount = pr;
    };
    CCTn.prototype.setRepeatDur = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.repeatDur, pr));
        this.repeatDur = pr;
    };
    CCTn.prototype.setRestart = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.restart, pr));
        this.restart = pr;
    };
    CCTn.prototype.setSpd = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.spd, pr));
        this.spd = pr;
    };
    CCTn.prototype.setSyncBehavior = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.syncBehavior, pr));
        this.syncBehavior = pr;
    };
    CCTn.prototype.setTmFilter = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.tmFilter, pr));
        this.tmFilter = pr;
    };

    function CCond() {
        CBaseFormatObject.call(this);
        this.rtn = null;
        this.tgtEl = null;
        this.tn = null;
        this.delay = null;
        this.evt = null;
    }
    InitClass(CCond, CBaseFormatObject, AscDFH.historyitem_type_Unknown);
    CCond.prototype.setRtn = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH, historyitem_Unknown_Unknown, this.rtn, pr));
        this.rtn = pr;
    };
    CCond.prototype.setTgtEl = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH, historyitem_Unknown_Unknown, this.tgtEl, pr));
        this.tgtEl = pr;
    };
    CCond.prototype.setTn = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH, historyitem_Unknown_Unknown, this.tn, pr));
        this.tn = pr;
    };
    CCond.prototype.setDelay = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH, historyitem_Unknown_Unknown, this.delay, pr));
        this.delay = pr;
    };
    CCond.prototype.setEvt = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH, historyitem_Unknown_Unknown, this.evt, pr));
        this.evt = pr;
    };

    function CRtn() {
        CBaseFormatObject.call(this);
        this.val = null;
    }
    InitClass(CRtn, CBaseFormatObject, AscDFH.historyitem_type_Unknown);
    CRtn.prototype.setVal = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH, historyitem_Unknown_Unknown, this.val, pr));
        this.val = pr;
    };

    function CTgtEl() {
        CBaseObject.call(this);
        this.inkTgt = null;//CObjectTarget
        this.sldTgt = null;
        this.sndTgt = null;
        this.spTgt = null;
    }
    InitClass(CTgtEl, CBaseFormatObject, AscDFH.historyitem_type_Unknown);
    CTgtEl.prototype.setInkTgt = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.inkTgt, pr));
        this.inkTgt = pr;
    };
    CTgtEl.prototype.setSldTgt = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.sldTgt, pr));
        this.sldTgt = pr;
    };
    CTgtEl.prototype.setSndTgt = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.sndTgt, pr));
        this.sndTgt = pr;
    };
    CTgtEl.prototype.setSpTgt = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.spTgt, pr));
        this.spTgt = pr;
    };

    function CSndTgt() {
        CBaseFormatObject.call(this);
        this.embed = null;
        this.name = null;
    }
    InitClass(CSndTgt, CBaseFormatObject, AscDFH.historyitem_type_Unknown);
    CSndTgt.prototype.setEmbed = function (pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.embed, pr));
        this.embed = pr;
    };
    CSndTgt.prototype.setName = function (pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.name, pr));
        this.name = pr;
    };

    function CSpTgt() {
        CObjectTarget.call(this);
        this.bg = null;
        this.graphicEl = null;
        this.oleChartEl = null;
        this.subSp = null;
        this.txEl = null;
    }
    InitClass(CSpTgt, CObjectTarget, AscDFH.historyitem_type_Unknown);
    CSpTgt.prototype.setBg = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown, this.bg, pr));
        this.bg = pr;
    };
    CSpTgt.prototype.setGraphicEl = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown, this.graphicEl, pr));
        this.graphicEl = pr;
    };
    CSpTgt.prototype.setOleChartEl = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown, this.oleChartEl, pr));
        this.oleChartEl = pr;
    };
    CSpTgt.prototype.setSubSp = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown, this.subSp, pr));
        this.subSp = pr;
    };
    CSpTgt.prototype.setTxEl = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown, this.txEl, pr));
        this.txEl = pr;
    };

    function CIterateData() {
        CBaseFormatObject.call(this);
        this.tmAbs = null;
        this.tmPct = null;
        this.backwards = null;
        this.type = null;
    }
    InitClass(CIterateData, CBaseFormatObject, AscDFH.historyitem_type_Unknown);
    CIterateData.prototype.setTmAbs = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown, this.tmAbs, pr));
        this.tmAbs = pr;
    };
    CIterateData.prototype.setTmPct = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown, this.tmPct, pr));
        this.tmPct = pr;
    };
    CIterateData.prototype.setBackwards = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown, this.backwards, pr));
        this.backwards = pr;
    };
    CIterateData.prototype.setType = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown, this.type, pr));
        this.type = pr;
    };

    function CTm() {
        CBaseFormatObject.call(this);
        this.val = null
    }
    InitClass(CTm, CBaseFormatObject, AscDFH.historyitem_type_Unknown);
    CTm.prototype.setVal = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown, this.val, pr));
        this.val = pr;
    };

    function CTav() {
        CBaseFormatObject.call(this);
        this.val = null;
        this.fmla = null;
        this.tm = null;
    }
    InitClass(CTav, CBaseFormatObject, AscDFH.historyitem_type_Unknown);
    CTav.prototype.setVal = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.val, pr));
        this.val = pr;
    };
    CTav.prototype.setFmla = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.fmla, pr));
        this.fmla = pr;
    };
    CTav.prototype.setTm = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.tm, pr));
        this.tm = pr;
    };

    function CAnimVariant() {
        CBaseFormatObject();
        this.boolVal = null;
        this.clrVal = null;
        this.fltVal = null;
        this.intVal = null;
        this.strVal = null;
    }
    InitClass(CAnimVariant, CBaseFormatObject, AscDFH.historyitem_type_Unknown);
    CAnimVariant.prototype.setBoolVal = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.boolVal, pr));
        this.boolVal = pr;
    };
    CAnimVariant.prototype.setClrVal = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.clrVal, pr));
        this.clrVal = pr;
    };
    CAnimVariant.prototype.setFltVal = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_type_Unknown, this.fltVal, pr));
        this.fltVal = pr;
    };
    CAnimVariant.prototype.setIntVal = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_type_Unknown, this.intVal, pr));
        this.intVal = pr;
    };
    CAnimVariant.prototype.setStrVal = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_type_Unknown, this.strVal, pr));
        this.strVal = pr;
    };

    function CAnimClr() {
        CBaseFormatObject.call(this);
        this.by = null;
        this.cBhvr = null;
        this.from = null;
        this.to = null;
        this.clrSpc = null;
        this.dir = null;
    }
    InitClass(CAnimClr, CBaseFormatObject, AscDFH.historyitem_type_Unknown);
    CAnimClr.prototype.setBy = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_type_Unknown, this.by, pr));
        this.by = pr;
    };
    CAnimClr.prototype.setCBhvr = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_type_Unknown, this.cBhvr, pr));
        this.cBhvr = pr;
    };
    CAnimClr.prototype.setFrom = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_type_Unknown, this.from, pr));
        this.from = pr;
    };
    CAnimClr.prototype.setTo = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_type_Unknown, this.to, pr));
        this.to = pr;
    };
    CAnimClr.prototype.setClrSpc = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_type_Unknown, this.clrSpc, pr));
        this.clrSpc = pr;
    };
    CAnimClr.prototype.setDir = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_type_Unknown, this.dir, pr));
        this.dir = pr;
    };

    function CAnimEffect() {
        CBaseFormatObject.call(this);
        this.cBhvr = null;
        this.progress = null;
        this.filter = null;
        this.prLst = null;
        this.transition = null;
    }
    InitClass(CAnimEffect, CBaseFormatObject, AscDFH.historyitem_type_Unknown);
    CAnimEffect.progress.setCBhvr = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.cBhvr, pr));
        this.cBhvr = pr;
    };
    CAnimEffect.progress.setProgress = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.progress, pr));
        this.progress = pr;
    };
    CAnimEffect.progress.setFilter = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.filter, pr));
        this.filter = pr;
    };
    CAnimEffect.progress.setPrLst = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.prLst, pr));
        this.prLst = pr;
    };
    CAnimEffect.progress.setTransition = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.transition, pr));
        this.transition = pr;
    };

    function CAnimMotion() {
        CBaseFormatObject.call(this);
        this.by = null;
        this.cBhvr = null;
        this.from = null;
        this.rCtr = null;
        this.to = null;
        this.origin = null;
        this.path = null;
        this.pathEditMode = null;
        this.ptsTypes = null;
        this.rAng = null;
    }
    InitClass(CAnimMotion, CBaseFormatObject, AscDFH.historyitem_type_Unknown);
    CAnimMotion.prototype.setBy = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.by, pr));
        this.by = pr;
    };
    CAnimMotion.prototype.setCBhvr = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.cBhvr, pr));
        this.cBhvr = pr;
    };
    CAnimMotion.prototype.setFrom = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.from, pr));
        this.from = pr;
    };
    CAnimMotion.prototype.setRCtr = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.rCtr, pr));
        this.rCtr = pr;
    };
    CAnimMotion.prototype.setTo = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.to, pr));
        this.to = pr;
    };
    CAnimMotion.prototype.setOrigin = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.origin, pr));
        this.origin = pr;
    };
    CAnimMotion.prototype.setPath = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.path, pr));
        this.path = pr;
    };
    CAnimMotion.prototype.setPathEditMode = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.pathEditMode, pr));
        this.pathEditMode = pr;
    };
    CAnimMotion.prototype.setPtsTypes = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.ptsTypes, pr));
        this.ptsTypes = pr;
    };
    CAnimMotion.prototype.setRAng = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.rAng, pr));
        this.rAng = pr;
    };

    function CAnimRot() {
        CBaseFormatObject.call(this);
        this.cBhvr = null;
        this.by = null;
        this.from = null;
        this.to = null;
    }
    InitClass(CAnimRot, CBaseFormatObject, AscDFH.historyitem_type_Unknown);
    CAnimRot.prototype.setCBhvr = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.cBhvr, pr));
        this.cBhvr = pr;
    };
    CAnimRot.prototype.setBy = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.by, pr));
        this.by = pr;
    };
    CAnimRot.prototype.setFrom = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.from, pr));
        this.from = pr;
    };
    CAnimRot.prototype.setTo = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.to, pr));
        this.to = pr;
    };

    function CAnimScale() {
        CBaseFormatObject.call(this);
        this.cBhvr = null;
        this.by = null;
        this.from = null;
        this.to = null;
        this.zoomContents = null
    }
    InitClass(CAnimScale, CBaseFormatObject, AscDFH.historyitem_type_Unknown);
    CAnimScale.prototype.setCBhvr = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.cBhvr, pr));
        this.cBhvr = pr;
    };
    CAnimScale.prototype.setBy = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.by, pr));
        this.by = pr;
    };
    CAnimScale.prototype.setFrom = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.from, pr));
        this.from = pr;
    };
    CAnimScale.prototype.setTo = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.to, pr));
        this.to = pr;
    };
    CAnimScale.prototype.setZoomContents = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.zoomContents, pr));
        this.zoomContents = pr;
    };


    function CAudio() {
        CBaseFormatObject.call(this);
        this.cMediaNode = null;
        this.isNarration = null;
    }
    InitClass(CAudio, CBaseFormatObject, AscDFH.historyitem_type_Unknown);

    CAudio.prototype.setCMediaNode = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.cMediaNode, pr));
        this.cMediaNode = pr;
    };
    CAudio.prototype.setIsNarration = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.isNarration, pr));
        this.isNarration = pr;
    };

    function CCMediaNode() {
        CBaseFormatObject.call(this);
        this.cTn = null;
        this.tgtEl = null;
        this.mute = null;
        this.numSld = null;
        this.showWhenStopped = null;
        this.vol = null;
    }
    InitClass(CCMediaNode, CBaseFormatObject, AscDFH.historyitem_type_Unknown);

    CCMediaNode.prototype.setCTn = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.cTn, pr));
        this.cTn = pr;
    };
    CCMediaNode.prototype.setTgtEl = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.tgtEl, pr));
        this.tgtEl = pr;
    };
    CCMediaNode.prototype.setMute = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.mute, pr));
        this.mute = pr;
    };
    CCMediaNode.prototype.setNumSld = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.cTn, pr));
        this.cTn = pr;
    };
    CCMediaNode.prototype.setShowWhenStopped = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.cTn, pr));
        this.cTn = pr;
    };
    CCMediaNode.prototype.setVol = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.cTn, pr));
        this.cTn = pr;
    };

})(window);
