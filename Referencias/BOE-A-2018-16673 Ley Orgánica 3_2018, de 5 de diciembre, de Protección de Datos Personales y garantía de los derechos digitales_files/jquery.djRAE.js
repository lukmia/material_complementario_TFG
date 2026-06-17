/**
 * jquery.djRAE.js
 *
 * Plugin que convierte un elemento del DOM en un widget de consulta en el
 * Diccionario Jurídico de la RAE.
 */
;if(typeof jQuery !== "undefined") 

(function ($, window, document, undefined) {
  
  var
    pluginName = "djraeWidget",
    dataName   = "plugin_" + pluginName,
    onLink     = false,
    dentro     = false;
    
  // Pequeña utilidad jQuery para saber si un objeto es visible o no
  $.fn.isInViewport = function()
  {
    var elementTop    = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    
    var viewportTop    = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    
    return elementBottom > viewportTop && elementTop < viewportBottom;
  };

  //-------------------------------------------------------------------------
  // Constructor del plugin. Se instancia para cada elemento al que se le aplica
  function Plugin(element, options)
  {
    this._element    = element;
    this._jqInput    = null;        // Lo rellena el init
    this._jqBtnFix   = null;
    this._btnVisible = false;
    this._campoMovil = null;
    this._jqInputFix = null;
    this._constants  = $.extend({}, Plugin.prototype.constants);
    this._defaults   = $.extend({}, Plugin.prototype.defaults);
    this._name       = pluginName;
    this._timer      = null;
    this._timerOver  = null;
    this._wndDetalle = null;
    this._lastEntry  = null;
    this._modoVista  = this._constants.MODO_PC;
    this._lastEntryClick = "";
    
    this._inputAct   = null;  // Referencia al campo de Input que está actuando de activo.

    // Ventana flotante con los resultados
    this._wndList     = null;
    this._dropDown    = true;
    this._rightDetail = true;
    
    /*IE_HACK!*/
    this._inputMustHaveFocusExplorer = false;
    
    Plugin.prototype.methods["init"].apply(this, [ options ]);

  }

  //-------------------------------------------------------------------------
  Plugin.prototype.constants = {
    MODO_PC: "P",
    MODO_TABLET: "T",
    MODO_MOVIL: "M",
    ENTER: typeof $.ui !== "undefined" ? $.ui.keyCode.ENTER : 13,
  };

  //-------------------------------------------------------------------------
  Plugin.prototype.defaults = {
    autoCompleteTimeout: 500,
    detailRequestTimeout: 200,
    autoCompleteMinLength: 3,
    //requestFrom: 1,
    //requestTo: 20,
    selectConUnClick: false // Si queremos que el simple click seleccione o no
  };

  // Métodos publicos que implementa el plugin
  // Lo implemento como una llamada a una función anónima para que esto me permita
  // tener métodos privados en el prototipo que se quedan dentro de la closure
  // en tiempo de definición. Si no, al tener que asociarlos directamente al
  // prototipo serían de ámbito publico.
  Plugin.prototype.methods = (function() {
    
    //*********************************
    //**  MÉTODOS PRIVADOS DEL PLUGIN
    //*********************************
    var _ = {
      
      DO_LOG: false,
//      DO_LOG: true,
      
      url_get_entry: null,
      url_get_lema:  null,
      url_enlaces_al_boe: null,
      modo: 0,

      //---------------------------------------------------------------------
      log: function()
      {
        return;
        if(_.DO_LOG) {
        	if(typeof console !== 'undefined'){
        		console.log.apply(this, arguments);
        	}
        }
        
      },
      
      error: function()
      {
        return;
        if(_.DO_LOG) {
        	if(typeof console !== 'undefined'){
        		console.error.apply(this, arguments);
        	}
        }
        
      },

      //---------------------------------------------------------------------
      init: function(options)
      {
        var
          plugin   = this,
          $element = $(plugin._element);
          
        // Determinamos el modo de visualización
        if(typeof options !== "undefined") {
          if(typeof options.modo !== "undefined") {
            var cons = Plugin.prototype.constants;
            if([plugin._constants.MODO_PC, plugin._constants.MODO_TABLET, plugin._constants.MODO_MOVIL].indexOf(options.modo) < 0) {
              _.error("Valor del parámetro modo no permitido: " + options.modo);
            }
            else {
              plugin._modoVista = options.modo;
            }
          }
        }
        
        _.log("Vamos a funcionar en modo: " + plugin._modoVista);
        
        _.cargarDatosStartup();
        
        if(plugin._modoVista == plugin._constants.MODO_PC){
	        $element.empty();
	        $element.addClass(pluginName + "_container");
	        plugin._jqInput  = $("<input>", { "type": "text", "class": pluginName + "_input", "id": "caja-busqueda-djrae"});
	        plugin._jqInput.data(dataName, this);
	        $element.append(plugin._jqInput);
	        
	        // Creamos el botón "Fijo"
	        plugin._jqBtnFix = $("<div>", { "class": pluginName + "_btnfix tablet pc", "title": "Diccionario Panhisp\u00e1nico del Espa\u00f1ol Jur\u00eddico" });
	        $("body").append(plugin._jqBtnFix);
	
	        plugin._jqInputFix = $("<input>", { "type": "text", "name": pluginName + "_inputMovil", "class": pluginName + "_input"});
	        plugin._jqInputFix.data(dataName, this);
	        plugin._campoMovil = $("<div>", {"class": pluginName + "_inputMovil"})
	            .append(plugin._jqInputFix);
	        $("body").append(plugin._campoMovil);
	        
	        
	        _.initControl(plugin);
        }else{
        	$('form[name="frm_search_dj"]').on('submit',function(evt){
        		evt.preventDefault();
        		var lema = $(this).find('input#caja-busqueda-djrae').val();
        		var url = _.url_enlaces_al_boe + '/lema/' + lema;
        		window.open(url, '_blank');
        	})
        }
      },
      
      //---------------------------------------------------------------------
      cargarDatosStartup: function()
      {
        if(_.url_get_entry === null) {
          var
            datosPost = {
              startup: 1
            };
          $.get(
            '/djrae/execute_service.php',
            datosPost,
            function(data, textStatus) {
              _.url_get_lema       = typeof data.url_get_lema       !== "undefined" ? data.url_get_lema  : null;
              _.url_enlaces_al_boe = typeof data.url_enlaces_al_boe !== "undefined" ? data.url_enlaces_al_boe : "";
            }
          );
        }
      },

      //---------------------------------------------------------------------
      getCampoMovilVisible: function(plugin)
      {
        return plugin._campoMovil.data("visible") === true;
      },

      //---------------------------------------------------------------------
      showCampoMovil: function(plugin, boolShow)
      {
        boolShow = typeof(boolShow) !== "undefined" ? boolShow : true;
        
        var esVisible = false;

        esVisible = _.getCampoMovilVisible(plugin);

        if(boolShow) {
          if(!esVisible) {
            var
              pos  = plugin._jqBtnFix.offset(),
              left = pos.left - plugin._campoMovil.width() - 2,
              rect = plugin._jqBtnFix[0].getBoundingClientRect(),
              wnd_w = $(window).width(),
              right = wnd_w - rect.left-2;
              
            plugin._campoMovil.css({ "right": right });
            plugin._campoMovil.animate({width: 'toggle'}, 200, function() { plugin._jqInputFix.focus(); });
            plugin._campoMovil.data("visible", true);
          }
        }
        else {  // (boolShow)
          if(esVisible) {
            plugin._campoMovil.animate({width: 'toggle'}, 200);
            plugin._campoMovil.data("visible", false);
          }
        }  // (boolShow)
        
        
      },  // showCampoMovil()

      //---------------------------------------------------------------------
      showBotonFijo: function(plugin, boolShow)
      {
        boolShow = typeof(boolShow) !== "undefined" ? boolShow : true;
        
        if(boolShow) {
          if(!plugin._btnVisible) {
            plugin._btnVisible = true;
            var
              pos  = plugin._jqInput.offset(),
              left = pos.left + plugin._jqInput.width() + 60;

            plugin._inputAct = plugin._jqInputFix;
            _.hideResults(plugin._jqInput);
            plugin._jqBtnFix.css({ left: left });
            plugin._jqBtnFix.fadeIn(function() {
              plugin._jqBtnFix.on("click.boton dblclick.boton", function(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                
                if(_.getCampoMovilVisible(plugin)) {
                  _.showCampoMovil(plugin, false);
                }
                else {
                  _.showCampoMovil(plugin);
                }
              });
            });
          }
        }
        else {
          if(plugin._btnVisible) {
            plugin._inputAct = plugin._jqInput;
            plugin._btnVisible = false;
            plugin._jqBtnFix.off("click.boton dblclick.boton");  // Desactivamos la recepción de eventos
            _.showCampoMovil(plugin, false);
            _.hideResults(plugin._jqInput);
            plugin._jqBtnFix.fadeOut();
          }
        }
        
      },

      //---------------------------------------------------------------------
      initControl: function(plugin)
      {

        var arrEdits = $($.map([plugin._jqInputFix , plugin._jqInput], function(el){return el.get();}));
        
        $(window).on("mousedown.detalle", function(evt) {
          _.log("window mousedown.detalle", this);
          evt.stopPropagation();
          _.hideVentanaDefinicion(plugin._jqInput);
        });
        
        arrEdits.on({
          "keyup": function(evt) {
            var
              plugin = $.data(this, dataName);
            
            if(plugin._timer) {
              clearTimeout(plugin._timer);
              plugin._timer = null;
            }
            
            var cadena = plugin._inputAct.val();
  
            if((evt.keyCode !== 27) && (cadena.length >= plugin._defaults.autoCompleteMinLength)) {
              plugin._timer = setTimeout(
                function() { _.lanzarBusqueda.apply(plugin, [plugin._inputAct]); },
                plugin._defaults.autoCompleteTimeout
              );
            }
            else {
              _.hideResults($(this));
            }
          },

          "focus": function() {
            var
              plugin = $.data(this, dataName);
            
            if(plugin._timer) {
              clearTimeout(plugin._timer);
              plugin._timer = null;
            }
            
            var cadena = plugin._inputAct.val();

            if((cadena.length >= plugin._defaults.autoCompleteMinLength)) {
              _.lanzarBusqueda.apply(plugin, [plugin._inputAct]);
            }

          }
        });
        
        // Por defecto el campo input actual es el "normal"
        plugin._inputAct = plugin._jqInput;

        // Iván - 07/03/2019. Para evitar el comportamiento anómalo al hacer scroll en las tablets
        // se limita el funcionamiento dle botón flotante al PC
        if(plugin._modoVista == plugin._constants.MODO_PC) {
          $(window).on("resize scroll", function() {
            if(plugin._jqInput.isInViewport()) {
              _.showBotonFijo(plugin, false);
            }
            else {
              _.showBotonFijo(plugin);
            }
          });
        }
				
				//Ignora el enter en el input, porque lanzaba el form y abría pestaña nueva con error (jrs 26-03-19)
				$('input.djraeWidget_input').keypress(function(e) {
				    if (e.keyCode == plugin._constants.ENTER) { // $.ui.keyCode.ENTER) {
				          return false;
				    }
				});
        
        // Búsqueda contextual en el texto
        // Necesita timeout para instalarse
        setTimeout(
          function() {
            $("p").on("click", function(){ //p.parrafo, p.parrafo_2 No funcionaba con los centrados y los artículos (jrs 26-03-19)
              s = window.getSelection();
              var range = s.getRangeAt(0);
              var node = s.anchorNode;
              var salir = false;

              // Si queremos que el simple click seleccione o no
              if((range.startOffset == range.endOffset) && !plugin._defaults.selectConUnClick) {
                return;
              }

              while(!salir && range.toString().indexOf(' ') != 0) {
                try {
                  range.setStart(node,(range.startOffset - 1));
                }
                catch(e) {
                  salir = true;
                }
              }
              if(!salir) {
                range.setStart(node, range.startOffset+1);
              }

              var cadena = range.toString();
              salir = false;
              
              if(!/[\.,:;\- ]$/.test(cadena)) {
                
                do {
                  try {
                    range.setEnd(node, range.endOffset + 1);
                  }
                  catch(e) {
                    salir = true;
                  }
                  
                  cadena = range.toString();
                  
                } while(!salir && ", :.;".indexOf(cadena[cadena.length-1]) == -1 && cadena.trim() != '');
               
              }

              if(!salir) {
                range.setEnd(node, range.endOffset -1);
              }

              var str = range.toString();
              str = str.replace(/[\.,:;\-]/g, " ").replace(/  /g, " ").trim();
              _.log("---" + str + "---");
             
              if(str.length == 0) {
                return;
              }
              
              var
                arrAux = str.split(" "),
                arrPalabras = [];
              
              /// Quitamos las palabras pequeñas
              $.each(arrAux, function(indice, elem) {
                if((elem.length > 2) && (arrPalabras.length < 3)) { //Cambio elem.length> de 3 a 2 para que funcione con ley (jrs 26-03-19)
                  arrPalabras.push(elem);
                }
              });
              _.log(arrPalabras);
              
              if(arrPalabras.length == 0) {
                return;
              }
              
              _.log("Campo visible:", (_.getCampoMovilVisible(plugin) ? "SI" : "NO"));
              plugin._inputAct.val(arrPalabras.join(" "));
              if(plugin._jqInput.isInViewport() || _.getCampoMovilVisible(plugin)) {
                _.log("Lanzamos la busqueda");
                _.lanzarBusqueda.apply(plugin, [plugin._inputAct]);
              }

              
             
            });
          },
          plugin._defaults.autoCompleteTimeout*5
        );

      },

      //---------------------------------------------------------------------
      hideResults: function(jqInput)
      {
        var
          plugin = jqInput.data(dataName);

        if(plugin._wndList === null) {
          return;
        }
        else {
          _.hideVentanaDefinicion(jqInput);
          _.instalarControlClick(jqInput, true);
          plugin._wndList.fadeOut(200, function() { plugin._wndList.remove(); plugin._wndList = null; } );
          plugin._dropDown    = true;
          plugin._rightDetail = true;
        }
        
        // Reseteamos la caché de la última búsqueda
        jqInput.data("prev", null);

      },

      //---------------------------------------------------------------------
      requestDetalle: function(path)
      {
        var
          plugin = this,
          datosPost = {
            path: path
          };
        
        if(path !== this._lastEntry) {
          this._lastEntry = path;
          plugin._timerOver = null;
          $.get(
            '/djrae/execute_service.php',
            datosPost,
            function(data, textStatus) {
              if(plugin._wndDetalle !== null) {
                var
                  html    = data,
                  $aux    = $("<div/>").html(html),
                  $cnt    = $("<div/>"),
                  $art    = $aux.find("article"),
                  $cuerpo = $aux.find(".cuerpo-lema");
                  
                  $lema   = $aux.find("div.lema");
                  $lema.append($('<a>', {href: _.url_enlaces_al_boe + path, title: $lema.text() + ' en el DPEJ'}).append($('<img>', {src: '/djrae/_imgs/dj_icon.svg', alt: 'Diccionario Panhisp\u00e1nico del Espa\u00f1ol Jur\u00eddico (DPEJ)' })));
                  
					//Myriam julio 2020 normativa relacionada paises
					
					var
						$enlacesMundo = $aux.find('a[id^=opener]'),
						$normativas   = $aux.find('.dpej_normativa_relacionada');
					
					$enlacesMundo.each(function(index, enlaceMundo){
						var $enlaceMundo = $(enlaceMundo);
						var $bubbleContainer = $('<div>').addClass('bubble-container');
						
						var $normativa = $($normativas.get(index));
						var normativaHtml = $normativa.html();
						//var html= '<img class="dpej_world" src="/djrae/_imgs/GlobeMap.svg" title="Normativa relacionada de Estados americanos">';
						var html= '<img class="dpej_world" src="/djrae/_imgs/icono_internacional.png" title="Normativa relacionada de Estados americanos">';
							html+= '<div class="bubble">'
								html+= '<div class="dpej_world_title">Normativa relacionada de Estados americanos</div>';
								html+= normativaHtml;
							html+= '</div>';
							
						$bubbleContainer.html(html);
						$enlaceMundo.replaceWith($bubbleContainer);
						$bubbleContainer.bind('click', function(event){
							$(event.currentTarget).find('div.bubble').toggle();
						});
						
					});


                  if($art.size()) {
                    var
                      $titulo = $aux.find("#page-title");
                      
                    _.log("TITULO", $titulo, $titulo.html());
                    if($titulo.size()) {
                      $cnt.append($titulo.clone());
                    }
                    
                    $cuerpo.each(function(indice, elem) {
                      $cnt.append($(elem).clone());
                    });
  
                    html = $cnt.html();
                  }
                  
                
                  
                //_.log("CNT", $cnt.html());
                plugin._wndDetalle.empty();
                $aux.children().each(function(index,element){
                  plugin._wndDetalle.append(element);
                });
                
                // Convertimos las url en texto
                plugin._wndDetalle.find("a")
                  .on("mouseover", function(evt) { _.log("URL:", $(this).attr("href")); } )
                  .on("mousedown", function(evt) { _.log("requestdetalle mousedown"); evt.stopPropagation(); evt.preventDefault();})
//                  .on("click", function(evt) { _.log("requestdetalle click"); evt.stopPropagation();})
                  .each(function(indice, elem) {
                  var
                    $this  = $(this),
                    href   = $this.attr("href");
                    if(href){
	                    if(href.indexOf('/lema/') == 0){
	                      /*
	                       * Redirecciones a su diccionario jurídico
	                       */
	                      href = _.url_enlaces_al_boe + href;
	                    }else if (href.indexOf('/cliente/') == 0){
	                      /*
	                       * Redirecciones a nuestra legislación
	                       */
	                      var tokens = href.split('?');
	                      if(tokens.length>1){
	                        href = '/djrae/execute_service.php?' + tokens[1];
	                      }
	                    }
	                    
	                    $this.attr("href", href);    
	                    $this.attr("target", "_blank");
                    }
                  });
                
              }
            }
          );
        }
      },

      //---------------------------------------------------------------------
      controlLineaResults: function(jqInput)
      {
        var
          plugin = jqInput.data(dataName),
          cnt = plugin._wndList;
        
        if(cnt === null) {
          return;
        }

        $(window).on("mouseenter.detalle", function(evt) {
//          _.log('$(window).on("mouseenter.detalle")');
          if(!_.dentro) {
            var
              target =  $("body")[0];

            if(typeof evt.originalEvent !== "undefined") {
              if(typeof evt.originalEvent.explicitOriginalTarget !== "undefined") {
                target = evt.originalEvent.explicitOriginalTarget;
              }
              else if(typeof evt.originalEvent.fromElement !== "undefined" ) {
                target = evt.originalEvent.fromElement;
              }
            }

            if(!$(target).hasClass("ventanaDetalle")) {
              target = $(target).closest(".resultItem");
              
              if(!target.hasClass("resultItem")) {
              	_.log('mouseenter.detalle');
              	_.hideVentanaDefinicion(jqInput);
              }
            }
          }
        });
        
        cnt.find(".resultItem, .resultItem *").on({
          "mouseenter.detalle": function(evt) {
            var
              $this   = $(this),
              pos     = $this.position(),
              path    = $this.closest(".resultItem").attr("path"),
              primera = plugin._wndDetalle === null;
              evt.stopPropagation();
            
              if((typeof(path) !== "undefined") && (path !== "")) {
              
                // Dejamos abierta la ventana
                _.showVentanaDefinicion(jqInput, { top: pos.top, left: $this.closest(".resultsList").width(), texto: null });
  
                if(primera) {
                  plugin._lastEntry = null;
                  _.requestDetalle.apply(plugin, [ path ]);
                }
    
                if(plugin._timerOver) {
                  clearTimeout(plugin._timerOver);
                  plugin._timerOver = null;
                }
              
                plugin._timerOver = setTimeout(
                  function() { _.requestDetalle.apply(plugin, [ path ]); },
                  plugin._defaults.detailRequestTimeout
                );
              }

          },

        });
        
      },

      //---------------------------------------------------------------------
      renderResults: function(jqInput, data)
      {
        _.log(data);
        var
          plugin = jqInput.data(dataName),
          numResults = Object.keys(data).length;
          cnt = plugin._wndList;

        cnt.empty();

        if(numResults === 0) {
          return;
        }
        
        var grupo = $("<div>", { "class": "grupoResults" });
        
        for(var key in data) {
            grupo.append($("<div>" , {"class": "resultItem", path: key.trim()}).html(data[key]));
        }

        cnt.append(grupo);
        
        _.controlLineaResults(jqInput);
        
      },
      
      //---------------------------------------------------------------------
      instalarControlClick: function(jqInput, boolQuitar)
      {
        var
          plugin = jqInput.data(dataName);
          
        boolQuitar = typeof(boolQuitar) !== "undefined" ? boolQuitar : false;
        
        if(plugin._wndList === null) {
          return;
        }
        
        if(boolQuitar) {
          plugin._wndList.off("click.popup_list");
          $(window).off("click.popup_list");
          $(window).off("mouseenter.detalle");
          
          if(plugin._wndDetalle !== null) {
            plugin._wndDetalle.off("mouseenter.detalle");
            plugin._wndList.off("mouseenter.detalle");
          }
          
        }
        else {
          $(window).on("click.popup_list", function() {
            _.log('click.popup_list');
            _.hideVentanaDefinicion(jqInput);
            _.hideResults(jqInput);
          });
          
          // Para no instalar los controladores dos veces me creo una colección jQuery
          var aux = $($.map([plugin._wndList, plugin._jqInput], function(el){return el.get();}));
          aux.on("click.popup_list", function(evt) {
            evt.stopPropagation();
          });
        }
        
      },
      //---------------------------------------------------------------------
      /**
       * Función de prueba que no voy a usar pero que dejo como referencia
       */
      offset: function(el)
      {
        var
          rect       = el.getBoundingClientRect(),
          scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
          scrollTop  = window.pageYOffset || document.documentElement.scrollTop;

        return { top: rect.top + scrollTop, left: rect.left + scrollLeft };

      },

      //---------------------------------------------------------------------
      showResults: function(jqInput, data)
      {
        var
          numResults = Object.keys(data).length;
          plugin = jqInput.data(dataName);

        if(numResults === 0) {
        	$('.djraeWidget_input').css('color','red'); //Si no encuentra ningún resultado pone el texto en rojo (jrs 26-03-19)
          _.hideResults(jqInput);
        }
        else {
        	$('.djraeWidget_input').css('color','inherit'); //Si no encuentra ningún resultado pone el texto en rojo (jrs 26-03-19)
          var hayLista = (plugin._wndList !== null);
          
          if(!hayLista) {
            plugin._wndList = $("<div>", { "class": "popupWindow resultsList" });
            plugin._wndList.appendTo(jqInput.parent());
            plugin._wndList.on('blur',function(){
              _.log('blur')
              if(!plugin._inputMustHaveFocusExplorer){
              _.hideResults(jqInput);
              }
            });
            
            var
              wnd_ref       = jqInput,
              padre         = wnd_ref.parent(),
              alto          = wnd_ref.height(),
              borde_top     = wnd_ref.css("border-top-width"),
              borde_bottom  = wnd_ref.css("border-bottom-width"),
              arrTop        = /([\d\.])(.*)/g.exec(borde_top),
              arrBottom     = /([\d\.])(.*)/g.exec(borde_bottom),
              pos_top       = "0",
              rect          = wnd_ref[0].getBoundingClientRect(),
              rect_parent   = padre[0].getBoundingClientRect(),
              wnd_h         = $(window).height(),
              ah_1          = rect.top,
              ah_2          = wnd_h - rect.bottom,
              wnd_w         = $(window).width(),
              ax_1          = rect.left,
              ax_2          = wnd_w - rect.right,
              css_val       = {},
              input_padding_bottom = /([\d\.])(.*)/g.exec(jqInput.css('padding-bottom'));
              
            pos_top = (alto + 1 + parseFloat(arrTop[1]) + parseFloat(arrBottom[1])) + parseFloat(input_padding_bottom[1]);
            
            if(ah_1 > ah_2) {
              plugin._dropDown         = false;
              css_val.bottom           = 0;
              css_val["margin-bottom"] =  pos_top + (arrTop.length > 1 ? arrTop[2] : ""); //- (rect_parent.y - rect.y);
            }
            else {
              plugin._dropDown = true;
              css_val.top      = pos_top + (rect.y - rect_parent.y) + (arrTop.length > 1 ? arrTop[2] : "");
            }

            // Determinamos si se muestra a la izquierda o a la derecha
            if(ax_1 > ax_2) {
              plugin._rightDetail = false;
              css_val.right = rect_parent.right - rect.right;
            }
            else {
              plugin._rightDetail = true;
              css_val.left =  - rect.left - rect_parent.left;
            }

            plugin._wndList.css(css_val);

          }
          
          _.renderResults(jqInput, data);
          
          jqInput.on('blur.textInput',(function (event) {
            plugin._inputMustHaveFocusExplorer = true;
            setTimeout(function () { jqInput.focus(); jqInput.off('blur.textInput')}, 20);
          }));
          
          if(!hayLista) {
            _.log('showResults - ', $(this))
            plugin._wndList.fadeIn(200, function(){ $(this).focus(); plugin._inputMustHaveFocusExplorer = false;});
            _.instalarControlClick(jqInput);
          }
          
        }
        
      },  // showResults()

      //---------------------------------------------------------------------
      lanzarBusqueda: function(jqInput)
      {
        var
          plugin = this,
          datosPost = {
            key:  jqInput.val(),
            //from: plugin._defaults.requestFrom,
            //to:   plugin._defaults.requestTo
          },
          previo = jqInput.data("prev");
        
        if(datosPost.key !== previo) {
          $('body, .djraeWidget_input').css("cursor", "progress"); //cambia el cursor en las búsquedas (jrs 26-03-19)
          jqInput.data("prev", datosPost.key);
          plugin._timer = null;
          $.get(
            '/djrae/execute_service.php',
            datosPost,
            function(data, textStatus) {
              _.showResults(jqInput, data);
              $('body, .djraeWidget_input').css("cursor", "default"); //cambia el cursor en las búsquedas (jrs 26-03-19)
            }
          );
        }

      },  // lanzarBusqueda

      //---------------------------------------------------------------------
      showVentanaDefinicion: function(jqInput, params)
      {
        var
          plugin = jqInput.data(dataName),
          opts = $.extend(
            {
              texto: "Ventana de definici\u00f3n",
              top:  0,
              left: 0
            },
            params
          ),
          boolCrear = false,
//          wndPadre  = plugin._wndList.closest("." + pluginName + "_container"),
          wndPadre  = jqInput.parent(),
          offset    = 0; //wndPadre.height()/2;

        if(plugin._wndDetalle === null) {
          // Determinamos para que lado se pinta la ventana
          var
            pos_list = plugin._wndList.position(),
            css_val  = {};

          if(plugin._rightDetail) {
            css_val.left = opts.left+1;
          }
          else {
            // Lo de sumarle 10 a pelo hay que trabajarlo porque debería ser capaz de calcularlo
            // a partir de las posiciones de las otras ventanas.
            css_val.right = plugin._wndList.width() + 1 + (jqInput == plugin._jqInputFix ? 10 : 0);
          }
          
          boolCrear = true;
          plugin._wndDetalle = $("<div>", { "class": "popupWindow ventanaDetalle" });

          if(plugin._dropDown) {
            css_val.top = opts.top+offset;
          }
          else {
            css_val.top = pos_list.top + opts.top - offset;
          }
          
          plugin._wndDetalle.css(css_val);

          wndPadre.append(plugin._wndDetalle);
          
        }
        
        if(opts.texto !== null) {
          plugin._wndDetalle.html(opts.texto);
        }
        
        if(boolCrear) {
          if(true) {
            plugin._wndDetalle.fadeIn(100, function() {

              plugin._wndDetalle.on("mouseenter, mousemove", function(evt) {
                _.dentro = true;
                evt.stopPropagation();
              });

              plugin._wndDetalle.on("mouseleave", function(evt) {
                _.dentro = false;
                evt.stopPropagation();
              });

              plugin._wndDetalle.on("click", function(evt) {
                evt.stopPropagation();
              });
              
              plugin._wndDetalle.find("*:not(a)").on("click", function(evt) {
                evt.stopPropagation();
              });
              
            });
          }
          else {
            plugin._wndDetalle.show();
          }  // (false)
        }
        else {
          if(plugin._dropDown) {
            plugin._wndDetalle.css({
              "top":  opts.top+offset
            });
          }
          else {
            plugin._wndDetalle.css({
              "top": plugin._wndList.position().top + opts.top - offset
            });
          }
        }
        
      },  // showVentanaDefinicion()
      
      //---------------------------------------------------------------------
      hideVentanaDefinicion: function(jqInput)
      {
        var
          plugin = jqInput.data(dataName);

        if(plugin._wndDetalle === null) {
          return;
        }
        
        $(window).off("mousedown.detalle");

        if(true) {
          plugin._wndDetalle.fadeOut(100, function() { plugin._wndDetalle.remove(); plugin._wndDetalle = null; });
        }
        else {
          plugin._wndDetalle.hide();
          plugin._wndDetalle.remove();
          plugin._wndDetalle = null;
        }
        
      },

      //---------------------------------------------------------------------
      focus: function()
      {
        this._jqInput.focus();
      },

      //---------------------------------------------------------------------
      
    };
    
    //*********************************
    //**  MÉTODOS PÚBLICOS DEL PLUGIN
    //*********************************
    var pub = {
      init:  _.init,
      focus: _.focus,
    };
    
    return pub;
    
  })();
  

  //-------------------------------------------------------------------------
  // MAIN() 
  //-------------------------------------------------------------------------
  // Mediante el uso del data dentro del elemento podemos controlar
  // que un objeto no se inicialice más de una vez.
  $.fn[pluginName] = function(options) {
    var
      argumentos = arguments;
    
    return this.each(function () {
      var
        boolInit = false;

      // Si no está instanciado el elemento lo hacemos
      if(!$.data(this, dataName)) {
        boolInit = true;
        $.data(this, dataName, 
          new Plugin(this, options));
      }
      
      var plugin = $.data(this, dataName);

      if(Plugin.prototype.methods[options]) {  // Si es una función de las declaradas
        if(options == "init") {
          $.error("La inicializaci\u00f3n del plugin " + pluginName + " no puede hacerse de forma expl\u00edcita");
        }
        else {
          return Plugin.prototype.methods[options].apply(plugin, Array.prototype.slice.call(argumentos, 1));
        }
      } else if(typeof(options) === 'object' || !options) {

        // Este sería el caso del init pero como ya he hecho el new... paso la primera vez
        // Si paso más veces es que estoy cambiado cosas de los defaults y entonces si que
        // tengo que llamar.
        // Default to "init"
        if(!boolInit) {
          //return Plugin.prototype.methods.init.apply(plugin, argumentos);
        }
        
      } else {
        $.error('El m\u00e9todo ' +  options + ' no existe en jquery.' + pluginName);
      }
      
    });
    
	};

})(jQuery , window, document);
