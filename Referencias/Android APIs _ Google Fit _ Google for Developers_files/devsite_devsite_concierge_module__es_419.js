(function(_ds){var window=this;var UU=function(){return"devsite-concierge"},FFa=function(a){a.eventHandler.listen(a,"devsite-concierge-close-panel",()=>{document.body.getAttribute("concierge")==="modal"&&(a.dispatchEvent(new CustomEvent("devsite-sitemask-hide",{bubbles:!0})),a.Og=!1);_ds.fw(a,{type:"sidePanel",name:"closed",metadata:{id:a.Wd,name:a.tagName.toLowerCase(),action:"close button click"}});VU(a,!0)});a.eventHandler.listen(a,"devsite-concierge-open-panel",c=>{c=c.getBrowserEvent().detail.Sy;a.o(c,!0)});a.eventHandler.listen(document.body,
"devsite-sitemask-hidden",()=>{document.body.getAttribute("concierge")==="modal"&&(a.Og=!1,_ds.ew(a,"concierge","open",document.body))});a.eventHandler.listen(a,"devsite-concierge-fullscreen-panel",()=>{a.Og=!0;_ds.ew(a,"concierge","modal",document.body);a.dispatchEvent(new CustomEvent("devsite-sitemask-show",{bubbles:!0}));_ds.fw(a,{type:"sidePanel",name:"fullscreen",metadata:{id:a.Wd,name:a.tagName.toLowerCase()}})});a.eventHandler.listen(a,"devsite-concierge-dock-panel",c=>{c=c.getBrowserEvent();
a.Og=!1;_ds.ew(a,"concierge","open",document.body);c&&c.detail&&c.detail.hideSitemask&&a.dispatchEvent(new CustomEvent("devsite-sitemask-hide",{bubbles:!0}))});a.eventHandler.listen(a,"devsite-concierge-set-notification",c=>{c=c.getBrowserEvent();EFa(a,c)});a.eventHandler.listen(a,"devsite-concierge-clear-notification",c=>{switch(c.getBrowserEvent().detail.tagName){case "devsite-concierge-ai-panel":a.xk=!1;a.Vm="";break;case "devsite-concierge-info-panel":a.yl=!1;a.Co="";break;case "devsite-concierge-recommendations-panel":a.Tl=
!1;a.np="";break;case "devsite-concierge-api-explorer-panel":a.yk=!1;a.Ym="";break;case "devsite-concierge-my-activity-panel":a.Ml=!1,a.Zo=""}});a.eventHandler.listen(document.body,"devsite-before-page-change",()=>{a.largeViewport||VU(a)});var b=window.matchMedia("(min-width: 1400px)");a.largeViewport=b.matches;a.eventHandler.listen(b,"change",c=>{c=c.getBrowserEvent().matches;a.largeViewport=c});a.eventHandler.listen(document.body,"devsite-page-changed",()=>{WU(a)});a.eventHandler.listen(document.body,
"devsite-viewport-change",c=>{c=c.getBrowserEvent().detail.viewport==="viewport--desktop";if(a.Rk)a.Ox=c,_ds.Ev(a);else if(!c){c=document.body.getAttribute("concierge")==="modal";let d=document.body.getAttribute("concierge")==="open";c&&(a.dispatchEvent(new CustomEvent("devsite-sitemask-hide",{bubbles:!0})),a.Og=!1);d&&(a.panelOpen=!1);if(c||d)VU(a,!0),_ds.Ev(a)}});if(a.Rk){let c;(c=window.document.getElementsByClassName("devsite-devguide-mobile-button").item(0))==null||c.addEventListener("click",
()=>{a.o("devsite-concierge-info-panel",!1)})}},WU=function(a){var b=_ds.F(),c=document.body.getAttribute("type"),d=document.body.hasAttribute("display-toc");if(c==="lcat"||c==="codelab")d=!1;else if(a.tenantId===1){if(b.pathname.match("^/learn[/]?")||b.pathname.match("^/solutions[/]?"))d=!0;c==="profile"&&(d=!0)}d?_ds.ew(a,"concierge",a.Og?"modal":a.panelOpen?"open":"closed",document.body):_ds.ew(a,"concierge","hide",document.body);return d},VU=async function(a,b=!1){b&&await (await _ds.x()).getStorage().set("devguide_state",
"","CLOSED");await XU(a,!1)},EFa=async function(a,b){var c=b.detail.tagName;b=b.detail.message;if(a.Wd!==c)switch(c){case "devsite-concierge-ai-panel":a.xk&&(a.xk=!1,a.Vm="",_ds.Ev(a),await a.m);a.xk=!0;b&&(a.Vm=b);break;case "devsite-concierge-info-panel":a.yl&&(a.yl=!1,a.Co="",_ds.Ev(a),await a.m);a.yl=!0;b&&(a.Co=b);break;case "devsite-concierge-recommendations-panel":a.Tl&&(a.Tl=!1,a.np="",_ds.Ev(a),await a.m);a.Tl=!0;b&&(a.np=b);break;case "devsite-concierge-api-explorer-panel":a.yk&&(a.yk=!1,
a.Ym="",_ds.Ev(a),await a.m);a.yk=!0;b&&(a.Ym=b);break;case "devsite-concierge-my-activity-panel":a.Ml&&(a.Ml=!1,a.Zo="",_ds.Ev(a),await a.m),a.Ml=!0,b&&(a.Zo=b)}},YU=function(a,b,c=0){if(b!==document.body&&b.parentElement){var {x:d,y:e,height:f}=b.getBoundingClientRect();return e+f>c&&d>0&&d<window.innerWidth?b:YU(a,b.parentElement,c)}},GFa=async function(a,b){await _ds.x();var c,d,e,f=((c=document)==null?void 0:(d=c.documentElement)==null?void 0:(e=d.getAttribute("dir"))==null?void 0:e.toLowerCase())===
"rtl";(c=document.querySelector("devsite-header"))&&await customElements.whenDefined("devsite-header");c=(c==null?void 0:c.qa())||0;if(a=YU(a,b,c)){var {x:g,y:h,width:k,height:l}=a.getBoundingClientRect();b=f?g+k:g;c=Math.max(h,c);d=f?Math.max(0,g):Math.min(g+k,window.innerWidth);e=Math.min(l-Math.abs(h),window.innerHeight);var m=Math.round(Math.max(5,(d-b)*.01));m=f?-m:m;var n=Math.round(Math.max(5,(e-c)*.01));g=b;h=c;for(var p=document.elementFromPoint(g,h),q=!1;p===a||!a.contains(p)||!q;){p&&(q=
p.getBoundingClientRect().top>=c);g+=m;f?g<d&&(g=b,h+=n):g>d&&(g=b,h+=n);if(h>e)return;p=document.elementFromPoint(g,h)}return p}},XU=async function(a,b,c=""){a.Wd=c;if(a.panelOpen!==b)if(c=document.querySelector(".devsite-article-body")){var d=await GFa(a,c);d?(await _ds.hh(),c=d.getBoundingClientRect().top||0,a.panelOpen=b,document.body.dispatchEvent(new CustomEvent("devsite-sticky-resize",{bubbles:!0})),await _ds.hm(),a=d.getBoundingClientRect().top||0,a-c!==0&&window.scrollBy({left:window.scrollX,
top:a-c}),_ds.ih()):a.panelOpen=b}else a.panelOpen=b},ZU=function(a,b){a.panelOpen||_ds.fw(a,{type:"sidePanel",name:"opened",metadata:{id:b,name:a.tagName.toLowerCase(),action:"menu item click"}});a.Wd!==b?(a.Da({category:"Developer Concierge",action:a.panelOpen?"Switch Tab":"Open Panel",label:b}),_ds.fw(a,{type:"sidePanel",name:"tabClick",metadata:{id:b,name:a.tagName.toLowerCase()}}),a.o(b,!0)):a.Og||(_ds.fw(a,{type:"sidePanel",name:"closed",metadata:{id:b,name:a.tagName.toLowerCase(),action:"menu item click"}}),
VU(a,!0))},HFa=function(a,b,c,d){return c?d?(0,_ds.O)`<div class="devsite-concierge-notification-dot"></div>
      <div
        class="devsite-concierge-notification"
        @click="${()=>{ZU(a,b)}}"
        >${d}</div
      >`:(0,_ds.O)`<div class="devsite-concierge-notification-dot"></div>`:(0,_ds.O)``},$U=function(a,b,c=!1){if(!c)return(0,_ds.O)``;a.oa.push(b);switch(b){case "devsite-concierge-ai-panel":return(0,_ds.O)` <devsite-concierge-ai-panel
          ?active="${a.Wd===b}">
        </devsite-concierge-ai-panel>`;case "devsite-concierge-info-panel":return(0,_ds.O)` <devsite-concierge-info-panel
          ?active="${a.Wd===b}">
        </devsite-concierge-info-panel>`;case "devsite-concierge-recommendations-panel":return(0,_ds.O)` <devsite-concierge-recommendations-panel
          ?active="${a.Wd===b}">
        </devsite-concierge-recommendations-panel>`;case "devsite-concierge-api-explorer-panel":return(0,_ds.O)` <devsite-concierge-api-explorer-panel
          ?active="${a.Wd===b}">
        </devsite-concierge-api-explorer-panel>`;case "devsite-concierge-my-activity-panel":return(0,_ds.O)` <devsite-concierge-my-activity-panel
          ?active="${a.Wd===b}">
        </devsite-concierge-my-activity-panel>`;default:return(0,_ds.O)` <div ?active="${a.Wd===b}">
          ${b} element missing
        </div>`}},aV=function(a,b,c,d,e,f=!1,g=!1,h=""){return f?(0,_ds.O)`
      <button class="${(0,_ds.gu)({"devsite-concierge-menu-item--selected":a.Wd===b,"devsite-concierge-menu-item":!0,[`${b}--menu-item`]:!0})}"
          @click="${()=>{ZU(a,b)}}"
          data-title="${d}">
        <div class="devsite-concierge-menu-icon" aria-hidden="true">
          ${e}
        </div>
        <div class="devsite-concierge-menu-title">
          ${c}
        </div>
        ${HFa(a,b,g,h)}
      </button>`:(0,_ds.O)``},IFa=function(a){return(0,_ds.O)` <div
      aria-label="${"Men\u00fa del panel lateral"}"
      aria-orientation="${a.Rk&&!a.Og&&a.panelOpen&&a.Ox?"horizontal":"vertical"}"
      class="devsite-concierge-menu"
      role="toolbar"
      @keydown="${b=>{if(b.key==="ArrowUp"||b.key==="ArrowDown"||b.key==="ArrowLeft"||b.key==="ArrowRight"){b.preventDefault();let c=0,d=document.activeElement,e=a.querySelectorAll(".devsite-concierge-menu-item");d&&(c=[...e].indexOf(d));c=b.key==="ArrowUp"||b.key==="ArrowLeft"?c===0?e.length-1:c-1:c===e.length-1?0:c+1;e[c].focus()}}}">
      ${aV(a,"devsite-concierge-info-panel","Informaci\u00f3n","Informaci\u00f3n de la p\u00e1gina",_ds.pxa,a.Ot,a.yl,a.Co)}
      ${a.Mx?(0,_ds.O)``:aV(a,"devsite-concierge-ai-panel","Chat","Solicita informaci\u00f3n sobre esta p\u00e1gina",_ds.Nwa,a.Kt,a.xk,a.Vm)}
      ${aV(a,"devsite-concierge-recommendations-panel","Contenido relacionado","P\u00e1ginas relacionadas",_ds.vxa,a.Tt,a.Tl,a.np)}
      ${aV(a,"devsite-concierge-api-explorer-panel","API","Explorador de APIs",_ds.axa,a.Mt,a.yk,a.Ym)}
      ${aV(a,"devsite-concierge-my-activity-panel","Reciente","Actividad reciente",(0,_ds.O)`<svg
    width="20"
    height="18"
    viewBox="0 0 20 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17 12C15.7 12 14.6 12.84 14.18 14H9C7.9 14 7 13.1 7 12C7 10.9 7.9 10 9 10H11C13.21 10 15 8.21 15 6C15 3.79 13.21 2 11 2H5.82C5.4 0.84 4.3 0 3 0C1.34 0 0 1.34 0 3C0 4.66 1.34 6 3 6C4.3 6 5.4 5.16 5.82 4H11C12.1 4 13 4.9 13 6C13 7.1 12.1 8 11 8H9C6.79 8 5 9.79 5 12C5 14.21 6.79 16 9 16H14.18C14.59 17.16 15.69 18 17 18C18.66 18 20 16.66 20 15C20 13.34 18.66 12 17 12ZM3 4C2.45 4 2 3.55 2 3C2 2.45 2.45 2 3 2C3.55 2 4 2.45 4 3C4 3.55 3.55 4 3 4Z"
      fill="#1967D2" />
  </svg>`,a.Pt,a.Ml,a.Zo)}
    </div>`},bV=class extends _ds.gw{Ta(){return this}constructor(){super(["devsite-tooltip"]);this.Og=this.Tt=this.Pt=this.Ot=this.Mt=this.Kt=!1;this.Ox=_ds.Dh()==="viewport--desktop";this.Tl=this.Ml=this.yl=this.yk=this.xk=this.Mx=this.Rk=!1;this.Wd=this.np=this.Zo=this.Co=this.Ym=this.Vm="";this.panelOpen=this.largeViewport=!1;this.eventHandler=new _ds.v;this.oa=[];this.ea="UNDEFINED";this.tenantId=0;_ds.dw(this,(0,_ds.dg)`concierge`)}async connectedCallback(){var a=await _ds.x();this.tenantId=
a.getTenantId()||0;this.Rk=await a.hasMendelFlagAccess("Concierge","enable_devguide_mobile_view");this.Mx=await a.hasMendelFlagAccess("MiscFeatureFlags","enable_new_chat_ui");super.connectedCallback();FFa(this);if(WU(this)&&(a=_ds.F(),a.searchParams.has("devguide")))switch(a.searchParams.get("devguide")){case "ai":await this.o("devsite-concierge-ai-panel",!1);break;case "recommendations":await this.o("devsite-concierge-recommendations-panel",!1);break;case "api_explorer":await this.o("devsite-concierge-api-explorer-panel",
!1);break;case "my_activity":await this.o("devsite-concierge-my-activity-panel",!1);break;default:await this.o("devsite-concierge-info-panel",!1)}}disconnectedCallback(){super.disconnectedCallback();this.eventHandler.removeAll();document.body.removeAttribute("concierge")}async qa(a,b){await this.o("devsite-concierge-ai-panel");var c=this.querySelector("devsite-concierge-ai-panel"),d=_ds.F();d.search="";c&&await _ds.qO(c,{code:a,language:b,url:d.href})}async o(a,b=!1){b&&await (await _ds.x()).getStorage().set("devguide_state",
"","OPEN");await XU(this,!0,a)}static get observedAttributes(){return["data-ai-panel","data-api-explorer-panel","data-info-panel","data-my-activity-panel","data-recommendations-panel"]}attributeChangedCallback(a){switch(a){case "data-ai-panel":this.Kt=this.hasAttribute("data-ai-panel");_ds.cw("devsite-concierge-ai-panel");break;case "data-info-panel":this.Ot=this.hasAttribute("data-info-panel");_ds.cw("devsite-concierge-info-panel");break;case "data-recommendations-panel":this.Tt=this.hasAttribute("data-recommendations-panel");
_ds.cw("devsite-concierge-recommendations-panel");break;case "data-api-explorer-panel":this.Mt=this.hasAttribute("data-api-explorer-panel");_ds.cw("devsite-concierge-api-explorer-panel");break;case "data-my-activity-panel":this.Pt=this.hasAttribute("data-my-activity-panel"),_ds.cw("devsite-concierge-my-activity-panel")}}async j(a){super.j(a);this.oa.length>0&&_ds.fw(this,{type:"sidePanel",name:"impression",metadata:{id:this.oa[0],name:this.tagName.toLowerCase()}});a.has("largeViewport")&&this.Wd===
""&&this.largeViewport&&(this.ea=await (await _ds.x()).getStorage().get("devguide_state","")||"UNDEFINED",this.ea!=="CLOSED"&&(await this.o(this.oa[0]),this.Da({category:"Developer Concierge",action:"Opened by default"})))}updated(a){super.updated(a);a.has("panelOpen")&&WU(this)}ra(){return WU(this)}render(){return(0,_ds.O)` <div class="${(0,_ds.gu)({"devsite-concierge-panel-open":this.panelOpen,"devsite-concierge-container ":!0,"mobile-view-not-enabled":!this.Rk})}">
      ${IFa(this)} ${(0,_ds.O)`<div class="devsite-concierge-panel">
      ${$U(this,"devsite-concierge-info-panel",this.Ot)}
      ${$U(this,"devsite-concierge-ai-panel",this.Kt)}
      ${$U(this,"devsite-concierge-recommendations-panel",this.Tt)}
      ${$U(this,"devsite-concierge-api-explorer-panel",this.Mt)}
      ${$U(this,"devsite-concierge-my-activity-panel",this.Pt)}
    </div>`}
    </div>`}};bV.prototype.attributeChangedCallback=bV.prototype.attributeChangedCallback;bV.getTagName=UU;_ds.z([_ds.K(),_ds.A("design:type",Object)],bV.prototype,"Kt",void 0);_ds.z([_ds.K(),_ds.A("design:type",Object)],bV.prototype,"Mt",void 0);_ds.z([_ds.K(),_ds.A("design:type",Object)],bV.prototype,"Ot",void 0);_ds.z([_ds.K(),_ds.A("design:type",Object)],bV.prototype,"Pt",void 0);_ds.z([_ds.K(),_ds.A("design:type",Object)],bV.prototype,"Tt",void 0);
_ds.z([_ds.K(),_ds.A("design:type",Object)],bV.prototype,"Og",void 0);_ds.z([_ds.K(),_ds.A("design:type",Object)],bV.prototype,"Ox",void 0);_ds.z([_ds.K(),_ds.A("design:type",Object)],bV.prototype,"Rk",void 0);_ds.z([_ds.K(),_ds.A("design:type",Object)],bV.prototype,"Mx",void 0);_ds.z([_ds.K(),_ds.A("design:type",Object)],bV.prototype,"xk",void 0);_ds.z([_ds.K(),_ds.A("design:type",Object)],bV.prototype,"yk",void 0);_ds.z([_ds.K(),_ds.A("design:type",Object)],bV.prototype,"yl",void 0);
_ds.z([_ds.K(),_ds.A("design:type",Object)],bV.prototype,"Ml",void 0);_ds.z([_ds.K(),_ds.A("design:type",Object)],bV.prototype,"Tl",void 0);_ds.z([_ds.K(),_ds.A("design:type",Object)],bV.prototype,"Vm",void 0);_ds.z([_ds.K(),_ds.A("design:type",Object)],bV.prototype,"Ym",void 0);_ds.z([_ds.K(),_ds.A("design:type",Object)],bV.prototype,"Co",void 0);_ds.z([_ds.K(),_ds.A("design:type",Object)],bV.prototype,"Zo",void 0);_ds.z([_ds.K(),_ds.A("design:type",Object)],bV.prototype,"np",void 0);
_ds.z([_ds.K(),_ds.A("design:type",String)],bV.prototype,"Wd",void 0);_ds.z([_ds.I({type:Boolean}),_ds.A("design:type",Object)],bV.prototype,"largeViewport",void 0);_ds.z([_ds.I({type:Boolean}),_ds.A("design:type",Object)],bV.prototype,"panelOpen",void 0);try{customElements.define(UU(),bV)}catch(a){console.warn("Unrecognized DevSite custom element - DevsiteConcierge",a)};})(_ds_www);
