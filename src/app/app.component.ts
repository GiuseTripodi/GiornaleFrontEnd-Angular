import { Component, OnInit } from '@angular/core';
import { homeServiceI } from './servizi/HomeService/homeServiceI';
import { Categoria } from './supportedService/categoria';
import { Articolo } from './supportedService/articolo';
import { HomeMockupServiceService } from './servizi/HomeService/home-mockup-service.service';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Giornale';

  //sono gli articoli selezionati in base alla categoria
  articoli : Articolo[];

  categorie : Categoria[];

  //categoria selezionata
  selected : Categoria;

  //gestione articoli principali
  articoliPrincipali : Articolo[];

  //di defoult imposto una visualizzazione per data
  ordinamentoPrincipali : boolean = true;


  constructor(private servizioHome: HomeMockupServiceService){

  }

  ngOnChange(){

  }

  ngOnInit(): void{
    this.getCategorie();
    this.getArticoliPrincipali(this.ordinamentoPrincipali);

    //this.getArticoliPerCategoria(this.selected);
    //al memento li faccio restiruire per date


  }

  getCategorie(): void {
    this.servizioHome.getCategorie().subscribe(categories => this.categorie = categories);
  }


  getArticoliPerCategoria(selected: Categoria){
    this.servizioHome.getArticoliPerCategoria(selected.id).subscribe(articolis => this.articoli = articolis);
  }


  getArticoliPrincipali(ordinamento : boolean): void{
    //true == ordinati per data, false = ordinati per like
    if(ordinamento){
      this.servizioHome.getArticoliPiuRecenti().subscribe(arts => this.articoliPrincipali = arts);

    }
    else{
      this.servizioHome.getArticoliPiuLike().subscribe(arts => this.articoliPrincipali = arts);
    }
  }

  select(cat: Categoria){
    this.selected =cat;
    this.articoli = this.selected.getArticoli();
    console.log(cat);

  }

  selectTipoVisualizzazione(vis : boolean){
    this.ordinamentoPrincipali = vis;
    console.log("scelto ordinamento :" + vis);
  }



}
