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

    var drawingsChangesMap = AscDFH.drawingsChangesMap;
    var drawingContentChanges = AscDFH.drawingContentChanges;
    var changesFactory = AscDFH.changesFactory;

    function CBaseFormatObject() {
        CBaseObject.call(this);
    }
    CBaseFormatObject.prototype = Object.create(CBaseObject.prototype);
    CBaseFormatObject.prototype.constructor = CBaseFormatObject;
    CBaseFormatObject.prototype.classType = AscDFH.historyitem_type_Unknown;
    CBaseFormatObject.prototype.getObjectType = function() {
        return this.classType;
    };
    CBaseFormatObject.prototype.createDuplicate = function() {
        var oCopy = new this.constructor();
        this.fillObject(oCopy);
        var fSuperclass = this.superclass;
        while(fSuperclass) {
            fSuperclass.fillObject.call(this, oCopy);
            fSuperclass = fSuperclass.superclass;
        }
        return oCopy;
    };
    CBaseFormatObject.prototype.fillObject = function(oCopy) {
    };

    function InitClass(fClass, fBase, nType) {
        fClass.prototype = Object.create(fBase.prototype);
        fClass.prototype.superclass = fBase;
        fClass.prototype.constructor = fClass;
        fClass.prototype.classType = nType;
    }

    function CEmptyObject() {
        CBaseFormatObject.call(this);
    }
    InitClass(CEmptyObject, CBaseFormatObject, AscDFH.historyitem_type_EmptyObject);

    changesFactory[AscDFH.historyitem_TimingBldLst] = CChangeObject;
    changesFactory[AscDFH.historyitem_TimingTnLst] = CChangeObject;
    drawingsChangesMap[AscDFH.historyitem_TimingBldLst] = function(oClass, value) {oClass.bldLst = value;};
    drawingsChangesMap[AscDFH.historyitem_TimingTnLst] = function(oClass, value) {oClass.tnLst = value;};
    function CTiming() {
        CBaseFormatObject.call(this);
        this.bldLst = null;
        this.tnLst  = null;
    }
    InitClass(CTiming, CBaseFormatObject, AscDFH.historyitem_type_Timing);
    CTiming.prototype.setBldLst = function(oPr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_TimingBldLst, this.bldLst, oPr));
        this.bldLst = oPr;
    };
    CTiming.prototype.setTnLst = function(oPr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_TimingTnLst, this.tnLst, oPr));
        this.tnLst = oPr;
    };
    CTiming.prototype.fillObject = function(oCopy) {
        if(this.bldLst) {
            oCopy.setBldLst(this.bldLst.copy());
        }
        if(this.tnLst) {
            oCopy.setBldLst(this.tnLst.copy());
        }
    };

    changesFactory[AscDFH.historyitem_CommonTimingListAdd] = CChangeContent;
    changesFactory[AscDFH.historyitem_CommonTimingListRemove] = CChangeContent;
    drawingContentChanges[AscDFH.historyitem_CommonTimingListAdd] = function(oClass) {return oClass.list;};
    drawingContentChanges[AscDFH.historyitem_CommonTimingListRemove] = function(oClass) {return oClass.list;};
    function CCommonTimingList() {
        CBaseFormatObject.call(this);
        this.list = []
    }
    InitClass(CCommonTimingList, CBaseFormatObject, AscDFH.historyitem_type_CommonTimingList);
    CCommonTimingList.prototype.addToLst = function(nIdx, oPr) {
        var nInsertIdx = Math.min(this.list.length, Math.max(0, nIdx));
        History.Add(new CChangesDrawingsContent(this, AscDFH.historyitem_CommonTimingListAdd, nInsertIdx, [oPr], true));
        this.list.splice(nInsertIdx, 0, oPr);
    };
    CCommonTimingList.prototype.removeFromLst = function(nIdx) {
        if(nIdx > -1 && nIdx < this.list.length) {
            History.Add(new CChangesDrawingsContent(this, AscDFH.historyitem_CommonTimingListRemove, nIdx, [this.list[nIdx]], false));
            this.list.splice(nIdx, 1);
        }
    };
    CCommonTimingList.prototype.fillObject = function(oCopy) {
        for(var nIdx = 0; nIdx < this.list.length; ++nIdx) {
            oCopy.addToLst(this.list[nIdx].copy());
        }
    };

    changesFactory[AscDFH.historyitem_ObjectTargetSpid] = CChangeString;
    drawingsChangesMap[AscDFH.historyitem_ObjectTargetSpid] = function(oClass, value) {oClass.spid = value;};
    function CObjectTarget() {//subsp
        CBaseFormatObject.call(this);
        this.spid = null;
    }
    InitClass(CObjectTarget, CBaseFormatObject, AscDFH.historyitem_type_ObjectTarget);
    CObjectTarget.prototype.setSpid = function(pr) {
        oHistory.Add(new CChangeString(this, AscDFH.historyitem_ObjectTargetSpid, this.spid, pr));
        this.spid = pr;
    };
    CObjectTarget.prototype.fillObject = function(oCopy) {
        oCopy.setSpid(this.spid);
    };

    changesFactory[AscDFH.historyitem_BldBaseGrpId] = CChangeString;
    changesFactory[AscDFH.historyitem_BldBaseUIExpand] = CChangeBool;
    drawingsChangesMap[AscDFH.historyitem_BldBaseGrpId] = function(oClass, value) {oClass.grpId = value;};
    drawingsChangesMap[AscDFH.historyitem_BldBaseUIExpand] = function(oClass, value) {oClass.uiExpand = value;};
    function CBldBase() {
        CObjectTarget.call(this);
        this.grpId = null;
        this.uiExpand = null;
    }
    InitClass(CBldBase, CObjectTarget, AscDFH.historyitem_type_BldBase);
    CBldBase.prototype.setGrpId = function(pr) {
        oHistory.Add(new CChangeString(this, AscDFH.historyitem_BldBaseGrpId, this.grpId, pr));
        this.grpId = pr;
    };
    CBldBase.prototype.setUiExpand = function(pr) {
        oHistory.Add(new CChangeBool(this, AscDFH.historyitem_BldBaseUIExpand, this.uiExpand, pr));
        this.uiExpand = pr;
    };
    CBldBase.prototype.fillObject = function (oCopy) {
        oCopy.setGrpId(this.grpId);
        oCopy.setUiExpand(this.uiExpand);
    };


    changesFactory[AscDFH.historyitem_BldDgmBld] = CChangeLong;
    drawingsChangesMap[AscDFH.historyitem_BldDgmBld] = function(oClass, value) {oClass.bld = value;};
    function CBldDgm() {
        CBldBase.call(this);
        this.bld = null;
    }
    InitClass(CBldDgm, CBldBase, AscDFH.historyitem_type_BldDgm);
    CBldDgm.prototype.setBld = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_BldDgmBld, this.bld, pr));
        this.bld = pr;
    };
    CBldDgm.prototype.fillObject = function (oCopy) {
        oCopy.setBld(this.bld);
    };

    changesFactory[AscDFH.historyitem_BldGraphicBldAsOne] = CChangeObject;
    changesFactory[AscDFH.historyitem_BldGraphicBldSub] = CChangeObject;
    drawingsChangesMap[AscDFH.historyitem_BldGraphicBldAsOne] = function(oClass, value) {oClass.bldAsOne = value;};
    drawingsChangesMap[AscDFH.historyitem_BldGraphicBldSub] = function(oClass, value) {oClass.bldSub = value;};
    function CBldGraphic() {
        CBldBase.call(this);
        this.bldAsOne = null;
        this.bldSub = null;
    }
    InitClass(CBldGraphic, CBldBase, AscDFH.historyitem_type_BldGraphic);
    CBldGraphic.prototype.setBldAsOne = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_BldGraphicBldAsOne, this.bldAsOne, pr));
        this.bldAsOne = pr;
    };
    CBldGraphic.prototype.setBldAsOne = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_BldGraphicBldSub, this.bldSub, pr));
        this.bldSub = pr;
    };
    CBldGraphic.prototype.fillObject = function(oCopy) {
        if(this.bldAsOne) {
            oCopy.setBldAsOne(this.bldAsOne.copy());
        }
        if(this.bldSub) {
            oCopy.setBldAsOne(this.bldSub.copy());
        }
    };


    changesFactory[AscDFH.historyitem_BldGraphicBldSub] = CChangeBool;
    drawingsChangesMap[AscDFH.historyitem_BldGraphicBldAsOne] = function(oClass, value) {oClass.animBg = value;};
    function CBldOleChart() {
        CBldDgm.call(this);
        this.animBg = null;
    }
    InitClass(CBldOleChart, CBldDgm, AscDFH.historyitem_type_BldOleChart);
    CBldOleChart.prototype.setAnimBg = function(pr) {
        oHistory.Add(new CChangeBool(this, AscDFH.historyitem_BldOleChartAnimBg, this.animBg, pr));
        this.animBg = pr;
    };
    CBldOleChart.prototype.fillObject = function(oCopy) {
        oCopy.setAnimBg(this.animBg);
    };


    changesFactory[AscDFH.historyitem_BldPTmplLst] = CChangeObject;
    changesFactory[AscDFH.historyitem_BldPAdvAuto] = CChangeLong;
    changesFactory[AscDFH.historyitem_BldPAutoUpdateAnimBg] = CChangeBool;
    changesFactory[AscDFH.historyitem_BldPBldLvl] = CChangeLong;
    changesFactory[AscDFH.historyitem_BldPBuild] = CChangeLong;
    changesFactory[AscDFH.historyitem_BldPRev] = CChangeBool;
    drawingsChangesMap[AscDFH.historyitem_BldPTmplLst] = function(oClass, value) {oClass.tmplLst = value;};
    drawingsChangesMap[AscDFH.historyitem_BldPAdvAuto] = function(oClass, value) {oClass.advAuto = value;};
    drawingsChangesMap[AscDFH.historyitem_BldPAutoUpdateAnimBg] = function(oClass, value) {oClass.autoUpdateAnimBg = value;};
    drawingsChangesMap[AscDFH.historyitem_BldPBldLvl] = function(oClass, value) {oClass.bldLvl = value;};
    drawingsChangesMap[AscDFH.historyitem_BldPBuild] = function(oClass, value) {oClass.build = value;};
    drawingsChangesMap[AscDFH.historyitem_BldPRev] = function(oClass, value) {oClass.rev = value;};

    function CBldP() {
        CBldOleChart.call(this);
        this.tmplLst = null;
        this.advAuto = null;
        this.autoUpdateAnimBg = null;
        this.bldLvl = null;
        this.build = null;
        this.rev = null;
    }
    InitClass(CBldP, CBldOleChart, AscDFH.historyitem_type_BldP);
    CBldP.prototype.setTmplLst = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_BldPTmplLst, this.tmplLst, pr));
        this.tmplLst = pr;
    };
    CBldP.prototype.setAdvAuto = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_BldPAdvAuto, this.advAuto, pr));
        this.advAuto = pr;
    };
    CBldP.prototype.setAutoUpdateAnimBg = function(pr) {
        oHistory.Add(new CChangeBool(this, AscDFH.historyitem_BldPAutoUpdateAnimBg, this.autoUpdateAnimBg, pr));
        this.autoUpdateAnimBg = pr;
    };
    CBldP.prototype.setBldLvl = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_BldPBldLvl, this.bldLvl, pr));
        this.bldLvl = pr;
    };
    CBldP.prototype.setBuild = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_BldPBuild, this.build, pr));
        this.build = pr;
    };
    CBldP.prototype.setRev = function(pr) {
        oHistory.Add(new CChangeBool(this, AscDFH.historyitem_BldPRev, this.rev, pr));
        this.rev = pr;
    };
    CBldP.prototype.fillObject = function(oCopy) {
        if(this.tmplLst) {
            oCopy.setTmplLst(this.tmplLst.copy());
        }
        oCopy.setAdvAuto(this.advAuto);
        oCopy.setAutoUpdateAnimBg(this.autoUpdateAnimBg);
        oCopy.setBldLvl(this.bldLvl);
        oCopy.setBuild(this.build);
        oCopy.setRev(this.rev);
    };

    changesFactory[AscDFH.historyitem_BldSubBldChart] = CChangeObject;
    changesFactory[AscDFH.historyitem_BldSubBldDgm] = CChangeObject;
    drawingsChangesMap[AscDFH.historyitem_BldSubBldChart] = function(oClass, value) {oClass.bldChart = value;};
    drawingsChangesMap[AscDFH.historyitem_BldSubBldDgm] = function(oClass, value) {oClass.bldDgm = value;};
    function CBldSub() {
        CBaseFormatObject.call(this);
        this.bldChart = null;
        this.bldDgm = null;
    }
    InitClass(CBldSub, CBaseFormatObject, AscDFH.historyitem_type_BldSub);
    CBldSub.prototype.setBldChart = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_BldSubBldChart, this.bldChart, pr));
        this.bldChart = pr;
    };
    CBldSub.prototype.setBldDgm = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_BldSubBldDgm, this.bldDgm, pr));
        this.bldDgm = pr;
    };
    CBldSub.prototype.fillObject = function(oCopy) {
        if(this.bldChart) {
            oCopy.setBldChart(this.bldChart.copy());
        }
        if(this.bldDgm) {
            oCopy.setBldDgm(this.bldDgm.copy());
        }
    };

    changesFactory[AscDFH.historyitem_DirTransitionDir] = CChangeLong;
    drawingsChangesMap[AscDFH.historyitem_DirTransitionDir] = function(oClass, value) {oClass.dir = value;};
    function CDirTransition() {//CBlinds, checker, comb, cover, pull, push, randomBar, strips, wipe, zoom
        CBaseFormatObject.call(this);
        this.dir = null;
    }
    InitClass(CDirTransition, CBaseFormatObject, AscDFH.historyitem_type_DirTransition);
    CDirTransition.prototype.setDir = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_DirTransitionDir, this.dir, pr));
        this.dir = pr;
    };
    CDirTransition.prototype.fillObject = function(oCopy) {
        oCopy.setDir(this.dir);
    };


    changesFactory[AscDFH.historyitem_OptBlackTransitionThruBlk] = CChangeBool;
    drawingsChangesMap[AscDFH.historyitem_OptBlackTransitionThruBlk] = function(oClass, value) {oClass.thruBlk = value;};
    function COptionalBlackTransition() {//cut, fade
        CBaseFormatObject.call(this);
        this.thruBlk = null;
    }
    InitClass(COptionalBlackTransition, CBaseFormatObject, AscDFH.historyitem_type_OptBlackTransition);
    COptionalBlackTransition.prototype.setThruBlk = function(pr) {
        oHistory.Add(new CChangeBool(this, AscDFH.historyitem_OptBlackTransitionThruBlk, this.thruBlk, pr));
        this.thruBlk = pr;
    };
    COptionalBlackTransition.prototype.fillObject = function(oCopy) {
        oCopy.setThruBlk(this.thruBlk);
    };

    function CGraphicEl() {
        CBaseFormatObject.call(this);
        this.chart = null;
        this.dgm = null;
    }
    InitClass(CGraphicEl, CBaseFormatObject, AscDFH.historyitem_type_GraphicEl);
    CGraphicEl.prototype.setChart = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_GraphicElChart, this.chart, pr));
        this.chart = pr;
    };
    CGraphicEl.prototype.setDgm = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_GraphicElDgm, this.dgm, pr));
        this.dgm = pr;
    };
    CGraphicEl.prototype.fillObject = function(oCopy) {
    };

    function CIndexRg() {//charrg, pRg
        CBaseFormatObject.call(this);
        this.st = null;
        this.end = null;
    }
    InitClass(CIndexRg, CBaseFormatObject, AscDFH.historyitem_type_IndexRg);
    CIndexRg.prototype.setSt = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_IndexRgSt, this.st, pr));
        this.st = pr;
    };
    CIndexRg.prototype.setEnd = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_IndexRgEnd, this.end, pr));
        this.end = pr;
    };
    CIndexRg.prototype.fillObject = function(oCopy) {
    };

    function CTmpl() {
        CBaseFormatObject.call(this);
        this.lvl = null;
        this.tnLst = null
    }
    InitClass(CTmpl, CBaseFormatObject, AscDFH.historyitem_type_Tmpl);
    CTmpl.prototype.setLvl = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_TmplLvl, this.lvl, pr));
        this.lvl = pr;
    };
    CTmpl.prototype.setTnLst = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_TmplTnLst, this.tnLst, pr));
        this.tnLst = pr;
    };
    CTmpl.prototype.fillObject = function(oCopy) {
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
    InitClass(CAnim, CBaseFormatObject, AscDFH.historyitem_type_Anim);
    CAnim.prototype.setCBhvr = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_AnimCBhvr, this.cBhvr, pr));
        this.cBhvr = pr;
    };
    CAnim.prototype.setTavLst = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_AnimTavLst, this.tavLst, pr));
        this.tavLst = pr;
    };
    CAnim.prototype.setBy = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_AnimBy, this.by, pr));
        this.by = pr;
    };
    CAnim.prototype.setCalcMode = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_AnimCalcmode, this.calcmode, pr));
        this.calcmode = pr;
    };
    CAnim.prototype.setFrom = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_AnimFrom, this.from, pr));
        this.from = pr;
    };
    CAnim.prototype.setTo = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_AnimTo, this.to, pr));
        this.to = pr;
    };
    CAnim.prototype.setValueType = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_AnimValueType, this.valueType, pr));
        this.valueType = pr;
    };
    CAnim.prototype.fillObject = function(oCopy) {
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
    InitClass(CCBhvr, CBaseFormatObject, AscDFH.historyitem_type_CBhvr);
    CCBhvr.prototype.setAttrNameLst = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CBhvrAttrNameLst, this.attrNameLst, pr));
        this.attrNameLst = pr;
    };
    CCBhvr.prototype.setCTn = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CBhvrCTn, this.cTn, pr));
        this.cTn = pr;
    };
    CCBhvr.prototype.setTgtEl = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CBhvrTgtEl, this.tgtEl, pr));
        this.tgtEl = pr;
    };
    CCBhvr.prototype.setAccumulate = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CBhvrAccumulate, this.accumulate, pr));
        this.accumulate = pr;
    };
    CCBhvr.prototype.setAdditive = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CBhvrAdditive, this.additive, pr));
        this.additive = pr;
    };
    CCBhvr.prototype.setBy = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CBhvrBy, this.by, pr));
        this.by = pr;
    };
    CCBhvr.prototype.setFrom = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CBhvrFrom, this.from, pr));
        this.from = pr;
    };
    CCBhvr.prototype.setOverride = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CBhvrOverride, this.override, pr));
        this.override = pr;
    };
    CCBhvr.prototype.setRctx = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CBhvrRctx, this.rctx, pr));
        this.rctx = pr;
    };
    CCBhvr.prototype.setTo = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CBhvrTo, this.to, pr));
        this.to = pr;
    };
    CCBhvr.prototype.setXfrmType = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CBhvrXfrmType, this.xfrmType, pr));
        this.xfrmType = pr;
    };
    CCBhvr.prototype.fillObject = function(oCopy) {
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
    InitClass(CCTn, CBaseFormatObject, AscDFH.historyitem_type_CTn);
    CCTn.prototype.setChildTnLst = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnChildTnLst, this.childTnLst, pr));
        this.childTnLst = pr;
    };
    CCTn.prototype.setEndCondLst = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnEndCondLst, this.endCondLst, pr));
        this.endCondLst = pr;
    };
    CCTn.prototype.setEndSync = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnEndSync, this.endSync, pr));
        this.endSync = pr;
    };
    CCTn.prototype.setIterate = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnIterate, this.iterate, pr));
        this.iterate = pr;
    };
    CCTn.prototype.setStCondLst = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnStCondLst, this.stCondLst, pr));
        this.stCondLst = pr;
    };
    CCTn.prototype.setSubTnLst = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnSubTnLst, this.subTnLst, pr));
        this.subTnLst = pr;
    };
    CCTn.prototype.setAccel = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnAccel, this.accel, pr));
        this.accel = pr;
    };
    CCTn.prototype.setAfterEffect = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnAfterEffect, this.afterEffect, pr));
        this.afterEffect = pr;
    };
    CCTn.prototype.setAutoRev = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnAutoRev, this.autoRev, pr));
        this.autoRev = pr;
    };
    CCTn.prototype.setBldLvl = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnBldLvl, this.bldLvl, pr));
        this.bldLvl = pr;
    };
    CCTn.prototype.setDecel = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnDecel, this.decel, pr));
        this.decel = pr;
    };
    CCTn.prototype.setDisplay = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnDisplay, this.display, pr));
        this.display = pr;
    };
    CCTn.prototype.setDur = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnDur, this.dur, pr));
        this.dur = pr;
    };
    CCTn.prototype.setEvtFilter = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnEvtFilter, this.evtFilter, pr));
        this.evtFilter = pr;
    };
    CCTn.prototype.setFill = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnFill, this.fill, pr));
        this.fill = pr;
    };
    CCTn.prototype.setGrpId = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnGrpId, this.grpId, pr));
        this.grpId = pr;
    };
    CCTn.prototype.setId = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnId, this.id, pr));
        this.id = pr;
    };
    CCTn.prototype.setMasterRel = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnMasterRel, this.masterRel, pr));
        this.masterRel = pr;
    };
    CCTn.prototype.setNodePh = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnNodePh, this.nodePh, pr));
        this.nodePh = pr;
    };
    CCTn.prototype.setNodeType = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnNodeType, this.nodeType, pr));
        this.nodeType = pr;
    };
    CCTn.prototype.setPresetClass = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnPresetClass, this.presetClass, pr));
        this.presetClass = pr;
    };
    CCTn.prototype.setPresetID = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnPresetID, this.presetID, pr));
        this.presetID = pr;
    };
    CCTn.prototype.setPresetSubtype = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnPresetSubtype, this.presetSubtype, pr));
        this.presetSubtype = pr;
    };
    CCTn.prototype.setRepeatCount = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnRepeatCount, this.repeatCount, pr));
        this.repeatCount = pr;
    };
    CCTn.prototype.setRepeatDur = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnRepeatDur, this.repeatDur, pr));
        this.repeatDur = pr;
    };
    CCTn.prototype.setRestart = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnRestart, this.restart, pr));
        this.restart = pr;
    };
    CCTn.prototype.setSpd = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnSpd, this.spd, pr));
        this.spd = pr;
    };
    CCTn.prototype.setSyncBehavior = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnSyncBehavior, this.syncBehavior, pr));
        this.syncBehavior = pr;
    };
    CCTn.prototype.setTmFilter = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CTnTmFilter, this.tmFilter, pr));
        this.tmFilter = pr;
    };
    CCTn.prototype.fillObject = function(oCopy) {
    };

    function CCond() {
        CBaseFormatObject.call(this);
        this.rtn = null;
        this.tgtEl = null;
        this.tn = null;
        this.delay = null;
        this.evt = null;
    }
    InitClass(CCond, CBaseFormatObject, AscDFH.historyitem_type_Cond);
    CCond.prototype.setRtn = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CondRtn, this.rtn, pr));
        this.rtn = pr;
    };
    CCond.prototype.setTgtEl = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CondTgtEl, this.tgtEl, pr));
        this.tgtEl = pr;
    };
    CCond.prototype.setTn = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CondTn, this.tn, pr));
        this.tn = pr;
    };
    CCond.prototype.setDelay = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CondDelay, this.delay, pr));
        this.delay = pr;
    };
    CCond.prototype.setEvt = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_CondEvt, this.evt, pr));
        this.evt = pr;
    };
    CCond.prototype.fillObject = function(oCopy) {
    };

    function CRtn() {
        CBaseFormatObject.call(this);
        this.val = null;
    }
    InitClass(CRtn, CBaseFormatObject, AscDFH.historyitem_type_Rtn);
    CRtn.prototype.setVal = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_RtnVal, this.val, pr));
        this.val = pr;
    };
    CRtn.prototype.fillObject = function(oCopy) {
    };

    function CTgtEl() {
        CBaseObject.call(this);
        this.inkTgt = null;//CObjectTarget
        this.sldTgt = null;
        this.sndTgt = null;
        this.spTgt = null;
    }
    InitClass(CTgtEl, CBaseFormatObject, AscDFH.historyitem_type_TgtEl);
    CTgtEl.prototype.setInkTgt = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_TgtElInkTgt, this.inkTgt, pr));
        this.inkTgt = pr;
    };
    CTgtEl.prototype.setSldTgt = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_TgtElSldTgt, this.sldTgt, pr));
        this.sldTgt = pr;
    };
    CTgtEl.prototype.setSndTgt = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_TgtElSndTgt, this.sndTgt, pr));
        this.sndTgt = pr;
    };
    CTgtEl.prototype.setSpTgt = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_TgtElSpTgt, this.spTgt, pr));
        this.spTgt = pr;
    };
    CTgtEl.prototype.fillObject = function(oCopy) {
    };

    function CSndTgt() {//snd
        CBaseFormatObject.call(this);
        this.embed = null;
        this.name = null;
    }
    InitClass(CSndTgt, CBaseFormatObject, AscDFH.historyitem_type_SndTgt);
    CSndTgt.prototype.setEmbed = function (pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_SndTgtEmbed, this.embed, pr));
        this.embed = pr;
    };
    CSndTgt.prototype.setName = function (pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_SndTgtName, this.name, pr));
        this.name = pr;
    };
    CSndTgt.prototype.fillObject = function(oCopy) {
    };

    function CSpTgt() {
        CObjectTarget.call(this);
        this.bg = null;
        this.graphicEl = null;
        this.oleChartEl = null;
        this.subSp = null;
        this.txEl = null;
    }
    InitClass(CSpTgt, CObjectTarget, AscDFH.historyitem_type_SpTgt);
    CSpTgt.prototype.setBg = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_SpTgtBg, this.bg, pr));
        this.bg = pr;
    };
    CSpTgt.prototype.setGraphicEl = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_SpTgtGraphicEl, this.graphicEl, pr));
        this.graphicEl = pr;
    };
    CSpTgt.prototype.setOleChartEl = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_SpTgtOleChartEl, this.oleChartEl, pr));
        this.oleChartEl = pr;
    };
    CSpTgt.prototype.setSubSp = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_SpTgtSubSp, this.subSp, pr));
        this.subSp = pr;
    };
    CSpTgt.prototype.setTxEl = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_SpTgtTxEl, this.txEl, pr));
        this.txEl = pr;
    };
    CSpTgt.prototype.fillObject = function(oCopy) {
    };

    function CIterateData() {
        CBaseFormatObject.call(this);
        this.tmAbs = null;
        this.tmPct = null;
        this.backwards = null;
        this.type = null;
    }
    InitClass(CIterateData, CBaseFormatObject, AscDFH.historyitem_type_IterateData);
    CIterateData.prototype.setTmAbs = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_IterateDataTmAbs, this.tmAbs, pr));
        this.tmAbs = pr;
    };
    CIterateData.prototype.setTmPct = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_IterateDataTmPct, this.tmPct, pr));
        this.tmPct = pr;
    };
    CIterateData.prototype.setBackwards = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_IterateDataBackwards, this.backwards, pr));
        this.backwards = pr;
    };
    CIterateData.prototype.setType = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_IterateDataType, this.type, pr));
        this.type = pr;
    };
    CIterateData.prototype.fillObject = function(oCopy) {
    };

    function CTm() {
        CBaseFormatObject.call(this);
        this.val = null
    }
    InitClass(CTm, CBaseFormatObject, AscDFH.historyitem_type_Tm);
    CTm.prototype.setVal = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_TmVal, this.val, pr));
        this.val = pr;
    };
    CTm.prototype.fillObject = function(oCopy) {
    };

    function CTav() {
        CBaseFormatObject.call(this);
        this.val = null;
        this.fmla = null;
        this.tm = null;
    }
    InitClass(CTav, CBaseFormatObject, AscDFH.historyitem_type_Tav);
    CTav.prototype.setVal = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_TavVal, this.val, pr));
        this.val = pr;
    };
    CTav.prototype.setFmla = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_TavFmla, this.fmla, pr));
        this.fmla = pr;
    };
    CTav.prototype.setTm = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_TavTm, this.tm, pr));
        this.tm = pr;
    };
    CTav.prototype.fillObject = function(oCopy) {
    };

    function CAnimVariant() {//progress, val
        CBaseFormatObject.call();
        this.boolVal = null;
        this.clrVal = null;
        this.fltVal = null;
        this.intVal = null;
        this.strVal = null;
    }
    InitClass(CAnimVariant, CBaseFormatObject, AscDFH.historyitem_type_AnimVariant);
    CAnimVariant.prototype.setBoolVal = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_AnimVariantBoolVal, this.boolVal, pr));
        this.boolVal = pr;
    };
    CAnimVariant.prototype.setClrVal = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_AnimVariantClrVal, this.clrVal, pr));
        this.clrVal = pr;
    };
    CAnimVariant.prototype.setFltVal = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_AnimVariantFltVal, this.fltVal, pr));
        this.fltVal = pr;
    };
    CAnimVariant.prototype.setIntVal = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_AnimVariantIntVal, this.intVal, pr));
        this.intVal = pr;
    };
    CAnimVariant.prototype.setStrVal = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_AnimVariantStrVal, this.strVal, pr));
        this.strVal = pr;
    };
    CAnimVariant.prototype.fillObject = function(oCopy) {
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
    InitClass(CAnimClr, CBaseFormatObject, AscDFH.historyitem_type_AnimClr);
    CAnimClr.prototype.setBy = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_AnimClrBy, this.by, pr));
        this.by = pr;
    };
    CAnimClr.prototype.setCBhvr = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_AnimClrCBhvr, this.cBhvr, pr));
        this.cBhvr = pr;
    };
    CAnimClr.prototype.setFrom = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_AnimClrFrom, this.from, pr));
        this.from = pr;
    };
    CAnimClr.prototype.setTo = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_AnimClrTo, this.to, pr));
        this.to = pr;
    };
    CAnimClr.prototype.setClrSpc = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_AnimClrClrSpc, this.clrSpc, pr));
        this.clrSpc = pr;
    };
    CAnimClr.prototype.setDir = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_AnimClrDir, this.dir, pr));
        this.dir = pr;
    };
    CAnimClr.prototype.fillObject = function(oCopy) {
    };

    function CAnimEffect() {
        CBaseFormatObject.call(this);
        this.cBhvr = null;
        this.progress = null;
        this.filter = null;
        this.prLst = null;
        this.transition = null;
    }
    InitClass(CAnimEffect, CBaseFormatObject, AscDFH.historyitem_type_AnimEffect);
    CAnimEffect.progress.setCBhvr = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_AnimEffectCBhvr, this.cBhvr, pr));
        this.cBhvr = pr;
    };
    CAnimEffect.progress.setProgress = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_AnimEffectProgress, this.progress, pr));
        this.progress = pr;
    };
    CAnimEffect.progress.setFilter = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_AnimEffectFilter, this.filter, pr));
        this.filter = pr;
    };
    CAnimEffect.progress.setPrLst = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_AnimEffectPrLst, this.prLst, pr));
        this.prLst = pr;
    };
    CAnimEffect.progress.setTransition = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_AnimEffectTransition, this.transition, pr));
        this.transition = pr;
    };
    CAnimEffect.prototype.fillObject = function(oCopy) {
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
    InitClass(CAnimMotion, CBaseFormatObject, AscDFH.historyitem_type_AnimMotion);
    CAnimMotion.prototype.setBy = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_AnimMotionBy, this.by, pr));
        this.by = pr;
    };
    CAnimMotion.prototype.setCBhvr = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_AnimMotionCBhvr, this.cBhvr, pr));
        this.cBhvr = pr;
    };
    CAnimMotion.prototype.setFrom = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_AnimMotionFrom, this.from, pr));
        this.from = pr;
    };
    CAnimMotion.prototype.setRCtr = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_AnimMotionRCtr, this.rCtr, pr));
        this.rCtr = pr;
    };
    CAnimMotion.prototype.setTo = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_AnimMotionTo, this.to, pr));
        this.to = pr;
    };
    CAnimMotion.prototype.setOrigin = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_AnimMotionOrigin, this.origin, pr));
        this.origin = pr;
    };
    CAnimMotion.prototype.setPath = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_AnimMotionPath, this.path, pr));
        this.path = pr;
    };
    CAnimMotion.prototype.setPathEditMode = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_AnimMotionPathEditMode, this.pathEditMode, pr));
        this.pathEditMode = pr;
    };
    CAnimMotion.prototype.setPtsTypes = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_AnimMotionPtsTypes, this.ptsTypes, pr));
        this.ptsTypes = pr;
    };
    CAnimMotion.prototype.setRAng = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_AnimMotionRAng, this.rAng, pr));
        this.rAng = pr;
    };
    CAnimMotion.prototype.fillObject = function(oCopy) {
    };

    function CAnimRot() {
        CBaseFormatObject.call(this);
        this.cBhvr = null;
        this.by = null;
        this.from = null;
        this.to = null;
    }
    InitClass(CAnimRot, CBaseFormatObject, AscDFH.historyitem_type_AnimRot);
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
    CAnimRot.prototype.fillObject = function(oCopy) {
    };

    function CAnimScale() {
        CBaseFormatObject.call(this);
        this.cBhvr = null;
        this.by = null;
        this.from = null;
        this.to = null;
        this.zoomContents = null;
    }
    InitClass(CAnimScale, CBaseFormatObject, AscDFH.historyitem_type_AnimScale);
    CAnimScale.prototype.setCBhvr = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_AnimScaleCBhvr, this.cBhvr, pr));
        this.cBhvr = pr;
    };
    CAnimScale.prototype.setBy = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_AnimScaleBy, this.by, pr));
        this.by = pr;
    };
    CAnimScale.prototype.setFrom = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_AnimScaleFrom, this.from, pr));
        this.from = pr;
    };
    CAnimScale.prototype.setTo = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_AnimScaleTo, this.to, pr));
        this.to = pr;
    };
    CAnimScale.prototype.setZoomContents = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_AnimScaleZoomContents, this.zoomContents, pr));
        this.zoomContents = pr;
    };
    CAnimScale.prototype.fillObject = function(oCopy) {
    };


    function CAudio() {
        CBaseFormatObject.call(this);
        this.cMediaNode = null;
        this.isNarration = null;
    }
    InitClass(CAudio, CBaseFormatObject, AscDFH.historyitem_type_Audio);

    CAudio.prototype.setCMediaNode = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_AudioCMediaNode, this.cMediaNode, pr));
        this.cMediaNode = pr;
    };
    CAudio.prototype.setIsNarration = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_AudioIsNarration, this.isNarration, pr));
        this.isNarration = pr;
    };
    CAudio.prototype.fillObject = function(oCopy) {
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
    InitClass(CCMediaNode, CBaseFormatObject, AscDFH.historyitem_type_CMediaNode);
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
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.numSld, pr));
        this.numSld = pr;
    };
    CCMediaNode.prototype.setShowWhenStopped = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.showWhenStopped, pr));
        this.showWhenStopped = pr;
    };
    CCMediaNode.prototype.setVol = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.vol, pr));
        this.vol = pr;
    };
    CCMediaNode.prototype.fillObject = function(oCopy) {
    };

    function CCmd() {
        CBaseFormatObject.call(this);
        this.cBhvr = null;
        this.cmd = null;
        this.type = null;
    }
    InitClass(CCmd, CBaseFormatObject, AscDFH.historyitem_type_Cmd);
    CCmd.prototype.setCBhvr = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.cBhvr, pr));
        this.cBhvr = pr;
    };
    CCmd.prototype.setCmd = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.cmd, pr));
        this.cmd = pr;
    };
    CCmd.prototype.setType = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.type, pr));
        this.type = pr;
    };
    CCmd.prototype.fillObject = function(oCopy) {
    };


    function CTimeNodeContainer() {//par, excl
        CBaseFormatObject.call(this);
        this.cTn = null;
    }
    InitClass(CTimeNodeContainer, CBaseFormatObject, AscDFH.historyitem_type_TimeNodeContainer);
    CTimeNodeContainer.prototype.setCTn = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_Unknown_Unknown, this.cTn, pr));
        this.cTn = pr;
    };
    CTimeNodeContainer.prototype.fillObject = function(oCopy) {
    };

    function CSeq() {//par, excl
        CTimeNodeContainer.call(this);
        this.nextCondLst = null;
        this.prevCondLst = null;
        this.concurrent = null;
        this.nextAc = null;
        this.prevAc = null;
    }
    InitClass(CSeq, CTimeNodeContainer, AscDFH.historyitem_type_Seq);
    CSeq.prototype.setNextCondLst = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_SeqNextCondLst, this.nextCondLst, pr));
        this.nextCondLst = pr;
    };
    CSeq.prototype.setPrevCondLst = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_SeqPrevCondLst, this.prevCondLst, pr));
        this.prevCondLst = pr;
    };
    CSeq.prototype.setConcurrent = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_SeqConcurrent, this.concurrent, pr));
        this.concurrent = pr;
    };
    CSeq.prototype.setNextAc = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_SeqNextAc, this.nextAc, pr));
        this.nextAc = pr;
    };
    CSeq.prototype.setPrevAc = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_SeqPrevAc, this.prevAc, pr));
        this.prevAc = pr;
    };
    CSeq.prototype.fillObject = function(oCopy) {
    };

    function CSet() {//par, excl
        CBaseFormatObject.call(this);
        this.cBhvr = null;
        this.to = null;
    }
    InitClass(CSet, CBaseFormatObject, AscDFH.historyitem_type_Set);
    CSet.prototype.setCBhvr = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_SetCBhvr, this.cBhvr, pr));
        this.cBhvr = pr;
    };
    CSet.prototype.setTo = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_SetTo, this.cBhvr, pr));
        this.to = pr;
    };
    CSet.prototype.fillObject = function(oCopy) {
    };

    function CVideo() {//par, excl
        CBaseFormatObject.call(this);
        this.cMediaNode = null;
        this.fullScrn = null;
    }
    InitClass(CVideo, CBaseFormatObject, AscDFH.historyitem_type_Video);
    CVideo.prototype.seCMediaNode = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_VideoCMediaNode, this.cMediaNode, pr));
        this.cMediaNode = pr;
    };
    CVideo.prototype.setFullScrn = function(pr) {
        oHistory.Add(new CChangeObject(this, AscDFH.historyitem_VideoFullScrn, this.fullScrn, pr));
        this.fullScrn = pr;
    };
    CVideo.prototype.fillObject = function(oCopy) {
    };

    function COleChartEl() {
        CBaseFormatObject.call(this);
        this.lvl = null;
        this.type = null;
    }
    InitClass(COleChartEl, CBaseFormatObject, AscDFH.historyitem_type_OleChartEl);
    COleChartEl.prototype.setLvl = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.lvl, pr));
        this.lvl = pr;
    };
    COleChartEl.prototype.setType = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_Unknown_Unknown, this.type, pr));
        this.type = pr;
    };
    COleChartEl.prototype.fillObject = function(oCopy) {
    };

    function CTLPoint() {//rCtr
        CBaseFormatObject.call(this);
        this.x = null;
        this.y = null;
    }
    InitClass(CTLPoint, CBaseFormatObject, AscDFH.historyitem_type_TlPoint);
    CTLPoint.prototype.setX = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_TlPointX, this.x, pr));
        this.x = pr;
    };
    CTLPoint.prototype.setY = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_TlPointY, this.y, pr));
        this.y = pr;
    };
    CTLPoint.prototype.fillObject = function(oCopy) {
    };

    function CSndAc() {//rCtr
        CBaseFormatObject.call(this);
        this.endSnd = null;
        this.stSnd = null;
    }
    InitClass(CSndAc, CBaseFormatObject, AscDFH.historyitem_type_SndAc);
    CSndAc.prototype.setEndSnd = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_SndAcEndSnd, this.endSnd, pr));
        this.endSnd = pr;
    };
    CSndAc.prototype.setStSnd = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_SndAcStSnd, this.stSnd, pr));
        this.stSnd = pr;
    };
    CSndAc.prototype.fillObject = function(oCopy) {
    };

    function CStSnd() {//rCtr
        CBaseFormatObject.call(this);
        this.snd = null;
        this.loop = null;
    }
    InitClass(CStSnd, CBaseFormatObject, AscDFH.historyitem_type_StSnd);
    CStSnd.prototype.setSnd = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_StSndSnd, this.snd, pr));
        this.snd = pr;
    };
    CStSnd.prototype.setLoop = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_StSndLoop, this.loop, pr));
        this.loop = pr;
    };
    CStSnd.prototype.fillObject = function(oCopy) {
    };

    function CTxEl() {//rCtr
        CBaseFormatObject.call(this);
        this.charRg = null;
        this.pRg = null;
    }
    InitClass(CTxEl, CBaseFormatObject, AscDFH.historyitem_type_TxEl);
    CTxEl.prototype.setCharRg = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_TxElCharRg, this.charRg, pr));
        this.charRg = pr;
    };
    CTxEl.prototype.setPRg = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_TxElPRg, this.pRg, pr));
        this.pRg = pr;
    };
    CTxEl.prototype.fillObject = function(oCopy) {
    };

    function CWheel() {
        CBaseFormatObject.call(this);
        this.spokes = null;
    }
    InitClass(CWheel, CBaseFormatObject, AscDFH.historyitem_type_Wheel);
    CWheel.prototype.setSpokes = function(pr) {
        oHistory.Add(new CChangeLong(this, AscDFH.historyitem_WheelSpokes, this.spokes, pr));
        this.spokes = pr;
    };
    CWheel.prototype.fillObject = function(oCopy) {
    };
})(window);
