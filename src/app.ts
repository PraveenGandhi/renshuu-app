import { AuthorizeStep } from './services/authorize-step';
import { autoinject, Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { RouterConfiguration } from 'aurelia-router';
import 'jquery-nicescroll';
import { Auth } from './services/auth';

declare var $: any;

@autoinject()
export class App {
  public router: Router;

  constructor(private auth:Auth, private aurelia:Aurelia){}
  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'App';
    config.options.root = '/';
    config.addPipelineStep('authorize', AuthorizeStep);
    config.map([
      { name: 'base',  route: '',       moduleId: './pointer' },
      { name: 'words', route: '/words', moduleId: './routes/words/child-router',  title: 'Words', nav: true },
    ]);
    this.router = router;
  }

  public attached() {
    $('a.launch.icon.item').on('click', function () {
      $('.ui.sidebar').sidebar('toggle');
    });
    $('body').niceScroll({
      cursorcolor: '#ddd',
      cursorwidth: 5,
      cursorborderradius: 0,
      cursorborder: 0,
      scrollspeed: 50,
      autohidemode: true,
      zindex: 9999999
    }); // body scroll tigger by nicescroll
    $('.hamburger').on('click', function () {
      console.log($(this).data('name'));
      if ('show' === $(this).data('name')) {
        $('.toc').animate({
          width: '155px'
        }, 350);
        $('.logo').animate({
          width: '155px'
        }, 350);
        $('.logoImg').transition('jiggle');
        $(this).data('name', 'hide');
      } else {
        $('.toc').animate({
          width: '250px'
        }, 350);
        $('.logo').animate({
          width: '250px'
        }, 350);
        $('.logoImg').transition('tada');
        $(this).data('name', 'show');
      }
    });
  }
  public logout() {
    this.auth.logout().then(()=>this.aurelia.setRoot('login'));
  }
}