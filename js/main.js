$(document).ready(function() {
  const classActive = 'active';

  // menu
  $('#menu').click(function(e){
    e.preventDefault();
    $('nav').toggleClass('nav_'+classActive);
  });
  $('.sub a').click(function(e){
    e.preventDefault();
    $(this).parent('.sub').toggleClass(classActive);
  });

  $('.one-page').click(function(e){
    e.preventDefault();
    var alvo = $(this).attr('href');
    $('html, body').animate({scrollTop: $(alvo).offset().top}, 1200, 'easeInOutExpo');
  });

  // botao voltar ao topo
  $(window).scroll(() => {
    if( $(this).scrollTop() < 200 ) {
      $('#voltar-ao-topo').fadeOut(200);
    } else {
      $('#voltar-ao-topo').fadeIn(200);
    }
  });
  $('#voltar-ao-topo').on('click', (e) => {
    e.preventDefault();
    $('html, body').animate({scrollTop: 0}, 1200, 'easeInOutExpo');
  });

  // plugin gerar textos
  $.fn.geraTexto = function(){
    var palavra = '';
    $('.gerar li').each(function(){
      var letra = $(this).html();
      if(letra == 'e'){
        palavra = 'enter';
      }else if(letra == 'i'){
        palavra = 'inis';
      }else if(letra == 'o'){
        palavra = 'omber';
      }else if(letra == 'u'){
        palavra = 'ufter';
      }else if(letra == 'a'){
        palavra = 'ais';
      }
      $('<li>'+palavra+'</li>').appendTo('#gerados');
    });
  }
  $('.gerar li').geraTexto();

  // plugin legenda
  $.fn.altLegenda = function(){
    $('.gera-legenda').each(function(){
      var legenda = $(this).attr('alt');
      $(this).next('.legenda').html(legenda);
    });
  }
  $('.gera-legenda').altLegenda();

  // formulario
  function msg(msg){
    swal('Por favor', msg, 'warning');
  }

  // valida e-mail
  function validaEmail(email){
    var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if(filtro.test(email)){
      return true;
    }else{
      return false;
    }
  }

  $('#formulario form').submit(function(e){
    e.preventDefault();

    var nome = $('#nome').val();
    var email = $('#email').val();
    var telefone = $('#telefone').val();
    var dataNascimento = $('.datanascimento').val();
    var estado = $('#estado').val();
    var cidade = $('#cidade').val();
    var mensagem = $('#mensagem').val();

    if(nome == ''){
      msg('Digite seu Nome');
    }else if(email == ''){
      msg('Digite seu E-mail');
    }else if(email != ''){
      var retorno = validaEmail(email);
      if(retorno === false){
        msg('Digite um e-mail válido!');
      }else if(telefone == ''){
        msg('Digite seu Telefone/Celular');
      }else if(dataNascimento == ''){
        msg('Digite sua Data de Nascimento');
      }else if(estado == ''){
        msg('Escolha seu Estado');
      }else if(cidade == ''){
        msg('Escolha sua Cidade');
      }else if(mensagem == ''){
        msg('Digite sua Mensagem');
      }else{
        swal('Obrigado', 'Dados enviados!', 'success');
      }
    }
  });

  // mascara telefone Brasil / data nascimento
  var SPMaskBehavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
  },
  spOptions = {
    onKeyPress: function(val, e, field, options) {
      field.mask(SPMaskBehavior.apply({}, arguments), options);
    }
  };
  $('#telefone').mask(SPMaskBehavior, spOptions);
  $('.datanascimento').mask('00/00/0000');

  // datepicker
  $("#datepicker").datepicker();
  jQuery(function($){
  $.datepicker.regional['pt-BR'] = {
    closeText: 'Fechar',
    prevText: '&#x3c;Anterior',
    nextText: 'Pr&oacute;ximo&#x3e;',
    currentText: 'Hoje',
    monthNames: ['Janeiro','Fevereiro','Mar&ccedil;o','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    dayNames: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'],
    dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
    dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
    weekHeader: 'Sm',
    dateFormat: 'dd/mm/yy',
    firstDay: 0,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''};
    $.datepicker.setDefaults($.datepicker.regional['pt-BR']);
  });

  // preenche select estados/cidades
  $.get('js/estados-cidades.json', function(response){

    $('<option value="">Selecione o estado</option>').appendTo('#estado');

    response.estados.forEach(function(item){
      $('<option value="'+item.sigla+'">'+item.nome+'</option>').appendTo('#estado');
    });

    $('#estado').change(function(){
      var estadoSelecionado = $(this).val();
      if(estadoSelecionado == ''){
        $('#cidade').html('').slideUp();
      }else{
        $('#cidade').html('').slideDown();
      }

      response.estados.forEach(function(value){
        if(value.sigla == estadoSelecionado){

          $('<option value="">Selecione uma de '+value.cidades.length+' cidade(s)</option>').appendTo('#cidade');
          i = 0;
          while(i < value.cidades.length){
            $('<option value="'+value.cidades[i]+'">'+value.cidades[i]+'</option>').appendTo('#cidade');
            i ++;
          }
        }
      });
    });
  }); // get
}); // ready
