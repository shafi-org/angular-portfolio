import { Component, OnInit } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { ContactmeComponent } from './contactme/contactme.component';
import { MyworkComponent } from './mywork/mywork.component';
import { SkillComponent } from './skill/skill.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  status:number = 0
  content:any
  setIndex(index: number,componentName:any) {
    this.status = index;
    switch(componentName){
      case "AboutComponent":{
        this.content = AboutComponent
        break;
      }
      case "SkillComponent":{
        this.content = SkillComponent
        break;
      }
      case "MyworkComponent":{
        this.content = MyworkComponent
        break;
      }
      case "ContactmeComponent":{
        this.content = ContactmeComponent
        break;
      }
      default:{
        this.content = ''
        break;
      }
    }
 }
  artists = [
    {
      componentName:'AboutComponent',
      name: "About Me",
      spotify: {
        profileUrl:
          "https://open.spotify.com/artist/205i7E8fNVfojowcQSfK9m?si=HidnJ9jEQ5aK-dKZEZWdLw",
        embedUrl:
          "https://open.spotify.com/embed/artist/205i7E8fNVfojowcQSfK9m?utm_source=generator"
      },
      backgroundUrl: "https://assets.codepen.io/152347/dom-dolla.jpg",
      backgroundColor:"#0f2319"
    },
    {
      componentName:'SkillComponent',
      name: "Skills & Experience",
      spotify: {
        profileUrl:
          "https://open.spotify.com/artist/0aA1GTrIMutjIh4GlPPUVN?si=N6CkDtcYQx-O4Zehl6CPag",
        embedUrl:
          "https://open.spotify.com/embed/artist/0aA1GTrIMutjIh4GlPPUVN?utm_source=generator"
      },
      backgroundUrl: "https://assets.codepen.io/152347/crooked-colours.jpg",
      backgroundColor:"#0f1923"
    },
    {
      componentName:'MyworkComponent',
      name: "My Work",
      description: "app-about",
      spotify: {
        profileUrl:
          "https://open.spotify.com/artist/4OSArit7O2Jaj4mgf3YN7A?si=NBgyC_b_QNujIr2Ubd2fSw",
        embedUrl:
          "https://open.spotify.com/embed/artist/4OSArit7O2Jaj4mgf3YN7A?utm_source=generator"
      },
      backgroundUrl: "https://assets.codepen.io/152347/mallrat.jpg",
      backgroundColor:"#230f19"
    },
    {
      componentName:'ContactmeComponent',
      name: "Contact Me",
      spotify: {
        profileUrl:
          "https://open.spotify.com/artist/2Ltr0s15RyvsjqWzSmiSRs?si=uTbBZc32RhC75qp7tlOfzw",
        embedUrl:
          "https://open.spotify.com/embed/artist/2Ltr0s15RyvsjqWzSmiSRs?utm_source=generator"
      },
      backgroundUrl: "https://assets.codepen.io/152347/allday.jpg",
      backgroundColor:"#23190f"
    },

  ]
  constructor() { }

  ngOnInit(): void {
    this.content = AboutComponent
    const hola = document.getElementById('ul')
    // @ts-ignore
    hola.addEventListener('mousemove', e => {
      let x = e.pageX-10;
      let y = (e.pageY - window.pageYOffset)-10;
      // @ts-ignore
      //document.getElementById('follower').style.transform =`translate3d(${x}px, ${y}px, 0)`;
      // @ts-ignore
      document.getElementById('ds').style.transform =`translate3d(${x}px, ${y}px, 0)`;
      // @ts-ignore
      document.getElementById('td').style.transform =`translate3d(${x}px, ${y}px, 0)`;
    });
    // @ts-ignore
    hola.addEventListener('mousemove', e => {
      let x = e.pageX;
      let y = e.pageY - window.pageYOffset;
      // @ts-ignore
      //document.getElementById('follower').style.transform =`translate3d(${x}px, ${y}px, 0)`;

    });
  }

}
