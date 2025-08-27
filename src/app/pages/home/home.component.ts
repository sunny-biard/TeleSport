import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { FormattedData } from 'src/app/core/models/FormattedData';
import { Olympic } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);

  view: [number, number] = [700, 400];
  results: FormattedData[] = [];
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  trimLabels: boolean = false;

  numberOfCountries!: number;
  numberOfJOs!: number;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    
    this.olympics$ = this.olympicService.getOlympics();

    this.olympics$.subscribe((data) => {
      
      if (data) {
        
        this.results = this.formatData(data);
        this.numberOfCountries = data.length;
        this.numberOfJOs = data[0].participations.length;
      }
    });
  }

  formatData(data: Olympic[]) {
    
    let formattedData: FormattedData[] = [];

    data.forEach((country) => {

      let medals = 0;

      if (country.participations) {

        medals = country.participations.reduce((sum, participation) => sum + participation.medalsCount, 0);
      }

      formattedData.push({
        name: country.country,
        value: medals
      })
    })

    return formattedData;
  }

  onSelect(name: string): void {

  }
}
