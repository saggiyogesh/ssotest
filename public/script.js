$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name]) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};

$('#signin').click(function() {
  $('#second').fadeOut('fast', function() {
    $('#first').fadeIn('fast');
  });
});

$(function() {
  $("form[name='login']").validate({
    rules: {
      email: {
        required: true,
        email: true
      },
      password: {
        required: true
      }
    },
    messages: {
      email: 'Please enter a valid email address',

      password: {
        required: 'Please enter password'
      }
    },
    submitHandler: function(form) {
      //  form.submit();

      const loginURL =
        'https://euro-dev.learnindialearn.in/api/auth/auth/login';

      // $.post(loginURL, $("form[name='login']").serialize(), {
      //   contentType: 'application/json; charset=utf-8',
      //   dataType: 'json'
      // });
      const data = $("form[name='login']").serializeObject();
      console.log('data', data);

      $.ajax({
        url: loginURL,
        type: 'POST',
        data: JSON.stringify($("form[name='login']").serializeObject()),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        crossDomain: true,
        cache: false,
        processData: false,
        success: function(data) {
          alert('Login success.. POSTing to Light sailed api');
          console.log('arguments success', arguments);
          $('#first').hide();

          const token = data.id_token;
          $.ajax({
            url: '/light-sailed-info',
            type: 'POST',
            // data: JSON.stringify({ token }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            crossDomain: true,
            cache: false,
            processData: false,
            headers: {
              Authorization: token
            },
            success: function(data) {
              console.log('data--->>', data);
              const user = data.user;
              const json = _.pick(user, [
                'firstName',
                'lastName',
                'email',
                'gender',
                'dob',
                'address',
                'id'
              ]);
              $('#json').show();
              $('#jsonRes').jsonPresenter({
                json
              });
              $('#token').text(token);
            },
            error: function(err) {
              alert('Invalid token');
            }
          });
        },
        error: function(res, textStatus) {
          console.log('arguments err', arguments);
          alert('Wrong email or password.');
          // const msg =
          //   (res.responseJSON.error && res.responseJSON.error.message) ||
          //   res.responseJSON.error.code;
          // if (msg) {
          //   alert(msg);
          // }
        }
      });
    }
  });
});
