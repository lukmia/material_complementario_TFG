(function(_ds){var window=this;var BUa=function(a){a.eventHandler.listen(a,"DropdownItemClicked",b=>{AUa(a,b)})},AUa=async function(a,b){var c=b.getBrowserEvent().detail.id;b=a.querySelector(".devsite-dialog-contents");var d=a.querySelector(`#date-section-${c}`),e,f,g,h,k=((g=d==null?void 0:(e=d.getBoundingClientRect())==null?void 0:e.top)!=null?g:0)-((h=b==null?void 0:(f=b.getBoundingClientRect())==null?void 0:f.top)!=null?h:0);d&&b&&b.scrollBy({top:k,behavior:"smooth"});var l,m;a.xp=(m=(l=a.Tq.find(n=>n.id===c))==null?void 0:
l.title)!=null?m:"";a.o.cb(a.xp)},DUa=function(a){var b=new IntersectionObserver(c=>{c.forEach(d=>{CUa(a,d.isIntersecting,d)})},{root:a.querySelector(".devsite-dialog-contents")});a.querySelectorAll(".release-note-date-section .release-note").forEach(c=>{b.observe(c)})},CUa=function(a,b,c){var d,e={id:(d=c.target.getAttribute("id"))!=null?d:"",type:Number(c.target.getAttribute("type"))};if(b){let f;a.dm=[...((f=a.dm)!=null?f:[]),e]}else a.dm=[...a.dm.filter(f=>f.id!==e.id)]},EUa=function(a){switch(a){case 4:return{title:"Feature",
color:"green"};case 8:return{title:"Announcement",color:"yellow"};case 2:return{title:"Change",color:"yellow"};case 9:return{title:"Libraries",color:"blue"};case 3:return{title:"Fixed",color:"blue"};case 1:return{title:"Breaking",color:"red"};case 5:return{title:"Deprecated",color:"red"};case 6:return{title:"Issue",color:"red"};case 7:return{title:"Security",color:"orange"};default:return{title:"Unspecified",color:"grey"}}},FUa=function(a,b){b=EUa(b);return(0,_ds.O)` <span
      class="release-note-type-chip
          ${a} ${b.color}">
      ${b.title}
    </span>`},GUa=function(a,b){var c=b.replace(/,?\s/g,"").toLowerCase(),d;return(0,_ds.O)`
      <div class="release-note-date-section" id="date-section-${c}">
        <h3 class="release-note-date-header">${b}</h3>
        ${[...((d=a.releaseNotes.get(b))!=null?d:[])].map((e,f)=>{f=`${c}-${f}`;var g;(g=_ds.B(e,_ds.zna,4))?(g=_ds.$i(g,2),g=g===null||g===void 0?null:_ds.Nf(g)):g=null;return(0,_ds.O)` <div
        class="release-note"
        id="${f}"
        type="${_ds.D(e,2)}">
        ${FUa("large",_ds.D(e,2))}
        <div class="release-note-content">
          ${g?(0,_ds.O)`${(0,_ds.oH)(g)}`:(0,_ds.O)`<p>${_ds.C(e,1)}</p>`}
        </div>
      </div>`})}
      </div>
    `},d3=class extends _ds.gw{constructor(){super(["devsite-dialog","devsite-dropdown-list"]);this.eventHandler=new _ds.v;this.releaseNotes=new Map;this.hideFooter=!1;this.xp="";this.Tq=[];this.dm=[];this.o=new _ds.xh(async a=>{this.Da({category:"Site-Wide Custom Events",action:"release notes: view old note",label:`${await _ds.rs(_ds.F().href)} : ${a}`})},100)}Ta(){return this}async connectedCallback(){super.connectedCallback();this.xp=[...this.releaseNotes.keys()][0];this.Tq=[...this.releaseNotes.keys()].map(a=>
({id:a.replace(/,?\s/g,"").toLowerCase(),title:a}));BUa(this)}disconnectedCallback(){super.disconnectedCallback()}j(a){super.j(a);DUa(this)}render(){return(0,_ds.O)`
      <div class="devsite-dialog-header">
        <div>
          <h3 class="no-link title">
            ${"Notas de versi\u00f3n"}
          </h3>
          <div class="chip-wrapper">
            ${[...(new Set(this.dm.map(a=>a.type)))].map(a=>FUa("small",a))}
          </div>
        </div>
        <devsite-dropdown-list
            .listItems=${this.Tq}>
          <p slot="toggle" class="selected-date-toggle">${this.xp}</p>
        </devsite-dropdown-list>
      </div>
      <div class="devsite-dialog-contents">
        ${[...this.releaseNotes.keys()].map(a=>GUa(this,a))}
      </div>
      ${_ds.N(this.hideFooter,()=>"",()=>(0,_ds.O)`
              <div class="devsite-dialog-footer devsite-dialog-buttons">
                <button class="button devsite-dialog-close">
                  Close
                </button>
              </div>
            `)}
      `}};_ds.z([_ds.I({type:Map}),_ds.A("design:type",Object)],d3.prototype,"releaseNotes",void 0);_ds.z([_ds.I({type:Boolean}),_ds.A("design:type",Object)],d3.prototype,"hideFooter",void 0);_ds.z([_ds.K(),_ds.A("design:type",Object)],d3.prototype,"xp",void 0);_ds.z([_ds.K(),_ds.A("design:type",Array)],d3.prototype,"Tq",void 0);_ds.z([_ds.K(),_ds.A("design:type",Array)],d3.prototype,"dm",void 0);try{customElements.define("devsite-view-release-notes-dialog",d3)}catch(a){console.warn("devsite.app.customElement.DevsiteViewReleaseNotesDialog",a)};})(_ds_www);
