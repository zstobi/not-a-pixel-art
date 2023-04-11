import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { currentColor, fsTrigger, paint, pixels } from 'src/app/constants/c';

@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss']
})
export class PaletteComponent {
  elem: any;

  constructor(
    @Inject(DOCUMENT) private document: any
  ){}

  ngOnInit():void{
    this.elem = this.document.querySelector('.screen');

    this.document.addEventListener('fullscreenchange',()=>{
      fsTrigger.value += 1;
    
      const btn = document.querySelector('.fs')!;

      if (fsTrigger.value % 2 !== 0) {
        btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        </svg>
        `;
      }

    });

    this.activatePaint();

    this.activateColors();
    
    this.painting();

    this.gridToggle();
    
    this.activatePaint();
    
    const cpInput = document.querySelector<HTMLInputElement>('.cpi')!;

    cpInput.addEventListener('mouseleave',this.colorPicker);
  }

  activatePaint(){
    window.addEventListener('mousedown',()=>{
      paint.value = true;
    });
    window.addEventListener('mouseup',()=>{
      paint.value = false;
    });
  }

  fsToggle(){
    const btn = document.querySelector('.fs')!;

    if (fsTrigger.value % 2 !== 0) {
      this.elem.requestFullscreen();
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
        </svg>    
      `;
    } else {
      document.exitFullscreen();
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        </svg>
      `;
    }

  }

  activateColors(){    
    const s0 = document.querySelector('.cp1');
    const s1 = document.querySelector('.s1');
    const s2 = document.querySelector('.s2');
    const s3 = document.querySelector('.s3');
    const s4 = document.querySelector('.s4');
    const s5 = document.querySelector('.s5');
    const s6 = document.querySelector('.s6');
    const s7 = document.querySelector('.s7');
    const s8 = document.querySelector('.s8');
    const s9 = document.querySelector('.s9');
    const s10 = document.querySelector('.s10');
    
    let colorBtns:any[] = [s0,s1,s2,s3,s4,s5,s6,s7,s8,s9,s10];

    // colorBtns.forEach((x)=>{ 

    //   x.addEventListener('click',()=>{
    //     currentColor.value = getComputedStyle(x).backgroundColor;
    //     console.log(currentColor.value);
    //   });
    // });

    return colorBtns;
  }

  gridToggle(){
    const gridTogg = document.querySelector('.gridBtn');
    const gridGap = document.querySelector<HTMLElement>('.grid')!;

    gridTogg?.addEventListener('click',()=>{
        if (gridTogg.textContent === 'no-grid'){
          gridTogg.textContent = 'grid';
          gridGap.style.gap = '0px';
        } else {
          gridTogg.textContent = 'no-grid';
          gridGap.style.gap = '1px';
        };
    });
  }

  colorPicker():string{
    const cpInput = document.querySelector<HTMLInputElement>('.cpi')!;
    return cpInput.value;
  }

  painting(){
    const grid = document.querySelector('.grid');
    const eraser = document.querySelector('.eraser')!;
    const reset = document.querySelector('.reset');
    let divsList:HTMLDivElement[] = [];

    for (let p = 0; p <= pixels.total; p++){
      const div:HTMLDivElement = document.createElement('div');
      
      divsList.push(div);

      div.classList.add('pixel');
      grid?.appendChild(div);

      this.activateColors().forEach((x)=>{
        
        x.addEventListener('click',()=>{
          currentColor.value = getComputedStyle(x).backgroundColor;

          div.addEventListener('mouseover',()=>{
            if (paint.value === true) {
              div.style.backgroundColor = currentColor.value;
            }
          });

          div.addEventListener('mousedown',(e)=>{
            div.style.backgroundColor = currentColor.value;
            e.preventDefault();
          });

        });

      });

      eraser.addEventListener('click',()=>{
        div.addEventListener('mouseover',()=>{
            if (paint.value === true) {
              div.style.backgroundColor = '#201f1e';
            }
        });
        div.addEventListener('mousedown',(e)=>{
            div.style.backgroundColor = '#201f1e';
            e.preventDefault();
          });
      })

      reset?.addEventListener('click',()=>{
          div.style.backgroundColor = '#201f1e';
      });
    }

  }

}