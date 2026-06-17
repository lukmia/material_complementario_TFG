(function(_ds){var window=this;var k9=class extends _ds.NM{constructor(){super(["devsite-dialog","devsite-dropdown-list","devsite-view-release-notes-dialog"]);this.Gs=!1;this.releaseNotes=new Map;this.dialog=null;this.path="";this.label="Notas de versi\u00f3n";this.disableAutoOpen=!1}Na(){return this}async connectedCallback(){super.connectedCallback();try{this.path||(this.path=await _ds.Uu(_ds.D().href)),this.releaseNotes=await _ds.Hz(this.path)}catch(a){}this.releaseNotes.size===0?this.remove():(this.Gs=!0,this.disableAutoOpen||
location.hash!=="#release__notes"||this.o())}disconnectedCallback(){super.disconnectedCallback();var a;(a=this.dialog)==null||a.remove();this.dialog=null}o(a){a&&(a.preventDefault(),a.stopPropagation());var b;(b=this.dialog)==null||b.remove();this.dialog=document.createElement("devsite-dialog");this.dialog.classList.add("devsite-view-release-notes-dialog-container");_ds.mM((0,_ds.O)`
      <devsite-view-release-notes-dialog
        .releaseNotes=${this.releaseNotes}>
      </devsite-view-release-notes-dialog>
    `,this.dialog);document.body.appendChild(this.dialog);this.dialog.open=!0;this.Ca({category:"Site-Wide Custom Events",action:"release notes: view note",label:`${this.path}`})}render(){if(!this.Gs)return delete this.dataset.shown,(0,_ds.O)``;this.dataset.shown="";return(0,_ds.O)`
      <button class="view-notes-button" @click="${this.o}">
        ${this.label}
      </button>
    `}};_ds.w([_ds.L(),_ds.x("design:type",Object)],k9.prototype,"Gs",void 0);_ds.w([_ds.K({type:String}),_ds.x("design:type",Object)],k9.prototype,"path",void 0);_ds.w([_ds.K({type:String}),_ds.x("design:type",Object)],k9.prototype,"label",void 0);_ds.w([_ds.K({type:Boolean,Aa:"disable-auto-open"}),_ds.x("design:type",Object)],k9.prototype,"disableAutoOpen",void 0);try{customElements.define("devsite-view-release-notes",k9)}catch(a){console.warn("devsite.app.customElement.DevsiteViewReleaseNotes",a)};})(_ds_www);
