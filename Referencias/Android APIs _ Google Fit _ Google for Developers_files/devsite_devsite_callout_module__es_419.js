(function(_ds){var window=this;var JEa=async function(a,b){var c=a.o,d,e=b.id!==((d=a.qa)==null?void 0:d.id);e&&(a.className=b.id,a.eventLabel=`devsite-callout-${b.id}`,a.o=new _ds.dI(b.origin,a.eventLabel));a.qa=b;c&&e&&await _ds.cI(c)},KEa=async function(a){a.eventHandler.listen(document.body,"devsite-before-page-change",()=>{a.hide()})},LEa=async function(a,b){var c;((c=a.callout)==null?0:c.hj)&&a.callout.hj(b);await a.hide();a.Da({category:"Site-Wide Custom Events",action:"callout-dismiss",label:a.eventLabel})},eU=async function(a,
b){var c;((c=a.callout)==null?0:c.ph)&&a.callout.ph(b);var d;((d=a.callout)==null?0:d.Po)||await a.hide();a.Da({category:"Site-Wide Custom Events",action:"callout-action",label:a.eventLabel})},MEa=function(a){var b,c;if(((b=a.callout)==null?0:b.uh)&&`${(c=a.callout)==null?void 0:c.uh}`){let d,e;return(0,_ds.O)`<div class="devsite-callout-branding">
          <img
            class="devsite-callout-branding-image"
            src="${(d=a.callout)==null?void 0:d.uh}"
            alt="${((e=a.callout)==null?void 0:e.Fk)||""}" />
        </div>
        <hr />`}return(0,_ds.O)``},NEa=function(a){var b,c;if(((b=a.callout)==null?0:b.Hx)&&`${(c=a.callout)==null?void 0:c.Hx}`){let d,e;return(0,_ds.O)`<div class="devsite-callout-hero">
        <img
          class="devsite-callout-hero-image"
          src="${(d=a.callout)==null?void 0:d.Hx}"
          alt="${((e=a.callout)==null?void 0:e.gL)||""}" />
      </div>`}return(0,_ds.O)``},OEa=function(a){var b;if((b=a.callout)==null?0:b.DC)return(0,_ds.O)``;var c;return(0,_ds.O)` <div class="devsite-callout-header">
        <h2>${((c=a.callout)==null?void 0:c.title)||""}</h2>
      </div>`},PEa=function(a){var b;if((b=a.callout)==null?0:b.loading)return(0,_ds.O)`<div class="devsite-callout-body"
        ><devsite-spinner size="24"></devsite-spinner
      ></div>`;var c,d,e;if(((c=a.callout)==null?0:c.body)&&`${(d=a.callout)==null?void 0:d.body}`){{let f;if(((f=a.callout)==null?void 0:f.body)instanceof _ds.Mf){let g;a=(0,_ds.O)`${(0,_ds.oH)((g=a.callout)==null?void 0:g.body)}`}else a=(0,_ds.O)`${(e=a.callout)==null?void 0:e.body}`}e=(0,_ds.O)`<div class="devsite-callout-body">
        ${a}
      </div>`}else e=(0,_ds.O)``;return e},QEa=function(a){var b;if((b=a.callout)==null||!b.He)return(0,_ds.O)``;var c;b=(0,_ds.gu)({button:!0,"button-primary":!0,"devsite-callout-action":!0,"button-disabled":((c=a.callout)==null?void 0:c.wB)||!1});var d;c=(d=a.callout)==null?void 0:d.OH;var e;if((e=a.callout)==null?0:e.uq){let g,h;return(0,_ds.O)`<a
        @click=${k=>{eU(a,k)}}
        href="${((g=a.callout)==null?void 0:g.uq)||""}"
        class="${b}"
        aria-label=${c!=null?c:_ds.gv}
        data-title=${c!=null?c:_ds.gv}>
        ${((h=a.callout)==null?void 0:h.He)||""}
      </a>`}var f;return(0,_ds.O)`<button
        @click=${g=>{eU(a,g)}}
        class="${b}"
        aria-label=${c!=null?c:_ds.gv}
        data-title=${c!=null?c:_ds.gv}>
        ${((f=a.callout)==null?void 0:f.He)||""}
      </button>`},fU=class extends _ds.gw{set callout(a){JEa(this,a)}get callout(){return this.qa}get open(){var a;return((a=this.oa.value)==null?void 0:a.open)||!1}constructor(){super(["devsite-spinner"]);this.eventHandler=new _ds.v;this.eventLabel="";this.qa=this.ea=this.o=null;this.oa=new _ds.kH}connectedCallback(){super.connectedCallback();KEa(this)}disconnectedCallback(){super.disconnectedCallback();var a;(a=this.o)==null||a.cancel()}Ta(){return this}async ready(){await this.m}async show(){await this.ready();
if(!this.open){var a;await ((a=this.o)==null?void 0:a.schedule(()=>{document.activeElement instanceof HTMLElement&&(this.ea=document.activeElement);var b;(b=this.oa.value)==null||b.show();var c;(c=this.querySelector(".devsite-callout-action"))==null||c.focus();var d;b={message:"Se abri\u00f3 el di\u00e1logo "+(((d=this.callout)==null?void 0:d.title)||"")};document.body.dispatchEvent(new CustomEvent("devsite-a11y-announce",{detail:b}));this.Da({category:"Site-Wide Custom Events",action:"callout-impression",
label:this.eventLabel,nonInteraction:!0})},()=>{var b;(b=this.oa.value)==null||b.close();var c;(c=this.querySelector(".devsite-callout-action"))==null||c.blur();this.ea&&this.ea.focus()}))}}async hide(){await this.ready();var a;await ((a=this.o)==null?void 0:_ds.cI(a))}render(){if(!this.callout)return(0,_ds.O)``;var a;return(0,_ds.O)`
      <dialog
        closedby="none"
        ${(0,_ds.mH)(this.oa)}
        aria-label="${((a=this.callout)==null?void 0:a.title)||""}"
        class="devsite-callout">
        ${MEa(this)} ${NEa(this)}
        ${OEa(this)} ${PEa(this)}
        <div class="devsite-callout-buttons">
          <button
            @click=${b=>{LEa(this,b)}}
            class="button button-dismiss devsite-callout-dismiss">
            ${"Descartar"}
          </button>
          ${QEa(this)}
        </div>
      </dialog>
    `}};_ds.z([_ds.I({Ha:!1}),_ds.A("design:type",Object),_ds.A("design:paramtypes",[Object])],fU.prototype,"callout",null);try{customElements.define("devsite-callout",fU)}catch(a){console.warn("Unrecognized DevSite custom element - DevsiteCallout",a)};})(_ds_www);
