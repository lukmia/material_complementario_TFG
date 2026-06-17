(function(_ds){var window=this;var MJa=async function(a){a.eventHandler.listen(a,"DropdownToggled",c=>{c=c.getBrowserEvent();var d;a.Da({category:"devsiteLlmTools",action:((d=c.detail)==null?0:d.open)?"llm_tools_dropdown_open":"llm_tools_dropdown_close",label:"dropdown_toggle"})});a.eventHandler.listen(a,"DropdownItemClicked",c=>{c=c.getBrowserEvent();if(c=a.ea.get(c.detail.id))a.Da({category:"devsiteLlmTools",action:c.VH,label:c.analyticsLabel}),c.action()});var b=LJa();b&&(a.o=b,a.Da({category:"devsiteLlmTools",action:"llm_tools_button_impression"}))},
LJa=function(){var a=_ds.F();a.pathname=`${a.pathname}.md.txt`;return _ds.Ff(a.href)},NJa=async function(a){if(!a.o)return null;a.Xr=!0;try{let b=await fetch(_ds.bm(a.o.toString()).href);if(b)return await b.text()}catch(b){}finally{a.Xr=!1}return null},OJa=async function(a){try{return a.oa||(a.oa=await NJa(a)),a.oa}catch(b){}return null},MY=function(a,b){a.dispatchEvent(new CustomEvent("devsite-show-custom-snackbar-msg",{detail:{msg:b,showClose:!1},bubbles:!0}))},PJa=async function(a){a.Da({category:"devsiteLlmTools",
action:"llm_tools_copy_markdown_click",label:"main_button"});var b=await OJa(a);b?await _ds.cu(b):MY(a,"No se pudo copiar la p\u00e1gina")},NY=class extends _ds.gw{constructor(){super(...arguments);this.Xr=!1;this.eventHandler=new _ds.v;this.oa=null;this.o=void 0;this.items=[{id:"open-markdown",title:"Ver como lenguaje de marcado",action:()=>{this.o?_ds.Qf(window,this.o,"_blank"):MY(this,"No se pudo abrir la vista del lenguaje de marcado.")},VH:"llm_tools_open_markdown_click",analyticsLabel:"dropdown_item"}];
this.qa=this.items.map(a=>({id:a.id,title:a.title}));this.ea=new Map(this.items.map(a=>[a.id,a]))}Ta(){return this}connectedCallback(){super.connectedCallback();MJa(this)}disconnectedCallback(){super.disconnectedCallback();this.eventHandler.removeAll()}render(){return(0,_ds.O)`
      <div
        class="devsite-llm-tools-container"
        role="group"
        aria-label="${"Herramientas de LLM"}">
        <div class="devsite-llm-tools-button-container">
          <button
            type="button"
            class="button button-white devsite-llm-tools-button"
            ?disabled="${this.Xr}"
            @click=${()=>{PJa(this)}}
            aria-label="${"Copiar p\u00e1gina como Markdown"}"
            data-title="${"Copiar p\u00e1gina como Markdown"}">
            <span class="material-icons icon-copy" aria-hidden="true"></span>
          </button>
        </div>
        <div class="devsite-llm-tools-dropdown-container">
          <devsite-dropdown-list
            .listItems="${this.qa}"
            open-dropdown-aria-label="${"M\u00e1s opciones de herramientas de LLM"}"
            close-dropdown-aria-label="${"Cerrar el men\u00fa de opciones de herramientas de LLM"}">
          </devsite-dropdown-list>
        </div>
      </div>
    `}};NY.prototype.disconnectedCallback=NY.prototype.disconnectedCallback;_ds.z([_ds.K(),_ds.A("design:type",Object)],NY.prototype,"Xr",void 0);try{customElements.define("devsite-llm-tools",NY)}catch(a){console.warn("Unrecognized DevSite custom element - DevsiteLlmTools",a)};})(_ds_www);
