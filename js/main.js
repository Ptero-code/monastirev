function makeScrollable(wrapper, scrollable){
}

$(function(){   
  makeScrollable("div.sc_menu_wrapper", "div.sc_menu");
});
    


function makeScrollable(wrapper, scrollable) {
	// Получаем элементы jQuery
	var wrapper = $(wrapper), scrollable = $(scrollable);
	
	// Скрываем изображения, пока они не загружены
	scrollable.hide();
	var loading = $('<div class="loading">Загрузка...</div>').appendTo(wrapper);
	
	// Запускаем функцию, которая проверяет загрузку всех изображений
	var interval = setInterval(function() {
		var images = scrollable.find('img');
		var completed = 0;
		
		// Подсчитываем количество загруженных изображений
		images.each(function(){
			if (this.complete) completed++;	
		});
		
		if (completed == images.length){
			clearInterval(interval);
			// Таймаут добавлен для устранения проблем с Chrome
			setTimeout(function(){
				
				loading.hide();
				// Удаляем полоску прокрутки
				wrapper.css({overflow: 'hidden'});						
				
				scrollable.slideDown('slow', function(){
					enable();	
				});					
			}, 1000);	
		}
    }, 100);
}


function enable(){
    // Высота области вверху и внизу, в которой нет реакции на перемещение курсора мыши
    var inactiveMargin = 99;					
    // Кэшируем параметры для повышения производительности
    var wrapperWidth = wrapper.width();
    var wrapperHeight = wrapper.height();
    // Используем наружную высоту для включения отступов
    var scrollableHeight = scrollable.outerHeight() + 2*inactiveMargin;
    
    //Когда пользователь перемещает курсор мыши по меню
    wrapper.mousemove(function(e){
        var wrapperOffset = wrapper.offset();
    
        // Прокручиваем меню
        var top = (e.pageY -  wrapperOffset.top) * (scrollableHeight - wrapperHeight) / wrapperHeight - inactiveMargin;
        if (top < 0){
            top = 0;
        }			
        wrapper.scrollTop(top);
    });
    
    
}