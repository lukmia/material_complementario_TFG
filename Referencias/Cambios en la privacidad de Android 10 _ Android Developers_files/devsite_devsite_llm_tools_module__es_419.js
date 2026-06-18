(function(_ds){var window=this;var Ywa=async function(a){a.eventHandler.listen(a,"DropdownToggled",c=>{c=c.getBrowserEvent();var d;a.Ca({category:"devsiteLlmTools",action:((d=c.detail)==null?0:d.open)?"llm_tools_dropdown_open":"llm_tools_dropdown_close",label:"dropdown_toggle"})});a.eventHandler.listen(a,"DropdownItemClicked",c=>{c=c.getBrowserEvent();if(c=a.ea.get(c.detail.id))a.Ca({category:"devsiteLlmTools",action:c.jz,label:c.analyticsLabel}),c.action()});var b=Xwa();b&&(a.o=b,a.Ca({category:"devsiteLlmTools",action:"llm_tools_button_impression"}))},
Xwa=function(){var a=_ds.D();a.pathname=`${a.pathname}.md.txt`;return _ds.lg(a.href)},Zwa=async function(a){if(!a.o)return null;a.fm=!0;try{let b=await fetch(_ds.So(a.o.toString()).href);if(b)return await b.text()}catch(b){}finally{a.fm=!1}return null},$wa=async function(a){try{return a.ma||(a.ma=await Zwa(a)),a.ma}catch(b){}return null},F4=function(a,b){a.dispatchEvent(new CustomEvent("devsite-show-custom-snackbar-msg",{detail:{msg:b,showClose:!1},bubbles:!0}))},axa=async function(a){a.Ca({category:"devsiteLlmTools",
action:"llm_tools_copy_markdown_click",label:"main_button"});var b=await $wa(a);b?await _ds.mv(b):F4(a,"No se pudo copiar la p\u00e1gina")},G4=class extends _ds.NM{constructor(){super(...arguments);this.fm=!1;this.eventHandler=new _ds.u;this.ma=null;this.o=void 0;this.items=[{id:"open-markdown",title:"Ver como lenguaje de marcado",action:()=>{this.o?_ds.yg(window,this.o,"_blank"):F4(this,"No se pudo abrir la vista del lenguaje de marcado.")},jz:"llm_tools_open_markdown_click",analyticsLabel:"dropdown_item"}];
this.oa=this.items.map(a=>({id:a.id,title:a.title}));this.ea=new Map(this.items.map(a=>[a.id,a]))}Na(){return this}connectedCallback(){super.connectedCallback();Ywa(this)}disconnectedCallback(){super.disconnectedCallback();_ds.E(this.eventHandler)}render(){return(0,_ds.O)`
      <div
        class="devsite-llm-tools-container"
        role="group"
        aria-label="${"Herramientas de LLM"}">
        <div class="devsite-llm-tools-button-container">
          <button
            type="button"
            class="button button-white devsite-llm-tools-button"
            ?disabled="${this.fm}"
            @click=${()=>{axa(this)}}
            aria-label="${"Copiar p\u00e1gina como Markdown"}"
            data-title="${"Copiar p\u00e1gina como Markdown"}">
            <span class="material-icons icon-copy" aria-hidden="true"></span>
          </button>
        </div>
        <div class="devsite-llm-tools-dropdown-container">
          <devsite-dropdown-list
            .listItems="${this.oa}"
            open-dropdown-aria-label="${"M\u00e1s opciones de herramientas de LLM"}"
            close-dropdown-aria-label="${"Cerrar el men\u00fa de opciones de herramientas de LLM"}">
          </devsite-dropdown-list>
        </div>
      </div>
    `}};G4.prototype.disconnectedCallback=G4.prototype.disconnectedCallback;_ds.w([_ds.L(),_ds.x("design:type",Object)],G4.prototype,"fm",void 0);try{customElements.define("devsite-llm-tools",G4)}catch(a){console.warn("Unrecognized DevSite custom element - DevsiteLlmTools",a)};})(_ds_www);
