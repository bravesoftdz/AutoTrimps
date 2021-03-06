if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
        'use strict';
        if (typeof start !== 'number') {
            start = 0;
        }
        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}

function loadPageVariables(){var a=JSON.parse(localStorage.getItem('autoTrimpSettings'));null!==a&&(debug('ATsettings: Checking version...'),a.ATversion==void 0||versionIsOlder(a.ATversion,ATversion)?(debug('ATsettings: Old version. There was a format change.'),updateOldSettings(a)):autoTrimpSettings=a)}
function safeSetItems(a,b){try{localStorage.setItem(a,b)}catch(c){22==c.code&&debug("Error: LocalStorage is full, or error. Attempt to delete some portals from your graph or restart browser.")}}
function versionIsOlder(a,b){var c=parseVersion(a),d=parseVersion(b);if(0==c.length)return!0;for(var e=0;e<c.length;e++){if(c[e]<d[e])return!0;if(c[e]>d[e])return!1}return!!(c.length<d.length)}
function parseVersion(a){return null==a||void 0===a||"string"!=typeof a?{}:(a=a.split("-",1),a[0].split("."))}

function updateOldSettings(oldSettings) {
    var oldVer = oldSettings['ATversion'];
    debug("ATsettings: Updating v" +  oldVer + " to  v" + ATversion);
    if (versionIsOlder(oldVer, '2.1.6.9')) {
        debug("ATsettings: Migrating AutoMaps + RunUniqueMaps to new AutoMaps.");
        oldSettings['AutoMaps'].value = oldSettings['AutoMaps'].enabled ? 1 : 0;
        if (!oldSettings['RunUniqueMaps'].enabled)
            oldSettings['AutoMaps'].value++;
        delete oldSettings['RunUniqueMaps'];
    }
    if (versionIsOlder(oldVer, '2.1.7.0')) {
        var X='BuyBuildings';
        var Y='BuyStorage';
        var Z='BuyBuildingsNew';
        var oldOne = oldSettings[X];
        var oldTwo = oldSettings[Y];
        var newOne = oldSettings[Z];        
        debug("ATsettings: Migrating " + X + " + " + Y + " to new " + Z);
        newOne.value = oldOne.enabled ? 1 : 0;
        newOne.value+= oldTwo.enabled ? 1 : 0;
        delete oldOne;
        delete oldTwo;      
    }
    autoTrimpSettings = oldSettings;
}

function serializeSettings() {
    return JSON.stringify(Object.keys(autoTrimpSettings).reduce((v, k) => {
        const el = autoTrimpSettings[k];
        switch (el.type) {
        case 'boolean':
            return v[k] = el.enabled, v;
        case 'value':
        case 'multiValue':
        case 'valueNegative':
        case 'multitoggle':
            return v[k] = el.value, v;
        case 'dropdown':
            return v[k] = el.selected, v;
        }
        return v[k] = el, v;
    }, {}));
}

function serializeSettings550() {
    return '{"ManualGather2":2,"BetterAutoFight":3,"AutoStance":2,"TrapTrimps":false,"AutoPortal":"Custom","HeliumHourChallenge":"Corrupted","CustomAutoPortal":555,"HeHrDontPortalBefore":496,"HeliumHrBuffer":3,"AutoStartDaily":false,"PauseScript":false,"BuyShieldblock":false,"Prestige":"Dagadder","DynamicPrestige2":-1,"DelayArmorWhenNeeded":false,"CapEquip2":125,"AutoMaps":1,"DynamicSiphonology":true,"LowerFarmingZone":true,"MinutestoFarmBeforeSpire":0,"RunBionicBeforeSpire":false,"ExitSpireCell":90,"CorruptionCalc":true,"FarmWhenNomStacks7":true,"VoidMaps":555,"VoidCheck":1,"MaxTox":false,"DisableFarm":-1,"FarmerRatio":20,"LumberjackRatio":10,"MinerRatio":1000,"MaxScientists":"-1","MaxExplorers":3000,"MaxTrainers":-1,"MaxHut":100,"MaxHouse":0,"MaxMansion":0,"MaxHotel":0,"MaxResort":0,"MaxGateway":0,"MaxWormhole":0,"MaxCollector":0,"FirstGigastation":1,"DeltaGigastation":1,"MaxGym":"-1","MaxTribute":"-1","MaxNursery":-1,"AutoMagmamancers":true,"WarpstationCap":false,"WarpstationWall3":-1,"WarpstationCoordBuy":false,"AutoRoboTrimp":270,"AutoGoldenUpgrades":"Void 60","AutoUpgradeHeirlooms":false,"NoNurseriesUntil":700,"ForceAbandon":true,"GymWall":-1,"DynamicGyms":true,"AutoAllocatePerks":2,"SpireBreedTimer":-1,"UseScryerStance":false,"ScryerUseWhenOverkill":false,"ScryerMinZone":530,"ScryerMaxZone":-1,"ScryerUseinMaps2":0,"ScryerUseinVoidMaps2":0,"ScryerUseinSpire2":0,"ScryerSkipBoss2":0,"ScryerSkipCorrupteds2":2,"SpamGeneral":true,"SpamUpgrades":false,"SpamEquipment":false,"SpamMaps":false,"SpamOther":false,"SpamBuilding":false,"SpamJobs":false,"TrimpleZ":0,"ScryerDieZ":230.6,"IgnoreCrits":2,"ForcePresZ":-1,"PreferMetal":false,"PreSpireNurseries":7000,"FinishC2":-1,"PowerSaving":0,"UseAutoGen":1,"AutoGenDC":1,"AutoGenC2":1,"SupplyWall":1,"IgnoreSpiresUntil":500,"MaxStacksForSpire":true,"AutoNatureTokens":true,"AutoPoison":"Convert to Wind","AutoWind":"Empowerment","AutoIce":"Convert to Wind","MaxMapBonusAfterZone":-1,"SpamGraphs":false,"EnhanceGrids":false,"EnableAFK":{"id":"EnableAFK","name":"Enable AFK","description":"Enables CPU and RAM saving AFK-mode","type":"action","value":1},"SpamMagmite":false,"SpamPerks":true,"ChangeLog":{"id":"ChangeLog","name":"Show Changelog","description":"Shows the changelog popup message that AT loads on startup in case you missed it.","type":"action","value":1},"AdvMapSpecialModifier":false,"BuyUpgradesNew":1,"BuyBuildingsNew":0,"BuyJobsNew":0,"BuyArmorNew":1,"BuyWeaponsNew":1,"PrestigeSkip1_2":0,"RunNewVoidsUntilNew":0,"DailyVoidMod":570,"Praidingzone":[495,546,555],"BWraid":false,"BWraidingmax":[640],"lootdumpz":260,"WindStackingMin":-1,"ScryUseinPoison":-1,"ScryUseinWind":-1,"ScryUseinIce":-1,"AutoHeirloomsNew":2,"BWraidingz":[597],"fastallocate":true,"trimpsnotdie":true,"gearamounttobuy":5,"dPraidingzone":[495,510,525,540,546,555,566,570],"Dailybwraid":false,"dBWraidingz":[495],"dBWraidingmax":[515],"dexitspirecell":-1,"WindStackingMax":190,"buyheliumy":-1,"buynojobsc":true,"fightforever":0,"use3daily":true,"windcutoff":-1,"spireshitbuy":true,"hardcorewind":-1,"PraidHarder":false,"dPraidHarder":false,"dMaxPraidZone":[-1],"dPraidFarmFragsZ":[-1],"dPraidBeforeFarmZ":[-1],"MaxPraidZone":[505,535,545,555,561],"PraidFarmFragsZ":[495],"PraidBeforeFarmZ":[-1],"fuellater":260,"dWindStackingMin":450,"dWindStackingMax":190,"dwindcutoff":160,"dhardcorewind":480,"ScryerSkipHealthy":2,"addpoison":true,"amalcoord":true,"dAutoGoldenUpgrades":"Void 60","cAutoGoldenUpgrades":"Battle","dhardcorewindmax":"-1","cfightforever":true,"hardcorewindmax":"-1","dfightforever":2,"fuelend":360,"defaultgen":0,"spendmagmite":2,"spendmagmitesetting":1,"ultwind":-1,"ultwindcut":0.05,"CapEquiparm":100,"amalcoordhd":0.0000025,"onlyminmaxworld":false,"amalcoordz":398,"dultwind":"-1","dultwindcut":"0.00025","dwindhealthy":"false","windhealthy":false,"darmormagic":3,"carmormagic":3,"fuckanti":"-1","dscryvoidmaps":true,"scryvoidmaps":true,"dusebstance":true,"usebstance":true,"AutoPortalDaily":2,"dCustomAutoPortal":575,"dHeHrDontPortalBefore":"999","dHeliumHrBuffer":"0","dHeliumHourChallenge":"Corrupted","hidebuildings":true,"fuckjobs":true}';
}

function saveSettings(){safeSetItems('autoTrimpSettings',serializeSettings())}
function getPageSetting(a){if(!1==autoTrimpSettings.hasOwnProperty(a))return!1;return'boolean'==autoTrimpSettings[a].type?autoTrimpSettings[a].enabled:'multiValue'==autoTrimpSettings[a].type?Array.from(autoTrimpSettings[a].value).map(b=>parseInt(b)):'value'==autoTrimpSettings[a].type||'valueNegative'==autoTrimpSettings[a].type?parseFloat(autoTrimpSettings[a].value):'multitoggle'==autoTrimpSettings[a].type?parseInt(autoTrimpSettings[a].value):'dropdown'==autoTrimpSettings[a].type?autoTrimpSettings[a].selected:void 0}
function setPageSetting(a,b){return!1!=autoTrimpSettings.hasOwnProperty(a)&&void('boolean'==autoTrimpSettings[a].type?(autoTrimpSettings[a].enabled=b,document.getElementById(a).setAttribute('class','noselect settingsBtn settingBtn'+autoTrimpSettings[a].enabled)):'value'==autoTrimpSettings[a].type||'valueNegative'==autoTrimpSettings[a].type?autoTrimpSettings[a].value=b:'multiValue'==autoTrimpSettings[a].type||'valueNegative'==autoTrimpSettings[a].type?autoTrimpSettings[a].value=b:'multitoggle'==autoTrimpSettings[a].type?(autoTrimpSettings[a].value=b,document.getElementById(a).setAttribute('class','noselect settingsBtn settingBtn'+autoTrimpSettings[a].value)):'dropdown'==autoTrimpSettings[a].type&&(autoTrimpSettings[a].selected=b))}
function debug(a,b,c){var d=getPageSetting('SpamGeneral'),e=getPageSetting('SpamUpgrades'),f=getPageSetting('SpamEquipment'),g=getPageSetting('SpamMaps'),h=getPageSetting('SpamOther'),i=getPageSetting('SpamBuilding'),j=getPageSetting('SpamJobs'),k=getPageSetting('SpamGraphs'),l=getPageSetting('SpamMagmite'),m=getPageSetting('SpamPerks'),n=getPageSetting('SpamProfiles'),o=!0;switch(b){case null:break;case'general':o=d;break;case'upgrades':o=e;break;case'equips':o=f;break;case'buildings':o=i;break;case'jobs':o=j;break;case'maps':o=g;break;case'other':o=h;break;case'graphs':o=k;break;case'magmite':o=l;break;case'perks':o=m;break;case'profiles':o=n;}o&&(enableDebug&&console.log(timeStamp()+' '+a),message2(a,'AutoTrimps',c,b))}
function timeStamp(){for(var a=new Date,b=[a.getHours(),a.getMinutes(),a.getSeconds()],c=1;3>c;c++)10>b[c]&&(b[c]="0"+b[c]);return b.join(":")}
function preBuy(){preBuyAmt=game.global.buyAmt,preBuyFiring=game.global.firing,preBuyTooltip=game.global.lockTooltip,preBuymaxSplit=game.global.maxSplit}
function postBuy(){game.global.buyAmt=preBuyAmt,game.global.firing=preBuyFiring,game.global.lockTooltip=preBuyTooltip,game.global.maxSplit=preBuymaxSplit}
function preBuy2(){return[game.global.buyAmt,game.global.firing,game.global.lockTooltip,game.global.maxSplit]}
function postBuy2(a){game.global.buyAmt=a[0],game.global.firing=a[1],game.global.lockTooltip=a[2],game.global.maxSplit=a[3]}
function setTitle(){aWholeNewWorld&&(document.title='('+game.global.world+') Trimps '+document.getElementById('versionNumber').innerHTML)}
var lastmessagecount = 1;
function message2(a,b,c,d){var e=document.getElementById("log"),f=e.scrollTop+10>e.scrollHeight-e.clientHeight,g=ATmessageLogTabVisible?"block":"none",h="";c&&"*"==c.charAt(0)?(c=c.replace("*",""),h="icomoon icon-"):h="glyphicon glyphicon-",game.options.menu.timestamps.enabled&&(a=(1==game.options.menu.timestamps.enabled?getCurrentTime():updatePortalTimer(!0))+" "+a),c&&(a="<span class=\""+h+c+"\"></span> "+a),a="<span class=\"glyphicon glyphicon-superscript\"></span> "+a,a="<span class=\"icomoon icon-text-color\"></span>"+a;var i="<span class='"+b+"Message message "+d+"' style='display: "+g+"'>"+a+"</span>",j=document.getElementsByClassName(b+"Message");if(1<j.length&&-1<j[j.length-1].innerHTML.indexOf(a)){var k=j[j.length-1].innerHTML;lastmessagecount++;var l=k.lastIndexOf(" x");-1!=l&&(j[j.length-1].innerHTML=k.slice(0,l)),j[j.length-1].innerHTML+=" x"+lastmessagecount}else lastmessagecount=1,e.innerHTML+=i;f&&(e.scrollTop=e.scrollHeight),trimMessages(b)}
var ATbutton=document.createElement('button');ATbutton.innerHTML='AutoTrimps',ATbutton.setAttribute('id','AutoTrimpsFilter'),ATbutton.setAttribute('type','button'),ATbutton.setAttribute('onclick','filterMessage2(\'AutoTrimps\')'),ATbutton.setAttribute('class','btn btn-success logFlt');var tab=document.createElement('DIV');tab.setAttribute('class','btn-group'),tab.setAttribute('role','group'),tab.appendChild(ATbutton),document.getElementById('logBtnGroup').appendChild(tab);
function filterMessage2(a){var b=document.getElementById("log");displayed=!ATmessageLogTabVisible,ATmessageLogTabVisible=displayed;var c=document.getElementsByClassName(a+"Message"),d=displayed?a:a+" off",e=document.getElementById(a+"Filter");e.innerHTML=d,e.className="",e.className=getTabClass(displayed),displayed=displayed?"block":"none";for(var f=0;f<c.length;f++)c[f].style.display=displayed;b.scrollTop=b.scrollHeight}
function formatMinutesForDescriptions(a){var b,c=Math.floor(60*a%60),d=Math.floor(a%60),e=Math.floor(a/60);if(0==e)b=d+" minutes "+c+" seconds";else if(0<d)10>d&&(d="0"+d),10>c&&(c="0"+c),b=e+":"+d+":"+c;else{var f=1<e?"s":"",g=1<d?"s":"",h=1<c?"s":"";b=e+" hour"+f+" "+d+" minute"+g+" "+c+" second"+h}return b}
window.onerror=function(b,c,d,e,f){var g=['Message: '+b,'URL: '+c,'Line: '+d,'Column: '+e,'Error object: '+JSON.stringify(f)].join(' - ');0!=d&&console.log('AT logged error: '+g)};
function throwErrorfromModule(){throw new Error("We have successfully read the thrown error message out of a module")}
