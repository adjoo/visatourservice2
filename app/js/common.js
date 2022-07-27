$(document).ready(async function () {

    $(function () {
        $("input[name=phone]").mask("+7 (999) 999-99-99");
    });


    let popupLinkClassSelector = '.popup'
    let popupWindowClass = 'mfp_popup_window'

    $(popupLinkClassSelector).magnificPopup({
        type: 'inline',

        fixedContentPos: true,
        fixedBgPos: true,
        mainClass: popupWindowClass,

        overflowY: 'auto',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 600,
        zoom: {
            enabled: true,
            duration: 600
        },
    });
    //$.magnificPopup.open({items: {src: '#popup_form_small'}})

    //плавный скролл по странице

    $("a[href^='#'].scroll").click(function () {
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top + "px"}, $(_href).offset().top / 5, 'swing',);
        return false;
    });


    //отправка формы обратной связи
    $(".js_form_ajax_post").on('submit', function (event) {
        console.log($(this));
        $.ajax({
            url: "mailer.php", //url страницы
            type: "POST", //метод отправки
            dataType: "html", //формат данных
            data: $(this).serialize(),  // Сеарилизуем объект
            success: function () { //Данные отправлены успешно
                console.log('ajax sucсesfull');
                $("#js_popup_greeting").children(".js_popup_message_success").show();
                $("#js_popup_greeting").children(".js_popup_message_fail").hide();
                $.magnificPopup.open({items: {src: "#js_popup_greeting", type: "inline"}});
                setTimeout(function () {
                    $("#js_popup_greeting").delay(600).fadeOut(300);
                    setTimeout(function () {
                        $.magnificPopup.close()
                    }, 900);//тайминг исчезновения окна
                }, 2000);//тайминг показа окна спасибо за заявку
                setTimeout(function () {/*document.location.reload(false)*/
                    ;
                }, 2000);
            },
            error: function () { // Данные не отправлены
                console.log('ajax error');
                $("#js_popup_greeting").children(".js_popup_message_success").hide();
                $("#js_popup_greeting").children(".js_popup_message_fail").show();
                $.magnificPopup.open({items: {src: "#js_popup_greeting", type: "inline"}});
                setTimeout(function () {
                    $("#js_popup_greeting").delay(600).fadeOut(300);
                    setTimeout(function () {
                        $.magnificPopup.close()
                    }, 900);//тайминг исчезновения окна
                }, 2000);//тайминг показа окна спасибо за заявку
                setTimeout(function () {/*document.location.reload(false)*/
                        ;
                    }
                    , 2000);
            }
        });
        return false;
    });


    //jcarousel инициализация*************************************
    const CAROUSELITEM = "#carousel_n1 .carousel_frame";
    const CAROUSELBUTTONPREV = "#carousel_n1 .carousel__button.prev";
    const CAROUSELBUTTONNEXT = "#carousel_n1 .carousel__button.next";


    $(CAROUSELITEM).jcarousel({
        wrap: 'circular'
    });
    $(CAROUSELBUTTONPREV).click(function () {
        $(CAROUSELITEM).jcarousel('scroll', '-=1');
    });
    $(CAROUSELBUTTONNEXT).click(function () {
        $(CAROUSELITEM).jcarousel('scroll', '+=1');
    });
    $(CAROUSELITEM).swipe((direction) => {
            switch (direction) {
                case 'left':
                    $(CAROUSELITEM).jcarousel('scroll', '+=1');
                    break;
                case 'right':
                    $(CAROUSELITEM).jcarousel('scroll', '-=1');
                    break;
            }
        },
        {
            preventDefault: false,
            mouse: false,
            pen: true,
            distance: 50
        }
    );

    //map controls
    const countriesPaths = document.querySelectorAll('.activeMap a path')
    const countriesLinksDesk = document.querySelectorAll('.activeMap a')
    const countriesLinksMobile = document.querySelectorAll('.activeMapMobile a')
    const countriesLinks = [...countriesLinksDesk, ...countriesLinksMobile]
    const countriesLabels = document.querySelectorAll('.activeMapLabel')
    let currentCountry = 'bel'
    let currentLabel = ''
    countriesPaths.forEach((c) => {
        c.addEventListener('click',
            e => {
                const activeLink = e.target.parentNode
                currentCountry = activeLink.dataset.country

                countriesLinks.forEach( (a) => {a.classList.remove('active')} )
                countriesLabels.forEach( (l) => {
                    l.classList.remove('active')
                    if (l.id === currentCountry) {
                        currentLabel = l
                        currentLabel.classList.add( 'active' )
                    }
                })
                countriesLinksMobile.forEach( (l) => {
                    l.classList.remove('active')
                    if (l.dataset.country === currentCountry) {
                        l.classList.add( 'active' )
                    }
                })
                activeLink.classList.add( 'active' )
                setMapPointerAt(e.clientX, e.clientY)

            }
        )
    })
    countriesLinksMobile.forEach((c) => {
        c.addEventListener('click',
            e => {
                const activeLink = e.target
                currentCountry = activeLink.dataset.country
                countriesLinks.forEach( (a) => {a.classList.remove('active')} )
                countriesLabels.forEach( (l) => {
                    l.classList.remove('active')
                    if (l.id === currentCountry) {
                        currentLabel = l
                        currentLabel.classList.add( 'active' )
                    }
                })
                countriesLinksDesk.forEach( (l) => {
                    l.classList.remove('active')
                    if (l.dataset.country === currentCountry) {
                        l.classList.add( 'active' )
                    }
                })
                activeLink.classList.add( 'active' )
                const mapPointer = document.querySelector('.activeMap .map_pointer')
                mapPointer.remove()
            }
        )
    })
    function setMapPointerAt(x,y){
        const activeMapElement = document.querySelector('.activeMap')
        let activeMapPointerElement
        if (!document.querySelector('.activeMap .map_pointer')){
            activeMapPointerElement = document.createElement('div');
            activeMapPointerElement.className = "map_pointer";
            activeMapElement.prepend(activeMapPointerElement)
        } else {activeMapPointerElement = document.querySelector('.activeMap .map_pointer')}
        //click coords
        const clickPositionX = x
        const clickPositionY = y

        const activeMapPosition = activeMapElement.getBoundingClientRect()
        //size of map pointer
        const sizeX = 58
        const sizeY = 58

        activeMapPointerElement.style.left = (clickPositionX - activeMapPosition.x - sizeX/2) + 'px'
        activeMapPointerElement.style.top = (clickPositionY - activeMapPosition.y - sizeY/2) + 'px'
    }
    function initMapPointer(country){
        Array.prototype.every.call(countriesPaths, (p=>{
            if(p.parentNode.dataset.country === country){
                const mapItem = p.getBoundingClientRect()
                setMapPointerAt(mapItem.x + mapItem.width/2, mapItem.y + mapItem.height/2 )
                return false
            }
            return true
        }))

    }
   initMapPointer(currentCountry)

})



