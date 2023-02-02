import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit {

  @Input() placeholder: string = 'Buscar...';

  @Output() onEnter   : EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  debouncer: Subject<string> = new Subject();

  termino: string = '';

  ngOnInit(): void {
      this.debouncer
        .pipe( debounceTime(300) )
        .subscribe( valor => {
          // console.log( 'debouncer:', valor );
          this.onDebounce.emit( valor );
        });
  }

  buscar() {
    // si no hay nada escrito, no se ejecutara nada.
    if( this.termino.trim().length === 0 ) return;

    // se emite el evento
    this.onEnter.emit( this.termino );
  }

  teclaPresionada() {
    this.debouncer.next( this.termino );
  }

}
