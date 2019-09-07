$(document).ready(() => {
    // hidden picture of me
    // var prev = '';
    // var pics = ['img/works/me1c.jpg', 'img/works/me2c.jpg'];
    // var randomPic = pics[Math.floor(Math.random() * 2)];
    // $('#summary img').hover(() => {
    //     console.log('hover');
    //     if (prev === 'img/works/me1c.jpg') {
    //         prev = 'img/works/me2c.jpg';
    //         $('#summary img').attr('src', 'img/works/me2c.jpg');
    //     } else {
    //         prev = 'img/works/me1c.jpg';
    //         $('#summary img').attr('src', 'img/works/me1c.jpg');
    //     }
    // }, () => {
    //     console.log('over');
    //     $('#summary img').attr('src', 'img/icons/creativity.png');
    // });

    // Determine if on mobile
    var isMobile = false;
    if ($('#isMobile').css('display') === 'inline') {
        isMobile = true;
    }

    $('#overlay').hide();

    $('.project').hover((event) => {
        $('#hide').hide();
        $('#overlay').show();
    }, () => {
        $('#hide').show();
        $('#overlay').hide();
    });

    // custom modal
    // Dismiss modal
    var $modal = $('.modal');
    var currentModal = '';

    $('.close').click((event) => {
        $('body').removeClass('disable-scrolling');
        $(currentModal).removeClass('show-modal');
    });

    $(window).click((event) => {
        var target = event.target.classList.value;
        if (target.indexOf('modal') > -1) {
            $('body').removeClass('disable-scrolling');
            $(currentModal).removeClass('show-modal');
        }
    });

    // modals

    function launchModal(imgSrc) {
        $('.modal-body img').attr('src', imgSrc);
        $('#myModal').modal();
    }

    $('#item-1').click((event) => {
        event.preventDefault();

        // setting modal details
        var imgSrc = 'img/works/1c.jpg';
        $('.modal-header h3').text('ASHAH FASHION');
        $('#project-desc').text('Ashah Fashion Inc (Fashion E-commerce website.');
        $('#project-link a').attr('href', 'http://ashahfashion.com/');

        launchModal(imgSrc);
    });

    $('#item-2').click((event) => {
        event.preventDefault();

        // setting modal details
        var imgSrc = 'img/works/2c.jpg';
        $('.modal-header h3').text('SOCIAL4GEEK');
        $('#project-desc').text('Social networking website for geeks.');
        $('#project-link a').attr('href', 'http://www.social4geek.com');

        launchModal(imgSrc);
    });

    $('#item-3').click((event) => {
        event.preventDefault();

        // setting modal details
        var imgSrc = 'img/works/3c.jpg';
        $('.modal-header h3').text('DEV4BIZ');
        $('#project-desc').text('Web, mobile and desktop application development firm.');
        $('#project-link a').attr('href', 'http://lifecoder.000webhostapp.com/');

        launchModal(imgSrc);
    });

    var status = '';
    var valid = false;


    // email validator
    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    $("#submit").click((event) => {
        var data = {
            name: $("#name").val(),
            email: $("#email").val(),
            subject: $("#subject").val(),
            message: $("#message").val()
        };

        var isValidEmail, isValidName, isValidSubject, isValidMessage;
        isValidEmail = validateEmail(data.email);

        // Validate and give visual feedback to the user
        if (isValidEmail === false) {
            $('#email').addClass('has-error');
        } else {
            $('#email').removeClass('has-error');
            $('#email').addClass('has-success');
        }
        if (data.name === '') {
            isValidName = false;
            $('#name').addClass('has-error');
        } else {
            isValidName = true;
            $('#name').removeClass('has-error');
            $('#name').addClass('has-success');
        }
        if (data.subject === '') {
            isValidSubject = false;
            $('#subject').addClass('has-error');
        } else {
            isValidSubject = true;
            $('#subject').removeClass('has-error');
            $('#subject').addClass('has-success');
        }
        if (data.message === '') {
            isValidMessage = false;
            $('#message').addClass('has-error');
        } else {
            isValidMessage = true;
            $('#message').removeClass('has-error');
            $('#message').addClass('has-success');
        }

        // Only send mail if all form fields are valid
        if (isValidEmail === true && isValidMessage === true && isValidName === true && isValidSubject === true) {
            $('#submit').attr('disabled', 'disabled');

            // Send mail
            $('#submit-btn').css('display', 'none');
            $('#spinner').css('font-size', '30px');
            // $('#spinner').css('animation', 'spinner 1s infinite linear')

            console.log('sending mail');
            if ((data.name.indexOf('\r') === -1 && data.name.indexOf('\n') === -1) && (data.email.indexOf('\r') === -1 && data.email.indexOf('\n') === -1)) {
                console.log('works');
                $.ajax({
                    type: "POST",
                    url: "contact.php",
                    data: data,
                    success: function(data) {
                        var res = $.parseJSON(data);
                        if (res.status == '1') {
                            console.log('email sent');
                            status = 'success';
                            console.log('message sent');
                            $('#spinner').css('font-size', '0px');
                            $('#status').css('display', 'inline');
                            notificationHandler();
                            $('#name').val('');
                            $('#email').val('');
                            $('#message').val('');
                            $('#subject').val('');

                        } else {
                            console.log('failed');
                            status = 'fail';
                            notificationHandler();
                            $('#submit-btn').css('display', 'inline');
                            $('#spinner').css('font-size', '0px');
                            //TODO: Handle error
                        }
                    },
                    error: function() {
                        status = 'error';
                        notificationHandler();
                    }
                });
            } else {
                status = 'illegal';
                notificationHandler();
            }
        } else {
            // Visual feedback
            $('#notification-message').text('One or more form fields are empty or filled incorrectly');
            $('#general').css('display', 'inline');
            if (isMobile === true) {
                $('#general').css('bottom', '88%');
            } else {
                $('#general').css('bottom', '81%');
            }
            setTimeout(() => {
                $('#general').css('bottom', '200%');
            }, 7000);
        }
    });

    // mail status notification

    function notificationHandler() {
        if (status === 'success') {
            $('#success').css('display', 'inline');
            if (isMobile === true) {
                $('#success').css('bottom', '88%');
            } else {
                $('#success').css('bottom', '81%');
            }
        } else if (status === 'fail') {
            $('#fail').css('display', 'inline');
            if (isMobile === true) {
                $('#fail').css('bottom', '88%');
            } else {
                $('#fail').css('bottom', '81%');
            }
        } else if (status === 'error') {
            $('#error').css('display', 'inline');
            if (isMobile === true) {
                $('#error').css('bottom', '88%');
            } else {
                $('#error').css('bottom', '81%');
            }
        } else if (status === 'illegal') {
            $('#illegal').css('display', 'inline');
            if (isMobile === true) {
                $('#illegal').css('bottom', '88%');
            } else {
                $('#illegal').css('bottom', '81%');
            }
        }

        setTimeout(() => {
            $('#success').css('bottom', '200%');
            $('#fail').css('bottom', '200%');
            $('#error').css('bottom', '200%');
            $('#illegal').css('bottom', '200%');
            $('#spinner').css('font-size', '0px');
            $('#status').css('display', 'none');
            $('#submit-btn').css('display', 'inline');
            $('#submit').removeAttr('disabled');
        }, 8000);
    }


    // $('#filters #mobile').trigger('click', (event) => {
    //   console.log('switched');
    // });

    function patchFix() {
      setTimeout(function() {
        $('#filters #mobile').trigger('click');
      }, 4000);

      setTimeout(function() {
        $('#filters #all').trigger('click');
      }, 5500);
    }

    patchFix();

    $('#filters a').click((event) => {
      console.log('clicked');
    });
});
