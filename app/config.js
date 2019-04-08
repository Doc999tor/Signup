var _config = {}

_config.data = {isRTL: false}

_config.urls = {
  check_login: '/check-login',
  static: './media/',

  // api
  recaptcha_post: 'http://atzma.im/recaptcha.php?token={token}'
}

_config.routing = {
  // ?error=incorrect
  url_params: {
    error: 'error',
    values: {
      incorrect: 'incorrect'
    }
  },
  sign_in_path: '/',
  forgot_path: '/forgot'
}

_config.translations = {
  sign_up: {
    we_all_set: "We're all set!",
    enjoy_your_choice: 'Thanks for being awesome, we hope you enjoy your choice',
    you_can_continue: 'Now you can continue working in the application.',
    send_important_information: 'We are going to send important information and some tips for running your app better. Are you ok with it?',
    agree_to_all_the_Terms: 'I agree to all the Terms of Use of the Atzmaim app and the legal',
    lets_start: 'Lets Start!'
  }
}
