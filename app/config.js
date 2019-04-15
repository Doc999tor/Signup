var _config = {}

_config.data = {isRTL: false}
_config.lang = 'en'
_config.all_langs = ['en', 'he', 'ru']
_config.urls = {
  business_type: '/business-type',
  static: './media/',
  business_types_icons: './media/business_types_icons/',
  // api
  base: 'https://api.bewebmaster.co.il/', // domain name
  business_types_get: 'business_types?lang={lang}',
  countries_get: 'countries',

  recaptcha_post: 'http://atzma.im/recaptcha.php?token={token}',
  signup_post: 'signup'
}

_config.keys = {
  recaptcha_v3: '6LcXaJsUAAAAABggIFrA5GbeAX0T7RgnK6tohhqn',
  recaptcha_v2: '6LcA3JwUAAAAAN0i_W6QTvoo9FW-9ectGBzB8zyf'
}

_config.routing = {
  calendar: '/calendar',
  // ?error=incorrect
  url_params: {
    error: 'error',
    values: {
      incorrect: 'incorrect'
    }
  },
  sign_up_path: '/',
  all_set_path: '/all-set',
  business_type_path: '/business-type'
}

_config.translations = {
  en: {
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
    },
    business_type: {
      select_business_type: 'Please select business type',
      adjuas_the_app: 'We’ll adjuas the app to your needs',
      can_choose_more: 'You can choose more the one or',
      skip_here: 'skip here',
      your_choose: 'Your choose:'
    }
  },
  he: {
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
      title: 'ру',
      login_google: 'ру ру ру ру',
      login_or: 'ру',
      enter_email: 'ру ру ру',
      enter_password: 'руруру',
      login: 'ру',
      forgot_password: 'ру?',
      dont_have_acc: 'ру?',
      sign_up: 'ру',
      missing_email: 'ру',
      missing_password: 'руру',
      wrong_email: 'руруру!',
      enter_email_pass: 'руруруру',
      password_short: 'руруруру',
      // new
      error_incorrect: 'руруруру'
    }
  },
  ru: {
    all_set: {
      we_all_set: "руруру руруру руруру!",
      enjoy_your_choice: 'рурур уруруруруруруруру руруруруруруруруру ру',
      you_can_continue: 'руруру',
      send_important_information: 'руруру',
      agree_to_all_the_Terms: 'руруру',
      lets_start: 'руруру'
    },
    sign_up: {
      fill_dateils_create: 'руруру:',
      continue: 'руруру'
    },
    sign_in: {
      title: 'ру',
      login_google: 'ру ру ру ру',
      login_or: 'ру',
      enter_email: 'ру ру ру',
      enter_password: 'руруру',
      login: 'ру',
      forgot_password: 'ру?',
      dont_have_acc: 'ру?',
      sign_up: 'ру',
      missing_email: 'ру',
      missing_password: 'руру',
      wrong_email: 'руруру!',
      enter_email_pass: 'руруруру',
      password_short: 'руруруру',
      // new
      error_incorrect: 'руруруру'
    },
    business_type: {
      select_business_type: 'Please select business type',
      adjuas_the_app: 'We’ll adjuas the app to your needs',
      can_choose_more: 'You can choose more the one or',
      skip_here: 'skip here',
      your_choose: 'Your choose:'
    }
  }
}
