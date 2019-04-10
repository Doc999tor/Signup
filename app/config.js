var _config = {}

_config.data = {isRTL: false}

_config.urls = {
  check_login: '/check-login',
  static: './media/',

  // api
  recaptcha_post: 'http://atzma.im/recaptcha.php?token={token}'
}

_config.keys = {
  recaptcha_v3: '6LcXaJsUAAAAABggIFrA5GbeAX0T7RgnK6tohhqn',
  recaptcha_v2: '6LcA3JwUAAAAAN0i_W6QTvoo9FW-9ectGBzB8zyf'
}

_config.routing = {
  // ?error=incorrect
  url_params: {
    error: 'error',
    values: {
      incorrect: 'incorrect'
    }
  },
  sign_up_path: '/',
  all_set_path: '/all-set'
}

_config.translations = {
  all_set: {
    we_all_set: "We're all set!",
    enjoy_your_choice: 'Thanks for being awesome, we hope you enjoy your choice',
    you_can_continue: 'Now you can continue working in the application.',
    send_important_information: 'We are going to send important information and some tips for running your app better. Are you ok with it?',
    agree_to_all_the_Terms: 'I agree to all the Terms of Use of the Atzmaim app and the legal',
    lets_start: 'Lets Start!'
  },
  sign_up: {
    fill_dateils_create: 'Fill your dateils to create account:',
    continue: 'Continue'
  },
  sign_in: {
    title: 'Atzmaim',
    login_google: 'Log in with google',
    login_or: 'or',
    enter_email: 'enter your email',
    enter_password: 'enter your password',
    login: 'Login',
    forgot_password: 'Forgot your password?',
    dont_have_acc: 'Don’t have an account?',
    sign_up: 'Sign Up',
    missing_email: 'Missing email',
    missing_password: 'Missing password',
    wrong_email: 'Wrong email try again!',
    enter_email_pass: 'Enter email and password',
    password_short: 'password is too short',
    // new
    error_incorrect: 'Your e-mail or password is incorrect'
  }
}
