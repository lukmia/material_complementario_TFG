(function(_ds){var window=this;var Yra=async function(a,b){var c=a.o,d,e=b.id!==((d=a.oa)==null?void 0:d.id);e&&(a.className=b.id,a.eventLabel=`devsite-callout-${b.id}`,a.o=new _ds.aQ(b.origin,a.eventLabel));a.oa=b;c&&e&&await _ds.$P(c)},Zra=async function(a){a.eventHandler.listen(document.body,"devsite-before-page-change",()=>{a.hide()})},$ra=async function(a,b){var c;((c=a.callout)==null?0:c.Pf)&&a.callout.Pf(b);await a.hide();a.Ca({category:"Site-Wide Custom Events",action:"callout-dismiss",label:a.eventLabel})},Z_=async function(a,
b){var c;((c=a.callout)==null?0:c.Pe)&&a.callout.Pe(b);var d;((d=a.callout)==null?0:d.Hj)||await a.hide();a.Ca({category:"Site-Wide Custom Events",action:"callout-action",label:a.eventLabel})},asa=function(a){var b,c;if(((b=a.callout)==null?0:b.Se)&&`${(c=a.callout)==null?void 0:c.Se}`){let d,e;return(0,_ds.O)`<div class="devsite-callout-branding">
          <img
            class="devsite-callout-branding-image"
            src="${(d=a.callout)==null?void 0:d.Se}"
            alt="${((e=a.callout)==null?void 0:e.Vg)||""}" />
        </div>
        <hr />`}return(0,_ds.O)``},bsa=function(a){var b,c;if(((b=a.callout)==null?0:b.Qq)&&`${(c=a.callout)==null?void 0:c.Qq}`){let d,e;return(0,_ds.O)`<div class="devsite-callout-hero">
        <img
          class="devsite-callout-hero-image"
          src="${(d=a.callout)==null?void 0:d.Qq}"
          alt="${((e=a.callout)==null?void 0:e.FB)||""}" />
      </div>`}return(0,_ds.O)``},csa=function(a){var b;if((b=a.callout)==null?0:b.tv)return(0,_ds.O)``;var c;return(0,_ds.O)` <div class="devsite-callout-header">
        <h2>${((c=a.callout)==null?void 0:c.title)||""}</h2>
      </div>`},dsa=function(a){var b;if((b=a.callout)==null?0:b.loading)return(0,_ds.O)`<div class="devsite-callout-body"
        ><devsite-spinner size="24"></devsite-spinner
      ></div>`;var c,d,e;if(((c=a.callout)==null?0:c.body)&&`${(d=a.callout)==null?void 0:d.body}`){{let f;if(((f=a.callout)==null?void 0:f.body)instanceof _ds.ug){let g;a=(0,_ds.O)`${(0,_ds.rP)((g=a.callout)==null?void 0:g.body)}`}else a=(0,_ds.O)`${(e=a.callout)==null?void 0:e.body}`}e=(0,_ds.O)`<div class="devsite-callout-body">
        ${a}
      </div>`}else e=(0,_ds.O)``;return e},esa=function(a){var b;if((b=a.callout)==null||!b.Zc)return(0,_ds.O)``;var c;b=(0,_ds.wz)({button:!0,"button-primary":!0,"devsite-callout-action":!0,"button-disabled":((c=a.callout)==null?void 0:c.uu)||!1});var d;c=(d=a.callout)==null?void 0:d.fz;var e;if((e=a.callout)==null?0:e.Rk){let g,h;return(0,_ds.O)`<a
        @click=${k=>{Z_(a,k)}}
        href="${((g=a.callout)==null?void 0:g.Rk)||""}"
        class="${b}"
        aria-label=${c!=null?c:_ds.eM}
        data-title=${c!=null?c:_ds.eM}>
        ${((h=a.callout)==null?void 0:h.Zc)||""}
      </a>`}var f;return(0,_ds.O)`<button
        @click=${g=>{Z_(a,g)}}
        class="${b}"
        aria-label=${c!=null?c:_ds.eM}
        data-title=${c!=null?c:_ds.eM}>
        ${((f=a.callout)==null?void 0:f.Zc)||""}
      </button>`},$_=class extends _ds.NM{set callout(a){Yra(this,a)}get callout(){return this.oa}get open(){var a;return((a=this.ma.value)==null?void 0:a.open)||!1}constructor(){super(["devsite-spinner"]);this.eventHandler=new _ds.u;this.eventLabel="";this.oa=this.ea=this.o=null;this.ma=new _ds.nP}connectedCallback(){super.connectedCallback();Zra(this)}disconnectedCallback(){super.disconnectedCallback();var a;(a=this.o)==null||a.cancel()}Na(){return this}async ready(){await this.m}async show(){await this.ready();
if(!this.open){var a;await ((a=this.o)==null?void 0:a.schedule(()=>{document.activeElement instanceof HTMLElement&&(this.ea=document.activeElement);var b;(b=this.ma.value)==null||b.show();var c;(c=this.querySelector(".devsite-callout-action"))==null||c.focus();var d;b={message:"Se abri\u00f3 el di\u00e1logo "+(((d=this.callout)==null?void 0:d.title)||"")};document.body.dispatchEvent(new CustomEvent("devsite-a11y-announce",{detail:b}));this.Ca({category:"Site-Wide Custom Events",action:"callout-impression",
label:this.eventLabel,nonInteraction:!0})},()=>{var b;(b=this.ma.value)==null||b.close();var c;(c=this.querySelector(".devsite-callout-action"))==null||c.blur();this.ea&&this.ea.focus()}))}}async hide(){await this.ready();var a;await ((a=this.o)==null?void 0:_ds.$P(a))}render(){if(!this.callout)return(0,_ds.O)``;var a;return(0,_ds.O)`
      <dialog
        closedby="none"
        ${(0,_ds.pP)(this.ma)}
        aria-label="${((a=this.callout)==null?void 0:a.title)||""}"
        class="devsite-callout">
        ${asa(this)} ${bsa(this)}
        ${csa(this)} ${dsa(this)}
        <div class="devsite-callout-buttons">
          <button
            @click=${b=>{$ra(this,b)}}
            class="button button-dismiss devsite-callout-dismiss">
            ${"Descartar"}
          </button>
          ${esa(this)}
        </div>
      </dialog>
    `}};_ds.w([_ds.K({Aa:!1}),_ds.x("design:type",Object),_ds.x("design:paramtypes",[Object])],$_.prototype,"callout",null);try{customElements.define("devsite-callout",$_)}catch(a){console.warn("Unrecognized DevSite custom element - DevsiteCallout",a)};})(_ds_www);
